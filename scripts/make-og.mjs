// Genererar public/og-bild.png (1200×630) för delning i sociala medier:
// originalets hero-foto, mörk toning, logotyp och rubrik. Kör: npm run og
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const rot = fileURLToPath(new URL('../', import.meta.url));

const bakgrund = await sharp(`${rot}source-images/slide-1.jpg`)
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .toBuffer();

const logo = await sharp(`${rot}source-images/site-logo.png`).resize({ width: 230 }).toBuffer();

const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="#141414" stop-opacity="0.9"/><stop offset="0.6" stop-color="#141414" stop-opacity="0.55"/><stop offset="1" stop-color="#141414" stop-opacity="0.15"/>
  </linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <rect y="618" width="1200" height="12" fill="#d4147b"/>
  <text x="70" y="330" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="700" fill="#ffffff">Allt till din hund</text>
  <text x="70" y="418" font-family="Segoe UI, Arial, sans-serif" font-size="76" font-weight="700" fill="#ff8cc6">och katt – nära dig</text>
  <text x="70" y="495" font-family="Segoe UI, Arial, sans-serif" font-size="32" fill="#f1f1f1">Foder · Tillbehör · Kloklippning · Hundkurser</text>
  <text x="70" y="548" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="#d6d6d6">Hantverkargatan 5, Borlänge · fyratassar.nu</text>
</svg>`);

const png = await sharp(bakgrund)
  .composite([{ input: overlay }, { input: logo, left: 70, top: 60 }])
  .png({ compressionLevel: 9, palette: true, quality: 85 })
  .toBuffer();
writeFileSync(`${rot}public/og-bild.png`, png);
console.log(`og-bild.png skapad (${Math.round(png.length / 1024)} kB)`);
