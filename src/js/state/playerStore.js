export function createPlayerStore(initialTracks = []) {
  let state = {
    tracks: initialTracks,
    currentIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
  };

  const listeners = new Set();

  function getState() {
    return { ...state, currentTrack: state.tracks[state.currentIndex] ?? null };
  }

  function setState(nextState) {
    state = { ...state, ...nextState };
    listeners.forEach((listener) => listener(getState()));
  }

  return {
    getState,
    subscribe(listener) {
      listeners.add(listener);
      listener(getState());
      return () => listeners.delete(listener);
    },
    setState,
    next() {
      const nextIndex = state.tracks.length
        ? (state.currentIndex + 1) % state.tracks.length
        : 0;
      setState({ currentIndex: nextIndex, currentTime: 0 });
    },
    previous() {
      const previousIndex = state.tracks.length
        ? (state.currentIndex - 1 + state.tracks.length) % state.tracks.length
        : 0;
      setState({ currentIndex: previousIndex, currentTime: 0 });
    },
  };
}
