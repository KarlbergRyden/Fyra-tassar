import { describe, expect, it, vi } from 'vitest';
import { spara } from '../src/lib/spar';

describe('spara', () => {
  it('skickar händelsen till de tjänster som finns', () => {
    const plausible = vi.fn();
    const count = vi.fn();
    spara('ring', { plausible, goatcounter: { count } });
    expect(plausible).toHaveBeenCalledWith('ring');
    expect(count).toHaveBeenCalledWith({ path: 'ring', title: 'ring', event: true });
  });
  it('gör ingenting utan tjänster och kastar aldrig', () => {
    expect(() => spara('ring', {})).not.toThrow();
    expect(() => spara('ring', { plausible: () => { throw new Error('nej'); } })).not.toThrow();
  });
});
