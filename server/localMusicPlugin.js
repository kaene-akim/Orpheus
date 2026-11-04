import { createHash } from 'node:crypto';
import { createReadStream } from 'node:fs';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const AUDIO_EXTENSIONS = new Set([
  '.aac',
  '.flac',
  '.m4a',
  '.mp3',
  '.oga',
  '.ogg',
  '.opus',
  '.wav',
  '.webm',
  '.wma',
]);

const AUDIO_MIME = {
  '.aac': 'audio/aac',
  '.flac': 'audio/flac',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
  '.oga': 'audio/ogg',
  '.ogg': 'audio/ogg',
  '.opus': 'audio/ogg',
  '.wav': 'audio/wav',
  '.webm': 'audio/webm',
  '.wma': 'audio/x-ms-wma',
};

const SCAN_TTL_MS = 3000;
const MAX_ARTWORK_CACHE = 64;

let metadataModulePromise = null;
let artworkCache = new Map();

function metadataModule() {
  metadataModulePromise ??= import('music-metadata');
  return metadataModulePromise;
}

function musicRoot() {
  const configured = process.env.ORPHEUS_MUSIC_DIR;
  return configured ? path.resolve(configured) : path.join(os.homedir(), 'Music');
}

function extensionOf(filePath) {
  return path.extname(filePath).toLowerCase();
}

function isAudioFile(filePath) {
  return AUDIO_EXTENSIONS.has(extensionOf(filePath));
}

function mediaUrl(relativePath) {
  return `/media/${relativePath
    .split(path.sep)
    .map((part) => encodeURIComponent(part))
    .join('/')}`;
}

function trackId(relativePath) {
  return createHash('sha1').update(relativePath).digest('hex').slice(0, 16);
}

function isInside(root, target) {
  const resolvedRoot = path.resolve(root);
  const resolvedTarget = path.resolve(target);
  return resolvedTarget === resolvedRoot || resolvedTarget.startsWith(`${resolvedRoot}${path.sep}`);
}

function resolveMediaPath(root, rawPath) {
  let segments;
  try {
    segments = rawPath
      .split('/')
      .filter(Boolean)
      .map((segment) => decodeURIComponent(segment));
  } catch {
    return null;
  }

  if (segments.some((segment) => segment === '.' || segment === '..')) return null;

  const target = path.resolve(root, ...segments);
  return isInside(root, target) ? target : null;
}

function sortTracks(tracks) {
  return tracks.sort((left, right) => {
    const album = String(left.album ?? '').localeCompare(String(right.album ?? ''));
    if (album) return album;

    const disc = (left.discNumber ?? 0) - (right.discNumber ?? 0);
    if (disc) return disc;

    const track = (left.trackNumber ?? 0) - (right.trackNumber ?? 0);
    if (track) return track;

    return left.title.localeCompare(right.title);
  });
}

async function collectAudioFiles(directory) {
  let entries;
  try {
    entries = await fs.readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  const directories = [];

  entries.forEach((entry) => {
    if (entry.name.startsWith('.')) return;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) directories.push(fullPath);
    else if (entry.isFile() && isAudioFile(fullPath)) files.push(fullPath);
  });

  for (const child of directories) {
    files.push(...(await collectAudioFiles(child)));
  }

  return files;
}

async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = index;
      index += 1;
      results[current] = await mapper(items[current], current);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

async function readTrack(filePath, root, cache, nextCache) {
  const stat = await fs.stat(filePath);
  const relativePath = path.relative(root, filePath);
  const cached = cache.get(filePath);

  if (cached && cached.mtimeMs === stat.mtimeMs && cached.size === stat.size) {
    nextCache.set(filePath, cached);
    return cached.track;
  }

  let metadata = null;
  try {
    const { parseFile } = await metadataModule();
    metadata = await parseFile(filePath, { duration: true });
  } catch {
    // Unreadable or partially tagged files still appear in the library.
  }

  const common = metadata?.common ?? {};
  const format = metadata?.format ?? {};
  const folderName = path.basename(path.dirname(filePath));
  const id = trackId(relativePath);

  const pictures = common.picture ?? [];
  const cover = pictures.find((item) => /front/i.test(item.type ?? '')) ?? pictures[0];
  const artist = common.artist?.trim() || common.albumartist?.trim() || 'Unknown artist';
  const taggedArtists = Array.isArray(common.artists)
    ? common.artists.map((name) => String(name ?? '').trim()).filter(Boolean)
    : [];

  const track = {
    id,
    title: common.title?.trim() || path.basename(filePath, extensionOf(filePath)),
    artist,
    // Keep the exact tag around so the client can split combined feature
    // strings without losing the display name.
    artists: taggedArtists.length ? [...new Set(taggedArtists)] : [artist],
    albumArtist:
      common.albumartist?.trim() || common.artist?.trim() || 'Unknown artist',
    album: common.album?.trim() || folderName || 'Unknown album',
    src: mediaUrl(relativePath),
    duration: Number.isFinite(format.duration) ? format.duration : undefined,
    trackNumber: Number.isFinite(common.track?.no) ? common.track.no : null,
    discNumber: Number.isFinite(common.disk?.no) ? common.disk.no : null,
    year: Number.isFinite(common.year) ? common.year : null,
    hasArtwork: Boolean(cover),
    ...(cover
      ? {
          artwork: `/api/artwork/${id}`,
          artworkType: cover.format || 'image/jpeg',
        }
      : {}),
  };

  nextCache.set(filePath, { mtimeMs: stat.mtimeMs, size: stat.size, track });
  return track;
}

export function createLocalMusicPlugin() {
  let cache = new Map();
  let snapshot = {
    root: musicRoot(),
    tracks: [],
    byId: new Map(),
    error: null,
    message: null,
  };
  let scanPromise = null;
  let lastScanAt = 0;
  let hasScanned = false;

  async function scanLibrary() {
    const root = musicRoot();

    let stat = null;
    try {
      stat = await fs.stat(root);
    } catch {
      return {
        root,
        tracks: [],
        byId: new Map(),
        error: 'Music folder not found.',
        message: null,
      };
    }

    if (!stat.isDirectory()) {
      return {
        root,
        tracks: [],
        byId: new Map(),
        error: 'Music path is not a folder.',
        message: null,
      };
    }

    const files = await collectAudioFiles(root);
    if (!files.length) {
      return {
        root,
        tracks: [],
        byId: new Map(),
        error: null,
        message: 'No audio files found in the music folder.',
      };
    }

    const nextCache = new Map();
    const byId = new Map();
    const tracks = await mapLimit(files, 6, async (filePath) => {
      const track = await readTrack(filePath, root, cache, nextCache);
      byId.set(track.id, filePath);
      return track;
    });

    cache = nextCache;

    return {
      root,
      tracks: sortTracks(tracks),
      byId,
      error: null,
      message: null,
    };
  }

  function ensureLibrary({ force = false } = {}) {
    if (!force && hasScanned && Date.now() - lastScanAt < SCAN_TTL_MS) {
      return Promise.resolve(snapshot);
    }

    if (!scanPromise) {
      scanPromise = scanLibrary()
        .then((result) => {
          snapshot = result;
          lastScanAt = Date.now();
          hasScanned = true;
          return result;
        })
        .finally(() => {
          scanPromise = null;
        });
    }

    return scanPromise;
  }

  async function getArtwork(filePath, id) {
    if (artworkCache.has(id)) return artworkCache.get(id);

    const { parseFile } = await metadataModule();
    const metadata = await parseFile(filePath, { duration: false });
    const pictures = metadata.common.picture ?? [];
    const picture = pictures.find((item) => /front/i.test(item.type ?? '')) ?? pictures[0];
    if (!picture) return null;

    const entry = {
      type: picture.format || 'image/jpeg',
      buffer: Buffer.from(picture.data),
    };

    artworkCache.set(id, entry);
    if (artworkCache.size > MAX_ARTWORK_CACHE) {
      artworkCache.delete(artworkCache.keys().next().value);
    }

    return entry;
  }

  function sendJson(res, status, value) {
    const body = JSON.stringify(value);
    res.writeHead(status, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(body),
      'Cache-Control': 'no-store',
    });
    res.end(body);
  }

  function sendError(res, status, message) {
    sendJson(res, status, { error: message });
  }

  async function streamAudio(req, res, filePath) {
    let stat;
    try {
      stat = await fs.stat(filePath);
    } catch {
      sendError(res, 404, 'Audio file not found.');
      return;
    }

    if (!stat.isFile()) {
      sendError(res, 404, 'Audio file not found.');
      return;
    }

    const mime = AUDIO_MIME[extensionOf(filePath)] ?? 'application/octet-stream';
    const range = req.headers.range;
    const total = stat.size;

    if (!range) {
      res.writeHead(200, {
        'Content-Type': mime,
        'Content-Length': total,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=3600',
      });
      if (req.method === 'HEAD') res.end();
      else createReadStream(filePath).pipe(res);
      return;
    }

    const match = /^bytes=(\d*)-(\d*)$/.exec(String(range).trim());
    if (!match) {
      res.writeHead(416, { 'Content-Range': `bytes */${total}` });
      res.end();
      return;
    }

    let start;
    let end;
    if (match[1] === '' && match[2] !== '') {
      const suffixLength = Number(match[2]);
      start = Math.max(total - suffixLength, 0);
      end = total - 1;
    } else {
      start = match[1] === '' ? 0 : Number(match[1]);
      end = match[2] === '' ? total - 1 : Number(match[2]);
    }

    if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start >= total) {
      res.writeHead(416, { 'Content-Range': `bytes */${total}` });
      res.end();
      return;
    }

    end = Math.min(end, total - 1);

    res.writeHead(206, {
      'Content-Type': mime,
      'Content-Length': end - start + 1,
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Cache-Control': 'public, max-age=3600',
    });

    if (req.method === 'HEAD') res.end();
    else createReadStream(filePath, { start, end }).pipe(res);
  }

  async function handleRequest(req, res) {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const pathname = url.pathname;

    if (pathname === '/api/library') {
      const library = await ensureLibrary();
      sendJson(res, 200, {
        tracks: library.tracks,
        error: library.error,
        message: library.message,
      });
      return true;
    }

    if (pathname.startsWith('/api/artwork/')) {
      const id = decodeURIComponent(pathname.slice('/api/artwork/'.length));
      let library = await ensureLibrary();
      let filePath = library.byId.get(id);

      if (!filePath) {
        library = await ensureLibrary({ force: true });
        filePath = library.byId.get(id);
      }

      if (!filePath) {
        sendError(res, 404, 'Artwork not found.');
        return true;
      }

      try {
        const artwork = await getArtwork(filePath, id);
        if (!artwork) {
          sendError(res, 404, 'This track has no embedded artwork.');
          return true;
        }

        res.writeHead(200, {
          'Content-Type': artwork.type,
          'Content-Length': artwork.buffer.length,
          'Cache-Control': 'public, max-age=3600',
        });
        res.end(req.method === 'HEAD' ? undefined : artwork.buffer);
      } catch {
        sendError(res, 500, 'Could not read embedded artwork.');
      }

      return true;
    }

    if (pathname.startsWith('/media/')) {
      const filePath = resolveMediaPath(musicRoot(), pathname.slice('/media/'.length));
      if (!filePath) {
        sendError(res, 403, 'Invalid media path.');
        return true;
      }

      const library = await ensureLibrary();
      const isLibraryAudio = [...library.byId.values()].includes(filePath);
      if (!isLibraryAudio) {
        sendError(res, 404, 'Audio file not found.');
        return true;
      }

      await streamAudio(req, res, filePath);
      return true;
    }

    return false;
  }

  function middleware(req, res, next) {
    const remoteAddress = req.socket.remoteAddress;
    const isLoopback =
      remoteAddress === '127.0.0.1' ||
      remoteAddress === '::1' ||
      remoteAddress === '::ffff:127.0.0.1';

    if (
      !isLoopback &&
      ((req.url ?? '').startsWith('/api/') || (req.url ?? '').startsWith('/media/'))
    ) {
      sendError(res, 403, 'The local music API is only available on this device.');
      return;
    }

    handleRequest(req, res)
      .then((handled) => {
        if (!handled) next();
      })
      .catch((error) => {
        if (res.headersSent) {
          res.destroy(error);
          return;
        }
        sendError(res, 500, 'Local music server error.');
      });
  }

  return {
    name: 'orpheus-local-music',
    configureServer(server) {
      server.middlewares.use(middleware);
      server.httpServer?.once('listening', () => {
        console.log(`[orpheus] Reading local music from ${musicRoot()}`);
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use(middleware);
    },
  };
}
