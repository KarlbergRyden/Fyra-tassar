/**
 * Webbshopens produkter. Förberett för en riktig webbshop:
 *
 *  - Just nu är alla poster platshållare ("kommer-snart") med en linjeillustration i stället för foto.
 *  - När en produkt blir köpbar: sätt `status: 'i-lager'`, lägg in `pris`, och `kopLank`
 *    (länk till kassan/varukorgen hos den webbshopslösning ni väljer). Lägg produktfotot i
 *    source-images/foton/ som `produkt-<id>.jpg` och kör `npm run images` – då ersätter fotot illustrationen
 *    av sig självt (se FOTOGUIDE.md).
 *  - Inga priser eller lagersaldon får hittas på. `pris` visas bara när `status` är 'i-lager'.
 */
import type { BildNamn } from './bilder';

export type ProduktStatus = 'kommer-snart' | 'i-lager' | 'slut';
export type ProduktTyp =
  | 'foder'
  | 'koppel'
  | 'halsband'
  | 'sele'
  | 'sang'
  | 'leksak'
  | 'godis'
  | 'palsvard'
  | 'kattsand'
  | 'klostrad'
  | 'skal';

export interface Produkt {
  id: string;
  namn: string;
  djur: 'hund' | 'katt';
  typ: ProduktTyp;
  status: ProduktStatus;
  /** Visas bara när status är 'i-lager' */
  pris?: number;
  /** Riktig produktbild (annars visas illustrationen för `typ`) */
  bild?: BildNamn;
  /** Köplänk när webbshopen är öppen */
  kopLank?: string;
}

export const statusText: Record<ProduktStatus, string> = {
  'kommer-snart': 'Kommer snart',
  'i-lager': 'I lager',
  slut: 'Slutsåld',
};

export const produkter: Produkt[] = [
  { id: 'hundfoder', namn: 'Hundfoder', djur: 'hund', typ: 'foder', status: 'kommer-snart' },
  { id: 'hundkoppel', namn: 'Koppel', djur: 'hund', typ: 'koppel', status: 'kommer-snart' },
  { id: 'hundhalsband', namn: 'Halsband', djur: 'hund', typ: 'halsband', status: 'kommer-snart' },
  { id: 'hundselar', namn: 'Selar', djur: 'hund', typ: 'sele', status: 'kommer-snart' },
  { id: 'hundsangar', namn: 'Sängar', djur: 'hund', typ: 'sang', status: 'kommer-snart' },
  { id: 'hundleksaker', namn: 'Leksaker', djur: 'hund', typ: 'leksak', status: 'kommer-snart' },
  { id: 'hundgodis', namn: 'Godis', djur: 'hund', typ: 'godis', status: 'kommer-snart' },
  { id: 'hundpalsvard', namn: 'Pälsvård', djur: 'hund', typ: 'palsvard', status: 'kommer-snart' },
  { id: 'kattfoder', namn: 'Kattfoder', djur: 'katt', typ: 'foder', status: 'kommer-snart' },
  { id: 'kattsand', namn: 'Kattsand', djur: 'katt', typ: 'kattsand', status: 'kommer-snart' },
  { id: 'klostrad', namn: 'Klösträd', djur: 'katt', typ: 'klostrad', status: 'kommer-snart' },
  { id: 'kattleksaker', namn: 'Leksaker', djur: 'katt', typ: 'leksak', status: 'kommer-snart' },
  { id: 'kattsangar', namn: 'Sängar', djur: 'katt', typ: 'sang', status: 'kommer-snart' },
  { id: 'kattskalar', namn: 'Matskålar', djur: 'katt', typ: 'skal', status: 'kommer-snart' },
];

export const produkterFor = (djur: 'hund' | 'katt') => produkter.filter((p) => p.djur === djur);

/** Webbshopen räknas som öppen när minst en produkt går att köpa online. */
export const webbshopOppen = () => produkter.some((p) => p.status === 'i-lager' && p.pris && p.kopLank);
