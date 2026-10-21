/**
 * Små, lekfulla rörelser som får sajten att kännas levande.
 * Allt stängs av med "reducera rörelse". Muspekar-effekter (lutning, magnet) körs bara med mus (inte på pekskärm).
 */
import { tidsvarde } from '../lib/raknaupp';
import { spara } from '../lib/spar';

const reducerad = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const mus = window.matchMedia('(pointer: fine)').matches;
const lugn = document.documentElement.dataset.rorelse === 'lugn';

/* ---------- Uppräkning av siffror ---------- */
if (!reducerad && !lugn && 'IntersectionObserver' in window) {
  const tal = [...document.querySelectorAll<HTMLElement>('[data-raknaupp]')];
  for (const el of tal) {
    el.style.display = 'inline-block';
    el.style.minWidth = `${el.offsetWidth}px`; // reservera slutbredden så att inget hoppar
    el.style.textAlign = 'right';
    el.textContent = '0';
  }
  const io = new IntersectionObserver(
    (poster) => {
      for (const p of poster) {
        if (!p.isIntersecting) continue;
        const el = p.target as HTMLElement;
        io.unobserve(el);
        const mal = Number(el.dataset.raknaupp);
        const start = performance.now();
        const langd = 1300;
        const steg = (nu: number) => {
          const f = (nu - start) / langd;
          el.textContent = String(tidsvarde(f, mal));
          if (f < 1) requestAnimationFrame(steg);
          else el.textContent = String(mal);
        };
        requestAnimationFrame(steg);
      }
    },
    { threshold: 0.6 },
  );
  tal.forEach((el) => io.observe(el));
}

/* ---------- Effekter med mus ---------- */
if (!reducerad && !lugn && mus) {
  // Kort som lutar sig mjukt mot pekaren
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty('--ry', `${(x * 6).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
    });
    el.addEventListener('pointerleave', () => {
      el.style.setProperty('--ry', '0deg');
      el.style.setProperty('--rx', '0deg');
    });
  });

  // Magnetiska knappar: dras några pixlar mot pekaren
  document.querySelectorAll<HTMLElement>('.btn:not(:disabled)').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.18;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.28;
      el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.translate = '';
    });
  });
}

/* ---------- Mätning: knappar och länkar märkta med data-spor ---------- */
document.addEventListener('click', (e) => {
  const mal = (e.target as Element | null)?.closest<HTMLElement>('[data-spor]');
  if (mal?.dataset.spor) spara(mal.dataset.spor);
});
// Händelser från andra skript, t.ex. att kontaktformuläret skickats
document.addEventListener('ft:handelse', (e) => spara(String((e as CustomEvent).detail)));
