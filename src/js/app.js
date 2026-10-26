import '../styles/main.css';
import { tracks } from './data/tracks.js';
import { createPlayerStore } from './state/playerStore.js';
import { createAudioService } from './services/audioService.js';
import { renderPlayer } from './components/player.js';

const app = document.querySelector('#app');
const store = createPlayerStore(tracks);
const audio = createAudioService(store);

renderPlayer(app, { store, audio });
