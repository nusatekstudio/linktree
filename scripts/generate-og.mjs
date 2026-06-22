/**
 * Generates the Open Graph image and favicons from the transparent logo.
 * Run once (and after any logo change): `bun run assets` / `npm run assets`.
 * Outputs are committed to public/brand/ so the build itself stays dependency-free.
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { mkdir } from 'node:fs/promises';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');
const SRC = resolve(root, 'src/assets/logo-nusatek.png');
const OUT = resolve(root, 'public/brand');

const CREAM = { r: 0xfa, g: 0xf7, b: 0xf2, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

await mkdir(OUT, { recursive: true });

// --- Open Graph image: 1200×630, full logo centered on brand cream ---------
const OG_W = 1200;
const OG_H = 630;
const ogLogo = await sharp(SRC).resize({ height: 460, fit: 'inside' }).png().toBuffer();
const { width: lw = 0, height: lh = 0 } = await sharp(ogLogo).metadata();
await sharp({ create: { width: OG_W, height: OG_H, channels: 4, background: CREAM } })
  .composite([{ input: ogLogo, left: Math.round((OG_W - lw) / 2), top: Math.round((OG_H - lh) / 2) }])
  .png({ compressionLevel: 9, palette: true })
  .toFile(resolve(OUT, 'og-image.png'));

// --- Favicons: crop just the peacock mark (top of the logo) -----------------
// The mark occupies y≈232–1135 with a clean gap before the wordmark (measured
// from the source alpha channel). Extract then trim in separate pipelines —
// chaining .extract().trim() in one pipeline throws "bad extract area".
const markRegion = await sharp(SRC)
  .extract({ left: 610, top: 232, width: 1235, height: 905 })
  .png()
  .toBuffer();
const mark = await sharp(markRegion).trim().png().toBuffer();

const favicons = [
  { name: 'favicon-16.png', size: 16, bg: CLEAR },
  { name: 'favicon-32.png', size: 32, bg: CLEAR },
  { name: 'apple-touch-icon.png', size: 180, bg: CREAM }, // iOS adds no transparency
];

for (const { name, size, bg } of favicons) {
  const inner = await sharp(mark)
    .resize({ width: Math.round(size * 0.86), height: Math.round(size * 0.86), fit: 'contain', background: CLEAR })
    .png()
    .toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: bg } })
    .composite([{ input: inner, gravity: 'center' }])
    .png()
    .toFile(resolve(OUT, name));
}

console.log('✓ Generated og-image.png + favicons in public/brand/');
