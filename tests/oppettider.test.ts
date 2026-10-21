import { describe, expect, it } from 'vitest';
import { oppetStatus, svenskTid } from '../src/lib/oppettider';
import { site } from '../src/data/site';

// Sommartid i Sverige = UTC+2, vintertid = UTC+1
const status = (iso: string) => oppetStatus(new Date(iso), site.oppettider, site.undantag);

describe('svenskTid', () => {
  it('räknar om UTC till svensk tid (sommar)', () => {
    const t = svenskTid(new Date('2026-07-01T10:00:00Z')); // onsdag 12:00 lokal tid
    expect(t.datum).toBe('2026-07-01');
    expect(t.dag).toBe(3);
    expect(t.minuter).toBe(12 * 60);
  });
  it('hanterar dygnsskifte mot UTC', () => {
    const t = svenskTid(new Date('2026-12-31T23:30:00Z')); // 00:30 nyårsdagen lokalt
    expect(t.datum).toBe('2027-01-01');
  });
});

describe('oppetStatus', () => {
  it('öppet en vanlig vardag', () => {
    const s = status('2026-10-14T08:00:00Z'); // onsdag 10:00 lokal tid (CEST)
    expect(s.oppet).toBe(true);
    expect(s.text).toBe('Öppet nu – stänger 18.00');
  });
  it('tisdagar stänger 19.00', () => {
    expect(status('2026-10-13T15:00:00Z').text).toBe('Öppet nu – stänger 19.00');
  });
  it('stängt före öppning', () => {
    const s = status('2026-10-14T06:30:00Z'); // 08:30 lokalt
    expect(s).toEqual({ oppet: false, text: 'Stängt – öppnar idag 10.00' });
  });
  it('stängt efter stängning, öppnar imorgon', () => {
    const s = status('2026-10-14T17:00:00Z'); // onsdag 19:00 lokalt
    expect(s).toEqual({ oppet: false, text: 'Stängt – öppnar imorgon 10.00' });
  });
  it('lördag stänger 15.00', () => {
    expect(status('2026-10-17T10:00:00Z').text).toBe('Öppet nu – stänger 15.00');
    expect(status('2026-10-17T14:00:00Z').oppet).toBe(false); // 16:00 lokalt
  });
  it('söndag stängt, öppnar måndag', () => {
    const s = status('2026-10-18T10:00:00Z');
    expect(s).toEqual({ oppet: false, text: 'Stängt – öppnar imorgon 10.00' });
  });
  it('lördag kväll pekar på måndag (hoppar över söndag)', () => {
    const s = status('2026-10-17T15:00:00Z'); // lördag 17:00 lokalt
    expect(s.text).toBe('Stängt – öppnar måndag 10.00');
  });
  it('undantag åsidosätter ordinarie tider', () => {
    const s = oppetStatus(new Date('2026-10-14T08:00:00Z'), site.oppettider, [
      { datum: '2026-10-14', oppnar: null, stanger: null, not: 'Test' },
    ]);
    expect(s.oppet).toBe(false);
  });
});

import { oppettiderKompakt } from '../src/lib/oppettider';
import { oppettiderMonSun } from '../src/data/site';

describe('oppettiderKompakt', () => {
  it('slår ihop dagar med samma tider', () => {
    expect(oppettiderKompakt(oppettiderMonSun)).toBe('Mån 10–18 · Tis 10–19 · Ons–fre 10–18 · Lör 10–15 · Sön stängt');
  });
  it('skriver halvtimmar med punkt', () => {
    const dagar = [
      { dag: 1 as const, namn: 'Måndag', oppnar: '09:30', stanger: '17:00' },
      { dag: 2 as const, namn: 'Tisdag', oppnar: '09:30', stanger: '17:00' },
    ];
    expect(oppettiderKompakt(dagar)).toBe('Mån–tis 9.30–17');
  });
});

describe('aktivaErbjudanden', () => {
  it('räknar utgångsdatum i svensk tid, inte UTC', async () => {
    const { erbjudanden, aktivaErbjudanden } = await import('../src/data/erbjudanden');
    const kopia = [...erbjudanden];
    erbjudanden.splice(0, erbjudanden.length, { ...kopia[0], giltigtTill: '2026-12-31' });
    // 00:30 på nyårsdagen svensk tid = 23:30 UTC föregående dag: kampanjen har gått ut
    expect(aktivaErbjudanden(new Date('2026-12-31T23:30:00Z'))).toHaveLength(0);
    expect(aktivaErbjudanden(new Date('2026-12-31T22:30:00Z'))).toHaveLength(1);
    erbjudanden.splice(0, erbjudanden.length, ...kopia);
  });
});
