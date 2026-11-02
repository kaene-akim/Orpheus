import '../styles/main.css';
import { createPlayerStore } from './state/playerStore.js';
import { createAudioService } from './services/audioService.js';
import { createArtworkService } from './services/artworkService.js';
import { loadLocalLibrary } from './services/libraryService.js';
import { renderPlayer } from './components/player.js';

const app = document.querySelector('#app');

app.innerHTML = `
  <div class="boot" role="status" aria-live="polite">
    <span class="boot__spinner" aria-hidden="true"></span>
    <p>Reading your music folder…</p>
  </div>
`;

const library = await loadLocalLibrary();

const store = createPlayerStore(library.tracks, {
  libraryRoot: library.root,
  libraryError: library.error,
  libraryMessage: library.message,
});

const artwork = createArtworkService();
const audio = createAudioService(store, { artwork });

renderPlayer(app, { store, audio, artwork });
