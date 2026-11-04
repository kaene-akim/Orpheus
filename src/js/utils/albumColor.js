const SAMPLE_SIZE = 48;
const MIN_SATURATION = 0.15;

// Artwork URLs are stable while a track is in the library, so palette lookups
// only need to happen once even when the same cover is shown in several places.
const cache = new Map();

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error(`Could not load artwork: ${src}`));
    image.src = src;
  });
}

function rgbToHsl(red, green, blue) {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const lightness = (max + min) / 2;

  if (delta === 0) return { hue: 0, saturation: 0, lightness };

  const saturation = clamp(delta / (1 - Math.abs(2 * lightness - 1)), 0, 1);
  let hue;

  if (max === r) hue = ((g - b) / delta) % 6;
  else if (max === g) hue = (b - r) / delta + 2;
  else hue = (r - g) / delta + 4;

  hue *= 60;
  if (hue < 0) hue += 360;

  return { hue, saturation, lightness };
}

function hslToRgb(hue, saturation, lightness) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const section = hue / 60;
  const secondary = chroma * (1 - Math.abs((section % 2) - 1));
  let red = 0;
  let green = 0;
  let blue = 0;

  if (section < 1) [red, green, blue] = [chroma, secondary, 0];
  else if (section < 2) [red, green, blue] = [secondary, chroma, 0];
  else if (section < 3) [red, green, blue] = [0, chroma, secondary];
  else if (section < 4) [red, green, blue] = [0, secondary, chroma];
  else if (section < 5) [red, green, blue] = [secondary, 0, chroma];
  else [red, green, blue] = [chroma, 0, secondary];

  const match = lightness - chroma / 2;
  return [red + match, green + match, blue + match].map((channel) =>
    Math.round(clamp(channel, 0, 1) * 255),
  );
}

function toHex([red, green, blue]) {
  return `#${[red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;
}

function brightness([red, green, blue]) {
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

// Accents sit on a black background, so lift dark cover colors until they are
// readable while keeping the hue of the original artwork.
function toAccent({ hue, saturation, lightness }) {
  const accentSaturation = clamp(saturation, 0.52, 0.95);
  let accentLightness = clamp(lightness, 0.56, 0.72);
  let rgb = hslToRgb(hue, accentSaturation, accentLightness);

  while (brightness(rgb) < 118 && accentLightness < 0.92) {
    accentLightness += 0.015;
    rgb = hslToRgb(hue, accentSaturation, accentLightness);
  }

  return toHex(rgb);
}

function pickProminentColor(image) {
  const canvas = document.createElement('canvas');
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return null;

  context.drawImage(image, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const { data } = context.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
  const buckets = new Map();

  for (let index = 0; index < data.length; index += 4) {
    if (data[index + 3] < 128) continue;

    const red = data[index];
    const green = data[index + 1];
    const blue = data[index + 2];
    const { hue, saturation, lightness } = rgbToHsl(red, green, blue);

    // Ignore letterboxing, shadows, highlights, and neutrals. A cover with no
    // usable color keeps the listener's manual accent instead.
    if (saturation < MIN_SATURATION || lightness < 0.08 || lightness > 0.94) continue;

    const key = `${red >> 4}:${green >> 4}:${blue >> 4}`;
    let bucket = buckets.get(key);
    if (!bucket) {
      bucket = { count: 0, red: 0, green: 0, blue: 0 };
      buckets.set(key, bucket);
    }
    bucket.count += 1;
    bucket.red += red;
    bucket.green += green;
    bucket.blue += blue;
  }

  let best = null;
  let bestScore = 0;
  buckets.forEach((bucket) => {
    const average = rgbToHsl(
      Math.round(bucket.red / bucket.count),
      Math.round(bucket.green / bucket.count),
      Math.round(bucket.blue / bucket.count),
    );
    // Favor colors that cover a large area, are vivid, and are not too dark.
    const score =
      bucket.count *
      (0.3 + average.saturation) *
      (0.35 + Math.min(average.lightness, 0.72));
    if (score > bestScore) {
      bestScore = score;
      best = average;
    }
  });

  return best;
}

async function extract(src) {
  const image = await loadImage(src);
  const color = pickProminentColor(image);
  return color ? toAccent(color) : null;
}

/**
 * Returns a bright accent color sampled from the artwork's most prominent
 * colorful region. Resolves to `null` when the image has no usable color or
 * cannot be read (for example, a tainted cross-origin image).
 */
export function albumAccentColor(src) {
  if (!src) return Promise.resolve(null);
  const cached = cache.get(src);
  if (cached) return cached;

  const promise = extract(src).catch(() => null);
  cache.set(src, promise);
  return promise;
}
