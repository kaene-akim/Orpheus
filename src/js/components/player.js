import { formatTime } from '../utils/formatTime.js';
import { albumAccentColor } from '../utils/albumColor.js';
import { fetchPlaylistCovers, fetchPlaylistCoverStatus } from '../services/libraryService.js';
import { fetchLyrics } from '../services/lyricsService.js';
import { LYRICS_FONTS, LYRICS_FONT_GROUPS, lyricsFontStack } from '../data/lyricsFonts.js';

const DEFAULT_ART = '/assets/images/default-album-art.svg';
const SIDE_COVER_FILTER = 'saturate(0.6) brightness(0.85)';

const SIDEBAR_FILTERS = [
  { id: 'playlists', label: 'Playlists' },
  { id: 'artists', label: 'Artists' },
  { id: 'albums', label: 'Albums' },
];

const ACCENT_COLORS = [
  '#b49cff',
  '#7ee0d3',
  '#ff8db3',
  '#ffd166',
  '#7cc4ff',
  '#9ef07a',
  '#ff9f6e',
  '#f5f5f5',
];

const icons = {
  note: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,
  guitar: `<path d="M12 8.5c-1.7 0-3 1.1-3.2 2.6-.1 1 .3 1.8.9 2.5-.8.5-1.7 1.3-2 2.3-.7 2.4 1.2 4.1 4.3 4.1s5-1.7 4.3-4.1c-.3-1-1.2-1.8-2-2.3.6-.7 1-1.5.9-2.5-.2-1.5-1.5-2.6-3.2-2.6z" fill="currentColor" stroke="none"/><circle cx="12" cy="12.3" r="1.05" fill="#000" stroke="none"/><path d="M11 3.5h2V9h-2z" fill="currentColor" stroke="none"/><path d="M10.4 2c0-.6.4-1 1-1h1.2c.6 0 1 .4 1 1v1.5h-3.2z" fill="currentColor" stroke="none"/><circle cx="10.2" cy="1.6" r=".7" fill="currentColor" stroke="none"/><circle cx="13.8" cy="1.6" r=".7" fill="currentColor" stroke="none"/>`,
  play: `<path d="M8 5.2c0-.8.9-1.3 1.6-.9l9.6 6.8c.6.4.6 1.4 0 1.8l-9.6 6.8c-.7.4-1.6-.1-1.6-.9z" fill="currentColor" stroke="none"/>`,
  pause: `<rect x="6.4" y="5" width="4.2" height="14" rx="1.4" fill="currentColor" stroke="none"/><rect x="13.4" y="5" width="4.2" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,
  previous: `<path d="M19 5.5v13L9.8 12z" fill="currentColor" stroke="none"/><rect x="5" y="5" width="2.8" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,
  next: `<path d="M5 5.5v13L14.2 12z" fill="currentColor" stroke="none"/><rect x="16.2" y="5" width="2.8" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,
  shuffle: `<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.97a4 4 0 0 0 3.3-1.7l5.46-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.97a4 4 0 0 1 3.3 1.7l5.46 8.6a4 4 0 0 0 3.3 1.7H22"/>`,
  repeat: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,
  repeatOne: `<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h2v5"/>`,
  volumeHigh: `<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>`,
  volumeLow: `<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>`,
  volumeMute: `<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m16 9 5 5"/><path d="m21 9-5 5"/>`,
  search: `<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`,
  heart: `<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>`,
  playlist: `<path d="M3 6h11"/><path d="M3 12h11"/><path d="M3 18h7"/><path d="M17 11v8"/><path d="M13 15h8"/>`,
  close: `<path d="m6 6 12 12"/><path d="m18 6-12 12"/>`,
  back: `<path d="m15 18-6-6 6-6"/>`,
  album: `<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/>`,
  artist: `<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/>`,
  more: `<circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/>`,
  queue: `<path d="M3 6h12"/><path d="M3 12h12"/><path d="M3 18h8"/><path d="M18 10v9"/><path d="M14 14h8"/>`,
  plus: `<path d="M12 5v14"/><path d="M5 12h14"/>`,
  grip: `<path d="M7 9h10"/><path d="M7 14h10"/><path d="M7 19h10"/>`,
  expand: `<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>`,
  collapse: `<path d="M3 8h3a2 2 0 0 0 2-2V3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/>`,
  chevron: `<path d="m9 18 6-6-6-6"/>`,
  external: `<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>`,
  info: `<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.6" r="1" fill="currentColor" stroke="none"/>`,
  copy: `<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>`,
  trash: `<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 15h10l1-15"/><path d="M10 11v6"/><path d="M14 11v6"/>`,
  refresh: `<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>`,
  lyrics: `<path d="M4 5h16"/><path d="M4 10h9"/><path d="M4 15h16"/><path d="M4 20h7"/>`,
  settings: `<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`,
};

function icon(name) {
  return `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${icons[name]}</svg>`;
}

function escapeHtml(value = '') {
  return String(value).replace(
    /[&<>"']/g,
    (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
  );
}

function isTypingTarget(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(target.tagName))
  );
}

function isEditableTarget(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
  );
}

function trackHaystack(track) {
  const artists = Array.isArray(track.artists) ? track.artists.join(' ') : '';
  return `${track.title} ${track.artist} ${artists} ${track.album}`.toLowerCase();
}

export function renderPlayer(root, { store, audio, artwork }) {
  const art = artwork ?? {
    urlFor: (track) => track?.artwork ?? DEFAULT_ART,
    resolve: () => Promise.resolve(),
    subscribe: () => () => {},
  };

  root.innerHTML = `
    <section class="player" data-player aria-label="Orpheus music player">
      <div class="ambient" data-ambient aria-hidden="true">
        <i></i><i></i><i></i>
      </div>

      <div class="sidebar-backdrop" data-sidebar-backdrop></div>

      <aside class="sidebar" id="playlists-sidebar" data-sidebar aria-hidden="true" aria-label="Your library">
        <div class="sidebar__header">
          <div>
            <p class="sidebar__eyebrow">Orpheus</p>
            <h2>Your library</h2>
          </div>
          <button class="sidebar__close" type="button" data-sidebar-close aria-label="Close library">
            ${icon('close')}
          </button>
        </div>
        <div class="sidebar__filters" role="tablist" aria-label="Library filter" data-sidebar-filters></div>
        <div class="sidebar__list" data-sidebar-list></div>
        <form class="sidebar__form" data-create-playlist-form>
          <input
            class="sidebar__input"
            type="text"
            placeholder="New playlist"
            maxlength="40"
            aria-label="New playlist name"
            autocomplete="off"
            data-create-playlist-name
          />
          <button class="sidebar__create" type="submit">Create</button>
        </form>
      </aside>

      <header class="player__header">
        <button
          class="brand"
          type="button"
          data-sidebar-toggle
          aria-expanded="false"
          aria-controls="playlists-sidebar"
          title="Show playlists"
        >
          <span class="brand__mark">${icon('guitar')}</span>
          <span class="brand__name">Orpheus</span>
        </button>

        <form class="search" role="search" data-search-form>
          <div class="search__field">
            <span class="search__icon" aria-hidden="true">${icon('search')}</span>
            <input
              class="search__input"
              type="search"
              name="q"
              placeholder="Search songs"
              aria-label="Search songs"
              autocomplete="off"
              data-search
            />
            <kbd class="search__kbd" aria-hidden="true">/</kbd>
          </div>
          <button class="search__button" type="submit" aria-label="Search" title="Search">
            ${icon('search')}
          </button>
        </form>

        <div class="header-actions">
          <button
            class="icon-button icon-button--fullscreen"
            type="button"
            data-fullscreen-toggle
            aria-label="Enter fullscreen"
            aria-pressed="false"
            title="Fullscreen (F)"
          >
            ${icon('expand')}
          </button>

          <button
            class="icon-button"
            type="button"
            data-settings-toggle
            aria-label="Player settings"
            aria-expanded="false"
            aria-controls="settings-panel"
            title="Settings"
          >
            ${icon('settings')}
          </button>

          <div class="settings" id="settings-panel" data-settings hidden>
            <p class="settings__title">Accent color</p>
            <p class="settings__hint">Choose a bright color for buttons and outlines.</p>
            <div class="settings__swatches" data-swatches>
              ${ACCENT_COLORS.map(
                (color) => `
                  <button
                    class="swatch"
                    type="button"
                    data-accent-color="${color}"
                    style="--swatch: ${color}"
                    aria-label="Use accent color ${color}"
                    aria-pressed="false"
                    title="${color}"
                  ></button>
                `,
              ).join('')}
            </div>

            <div class="settings__section settings__row">
              <div>
                <p class="settings__title">Album colors</p>
                <p class="settings__hint">
                  Match accents and the background to the current cover. Choosing a swatch turns
                  this off.
                </p>
              </div>
              <button
                class="switch"
                type="button"
                role="switch"
                aria-checked="true"
                aria-label="Album colors"
                data-color-mode-toggle
              >
                <span class="switch__thumb" aria-hidden="true"></span>
              </button>
            </div>

            <div class="settings__section settings__row">
              <div>
                <p class="settings__title">Moving background</p>
                <p class="settings__hint">An animated color wash behind the player.</p>
              </div>
              <button
                class="switch"
                type="button"
                role="switch"
                aria-checked="true"
                aria-label="Moving background"
                data-motion-toggle
              >
                <span class="switch__thumb" aria-hidden="true"></span>
              </button>
            </div>

            <div class="settings__section">
              <p class="settings__title">Playlist covers</p>
              <p class="settings__hint">
                Look up missing covers for songs in playlist folders on MusicBrainz. Covers that
                were already fetched are skipped.
              </p>
              <button class="settings__action" type="button" data-fetch-covers>
                Fetch album covers
              </button>
              <p class="settings__status" data-cover-status aria-live="polite"></p>
            </div>

            <div class="settings__section">
              <p class="settings__title">Lyrics appearance</p>
              <p class="settings__hint">
                Synced lyrics appear in fullscreen. Press <kbd>F</kbd> to open it; changes apply
                live.
              </p>

              <label class="settings__control">
                <span class="settings__control-label">
                  Font size <b data-lyrics-value="lyricsFontSize">34 px</b>
                </span>
                <input
                  class="settings__range"
                  type="range"
                  min="18"
                  max="72"
                  step="1"
                  data-lyrics-setting="lyricsFontSize"
                />
              </label>

              <div class="settings__control">
                <span class="settings__control-label">Text color</span>
                <div class="settings__color-row">
                  <input
                    class="settings__color"
                    type="color"
                    data-lyrics-setting="lyricsColor"
                    aria-label="Lyrics text color"
                  />
                  <span class="settings__color-note" data-lyrics-color-note>Custom</span>
                </div>
              </div>

              <div class="settings__row settings__row--tight">
                <div>
                  <p class="settings__title">Dynamic color</p>
                  <p class="settings__hint">
                    Follow the accent color automatically, including album colors.
                  </p>
                </div>
                <button
                  class="switch"
                  type="button"
                  role="switch"
                  aria-checked="false"
                  aria-label="Dynamic lyrics color"
                  data-lyrics-toggle="lyricsFollowAccent"
                >
                  <span class="switch__thumb" aria-hidden="true"></span>
                </button>
              </div>

              <div class="settings__control">
                <span class="settings__control-label">Alignment</span>
                <div class="segmented" data-lyrics-choice="lyricsAlignment">
                  <button type="button" data-value="left">Left</button>
                  <button type="button" data-value="center">Center</button>
                  <button type="button" data-value="right">Right</button>
                </div>
              </div>

              <div class="settings__control">
                <span class="settings__control-label">Weight</span>
                <select class="settings__select" data-lyrics-setting="lyricsWeight">
                  <option value="300">Light</option>
                  <option value="400">Regular</option>
                  <option value="500">Medium</option>
                  <option value="600">Semibold</option>
                  <option value="700">Bold</option>
                  <option value="800">Extra bold</option>
                </select>
              </div>

              <div class="settings__control">
                <span class="settings__control-label">Style</span>
                <select class="settings__select" data-lyrics-setting="lyricsStyle">
                  <option value="normal">Normal</option>
                  <option value="italic">Italic</option>
                </select>
              </div>

              <div class="settings__control">
                <span class="settings__control-label">Typeface</span>
                <select class="settings__select" data-lyrics-setting="lyricsFont">
                  ${LYRICS_FONT_GROUPS.map(
                    (group) => `
                      <optgroup label="${group}">
                        ${LYRICS_FONTS.filter((font) => font.group === group)
                          .map(
                            (font) =>
                              `<option value="${font.id}">${font.label}</option>`,
                          )
                          .join('')}
                      </optgroup>
                    `,
                  ).join('')}
                </select>
              </div>

              <label class="settings__control">
                <span class="settings__control-label">
                  Panel width <b data-lyrics-value="lyricsWidth">46%</b>
                </span>
                <input
                  class="settings__range"
                  type="range"
                  min="30"
                  max="100"
                  step="1"
                  data-lyrics-setting="lyricsWidth"
                />
              </label>

              <label class="settings__control">
                <span class="settings__control-label">
                  Line spacing <b data-lyrics-value="lyricsLineHeight">1.65</b>
                </span>
                <input
                  class="settings__range"
                  type="range"
                  min="1.1"
                  max="2.6"
                  step="0.05"
                  data-lyrics-setting="lyricsLineHeight"
                />
              </label>

              <label class="settings__control">
                <span class="settings__control-label">
                  Sync offset <b data-lyrics-value="lyricsOffset">0.0 s</b>
                </span>
                <input
                  class="settings__range"
                  type="range"
                  min="-5"
                  max="5"
                  step="0.1"
                  data-lyrics-setting="lyricsOffset"
                />
              </label>

              <label class="settings__control">
                <span class="settings__control-label">
                  Panel shade <b data-lyrics-value="lyricsBackground">32%</b>
                </span>
                <input
                  class="settings__range"
                  type="range"
                  min="0"
                  max="0.9"
                  step="0.05"
                  data-lyrics-setting="lyricsBackground"
                />
              </label>

              <div class="settings__row settings__row--tight">
                <div>
                  <p class="settings__title">Dim past lines</p>
                  <p class="settings__hint">Keep only the current lyric bright.</p>
                </div>
                <button
                  class="switch"
                  type="button"
                  role="switch"
                  aria-checked="true"
                  aria-label="Dim past lyrics"
                  data-lyrics-toggle="lyricsDim"
                >
                  <span class="switch__thumb" aria-hidden="true"></span>
                </button>
              </div>

              <div class="settings__row settings__row--tight">
                <div>
                  <p class="settings__title">Text glow</p>
                  <p class="settings__hint">A soft halo around the active line.</p>
                </div>
                <button
                  class="switch"
                  type="button"
                  role="switch"
                  aria-checked="false"
                  aria-label="Lyrics text glow"
                  data-lyrics-toggle="lyricsGlow"
                >
                  <span class="switch__thumb" aria-hidden="true"></span>
                </button>
              </div>

              <div class="settings__row settings__row--tight">
                <div>
                  <p class="settings__title">Uppercase</p>
                  <p class="settings__hint">Display every lyric in capitals.</p>
                </div>
                <button
                  class="switch"
                  type="button"
                  role="switch"
                  aria-checked="false"
                  aria-label="Uppercase lyrics"
                  data-lyrics-toggle="lyricsUppercase"
                >
                  <span class="switch__thumb" aria-hidden="true"></span>
                </button>
              </div>

              <button class="settings__action settings__action--quiet" type="button" data-lyrics-reset>
                Reset lyrics appearance
              </button>
            </div>

            <div class="settings__section">
              <p class="settings__title">Keyboard shortcuts</p>
              <div class="shortcuts">
                <div class="shortcut"><span>Search</span><kbd>/</kbd></div>
                <div class="shortcut"><span>Play / pause</span><kbd>Space</kbd></div>
                <div class="shortcut"><span>Seek</span><span class="shortcut__keys"><kbd>←</kbd><kbd>→</kbd></span></div>
                <div class="shortcut"><span>Volume</span><span class="shortcut__keys"><kbd>↑</kbd><kbd>↓</kbd></span></div>
                <div class="shortcut"><span>Next / previous</span><span class="shortcut__keys"><kbd>N</kbd><kbd>P</kbd></span></div>
                <div class="shortcut"><span>Mute</span><kbd>M</kbd></div>
                <div class="shortcut"><span>Shuffle</span><kbd>S</kbd></div>
                <div class="shortcut"><span>Repeat</span><kbd>R</kbd></div>
                <div class="shortcut"><span>YouTube search</span><span class="shortcut__keys"><kbd>Shift</kbd><kbd>Enter</kbd></span></div>
                <div class="shortcut"><span>Fullscreen</span><kbd>F</kbd></div>
                <div class="shortcut"><span>Close panels</span><kbd>Esc</kbd></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="player__body">
        <section class="now-playing" aria-label="Now playing">
          <div class="cover-flow" data-cover-flow>
            <div class="cover-flow__transition" data-cover-transition aria-hidden="true"></div>
            <button
              class="cover-flow__side cover-flow__side--prev"
              type="button"
              data-prev-cover
              aria-label="Play previous track"
            >
              <img src="${DEFAULT_ART}" alt="" data-prev-artwork loading="lazy" />
            </button>
            <div class="artwork-frame">
              <img class="artwork-frame__image" data-artwork src="${DEFAULT_ART}" alt="" />
            </div>
            <button
              class="cover-flow__side cover-flow__side--next"
              type="button"
              data-next-cover
              aria-label="Play next track"
            >
              <img src="${DEFAULT_ART}" alt="" data-next-artwork loading="lazy" />
            </button>
          </div>

          <div class="track-meta">
            <p class="track-meta__album" data-album>Album</p>
            <h1 class="track-meta__title" data-title>Choose a track</h1>
            <p class="track-meta__artist" data-artist>Orpheus</p>
          </div>

          <div class="progress">
            <div class="range-shell">
              <span class="range-shell__track" aria-hidden="true"></span>
              <span class="range-shell__fill" aria-hidden="true"></span>
              <input
                class="range"
                data-progress
                type="range"
                min="0"
                max="100"
                step="0.01"
                value="0"
                aria-label="Seek through track"
              />
            </div>
            <div class="progress__time">
              <span data-current>0:00</span>
              <span data-duration>0:00</span>
            </div>
          </div>

          <p class="player__error" data-error role="alert" hidden></p>

          <div class="control-bar">
            <div class="track-actions">
              <button
                class="action"
                type="button"
                data-like
                aria-pressed="false"
                aria-label="Like this song"
                title="Like this song"
              >
                ${icon('heart')}
              </button>
              <div class="playlist-menu">
                <button
                  class="action"
                  type="button"
                  data-playlist-toggle
                  aria-expanded="false"
                  aria-controls="playlist-menu"
                  aria-label="Add to playlist"
                  title="Add to playlist"
                >
                  ${icon('playlist')}
                </button>
                <div class="playlist-menu__popover" id="playlist-menu" data-playlist-menu hidden>
                  <p class="playlist-menu__title">Add to playlist</p>
                  <div class="playlist-menu__list" data-playlist-list></div>
                  <form class="playlist-menu__form" data-playlist-form>
                    <input
                      class="playlist-menu__input"
                      type="text"
                      name="name"
                      placeholder="New playlist"
                      maxlength="40"
                      aria-label="New playlist name"
                      autocomplete="off"
                      data-playlist-name
                    />
                    <button class="playlist-menu__create" type="submit">Create</button>
                  </form>
                </div>
              </div>
            </div>

            <div class="controls">
              <button class="control" type="button" data-shuffle aria-label="Shuffle" aria-pressed="false" title="Shuffle">
                ${icon('shuffle')}
              </button>
              <button class="control" type="button" data-previous aria-label="Previous track" title="Previous track">
                ${icon('previous')}
              </button>
              <button class="control control--play" type="button" data-toggle aria-label="Play" title="Play">
                ${icon('play')}
              </button>
              <button class="control" type="button" data-next aria-label="Next track" title="Next track">
                ${icon('next')}
              </button>
              <button class="control" type="button" data-repeat aria-label="Repeat: off" aria-pressed="false" title="Repeat: off">
                ${icon('repeat')}
              </button>
            </div>

            <div class="volume">
              <button class="volume__button" type="button" data-mute aria-label="Mute" title="Mute">
                ${icon('volumeHigh')}
              </button>
              <span class="volume__value" data-volume-label>80%</span>
              <div class="range-shell range-shell--volume">
                <span class="range-shell__track" aria-hidden="true"></span>
                <span class="range-shell__fill" aria-hidden="true"></span>
                <input
                  class="range range--volume"
                  data-volume
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value="0.8"
                  aria-label="Volume"
                />
              </div>
            </div>
          </div>
        </section>

        <aside class="queue" aria-label="Queue">
          <div class="queue__header">
            <div class="queue__heading">
              <button
                class="queue__back"
                type="button"
                data-queue-back
                aria-label="Back to previous queue"
                title="Back to previous queue"
                hidden
              >
                ${icon('back')}
              </button>
              <div class="queue__heading-text">
                <p class="queue__source" data-queue-source>All Songs</p>
                <h2 data-queue-title>Up next</h2>
              </div>
            </div>
            <div class="queue__header-actions">
              <button
                class="queue__clear"
                type="button"
                data-queue-clear
                title="Clear the queue"
                hidden
              >
                Clear
              </button>
              <span class="queue__count" data-count></span>
            </div>
          </div>

          <div class="queue__tabs" role="tablist" aria-label="Queue view">
            <button
              class="queue__tab is-active"
              type="button"
              role="tab"
              aria-selected="true"
              data-queue-tab="upnext"
            >
              Up next
            </button>
            <button
              class="queue__tab"
              type="button"
              role="tab"
              aria-selected="false"
              data-queue-tab="user"
            >
              Queue <span class="queue__tab-count" data-queue-badge>0</span>
            </button>
          </div>

          <ol class="queue__list" data-queue></ol>
        </aside>

        <section class="lyrics" data-lyrics aria-label="Lyrics">
          <div class="lyrics__body" data-lyrics-body>
            <div class="lyrics__status" data-lyrics-status role="status" aria-live="polite"></div>
            <div class="lyrics__lines" data-lyrics-lines></div>
            <div class="lyrics__fallback" data-lyrics-fallback hidden>
              <p>No synced lyrics for this track.</p>
              <div class="lyrics__fallback-actions">
                <button type="button" data-lyrics-genius>Open Genius lyrics</button>
                <button type="button" data-lyrics-youtube>Search YouTube</button>
              </div>
            </div>
          </div>

        </section>
      </div>

      <div class="context-menu" data-context-menu role="menu" hidden tabindex="-1">
        <div class="context-menu__head">
          <span class="context-menu__art">
            <img src="${DEFAULT_ART}" alt="" data-context-art />
          </span>
          <span class="context-menu__meta">
            <span class="context-menu__title" data-context-title></span>
            <span class="context-menu__sub" data-context-sub></span>
          </span>
        </div>

        <button class="context-menu__item" type="button" role="menuitem" data-context-action="play">
          ${icon('play')}<span data-context-play-label>Play</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="play-next">
          ${icon('next')}<span>Play next</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="add-queue">
          ${icon('queue')}<span>Add to queue</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="like">
          ${icon('heart')}<span data-context-like-label>Like</span>
        </button>

        <div class="context-menu__submenu-wrap">
          <button
            class="context-menu__item"
            type="button"
            role="menuitem"
            aria-haspopup="menu"
            aria-expanded="false"
            data-context-submenu="playlists"
          >
            ${icon('playlist')}<span>Add to playlist</span><span class="context-menu__chevron">${icon('chevron')}</span>
          </button>
          <div class="context-menu__submenu" data-context-playlists hidden role="menu">
            <p class="context-menu__subtitle">Add to playlist</p>
            <div class="context-menu__playlist-list" data-context-playlist-list></div>
            <form class="context-menu__form" data-context-playlist-form>
              <input
                type="text"
                maxlength="40"
                placeholder="New playlist"
                aria-label="New playlist name"
                autocomplete="off"
                data-context-playlist-name
              />
              <button type="submit">Create</button>
            </form>
          </div>
        </div>

        <div class="context-menu__sep" role="separator"></div>

        <button class="context-menu__item" type="button" role="menuitem" data-context-action="go-artist">
          ${icon('artist')}<span>Go to artist</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="go-album">
          ${icon('album')}<span>Go to album</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="track-info">
          ${icon('info')}<span>Track info</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="copy-info">
          ${icon('copy')}<span>Copy song info</span>
        </button>

        <div class="context-menu__sep" role="separator"></div>

        <button class="context-menu__item" type="button" role="menuitem" data-context-action="youtube">
          ${icon('external')}<span>Search YouTube</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="youtube-music">
          ${icon('external')}<span>Search YouTube Music</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="genius">
          ${icon('lyrics')}<span>Open Genius lyrics</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="spotify">
          ${icon('external')}<span>Search Spotify</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="apple">
          ${icon('external')}<span>Search Apple Music</span>
        </button>

        <div class="context-menu__sep" role="separator"></div>

        <button class="context-menu__item" type="button" role="menuitem" data-context-action="settings">
          ${icon('settings')}<span>Player settings</span>
        </button>
      </div>

      <div class="context-menu context-menu--compact" data-playlist-context-menu role="menu" hidden tabindex="-1">
        <div class="context-menu__head">
          <span class="context-menu__art context-menu__art--icon">${icon('playlist')}</span>
          <span class="context-menu__meta">
            <span class="context-menu__title" data-playlist-context-title></span>
            <span class="context-menu__sub" data-playlist-context-sub></span>
          </span>
        </div>
        <button class="context-menu__item" type="button" role="menuitem" data-playlist-context-action="play">
          ${icon('play')}<span>Play playlist</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-playlist-context-action="add-songs">
          ${icon('plus')}<span>Add songs…</span>
        </button>
        <div class="context-menu__sep" role="separator" data-playlist-context-edit></div>
        <button class="context-menu__item" type="button" role="menuitem" data-playlist-context-action="rename">
          ${icon('playlist')}<span>Rename playlist</span>
        </button>
        <button
          class="context-menu__item context-menu__item--danger"
          type="button"
          role="menuitem"
          data-playlist-context-action="delete"
        >
          ${icon('trash')}<span>Delete playlist</span>
        </button>
      </div>

      <dialog class="info-dialog" data-info-dialog>
        <div class="info-dialog__head">
          <h2>Track info</h2>
          <button class="info-dialog__close" type="button" data-info-close aria-label="Close track info">
            ${icon('close')}
          </button>
        </div>
        <div class="info-dialog__body" data-info-body></div>
      </dialog>

      <dialog class="picker" data-picker>
        <div class="picker__head">
          <div class="picker__heading">
            <p class="picker__eyebrow">Add songs</p>
            <h2 data-picker-title>Playlist</h2>
            <p class="picker__sub" data-picker-sub></p>
          </div>
          <button class="picker__close" type="button" data-picker-close aria-label="Close song picker">
            ${icon('close')}
          </button>
        </div>
        <form class="picker__search" data-picker-form>
          ${icon('search')}
          <input
            type="text"
            placeholder="Search your library, or press Enter to add"
            aria-label="Search songs to add"
            autocomplete="off"
            data-picker-search
          />
        </form>
        <p class="picker__hint">Press <kbd>Enter</kbd> to add the first match. Click a song to add or remove it.</p>
        <div class="picker__list" data-picker-list></div>
      </dialog>

      <p class="toast" data-toast role="status" aria-live="polite" hidden></p>
    </section>
  `;

  const player = root.querySelector('[data-player]');
  const elements = {
    artwork: root.querySelector('[data-artwork]'),
    prevCover: root.querySelector('[data-prev-cover]'),
    nextCover: root.querySelector('[data-next-cover]'),
    coverFlow: root.querySelector('[data-cover-flow]'),
    coverTransition: root.querySelector('[data-cover-transition]'),
    prevArtwork: root.querySelector('[data-prev-artwork]'),
    nextArtwork: root.querySelector('[data-next-artwork]'),
    album: root.querySelector('[data-album]'),
    title: root.querySelector('[data-title]'),
    artist: root.querySelector('[data-artist]'),
    progress: root.querySelector('[data-progress]'),
    current: root.querySelector('[data-current]'),
    duration: root.querySelector('[data-duration]'),
    toggle: root.querySelector('[data-toggle]'),
    previous: root.querySelector('[data-previous]'),
    next: root.querySelector('[data-next]'),
    shuffle: root.querySelector('[data-shuffle]'),
    repeat: root.querySelector('[data-repeat]'),
    mute: root.querySelector('[data-mute]'),
    volume: root.querySelector('[data-volume]'),
    volumeLabel: root.querySelector('[data-volume-label]'),
    queue: root.querySelector('[data-queue]'),
    queueSource: root.querySelector('[data-queue-source]'),
    queueTitle: root.querySelector('[data-queue-title]'),
    queueBack: root.querySelector('[data-queue-back]'),
    queueClear: root.querySelector('[data-queue-clear]'),
    queueTabs: [...root.querySelectorAll('[data-queue-tab]')],
    queueBadge: root.querySelector('[data-queue-badge]'),
    count: root.querySelector('[data-count]'),
    fullscreenToggle: root.querySelector('[data-fullscreen-toggle]'),
    error: root.querySelector('[data-error]'),
    settingsToggle: root.querySelector('[data-settings-toggle]'),
    settings: root.querySelector('[data-settings]'),
    swatches: [...root.querySelectorAll('[data-accent-color]')],
    colorModeToggle: root.querySelector('[data-color-mode-toggle]'),
    motionToggle: root.querySelector('[data-motion-toggle]'),
    fetchCovers: root.querySelector('[data-fetch-covers]'),
    coverStatus: root.querySelector('[data-cover-status]'),
    lyricsInputs: [...root.querySelectorAll('[data-lyrics-setting]')],
    lyricsValues: [...root.querySelectorAll('[data-lyrics-value]')],
    lyricsChoiceButtons: [...root.querySelectorAll('[data-lyrics-choice] [data-value]')],
    lyricsToggles: [...root.querySelectorAll('[data-lyrics-toggle]')],
    lyricsReset: root.querySelector('[data-lyrics-reset]'),
    lyricsColorNote: root.querySelector('[data-lyrics-color-note]'),
    lyrics: root.querySelector('[data-lyrics]'),
    lyricsBody: root.querySelector('[data-lyrics-body]'),
    lyricsLines: root.querySelector('[data-lyrics-lines]'),
    lyricsStatus: root.querySelector('[data-lyrics-status]'),
    lyricsFallback: root.querySelector('[data-lyrics-fallback]'),
    lyricsGenius: root.querySelector('[data-lyrics-genius]'),
    lyricsYoutube: root.querySelector('[data-lyrics-youtube]'),
    contextMenu: root.querySelector('[data-context-menu]'),
    contextArt: root.querySelector('[data-context-art]'),
    contextTitle: root.querySelector('[data-context-title]'),
    contextSub: root.querySelector('[data-context-sub]'),
    contextPlayLabel: root.querySelector('[data-context-play-label]'),
    contextLikeLabel: root.querySelector('[data-context-like-label]'),
    contextSubmenu: root.querySelector('[data-context-submenu="playlists"]'),
    contextPlaylists: root.querySelector('[data-context-playlists]'),
    contextPlaylistList: root.querySelector('[data-context-playlist-list]'),
    contextPlaylistForm: root.querySelector('[data-context-playlist-form]'),
    contextPlaylistName: root.querySelector('[data-context-playlist-name]'),
    playlistContextMenu: root.querySelector('[data-playlist-context-menu]'),
    playlistContextTitle: root.querySelector('[data-playlist-context-title]'),
    playlistContextSub: root.querySelector('[data-playlist-context-sub]'),
    playlistContextEdit: root.querySelector('[data-playlist-context-edit]'),
    picker: root.querySelector('[data-picker]'),
    pickerTitle: root.querySelector('[data-picker-title]'),
    pickerSub: root.querySelector('[data-picker-sub]'),
    pickerForm: root.querySelector('[data-picker-form]'),
    pickerSearch: root.querySelector('[data-picker-search]'),
    pickerList: root.querySelector('[data-picker-list]'),
    pickerClose: root.querySelector('[data-picker-close]'),
    infoDialog: root.querySelector('[data-info-dialog]'),
    infoBody: root.querySelector('[data-info-body]'),
    infoClose: root.querySelector('[data-info-close]'),
    toast: root.querySelector('[data-toast]'),
    searchForm: root.querySelector('[data-search-form]'),
    searchInput: root.querySelector('[data-search]'),
    like: root.querySelector('[data-like]'),
    playlistToggle: root.querySelector('[data-playlist-toggle]'),
    playlistMenu: root.querySelector('[data-playlist-menu]'),
    playlistList: root.querySelector('[data-playlist-list]'),
    playlistForm: root.querySelector('[data-playlist-form]'),
    playlistName: root.querySelector('[data-playlist-name]'),
    sidebar: root.querySelector('[data-sidebar]'),
    sidebarBackdrop: root.querySelector('[data-sidebar-backdrop]'),
    sidebarToggle: root.querySelector('[data-sidebar-toggle]'),
    sidebarClose: root.querySelector('[data-sidebar-close]'),
    sidebarFilters: root.querySelector('[data-sidebar-filters]'),
    sidebarList: root.querySelector('[data-sidebar-list]'),
    sidebarCreateForm: root.querySelector('[data-create-playlist-form]'),
    sidebarCreateName: root.querySelector('[data-create-playlist-name]'),
    header: root.querySelector('.player__header'),
  };

  let isSeeking = false;
  let appliedAccent = null;
  let colorRequestSrc = null;
  let colorRequestToken = 0;
  let carouselToken = 0;
  let carouselAnimations = [];
  let fetchingCovers = false;
  let searchQuery = '';
  let sidebarOpen = false;
  let sidebarFilter = 'playlists';
  let queueView = 'upnext';
  let queueFocusUid = null;
  let draggedQueueUid = null;
  let suppressQueueClick = false;
  let contextTrackId = null;
  let playlistContextId = null;
  let pickerPlaylistId = null;
  let toastTimer = null;
  let isFullscreenView = false;
  let lyricsTrackId = null;
  let lyricsRequestToken = 0;
  let lyricsAbortController = null;
  let lyricsState = null;
  let activeLyricIndex = -1;
  let lyricsScrollUntil = 0;
  let queueItems = [];
  let renderedQueueKey = null;
  let renderedSidebarKey = null;
  let openPlaylistMenuId = null;
  let renamingPlaylistId = null;
  let trackLookup = new Map();

  const artObserver =
    'IntersectionObserver' in window
      ? new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              artObserver.unobserve(entry.target);
              const track = trackLookup.get(entry.target.dataset.artTrack);
              if (track) ensureArtwork(track);
            });
          },
          { rootMargin: '300px' },
        )
      : null;

  function artworkFor(track) {
    return art.urlFor(track) ?? DEFAULT_ART;
  }

  function setImage(image, src, alt) {
    if (!image) return;
    if (image.getAttribute('src') !== src) image.src = src;
    if (typeof alt === 'string' && image.alt !== alt) image.alt = alt;
  }

  function ensureArtwork(track) {
    if (track && !track.artwork) art.resolve(track);
  }

  function observeArtwork(container) {
    if (!container) return;
    container.querySelectorAll('img[data-art-track]').forEach((image) => {
      if (image.dataset.artObserved === '1') return;
      image.dataset.artObserved = '1';

      const track = trackLookup.get(image.dataset.artTrack);
      if (!track) return;
      if (artworkFor(track) !== DEFAULT_ART) return;

      if (artObserver) {
        artObserver.observe(image);
      } else {
        ensureArtwork(track);
      }
    });
  }

  function refreshArtwork(track) {
    if (!track) return;
    const state = store.getState();

    if (state.currentTrack?.id === track.id) {
      setImage(elements.artwork, artworkFor(track), `${track.album} — album artwork`);
      syncAlbumColor();
    }

    if (state.tracks.length > 1) {
      const prevTrack = state.tracks[(state.currentIndex - 1 + state.tracks.length) % state.tracks.length];
      const nextTrack = state.tracks[(state.currentIndex + 1) % state.tracks.length];
      if (prevTrack?.id === track.id) {
        setImage(elements.prevArtwork, artworkFor(track), `${track.album} — previous track artwork`);
      }
      if (nextTrack?.id === track.id) {
        setImage(elements.nextArtwork, artworkFor(track), `${track.album} — next track artwork`);
      }
    }

    root.querySelectorAll('img[data-art-track]').forEach((image) => {
      if (image.dataset.artTrack === track.id) setImage(image, artworkFor(track), '');
    });
  }

  // Pull the current cover's accent out asynchronously, then let the store
  // trigger a normal update. The manual accent stays intact for when album
  // colors are turned off again.
  function syncAlbumColor() {
    const state = store.getState();
    if (!state.dynamicColor) {
      colorRequestSrc = null;
      return;
    }

    const track = state.currentTrack;
    if (!track) return;

    const src = artworkFor(track);
    if (!src || src === DEFAULT_ART) {
      store.setAlbumAccent(null);
      return;
    }

    if (src === colorRequestSrc) return;
    colorRequestSrc = src;
    const token = ++colorRequestToken;

    albumAccentColor(src).then((color) => {
      if (token !== colorRequestToken) return;
      if (!store.getState().dynamicColor) return;
      store.setAlbumAccent(color);
    });
  }

  function measureCover(image) {
    const frame = elements.coverFlow.getBoundingClientRect();
    const rect = image.getBoundingClientRect();
    return {
      left: rect.left - frame.left,
      top: rect.top - frame.top,
      width: rect.width,
      height: rect.height,
      centerX: rect.left + rect.width / 2 - frame.left,
      centerY: rect.top + rect.height / 2 - frame.top,
      src: image.getAttribute('src') ?? '',
      radius: image === elements.artwork ? 16 : 12,
    };
  }

  function captureCoverFlow() {
    if (
      !elements.coverFlow ||
      !elements.artwork?.getAttribute('src') ||
      elements.prevCover.hidden ||
      elements.nextCover.hidden
    ) {
      return null;
    }

    return {
      main: measureCover(elements.artwork),
      previous: measureCover(elements.prevArtwork),
      next: measureCover(elements.nextArtwork),
    };
  }

  function createCoverClone(cover, opacity, filter, zIndex) {
    const image = document.createElement('img');
    image.className = 'cover-flow__clone';
    image.src = cover.src;
    image.alt = '';
    image.style.left = `${cover.left}px`;
    image.style.top = `${cover.top}px`;
    image.style.width = `${cover.width}px`;
    image.style.height = `${cover.height}px`;
    image.style.borderRadius = `${cover.radius}px`;
    image.style.opacity = String(opacity);
    image.style.filter = filter;
    image.style.zIndex = String(zIndex);
    return image;
  }

  function animateCoverChange(direction, snapshot) {
    if (!snapshot || !elements.coverTransition) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const incomingCover = direction === 'next' ? snapshot.next : snapshot.previous;
    const outgoingCover = direction === 'next' ? snapshot.previous : snapshot.next;
    if (!incomingCover.src || !outgoingCover.src) return;

    const flow = elements.coverFlow;
    const layer = elements.coverTransition;
    const token = ++carouselToken;

    carouselAnimations.forEach((animation) => animation.cancel());
    carouselAnimations = [];
    layer.replaceChildren();
    flow.classList.add('is-carousel-moving');

    const outgoingClone = createCoverClone(snapshot.main, 1, 'none', 1);
    const incomingClone = createCoverClone(incomingCover, 0.42, SIDE_COVER_FILTER, 2);
    layer.append(outgoingClone, incomingClone);

    const animate = (clone, from, to, fromOpacity, toOpacity, fromFilter, toFilter) => {
      const scaleX = to.width / from.width;
      const scaleY = to.height / from.height;
      return clone.animate(
        [
          {
            transform: 'translate(0, 0) scale(1)',
            borderRadius: `${from.radius}px`,
            opacity: fromOpacity,
            filter: fromFilter,
          },
          {
            transform: `translate(${to.centerX - from.centerX}px, ${
              to.centerY - from.centerY
            }px) scale(${scaleX}, ${scaleY})`,
            borderRadius: `${to.radius}px`,
            opacity: toOpacity,
            filter: toFilter,
          },
        ],
        {
          duration: 460,
          easing: 'cubic-bezier(0.22, 0.9, 0.28, 1)',
          fill: 'both',
        },
      );
    };

    carouselAnimations = [
      animate(outgoingClone, snapshot.main, outgoingCover, 1, 0.42, 'none', SIDE_COVER_FILTER),
      animate(incomingClone, incomingCover, snapshot.main, 0.42, 1, SIDE_COVER_FILTER, 'none'),
    ];

    Promise.all(carouselAnimations.map((animation) => animation.finished.catch(() => {}))).then(
      () => {
        if (token !== carouselToken) return;
        layer.replaceChildren();
        flow.classList.remove('is-carousel-moving');
        carouselAnimations = [];
      },
    );
  }

  function carouselStep(direction) {
    const state = store.getState();
    const beforeId = state.currentTrack?.id ?? null;
    const snapshot = captureCoverFlow();

    if (direction === 'next') audio.next();
    else audio.previous();

    const afterId = store.getState().currentTrack?.id ?? null;
    if (afterId === beforeId) return;
    animateCoverChange(direction, snapshot);
  }

  function syncLike() {
    const state = store.getState();
    const track = state.currentTrack;
    const isLiked = Boolean(track && state.likedIds.includes(track.id));
    elements.like.classList.toggle('is-active', isLiked);
    elements.like.setAttribute('aria-pressed', String(isLiked));
    elements.like.setAttribute('aria-label', isLiked ? 'Unlike this song' : 'Like this song');
    elements.like.setAttribute('title', isLiked ? 'Unlike this song' : 'Like this song');
  }

  function setRangeFill(input, percent) {
    const shell = input.closest('.range-shell');
    if (shell) shell.style.setProperty('--value', `${percent}%`);
  }

  function setSettingsOpen(open) {
    elements.settings.hidden = !open;
    elements.settingsToggle.setAttribute('aria-expanded', String(open));
  }

  function setPlaylistOpen(open) {
    elements.playlistMenu.hidden = !open;
    elements.playlistToggle.setAttribute('aria-expanded', String(open));
    if (open) renderPlaylistMenu();
  }

  function positionSidebar() {
    const headerBottom = elements.header.getBoundingClientRect().bottom;
    elements.sidebar.style.top = `${Math.round(headerBottom)}px`;
  }

  function setSidebarOpen(open) {
    sidebarOpen = open;
    if (!open) {
      openPlaylistMenuId = null;
      renamingPlaylistId = null;
      closePlaylistContextMenu();
    }
    if (open) {
      const activeType = store.getState().activeCollection?.type;
      if (activeType === 'album') sidebarFilter = 'albums';
      else if (activeType === 'artist') sidebarFilter = 'artists';
      else if (activeType === 'playlist' || activeType === 'liked') sidebarFilter = 'playlists';
      positionSidebar();
      renderSidebar();
    }
    elements.sidebar.classList.toggle('is-open', open);
    elements.sidebarBackdrop.classList.toggle('is-open', open);
    elements.sidebar.setAttribute('aria-hidden', String(!open));
    elements.sidebarToggle.setAttribute('aria-expanded', String(open));
  }

  function closePlaylistMenu() {
    if (openPlaylistMenuId === null) return;
    openPlaylistMenuId = null;
    renamingPlaylistId = null;
    if (sidebarOpen) renderSidebar();
  }

  function getSearchResults() {
    const state = store.getState();
    const needle = searchQuery.toLowerCase();
    const collection = state.activeCollection;
    const matches = (track) => trackHaystack(track).includes(needle);
    const collectionMatches = collection ? state.displayedTracks.filter(matches) : [];
    const queuedIds = new Set(state.displayedTracks.map((track) => track.id));
    // On the library queue every song is already in the active queue, so list
    // the library itself instead of excluding everything as "other songs".
    const otherMatches = collection
      ? state.library.filter((track) => !queuedIds.has(track.id) && matches(track))
      : state.library.filter(matches);

    return {
      inCollection: Boolean(collection),
      collection,
      collectionName: collection?.name ?? 'All Songs',
      collectionMatches,
      otherMatches,
    };
  }

  function trackRow(track, { uid = null } = {}) {
    const active = store.getState().currentTrack?.id === track.id;
    const item = `
      <button
        class="queue__item${active ? ' is-active' : ''}"
        type="button"
        data-track-id="${escapeHtml(track.id)}"
        aria-label="Play ${escapeHtml(track.title)} by ${escapeHtml(track.artist)}"
        ${active ? 'aria-current="true"' : ''}
      >
        <span class="queue__art">
          <img
            src="${escapeHtml(artworkFor(track))}"
            alt=""
            loading="lazy"
            data-art-track="${escapeHtml(track.id)}"
          />
          <span class="queue__duration">${track.duration ? formatTime(track.duration) : ''}</span>
          <span class="queue__equalizer" aria-hidden="true"><i></i><i></i><i></i></span>
        </span>
        <span class="queue__meta">
          <span class="queue__title">${escapeHtml(track.title)}</span>
          <span class="queue__sub">${escapeHtml(track.artist)}</span>
          <span class="queue__album">${escapeHtml(track.album)}</span>
        </span>
      </button>
    `;

    if (uid) {
      return `
        <li class="queue__row queue__row--user" data-queue-uid="${escapeHtml(uid)}">
          <button
            class="queue__handle"
            type="button"
            draggable="true"
            data-queue-handle
            aria-label="Reorder ${escapeHtml(track.title)}"
            title="Drag to reorder · use ↑ and ↓ keys"
          >${icon('grip')}</button>
          ${item}
          <button
            class="queue__remove"
            type="button"
            data-queue-remove="${escapeHtml(uid)}"
            aria-label="Remove ${escapeHtml(track.title)} from the queue"
            title="Remove from queue"
          >${icon('close')}</button>
        </li>
      `;
    }

    return `
      <li class="queue__row">
        ${item}
        <button
          class="queue__more"
          type="button"
          data-track-menu="${escapeHtml(track.id)}"
          aria-label="Options for ${escapeHtml(track.title)}"
          title="Song options"
        >${icon('more')}</button>
      </li>
    `;
  }

  function sectionRow(label) {
    return `<li class="queue__section">${escapeHtml(label)}</li>`;
  }

  function noResultRow(message) {
    return `<li class="queue__noresult">${escapeHtml(message)}</li>`;
  }

  function syncQueueActive() {
    const currentId = store.getState().currentTrack?.id ?? null;
    queueItems.forEach((item) => {
      const active = item.dataset.trackId === currentId;
      item.classList.toggle('is-active', active);
      if (active) {
        item.setAttribute('aria-current', 'true');
      } else {
        item.removeAttribute('aria-current');
      }
    });
  }

  function collectionCaption(collection) {
    if (!collection) return 'All Songs';
    if (collection.type === 'album') return `Album · ${collection.name}`;
    if (collection.type === 'artist') return `Artist · ${collection.name}`;
    return collection.name;
  }

  // "Up next" is only accurate when the browsed queue is also the queue that
  // is currently playing.
  function isActiveQueue(state) {
    const { activeCollection, playbackCollection } = state;
    if (!activeCollection && !playbackCollection) return true;
    if (!activeCollection || !playbackCollection) return false;
    return (
      activeCollection.type === playbackCollection.type &&
      activeCollection.id === playbackCollection.id
    );
  }

  function updateQueueHeader() {
    const state = store.getState();
    const activeQueue = isActiveQueue(state);

    elements.queueTabs.forEach((tab) => {
      const active = tab.dataset.queueTab === queueView;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    elements.queueBadge.textContent = String(state.userQueue.length);
    elements.queueBadge.classList.toggle('is-empty', state.userQueue.length === 0);
    elements.queueClear.hidden = queueView !== 'user' || state.userQueue.length === 0;

    if (queueView === 'user') {
      elements.queueSource.textContent = 'Your queue';
      elements.queueTitle.textContent = 'Play queue';
      const total = state.userQueue.length;
      elements.count.textContent = `${total} ${total === 1 ? 'track' : 'tracks'}`;
      return;
    }

    elements.queueSource.textContent = collectionCaption(state.activeCollection);
    elements.queueTitle.textContent = searchQuery
      ? 'Search results'
      : activeQueue
        ? 'Up next'
        : 'Browsing';

    if (searchQuery) {
      const { collectionMatches, otherMatches } = getSearchResults();
      const total = collectionMatches.length + otherMatches.length;
      elements.count.textContent = `${total} ${total === 1 ? 'result' : 'results'}`;
      return;
    }

    const total = state.displayedTracks.length;
    elements.count.textContent = `${total} ${total === 1 ? 'track' : 'tracks'}`;
  }

  function renderUserQueue() {
    const state = store.getState();
    let html = '';

    if (state.userQueue.length) {
      html = state.userQueue
        .map((entry) => {
          const track = trackLookup.get(entry.trackId);
          return track ? trackRow(track, { uid: entry.uid }) : '';
        })
        .join('');
    } else {
      html = noResultRow(
        'Your queue is empty. Right-click any song (or use its options button) and choose “Add to queue”.',
      );
    }

    elements.queue.innerHTML = html;
    queueItems = [...elements.queue.querySelectorAll('.queue__item')];
    syncQueueActive();
    updateQueueHeader();
    observeArtwork(elements.queue);

    if (queueFocusUid) {
      const uid = queueFocusUid;
      queueFocusUid = null;
      const handle = elements.queue.querySelector(
        `.queue__row[data-queue-uid="${uid}"] [data-queue-handle]`,
      );
      if (handle) handle.focus();
    }
  }

  function renderQueue() {
    const state = store.getState();
    let html = '';

    if (queueView === 'user') {
      renderUserQueue();
      return;
    }

    if (searchQuery) {
      const { inCollection, collection, collectionName, collectionMatches, otherMatches } =
        getSearchResults();
      const total = collectionMatches.length + otherMatches.length;

      if (inCollection) {
        const emptyLabel =
          collection?.type === 'playlist'
            ? 'this playlist'
            : collection?.type === 'album'
              ? 'this album'
              : collection?.type === 'liked'
                ? 'Liked Songs'
                : 'this artist';
        html += sectionRow(collectionName || 'This collection');
        html += collectionMatches.length
          ? collectionMatches.map(trackRow).join('')
          : noResultRow(`No song found in ${emptyLabel}.`);
      }

      html += sectionRow('All Songs');
      html += otherMatches.length
        ? otherMatches.map(trackRow).join('')
        : noResultRow(total === 0 ? 'No song found.' : 'No other songs match.');

      html += `
        <li class="queue__search-hint">
          Press <kbd>Shift</kbd> + <kbd>Enter</kbd> to search YouTube
        </li>
      `;
    } else if (state.displayedTracks.length) {
      html = state.displayedTracks.map(trackRow).join('');
    } else if (state.libraryError) {
      html = noResultRow(state.libraryError);
    } else if (state.libraryMessage) {
      html = noResultRow(state.libraryMessage);
    } else {
      const emptyLabel = state.activeCollection
        ? state.activeCollection.type === 'liked'
          ? 'No liked songs yet. Tap the heart on a song to add it here.'
          : state.activeCollection.type === 'album'
            ? 'This album is empty.'
            : state.activeCollection.type === 'artist'
              ? 'This artist has no songs.'
              : 'This playlist is empty. Add songs with the playlist button below.'
        : 'No songs in your library yet.';
      html = noResultRow(emptyLabel);
    }

    elements.queue.innerHTML = html;
    queueItems = [...elements.queue.querySelectorAll('.queue__item')];
    syncQueueActive();
    updateQueueHeader();
    observeArtwork(elements.queue);
  }

  function renderSidebar() {
    const state = store.getState();
    const active = state.activeCollection;

    elements.sidebarFilters.innerHTML = SIDEBAR_FILTERS.map(
      (filter) => `
        <button
          class="sidebar__filter${sidebarFilter === filter.id ? ' is-active' : ''}"
          type="button"
          role="tab"
          aria-selected="${sidebarFilter === filter.id}"
          data-sidebar-filter="${filter.id}"
        >${filter.label}</button>
      `,
    ).join('');

    elements.sidebarCreateForm.hidden = sidebarFilter !== 'playlists';

    const trackFor = (trackIds) => {
      const id = trackIds?.[0];
      return id ? state.library.find((track) => track.id === id) ?? null : null;
    };

    const item = ({ type, id, name, subtitle, count, track, iconName = 'note', round = false }) => {
      const isActive =
        type === 'library'
          ? !active
          : active?.type === type && active.id === id;
      const thumb = track
        ? `<img
            src="${escapeHtml(artworkFor(track))}"
            alt=""
            loading="lazy"
            data-art-track="${escapeHtml(track.id)}"
          />`
        : icon(iconName);

      return `
        <button
          class="sidebar__item${isActive ? ' is-active' : ''}"
          type="button"
          data-collection-type="${escapeHtml(type)}"
          data-collection-id="${escapeHtml(id)}"
          ${isActive ? 'aria-current="true"' : ''}
        >
          <span class="sidebar__item-art${round ? ' sidebar__item-art--round' : ''}">${thumb}</span>
          <span class="sidebar__item-meta">
            <span class="sidebar__item-name">${escapeHtml(name)}</span>
            <span class="sidebar__item-sub">${escapeHtml(subtitle)}</span>
          </span>
          <span class="sidebar__item-count">${count}</span>
        </button>
      `;
    };

    const playlistRow = (playlist) => {
      const menuOpen = openPlaylistMenuId === playlist.id;
      const renaming = menuOpen && renamingPlaylistId === playlist.id;
      const trackCount = playlist.trackIds.length;

      return `
        <div class="sidebar__row${menuOpen ? ' is-menu-open' : ''}">
          <div class="sidebar__row-main">
            ${item({
              type: 'playlist',
              id: playlist.id,
              name: playlist.name,
              subtitle: `Playlist · ${trackCount} ${trackCount === 1 ? 'song' : 'songs'}`,
              count: trackCount,
              track: trackFor(playlist.trackIds),
              iconName: 'playlist',
            })}
            <button
              class="sidebar__more${menuOpen ? ' is-active' : ''}"
              type="button"
              data-playlist-menu-toggle="${escapeHtml(playlist.id)}"
              aria-label="Options for ${escapeHtml(playlist.name)}"
              aria-expanded="${String(menuOpen)}"
              title="Playlist options"
            >${icon('more')}</button>
          </div>
          <div
            class="sidebar__actions"
            data-playlist-actions="${escapeHtml(playlist.id)}"
            ${menuOpen ? '' : 'hidden'}
          >
            ${
              renaming
                ? `
                  <form
                    class="sidebar__rename"
                    data-playlist-rename-form
                    data-playlist-id="${escapeHtml(playlist.id)}"
                  >
                    <input
                      class="sidebar__rename-input"
                      type="text"
                      maxlength="40"
                      value="${escapeHtml(playlist.name)}"
                      aria-label="Playlist name"
                      autocomplete="off"
                      data-playlist-rename-input
                    />
                    <button class="sidebar__rename-save" type="submit" data-playlist-rename-save>Save</button>
                  </form>
                `
                : `
                  <button
                    class="sidebar__action"
                    type="button"
                    data-playlist-action="rename"
                    data-playlist-id="${escapeHtml(playlist.id)}"
                  >Rename</button>
                  <button
                    class="sidebar__action sidebar__action--danger"
                    type="button"
                    data-playlist-action="delete"
                    data-playlist-id="${escapeHtml(playlist.id)}"
                  >Delete</button>
                `
            }
          </div>
        </div>
      `;
    };

    const folderPlaylistRow = (playlist) => {
      const trackCount = playlist.trackIds.length;
      return item({
        type: 'playlist',
        id: playlist.id,
        name: playlist.name,
        subtitle: `Playlist folder · ${trackCount} ${trackCount === 1 ? 'song' : 'songs'}`,
        count: trackCount,
        track: trackFor(playlist.trackIds),
        iconName: 'playlist',
      });
    };

    let html = '';

    if (sidebarFilter === 'playlists') {
      const likedTracks = state.library.filter((track) => state.likedIds.includes(track.id));

      html += item({
        type: 'library',
        id: '',
        name: 'All Songs',
        subtitle: 'Your whole library',
        count: state.library.length,
        iconName: 'note',
      });

      html += item({
        type: 'liked',
        id: 'liked',
        name: 'Liked Songs',
        subtitle: `Liked · ${likedTracks.length} ${
          likedTracks.length === 1 ? 'song' : 'songs'
        }`,
        count: likedTracks.length,
        track: likedTracks[0] ?? null,
        iconName: 'heart',
      });

      if (state.playlists.length) {
        html += state.playlists.map(playlistRow).join('');
      }
      if (state.folderPlaylists.length) {
        html += state.folderPlaylists.map(folderPlaylistRow).join('');
      }
      if (!state.playlists.length && !state.folderPlaylists.length) {
        html += '<p class="sidebar__empty">No playlists yet. Create one below.</p>';
      }
    } else if (sidebarFilter === 'artists') {
      html += state.artists.length
        ? state.artists
            .map((artist) =>
              item({
                type: 'artist',
                id: artist.id,
                name: artist.name,
                subtitle: `Artist · ${artist.trackIds.length} ${
                  artist.trackIds.length === 1 ? 'song' : 'songs'
                }`,
                count: artist.trackIds.length,
                track: trackFor(artist.trackIds),
                iconName: 'artist',
                round: true,
              }),
            )
            .join('')
        : '<p class="sidebar__empty">No artists in your library yet.</p>';
    } else {
      html += state.albums.length
        ? state.albums
            .map((album) =>
              item({
                type: 'album',
                id: album.id,
                name: album.name,
                subtitle: `Album · ${album.artist}`,
                count: album.trackIds.length,
                track: trackFor(album.trackIds),
                iconName: 'album',
              }),
            )
            .join('')
        : '<p class="sidebar__empty">No albums in your library yet.</p>';
    }

    elements.sidebarList.innerHTML = html;
    observeArtwork(elements.sidebarList);
  }

  function renderPlaylistMenu() {
    const state = store.getState();
    const track = state.currentTrack;

    if (!state.playlists.length) {
      elements.playlistList.innerHTML =
        '<p class="playlist-menu__empty">No playlists yet. Create one below.</p>';
      return;
    }

    elements.playlistList.innerHTML = state.playlists
      .map((playlist) => {
        const added = Boolean(track && playlist.trackIds.includes(track.id));
        return `
          <button
            class="playlist-item${added ? ' is-added' : ''}"
            type="button"
            data-playlist-id="${escapeHtml(playlist.id)}"
          >
            <span class="playlist-item__name">${escapeHtml(playlist.name)}</span>
            <span class="playlist-item__meta">${added ? 'Added' : `${playlist.trackIds.length}`}</span>
          </button>
        `;
      })
      .join('');
  }

  function applySearch(query) {
    searchQuery = query.trim();
    if (searchQuery) queueView = 'upnext';
    renderQueue();
  }

  function clearSearch() {
    elements.searchInput.value = '';
    searchQuery = '';
    renderQueue();
  }

  function openYouTubeSearch() {
    const query = elements.searchInput.value.trim();
    if (!query) return;
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function playTrack(trackId) {
    // Clicking a song promotes the browsed queue to the playback queue.
    if (!store.playTrack(trackId)) return;
    audio.play();
  }

  function playFirstResult() {
    if (!searchQuery) return;
    const { collectionMatches, otherMatches } = getSearchResults();
    const track = collectionMatches[0] ?? otherMatches[0];
    if (!track) return;
    playTrack(track.id);
  }

  const LYRICS_FONT_STACK_FALLBACK = lyricsFontStack('sans');

  function lyricsValueText(key, value) {
    if (key === 'lyricsFontSize') return `${Math.round(value)} px`;
    if (key === 'lyricsWidth') return `${Math.round(value)}%`;
    if (key === 'lyricsLineHeight') return Number(value).toFixed(2);
    if (key === 'lyricsOffset') return `${value > 0 ? '+' : ''}${Number(value).toFixed(1)} s`;
    if (key === 'lyricsBackground') return `${Math.round(value * 100)}%`;
    return String(value);
  }

  function applyLyricsPreferences(state) {
    player.style.setProperty('--lyrics-size', `${state.lyricsFontSize}px`);
    player.style.setProperty(
      '--lyrics-color',
      state.lyricsFollowAccent ? 'var(--accent)' : state.lyricsColor,
    );
    player.style.setProperty('--lyrics-align', state.lyricsAlignment);
    player.style.setProperty('--lyrics-weight', String(state.lyricsWeight));
    player.style.setProperty('--lyrics-style', state.lyricsStyle);
    player.style.setProperty(
      '--lyrics-font',
      LYRICS_FONTS.some((font) => font.id === state.lyricsFont)
        ? lyricsFontStack(state.lyricsFont)
        : LYRICS_FONT_STACK_FALLBACK,
    );
    player.style.setProperty('--lyrics-ratio', String(state.lyricsWidth / 100));
    player.style.setProperty('--lyrics-line-height', String(state.lyricsLineHeight));
    player.style.setProperty('--lyrics-shade', String(state.lyricsBackground));
    player.style.setProperty('--lyrics-transform', state.lyricsUppercase ? 'uppercase' : 'none');
    player.classList.toggle('lyrics-dim', state.lyricsDim);
    player.classList.toggle('lyrics-glow', state.lyricsGlow);
  }

  function syncLyricsSettings(state) {
    elements.lyricsInputs.forEach((input) => {
      const key = input.dataset.lyricsSetting;
      const value = state[key];
      if (input.type === 'color') {
        input.value = value;
        input.disabled = Boolean(state.lyricsFollowAccent);
      } else {
        input.value = String(value);
      }
    });

    elements.lyricsColorNote.textContent = state.lyricsFollowAccent
      ? 'Following accent'
      : 'Custom';
    elements.lyricsColorNote.classList.toggle('is-dynamic', state.lyricsFollowAccent);

    elements.lyricsValues.forEach((label) => {
      const key = label.dataset.lyricsValue;
      label.textContent = lyricsValueText(key, state[key]);
    });

    elements.lyricsChoiceButtons.forEach((button) => {
      const group = button.closest('[data-lyrics-choice]');
      const key = group?.dataset.lyricsChoice;
      const selected = key ? state[key] === button.dataset.value : false;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });

    elements.lyricsToggles.forEach((toggle) => {
      const key = toggle.dataset.lyricsToggle;
      const enabled = Boolean(state[key]);
      toggle.setAttribute('aria-checked', String(enabled));
    });
  }

  function setLyricsStatus(message) {
    elements.lyricsStatus.textContent = message ?? '';
    elements.lyricsStatus.hidden = !message;
  }

  function scrollLyricsToActive() {
    const node = elements.lyricsLines.querySelector('.lyrics__line.is-active');
    if (!node) return;

    const container = elements.lyricsLines;
    const containerRect = container.getBoundingClientRect();
    const nodeRect = node.getBoundingClientRect();
    const delta = nodeRect.top - containerRect.top - container.clientHeight / 2 + nodeRect.height / 2;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    container.scrollBy({ top: delta, behavior: reduced ? 'auto' : 'smooth' });
  }

  function syncLyrics(currentTime, { force = false } = {}) {
    if (!lyricsState?.data?.synced || !elements.lyricsLines.childElementCount) return;
    const state = store.getState();
    const lines = lyricsState.data.lines;
    const effectiveTime = currentTime + state.lyricsOffset;

    let index = -1;
    for (let i = 0; i < lines.length; i += 1) {
      if (lines[i].time !== null && lines[i].time <= effectiveTime) index = i;
      else break;
    }

    if (index === activeLyricIndex) return;

    const nodes = elements.lyricsLines.querySelectorAll('.lyrics__line');
    if (nodes[activeLyricIndex]) nodes[activeLyricIndex].classList.remove('is-active');
    if (nodes[index]) nodes[index].classList.add('is-active');
    activeLyricIndex = index;

    if (index !== -1 && (force || Date.now() >= lyricsScrollUntil)) scrollLyricsToActive();
  }

  function renderLyrics(data) {
    activeLyricIndex = -1;
    elements.lyricsLines.replaceChildren();
    elements.lyricsFallback.hidden = true;
    elements.lyricsLines.classList.toggle('is-synced', Boolean(data?.synced));

    if (!data) {
      setLyricsStatus('Press F to open fullscreen lyrics.');
      return;
    }

    if (data.found && data.lines.length) {
      setLyricsStatus(
        data.synced
          ? ''
          : `Unsynced lyrics${data.source && data.source !== 'LRCLIB' ? ` from ${data.source}` : ''}.`,
      );
      elements.lyricsLines.innerHTML = data.lines
        .map(
          (line, index) => `
            <p
              class="lyrics__line"
              data-lyric-index="${index}"
              ${line.time !== null ? `data-lyric-time="${line.time}"` : ''}
            >${escapeHtml(line.text || '♪')}</p>
          `,
        )
        .join('');
      syncLyrics(store.getState().currentTime, { force: true });
      return;
    }

    setLyricsStatus(
      data.instrumental
        ? data.message || 'This track is instrumental.'
        : data.message || 'No synced lyrics for this song.',
    );
    elements.lyricsFallback.hidden = false;
  }

  async function loadLyrics(track = store.getState().currentTrack, { force = false } = {}) {
    if (!track) {
      lyricsTrackId = null;
      lyricsState = null;
      renderLyrics(null);
      setLyricsStatus('Play a song to see its lyrics.');
      return;
    }

    if (!force && track.id === lyricsTrackId && lyricsState) {
      renderLyrics(lyricsState.data ?? null);
      return;
    }

    lyricsAbortController?.abort();
    lyricsAbortController = new AbortController();
    lyricsTrackId = track.id;
    lyricsState = null;
    const token = ++lyricsRequestToken;

    elements.lyricsLines.replaceChildren();
    elements.lyricsFallback.hidden = true;
    setLyricsStatus('Looking up lyrics…');

    try {
      const data = await fetchLyrics(track.id, { signal: lyricsAbortController.signal });
      if (token !== lyricsRequestToken) return;
      if (store.getState().currentTrack?.id !== track.id) return;
      lyricsState = { data };
      renderLyrics(data);
    } catch (error) {
      if (error?.name === 'AbortError') return;
      if (token !== lyricsRequestToken) return;
      lyricsState = null;
      setLyricsStatus('Could not load lyrics. Check your connection and try again.');
      elements.lyricsFallback.hidden = false;
    }
  }

  function requestBrowserFullscreen() {
    if (document.fullscreenElement) return;
    const rootElement = document.documentElement;
    if (typeof rootElement.requestFullscreen !== 'function') return;
    rootElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {
      // The CSS fullscreen view still works when the browser refuses.
    });
  }

  function exitBrowserFullscreen() {
    if (!document.fullscreenElement || typeof document.exitFullscreen !== 'function') return;
    document.exitFullscreen().catch(() => {});
  }

  function setFullscreen(open, { exitBrowser = true } = {}) {
    if (isFullscreenView === open) {
      if (open) loadLyrics();
      return;
    }

    isFullscreenView = open;
    player.classList.toggle('is-fullscreen', open);
    player.setAttribute('data-fullscreen', String(open));
    elements.fullscreenToggle.innerHTML = icon(open ? 'collapse' : 'expand');
    elements.fullscreenToggle.setAttribute('aria-pressed', String(open));
    elements.fullscreenToggle.setAttribute('aria-label', open ? 'Exit fullscreen' : 'Enter fullscreen');
    elements.fullscreenToggle.title = open ? 'Exit fullscreen (Esc)' : 'Fullscreen (F)';

    if (open) {
      requestBrowserFullscreen();
      loadLyrics();
      return;
    }

    lyricsAbortController?.abort();
    lyricsAbortController = null;
    lyricsTrackId = null;
    lyricsState = null;
    activeLyricIndex = -1;
    if (exitBrowser) exitBrowserFullscreen();
  }

  function toggleFullscreen() {
    setFullscreen(!isFullscreenView);
  }

  function showToast(message) {
    if (!message) return;
    window.clearTimeout(toastTimer);
    elements.toast.textContent = message;
    elements.toast.hidden = false;
    elements.toast.classList.add('is-visible');
    toastTimer = window.setTimeout(() => {
      elements.toast.classList.remove('is-visible');
      elements.toast.hidden = true;
    }, 2400);
  }

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      try {
        const area = document.createElement('textarea');
        area.value = text;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.append(area);
        area.select();
        const copied = document.execCommand('copy');
        area.remove();
        return copied;
      } catch {
        return false;
      }
    }
  }

  function trackAlbum(track) {
    const state = store.getState();
    const albumArtist = track.albumArtist || track.artist;
    return (
      state.albums.find((album) => album.name === track.album && album.artist === albumArtist) ??
      state.albums.find((album) => album.name === track.album) ??
      null
    );
  }

  function trackArtist(track) {
    const state = store.getState();
    const names = Array.isArray(track.artists) && track.artists.length ? track.artists : [track.artist];
    return (
      state.artists.find((artist) => names.includes(artist.name)) ??
      state.artists.find((artist) => artist.name === track.artist) ??
      null
    );
  }

  function onlineUrl(action, track) {
    const query = `${track.artist} ${track.title}`;
    if (action === 'youtube') {
      return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${query} music video`)}`;
    }
    if (action === 'youtube-music') {
      return `https://music.youtube.com/search?q=${encodeURIComponent(query)}`;
    }
    if (action === 'genius') {
      return `https://genius.com/search?q=${encodeURIComponent(query)}`;
    }
    if (action === 'spotify') {
      return `https://open.spotify.com/search/${encodeURIComponent(query)}`;
    }
    if (action === 'apple') {
      return `https://music.apple.com/us/search?term=${encodeURIComponent(query)}`;
    }
    return null;
  }

  function openExternal(url) {
    if (!url) return;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function closeContextSubmenu() {
    elements.contextPlaylists.hidden = true;
    elements.contextPlaylists.classList.remove('is-flipped');
    elements.contextSubmenu.setAttribute('aria-expanded', 'false');
  }

  function renderContextPlaylists() {
    const state = store.getState();
    if (!state.playlists.length) {
      elements.contextPlaylistList.innerHTML =
        '<p class="context-menu__empty">No playlists yet. Create one below.</p>';
      return;
    }

    elements.contextPlaylistList.innerHTML = state.playlists
      .map((playlist) => {
        const added = playlist.trackIds.includes(contextTrackId);
        return `
          <button
            class="context-menu__playlist${added ? ' is-added' : ''}"
            type="button"
            role="menuitemcheckbox"
            aria-checked="${String(added)}"
            data-context-playlist-id="${escapeHtml(playlist.id)}"
          >
            <span>${escapeHtml(playlist.name)}</span>
            <span>${added ? 'Added' : playlist.trackIds.length}</span>
          </button>
        `;
      })
      .join('');
  }

  function openContextMenu(trackId, x, y) {
    const track = trackLookup.get(trackId);
    if (!track) return;

    closePlaylistContextMenu();
    const state = store.getState();
    contextTrackId = trackId;
    const isCurrent = state.currentTrack?.id === trackId;
    const liked = state.likedIds.includes(trackId);

    elements.contextArt.src = artworkFor(track);
    elements.contextArt.alt = '';
    elements.contextTitle.textContent = track.title;
    elements.contextSub.textContent = `${track.artist} · ${track.album}`;
    elements.contextPlayLabel.textContent = isCurrent
      ? state.isPlaying
        ? 'Pause'
        : 'Resume'
      : 'Play';
    elements.contextLikeLabel.textContent = liked ? 'Unlike' : 'Like';
    elements.contextMenu
      .querySelector('[data-context-action="like"]')
      ?.classList.toggle('is-active', liked);

    renderContextPlaylists();
    closeContextSubmenu();
    elements.contextMenu.hidden = false;
    elements.contextMenu.classList.add('is-open');

    const rect = elements.contextMenu.getBoundingClientRect();
    const padding = 10;
    const left = Math.min(Math.max(x, padding), window.innerWidth - rect.width - padding);
    const top = Math.min(Math.max(y, padding), window.innerHeight - rect.height - padding);
    elements.contextMenu.style.left = `${Math.round(left)}px`;
    elements.contextMenu.style.top = `${Math.round(top)}px`;
    elements.contextMenu.focus({ preventScroll: true });
  }

  function closeContextMenu() {
    if (elements.contextMenu.hidden) return;
    elements.contextMenu.hidden = true;
    elements.contextMenu.classList.remove('is-open');
    contextTrackId = null;
    closeContextSubmenu();
  }

  function openContextSubmenu() {
    elements.contextPlaylists.hidden = false;
    elements.contextSubmenu.setAttribute('aria-expanded', 'true');

    // The context menu scrolls, so a flyout positioned inside it would be
    // clipped. Fixed positioning keeps the playlist list fully visible.
    elements.contextPlaylists.style.left = '0px';
    elements.contextPlaylists.style.top = '0px';
    const anchor = elements.contextSubmenu.getBoundingClientRect();
    const rect = elements.contextPlaylists.getBoundingClientRect();
    const padding = 10;

    let left = anchor.right + 6;
    if (left + rect.width > window.innerWidth - padding) {
      left = anchor.left - rect.width - 6;
    }
    left = Math.max(padding, Math.min(left, window.innerWidth - rect.width - padding));

    const top = Math.max(
      padding,
      Math.min(anchor.top - 6, window.innerHeight - rect.height - padding),
    );

    elements.contextPlaylists.style.left = `${Math.round(left)}px`;
    elements.contextPlaylists.style.top = `${Math.round(top)}px`;
  }

  function closePlaylistContextMenu() {
    if (elements.playlistContextMenu.hidden) return;
    elements.playlistContextMenu.hidden = true;
    playlistContextId = null;
  }

  function openPlaylistContextMenu(playlistId, x, y) {
    const state = store.getState();
    const userPlaylist = state.playlists.find((playlist) => playlist.id === playlistId);
    const folderPlaylist = state.folderPlaylists.find((playlist) => playlist.id === playlistId);
    const playlist = userPlaylist ?? folderPlaylist;
    if (!playlist) return;

    playlistContextId = playlistId;
    const count = playlist.trackIds.length;
    elements.playlistContextTitle.textContent = playlist.name;
    elements.playlistContextSub.textContent = `${count} ${count === 1 ? 'song' : 'songs'}${
      userPlaylist ? '' : ' · folder'
    }`;

    const editable = Boolean(userPlaylist);
    elements.playlistContextMenu
      .querySelectorAll(
        '[data-playlist-context-action="add-songs"], [data-playlist-context-action="rename"], [data-playlist-context-action="delete"]',
      )
      .forEach((button) => {
        button.hidden = !editable;
      });
    elements.playlistContextEdit.hidden = !editable;

    closeContextMenu();
    elements.playlistContextMenu.hidden = false;
    const rect = elements.playlistContextMenu.getBoundingClientRect();
    const padding = 10;
    const left = Math.min(Math.max(x, padding), window.innerWidth - rect.width - padding);
    const top = Math.min(Math.max(y, padding), window.innerHeight - rect.height - padding);
    elements.playlistContextMenu.style.left = `${Math.round(left)}px`;
    elements.playlistContextMenu.style.top = `${Math.round(top)}px`;
    elements.playlistContextMenu.focus({ preventScroll: true });
  }

  function pickerData() {
    const state = store.getState();
    const playlist = state.playlists.find((item) => item.id === pickerPlaylistId) ?? null;
    const query = elements.pickerSearch.value.trim().toLowerCase();
    const results = query
      ? state.library.filter((track) => trackHaystack(track).includes(query))
      : state.library;
    return { playlist, query, results };
  }

  function renderPicker() {
    const { playlist, query, results } = pickerData();
    if (!playlist) return;

    elements.pickerTitle.textContent = playlist.name;
    const total = playlist.trackIds.length;
    elements.pickerSub.textContent = `${total} ${total === 1 ? 'song' : 'songs'}${
      query ? ` · ${results.length} ${results.length === 1 ? 'match' : 'matches'}` : ''
    }`;

    if (!results.length) {
      elements.pickerList.innerHTML = `<p class="picker__empty">No songs match “${escapeHtml(
        elements.pickerSearch.value.trim(),
      )}”.</p>`;
      return;
    }

    elements.pickerList.innerHTML = results
      .map((track) => {
        const added = playlist.trackIds.includes(track.id);
        return `
          <button
            class="picker__item${added ? ' is-added' : ''}"
            type="button"
            data-picker-track-id="${escapeHtml(track.id)}"
          >
            <span class="picker__art">
              <img src="${escapeHtml(artworkFor(track))}" alt="" loading="lazy" data-art-track="${escapeHtml(
                track.id,
              )}" />
            </span>
            <span class="picker__meta">
              <span class="picker__name">${escapeHtml(track.title)}</span>
              <span class="picker__artist">${escapeHtml(track.artist)} · ${escapeHtml(track.album)}</span>
            </span>
            <span class="picker__state">${added ? 'Added' : 'Add'}</span>
          </button>
        `;
      })
      .join('');
    observeArtwork(elements.pickerList);
  }

  function openPicker(playlistId) {
    const state = store.getState();
    const playlist = state.playlists.find((item) => item.id === playlistId);
    if (!playlist) return;

    pickerPlaylistId = playlistId;
    elements.pickerSearch.value = '';
    renderPicker();

    if (typeof elements.picker.showModal === 'function') {
      elements.picker.showModal();
    } else {
      elements.picker.setAttribute('open', '');
    }
    elements.pickerSearch.focus();
  }

  function closePicker() {
    if (elements.picker.open && typeof elements.picker.close === 'function') {
      elements.picker.close();
    } else {
      elements.picker.removeAttribute('open');
    }
    pickerPlaylistId = null;
  }

  function addFirstPickerMatch() {
    const { playlist, results } = pickerData();
    if (!playlist || !results.length) {
      showToast('No songs match that search');
      return;
    }

    const track = results.find((item) => !playlist.trackIds.includes(item.id));
    if (!track) {
      showToast('Every match is already in this playlist');
      return;
    }

    store.toggleTrackInPlaylist(playlist.id, track.id);
    renderPicker();
    showToast(`Added “${track.title}” to “${playlist.name}”`);
  }

  function showTrackInfo(track) {
    const state = store.getState();
    const liked = state.likedIds.includes(track.id);
    const details = [
      ['Artist', track.artist],
      ['Album', track.album],
      ['Album artist', track.albumArtist],
      ['Year', track.year ?? '—'],
      ['Duration', track.duration ? formatTime(track.duration) : '—'],
      [
        'Track',
        track.trackNumber ? `${track.discNumber ? `${track.discNumber}.` : ''}${track.trackNumber}` : '—',
      ],
      ['Folder', track.folder || '—'],
      ['Liked', liked ? 'Yes' : 'No'],
    ];

    elements.infoBody.innerHTML = `
      <div class="info-dialog__hero">
        <img src="${escapeHtml(artworkFor(track))}" alt="" data-art-track="${escapeHtml(track.id)}" />
        <div>
          <p class="info-dialog__album">${escapeHtml(track.album)}</p>
          <h3>${escapeHtml(track.title)}</h3>
          <p class="info-dialog__artist">${escapeHtml(track.artist)}</p>
        </div>
      </div>
      <dl class="info-dialog__list">
        ${details
          .map(
            ([label, value]) =>
              `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(String(value ?? '—'))}</dd></div>`,
          )
          .join('')}
      </dl>
    `;

    if (typeof elements.infoDialog.showModal === 'function') {
      elements.infoDialog.showModal();
    } else {
      elements.infoDialog.setAttribute('open', '');
    }
    observeArtwork(elements.infoBody);
  }

  function handleContextAction(action) {
    const track = trackLookup.get(contextTrackId);
    if (!track) {
      closeContextMenu();
      return;
    }

    const state = store.getState();

    switch (action) {
      case 'play':
        closeContextMenu();
        if (state.currentTrack?.id === track.id) audio.toggle();
        else {
          playTrack(track.id);
          audio.play();
        }
        break;
      case 'play-next':
        store.addToQueue(track.id, { next: true });
        closeContextMenu();
        showToast(`“${track.title}” will play next`);
        break;
      case 'add-queue':
        store.addToQueue(track.id);
        closeContextMenu();
        showToast(`Added “${track.title}” to your queue`);
        break;
      case 'like': {
        const liked = store.toggleLike(track.id);
        closeContextMenu();
        showToast(liked ? 'Added to Liked Songs' : 'Removed from Liked Songs');
        break;
      }
      case 'go-artist': {
        const artist = trackArtist(track);
        closeContextMenu();
        if (!artist) {
          showToast('This artist is not in your library.');
          break;
        }
        clearSearch();
        sidebarFilter = 'artists';
        setSidebarOpen(true);
        store.selectArtist(artist.id);
        renderSidebar();
        break;
      }
      case 'go-album': {
        const album = trackAlbum(track);
        closeContextMenu();
        if (!album) {
          showToast('This album is not in your library.');
          break;
        }
        clearSearch();
        sidebarFilter = 'albums';
        setSidebarOpen(true);
        store.selectAlbum(album.id);
        renderSidebar();
        break;
      }
      case 'track-info':
        closeContextMenu();
        showTrackInfo(track);
        break;
      case 'settings':
        closeContextMenu();
        setSettingsOpen(true);
        break;
      case 'copy-info': {
        closeContextMenu();
        const text = `${track.title} — ${track.artist}\n${track.album}`;
        copyText(text).then((copied) => {
          showToast(copied ? 'Song info copied' : 'Could not copy song info');
        });
        break;
      }
      default: {
        const url = onlineUrl(action, track);
        closeContextMenu();
        openExternal(url);
        break;
      }
    }
  }

  function update(state) {
    const {
      tracks,
      currentIndex,
      currentTrack,
      currentTime,
      duration,
      isPlaying,
      volume,
      muted,
      shuffle,
      repeat,
      accent,
      albumAccent,
      movingBackground,
      dynamicColor,
      error,
      canGoBack,
    } = state;

    trackLookup = new Map();
    state.library.forEach((track) => trackLookup.set(track.id, track));
    state.tracks.forEach((track) => trackLookup.set(track.id, track));
    state.displayedTracks.forEach((track) => trackLookup.set(track.id, track));

    const activeAccent = dynamicColor && albumAccent ? albumAccent : accent;
    if (activeAccent !== appliedAccent) {
      document.documentElement.style.setProperty('--accent', activeAccent);
      appliedAccent = activeAccent;
    }

    elements.swatches.forEach((swatch) => {
      const selected =
        !dynamicColor && swatch.dataset.accentColor.toLowerCase() === accent.toLowerCase();
      swatch.classList.toggle('is-selected', selected);
      swatch.setAttribute('aria-pressed', String(selected));
    });

    applyLyricsPreferences(state);
    syncLyricsSettings(state);

    if (currentTrack) {
      setImage(elements.artwork, artworkFor(currentTrack), `${currentTrack.album} — album artwork`);
      ensureArtwork(currentTrack);
      elements.album.textContent = currentTrack.album;
      elements.title.textContent = currentTrack.title;
      elements.artist.textContent = currentTrack.artist;
      document.title = `${currentTrack.title} — ${currentTrack.artist} · Orpheus`;
    } else {
      setImage(elements.artwork, DEFAULT_ART, '');
      elements.album.textContent = '';
      elements.title.textContent = 'No track selected';
      elements.artist.textContent = '';
      document.title = 'Orpheus';
    }

    syncAlbumColor();

    const hasSiblings = tracks.length > 1;
    elements.prevCover.hidden = !hasSiblings;
    elements.nextCover.hidden = !hasSiblings;

    if (hasSiblings) {
      const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
      const nextTrack = tracks[(currentIndex + 1) % tracks.length];

      setImage(
        elements.prevArtwork,
        artworkFor(prevTrack),
        `${prevTrack.album} — previous track artwork`,
      );
      setImage(
        elements.nextArtwork,
        artworkFor(nextTrack),
        `${nextTrack.album} — next track artwork`,
      );
      ensureArtwork(prevTrack);
      ensureArtwork(nextTrack);

      elements.prevCover.setAttribute('aria-label', `Play previous track: ${prevTrack.title}`);
      elements.nextCover.setAttribute('aria-label', `Play next track: ${nextTrack.title}`);
    }

    const progressMax = duration > 0 ? duration : 100;
    elements.progress.max = String(progressMax);
    if (!isSeeking) {
      elements.progress.value = String(Math.min(currentTime, progressMax));
    }
    setRangeFill(elements.progress, duration > 0 ? (currentTime / duration) * 100 : 0);

    elements.current.textContent = formatTime(currentTime);
    elements.duration.textContent = formatTime(duration);

    elements.toggle.innerHTML = icon(isPlaying ? 'pause' : 'play');
    elements.toggle.setAttribute('aria-label', isPlaying ? 'Pause' : 'Play');
    elements.toggle.setAttribute('title', isPlaying ? 'Pause' : 'Play');

    player.classList.toggle('is-playing', isPlaying);
    player.classList.toggle('is-moving-background', movingBackground);
    player.classList.toggle('has-album-colors', dynamicColor);
    elements.colorModeToggle.setAttribute('aria-checked', String(dynamicColor));
    elements.colorModeToggle.setAttribute(
      'aria-label',
      `Album colors: ${dynamicColor ? 'on' : 'off'}`,
    );
    elements.motionToggle.setAttribute('aria-checked', String(movingBackground));
    elements.motionToggle.setAttribute(
      'aria-label',
      `Moving background: ${movingBackground ? 'on' : 'off'}`,
    );

    elements.shuffle.classList.toggle('is-active', shuffle);
    elements.shuffle.setAttribute('aria-pressed', String(shuffle));

    const repeatLabels = { off: 'off', all: 'all', one: 'one' };
    elements.repeat.innerHTML = icon(repeat === 'one' ? 'repeatOne' : 'repeat');
    elements.repeat.classList.toggle('is-active', repeat !== 'off');
    elements.repeat.setAttribute('aria-pressed', String(repeat !== 'off'));
    elements.repeat.setAttribute('aria-label', `Repeat: ${repeatLabels[repeat]}`);
    elements.repeat.setAttribute('title', `Repeat: ${repeatLabels[repeat]}`);

    const audible = !muted && volume > 0;
    const volumeIcon = !audible ? 'volumeMute' : volume < 0.5 ? 'volumeLow' : 'volumeHigh';
    elements.mute.innerHTML = icon(volumeIcon);
    elements.mute.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
    elements.mute.setAttribute('title', muted ? 'Unmute' : 'Mute');
    elements.volume.value = String(volume);
    setRangeFill(elements.volume, volume * 100);
    elements.volumeLabel.textContent = muted ? 'Muted' : `${Math.round(volume * 100)}%`;

    const collectionKey = state.activeCollection
      ? `${state.activeCollection.type}:${state.activeCollection.id}:${state.activeCollection.name}`
      : 'library';
    const activeQueueKey = isActiveQueue(state) ? 'active' : 'browsing';
    const queueKey = `${queueView}|${collectionKey}|${activeQueueKey}|${state.displayedTracks
      .map((track) => track.id)
      .join(',')}|${state.userQueue
      .map((entry) => `${entry.uid}:${entry.trackId}`)
      .join(',')}`;
    if (queueKey !== renderedQueueKey) {
      renderedQueueKey = queueKey;
      renderQueue();
    } else {
      syncQueueActive();
      updateQueueHeader();
    }

    elements.queueBack.hidden = queueView === 'user' || !canGoBack;

    const sidebarKey = `${sidebarFilter}|${collectionKey}|${state.playlists
      .map((playlist) => `${playlist.id}:${playlist.name}:${playlist.trackIds.join(',')}`)
      .join('|')}|${state.folderPlaylists
      .map((playlist) => `${playlist.id}:${playlist.name}:${playlist.trackIds.join(',')}`)
      .join('|')}|${state.albums.map((album) => album.id).join(',')}|${state.artists
      .map((artist) => artist.id)
      .join(',')}|${state.likedIds.join(',')}|${state.library.length}`;
    if (sidebarKey !== renderedSidebarKey) {
      renderedSidebarKey = sidebarKey;
      if (sidebarOpen) renderSidebar();
    }

    syncLike();
    if (!elements.playlistMenu.hidden) renderPlaylistMenu();

    elements.error.hidden = !error;
    elements.error.textContent = error ?? '';

    if (isFullscreenView) {
      if (currentTrack && currentTrack.id !== lyricsTrackId) loadLyrics(currentTrack);
      syncLyrics(currentTime);
    }
  }

  async function fetchCovers() {
    if (fetchingCovers) return;
    fetchingCovers = true;
    elements.fetchCovers.disabled = true;
    elements.coverStatus.textContent = 'Looking up missing playlist covers…';

    // The first fetch can run for several minutes on a large playlist folder.
    // Poll the server so the status line keeps moving instead of looking stuck.
    let pollTimer = null;
    const pollProgress = async () => {
      try {
        const status = await fetchPlaylistCoverStatus();
        if (!status.total) return;
        const progress = `${status.processed} of ${status.total}`;
        elements.coverStatus.textContent = status.running
          ? `Fetching covers… ${progress}`
          : `Fetching covers… ${progress} · finishing up…`;
      } catch {
        // Progress is optional; the POST result still reports the outcome.
      }
    };
    pollTimer = window.setInterval(pollProgress, 1200);
    let reloading = false;

    try {
      const result = await fetchPlaylistCovers();
      const parts = [];
      if (result.fetched) parts.push(`${result.fetched} cover${result.fetched === 1 ? '' : 's'} fetched`);
      if (result.linked) parts.push(`${result.linked} matched an existing album cover`);
      if (result.skipped) parts.push(`${result.skipped} already cached`);
      if (result.missing) parts.push(`${result.missing} not found`);
      if (result.failed) parts.push(`${result.failed} failed`);
      elements.coverStatus.textContent =
        result.message || (parts.length ? parts.join(' · ') : 'No playlist covers were missing.');

      if (result.fetched > 0 || result.linked > 0) {
        reloading = true;
        elements.coverStatus.textContent += ' Reloading…';
        window.setTimeout(() => window.location.reload(), 900);
        return;
      }
    } catch (error) {
      elements.coverStatus.textContent =
        error instanceof Error ? error.message : 'Could not fetch playlist covers.';
    } finally {
      if (pollTimer !== null) window.clearInterval(pollTimer);
      if (!reloading) {
        fetchingCovers = false;
        elements.fetchCovers.disabled = false;
      }
    }
  }

  elements.toggle.addEventListener('click', () => audio.toggle());
  elements.previous.addEventListener('click', () => carouselStep('previous'));
  elements.next.addEventListener('click', () => carouselStep('next'));
  elements.prevCover.addEventListener('click', () => carouselStep('previous'));
  elements.nextCover.addEventListener('click', () => carouselStep('next'));
  elements.fullscreenToggle.addEventListener('click', () => toggleFullscreen());

  // Dragging artwork creates a ghost image that follows the pointer on some
  // browsers. Artwork is decorative, so never start a native drag.
  player.addEventListener('dragstart', (event) => {
    if (event.target instanceof HTMLImageElement) event.preventDefault();
  });
  elements.shuffle.addEventListener('click', () => store.toggleShuffle());
  elements.repeat.addEventListener('click', () => store.cycleRepeat());
  elements.mute.addEventListener('click', () => store.toggleMute());
  elements.volume.addEventListener('input', (event) => store.setVolume(Number(event.target.value)));

  elements.like.addEventListener('click', () => {
    const track = store.getState().currentTrack;
    if (!track) return;
    store.toggleLike(track.id);
  });

  elements.settingsToggle.addEventListener('click', () => {
    setSettingsOpen(elements.settings.hidden);
  });

  elements.motionToggle.addEventListener('click', () => store.toggleMovingBackground());
  elements.colorModeToggle.addEventListener('click', () => store.toggleDynamicColor());
  elements.fetchCovers.addEventListener('click', () => fetchCovers());

  const applyLyricsInput = (input) => {
    const key = input.dataset.lyricsSetting;
    if (!key) return;
    const isTextValue = key === 'lyricsColor' || key === 'lyricsStyle' || key === 'lyricsFont';
    const value = isTextValue ? input.value : Number(input.value);
    store.setLyricsPreference(key, value);
  };

  elements.lyricsInputs.forEach((input) => {
    input.addEventListener('input', () => applyLyricsInput(input));
    input.addEventListener('change', () => applyLyricsInput(input));
  });

  elements.lyricsChoiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const group = button.closest('[data-lyrics-choice]');
      if (!group) return;
      store.setLyricsPreference(group.dataset.lyricsChoice, button.dataset.value);
    });
  });

  elements.lyricsToggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const key = toggle.dataset.lyricsToggle;
      if (!key) return;
      store.setLyricsPreference(key, toggle.getAttribute('aria-checked') !== 'true');
    });
  });

  elements.lyricsReset.addEventListener('click', () => {
    store.resetLyricsPreferences();
    showToast('Lyrics appearance reset');
  });

  elements.queueTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      queueView = tab.dataset.queueTab === 'user' ? 'user' : 'upnext';
      closeContextMenu();
      renderQueue();
    });
  });

  elements.queueClear.addEventListener('click', () => {
    if (store.clearUserQueue()) showToast('Queue cleared');
  });

  elements.settings.addEventListener('click', (event) => {
    const swatch = event.target.closest('[data-accent-color]');
    if (!swatch) return;
    store.setAccent(swatch.dataset.accentColor);
  });

  elements.sidebarToggle.addEventListener('click', () => {
    setSidebarOpen(!sidebarOpen);
  });

  elements.sidebarClose.addEventListener('click', () => {
    setSidebarOpen(false);
    elements.sidebarToggle.focus();
  });

  elements.sidebarBackdrop.addEventListener('click', () => setSidebarOpen(false));

  elements.sidebarFilters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sidebar-filter]');
    if (!button) return;
    sidebarFilter = button.dataset.sidebarFilter;
    openPlaylistMenuId = null;
    renamingPlaylistId = null;
    renderSidebar();
  });

  function selectCollectionFromSidebar(button) {
    clearSearch();
    queueView = 'upnext';

    const type = button.dataset.collectionType;
    const collectionId = button.dataset.collectionId || null;

    if (type === 'playlist') store.selectPlaylist(collectionId);
    else if (type === 'album') store.selectAlbum(collectionId);
    else if (type === 'artist') store.selectArtist(collectionId);
    else if (type === 'liked') store.selectLiked();
    else store.selectLibrary();
  }

  elements.sidebarList.addEventListener('click', (event) => {
    const menuToggle = event.target.closest('[data-playlist-menu-toggle]');
    if (menuToggle) {
      const playlistId = menuToggle.dataset.playlistMenuToggle;
      const willOpen = openPlaylistMenuId !== playlistId;
      openPlaylistMenuId = willOpen ? playlistId : null;
      renamingPlaylistId = null;
      renderSidebar();
      return;
    }

    const action = event.target.closest('[data-playlist-action]');
    if (action) {
      const playlistId = action.dataset.playlistId;
      if (action.dataset.playlistAction === 'rename') {
        openPlaylistMenuId = playlistId;
        renamingPlaylistId = playlistId;
        renderSidebar();
        const input = elements.sidebarList.querySelector('[data-playlist-rename-input]');
        if (input) {
          input.focus();
          input.select();
        }
      } else if (action.dataset.playlistAction === 'delete') {
        openPlaylistMenuId = null;
        renamingPlaylistId = null;
        store.deletePlaylist(playlistId);
        renderSidebar();
      }
      return;
    }

    const button = event.target.closest('[data-collection-type]');
    if (!button) return;

    // Browsing a collection only swaps the visible queue. It must never start,
    // pause, or change playback; double-clicking (or pressing play) makes sound.
    selectCollectionFromSidebar(button);
  });

  elements.sidebarList.addEventListener('dblclick', (event) => {
    const button = event.target.closest('[data-collection-type]');
    if (!button) return;

    event.preventDefault();
    selectCollectionFromSidebar(button);
    // Double-click explicitly selects the collection, so start playback.
    store.playDisplayed();
    audio.play();
  });

  elements.sidebarList.addEventListener('contextmenu', (event) => {
    const button = event.target.closest('[data-collection-type="playlist"]');
    if (!button) return;
    event.preventDefault();
    openPlaylistContextMenu(button.dataset.collectionId, event.clientX, event.clientY);
  });

  elements.playlistContextMenu.addEventListener('click', (event) => {
    const action = event.target.closest('[data-playlist-context-action]');
    if (!action || !playlistContextId) return;
    const playlistId = playlistContextId;

    switch (action.dataset.playlistContextAction) {
      case 'play': {
        closePlaylistContextMenu();
        setSidebarOpen(false);
        clearSearch();
        queueView = 'upnext';
        store.selectPlaylist(playlistId);
        store.playDisplayed();
        audio.play();
        break;
      }
      case 'add-songs': {
        closePlaylistContextMenu();
        openPicker(playlistId);
        break;
      }
      case 'rename': {
        closePlaylistContextMenu();
        openPlaylistMenuId = playlistId;
        renamingPlaylistId = playlistId;
        renderSidebar();
        const input = elements.sidebarList.querySelector('[data-playlist-rename-input]');
        if (input) {
          input.focus();
          input.select();
        }
        break;
      }
      case 'delete': {
        closePlaylistContextMenu();
        store.deletePlaylist(playlistId);
        renderSidebar();
        showToast('Playlist deleted');
        break;
      }
      default:
        closePlaylistContextMenu();
        break;
    }
  });

  elements.pickerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addFirstPickerMatch();
  });

  elements.pickerSearch.addEventListener('input', () => renderPicker());

  elements.pickerList.addEventListener('click', (event) => {
    const row = event.target.closest('[data-picker-track-id]');
    if (!row || !pickerPlaylistId) return;
    const state = store.getState();
    const playlist = state.playlists.find((item) => item.id === pickerPlaylistId);
    const track = state.library.find((item) => item.id === row.dataset.pickerTrackId);
    if (!playlist || !track) return;

    const added = store.toggleTrackInPlaylist(playlist.id, track.id);
    renderPicker();
    showToast(
      added
        ? `Added “${track.title}” to “${playlist.name}”`
        : `Removed “${track.title}” from “${playlist.name}”`,
    );
  });

  elements.pickerClose.addEventListener('click', closePicker);
  elements.picker.addEventListener('click', (event) => {
    if (event.target === elements.picker) closePicker();
  });

  elements.sidebarList.addEventListener('submit', (event) => {
    const form = event.target.closest('[data-playlist-rename-form]');
    if (!form) return;

    event.preventDefault();
    const playlistId = form.dataset.playlistId;
    const input = form.querySelector('[data-playlist-rename-input]');
    const name = input ? input.value.trim() : '';

    openPlaylistMenuId = null;
    renamingPlaylistId = null;
    if (name) store.renamePlaylist(playlistId, name);
    renderSidebar();
  });

  elements.sidebarCreateForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = elements.sidebarCreateName.value.trim();
    if (!name) return;
    store.createPlaylist(name);
    elements.sidebarCreateName.value = '';
    renderSidebar();
  });

  elements.playlistToggle.addEventListener('click', () => {
    setPlaylistOpen(elements.playlistMenu.hidden);
  });

  elements.playlistList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-playlist-id]');
    if (!button) return;

    const track = store.getState().currentTrack;
    if (!track) return;

    store.toggleTrackInPlaylist(button.dataset.playlistId, track.id);
    renderPlaylistMenu();
  });

  elements.playlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = elements.playlistName.value.trim();
    if (!name) return;

    const track = store.getState().currentTrack;
    store.createPlaylist(name, track?.id ?? null);
    elements.playlistName.value = '';
    renderPlaylistMenu();
  });

  elements.searchInput.addEventListener('input', () => applySearch(elements.searchInput.value));

  elements.searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      clearSearch();
      elements.searchInput.blur();
      return;
    }

    if (event.key !== 'Enter') return;
    event.preventDefault();

    if (event.shiftKey) {
      openYouTubeSearch();
      return;
    }

    playFirstResult();
  });

  elements.searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    playFirstResult();
  });

  elements.progress.addEventListener('pointerdown', () => {
    isSeeking = true;
  });
  elements.progress.addEventListener('input', (event) => {
    isSeeking = true;
    audio.seek(Number(event.target.value));
  });
  elements.progress.addEventListener('change', () => {
    isSeeking = false;
  });
  elements.progress.addEventListener('blur', () => {
    isSeeking = false;
  });

  elements.queue.addEventListener('click', (event) => {
    const menuButton = event.target.closest('[data-track-menu]');
    if (menuButton) {
      const rect = menuButton.getBoundingClientRect();
      openContextMenu(menuButton.dataset.trackMenu, rect.left, rect.bottom + 6);
      return;
    }

    const remove = event.target.closest('[data-queue-remove]');
    if (remove) {
      store.removeFromQueue(remove.dataset.queueRemove);
      return;
    }

    if (event.target.closest('[data-queue-handle]')) return;

    const button = event.target.closest('[data-track-id]');
    if (!button) return;

    if (suppressQueueClick) {
      suppressQueueClick = false;
      return;
    }

    if (queueView === 'user') {
      const row = button.closest('[data-queue-uid]');
      if (!row) return;
      if (store.playFromQueue(row.dataset.queueUid)) audio.play();
      return;
    }

    const trackId = button.dataset.trackId;
    if (!searchQuery && trackId === store.getState().currentTrack?.id) {
      audio.toggle();
      return;
    }

    playTrack(trackId);
  });

  elements.queue.addEventListener('contextmenu', (event) => {
    const row = event.target.closest('[data-track-id]');
    if (!row) return;
    event.preventDefault();
    openContextMenu(row.dataset.trackId, event.clientX, event.clientY);
  });

  elements.queue.addEventListener('keydown', (event) => {
    const handle = event.target.closest('[data-queue-handle]');
    if (!handle) return;
    const row = handle.closest('[data-queue-uid]');
    if (!row) return;
    const uid = row.dataset.queueUid;

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const moved = store.moveQueueItemBy(uid, event.key === 'ArrowUp' ? -1 : 1);
      if (moved) queueFocusUid = uid;
      return;
    }

    if (event.key === 'Delete' || event.key === 'Backspace') {
      event.preventDefault();
      store.removeFromQueue(uid);
    }
  });

  elements.queue.addEventListener('dragstart', (event) => {
    const handle = event.target.closest('[data-queue-handle]');
    if (!handle) {
      event.preventDefault();
      return;
    }

    const row = handle.closest('[data-queue-uid]');
    if (!row) return;
    draggedQueueUid = row.dataset.queueUid;
    suppressQueueClick = true;
    row.classList.add('is-dragging');
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', draggedQueueUid);
    }
  });

  elements.queue.addEventListener('dragover', (event) => {
    if (!draggedQueueUid) return;
    const row = event.target.closest('[data-queue-uid]');
    if (!row) return;
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    elements.queue.querySelectorAll('.is-drop-target').forEach((item) => {
      item.classList.remove('is-drop-target', 'is-drop-after');
    });
    row.classList.add('is-drop-target');
    const rect = row.getBoundingClientRect();
    row.classList.toggle('is-drop-after', event.clientY > rect.top + rect.height / 2);
  });

  elements.queue.addEventListener('dragend', (event) => {
    const row = event.target.closest('[data-queue-uid]');
    row?.classList.remove('is-dragging');
    elements.queue.querySelectorAll('.is-drop-target').forEach((item) => {
      item.classList.remove('is-drop-target', 'is-drop-after');
    });
    draggedQueueUid = null;
    window.setTimeout(() => {
      suppressQueueClick = false;
    }, 80);
  });

  elements.queue.addEventListener('drop', (event) => {
    if (!draggedQueueUid) return;
    const row = event.target.closest('[data-queue-uid]');
    if (!row) return;
    event.preventDefault();

    const rows = [...elements.queue.querySelectorAll('[data-queue-uid]')];
    let index = rows.indexOf(row);
    const rect = row.getBoundingClientRect();
    if (event.clientY > rect.top + rect.height / 2) index += 1;

    const fromIndex = store.getState().userQueue.findIndex((entry) => entry.uid === draggedQueueUid);
    const toIndex = fromIndex !== -1 && fromIndex < index ? index - 1 : index;
    store.moveQueueItem(draggedQueueUid, toIndex);

    draggedQueueUid = null;
    elements.queue.querySelectorAll('.is-drop-target').forEach((item) => {
      item.classList.remove('is-drop-target', 'is-drop-after');
    });
  });

  elements.queueBack.addEventListener('click', () => {
    clearSearch();
    queueView = 'upnext';
    store.goBackQueue();
  });

  const openCurrentContext = (event) => {
    // Specific targets (song rows, playlist rows, covers) handle their own
    // menus first and mark the event as handled.
    if (event.defaultPrevented) return;
    if (
      event.target instanceof Element &&
      event.target.closest(
        'input, textarea, select, [contenteditable="true"], dialog, [data-context-menu], [data-playlist-context-menu]',
      )
    ) {
      return;
    }
    const track = store.getState().currentTrack;
    if (!track) return;
    event.preventDefault();
    openContextMenu(track.id, event.clientX, event.clientY);
  };
  // Right-clicking anywhere else on the player opens the same song menu, so
  // the current track's actions are always one right-click away.
  player.addEventListener('contextmenu', openCurrentContext);

  elements.contextMenu.addEventListener('click', (event) => {
    const submenuToggle = event.target.closest('[data-context-submenu]');
    if (submenuToggle) {
      if (elements.contextPlaylists.hidden) openContextSubmenu();
      else closeContextSubmenu();
      return;
    }

    const playlist = event.target.closest('[data-context-playlist-id]');
    if (playlist) {
      if (!contextTrackId) return;
      const playlistId = playlist.dataset.contextPlaylistId;
      store.toggleTrackInPlaylist(playlistId, contextTrackId);
      const updated = store.getState().playlists.find((item) => item.id === playlistId);
      const added = Boolean(updated?.trackIds.includes(contextTrackId));
      renderContextPlaylists();
      showToast(
        added
          ? `Added to “${updated?.name ?? 'playlist'}”`
          : `Removed from “${updated?.name ?? 'playlist'}”`,
      );
      return;
    }

    const action = event.target.closest('[data-context-action]');
    if (action) handleContextAction(action.dataset.contextAction);
  });

  elements.contextMenu.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!contextTrackId) return;
    const name = elements.contextPlaylistName.value.trim();
    if (!name) return;

    store.createPlaylist(name, contextTrackId);
    elements.contextPlaylistName.value = '';
    renderContextPlaylists();
    showToast(`Added to “${name}”`);
  });

  elements.infoClose.addEventListener('click', () => elements.infoDialog.close());
  elements.infoDialog.addEventListener('click', (event) => {
    if (event.target === elements.infoDialog) elements.infoDialog.close();
  });

  elements.lyricsGenius.addEventListener('click', () => {
    const track = store.getState().currentTrack;
    if (track) openExternal(onlineUrl('genius', track));
  });

  elements.lyricsYoutube.addEventListener('click', () => {
    const track = store.getState().currentTrack;
    if (track) openExternal(onlineUrl('youtube', track));
  });

  elements.lyricsLines.addEventListener('click', (event) => {
    const line = event.target.closest('[data-lyric-time]');
    if (!line) return;
    audio.seek(Number(line.dataset.lyricTime));
  });

  const pauseLyricsFollow = () => {
    lyricsScrollUntil = Date.now() + 3500;
  };
  elements.lyricsLines.addEventListener('wheel', pauseLyricsFollow, { passive: true });
  elements.lyricsLines.addEventListener('touchmove', pauseLyricsFollow, { passive: true });

  function seekBy(seconds) {
    const { currentTime, duration } = store.getState();
    audio.seek(Math.min(Math.max(currentTime + seconds, 0), duration || currentTime + seconds));
  }

  function adjustVolume(delta) {
    store.setVolume(store.getState().volume + delta);
  }

  function handleKeydown(event) {
    if (event.code === 'Escape') {
      if (elements.picker.open) {
        closePicker();
        return;
      }
      if (!elements.playlistContextMenu.hidden) {
        closePlaylistContextMenu();
        return;
      }
      if (!elements.contextMenu.hidden) {
        closeContextMenu();
        return;
      }
      if (elements.infoDialog.open) {
        elements.infoDialog.close();
        return;
      }
      if (!elements.playlistMenu.hidden) {
        setPlaylistOpen(false);
        elements.playlistToggle.focus();
        return;
      }
      if (openPlaylistMenuId !== null) {
        closePlaylistMenu();
        elements.sidebarToggle.focus();
        return;
      }
      if (sidebarOpen) {
        setSidebarOpen(false);
        elements.sidebarToggle.focus();
        return;
      }
      if (!elements.settings.hidden) {
        setSettingsOpen(false);
        elements.settingsToggle.focus();
        return;
      }
      if (isFullscreenView) {
        event.preventDefault();
        setFullscreen(false);
        elements.fullscreenToggle.focus({ preventScroll: true });
        return;
      }
    }

    if (
      event.code === 'Slash' &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey &&
      !event.shiftKey &&
      !isEditableTarget(event.target)
    ) {
      event.preventDefault();
      elements.searchInput.focus();
      elements.searchInput.select();
      return;
    }

    if (event.metaKey || event.ctrlKey || event.altKey || isTypingTarget(event.target)) return;

    switch (event.code) {
      case 'Space':
        event.preventDefault();
        audio.toggle();
        break;
      case 'ArrowRight':
        event.preventDefault();
        seekBy(5);
        break;
      case 'ArrowLeft':
        event.preventDefault();
        seekBy(-5);
        break;
      case 'ArrowUp':
        event.preventDefault();
        adjustVolume(0.05);
        break;
      case 'ArrowDown':
        event.preventDefault();
        adjustVolume(-0.05);
        break;
      case 'KeyN':
        carouselStep('next');
        break;
      case 'KeyP':
        carouselStep('previous');
        break;
      case 'KeyM':
        store.toggleMute();
        break;
      case 'KeyS':
        store.toggleShuffle();
        break;
      case 'KeyR':
        store.cycleRepeat();
        break;
      case 'KeyF':
        event.preventDefault();
        toggleFullscreen();
        break;
      default:
        break;
    }
  }

  function handlePointerUp() {
    isSeeking = false;
  }

  function handleResize() {
    if (sidebarOpen) positionSidebar();
  }

  function handleFullscreenChange() {
    if (!document.fullscreenElement && isFullscreenView) {
      setFullscreen(false, { exitBrowser: false });
    }
  }

  function handleDocumentClick(event) {
    if (!elements.playlistContextMenu.hidden && event.target instanceof Element) {
      if (!elements.playlistContextMenu.contains(event.target)) {
        closePlaylistContextMenu();
      }
    }

    if (!elements.contextMenu.hidden && event.target instanceof Element) {
      if (
        !elements.contextMenu.contains(event.target) &&
        !event.target.closest('[data-track-menu]')
      ) {
        closeContextMenu();
      }
    }

    if (openPlaylistMenuId !== null && event.target instanceof Element) {
      const insideActions = event.target.closest('[data-playlist-actions]');
      const insideToggle = event.target.closest('[data-playlist-menu-toggle]');
      if (!insideActions && !insideToggle) closePlaylistMenu();
    }

    if (!elements.playlistMenu.hidden) {
      if (
        !elements.playlistMenu.contains(event.target) &&
        !elements.playlistToggle.contains(event.target)
      ) {
        setPlaylistOpen(false);
      }
    }

    if (elements.settings.hidden) return;
    if (elements.settings.contains(event.target) || elements.settingsToggle.contains(event.target)) return;
    // Opening settings from the song menu must survive this same click.
    if (event.target instanceof Element && event.target.closest('[data-context-action="settings"]')) return;
    setSettingsOpen(false);
  }

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('fullscreenchange', handleFullscreenChange);
  window.addEventListener('pointerup', handlePointerUp);
  window.addEventListener('resize', handleResize);

  const unsubscribe = store.subscribe(update);
  const unsubscribeArtwork = art.subscribe((track) => refreshArtwork(track));

  return () => {
    unsubscribe();
    unsubscribeArtwork();
    if (artObserver) artObserver.disconnect();
    carouselAnimations.forEach((animation) => animation.cancel());
    carouselAnimations = [];
    window.clearTimeout(toastTimer);
    lyricsAbortController?.abort();
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleDocumentClick);
    document.removeEventListener('fullscreenchange', handleFullscreenChange);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('resize', handleResize);
  };
}
