export function createAudioService(store) {
  const audio = new Audio();
  audio.preload = 'metadata';

  let loadedTrackId = null;

  function loadTrack(track) {
    loadedTrackId = track?.id ?? null;

    if (!track) {
      audio.removeAttribute('src');
      audio.load();
      return;
    }

    audio.src = track.src;
    audio.load();
  }

  function updateMediaSession(track) {
    if (!('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;

    if (!track) {
      navigator.mediaSession.metadata = null;
      return;
    }

    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.artist,
      album: track.album,
      artwork: [
        {
          src: new URL(track.artwork, window.location.href).href,
          sizes: '512x512',
          type: 'image/svg+xml',
        },
      ],
    });
  }

  store.subscribe((state) => {
    const track = state.currentTrack;

    if ((track?.id ?? null) !== loadedTrackId) {
      loadTrack(track);
      updateMediaSession(track);
    }

    const effectiveVolume = state.muted ? 0 : state.volume;
    if (audio.volume !== effectiveVolume) {
      audio.volume = effectiveVolume;
    }
  });

  function play() {
    if (!store.getState().currentTrack) return Promise.resolve();
    return audio.play().catch(() => {
      // Autoplay can be blocked until the browser sees a user gesture.
      store.setState({ isPlaying: false });
    });
  }

  function pause() {
    audio.pause();
  }

  function toggle() {
    return store.getState().isPlaying ? pause() : play();
  }

  function seek(seconds) {
    if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;
    audio.currentTime = Math.min(Math.max(seconds, 0), audio.duration);
    store.setState({ currentTime: audio.currentTime });
  }

  function next() {
    if (store.next()) play();
  }

  function previous() {
    // Restart the current track if the listener is already a few seconds in.
    if (audio.currentTime > 3) {
      seek(0);
      return;
    }
    store.previous();
    play();
  }

  audio.addEventListener('loadedmetadata', () => {
    store.setState({ duration: Number.isFinite(audio.duration) ? audio.duration : 0 });
  });

  audio.addEventListener('durationchange', () => {
    store.setState({ duration: Number.isFinite(audio.duration) ? audio.duration : 0 });
  });

  audio.addEventListener('timeupdate', () => {
    store.setState({ currentTime: audio.currentTime });
  });

  audio.addEventListener('play', () => store.setState({ isPlaying: true }));
  audio.addEventListener('pause', () => store.setState({ isPlaying: false }));

  audio.addEventListener('ended', () => {
    if (store.getState().repeat === 'one') {
      audio.currentTime = 0;
      play();
      return;
    }

    if (store.next({ automatic: true })) {
      play();
      return;
    }

    audio.currentTime = 0;
    store.setState({ isPlaying: false, currentTime: 0 });
  });

  audio.addEventListener('error', () => {
    if (!audio.getAttribute('src')) return;
    store.setState({
      isPlaying: false,
      error: 'This track could not be played. Check that the audio file exists.',
    });
  });

  if ('mediaSession' in navigator) {
    const actions = {
      play: () => play(),
      pause: () => pause(),
      previoustrack: () => previous(),
      nexttrack: () => next(),
      seekto: (details) => {
        if (Number.isFinite(details.seekTime)) seek(details.seekTime);
      },
    };

    Object.entries(actions).forEach(([action, handler]) => {
      try {
        navigator.mediaSession.setActionHandler(action, handler);
      } catch {
        // Not every browser supports every media session action.
      }
    });
  }

  return { audio, play, pause, toggle, seek, next, previous, loadTrack };
}
