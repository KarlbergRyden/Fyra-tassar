/**
 * Mätning av vad besökarna gör (ring, boka, reservera …). Gör ingenting om ingen analystjänst är
 * konfigurerad. Tjänsterna ska vara kakfria; se README, avsnittet "Mätning".
 */
interface Fonster {
  plausible?: (namn: string, val?: { props: Record<string, string> }) => void;
  goatcounter?: { count: (v: { path: string; title?: string; event?: boolean }) => void };
}

export function spara(namn: string, fonster: Fonster = window as unknown as Fonster): void {
  try {
    fonster.plausible?.(namn);
    fonster.goatcounter?.count({ path: namn, title: namn, event: true });
  } catch {
    // mätning får aldrig störa sidan
  }
}
