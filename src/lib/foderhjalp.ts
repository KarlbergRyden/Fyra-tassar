/** Foderguiden: gör svaren på några frågor till ett färdigt meddelande till butiken. Rekommenderar inga märken. */

export type Djur = 'hund' | 'katt';
export type Alder = 'ung' | 'vuxen' | 'senior' | 'vet-inte';

export const alderText: Record<Djur, Record<Alder, string>> = {
  hund: { ung: 'valp eller unghund', vuxen: 'vuxen hund', senior: 'äldre hund', 'vet-inte': 'hund (åldern oviss)' },
  katt: { ung: 'kattunge', vuxen: 'vuxen katt', senior: 'äldre katt', 'vet-inte': 'katt (åldern oviss)' },
};

export const behovLista = [
  { id: 'mage', text: 'känslig mage' },
  { id: 'allergi', text: 'allergi eller hudproblem' },
  { id: 'vikt', text: 'behöver gå ned eller hålla vikten' },
  { id: 'aktiv', text: 'mycket aktiv eller arbetande' },
] as const;
export type BehovId = (typeof behovLista)[number]['id'];

export interface Foderval {
  djur: Djur;
  alder: Alder;
  behov: readonly BehovId[];
  /** Fritext: vad djuret äter idag */
  nuvarande?: string;
}

const MAX_NUVARANDE = 80;

/** Skriver svaren som en vanlig, vänlig fråga. Ordningen på behoven följer listan, inte klickordningen. */
export function byggFoderfraga(v: Foderval): string {
  const behov = behovLista.filter((b) => v.behov.includes(b.id)).map((b) => b.text);
  const delar = [`Jag vill ha hjälp att välja foder till min ${alderText[v.djur][v.alder]}.`];
  delar.push(behov.length ? `Särskilda behov: ${behov.join(', ')}.` : 'Inga särskilda behov.');
  const nu = (v.nuvarande ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_NUVARANDE);
  if (nu) delar.push(`Äter idag: ${nu}.`);
  return delar.join(' ');
}
