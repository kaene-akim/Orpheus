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
- Detects playlist folders automatically when a folder mixes songs from several albums
- Fetches missing playlist covers from MusicBrainz and the Cover Art Archive
- Stores downloaded covers locally and shares one file per album to avoid duplicates
- Lists featured artists separately instead of creating a combined artist entry
- Play, pause, previous, next, shuffle, and repeat (off / all / one)
- Liked Songs queue with likes saved in the browser
- Playlist sidebar with an independent queue for every playlist
- Clicking a playlist, album, artist, or Liked Songs only changes the visible
  queue — it never starts playback by itself
- Queue back button (`<`) that returns to the previous queue
- Separate **User queue** tab with drag-and-drop reordering, play-next, and clear
- Right-click menus for songs, cover art, and playlists, plus a searchable song picker
- Synced lyrics from LRCLIB in fullscreen, with seek-on-line and auto-scroll
- Plain-text lyrics fallback from Lyrics.ovh when LRCLIB has no match or times out
- Lyrics appearance controls: 90+ local typefaces, size, weight, spacing, color,
  dynamic accent color, and a panel width that can fill the whole player
- Search the active collection first, then the rest of the library
- Press `Enter` to play the first local result, or `Shift` + `Enter` to search YouTube
- Embedded cover art (for example, artwork stored inside MP3 files)
- Album colors that match the accent and background to the current cover art
- Accent color picker and a fast, high-contrast moving background in settings
- Carousel animation that slides the current cover into place on next / previous
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

### Open from a desktop launcher (Linux, optional)

Instead of opening a terminal every time, create a wrapper that starts the dev
server only when it is not already running, then opens the app. Save it as
`~/.local/bin/orpheus` and make it executable (`chmod +x`):

```bash
#!/usr/bin/env bash
set -u
APP_DIR="$HOME/Orpheus"
URL="http://localhost:5173/"
mkdir -p "$HOME/.cache"

if ! curl -fsS --max-time 1 "$URL" >/dev/null 2>&1; then
  cd "$APP_DIR" || exit 1
  nohup npm run dev -- --host 127.0.0.1 >"$HOME/.cache/orpheus-dev.log" 2>&1 &
  for _ in $(seq 1 60); do
    curl -fsS --max-time 1 "$URL" >/dev/null 2>&1 && break
    sleep 0.25
  done
fi

xdg-open "$URL" >/dev/null 2>&1 &
```

Then add `~/.local/share/applications/orpheus.desktop`:

```ini
[Desktop Entry]
Type=Application
Name=Orpheus
GenericName=Music Player
Comment=Local music player
Exec=/home/YOUR_USER/.local/bin/orpheus
Icon=orpheus
Terminal=false
Categories=AudioVideo;Audio;Player;
Keywords=music;player;orpheus;local;
```

Install the guitar icon under the freedesktop icon theme so launchers can find
it by name:

```bash
mkdir -p ~/.local/share/icons/hicolor/scalable/apps
cp public/assets/images/orpheus-guitar.svg \
  ~/.local/share/icons/hicolor/scalable/apps/orpheus.svg
update-desktop-database ~/.local/share/applications
gtk-update-icon-cache -f -t ~/.local/share/icons/hicolor
```

The entry now appears in fuzzel and other application launchers as **Orpheus**.
Search for it, press `Enter`, and the wrapper handles the rest. If you change the
port, update both `URL` in the wrapper and the `.desktop` file if it embeds one.

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

Playlist downloads often reuse one generic playlist cover for every song, or
keep the wrong album art on singles. The cover fetcher in settings can replace
that artwork with the real album or single cover without changing your files;
see [Playlist folders and covers](#playlist-folders-and-covers).

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
Skipping with the next / previous buttons, the side covers, or the `N` / `P`
keys slides the active cover into its new carousel position.

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

The queue has two tabs:

- **Up next** follows the collection you are browsing.
- **User queue** is your own list. Right-click any song and choose **Add to
  queue**, or use **Play next** to put it at the front. Drag the handle on the
  left of a row to reorder it, or focus the handle and press `↑` / `↓`. Press
  `Delete` or `Backspace` on a focused handle to remove a row. **Clear** empties
  the user queue.

Right-click anywhere on the player to open the current song's menu, or
right-click a queue row or sidebar playlist to target that item instead. The menu
lets you play it next, add it to the queue, like it, jump to its artist or album,
copy its details, open it on other services, or reach **Player settings** while
staying in fullscreen. The add-songs picker is searchable; with an empty search
it lists every song, `Enter` adds the first match, and clicking a song toggles
it.

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

### Playlist folders and covers

A folder is treated as a playlist automatically when its songs point at
different albums. Orpheus also recognises large multi-artist folders with names
such as `Best of 2024` or `Road Trip`. These folders appear in the **Playlists**
tab with a **Playlist folder** label. Their songs are removed from the normal
album list so a playlist does not create dozens of fake one-song albums.

Songs in these folders often carry a generic playlist image, or a single's
artwork when they actually belong to an album. Open the gear icon and click
**Fetch album covers** to look up the real art. The command:

- Only looks up songs in detected playlist folders.
- Skips any cover that has already been downloaded.
- Prefers the matching album release, then official singles and albums, and
  avoids compilations and live releases.
- Replaces the displayed artwork even when the file has embedded art. Your
  audio files are never modified.

Playlist downloads also tend to fake the album tag: every file may claim to be
part of `Best of 2024 - Part 1` rather than the song's real album. Orpheus
recognises these collection-style tags (from the folder name, playlist-style
words such as "best of" or "hits", and shared album tags across unrelated
artists) and ignores them during lookups. Those songs are matched individually
instead of being forced into one fake album. Combined tags such as
`BAND4BAND (feat. Lil Baby)` and `Clipse;Kendrick Lamar;Pusha T` are also
retried with the featured artist and title decorations removed.

Downloaded covers live in `media/covers/` next to the project, with a
`manifest.json` index. Each image is named from its own content hash, so the
same image is stored only once. Songs tagged as part of the same real album
share one cover entry; songs whose album tag is just the playlist folder name
are treated as separate singles and looked up individually. Downloader-style
album artists such as `www.SongsLover.com` are ignored when grouping songs by
album.

The first fetch can take a while because MusicBrainz asks clients to make about
one request per second. The settings panel shows progress while the lookup is
running. MusicBrainz rate limits (`429`) and temporary server errors (`503` and
other `5xx` responses) are retried with `Retry-After` support and exponential
backoff, so a busy API does not leave gaps in the playlist. Set
`ORPHEUS_MEDIA_DIR` to store the media folder somewhere else:

```bash
ORPHEUS_MEDIA_DIR="/path/to/orpheus-media" npm run dev
```

Cover lookups use the public MusicBrainz and Cover Art Archive APIs. For offline
testing or a mirror, the following environment variables are also available:
`ORPHEUS_MUSICBRAINZ_URL`, `ORPHEUS_COVERART_URL`, and
`ORPHEUS_MUSICBRAINZ_INTERVAL_MS`.

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
picker, an **Album colors** toggle, a **Moving background** toggle, a **Fetch
album covers** action, the **Lyrics appearance** controls, and a keyboard
shortcut reference. In fullscreen you can still open settings from the right-click
song menu.

**Album colors** is on by default. It samples the most prominent color from the
current cover art and uses it for the accent and a soft background tint — even
when the moving background is off. Covers without a usable color keep your chosen
accent. Picking an accent swatch turns album colors off so your choice stays put;
use the toggle to turn them back on.

The accent color and both toggles are applied immediately and saved in the
browser. The background animation is also disabled automatically when your system
requests reduced motion.

**Fetch album covers** looks up artwork for detected playlist folders and
reports how many covers were downloaded, matched to an existing album, already
cached, or not found. It reloads the page after new artwork arrives. See
[Playlist folders and covers](#playlist-folders-and-covers) for details.

### Lyrics

Press `F` to enter fullscreen. Orpheus loads time-synced lyrics from
[LRCLIB](https://lrclib.net/) for the current song and follows playback
automatically. Click a lyric line to seek to that point. The fullscreen view
hides the header and queue so the artwork and lyrics get the whole window.

Lyrics are not scraped from Google or Genius; Orpheus only calls lyric APIs. If
LRCLIB has no match, times out, or cannot be reached, Orpheus retries the lookup
with **Lyrics.ovh** and shows the plain-text result with an **Unsynced lyrics**
note. If neither service has the song, the panel stays empty instead of showing
unrelated text.

The lyric lookups are proxied through the local server and cached for a few
hours. Set `ORPHEUS_LYRICS_URL` or `ORPHEUS_LYRICS_FALLBACK_URL` to use a mirror
or a compatible service.

Open **Lyrics appearance** in settings to change:

- Font size, weight, style, line spacing, alignment, and uppercase/glow effects
- One of 90+ local typefaces, grouped as sans serif, serif, display, handwriting,
  and monospace (no runtime font downloads)
- Text color, or **Dynamic color** to follow the accent and album color live
- Panel width from 30% up to 100% of the player, background dimming, and a sync
  offset for lyrics that run early or late

All appearance settings are saved in the browser. `Esc` closes settings and
panels first; press it again to leave fullscreen.

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
| `F` | Enter or leave fullscreen |
| `/` | Focus the search bar |
| `Shift` + `Enter` | Search YouTube (while the search bar is focused) |
| `↑` / `↓` on a queue handle | Move that song up or down in the user queue |
| `Delete` / `Backspace` on a queue handle | Remove that song from the user queue |
| `Esc` | Close settings, menus, the search, or the sidebar; then leave fullscreen |

## Saved browser data

Orpheus uses these `localStorage` keys:

| Key | Contents |
| --- | --- |
| `orpheus:player-prefs` | Volume, mute, shuffle, repeat, accent color, album colors, moving background, and lyrics appearance |
| `orpheus:user-queue` | The songs in your user queue, in order |
| `orpheus:playlists` | Playlist names and their track IDs |
| `orpheus:liked` | Liked track IDs |

To reset everything, open the browser developer tools console and run:

```js
localStorage.removeItem('orpheus:player-prefs');
localStorage.removeItem('orpheus:playlists');
localStorage.removeItem('orpheus:liked');
localStorage.removeItem('orpheus:user-queue');
```

Then reload the page.

## Project structure

```text
media/
└── covers/              # Downloaded playlist covers and manifest.json
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

### Fetch album covers does not find a song

- Covers are only looked up for songs inside detected playlist folders. A normal
  album folder keeps its embedded artwork.
- Check your internet connection; MusicBrainz and the Cover Art Archive must be
  reachable.
- Very obscure releases, bootlegs, or badly tagged titles may not have a match.
  Fixing the title and artist tags in the file usually helps.
- Run the fetch again after adding music. Covers that were already downloaded
  are skipped, so only new songs are looked up.

### The dev server port is already in use

Run Vite on another port:

```bash
npm run dev -- --port 5174
```

### Search finds nothing locally

Search matches the local `title`, `artist`, and `album` fields. Check your
spelling, or use `Shift` + `Enter` to search YouTube.
