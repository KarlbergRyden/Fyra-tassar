import { describe, expect, it } from 'vitest';
import { byggFoderfraga } from '../src/lib/foderhjalp';

describe('byggFoderfraga', () => {
  it('beskriver djur, ålder och behov i en läsbar fråga', () => {
    expect(byggFoderfraga({ djur: 'hund', alder: 'ung', behov: ['mage'] })).toBe(
      'Jag vill ha hjälp att välja foder till min valp eller unghund. Särskilda behov: känslig mage.',
    );
  });
  it('anger att inga särskilda behov finns', () => {
    expect(byggFoderfraga({ djur: 'katt', alder: 'vuxen', behov: [] })).toBe(
      'Jag vill ha hjälp att välja foder till min vuxen katt. Inga särskilda behov.',
    );
  });
  it('håller behoven i listans ordning och tar med nuvarande foder', () => {
    const t = byggFoderfraga({ djur: 'hund', alder: 'senior', behov: ['aktiv', 'mage'], nuvarande: '  Royal   Canin ' });
    expect(t).toContain('känslig mage, mycket aktiv eller arbetande');
    expect(t.endsWith('Äter idag: Royal Canin.')).toBe(true);
  });
  it('kortar onormalt långt nuvarande foder', () => {
    const t = byggFoderfraga({ djur: 'hund', alder: 'vuxen', behov: [], nuvarande: 'x'.repeat(500) });
    expect(t.length).toBeLessThan(220);
  });
});
