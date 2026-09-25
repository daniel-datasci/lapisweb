// Prerenders every route to static HTML after `vite build` (client) and
// `vite build --ssr src/entry-server.tsx --outDir dist-ssr` (server). No headless browser:
// the server bundle renders each page with react-dom/server, then this script writes
//   dist/index.html, dist/<path>.html (served at clean URLs by Vercel), dist/404.html,
//   dist/sitemap.xml, dist/llms.txt and dist/llms-full.txt.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { Writable } from 'node:stream';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');
const manifestFile = join(dist, '.vite', 'manifest.json');

for (const file of [join(dist, 'index.html'), ssrEntry, manifestFile]) {
  if (!existsSync(file)) throw new Error(`Missing ${file}. Run the client and SSR builds first (npm run build).`);
}

const template = readFileSync(join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--app-head-->') || !template.includes('<!--app-html-->')) {
  throw new Error('dist/index.html is missing the <!--app-head--> / <!--app-html--> placeholders.');
}
const manifest = JSON.parse(readFileSync(manifestFile, 'utf8'));
const server = await import(pathToFileURL(ssrEntry).href);
const { render, routeSources, siteRoutes, NOT_FOUND_PATH, absoluteUrl, buildLlmsTxt, buildLlmsFullTxt } = server;

/** CSS files and JS chunks a page module needs (statically), excluding the main entry. */
function pageAssets(sources) {
  const css = new Set();
  const js = new Set();
  const seen = new Set();
  const visit = (key) => {
    const chunk = manifest[key];
    if (!chunk || seen.has(key) || chunk.isEntry) return;
    seen.add(key);
    js.add(chunk.file);
    // Same order as Vite's runtime preloading: dependencies' CSS first, then the chunk's own CSS.
    (chunk.imports ?? []).forEach(visit);
    (chunk.css ?? []).forEach((f) => css.add(f));
  };
  sources.forEach(visit);
  return { css: [...css], js: [...js] };
}

async function renderPage(url) {
  const chunks = [];
  const sink = new Writable({
    write(chunk, _encoding, callback) {
      chunks.push(Buffer.from(chunk));
      callback();
    },
  });
  const finished = new Promise((ok, fail) => {
    sink.on('finish', ok);
    sink.on('error', fail);
  });
  const head = await render(url, sink);
  await finished;

  const { css, js } = pageAssets(routeSources(url));
  const assetTags = [
    ...js.map((f) => `<link rel="modulepreload" crossorigin href="/${f}">`),
    ...css.map((f) => `<link rel="stylesheet" crossorigin href="/${f}">`),
  ].join('\n    ');

  // Function replacements, so `$` in page content (prices) is never treated as a pattern.
  return template
    .replace('<!--app-head-->', () => head)
    .replace('</head>', () => (assetTags ? `  ${assetTags}\n  </head>` : '</head>'))
    .replace('<!--app-html-->', () => Buffer.concat(chunks).toString('utf8'));
}

const outFile = (path) => {
  if (path === '/') return join(dist, 'index.html');
  if (path === NOT_FOUND_PATH) return join(dist, '404.html');
  return join(dist, `${path.slice(1)}.html`);
};

const write = (file, contents) => {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, contents);
};

const pages = [...siteRoutes.map((r) => r.path), NOT_FOUND_PATH];
for (const path of pages) {
  write(outFile(path), await renderPage(path));
}
console.log(`Prerendered ${pages.length} pages (${siteRoutes.length} routes + 404).`);

// Sitemap <lastmod>: blog posts use their own dates; other pages use the last commit that
// touched their main source/data files, or the build date if those files have uncommitted edits
// or no history is available (for example in a shallow clone).
const today = new Date().toISOString().slice(0, 10);
const git = (args) => {
  try {
    return execFileSync('git', args, { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};
const lastModified = (route) => {
  if (route.lastmod) return route.lastmod;
  if (git(['status', '--porcelain', '--', ...route.sources])) return today;
  return git(['log', '-1', '--format=%cs', '--', ...route.sources]) || today;
};

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...siteRoutes.map(
    (route) => `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>\n    <lastmod>${lastModified(route)}</lastmod>\n  </url>`,
  ),
  '</urlset>',
  '',
].join('\n');
write(join(dist, 'sitemap.xml'), sitemap);
write(join(dist, 'llms.txt'), buildLlmsTxt());
write(join(dist, 'llms-full.txt'), buildLlmsFullTxt());

// The build manifest is only needed above; don't publish it.
rmSync(join(dist, '.vite'), { recursive: true, force: true });
console.log('Wrote sitemap.xml, llms.txt and llms-full.txt.');
