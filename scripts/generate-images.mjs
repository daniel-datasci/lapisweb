// One-off asset generator. Run it locally whenever the brand, the page titles or the client
// logos change, then commit the output (nothing here runs on Vercel):
//
//   npm i --no-save sharp potrace
//   npm run images                 (everything below)
//   npm run images -- --og-only    (share images only; leaves favicons and logos untouched)
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

const BG = '#0f120c';
const TEXT = '#f2f2ee';
const TEXT_2 = '#c8cac1';
const MUTED = '#979a90';
const SAGE = '#b4c6a4';
// The favicon keeps its existing colour; only the share images follow the site palette.
const FAVICON_COLOR = '#6ce3ff';
const LOGO_SRC = at('src/data/logs.png');
const PHOTO_DIR = at('public/images/photos');

const FONT_DIR = at('node_modules/.cache/og-fonts');
const FONTS = {
  InterTight: 'https://github.com/google/fonts/raw/main/ofl/intertight/InterTight%5Bwght%5D.ttf',
};
const FAMILY = 'Inter Tight';

/** The graded hero photo for each page family (see src/data/photos.ts). */
const PHOTO_FOR = [
  ['/solutions/never-miss-a-lead', 'hero-lead'],
  ['/solutions/grow-without-hiring', 'hero-grow'],
  ['/solutions/make-your-ai-pay', 'hero-pay'],
  ['/solutions', 'hero-solutions'],
  ['/services', 'hero-services'],
  ['/industries', 'hero-industries'],
  ['/pricing', 'hero-pricing'],
  ['/how-it-works', 'hero-how'],
  ['/case-studies', 'hero-cases'],
  ['/about', 'hero-about'],
  ['/blog', 'hero-blog'],
  ['/contact', 'hero-contact'],
];
const photoFor = (path) => (PHOTO_FOR.find(([prefix]) => path === prefix || path.startsWith(`${prefix}/`)) ?? [, 'home-hero'])[1];

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
async function text(str, { size, color, weight = '500', width, spacing, letterSpacing = 0 }) {
  const markup =
    `<span foreground="${color}" weight="${weight}" size="${Math.round(size * 1024)}"` +
    (letterSpacing ? ` letter_spacing="${Math.round(letterSpacing * 1024)}"` : '') +
    `>${escapeMarkup(str)}</span>`;
  const { data, info } = await sharp({
    text: {
      text: markup,
      font: FAMILY,
      fontfile: join(FONT_DIR, 'InterTight.ttf'),
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

const SPARKLE = 'M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0z';

/** Legibility wash over the photo: dark on the left behind the copy, fading into the page colour. */
const wash = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="${BG}" stop-opacity="0.92"/>
      <stop offset="0.5" stop-color="${BG}" stop-opacity="0.7"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="0.25"/>
    </linearGradient>
    <linearGradient id="foot" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${BG}" stop-opacity="0.35"/>
      <stop offset="0.45" stop-color="${BG}" stop-opacity="0"/>
      <stop offset="1" stop-color="${BG}" stop-opacity="0.9"/>
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#side)"/>
  <rect width="${w}" height="${h}" fill="url(#foot)"/>
  <rect x="80" y="${h - 112}" width="${w - 160}" height="1" fill="#ffffff" fill-opacity="0.12"/>
</svg>`;

/** Eyebrow pill: dark glass, hairline border and a sage sparkle, like the site's section eyebrows. */
const pill = (w, h) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <rect x="0.75" y="0.75" width="${w - 1.5}" height="${h - 1.5}" rx="${(h - 1.5) / 2}" fill="#1e211b" fill-opacity="0.82" stroke="#ffffff" stroke-opacity="0.14" stroke-width="1.5"/>
  <g transform="translate(20 ${(h - 18) / 2}) scale(0.75)"><path d="${SPARKLE}" fill="${SAGE}"/></g>
</svg>`;

let logoCache;
const logo = async (size) => {
  logoCache ??= new Map();
  if (!logoCache.has(size)) {
    logoCache.set(size, await sharp(LOGO_SRC).resize(size, size, { fit: 'contain' }).png().toBuffer());
  }
  return logoCache.get(size);
};

/** The mark as a white glyph, matching the header's `brightness(0) invert(1)` treatment. */
const whiteMark = async (size) => {
  const { data, info } = await sharp(LOGO_SRC)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 255;
    data[i + 1] = 255;
    data[i + 2] = 255;
  }
  return sharp(data, { raw: info }).png().toBuffer();
};

async function shareImage({ eyebrow, headline }, photo, file) {
  const W = 1200;
  const H = 630;
  const left = 80;
  const maxWidth = 900;

  const wordmark = await text('The Lapis AI', { size: 30, color: TEXT, letterSpacing: -0.6 });
  const brow = await text(plainText(eyebrow), { size: 21, color: TEXT_2, width: maxWidth - 80 });
  const pillH = brow.height + 22;
  const pillW = brow.width + 58;

  let head;
  for (const size of [68, 62, 56, 50, 46, 42]) {
    head = await text(plainText(headline), {
      size,
      color: TEXT,
      width: maxWidth,
      letterSpacing: -0.035 * size,
    });
    if (head.height <= size * 1.25 * 3) break;
  }

  const domain = await text('THELAPISAI.COM.NG', { size: 17, color: MUTED, letterSpacing: 1.6 });
  const cta = await text('BOOK A FREE DISCOVERY CALL', { size: 17, color: MUTED, letterSpacing: 1.6 });

  const top = 140;
  const bottom = H - 140;
  const blockHeight = pillH + 28 + head.height;
  const blockTop = Math.max(top, Math.round(top + (bottom - top - blockHeight) / 2));

  const bg = await sharp(join(PHOTO_DIR, `${photo}-1600.webp`))
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .toBuffer();

  await sharp(bg)
    .composite([
      { input: Buffer.from(wash(W, H)), left: 0, top: 0 },
      { input: await whiteMark(40), left, top: 64 },
      { input: wordmark.data, left: left + 54, top: 64 + Math.round((40 - wordmark.height) / 2) },
      { input: Buffer.from(pill(pillW, pillH)), left, top: blockTop },
      { input: brow.data, left: left + 44, top: blockTop + Math.round((pillH - brow.height) / 2) },
      { input: head.data, left, top: blockTop + pillH + 28 },
      { input: domain.data, left, top: H - 76 },
      { input: cta.data, left: W - 80 - cta.width, top: H - 76 },
    ])
    .flatten({ background: BG })
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' })
    .toFile(file);
}

/** Square icon: the logo centred on a page-colour tile. */
const tile = async (size, scale) =>
  sharp({ create: { width: size, height: size, channels: 4, background: BG } })
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

  // Vector favicon: trace the logo's light shapes and fill them with the favicon colour.
  const flat = await sharp(LOGO_SRC).resize(512, 512).flatten({ background: '#000000' }).greyscale().png().toBuffer();
  const svg = await trace(flat, { threshold: 70, color: FAVICON_COLOR, background: 'transparent', turdSize: 20, optTolerance: 0.4, blackOnWhite: false });
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

  const ogOnly = process.argv.includes('--og-only');
  const jobs = [
    {
      slug: 'default',
      photo: 'home-hero',
      og: { eyebrow: 'AI automation · AI agents · AI consulting', headline: 'Grow without adding headcount, losing leads, or wasting money on AI.' },
    },
  ];
  for (const route of siteRoutes) {
    const slug = ogImageSlug(route.path);
    if (!slug) continue;
    jobs.push({
      slug,
      photo: photoFor(route.path),
      og: route.og ?? { eyebrow: 'The Lapis AI', headline: route.title.replace(/\s*\|.*$/, '') },
    });
  }
  for (const job of jobs) {
    await shareImage(job.og, job.photo, at('public/og', `${job.slug}.jpg`));
    console.log(`og/${job.slug}.jpg`);
  }

  if (ogOnly) return;
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
