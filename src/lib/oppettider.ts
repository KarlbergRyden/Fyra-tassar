import type { Oppettid, Undantag } from '../data/site';

export interface Status {
  oppet: boolean;
  /** Kort text, t.ex. "Öppet nu – stänger 18.00" */
  text: string;
}

const TZ = 'Europe/Stockholm';
const KORT_DAG = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];

interface SvenskTid {
  datum: string; // YYYY-MM-DD
  dag: number; // 0 = söndag
  minuter: number; // minuter sedan midnatt
}

/** Plocka ut datum/veckodag/klockslag i svensk tid, oavsett besökarens tidszon. */
export function svenskTid(nu: Date): SvenskTid {
  const delar = new Intl.DateTimeFormat('en-CA', {
    timeZone: TZ,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(nu);
  const hamta = (typ: string) => delar.find((d) => d.type === typ)?.value ?? '';
  const dagar = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return {
    datum: `${hamta('year')}-${hamta('month')}-${hamta('day')}`,
    dag: dagar.indexOf(hamta('weekday')),
    minuter: Number(hamta('hour')) * 60 + Number(hamta('minute')),
  };
}

export const tillMinuter = (t: string) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
const fmt = (t: string) => t.replace(':', '.');

interface Dagstider {
  oppnar: string | null;
  stanger: string | null;
}

function tiderForDatum(
  datum: string,
  dag: number,
  oppettider: readonly Oppettid[],
  undantag: readonly Undantag[],
): Dagstider {
  const u = undantag.find((x) => x.datum === datum);
  if (u) return { oppnar: u.oppnar, stanger: u.stanger };
  return oppettider.find((o) => o.dag === dag) ?? { oppnar: null, stanger: null };
}

/** Beräknar om butiken är öppen just nu, baserat på ordinarie öppettider + undantag. */
export function oppetStatus(
  nu: Date,
  oppettider: readonly Oppettid[],
  undantag: readonly Undantag[] = [],
): Status {
  const t = svenskTid(nu);
  const idag = tiderForDatum(t.datum, t.dag, oppettider, undantag);

  if (idag.oppnar && idag.stanger) {
    const oppnar = tillMinuter(idag.oppnar);
    const stanger = tillMinuter(idag.stanger);
    if (t.minuter >= oppnar && t.minuter < stanger) {
      return { oppet: true, text: `Öppet nu – stänger ${fmt(idag.stanger)}` };
    }
    if (t.minuter < oppnar) {
      return { oppet: false, text: `Stängt – öppnar idag ${fmt(idag.oppnar)}` };
    }
  }

  // Leta nästa öppningsdag (högst 8 dygn framåt)
  const idagMs = Date.UTC(
    Number(t.datum.slice(0, 4)),
    Number(t.datum.slice(5, 7)) - 1,
    Number(t.datum.slice(8, 10)),
  );
  for (let i = 1; i <= 8; i++) {
    const d = new Date(idagMs + i * 86_400_000);
    const iso = d.toISOString().slice(0, 10);
    const dag = d.getUTCDay();
    const tider = tiderForDatum(iso, dag, oppettider, undantag);
    if (tider.oppnar) {
      const nar = i === 1 ? 'imorgon' : KORT_DAG[dag];
      return { oppet: false, text: `Stängt – öppnar ${nar} ${fmt(tider.oppnar)}` };
    }
  }
  return { oppet: false, text: 'Stängt just nu' };
}

/** Schema.org openingHoursSpecification */
export function oppettiderSchema(oppettider: readonly Oppettid[]) {
  const dagnamn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return oppettider
    .filter((o) => o.oppnar && o.stanger)
    .map((o) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: dagnamn[o.dag],
      opens: o.oppnar,
      closes: o.stanger,
    }));
}

const DAGKORT: Record<number, string> = { 0: 'Sön', 1: 'Mån', 2: 'Tis', 3: 'Ons', 4: 'Tor', 5: 'Fre', 6: 'Lör' };
const kortTid = (t: string) => (t.endsWith(':00') ? String(Number(t.slice(0, 2))) : `${Number(t.slice(0, 2))}.${t.slice(3)}`);

/**
 * Öppettider på en rad, med sammanhängande dagar med samma tider ihopslagna.
 * Förväntar dagarna i ordningen måndag–söndag. Ex: "Mån 10–18 · Tis 10–19 · Ons–fre 10–18 · Lör 10–15 · Sön stängt"
 */
export function oppettiderKompakt(dagar: readonly Oppettid[]): string {
  const grupper: { dagar: Oppettid[]; text: string }[] = [];
  for (const d of dagar) {
    const text = d.oppnar && d.stanger ? `${kortTid(d.oppnar)}–${kortTid(d.stanger)}` : 'stängt';
    const sista = grupper[grupper.length - 1];
    if (sista && sista.text === text) sista.dagar.push(d);
    else grupper.push({ dagar: [d], text });
  }
  return grupper
    .map((g) => {
      const forsta = DAGKORT[g.dagar[0].dag];
      const sista = DAGKORT[g.dagar[g.dagar.length - 1].dag];
      const etikett = g.dagar.length === 1 ? forsta : `${forsta}–${sista.toLowerCase()}`;
      return `${etikett} ${g.text}`;
    })
    .join(' · ');
}
