// Skapar optimerade bilder (WebP) i public/images + src/data/bilder.manifest.json
// från originalfilerna i source-images/. Kör: npm run images
import sharp from 'sharp';
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const rot = fileURLToPath(new URL('../', import.meta.url));
const ut = `${rot}public/images/`;
mkdirSync(ut, { recursive: true });

/** namn → { källa, bredder, kvalitet, beskärning? (extract i originalpixlar) } */
const jobb = {
  logo: { kalla: 'site-logo.png', bredder: [320, 640], kvalitet: 88 },
  hero: { kalla: 'slide-1.jpg', bredder: [640, 800, 1280, 1920], kvalitet: 72 },
  bannerHund: { kalla: 'bild-1.jpg', bredder: [750, 1500], kvalitet: 72 },
  bannerSkog: { kalla: 'bild-2.jpg', bredder: [750, 1500], kvalitet: 72 },
  bannerKatt: { kalla: 'bild-3.jpg', bredder: [750, 1500], kvalitet: 72 },
  rottweiler: {
    kalla: 'slide-1.jpg',
    bredder: [480, 800],
    kvalitet: 74,
    beskarning: { left: 880, top: 120, width: 1200, height: 1200 },
  },
  katt: { kalla: 'puff-3.jpg', bredder: [480, 800], kvalitet: 74 },
  bordercollie: { kalla: 'puff-1.jpg', bredder: [480, 800], kvalitet: 74 },
  team: { kalla: '4tassaromossbild.png', bredder: [640, 1200], kvalitet: 82 },
  kursledare: { kalla: 'received_576056580019012.jpeg', bredder: [640, 1280, 1920], kvalitet: 74 },
};

// Egna foton: source-images/foton/<id>.jpg|png|webp. Heter filen som en befintlig bild (hero, team …)
// ersätter den originalet. Annars blir den en ny fotoplats, se src/data/foton.ts och FOTOGUIDE.md.
const fotoMapp = `${rot}source-images/foton/`;
const egnaFoton = new Map(
  (existsSync(fotoMapp) ? readdirSync(fotoMapp) : [])
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .map((f) => [f.replace(/\.[^.]+$/, ''), f]),
);
const OVERSTIGBARA = new Set(['logo', 'logoBanner']);
const ersatter = new Map();
for (const id of egnaFoton.keys()) {
  const traff = Object.keys(jobb).find((n) => n.toLowerCase() === id.toLowerCase());
  if (traff && !OVERSTIGBARA.has(traff)) ersatter.set(traff, egnaFoton.get(id));
  else if (!traff && !/^[A-Za-z0-9-]+$/.test(id)) console.warn(`Hoppar över ${id}: använd bara bokstäver a–z, siffror och bindestreck i filnamnet.`);
}
for (const [namn, fil] of ersatter) {
  jobb[namn] = { ...jobb[namn], kalla: `foton/${fil}`, beskarning: undefined };
  console.log(`Egen bild ersätter ${namn}: ${fil}`);
}
for (const [id, fil] of egnaFoton) {
  if (Object.keys(jobb).some((n) => n.toLowerCase() === id.toLowerCase())) continue;
  if (!/^[A-Za-z0-9-]+$/.test(id)) continue;
  jobb[id] = { kalla: `foton/${fil}`, bredder: [480, 960, 1600], kvalitet: 76, foto: true };
}

const manifest = {};
for (const [namn, j] of Object.entries(jobb)) {
  manifest[namn] = [];
  // Egna foton: aldrig större än originalet, så att inga dubbletter av samma storlek skapas
  let bredder = j.bredder;
  if (j.foto) {
    const m = await sharp(`${rot}source-images/${j.kalla}`).metadata();
    const width = m.orientation && m.orientation >= 5 ? m.height : m.width; // mobilfoton kan vara liggande i filen men stående i verkligheten
    bredder = [...new Set(j.bredder.map((b) => Math.min(b, width)))];
  }
  for (const bredd of bredder) {
    let bild = sharp(`${rot}source-images/${j.kalla}`).rotate();
    if (j.beskarning) bild = bild.extract(j.beskarning);
    const info = await bild
      .resize({ width: bredd, withoutEnlargement: true })
      .webp({ quality: j.kvalitet, alphaQuality: 90 })
      .toFile(`${ut}${namn}-${bredd}.webp`);
    manifest[namn].push({ fil: `/images/${namn}-${bredd}.webp`, bredd: info.width, hojd: info.height, kb: Math.round(info.size / 1024) });
  }
}

// Logotyp som banner: bara det svarta motivet (4:an, tassarna, texten) utan den rosa ovalen.
// Alfa räknas ur röd-kanalen (rosa = 212, svart ≈ 14), så kanterna blir rena och motivet kan
// läggas på valfri bakgrundsfärg (bannerns magenta sätts i CSS).
manifest.logoBanner = [];
for (const bredd of [240, 480]) {
  const { data, info } = await sharp(`${rot}source-images/site-logo.png`)
    .extract({ left: 380, top: 130, width: 1260, height: 1020 })
    .resize({ width: bredd })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const a = Math.min(1, Math.max(0, (212 - data[i]) / (212 - 16)));
    const original = data[i + 3] / 255;
    data[i] = 13;
    data[i + 1] = 11;
    data[i + 2] = 16;
    data[i + 3] = Math.round(a * original * 255);
  }
  const ut2 = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ lossless: true })
    .toFile(`${ut}logoBanner-${bredd}.webp`);
  manifest.logoBanner.push({ fil: `/images/logoBanner-${bredd}.webp`, bredd: ut2.width, hojd: ut2.height, kb: Math.round(ut2.size / 1024) });
}

// Favicon och app-ikon från originalets favicon
const fav = `${rot}source-images/favicon.png`;
await sharp(fav).resize(48, 48).png().toFile(`${rot}public/favicon-48.png`);
await sharp(fav).resize(192, 192).png().toFile(`${rot}public/favicon-192.png`);
await sharp(fav).resize(180, 180).flatten({ background: '#ffffff' }).png().toFile(`${rot}public/apple-touch-icon.png`);

// Städa bort webp-filer (och avif-rester) från foton som tagits bort
for (const f of readdirSync(ut)) {
  const klar = Object.values(manifest).some((v) => v.some((x) => x.fil === `/images/${f}`));
  if (/-\d+\.(webp|avif)$/.test(f) && !klar) {
    unlinkSync(`${ut}${f}`);
    console.log(`Tog bort ${f}`);
  }
}

writeFileSync(`${rot}src/data/bilder.manifest.json`, JSON.stringify(manifest, null, 2) + '\n');
for (const [n, v] of Object.entries(manifest)) console.log(n.padEnd(14), v.map((x) => `${x.bredd}×${x.hojd} ${x.kb}kB`).join('  '));
