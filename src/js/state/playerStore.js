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
          type: 'playlist',
          trackIds: trackIds.filter((id) => typeof id === 'string'),
        };
      });
  } catch {
    return [];
  }
}

function encodeIdPart(value) {
  return encodeURIComponent(String(value ?? ''));
}

function readLiked(likedKey) {
  try {
    const stored = JSON.parse(window.localStorage.getItem(likedKey) ?? '[]');
    if (!Array.isArray(stored)) return [];
    return [...new Set(stored.filter((id) => typeof id === 'string'))];
  } catch {
    return [];
  }
}

function sameCollection(left, right) {
  if (!left && !right) return true;
  if (!left || !right) return false;
  return left.type === right.type && left.id === right.id;
}

const QUEUE_HISTORY_LIMIT = 25;

// The same album title can exist for different artists, so key albums by both.
function buildCollections(library) {
  const albums = new Map();
  const artists = new Map();

  library.forEach((track) => {
    if (!track || typeof track.id !== 'string') return;

    const artistName = track.artist || 'Unknown artist';
    const albumArtistName = track.albumArtist || artistName;
    const albumName = track.album || 'Unknown album';

    let artist = artists.get(artistName);
    if (!artist) {
      artist = {
        id: `artist:${encodeIdPart(artistName)}`,
        type: 'artist',
        name: artistName,
        trackIds: [],
        trackId: track.id,
        artwork: track.artwork ?? null,
      };
      artists.set(artistName, artist);
    }
    artist.trackIds.push(track.id);
    if (!artist.artwork && track.artwork) artist.artwork = track.artwork;

    const albumKey = `${albumArtistName}\u0000${albumName}`;
    let album = albums.get(albumKey);
    if (!album) {
      album = {
        id: `album:${encodeIdPart(albumArtistName)}:${encodeIdPart(albumName)}`,
        type: 'album',
        name: albumName,
        artist: albumArtistName,
        trackIds: [],
        trackId: track.id,
        artwork: track.artwork ?? null,
      };
      albums.set(albumKey, album);
    }
    album.trackIds.push(track.id);
    if (!album.artwork && track.artwork) album.artwork = track.artwork;
  });

  return { albums: [...albums.values()], artists: [...artists.values()] };
}

function descriptorOf(collection) {
  if (!collection) return null;
  return {
    type: collection.type,
    id: collection.id,
    name: collection.name,
    ...(collection.artist ? { artist: collection.artist } : {}),
  };
}

export function createPlayerStore(
  initialTracks = [],
  {
    storageKey = 'orpheus:player-prefs',
    playlistsKey = 'orpheus:playlists',
    likedKey = 'orpheus:liked',
    libraryRoot = null,
    libraryError = null,
    libraryMessage = null,
  } = {},
) {
  const library = [...initialTracks];
  const prefs = readPrefs(storageKey);
  const { albums, artists } = buildCollections(library);

  let state = {
    // `tracks` / `currentIndex` are the playback queue. They only change when
    // the listener actually starts playing something.
    tracks: [...library],
    // `displayedTracks` / `activeCollection` are what the queue panel shows.
    // Browsing (single clicks, back navigation) changes only these.
    displayedTracks: [...library],
    library,
    libraryRoot,
    libraryError,
    libraryMessage,
    playlists: readPlaylists(playlistsKey),
    albums,
    artists,
    likedIds: readLiked(likedKey),
    // `activeCollection` is null for the full library ("All Songs").
    activeCollection: null,
    // Which collection the playback queue came from, if any.
    playbackCollection: null,
    queueHistory: [],
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    error: null,
    ...prefs,
  };

  const listeners = new Set();

  function getState() {
    return {
      ...state,
      activePlaylistId:
        state.activeCollection?.type === 'playlist' ? state.activeCollection.id : null,
      canGoBack: state.queueHistory.length > 0,
      currentTrack: state.tracks[state.currentIndex] ?? null,
    };
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

  function persistLiked() {
    try {
      window.localStorage.setItem(likedKey, JSON.stringify(state.likedIds));
    } catch {
      // Ignore storage failures; likes still work for this session.
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
    if ('likedIds' in patch) {
      persistLiked();
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

  function collectionTracks(collection) {
    if (!collection) return [...library];
    const byId = new Map(library.map((track) => [track.id, track]));
    return collection.trackIds.map((id) => byId.get(id)).filter(Boolean);
  }

  function likedTracks() {
    return library.filter((track) => state.likedIds.includes(track.id));
  }

  function findCollection(type, id) {
    if (type === 'playlist') return state.playlists.find((item) => item.id === id) ?? null;
    if (type === 'album') return state.albums.find((item) => item.id === id) ?? null;
    if (type === 'artist') return state.artists.find((item) => item.id === id) ?? null;
    return null;
  }

  function tracksForDescriptor(collection) {
    if (!collection) return [...library];
    if (collection.type === 'liked') return likedTracks();
    const found = findCollection(collection.type, collection.id);
    return found ? collectionTracks(found) : null;
  }

  function historyEntry() {
    return {
      collection: state.activeCollection ? { ...state.activeCollection } : null,
      trackIds: state.displayedTracks.map((track) => track.id),
    };
  }

  // Swaps the visible queue without touching playback. Used by sidebar
  // browsing and by Back navigation.
  function displayQueue(nextTracks, activeCollection, { pushHistory = true } = {}) {
    const list = Array.isArray(nextTracks) ? [...nextTracks] : [];
    const descriptor = descriptorOf(activeCollection);
    const patch = {
      displayedTracks: list,
      activeCollection: descriptor,
    };

    if (pushHistory && !sameCollection(state.activeCollection, descriptor)) {
      patch.queueHistory = [...state.queueHistory, historyEntry()].slice(-QUEUE_HISTORY_LIMIT);
    }

    setState(patch);
    return list.length > 0;
  }

  // Replaces both queues and starts a new playback context. Used when the
  // listener explicitly asks to play a collection or track.
  function activateQueue(
    nextTracks,
    activeCollection,
    preferredTrackId = null,
    { pushHistory = true } = {},
  ) {
    const list = Array.isArray(nextTracks) ? [...nextTracks] : [];
    const descriptor = descriptorOf(activeCollection);
    const currentId = state.tracks[state.currentIndex]?.id ?? null;
    const wantedId = preferredTrackId ?? currentId;

    let index = 0;
    if (wantedId) {
      const found = list.findIndex((track) => track.id === wantedId);
      if (found !== -1) index = found;
    }

    const patch = {
      tracks: list,
      displayedTracks: list,
      currentIndex: index,
      activeCollection: descriptor,
      playbackCollection: descriptor,
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      error: null,
    };

    if (pushHistory && !sameCollection(state.activeCollection, descriptor)) {
      patch.queueHistory = [...state.queueHistory, historyEntry()].slice(-QUEUE_HISTORY_LIMIT);
    }

    setState(patch);
    return list.length > 0;
  }

  function selectCollection(type, id) {
    const collection = findCollection(type, id);
    if (!collection) return false;
    return displayQueue(collectionTracks(collection), collection);
  }

  // Promote the currently displayed queue to the playback queue.
  function playDisplayed(preferredTrackId = null) {
    const list = [...state.displayedTracks];
    if (!list.length) return false;

    const currentId = state.tracks[state.currentIndex]?.id ?? null;
    let index = preferredTrackId
      ? list.findIndex((track) => track.id === preferredTrackId)
      : -1;

    if (index === -1 && !preferredTrackId && currentId) {
      index = list.findIndex((track) => track.id === currentId);
    }
    if (index === -1) index = 0;

    setState({
      tracks: list,
      currentIndex: index,
      playbackCollection: state.activeCollection ? { ...state.activeCollection } : null,
      currentTime: 0,
      duration: 0,
      error: null,
    });
    return true;
  }

  // Play a track from the displayed queue, or fall back to the library when it
  // came from the "All Songs" search results.
  function playTrack(trackId) {
    let index = state.displayedTracks.findIndex((track) => track.id === trackId);

    if (index !== -1) {
      setState({
        tracks: [...state.displayedTracks],
        currentIndex: index,
        playbackCollection: state.activeCollection ? { ...state.activeCollection } : null,
        currentTime: 0,
        duration: 0,
        error: null,
      });
      return true;
    }

    index = state.library.findIndex((track) => track.id === trackId);
    if (index === -1) return false;

    const patch = {
      tracks: [...library],
      displayedTracks: [...library],
      currentIndex: index,
      activeCollection: null,
      playbackCollection: null,
      currentTime: 0,
      duration: 0,
      error: null,
    };

    if (state.activeCollection) {
      patch.queueHistory = [...state.queueHistory, historyEntry()].slice(-QUEUE_HISTORY_LIMIT);
    }

    setState(patch);
    return true;
  }

  // Back only rewinds the browsed queue/history; it never changes which song
  // is loaded or whether it is playing.
  function goBackQueue() {
    const history = [...state.queueHistory];

    while (history.length) {
      const entry = history.pop();
      let list = tracksForDescriptor(entry.collection);

      if (!list && Array.isArray(entry.trackIds)) {
        const byId = new Map(library.map((track) => [track.id, track]));
        list = entry.trackIds.map((id) => byId.get(id)).filter(Boolean);
      }
      if (!list) continue;

      setState({
        displayedTracks: [...list],
        activeCollection: entry.collection ? descriptorOf(entry.collection) : null,
        queueHistory: history,
      });
      return true;
    }

    setState({ queueHistory: [] });
    return false;
  }

  function toggleLike(trackId) {
    if (typeof trackId !== 'string') return false;

    const hasTrack = state.likedIds.includes(trackId);
    const likedIds = hasTrack
      ? state.likedIds.filter((id) => id !== trackId)
      : [...state.likedIds, trackId];
    const patch = { likedIds };
    const nextLikedTracks = () => library.filter((track) => likedIds.includes(track.id));

    // Keep an open Liked Songs view in sync with the heart button.
    if (state.activeCollection?.type === 'liked') {
      patch.displayedTracks = nextLikedTracks();
    }

    // And keep an active Liked Songs playback queue in sync as well.
    if (state.playbackCollection?.type === 'liked') {
      const nextTracks = nextLikedTracks();
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
    playDisplayed(preferredTrackId = null) {
      return playDisplayed(preferredTrackId);
    },
    playTrack(trackId) {
      return playTrack(trackId);
    },
    setQueue(
      nextTracks,
      { activeCollection = null, selectedTrackId = null, pushHistory = true } = {},
    ) {
      return activateQueue(nextTracks, activeCollection, selectedTrackId, { pushHistory });
    },
    selectPlaylist(playlistId = null) {
      if (!playlistId) return displayQueue(library, null);
      return selectCollection('playlist', playlistId);
    },
    selectAlbum(albumId) {
      return selectCollection('album', albumId);
    },
    selectArtist(artistId) {
      return selectCollection('artist', artistId);
    },
    selectLiked() {
      return displayQueue(likedTracks(), {
        type: 'liked',
        id: 'liked',
        name: 'Liked Songs',
      });
    },
    selectLibrary() {
      return displayQueue(library, null);
    },
    goBackQueue() {
      return goBackQueue();
    },
    toggleLike(trackId) {
      return toggleLike(trackId);
    },
    createPlaylist(name, trackId = null) {
      const trimmed = String(name ?? '').trim().slice(0, 40);
      if (!trimmed) return null;

      const playlist = {
        id: `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
        name: trimmed,
        type: 'playlist',
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

      // Keep the browsed playlist view in sync.
      if (state.activeCollection?.type === 'playlist' && state.activeCollection.id === playlistId) {
        patch.displayedTracks = playlistTracks({ ...playlist, trackIds });
      }

      // And keep the playback queue in sync when it belongs to that playlist.
      if (state.playbackCollection?.type === 'playlist' && state.playbackCollection.id === playlistId) {
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
    renamePlaylist(playlistId, name) {
      const trimmed = String(name ?? '').trim().slice(0, 40);
      if (!trimmed) return false;

      const playlist = state.playlists.find((item) => item.id === playlistId);
      if (!playlist) return false;
      if (playlist.name === trimmed) return true;

      const nextPlaylists = state.playlists.map((item) =>
        item.id === playlistId ? { ...item, name: trimmed } : item,
      );
      const patch = {
        playlists: nextPlaylists,
        queueHistory: state.queueHistory.map((entry) =>
          entry.collection?.type === 'playlist' && entry.collection.id === playlistId
            ? { ...entry, collection: { ...entry.collection, name: trimmed } }
            : entry,
        ),
      };

      if (state.activeCollection?.type === 'playlist' && state.activeCollection.id === playlistId) {
        patch.activeCollection = { ...state.activeCollection, name: trimmed };
      }
      if (state.playbackCollection?.type === 'playlist' && state.playbackCollection.id === playlistId) {
        patch.playbackCollection = { ...state.playbackCollection, name: trimmed };
      }

      setState(patch);
      return true;
    },
    deletePlaylist(playlistId) {
      const playlist = state.playlists.find((item) => item.id === playlistId);
      if (!playlist) return false;

      const patch = {
        playlists: state.playlists.filter((item) => item.id !== playlistId),
        queueHistory: state.queueHistory.filter(
          (entry) =>
            !(entry.collection?.type === 'playlist' && entry.collection.id === playlistId),
        ),
      };

      // If the browsed playlist disappears, fall back to the full library view.
      if (state.activeCollection?.type === 'playlist' && state.activeCollection.id === playlistId) {
        patch.displayedTracks = [...library];
        patch.activeCollection = null;
      }

      // If the playing playlist disappears, fall back to the full library while
      // keeping the current song and playback position intact when possible.
      if (state.playbackCollection?.type === 'playlist' && state.playbackCollection.id === playlistId) {
        const currentId = state.tracks[state.currentIndex]?.id ?? null;
        const index = currentId ? library.findIndex((track) => track.id === currentId) : -1;

        patch.tracks = [...library];
        patch.playbackCollection = null;

        if (index === -1) {
          patch.currentIndex = 0;
          patch.currentTime = 0;
          patch.duration = 0;
          patch.isPlaying = false;
        } else {
          patch.currentIndex = index;
        }
      }

      setState(patch);
      return true;
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
