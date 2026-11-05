const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/AiffParser-sURKXYI5.js","assets/rolldown-runtime-XKyaHtl9.js","assets/BasicParser-CAKX4pyu.js","assets/APEv2Parser-Kw5fbFk8.js","assets/Util-BgLHJ048.js","assets/EmbeddedID3v2-DI87Gqej.js","assets/TokenizerView-Wd9Jl7QX.js","assets/ID3v2Parser-C__6tX2w.js","assets/ID3v1Parser-Qiq-97i0.js","assets/ID3v2Token-DaDnjw-I.js","assets/id3v2-J_EZ1sea.js","assets/APEv2Parser-ohVBYN9I.js","assets/AsfParser-CGbeZxtl.js","assets/type-hqr378jM.js","assets/CafParser-C8xFXvds.js","assets/DsdiffParser-CEAC0XMz.js","assets/DsfParser-BTcHB4Cx.js","assets/AbstractID3Parser-BhyrBds-.js","assets/FlacParser-D-EiMPkf.js","assets/FlacParser-Bob5uLC0.js","assets/MatroskaParser-BhRq5Udm.js","assets/MP4Parser-BF1gtTSr.js","assets/MpegParser-JVcRRBtq.js","assets/MusepackParser-BkKdAYmO.js","assets/OggParser-gS12tKdU.js","assets/MetadataCollector-B2BBznkc.js","assets/WaveParser-Cih1pM2e.js","assets/WavPackParser-3FelGJ60.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{a as t,t as n}from"./APEv2Parser-Kw5fbFk8.js";import{R as r,V as i,a,d as o,i as s,m as c,o as l,s as u,z as d}from"./BasicParser-CAKX4pyu.js";import{r as f}from"./ID3v1Parser-Qiq-97i0.js";import{i as p,n as m,r as h,t as g}from"./MetadataCollector-B2BBznkc.js";import{t as _}from"./type-hqr378jM.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var v=/\s+(?:feat\.?|ft\.?|featuring|with|vs\.?)\s+/i,y=/\s*;\s*/;function b(e){let t=Array.isArray(e)?e:[e],n=[];return t.forEach(e=>{let t=String(e??``).trim();t&&t.replace(/\s*[([{]\s*(feat\.?|ft\.?|featuring|with|vs\.?)\s+/gi,` $1 `).replace(/\s*[)\]}]\s*$/g,``).split(y).flatMap(e=>e.split(v)).map(e=>e.trim()).filter(Boolean).forEach(e=>n.push(e))}),[...new Set(n)]}var ee=[`Sans serif`,`Serif`,`Display`,`Handwriting`,`Monospace`],x=[{id:`sans`,label:`Sans (default)`,group:`Sans serif`,stack:`"Inter", "Segoe UI", system-ui, -apple-system, sans-serif`},{id:`inter`,label:`Inter`,group:`Sans serif`,stack:`"Inter", "Segoe UI", system-ui, sans-serif`},{id:`arial`,label:`Arial`,group:`Sans serif`,stack:`Arial, "Helvetica Neue", Helvetica, sans-serif`},{id:`helvetica`,label:`Helvetica`,group:`Sans serif`,stack:`"Helvetica Neue", Helvetica, Arial, sans-serif`},{id:`segoe`,label:`Segoe UI`,group:`Sans serif`,stack:`"Segoe UI", "Segoe UI Variable", system-ui, sans-serif`},{id:`roboto`,label:`Roboto`,group:`Sans serif`,stack:`Roboto, "Helvetica Neue", Arial, sans-serif`},{id:`open-sans`,label:`Open Sans`,group:`Sans serif`,stack:`"Open Sans", "Segoe UI", sans-serif`},{id:`lato`,label:`Lato`,group:`Sans serif`,stack:`Lato, "Segoe UI", sans-serif`},{id:`montserrat`,label:`Montserrat`,group:`Sans serif`,stack:`Montserrat, "Segoe UI", sans-serif`},{id:`poppins`,label:`Poppins`,group:`Sans serif`,stack:`Poppins, "Segoe UI", sans-serif`},{id:`nunito`,label:`Nunito`,group:`Sans serif`,stack:`Nunito, "Segoe UI", sans-serif`},{id:`raleway`,label:`Raleway`,group:`Sans serif`,stack:`Raleway, "Segoe UI", sans-serif`},{id:`work-sans`,label:`Work Sans`,group:`Sans serif`,stack:`"Work Sans", "Segoe UI", sans-serif`},{id:`dm-sans`,label:`DM Sans`,group:`Sans serif`,stack:`"DM Sans", "Segoe UI", sans-serif`},{id:`space-grotesk`,label:`Space Grotesk`,group:`Sans serif`,stack:`"Space Grotesk", "Segoe UI", sans-serif`},{id:`source-sans`,label:`Source Sans`,group:`Sans serif`,stack:`"Source Sans 3", "Source Sans Pro", "Segoe UI", sans-serif`},{id:`futura`,label:`Futura`,group:`Sans serif`,stack:`Futura, "Century Gothic", "URW Gothic", sans-serif`},{id:`century-gothic`,label:`Century Gothic`,group:`Sans serif`,stack:`"Century Gothic", "URW Gothic", "Avant Garde", sans-serif`},{id:`avant-garde`,label:`Avant Garde`,group:`Sans serif`,stack:`"ITC Avant Garde Gothic", "Avant Garde", "Century Gothic", sans-serif`},{id:`optima`,label:`Optima`,group:`Sans serif`,stack:`Optima, Candara, "Segoe UI", sans-serif`},{id:`candara`,label:`Candara`,group:`Sans serif`,stack:`Candara, Optima, "Segoe UI", sans-serif`},{id:`gill-sans`,label:`Gill Sans`,group:`Sans serif`,stack:`"Gill Sans", "Gill Sans MT", Calibri, sans-serif`},{id:`calibri`,label:`Calibri`,group:`Sans serif`,stack:`Calibri, Carlito, "Segoe UI", sans-serif`},{id:`trebuchet`,label:`Trebuchet MS`,group:`Sans serif`,stack:`"Trebuchet MS", "Segoe UI", sans-serif`},{id:`verdana`,label:`Verdana`,group:`Sans serif`,stack:`Verdana, Geneva, sans-serif`},{id:`tahoma`,label:`Tahoma`,group:`Sans serif`,stack:`Tahoma, Verdana, sans-serif`},{id:`franklin`,label:`Franklin Gothic`,group:`Sans serif`,stack:`"Franklin Gothic Medium", "Franklin Gothic", "Arial Narrow", sans-serif`},{id:`ubuntu`,label:`Ubuntu`,group:`Sans serif`,stack:`Ubuntu, "Ubuntu Sans", "Segoe UI", sans-serif`},{id:`noto-sans`,label:`Noto Sans`,group:`Sans serif`,stack:`"Noto Sans", "Segoe UI", sans-serif`},{id:`dejavu-sans`,label:`DejaVu Sans`,group:`Sans serif`,stack:`"DejaVu Sans", Verdana, sans-serif`},{id:`liberation-sans`,label:`Liberation Sans`,group:`Sans serif`,stack:`"Liberation Sans", Arial, sans-serif`},{id:`nimbus-sans`,label:`Nimbus Sans`,group:`Sans serif`,stack:`"Nimbus Sans", Helvetica, sans-serif`},{id:`serif`,label:`Serif (default)`,group:`Serif`,stack:`Georgia, "Times New Roman", Cambria, serif`},{id:`georgia`,label:`Georgia`,group:`Serif`,stack:`Georgia, "Times New Roman", serif`},{id:`times`,label:`Times New Roman`,group:`Serif`,stack:`"Times New Roman", Times, serif`},{id:`garamond`,label:`Garamond`,group:`Serif`,stack:`"EB Garamond", Garamond, "Cormorant Garamond", serif`},{id:`palatino`,label:`Palatino`,group:`Serif`,stack:`"Palatino Linotype", Palatino, "Book Antiqua", serif`},{id:`book-antiqua`,label:`Book Antiqua`,group:`Serif`,stack:`"Book Antiqua", Palatino, "Palatino Linotype", serif`},{id:`baskerville`,label:`Baskerville`,group:`Serif`,stack:`Baskerville, "Libre Baskerville", "Baskerville Old Face", serif`},{id:`libre-baskerville`,label:`Libre Baskerville`,group:`Serif`,stack:`"Libre Baskerville", Baskerville, Georgia, serif`},{id:`didot`,label:`Didot`,group:`Serif`,stack:`Didot, "Bodoni 72", "Bodoni MT", "Times New Roman", serif`},{id:`bodoni`,label:`Bodoni`,group:`Serif`,stack:`"Bodoni 72", "Bodoni MT", Didot, serif`},{id:`cambria`,label:`Cambria`,group:`Serif`,stack:`Cambria, Georgia, serif`},{id:`constantia`,label:`Constantia`,group:`Serif`,stack:`Constantia, Cambria, Georgia, serif`},{id:`bookman`,label:`Bookman`,group:`Serif`,stack:`"Bookman Old Style", "URW Bookman", Bookman, serif`},{id:`century-schoolbook`,label:`Century Schoolbook`,group:`Serif`,stack:`"Century Schoolbook", "New Century Schoolbook", C059, serif`},{id:`charter`,label:`Charter`,group:`Serif`,stack:`Charter, "Bitstream Charter", "Iowan Old Style", Georgia, serif`},{id:`merriweather`,label:`Merriweather`,group:`Serif`,stack:`Merriweather, Georgia, serif`},{id:`playfair`,label:`Playfair Display`,group:`Serif`,stack:`"Playfair Display", Didot, Georgia, serif`},{id:`lora`,label:`Lora`,group:`Serif`,stack:`Lora, Georgia, serif`},{id:`cormorant`,label:`Cormorant Garamond`,group:`Serif`,stack:`"Cormorant Garamond", Garamond, Georgia, serif`},{id:`crimson`,label:`Crimson Text`,group:`Serif`,stack:`"Crimson Text", "Crimson Pro", Georgia, serif`},{id:`noto-serif`,label:`Noto Serif`,group:`Serif`,stack:`"Noto Serif", Georgia, serif`},{id:`dejavu-serif`,label:`DejaVu Serif`,group:`Serif`,stack:`"DejaVu Serif", Georgia, serif`},{id:`liberation-serif`,label:`Liberation Serif`,group:`Serif`,stack:`"Liberation Serif", "Times New Roman", serif`},{id:`nimbus-roman`,label:`Nimbus Roman`,group:`Serif`,stack:`"Nimbus Roman", "Times New Roman", serif`},{id:`p052`,label:`P052`,group:`Serif`,stack:`P052, Palatino, serif`},{id:`impact`,label:`Impact`,group:`Display`,stack:`Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif`},{id:`arial-black`,label:`Arial Black`,group:`Display`,stack:`"Arial Black", "Arial Bold", Gadget, sans-serif`},{id:`copperplate`,label:`Copperplate`,group:`Display`,stack:`Copperplate, "Copperplate Gothic Light", fantasy`},{id:`rockwell`,label:`Rockwell`,group:`Display`,stack:`Rockwell, "Roboto Slab", "Courier New", serif`},{id:`oswald`,label:`Oswald`,group:`Display`,stack:`Oswald, Impact, sans-serif`},{id:`bebas`,label:`Bebas Neue`,group:`Display`,stack:`"Bebas Neue", Impact, sans-serif`},{id:`abril`,label:`Abril Fatface`,group:`Display`,stack:`"Abril Fatface", Georgia, serif`},{id:`stencil`,label:`Stencil`,group:`Display`,stack:`Stencil, "Arial Black", fantasy`},{id:`comic-sans`,label:`Comic Sans`,group:`Handwriting`,stack:`"Comic Sans MS", "Comic Neue", cursive`},{id:`comic-neue`,label:`Comic Neue`,group:`Handwriting`,stack:`"Comic Neue", "Comic Sans MS", cursive`},{id:`brush-script`,label:`Brush Script`,group:`Handwriting`,stack:`"Brush Script MT", "Segoe Script", cursive`},{id:`segoe-script`,label:`Segoe Script`,group:`Handwriting`,stack:`"Segoe Script", "Bradley Hand", cursive`},{id:`bradley-hand`,label:`Bradley Hand`,group:`Handwriting`,stack:`"Bradley Hand", "Segoe Script", cursive`},{id:`papyrus`,label:`Papyrus`,group:`Handwriting`,stack:`Papyrus, fantasy`},{id:`caveat`,label:`Caveat`,group:`Handwriting`,stack:`Caveat, "Comic Sans MS", cursive`},{id:`pacifico`,label:`Pacifico`,group:`Handwriting`,stack:`Pacifico, "Brush Script MT", cursive`},{id:`dancing-script`,label:`Dancing Script`,group:`Handwriting`,stack:`"Dancing Script", "Brush Script MT", cursive`},{id:`great-vibes`,label:`Great Vibes`,group:`Handwriting`,stack:`"Great Vibes", "Brush Script MT", cursive`},{id:`satisfy`,label:`Satisfy`,group:`Handwriting`,stack:`Satisfy, "Brush Script MT", cursive`},{id:`mono`,label:`Mono (default)`,group:`Monospace`,stack:`"SFMono-Regular", "Cascadia Code", Consolas, monospace`},{id:`consolas`,label:`Consolas`,group:`Monospace`,stack:`Consolas, "Cascadia Mono", "Courier New", monospace`},{id:`courier`,label:`Courier New`,group:`Monospace`,stack:`"Courier New", Courier, monospace`},{id:`menlo`,label:`Menlo`,group:`Monospace`,stack:`Menlo, Monaco, "SFMono-Regular", monospace`},{id:`sf-mono`,label:`SF Mono`,group:`Monospace`,stack:`"SF Mono", "SFMono-Regular", Menlo, monospace`},{id:`fira-code`,label:`Fira Code`,group:`Monospace`,stack:`"Fira Code", "Fira Mono", monospace`},{id:`jetbrains-mono`,label:`JetBrains Mono`,group:`Monospace`,stack:`"JetBrains Mono", "JetBrains Mono NL", monospace`},{id:`ibm-plex-mono`,label:`IBM Plex Mono`,group:`Monospace`,stack:`"IBM Plex Mono", "Courier New", monospace`},{id:`source-code`,label:`Source Code Pro`,group:`Monospace`,stack:`"Source Code Pro", Consolas, monospace`},{id:`ubuntu-mono`,label:`Ubuntu Mono`,group:`Monospace`,stack:`"Ubuntu Mono", "DejaVu Sans Mono", monospace`},{id:`noto-mono`,label:`Noto Sans Mono`,group:`Monospace`,stack:`"Noto Sans Mono", "DejaVu Sans Mono", monospace`},{id:`dejavu-mono`,label:`DejaVu Sans Mono`,group:`Monospace`,stack:`"DejaVu Sans Mono", Menlo, monospace`},{id:`liberation-mono`,label:`Liberation Mono`,group:`Monospace`,stack:`"Liberation Mono", "Courier New", monospace`},{id:`nimbus-mono`,label:`Nimbus Mono`,group:`Monospace`,stack:`"Nimbus Mono PS", "Courier New", monospace`}],S=new Map(x.map(e=>[e.id,e])),C=x.map(e=>e.id);function te(e){return(S.get(e)??x[0]).stack}var w=[`off`,`all`,`one`],T=[`left`,`center`,`right`],E=[`normal`,`italic`],D=[300,400,500,600,700,800],ne=/^#[0-9a-f]{6}$/i,O={volume:.8,muted:!1,shuffle:!1,repeat:`off`,accent:`#b49cff`,movingBackground:!0,dynamicColor:!0,lyricsFontSize:34,lyricsColor:`#f2f2f4`,lyricsFollowAccent:!1,lyricsAlignment:`center`,lyricsWeight:600,lyricsStyle:`normal`,lyricsFont:`sans`,lyricsWidth:46,lyricsLineHeight:1.65,lyricsOffset:0,lyricsBackground:.32,lyricsDim:!0,lyricsGlow:!1,lyricsUppercase:!1},k=Object.keys(O),A=[...k];function re(e,t,n){return Math.min(Math.max(e,t),n)}function j(e){return typeof e==`string`&&ne.test(e)}function ie(e){if(!j(e))return!1;let t=Number.parseInt(e.slice(1,3),16),n=Number.parseInt(e.slice(3,5),16),r=Number.parseInt(e.slice(5,7),16);return .2126*t+.7152*n+.0722*r>=100}function M(e,t,n,r){let i=Number(e);return Number.isFinite(i)?re(i,t,n):r}function N(e,t,n){return t.includes(e)?e:n}function P(e){try{let t=JSON.parse(window.localStorage.getItem(e)??`{}`);return{volume:M(t.volume,0,1,O.volume),muted:typeof t.muted==`boolean`?t.muted:O.muted,shuffle:typeof t.shuffle==`boolean`?t.shuffle:O.shuffle,repeat:N(t.repeat,w,O.repeat),accent:ie(t.accent)?t.accent.toLowerCase():O.accent,movingBackground:typeof t.movingBackground==`boolean`?t.movingBackground:O.movingBackground,dynamicColor:typeof t.dynamicColor==`boolean`?t.dynamicColor:O.dynamicColor,lyricsFontSize:M(t.lyricsFontSize,18,72,O.lyricsFontSize),lyricsColor:j(t.lyricsColor)?t.lyricsColor.toLowerCase():O.lyricsColor,lyricsFollowAccent:typeof t.lyricsFollowAccent==`boolean`?t.lyricsFollowAccent:O.lyricsFollowAccent,lyricsAlignment:N(t.lyricsAlignment,T,O.lyricsAlignment),lyricsWeight:Number.isFinite(Number(t.lyricsWeight))?N(Number(t.lyricsWeight),D,O.lyricsWeight):O.lyricsWeight,lyricsStyle:N(t.lyricsStyle,E,O.lyricsStyle),lyricsFont:N(t.lyricsFont,C,O.lyricsFont),lyricsWidth:M(t.lyricsWidth,30,100,O.lyricsWidth),lyricsLineHeight:M(t.lyricsLineHeight,1.1,2.6,O.lyricsLineHeight),lyricsOffset:M(t.lyricsOffset,-5,5,O.lyricsOffset),lyricsBackground:M(t.lyricsBackground,0,.9,O.lyricsBackground),lyricsDim:typeof t.lyricsDim==`boolean`?t.lyricsDim:O.lyricsDim,lyricsGlow:typeof t.lyricsGlow==`boolean`?t.lyricsGlow:O.lyricsGlow,lyricsUppercase:typeof t.lyricsUppercase==`boolean`?t.lyricsUppercase:O.lyricsUppercase}}catch{return{...O}}}function F(e){try{let t=JSON.parse(window.localStorage.getItem(e)??`[]`);return Array.isArray(t)?t.map((e,t)=>typeof e==`string`?{uid:`legacy-${t}-${e}`,trackId:e}:!e||typeof e.trackId!=`string`?null:{uid:typeof e.uid==`string`&&e.uid?e.uid:`legacy-${t}-${e.trackId}`,trackId:e.trackId}).filter(Boolean):[]}catch{return[]}}function ae(e){try{let t=JSON.parse(window.localStorage.getItem(e)??`[]`);return Array.isArray(t)?t.filter(e=>e&&typeof e.id==`string`&&typeof e.name==`string`).map(e=>{let t=Array.isArray(e.trackIds)?e.trackIds:Array.isArray(e.tracks)?e.tracks:[];return{id:e.id,name:e.name,type:`playlist`,trackIds:t.filter(e=>typeof e==`string`)}}):[]}catch{return[]}}function I(e){return encodeURIComponent(String(e??``))}function L(e){try{let t=JSON.parse(window.localStorage.getItem(e)??`[]`);return Array.isArray(t)?[...new Set(t.filter(e=>typeof e==`string`))]:[]}catch{return[]}}function oe(e,t){return!e&&!t?!0:!e||!t?!1:e.type===t.type&&e.id===t.id}function se(e,t=[]){let n=new Map,r=new Map,i=new Set(t.flatMap(e=>e.trackIds??[]));return e.forEach(e=>{if(!e||typeof e.id!=`string`||(b(Array.isArray(e.artists)&&e.artists.length?e.artists:e.artist).forEach(t=>{let n=r.get(t);n||(n={id:`artist:${I(t)}`,type:`artist`,name:t,trackIds:[],trackId:e.id,artwork:e.artwork??null},r.set(t,n)),n.trackIds.push(e.id),!n.artwork&&e.artwork&&(n.artwork=e.artwork)}),i.has(e.id)))return;let t=e.artist||`Unknown artist`,a=e.albumArtist||t,o=e.album||`Unknown album`,s=`${a}\u0000${o}`,c=n.get(s);c||(c={id:`album:${I(a)}:${I(o)}`,type:`album`,name:o,artist:a,trackIds:[],trackId:e.id,artwork:e.artwork??null},n.set(s,c)),c.trackIds.push(e.id),!c.artwork&&e.artwork&&(c.artwork=e.artwork)}),{albums:[...n.values()],artists:[...r.values()]}}function ce(e){return e?{type:e.type,id:e.id,name:e.name,...e.artist?{artist:e.artist}:{}}:null}function le(e,t){switch(e){case`lyricsFontSize`:{let e=Number(t);return Number.isFinite(e)&&e>=18&&e<=72?e:void 0}case`lyricsColor`:return j(t)?t.toLowerCase():void 0;case`lyricsAlignment`:return T.includes(t)?t:void 0;case`lyricsWeight`:{let e=Number(t);return D.includes(e)?e:void 0}case`lyricsStyle`:return E.includes(t)?t:void 0;case`lyricsFont`:return C.includes(t)?t:void 0;case`lyricsWidth`:{let e=Number(t);return Number.isFinite(e)&&e>=30&&e<=100?e:void 0}case`lyricsLineHeight`:{let e=Number(t);return Number.isFinite(e)&&e>=1.1&&e<=2.6?e:void 0}case`lyricsOffset`:{let e=Number(t);return Number.isFinite(e)&&e>=-5&&e<=5?e:void 0}case`lyricsBackground`:{let e=Number(t);return Number.isFinite(e)&&e>=0&&e<=.9?e:void 0}case`lyricsDim`:case`lyricsGlow`:case`lyricsUppercase`:case`lyricsFollowAccent`:return typeof t==`boolean`?t:void 0;default:return}}function ue(){return`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}`}function de(e=[],{storageKey:t=`orpheus:player-prefs`,playlistsKey:n=`orpheus:playlists`,likedKey:r=`orpheus:liked`,queueKey:i=`orpheus:user-queue`,folderPlaylists:a=[],libraryRoot:o=null,libraryError:s=null,libraryMessage:c=null}={}){let l=[...e],u=P(t),d=Array.isArray(a)?a.filter(e=>e&&typeof e.id==`string`&&typeof e.name==`string`&&Array.isArray(e.trackIds)).map(e=>({...e,type:`playlist`,automatic:!0})):[],{albums:f,artists:p}=se(l,d),m=new Set(l.map(e=>e.id)),h={tracks:[...l],displayedTracks:[...l],userQueue:F(i).filter(e=>m.has(e.trackId)),library:l,libraryRoot:o,libraryError:s,libraryMessage:c,playlists:ae(n),folderPlaylists:d,albums:f,artists:p,likedIds:L(r),activeCollection:null,playbackCollection:null,queueHistory:[],currentIndex:0,isPlaying:!1,currentTime:0,duration:0,error:null,albumAccent:null,...u},g=new Set;function _(){return{...h,activePlaylistId:h.activeCollection?.type===`playlist`?h.activeCollection.id:null,canGoBack:h.queueHistory.length>0,currentTrack:h.tracks[h.currentIndex]??null}}function v(){try{let e={};A.forEach(t=>{e[t]=h[t]}),window.localStorage.setItem(t,JSON.stringify(e))}catch{}}function y(){try{window.localStorage.setItem(i,JSON.stringify(h.userQueue))}catch{}}function b(){try{window.localStorage.setItem(n,JSON.stringify(h.playlists))}catch{}}function ee(){try{window.localStorage.setItem(r,JSON.stringify(h.likedIds))}catch{}}function x(e){h={...h,...e},k.some(t=>t in e)&&v(),`playlists`in e&&b(),`likedIds`in e&&ee(),`userQueue`in e&&y();let t=_();g.forEach(e=>e(t))}function S(e){return e?l.find(t=>t.id===e.trackId)??null:null}function C(){for(;h.userQueue.length;){let[e,...t]=h.userQueue,n=S(e);if(!n){x({userQueue:t});continue}if(!h.tracks.length)return x({tracks:[n],currentIndex:0,userQueue:t,currentTime:0,duration:0,error:null}),!0;let r=[...h.tracks],i=Math.min(h.currentIndex+1,r.length);return r.splice(i,0,n),x({tracks:r,currentIndex:i,userQueue:t,currentTime:0,duration:0,error:null}),!0}return!1}function te(){if(h.tracks.length<=1)return 0;let e=h.currentIndex;for(;e===h.currentIndex;)e=Math.floor(Math.random()*h.tracks.length);return e}function T({automatic:e=!1}={}){if(h.userQueue.length&&C())return!0;let{tracks:t,currentIndex:n,shuffle:r,repeat:i}=h;if(!t.length)return!1;let a;if(r)a=te();else if(n<t.length-1)a=n+1;else if(i===`all`)a=0;else if(e)return!1;else a=0;return x({currentIndex:a,currentTime:0,duration:0,error:null}),!0}function E(){let{tracks:e,currentIndex:t,shuffle:n}=h;e.length&&x({currentIndex:n?te():(t-1+e.length)%e.length,currentTime:0,duration:0,error:null})}function D(e){if(!e)return[...l];let t=new Map(l.map(e=>[e.id,e]));return e.trackIds.map(e=>t.get(e)).filter(Boolean)}function ne(e){if(!e)return[...l];let t=new Map(l.map(e=>[e.id,e]));return e.trackIds.map(e=>t.get(e)).filter(Boolean)}function j(){return l.filter(e=>h.likedIds.includes(e.id))}function M(e,t){return e===`playlist`?h.playlists.find(e=>e.id===t)??h.folderPlaylists.find(e=>e.id===t)??null:e===`album`?h.albums.find(e=>e.id===t)??null:e===`artist`?h.artists.find(e=>e.id===t)??null:null}function N(e){if(!e)return[...l];if(e.type===`liked`)return j();let t=M(e.type,e.id);return t?ne(t):null}function I(){return{collection:h.activeCollection?{...h.activeCollection}:null,trackIds:h.displayedTracks.map(e=>e.id)}}function de(e,t,{pushHistory:n=!0}={}){let r=Array.isArray(e)?[...e]:[],i=ce(t),a={displayedTracks:r,activeCollection:i};return n&&!oe(h.activeCollection,i)&&(a.queueHistory=[...h.queueHistory,I()].slice(-25)),x(a),r.length>0}function fe(e,t,n=null,{pushHistory:r=!0}={}){let i=Array.isArray(e)?[...e]:[],a=ce(t),o=h.tracks[h.currentIndex]?.id??null,s=n??o,c=0;if(s){let e=i.findIndex(e=>e.id===s);e!==-1&&(c=e)}let l={tracks:i,displayedTracks:i,currentIndex:c,activeCollection:a,playbackCollection:a,currentTime:0,duration:0,isPlaying:!1,error:null};return r&&!oe(h.activeCollection,a)&&(l.queueHistory=[...h.queueHistory,I()].slice(-25)),x(l),i.length>0}function pe(e,t){let n=M(e,t);return n?de(ne(n),n):!1}function R(e=null){let t=[...h.displayedTracks];if(!t.length)return!1;let n=h.tracks[h.currentIndex]?.id??null,r=e?t.findIndex(t=>t.id===e):-1;return r===-1&&!e&&n&&(r=t.findIndex(e=>e.id===n)),r===-1&&(r=0),x({tracks:t,currentIndex:r,playbackCollection:h.activeCollection?{...h.activeCollection}:null,currentTime:0,duration:0,error:null}),!0}function me(e){let t=h.displayedTracks.findIndex(t=>t.id===e);if(t!==-1)return x({tracks:[...h.displayedTracks],currentIndex:t,playbackCollection:h.activeCollection?{...h.activeCollection}:null,currentTime:0,duration:0,error:null}),!0;if(t=h.library.findIndex(t=>t.id===e),t===-1)return!1;let n={tracks:[...l],displayedTracks:[...l],currentIndex:t,activeCollection:null,playbackCollection:null,currentTime:0,duration:0,error:null};return h.activeCollection&&(n.queueHistory=[...h.queueHistory,I()].slice(-25)),x(n),!0}function he(){let e=[...h.queueHistory];for(;e.length;){let t=e.pop(),n=N(t.collection);if(!n&&Array.isArray(t.trackIds)){let e=new Map(l.map(e=>[e.id,e]));n=t.trackIds.map(t=>e.get(t)).filter(Boolean)}if(n)return x({displayedTracks:[...n],activeCollection:t.collection?ce(t.collection):null,queueHistory:e}),!0}return x({queueHistory:[]}),!1}function ge(e){if(typeof e!=`string`)return!1;let t=h.likedIds.includes(e),n=t?h.likedIds.filter(t=>t!==e):[...h.likedIds,e],r={likedIds:n},i=()=>l.filter(e=>n.includes(e.id));if(h.activeCollection?.type===`liked`&&(r.displayedTracks=i()),h.playbackCollection?.type===`liked`){let e=i(),t=h.tracks[h.currentIndex]?.id??null,n=e.findIndex(e=>e.id===t);r.tracks=e,r.currentIndex=n===-1?0:n,n===-1&&(r.currentTime=0,r.duration=0,r.isPlaying=!1)}return x(r),!t}function _e(e,{next:t=!1}={}){if(typeof e!=`string`||!m.has(e))return null;let n={uid:ue(),trackId:e};return x({userQueue:t?[n,...h.userQueue]:[...h.userQueue,n]}),n.uid}function ve(e){let t=h.userQueue.filter(t=>t.uid!==e);return t.length!==h.userQueue.length&&(x({userQueue:t}),!0)}function z(){return h.userQueue.length?(x({userQueue:[]}),!0):!1}function ye(e,t){let n=h.userQueue.findIndex(t=>t.uid===e);if(n===-1)return!1;let r=re(Math.trunc(Number(t)||0),0,h.userQueue.length-1);if(r===n)return!1;let i=[...h.userQueue],[a]=i.splice(n,1);return i.splice(r,0,a),x({userQueue:i}),!0}function be(e,t){let n=h.userQueue.findIndex(t=>t.uid===e);return n!==-1&&ye(e,n+t)}function xe(e){let t=h.userQueue.find(t=>t.uid===e),n=S(t);if(!t||!n)return!1;let r=h.userQueue.filter(t=>t.uid!==e);if(!h.tracks.length)return x({tracks:[n],currentIndex:0,userQueue:r,currentTime:0,duration:0,error:null}),!0;let i=[...h.tracks],a=Math.min(h.currentIndex+1,i.length);return i.splice(a,0,n),x({tracks:i,currentIndex:a,userQueue:r,currentTime:0,duration:0,error:null}),!0}function Se(){let e=h.userQueue.map(S).filter(Boolean);return e.length?(fe(e,null,e[0].id),x({userQueue:[]}),!0):!1}return{getState:_,subscribe(e){return g.add(e),e(_()),()=>g.delete(e)},setState:x,selectTrack(e){!Number.isInteger(e)||e<0||e>=h.tracks.length||e!==h.currentIndex&&x({currentIndex:e,currentTime:0,duration:0,error:null})},playDisplayed(e=null){return R(e)},playTrack(e){return me(e)},setQueue(e,{activeCollection:t=null,selectedTrackId:n=null,pushHistory:r=!0}={}){return fe(e,t,n,{pushHistory:r})},selectPlaylist(e=null){return e?pe(`playlist`,e):de(l,null)},selectAlbum(e){return pe(`album`,e)},selectArtist(e){return pe(`artist`,e)},selectLiked(){return de(j(),{type:`liked`,id:`liked`,name:`Liked Songs`})},selectLibrary(){return de(l,null)},goBackQueue(){return he()},toggleLike(e){return ge(e)},addToQueue(e,t){return _e(e,t)},removeFromQueue(e){return ve(e)},clearUserQueue(){return z()},moveQueueItem(e,t){return ye(e,t)},moveQueueItemBy(e,t){return be(e,t)},playFromQueue(e){return xe(e)},playUserQueue(){return Se()},setLyricsPreference(e,t){let n=le(e,t);return n!==void 0&&(x({[e]:n}),!0)},resetLyricsPreferences(){x({lyricsFontSize:O.lyricsFontSize,lyricsColor:O.lyricsColor,lyricsFollowAccent:O.lyricsFollowAccent,lyricsAlignment:O.lyricsAlignment,lyricsWeight:O.lyricsWeight,lyricsStyle:O.lyricsStyle,lyricsFont:O.lyricsFont,lyricsWidth:O.lyricsWidth,lyricsLineHeight:O.lyricsLineHeight,lyricsOffset:O.lyricsOffset,lyricsBackground:O.lyricsBackground,lyricsDim:O.lyricsDim,lyricsGlow:O.lyricsGlow,lyricsUppercase:O.lyricsUppercase})},createPlaylist(e,t=null){let n=String(e??``).trim().slice(0,40);if(!n)return null;let r={id:`${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`,name:n,type:`playlist`,trackIds:t?[t]:[]};return x({playlists:[...h.playlists,r]}),r.id},toggleTrackInPlaylist(e,t){let n=h.playlists.find(t=>t.id===e);if(!n||typeof t!=`string`)return!1;let r=n.trackIds.includes(t),i=r?n.trackIds.filter(e=>e!==t):[...n.trackIds,t],a={playlists:h.playlists.map(t=>t.id===e?{...t,trackIds:i}:t)};if(h.activeCollection?.type===`playlist`&&h.activeCollection.id===e&&(a.displayedTracks=D({...n,trackIds:i})),h.playbackCollection?.type===`playlist`&&h.playbackCollection.id===e){let e=D({...n,trackIds:i}),t=h.tracks[h.currentIndex]?.id??null,r=e.findIndex(e=>e.id===t);a.tracks=e,a.currentIndex=r===-1?0:r,r===-1&&(a.currentTime=0,a.duration=0,a.isPlaying=!1)}return x(a),!r},renamePlaylist(e,t){let n=String(t??``).trim().slice(0,40);if(!n)return!1;let r=h.playlists.find(t=>t.id===e);if(!r)return!1;if(r.name===n)return!0;let i={playlists:h.playlists.map(t=>t.id===e?{...t,name:n}:t),queueHistory:h.queueHistory.map(t=>t.collection?.type===`playlist`&&t.collection.id===e?{...t,collection:{...t.collection,name:n}}:t)};return h.activeCollection?.type===`playlist`&&h.activeCollection.id===e&&(i.activeCollection={...h.activeCollection,name:n}),h.playbackCollection?.type===`playlist`&&h.playbackCollection.id===e&&(i.playbackCollection={...h.playbackCollection,name:n}),x(i),!0},deletePlaylist(e){if(!h.playlists.find(t=>t.id===e))return!1;let t={playlists:h.playlists.filter(t=>t.id!==e),queueHistory:h.queueHistory.filter(t=>t.collection?.type!==`playlist`||t.collection.id!==e)};if(h.activeCollection?.type===`playlist`&&h.activeCollection.id===e&&(t.displayedTracks=[...l],t.activeCollection=null),h.playbackCollection?.type===`playlist`&&h.playbackCollection.id===e){let e=h.tracks[h.currentIndex]?.id??null,n=e?l.findIndex(t=>t.id===e):-1;t.tracks=[...l],t.playbackCollection=null,n===-1?(t.currentIndex=0,t.currentTime=0,t.duration=0,t.isPlaying=!1):t.currentIndex=n}return x(t),!0},next:T,previous:E,toggleShuffle(){x({shuffle:!h.shuffle})},cycleRepeat(){let e=w[(w.indexOf(h.repeat)+1)%w.length];x({repeat:e})},setVolume(e){let t=re(Number(e)||0,0,1);x({volume:t,muted:t>0?!1:h.muted})},toggleMute(){x({muted:!h.muted})},setAccent(e){ie(e)&&x({accent:e.toLowerCase(),dynamicColor:!1})},setAlbumAccent(e){if(e!==null&&!ie(e))return;let t=e===null?null:e.toLowerCase();t!==h.albumAccent&&x({albumAccent:t})},toggleMovingBackground(){x({movingBackground:!h.movingBackground})},toggleDynamicColor(){x({dynamicColor:!h.dynamicColor})}}}var fe=`/assets/images/default-album-art.svg`,pe={avif:`image/avif`,gif:`image/gif`,jpeg:`image/jpeg`,jpg:`image/jpeg`,png:`image/png`,svg:`image/svg+xml`,webp:`image/webp`};function R(e=``){return pe[String(e).split(`?`)[0].match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase()]??`image/jpeg`}function me(e,{artwork:t=null}={}){let n=new Audio;n.preload=`metadata`;let r=null;function i(e){r=e?.id??null,e?(n.src=e.src,n.load()):(n.removeAttribute(`src`),n.load())}function a(e){if(!(`mediaSession`in navigator)||typeof MediaMetadata>`u`)return;if(!e){navigator.mediaSession.metadata=null;return}let n=t?.describe(e)??{url:e.artwork??fe,type:R(e.artwork??fe)};navigator.mediaSession.metadata=new MediaMetadata({title:e.title,artist:e.artist,album:e.album,artwork:[{src:new URL(n.url,window.location.href).href,sizes:`512x512`,type:n.type}]})}e.subscribe(e=>{let t=e.currentTrack;(t?.id??null)!==r&&(i(t),a(t));let o=e.muted?0:e.volume;n.volume!==o&&(n.volume=o)}),t?.subscribe&&t.subscribe(t=>{let n=e.getState().currentTrack;n&&t?.id===n.id&&a(n)});function o(){return e.getState().currentTrack?n.play().catch(()=>{e.setState({isPlaying:!1})}):Promise.resolve()}function s(){n.pause()}function c(){return e.getState().isPlaying?s():o()}function l(t){!Number.isFinite(n.duration)||n.duration<=0||(n.currentTime=Math.min(Math.max(t,0),n.duration),e.setState({currentTime:n.currentTime}))}function u(){e.next()&&o()}function d(){n.currentTime>3?l(0):(e.previous(),o())}return n.addEventListener(`loadedmetadata`,()=>{e.setState({duration:Number.isFinite(n.duration)?n.duration:0})}),n.addEventListener(`durationchange`,()=>{e.setState({duration:Number.isFinite(n.duration)?n.duration:0})}),n.addEventListener(`timeupdate`,()=>{e.setState({currentTime:n.currentTime})}),n.addEventListener(`play`,()=>e.setState({isPlaying:!0})),n.addEventListener(`pause`,()=>e.setState({isPlaying:!1})),n.addEventListener(`ended`,()=>{e.getState().repeat===`one`?(n.currentTime=0,o()):e.next({automatic:!0})?o():(n.currentTime=0,e.setState({isPlaying:!1,currentTime:0}))}),n.addEventListener(`error`,()=>{n.getAttribute(`src`)&&e.setState({isPlaying:!1,error:`This track could not be played. Check that the audio file exists.`})}),`mediaSession`in navigator&&Object.entries({play:()=>o(),pause:()=>s(),previoustrack:()=>d(),nexttrack:()=>u(),seekto:e=>{Number.isFinite(e.seekTime)&&l(e.seekTime)}}).forEach(([e,t])=>{try{navigator.mediaSession.setActionHandler(e,t)}catch{}}),{audio:n,play:o,pause:s,toggle:c,seek:l,next:u,previous:d,loadTrack:i}}async function he(e){let t=e.fileInfo.size;if(t>=143){let n=new Uint8Array(15),r=e.position;await e.readBuffer(n,{position:t-143}),e.setPosition(r);let i=d(n,`latin1`);if(i.substring(6)===`LYRICS200`)return Number.parseInt(i.substring(0,6),10)+15}return 0}var ge=32,_e=9,ve=59,z=61,ye=34,be=92,xe=44,Se=1,B=2,Ce=4,V=8,we=16,Te=65280,Ee=65281,H=new Uint8Array(256);H[_e]|=B,H[ge]|=B,H[ve]|=Ce,H[xe]|=V;for(let e=128;e<=255;e++)H[e]|=Se;for(let e of"!#$%&'*+-.^_`|~")H[e.charCodeAt(0)]|=we;for(let e=48;e<=57;e++)H[e]|=we;for(let e=65;e<=90;e++)H[e]|=17;for(let e=97;e<=122;e++)H[e]|=we;var U=(()=>{let e=function(){};return e.prototype=Object.create(null),e})();function De(e,t){let n=Ce|(t?.comma===!0?V:0),r=e.length,i=t?.start??0;for(;(H[e.charCodeAt(i)]&B)!==0;)i++;let a=i,o=0,s=-1,c=t?.parameters===!1?V:0;for(;a<r;){let t=e.charCodeAt(a),r=H[t];if((r&n)!==0){c|=r&V;break}(r&B)===0?s=-1:s===-1&&(s=a),o|=t&Te|r,a++}let l=s===-1?a:s,u=e.slice(i,l),d=(o&Ee)===0?u:u.toLowerCase();return a===r||c!==0?{type:d,index:a,parameters:new U}:Oe(e,d,a,r,n)}function Oe(e,t,n,r,i){let a=new U;parameter:for(;n<r;){for(n++;(H[e.charCodeAt(n)]&B)!==0;)n++;let t=n,o=0,s=-1;for(;n<r;){let c=e.charCodeAt(n),l=H[c];if((l&i)!==0){if((l&V)!==0)break parameter;continue parameter}if(c===z){let c=s===-1?n:s,l=e.slice(t,c),u=(o&Ee)===0?l:l.toLowerCase();for(n++;(H[e.charCodeAt(n)]&B)!==0;)n++;if(n<r&&e.charCodeAt(n)===ye){let t=++n,o=!1;for(;n<r;){let s=e.charCodeAt(n);if(s===ye){a[u]===void 0&&(a[u]=o?ke(e,t,n):e.slice(t,n)),n++;let s=0;for(;n<r;){let t=H[e.charCodeAt(n)];if((t&i)!==0){s=t&V;break}n++}if(s!==0)break parameter;continue parameter}s===be&&n+1<r?(o=!0,n+=2):n++}continue parameter}let d=n,f=0,p=-1;for(;n<r;){let t=H[e.charCodeAt(n)];if((t&i)!==0){f=t&V;break}(t&B)===0?p=-1:p===-1&&(p=n),n++}if(a[u]===void 0){let t=p===-1?n:p;a[u]=e.slice(d,t)}if(f!==0)break parameter;continue parameter}(l&B)===0?s=-1:s===-1&&(s=n),o|=c&Te|l,n++}}return{type:t,index:n,parameters:a}}function ke(e,t,n){let r=``;for(let i=t;i<n;i++)e.charCodeAt(i)===be&&(r+=e.slice(t,i),t=++i);return r+e.slice(t,n)}var Ae=e(r(),1),je=/^[A-Za-z0-9][A-Za-z0-9!#$&^_-]{0,126}\/[A-Za-z0-9][A-Za-z0-9!#$&^_.+-]{0,126}$/;function Me(e){if(!je.test(e))throw TypeError(`Invalid media type: ${e}`);let t=e.indexOf(`/`),n=e.slice(0,t).toLowerCase(),r=e.slice(t+1).toLowerCase(),i,a=r.lastIndexOf(`+`);return a!==-1&&(i=r.slice(a+1),r=r.slice(0,a)),{type:n,subtype:r,suffix:i}}var Ne=`modulepreload`,Pe=function(e){return`/`+e},Fe={},Ie=function(e){return e.pathname.endsWith(`.css`)},W=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},G=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Pe(t,n);let r=s(t),i=Ie(r);return W(Fe,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Ne,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Le={parserType:`aiff`,extensions:[`.aif`,`aiff`,`aifc`],mimeTypes:[`audio/aiff`,`audio/aif`,`audio/aifc`,`application/aiff`],async load(){return(await G(async()=>{let{AIFFParser:e}=await import(`./AiffParser-sURKXYI5.js`);return{AIFFParser:e}},__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10]))).AIFFParser}},Re={parserType:`apev2`,extensions:[`.ape`],mimeTypes:[`audio/ape`,`audio/monkeys-audio`],async load(){return(await G(async()=>{let{APEv2Parser:e}=await import(`./APEv2Parser-ohVBYN9I.js`);return{APEv2Parser:e}},__vite__mapDeps([11,3,1,2,4]))).APEv2Parser}},ze={parserType:`asf`,extensions:[`.asf`,`.wma`,`.wmv`],mimeTypes:[`audio/ms-wma`,`video/ms-wmv`,`audio/ms-asf`,`video/ms-asf`,`application/vnd.ms-asf`],async load(){return(await G(async()=>{let{AsfParser:e}=await import(`./AsfParser-CGbeZxtl.js`);return{AsfParser:e}},__vite__mapDeps([12,1,2,13,6,10,4]))).AsfParser}},Be={parserType:`caf`,extensions:[`.caf`,`.caff`],mimeTypes:[`audio/caf`,`application/caf`],async load(){return(await G(async()=>{let{CafParser:e}=await import(`./CafParser-C8xFXvds.js`);return{CafParser:e}},__vite__mapDeps([14,1,2]))).CafParser}},Ve={parserType:`dsdiff`,extensions:[`.dff`],mimeTypes:[`audio/dsf`,`audio/dsd`,`audio/dff`],async load(){return(await G(async()=>{let{DsdiffParser:e}=await import(`./DsdiffParser-CEAC0XMz.js`);return{DsdiffParser:e}},__vite__mapDeps([15,1,2,6,3,4,5,7,8,9,10]))).DsdiffParser}},He={parserType:`dsf`,extensions:[`.dsf`],mimeTypes:[`audio/dsf`],async load(){return(await G(async()=>{let{DsfParser:e}=await import(`./DsfParser-BTcHB4Cx.js`);return{DsfParser:e}},__vite__mapDeps([16,1,2,17,8,3,4,7,9,10]))).DsfParser}},Ue={parserType:`flac`,extensions:[`.flac`],mimeTypes:[`audio/flac`],async load(){return(await G(async()=>{let{FlacParser:e}=await import(`./FlacParser-D-EiMPkf.js`);return{FlacParser:e}},__vite__mapDeps([18,19,1,2,3,4,17,8,7,9,10]))).FlacParser}},K={parserType:`matroska`,extensions:[`.mka`,`.mkv`,`.mk3d`,`.mks`,`webm`],mimeTypes:[`audio/matroska`,`video/matroska`,`audio/webm`,`video/webm`],async load(){return(await G(async()=>{let{MatroskaParser:e}=await import(`./MatroskaParser-BhRq5Udm.js`);return{MatroskaParser:e}},__vite__mapDeps([20,1,2,13]))).MatroskaParser}},We={parserType:`mp4`,extensions:[`.mp4`,`.m4a`,`.m4b`,`.m4pa`,`m4v`,`m4r`,`3gp`,`.mov`,`.movie`,`.qt`],mimeTypes:[`audio/mp4`,`audio/m4a`,`video/m4v`,`video/mp4`,`video/quicktime`],async load(){return(await G(async()=>{let{MP4Parser:e}=await import(`./MP4Parser-BF1gtTSr.js`);return{MP4Parser:e}},__vite__mapDeps([21,1,2,6,4,8,3,13]))).MP4Parser}},Ge={parserType:`mpeg`,extensions:[`.mp1`,`.mp2`,`.mp3`,`.m2a`,`.aac`,`aacp`],mimeTypes:[`audio/mpeg`,`audio/mp3`,`audio/aacs`,`audio/aacp`],async load(){return(await G(async()=>{let{MpegParser:e}=await import(`./MpegParser-JVcRRBtq.js`);return{MpegParser:e}},__vite__mapDeps([22,1,2,4,8,3,17,7,9,10]))).MpegParser}},Ke={parserType:`musepack`,extensions:[`.mpc`],mimeTypes:[`audio/musepack`],async load(){return(await G(async()=>{let{MusepackParser:e}=await import(`./MusepackParser-BkKdAYmO.js`);return{MusepackParser:e}},__vite__mapDeps([23,1,2,17,8,3,4,7,9,10]))).MusepackParser}},qe={parserType:`ogg`,extensions:[`.ogg`,`.ogv`,`.oga`,`.ogm`,`.ogx`,`.opus`,`.spx`],mimeTypes:[`application/ogg`,`audio/ogg`,`audio/opus`,`audio/speex`,`video/ogg`],async load(){return(await G(async()=>{let{OggParser:e}=await import(`./OggParser-gS12tKdU.js`);return{OggParser:e}},__vite__mapDeps([24,1,2,25,3,4,6,9,10,13,19,17,8,7]))).OggParser}},Je={parserType:`riff`,extensions:[`.wav`,`wave`,`.bwf`],mimeTypes:[`audio/vnd.wave`,`audio/wav`,`audio/wave`],async load(){return(await G(async()=>{let{WaveParser:e}=await import(`./WaveParser-Cih1pM2e.js`);return{WaveParser:e}},__vite__mapDeps([26,1,2,3,4,5,6,7,8,9,10]))).WaveParser}},Ye={parserType:`wavpack`,extensions:[`.wv`,`.wvp`],mimeTypes:[`audio/wavpack`],async load(){return(await G(async()=>{let{WavPackParser:e}=await import(`./WavPackParser-3FelGJ60.js`);return{WavPackParser:e}},__vite__mapDeps([27,1,2,4,3]))).WavPackParser}},q=(0,Ae.default)(`music-metadata:parser:factory`);function Xe(e){let t=De(e),n=Me(t.type);return{type:n.type,subtype:n.subtype,suffix:n.suffix,parameters:t.parameters}}var J=class{parsers=[];constructor(){[Ue,Ge,Re,We,K,Je,qe,ze,Le,Ye,Ke,He,Ve,Be].forEach(e=>{this.registerParser(e)})}registerParser(e){this.parsers.push(e)}async parse(e,t,n={}){let r=a(n);if(l(n),s(n),i(e)?(q(`tokenizer supports random-access, scanning for appending headers`),await $e(e,n)):q(`tokenizer does not support random-access, cannot scan for appending headers`),!t){let n=new Uint8Array(4100);if(e.fileInfo.mimeType&&(t=this.findLoaderForContentType(e.fileInfo.mimeType)),!t&&e.fileInfo.path&&(t=this.findLoaderForExtension(e.fileInfo.path)),!t){q(`Guess parser on content...`),await e.peekBuffer(n,{mayBeLess:!0});let i=await p(n,{mpegOffsetTolerance:10,maxBufferSize:r});if(!i?.mime)throw new o(`Failed to determine audio format`);if(q(`Guessed file type is mime=${i.mime}, extension=${i.ext}`),t=this.findLoaderForContentType(i.mime),!t)throw new c(`Guessed MIME-type not supported: ${i.mime}`)}}q(`Loading ${t.parserType} parser...`);let u=new g(n),d=new(await(t.load()))(u,e,n);return q(`Parser ${t.parserType} loaded`),await d.parse(),u.format.trackInfo.length===0&&u.format.hasAudio===!0&&u.addStreamInfo(m(u.format)),u.format.trackInfo&&(u.format.hasAudio===void 0&&u.setFormat(`hasAudio`,!!u.format.trackInfo.find(e=>e.type===_.audio)),u.format.hasVideo===void 0&&u.setFormat(`hasVideo`,!!u.format.trackInfo.find(e=>e.type===_.video))),h(u,e.fileInfo.size),u.toCommonMetadata()}findLoaderForExtension(e){if(!e)return;let t=Ze(e).toLocaleLowerCase()||e;return this.parsers.find(e=>e.extensions.indexOf(t)!==-1)}findLoaderForContentType(e){let t;if(!e)return;try{t=Xe(e)}catch{q(`Invalid HTTP Content-Type header value: ${e}`);return}let n=t.subtype.indexOf(`x-`)===0?t.subtype.substring(2):t.subtype;return this.parsers.find(e=>e.mimeTypes.find(e=>e.indexOf(`${t.type}/${n}`)!==-1))}getSupportedMimeTypes(){let e=new Set;return this.parsers.forEach(t=>{t.mimeTypes.forEach(t=>{e.add(t),e.add(t.replace(`/`,`/x-`))})}),Array.from(e)}};function Ze(e){let t=e.lastIndexOf(`.`);return t===-1?``:e.substring(t)}async function Y(e,n={}){let r=t(e,u(n));try{return await Qe(r,n)}finally{await r.close()}}function Qe(e,t){return new J().parse(e,void 0,t)}async function $e(e,t={}){let r=e.fileInfo.size;if(await f(e)){r-=128;let t=await he(e);r-=t}t.apeHeader=await n.findApeFooterOffset(e,r)}var et=`/assets/images/default-album-art.svg`,tt={avif:`image/avif`,gif:`image/gif`,jpeg:`image/jpeg`,jpg:`image/jpeg`,png:`image/png`,svg:`image/svg+xml`,webp:`image/webp`};function nt(e=``){let t=String(e).split(`?`)[0].split(`#`)[0].match(/\.([a-z0-9]+)$/i);return t?t[1].toLowerCase():``}function rt(e=``){return tt[nt(e)]??`image/jpeg`}function it(e){return nt(e?.src)===`mp3`}function at(e){return`${e?.id??``}|${e?.src??``}`}function ot(e,t){return(e[t]&127)<<21|(e[t+1]&127)<<14|(e[t+2]&127)<<7|e[t+3]&127}async function st(e,t,n){let r=await fetch(e,{headers:{Range:`bytes=${t}-${n}`}});if(!r.ok&&r.status!==206)throw Error(`Artwork request failed with ${r.status}`);return{bytes:new Uint8Array(await r.arrayBuffer()),wholeFile:r.status===200}}function ct(e){return!Array.isArray(e)||!e.length?null:e.find(e=>/front/i.test(e.type??``))??e[0]}async function lt(e){if(!it(e))return null;let t=await st(e.src,0,9);if(t.bytes.length<10||t.bytes[0]!==73||t.bytes[1]!==68||t.bytes[2]!==51)return null;if(t.wholeFile)return ut(t.bytes);let n=ot(t.bytes,6),r=t.bytes[5]&16?10:0,i=10+n+r;return ut((await st(e.src,0,Math.max(i-1,9))).bytes)}async function ut(e){let t=ct((await Y(new Blob([e],{type:`audio/mpeg`}))).common.picture);if(!t?.data)return null;let n=new Blob([t.data],{type:t.format||`image/jpeg`});return{url:URL.createObjectURL(n),type:n.type||`image/jpeg`,objectUrl:!0}}function dt({defaultArtwork:e=et}={}){let t=new Map,n=new Set,r=new Set;function i(n){if(!n)return{url:e,type:rt(e)};if(n.artwork)return{url:n.artwork,type:n.artworkType||rt(n.artwork)};let r=t.get(at(n));return r?.artwork?r.artwork:{url:e,type:rt(e)}}function a(e){return i(e).url}function o(a){if(!a)return Promise.resolve(i(null));if(a.artwork)return Promise.resolve(i(a));let o=at(a),s=t.get(o);if(s)return s.promise;let c={artwork:null,promise:null};return c.promise=lt(a).then(t=>(t&&r.add(t.url),c.artwork=t??{url:e,type:rt(e)},n.forEach(e=>e(a,c.artwork)),c.artwork)).catch(()=>(c.artwork={url:e,type:rt(e)},n.forEach(e=>e(a,c.artwork)),c.artwork)),t.set(o,c),c.promise}function s(e){return n.add(e),()=>n.delete(e)}function c(){r.forEach(e=>URL.revokeObjectURL(e)),r.clear(),t.clear(),n.clear()}return{defaultArtwork:e,describe:i,urlFor:a,resolve:o,subscribe:s,release:c}}function ft(e){return typeof e==`string`&&e.trim()?e.trim():null}async function pt(){try{let e=await fetch(`/api/library`,{headers:{Accept:`application/json`},cache:`no-store`}),t=e.headers.get(`content-type`)??``;if(!e.ok||!t.includes(`application/json`))throw Error(`The local music API is not available.`);let n=await e.json();return{tracks:Array.isArray(n.tracks)?n.tracks:[],playlists:Array.isArray(n.playlists)?n.playlists:[],root:ft(n.root),error:ft(n.error),message:ft(n.message)}}catch{return{tracks:[],playlists:[],root:null,error:`The local music server is not available. Run Orpheus with npm run dev, or npm run preview after a build.`,message:null}}}async function mt(){let e=await fetch(`/api/covers/fetch`,{method:`POST`,headers:{Accept:`application/json`}}),t=e.headers.get(`content-type`)??``;if(!e.ok||!t.includes(`application/json`))throw Error(`The local music server could not fetch covers.`);return e.json()}async function ht(){let e=await fetch(`/api/covers/fetch/status`,{headers:{Accept:`application/json`},cache:`no-store`}),t=e.headers.get(`content-type`)??``;if(!e.ok||!t.includes(`application/json`))throw Error(`The local music server could not report cover progress.`);return e.json()}function gt(e=0){return Number.isFinite(e)?`${Math.floor(e/60)}:${Math.floor(e%60).toString().padStart(2,`0`)}`:`0:00`}var X=48,_t=.15,vt=new Map;function yt(e,t,n){return Math.min(Math.max(e,t),n)}function bt(e){return new Promise((t,n)=>{let r=new Image;r.decoding=`async`,r.onload=()=>t(r),r.onerror=()=>n(Error(`Could not load artwork: ${e}`)),r.src=e})}function xt(e,t,n){let r=e/255,i=t/255,a=n/255,o=Math.max(r,i,a),s=Math.min(r,i,a),c=o-s,l=(o+s)/2;if(c===0)return{hue:0,saturation:0,lightness:l};let u=yt(c/(1-Math.abs(2*l-1)),0,1),d;return d=o===r?(i-a)/c%6:o===i?(a-r)/c+2:(r-i)/c+4,d*=60,d<0&&(d+=360),{hue:d,saturation:u,lightness:l}}function St(e,t,n){let r=(1-Math.abs(2*n-1))*t,i=e/60,a=r*(1-Math.abs(i%2-1)),o=0,s=0,c=0;i<1?[o,s,c]=[r,a,0]:i<2?[o,s,c]=[a,r,0]:i<3?[o,s,c]=[0,r,a]:i<4?[o,s,c]=[0,a,r]:i<5?[o,s,c]=[a,0,r]:[o,s,c]=[r,0,a];let l=n-r/2;return[o+l,s+l,c+l].map(e=>Math.round(yt(e,0,1)*255))}function Ct([e,t,n]){return`#${[e,t,n].map(e=>e.toString(16).padStart(2,`0`)).join(``)}`}function wt([e,t,n]){return .2126*e+.7152*t+.0722*n}function Tt({hue:e,saturation:t,lightness:n}){let r=yt(t,.52,.95),i=yt(n,.56,.72),a=St(e,r,i);for(;wt(a)<118&&i<.92;)i+=.015,a=St(e,r,i);return Ct(a)}function Et(e){let t=document.createElement(`canvas`);t.width=X,t.height=X;let n=t.getContext(`2d`,{willReadFrequently:!0});if(!n)return null;n.drawImage(e,0,0,X,X);let{data:r}=n.getImageData(0,0,X,X),i=new Map;for(let e=0;e<r.length;e+=4){if(r[e+3]<128)continue;let t=r[e],n=r[e+1],a=r[e+2],{hue:o,saturation:s,lightness:c}=xt(t,n,a);if(s<_t||c<.08||c>.94)continue;let l=`${t>>4}:${n>>4}:${a>>4}`,u=i.get(l);u||(u={count:0,red:0,green:0,blue:0},i.set(l,u)),u.count+=1,u.red+=t,u.green+=n,u.blue+=a}let a=null,o=0;return i.forEach(e=>{let t=xt(Math.round(e.red/e.count),Math.round(e.green/e.count),Math.round(e.blue/e.count)),n=e.count*(.3+t.saturation)*(.35+Math.min(t.lightness,.72));n>o&&(o=n,a=t)}),a}async function Dt(e){let t=Et(await bt(e));return t?Tt(t):null}function Ot(e){if(!e)return Promise.resolve(null);let t=vt.get(e);if(t)return t;let n=Dt(e).catch(()=>null);return vt.set(e,n),n}async function kt(e,{signal:t}={}){if(typeof e!=`string`||!e)throw Error(`No track selected.`);let n=await fetch(`/api/lyrics/${encodeURIComponent(e)}`,{headers:{Accept:`application/json`},cache:`no-store`,signal:t}),r=n.headers.get(`content-type`)??``;if(!n.ok||!r.includes(`application/json`))throw Error(`The local music server could not look up lyrics.`);let i=await n.json();return{found:!!i.found,instrumental:!!i.instrumental,synced:!!i.synced,lines:Array.isArray(i.lines)?i.lines.filter(e=>e&&typeof e.text==`string`).map(e=>({text:e.text,time:Number.isFinite(e.time)?e.time:null})):[],source:typeof i.source==`string`?i.source:`LRCLIB`,message:typeof i.message==`string`?i.message:null,error:!!i.error}}var Z=`/assets/images/default-album-art.svg`,At=`saturate(0.6) brightness(0.85)`,jt=[{id:`playlists`,label:`Playlists`},{id:`artists`,label:`Artists`},{id:`albums`,label:`Albums`}],Mt=[`#b49cff`,`#7ee0d3`,`#ff8db3`,`#ffd166`,`#7cc4ff`,`#9ef07a`,`#ff9f6e`,`#f5f5f5`],Nt={note:`<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,guitar:`<path d="M12 8.5c-1.7 0-3 1.1-3.2 2.6-.1 1 .3 1.8.9 2.5-.8.5-1.7 1.3-2 2.3-.7 2.4 1.2 4.1 4.3 4.1s5-1.7 4.3-4.1c-.3-1-1.2-1.8-2-2.3.6-.7 1-1.5.9-2.5-.2-1.5-1.5-2.6-3.2-2.6z" fill="currentColor" stroke="none"/><circle cx="12" cy="12.3" r="1.05" fill="#000" stroke="none"/><path d="M11 3.5h2V9h-2z" fill="currentColor" stroke="none"/><path d="M10.4 2c0-.6.4-1 1-1h1.2c.6 0 1 .4 1 1v1.5h-3.2z" fill="currentColor" stroke="none"/><circle cx="10.2" cy="1.6" r=".7" fill="currentColor" stroke="none"/><circle cx="13.8" cy="1.6" r=".7" fill="currentColor" stroke="none"/>`,play:`<path d="M8 5.2c0-.8.9-1.3 1.6-.9l9.6 6.8c.6.4.6 1.4 0 1.8l-9.6 6.8c-.7.4-1.6-.1-1.6-.9z" fill="currentColor" stroke="none"/>`,pause:`<rect x="6.4" y="5" width="4.2" height="14" rx="1.4" fill="currentColor" stroke="none"/><rect x="13.4" y="5" width="4.2" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,previous:`<path d="M19 5.5v13L9.8 12z" fill="currentColor" stroke="none"/><rect x="5" y="5" width="2.8" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,next:`<path d="M5 5.5v13L14.2 12z" fill="currentColor" stroke="none"/><rect x="16.2" y="5" width="2.8" height="14" rx="1.4" fill="currentColor" stroke="none"/>`,shuffle:`<path d="m18 14 4 4-4 4"/><path d="m18 2 4 4-4 4"/><path d="M2 18h1.97a4 4 0 0 0 3.3-1.7l5.46-8.6a4 4 0 0 1 3.3-1.7H22"/><path d="M2 6h1.97a4 4 0 0 1 3.3 1.7l5.46 8.6a4 4 0 0 0 3.3 1.7H22"/>`,repeat:`<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/>`,repeatOne:`<path d="m17 2 4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="m7 22-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/><path d="M11 10h2v5"/>`,volumeHigh:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>`,volumeLow:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/>`,volumeMute:`<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m16 9 5 5"/><path d="m21 9-5 5"/>`,search:`<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>`,heart:`<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/>`,playlist:`<path d="M3 6h11"/><path d="M3 12h11"/><path d="M3 18h7"/><path d="M17 11v8"/><path d="M13 15h8"/>`,close:`<path d="m6 6 12 12"/><path d="m18 6-12 12"/>`,back:`<path d="m15 18-6-6 6-6"/>`,album:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="2.6"/>`,artist:`<circle cx="12" cy="8" r="3.4"/><path d="M5 20a7 7 0 0 1 14 0"/>`,more:`<circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/>`,queue:`<path d="M3 6h12"/><path d="M3 12h12"/><path d="M3 18h8"/><path d="M18 10v9"/><path d="M14 14h8"/>`,plus:`<path d="M12 5v14"/><path d="M5 12h14"/>`,grip:`<path d="M7 9h10"/><path d="M7 14h10"/><path d="M7 19h10"/>`,expand:`<path d="M8 3H5a2 2 0 0 0-2 2v3"/><path d="M16 3h3a2 2 0 0 1 2 2v3"/><path d="M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M16 21h3a2 2 0 0 0 2-2v-3"/>`,collapse:`<path d="M3 8h3a2 2 0 0 0 2-2V3"/><path d="M21 8h-3a2 2 0 0 1-2-2V3"/><path d="M3 16h3a2 2 0 0 1 2 2v3"/><path d="M21 16h-3a2 2 0 0 0-2 2v3"/>`,chevron:`<path d="m9 18 6-6-6-6"/>`,external:`<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>`,info:`<circle cx="12" cy="12" r="9"/><path d="M12 11v5"/><circle cx="12" cy="7.6" r="1" fill="currentColor" stroke="none"/>`,copy:`<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>`,trash:`<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M6 6l1 15h10l1-15"/><path d="M10 11v6"/><path d="M14 11v6"/>`,refresh:`<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 3v6h-6"/>`,lyrics:`<path d="M4 5h16"/><path d="M4 10h9"/><path d="M4 15h16"/><path d="M4 20h7"/>`,settings:`<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>`};function Q(e){return`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${Nt[e]}</svg>`}function $(e=``){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function Pt(e){return e instanceof HTMLElement&&(e.isContentEditable||[`INPUT`,`TEXTAREA`,`SELECT`,`BUTTON`,`A`].includes(e.tagName))}function Ft(e){return e instanceof HTMLElement&&(e.isContentEditable||[`INPUT`,`TEXTAREA`,`SELECT`].includes(e.tagName))}function It(e){let t=Array.isArray(e.artists)?e.artists.join(` `):``;return`${e.title} ${e.artist} ${t} ${e.album}`.toLowerCase()}function Lt(e,{store:t,audio:n,artwork:r}){let i=r??{urlFor:e=>e?.artwork??Z,resolve:()=>Promise.resolve(),subscribe:()=>()=>{}};e.innerHTML=`
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
            ${Q(`close`)}
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
          <span class="brand__mark">${Q(`guitar`)}</span>
          <span class="brand__name">Orpheus</span>
        </button>

        <form class="search" role="search" data-search-form>
          <div class="search__field">
            <span class="search__icon" aria-hidden="true">${Q(`search`)}</span>
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
            ${Q(`search`)}
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
            ${Q(`expand`)}
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
            ${Q(`settings`)}
          </button>

          <div class="settings" id="settings-panel" data-settings hidden>
            <p class="settings__title">Accent color</p>
            <p class="settings__hint">Choose a bright color for buttons and outlines.</p>
            <div class="settings__swatches" data-swatches>
              ${Mt.map(e=>`
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
                  ${ee.map(e=>`
                      <optgroup label="${e}">
                        ${x.filter(t=>t.group===e).map(e=>`<option value="${e.id}">${e.label}</option>`).join(``)}
                      </optgroup>
                    `).join(``)}
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
              <img src="${Z}" alt="" data-prev-artwork loading="lazy" />
            </button>
            <div class="artwork-frame">
              <img class="artwork-frame__image" data-artwork src="${Z}" alt="" />
            </div>
            <button
              class="cover-flow__side cover-flow__side--next"
              type="button"
              data-next-cover
              aria-label="Play next track"
            >
              <img src="${Z}" alt="" data-next-artwork loading="lazy" />
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
                ${Q(`heart`)}
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
                  ${Q(`playlist`)}
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
                ${Q(`shuffle`)}
              </button>
              <button class="control" type="button" data-previous aria-label="Previous track" title="Previous track">
                ${Q(`previous`)}
              </button>
              <button class="control control--play" type="button" data-toggle aria-label="Play" title="Play">
                ${Q(`play`)}
              </button>
              <button class="control" type="button" data-next aria-label="Next track" title="Next track">
                ${Q(`next`)}
              </button>
              <button class="control" type="button" data-repeat aria-label="Repeat: off" aria-pressed="false" title="Repeat: off">
                ${Q(`repeat`)}
              </button>
            </div>

            <div class="volume">
              <button class="volume__button" type="button" data-mute aria-label="Mute" title="Mute">
                ${Q(`volumeHigh`)}
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
                ${Q(`back`)}
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
            <img src="${Z}" alt="" data-context-art />
          </span>
          <span class="context-menu__meta">
            <span class="context-menu__title" data-context-title></span>
            <span class="context-menu__sub" data-context-sub></span>
          </span>
        </div>

        <button class="context-menu__item" type="button" role="menuitem" data-context-action="play">
          ${Q(`play`)}<span data-context-play-label>Play</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="play-next">
          ${Q(`next`)}<span>Play next</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="add-queue">
          ${Q(`queue`)}<span>Add to queue</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="like">
          ${Q(`heart`)}<span data-context-like-label>Like</span>
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
            ${Q(`playlist`)}<span>Add to playlist</span><span class="context-menu__chevron">${Q(`chevron`)}</span>
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
          ${Q(`artist`)}<span>Go to artist</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="go-album">
          ${Q(`album`)}<span>Go to album</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="track-info">
          ${Q(`info`)}<span>Track info</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="copy-info">
          ${Q(`copy`)}<span>Copy song info</span>
        </button>

        <div class="context-menu__sep" role="separator"></div>

        <button class="context-menu__item" type="button" role="menuitem" data-context-action="youtube">
          ${Q(`external`)}<span>Search YouTube</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="youtube-music">
          ${Q(`external`)}<span>Search YouTube Music</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="genius">
          ${Q(`lyrics`)}<span>Open Genius lyrics</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="spotify">
          ${Q(`external`)}<span>Search Spotify</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-context-action="apple">
          ${Q(`external`)}<span>Search Apple Music</span>
        </button>

        <div class="context-menu__sep" role="separator"></div>

        <button class="context-menu__item" type="button" role="menuitem" data-context-action="settings">
          ${Q(`settings`)}<span>Player settings</span>
        </button>
      </div>

      <div class="context-menu context-menu--compact" data-playlist-context-menu role="menu" hidden tabindex="-1">
        <div class="context-menu__head">
          <span class="context-menu__art context-menu__art--icon">${Q(`playlist`)}</span>
          <span class="context-menu__meta">
            <span class="context-menu__title" data-playlist-context-title></span>
            <span class="context-menu__sub" data-playlist-context-sub></span>
          </span>
        </div>
        <button class="context-menu__item" type="button" role="menuitem" data-playlist-context-action="play">
          ${Q(`play`)}<span>Play playlist</span>
        </button>
        <button class="context-menu__item" type="button" role="menuitem" data-playlist-context-action="add-songs">
          ${Q(`plus`)}<span>Add songs…</span>
        </button>
        <div class="context-menu__sep" role="separator" data-playlist-context-edit></div>
        <button class="context-menu__item" type="button" role="menuitem" data-playlist-context-action="rename">
          ${Q(`playlist`)}<span>Rename playlist</span>
        </button>
        <button
          class="context-menu__item context-menu__item--danger"
          type="button"
          role="menuitem"
          data-playlist-context-action="delete"
        >
          ${Q(`trash`)}<span>Delete playlist</span>
        </button>
      </div>

      <dialog class="info-dialog" data-info-dialog>
        <div class="info-dialog__head">
          <h2>Track info</h2>
          <button class="info-dialog__close" type="button" data-info-close aria-label="Close track info">
            ${Q(`close`)}
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
            ${Q(`close`)}
          </button>
        </div>
        <form class="picker__search" data-picker-form>
          ${Q(`search`)}
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
  `;let a=e.querySelector(`[data-player]`),o={artwork:e.querySelector(`[data-artwork]`),prevCover:e.querySelector(`[data-prev-cover]`),nextCover:e.querySelector(`[data-next-cover]`),coverFlow:e.querySelector(`[data-cover-flow]`),coverTransition:e.querySelector(`[data-cover-transition]`),prevArtwork:e.querySelector(`[data-prev-artwork]`),nextArtwork:e.querySelector(`[data-next-artwork]`),album:e.querySelector(`[data-album]`),title:e.querySelector(`[data-title]`),artist:e.querySelector(`[data-artist]`),progress:e.querySelector(`[data-progress]`),current:e.querySelector(`[data-current]`),duration:e.querySelector(`[data-duration]`),toggle:e.querySelector(`[data-toggle]`),previous:e.querySelector(`[data-previous]`),next:e.querySelector(`[data-next]`),shuffle:e.querySelector(`[data-shuffle]`),repeat:e.querySelector(`[data-repeat]`),mute:e.querySelector(`[data-mute]`),volume:e.querySelector(`[data-volume]`),volumeLabel:e.querySelector(`[data-volume-label]`),queue:e.querySelector(`[data-queue]`),queueSource:e.querySelector(`[data-queue-source]`),queueTitle:e.querySelector(`[data-queue-title]`),queueBack:e.querySelector(`[data-queue-back]`),queueClear:e.querySelector(`[data-queue-clear]`),queueTabs:[...e.querySelectorAll(`[data-queue-tab]`)],queueBadge:e.querySelector(`[data-queue-badge]`),count:e.querySelector(`[data-count]`),fullscreenToggle:e.querySelector(`[data-fullscreen-toggle]`),error:e.querySelector(`[data-error]`),settingsToggle:e.querySelector(`[data-settings-toggle]`),settings:e.querySelector(`[data-settings]`),swatches:[...e.querySelectorAll(`[data-accent-color]`)],colorModeToggle:e.querySelector(`[data-color-mode-toggle]`),motionToggle:e.querySelector(`[data-motion-toggle]`),fetchCovers:e.querySelector(`[data-fetch-covers]`),coverStatus:e.querySelector(`[data-cover-status]`),lyricsInputs:[...e.querySelectorAll(`[data-lyrics-setting]`)],lyricsValues:[...e.querySelectorAll(`[data-lyrics-value]`)],lyricsChoiceButtons:[...e.querySelectorAll(`[data-lyrics-choice] [data-value]`)],lyricsToggles:[...e.querySelectorAll(`[data-lyrics-toggle]`)],lyricsReset:e.querySelector(`[data-lyrics-reset]`),lyricsColorNote:e.querySelector(`[data-lyrics-color-note]`),lyrics:e.querySelector(`[data-lyrics]`),lyricsBody:e.querySelector(`[data-lyrics-body]`),lyricsLines:e.querySelector(`[data-lyrics-lines]`),lyricsStatus:e.querySelector(`[data-lyrics-status]`),lyricsFallback:e.querySelector(`[data-lyrics-fallback]`),lyricsGenius:e.querySelector(`[data-lyrics-genius]`),lyricsYoutube:e.querySelector(`[data-lyrics-youtube]`),contextMenu:e.querySelector(`[data-context-menu]`),contextArt:e.querySelector(`[data-context-art]`),contextTitle:e.querySelector(`[data-context-title]`),contextSub:e.querySelector(`[data-context-sub]`),contextPlayLabel:e.querySelector(`[data-context-play-label]`),contextLikeLabel:e.querySelector(`[data-context-like-label]`),contextSubmenu:e.querySelector(`[data-context-submenu="playlists"]`),contextPlaylists:e.querySelector(`[data-context-playlists]`),contextPlaylistList:e.querySelector(`[data-context-playlist-list]`),contextPlaylistForm:e.querySelector(`[data-context-playlist-form]`),contextPlaylistName:e.querySelector(`[data-context-playlist-name]`),playlistContextMenu:e.querySelector(`[data-playlist-context-menu]`),playlistContextTitle:e.querySelector(`[data-playlist-context-title]`),playlistContextSub:e.querySelector(`[data-playlist-context-sub]`),playlistContextEdit:e.querySelector(`[data-playlist-context-edit]`),picker:e.querySelector(`[data-picker]`),pickerTitle:e.querySelector(`[data-picker-title]`),pickerSub:e.querySelector(`[data-picker-sub]`),pickerForm:e.querySelector(`[data-picker-form]`),pickerSearch:e.querySelector(`[data-picker-search]`),pickerList:e.querySelector(`[data-picker-list]`),pickerClose:e.querySelector(`[data-picker-close]`),infoDialog:e.querySelector(`[data-info-dialog]`),infoBody:e.querySelector(`[data-info-body]`),infoClose:e.querySelector(`[data-info-close]`),toast:e.querySelector(`[data-toast]`),searchForm:e.querySelector(`[data-search-form]`),searchInput:e.querySelector(`[data-search]`),like:e.querySelector(`[data-like]`),playlistToggle:e.querySelector(`[data-playlist-toggle]`),playlistMenu:e.querySelector(`[data-playlist-menu]`),playlistList:e.querySelector(`[data-playlist-list]`),playlistForm:e.querySelector(`[data-playlist-form]`),playlistName:e.querySelector(`[data-playlist-name]`),sidebar:e.querySelector(`[data-sidebar]`),sidebarBackdrop:e.querySelector(`[data-sidebar-backdrop]`),sidebarToggle:e.querySelector(`[data-sidebar-toggle]`),sidebarClose:e.querySelector(`[data-sidebar-close]`),sidebarFilters:e.querySelector(`[data-sidebar-filters]`),sidebarList:e.querySelector(`[data-sidebar-list]`),sidebarCreateForm:e.querySelector(`[data-create-playlist-form]`),sidebarCreateName:e.querySelector(`[data-create-playlist-name]`),header:e.querySelector(`.player__header`)},s=!1,c=null,l=null,u=0,d=0,f=[],p=!1,m=``,h=!1,g=`playlists`,_=`upnext`,v=null,y=null,b=!1,S=null,C=null,w=null,T=null,E=!1,D=null,ne=0,O=null,k=null,A=-1,re=0,j=[],ie=null,M=null,N=null,P=null,F=new Map,ae=`IntersectionObserver`in window?new IntersectionObserver(e=>{e.forEach(e=>{if(!e.isIntersecting)return;ae.unobserve(e.target);let t=F.get(e.target.dataset.artTrack);t&&oe(t)})},{rootMargin:`300px`}):null;function I(e){return i.urlFor(e)??Z}function L(e,t,n){e&&(e.getAttribute(`src`)!==t&&(e.src=t),typeof n==`string`&&e.alt!==n&&(e.alt=n))}function oe(e){e&&!e.artwork&&i.resolve(e)}function se(e){e&&e.querySelectorAll(`img[data-art-track]`).forEach(e=>{if(e.dataset.artObserved===`1`)return;e.dataset.artObserved=`1`;let t=F.get(e.dataset.artTrack);t&&I(t)===Z&&(ae?ae.observe(e):oe(t))})}function ce(n){if(!n)return;let r=t.getState();if(r.currentTrack?.id===n.id&&(L(o.artwork,I(n),`${n.album} — album artwork`),le()),r.tracks.length>1){let e=r.tracks[(r.currentIndex-1+r.tracks.length)%r.tracks.length],t=r.tracks[(r.currentIndex+1)%r.tracks.length];e?.id===n.id&&L(o.prevArtwork,I(n),`${n.album} — previous track artwork`),t?.id===n.id&&L(o.nextArtwork,I(n),`${n.album} — next track artwork`)}e.querySelectorAll(`img[data-art-track]`).forEach(e=>{e.dataset.artTrack===n.id&&L(e,I(n),``)})}function le(){let e=t.getState();if(!e.dynamicColor){l=null;return}let n=e.currentTrack;if(!n)return;let r=I(n);if(!r||r===Z){t.setAlbumAccent(null);return}if(r===l)return;l=r;let i=++u;Ot(r).then(e=>{i===u&&t.getState().dynamicColor&&t.setAlbumAccent(e)})}function ue(e){let t=o.coverFlow.getBoundingClientRect(),n=e.getBoundingClientRect();return{left:n.left-t.left,top:n.top-t.top,width:n.width,height:n.height,centerX:n.left+n.width/2-t.left,centerY:n.top+n.height/2-t.top,src:e.getAttribute(`src`)??``,radius:e===o.artwork?16:12}}function de(){return!o.coverFlow||!o.artwork?.getAttribute(`src`)||o.prevCover.hidden||o.nextCover.hidden?null:{main:ue(o.artwork),previous:ue(o.prevArtwork),next:ue(o.nextArtwork)}}function fe(e,t,n,r){let i=document.createElement(`img`);return i.className=`cover-flow__clone`,i.src=e.src,i.alt=``,i.style.left=`${e.left}px`,i.style.top=`${e.top}px`,i.style.width=`${e.width}px`,i.style.height=`${e.height}px`,i.style.borderRadius=`${e.radius}px`,i.style.opacity=String(t),i.style.filter=n,i.style.zIndex=String(r),i}function pe(e,t){if(!t||!o.coverTransition||window.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;let n=e===`next`?t.next:t.previous,r=e===`next`?t.previous:t.next;if(!n.src||!r.src)return;let i=o.coverFlow,a=o.coverTransition,s=++d;f.forEach(e=>e.cancel()),f=[],a.replaceChildren(),i.classList.add(`is-carousel-moving`);let c=fe(t.main,1,`none`,1),l=fe(n,.42,At,2);a.append(c,l);let u=(e,t,n,r,i,a,o)=>{let s=n.width/t.width,c=n.height/t.height;return e.animate([{transform:`translate(0, 0) scale(1)`,borderRadius:`${t.radius}px`,opacity:r,filter:a},{transform:`translate(${n.centerX-t.centerX}px, ${n.centerY-t.centerY}px) scale(${s}, ${c})`,borderRadius:`${n.radius}px`,opacity:i,filter:o}],{duration:460,easing:`cubic-bezier(0.22, 0.9, 0.28, 1)`,fill:`both`})};f=[u(c,t.main,r,1,.42,`none`,At),u(l,n,t.main,.42,1,At,`none`)],Promise.all(f.map(e=>e.finished.catch(()=>{}))).then(()=>{s===d&&(a.replaceChildren(),i.classList.remove(`is-carousel-moving`),f=[])})}function R(e){let r=t.getState().currentTrack?.id??null,i=de();e===`next`?n.next():n.previous(),(t.getState().currentTrack?.id??null)!==r&&pe(e,i)}function me(){let e=t.getState(),n=e.currentTrack,r=!!(n&&e.likedIds.includes(n.id));o.like.classList.toggle(`is-active`,r),o.like.setAttribute(`aria-pressed`,String(r)),o.like.setAttribute(`aria-label`,r?`Unlike this song`:`Like this song`),o.like.setAttribute(`title`,r?`Unlike this song`:`Like this song`)}function he(e,t){let n=e.closest(`.range-shell`);n&&n.style.setProperty(`--value`,`${t}%`)}function ge(e){o.settings.hidden=!e,o.settingsToggle.setAttribute(`aria-expanded`,String(e))}function _e(e){o.playlistMenu.hidden=!e,o.playlistToggle.setAttribute(`aria-expanded`,String(e)),e&&De()}function ve(){let e=o.header.getBoundingClientRect().bottom;o.sidebar.style.top=`${Math.round(e)}px`}function z(e){if(h=e,e||(N=null,P=null,Y()),e){let e=t.getState().activeCollection?.type;e===`album`?g=`albums`:e===`artist`?g=`artists`:(e===`playlist`||e===`liked`)&&(g=`playlists`),ve(),U()}o.sidebar.classList.toggle(`is-open`,e),o.sidebarBackdrop.classList.toggle(`is-open`,e),o.sidebar.setAttribute(`aria-hidden`,String(!e)),o.sidebarToggle.setAttribute(`aria-expanded`,String(e))}function ye(){N!==null&&(N=null,P=null,h&&U())}function be(){let e=t.getState(),n=m.toLowerCase(),r=e.activeCollection,i=e=>It(e).includes(n),a=r?e.displayedTracks.filter(i):[],o=new Set(e.displayedTracks.map(e=>e.id)),s=r?e.library.filter(e=>!o.has(e.id)&&i(e)):e.library.filter(i);return{inCollection:!!r,collection:r,collectionName:r?.name??`All Songs`,collectionMatches:a,otherMatches:s}}function xe(e,{uid:n=null}={}){let r=t.getState().currentTrack?.id===e.id,i=`
      <button
        class="queue__item${r?` is-active`:``}"
        type="button"
        data-track-id="${$(e.id)}"
        aria-label="Play ${$(e.title)} by ${$(e.artist)}"
        ${r?`aria-current="true"`:``}
      >
        <span class="queue__art">
          <img
            src="${$(I(e))}"
            alt=""
            loading="lazy"
            data-art-track="${$(e.id)}"
          />
          <span class="queue__duration">${e.duration?gt(e.duration):``}</span>
          <span class="queue__equalizer" aria-hidden="true"><i></i><i></i><i></i></span>
        </span>
        <span class="queue__meta">
          <span class="queue__title">${$(e.title)}</span>
          <span class="queue__sub">${$(e.artist)}</span>
          <span class="queue__album">${$(e.album)}</span>
        </span>
      </button>
    `;return n?`
        <li class="queue__row queue__row--user" data-queue-uid="${$(n)}">
          <button
            class="queue__handle"
            type="button"
            draggable="true"
            data-queue-handle
            aria-label="Reorder ${$(e.title)}"
            title="Drag to reorder · use ↑ and ↓ keys"
          >${Q(`grip`)}</button>
          ${i}
          <button
            class="queue__remove"
            type="button"
            data-queue-remove="${$(n)}"
            aria-label="Remove ${$(e.title)} from the queue"
            title="Remove from queue"
          >${Q(`close`)}</button>
        </li>
      `:`
      <li class="queue__row">
        ${i}
        <button
          class="queue__more"
          type="button"
          data-track-menu="${$(e.id)}"
          aria-label="Options for ${$(e.title)}"
          title="Song options"
        >${Q(`more`)}</button>
      </li>
    `}function Se(e){return`<li class="queue__section">${$(e)}</li>`}function B(e){return`<li class="queue__noresult">${$(e)}</li>`}function Ce(){let e=t.getState().currentTrack?.id??null;j.forEach(t=>{let n=t.dataset.trackId===e;t.classList.toggle(`is-active`,n),n?t.setAttribute(`aria-current`,`true`):t.removeAttribute(`aria-current`)})}function V(e){return e?e.type===`album`?`Album · ${e.name}`:e.type===`artist`?`Artist · ${e.name}`:e.name:`All Songs`}function we(e){let{activeCollection:t,playbackCollection:n}=e;return!t&&!n?!0:!t||!n?!1:t.type===n.type&&t.id===n.id}function Te(){let e=t.getState(),n=we(e);if(o.queueTabs.forEach(e=>{let t=e.dataset.queueTab===_;e.classList.toggle(`is-active`,t),e.setAttribute(`aria-selected`,String(t))}),o.queueBadge.textContent=String(e.userQueue.length),o.queueBadge.classList.toggle(`is-empty`,e.userQueue.length===0),o.queueClear.hidden=_!==`user`||e.userQueue.length===0,_===`user`){o.queueSource.textContent=`Your queue`,o.queueTitle.textContent=`Play queue`;let t=e.userQueue.length;o.count.textContent=`${t} ${t===1?`track`:`tracks`}`;return}if(o.queueSource.textContent=V(e.activeCollection),o.queueTitle.textContent=m?`Search results`:n?`Up next`:`Browsing`,m){let{collectionMatches:e,otherMatches:t}=be(),n=e.length+t.length;o.count.textContent=`${n} ${n===1?`result`:`results`}`;return}let r=e.displayedTracks.length;o.count.textContent=`${r} ${r===1?`track`:`tracks`}`}function Ee(){let e=t.getState(),n=``;if(n=e.userQueue.length?e.userQueue.map(e=>{let t=F.get(e.trackId);return t?xe(t,{uid:e.uid}):``}).join(``):B(`Your queue is empty. Right-click any song (or use its options button) and choose “Add to queue”.`),o.queue.innerHTML=n,j=[...o.queue.querySelectorAll(`.queue__item`)],Ce(),Te(),se(o.queue),v){let e=v;v=null;let t=o.queue.querySelector(`.queue__row[data-queue-uid="${e}"] [data-queue-handle]`);t&&t.focus()}}function H(){let e=t.getState(),n=``;if(_===`user`)Ee();else{if(m){let{inCollection:e,collection:t,collectionName:r,collectionMatches:i,otherMatches:a}=be(),o=i.length+a.length;if(e){let e=t?.type===`playlist`?`this playlist`:t?.type===`album`?`this album`:t?.type===`liked`?`Liked Songs`:`this artist`;n+=Se(r||`This collection`),n+=i.length?i.map(xe).join(``):B(`No song found in ${e}.`)}n+=Se(`All Songs`),n+=a.length?a.map(xe).join(``):B(o===0?`No song found.`:`No other songs match.`),n+=`
        <li class="queue__search-hint">
          Press <kbd>Shift</kbd> + <kbd>Enter</kbd> to search YouTube
        </li>
      `}else n=e.displayedTracks.length?e.displayedTracks.map(xe).join(``):e.libraryError?B(e.libraryError):e.libraryMessage?B(e.libraryMessage):B(e.activeCollection?e.activeCollection.type===`liked`?`No liked songs yet. Tap the heart on a song to add it here.`:e.activeCollection.type===`album`?`This album is empty.`:e.activeCollection.type===`artist`?`This artist has no songs.`:`This playlist is empty. Add songs with the playlist button below.`:`No songs in your library yet.`);o.queue.innerHTML=n,j=[...o.queue.querySelectorAll(`.queue__item`)],Ce(),Te(),se(o.queue)}}function U(){let e=t.getState(),n=e.activeCollection;o.sidebarFilters.innerHTML=jt.map(e=>`
        <button
          class="sidebar__filter${g===e.id?` is-active`:``}"
          type="button"
          role="tab"
          aria-selected="${g===e.id}"
          data-sidebar-filter="${e.id}"
        >${e.label}</button>
      `).join(``),o.sidebarCreateForm.hidden=g!==`playlists`;let r=t=>{let n=t?.[0];return n?e.library.find(e=>e.id===n)??null:null},i=({type:e,id:t,name:r,subtitle:i,count:a,track:o,iconName:s=`note`,round:c=!1})=>{let l=e===`library`?!n:n?.type===e&&n.id===t,u=o?`<img
            src="${$(I(o))}"
            alt=""
            loading="lazy"
            data-art-track="${$(o.id)}"
          />`:Q(s);return`
        <button
          class="sidebar__item${l?` is-active`:``}"
          type="button"
          data-collection-type="${$(e)}"
          data-collection-id="${$(t)}"
          ${l?`aria-current="true"`:``}
        >
          <span class="sidebar__item-art${c?` sidebar__item-art--round`:``}">${u}</span>
          <span class="sidebar__item-meta">
            <span class="sidebar__item-name">${$(r)}</span>
            <span class="sidebar__item-sub">${$(i)}</span>
          </span>
          <span class="sidebar__item-count">${a}</span>
        </button>
      `},a=e=>{let t=N===e.id,n=t&&P===e.id,a=e.trackIds.length;return`
        <div class="sidebar__row${t?` is-menu-open`:``}">
          <div class="sidebar__row-main">
            ${i({type:`playlist`,id:e.id,name:e.name,subtitle:`Playlist · ${a} ${a===1?`song`:`songs`}`,count:a,track:r(e.trackIds),iconName:`playlist`})}
            <button
              class="sidebar__more${t?` is-active`:``}"
              type="button"
              data-playlist-menu-toggle="${$(e.id)}"
              aria-label="Options for ${$(e.name)}"
              aria-expanded="${String(t)}"
              title="Playlist options"
            >${Q(`more`)}</button>
          </div>
          <div
            class="sidebar__actions"
            data-playlist-actions="${$(e.id)}"
            ${t?``:`hidden`}
          >
            ${n?`
                  <form
                    class="sidebar__rename"
                    data-playlist-rename-form
                    data-playlist-id="${$(e.id)}"
                  >
                    <input
                      class="sidebar__rename-input"
                      type="text"
                      maxlength="40"
                      value="${$(e.name)}"
                      aria-label="Playlist name"
                      autocomplete="off"
                      data-playlist-rename-input
                    />
                    <button class="sidebar__rename-save" type="submit" data-playlist-rename-save>Save</button>
                  </form>
                `:`
                  <button
                    class="sidebar__action"
                    type="button"
                    data-playlist-action="rename"
                    data-playlist-id="${$(e.id)}"
                  >Rename</button>
                  <button
                    class="sidebar__action sidebar__action--danger"
                    type="button"
                    data-playlist-action="delete"
                    data-playlist-id="${$(e.id)}"
                  >Delete</button>
                `}
          </div>
        </div>
      `},s=e=>{let t=e.trackIds.length;return i({type:`playlist`,id:e.id,name:e.name,subtitle:`Playlist folder · ${t} ${t===1?`song`:`songs`}`,count:t,track:r(e.trackIds),iconName:`playlist`})},c=``;if(g===`playlists`){let t=e.library.filter(t=>e.likedIds.includes(t.id));c+=i({type:`library`,id:``,name:`All Songs`,subtitle:`Your whole library`,count:e.library.length,iconName:`note`}),c+=i({type:`liked`,id:`liked`,name:`Liked Songs`,subtitle:`Liked · ${t.length} ${t.length===1?`song`:`songs`}`,count:t.length,track:t[0]??null,iconName:`heart`}),e.playlists.length&&(c+=e.playlists.map(a).join(``)),e.folderPlaylists.length&&(c+=e.folderPlaylists.map(s).join(``)),!e.playlists.length&&!e.folderPlaylists.length&&(c+=`<p class="sidebar__empty">No playlists yet. Create one below.</p>`)}else c+=g===`artists`?e.artists.length?e.artists.map(e=>i({type:`artist`,id:e.id,name:e.name,subtitle:`Artist · ${e.trackIds.length} ${e.trackIds.length===1?`song`:`songs`}`,count:e.trackIds.length,track:r(e.trackIds),iconName:`artist`,round:!0})).join(``):`<p class="sidebar__empty">No artists in your library yet.</p>`:e.albums.length?e.albums.map(e=>i({type:`album`,id:e.id,name:e.name,subtitle:`Album · ${e.artist}`,count:e.trackIds.length,track:r(e.trackIds),iconName:`album`})).join(``):`<p class="sidebar__empty">No albums in your library yet.</p>`;o.sidebarList.innerHTML=c,se(o.sidebarList)}function De(){let e=t.getState(),n=e.currentTrack;e.playlists.length?o.playlistList.innerHTML=e.playlists.map(e=>{let t=!!(n&&e.trackIds.includes(n.id));return`
          <button
            class="playlist-item${t?` is-added`:``}"
            type="button"
            data-playlist-id="${$(e.id)}"
          >
            <span class="playlist-item__name">${$(e.name)}</span>
            <span class="playlist-item__meta">${t?`Added`:`${e.trackIds.length}`}</span>
          </button>
        `}).join(``):o.playlistList.innerHTML=`<p class="playlist-menu__empty">No playlists yet. Create one below.</p>`}function Oe(e){m=e.trim(),m&&(_=`upnext`),H()}function ke(){o.searchInput.value=``,m=``,H()}function Ae(){let e=o.searchInput.value.trim();if(!e)return;let t=`https://www.youtube.com/results?search_query=${encodeURIComponent(e)}`;window.open(t,`_blank`,`noopener,noreferrer`)}function je(e){t.playTrack(e)&&n.play()}function Me(){if(!m)return;let{collectionMatches:e,otherMatches:t}=be(),n=e[0]??t[0];n&&je(n.id)}let Ne=te(`sans`);function Pe(e,t){return e===`lyricsFontSize`?`${Math.round(t)} px`:e===`lyricsWidth`?`${Math.round(t)}%`:e===`lyricsLineHeight`?Number(t).toFixed(2):e===`lyricsOffset`?`${t>0?`+`:``}${Number(t).toFixed(1)} s`:e===`lyricsBackground`?`${Math.round(t*100)}%`:String(t)}function Fe(e){a.style.setProperty(`--lyrics-size`,`${e.lyricsFontSize}px`),a.style.setProperty(`--lyrics-color`,e.lyricsFollowAccent?`var(--accent)`:e.lyricsColor),a.style.setProperty(`--lyrics-align`,e.lyricsAlignment),a.style.setProperty(`--lyrics-weight`,String(e.lyricsWeight)),a.style.setProperty(`--lyrics-style`,e.lyricsStyle),a.style.setProperty(`--lyrics-font`,x.some(t=>t.id===e.lyricsFont)?te(e.lyricsFont):Ne),a.style.setProperty(`--lyrics-ratio`,String(e.lyricsWidth/100)),a.style.setProperty(`--lyrics-line-height`,String(e.lyricsLineHeight)),a.style.setProperty(`--lyrics-shade`,String(e.lyricsBackground)),a.style.setProperty(`--lyrics-transform`,e.lyricsUppercase?`uppercase`:`none`),a.classList.toggle(`lyrics-dim`,e.lyricsDim),a.classList.toggle(`lyrics-glow`,e.lyricsGlow)}function Ie(e){o.lyricsInputs.forEach(t=>{let n=e[t.dataset.lyricsSetting];t.type===`color`?(t.value=n,t.disabled=!!e.lyricsFollowAccent):t.value=String(n)}),o.lyricsColorNote.textContent=e.lyricsFollowAccent?`Following accent`:`Custom`,o.lyricsColorNote.classList.toggle(`is-dynamic`,e.lyricsFollowAccent),o.lyricsValues.forEach(t=>{let n=t.dataset.lyricsValue;t.textContent=Pe(n,e[n])}),o.lyricsChoiceButtons.forEach(t=>{let n=t.closest(`[data-lyrics-choice]`)?.dataset.lyricsChoice,r=n?e[n]===t.dataset.value:!1;t.classList.toggle(`is-selected`,r),t.setAttribute(`aria-pressed`,String(r))}),o.lyricsToggles.forEach(t=>{let n=!!e[t.dataset.lyricsToggle];t.setAttribute(`aria-checked`,String(n))})}function W(e){o.lyricsStatus.textContent=e??``,o.lyricsStatus.hidden=!e}function G(){let e=o.lyricsLines.querySelector(`.lyrics__line.is-active`);if(!e)return;let t=o.lyricsLines,n=t.getBoundingClientRect(),r=e.getBoundingClientRect(),i=r.top-n.top-t.clientHeight/2+r.height/2,a=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;t.scrollBy({top:i,behavior:a?`auto`:`smooth`})}function Le(e,{force:n=!1}={}){if(!k?.data?.synced||!o.lyricsLines.childElementCount)return;let r=t.getState(),i=k.data.lines,a=e+r.lyricsOffset,s=-1;for(let e=0;e<i.length&&i[e].time!==null&&i[e].time<=a;e+=1)s=e;if(s===A)return;let c=o.lyricsLines.querySelectorAll(`.lyrics__line`);c[A]&&c[A].classList.remove(`is-active`),c[s]&&c[s].classList.add(`is-active`),A=s,s!==-1&&(n||Date.now()>=re)&&G()}function Re(e){A=-1,o.lyricsLines.replaceChildren(),o.lyricsFallback.hidden=!0,o.lyricsLines.classList.toggle(`is-synced`,!!e?.synced),e?e.found&&e.lines.length?(W(e.synced?``:`Unsynced lyrics${e.source&&e.source!==`LRCLIB`?` from ${e.source}`:``}.`),o.lyricsLines.innerHTML=e.lines.map((e,t)=>`
            <p
              class="lyrics__line"
              data-lyric-index="${t}"
              ${e.time===null?``:`data-lyric-time="${e.time}"`}
            >${$(e.text||`♪`)}</p>
          `).join(``),Le(t.getState().currentTime,{force:!0})):(W(e.instrumental?e.message||`This track is instrumental.`:e.message||`No synced lyrics for this song.`),o.lyricsFallback.hidden=!1):W(`Press F to open fullscreen lyrics.`)}async function ze(e=t.getState().currentTrack,{force:n=!1}={}){if(!e){D=null,k=null,Re(null),W(`Play a song to see its lyrics.`);return}if(!n&&e.id===D&&k){Re(k.data??null);return}O?.abort(),O=new AbortController,D=e.id,k=null;let r=++ne;o.lyricsLines.replaceChildren(),o.lyricsFallback.hidden=!0,W(`Looking up lyrics…`);try{let n=await kt(e.id,{signal:O.signal});if(r!==ne||t.getState().currentTrack?.id!==e.id)return;k={data:n},Re(n)}catch(e){if(e?.name===`AbortError`||r!==ne)return;k=null,W(`Could not load lyrics. Check your connection and try again.`),o.lyricsFallback.hidden=!1}}function Be(){if(document.fullscreenElement)return;let e=document.documentElement;typeof e.requestFullscreen==`function`&&e.requestFullscreen({navigationUI:`hide`}).catch(()=>{})}function Ve(){document.fullscreenElement&&typeof document.exitFullscreen==`function`&&document.exitFullscreen().catch(()=>{})}function He(e,{exitBrowser:t=!0}={}){E===e?e&&ze():(E=e,a.classList.toggle(`is-fullscreen`,e),a.setAttribute(`data-fullscreen`,String(e)),o.fullscreenToggle.innerHTML=Q(e?`collapse`:`expand`),o.fullscreenToggle.setAttribute(`aria-pressed`,String(e)),o.fullscreenToggle.setAttribute(`aria-label`,e?`Exit fullscreen`:`Enter fullscreen`),o.fullscreenToggle.title=e?`Exit fullscreen (Esc)`:`Fullscreen (F)`,e?(Be(),ze()):(O?.abort(),O=null,D=null,k=null,A=-1,t&&Ve()))}function Ue(){He(!E)}function K(e){e&&(window.clearTimeout(T),o.toast.textContent=e,o.toast.hidden=!1,o.toast.classList.add(`is-visible`),T=window.setTimeout(()=>{o.toast.classList.remove(`is-visible`),o.toast.hidden=!0},2400))}async function We(e){try{return await navigator.clipboard.writeText(e),!0}catch{try{let t=document.createElement(`textarea`);t.value=e,t.setAttribute(`readonly`,``),t.style.position=`fixed`,t.style.opacity=`0`,document.body.append(t),t.select();let n=document.execCommand(`copy`);return t.remove(),n}catch{return!1}}}function Ge(e){let n=t.getState(),r=e.albumArtist||e.artist;return n.albums.find(t=>t.name===e.album&&t.artist===r)??n.albums.find(t=>t.name===e.album)??null}function Ke(e){let n=t.getState(),r=Array.isArray(e.artists)&&e.artists.length?e.artists:[e.artist];return n.artists.find(e=>r.includes(e.name))??n.artists.find(t=>t.name===e.artist)??null}function qe(e,t){let n=`${t.artist} ${t.title}`;return e===`youtube`?`https://www.youtube.com/results?search_query=${encodeURIComponent(`${n} music video`)}`:e===`youtube-music`?`https://music.youtube.com/search?q=${encodeURIComponent(n)}`:e===`genius`?`https://genius.com/search?q=${encodeURIComponent(n)}`:e===`spotify`?`https://open.spotify.com/search/${encodeURIComponent(n)}`:e===`apple`?`https://music.apple.com/us/search?term=${encodeURIComponent(n)}`:null}function Je(e){e&&window.open(e,`_blank`,`noopener,noreferrer`)}function Ye(){o.contextPlaylists.hidden=!0,o.contextPlaylists.classList.remove(`is-flipped`),o.contextSubmenu.setAttribute(`aria-expanded`,`false`)}function q(){let e=t.getState();e.playlists.length?o.contextPlaylistList.innerHTML=e.playlists.map(e=>{let t=e.trackIds.includes(S);return`
          <button
            class="context-menu__playlist${t?` is-added`:``}"
            type="button"
            role="menuitemcheckbox"
            aria-checked="${String(t)}"
            data-context-playlist-id="${$(e.id)}"
          >
            <span>${$(e.name)}</span>
            <span>${t?`Added`:e.trackIds.length}</span>
          </button>
        `}).join(``):o.contextPlaylistList.innerHTML=`<p class="context-menu__empty">No playlists yet. Create one below.</p>`}function Xe(e,n,r){let i=F.get(e);if(!i)return;Y();let a=t.getState();S=e;let s=a.currentTrack?.id===e,c=a.likedIds.includes(e);o.contextArt.src=I(i),o.contextArt.alt=``,o.contextTitle.textContent=i.title,o.contextSub.textContent=`${i.artist} · ${i.album}`,o.contextPlayLabel.textContent=s?a.isPlaying?`Pause`:`Resume`:`Play`,o.contextLikeLabel.textContent=c?`Unlike`:`Like`,o.contextMenu.querySelector(`[data-context-action="like"]`)?.classList.toggle(`is-active`,c),q(),Ye(),o.contextMenu.hidden=!1,o.contextMenu.classList.add(`is-open`);let l=o.contextMenu.getBoundingClientRect(),u=Math.min(Math.max(n,10),window.innerWidth-l.width-10),d=Math.min(Math.max(r,10),window.innerHeight-l.height-10);o.contextMenu.style.left=`${Math.round(u)}px`,o.contextMenu.style.top=`${Math.round(d)}px`,o.contextMenu.focus({preventScroll:!0})}function J(){o.contextMenu.hidden||(o.contextMenu.hidden=!0,o.contextMenu.classList.remove(`is-open`),S=null,Ye())}function Ze(){o.contextPlaylists.hidden=!1,o.contextSubmenu.setAttribute(`aria-expanded`,`true`),o.contextPlaylists.style.left=`0px`,o.contextPlaylists.style.top=`0px`;let e=o.contextSubmenu.getBoundingClientRect(),t=o.contextPlaylists.getBoundingClientRect(),n=e.right+6;n+t.width>window.innerWidth-10&&(n=e.left-t.width-6),n=Math.max(10,Math.min(n,window.innerWidth-t.width-10));let r=Math.max(10,Math.min(e.top-6,window.innerHeight-t.height-10));o.contextPlaylists.style.left=`${Math.round(n)}px`,o.contextPlaylists.style.top=`${Math.round(r)}px`}function Y(){o.playlistContextMenu.hidden||(o.playlistContextMenu.hidden=!0,C=null)}function Qe(e,n,r){let i=t.getState(),a=i.playlists.find(t=>t.id===e),s=i.folderPlaylists.find(t=>t.id===e),c=a??s;if(!c)return;C=e;let l=c.trackIds.length;o.playlistContextTitle.textContent=c.name,o.playlistContextSub.textContent=`${l} ${l===1?`song`:`songs`}${a?``:` · folder`}`;let u=!!a;o.playlistContextMenu.querySelectorAll(`[data-playlist-context-action="add-songs"], [data-playlist-context-action="rename"], [data-playlist-context-action="delete"]`).forEach(e=>{e.hidden=!u}),o.playlistContextEdit.hidden=!u,J(),o.playlistContextMenu.hidden=!1;let d=o.playlistContextMenu.getBoundingClientRect(),f=Math.min(Math.max(n,10),window.innerWidth-d.width-10),p=Math.min(Math.max(r,10),window.innerHeight-d.height-10);o.playlistContextMenu.style.left=`${Math.round(f)}px`,o.playlistContextMenu.style.top=`${Math.round(p)}px`,o.playlistContextMenu.focus({preventScroll:!0})}function $e(){let e=t.getState(),n=e.playlists.find(e=>e.id===w)??null,r=o.pickerSearch.value.trim().toLowerCase();return{playlist:n,query:r,results:r?e.library.filter(e=>It(e).includes(r)):e.library}}function et(){let{playlist:e,query:t,results:n}=$e();if(!e)return;o.pickerTitle.textContent=e.name;let r=e.trackIds.length;o.pickerSub.textContent=`${r} ${r===1?`song`:`songs`}${t?` · ${n.length} ${n.length===1?`match`:`matches`}`:``}`,n.length?(o.pickerList.innerHTML=n.map(t=>{let n=e.trackIds.includes(t.id);return`
          <button
            class="picker__item${n?` is-added`:``}"
            type="button"
            data-picker-track-id="${$(t.id)}"
          >
            <span class="picker__art">
              <img src="${$(I(t))}" alt="" loading="lazy" data-art-track="${$(t.id)}" />
            </span>
            <span class="picker__meta">
              <span class="picker__name">${$(t.title)}</span>
              <span class="picker__artist">${$(t.artist)} · ${$(t.album)}</span>
            </span>
            <span class="picker__state">${n?`Added`:`Add`}</span>
          </button>
        `}).join(``),se(o.pickerList)):o.pickerList.innerHTML=`<p class="picker__empty">No songs match “${$(o.pickerSearch.value.trim())}”.</p>`}function tt(e){t.getState().playlists.find(t=>t.id===e)&&(w=e,o.pickerSearch.value=``,et(),typeof o.picker.showModal==`function`?o.picker.showModal():o.picker.setAttribute(`open`,``),o.pickerSearch.focus())}function nt(){o.picker.open&&typeof o.picker.close==`function`?o.picker.close():o.picker.removeAttribute(`open`),w=null}function rt(){let{playlist:e,results:n}=$e();if(!e||!n.length){K(`No songs match that search`);return}let r=n.find(t=>!e.trackIds.includes(t.id));r?(t.toggleTrackInPlaylist(e.id,r.id),et(),K(`Added “${r.title}” to “${e.name}”`)):K(`Every match is already in this playlist`)}function it(e){let n=t.getState().likedIds.includes(e.id),r=[[`Artist`,e.artist],[`Album`,e.album],[`Album artist`,e.albumArtist],[`Year`,e.year??`—`],[`Duration`,e.duration?gt(e.duration):`—`],[`Track`,e.trackNumber?`${e.discNumber?`${e.discNumber}.`:``}${e.trackNumber}`:`—`],[`Folder`,e.folder||`—`],[`Liked`,n?`Yes`:`No`]];o.infoBody.innerHTML=`
      <div class="info-dialog__hero">
        <img src="${$(I(e))}" alt="" data-art-track="${$(e.id)}" />
        <div>
          <p class="info-dialog__album">${$(e.album)}</p>
          <h3>${$(e.title)}</h3>
          <p class="info-dialog__artist">${$(e.artist)}</p>
        </div>
      </div>
      <dl class="info-dialog__list">
        ${r.map(([e,t])=>`<div><dt>${$(e)}</dt><dd>${$(String(t??`—`))}</dd></div>`).join(``)}
      </dl>
    `,typeof o.infoDialog.showModal==`function`?o.infoDialog.showModal():o.infoDialog.setAttribute(`open`,``),se(o.infoBody)}function at(e){let r=F.get(S);if(!r){J();return}let i=t.getState();switch(e){case`play`:J(),i.currentTrack?.id===r.id?n.toggle():(je(r.id),n.play());break;case`play-next`:t.addToQueue(r.id,{next:!0}),J(),K(`“${r.title}” will play next`);break;case`add-queue`:t.addToQueue(r.id),J(),K(`Added “${r.title}” to your queue`);break;case`like`:{let e=t.toggleLike(r.id);J(),K(e?`Added to Liked Songs`:`Removed from Liked Songs`);break}case`go-artist`:{let e=Ke(r);if(J(),!e){K(`This artist is not in your library.`);break}ke(),g=`artists`,z(!0),t.selectArtist(e.id),U();break}case`go-album`:{let e=Ge(r);if(J(),!e){K(`This album is not in your library.`);break}ke(),g=`albums`,z(!0),t.selectAlbum(e.id),U();break}case`track-info`:J(),it(r);break;case`settings`:J(),ge(!0);break;case`copy-info`:J(),We(`${r.title} — ${r.artist}\n${r.album}`).then(e=>{K(e?`Song info copied`:`Could not copy song info`)});break;default:{let t=qe(e,r);J(),Je(t);break}}}function ot(e){let{tracks:t,currentIndex:n,currentTrack:r,currentTime:i,duration:l,isPlaying:u,volume:d,muted:f,shuffle:p,repeat:m,accent:v,albumAccent:y,movingBackground:b,dynamicColor:ee,error:x,canGoBack:S}=e;F=new Map,e.library.forEach(e=>F.set(e.id,e)),e.tracks.forEach(e=>F.set(e.id,e)),e.displayedTracks.forEach(e=>F.set(e.id,e));let C=ee&&y?y:v;C!==c&&(document.documentElement.style.setProperty(`--accent`,C),c=C),o.swatches.forEach(e=>{let t=!ee&&e.dataset.accentColor.toLowerCase()===v.toLowerCase();e.classList.toggle(`is-selected`,t),e.setAttribute(`aria-pressed`,String(t))}),Fe(e),Ie(e),r?(L(o.artwork,I(r),`${r.album} — album artwork`),oe(r),o.album.textContent=r.album,o.title.textContent=r.title,o.artist.textContent=r.artist,document.title=`${r.title} — ${r.artist} · Orpheus`):(L(o.artwork,Z,``),o.album.textContent=``,o.title.textContent=`No track selected`,o.artist.textContent=``,document.title=`Orpheus`),le();let te=t.length>1;if(o.prevCover.hidden=!te,o.nextCover.hidden=!te,te){let e=t[(n-1+t.length)%t.length],r=t[(n+1)%t.length];L(o.prevArtwork,I(e),`${e.album} — previous track artwork`),L(o.nextArtwork,I(r),`${r.album} — next track artwork`),oe(e),oe(r),o.prevCover.setAttribute(`aria-label`,`Play previous track: ${e.title}`),o.nextCover.setAttribute(`aria-label`,`Play next track: ${r.title}`)}let w=l>0?l:100;o.progress.max=String(w),s||(o.progress.value=String(Math.min(i,w))),he(o.progress,l>0?i/l*100:0),o.current.textContent=gt(i),o.duration.textContent=gt(l),o.toggle.innerHTML=Q(u?`pause`:`play`),o.toggle.setAttribute(`aria-label`,u?`Pause`:`Play`),o.toggle.setAttribute(`title`,u?`Pause`:`Play`),a.classList.toggle(`is-playing`,u),a.classList.toggle(`is-moving-background`,b),a.classList.toggle(`has-album-colors`,ee),o.colorModeToggle.setAttribute(`aria-checked`,String(ee)),o.colorModeToggle.setAttribute(`aria-label`,`Album colors: ${ee?`on`:`off`}`),o.motionToggle.setAttribute(`aria-checked`,String(b)),o.motionToggle.setAttribute(`aria-label`,`Moving background: ${b?`on`:`off`}`),o.shuffle.classList.toggle(`is-active`,p),o.shuffle.setAttribute(`aria-pressed`,String(p));let T={off:`off`,all:`all`,one:`one`};o.repeat.innerHTML=Q(m===`one`?`repeatOne`:`repeat`),o.repeat.classList.toggle(`is-active`,m!==`off`),o.repeat.setAttribute(`aria-pressed`,String(m!==`off`)),o.repeat.setAttribute(`aria-label`,`Repeat: ${T[m]}`),o.repeat.setAttribute(`title`,`Repeat: ${T[m]}`);let ne=!f&&d>0?d<.5?`volumeLow`:`volumeHigh`:`volumeMute`;o.mute.innerHTML=Q(ne),o.mute.setAttribute(`aria-label`,f?`Unmute`:`Mute`),o.mute.setAttribute(`title`,f?`Unmute`:`Mute`),o.volume.value=String(d),he(o.volume,d*100),o.volumeLabel.textContent=f?`Muted`:`${Math.round(d*100)}%`;let O=e.activeCollection?`${e.activeCollection.type}:${e.activeCollection.id}:${e.activeCollection.name}`:`library`,k=we(e)?`active`:`browsing`,A=`${_}|${O}|${k}|${e.displayedTracks.map(e=>e.id).join(`,`)}|${e.userQueue.map(e=>`${e.uid}:${e.trackId}`).join(`,`)}`;A===ie?(Ce(),Te()):(ie=A,H()),o.queueBack.hidden=_===`user`||!S;let re=`${g}|${O}|${e.playlists.map(e=>`${e.id}:${e.name}:${e.trackIds.join(`,`)}`).join(`|`)}|${e.folderPlaylists.map(e=>`${e.id}:${e.name}:${e.trackIds.join(`,`)}`).join(`|`)}|${e.albums.map(e=>e.id).join(`,`)}|${e.artists.map(e=>e.id).join(`,`)}|${e.likedIds.join(`,`)}|${e.library.length}`;re!==M&&(M=re,h&&U()),me(),o.playlistMenu.hidden||De(),o.error.hidden=!x,o.error.textContent=x??``,E&&(r&&r.id!==D&&ze(r),Le(i))}async function st(){if(p)return;p=!0,o.fetchCovers.disabled=!0,o.coverStatus.textContent=`Looking up missing playlist covers…`;let e=null;e=window.setInterval(async()=>{try{let e=await ht();if(!e.total)return;let t=`${e.processed} of ${e.total}`;o.coverStatus.textContent=e.running?`Fetching covers… ${t}`:`Fetching covers… ${t} · finishing up…`}catch{}},1200);let t=!1;try{let e=await mt(),n=[];if(e.fetched&&n.push(`${e.fetched} cover${e.fetched===1?``:`s`} fetched`),e.linked&&n.push(`${e.linked} matched an existing album cover`),e.skipped&&n.push(`${e.skipped} already cached`),e.missing&&n.push(`${e.missing} not found`),e.failed&&n.push(`${e.failed} failed`),o.coverStatus.textContent=e.message||(n.length?n.join(` · `):`No playlist covers were missing.`),e.fetched>0||e.linked>0){t=!0,o.coverStatus.textContent+=` Reloading…`,window.setTimeout(()=>window.location.reload(),900);return}}catch(e){o.coverStatus.textContent=e instanceof Error?e.message:`Could not fetch playlist covers.`}finally{e!==null&&window.clearInterval(e),t||(p=!1,o.fetchCovers.disabled=!1)}}o.toggle.addEventListener(`click`,()=>n.toggle()),o.previous.addEventListener(`click`,()=>R(`previous`)),o.next.addEventListener(`click`,()=>R(`next`)),o.prevCover.addEventListener(`click`,()=>R(`previous`)),o.nextCover.addEventListener(`click`,()=>R(`next`)),o.fullscreenToggle.addEventListener(`click`,()=>Ue()),a.addEventListener(`dragstart`,e=>{e.target instanceof HTMLImageElement&&e.preventDefault()}),o.shuffle.addEventListener(`click`,()=>t.toggleShuffle()),o.repeat.addEventListener(`click`,()=>t.cycleRepeat()),o.mute.addEventListener(`click`,()=>t.toggleMute()),o.volume.addEventListener(`input`,e=>t.setVolume(Number(e.target.value))),o.like.addEventListener(`click`,()=>{let e=t.getState().currentTrack;e&&t.toggleLike(e.id)}),o.settingsToggle.addEventListener(`click`,()=>{ge(o.settings.hidden)}),o.motionToggle.addEventListener(`click`,()=>t.toggleMovingBackground()),o.colorModeToggle.addEventListener(`click`,()=>t.toggleDynamicColor()),o.fetchCovers.addEventListener(`click`,()=>st());let ct=e=>{let n=e.dataset.lyricsSetting;if(!n)return;let r=n===`lyricsColor`||n===`lyricsStyle`||n===`lyricsFont`?e.value:Number(e.value);t.setLyricsPreference(n,r)};o.lyricsInputs.forEach(e=>{e.addEventListener(`input`,()=>ct(e)),e.addEventListener(`change`,()=>ct(e))}),o.lyricsChoiceButtons.forEach(e=>{e.addEventListener(`click`,()=>{let n=e.closest(`[data-lyrics-choice]`);n&&t.setLyricsPreference(n.dataset.lyricsChoice,e.dataset.value)})}),o.lyricsToggles.forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.lyricsToggle;n&&t.setLyricsPreference(n,e.getAttribute(`aria-checked`)!==`true`)})}),o.lyricsReset.addEventListener(`click`,()=>{t.resetLyricsPreferences(),K(`Lyrics appearance reset`)}),o.queueTabs.forEach(e=>{e.addEventListener(`click`,()=>{_=e.dataset.queueTab===`user`?`user`:`upnext`,J(),H()})}),o.queueClear.addEventListener(`click`,()=>{t.clearUserQueue()&&K(`Queue cleared`)}),o.settings.addEventListener(`click`,e=>{let n=e.target.closest(`[data-accent-color]`);n&&t.setAccent(n.dataset.accentColor)}),o.sidebarToggle.addEventListener(`click`,()=>{z(!h)}),o.sidebarClose.addEventListener(`click`,()=>{z(!1),o.sidebarToggle.focus()}),o.sidebarBackdrop.addEventListener(`click`,()=>z(!1)),o.sidebarFilters.addEventListener(`click`,e=>{let t=e.target.closest(`[data-sidebar-filter]`);t&&(g=t.dataset.sidebarFilter,N=null,P=null,U())});function lt(e){ke(),_=`upnext`;let n=e.dataset.collectionType,r=e.dataset.collectionId||null;n===`playlist`?t.selectPlaylist(r):n===`album`?t.selectAlbum(r):n===`artist`?t.selectArtist(r):n===`liked`?t.selectLiked():t.selectLibrary()}o.sidebarList.addEventListener(`click`,e=>{let n=e.target.closest(`[data-playlist-menu-toggle]`);if(n){let e=n.dataset.playlistMenuToggle;N=N===e?null:e,P=null,U();return}let r=e.target.closest(`[data-playlist-action]`);if(r){let e=r.dataset.playlistId;if(r.dataset.playlistAction===`rename`){N=e,P=e,U();let t=o.sidebarList.querySelector(`[data-playlist-rename-input]`);t&&(t.focus(),t.select())}else r.dataset.playlistAction===`delete`&&(N=null,P=null,t.deletePlaylist(e),U());return}let i=e.target.closest(`[data-collection-type]`);i&&lt(i)}),o.sidebarList.addEventListener(`dblclick`,e=>{let r=e.target.closest(`[data-collection-type]`);r&&(e.preventDefault(),lt(r),t.playDisplayed(),n.play())}),o.sidebarList.addEventListener(`contextmenu`,e=>{let t=e.target.closest(`[data-collection-type="playlist"]`);t&&(e.preventDefault(),Qe(t.dataset.collectionId,e.clientX,e.clientY))}),o.playlistContextMenu.addEventListener(`click`,e=>{let r=e.target.closest(`[data-playlist-context-action]`);if(!r||!C)return;let i=C;switch(r.dataset.playlistContextAction){case`play`:Y(),z(!1),ke(),_=`upnext`,t.selectPlaylist(i),t.playDisplayed(),n.play();break;case`add-songs`:Y(),tt(i);break;case`rename`:{Y(),N=i,P=i,U();let e=o.sidebarList.querySelector(`[data-playlist-rename-input]`);e&&(e.focus(),e.select());break}case`delete`:Y(),t.deletePlaylist(i),U(),K(`Playlist deleted`);break;default:Y()}}),o.pickerForm.addEventListener(`submit`,e=>{e.preventDefault(),rt()}),o.pickerSearch.addEventListener(`input`,()=>et()),o.pickerList.addEventListener(`click`,e=>{let n=e.target.closest(`[data-picker-track-id]`);if(!n||!w)return;let r=t.getState(),i=r.playlists.find(e=>e.id===w),a=r.library.find(e=>e.id===n.dataset.pickerTrackId);if(!i||!a)return;let o=t.toggleTrackInPlaylist(i.id,a.id);et(),K(o?`Added “${a.title}” to “${i.name}”`:`Removed “${a.title}” from “${i.name}”`)}),o.pickerClose.addEventListener(`click`,nt),o.picker.addEventListener(`click`,e=>{e.target===o.picker&&nt()}),o.sidebarList.addEventListener(`submit`,e=>{let n=e.target.closest(`[data-playlist-rename-form]`);if(!n)return;e.preventDefault();let r=n.dataset.playlistId,i=n.querySelector(`[data-playlist-rename-input]`),a=i?i.value.trim():``;N=null,P=null,a&&t.renamePlaylist(r,a),U()}),o.sidebarCreateForm.addEventListener(`submit`,e=>{e.preventDefault();let n=o.sidebarCreateName.value.trim();n&&(t.createPlaylist(n),o.sidebarCreateName.value=``,U())}),o.playlistToggle.addEventListener(`click`,()=>{_e(o.playlistMenu.hidden)}),o.playlistList.addEventListener(`click`,e=>{let n=e.target.closest(`[data-playlist-id]`);if(!n)return;let r=t.getState().currentTrack;r&&(t.toggleTrackInPlaylist(n.dataset.playlistId,r.id),De())}),o.playlistForm.addEventListener(`submit`,e=>{e.preventDefault();let n=o.playlistName.value.trim();if(!n)return;let r=t.getState().currentTrack;t.createPlaylist(n,r?.id??null),o.playlistName.value=``,De()}),o.searchInput.addEventListener(`input`,()=>Oe(o.searchInput.value)),o.searchInput.addEventListener(`keydown`,e=>{e.key===`Escape`?(ke(),o.searchInput.blur()):e.key===`Enter`&&(e.preventDefault(),e.shiftKey?Ae():Me())}),o.searchForm.addEventListener(`submit`,e=>{e.preventDefault(),Me()}),o.progress.addEventListener(`pointerdown`,()=>{s=!0}),o.progress.addEventListener(`input`,e=>{s=!0,n.seek(Number(e.target.value))}),o.progress.addEventListener(`change`,()=>{s=!1}),o.progress.addEventListener(`blur`,()=>{s=!1}),o.queue.addEventListener(`click`,e=>{let r=e.target.closest(`[data-track-menu]`);if(r){let e=r.getBoundingClientRect();Xe(r.dataset.trackMenu,e.left,e.bottom+6);return}let i=e.target.closest(`[data-queue-remove]`);if(i){t.removeFromQueue(i.dataset.queueRemove);return}if(e.target.closest(`[data-queue-handle]`))return;let a=e.target.closest(`[data-track-id]`);if(!a)return;if(b){b=!1;return}if(_===`user`){let e=a.closest(`[data-queue-uid]`);if(!e)return;t.playFromQueue(e.dataset.queueUid)&&n.play();return}let o=a.dataset.trackId;!m&&o===t.getState().currentTrack?.id?n.toggle():je(o)}),o.queue.addEventListener(`contextmenu`,e=>{let t=e.target.closest(`[data-track-id]`);t&&(e.preventDefault(),Xe(t.dataset.trackId,e.clientX,e.clientY))}),o.queue.addEventListener(`keydown`,e=>{let n=e.target.closest(`[data-queue-handle]`);if(!n)return;let r=n.closest(`[data-queue-uid]`);if(!r)return;let i=r.dataset.queueUid;e.key===`ArrowUp`||e.key===`ArrowDown`?(e.preventDefault(),t.moveQueueItemBy(i,e.key===`ArrowUp`?-1:1)&&(v=i)):(e.key===`Delete`||e.key===`Backspace`)&&(e.preventDefault(),t.removeFromQueue(i))}),o.queue.addEventListener(`dragstart`,e=>{let t=e.target.closest(`[data-queue-handle]`);if(!t){e.preventDefault();return}let n=t.closest(`[data-queue-uid]`);n&&(y=n.dataset.queueUid,b=!0,n.classList.add(`is-dragging`),e.dataTransfer&&(e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(`text/plain`,y)))}),o.queue.addEventListener(`dragover`,e=>{if(!y)return;let t=e.target.closest(`[data-queue-uid]`);if(!t)return;e.preventDefault(),e.dataTransfer&&(e.dataTransfer.dropEffect=`move`),o.queue.querySelectorAll(`.is-drop-target`).forEach(e=>{e.classList.remove(`is-drop-target`,`is-drop-after`)}),t.classList.add(`is-drop-target`);let n=t.getBoundingClientRect();t.classList.toggle(`is-drop-after`,e.clientY>n.top+n.height/2)}),o.queue.addEventListener(`dragend`,e=>{e.target.closest(`[data-queue-uid]`)?.classList.remove(`is-dragging`),o.queue.querySelectorAll(`.is-drop-target`).forEach(e=>{e.classList.remove(`is-drop-target`,`is-drop-after`)}),y=null,window.setTimeout(()=>{b=!1},80)}),o.queue.addEventListener(`drop`,e=>{if(!y)return;let n=e.target.closest(`[data-queue-uid]`);if(!n)return;e.preventDefault();let r=[...o.queue.querySelectorAll(`[data-queue-uid]`)].indexOf(n),i=n.getBoundingClientRect();e.clientY>i.top+i.height/2&&(r+=1);let a=t.getState().userQueue.findIndex(e=>e.uid===y),s=a!==-1&&a<r?r-1:r;t.moveQueueItem(y,s),y=null,o.queue.querySelectorAll(`.is-drop-target`).forEach(e=>{e.classList.remove(`is-drop-target`,`is-drop-after`)})}),o.queueBack.addEventListener(`click`,()=>{ke(),_=`upnext`,t.goBackQueue()}),a.addEventListener(`contextmenu`,e=>{if(e.defaultPrevented||e.target instanceof Element&&e.target.closest(`input, textarea, select, [contenteditable="true"], dialog, [data-context-menu], [data-playlist-context-menu]`))return;let n=t.getState().currentTrack;n&&(e.preventDefault(),Xe(n.id,e.clientX,e.clientY))}),o.contextMenu.addEventListener(`click`,e=>{if(e.target.closest(`[data-context-submenu]`)){o.contextPlaylists.hidden?Ze():Ye();return}let n=e.target.closest(`[data-context-playlist-id]`);if(n){if(!S)return;let e=n.dataset.contextPlaylistId;t.toggleTrackInPlaylist(e,S);let r=t.getState().playlists.find(t=>t.id===e),i=!!r?.trackIds.includes(S);q(),K(i?`Added to “${r?.name??`playlist`}”`:`Removed from “${r?.name??`playlist`}”`);return}let r=e.target.closest(`[data-context-action]`);r&&at(r.dataset.contextAction)}),o.contextMenu.addEventListener(`submit`,e=>{if(e.preventDefault(),!S)return;let n=o.contextPlaylistName.value.trim();n&&(t.createPlaylist(n,S),o.contextPlaylistName.value=``,q(),K(`Added to “${n}”`))}),o.infoClose.addEventListener(`click`,()=>o.infoDialog.close()),o.infoDialog.addEventListener(`click`,e=>{e.target===o.infoDialog&&o.infoDialog.close()}),o.lyricsGenius.addEventListener(`click`,()=>{let e=t.getState().currentTrack;e&&Je(qe(`genius`,e))}),o.lyricsYoutube.addEventListener(`click`,()=>{let e=t.getState().currentTrack;e&&Je(qe(`youtube`,e))}),o.lyricsLines.addEventListener(`click`,e=>{let t=e.target.closest(`[data-lyric-time]`);t&&n.seek(Number(t.dataset.lyricTime))});let ut=()=>{re=Date.now()+3500};o.lyricsLines.addEventListener(`wheel`,ut,{passive:!0}),o.lyricsLines.addEventListener(`touchmove`,ut,{passive:!0});function dt(e){let{currentTime:r,duration:i}=t.getState();n.seek(Math.min(Math.max(r+e,0),i||r+e))}function ft(e){t.setVolume(t.getState().volume+e)}function pt(e){if(e.code===`Escape`){if(o.picker.open){nt();return}if(!o.playlistContextMenu.hidden){Y();return}if(!o.contextMenu.hidden){J();return}if(o.infoDialog.open){o.infoDialog.close();return}if(!o.playlistMenu.hidden){_e(!1),o.playlistToggle.focus();return}if(N!==null){ye(),o.sidebarToggle.focus();return}if(h){z(!1),o.sidebarToggle.focus();return}if(!o.settings.hidden){ge(!1),o.settingsToggle.focus();return}if(E){e.preventDefault(),He(!1),o.fullscreenToggle.focus({preventScroll:!0});return}}if(e.code===`Slash`&&!e.metaKey&&!e.ctrlKey&&!e.altKey&&!e.shiftKey&&!Ft(e.target))e.preventDefault(),o.searchInput.focus(),o.searchInput.select();else if(!(e.metaKey||e.ctrlKey||e.altKey||Pt(e.target)))switch(e.code){case`Space`:e.preventDefault(),n.toggle();break;case`ArrowRight`:e.preventDefault(),dt(5);break;case`ArrowLeft`:e.preventDefault(),dt(-5);break;case`ArrowUp`:e.preventDefault(),ft(.05);break;case`ArrowDown`:e.preventDefault(),ft(-.05);break;case`KeyN`:R(`next`);break;case`KeyP`:R(`previous`);break;case`KeyM`:t.toggleMute();break;case`KeyS`:t.toggleShuffle();break;case`KeyR`:t.cycleRepeat();break;case`KeyF`:e.preventDefault(),Ue()}}function X(){s=!1}function _t(){h&&ve()}function vt(){!document.fullscreenElement&&E&&He(!1,{exitBrowser:!1})}function yt(e){if(!o.playlistContextMenu.hidden&&e.target instanceof Element&&(o.playlistContextMenu.contains(e.target)||Y()),!o.contextMenu.hidden&&e.target instanceof Element&&!o.contextMenu.contains(e.target)&&!e.target.closest(`[data-track-menu]`)&&J(),N!==null&&e.target instanceof Element){let t=e.target.closest(`[data-playlist-actions]`),n=e.target.closest(`[data-playlist-menu-toggle]`);!t&&!n&&ye()}o.playlistMenu.hidden||!o.playlistMenu.contains(e.target)&&!o.playlistToggle.contains(e.target)&&_e(!1),o.settings.hidden||o.settings.contains(e.target)||o.settingsToggle.contains(e.target)||e.target instanceof Element&&e.target.closest(`[data-context-action="settings"]`)||ge(!1)}document.addEventListener(`keydown`,pt),document.addEventListener(`click`,yt),document.addEventListener(`fullscreenchange`,vt),window.addEventListener(`pointerup`,X),window.addEventListener(`resize`,_t);let bt=t.subscribe(ot),xt=i.subscribe(e=>ce(e));return()=>{bt(),xt(),ae&&ae.disconnect(),f.forEach(e=>e.cancel()),f=[],window.clearTimeout(T),O?.abort(),document.removeEventListener(`keydown`,pt),document.removeEventListener(`click`,yt),document.removeEventListener(`fullscreenchange`,vt),window.removeEventListener(`pointerup`,X),window.removeEventListener(`resize`,_t)}}var Rt=document.querySelector(`#app`);Rt.innerHTML=`
  <div class="boot" role="status" aria-live="polite">
    <span class="boot__spinner" aria-hidden="true"></span>
    <p>Reading your music folder…</p>
  </div>
`;var zt=await pt(),Bt=de(zt.tracks,{folderPlaylists:zt.playlists,libraryRoot:zt.root,libraryError:zt.error,libraryMessage:zt.message}),Vt=dt();Lt(Rt,{store:Bt,audio:me(Bt,{artwork:Vt}),artwork:Vt});