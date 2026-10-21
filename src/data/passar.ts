/**
 * "Passar bra ihop med": förslag på nästa steg. Allt hämtas från befintlig data (kampanjer, priser,
 * länkar), så inget kan bli inaktuellt eller påhittat. Förslag utan underlag utelämnas.
 */
import { aktivaErbjudanden } from './erbjudanden';
import { hittaTjanst } from './tjanster';
import { site } from './site';

export interface Forslag {
  ikon: 'tag' | 'scissors' | 'message' | 'box';
  rubrik: string;
  text: string;
  href: string;
  /** Mätnamn (data-spor) */
  spor: string;
}

const kampanjer = (): Forslag | null => {
  const e = aktivaErbjudanden();
  if (e.length === 0) return null;
  const billigast = e.reduce((a, b) => (b.pris < a.pris ? b : a));
  return {
    ikon: 'tag',
    rubrik: 'Foderkampanjer just nu',
    text: `${e.length} ${e.length === 1 ? 'kampanj' : 'kampanjer'} i butiken, bland annat ${billigast.namn} för ${billigast.pris} kr.`,
    href: '/erbjudanden/',
    spor: 'passar-kampanjer',
  };
};

const kloklippning = (): Forslag | null => {
  const t = hittaTjanst('kloklippning');
  if (!t?.pris.belopp) return null;
  return {
    ikon: 'scissors',
    rubrik: 'Boka kloklippning',
    text: `${t.pris.belopp} kr, tidsbokat och betalt i förväg med Klarna.`,
    href: site.bokningUrl,
    spor: 'passar-kloklippning',
  };
};

const foderhjalp: Forslag = {
  ikon: 'message',
  rubrik: 'Osäker på vilket foder?',
  text: 'Svara på några frågor så får du hjälp av oss i butiken.',
  href: '/hitta-foder/',
  spor: 'passar-foderhjalp',
};

const sortiment: Forslag = {
  ikon: 'box',
  rubrik: 'Foder och tillbehör',
  text: 'Koppel, selar, sängar, kattsand och klösträd till hund och katt.',
  href: '/webbshop/',
  spor: 'passar-sortiment',
};

/** Förslag för en tjänstesida. Tjänsten själv föreslås aldrig. */
export function passarForTjanst(slug: string): Forslag[] {
  return [slug === 'kloklippning' ? null : kloklippning(), kampanjer(), foderhjalp].filter((f): f is Forslag => f !== null);
}

/** Förslag vid kampanjerna. */
export function passarForKampanjer(): Forslag[] {
  return [kloklippning(), foderhjalp, sortiment].filter((f): f is Forslag => f !== null);
}
