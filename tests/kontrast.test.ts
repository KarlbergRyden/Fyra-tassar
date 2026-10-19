import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

/** WCAG 2.2 AA: 4.5:1 för normal text, 3:1 för stor text och grafik. Läser färgtokens direkt ur global.css. */
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const token = (namn: string) => {
  const m = css.match(new RegExp(`--${namn}:\\s*(#[0-9a-fA-F]{6})`));
  if (!m) throw new Error(`token --${namn} saknas`);
  return m[1];
};

const lum = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const kontrast = (a: string, b: string) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

const vit = '#ffffff';
const par: [string, string, string, number][] = [
  ['ink', 'bg', 'brödtext på vit bakgrund', 4.5],
  ['ink-soft', 'bg', 'dämpad text på vit bakgrund', 4.5],
  ['ink-soft', 'bg-soft', 'dämpad text på ljusgrå sektion', 4.5],
  ['ink', 'bg-soft', 'brödtext på ljusgrå sektion', 4.5],
  ['pink-700', 'bg', 'länkar och eyebrow på vit bakgrund', 4.5],
  ['pink-700', 'bg-soft', 'länkar på ljusgrå sektion', 4.5],
  ['pink-900', 'pink-100', 'badge-text på ljusrosa', 4.5],
  ['pink-900', 'bg', 'länk i hover-läge', 4.5],
  ['pink-300', 'black-900', 'rosa accent på svart', 4.5],
  ['pink-300', 'black-800', 'rosa ikoner på övre linjen', 4.5],
  ['focus', 'bg', 'fokusmarkering (3:1 för ej text)', 3],
  ['coral-700', 'bg', 'felfärg', 4.5],
  ['ok', 'bg', 'statusfärg öppet', 3],
  ['dark-text', 'black-950', 'mörkt tema: brödtext på bakgrund', 4.5],
  ['dark-text', 'dark-surface', 'mörkt tema: brödtext på kort', 4.5],
  ['dark-text-soft', 'black-950', 'mörkt tema: dämpad text på bakgrund', 4.5],
  ['dark-text-soft', 'dark-surface', 'mörkt tema: dämpad text på kort', 4.5],
  ['dark-text-soft', 'dark-band', 'mörkt tema: dämpad text på band', 4.5],
  ['pink-300', 'dark-surface', 'mörkt tema: rosa länkar/priser på kort', 4.5],
  ['pink-300', 'black-950', 'mörkt tema: rosa länkar på bakgrund', 4.5],
  ['pink-300', 'dark-band', 'mörkt tema: rosa länkar på band', 4.5],
];
const mot_vit: [string, string, number][] = [
  ['pink-700', 'vit text på primärknapp och menyrad', 4.5],
  ['pink-900', 'vit text på aktiv menypunkt/hover', 4.5],
  ['black-900', 'vit text på sidhuvud, plattor, sidfot', 4.5],
  ['black-800', 'vit text på övre linjen', 4.5],
  ['ink', 'vit text på mörk ink', 4.5],
];

describe('färgkontrast (WCAG 2.2 AA)', () => {
  for (const [fg, bg, vad, min] of par) {
    it(`${vad}: --${fg} på --${bg} ≥ ${min}:1`, () => {
      expect(kontrast(token(fg), token(bg))).toBeGreaterThanOrEqual(min);
    });
  }
  for (const [bg, vad, min] of mot_vit) {
    it(`${vad}: vit på --${bg} ≥ ${min}:1`, () => {
      expect(kontrast(vit, token(bg))).toBeGreaterThanOrEqual(min);
    });
  }
});
