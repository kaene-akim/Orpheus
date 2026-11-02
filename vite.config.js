import { defineConfig } from 'vite';
import { createLocalMusicPlugin } from './server/localMusicPlugin.js';

export default defineConfig({
  plugins: [createLocalMusicPlugin()],
});
