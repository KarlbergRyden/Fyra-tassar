/** Mjuk inbromsning: snabbt i början, lugnt mot slutet. */
export const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

/** Värdet som ska visas efter `framsteg` (0–1) när en siffra räknas upp till `mal`. */
export function tidsvarde(framsteg: number, mal: number): number {
  const t = Math.min(Math.max(framsteg, 0), 1);
  return Math.round(mal * easeOutCubic(t));
}
