// @vitest-environment jsdom
// Kör axe-core mot varje byggd sida i dist/. Kräver "npm run build" först (ingår i "npm run ci").
// Färgkontrast kan inte mätas i jsdom – den täcks av kontrast.test.ts.
import { describe, expect, it } from 'vitest';
import axe from 'axe-core';
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist') + '/';

function html(mapp: string, ut: string[] = []): string[] {
  for (const n of readdirSync(mapp)) {
    const f = join(mapp, n);
    if (statSync(f).isDirectory()) html(f, ut);
    else if (n.endsWith('.html')) ut.push(f);
  }
  return ut;
}

const sidor = (existsSync(dist) ? html(dist) : []).filter((f) => !/http-equiv="refresh"/i.test(readFileSync(f, 'utf8')));

describe.skipIf(sidor.length === 0)('tillgänglighet (axe, WCAG 2.2 AA)', () => {
  for (const fil of sidor) {
    const namn = fil.slice(dist.length - 1).replace(/\\/g, '/');
    it(namn, async () => {
      document.documentElement.innerHTML = readFileSync(fil, 'utf8')
        .replace(/<script[\s\S]*?<\/script>/g, '')
        .replace(/^[\s\S]*?<html[^>]*>/i, '')
        .replace(/<\/html>[\s\S]*$/i, '');
      document.documentElement.lang = 'sv';
      const res = await axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'] },
        rules: { 'color-contrast': { enabled: false }, region: { enabled: false } },
      });
      const sammanfattning = res.violations.map(
        (v) => `${v.id} (${v.impact}): ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`,
      );
      expect(sammanfattning).toEqual([]);
    });
  }
});
