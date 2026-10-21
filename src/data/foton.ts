/**
 * Fotoplatser: bilder ni själva tar och lägger i source-images/foton/ (se FOTOGUIDE.md).
 * Filnamnet utan ändelse = platsens id (t.ex. fasad.jpg). `npm run images` gör webp-filer och
 * uppdaterar bilder.manifest.json. Tills en bild finns visas ingenting (ingen tom ruta, ingen stockbild).
 * Lägger ni en fil som heter som en befintlig bild (hero, kursledare, team, bannerHund …) ersätter den originalet.
 */
import manifest from './bilder.manifest.json';

export interface Fotoplats {
  id: string;
  alt: string;
  /** Rekommenderat bildformat, för fotografen */
  format: string;
  /** Vad bilden ska visa och var den används */
  beskrivning: string;
}

export const fotoplatser: Fotoplats[] = [
  {
    id: 'fasad',
    alt: 'Butiken på Hantverkargatan 5 sedd från gatan',
    format: 'Liggande, helst 16:9',
    beskrivning: 'Fasaden med skylten, tagen i dagsljus så att man känner igen sig. Visas på Kontakt.',
  },
  {
    id: 'interior',
    alt: 'Insidan av butiken med hyllor med foder och tillbehör',
    format: 'Liggande, helst 16:9',
    beskrivning: 'Butiken inifrån, gärna med hyllor och någon i bild. Visas på startsidan.',
  },
  {
    id: 'lotta',
    alt: 'Lotta Andersson',
    format: 'Stående porträtt, 4:5',
    beskrivning: 'Porträtt, gärna tillsammans med ett djur. Visas på Om oss.',
  },
  {
    id: 'wilma',
    alt: 'Wilma Andersson',
    format: 'Stående porträtt, 4:5',
    beskrivning: 'Porträtt. Visas på Om oss och vid kloklippning.',
  },
  {
    id: 'emma',
    alt: 'Emma Roos',
    format: 'Stående porträtt, 4:5',
    beskrivning: 'Porträtt. Visas på Om oss.',
  },
  {
    id: 'caroline',
    alt: 'Caroline Ohlsson',
    format: 'Stående porträtt, 4:5',
    beskrivning: 'Porträtt. Visas på Om oss och vid kloklippning.',
  },
];

/** Produktfoton heter `produkt-<id>` där id står i src/data/webbshop.ts, t.ex. produkt-hundfoder.jpg. */
export const produktFotoId = (produktId: string) => `produkt-${produktId}`;

interface Variant {
  fil: string;
  bredd: number;
  hojd: number;
}
const bilder = manifest as unknown as Record<string, Variant[]>;

/** Bildens attribut om fotot finns, annars null. */
export function foto(id: string) {
  const v = bilder[id];
  if (!v?.length) return null;
  const storst = v[v.length - 1];
  return {
    src: storst.fil,
    srcset: v.map((x) => `${x.fil} ${x.bredd}w`).join(', '),
    width: storst.bredd,
    height: storst.hojd,
  };
}

export const altFor = (id: string) => fotoplatser.find((f) => f.id === id)?.alt ?? '';
