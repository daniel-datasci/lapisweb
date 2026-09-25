// Submits every sitemap URL to IndexNow (Bing, Yandex, Seznam, Naver…; Bing's index feeds
// ChatGPT search and Copilot). Run it after each production deploy:
//   npm run indexnow
// The key file public/<key>.txt must be live at https://thelapisai.com.ng/<key>.txt first.
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = 'https://thelapisai.com.ng';
const host = new URL(SITE_URL).host;

const keyFile = readdirSync(join(root, 'public')).find((f) => /^[a-f0-9]{32}\.txt$/.test(f));
if (!keyFile) throw new Error('No IndexNow key file (32 hex characters + .txt) found in public/.');
const key = readFileSync(join(root, 'public', keyFile), 'utf8').trim();
const keyLocation = `${SITE_URL}/${keyFile}`;

// Use the live sitemap so only deployed URLs are submitted.
const res = await fetch(`${SITE_URL}/sitemap.xml`);
if (!res.ok) throw new Error(`Could not fetch the live sitemap (${res.status}). Is the site deployed?`);
const urlList = [...(await res.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (!urlList.length) throw new Error('The live sitemap has no <loc> entries.');

const keyCheck = await fetch(keyLocation);
if (!keyCheck.ok || (await keyCheck.text()).trim() !== key) {
  throw new Error(`The key file is not live at ${keyLocation} yet. Deploy first.`);
}

const submit = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});
console.log(`IndexNow: submitted ${urlList.length} URLs, HTTP ${submit.status} ${submit.statusText}`);
if (submit.status >= 400) {
  console.error(await submit.text());
  process.exit(1);
}
