export function createAudioService(store) {
  const audio = new Audio();

  function loadTrack(track) {
    if (!track) return;
    audio.src = track.src;
    audio.load();
    store.setState({ currentTime: 0, duration: 0 });
  }

  store.subscribe(({ currentTrack, volume }) => {
    audio.volume = volume;
    if (currentTrack && audio.src !== new URL(currentTrack.src, window.location.href).href) {
      loadTrack(currentTrack);
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    store.setState({ duration: audio.duration });
  });
  audio.addEventListener('timeupdate', () => {
    store.setState({ currentTime: audio.currentTime });
  });
  audio.addEventListener('play', () => store.setState({ isPlaying: true }));
  audio.addEventListener('pause', () => store.setState({ isPlaying: false }));
  audio.addEventListener('ended', () => {
    store.next();
    play();
  });

  function play() {
    return audio.play().catch(() => store.setState({ isPlaying: false }));
  }

  function pause() {
    audio.pause();
  }

  function seek(seconds) {
    audio.currentTime = seconds;
  }

  return { audio, play, pause, seek, loadTrack };
}
