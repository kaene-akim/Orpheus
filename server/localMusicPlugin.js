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
const DOWNLOADER_ARTIST_HINT =
  /(?:^|[\s/])(?:www\.)?[a-z0-9-]+\.(?:com|net|org|io|co|me|ru|to|cc|info|xyz)(?:$|[\s/])|songs?lover|mp3|download/i;
const MUSICBRAINZ_RETRY_LIMIT = 3;
const COVER_ART_RETRY_LIMIT = 2;
const RETRY_BASE_MS = 1500;
const LYRICS_URL = (process.env.ORPHEUS_LYRICS_URL || 'https://lrclib.net').replace(/\/$/, '');
const LYRICS_FALLBACK_URL = (
  process.env.ORPHEUS_LYRICS_FALLBACK_URL || 'https://api.lyrics.ovh'
).replace(/\/$/, '');
const LYRICS_FALLBACK_SOURCE = (() => {
  try {
    return new URL(LYRICS_FALLBACK_URL).hostname.replace(/^api\./, '') || 'backup service';
  } catch {
    return 'backup service';
  }
})();
const LYRICS_TIMEOUT_MS = 6000;
const LYRICS_BUDGET_MS = 9000;
const LYRICS_FALLBACK_TIMEOUT_MS = 7000;
const LYRICS_CACHE_LIMIT = 300;
const LYRICS_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const LYRICS_MISS_TTL_MS = 5 * 60 * 1000;
const LYRICS_MAX_LINES = 2000;
const LYRICS_MIN_INTERVAL_MS = 200;

let metadataModulePromise = null;
let artworkCache = new Map();
let coverManifest = null;
let coverManifestPromise = null;
let lastMusicBrainzRequestAt = 0;
let musicBrainzCooldownUntil = 0;
let lyricsCache = new Map();
let lastLyricsRequestAt = 0;
// Shared progress for the long-running cover fetch so the settings panel can
// show that work is still happening instead of looking stuck.
let coverFetchJob = null;

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

// Folder and album names are often decorated differently ("Best of 2024 -
// Part 1" vs "Best of 2024 - Part 1 - (SongsLover.com)"), so compare a version
// with punctuation collapsed as well as the exact text.
function foldText(value) {
  return normalizeText(value)
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function isDownloaderArtist(value) {
  return DOWNLOADER_ARTIST_HINT.test(String(value ?? ''));
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
  // Playlist downloaders often put a fake collection name in the album tag.
  // Those tracks are separate songs, so they must not share one cover.
  if (track.albumIsPlaylistTag) return null;

  const album = track.albumTag;
  // Album artist tags from download sites are not useful for grouping. Fall
  // back to the actual track artist so different songs do not collide.
  const taggedArtist = track.albumArtist;
  const artist = isDownloaderArtist(taggedArtist)
    ? primaryArtist(track)
    : taggedArtist || primaryArtist(track);
  if (!album || !artist) return null;
  return `${normalizeText(artist)}\u0000${normalizeText(album)}`;
}

// Decide whether a playlist track's album tag describes a real release or just
// the playlist/collection it was downloaded from.
function isPlaylistAlbumTag(track, artistsByAlbum) {
  const album = track.albumTag;
  if (!album) return false;

  const albumName = foldText(album);
  const folderName = foldText(track.folderName);
  if (
    albumName &&
    folderName &&
    (albumName === folderName ||
      folderName.startsWith(`${albumName} `) ||
      albumName.startsWith(`${folderName} `))
  ) {
    return true;
  }

  const artists = artistsByAlbum.get(normalizeText(album));
  if (artists && artists.size >= 2) return true;

  // A playlist-style album name inside a playlist-style folder is almost
  // always a collection tag rather than a real album.
  return PLAYLIST_NAME_HINT.test(album) && PLAYLIST_NAME_HINT.test(track.folderName);
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

function applyTrackArtwork(track, manifest) {
  const cover = cachedCoverForTrack(track, manifest);
  if (cover) {
    track.hasArtwork = true;
    track.artwork = cover.url;
    track.artworkType = cover.type;
    return;
  }

  const embedded =
    track.embeddedArtwork ??
    (String(track.artwork ?? '').startsWith('/api/artwork/') ? track.artwork : null);
  if (embedded) {
    track.hasArtwork = true;
    track.artwork = embedded;
    track.artworkType = track.embeddedArtworkType || 'image/jpeg';
    return;
  }

  track.hasArtwork = false;
  delete track.artwork;
  delete track.artworkType;
}

// Playlist folders need a second pass: the folder has to be classified before
// we can tell whether an album tag is a real release or just the playlist name.
function annotatePlaylistAlbums(tracks, playlists, manifest) {
  const byId = new Map(tracks.map((track) => [track.id, track]));
  const flags = new Map();

  playlists.forEach((playlist) => {
    const list = playlist.trackIds
      .map((id) => byId.get(id))
      .filter(Boolean);
    const artistsByAlbum = new Map();

    list.forEach((track) => {
      if (!track.albumTag) return;
      const key = normalizeText(track.albumTag);
      let artists = artistsByAlbum.get(key);
      if (!artists) {
        artists = new Set();
        artistsByAlbum.set(key, artists);
      }
      artists.add(normalizeText(primaryArtist(track)));
    });

    list.forEach((track) => {
      if (flags.has(track.id)) return;
      flags.set(track.id, isPlaylistAlbumTag(track, artistsByAlbum));
    });
  });

  tracks.forEach((track) => {
    track.albumIsPlaylistTag = flags.get(track.id) ?? false;
    applyTrackArtwork(track, manifest);
  });
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
    // Some downloaders tag every file with a collection name instead of the
    // real album. Recognise that shape even when the folder name alone looks
    // harmless.
    const collectionAlbum =
      Boolean(dominantAlbum) &&
      normalizeText(dominantAlbum) !== normalizeText(folderName) &&
      PLAYLIST_NAME_HINT.test(dominantAlbum) &&
      list.length >= 4 &&
      distinctArtists.size >= 3;

    if (!mixedAlbums && !hintedCollection && !compilationFolder && !collectionAlbum) {
      return;
    }

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

function retryAfterMs(response) {
  if (!response) return null;
  const header = response.headers.get('retry-after');
  if (!header) return null;

  const seconds = Number(header);
  if (Number.isFinite(seconds)) return Math.max(0, seconds * 1000);

  const date = Date.parse(header);
  if (Number.isFinite(date)) return Math.max(0, date - Date.now());
  return null;
}

function retryDelay(attempt, response) {
  return retryAfterMs(response) ?? Math.min(RETRY_BASE_MS * 2 ** attempt, 30000);
}

async function waitForMusicBrainzSlot() {
  const earliest = Math.max(
    lastMusicBrainzRequestAt + MUSICBRAINZ_INTERVAL_MS,
    musicBrainzCooldownUntil,
  );
  const delay = earliest - Date.now();
  if (delay > 0) await wait(delay);
  lastMusicBrainzRequestAt = Date.now();
}

async function musicBrainzJson(pathname) {
  let lastError = null;

  for (let attempt = 0; attempt <= MUSICBRAINZ_RETRY_LIMIT; attempt += 1) {
    await waitForMusicBrainzSlot();

    let response;
    try {
      response = await fetch(`${MUSICBRAINZ_URL}${pathname}`, {
        headers: {
          Accept: 'application/json',
          'User-Agent': USER_AGENT,
        },
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      });
    } catch (error) {
      lastError = error;
      if (attempt >= MUSICBRAINZ_RETRY_LIMIT) break;
      musicBrainzCooldownUntil = Math.max(
        musicBrainzCooldownUntil,
        Date.now() + retryDelay(attempt),
      );
      continue;
    }

    if (response.ok) return response.json();

    lastError = new Error(`MusicBrainz returned ${response.status}`);
    if (
      (response.status !== 429 && response.status !== 503 && response.status < 500) ||
      attempt >= MUSICBRAINZ_RETRY_LIMIT
    ) {
      break;
    }

    musicBrainzCooldownUntil = Math.max(
      musicBrainzCooldownUntil,
      Date.now() + retryDelay(attempt, response),
    );
  }

  throw lastError ?? new Error('MusicBrainz request failed.');
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

async function fetchCoverArt(pathname, attempt = 0) {
  let response;
  try {
    response = await fetch(`${COVER_ART_URL}${pathname}`, {
      headers: { 'User-Agent': USER_AGENT },
      redirect: 'follow',
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
  } catch {
    if (attempt >= COVER_ART_RETRY_LIMIT) return null;
    await wait(Math.min(1000 * 2 ** attempt, 10000));
    return fetchCoverArt(pathname, attempt + 1);
  }

  if (response.ok) {
    try {
      return await readImageResponse(response);
    } catch {
      return null;
    }
  }

  if (
    (response.status === 429 || response.status >= 500) &&
    attempt < COVER_ART_RETRY_LIMIT
  ) {
    const delay = retryAfterMs(response) ?? Math.min(1000 * 2 ** attempt, 10000);
    await wait(delay);
    return fetchCoverArt(pathname, attempt + 1);
  }

  return null;
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

function luceneEscape(value) {
  return String(value ?? '').replace(/[\\"]/g, '\\$&');
}

// Downloader sites bake their name into the title tag, e.g.
// "Money Trees (Feat. Jay Rock) - SongsLover.com". Those words are not part of
// the song title, so leaving them in makes exact lyric searches return nothing.
const DOWNLOAD_SITE =
  '(?:songs?lover|pagalworld|mr-?jatt|djmaza|downloadming|minglebox|wapking|naasongs|sensongs|kuttyweb|isaimini|masstamilan|starmusiq|songspk|beemp3|emp3world|mp3juices|zippyshare|mp3download|320kbps)';
const DOWNLOAD_SITE_DOMAIN = `(?:www\\.)?${DOWNLOAD_SITE}(?:\\.[a-z0-9-]+)+`;

function stripDownloadSite(title) {
  let text = String(title ?? '');
  // "(SongsLover.com)", "[www.pagalworld.co.uk]", " - (SongsLover.com)", ...
  text = text.replace(
    new RegExp(`\\s*[([{]\\s*${DOWNLOAD_SITE_DOMAIN}\\s*[)\\]}]`, 'gi'),
    ' ',
  );
  text = text.replace(
    new RegExp(`\\s*[-–—]\\s*\\(?\\s*${DOWNLOAD_SITE_DOMAIN}\\s*\\)?\\s*$`, 'gi'),
    '',
  );
  text = text.replace(new RegExp(`\\s*\\(?\\s*${DOWNLOAD_SITE_DOMAIN}\\s*\\)?\\s*$`, 'gi'), '');
  // Generic " - SomeSite.com" suffix, but only after a dash or in brackets so
  // real titles such as "Mr. Brightside" are left alone.
  text = text.replace(/\s*[-–—]\s*\(?\s*(?:www\.)?[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)+\s*\)?\s*$/i, '');
  text = text.replace(/\s*[([{]\s*(?:www\.)?[a-z0-9][a-z0-9-]*(?:\.[a-z0-9-]+)+\.[a-z]{2,}\s*[)\]}]/gi, ' ');
  return text
    .replace(/\s+/g, ' ')
    .replace(/^[\s\-–—:|]+|[\s\-–—:|]+$/g, '')
    .trim();
}

function stripFeatDecorations(title) {
  return String(title ?? '')
    .replace(/\s*[([{]\s*(?:feat\.?|ft\.?|featuring|with)\s+[^)\]}]+[)\]}]\s*/gi, ' ')
    .replace(/\s*[-–—]?\s*(?:feat\.?|ft\.?|featuring)\s+.+$/i, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Downloader tags often keep "feat. ..." in the title even though MusicBrainz
// stores the base title. Try the exact title first, then the cleaned one.
function titleVariants(title) {
  const raw = String(title ?? '').trim();
  if (!raw) return [];
  const cleaned = stripDownloadSite(raw);
  const withoutFeat = stripFeatDecorations(cleaned);
  return [...new Set([raw, cleaned, withoutFeat].filter(Boolean))];
}

function cleanAlbumName(album) {
  const cleaned = stripDownloadSite(album);
  const withoutEdition = cleaned
    .replace(
      /\s*[([{][^)\]}]*\b(?:deluxe|target|exclusive|edition|version|remaster(?:ed)?|explicit|bonus)\b[^)\]}]*[)\]}]/gi,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim();
  return withoutEdition || cleaned;
}

// Titles that will be tried against lyric services, most specific first.
// Leading artist names ("Jack Harlow - Lovin On Me") and marketing suffixes
// ("(Bonus Track)", "(Single Version)") are removed after the exact forms.
function lyricTitleVariants(track) {
  const raw = String(track?.title ?? '').trim();
  if (!raw) return [];
  const clean = stripDownloadSite(raw);
  const covers = [];

  const artist = primaryArtist(track);
  if (artist && clean.toLowerCase().startsWith(`${artist.toLowerCase()} - `)) {
    covers.push(clean.slice(artist.length + 3).trim());
  }

  covers.push(clean);

  // "Im Good - Blue REAPER Remix - David Guetta, Bebe Rexha" is really just
  // "Im Good" with a remix name and credits appended. Add the base title as a
  // search variant when the tail looks like remix/artist metadata.
  const dashParts = clean.split(/\s+[-–—]\s+/);
  const dashTail = dashParts.slice(1).join(' ');
  if (
    dashParts.length > 2 ||
    (dashParts.length === 2 &&
      /(?:remix|version|edit|remaster|mix|feat\.?|ft\.?)/i.test(dashTail))
  ) {
    covers.push(dashParts[0].trim());
  }

  const withoutFeat = stripFeatDecorations(clean);
  covers.push(withoutFeat);
  const withoutEdition = withoutFeat
    .replace(
      /\s*[([{]\s*(?:bonus(?: track)?|explicit|clean|deluxe(?: edition| version)?|remaster(?:ed)?(?: \d{4})?|album version|single version|radio edit|from [^)\]}]+)\s*[)\]}]/gi,
      ' ',
    )
    .replace(/\s+/g, ' ')
    .trim();
  covers.push(withoutEdition);

  return [...new Set(covers.filter(Boolean))];
}

// A combined artist tag such as "Future & Metro Boomin" does not always match
// the lyric database's artist field, so try individual names before combined
// tags. "¥$, Kanye West, ..." therefore searches for "Kanye West" early.
function lyricArtistVariants(track) {
  const primary = primaryArtist(track);
  const arrayArtists = Array.isArray(track?.artists) ? track.artists : [];
  const rawArtists = [primary, ...arrayArtists, track?.artist, track?.albumArtist].filter(
    Boolean,
  );
  const ordered = [];

  if (primary) {
    const parts = artistVariants(primary).filter((variant) => variant !== primary);
    if (parts.length) ordered.push(...parts);
    else ordered.push(primary);
  }

  arrayArtists.forEach((artist) => {
    if (artist === primary) return;
    artistVariants(artist).forEach((variant) => ordered.push(variant));
  });
  rawArtists.forEach((artist) => {
    artistVariants(artist).forEach((variant) => {
      if (variant !== artist) ordered.push(variant);
    });
  });
  rawArtists.forEach((artist) => ordered.push(artist));

  return [...new Set(ordered.filter(Boolean))].slice(0, 6);
}

// Lyrics come from LRCLIB, an open lyrics API with time-stamped (LRC) text.
// The server does the lookup so the browser never has to talk to a third party
// directly and so results can be cached between fullscreen visits.
function parseSyncedLyrics(text) {
  const timestamp = /\[(\d{1,3}):(\d{2})(?:[.:](\d{1,3}))?\]/g;
  const lines = [];

  String(text ?? '')
    .split(/\r?\n/)
    .forEach((raw) => {
      const textPart = raw.replace(timestamp, '').trim();
      if (!textPart) return;

      const stamps = [];
      timestamp.lastIndex = 0;
      let match;
      while ((match = timestamp.exec(raw))) {
        const minutes = Number(match[1]);
        const seconds = Number(match[2]);
        const fraction = match[3] ? Number(`0.${match[3]}`) : 0;
        if (Number.isFinite(minutes) && Number.isFinite(seconds)) {
          stamps.push(minutes * 60 + seconds + fraction);
        }
      }

      stamps.forEach((time) => {
        lines.push({ time: Math.round(time * 100) / 100, text: textPart });
      });
    });

  lines.sort((left, right) => left.time - right.time);
  return lines.slice(0, LYRICS_MAX_LINES);
}

function plainLyricsLines(text) {
  return String(text ?? '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, LYRICS_MAX_LINES)
    .map((text) => ({ time: null, text }));
}

function normalizeLyricsResult(value, track) {
  const source = value?.source ?? 'LRCLIB';
  if (!value || value.instrumental) {
    return {
      found: Boolean(value),
      instrumental: Boolean(value?.instrumental),
      synced: false,
      lines: [],
      source,
      trackName: value?.trackName ?? track.title,
      artistName: value?.artistName ?? primaryArtist(track),
      albumName: value?.albumName ?? null,
      duration: value?.duration ?? null,
      message: value?.instrumental ? 'This track is instrumental.' : 'No lyrics found for this song.',
    };
  }

  const synced = parseSyncedLyrics(value.syncedLyrics);
  const lines = synced.length ? synced : plainLyricsLines(value.plainLyrics);
  if (!lines.length) {
    return {
      found: false,
      instrumental: false,
      synced: false,
      lines: [],
      source,
      trackName: value.trackName ?? track.title,
      artistName: value.artistName ?? primaryArtist(track),
      albumName: value.albumName ?? null,
      duration: value.duration ?? null,
      message: 'No lyrics found for this song.',
    };
  }

  return {
    found: true,
    instrumental: false,
    synced: synced.length > 0,
    lines,
    source,
    trackName: value.trackName ?? track.title,
    artistName: value.artistName ?? primaryArtist(track),
    albumName: value.albumName ?? null,
    duration: value.duration ?? null,
  };
}

async function waitForLyricsSlot() {
  const delay = lastLyricsRequestAt + LYRICS_MIN_INTERVAL_MS - Date.now();
  if (delay > 0) await wait(delay);
  lastLyricsRequestAt = Date.now();
}

async function requestLyricsJson(pathname, { timeoutMs = LYRICS_TIMEOUT_MS, retry = true } = {}) {
  await waitForLyricsSlot();
  const response = await fetch(`${LYRICS_URL}${pathname}`, {
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
    },
    signal: AbortSignal.timeout(timeoutMs),
  });

  if (response.status === 404) return null;

  // LRCLIB rate-limits bursts. Honor a short Retry-After, but do not stall the
  // whole panel when the service asks for a long cooldown.
  if ((response.status === 429 || response.status === 503) && retry) {
    const delay = Math.min(retryAfterMs(response) ?? 1200, 2000);
    if (delay < timeoutMs - 750) {
      await wait(delay);
      return requestLyricsJson(pathname, { timeoutMs: timeoutMs - delay, retry: false });
    }
  }

  if (!response.ok) throw new Error(`Lyrics service returned ${response.status}`);
  return response.json();
}

function lyricsGetPath(track, { withAlbum = true, title, artist } = {}) {
  const params = new URLSearchParams();
  params.set('track_name', title ?? lyricTitleVariants(track)[0] ?? track.title);
  params.set('artist_name', artist ?? primaryArtist(track));

  if (withAlbum && track.albumTag && !track.albumIsPlaylistTag) {
    const album = cleanAlbumName(track.albumTag);
    if (album) params.set('album_name', album);
  }
  if (withAlbum && Number.isFinite(track.duration) && track.duration > 0) {
    params.set('duration', String(Math.round(track.duration)));
  }

  return `/api/get?${params.toString()}`;
}

// Lyrics databases are inconsistent about punctuation and accents ("I'm Good"
// vs "Im Good"), so compare without either of them.
function normalizeLyricText(value) {
  return normalizeText(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['’`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Score a search hit against every title/artist variant we know. A candidate
// must match at least part of the title; a different song by the same artist
// is never an acceptable answer.
function scoreLyricsCandidate(item, { titles, artists, duration }) {
  if (!item || (!item.syncedLyrics && !item.plainLyrics && !item.instrumental)) {
    return { score: -1, titleScore: 0 };
  }

  const itemTitle = normalizeLyricText(item.trackName);
  const itemArtist = normalizeLyricText(item.artistName);
  let titleScore = 0;
  let artistScore = 0;

  if (titles.some((title) => itemTitle === title)) titleScore = 5;
  else if (titles.some((title) => itemTitle.includes(title) || title.includes(itemTitle))) {
    titleScore = 2;
  }

  if (artists.some((artist) => itemArtist === artist)) artistScore = 4;
  else if (artists.some((artist) => itemArtist.includes(artist) || artist.includes(itemArtist))) {
    artistScore = 1;
  }

  let score = titleScore + artistScore;
  if (item.syncedLyrics) score += 2;
  if (Number.isFinite(duration) && Number.isFinite(item.duration)) {
    const difference = Math.abs(item.duration - duration);
    if (difference <= 2) score += 2;
    else if (difference <= 10) score += 1;
  }

  return { score, titleScore };
}

async function searchLyrics(track, request = requestLyricsJson) {
  const titleQueries = lyricTitleVariants(track);
  const artistQueries = lyricArtistVariants(track);
  const titles = titleQueries.map(normalizeLyricText).filter(Boolean);
  const artists = artistQueries.map(normalizeLyricText).filter(Boolean);
  const duration = Number.isFinite(track.duration) ? track.duration : null;

  let best = null;
  let bestScore = -1;
  let bestTitleScore = 0;
  let attempts = 0;

  // Bound the number of requests: two title forms x two artist forms is enough
  // to deal with "feat." decorations without turning one song into a burst.
  outer: for (const title of titleQueries.slice(0, 2)) {
    for (const artist of artistQueries.slice(0, 2)) {
      if (attempts >= 4) break outer;
      attempts += 1;

      const params = new URLSearchParams();
      params.set('track_name', title);
      params.set('artist_name', artist);
      const results = await request(`/api/search?${params.toString()}`);
      if (!Array.isArray(results)) continue;

      results.forEach((item) => {
        const { score, titleScore } = scoreLyricsCandidate(item, {
          titles,
          artists,
          duration,
        });
        if (titleScore > 0 && score > bestScore) {
          best = item;
          bestScore = score;
          bestTitleScore = titleScore;
        }
      });

      // Exact title + artist + synced lyrics (+ duration) is a safe stop.
      if (bestTitleScore === 5 && bestScore >= 11) break outer;
    }
  }

  return best;
}

function fallbackLyricsPaths(track) {
  const titles = lyricTitleVariants(track).slice(0, 2);
  const artists = lyricArtistVariants(track).slice(0, 2);
  const paths = [];

  for (const artist of artists) {
    for (const title of titles) {
      paths.push(`/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`);
    }
  }
  return paths.slice(0, 4);
}

// LRCLIB has time-stamped lyrics, but it does not have every song. When it
// misses or cannot be reached, try Lyrics.ovh for plain text. The track title
// and artist are varied slightly so featured-artist decorations do not stop the
// backup lookup.
async function requestFallbackLyrics(track) {
  const deadline = Date.now() + LYRICS_FALLBACK_TIMEOUT_MS;
  let hadError = false;

  for (const path of fallbackLyricsPaths(track)) {
    const remaining = deadline - Date.now();
    if (remaining < 500) break;

    try {
      const response = await fetch(`${LYRICS_FALLBACK_URL}${path}`, {
        headers: {
          Accept: 'application/json',
          'User-Agent': USER_AGENT,
        },
        signal: AbortSignal.timeout(Math.min(remaining, LYRICS_FALLBACK_TIMEOUT_MS)),
      });

      if (response.status === 404) continue;
      if (!response.ok) {
        hadError = true;
        continue;
      }

      const data = await response.json();
      const text = typeof data?.lyrics === 'string' ? data.lyrics.trim() : '';
      if (!text) continue;

      return {
        trackName: track.title,
        artistName: primaryArtist(track),
        albumName: track.albumTag || null,
        duration: Number.isFinite(track.duration) ? track.duration : null,
        plainLyrics: text,
        source: LYRICS_FALLBACK_SOURCE,
      };
    } catch {
      hadError = true;
    }
  }

  if (hadError) throw new Error('The backup lyrics service is unavailable.');
  return null;
}

function lyricsCacheKey(track) {
  // Include the metadata that the lookup depends on so editing a tag does not
  // keep serving a cached miss from the old title/artist/album.
  return [track.id, track.title, track.artist, track.albumTag, track.duration].join('\u0000');
}

async function lookupLyrics(track) {
  const cacheKey = lyricsCacheKey(track);
  const cached = lyricsCache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const deadline = Date.now() + LYRICS_BUDGET_MS;
  const requestWithinBudget = (pathname) => {
    const remaining = deadline - Date.now();
    if (remaining < 400) throw new Error('Lyrics lookup timed out.');
    return requestLyricsJson(pathname, { timeoutMs: Math.min(LYRICS_TIMEOUT_MS, remaining) });
  };

  const titles = lyricTitleVariants(track);
  const artists = lyricArtistVariants(track);
  const getPaths = [];
  const addGetPath = (title, artist, withAlbum) => {
    const path = lyricsGetPath(track, { withAlbum, title, artist });
    if (!getPaths.includes(path)) getPaths.push(path);
  };

  addGetPath(titles[0], artists[0], true);
  addGetPath(titles[0], artists[0], false);
  if (titles[1]) addGetPath(titles[1], artists[0], false);
  if (artists[1]) addGetPath(titles[0], artists[1], false);

  let value = null;
  try {
    let result = null;
    for (const path of getPaths.slice(0, 4)) {
      result = await requestWithinBudget(path);
      if (result) break;
    }
    if (!result) result = await searchLyrics(track, requestWithinBudget);
    value = result
      ? normalizeLyricsResult(result, track)
      : normalizeLyricsResult(null, track);
  } catch {
    value = {
      found: false,
      instrumental: false,
      synced: false,
      lines: [],
      source: 'LRCLIB',
      message: 'The lyrics service is unavailable right now.',
      error: true,
    };
  }

  if (!value?.found && !value?.instrumental) {
    try {
      const fallback = await requestFallbackLyrics(track);
      if (fallback) value = normalizeLyricsResult(fallback, track);
    } catch {
      // Keep the LRCLIB result or error; it already explains what happened.
    }
  }

  lyricsCache.set(cacheKey, {
    value,
    expiresAt: Date.now() + (value.found || value.instrumental ? LYRICS_CACHE_TTL_MS : LYRICS_MISS_TTL_MS),
  });
  if (lyricsCache.size > LYRICS_CACHE_LIMIT) {
    lyricsCache.delete(lyricsCache.keys().next().value);
  }
  return value;
}

// A combined artist tag such as "Future & Metro Boomin" does not always match
// MusicBrainz's artist field. Keep the full tag first, then try its first name.
function artistVariants(artist) {
  const raw = String(artist ?? '').trim();
  if (!raw) return [];
  const split = raw
    .split(/\s*(?:[,;&|/]|\bfeat\.?\b|\bft\.?\b|\bwith\b|\band\b|\bx\b)\s*/i)
    .map((name) => name.trim())
    .filter(Boolean);
  return [...new Set([raw, ...split].filter(Boolean))];
}

function recordingQueries(title, artist, album) {
  const titles = titleVariants(title);
  const artists = artistVariants(artist);
  if (!titles.length || !artists.length) return [];

  const seen = new Set();
  const queries = [];

  // Bound the number of lookups so a tag with many featured artists cannot
  // turn one song into a long chain of requests.
  outer: for (const titleVariant of titles) {
    for (const artistVariant of artists) {
      if (queries.length >= 6) break outer;
      const key = `${titleVariant}\u0000${artistVariant}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const parts = [
        `recording:"${luceneEscape(titleVariant)}"`,
        `artist:"${luceneEscape(artistVariant)}"`,
      ];
      if (album) parts.push(`release:"${luceneEscape(album)}"`);
      queries.push(parts.join(' AND '));
    }
  }

  return queries;
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

  // A fake playlist album tag would filter out every real release, so only
  // pass it to MusicBrainz when it looks like an actual album.
  const album = track.albumIsPlaylistTag ? null : track.albumTag || null;
  const queries = recordingQueries(title, artist, album);
  const releases = [];
  const seen = new Set();
  const tried = new Set();

  for (const query of queries) {
    const search = await musicBrainzJson(
      `/ws/2/recording/?query=${encodeURIComponent(query)}&fmt=json&limit=5`,
    );

    const recordings = Array.isArray(search.recordings) ? search.recordings : [];
    let foundNewRelease = false;
    for (const recording of recordings) {
      for (const release of recording.releases ?? []) {
        if (!release?.id || seen.has(release.id)) continue;
        seen.add(release.id);
        releases.push(release);
        foundNewRelease = true;
      }
    }

    if (!foundNewRelease) continue;

    const candidates = rankReleases(
      releases.filter((release) => !tried.has(release.id)),
      album,
    );
    for (const release of candidates) {
      tried.add(release.id);
      const cover = await coverFromRelease(release);
      if (cover) return cover;
    }
  }

  if (!album) return null;

  const releaseSearch = await musicBrainzJson(
    `/ws/2/release/?query=${encodeURIComponent(
      `release:"${luceneEscape(album)}" AND artist:"${luceneEscape(artist)}"`,
    )}&fmt=json&limit=5`,
  );
  for (const release of rankReleases(releaseSearch.releases ?? [], album)) {
    if (!release?.id || tried.has(release.id)) continue;
    tried.add(release.id);
    const cover = await coverFromRelease(release);
    if (cover) return cover;
  }

  return null;
}

async function fetchMissingPlaylistCovers(playlists, tracks, byId, onProgress = () => {}) {
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
  let processed = 0;
  const changed = [];

  const report = () =>
    onProgress({
      total: targets.size,
      processed,
      fetched,
      linked,
      skipped,
      missing,
      failed,
    });

  report();

  for (const [id, track] of targets) {
    if (cachedCover(id, manifest)) {
      skipped += 1;
      processed += 1;
      report();
      continue;
    }

    const albumKey = albumCacheKey(track);
    const albumCover = albumKey ? cachedCoverEntry(manifest.albums[albumKey], manifest) : null;
    if (albumCover) {
      manifest.tracks[id] = { ...albumCover.entry };
      linked += 1;
      processed += 1;
      changed.push({
        id,
        artwork: albumCover.url,
        artworkType: albumCover.type,
      });
      await saveCoverManifest();
      report();
      continue;
    }

    try {
      const cover = await findCoverForTrack(track);
      if (!cover) {
        missing += 1;
        processed += 1;
        report();
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
      processed += 1;
      changed.push({
        id,
        artwork: `/api/covers/${encodeURIComponent(file)}`,
        artworkType: cover.type,
      });
      report();
    } catch {
      failed += 1;
      processed += 1;
      report();
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
  const embeddedArtwork = embeddedCover ? `/api/artwork/${id}` : null;
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
    embeddedArtwork,
    embeddedArtworkType: embeddedCover?.format || 'image/jpeg',
    hasArtwork: false,
  };

  // Album covers are applied after playlist detection, once we know whether
  // the album tag is a real release or a playlist collection name.
  const cover = cachedCover(track.id, coverManifest);
  track.hasArtwork = Boolean(cover || embeddedArtwork);
  if (cover) {
    track.artwork = cover.url;
    track.artworkType = cover.type;
  } else if (embeddedArtwork) {
    track.artwork = embeddedArtwork;
    track.artworkType = track.embeddedArtworkType;
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
    const playlists = buildFolderPlaylists(sortedTracks);
    annotatePlaylistAlbums(sortedTracks, playlists, manifest);

    return {
      root,
      tracks: sortedTracks,
      playlists,
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

    if (pathname.startsWith('/api/lyrics/')) {
      let id;
      try {
        id = decodeURIComponent(pathname.slice('/api/lyrics/'.length));
      } catch {
        sendError(res, 400, 'Invalid track id.');
        return true;
      }

      const library = await ensureLibrary();
      const track = library.tracks.find((item) => item.id === id);
      if (!track) {
        sendError(res, 404, 'Track not found.');
        return true;
      }

      sendJson(res, 200, await lookupLyrics(track));
      return true;
    }

    if (pathname === '/api/covers/fetch/status') {
      sendJson(res, 200, coverFetchJob ?? { running: false });
      return true;
    }

    if (pathname === '/api/covers/fetch') {
      if (req.method !== 'POST') {
        sendError(res, 405, 'Use POST to fetch playlist covers.');
        return true;
      }

      if (coverFetchJob?.running) {
        sendJson(res, 409, {
          ...coverFetchJob,
          message: 'A cover fetch is already running.',
        });
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

      const job = {
        running: true,
        total: 0,
        processed: 0,
        fetched: 0,
        linked: 0,
        skipped: 0,
        missing: 0,
        failed: 0,
        startedAt: new Date().toISOString(),
        finishedAt: null,
      };
      coverFetchJob = job;

      try {
        const result = await fetchMissingPlaylistCovers(
          library.playlists,
          library.tracks,
          library.byId,
          (progress) => {
            Object.assign(job, progress);
          },
        );
        // Force the next scan to pick up the new cover paths.
        cache = new Map();
        artworkCache = new Map();
        lastScanAt = 0;
        coverFetchJob = {
          ...job,
          running: false,
          total: result.fetched + result.linked + result.skipped + result.missing + result.failed,
          finishedAt: new Date().toISOString(),
        };
        sendJson(res, 200, result);
      } catch {
        coverFetchJob = { ...job, running: false, finishedAt: new Date().toISOString() };
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
