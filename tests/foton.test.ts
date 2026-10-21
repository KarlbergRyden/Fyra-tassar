import { describe, expect, it } from 'vitest';
import { altFor, foto, fotoplatser, produktFotoId } from '../src/data/foton';
import { team } from '../src/data/team';
import { tjanster } from '../src/data/tjanster';
import { produkter } from '../src/data/webbshop';

describe('fotoplatser', () => {
  it('har unika id:n som fungerar som filnamn och en alt-text', () => {
    const ider = fotoplatser.map((f) => f.id);
    expect(new Set(ider).size).toBe(ider.length);
    for (const f of fotoplatser) {
      expect(f.id).toMatch(/^[A-Za-z0-9-]+$/);
      expect(f.alt.length).toBeGreaterThan(3);
      expect(f.format.length).toBeGreaterThan(3);
    }
  });
  it('har en fotoplats för varje person i teamet', () => {
    for (const p of team) {
      expect(p.foto, `${p.namn} saknar foto-id`).toBeTruthy();
      expect(fotoplatser.some((f) => f.id === p.foto), `${p.foto} saknas i fotoplatser`).toBe(true);
      expect(altFor(p.foto!)).toBe(p.namn);
    }
  });
  it('pekar bara ut personer som finns i teamet', () => {
    for (const t of tjanster) for (const n of t.utforare.personer ?? []) expect(team.some((p) => p.namn === n)).toBe(true);
  });
});

describe('foto()', () => {
  it('ger null för en bild som inte finns, så att ingenting visas', () => {
    expect(foto('finns-inte')).toBeNull();
  });
  it('bygger filnamn för produktfoton ur produktens id', () => {
    for (const p of produkter) expect(produktFotoId(p.id)).toMatch(/^produkt-[a-z0-9-]+$/);
  });
});
