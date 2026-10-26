# Orpheus

A simple music player made in JavaScript.

## Project structure

```text
public/assets/
├── audio/       # MP3, WAV, or other playable audio files
├── fonts/       # Optional local fonts
├── icons/       # UI icons and SVG assets
└── images/      # Album artwork and other images
src/
├── js/
│   ├── components/  # DOM rendering and UI components
│   ├── data/        # Track and playlist data
│   ├── services/    # Audio playback and browser services
│   ├── state/       # Player state management
│   └── utils/       # Shared helpers
└── styles/          # Player styling
```

Add audio files to `public/assets/audio`, then register them in
`src/js/data/tracks.js`. Start the development server with:

```bash
npm install
npm run dev
```
