/**
 * Central företagskonfiguration. ALLA kontaktuppgifter, öppettider och
 * sociala länkar läses härifrån – ändra bara på ett ställe.
 * Källa: fyratassar.nu (nuvarande webbplats). Ägaren ska verifiera.
 */

export type Veckodag = 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = söndag (som Date.getDay)

export interface Oppettid {
  dag: Veckodag;
  namn: string;
  /** "HH:MM" – null = stängt */
  oppnar: string | null;
  stanger: string | null;
}

export interface Undantag {
  /** ISO-datum i svensk tid, t.ex. "2026-12-24" */
  datum: string;
  oppnar: string | null;
  stanger: string | null;
  /** Visas för besökaren, t.ex. "Julafton" */
  not: string;
}

export const site = {
  namn: 'Fyra Tassar i Borlänge',
  kortnamn: 'Fyra Tassar',
  juridisktNamn: 'Fyra Tassar i Borlänge AB',
  /** Organisationsnummer. Visas i sidfot/integritetspolicy först när det är ifyllt. */
  organisationsnummer: null as string | null,
  slogan: 'Den personliga butiken i Borlänge',
  beskrivning:
    'Djurbutik i Borlänge med foder och tillbehör till hund och katt, kloklippning, hundtrim, hundkurser och friskvård för hund.',
  url: 'https://fyratassar.nu',

  adress: {
    gata: 'Hantverkargatan 5',
    postnummer: '781 71',
    ort: 'Borlänge',
    vagbeskrivning: 'Samma hus som gamla Dollarstore, bredvid Procurator.',
    beskrivning: 'Samma hus som gamla Dollarstore, bredvid Procurator. Gratis parkering direkt utanför.',
    kartaUrl:
      'https://www.google.com/maps/search/?api=1&query=Hantverkargatan+5%2C+781+71+Borl%C3%A4nge',
  },

  telefon: { visning: '0243-86 860', href: 'tel:+4624386860' },
  epost: 'info@fyratassar.nu',

  /** Bokningssida för kloklippning */
  bokningUrl: 'https://www.bokadirekt.se/places/fyra-tassar-i-borlange-ab-37451',

  sociala: [
    {
      namn: 'Facebook',
      ikon: 'facebook',
      url: 'https://www.facebook.com/people/Fyra-Tassar/100063704989622/',
    },
    {
      namn: 'Instagram',
      ikon: 'instagram',
      url: 'https://www.instagram.com/fyra_tassar_borlange',
    },
  ],

  oppettider: [
    { dag: 1, namn: 'Måndag', oppnar: '10:00', stanger: '18:00' },
    { dag: 2, namn: 'Tisdag', oppnar: '10:00', stanger: '19:00' },
    { dag: 3, namn: 'Onsdag', oppnar: '10:00', stanger: '18:00' },
    { dag: 4, namn: 'Torsdag', oppnar: '10:00', stanger: '18:00' },
    { dag: 5, namn: 'Fredag', oppnar: '10:00', stanger: '18:00' },
    { dag: 6, namn: 'Lördag', oppnar: '10:00', stanger: '15:00' },
    { dag: 0, namn: 'Söndag', oppnar: null, stanger: null },
  ] satisfies Oppettid[],

  /** Avvikande öppettider (helgdagar m.m.). Lägg till rader här vid behov. */
  undantag: [] as Undantag[],

  /**
   * Formulärmottagare. Sätt PUBLIC_FORM_ENDPOINT (se README) för att skicka
   * formuläret via en tjänst; utan den öppnas besökarens e-postprogram.
   */
  formularEndpoint: (import.meta.env.PUBLIC_FORM_ENDPOINT as string | undefined) ?? '',
  /** Valfri publik åtkomstnyckel som vissa formulärtjänster (t.ex. Web3Forms) kräver i anropet. */
  formularNyckel: (import.meta.env.PUBLIC_FORM_ACCESS_KEY as string | undefined) ?? '',

  /**
   * Hur mycket sidan rör sig. 'lugn': rubrikens ordintro, sidövergångar och mjuk inglidning.
   * 'full': dessutom tassspår, rullande märkesrad, uppräkning av siffror, lutande kort och magnetknappar.
   */
  rorelse: 'lugn' as 'lugn' | 'full',

  /**
   * Kakfri besöksstatistik (valfri). Sätt PUBLIC_PLAUSIBLE_DOMAIN eller PUBLIC_GOATCOUNTER (se README).
   * Utan dem laddas ingen mätning alls.
   */
  analys: {
    plausibleDomain: (import.meta.env.PUBLIC_PLAUSIBLE_DOMAIN as string | undefined) ?? '',
    plausibleSkript:
      (import.meta.env.PUBLIC_PLAUSIBLE_SCRIPT as string | undefined) || 'https://plausible.io/js/script.js',
    goatcounter: (import.meta.env.PUBLIC_GOATCOUNTER as string | undefined) ?? '',
  },
} as const;

/** Vilken statistiktjänst som är påslagen (null = ingen). */
export const analysTjanst: 'Plausible' | 'GoatCounter' | null = site.analys.plausibleDomain
  ? 'Plausible'
  : site.analys.goatcounter
    ? 'GoatCounter'
    : null;

/** Veckodagsordning som visas för besökare: måndag–söndag. */
export const oppettiderMonSun = [...site.oppettider].sort(
  (a, b) => ((a.dag + 6) % 7) - ((b.dag + 6) % 7),
);

/** "10:00" → "10.00" (svensk skrivning) */
export const tid = (t: string) => t.replace(':', '.');

export const adressRad = `${site.adress.gata}, ${site.adress.postnummer} ${site.adress.ort}`;
