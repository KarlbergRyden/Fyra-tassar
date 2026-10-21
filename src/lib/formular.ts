export interface Formularvarden {
  namn: string;
  epost: string;
  telefon: string;
  meddelande: string;
  samtycke: boolean;
}

export type FaltNamn = keyof Formularvarden;
export type Formularfel = Partial<Record<FaltNamn, string>>;

export const MAX_MEDDELANDE = 2000;
const EPOST = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Returnerar ett felmeddelande per ogiltigt fält. Tomt objekt = giltigt. */
export function validera(v: Formularvarden): Formularfel {
  const fel: Formularfel = {};
  if (v.namn.trim().length < 2) fel.namn = 'Skriv ditt namn.';
  if (!v.epost.trim()) fel.epost = 'Skriv din e-postadress.';
  else if (!EPOST.test(v.epost.trim()))
    fel.epost = 'E-postadressen ser inte rätt ut. Exempel: namn@exempel.se';
  if (v.telefon.trim()) {
    const siffror = v.telefon.replace(/\D/g, '');
    if (!/^[\d\s+\-()]+$/.test(v.telefon.trim()) || siffror.length < 6 || siffror.length > 15)
      fel.telefon = 'Telefonnumret ser inte rätt ut. Skriv bara siffror, t.ex. 070-123 45 67.';
  }
  if (v.meddelande.trim().length < 5) fel.meddelande = 'Skriv ditt meddelande.';
  else if (v.meddelande.length > MAX_MEDDELANDE)
    fel.meddelande = `Meddelandet är för långt. Max ${MAX_MEDDELANDE} tecken.`;
  if (!v.samtycke) fel.samtycke = 'Du behöver godkänna att vi hanterar uppgifterna för att kunna svara.';
  return fel;
}

/** Skapar en mailto-länk – används när ingen formulärtjänst är konfigurerad. */
export function byggMailto(epost: string, v: Formularvarden): string {
  const rader = [
    v.meddelande.trim(),
    '',
    `Namn: ${v.namn.trim()}`,
    `E-post: ${v.epost.trim()}`,
    v.telefon.trim() ? `Telefon: ${v.telefon.trim()}` : '',
  ].filter((r, i, a) => !(r === '' && i === a.length - 1));
  const params = new URLSearchParams({
    subject: `Meddelande från webbplatsen – ${v.namn.trim()}`,
    body: rader.join('\n'),
  });
  // URLSearchParams kodar mellanslag som "+", mailto vill ha %20
  return `mailto:${epost}?${params.toString().replace(/\+/g, '%20')}`;
}

/** Länk till kontaktformuläret med en produkt förifylld, t.ex. från en kampanj. */
export function reserveraLank(produkt: string): string {
  return `/kontakt/?${new URLSearchParams({ produkt }).toString()}#kontaktformular`;
}

/** Länk till kontaktformuläret med en färdigskriven fråga, t.ex. från foderguiden. */
export function fragaLank(fraga: string): string {
  return `/kontakt/?${new URLSearchParams({ fraga }).toString()}#kontaktformular`;
}

/**
 * Läser ?produkt=… eller ?fraga=… ur adressen och föreslår ett meddelande.
 * Returnerar null om inget av dem anges.
 */
export function forifyllMeddelande(search: string): string | null {
  const param = new URLSearchParams(search);
  const rensa = (v: string | null, max: number) => (v ?? '').replace(/\s+/g, ' ').trim().slice(0, max);
  const fraga = rensa(param.get('fraga'), 400);
  if (fraga) return `Hej! ${fraga}\n\n`;
  const produkt = rensa(param.get('produkt'), 120);
  if (!produkt) return null;
  return `Hej! Jag vill fråga om eller reservera: ${produkt}.\n\n`;
}
