const REPEAT_MODES = ['off', 'all', 'one'];
const HEX_COLOR = /^#[0-9a-f]{6}$/i;
const DEFAULT_PREFS = {
  volume: 0.8,
  muted: false,
  shuffle: false,
  repeat: 'off',
  accent: '#b49cff',
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function isHexColor(value) {
  return typeof value === 'string' && HEX_COLOR.test(value);
}

// Dark accents disappear against the black controls, so only accept bright colors.
function isUsableAccent(value) {
  if (!isHexColor(value)) return false;
  const red = Number.parseInt(value.slice(1, 3), 16);
  const green = Number.parseInt(value.slice(3, 5), 16);
  const blue = Number.parseInt(value.slice(5, 7), 16);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue >= 100;
}

function readPrefs(storageKey) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '{}');
    const volume = Number(stored.volume);
    return {
      volume: Number.isFinite(volume) ? clamp(volume, 0, 1) : DEFAULT_PREFS.volume,
      muted: typeof stored.muted === 'boolean' ? stored.muted : DEFAULT_PREFS.muted,
      shuffle: typeof stored.shuffle === 'boolean' ? stored.shuffle : DEFAULT_PREFS.shuffle,
      repeat: REPEAT_MODES.includes(stored.repeat) ? stored.repeat : DEFAULT_PREFS.repeat,
      accent: isUsableAccent(stored.accent) ? stored.accent.toLowerCase() : DEFAULT_PREFS.accent,
    };
  } catch {
    return { ...DEFAULT_PREFS };
  }
}

function readPlaylists(storageKey) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    if (!Array.isArray(stored)) return [];

    return stored
      .filter((playlist) => playlist && typeof playlist.id === 'string' && typeof playlist.name === 'string')
      .map((playlist) => {
        // `tracks` was the old shape; accept both so saved data keeps working.
        const trackIds = Array.isArray(playlist.trackIds)
          ? playlist.trackIds
          : Array.isArray(playlist.tracks)
            ? playlist.tracks
            : [];

        return {
          id: playlist.id,
          name: playlist.name,
          trackIds: trackIds.filter((id) => typeof id === 'string'),
        };
      });
  } catch {
    return [];
  }
}

export function createPlayerStore(
  initialTracks = [],
  { storageKey = 'orpheus:player-prefs', playlistsKey = 'orpheus:playlists' } = {},
) {
  const library = [...initialTracks];
  const prefs = readPrefs(storageKey);

  let state = {
    tracks: [...library],
    library,
    playlists: readPlaylists(playlistsKey),
    activePlaylistId: null,
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    error: null,
    ...prefs,
  };

  const listeners = new Set();

  function getState() {
    return { ...state, currentTrack: state.tracks[state.currentIndex] ?? null };
  }

  function persistPrefs() {
    try {
      const { volume, muted, shuffle, repeat, accent } = state;
      window.localStorage.setItem(storageKey, JSON.stringify({ volume, muted, shuffle, repeat, accent }));
    } catch {
      // Storage can be unavailable (private mode, blocked cookies); playback still works.
    }
  }

  function persistPlaylists() {
    try {
      window.localStorage.setItem(playlistsKey, JSON.stringify(state.playlists));
    } catch {
      // Ignore storage failures; playlists still work for this session.
    }
  }

  function setState(patch) {
    state = { ...state, ...patch };
    if (['volume', 'muted', 'shuffle', 'repeat', 'accent'].some((key) => key in patch)) {
      persistPrefs();
    }
    if ('playlists' in patch) {
      persistPlaylists();
    }
    const snapshot = getState();
    listeners.forEach((listener) => listener(snapshot));
  }

  function randomIndex() {
    if (state.tracks.length <= 1) return 0;
    let index = state.currentIndex;
    while (index === state.currentIndex) {
      index = Math.floor(Math.random() * state.tracks.length);
    }
    return index;
  }

  function next({ automatic = false } = {}) {
    const { tracks, currentIndex, shuffle, repeat } = state;
    if (!tracks.length) return false;

    let nextIndex;
    if (shuffle) {
      nextIndex = randomIndex();
    } else if (currentIndex < tracks.length - 1) {
      nextIndex = currentIndex + 1;
    } else if (repeat === 'all') {
      nextIndex = 0;
    } else if (automatic) {
      return false;
    } else {
      nextIndex = 0;
    }

    setState({ currentIndex: nextIndex, currentTime: 0, duration: 0, error: null });
    return true;
  }

  function previous() {
    const { tracks, currentIndex, shuffle } = state;
    if (!tracks.length) return;

    const previousIndex = shuffle
      ? randomIndex()
      : (currentIndex - 1 + tracks.length) % tracks.length;

    setState({ currentIndex: previousIndex, currentTime: 0, duration: 0, error: null });
  }

  function playlistTracks(playlist) {
    if (!playlist) return [...library];
    const byId = new Map(library.map((track) => [track.id, track]));
    return playlist.trackIds.map((id) => byId.get(id)).filter(Boolean);
  }

  function activateQueue(nextTracks, activePlaylistId, preferredTrackId = null) {
    const list = Array.isArray(nextTracks) ? [...nextTracks] : [];
    const currentId = state.tracks[state.currentIndex]?.id ?? null;
    const wantedId = preferredTrackId ?? currentId;

    let index = 0;
    if (wantedId) {
      const found = list.findIndex((track) => track.id === wantedId);
      if (found !== -1) index = found;
    }

    setState({
      tracks: list,
      currentIndex: index,
      activePlaylistId,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      error: null,
    });

    return list.length > 0;
  }

  return {
    getState,
    subscribe(listener) {
      listeners.add(listener);
      listener(getState());
      return () => listeners.delete(listener);
    },
    setState,
    selectTrack(index) {
      if (!Number.isInteger(index) || index < 0 || index >= state.tracks.length) return;
      if (index === state.currentIndex) return;
      setState({ currentIndex: index, currentTime: 0, duration: 0, error: null });
    },
    setQueue(nextTracks, { activePlaylistId = null, selectedTrackId = null } = {}) {
      return activateQueue(nextTracks, activePlaylistId, selectedTrackId);
    },
    selectPlaylist(playlistId = null) {
      const playlist = playlistId
        ? state.playlists.find((item) => item.id === playlistId) ?? null
        : null;
      return activateQueue(playlistTracks(playlist), playlist ? playlist.id : null);
    },
    selectLibrary() {
      return activateQueue(library, null);
    },
    createPlaylist(name, trackId = null) {
      const trimmed = String(name ?? '').trim().slice(0, 40);
      if (!trimmed) return null;

      const playlist = {
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        name: trimmed,
        trackIds: trackId ? [trackId] : [],
      };

      setState({ playlists: [...state.playlists, playlist] });
      return playlist.id;
    },
    toggleTrackInPlaylist(playlistId, trackId) {
      const playlist = state.playlists.find((item) => item.id === playlistId);
      if (!playlist || typeof trackId !== 'string') return false;

      const hasTrack = playlist.trackIds.includes(trackId);
      const trackIds = hasTrack
        ? playlist.trackIds.filter((id) => id !== trackId)
        : [...playlist.trackIds, trackId];
      const nextPlaylists = state.playlists.map((item) =>
        item.id === playlistId ? { ...item, trackIds } : item,
      );
      const patch = { playlists: nextPlaylists };

      // Keep the active queue in sync when the playlist it belongs to changes.
      if (state.activePlaylistId === playlistId) {
        const nextTracks = playlistTracks({ ...playlist, trackIds });
        const currentId = state.tracks[state.currentIndex]?.id ?? null;
        const nextIndex = nextTracks.findIndex((track) => track.id === currentId);
        patch.tracks = nextTracks;
        patch.currentIndex = nextIndex === -1 ? 0 : nextIndex;
        if (nextIndex === -1) {
          patch.currentTime = 0;
          patch.duration = 0;
          patch.isPlaying = false;
        }
      }

      setState(patch);
      return !hasTrack;
    },
    next,
    previous,
    toggleShuffle() {
      setState({ shuffle: !state.shuffle });
    },
    cycleRepeat() {
      const nextMode = REPEAT_MODES[(REPEAT_MODES.indexOf(state.repeat) + 1) % REPEAT_MODES.length];
      setState({ repeat: nextMode });
    },
    setVolume(volume) {
      const nextVolume = clamp(Number(volume) || 0, 0, 1);
      setState({ volume: nextVolume, muted: nextVolume > 0 ? false : state.muted });
    },
    toggleMute() {
      setState({ muted: !state.muted });
    },
    setAccent(color) {
      if (!isUsableAccent(color)) return;
      setState({ accent: color.toLowerCase() });
    },
  };
}
