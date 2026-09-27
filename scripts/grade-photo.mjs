// Grade a replacement photo to the site look and export responsive WebP files.
//
//   npm i --no-save sharp
//   node scripts/grade-photo.mjs <input.jpg> <name> [--widths 960,1600,2400] [--aspect 1.78] [--y 0.3] [--blur 0]
//                                [--light] [--quality 64]
//
// Writes public/images/photos/<name>-<width>.webp and prints the { w, h } list to paste into
// src/data/photos.ts (photoSources). Reusing an existing <name> with the same widths needs no code change.
// --aspect crops to width/height (e.g. 1.78 for 16:9); --y sets the vertical crop start (0 = top, 1 = bottom).
// --light skips the grade and only nudges the levels so the darks meet the page background; use it for
// the owner's own artwork (e.g. the Home hero). Widths larger than the source are never upscaled.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const flag = (k, d) => {
  const i = args.indexOf(`--${k}`);
  return i === -1 ? d : args[i + 1];
};
const [input, name] = args.filter((a, i) => !a.startsWith('--') && !args[i - 1]?.startsWith('--'));
if (!input || !name) {
  console.error('Usage: node scripts/grade-photo.mjs <input.jpg> <name> [--widths 960,1600,2400] [--aspect 1.78] [--y 0.3] [--blur 0]');
  process.exit(1);
}
const widths = flag('widths', '960,1600,2400').split(',').map(Number);
const aspect = flag('aspect') ? Number(flag('aspect')) : null;
const y = Number(flag('y', '0'));
const blur = Number(flag('blur', '0'));
const light = args.includes('--light');
const quality = flag('quality') ? Number(flag('quality')) : null;
const outDir = path.resolve('public/images/photos');

/** Light tone match only: pull the near-black background (~#13160f) down to the page's #0f120c. */
const toneMatch = (buf) => sharp(buf).linear(0.96, -3).toBuffer();

async function grade(buf, width, height) {
  // Same recipe as the shipped set: desaturate + darken, pull blue out of the shadows (olive),
  // then a warm olive soft-light wash and a soft vignette into the page background (#0f120c).
  const base = await sharp(buf)
    .modulate({ saturation: 0.62, brightness: 0.8 })
    .recomb([
      [0.96, 0.08, 0.0],
      [0.02, 0.98, 0.04],
      [0.02, 0.12, 0.76],
    ])
    .linear(1.08, -10)
    .toBuffer();
  const wash = await sharp({ create: { width, height, channels: 4, background: { r: 58, g: 66, b: 36, alpha: 0.55 } } })
    .png()
    .toBuffer();
  const vignette = Buffer.from(
    `<svg width="${width}" height="${height}"><defs><radialGradient id="v" cx="50%" cy="48%" r="75%"><stop offset="55%" stop-color="#0f120c" stop-opacity="0"/><stop offset="100%" stop-color="#0f120c" stop-opacity="0.55"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#v)"/></svg>`,
  );
  return sharp(base).composite([{ input: wash, blend: 'soft-light' }, { input: vignette, blend: 'over' }]).toBuffer();
}

const meta = await sharp(input).rotate().metadata();
let cw = meta.width;
let ch = aspect ? Math.round(cw / aspect) : meta.height;
if (ch > meta.height) {
  ch = meta.height;
  cw = Math.round(ch * aspect);
}
const left = Math.round((meta.width - cw) / 2);
const top = Math.max(0, Math.min(Math.round(y * meta.height), meta.height - ch));
const maxW = Math.min(cw, Math.max(...widths));
const maxH = Math.round((maxW * ch) / cw);

const cropped = await sharp(input).rotate().extract({ left, top, width: cw, height: ch }).resize(maxW, maxH).toBuffer();
let graded = light ? await toneMatch(cropped) : await grade(cropped, maxW, maxH);
if (blur > 0) graded = await sharp(graded).blur(blur).toBuffer();

fs.mkdirSync(outDir, { recursive: true });
const sources = [];
for (const w of [...new Set(widths.map((w) => Math.min(w, maxW)))]) {
  const ww = w;
  const hh = Math.round((ww * maxH) / maxW);
  const out = path.join(outDir, `${name}-${ww}.webp`);
  const q = quality ?? (ww > 1700 ? 58 : 64);
  await sharp(graded).resize(ww, hh).webp({ quality: q, effort: 5, ...(light ? { smartSubsample: true } : {}) }).toFile(out);
  sources.push({ w: ww, h: hh });
  console.log(`wrote ${path.relative(process.cwd(), out)} (${Math.round(fs.statSync(out).size / 1024)} KB)`);
}
console.log(`\nphotoSources entry:\n  '${name}': [${sources.map((s) => `{ w: ${s.w}, h: ${s.h} }`).join(', ')}],`);
