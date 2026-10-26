import { formatTime } from '../utils/formatTime.js';

export function renderPlayer(root, { store, audio }) {
  root.innerHTML = `
    <section class="player">
      <p class="player__eyebrow">Orpheus</p>
      <h1>Music Player</h1>
      <div class="player__track">
        <img class="player__artwork" data-artwork alt="Album artwork" />
        <div>
          <h2 data-title>Choose a track</h2>
          <p data-artist></p>
        </div>
      </div>
      <input class="player__progress" data-progress type="range" min="0" value="0" step="1" aria-label="Track progress" />
      <div class="player__timestamps"><span data-current>0:00</span><span data-duration>0:00</span></div>
      <div class="player__controls">
        <button data-previous aria-label="Previous track">↶</button>
        <button data-toggle aria-label="Play">▶</button>
        <button data-next aria-label="Next track">↷</button>
      </div>
      <label>Volume <input data-volume type="range" min="0" max="1" value="1" step="0.01" /></label>
    </section>
  `;

  const elements = {
    artwork: root.querySelector('[data-artwork]'),
    title: root.querySelector('[data-title]'),
    artist: root.querySelector('[data-artist]'),
    progress: root.querySelector('[data-progress]'),
    current: root.querySelector('[data-current]'),
    duration: root.querySelector('[data-duration]'),
    toggle: root.querySelector('[data-toggle]'),
    volume: root.querySelector('[data-volume]'),
  };

  root.querySelector('[data-previous]').addEventListener('click', () => {
    store.previous();
    audio.play();
  });
  root.querySelector('[data-next]').addEventListener('click', () => {
    store.next();
    audio.play();
  });
  elements.toggle.addEventListener('click', () => {
    store.getState().isPlaying ? audio.pause() : audio.play();
  });
  elements.progress.addEventListener('input', ({ target }) => audio.seek(Number(target.value)));
  elements.volume.addEventListener('input', ({ target }) => store.setState({ volume: Number(target.value) }));

  store.subscribe((state) => {
    const track = state.currentTrack;
    if (track) {
      elements.artwork.src = track.artwork;
      elements.title.textContent = track.title;
      elements.artist.textContent = `${track.artist} · ${track.album}`;
    }
    elements.progress.max = state.duration || 0;
    elements.progress.value = state.currentTime;
    elements.current.textContent = formatTime(state.currentTime);
    elements.duration.textContent = formatTime(state.duration);
    elements.toggle.textContent = state.isPlaying ? 'Ⅱ' : '▶';
    elements.toggle.setAttribute('aria-label', state.isPlaying ? 'Pause' : 'Play');
  });
}
