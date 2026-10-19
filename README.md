# Fyra Tassar i Borlänge – webbplats

Statisk webbplats byggd med [Astro](https://astro.build). Ingen backend, inga cookies, ingen spårning.
Sidorna förbyggs till ren HTML/CSS och kan läggas på valfri statisk webbhotell (Netlify, Cloudflare Pages, GitHub Pages, vanligt webbhotell m.fl.).

## Kom igång

Kräver Node 22.12 eller senare.

```bash
npm install
npm run dev        # utvecklingsserver på http://localhost:4321
```

## Kommandon

| Kommando          | Vad det gör                                                                |
| ----------------- | -------------------------------------------------------------------------- |
| `npm run dev`     | Startar utvecklingsservern                                                 |
| `npm run build`   | Typkontroll (`astro check`) + bygger sajten till `dist/`                   |
| `npm test`        | Enhetstester (öppettider, formulär), färgkontrast och axe-tillgänglighet   |
| `npm run verify`  | Kontrollerar `dist/`: titlar, descriptions, H1, länkar, ankare, sitemap m.m. |
| `npm run ci`      | `build` + `test` + `verify` i ett svep – kör före varje publicering         |
| `npm run images`  | Skapar optimerade WebP-bilder i `public/images/` från `source-images/`          |
| `npm run og`      | Genererar om delningsbilden `public/og-bild.png`                            |

> Tillgänglighetstesterna (`tests/a11y.test.ts`) läser `dist/` och hoppas över om sajten inte är byggd. Kör alltid `npm run ci`.

## Var ändrar jag innehåll?

Allt innehåll ligger i `src/data/` – inga ändringar i komponenter behövs för vanliga uppdateringar.

| Fil                         | Innehåll                                                                      |
| --------------------------- | ----------------------------------------------------------------------------- |
| `src/data/site.ts`          | **Företagsuppgifter**: namn, adress, telefon, e-post, öppettider, sociala länkar, bokningslänk, org.nr |
| `src/data/tjanster.ts`      | Tjänster (kloklippning, hundtrim, friskvård): pris, steg, villkor, FAQ, SEO     |
| `src/data/erbjudanden.ts`   | Foderkampanjer (dölj med `aktiv: false` eller sätt `giltigtTill`)              |
| `src/data/produkter.ts`     | Produktkategorier, fodermärken, leverantörer, utvald produkt                    |
| `src/data/team.ts`          | Personal                                                                       |
| `src/data/faq.ts`           | Frågor och svar (flagga `startsida: true` för att visa på startsidan)          |
| `src/data/nav.ts`           | Huvudmenyn                                                                     |

Avvikande öppettider (helger m.m.) läggs in i `undantag` i `site.ts` – då uppdateras även "Öppet nu"-markeringen.

Telefon, e-post, adress och öppettider finns **bara** i `site.ts` och läses därifrån överallt (sidhuvud, sidfot, kontakt, strukturerad data).

## Struktur

```
src/
  components/   Header, Footer, Faq, TjanstKort, PrisBlock, Steg, SlutCta, KontaktForm, Breadcrumbs, Oppettider, OppetNu, Icon
  data/         Innehåll och konfiguration (se ovan)
  layouts/Bas.astro   Gemensam HTML-ram: SEO, Open Graph, JSON-LD, skip-länk
  lib/          Öppettidslogik och formulärvalidering (testade)
  pages/        En fil per URL
  styles/global.css   Designsystem: färgtokens, typografi, knappar, kort, formulär
tests/          Vitest
scripts/        verify-dist.mjs, make-og.mjs
```

Sidor: `/`, `/produkter/`, `/tjanster/`, `/tjanster/<tjänst>/`, `/kurser/`, `/priser/`, `/erbjudanden/`,
`/om-oss/`, `/fragor-och-svar/`, `/kontakt/`, `/integritet/` och `404`.
En ny tjänst läggs till genom att lägga en post i `tjanster.ts` – sidan, kortet, sitemap och sidfot skapas automatiskt.

## Kundnärvaro: snabbfält, reservera och omdömen

- **Snabbfält på mobil:** en fast rad längst ned med Ring, Boka klippning och Hitta hit (`src/components/SnabbFalt.astro`). Den visas bara på smala skärmar och lämnar plats så att fokus aldrig döljs.
- **Fråga / reservera:** kampanjerna på `/erbjudanden/` har en knapp som öppnar kontaktformuläret med produkten ifylld. Lägg samma knapp på fler ställen med `reserveraLank('Produktnamn')` från `src/lib/formular.ts`.
- **Omdömen:** `src/data/omdomen.ts` är tomt med flit. Sektionen på startsidan visas först när ni lägger in riktiga citat (med kundens tillstånd) eller ert Google-betyg.
- **Formulärtjänst:** följ `GUIDE-FORMULAR.md` så att inga förfrågningar går förlorade.

## Kontaktformuläret

Webbplatsen är statisk, så formuläret behöver en mottagare. Två lägen:

1. **Utan konfiguration (standard):** när besökaren skickar öppnas deras e-postprogram med meddelandet ifyllt, adresserat till `info@fyratassar.nu`.
   Fungerar direkt men är inte lika smidigt som läge 2.
2. **Med formulärtjänst:** skapa ett konto hos en formulärtjänst (t.ex. Formspree, Web3Forms eller Netlify Forms), och ange tjänstens URL i en miljövariabel vid bygget:

   ```bash
   cp .env.example .env     # lokalt
   # PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
   ```

   På ditt webbhotell/CI sätter du samma variabel `PUBLIC_FORM_ENDPOINT`. Formuläret skickar då JSON via `fetch` och visar bekräftelse eller ett begripligt felmeddelande.
   Integritetspolicyn (`/integritet/`) anpassar sig automatiskt när en formulärtjänst är konfigurerad – **uppdatera den med tjänstens namn och personuppgiftsbiträdesavtal**.
   Testa med ett riktigt meddelande efter första publiceringen.

Formuläret har klient-validering (testad i `tests/formular.test.ts`) och ett dolt skräpskyddsfält. Servervalidering och spamfilter sköts av formulärtjänsten.

## Publicering

1. `npm run ci` ska gå igenom utan fel.
2. Ladda upp innehållet i `dist/` (eller låt hostens bygge köra `npm run build`, publicera `dist/`).
3. **Gamla adresser:** den tidigare webbplatsen använde adresser som `/Vara-produkter`, `/Tjanster`, `/Kurser`, `/Aktuellt`, `/Om-oss`, `/Kontakt`. Sätt upp 301-omdirigeringar hos hosten så att inkommande länkar och Google-placering inte går förlorade:

   | Gammal adress      | Ny adress          |
   | ------------------ | ------------------ |
   | `/Vara-produkter`  | `/produkter/`      |
   | `/Tjanster`        | `/tjanster/`       |
   | `/Kurser`          | `/kurser/`         |
   | `/Aktuellt`        | `/erbjudanden/`    |
   | `/Om-oss`          | `/om-oss/`         |
   | `/Kontakt`         | `/kontakt/`        |

   Exempel Netlify/Cloudflare Pages (`public/_redirects`): `/Vara-produkter /produkter/ 301`. Gör inte omdirigeringarna i Astro: Windows och macOS skiljer inte på versaler och gemener i filnamn, så `Tjanster/` och `tjanster/` krockar.
4. Skicka in `https://fyratassar.nu/sitemap-index.xml` i Google Search Console.
5. Kontrollera delning med Facebooks delningsverktyg.

## Design och tillgänglighet

- Mobil först, inga horisontella scrollar (kontrollerat 375 px och uppåt).
- Designen följer den tidigare sajtens identitet: magenta `#D4147B`, svart sidhuvud med logotyp och djurfries, magenta menyrad, fotohero och 3 × 2 bildplattor. Färgerna är tokens överst i `src/styles/global.css`.
- Sidhuvud: genomskinligt och fast överst, med liten logotyp som mjukt tonas ut mot bilden. Det blir mörkt glas (blur) vid scroll och vid musöver, och menylänkarna får ett växande rosa streck vid hover. Startsidans hero har en intro-animation (bilden zoomas ut ur dis, rubriken glider in ord för ord) samt scroll- och musparallax på bilden (`src/pages/index.astro`). Innehåll glider in när det scrollas fram (`data-reveal`). All rörelse stängs av med `prefers-reduced-motion`.
- Typsnitt: Source Sans 3 (öppen släkting till originalets Myriad Pro), levererat från egen server via `@fontsource` – inga anrop till Google Fonts.
- Bilder: originalen ligger i `source-images/`. `npm run images` skapar WebP i flera storlekar (totalt ca 1,5 MB) och en manifestfil med mått. Bilder läggs in via `<Bild namn="…" />` med alt-text i `src/data/bilder.ts`; bilder under första skärmen laddas lazy.
- WCAG 2.2 AA som mål: kontrastkrav testas automatiskt (`tests/kontrast.test.ts`), alla sidor körs genom axe-core, synliga fokusramar, tangentbordsnavigerbar meny (Esc stänger), `prefers-reduced-motion` respekteras.
- Inga karuseller, popups eller autospelande rörelse.

## Mätning

Ingen webbanalys är installerad, med flit: då behövs ingen cookiebanner. Knappar och länkar för bokning, ring, e-post och formulär har `data-spor="…"`-attribut så att en integritetsvänlig mätning (t.ex. cookiefri statistik) kan kopplas på senare utan att ändra sidorna. Behövs samtycke för vald lösning måste en samtyckeshantering läggas till först.

## Kända begränsningar

- Fotografierna är hämtade från den gamla sajten och ska bekräftas av ägaren (rättigheter, se `ÄGARENS-CHECKLISTA.md`).
- Ingen webbutik och inget lagersaldo – sortimentet visas som kategorier och märken.
