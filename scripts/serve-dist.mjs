// Zero-dependency static server for dist/ that mimics the Vercel config in vercel.json
// (cleanUrls, trailingSlash: false, the 301 redirects and 404.html with a real 404 status),
// with gzip for text assets and empty stubs for Vercel's /_vercel/* analytics scripts.
//   npm run build && npm run serve:dist   ->   http://localhost:4180
import { createServer } from 'node:http';
import { existsSync, readFileSync, statSync, createReadStream } from 'node:fs';
import { dirname, extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const port = Number(process.env.PORT) || 4180;
const { redirects = [] } = JSON.parse(readFileSync(join(root, 'vercel.json'), 'utf8'));

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};

const isFile = (file) => existsSync(file) && statSync(file).isFile();
const inDist = (file) => file === dist || file.startsWith(dist + sep);

const COMPRESSIBLE = new Set(['.html', '.js', '.css', '.json', '.webmanifest', '.xml', '.txt', '.svg']);

function send(res, status, file, req) {
  const type = TYPES[extname(file)] ?? 'application/octet-stream';
  const gzip = COMPRESSIBLE.has(extname(file)) && /\bgzip\b/.test(req.headers['accept-encoding'] ?? '');
  res.writeHead(status, { 'Content-Type': type, ...(gzip ? { 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' } : {}) });
  const stream = createReadStream(file);
  (gzip ? stream.pipe(createGzip()) : stream).pipe(res);
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname, search } = url;
  const redirect = (status, location) => {
    res.writeHead(status, { Location: location });
    res.end();
  };

  // Vercel injects these analytics scripts on deployments; locally they are empty stubs.
  if (pathname.startsWith('/_vercel/')) {
    res.writeHead(200, { 'Content-Type': TYPES['.js'] });
    return res.end('');
  }

  const rule = redirects.find((r) => r.source === pathname);
  if (rule) return redirect(rule.statusCode ?? 308, rule.destination);
  if (pathname !== '/' && pathname.endsWith('/')) return redirect(308, pathname.replace(/\/+$/, '') + search);
  if (pathname.endsWith('.html')) return redirect(308, (pathname.replace(/(\/index)?\.html$/, '') || '/') + search);

  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    return send(res, 400, join(dist, '404.html'), req);
  }
  const base = normalize(join(dist, decoded));
  if (!inDist(base)) return send(res, 404, join(dist, '404.html'), req);

  const candidates = pathname === '/' ? [join(dist, 'index.html')] : [base, `${base}.html`];
  const file = candidates.find(isFile);
  if (file) return send(res, 200, file, req);
  return send(res, 404, join(dist, '404.html'), req);
});

server.listen(port, () => console.log(`Serving dist/ at http://localhost:${port}`));
