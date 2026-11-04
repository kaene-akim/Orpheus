import { formatTime } from '../utils/formatTime.js';

const DEFAULT_ART = '/assets/images/default-album-art.svg';

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
          <span class="brand__mark">${icon('note')}</span>
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
                <p class="settings__title">Moving background</p>
                <p class="settings__hint">A slow animated color wash behind the player.</p>
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
                <div class="shortcut"><span>Close panels</span><kbd>Esc</kbd></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div class="player__body">
        <section class="now-playing" aria-label="Now playing">
          <div class="cover-flow">
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
            <span class="queue__count" data-count></span>
          </div>
          <ol class="queue__list" data-queue></ol>
        </aside>
      </div>
    </section>
  `;

  const player = root.querySelector('[data-player]');
  const elements = {
    artwork: root.querySelector('[data-artwork]'),
    prevCover: root.querySelector('[data-prev-cover]'),
    nextCover: root.querySelector('[data-next-cover]'),
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
    count: root.querySelector('[data-count]'),
    error: root.querySelector('[data-error]'),
    settingsToggle: root.querySelector('[data-settings-toggle]'),
    settings: root.querySelector('[data-settings]'),
    swatches: [...root.querySelectorAll('[data-accent-color]')],
    motionToggle: root.querySelector('[data-motion-toggle]'),
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
  let searchQuery = '';
  let sidebarOpen = false;
  let sidebarFilter = 'playlists';
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

  function trackRow(track) {
    const active = store.getState().currentTrack?.id === track.id;
    return `
      <li class="queue__row">
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

  function renderQueue() {
    const state = store.getState();
    let html = '';

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
      } else {
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
      movingBackground,
      error,
      canGoBack,
    } = state;

    trackLookup = new Map();
    state.library.forEach((track) => trackLookup.set(track.id, track));
    state.tracks.forEach((track) => trackLookup.set(track.id, track));
    state.displayedTracks.forEach((track) => trackLookup.set(track.id, track));

    if (accent !== appliedAccent) {
      document.documentElement.style.setProperty('--accent', accent);
      appliedAccent = accent;
    }

    elements.swatches.forEach((swatch) => {
      const selected = swatch.dataset.accentColor.toLowerCase() === accent.toLowerCase();
      swatch.classList.toggle('is-selected', selected);
      swatch.setAttribute('aria-pressed', String(selected));
    });

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
    const queueKey = `${collectionKey}|${activeQueueKey}|${state.displayedTracks
      .map((track) => track.id)
      .join(',')}`;
    if (queueKey !== renderedQueueKey) {
      renderedQueueKey = queueKey;
      renderQueue();
    } else {
      syncQueueActive();
    }

    elements.queueBack.hidden = !canGoBack;

    const sidebarKey = `${sidebarFilter}|${collectionKey}|${state.playlists
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
  }

  elements.toggle.addEventListener('click', () => audio.toggle());
  elements.previous.addEventListener('click', () => audio.previous());
  elements.next.addEventListener('click', () => audio.next());
  elements.prevCover.addEventListener('click', () => audio.previous());
  elements.nextCover.addEventListener('click', () => audio.next());

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
    const button = event.target.closest('[data-track-id]');
    if (!button) return;

    const trackId = button.dataset.trackId;
    if (!searchQuery && trackId === store.getState().currentTrack?.id) {
      audio.toggle();
      return;
    }

    playTrack(trackId);
  });

  elements.queueBack.addEventListener('click', () => {
    clearSearch();
    store.goBackQueue();
  });

  function seekBy(seconds) {
    const { currentTime, duration } = store.getState();
    audio.seek(Math.min(Math.max(currentTime + seconds, 0), duration || currentTime + seconds));
  }

  function adjustVolume(delta) {
    store.setVolume(store.getState().volume + delta);
  }

  function handleKeydown(event) {
    if (event.code === 'Escape') {
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
        audio.next();
        break;
      case 'KeyP':
        audio.previous();
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

  function handleDocumentClick(event) {
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
    setSettingsOpen(false);
  }

  document.addEventListener('keydown', handleKeydown);
  document.addEventListener('click', handleDocumentClick);
  window.addEventListener('pointerup', handlePointerUp);
  window.addEventListener('resize', handleResize);

  const unsubscribe = store.subscribe(update);
  const unsubscribeArtwork = art.subscribe((track) => refreshArtwork(track));

  return () => {
    unsubscribe();
    unsubscribeArtwork();
    if (artObserver) artObserver.disconnect();
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleDocumentClick);
    window.removeEventListener('pointerup', handlePointerUp);
    window.removeEventListener('resize', handleResize);
  };
}
