/**
 * Omdömen och betyg. TOMT FRÅN START – inga omdömen får hittas på.
 * Sektionen på startsidan visas först när det finns riktiga uppgifter här.
 *
 * Lägg bara in ett citat om kunden gett skriftligt tillstånd (`tillstand: true`).
 * Google-betyget hämtas för hand från er Google-företagsprofil – skriv in siffrorna och länken.
 */
export interface Omdome {
  /** Citatet, ordagrant */
  text: string;
  /** Kundens förnamn eller signatur, t.ex. "Anna, Borlänge" */
  namn: string;
  /** Måste vara true: kunden har gett tillstånd att publicera */
  tillstand: boolean;
}

export interface GoogleBetyg {
  /** t.ex. 4.8 */
  betyg: number;
  /** Antal omdömen */
  antal: number;
  /** Länk till företagsprofilen / omdömena */
  url: string;
}

export const omdomen: Omdome[] = [];
export const googleBetyg: GoogleBetyg | null = null;

export const publiceradeOmdomen = () => omdomen.filter((o) => o.tillstand && o.text.trim() && o.namn.trim());
export const harOmdomen = () => publiceradeOmdomen().length > 0 || googleBetyg !== null;
