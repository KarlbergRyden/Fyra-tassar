/**
 * Bilder. Filerna skapas av `npm run images` från originalen i source-images/
 * och beskrivs i bilder.manifest.json (bredd/höjd, för att undvika layoutförskjutning).
 * Alt-texter skrivs här – tom alt = dekorativ bild som skärmläsare hoppar över.
 */
import manifest from './bilder.manifest.json';

/**
 * De bilder som sajten alltid har. Egna foton (fasad, personporträtt, produkter …) ligger i samma
 * manifest men hanteras via src/data/foton.ts, så att de får saknas.
 */
export type BildNamn =
  | 'logo'
  | 'logoBanner'
  | 'hero'
  | 'bannerHund'
  | 'bannerSkog'
  | 'bannerKatt'
  | 'rottweiler'
  | 'katt'
  | 'bordercollie'
  | 'team'
  | 'kursledare';

interface Variant {
  fil: string;
  bredd: number;
  hojd: number;
}
const varianterAv = manifest as unknown as Record<BildNamn, Variant[]>;

export const standardAlt: Record<BildNamn, string> = {
  logo: 'Fyra Tassar – logotyp',
  logoBanner: 'Fyra Tassar',
  hero: '',
  bannerHund: '',
  bannerSkog: '',
  bannerKatt: '',
  rottweiler: 'Rottweiler som ligger i gräset med en leksak',
  katt: 'Katt som slickar sig om munnen bredvid en matskål',
  bordercollie: 'Border collie som springer i solljus',
  team: 'Tre medarbetare från Fyra Tassar tillsammans med tre hundar',
  kursledare: 'Kvinna med två hundar utomhus vid en sjö',
};

export function bild(namn: BildNamn) {
  const varianter = varianterAv[namn];
  const storst = varianter[varianter.length - 1];
  return {
    src: storst.fil,
    srcset: varianter.map((v) => `${v.fil} ${v.bredd}w`).join(', '),
    width: storst.bredd,
    height: storst.hojd,
  };
}
