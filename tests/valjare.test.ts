// @vitest-environment jsdom
// Testar tjänsteväljarens beteende på den byggda sidan (dist/tjanster/index.html):
// flikar, paneler, aria-attribut och tangentbord. Kräver "npm run build" (ingår i "npm run ci").
import { beforeEach, describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const fil = join(process.cwd(), 'dist', 'tjanster', 'index.html');
const finns = existsSync(fil);

function ladda(hash = '') {
  const html = readFileSync(fil, 'utf8');
  const skript = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)]
    .map((m) => m[1])
    .find((s) => s.includes('data-selector'));
  if (!skript) throw new Error('hittar inte väljarens skript i bygget');

  document.documentElement.innerHTML = html
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/^[\s\S]*?<html[^>]*>/i, '')
    .replace(/<\/html>[\s\S]*$/i, '');
  window.location.hash = hash;
  // jsdom saknar matchMedia
  (window as unknown as { matchMedia: unknown }).matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  window.eval(skript);
}

const flikar = () => [...document.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
const paneler = () => [...document.querySelectorAll<HTMLElement>('[role="tabpanel"]')];

describe.skipIf(!finns)('tjänsteväljare', () => {
  beforeEach(() => ladda());

  it('visar fyra tjänster som flikar och en panel i taget', () => {
    expect(flikar()).toHaveLength(4);
    expect(paneler()).toHaveLength(4);
    expect(document.querySelector<HTMLElement>('[data-tabs]')!.hidden).toBe(false);
    expect(paneler().filter((p) => !p.hidden)).toHaveLength(1);
    expect(flikar()[0].getAttribute('aria-selected')).toBe('true');
  });

  it('kopplar varje flik till sin panel (aria-controls / aria-labelledby)', () => {
    for (const f of flikar()) {
      const panel = document.getElementById(f.getAttribute('aria-controls')!);
      expect(panel?.getAttribute('aria-labelledby')).toBe(f.id);
    }
  });

  it('byter panel när man klickar på en flik', () => {
    flikar()[2].click();
    expect(flikar()[2].getAttribute('aria-selected')).toBe('true');
    expect(flikar()[0].getAttribute('aria-selected')).toBe('false');
    expect(paneler().map((p) => p.hidden)).toEqual([true, true, false, true]);
    expect(flikar()[2].tabIndex).toBe(0);
    expect(flikar()[0].tabIndex).toBe(-1);
  });

  it('styrs med piltangenter, Home och End', () => {
    const [a, b, c, d] = flikar();
    a.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(b.getAttribute('aria-selected')).toBe('true');
    b.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }));
    expect(d.getAttribute('aria-selected')).toBe('true');
    d.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
    expect(a.getAttribute('aria-selected')).toBe('true'); // runt
    a.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
    expect(d.getAttribute('aria-selected')).toBe('true');
    d.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }));
    expect(a.getAttribute('aria-selected')).toBe('true');
    expect(c.getAttribute('aria-selected')).toBe('false');
  });

  it('väljer rätt tjänst via djuplänk (#hundtrim)', () => {
    ladda('#hundtrim');
    expect(document.getElementById('tab-hundtrim')!.getAttribute('aria-selected')).toBe('true');
    expect(document.getElementById('panel-hundtrim')!.hidden).toBe(false);
    expect(document.getElementById('panel-kloklippning')!.hidden).toBe(true);
  });

  it('visar kundens fördelar och pris i varje panel', () => {
    for (const p of paneler()) {
      expect(p.querySelector('.get-list li')).not.toBeNull();
      expect(p.querySelector('.svc-facts dd')?.textContent?.trim()).toBeTruthy();
    }
  });
});
