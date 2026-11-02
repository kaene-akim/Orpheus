# Orpheus

A small music player built with vanilla JavaScript and Vite. It ships with four
demo tracks and original album artwork, so it works as soon as you run it.

## Features

- Playlist with play/pause, previous/next, shuffle, and repeat (off / all / one)
- Seek bar, volume, and mute controls
- Recommended-tracks sidebar with an equalizer indicator for the active song
- Accent color picker in the settings panel (saved to `localStorage`)
- Keyboard shortcuts and Media Session support for OS playback controls
- Flat, left-aligned YouTube-style layout

## Run

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

Production build:

```bash
npm run build
npm run preview
```

## Add your own music

1. Put audio files in `public/assets/audio/`.
2. Put artwork in `public/assets/images/`.
3. Register each track in `src/js/data/tracks.js`:

```js
{
  id: 'my-track',
  title: 'My Track',
  artist: 'My Artist',
  album: 'My Album',
  src: '/assets/audio/my-track.mp3',
  artwork: '/assets/images/my-artwork.svg',
  duration: 180, // optional; used in the queue before audio metadata loads
}
```

## Keyboard shortcuts

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `←` / `→` | Seek 5 seconds |
| `↑` / `↓` | Volume |
| `N` / `P` | Next / previous |
| `M` | Mute |
| `S` | Shuffle |
| `R` | Repeat mode |
| `Esc` | Close settings |

## Project structure

```text
public/assets/
├── audio/       # Demo tracks and your audio files
├── fonts/       # Optional local fonts
├── icons/       # UI icons and SVG assets
└── images/      # Album artwork
src/
├── js/
│   ├── components/  # DOM rendering and UI components
│   ├── data/        # Track and playlist data
│   ├── services/    # Audio playback and browser services
│   ├── state/       # Player state management
│   └── utils/       # Shared helpers
└── styles/          # Player styling
```
