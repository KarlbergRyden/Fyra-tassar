import { describe, expect, it } from 'vitest';
import { byggMailto, forifyllMeddelande, reserveraLank, validera, type Formularvarden } from '../src/lib/formular';

const giltigt: Formularvarden = {
  namn: 'Anna Svensson',
  epost: 'anna@exempel.se',
  telefon: '070-123 45 67',
  meddelande: 'Har ni Royal Canin i lager?',
  samtycke: true,
};

describe('validera', () => {
  it('godkänner giltiga värden', () => {
    expect(validera(giltigt)).toEqual({});
  });
  it('telefon är valfritt', () => {
    expect(validera({ ...giltigt, telefon: '' })).toEqual({});
  });
  it('kräver namn, e-post, meddelande och samtycke', () => {
    const fel = validera({ namn: '', epost: '', telefon: '', meddelande: '', samtycke: false });
    expect(Object.keys(fel).sort()).toEqual(['epost', 'meddelande', 'namn', 'samtycke']);
  });
  it('avvisar ogiltig e-post', () => {
    expect(validera({ ...giltigt, epost: 'anna@' }).epost).toMatch(/inte rätt/);
    expect(validera({ ...giltigt, epost: 'anna exempel.se' }).epost).toBeDefined();
  });
  it('avvisar ogiltigt telefonnummer', () => {
    expect(validera({ ...giltigt, telefon: 'abc' }).telefon).toBeDefined();
    expect(validera({ ...giltigt, telefon: '123' }).telefon).toBeDefined();
  });
  it('avvisar för långt meddelande', () => {
    expect(validera({ ...giltigt, meddelande: 'x'.repeat(2001) }).meddelande).toMatch(/för långt/);
  });
});

describe('byggMailto', () => {
  it('bygger en korrekt kodad mailto-länk', () => {
    const url = byggMailto('info@fyratassar.nu', giltigt);
    expect(url.startsWith('mailto:info@fyratassar.nu?')).toBe(true);
    expect(url).not.toContain('+');
    const params = new URL(url).searchParams;
    expect(params.get('subject')).toContain('Anna Svensson');
    expect(params.get('body')).toContain('Har ni Royal Canin i lager?');
    expect(params.get('body')).toContain('Telefon: 070-123 45 67');
  });
  it('utelämnar telefonraden när den saknas', () => {
    const body = new URL(byggMailto('a@b.se', { ...giltigt, telefon: '' })).searchParams.get('body');
    expect(body).not.toContain('Telefon');
  });
});

describe('reservera / fråga om produkt', () => {
  it('bygger en länk till formuläret med produkten kodad', () => {
    const lank = reserveraLank('Taste of the Wild 2 kg');
    expect(lank.startsWith('/kontakt/?produkt=')).toBe(true);
    expect(lank.endsWith('#kontaktformular')).toBe(true);
    expect(lank).not.toContain(' ');
  });
  it('förifyller meddelandet från adressen', () => {
    const lank = reserveraLank('HappyDog Croq 11 kg / Happycat Minkas 10 kg');
    const sok = lank.slice(lank.indexOf('?'), lank.indexOf('#'));
    expect(forifyllMeddelande(sok)).toBe('Hej! Jag vill fråga om eller reservera: HappyDog Croq 11 kg / Happycat Minkas 10 kg.\n\n');
  });
  it('ger null utan produkt och kortar ned onormalt långa värden', () => {
    expect(forifyllMeddelande('')).toBeNull();
    expect(forifyllMeddelande('?produkt=')).toBeNull();
    const lang = forifyllMeddelande('?produkt=' + 'x'.repeat(500))!;
    expect(lang.length).toBeLessThan(200);
  });
});
