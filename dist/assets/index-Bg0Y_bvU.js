const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AiffParser-sURKXYI5.js","assets/rolldown-runtime-XKyaHtl9.js","assets/BasicParser-CAKX4pyu.js","assets/APEv2Parser-Kw5fbFk8.js","assets/Util-BgLHJ048.js","assets/EmbeddedID3v2-DI87Gqej.js","assets/TokenizerView-Wd9Jl7QX.js","assets/ID3v2Parser-C__6tX2w.js","assets/ID3v1Parser-Qiq-97i0.js","assets/ID3v2Token-DaDnjw-I.js","assets/id3v2-J_EZ1sea.js","assets/APEv2Parser-ohVBYN9I.js","assets/AsfParser-CGbeZxtl.js","assets/type-hqr378jM.js","assets/CafParser-C8xFXvds.js","assets/DsdiffParser-CEAC0XMz.js","assets/DsfParser-BTcHB4Cx.js","assets/AbstractID3Parser-BhyrBds-.js","assets/FlacParser-D-EiMPkf.js","assets/FlacParser-Bob5uLC0.js","assets/MatroskaParser-BhRq5Udm.js","assets/MP4Parser-BF1gtTSr.js","assets/MpegParser-JVcRRBtq.js","assets/MusepackParser-BkKdAYmO.js","assets/OggParser-gS12tKdU.js","assets/MetadataCollector-B2BBznkc.js","assets/WaveParser-Cih1pM2e.js","assets/WavPackParser-3FelGJ60.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{a as t,t as n}from"./APEv2Parser-Kw5fbFk8.js";import{R as r,V as i,a,d as o,i as s,m as c,o as l,s as u,z as d}from"./BasicParser-CAKX4pyu.js";import{r as f}from"./ID3v1Parser-Qiq-97i0.js";import{i as p,n as m,r as h,t as g}from"./MetadataCollector-B2BBznkc.js";import{t as _}from"./type-hqr378jM.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var v=[`off`,`all`,`one`],y=/^#[0-9a-f]{6}$/i,b={volume:.8,muted:!1,shuffle:!1,repeat:`off`,accent:`#b49cff`};function x(e,t,n){return Math.min(Math.max(e,t),n)}function ee(e){return typeof e==`string`&&y.test(e)}function S(e){if(!ee(e))return!1;let t=Number.parseInt(e.slice(1,3),16),n=Number.parseInt(e.slice(3,5),16),r=Number.parseInt(e.slice(5,7),16);return .2126*t+.7152*n+.0722*r>=100}function C(e){try{let t=JSON.parse(window.localStorage.getItem(e)??`{}`),n=Number(t.volume);return{volume:Number.isFinite(n)?x(n,0,1):b.volume,muted:typeof t.muted==`boolean`?t.muted:b.muted,shuffle:typeof t.shuffle==`boolean`?t.shuffle:b.shuffle,repeat:v.includes(t.repeat)?t.repeat:b.repeat,accent:S(t.accent)?t.accent.toLowerCase():b.accent}}catch{return{...b}}}function w(e){try{let t=JSON.parse(window.localStorage.getItem(e)??`[]`);return Array.isArray(t)?t.filter(e=>e&&typeof e.id==`string`&&typeof e.name==`string`).map(e=>{let t=Array.isArray(e.trackIds)?e.trackIds:Array.isArray(e.tracks)?e.tracks:[];return{id:e.id,name:e.name,trackIds:t.filter(e=>typeof e==`string`)}}):[]}catch{return[]}}function T(e){return encodeURIComponent(String(e??``))}function E(e){try{let t=JSON.parse(window.localStorage.getItem(e)??`[]`);return Array.isArray(t)?[...new Set(t.filter(e=>typeof e==`string`))]:[]}catch{return[]}}function D(e,t){return!e&&!t?!0:!e||!t?!1:e.type===t.type&&e.id===t.id}function O(e){let t=new Map,n=new Map;return e.forEach(e=>{if(!e||typeof e.id!=`string`)return;let r=e.artist||`Unknown artist`,i=e.albumArtist||r,a=e.album||`Unknown album`,o=n.get(r);o||(o={id:`artist:${T(r)}`,type:`artist`,name:r,trackIds:[],trackId:e.id,artwork:e.artwork??null},n.set(r,o)),o.trackIds.push(e.id),!o.artwork&&e.artwork&&(o.artwork=e.artwork);let s=`${i}\u0000${a}`,c=t.get(s);c||(c={id:`album:${T(i)}:${T(a)}`,type:`album`,name:a,artist:i,trackIds:[],trackId:e.id,artwork:e.artwork??null},t.set(s,c)),c.trackIds.push(e.id),!c.artwork&&e.artwork&&(c.artwork=e.artwork)}),{albums:[...t.values()],artists:[...n.values()]}}function k(e){return e?{type:e.type,id:e.id,name:e.name,...e.artist?{artist:e.artist}:{}}:null}function A(e=[],{storageKey:t=`orpheus:player-prefs`,playlistsKey:n=`orpheus:playlists`,likedKey:r=`orpheus:liked`,libraryRoot:i=null,libraryError:a=null,libraryMessage:o=null}={}){let s=[...e],c=C(t),{albums:l,artists:u}=O(s),d={tracks:[...s],library:s,libraryRoot:i,libraryError:a,libraryMessage:o,playlists:w(n),albums:l,artists:u,likedIds:E(r),activeCollection:null,queueHistory:[],currentIndex:0,isPlaying:!1,currentTime:0,duration:0,error:null,...c},f=new Set;function p(){return{...d,activePlaylistId:d.activeCollection?.type===`playlist`?d.activeCollection.id:null,canGoBack:d.queueHistory.length>0,currentTrack:d.tracks[d.currentIndex]??null}}function m(){try{let{volume:e,muted:n,shuffle:r,repeat:i,accent:a}=d;window.localStorage.setItem(t,JSON.stringify({volume:e,muted:n,shuffle:r,repeat:i,accent:a}))}catch{}}function h(){try{window.localStorage.setItem(n,JSON.stringify(d.playlists))}catch{}}function g(){try{window.localStorage.setItem(r,JSON.stringify(d.likedIds))}catch{}}function _(e){d={...d,...e},[`volume`,`muted`,`shuffle`,`repeat`,`accent`].some(t=>t in e)&&m(),`playlists`in e&&h(),`likedIds`in e&&g();let t=p();f.forEach(e=>e(t))}function y(){if(d.tracks.length<=1)return 0;let e=d.currentIndex;for(;e===d.currentIndex;)e=Math.floor(Math.random()*d.tracks.length);return e}function b({automatic:e=!1}={}){let{tracks:t,currentIndex:n,shuffle:r,repeat:i}=d;if(!t.length)return!1;let a;if(r)a=y();else if(n<t.length-1)a=n+1;else if(i===`all`)a=0;else if(e)return!1;else a=0;return _({currentIndex:a,currentTime:0,duration:0,error:null}),!0}function ee(){let{tracks:e,currentIndex:t,shuffle:n}=d;e.length&&_({currentIndex:n?y():(t-1+e.length)%e.length,currentTime:0,duration:0,error:null})}function T(e){if(!e)return[...s];let t=new Map(s.map(e=>[e.id,e]));return e.trackIds.map(e=>t.get(e)).filter(Boolean)}function A(e){if(!e)return[...s];let t=new Map(s.map(e=>[e.id,e]));return e.trackIds.map(e=>t.get(e)).filter(Boolean)}function j(){return s.filter(e=>d.likedIds.includes(e.id))}function M(e,t){return e===`playlist`?d.playlists.find(e=>e.id===t)??null:e===`album`?d.albums.find(e=>e.id===t)??null:e===`artist`?d.artists.find(e=>e.id===t)??null:null}function N(e){if(!e)return[...s];if(e.type===`liked`)return j();let t=M(e.type,e.id);return t?A(t):null}function P(){return{collection:d.activeCollection?{...d.activeCollection}:null,trackId:d.tracks[d.currentIndex]?.id??null}}function F(e,t,n=null,{pushHistory:r=!0}={}){let i=Array.isArray(e)?[...e]:[],a=k(t),o=d.tracks[d.currentIndex]?.id??null,s=n??o,c=0;if(s){let e=i.findIndex(e=>e.id===s);e!==-1&&(c=e)}let l={tracks:i,currentIndex:c,activeCollection:a,currentTime:0,duration:0,isPlaying:!1,error:null};return r&&!D(d.activeCollection,a)&&(l.queueHistory=[...d.queueHistory,P()].slice(-25)),_(l),i.length>0}function I(e,t,n=null){let r=M(e,t);return r?F(A(r),r,n):!1}function L(){let e=[...d.queueHistory];for(;e.length;){let t=e.pop(),n=N(t.collection);if(!n)continue;let r=[...n],i=0;if(t.trackId){let e=r.findIndex(e=>e.id===t.trackId);e!==-1&&(i=e)}return _({tracks:r,currentIndex:i,activeCollection:t.collection?k(t.collection):null,queueHistory:e,currentTime:0,duration:0,isPlaying:!1,error:null}),!0}return _({queueHistory:[]}),!1}function R(e){if(typeof e!=`string`)return!1;let t=d.likedIds.includes(e),n=t?d.likedIds.filter(t=>t!==e):[...d.likedIds,e],r={likedIds:n};if(d.activeCollection?.type===`liked`){let e=s.filter(e=>n.includes(e.id)),t=d.tracks[d.currentIndex]?.id??null,i=e.findIndex(e=>e.id===t);r.tracks=e,r.currentIndex=i===-1?0:i,i===-1&&(r.currentTime=0,r.duration=0,r.isPlaying=!1)}return _(r),!t}return{getState:p,subscribe(e){return f.add(e),e(p()),()=>f.delete(e)},setState:_,selectTrack(e){!Number.isInteger(e)||e<0||e>=d.tracks.length||e!==d.currentIndex&&_({currentIndex:e,currentTime:0,duration:0,error:null})},setQueue(e,{activeCollection:t=null,selectedTrackId:n=null,pushHistory:r=!0}={}){return F(e,t,n,{pushHistory:r})},selectPlaylist(e=null){return e?I(`playlist`,e):F(s,null)},selectAlbum(e){return I(`album`,e)},selectArtist(e){return I(`artist`,e)},selectLiked(){return F(j(),{type:`liked`,id:`liked`,name:`Liked Songs`})},selectLibrary(){return F(s,null)},goBackQueue(){return L()},toggleLike(e){return R(e)},createPlaylist(e,t=null){let n=String(e??``).trim().slice(0,40);if(!n)return null;let r={id:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,name:n,trackIds:t?[t]:[]};return _({playlists:[...d.playlists,r]}),r.id},toggleTrackInPlaylist(e,t){let n=d.playlists.find(t=>t.id===e);if(!n||typeof t!=`string`)return!1;let r=n.trackIds.includes(t),i=r?n.trackIds.filter(e=>e!==t):[...n.trackIds,t],a={playlists:d.playlists.map(t=>t.id===e?{...t,trackIds:i}:t)};if(d.activeCollection?.type===`playlist`&&d.activeCollection.id===e){let e=T({...n,trackIds:i}),t=d.tracks[d.currentIndex]?.id??null,r=e.findIndex(e=>e.id===t);a.tracks=e,a.currentIndex=r===-1?0:r,r===-1&&(a.currentTime=0,a.duration=0,a.isPlaying=!1)}return _(a),!r},next:b,previous:ee,toggleShuffle(){_({shuffle:!d.shuffle})},cycleRepeat(){let e=v[(v.indexOf(d.repeat)+1)%v.length];_({repeat:e})},setVolume(e){let t=x(Number(e)||0,0,1);_({volume:t,muted:t>0?!1:d.muted})},toggleMute(){_({muted:!d.muted})},setAccent(e){S(e)&&_({accent:e.toLowerCase()})}}}var j=`/assets/images/default-album-art.svg`,M={avif:`image/avif`,gif:`image/gif`,jpeg:`image/jpeg`,jpg:`image/jpeg`,png:`image/png`,svg:`image/svg+xml`,webp:`image/webp`};function N(e=``){return M[String(e).split(`?`)[0].match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase()]??`image/jpeg`}function P(e,{artwork:t=null}={}){let n=new Audio;n.preload=`metadata`;let r=null;function i(e){r=e?.id??null,e?(n.src=e.src,n.load()):(n.removeAttribute(`src`),n.load())}function a(e){if(!(`mediaSession`in navigator)||typeof MediaMetadata>`u`)return;if(!e){navigator.mediaSession.metadata=null;return}let n=t?.describe(e)??{url:e.artwork??j,type:N(e.artwork??j)};navigator.mediaSession.metadata=new MediaMetadata({title:e.title,artist:e.artist,album:e.album,artwork:[{src:new URL(n.url,window.location.href).href,sizes:`512x512`,type:n.type}]})}e.subscribe(e=>{let t=e.currentTrack;(t?.id??null)!==r&&(i(t),a(t));let o=e.muted?0:e.volume;n.volume!==o&&(n.volume=o)}),t?.subscribe&&t.subscribe(t=>{let n=e.getState().currentTrack;n&&t?.id===n.id&&a(n)});function o(){return e.getState().currentTrack?n.play().catch(()=>{e.setState({isPlaying:!1})}):Promise.resolve()}function s(){n.pause()}function c(){return e.getState().isPlaying?s():o()}function l(t){!Number.isFinite(n.duration)||n.duration<=0||(n.currentTime=Math.min(Math.max(t,0),n.duration),e.setState({currentTime:n.currentTime}))}function u(){e.next()&&o()}function d(){n.currentTime>3?l(0):(e.previous(),o())}return n.addEventListener(`loadedmetadata`,()=>{e.setState({duration:Number.isFinite(n.duration)?n.duration:0})}),n.addEventListener(`durationchange`,()=>{e.setState({duration:Number.isFinite(n.duration)?n.duration:0})}),n.addEventListener(`timeupdate`,()=>{e.setState({currentTime:n.currentTime})}),n.addEventListener(`play`,()=>e.setState({isPlaying:!0})),n.addEventListener(`pause`,()=>e.setState({isPlaying:!1})),n.addEventListener(`ended`,()=>{e.getState().repeat===`one`?(n.currentTime=0,o()):e.next({automatic:!0})?o():(n.currentTime=0,e.setState({isPlaying:!1,currentTime:0}))}),n.addEventListener(`error`,()=>{n.getAttribute(`src`)&&e.setState({isPlaying:!1,error:`This track could not be played. Check that the audio file exists.`})}),`mediaSession`in navigator&&Object.entries({play:()=>o(),pause:()=>s(),previoustrack:()=>d(),nexttrack:()=>u(),seekto:e=>{Number.isFinite(e.seekTime)&&l(e.seekTime)}}).forEach(([e,t])=>{try{navigator.mediaSession.setActionHandler(e,t)}catch{}}),{audio:n,play:o,pause:s,toggle:c,seek:l,next:u,previous:d,loadTrack:i}}async function F(e){let t=e.fileInfo.size;if(t>=143){let n=new Uint8Array(15),r=e.position;await e.readBuffer(n,{position:t-143}),e.setPosition(r);let i=d(n,`latin1`);if(i.substring(6)===`LYRICS200`)return Number.parseInt(i.substring(0,6),10)+15}return 0}var I=32,L=9,R=59,te=61,z=34,B=92,ne=44,re=1,V=2,H=4,U=8,W=16,G=65280,ie=65281,K=new Uint8Array(256);K[L]|=V,K[I]|=V,K[R]|=H,K[ne]|=U;for(let e=128;e<=255;e++)K[e]|=re;for(let e of"!#$%&'*+-.^_`|~")K[e.charCodeAt(0)]|=W;for(let e=48;e<=57;e++)K[e]|=W;for(let e=65;e<=90;e++)K[e]|=17;for(let e=97;e<=122;e++)K[e]|=W;var ae=(()=>{let e=function(){};return e.prototype=Object.create(null),e})();function oe(e,t){let n=H|(t?.comma===!0?U:0),r=e.length,i=t?.start??0;for(;(K[e.charCodeAt(i)]&V)!==0;)i++;let a=i,o=0,s=-1,c=t?.parameters===!1?U:0;for(;a<r;){let t=e.charCodeAt(a),r=K[t];if((r&n)!==0){c|=r&U;break}(r&V)===0?s=-1:s===-1&&(s=a),o|=t&G|r,a++}let l=s===-1?a:s,u=e.slice(i,l),d=(o&ie)===0?u:u.toLowerCase();return a===r||c!==0?{type:d,index:a,parameters:new ae}:se(e,d,a,r,n)}function se(e,t,n,r,i){let a=new ae;parameter:for(;n<r;){for(n++;(K[e.charCodeAt(n)]&V)!==0;)n++;let t=n,o=0,s=-1;for(;n<r;){let c=e.charCodeAt(n),l=K[c];if((l&i)!==0){if((l&U)!==0)break parameter;continue parameter}if(c===te){let c=s===-1?n:s,l=e.slice(t,c),u=(o&ie)===0?l:l.toLowerCase();for(n++;(K[e.charCodeAt(n)]&V)!==0;)n++;if(n<r&&e.charCodeAt(n)===z){let t=++n,o=!1;for(;n<r;){let s=e.charCodeAt(n);if(s===z){a[u]===void 0&&(a[u]=o?ce(e,t,n):e.slice(t,n)),n++;let s=0;for(;n<r;){let t=K[e.charCodeAt(n)];if((t&i)!==0){s=t&U;break}n++}if(s!==0)break parameter;continue parameter}s===B&&n+1<r?(o=!0,n+=2):n++}continue parameter}let d=n,f=0,p=-1;for(;n<r;){let t=K[e.charCodeAt(n)];if((t&i)!==0){f=t&U;break}(t&V)===0?p=-1:p===-1&&(p=n),n++}if(a[u]===void 0){let t=p===-1?n:p;a[u]=e.slice(d,t)}if(f!==0)break parameter;continue parameter}(l&V)===0?s=-1:s===-1&&(s=n),o|=c&G|l,n++}}return{type:t,index:n,parameters:a}}function ce(e,t,n){let r=``;for(let i=t;i<n;i++)e.charCodeAt(i)===B&&(r+=e.slice(t,i),t=++i);return r+e.slice(t,n)}var le=e(r(),1),ue=/^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}\/[A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}$/;function de(e){if(!ue.test(e))throw TypeError(`Invalid media type: ${e}`);let t=e.indexOf(`/`),n=e.slice(0,t).toLowerCase(),r=e.slice(t+1).toLowerCase(),i,a=r.lastIndexOf(`+`);return a!==-1&&(i=r.slice(a+1),r=r.slice(0,a)),{type:n,subtype:r,suffix:i}}var fe=`modulepreload`,pe=function(e){return`/`+e},me={},he=function(e){return e.pathname.endsWith(`.css`)},ge=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},q=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=pe(t,n);let r=s(t),i=he(r);return ge(me,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:fe,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},_e={parserType:`aiff`,extensions:[`.aif`,`aiff`,`aifc`],mimeTypes:[`audio/aiff`,`audio/aif`,`audio/aifc`,`application/aiff`],async load(){return(await q(async()=>{let{AIFFParser:e}=await import(`./AiffParser-sURKXYI5.js`);return{AIFFParser:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))).AIFFParser}},ve={parserType:`apev2`,extensions:[`.ape`],mimeTypes:[`audio/ape`,`audio/monkeys-audio`],async load(){return(await q(async()=>{let{APEv2Parser:e}=await import(`./APEv2Parser-ohVBYN9I.js`);return{APEv2Parser:e}},__vite__mapDeps([11,3,1,2,4]))).APEv2Parser}},ye={parserType:`asf`,extensions:[`.asf`,`.wma`,`.wmv`],mimeTypes:[`audio/ms-wma`,`video/ms-wmv`,`audio/ms-asf`,`video/ms-asf`,`application/vnd.ms-asf`],async load(){return(await q(async()=>{let{AsfParser:e}=await import(`./AsfParser-CGbeZxtl.js`);return{AsfParser:e}},__vite__mapDeps([12,1,2,13,6,10,4]))).AsfParser}},be={parserType:`caf`,extensions:[`.caf`,`.caff`],mimeTypes:[`audio/caf`,`application/caf`],async load(){return(await q(async()=>{let{CafParser:e}=await import(`./CafParser-C8xFXvds.js`);return{CafParser:e}},__vite__mapDeps([14,1,2]))).CafParser}},xe={parserType:`dsdiff`,extensions:[`.dff`],mimeTypes:[`audio/dsf`,`audio/dsd`,`audio/dff`],async load(){return(await q(async()=>{let{DsdiffParser:e}=await import(`./DsdiffParser-CEAC0XMz.js`);return{DsdiffParser:e}},__vite__mapDeps([15,1,2,6,3,4,5,7,8,9,10]))).DsdiffParser}},Se={parserType:`dsf`,extensions:[`.dsf`],mimeTypes:[`audio/dsf`],async load(){return(await q(async()=>{let{DsfParser:e}=await import(`./DsfParser-BTcHB4Cx.js`);return{DsfParser:e}},__vite__mapDeps([16,1,2,17,8,3,4,7,9,10]))).DsfParser}},Ce={parserType:`flac`,extensions:[`.flac`],mimeTypes:[`audio/flac`],async load(){return(await q(async()=>{let{FlacParser:e}=await import(`./FlacParser-D-EiMPkf.js`);return{FlacParser:e}},__vite__mapDeps([18,19,1,2,3,4,17,8,7,9,10]))).FlacParser}},we={parserType:`matroska`,extensions:[`.mka`,`.mkv`,`.mk3d`,`.mks`,`webm`],mimeTypes:[`audio/matroska`,`video/matroska`,`audio/webm`,`video/webm`],async load(){return(await q(async()=>{let{MatroskaParser:e}=await import(`./MatroskaParser-BhRq5Udm.js`);return{MatroskaParser:e}},__vite__mapDeps([20,1,2,13]))).MatroskaParser}},Te={parserType:`mp4`,extensions:[`.mp4`,`.m4a`,`.m4b`,`.m4pa`,`m4v`,`m4r`,`3gp`,`.mov`,`.movie`,`.qt`],mimeTypes:[`audio/mp4`,`audio/m4a`,`video/m4v`,`video/mp4`,`video/quicktime`],async load(){return(await q(async()=>{let{MP4Parser:e}=await import(`./MP4Parser-BF1gtTSr.js`);return{MP4Parser:e}},__vite__mapDeps([21,1,2,6,4,8,3,13]))).MP4Parser}},Ee={parserType:`mpeg`,extensions:[`.mp1`,`.mp2`,`.mp3`,`.m2a`,`.aac`,`aacp`],mimeTypes:[`audio/mpeg`,`audio/mp3`,`audio/aacs`,`audio/aacp`],async load(){return(await q(async()=>{let{MpegParser:e}=await import(`./MpegParser-JVcRRBtq.js`);return{MpegParser:e}},__vite__mapDeps([22,1,2,4,8,3,17,7,9,10]))).MpegParser}},De={parserType:`musepack`,extensions:[`.mpc`],mimeTypes:[`audio/musepack`],async load(){return(await q(async()=>{let{MusepackParser:e}=await import(`./MusepackParser-BkKdAYmO.js`);return{MusepackParser:e}},__vite__mapDeps([23,1,2,17,8,3,4,7,9,10]))).MusepackParser}},Oe={parserType:`ogg`,extensions:[`.ogg`,`.ogv`,`.oga`,`.ogm`,`.ogx`,`.opus`,`.spx`],mimeTypes:[`application/ogg`,`audio/ogg`,`audio/opus`,`audio/speex`,`video/ogg`],async load(){return(await q(async()=>{let{OggParser:e}=await import(`./OggParser-gS12tKdU.js`);return{OggParser:e}},__vite__mapDeps([24,1,2,25,3,4,6,9,10,13,19,17,8,7]))).OggParser}},ke={parserType:`riff`,extensions:[`.wav`,`wave`,`.bwf`],mimeTypes:[`audio/vnd.wave`,`audio/wav`,`audio/wave`],async load(){return(await q(async()=>{let{WaveParser:e}=await import(`./WaveParser-Cih1pM2e.js`);return{WaveParser:e}},__vite__mapDeps([26,1,2,3,4,5,6,7,8,9,10]))).WaveParser}},Ae={parserType:`wavpack`,extensions:[`.wv`,`.wvp`],mimeTypes:[`audio/wavpack`],async load(){return(await q(async()=>{let{WavPackParser:e}=await import(`./WavPackParser-3FelGJ60.js`);return{WavPackParser:e}},__vite__mapDeps([27,1,2,4,3]))).WavPackParser}},J=(0,le.default)(`music-metadata:parser:factory`);function je(e){let t=oe(e),n=de(t.type);return{type:n.type,subtype:n.subtype,suffix:n.suffix,parameters:t.parameters}}var Me=class{parsers=[];constructor(){[Ce,Ee,ve,Te,we,ke,Oe,ye,_e,Ae,De,Se,xe,be].forEach(e=>{this.registerParser(e)})}registerParser(e){this.parsers.push(e)}async parse(e,t,n={}){let r=a(n);if(l(n),s(n),i(e)?(J(`tokenizer supports random-access, scanning for appending headers`),await Ie(e,n)):J(`tokenizer does not support random-access, cannot scan for appending headers`),!t){let n=new Uint8Array(4100);if(e.fileInfo.mimeType&&(t=this.findLoaderForContentType(e.fileInfo.mimeType)),!t&&e.fileInfo.path&&(t=this.findLoaderForExtension(e.fileInfo.path)),!t){J(`Guess parser on content...`),await e.peekBuffer(n,{mayBeLess:!0});let i=await p(n,{mpegOffsetTolerance:10,maxBufferSize:r});if(!i?.mime)throw new o(`Failed to determine audio format`);if(J(`Guessed file type is mime=${i.mime}, extension=${i.ext}`),t=this.findLoaderForContentType(i.mime),!t)throw new c(`Guessed MIME-type not supported: ${i.mime}`)}}J(`Loading ${t.parserType} parser...`);let u=new g(n),d=new(await(t.load()))(u,e,n);return J(`Parser ${t.parserType} loaded`),await d.parse(),u.format.trackInfo.length===0&&u.format.hasAudio===!0&&u.addStreamInfo(m(u.format)),u.format.trackInfo&&(u.format.hasAudio===void 0&&u.setFormat(`hasAudio`,!!u.format.trackInfo.find(e=>e.type===_.audio)),u.format.hasVideo===void 0&&u.setFormat(`hasVideo`,!!u.format.trackInfo.find(e=>e.type===_.video))),h(u,e.fileInfo.size),u.toCommonMetadata()}findLoaderForExtension(e){if(!e)return;let t=Ne(e).toLocaleLowerCase()||e;return this.parsers.find(e=>e.extensions.indexOf(t)!==-1)}findLoaderForContentType(e){let t;if(!e)return;try{t=je(e)}catch{J(`Invalid HTTP Content-Type header value: ${e}`);return}let n=t.subtype.indexOf(`x-`)===0?t.subtype.substring(2):t.subtype;return this.parsers.find(e=>e.mimeTypes.find(e=>e.indexOf(`${t.type}/${n}`)!==-1))}getSupportedMimeTypes(){let e=new Set;return this.parsers.forEach(t=>{t.mimeTypes.forEach(t=>{e.add(t),e.add(t.replace(`/`,`/x-`))})}),Array.from(e)}};function Ne(e){let t=e.lastIndexOf(`.`);return t===-1?``:e.substring(t)}async function Pe(e,n={}){let r=t(e,u(n));try{return await Fe(r,n)}finally{await r.close()}}function Fe(e,t){return new Me().parse(e,void 0,t)}async function Ie(e,t={}){let r=e.fileInfo.size;if(await f(e)){r-=128;let t=await F(e);r-=t}t.apeHeader=await n.findApeFooterOffset(e,r)}var Le=`/assets/images/default-album-art.svg`,Re={avif:`image/avif`,gif:`image/gif`,jpeg:`image/jpeg`,jpg:`image/jpeg`,png:`image/png`,svg:`image/svg+xml`,webp:`image/webp`};function ze(e=``){let t=String(e).split(`?`)[0].split(`#`)[0].match(/\.([a-z0-9]+)$/i);return t?t[1].toLowerCase():``}function Y(e=``){return Re[ze(e)]??`image/jpeg`}function Be(e){return ze(e?.src)===`mp3`}function Ve(e){return`${e?.id??``}|${e?.src??``}`}function He(e,t){return(e[t]&127)<<21|(e[t+1]&127)<<14|(e[t+2]&127)<<7|e[t+3]&127}async function Ue(e,t,n){let r=await fetch(e,{headers:{Range:`bytes=${t}-${n}`}});if(!r.ok&&r.status!==206)throw Error(`Artwork request failed with ${r.status}`);return{bytes:new Uint8Array(await r.arrayBuffer()),wholeFile:r.status===200}}function We(e){return!Array.isArray(e)||!e.length?null:e.find(e=>/front/i.test(e.type??``))??e[0]}async function Ge(e){if(!Be(e))return null;let t=await Ue(e.src,0,9);if(t.bytes.length<10||t.bytes[0]!==73||t.bytes[1]!==68||t.bytes[2]!==51)return null;if(t.wholeFile)return Ke(t.bytes);let n=He(t.bytes,6),r=t.bytes[5]&16?10:0,i=10+n+r;return Ke((await Ue(e.src,0,Math.max(i-1,9))).bytes)}async function Ke(e){let t=We((await Pe(new Blob([e],{type:`audio/mpeg`}))).common.picture);if(!t?.data)return null;let n=new Blob([t.data],{type:t.format||`image/jpeg`});return{url:URL.createObjectURL(n),type:n.type||`image/jpeg`,objectUrl:!0}}function qe({defaultArtwork:e=Le}={}){let t=new Map,n=new Set,r=new Set;function i(n){if(!n)return{url:e,type:Y(e)};if(n.artwork)return{url:n.artwork,type:n.artworkType||Y(n.artwork)};let r=t.get(Ve(n));return r?.artwork?r.artwork:{url:e,type:Y(e)}}function a(e){return i(e).url}function o(a){if(!a)return Promise.resolve(i(null));if(a.artwork)return Promise.resolve(i(a));let o=Ve(a),s=t.get(o);if(s)return s.promise;let c={artwork:null,promise:null};return c.promise=Ge(a).then(t=>(t&&r.add(t.url),c.artwork=t??{url:e,type:Y(e)},n.forEach(e=>e(a,c.artwork)),c.artwork)).catch(()=>(c.artwork={url:e,type:Y(e)},n.forEach(e=>e(a,c.artwork)),c.artwork)),t.set(o,c),c.promise}function s(e){return n.add(e),()=>n.delete(e)}function c(){r.forEach(e=>URL.revokeObjectURL(e)),r.clear(),t.clear(),n.clear()}return{defaultArtwork:e,describe:i,urlFor:a,resolve:o,subscribe:s,release:c}}function Je(e){return typeof e==`string`&&e.trim()?e.trim():null}async function Ye(){try{let e=await fetch(`/api/library`,{headers:{Accept:`application/json`},cache:`no-store`}),t=e.headers.get(`content-type`)??``;if(!e.ok||!t.includes(`application/json`))throw Error(`The local music API is not available.`);let n=await e.json();return{tracks:Array.isArray(n.tracks)?n.tracks:[],root:Je(n.root),error:Je(n.error),message:Je(n.message)}}catch{return{tracks:[],root:null,error:`The local music server is not available. Run Orpheus with npm run dev, or npm run preview after a build.`,message:null}}}function Xe(e=0){return Number.isFinite(e)?`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,`0`)}`:`0:00`}var X=`/assets/images/default-album-art.svg`,Ze=[{id:`playlists`,label:`Playlists`},{id:`artists`,label:`Artists`},{id:`albums`,label:`Albums`}],Qe=[`#b49cff`,`#7ee0d3`,`#ff8db3`,`#ffd166`,`#7cc4ff`,`#9ef07a`,`#ff9f6e`,`#f5f5f5`],$e={note:`<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,play:`<path d="M8 5.2c0-.8.9-1.3 1.6-.9l9.6 6.8c.6.4.6 1.4 0 1.8l-9.6 6.8c-.7.4-1.6-.1-1.6-.9z" fill="currentColor" stroke="none"/>`,pause:`<rect x="6.4" y="5" width="4.2" height="14" rx="1.4" fill="currentColor" stroke="none"/><rect x="13.4" y="5" width="4.2" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,previous:`<path d="M19 5.5v13L9.8 12z" fill="currentColor" stroke="none"/><rect x="5" y="5" width="2.8" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,next:`<path d="M5 5.5v13L14.2 12z" fill="currentColor" stroke="none"/><rect x="16.2" y="5" width="2.8" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,shuffle:`<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.97a4 4 0 0 0 3.3-1.7l5.46-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.97a4 4 0 0 1 3.3 1.7l5.46 8.6a4 4 0 0 0 3.3 1.7H22"/>`,repeat:`<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,repeatOne:`<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h2v5"/>`,volumeHigh:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>`,volumeLow:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>`,volumeMute:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m16 9 5 5"/><path d="m21 9-5 5"/>`,search:`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`,heart:`<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>`,playlist:`<path d="M3 6h11"/><path d="M3 12h11"/><path d="M3 18h7"/><path d="M17 11v8"/><path d="M13 15h8"/>`,close:`<path d="m6 6 12 12"/><path d="m18 6-12 12"/>`,back:`<path d="m15 18-6-6 6-6"/>`,album:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/>`,artist:`<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/>`,settings:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`};function Z(e){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${$e[e]}</svg>`}function Q(e=``){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function et(e){return e instanceof HTMLElement&&(e.isContentEditable||[`INPUT`,`TEXTAREA`,`SELECT`,`BUTTON`,`A`].includes(e.tagName))}function tt(e){return e instanceof HTMLElement&&(e.isContentEditable||[`INPUT`,`TEXTAREA`,`SELECT`].includes(e.tagName))}function nt(e){return`${e.title} ${e.artist} ${e.album}`.toLowerCase()}function rt(e,{store:t,audio:n,artwork:r}){let i=r??{urlFor:e=>e?.artwork??X,resolve:()=>Promise.resolve(),subscribe:()=>()=>{}};e.innerHTML=`
    <section class="player" data-player aria-label="Orpheus music player">
      <div class="sidebar-backdrop" data-sidebar-backdrop></div>

      <aside class="sidebar" id="playlists-sidebar" data-sidebar aria-hidden="true" aria-label="Your library">
        <div class="sidebar__header">
          <div>
            <p class="sidebar__eyebrow">Orpheus</p>
            <h2>Your library</h2>
          </div>
          <button class="sidebar__close" type="button" data-sidebar-close aria-label="Close library">
            ${Z(`close`)}
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
          <span class="brand__mark">${Z(`note`)}</span>
          <span class="brand__name">Orpheus</span>
        </button>

        <form class="search" role="search" data-search-form>
          <div class="search__field">
            <span class="search__icon" aria-hidden="true">${Z(`search`)}</span>
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
            ${Z(`search`)}
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
            ${Z(`settings`)}
          </button>

          <div class="settings" id="settings-panel" data-settings hidden>
            <p class="settings__title">Accent color</p>
            <p class="settings__hint">Choose a bright color for buttons and outlines.</p>
            <div class="settings__swatches" data-swatches>
              ${Qe.map(e=>`
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
              <img src="${X}" alt="" data-prev-artwork loading="lazy" />
            </button>
            <div class="artwork-frame">
              <img class="artwork-frame__image" data-artwork src="${X}" alt="" />
            </div>
            <button
              class="cover-flow__side cover-flow__side--next"
              type="button"
              data-next-cover
              aria-label="Play next track"
            >
              <img src="${X}" alt="" data-next-artwork loading="lazy" />
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
                ${Z(`heart`)}
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
                  ${Z(`playlist`)}
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
                ${Z(`shuffle`)}
              </button>
              <button class="control" type="button" data-previous aria-label="Previous track" title="Previous track">
                ${Z(`previous`)}
              </button>
              <button class="control control--play" type="button" data-toggle aria-label="Play" title="Play">
                ${Z(`play`)}
              </button>
              <button class="control" type="button" data-next aria-label="Next track" title="Next track">
                ${Z(`next`)}
              </button>
              <button class="control" type="button" data-repeat aria-label="Repeat: off" aria-pressed="false" title="Repeat: off">
                ${Z(`repeat`)}
              </button>
            </div>

            <div class="volume">
              <button class="volume__button" type="button" data-mute aria-label="Mute" title="Mute">
                ${Z(`volumeHigh`)}
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
            <div class="queue__heading">
              <button
                class="queue__back"
                type="button"
                data-queue-back
                aria-label="Back to previous queue"
                title="Back to previous queue"
                hidden
              >
                ${Z(`back`)}
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
  `;let a=e.querySelector(`[data-player]`),o={artwork:e.querySelector(`[data-artwork]`),prevCover:e.querySelector(`[data-prev-cover]`),nextCover:e.querySelector(`[data-next-cover]`),prevArtwork:e.querySelector(`[data-prev-artwork]`),nextArtwork:e.querySelector(`[data-next-artwork]`),album:e.querySelector(`[data-album]`),title:e.querySelector(`[data-title]`),artist:e.querySelector(`[data-artist]`),progress:e.querySelector(`[data-progress]`),current:e.querySelector(`[data-current]`),duration:e.querySelector(`[data-duration]`),toggle:e.querySelector(`[data-toggle]`),previous:e.querySelector(`[data-previous]`),next:e.querySelector(`[data-next]`),shuffle:e.querySelector(`[data-shuffle]`),repeat:e.querySelector(`[data-repeat]`),mute:e.querySelector(`[data-mute]`),volume:e.querySelector(`[data-volume]`),volumeLabel:e.querySelector(`[data-volume-label]`),queue:e.querySelector(`[data-queue]`),queueSource:e.querySelector(`[data-queue-source]`),queueTitle:e.querySelector(`[data-queue-title]`),queueBack:e.querySelector(`[data-queue-back]`),count:e.querySelector(`[data-count]`),status:e.querySelector(`[data-status]`),statusLabel:e.querySelector(`[data-status-label]`),error:e.querySelector(`[data-error]`),settingsToggle:e.querySelector(`[data-settings-toggle]`),settings:e.querySelector(`[data-settings]`),swatches:[...e.querySelectorAll(`[data-accent-color]`)],searchForm:e.querySelector(`[data-search-form]`),searchInput:e.querySelector(`[data-search]`),like:e.querySelector(`[data-like]`),playlistToggle:e.querySelector(`[data-playlist-toggle]`),playlistMenu:e.querySelector(`[data-playlist-menu]`),playlistList:e.querySelector(`[data-playlist-list]`),playlistForm:e.querySelector(`[data-playlist-form]`),playlistName:e.querySelector(`[data-playlist-name]`),sidebar:e.querySelector(`[data-sidebar]`),sidebarBackdrop:e.querySelector(`[data-sidebar-backdrop]`),sidebarToggle:e.querySelector(`[data-sidebar-toggle]`),sidebarClose:e.querySelector(`[data-sidebar-close]`),sidebarFilters:e.querySelector(`[data-sidebar-filters]`),sidebarList:e.querySelector(`[data-sidebar-list]`),sidebarCreateForm:e.querySelector(`[data-create-playlist-form]`),sidebarCreateName:e.querySelector(`[data-create-playlist-name]`),header:e.querySelector(`.player__header`)},s=!1,c=null,l=``,u=!1,d=`playlists`,f=[],p=null,m=null,h=new Map,g=`IntersectionObserver`in window?new IntersectionObserver(e=>{e.forEach(e=>{if(!e.isIntersecting)return;g.unobserve(e.target);let t=h.get(e.target.dataset.artTrack);t&&y(t)})},{rootMargin:`300px`}):null;function _(e){return i.urlFor(e)??X}function v(e,t,n){e&&(e.getAttribute(`src`)!==t&&(e.src=t),typeof n==`string`&&e.alt!==n&&(e.alt=n))}function y(e){e&&!e.artwork&&i.resolve(e)}function b(e){e&&e.querySelectorAll(`img[data-art-track]`).forEach(e=>{if(e.dataset.artObserved===`1`)return;e.dataset.artObserved=`1`;let t=h.get(e.dataset.artTrack);t&&_(t)===X&&(g?g.observe(e):y(t))})}function x(n){if(!n)return;let r=t.getState();if(r.currentTrack?.id===n.id&&v(o.artwork,_(n),`${n.album} — album artwork`),r.tracks.length>1){let e=r.tracks[(r.currentIndex-1+r.tracks.length)%r.tracks.length],t=r.tracks[(r.currentIndex+1)%r.tracks.length];e?.id===n.id&&v(o.prevArtwork,_(n),`${n.album} — previous track artwork`),t?.id===n.id&&v(o.nextArtwork,_(n),`${n.album} — next track artwork`)}e.querySelectorAll(`img[data-art-track]`).forEach(e=>{e.dataset.artTrack===n.id&&v(e,_(n),``)})}function ee(){let e=t.getState(),n=e.currentTrack,r=!!(n&&e.likedIds.includes(n.id));o.like.classList.toggle(`is-active`,r),o.like.setAttribute(`aria-pressed`,String(r)),o.like.setAttribute(`aria-label`,r?`Unlike this song`:`Like this song`),o.like.setAttribute(`title`,r?`Unlike this song`:`Like this song`)}function S(e,t){let n=e.closest(`.range-shell`);n&&n.style.setProperty(`--value`,`${t}%`)}function C(e){o.settings.hidden=!e,o.settingsToggle.setAttribute(`aria-expanded`,String(e))}function w(e){o.playlistMenu.hidden=!e,o.playlistToggle.setAttribute(`aria-expanded`,String(e)),e&&I()}function T(){let e=o.header.getBoundingClientRect().bottom;o.sidebar.style.top=`${Math.round(e)}px`}function E(e){if(u=e,e){let e=t.getState().activeCollection?.type;e===`album`?d=`albums`:e===`artist`?d=`artists`:(e===`playlist`||e===`liked`)&&(d=`playlists`),T(),F()}o.sidebar.classList.toggle(`is-open`,e),o.sidebarBackdrop.classList.toggle(`is-open`,e),o.sidebar.setAttribute(`aria-hidden`,String(!e)),o.sidebarToggle.setAttribute(`aria-expanded`,String(e))}function D(){let e=t.getState(),n=l.toLowerCase(),r=e.activeCollection,i=e=>nt(e).includes(n),a=r?e.tracks.filter(i):[],o=new Set(e.tracks.map(e=>e.id)),s=r?e.library.filter(e=>!o.has(e.id)&&i(e)):e.library.filter(i);return{inCollection:!!r,collection:r,collectionName:r?.name??`All Songs`,collectionMatches:a,otherMatches:s}}function O(e){let n=t.getState().currentTrack?.id===e.id;return`
      <li class="queue__row">
        <button
          class="queue__item${n?` is-active`:``}"
          type="button"
          data-track-id="${Q(e.id)}"
          aria-label="Play ${Q(e.title)} by ${Q(e.artist)}"
          ${n?`aria-current="true"`:``}
        >
          <span class="queue__art">
            <img
              src="${Q(_(e))}"
              alt=""
              loading="lazy"
              data-art-track="${Q(e.id)}"
            />
            <span class="queue__duration">${e.duration?Xe(e.duration):``}</span>
            <span class="queue__equalizer" aria-hidden="true"><i></i><i></i><i></i></span>
          </span>
          <span class="queue__meta">
            <span class="queue__title">${Q(e.title)}</span>
            <span class="queue__sub">${Q(e.artist)}</span>
            <span class="queue__album">${Q(e.album)}</span>
          </span>
        </button>
      </li>
    `}function k(e){return`<li class="queue__section">${Q(e)}</li>`}function A(e){return`<li class="queue__noresult">${Q(e)}</li>`}function j(){let e=t.getState().currentTrack?.id??null;f.forEach(t=>{let n=t.dataset.trackId===e;t.classList.toggle(`is-active`,n),n?t.setAttribute(`aria-current`,`true`):t.removeAttribute(`aria-current`)})}function M(e){return e?e.type===`album`?`Album · ${e.name}`:e.type===`artist`?`Artist · ${e.name}`:e.name:`All Songs`}function N(){let e=t.getState();if(o.queueSource.textContent=M(e.activeCollection),o.queueTitle.textContent=l?`Search results`:`Up next`,l){let{collectionMatches:e,otherMatches:t}=D(),n=e.length+t.length;o.count.textContent=`${n} ${n===1?`result`:`results`}`;return}let n=e.tracks.length;o.count.textContent=`${n} ${n===1?`track`:`tracks`}`}function P(){let e=t.getState(),n=``;if(l){let{inCollection:e,collection:t,collectionName:r,collectionMatches:i,otherMatches:a}=D(),o=i.length+a.length;if(e){let e=t?.type===`playlist`?`this playlist`:t?.type===`album`?`this album`:t?.type===`liked`?`Liked Songs`:`this artist`;n+=k(r||`This collection`),n+=i.length?i.map(O).join(``):A(`No song found in ${e}.`)}n+=k(`All Songs`),n+=a.length?a.map(O).join(``):A(o===0?`No song found.`:`No other songs match.`),n+=`
        <li class="queue__search-hint">
          Press <kbd>Shift</kbd> + <kbd>Enter</kbd> to search YouTube
        </li>
      `}else n=e.tracks.length?e.tracks.map(O).join(``):e.libraryError?A(e.libraryError):e.libraryMessage?A(e.libraryMessage):A(e.activeCollection?e.activeCollection.type===`liked`?`No liked songs yet. Tap the heart on a song to add it here.`:e.activeCollection.type===`album`?`This album is empty.`:e.activeCollection.type===`artist`?`This artist has no songs.`:`This playlist is empty. Add songs with the playlist button below.`:`No songs in your library yet.`);o.queue.innerHTML=n,f=[...o.queue.querySelectorAll(`.queue__item`)],j(),N(),b(o.queue)}function F(){let e=t.getState(),n=e.activeCollection;o.sidebarFilters.innerHTML=Ze.map(e=>`
        <button
          class="sidebar__filter${d===e.id?` is-active`:``}"
          type="button"
          role="tab"
          aria-selected="${d===e.id}"
          data-sidebar-filter="${e.id}"
        >${e.label}</button>
      `).join(``),o.sidebarCreateForm.hidden=d!==`playlists`;let r=t=>{let n=t?.[0];return n?e.library.find(e=>e.id===n)??null:null},i=({type:e,id:t,name:r,subtitle:i,count:a,track:o,iconName:s=`note`,round:c=!1})=>{let l=e===`library`?!n:n?.type===e&&n.id===t,u=o?`<img
            src="${Q(_(o))}"
            alt=""
            loading="lazy"
            data-art-track="${Q(o.id)}"
          />`:Z(s);return`
        <button
          class="sidebar__item${l?` is-active`:``}"
          type="button"
          data-collection-type="${Q(e)}"
          data-collection-id="${Q(t)}"
          ${l?`aria-current="true"`:``}
        >
          <span class="sidebar__item-art${c?` sidebar__item-art--round`:``}">${u}</span>
          <span class="sidebar__item-meta">
            <span class="sidebar__item-name">${Q(r)}</span>
            <span class="sidebar__item-sub">${Q(i)}</span>
          </span>
          <span class="sidebar__item-count">${a}</span>
        </button>
      `},a=``;if(d===`playlists`){let t=e.library.filter(t=>e.likedIds.includes(t.id));a+=i({type:`library`,id:``,name:`All Songs`,subtitle:`Your whole library`,count:e.library.length,iconName:`note`}),a+=i({type:`liked`,id:`liked`,name:`Liked Songs`,subtitle:`Liked · ${t.length} ${t.length===1?`song`:`songs`}`,count:t.length,track:t[0]??null,iconName:`heart`}),e.playlists.length?a+=e.playlists.map(e=>i({type:`playlist`,id:e.id,name:e.name,subtitle:`Playlist · ${e.trackIds.length} ${e.trackIds.length===1?`song`:`songs`}`,count:e.trackIds.length,track:r(e.trackIds),iconName:`playlist`})).join(``):a+=`<p class="sidebar__empty">No playlists yet. Create one below.</p>`}else a+=d===`artists`?e.artists.length?e.artists.map(e=>i({type:`artist`,id:e.id,name:e.name,subtitle:`Artist · ${e.trackIds.length} ${e.trackIds.length===1?`song`:`songs`}`,count:e.trackIds.length,track:r(e.trackIds),iconName:`artist`,round:!0})).join(``):`<p class="sidebar__empty">No artists in your library yet.</p>`:e.albums.length?e.albums.map(e=>i({type:`album`,id:e.id,name:e.name,subtitle:`Album · ${e.artist}`,count:e.trackIds.length,track:r(e.trackIds),iconName:`album`})).join(``):`<p class="sidebar__empty">No albums in your library yet.</p>`;o.sidebarList.innerHTML=a,b(o.sidebarList)}function I(){let e=t.getState(),n=e.currentTrack;e.playlists.length?o.playlistList.innerHTML=e.playlists.map(e=>{let t=!!(n&&e.trackIds.includes(n.id));return`
          <button
            class="playlist-item${t?` is-added`:``}"
            type="button"
            data-playlist-id="${Q(e.id)}"
          >
            <span class="playlist-item__name">${Q(e.name)}</span>
            <span class="playlist-item__meta">${t?`Added`:`${e.trackIds.length}`}</span>
          </button>
        `}).join(``):o.playlistList.innerHTML=`<p class="playlist-menu__empty">No playlists yet. Create one below.</p>`}function L(e){l=e.trim(),P()}function R(){o.searchInput.value=``,l=``,P()}function te(){let e=o.searchInput.value.trim();if(!e)return;let t=`https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`;window.open(t,`_blank`,`noopener,noreferrer`)}function z(e){let r=t.getState(),i=r.tracks.findIndex(t=>t.id===e);i===-1?(i=r.library.findIndex(t=>t.id===e),i!==-1&&(t.setQueue(r.library,{activeCollection:null,selectedTrackId:e}),n.play())):(t.selectTrack(i),n.play())}function B(){if(!l)return;let{collectionMatches:e,otherMatches:t}=D(),n=e[0]??t[0];n&&z(n.id)}function ne(e){let{tracks:t,currentIndex:n,currentTrack:r,currentTime:i,duration:l,isPlaying:f,volume:g,muted:b,shuffle:x,repeat:C,accent:w,error:T,canGoBack:E}=e;h=new Map,e.library.forEach(e=>h.set(e.id,e)),e.tracks.forEach(e=>h.set(e.id,e)),w!==c&&(document.documentElement.style.setProperty(`--accent`,w),c=w),o.swatches.forEach(e=>{let t=e.dataset.accentColor.toLowerCase()===w.toLowerCase();e.classList.toggle(`is-selected`,t),e.setAttribute(`aria-pressed`,String(t))}),r?(v(o.artwork,_(r),`${r.album} — album artwork`),y(r),o.album.textContent=r.album,o.title.textContent=r.title,o.artist.textContent=r.artist,document.title=`${r.title} — ${r.artist} · Orpheus`):(v(o.artwork,X,``),o.album.textContent=``,o.title.textContent=`No track selected`,o.artist.textContent=``,document.title=`Orpheus`);let D=t.length>1;if(o.prevCover.hidden=!D,o.nextCover.hidden=!D,D){let e=t[(n-1+t.length)%t.length],r=t[(n+1)%t.length];v(o.prevArtwork,_(e),`${e.album} — previous track artwork`),v(o.nextArtwork,_(r),`${r.album} — next track artwork`),y(e),y(r),o.prevCover.setAttribute(`aria-label`,`Play previous track: ${e.title}`),o.nextCover.setAttribute(`aria-label`,`Play next track: ${r.title}`)}let O=l>0?l:100;o.progress.max=String(O),s||(o.progress.value=String(Math.min(i,O))),S(o.progress,l>0?i/l*100:0),o.current.textContent=Xe(i),o.duration.textContent=Xe(l),o.toggle.innerHTML=Z(f?`pause`:`play`),o.toggle.setAttribute(`aria-label`,f?`Pause`:`Play`),o.toggle.setAttribute(`title`,f?`Pause`:`Play`),a.classList.toggle(`is-playing`,f),o.status.classList.toggle(`is-playing`,f),o.statusLabel.textContent=f?`Playing`:i>0?`Paused`:`Ready`,o.shuffle.classList.toggle(`is-active`,x),o.shuffle.setAttribute(`aria-pressed`,String(x));let k={off:`off`,all:`all`,one:`one`};o.repeat.innerHTML=Z(C===`one`?`repeatOne`:`repeat`),o.repeat.classList.toggle(`is-active`,C!==`off`),o.repeat.setAttribute(`aria-pressed`,String(C!==`off`)),o.repeat.setAttribute(`aria-label`,`Repeat: ${k[C]}`),o.repeat.setAttribute(`title`,`Repeat: ${k[C]}`);let A=!b&&g>0?g<.5?`volumeLow`:`volumeHigh`:`volumeMute`;o.mute.innerHTML=Z(A),o.mute.setAttribute(`aria-label`,b?`Unmute`:`Mute`),o.mute.setAttribute(`title`,b?`Unmute`:`Mute`),o.volume.value=String(g),S(o.volume,g*100),o.volumeLabel.textContent=b?`Muted`:`${Math.round(g*100)}%`;let M=e.activeCollection?`${e.activeCollection.type}:${e.activeCollection.id}`:`library`,N=`${M}|${t.map(e=>e.id).join(`,`)}`;N===p?j():(p=N,P()),o.queueBack.hidden=!E;let L=`${d}|${M}|${e.playlists.map(e=>`${e.id}:${e.trackIds.join(`,`)}`).join(`|`)}|${e.albums.map(e=>e.id).join(`,`)}|${e.artists.map(e=>e.id).join(`,`)}|${e.likedIds.join(`,`)}|${e.library.length}`;L!==m&&(m=L,u&&F()),ee(),o.playlistMenu.hidden||I(),o.error.hidden=!T,o.error.textContent=T??``}o.toggle.addEventListener(`click`,()=>n.toggle()),o.previous.addEventListener(`click`,()=>n.previous()),o.next.addEventListener(`click`,()=>n.next()),o.prevCover.addEventListener(`click`,()=>n.previous()),o.nextCover.addEventListener(`click`,()=>n.next()),a.addEventListener(`dragstart`,e=>{e.target instanceof HTMLImageElement&&e.preventDefault()}),o.shuffle.addEventListener(`click`,()=>t.toggleShuffle()),o.repeat.addEventListener(`click`,()=>t.cycleRepeat()),o.mute.addEventListener(`click`,()=>t.toggleMute()),o.volume.addEventListener(`input`,e=>t.setVolume(Number(e.target.value))),o.like.addEventListener(`click`,()=>{let e=t.getState().currentTrack;e&&t.toggleLike(e.id)}),o.settingsToggle.addEventListener(`click`,()=>{C(o.settings.hidden)}),o.settings.addEventListener(`click`,e=>{let n=e.target.closest(`[data-accent-color]`);n&&t.setAccent(n.dataset.accentColor)}),o.sidebarToggle.addEventListener(`click`,()=>{E(!u)}),o.sidebarClose.addEventListener(`click`,()=>{E(!1),o.sidebarToggle.focus()}),o.sidebarBackdrop.addEventListener(`click`,()=>E(!1)),o.sidebarFilters.addEventListener(`click`,e=>{let t=e.target.closest(`[data-sidebar-filter]`);t&&(d=t.dataset.sidebarFilter,F())}),o.sidebarList.addEventListener(`click`,e=>{let r=e.target.closest(`[data-collection-type]`);if(!r)return;E(!1),R();let i=r.dataset.collectionType,a=r.dataset.collectionId||null;n.pause(),i===`playlist`?t.selectPlaylist(a):i===`album`?t.selectAlbum(a):i===`artist`?t.selectArtist(a):i===`liked`?t.selectLiked():t.selectLibrary()}),o.sidebarCreateForm.addEventListener(`submit`,e=>{e.preventDefault();let n=o.sidebarCreateName.value.trim();n&&(t.createPlaylist(n),o.sidebarCreateName.value=``,F())}),o.playlistToggle.addEventListener(`click`,()=>{w(o.playlistMenu.hidden)}),o.playlistList.addEventListener(`click`,e=>{let n=e.target.closest(`[data-playlist-id]`);if(!n)return;let r=t.getState().currentTrack;r&&(t.toggleTrackInPlaylist(n.dataset.playlistId,r.id),I())}),o.playlistForm.addEventListener(`submit`,e=>{e.preventDefault();let n=o.playlistName.value.trim();if(!n)return;let r=t.getState().currentTrack;t.createPlaylist(n,r?.id??null),o.playlistName.value=``,I()}),o.searchInput.addEventListener(`input`,()=>L(o.searchInput.value)),o.searchInput.addEventListener(`keydown`,e=>{e.key===`Escape`?(R(),o.searchInput.blur()):e.key===`Enter`&&(e.preventDefault(),e.shiftKey?te():B())}),o.searchForm.addEventListener(`submit`,e=>{e.preventDefault(),B()}),o.progress.addEventListener(`pointerdown`,()=>{s=!0}),o.progress.addEventListener(`input`,e=>{s=!0,n.seek(Number(e.target.value))}),o.progress.addEventListener(`change`,()=>{s=!1}),o.progress.addEventListener(`blur`,()=>{s=!1}),o.queue.addEventListener(`click`,e=>{let r=e.target.closest(`[data-track-id]`);if(!r)return;let i=r.dataset.trackId;!l&&i===t.getState().currentTrack?.id?n.toggle():z(i)}),o.queueBack.addEventListener(`click`,()=>{n.pause(),R(),t.goBackQueue()});function re(e){let{currentTime:r,duration:i}=t.getState();n.seek(Math.min(Math.max(r+e,0),i||r+e))}function V(e){t.setVolume(t.getState().volume+e)}function H(e){if(e.code===`Escape`){if(!o.playlistMenu.hidden){w(!1),o.playlistToggle.focus();return}if(u){E(!1),o.sidebarToggle.focus();return}if(!o.settings.hidden){C(!1),o.settingsToggle.focus();return}}if(e.code===`Slash`&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!tt(e.target))e.preventDefault(),o.searchInput.focus(),o.searchInput.select();else if(!(e.metaKey||e.ctrlKey||e.altKey||et(e.target)))switch(e.code){case`Space`:e.preventDefault(),n.toggle();break;case`ArrowRight`:e.preventDefault(),re(5);break;case`ArrowLeft`:e.preventDefault(),re(-5);break;case`ArrowUp`:e.preventDefault(),V(.05);break;case`ArrowDown`:e.preventDefault(),V(-.05);break;case`KeyN`:n.next();break;case`KeyP`:n.previous();break;case`KeyM`:t.toggleMute();break;case`KeyS`:t.toggleShuffle();break;case`KeyR`:t.cycleRepeat()}}function U(){s=!1}function W(){u&&T()}function G(e){o.playlistMenu.hidden||!o.playlistMenu.contains(e.target)&&!o.playlistToggle.contains(e.target)&&w(!1),o.settings.hidden||o.settings.contains(e.target)||o.settingsToggle.contains(e.target)||C(!1)}document.addEventListener(`keydown`,H),document.addEventListener(`click`,G),window.addEventListener(`pointerup`,U),window.addEventListener(`resize`,W);let ie=t.subscribe(ne),K=i.subscribe(e=>x(e));return()=>{ie(),K(),g&&g.disconnect(),document.removeEventListener(`keydown`,H),document.removeEventListener(`click`,G),window.removeEventListener(`pointerup`,U),window.removeEventListener(`resize`,W)}}var it=document.querySelector(`#app`);it.innerHTML=`
  <div class="boot" role="status" aria-live="polite">
    <span class="boot__spinner" aria-hidden="true"></span>
    <p>Reading your music folder…</p>
  </div>
`;var $=await Ye(),at=A($.tracks,{libraryRoot:$.root,libraryError:$.error,libraryMessage:$.message}),ot=qe();rt(it,{store:at,audio:P(at,{artwork:ot}),artwork:ot});