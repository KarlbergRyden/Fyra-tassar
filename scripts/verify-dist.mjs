// Kontrollerar den byggda webbplatsen (dist/) mot kravspecen:
// unik title + description, en H1, canonical, alt-texter, interna länkar/ankare, lang, sitemap, robots.
// Kör: npm run build && npm run verify
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
if (!existsSync(dist)) {
  console.error('dist/ saknas – kör "npm run build" först.');
  process.exit(1);
}

const fel = [];
const varning = [];
const html = [];

function gaIgenom(mapp) {
  for (const namn of readdirSync(mapp)) {
    const full = join(mapp, namn);
    if (statSync(full).isDirectory()) gaIgenom(full);
    else if (namn.endsWith('.html')) html.push(full);
  }
}
gaIgenom(dist);

const urlFran = (fil) => {
  const rel = relative(dist, fil).split(sep).join('/');
  if (rel === 'index.html') return '/';
  if (rel === '404.html') return '/404.html';
  return '/' + rel.replace(/index\.html$/, '');
};

const sidor = new Map();
const omdirigeringar = new Set();
for (const fil of html) {
  const kalla = readFileSync(fil, 'utf8');
  if (/http-equiv="refresh"/i.test(kalla)) {
    omdirigeringar.add(urlFran(fil));
    continue;
  }
  sidor.set(urlFran(fil), kalla);
}

const finns = (url) => {
  const ren = url.split('#')[0].split('?')[0];
  if (sidor.has(ren) || omdirigeringar.has(ren)) return true;
  const fil = join(dist, ren);
  return existsSync(fil) && statSync(fil).isFile();
};
const ids = (kalla) => new Set([...kalla.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

const titlar = new Map();
const beskrivningar = new Map();

for (const [url, kalla] of sidor) {
  const rapport = (msg) => fel.push(`${url}: ${msg}`);

  if (!/<html[^>]*\slang="sv"/.test(kalla)) rapport('saknar lang="sv"');
  const title = kalla.match(/<title>([^<]*)<\/title>/)?.[1]?.trim();
  if (!title) rapport('saknar <title>');
  else {
    if (titlar.has(title)) rapport(`dubblett av title (även ${titlar.get(title)}): "${title}"`);
    titlar.set(title, url);
    if (title.length > 70) varning.push(`${url}: title är ${title.length} tecken`);
  }
  const desc = kalla.match(/<meta name="description" content="([^"]*)"/)?.[1];
  if (!desc) rapport('saknar meta description');
  else {
    if (beskrivningar.has(desc)) rapport(`dubblett av meta description (även ${beskrivningar.get(desc)})`);
    beskrivningar.set(desc, url);
    if (desc.length > 175) varning.push(`${url}: description är ${desc.length} tecken`);
  }
  if (!/<link rel="canonical" href="https:\/\/fyratassar\.nu[^"]*"/.test(kalla)) rapport('saknar canonical');
  if (!/<meta property="og:title"/.test(kalla)) rapport('saknar Open Graph');

  const h1 = (kalla.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) rapport(`${h1} st <h1> (ska vara 1)`);

  // Rubriknivåer får inte hoppa över steg
  let senaste = 1;
  for (const m of kalla.matchAll(/<h([1-6])[\s>]/g)) {
    const niva = Number(m[1]);
    if (niva > senaste + 1) rapport(`rubrikhopp h${senaste} → h${niva}`);
    senaste = niva;
  }

  for (const m of kalla.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt(=|\s|>)/.test(m[0])) rapport(`<img> utan alt: ${m[0].slice(0, 80)}`);
  }

  for (const m of kalla.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    const href = m[1];
    if (/^(mailto:|tel:|sms:|https?:)/.test(href)) continue;
    if (href.startsWith('#')) {
      if (href.length > 1 && !ids(kalla).has(href.slice(1))) rapport(`ankare saknas: ${href}`);
      continue;
    }
    if (!finns(href)) rapport(`trasig intern länk: ${href}`);
    else if (href.includes('#')) {
      const mal = sidor.get(href.split('#')[0]);
      if (mal && !ids(mal).has(href.split('#')[1])) rapport(`ankare saknas på målsidan: ${href}`);
    }
  }

  // Externa länkar som öppnas i ny flik ska ha rel och varning för skärmläsare
  for (const m of kalla.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    if (!/rel="[^"]*noopener/.test(m[0])) rapport('target=_blank utan rel=noopener');
  }

  // Placeholder-rester
  if (/lorem ipsum|TODO|FIXME|XXX/i.test(kalla.replace(/<script[\s\S]*?<\/script>/g, ''))) {
    rapport('innehåller placeholder-text (lorem/TODO/FIXME)');
  }
}

// Sitemap och robots
const sitemapIndex = join(dist, 'sitemap-index.xml');
if (!existsSync(sitemapIndex)) fel.push('sitemap-index.xml saknas');
else {
  const sm = readFileSync(join(dist, 'sitemap-0.xml'), 'utf8');
  const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  for (const u of urls) if (!sidor.has(u)) fel.push(`sitemap pekar på sida som saknas: ${u}`);
  for (const u of sidor.keys())
    if (u !== '/404.html' && !urls.includes(u)) fel.push(`sida saknas i sitemap: ${u}`);
  console.log(`Sitemap: ${urls.length} URL:er`);
}
if (!existsSync(join(dist, 'robots.txt'))) fel.push('robots.txt saknas');
if (!existsSync(join(dist, 'og-bild.png'))) fel.push('og-bild.png saknas');

console.log(`Kontrollerade ${sidor.size} sidor.`);
for (const v of varning) console.warn(`  varning  ${v}`);
if (fel.length) {
  console.error(`\n${fel.length} fel:`);
  for (const f of fel) console.error(`  fel  ${f}`);
  process.exit(1);
}
console.log('Inga fel hittades.');
