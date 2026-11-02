import { parseBlob } from 'music-metadata';

export const DEFAULT_ARTWORK = '/assets/images/default-album-art.svg';

const MIME_BY_EXTENSION = {
  avif: 'image/avif',
  gif: 'image/gif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  webp: 'image/webp',
};

function extensionOf(value = '') {
  const clean = String(value).split('?')[0].split('#')[0];
  const match = clean.match(/\.([a-z0-9]+)$/i);
  return match ? match[1].toLowerCase() : '';
}

function mimeFromUrl(url = '') {
  return MIME_BY_EXTENSION[extensionOf(url)] ?? 'image/jpeg';
}

function isMp3(track) {
  return extensionOf(track?.src) === 'mp3';
}

function cacheKey(track) {
  return `${track?.id ?? ''}|${track?.src ?? ''}`;
}

// ID3v2 sizes are stored as four "syncsafe" bytes: seven usable bits each.
function readSyncSafeInteger(bytes, offset) {
  return (
    ((bytes[offset] & 0x7f) << 21) |
    ((bytes[offset + 1] & 0x7f) << 14) |
    ((bytes[offset + 2] & 0x7f) << 7) |
    (bytes[offset + 3] & 0x7f)
  );
}

async function fetchRange(url, start, end) {
  const response = await fetch(url, {
    headers: { Range: `bytes=${start}-${end}` },
  });

  if (!response.ok && response.status !== 206) {
    throw new Error(`Artwork request failed with ${response.status}`);
  }

  return {
    bytes: new Uint8Array(await response.arrayBuffer()),
    // A 200 means the server ignored the Range header and sent the whole file.
    wholeFile: response.status === 200,
  };
}

function pickFrontPicture(pictures) {
  if (!Array.isArray(pictures) || !pictures.length) return null;
  return pictures.find((picture) => /front/i.test(picture.type ?? '')) ?? pictures[0];
}

async function readEmbeddedArtwork(track) {
  if (!isMp3(track)) return null;

  // Read only the ID3 header first so files with large embedded covers do not
  // require downloading the audio data just to find the tag size.
  const head = await fetchRange(track.src, 0, 9);
  if (head.bytes.length < 10) return null;

  const hasId3 =
    head.bytes[0] === 0x49 && // I
    head.bytes[1] === 0x44 && // D
    head.bytes[2] === 0x33; // 3
  if (!hasId3) return null;

  if (head.wholeFile) {
    return parsePicture(head.bytes);
  }

  const tagSize = readSyncSafeInteger(head.bytes, 6);
  const footerSize = head.bytes[5] & 0x10 ? 10 : 0;
  const totalSize = 10 + tagSize + footerSize;

  const tag = await fetchRange(track.src, 0, Math.max(totalSize - 1, 9));
  return parsePicture(tag.bytes);
}

async function parsePicture(bytes) {
  const metadata = await parseBlob(new Blob([bytes], { type: 'audio/mpeg' }));
  const picture = pickFrontPicture(metadata.common.picture);
  if (!picture?.data) return null;

  const blob = new Blob([picture.data], {
    type: picture.format || 'image/jpeg',
  });

  return {
    url: URL.createObjectURL(blob),
    type: blob.type || 'image/jpeg',
    objectUrl: true,
  };
}

/**
 * Resolves track artwork without requiring separate cover files.
 *
 * Order of preference:
 * 1. An explicit `track.artwork` path.
 * 2. Artwork embedded in the MP3's ID3 tag (APIC frame), read with a range
 *    request so the audio itself is not downloaded.
 * 3. The bundled default artwork.
 */
export function createArtworkService({ defaultArtwork = DEFAULT_ARTWORK } = {}) {
  const cache = new Map();
  const listeners = new Set();
  const objectUrls = new Set();

  function describe(track) {
    if (!track) return { url: defaultArtwork, type: mimeFromUrl(defaultArtwork) };
    if (track.artwork) {
      return {
        url: track.artwork,
        type: track.artworkType || mimeFromUrl(track.artwork),
      };
    }

    const entry = cache.get(cacheKey(track));
    if (entry?.artwork) return entry.artwork;
    return { url: defaultArtwork, type: mimeFromUrl(defaultArtwork) };
  }

  function urlFor(track) {
    return describe(track).url;
  }

  function resolve(track) {
    if (!track) return Promise.resolve(describe(null));
    if (track.artwork) return Promise.resolve(describe(track));

    const key = cacheKey(track);
    const existing = cache.get(key);
    if (existing) return existing.promise;

    const entry = { artwork: null, promise: null };
    entry.promise = readEmbeddedArtwork(track)
      .then((artwork) => {
        if (artwork) objectUrls.add(artwork.url);
        entry.artwork = artwork ?? {
          url: defaultArtwork,
          type: mimeFromUrl(defaultArtwork),
        };
        listeners.forEach((listener) => listener(track, entry.artwork));
        return entry.artwork;
      })
      .catch(() => {
        entry.artwork = {
          url: defaultArtwork,
          type: mimeFromUrl(defaultArtwork),
        };
        listeners.forEach((listener) => listener(track, entry.artwork));
        return entry.artwork;
      });

    cache.set(key, entry);
    return entry.promise;
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  function release() {
    objectUrls.forEach((url) => URL.revokeObjectURL(url));
    objectUrls.clear();
    cache.clear();
    listeners.clear();
  }

  return { defaultArtwork, describe, urlFor, resolve, subscribe, release };
}
