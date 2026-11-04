// Artist tags can contain several performers in one string. `music-metadata`
// already exposes properly separated values as `common.artists`, so this is a
// fallback for files that only store a combined display string.
const FEATURED_ARTIST = /\s+(?:feat\.?|ft\.?|featuring|with|vs\.?)\s+/i;
const ARTIST_SEPARATOR = /\s*;\s*/;

export function splitArtistNames(value) {
  const values = Array.isArray(value) ? value : [value];
  const names = [];

  values.forEach((entry) => {
    const text = String(entry ?? '').trim();
    if (!text) return;

    text
      .replace(/\s*[([{]\s*(feat\.?|ft\.?|featuring|with|vs\.?)\s+/gi, ' $1 ')
      .replace(/\s*[)\]}]\s*$/g, '')
      .split(ARTIST_SEPARATOR)
      .flatMap((part) => part.split(FEATURED_ARTIST))
      .map((part) => part.trim())
      .filter(Boolean)
      .forEach((name) => names.push(name));
  });

  return [...new Set(names)];
}
