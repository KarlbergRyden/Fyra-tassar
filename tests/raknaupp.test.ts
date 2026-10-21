import { describe, expect, it } from 'vitest';
import { easeOutCubic, tidsvarde } from '../src/lib/raknaupp';

describe('uppräkning av siffror', () => {
  it('börjar på 0 och slutar exakt på målvärdet', () => {
    expect(tidsvarde(0, 499)).toBe(0);
    expect(tidsvarde(1, 499)).toBe(499);
  });
  it('håller sig inom 0 och målvärdet även utanför 0–1', () => {
    expect(tidsvarde(-1, 160)).toBe(0);
    expect(tidsvarde(5, 160)).toBe(160);
  });
  it('ökar jämnt (aldrig bakåt) och bromsar in mot slutet', () => {
    let tidigare = -1;
    for (let i = 0; i <= 20; i++) {
      const v = tidsvarde(i / 20, 469);
      expect(v).toBeGreaterThanOrEqual(tidigare);
      tidigare = v;
    }
    // första halvan av tiden ger mer än hälften av värdet
    expect(tidsvarde(0.5, 100)).toBeGreaterThan(50);
    expect(easeOutCubic(1)).toBe(1);
  });
});
