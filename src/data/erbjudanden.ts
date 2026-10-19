/**
 * Aktuella foderkampanjer – den enda källan för kampanjpriser.
 * Källa: fyratassar.nu/Aktuellt. ÄGAREN MÅSTE bekräfta att priserna fortfarande gäller
 * (sätt `aktiv: false` för att dölja en kampanj, eller `giltigtTill` för slutdatum).
 */
export interface Erbjudande {
  namn: string;
  detalj: string;
  pris: number;
  /** Ordinarie pris. `franPris` = "från"-pris. */
  ordinarie: number;
  franPris?: boolean;
  /** Vilka djur produkten är till (för filtret) */
  djur: ('hund' | 'katt')[];
  aktiv: boolean;
  /** ISO-datum, sista dag kampanjen gäller (valfritt) */
  giltigtTill?: string;
}

export const erbjudanden: Erbjudande[] = [
  {
    namn: 'FourFriends hundfoder 1 kg',
    detalj: 'Torrfoder, 1 kg',
    pris: 39,
    ordinarie: 139,
    franPris: true,
    djur: ['hund'],
    aktiv: true,
  },
  {
    namn: 'FourFriends Active Anka 12 kg',
    detalj: 'Torrfoder för hund, 12 kg',
    pris: 499,
    ordinarie: 999,
    djur: ['hund'],
    aktiv: true,
  },
  {
    namn: 'HappyDog Croq 11 kg / Happycat Minkas 10 kg',
    detalj: 'Torrfoder för hund (11 kg) eller katt (10 kg)',
    pris: 469,
    ordinarie: 589,
    djur: ['hund', 'katt'],
    aktiv: true,
  },
  {
    namn: 'Taste of the Wild 2 kg',
    detalj: 'Torrfoder för hund, 2 kg',
    pris: 199,
    ordinarie: 299,
    franPris: true,
    djur: ['hund'],
    aktiv: true,
  },
];

export function aktivaErbjudanden(nu = new Date()) {
  const idag = nu.toISOString().slice(0, 10);
  return erbjudanden.filter((e) => e.aktiv && (!e.giltigtTill || e.giltigtTill >= idag));
}

/** Besparing i kronor. Vid "från"-pris är det den minsta möjliga besparingen. */
export function besparing(e: Erbjudande) {
  return { kr: e.ordinarie - e.pris, minst: Boolean(e.franPris) };
}
