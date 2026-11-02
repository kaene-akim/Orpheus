(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[{id:`neon-skyline`,title:`Neon Skyline`,artist:`Aster Vale`,album:`Midnight Circuits`,src:`/assets/audio/neon-skyline.mp3`,artwork:`/assets/images/neon-skyline.svg`,duration:42},{id:`paper-moon`,title:`Paper Moon`,artist:`Lumen Fields`,album:`Soft Geometry`,src:`/assets/audio/paper-moon.mp3`,artwork:`/assets/images/paper-moon.svg`,duration:38},{id:`glass-horizon`,title:`Glass Horizon`,artist:`Kite & Compass`,album:`Night Drive`,src:`/assets/audio/glass-horizon.mp3`,artwork:`/assets/images/glass-horizon.svg`,duration:44},{id:`velvet-static`,title:`Velvet Static`,artist:`Noa Reyes`,album:`Afterglow`,src:`/assets/audio/velvet-static.mp3`,artwork:`/assets/images/velvet-static.svg`,duration:40}],t=[`off`,`all`,`one`],n=/^#[0-9a-f]{6}$/i,r={volume:.8,muted:!1,shuffle:!1,repeat:`off`,accent:`#b49cff`};function i(e,t,n){return Math.min(Math.max(e,t),n)}function a(e){return typeof e==`string`&&n.test(e)}function o(e){if(!a(e))return!1;let t=Number.parseInt(e.slice(1,3),16),n=Number.parseInt(e.slice(3,5),16),r=Number.parseInt(e.slice(5,7),16);return .2126*t+.7152*n+.0722*r>=100}function s(e){try{let n=JSON.parse(window.localStorage.getItem(e)??`{}`),a=Number(n.volume);return{volume:Number.isFinite(a)?i(a,0,1):r.volume,muted:typeof n.muted==`boolean`?n.muted:r.muted,shuffle:typeof n.shuffle==`boolean`?n.shuffle:r.shuffle,repeat:t.includes(n.repeat)?n.repeat:r.repeat,accent:o(n.accent)?n.accent.toLowerCase():r.accent}}catch{return{...r}}}function c(e){try{let t=JSON.parse(window.localStorage.getItem(e)??`[]`);return Array.isArray(t)?t.filter(e=>e&&typeof e.id==`string`&&typeof e.name==`string`).map(e=>{let t=Array.isArray(e.trackIds)?e.trackIds:Array.isArray(e.tracks)?e.tracks:[];return{id:e.id,name:e.name,trackIds:t.filter(e=>typeof e==`string`)}}):[]}catch{return[]}}function l(e=[],{storageKey:n=`orpheus:player-prefs`,playlistsKey:r=`orpheus:playlists`}={}){let a=[...e],l=s(n),u={tracks:[...a],library:a,playlists:c(r),activePlaylistId:null,currentIndex:0,isPlaying:!1,currentTime:0,duration:0,error:null,...l},d=new Set;function f(){return{...u,currentTrack:u.tracks[u.currentIndex]??null}}function p(){try{let{volume:e,muted:t,shuffle:r,repeat:i,accent:a}=u;window.localStorage.setItem(n,JSON.stringify({volume:e,muted:t,shuffle:r,repeat:i,accent:a}))}catch{}}function m(){try{window.localStorage.setItem(r,JSON.stringify(u.playlists))}catch{}}function h(e){u={...u,...e},[`volume`,`muted`,`shuffle`,`repeat`,`accent`].some(t=>t in e)&&p(),`playlists`in e&&m();let t=f();d.forEach(e=>e(t))}function g(){if(u.tracks.length<=1)return 0;let e=u.currentIndex;for(;e===u.currentIndex;)e=Math.floor(Math.random()*u.tracks.length);return e}function _({automatic:e=!1}={}){let{tracks:t,currentIndex:n,shuffle:r,repeat:i}=u;if(!t.length)return!1;let a;if(r)a=g();else if(n<t.length-1)a=n+1;else if(i===`all`)a=0;else if(e)return!1;else a=0;return h({currentIndex:a,currentTime:0,duration:0,error:null}),!0}function v(){let{tracks:e,currentIndex:t,shuffle:n}=u;e.length&&h({currentIndex:n?g():(t-1+e.length)%e.length,currentTime:0,duration:0,error:null})}function y(e){if(!e)return[...a];let t=new Map(a.map(e=>[e.id,e]));return e.trackIds.map(e=>t.get(e)).filter(Boolean)}function b(e,t,n=null){let r=Array.isArray(e)?[...e]:[],i=u.tracks[u.currentIndex]?.id??null,a=n??i,o=0;if(a){let e=r.findIndex(e=>e.id===a);e!==-1&&(o=e)}return h({tracks:r,currentIndex:o,activePlaylistId:t,currentTime:0,duration:0,isPlaying:!1,error:null}),r.length>0}return{getState:f,subscribe(e){return d.add(e),e(f()),()=>d.delete(e)},setState:h,selectTrack(e){!Number.isInteger(e)||e<0||e>=u.tracks.length||e!==u.currentIndex&&h({currentIndex:e,currentTime:0,duration:0,error:null})},setQueue(e,{activePlaylistId:t=null,selectedTrackId:n=null}={}){return b(e,t,n)},selectPlaylist(e=null){let t=e?u.playlists.find(t=>t.id===e)??null:null;return b(y(t),t?t.id:null)},selectLibrary(){return b(a,null)},createPlaylist(e,t=null){let n=String(e??``).trim().slice(0,40);if(!n)return null;let r={id:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,name:n,trackIds:t?[t]:[]};return h({playlists:[...u.playlists,r]}),r.id},toggleTrackInPlaylist(e,t){let n=u.playlists.find(t=>t.id===e);if(!n||typeof t!=`string`)return!1;let r=n.trackIds.includes(t),i=r?n.trackIds.filter(e=>e!==t):[...n.trackIds,t],a={playlists:u.playlists.map(t=>t.id===e?{...t,trackIds:i}:t)};if(u.activePlaylistId===e){let e=y({...n,trackIds:i}),t=u.tracks[u.currentIndex]?.id??null,r=e.findIndex(e=>e.id===t);a.tracks=e,a.currentIndex=r===-1?0:r,r===-1&&(a.currentTime=0,a.duration=0,a.isPlaying=!1)}return h(a),!r},next:_,previous:v,toggleShuffle(){h({shuffle:!u.shuffle})},cycleRepeat(){let e=t[(t.indexOf(u.repeat)+1)%t.length];h({repeat:e})},setVolume(e){let t=i(Number(e)||0,0,1);h({volume:t,muted:t>0?!1:u.muted})},toggleMute(){h({muted:!u.muted})},setAccent(e){o(e)&&h({accent:e.toLowerCase()})}}}function u(e){let t=new Audio;t.preload=`metadata`;let n=null;function r(e){n=e?.id??null,e?(t.src=e.src,t.load()):(t.removeAttribute(`src`),t.load())}function i(e){`mediaSession`in navigator&&typeof MediaMetadata<`u`&&(e?navigator.mediaSession.metadata=new MediaMetadata({title:e.title,artist:e.artist,album:e.album,artwork:[{src:new URL(e.artwork,window.location.href).href,sizes:`512x512`,type:`image/svg+xml`}]}):navigator.mediaSession.metadata=null)}e.subscribe(e=>{let a=e.currentTrack;(a?.id??null)!==n&&(r(a),i(a));let o=e.muted?0:e.volume;t.volume!==o&&(t.volume=o)});function a(){return e.getState().currentTrack?t.play().catch(()=>{e.setState({isPlaying:!1})}):Promise.resolve()}function o(){t.pause()}function s(){return e.getState().isPlaying?o():a()}function c(n){!Number.isFinite(t.duration)||t.duration<=0||(t.currentTime=Math.min(Math.max(n,0),t.duration),e.setState({currentTime:t.currentTime}))}function l(){e.next()&&a()}function u(){t.currentTime>3?c(0):(e.previous(),a())}return t.addEventListener(`loadedmetadata`,()=>{e.setState({duration:Number.isFinite(t.duration)?t.duration:0})}),t.addEventListener(`durationchange`,()=>{e.setState({duration:Number.isFinite(t.duration)?t.duration:0})}),t.addEventListener(`timeupdate`,()=>{e.setState({currentTime:t.currentTime})}),t.addEventListener(`play`,()=>e.setState({isPlaying:!0})),t.addEventListener(`pause`,()=>e.setState({isPlaying:!1})),t.addEventListener(`ended`,()=>{e.getState().repeat===`one`?(t.currentTime=0,a()):e.next({automatic:!0})?a():(t.currentTime=0,e.setState({isPlaying:!1,currentTime:0}))}),t.addEventListener(`error`,()=>{t.getAttribute(`src`)&&e.setState({isPlaying:!1,error:`This track could not be played. Check that the audio file exists.`})}),`mediaSession`in navigator&&Object.entries({play:()=>a(),pause:()=>o(),previoustrack:()=>u(),nexttrack:()=>l(),seekto:e=>{Number.isFinite(e.seekTime)&&c(e.seekTime)}}).forEach(([e,t])=>{try{navigator.mediaSession.setActionHandler(e,t)}catch{}}),{audio:t,play:a,pause:o,toggle:s,seek:c,next:l,previous:u,loadTrack:r}}function d(e=0){return Number.isFinite(e)?`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,`0`)}`:`0:00`}var f=`/assets/images/default-album-art.svg`,p=[`#b49cff`,`#7ee0d3`,`#ff8db3`,`#ffd166`,`#7cc4ff`,`#9ef07a`,`#ff9f6e`,`#f5f5f5`],m={note:`<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,play:`<path d="M8 5.2c0-.8.9-1.3 1.6-.9l9.6 6.8c.6.4.6 1.4 0 1.8l-9.6 6.8c-.7.4-1.6-.1-1.6-.9z" fill="currentColor" stroke="none"/>`,pause:`<rect x="6.4" y="5" width="4.2" height="14" rx="1.4" fill="currentColor" stroke="none"/><rect x="13.4" y="5" width="4.2" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,previous:`<path d="M19 5.5v13L9.8 12z" fill="currentColor" stroke="none"/><rect x="5" y="5" width="2.8" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,next:`<path d="M5 5.5v13L14.2 12z" fill="currentColor" stroke="none"/><rect x="16.2" y="5" width="2.8" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,shuffle:`<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.97a4 4 0 0 0 3.3-1.7l5.46-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.97a4 4 0 0 1 3.3 1.7l5.46 8.6a4 4 0 0 0 3.3 1.7H22"/>`,repeat:`<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,repeatOne:`<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h2v5"/>`,volumeHigh:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>`,volumeLow:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>`,volumeMute:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m16 9 5 5"/><path d="m21 9-5 5"/>`,search:`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`,heart:`<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>`,playlist:`<path d="M3 6h11"/><path d="M3 12h11"/><path d="M3 18h7"/><path d="M17 11v8"/><path d="M13 15h8"/>`,close:`<path d="m6 6 12 12"/><path d="m18 6-12 12"/>`,settings:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`};function h(e){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${m[e]}</svg>`}function g(e=``){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function _(e){return e instanceof HTMLElement&&(e.isContentEditable||[`INPUT`,`TEXTAREA`,`SELECT`,`BUTTON`,`A`].includes(e.tagName))}function v(e){return e instanceof HTMLElement&&(e.isContentEditable||[`INPUT`,`TEXTAREA`,`SELECT`].includes(e.tagName))}function y(e){return`${e.title} ${e.artist} ${e.album}`.toLowerCase()}function b(e,{store:t,audio:n}){e.innerHTML=`
    <section class="player" data-player aria-label="Orpheus music player">
      <div class="sidebar-backdrop" data-sidebar-backdrop></div>

      <aside class="sidebar" id="playlists-sidebar" data-sidebar aria-hidden="true" aria-label="Playlists">
        <div class="sidebar__header">
          <div>
            <p class="sidebar__eyebrow">Library</p>
            <h2>Playlists</h2>
          </div>
          <button class="sidebar__close" type="button" data-sidebar-close aria-label="Close playlists">
            ${h(`close`)}
          </button>
        </div>
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
          <span class="brand__mark">${h(`note`)}</span>
          <span class="brand__name">Orpheus</span>
        </button>

        <form class="search" role="search" data-search-form>
          <div class="search__field">
            <span class="search__icon" aria-hidden="true">${h(`search`)}</span>
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
            ${h(`search`)}
          </button>
        </form>

        <div class="header-actions">
          <span class="status" data-status>
            <span class="status__dot" aria-hidden="true"></span>
            <span data-status-label>Ready</span>
          </span>
          <button
            class="icon-button"
            type="button"
            data-settings-toggle
            aria-label="Player settings"
            aria-expanded="false"
            aria-controls="settings-panel"
            title="Settings"
          >
            ${h(`settings`)}
          </button>

          <div class="settings" id="settings-panel" data-settings hidden>
            <p class="settings__title">Accent color</p>
            <p class="settings__hint">Choose a bright color for buttons and outlines.</p>
            <div class="settings__swatches" data-swatches>
              ${p.map(e=>`
                  <button
                    class="swatch"
                    type="button"
                    data-accent-color="${e}"
                    style="--swatch: ${e}"
                    aria-label="Use accent color ${e}"
                    aria-pressed="false"
                    title="${e}"
                  ></button>
                `).join(``)}
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
              <img src="${f}" alt="" data-prev-artwork loading="lazy" />
            </button>
            <div class="artwork-frame">
              <img class="artwork-frame__image" data-artwork src="${f}" alt="" />
            </div>
            <button
              class="cover-flow__side cover-flow__side--next"
              type="button"
              data-next-cover
              aria-label="Play next track"
            >
              <img src="${f}" alt="" data-next-artwork loading="lazy" />
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
                ${h(`heart`)}
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
                  ${h(`playlist`)}
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
                ${h(`shuffle`)}
              </button>
              <button class="control" type="button" data-previous aria-label="Previous track" title="Previous track">
                ${h(`previous`)}
              </button>
              <button class="control control--play" type="button" data-toggle aria-label="Play" title="Play">
                ${h(`play`)}
              </button>
              <button class="control" type="button" data-next aria-label="Next track" title="Next track">
                ${h(`next`)}
              </button>
              <button class="control" type="button" data-repeat aria-label="Repeat: off" aria-pressed="false" title="Repeat: off">
                ${h(`repeat`)}
              </button>
            </div>

            <div class="volume">
              <button class="volume__button" type="button" data-mute aria-label="Mute" title="Mute">
                ${h(`volumeHigh`)}
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

        <aside class="queue" aria-label="Up next">
          <div class="queue__header">
            <div>
              <p class="queue__source" data-queue-source>All Songs</p>
              <h2 data-queue-title>Up next</h2>
            </div>
            <span class="queue__count" data-count></span>
          </div>
          <ol class="queue__list" data-queue></ol>
        </aside>
      </div>
    </section>
  `;let r=e.querySelector(`[data-player]`),i={artwork:e.querySelector(`[data-artwork]`),prevCover:e.querySelector(`[data-prev-cover]`),nextCover:e.querySelector(`[data-next-cover]`),prevArtwork:e.querySelector(`[data-prev-artwork]`),nextArtwork:e.querySelector(`[data-next-artwork]`),album:e.querySelector(`[data-album]`),title:e.querySelector(`[data-title]`),artist:e.querySelector(`[data-artist]`),progress:e.querySelector(`[data-progress]`),current:e.querySelector(`[data-current]`),duration:e.querySelector(`[data-duration]`),toggle:e.querySelector(`[data-toggle]`),previous:e.querySelector(`[data-previous]`),next:e.querySelector(`[data-next]`),shuffle:e.querySelector(`[data-shuffle]`),repeat:e.querySelector(`[data-repeat]`),mute:e.querySelector(`[data-mute]`),volume:e.querySelector(`[data-volume]`),volumeLabel:e.querySelector(`[data-volume-label]`),queue:e.querySelector(`[data-queue]`),queueSource:e.querySelector(`[data-queue-source]`),queueTitle:e.querySelector(`[data-queue-title]`),count:e.querySelector(`[data-count]`),status:e.querySelector(`[data-status]`),statusLabel:e.querySelector(`[data-status-label]`),error:e.querySelector(`[data-error]`),settingsToggle:e.querySelector(`[data-settings-toggle]`),settings:e.querySelector(`[data-settings]`),swatches:[...e.querySelectorAll(`[data-accent-color]`)],searchForm:e.querySelector(`[data-search-form]`),searchInput:e.querySelector(`[data-search]`),like:e.querySelector(`[data-like]`),playlistToggle:e.querySelector(`[data-playlist-toggle]`),playlistMenu:e.querySelector(`[data-playlist-menu]`),playlistList:e.querySelector(`[data-playlist-list]`),playlistForm:e.querySelector(`[data-playlist-form]`),playlistName:e.querySelector(`[data-playlist-name]`),sidebar:e.querySelector(`[data-sidebar]`),sidebarBackdrop:e.querySelector(`[data-sidebar-backdrop]`),sidebarToggle:e.querySelector(`[data-sidebar-toggle]`),sidebarClose:e.querySelector(`[data-sidebar-close]`),sidebarList:e.querySelector(`[data-sidebar-list]`),sidebarCreateForm:e.querySelector(`[data-create-playlist-form]`),sidebarCreateName:e.querySelector(`[data-create-playlist-name]`),header:e.querySelector(`.player__header`)},a=!1,o=null,s=``,c=!1,l=[],u=null,m=null,b=x();function x(){try{let e=JSON.parse(window.localStorage.getItem(`orpheus:liked`)??`[]`);return new Set(Array.isArray(e)?e.filter(e=>typeof e==`string`):[])}catch{return new Set}}function S(){try{window.localStorage.setItem(`orpheus:liked`,JSON.stringify([...b]))}catch{}}function C(){let e=t.getState().currentTrack,n=!!(e&&b.has(e.id));i.like.classList.toggle(`is-active`,n),i.like.setAttribute(`aria-pressed`,String(n)),i.like.setAttribute(`aria-label`,n?`Unlike this song`:`Like this song`),i.like.setAttribute(`title`,n?`Unlike this song`:`Like this song`)}function w(e,t){let n=e.closest(`.range-shell`);n&&n.style.setProperty(`--value`,`${t}%`)}function T(e){i.settings.hidden=!e,i.settingsToggle.setAttribute(`aria-expanded`,String(e))}function E(e){i.playlistMenu.hidden=!e,i.playlistToggle.setAttribute(`aria-expanded`,String(e)),e&&L()}function D(){let e=i.header.getBoundingClientRect().bottom;i.sidebar.style.top=`${Math.round(e)}px`}function O(e){c=e,e&&D(),i.sidebar.classList.toggle(`is-open`,e),i.sidebarBackdrop.classList.toggle(`is-open`,e),i.sidebar.setAttribute(`aria-hidden`,String(!e)),i.sidebarToggle.setAttribute(`aria-expanded`,String(e)),e&&I()}function k(){let e=t.getState(),n=s.toLowerCase(),r=!!e.activePlaylistId,i=r?e.playlists.find(t=>t.id===e.activePlaylistId):null,a=e=>y(e).includes(n),o=r?e.tracks.filter(a):[],c=new Set(e.tracks.map(e=>e.id)),l=r?e.library.filter(e=>!c.has(e.id)&&a(e)):e.library.filter(a);return{inPlaylist:r,playlistName:i?.name??``,playlistMatches:o,otherMatches:l}}function A(e){let n=t.getState().currentTrack?.id===e.id;return`
      <li class="queue__row">
        <button
          class="queue__item${n?` is-active`:``}"
          type="button"
          data-track-id="${g(e.id)}"
          aria-label="Play ${g(e.title)} by ${g(e.artist)}"
          ${n?`aria-current="true"`:``}
        >
          <span class="queue__art">
            <img src="${g(e.artwork)}" alt="" loading="lazy" />
            <span class="queue__duration">${e.duration?d(e.duration):``}</span>
            <span class="queue__equalizer" aria-hidden="true"><i></i><i></i><i></i></span>
          </span>
          <span class="queue__meta">
            <span class="queue__title">${g(e.title)}</span>
            <span class="queue__sub">${g(e.artist)}</span>
            <span class="queue__album">${g(e.album)}</span>
          </span>
        </button>
      </li>
    `}function j(e){return`<li class="queue__section">${g(e)}</li>`}function M(e){return`<li class="queue__noresult">${g(e)}</li>`}function N(){let e=t.getState().currentTrack?.id??null;l.forEach(t=>{let n=t.dataset.trackId===e;t.classList.toggle(`is-active`,n),n?t.setAttribute(`aria-current`,`true`):t.removeAttribute(`aria-current`)})}function P(){let e=t.getState(),n=e.activePlaylistId?e.playlists.find(t=>t.id===e.activePlaylistId):null;if(i.queueSource.textContent=n?.name??`All Songs`,i.queueTitle.textContent=s?`Search results`:`Up next`,s){let{playlistMatches:e,otherMatches:t}=k(),n=e.length+t.length;i.count.textContent=`${n} ${n===1?`result`:`results`}`;return}let r=e.tracks.length;i.count.textContent=`${r} ${r===1?`track`:`tracks`}`}function F(){let e=t.getState(),n=``;if(s){let{inPlaylist:e,playlistName:t,playlistMatches:r,otherMatches:i}=k(),a=r.length+i.length;e&&(n+=j(t||`Playlist`),n+=r.length?r.map(A).join(``):M(`No song found in this playlist.`)),n+=j(`All Songs`),n+=i.length?i.map(A).join(``):M(a===0?`No song found.`:`No other songs match.`),n+=`
        <li class="queue__search-hint">
          Press <kbd>Shift</kbd> + <kbd>Enter</kbd> to search YouTube
        </li>
      `}else n=e.tracks.length?e.tracks.map(A).join(``):M(e.activePlaylistId?`This playlist is empty. Add songs with the playlist button below.`:`No songs in your library yet.`);i.queue.innerHTML=n,l=[...i.queue.querySelectorAll(`.queue__item`)],N(),P()}function I(){let e=t.getState(),n=e.activePlaylistId??``,r=[{id:``,name:`All Songs`,count:e.library.length,icon:`note`},...e.playlists.map(e=>({id:e.id,name:e.name,count:e.trackIds.length,icon:`playlist`}))];i.sidebarList.innerHTML=r.map(e=>`
          <button
            class="sidebar__item${e.id===n?` is-active`:``}"
            type="button"
            data-playlist-id="${g(e.id)}"
          >
            <span class="sidebar__item-icon">${h(e.icon)}</span>
            <span class="sidebar__item-name">${g(e.name)}</span>
            <span class="sidebar__item-count">${e.count}</span>
          </button>
        `).join(``)}function L(){let e=t.getState(),n=e.currentTrack;e.playlists.length?i.playlistList.innerHTML=e.playlists.map(e=>{let t=!!(n&&e.trackIds.includes(n.id));return`
          <button
            class="playlist-item${t?` is-added`:``}"
            type="button"
            data-playlist-id="${g(e.id)}"
          >
            <span class="playlist-item__name">${g(e.name)}</span>
            <span class="playlist-item__meta">${t?`Added`:`${e.trackIds.length}`}</span>
          </button>
        `}).join(``):i.playlistList.innerHTML=`<p class="playlist-menu__empty">No playlists yet. Create one below.</p>`}function R(e){s=e.trim(),F()}function z(){i.searchInput.value=``,s=``,F()}function B(){let e=i.searchInput.value.trim();if(!e)return;let t=`https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`;window.open(t,`_blank`,`noopener,noreferrer`)}function V(e){let r=t.getState(),i=r.tracks.findIndex(t=>t.id===e);i===-1?(i=r.library.findIndex(t=>t.id===e),i!==-1&&(t.setQueue(r.library,{activePlaylistId:null,selectedTrackId:e}),n.play())):(t.selectTrack(i),n.play())}function H(){if(!s)return;let{playlistMatches:e,otherMatches:t}=k(),n=e[0]??t[0];n&&V(n.id)}function U(e){let{tracks:t,currentIndex:n,currentTrack:s,currentTime:l,duration:p,isPlaying:g,volume:_,muted:v,shuffle:y,repeat:b,accent:x,error:S}=e;x!==o&&(document.documentElement.style.setProperty(`--accent`,x),o=x),i.swatches.forEach(e=>{let t=e.dataset.accentColor.toLowerCase()===x.toLowerCase();e.classList.toggle(`is-selected`,t),e.setAttribute(`aria-pressed`,String(t))}),s?(i.artwork.getAttribute(`src`)!==s.artwork&&(i.artwork.src=s.artwork,i.artwork.alt=`${s.album} — album artwork`),i.album.textContent=s.album,i.title.textContent=s.title,i.artist.textContent=s.artist,document.title=`${s.title} — ${s.artist} · Orpheus`):(i.artwork.getAttribute(`src`)!==f&&(i.artwork.src=f,i.artwork.alt=``),i.album.textContent=``,i.title.textContent=`No track selected`,i.artist.textContent=``,document.title=`Orpheus`);let T=t.length>1;if(i.prevCover.hidden=!T,i.nextCover.hidden=!T,T){let e=t[(n-1+t.length)%t.length],r=t[(n+1)%t.length];i.prevArtwork.getAttribute(`src`)!==e.artwork&&(i.prevArtwork.src=e.artwork,i.prevArtwork.alt=`${e.album} — previous track artwork`),i.nextArtwork.getAttribute(`src`)!==r.artwork&&(i.nextArtwork.src=r.artwork,i.nextArtwork.alt=`${r.album} — next track artwork`),i.prevCover.setAttribute(`aria-label`,`Play previous track: ${e.title}`),i.nextCover.setAttribute(`aria-label`,`Play next track: ${r.title}`)}let E=p>0?p:100;i.progress.max=String(E),a||(i.progress.value=String(Math.min(l,E))),w(i.progress,p>0?l/p*100:0),i.current.textContent=d(l),i.duration.textContent=d(p),i.toggle.innerHTML=h(g?`pause`:`play`),i.toggle.setAttribute(`aria-label`,g?`Pause`:`Play`),i.toggle.setAttribute(`title`,g?`Pause`:`Play`),r.classList.toggle(`is-playing`,g),i.status.classList.toggle(`is-playing`,g),i.statusLabel.textContent=g?`Playing`:l>0?`Paused`:`Ready`,i.shuffle.classList.toggle(`is-active`,y),i.shuffle.setAttribute(`aria-pressed`,String(y));let D={off:`off`,all:`all`,one:`one`};i.repeat.innerHTML=h(b===`one`?`repeatOne`:`repeat`),i.repeat.classList.toggle(`is-active`,b!==`off`),i.repeat.setAttribute(`aria-pressed`,String(b!==`off`)),i.repeat.setAttribute(`aria-label`,`Repeat: ${D[b]}`),i.repeat.setAttribute(`title`,`Repeat: ${D[b]}`);let O=!v&&_>0?_<.5?`volumeLow`:`volumeHigh`:`volumeMute`;i.mute.innerHTML=h(O),i.mute.setAttribute(`aria-label`,v?`Unmute`:`Mute`),i.mute.setAttribute(`title`,v?`Unmute`:`Mute`),i.volume.value=String(_),w(i.volume,_*100),i.volumeLabel.textContent=v?`Muted`:`${Math.round(_*100)}%`;let k=`${e.activePlaylistId??``}|${t.map(e=>e.id).join(`,`)}`;k===u?N():(u=k,F());let A=`${e.activePlaylistId??``}|${e.playlists.map(e=>`${e.id}:${e.trackIds.join(`,`)}`).join(`|`)}|${e.library.length}`;A!==m&&(m=A,c&&I()),C(),i.playlistMenu.hidden||L(),i.error.hidden=!S,i.error.textContent=S??``}i.toggle.addEventListener(`click`,()=>n.toggle()),i.previous.addEventListener(`click`,()=>n.previous()),i.next.addEventListener(`click`,()=>n.next()),i.prevCover.addEventListener(`click`,()=>n.previous()),i.nextCover.addEventListener(`click`,()=>n.next()),i.shuffle.addEventListener(`click`,()=>t.toggleShuffle()),i.repeat.addEventListener(`click`,()=>t.cycleRepeat()),i.mute.addEventListener(`click`,()=>t.toggleMute()),i.volume.addEventListener(`input`,e=>t.setVolume(Number(e.target.value))),i.like.addEventListener(`click`,()=>{let e=t.getState().currentTrack;e&&(b.has(e.id)?b.delete(e.id):b.add(e.id),S(),C())}),i.settingsToggle.addEventListener(`click`,()=>{T(i.settings.hidden)}),i.settings.addEventListener(`click`,e=>{let n=e.target.closest(`[data-accent-color]`);n&&t.setAccent(n.dataset.accentColor)}),i.sidebarToggle.addEventListener(`click`,()=>{O(!c)}),i.sidebarClose.addEventListener(`click`,()=>{O(!1),i.sidebarToggle.focus()}),i.sidebarBackdrop.addEventListener(`click`,()=>O(!1)),i.sidebarList.addEventListener(`click`,e=>{let r=e.target.closest(`[data-playlist-id]`);if(!r)return;O(!1),z();let i=r.dataset.playlistId||null;(i?t.selectPlaylist(i):t.selectLibrary())&&n.play()}),i.sidebarCreateForm.addEventListener(`submit`,e=>{e.preventDefault();let n=i.sidebarCreateName.value.trim();n&&(t.createPlaylist(n),i.sidebarCreateName.value=``,I())}),i.playlistToggle.addEventListener(`click`,()=>{E(i.playlistMenu.hidden)}),i.playlistList.addEventListener(`click`,e=>{let n=e.target.closest(`[data-playlist-id]`);if(!n)return;let r=t.getState().currentTrack;r&&(t.toggleTrackInPlaylist(n.dataset.playlistId,r.id),L())}),i.playlistForm.addEventListener(`submit`,e=>{e.preventDefault();let n=i.playlistName.value.trim();if(!n)return;let r=t.getState().currentTrack;t.createPlaylist(n,r?.id??null),i.playlistName.value=``,L()}),i.searchInput.addEventListener(`input`,()=>R(i.searchInput.value)),i.searchInput.addEventListener(`keydown`,e=>{e.key===`Escape`?(z(),i.searchInput.blur()):e.key===`Enter`&&(e.preventDefault(),e.shiftKey?B():H())}),i.searchForm.addEventListener(`submit`,e=>{e.preventDefault(),H()}),i.progress.addEventListener(`pointerdown`,()=>{a=!0}),i.progress.addEventListener(`input`,e=>{a=!0,n.seek(Number(e.target.value))}),i.progress.addEventListener(`change`,()=>{a=!1}),i.progress.addEventListener(`blur`,()=>{a=!1}),i.queue.addEventListener(`click`,e=>{let r=e.target.closest(`[data-track-id]`);if(!r)return;let i=r.dataset.trackId;!s&&i===t.getState().currentTrack?.id?n.toggle():V(i)});function W(e){let{currentTime:r,duration:i}=t.getState();n.seek(Math.min(Math.max(r+e,0),i||r+e))}function G(e){t.setVolume(t.getState().volume+e)}function K(e){if(e.code===`Escape`){if(!i.playlistMenu.hidden){E(!1),i.playlistToggle.focus();return}if(c){O(!1),i.sidebarToggle.focus();return}if(!i.settings.hidden){T(!1),i.settingsToggle.focus();return}}if(e.code===`Slash`&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!v(e.target))e.preventDefault(),i.searchInput.focus(),i.searchInput.select();else if(!(e.metaKey||e.ctrlKey||e.altKey||_(e.target)))switch(e.code){case`Space`:e.preventDefault(),n.toggle();break;case`ArrowRight`:e.preventDefault(),W(5);break;case`ArrowLeft`:e.preventDefault(),W(-5);break;case`ArrowUp`:e.preventDefault(),G(.05);break;case`ArrowDown`:e.preventDefault(),G(-.05);break;case`KeyN`:n.next();break;case`KeyP`:n.previous();break;case`KeyM`:t.toggleMute();break;case`KeyS`:t.toggleShuffle();break;case`KeyR`:t.cycleRepeat()}}function q(){a=!1}function J(){c&&D()}function Y(e){i.playlistMenu.hidden||!i.playlistMenu.contains(e.target)&&!i.playlistToggle.contains(e.target)&&E(!1),i.settings.hidden||i.settings.contains(e.target)||i.settingsToggle.contains(e.target)||T(!1)}document.addEventListener(`keydown`,K),document.addEventListener(`click`,Y),window.addEventListener(`pointerup`,q),window.addEventListener(`resize`,J);let X=t.subscribe(U);return()=>{X(),document.removeEventListener(`keydown`,K),document.removeEventListener(`click`,Y),window.removeEventListener(`pointerup`,q),window.removeEventListener(`resize`,J)}}var x=document.querySelector(`#app`),S=l(e);b(x,{store:S,audio:u(S)});