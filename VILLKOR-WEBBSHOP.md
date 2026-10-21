# Villkor inför webbshopen – checklista och mall

Det här är en **arbetsmall**, inte juridisk rådgivning. Inget publiceras på sajten förrän ni själva fyllt i och bestämt er. Kontrollera uppgifterna mot Konsumentverket (konsumentverket.se) eller en jurist innan webbshopen öppnar.

När webbshopen säljer varor till privatpersoner måste kunden få tydlig information **innan** köpet. Det vanliga sättet är en sida `/villkor/` som länkas från kassan och från sidfoten.

## 1. Att bestämma först

- [ ] Vilken webbshopslösning används (t.ex. Shopify, WooCommerce eller liknande)? Den styr kassa, betalning och orderhantering.
- [ ] Hämtar kunden i butiken, skickas varorna hem, eller båda?
- [ ] Vilka betalsätt erbjuds (kort, Klarna, Swish …)?

## 2. Rubriker och vad ni behöver fylla i

**Företagsuppgifter** – företagsnamn, organisationsnummer, adress, e-post, telefon (finns redan i `src/data/site.ts`).

**Priser** – alla priser anges i kronor inklusive moms. Eventuella frakt- eller andra avgifter ska visas före köpet.
Fyll i: *vilka avgifter finns (frakt, hämtning, förpackning)?*

**Betalning** – hur och när kunden betalar.
Fyll i: *betalsätt och när pengarna dras.*

**Leverans och hämtning** – leveranssätt, leveranstid, kostnad och hur hämtning i butik fungerar.
Fyll i: *leveransalternativ, förväntad leveranstid, hämtning (adress och öppettider).*

**Ångerrätt** – vid distansköp har konsumenter normalt rätt att ångra köpet inom 14 dagar. För vissa varor kan undantag gälla. Ni måste informera om rätten, hur den utövas och vem som bär returkostnaden.
Fyll i: *hur kunden ångrar (e-post/formulär), vem betalar retur, hur återbetalning sker.*

**Reklamation** – kunden har enligt konsumentlagstiftningen rätt att reklamera fel på varan. Beskriv hur kunden går tillväga.
Fyll i: *vart reklamationer skickas och hur de hanteras.*

**Tvistlösning** – informera om att kunden kan vända sig till Allmänna reklamationsnämnden (ARN) vid tvist.

**Personuppgifter** – länka till `/integritet/`. Den måste uppdateras med kunduppgifter, betalningsleverantör och leverantör av webbshopslösningen när shopen öppnar.

## 3. Så kopplas det in på sajten

1. Skapa `src/pages/villkor.astro` (kopiera strukturen från `src/pages/integritet.astro`) och lägg in texterna ovan.
2. Lägg en länk till `/villkor/` i sidfoten (`src/components/Footer.astro`) och i kassan hos webbshopslösningen.
3. Lägg produkterna i `src/data/webbshop.ts` (status, pris, köplänk) – se README, avsnittet *Webbshop (förberedd)*.
4. Uppdatera `/integritet/` och FAQ-svaret "Har ni någon webbshop?".
5. Kör `npm run ci` och testa ett köp från början till slut.
