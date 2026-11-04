import { createHash } from 'node:crypto';
import { createReadStream, existsSync } from 'node:fs';
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
const MUSICBRAINZ_URL = (process.env.ORPHEUS_MUSICBRAINZ_URL || 'https://musicbrainz.org').replace(
  /\/$/,
  '',
);
const COVER_ART_URL = (process.env.ORPHEUS_COVERART_URL || 'https://coverartarchive.org').replace(
  /\/$/,
  '',
);
const configuredInterval = Number(process.env.ORPHEUS_MUSICBRAINZ_INTERVAL_MS);
const MUSICBRAINZ_INTERVAL_MS =
  Number.isFinite(configuredInterval) && configuredInterval >= 0 ? configuredInterval : 1100;
const REQUEST_TIMEOUT_MS = 15000;
const MAX_COVER_BYTES = 8 * 1024 * 1024;
const USER_AGENT = 'Orpheus/1.0.0 (local music player; https://github.com/kaene-akim/Orpheus)';
const PLAYLIST_NAME_HINT =
  /\b(best of|playlist|mixtape|mix tape|top \d+|hits|chart|collection|compilation|throwback|party|road trip|workout)\b/i;

let metadataModulePromise = null;
let artworkCache = new Map();
let coverManifest = null;
let coverManifestPromise = null;
let lastMusicBrainzRequestAt = 0;

function metadataModule() {
  metadataModulePromise ??= import('music-metadata');
  return metadataModulePromise;
}

function musicRoot() {
  const configured = process.env.ORPHEUS_MUSIC_DIR;
  return configured ? path.resolve(configured) : path.join(os.homedir(), 'Music');
}

function coversRoot() {
  const configured = process.env.ORPHEUS_MEDIA_DIR;
  return configured
    ? path.resolve(configured, 'covers')
    : path.join(process.cwd(), 'media', 'covers');
}

function relativeFolder(filePath, root) {
  const relative = path.relative(root, path.dirname(filePath));
  return relative.split(path.sep).join('/');
}

function normalizeText(value) {
  return String(value ?? '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

function coverExtension(type) {
  const normalized = String(type ?? '').toLowerCase();
  if (normalized.includes('png')) return 'png';
  if (normalized.includes('webp')) return 'webp';
  if (normalized.includes('gif')) return 'gif';
  return 'jpg';
}

function coverTypeFromFile(file) {
  const extension = path.extname(file).toLowerCase();
  if (extension === '.png') return 'image/png';
  if (extension === '.webp') return 'image/webp';
  if (extension === '.gif') return 'image/gif';
  return 'image/jpeg';
}

async function loadCoverManifest() {
  if (coverManifest) return coverManifest;
  if (!coverManifestPromise) {
    coverManifestPromise = (async () => {
      await fs.mkdir(coversRoot(), { recursive: true });
      try {
        const stored = JSON.parse(
          await fs.readFile(path.join(coversRoot(), 'manifest.json'), 'utf8'),
        );
        coverManifest = {
          version: 2,
          tracks: stored && typeof stored.tracks === 'object' ? stored.tracks : {},
          albums: stored && typeof stored.albums === 'object' ? stored.albums : {},
        };
      } catch {
        coverManifest = { version: 2, tracks: {}, albums: {} };
      }
      return coverManifest;
    })().finally(() => {
      coverManifestPromise = null;
    });
  }
  return coverManifestPromise;
}

async function saveCoverManifest() {
  if (!coverManifest) return;
  await fs.mkdir(coversRoot(), { recursive: true });
  const target = path.join(coversRoot(), 'manifest.json');
  const temporary = `${target}.tmp`;
  await fs.writeFile(temporary, `${JSON.stringify(coverManifest, null, 2)}\n`, 'utf8');
  await fs.rename(temporary, target);
}

function albumCacheKey(track) {
  const album = track.albumTag;
  const artist = track.albumArtist || primaryArtist(track);
  if (!album || !artist) return null;
  // Playlist downloaders often rewrite every track's album tag to the folder
  // name. Those are separate songs, so only share a cover when the tag names a
  // real album outside the playlist folder.
  if (normalizeText(album) === normalizeText(track.folderName)) return null;
  return `${normalizeText(artist)}\u0000${normalizeText(album)}`;
}

function cachedCoverEntry(entry, manifest) {
  if (!entry?.file) return null;
  const file = path.join(coversRoot(), entry.file);
  if (!existsSync(file)) return null;
  return {
    url: `/api/covers/${encodeURIComponent(entry.file)}`,
    type: entry.type || coverTypeFromFile(entry.file),
    file,
    entry,
  };
}

function cachedCover(trackId, manifest) {
  return cachedCoverEntry(manifest?.tracks?.[trackId], manifest);
}

function cachedAlbumCover(track, manifest) {
  const key = albumCacheKey(track);
  if (!key) return null;
  return cachedCoverEntry(manifest?.albums?.[key], manifest);
}

function cachedCoverForTrack(track, manifest) {
  return cachedCover(track.id, manifest) ?? cachedAlbumCover(track, manifest);
}

function mostCommon(values) {
  const counts = new Map();
  values.forEach((value) => {
    const key = normalizeText(value);
    if (!key) return;
    const existing = counts.get(key);
    if (existing) existing.count += 1;
    else counts.set(key, { value, count: 1 });
  });
  let best = null;
  counts.forEach((entry) => {
    if (!best || entry.count > best.count) best = entry;
  });
  return best?.value ?? null;
}

function trackFileName(track) {
  const encoded = String(track?.src ?? '').split('/').pop() ?? '';
  try {
    return decodeURIComponent(encoded);
  } catch {
    return String(track?.title ?? '');
  }
}

// A folder is treated as a playlist when its tracks point at different albums,
// or when it is a large multi-artist collection whose album tag is just the
// folder name (a common shape for downloaded playlists).
function buildFolderPlaylists(tracks) {
  const folders = new Map();

  tracks.forEach((track) => {
    if (!track.folder) return;
    const list = folders.get(track.folder);
    if (list) list.push(track);
    else folders.set(track.folder, [track]);
  });

  const playlists = [];

  folders.forEach((list, folder) => {
    if (list.length < 2) return;

    const folderName = list[0].folderName || path.posix.basename(folder);
    const albumTags = list.map((track) => track.albumTag).filter(Boolean);
    const distinctAlbums = new Set(albumTags.map(normalizeText).filter(Boolean));
    const distinctArtists = new Set(
      list.flatMap((track) => (track.artists?.length ? track.artists : [track.artist]))
        .map(normalizeText)
        .filter(Boolean),
    );
    const dominantAlbum = mostCommon(albumTags);

    const mixedAlbums =
      distinctAlbums.size >= 2 && (albumTags.length === list.length || distinctAlbums.size >= 3);
    const hintedCollection =
      PLAYLIST_NAME_HINT.test(folderName) &&
      list.length >= 4 &&
      distinctArtists.size >= 3;
    const compilationFolder =
      Boolean(dominantAlbum) &&
      normalizeText(dominantAlbum) === normalizeText(folderName) &&
      list.length >= 8 &&
      distinctArtists.size >= 5;

    if (!mixedAlbums && !hintedCollection && !compilationFolder) return;

    const ordered = [...list].sort((left, right) =>
      trackFileName(left).localeCompare(trackFileName(right), undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
    );

    playlists.push({
      id: `folder:${trackId(folder)}`,
      type: 'playlist',
      name: folderName,
      folder,
      automatic: true,
      trackIds: ordered.map((track) => track.id),
    });
  });

  return playlists.sort((left, right) => left.name.localeCompare(right.name));
}

function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function musicBrainzJson(pathname) {
  const elapsed = Date.now() - lastMusicBrainzRequestAt;
  if (elapsed < MUSICBRAINZ_INTERVAL_MS) await wait(MUSICBRAINZ_INTERVAL_MS - elapsed);
  lastMusicBrainzRequestAt = Date.now();

  const response = await fetch(`${MUSICBRAINZ_URL}${pathname}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
  if (!response.ok) throw new Error(`MusicBrainz returned ${response.status}`);
  return response.json();
}

async function readImageResponse(response) {
  if (!response.ok) return null;
  const type = response.headers.get('content-type') ?? '';
  if (!type.startsWith('image/')) return null;

  const length = Number(response.headers.get('content-length') ?? 0);
  if (Number.isFinite(length) && length > MAX_COVER_BYTES) return null;

  const buffer = Buffer.from(await response.arrayBuffer());
  if (!buffer.length || buffer.length > MAX_COVER_BYTES) return null;

  return { buffer, type };
}

async function fetchCoverArt(pathname) {
  try {
    const response = await fetch(`${COVER_ART_URL}${pathname}`, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    return await readImageResponse(response);
  } catch {
    return null;
  }
}

async function coverFromRelease(release) {
  if (!release) return null;

  if (release.id) {
    const cover = await fetchCoverArt(`/release/${encodeURIComponent(release.id)}/front-500`);
    if (cover) return cover;
  }

  if (release['release-group']?.id) {
    const cover = await fetchCoverArt(
      `/release-group/${encodeURIComponent(release['release-group'].id)}/front-500`,
    );
    if (cover) return cover;
  }

  return null;
}

function primaryArtist(track) {
  return (
    (Array.isArray(track.artists) && track.artists.find(Boolean)) ||
    track.albumArtist ||
    track.artist ||
    ''
  );
}

function releaseDate(release) {
  return (
    release?.date ||
    release?.['release-group']?.['first-release-date'] ||
    '9999-99-99'
  );
}

// A recording usually appears on several releases (the single, the album, and
// later compilations). Prefer the release that matches the track's album tag,
// then official singles/albums over compilations, and fall back to the oldest
// release so playlists don't inherit a random compilation cover.
function releaseScore(release, album) {
  if (!release) return -1000;
  const group = release['release-group'] ?? {};
  const primary = String(group['primary-type'] ?? '').toLowerCase();
  const secondary = (group['secondary-types'] ?? []).map((type) =>
    String(type).toLowerCase(),
  );

  let score = 0;
  const albumKey = normalizeText(album);
  if (albumKey) {
    const releaseTitle = normalizeText(release.title);
    const groupTitle = normalizeText(group.title);
    if (releaseTitle === albumKey || groupTitle === albumKey) score += 100;
  }

  if (primary === 'single') score += albumKey ? 20 : 60;
  else if (primary === 'album') score += albumKey ? 15 : 35;
  else if (primary === 'ep') score += 25;
  else if (primary === 'broadcast') score += 10;

  if (
    secondary.some((type) =>
      ['compilation', 'live', 'demo', 'dj-mix', 'mixtape/street', 'remix'].includes(type),
    )
  ) {
    score -= 60;
  }

  const status = String(release.status ?? '').toLowerCase();
  if (status === 'official') score += 15;
  else if (status) score -= 10;

  return score;
}

function rankReleases(releases, album) {
  return [...releases].sort((left, right) => {
    const diff = releaseScore(right, album) - releaseScore(left, album);
    if (diff) return diff;
    return releaseDate(left).localeCompare(releaseDate(right));
  });
}

async function findCoverForTrack(track) {
  const artist = primaryArtist(track);
  const title = track.title;
  if (!artist || !title) return null;

  const album =
    track.albumTag && normalizeText(track.albumTag) !== normalizeText(track.folderName)
      ? track.albumTag
      : null;
  const query = [`recording:"${title}"`, `artist:"${artist}"`];
  if (album) query.push(`release:"${album}"`);

  const search = await musicBrainzJson(
    `/ws/2/recording/?query=${encodeURIComponent(query.join(' AND '))}&fmt=json&limit=5`,
  );

  const recordings = Array.isArray(search.recordings) ? search.recordings : [];
  const releases = [];
  const seen = new Set();
  for (const recording of recordings) {
    for (const release of recording.releases ?? []) {
      if (!release?.id || seen.has(release.id)) continue;
      seen.add(release.id);
      releases.push(release);
    }
  }

  for (const release of rankReleases(releases, album)) {
    const cover = await coverFromRelease(release);
    if (cover) return cover;
  }

  if (!album) return null;

  const releaseSearch = await musicBrainzJson(
    `/ws/2/release/?query=${encodeURIComponent(
      `release:"${album}" AND artist:"${artist}"`,
    )}&fmt=json&limit=5`,
  );
  for (const release of rankReleases(releaseSearch.releases ?? [], album)) {
    const cover = await coverFromRelease(release);
    if (cover) return cover;
  }

  return null;
}

async function fetchMissingPlaylistCovers(playlists, tracks, byId) {
  const manifest = await loadCoverManifest();
  // The media folder can be removed while the server is running, so make sure
  // it exists before writing any covers back into it.
  await fs.mkdir(coversRoot(), { recursive: true });
  const byTrackId = new Map(tracks.map((track) => [track.id, track]));
  const targets = new Map();

  playlists.forEach((playlist) => {
    playlist.trackIds.forEach((id) => {
      if (targets.has(id)) return;
      const track = byTrackId.get(id);
      if (track && byId.has(id)) targets.set(id, track);
    });
  });

  let fetched = 0;
  let linked = 0;
  let skipped = 0;
  let missing = 0;
  let failed = 0;
  const changed = [];

  for (const [id, track] of targets) {
    if (cachedCover(id, manifest)) {
      skipped += 1;
      continue;
    }

    const albumKey = albumCacheKey(track);
    const albumCover = albumKey ? cachedCoverEntry(manifest.albums[albumKey], manifest) : null;
    if (albumCover) {
      manifest.tracks[id] = { ...albumCover.entry };
      linked += 1;
      changed.push({
        id,
        artwork: albumCover.url,
        artworkType: albumCover.type,
      });
      await saveCoverManifest();
      continue;
    }

    try {
      const cover = await findCoverForTrack(track);
      if (!cover) {
        missing += 1;
        continue;
      }

      const hash = createHash('sha1').update(cover.buffer).digest('hex').slice(0, 20);
      const file = `${hash}.${coverExtension(cover.type)}`;
      const target = path.join(coversRoot(), file);
      if (!existsSync(target)) await fs.writeFile(target, cover.buffer);

      const entry = {
        file,
        type: cover.type,
        title: track.title,
        artist: track.artist,
        album: track.album,
        fetchedAt: new Date().toISOString(),
      };
      manifest.tracks[id] = entry;
      if (albumKey) manifest.albums[albumKey] = entry;
      await saveCoverManifest();
      artworkCache.delete(id);
      fetched += 1;
      changed.push({
        id,
        artwork: `/api/covers/${encodeURIComponent(file)}`,
        artworkType: cover.type,
      });
    } catch {
      failed += 1;
    }
  }

  return { fetched, linked, skipped, missing, failed, changed };
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

async function readTrack(filePath, root, cache, nextCache, coverManifest) {
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
  const folder = relativeFolder(filePath, root);
  const folderName = path.basename(path.dirname(filePath));
  const id = trackId(relativePath);

  const pictures = common.picture ?? [];
  const embeddedCover = pictures.find((item) => /front/i.test(item.type ?? '')) ?? pictures[0];
  const artist = common.artist?.trim() || common.albumartist?.trim() || 'Unknown artist';
  const taggedArtists = Array.isArray(common.artists)
    ? common.artists.map((name) => String(name ?? '').trim()).filter(Boolean)
    : [];
  const albumTag = common.album?.trim() || null;

  const track = {
    id,
    title: common.title?.trim() || path.basename(filePath, extensionOf(filePath)),
    artist,
    // Keep the exact tag around so the client can split combined feature
    // strings without losing the display name.
    artists: taggedArtists.length ? [...new Set(taggedArtists)] : [artist],
    albumArtist:
      common.albumartist?.trim() || common.artist?.trim() || 'Unknown artist',
    album: albumTag || folderName || 'Unknown album',
    albumTag,
    folder,
    folderName,
    src: mediaUrl(relativePath),
    duration: Number.isFinite(format.duration) ? format.duration : undefined,
    trackNumber: Number.isFinite(common.track?.no) ? common.track.no : null,
    discNumber: Number.isFinite(common.disk?.no) ? common.disk.no : null,
    year: Number.isFinite(common.year) ? common.year : null,
    hasArtwork: false,
  };

  const cover = cachedCoverForTrack(track, coverManifest);
  track.hasArtwork = Boolean(cover || embeddedCover);
  if (cover) {
    track.artwork = cover.url;
    track.artworkType = cover.type;
  } else if (embeddedCover) {
    track.artwork = `/api/artwork/${id}`;
    track.artworkType = embeddedCover.format || 'image/jpeg';
  }

  nextCache.set(filePath, { mtimeMs: stat.mtimeMs, size: stat.size, track });
  return track;
}

export function createLocalMusicPlugin() {
  let cache = new Map();
  let snapshot = {
    root: musicRoot(),
    tracks: [],
    playlists: [],
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
        playlists: [],
        byId: new Map(),
        error: 'Music folder not found.',
        message: null,
      };
    }

    if (!stat.isDirectory()) {
      return {
        root,
        tracks: [],
        playlists: [],
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
        playlists: [],
        byId: new Map(),
        error: null,
        message: 'No audio files found in the music folder.',
      };
    }

    const manifest = await loadCoverManifest();
    const nextCache = new Map();
    const byId = new Map();
    const tracks = await mapLimit(files, 6, async (filePath) => {
      const track = await readTrack(filePath, root, cache, nextCache, manifest);
      byId.set(track.id, filePath);
      return track;
    });

    cache = nextCache;
    const sortedTracks = sortTracks(tracks);

    return {
      root,
      tracks: sortedTracks,
      playlists: buildFolderPlaylists(sortedTracks),
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
        playlists: library.playlists,
        error: library.error,
        message: library.message,
      });
      return true;
    }

    if (pathname === '/api/covers/fetch') {
      if (req.method !== 'POST') {
        sendError(res, 405, 'Use POST to fetch playlist covers.');
        return true;
      }

      const library = await ensureLibrary();
      if (!library.playlists.length) {
        sendJson(res, 200, {
          fetched: 0,
          linked: 0,
          skipped: 0,
          missing: 0,
          failed: 0,
          changed: [],
          message: 'No playlist folders were found.',
        });
        return true;
      }

      try {
        const result = await fetchMissingPlaylistCovers(
          library.playlists,
          library.tracks,
          library.byId,
        );
        // Force the next scan to pick up the new cover paths.
        cache = new Map();
        artworkCache = new Map();
        lastScanAt = 0;
        sendJson(res, 200, result);
      } catch {
        sendError(res, 500, 'Could not fetch playlist covers.');
      }
      return true;
    }

    if (pathname.startsWith('/api/covers/')) {
      let file;
      try {
        file = decodeURIComponent(pathname.slice('/api/covers/'.length));
      } catch {
        sendError(res, 400, 'Invalid cover path.');
        return true;
      }

      if (!file || file.includes('/') || file.includes('\\') || file.startsWith('.')) {
        sendError(res, 404, 'Cover not found.');
        return true;
      }

      const target = path.join(coversRoot(), file);
      if (!isInside(coversRoot(), target)) {
        sendError(res, 403, 'Invalid cover path.');
        return true;
      }

      try {
        const buffer = await fs.readFile(target);
        res.writeHead(200, {
          'Content-Type': coverTypeFromFile(file),
          'Content-Length': buffer.length,
          'Cache-Control': 'public, max-age=3600',
        });
        res.end(req.method === 'HEAD' ? undefined : buffer);
      } catch {
        sendError(res, 404, 'Cover not found.');
      }
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
