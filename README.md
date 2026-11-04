# Orpheus Beta
This is still unfinished for my standards but I don't really intend to go back to this for now. Still works really well for what it is

Orpheus is distributed under the [MIT License](LICENSE).

Orpheus is a small, flat-styled local music player built with vanilla JavaScript
and Vite. It reads the music on your computer, groups songs into albums and
artists, and gives every collection its own queue. Music files are not bundled
with the project — you point Orpheus at your own music folder.

## Features

- Reads music recursively from `~/Music` and any album subfolders inside it
- Groups albums and artists from audio tags, falling back to folder names
- Lists featured artists separately instead of creating a combined artist entry
- Play, pause, previous, next, shuffle, and repeat (off / all / one)
- Liked Songs queue with likes saved in the browser
- Playlist sidebar with an independent queue for every playlist
- Clicking a playlist, album, artist, or Liked Songs only changes the visible
  queue — it never starts playback by itself
- Queue back button (`<`) that returns to the previous queue
- Search the active collection first, then the rest of the library
- Press `Enter` to play the first local result, or `Shift` + `Enter` to search YouTube
- Embedded cover art (for example, artwork stored inside MP3 files)
- Accent color picker and a toggleable moving background in the settings panel
- Keyboard shortcuts and Media Session support for OS playback controls
- Full-screen layout with a fixed stage and an independently scrolling queue

## Requirements

- [Node.js](https://nodejs.org/) `^20.19.0` or `>=22.12.0`
- npm (included with Node.js)
- A modern browser with HTML5 audio support

## Installation

1. Clone the repository and enter its directory:

   ```bash
   git clone https://github.com/kaene-akim/Orpheus.git
   cd Orpheus
   ```

   If you already have the project locally, just open a terminal in the project
   directory.

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Add your music to `~/Music`, or choose another folder. See
   [Adding songs](#adding-songs) for the folder layout, supported formats, and
   custom music locations.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the URL that Vite prints, usually:

   ```text
   http://localhost:5173
   ```

Orpheus must be started with `npm run dev` or `npm run preview`. A plain static
file server is not enough, because a small local API is used to scan the music
folder and stream audio files to the browser.

## Adding songs

Orpheus does not have an in-app upload screen. You add music by putting audio
files in your local music folder; the app finds them automatically. No project
files need to be edited.

### 1. Find or create your music folder

By default Orpheus uses the `Music` folder inside your home directory:

| System | Default folder |
| --- | --- |
| Linux | `/home/<you>/Music` |
| macOS | `/Users/<you>/Music` |
| Windows | `C:\Users\<you>\Music` |

If the folder does not exist yet, create it. For example, on Linux or macOS:

```bash
mkdir -p ~/Music
```

On Windows PowerShell:

```powershell
New-Item -ItemType Directory -Force "$HOME\Music"
```

### 2. Copy songs into it

You can put audio files directly in the music folder, or organise them into
artist and album subfolders. Orpheus scans every subfolder recursively.

```text
~/Music/
├── Artist One/
│   ├── Album A/
│   │   ├── 01 First Song.mp3
│   │   └── 02 Second Song.mp3
│   └── Album B/
│       └── 01 Other Song.flac
└── Artist Two/
    └── Album C/
        └── 01 Duet Song.m4a
```

To copy an existing album folder on Linux or macOS:

```bash
cp -r "/path/to/Album A" ~/Music/
```

On Windows PowerShell:

```powershell
Copy-Item -Recurse "C:\path\to\Album A" "$HOME\Music"
```

Files and folders whose names start with a dot are skipped.

### 3. Reload the app

The local server rescans the music folder when the library is requested. After
adding or removing files, reload the Orpheus page in your browser.

### 4. Use a different music folder (optional)

If your music is somewhere else, set `ORPHEUS_MUSIC_DIR` before starting the
server:

```bash
ORPHEUS_MUSIC_DIR="/path/to/your/music" npm run dev
```

On Windows PowerShell:

```powershell
$env:ORPHEUS_MUSIC_DIR = "D:\Music"
npm run dev
```

The folder is always scanned recursively, so album subfolders work the same
way.

### Supported formats

Orpheus looks for these extensions:

```text
.mp3  .m4a  .aac  .flac  .ogg  .oga  .opus  .wav  .webm  .wma
```

Whether a file actually plays also depends on the browser and its codec support.

### Tags and artwork

Orpheus reads title, artist, album artist, album, track/disc number, year, and
duration from each file's tags with
[`music-metadata`](https://github.com/Borewit/music-metadata). Missing tags fall
back to the filename and folder name.

Album grouping uses the album artist and album title when tags are present.
Keeping files in properly named album folders is still a good idea, because the
folder name is used when a file has no album tag.

When a song credits several artists, Orpheus lists it under each artist. It uses
the file's multi-value artist tags when available and also splits common combined
tags such as `Artist A feat. Artist B`, `Artist A; Artist B`, and `Artist A with
Artist B`. The song itself keeps its original combined artist text in the player
and queue.

Embedded cover art is displayed automatically. Files without embedded art use
the included placeholder image. Separate `cover.jpg` / `folder.png` files are
not scanned at the moment — embed the artwork in the audio file if you want a
custom cover.

## Production build

```bash
npm run build
npm run preview
```

`npm run build` writes the production files to `dist/`. `npm run preview` serves
that build locally with the local music API enabled. Because the API reads files
from your computer, `dist/` cannot be uploaded to a normal static host and still
play local music.

## Using the player

### Playback

The bottom control bar contains:

- Like and add-to-playlist buttons on the left
- Shuffle, previous, play/pause, next, and repeat in the center
- Mute and volume on the right

The progress slider sits just above the control bar. Click or drag it to seek.
The previous and next cover images beside the main artwork are also clickable.

### The queue

The right-hand queue panel shows the active **Up next** queue, or the collection
you are currently browsing. Click any song to play it. The queue scrolls
independently while the player stage stays fixed.

- **All Songs** is the full library queue.
- Selecting a playlist, album, artist, or **Liked Songs** replaces the queue with
  that collection's songs.
- Selecting a collection does not start playback. Press play or click a song when
  you are ready.
- Use the back button (`<`) next to the queue title to return to the previous
  queue. Orpheus remembers the last 25 queues.

### Liked Songs

Open the sidebar and choose **Liked Songs** to see every song you have liked.
Click the heart in the bottom-left control group to like or unlike the current
song. Likes are saved in the browser and appear in the Liked Songs count in the
sidebar.

### Playlists

Open the playlist sidebar by clicking the music icon next to the **Orpheus**
name. Click the icon again, press `Esc`, click the close button, or click the
dimmed backdrop to close it.

Use the **Playlists**, **Artists**, and **Albums** tabs at the top of the sidebar
to browse your library in the same way as a desktop music app.

To create a playlist:

- Open the sidebar and use the **New playlist** field at the bottom, or
- Open the add-to-playlist menu and create one there.

To add the currently playing song to a playlist:

1. Play the song.
2. Click the playlist icon in the bottom-left control group.
3. Select a playlist to add the song. Select it again to remove the song.

Playlists and likes are stored in the browser with `localStorage`; they are not
written back to your music files. They are therefore specific to that browser
and device.

### Search

The search bar is in the top header.

- Results are grouped into the active collection first, then **All Songs**.
- Clicking a result from the active collection keeps that collection's queue active.
- Clicking an **All Songs** result switches to the full library queue.
- Press `Enter` to play the first local result.
- Press `Shift` + `Enter` to open the current search on YouTube in a new tab.
  This is deliberate: `Enter` never leaves the app, so a typo cannot send you to
  YouTube unexpectedly.
- Press `/` anywhere outside a text field to focus the search bar.
- Press `Esc` in the search field to clear and leave it.

Search only covers the local library. YouTube is used only through the explicit
`Shift` + `Enter` action.

### Settings

Click the gear icon in the header to open settings. It contains the accent color
picker, a **Moving background** toggle, and a keyboard shortcut reference. The
accent color and background setting are applied immediately and saved in the
browser. The background animation is also disabled automatically when your system
requests reduced motion.

## Keyboard shortcuts

Global shortcuts are ignored while typing in an input.

| Key | Action |
| --- | --- |
| `Space` | Play / pause |
| `←` / `→` | Seek backward / forward 5 seconds |
| `↑` / `↓` | Volume up / down |
| `N` / `P` | Next / previous track |
| `M` | Mute / unmute |
| `S` | Toggle shuffle |
| `R` | Cycle repeat: off → all → one |
| `/` | Focus the search bar |
| `Shift` + `Enter` | Search YouTube (while the search bar is focused) |
| `Esc` | Close the search, playlist menu, sidebar, or settings |

## Saved browser data

Orpheus uses these `localStorage` keys:

| Key | Contents |
| --- | --- |
| `orpheus:player-prefs` | Volume, mute, shuffle, repeat, and accent color |
| `orpheus:playlists` | Playlist names and their track IDs |
| `orpheus:liked` | Liked track IDs |

To reset everything, open the browser developer tools console and run:

```js
localStorage.removeItem('orpheus:player-prefs');
localStorage.removeItem('orpheus:playlists');
localStorage.removeItem('orpheus:liked');
```

Then reload the page.

## Project structure

```text
server/
└── localMusicPlugin.js  # Recursive music scan, metadata, artwork, and media API
public/
└── assets/
    ├── fonts/           # Optional local fonts
    ├── icons/           # UI icons and SVG assets
    └── images/          # Placeholder and fallback artwork
src/
├── js/
│   ├── app.js           # App entry point and library bootstrap
│   ├── components/      # DOM rendering and player UI
│   ├── data/            # Old demo track data
│   ├── services/        # Audio, artwork, and local library services
│   ├── state/           # Player, queue, playlist, and likes state
│   └── utils/           # Shared helpers
└── styles/              # Player styling
index.html
vite.config.js
package.json
```

## Troubleshooting

### The app says the music folder is missing

- Check that `~/Music` exists, or set `ORPHEUS_MUSIC_DIR` to the correct folder.
- Restart the dev or preview server after changing the environment variable.
- Make sure the folder contains at least one supported audio file.

### The app says the local music server is not available

- Start Orpheus with `npm run dev` or `npm run preview`.
- A static preview of `dist/` will not work because it cannot read local files.
- Check the terminal running Vite for errors.

### A song will not play

- Make sure the format is supported by your browser.
- Check the error message shown in the player.
- If the file is in a folder, confirm the folder is inside the configured music
  directory.

### There is no sound

- Press play, then check the volume slider and mute button.
- Browsers may block audio until you interact with the page; click play once.

### My new song does not appear

- Confirm the file has a supported extension.
- Confirm it is inside the configured music folder or one of its subfolders.
- The library is rescanned automatically after a short delay. Reload the page if
  it still does not appear.

### A playlist is empty

Playlists only contain songs you add to them. Play the song and use the
playlist button in the bottom-left control group to add it.

### The dev server port is already in use

Run Vite on another port:

```bash
npm run dev -- --port 5174
```

### Search finds nothing locally

Search matches the local `title`, `artist`, and `album` fields. Check your
spelling, or use `Shift` + `Enter` to search YouTube.
