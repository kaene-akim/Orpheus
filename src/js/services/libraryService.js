function cleanText(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

/**
 * Loads the library from the local music server. The server scans
 * `~/Music` (or `ORPHEUS_MUSIC_DIR`) recursively, so songs in album
 * subfolders are included automatically.
 */
export async function loadLocalLibrary() {
  try {
    const response = await fetch('/api/library', {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    });

    const contentType = response.headers.get('content-type') ?? '';
    if (!response.ok || !contentType.includes('application/json')) {
      throw new Error('The local music API is not available.');
    }

    const data = await response.json();
    return {
      tracks: Array.isArray(data.tracks) ? data.tracks : [],
      playlists: Array.isArray(data.playlists) ? data.playlists : [],
      root: cleanText(data.root),
      error: cleanText(data.error),
      message: cleanText(data.message),
    };
  } catch {
    return {
      tracks: [],
      playlists: [],
      root: null,
      error:
        'The local music server is not available. Run Orpheus with npm run dev, or npm run preview after a build.',
      message: null,
    };
  }
}

export async function fetchPlaylistCovers() {
  const response = await fetch('/api/covers/fetch', {
    method: 'POST',
    headers: { Accept: 'application/json' },
  });

  const contentType = response.headers.get('content-type') ?? '';
  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error('The local music server could not fetch covers.');
  }

  return response.json();
}

export async function fetchPlaylistCoverStatus() {
  const response = await fetch('/api/covers/fetch/status', {
    headers: { Accept: 'application/json' },
    cache: 'no-store',
  });

  const contentType = response.headers.get('content-type') ?? '';
  if (!response.ok || !contentType.includes('application/json')) {
    throw new Error('The local music server could not report cover progress.');
  }

  return response.json();
}
