// One-off asset generator. Run it locally whenever the brand, the page titles or the client
// logos change, then commit the output (nothing here runs on Vercel):
//
//   npm i --no-save sharp potrace
//   npm run images
//
// Writes:
//   public/og/*.jpg                  1200x630 share images (one per route with its own image + default)
//   public/logo-512.png              square logo for Organization.logo
//   public/favicon.ico, favicon.png  small favicons (the .png keeps the old URL working)
//   public/favicon.svg               traced vector favicon
//   public/apple-touch-icon.png      180x180
//   public/icon-192.png, icon-512.png  web app manifest icons
//   src/data/logo-mark.webp          header/footer logo (64px)
//   src/client_logos/*.webp          client logos (144px)
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sharp from 'sharp';
import potrace from 'potrace';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const at = (...p) => join(root, ...p);

const NAVY = '#061020';
const CYAN = '#6ce3ff';
const LOGO_SRC = at('src/data/logs.png');

const FONT_DIR = at('node_modules/.cache/og-fonts');
const FONTS = {
  Urbanist: 'https://github.com/google/fonts/raw/main/ofl/urbanist/Urbanist%5Bwght%5D.ttf',
  Inter: 'https://github.com/google/fonts/raw/main/ofl/inter/Inter%5Bopsz,wght%5D.ttf',
};

async function ensureFonts() {
  mkdirSync(FONT_DIR, { recursive: true });
  for (const [name, url] of Object.entries(FONTS)) {
    const file = join(FONT_DIR, `${name}.ttf`);
    if (existsSync(file)) continue;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not download ${name}: ${res.status}`);
    writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  }
}

const escapeMarkup = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const plainText = (s) =>
  s
    .replace(/①/g, '1')
    .replace(/②/g, '2')
    .replace(/③/g, '3')
    .replace(/\s+/g, ' ')
    .trim();

/** Renders a line or paragraph of text with sharp/Pango. `size` is in px (dpi 72 => 1pt = 1px). */
async function text(str, { font, size, color, weight = 'bold', width, spacing, letterSpacing = 0 }) {
  const markup =
    `<span foreground="${color}" weight="${weight}" size="${Math.round(size * 1024)}"` +
    (letterSpacing ? ` letter_spacing="${Math.round(letterSpacing * 1024)}"` : '') +
    `>${escapeMarkup(str)}</span>`;
  const { data, info } = await sharp({
    text: {
      text: markup,
      font: font,
      fontfile: join(FONT_DIR, `${font}.ttf`),
      dpi: 72,
      rgba: true,
      width,
      wrap: 'word',
      ...(spacing ? { spacing } : {}),
    },
  })
    .png()
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height };
}

const background = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#050d1c"/>
      <stop offset="0.55" stop-color="#081a30"/>
      <stop offset="1" stop-color="#0b1f3b"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.86" cy="0.08" r="0.62">
      <stop offset="0" stop-color="#1ecbff" stop-opacity="0.30"/>
      <stop offset="0.45" stop-color="#1ecbff" stop-opacity="0.08"/>
      <stop offset="1" stop-color="#1ecbff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.08" cy="1.05" r="0.6">
      <stop offset="0" stop-color="#2f5e9c" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#2f5e9c" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#1ecbff"/>
      <stop offset="1" stop-color="#6ce3ff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect width="${w}" height="${h}" fill="url(#glow2)"/>
  <g fill="none" stroke="#6ce3ff">
    <circle cx="1090" cy="560" r="170" stroke-opacity="0.16" stroke-width="1.5"/>
    <circle cx="1090" cy="560" r="270" stroke-opacity="0.10" stroke-width="1.5"/>
    <circle cx="1090" cy="560" r="370" stroke-opacity="0.06" stroke-width="1.5"/>
  </g>
  <g fill="#6ce3ff">
    <circle cx="940" cy="478" r="5" fill-opacity="0.7"/>
    <circle cx="1000" cy="310" r="4" fill-opacity="0.45"/>
    <circle cx="760" cy="600" r="3.5" fill-opacity="0.35"/>
  </g>
  <rect x="80" y="${h - 100}" width="120" height="3" rx="1.5" fill="url(#rule)"/>
</svg>`;

let logoCache;
const logo = async (size) => {
  logoCache ??= new Map();
  if (!logoCache.has(size)) {
    logoCache.set(size, await sharp(LOGO_SRC).resize(size, size, { fit: 'contain' }).png().toBuffer());
  }
  return logoCache.get(size);
};

async function shareImage({ eyebrow, headline }, file) {
  const W = 1200;
  const H = 630;
  const left = 80;
  const maxWidth = 1000;

  const wordmark = await text('The Lapis AI', { font: 'Urbanist', size: 34, color: '#f4f9ff' });
  const brow = await text(plainText(eyebrow).toUpperCase(), {
    font: 'Inter',
    size: 23,
    color: CYAN,
    weight: '600',
    letterSpacing: 2.2,
    width: maxWidth,
  });

  let head;
  for (const size of [70, 64, 58, 52, 48, 44]) {
    head = await text(plainText(headline), {
      font: 'Urbanist',
      size,
      color: '#ffffff',
      width: maxWidth,
      spacing: Math.round(size * 0.14),
    });
    if (head.height <= size * 1.3 * 3) break;
  }

  const domain = await text('thelapisai.com.ng', {
    font: 'Inter',
    size: 24,
    color: '#c9d8ea',
    weight: '500',
  });

  const top = 150;
  const bottom = H - 130;
  const blockHeight = brow.height + 26 + head.height;
  const blockTop = Math.max(top, Math.round(top + (bottom - top - blockHeight) / 2));

  await sharp(Buffer.from(background(W, H)))
    .composite([
      { input: await logo(60), left, top: 62 },
      { input: wordmark.data, left: left + 76, top: 62 + Math.round((60 - wordmark.height) / 2) },
      { input: brow.data, left, top: blockTop },
      { input: head.data, left, top: blockTop + brow.height + 26 },
      { input: domain.data, left, top: H - 80 },
    ])
    .flatten({ background: NAVY })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(file);
}

/** Square icon: the logo centred on a navy tile. */
const tile = async (size, scale) =>
  sharp({ create: { width: size, height: size, channels: 4, background: NAVY } })
    .composite([{ input: await logo(Math.round(size * scale)), gravity: 'center' }])
    .png({ compressionLevel: 9, palette: size <= 192 })
    .toBuffer();

/** ICO container with embedded PNGs (supported by every current browser). */
function ico(pngs) {
  const header = Buffer.alloc(6 + 16 * pngs.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  let offset = header.length;
  pngs.forEach(({ size, data }, i) => {
    const e = 6 + i * 16;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt8(0, e + 2);
    header.writeUInt8(0, e + 3);
    header.writeUInt16LE(1, e + 4);
    header.writeUInt16LE(32, e + 6);
    header.writeUInt32LE(data.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += data.length;
  });
  return Buffer.concat([header, ...pngs.map((p) => p.data)]);
}

const trace = (buffer, options) =>
  new Promise((ok, fail) => potrace.trace(buffer, options, (err, svg) => (err ? fail(err) : ok(svg))));

async function favicons() {
  const small = async (size) =>
    sharp(LOGO_SRC).resize(size, size, { fit: 'contain' }).png({ compressionLevel: 9 }).toBuffer();
  const sizes = [16, 32, 48];
  const pngs = await Promise.all(sizes.map(async (size) => ({ size, data: await small(size) })));
  writeFileSync(at('public/favicon.ico'), ico(pngs));
  writeFileSync(at('public/favicon.png'), await small(96));

  writeFileSync(at('public/apple-touch-icon.png'), await tile(180, 0.78));
  writeFileSync(at('public/icon-192.png'), await tile(192, 0.7));
  writeFileSync(at('public/icon-512.png'), await tile(512, 0.7));
  writeFileSync(at('public/logo-512.png'), await tile(512, 0.8));

  // Vector favicon: trace the logo's light shapes and fill them with the brand cyan.
  const flat = await sharp(LOGO_SRC).resize(512, 512).flatten({ background: '#000000' }).greyscale().png().toBuffer();
  const svg = await trace(flat, { threshold: 70, color: CYAN, background: 'transparent', turdSize: 20, optTolerance: 0.4, blackOnWhite: false });
  writeFileSync(at('public/favicon.svg'), svg.replace(/\s+/g, ' ').replace(/> </g, '><').trim());
}

async function webpLogos() {
  writeFileSync(
    at('src/data/logo-mark.webp'),
    await sharp(LOGO_SRC).resize(64, 64).webp({ quality: 90, alphaQuality: 90, effort: 6 }).toBuffer(),
  );
  const dir = at('src/client_logos');
  for (const name of await readdir(dir)) {
    if (!name.endsWith('.png')) continue;
    await sharp(join(dir, name))
      .resize(144, 144, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .webp({ quality: 88, alphaQuality: 90, effort: 6 })
      .toFile(join(dir, name.replace(/\.png$/, '.webp')));
  }
}

async function main() {
  const ssr = at('dist-ssr/entry-server.js');
  if (!existsSync(ssr)) throw new Error('Run `vite build --ssr src/entry-server.tsx --outDir dist-ssr` first (npm run images does this).');
  const { siteRoutes, ogImageSlug } = await import(pathToFileURL(ssr).href);

  await ensureFonts();
  mkdirSync(at('public/og'), { recursive: true });

  const jobs = [
    {
      slug: 'default',
      og: { eyebrow: 'AI automation · AI agents · AI consulting', headline: 'Grow without adding headcount, losing leads, or wasting money on AI.' },
    },
  ];
  for (const route of siteRoutes) {
    const slug = ogImageSlug(route.path);
    if (!slug) continue;
    jobs.push({ slug, og: route.og ?? { eyebrow: 'The Lapis AI', headline: route.title.replace(/\s*\|.*$/, '') } });
  }
  for (const job of jobs) {
    await shareImage(job.og, at('public/og', `${job.slug}.jpg`));
    console.log(`og/${job.slug}.jpg`);
  }

  await favicons();
  await webpLogos();
  console.log('Icons, logo and WebP logos written.');
}

main().then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
