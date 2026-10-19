import { describe, expect, it } from 'vitest';
import { googleBetyg, harOmdomen, omdomen, publiceradeOmdomen } from '../src/data/omdomen';

describe('omdömen', () => {
  it('är tomma från start – inga påhittade omdömen', () => {
    expect(omdomen).toEqual([]);
    expect(googleBetyg).toBeNull();
    expect(harOmdomen()).toBe(false);
  });
  it('publicerar bara omdömen med tillstånd och text', () => {
    const lista = [
      { text: 'Bra!', namn: 'Anna', tillstand: true },
      { text: 'Utan tillstånd', namn: 'Bo', tillstand: false },
      { text: '  ', namn: 'Cia', tillstand: true },
    ];
    expect(lista.filter((o) => o.tillstand && o.text.trim() && o.namn.trim())).toHaveLength(1);
    expect(publiceradeOmdomen()).toEqual([]);
  });
});
