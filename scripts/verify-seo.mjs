// Post-build SEO check: `npm run build && npm run verify:seo`.
// Reads only the static files in dist/ (what a crawler without JavaScript sees) and fails on
// any missing or inconsistent metadata, structured data, sitemap entry or internal link.
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrEntry = join(root, 'dist-ssr', 'entry-server.js');
if (!existsSync(ssrEntry) || !existsSync(join(dist, 'index.html'))) {
  console.error('Build first: npm run build');
  process.exit(1);
}
const { siteRoutes, NOT_FOUND_PATH, SITE_URL, absoluteUrl } = await import(pathToFileURL(ssrEntry).href);

const TITLE = [50, 60];
const DESCRIPTION = [140, 160];
const MIN_WORDS = 120;
const ROBOTS = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

const errors = [];
const warnings = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&hellip;/g, '…');
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:.-]+)="([^"]*)"/g)].map((m) => [m[1], decode(m[2])]));
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'gi'))].map((m) => attrs(m[0]));
const text = (html) =>
  decode(
    html
      .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/\s+/g, ' ')
    .trim();

const fileFor = (path) =>
  path === '/' ? join(dist, 'index.html') : path === NOT_FOUND_PATH ? join(dist, '404.html') : join(dist, `${path.slice(1)}.html`);

const routePaths = new Set(siteRoutes.map((r) => r.path));
const staticFileExists = (path) => existsSync(join(dist, decodeURIComponent(path).replace(/^\//, '')));

/** Returns an error message if an internal href doesn't resolve, otherwise null. */
function checkHref(href) {
  let path = href;
  if (path.startsWith(SITE_URL)) path = path.slice(SITE_URL.length) || '/';
  if (!path.startsWith('/') || path.startsWith('//')) return null;
  path = path.split('#')[0].split('?')[0] || '/';
  if (path !== '/' && path.endsWith('/')) return `trailing slash in ${href}`;
  if (routePaths.has(path) || staticFileExists(path)) return null;
  return `broken internal link ${href}`;
}

const titles = new Map();
const descriptions = new Map();
const pages = [...siteRoutes.map((r) => ({ ...r, notFound: false })), { path: NOT_FOUND_PATH, notFound: true }];
const summary = [];

for (const page of pages) {
  const where = page.notFound ? '404.html' : page.path;
  const file = fileFor(page.path);
  if (!existsSync(file)) {
    fail(where, `missing prerendered file ${file}`);
    continue;
  }
  const html = readFileSync(file, 'utf8');
  const head = html.slice(0, html.indexOf('</head>'));
  const body = html.slice(html.indexOf('<body'));

  // Content without JavaScript
  if (!/<html lang="en"/.test(html)) fail(where, 'missing <html lang="en">');
  const h1s = [...body.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map((m) => text(m[1]));
  if (h1s.length !== 1) fail(where, `expected exactly one <h1>, found ${h1s.length}`);
  else if (h1s[0].length < 10) fail(where, `h1 looks empty: "${h1s[0]}"`);
  const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? '';
  const words = text(main).split(' ').filter(Boolean).length;
  if (words < (page.notFound ? 30 : MIN_WORDS)) fail(where, `only ${words} words of body text in <main>`);
  for (const landmark of ['header', 'nav', 'main', 'footer']) {
    if (!new RegExp(`<${landmark}\\b`, 'i').test(body)) fail(where, `missing <${landmark}> landmark`);
  }
  for (const img of tags(body, 'img')) {
    if (!('alt' in img)) fail(where, `<img src="${img.src}"> has no alt attribute`);
    if (!img.width || !img.height) fail(where, `<img src="${img.src}"> has no width/height`);
  }

  // Head tags
  const titleTags = [...head.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => decode(m[1]));
  const metas = tags(head, 'meta');
  const links = tags(head, 'link');
  const byName = (n) => metas.filter((m) => m.name === n);
  const byProp = (p) => metas.filter((m) => m.property === p);
  const one = (list, label) => {
    if (list.length !== 1) fail(where, `expected exactly one ${label}, found ${list.length}`);
    return list[0];
  };

  const title = titleTags.length === 1 ? titleTags[0] : (fail(where, `expected one <title>, found ${titleTags.length}`), '');
  const description = one(byName('description'), 'meta description')?.content ?? '';
  const canonicals = links.filter((l) => l.rel === 'canonical');
  const canonical = page.notFound ? canonicals[0]?.href : one(canonicals, 'canonical')?.href;
  if (page.notFound && canonicals.length) fail(where, '404 page should not have a canonical');
  const robots = one(byName('robots'), 'meta robots')?.content ?? '';

  if (page.notFound) {
    if (!/noindex/.test(robots)) fail(where, '404 page must be noindex');
  } else {
    if (robots !== ROBOTS) fail(where, `robots is "${robots}"`);
    if (canonical !== absoluteUrl(page.path)) fail(where, `canonical ${canonical} != ${absoluteUrl(page.path)}`);
    if (title.length < TITLE[0] || title.length > TITLE[1]) fail(where, `title is ${title.length} chars: "${title}"`);
    if (description.length < DESCRIPTION[0] || description.length > DESCRIPTION[1]) {
      fail(where, `description is ${description.length} chars: "${description}"`);
    }
    if (!title.endsWith('| The Lapis AI')) fail(where, `title doesn't end with "| The Lapis AI": "${title}"`);
    if (titles.has(title)) fail(where, `duplicate title (also ${titles.get(title)})`);
    if (descriptions.has(description)) fail(where, `duplicate description (also ${descriptions.get(description)})`);
    titles.set(title, where);
    descriptions.set(description, where);
    if (byName('keywords').length) fail(where, 'meta keywords tag present');
  }

  for (const p of ['og:title', 'og:description', 'og:url', 'og:type', 'og:image', 'og:image:width', 'og:image:height', 'og:image:alt', 'og:site_name', 'og:locale']) {
    one(byProp(p), p);
  }
  if (byProp('og:locale:alternate').length !== 2) fail(where, 'expected og:locale:alternate en_GB and en_US');
  for (const n of ['twitter:card', 'twitter:title', 'twitter:description', 'twitter:image', 'twitter:image:alt']) one(byName(n), n);
  if (!page.notFound && byProp('og:url')[0]?.content !== canonical) fail(where, 'og:url differs from canonical');
  if (byName('twitter:card')[0]?.content !== 'summary_large_image') fail(where, 'twitter:card is not summary_large_image');
  const ogImage = byProp('og:image')[0]?.content ?? '';
  if (!ogImage.startsWith(`${SITE_URL}/`) || !staticFileExists(ogImage.slice(SITE_URL.length))) {
    fail(where, `og:image file not found: ${ogImage}`);
  }
  const ogType = byProp('og:type')[0]?.content;
  const expectArticle = page.group === 'blog' || page.group === 'case-study';
  if (expectArticle !== (ogType === 'article')) fail(where, `og:type is ${ogType}`);
  if (page.group === 'blog') {
    for (const p of ['article:published_time', 'article:modified_time', 'article:section']) one(byProp(p), p);
  }

  // Structured data
  const blocks = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
  if (!blocks.length) fail(where, 'no JSON-LD');
  const types = [];
  const defined = new Set();
  const refs = new Set();
  const walk = (node) => {
    if (Array.isArray(node)) return node.forEach(walk);
    if (!node || typeof node !== 'object') return;
    const keys = Object.keys(node);
    if (node['@id'] && keys.length === 1) refs.add(node['@id']);
    else if (node['@id']) defined.add(node['@id']);
    Object.values(node).forEach(walk);
  };
  for (const block of blocks) {
    try {
      const data = JSON.parse(block);
      for (const node of data['@graph'] ?? [data]) types.push([node['@type']].flat().join('+'));
      walk(data);
    } catch (e) {
      fail(where, `JSON-LD does not parse: ${e.message}`);
    }
  }
  if (!defined.has(`${SITE_URL}/#organization`)) fail(where, 'Organization node missing from JSON-LD');
  if (!defined.has(`${SITE_URL}/#website`)) fail(where, 'WebSite node missing from JSON-LD');
  for (const ref of refs) {
    if (defined.has(ref)) continue;
    const base = ref.split('#')[0].slice(SITE_URL.length) || '/';
    if (!ref.startsWith(SITE_URL) || !routePaths.has(base)) fail(where, `JSON-LD reference ${ref} does not resolve`);
  }
  if (!page.notFound && page.path !== '/' && !types.includes('BreadcrumbList')) fail(where, 'missing BreadcrumbList');
  if (/FAQPage/.test(types.join(' ')) && !/class="faq-/.test(body)) fail(where, 'FAQPage without a visible FAQ');

  // Internal links
  for (const a of tags(body, 'a')) {
    if (!a.href) continue;
    const problem = checkHref(a.href);
    if (problem) fail(where, problem);
  }

  summary.push({ page: where, title: title.length, desc: description.length, words, jsonLd: types.join(', ') });
}

// Sitemap
const sitemapFile = join(dist, 'sitemap.xml');
if (!existsSync(sitemapFile)) fail('sitemap.xml', 'missing');
else {
  const locs = [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = new Set(siteRoutes.map((r) => absoluteUrl(r.path)));
  if (new Set(locs).size !== locs.length) fail('sitemap.xml', 'duplicate <loc>');
  for (const loc of locs) if (!expected.has(loc)) fail('sitemap.xml', `unexpected ${loc}`);
  for (const url of expected) if (!locs.includes(url)) fail('sitemap.xml', `missing ${url}`);
  if (/\?|<loc>[^<]*404/.test(locs.join(' '))) fail('sitemap.xml', 'contains a query string or the 404 page');
}

// Crawler files
const robotsTxt = existsSync(join(dist, 'robots.txt')) ? readFileSync(join(dist, 'robots.txt'), 'utf8').replace(/\r\n/g, '\n') : '';
if (!robotsTxt) fail('robots.txt', 'missing');
else {
  if (!robotsTxt.includes(`Sitemap: ${SITE_URL}/sitemap.xml`)) fail('robots.txt', 'missing Sitemap line');
  if (/^Disallow:\s*\/\s*$/m.test(robotsTxt)) fail('robots.txt', 'blocks a crawler');
  for (const bot of ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'ClaudeBot', 'Claude-User', 'Claude-SearchBot', 'Google-Extended', 'Applebot', 'Applebot-Extended', 'CCBot', 'DuckAssistBot', 'Meta-ExternalAgent']) {
    if (!robotsTxt.includes(`User-agent: ${bot}\nAllow: /`)) fail('robots.txt', `no explicit Allow for ${bot}`);
  }
}
for (const name of ['llms.txt', 'llms-full.txt']) {
  const file = join(dist, name);
  if (!existsSync(file)) {
    fail(name, 'missing');
    continue;
  }
  const md = readFileSync(file, 'utf8');
  if (!md.startsWith('# The Lapis AI')) fail(name, 'must start with "# The Lapis AI"');
  for (const m of md.matchAll(/\]\((https?:\/\/[^)\s]+)\)/g)) {
    const problem = m[1].startsWith(SITE_URL) ? checkHref(m[1]) : null;
    if (problem) fail(name, problem);
  }
}
const html404 = existsSync(join(dist, '404.html')) ? readFileSync(join(dist, '404.html'), 'utf8') : '';
if (!/<meta[^>]+name="robots"[^>]+content="noindex/.test(html404)) fail('404.html', 'missing or not noindex');

console.table(summary);
if (warnings.length) console.warn(warnings.join('\n'));
if (errors.length) {
  console.error(`\nverify-seo: ${errors.length} problem(s)\n  ${errors.join('\n  ')}`);
  process.exit(1);
}
console.log(`\nverify-seo: all checks passed for ${siteRoutes.length} routes + 404 (sitemap, robots.txt, llms.txt, llms-full.txt).`);
