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
| `src/data/erbjudanden.ts`   | Foderkampanjer (dölj med `aktiv: false`, eller `giltigtTill` – räknas vid bygget, bygg om dagligen) |
| `src/data/produkter.ts`     | Produktkategorier, fodermärken, leverantörer, utvald produkt                    |
| `src/data/webbshop.ts`      | Webbshopens produkter (status, pris, köplänk) – förberett, alla "kommer snart"  |
| `src/data/foton.ts`         | Fotoplatser för egna foton (se `FOTOGUIDE.md`)                                  |
| `src/data/passar.ts`        | Förslag på nästa steg ("Passar bra ihop med"), byggda av befintlig data         |
| `src/data/team.ts`          | Personal                                                                       |
| `src/data/faq.ts`           | Frågor och svar (flagga `startsida: true` för att visa på startsidan)          |
| `src/data/nav.ts`           | Huvudmenyn                                                                     |

Avvikande öppettider (helger m.m.) läggs in i `undantag` i `site.ts` – då uppdateras även "Öppet nu"-markeringen.

Telefon, e-post, adress och öppettider finns **bara** i `site.ts` och läses därifrån överallt (sidhuvud, sidfot, kontakt, strukturerad data).

## Struktur

```
src/
  components/   Sidhuvud/sidfot, PageBanner, Avslut, Foto/Fotoband/Avatar, ProduktKort, PasserIhop,
                KontaktForm, TjanstVaeljare, Faq, Steg, PrisBlock, Oppettider/OppetNu, Marquee, Tal, Icon …
  data/         Innehåll och konfiguration (se ovan), foton.ts (fotoplatser), passar.ts (nästa-steg-förslag)
  layouts/Bas.astro   Gemensam HTML-ram: SEO, Open Graph, JSON-LD, typsnitt, skip-länk, mätning
  lib/          Öppettider, formulär, foderguide, uppräkning, mätning (alla testade)
  pages/        En fil per URL (inkl. /hitta-foder/)
  scripts/liv.ts      Rörelse och mätning i webbläsaren
  styles/global.css   Designsystem: färgtokens, typografi, knappar, kort, formulär
tests/          Vitest (inkl. tillgänglighet med axe på byggda sidor)
scripts/        process-images.mjs, verify-dist.mjs, make-og.mjs
source-images/  Originalbilder; egna foton i source-images/foton/
```

Sidor: `/`, `/webbshop/` (`/produkter/` omdirigerar dit), `/tjanster/`, `/tjanster/<tjänst>/`, `/kurser/`, `/priser/`, `/erbjudanden/`,
`/hitta-foder/`, `/om-oss/`, `/fragor-och-svar/`, `/kontakt/`, `/integritet/` och `404`.
En ny tjänst läggs till genom att lägga en post i `tjanster.ts` – sidan, kortet, sitemap och sidfot skapas automatiskt.

## Webbshop (förberedd)

Sidan `/webbshop/` visar produktkort med linjeillustration och "Kommer snart". När en produkt ska bli köpbar: i `src/data/webbshop.ts` sätt `status: 'i-lager'`, `pris` och `kopLank` (länk till kassa/varukorg hos vald webbshopslösning), och lägg produktfotot i `source-images/foton/` som `produkt-<id>.jpg` (kör `npm run images`, se `FOTOGUIDE.md`). Priser och lagersaldon visas bara när de finns i datan – inget hittas på. Varukorg och betalning kräver en webbshopslösning (t.ex. Shopify, WooCommerce eller liknande) som ni väljer.

## Egna foton

Se `FOTOGUIDE.md`. Foton läggs i `source-images/foton/` (filnamn = plats, t.ex. `fasad.jpg`) och `npm run images` gör resten. Fotoplatserna (fasad, interiör, personporträtt, produktfoton) syns först när bilden finns. Komponenter: `Foto.astro`, `Fotoband.astro` (bred fotosektion) och `Avatar.astro` (porträtt eller initialer).

## Rörelse och liv

`rorelse` i `src/data/site.ts` styr nivån: `'lugn'` (standard) behåller rubrikernas ordintro, sidövergångar och mjuk inglidning. `'full'` lägger till tassspår, rullande märkesrad, uppräkning av siffror, lutande kort och magnetknappar.

Rubrikerna sätts i en serif (Playfair Display) som ger sidan karaktär och knyter an till loggan. Byt `--font-display` i `src/styles/global.css` till `var(--font)` för att gå tillbaka.

Allt stängs av med `prefers-reduced-motion`, och bara `transform`/`opacity` animeras. Pekar-effekterna körs bara med mus.

- **Tassspår** (`Tassspar.astro`): fyra tassar som "går" fram när de kommer i bild.
- **Märkesrad** (`Marquee.astro`): fodermärkena rullar långsamt, pausas vid hover.
- **Siffror som räknas upp** (`Tal.astro` + `src/lib/raknaupp.ts`): skärmläsare får alltid slutvärdet.
- **Sidövergångar:** webbläsarens inbyggda `@view-transition` (CSS), ingen kod.
- **Scroll-linje** i headern, **lutande kort** (`data-tilt`), **magnetiska knappar**, **tassavtryck efter pekaren** (`src/scripts/liv.ts`).
- **Formulär/FAQ:** ritad bock vid skickat meddelande, mjuk öppning av frågor, puls på "Öppet nu".

## Kundnärvaro: snabbfält, reservera och omdömen

- **Snabbfält på mobil:** en fast rad längst ned med Ring, Boka klippning och Hitta hit (`src/components/SnabbFalt.astro`). Den visas bara på smala skärmar och lämnar plats så att fokus aldrig döljs.
- **Fråga / reservera:** kampanjerna på `/erbjudanden/` har en knapp som öppnar kontaktformuläret med produkten ifylld. Lägg samma knapp på fler ställen med `reserveraLank('Produktnamn')` från `src/lib/formular.ts`.
- **Omdömen:** `src/data/omdomen.ts` är tomt med flit. Sektionen på startsidan visas först när ni lägger in riktiga citat (med kundens tillstånd) eller ert Google-betyg.
- **Foderguiden** (`/hitta-foder/`): besökaren svarar på några frågor och skickar dem som en färdig fråga till butiken (`fragaLank()` i `src/lib/formular.ts`, texten byggs i `src/lib/foderhjalp.ts`). Guiden rekommenderar inga märken.
- **Passar bra ihop med:** rutor som föreslår nästa steg (kampanjer, kloklippning, foderguiden) på tjänstesidorna och vid kampanjerna. Allt hämtas från befintlig data i `src/data/passar.ts`, inget är påhittat.
- **Huvudknappen på startsidan** leder till kampanjerna så länge webbshopen inte är öppen, och byts automatiskt till webbshopen när den öppnar.
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
   | `/Vara-produkter`  | `/webbshop/`       |
   | `/Tjanster`        | `/tjanster/`       |
   | `/Kurser`          | `/kurser/`         |
   | `/Aktuellt`        | `/erbjudanden/`    |
   | `/Om-oss`          | `/om-oss/`         |
   | `/Kontakt`         | `/kontakt/`        |

   Exempel Netlify/Cloudflare Pages (`public/_redirects`): `/Vara-produkter /webbshop/ 301`. Gör inte omdirigeringarna i Astro: Windows och macOS skiljer inte på versaler och gemener i filnamn, så `Tjanster/` och `tjanster/` krockar.
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

Som standard laddas ingen mätning alls, och då behövs ingen cookiebanner. Vill ni se vad som ger samtal, bokningar och förfrågningar: skapa ett konto hos en kakfri statistiktjänst och fyll i variablerna i `.env` (se `.env.example`):

- **Plausible:** `PUBLIC_PLAUSIBLE_DOMAIN=fyratassar.nu` (egen installation: även `PUBLIC_PLAUSIBLE_SCRIPT`).
- **GoatCounter:** `PUBLIC_GOATCOUNTER=koden` (blir `koden.goatcounter.com`).

Sidvisningar mäts av tjänsten själv. Dessutom skickas en händelse varje gång någon trycker på en knapp eller länk med `data-spor="…"` (t.ex. `ring`, `boka-kloklippning`, `reservera`, `snabb-ring`) och när formuläret skickas (`formular-skickat`, `formular-mailto`). Koden finns i `src/lib/spar.ts` och `src/scripts/liv.ts`. Integritetspolicyn byter automatiskt text när en tjänst är påslagen. Behöver den valda lösningen samtycke måste en samtyckeshantering läggas till först.

## Kända begränsningar

- Fotografierna är hämtade från den gamla sajten och ska bekräftas av ägaren (rättigheter, se `ÄGARENS-CHECKLISTA.md`).
- Ingen webbutik och inget lagersaldo – sortimentet visas som kategorier och märken.
