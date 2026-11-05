/**
 * Fetches time-stamped lyrics for a library track. The local server proxies
 * LRCLIB first, then falls back to a plain-lyrics service when LRCLIB has no
 * match or cannot be reached. No third-party request is made from the browser.
 */
export async function fetchLyrics(trackId, { signal } = {}) {
  if (typeof trackId !== 'string' || !trackId) {
    throw new Error('No track selected.');
  }

  const response = await fetch(`/api/lyrics/${encodeURIComponent(trackId)}`, {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
    signal,
  });

  const contentType = response.headers.get('content-type') ?? '';
  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error('The local music server could not look up lyrics.');
  }

  const data = await response.json();
  return {
    found: Boolean(data.found),
    instrumental: Boolean(data.instrumental),
    synced: Boolean(data.synced),
    lines: Array.isArray(data.lines)
      ? data.lines
          .filter((line) => line && typeof line.text === 'string')
          .map((line) => ({
            text: line.text,
            time: Number.isFinite(line.time) ? line.time : null,
          }))
      : [],
    source: typeof data.source === 'string' ? data.source : 'LRCLIB',
    message: typeof data.message === 'string' ? data.message : null,
    error: Boolean(data.error),
  };
}

export const LYRICS_SOURCE_URL = 'https://lrclib.net';
