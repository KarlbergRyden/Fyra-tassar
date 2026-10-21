# Ägarens checklista

Allt på sajten bygger på uppgifter från den gamla sajten fyratassar.nu (hämtad 2026-10-12). Inget är påhittat, men en del kan vara inaktuellt eller saknas. Gå igenom i den här ordningen.

## 1. Före lansering

- [ ] **Koppla formulärtjänsten** enligt `GUIDE-FORMULAR.md`. Annars når meddelanden bara fram om besökaren har ett e-postprogram, och knapparna "Fråga / reservera" fungerar sämre.
- [ ] **Organisationsnummer** i `src/data/site.ts` (`organisationsnummer`). Visas då i sidfoten.
- [ ] **Kontrollera priser och villkor:** kloklippning 160 kr (betalas med Klarna, avbokning senast 24 timmar innan), foderkampanjerna i `src/data/erbjudanden.ts` (sätt `aktiv: false` eller `giltigtTill` på gamla), samt att alla priser är *inklusive moms*.
- [ ] **Fyll i kurserna:** sidan `/kurser/` har bara anmälningssätten (butiken, Facebook, Anette). Lägg till kursnamn, datum och pris när ni har dem. Lägg gärna pris på hundtrim och friskvård om ni vill visa dem.
- [ ] **Bekräfta bildrättigheter** för logotyp, hero- och bannerfoton, personalbilden och kursbilden (hämtade från gamla sajten, sparade i `source-images/`). Fotona ser ut som stockbilder, så kontrollera licensen.
- [ ] **Läs igenom fakta en gång:** personal och roller (`team.ts`, har de godkänt att visas?), samarbetspartnerna Anna-Lena’s hundtrim och Nillans hundhälsa (nummer, namn), 4pets-påståendena (`produkter.ts`), märkeslistorna, öppettider och vägbeskrivning. Facebook, Instagram och Bokadirekt-länkarna svarade 2026-10-21.
- [ ] **Läs integritetspolicyn** (`/integritet/`). Den beskriver bara kontaktformuläret och att inga cookies används.
- [ ] **Omdirigeringar:** sätt upp 301-omdirigeringar från de gamla adresserna (tabellen i README, avsnittet *Publicering*). `/produkter/` hanteras redan av sajten.

## 2. Direkt efter lansering

- [ ] **Sök­motorer:** lägg till sajten i Google Search Console och Bing Webmaster Tools, skicka in sitemapen (`/sitemap-index.xml`) och testa kontaktformuläret med ett riktigt meddelande. Verifierar ni med en metatagg: fyll i `PUBLIC_GOOGLE_VERIFICATION` / `PUBLIC_BING_VERIFICATION` i `.env`.
- [ ] **Google-företagsprofil** är det som viktigast driver lokala sökningar ("djurbutik Borlänge"). Använd exakt samma namn, adress och telefonnummer som på sajten (`src/data/site.ts`), lägg in webbadressen, öppettider och foton, och be nöjda kunder om omdömen. Gör samma sak på Bokadirekt och andra kataloger.
- [ ] **En enda adress:** låt `http://` och `www.` omdirigeras till `https://fyratassar.nu` hos hosten, annars delas länkvärdet upp.
- [ ] **Egna foton** (fasad, interiör, personalporträtt, produkter) ökar förtroendet mer än något annat. Följ `FOTOGUIDE.md`: lägg filerna i `source-images/foton/` och kör `npm run images`. De visas av sig själva.
- [ ] **Omdömen:** lägg in Google-betyg eller citat (med kundens skriftliga tillstånd) i `src/data/omdomen.ts`. Sektionen visas då automatiskt.
- [ ] **Slå på mätningen** så ni ser vad som ger samtal, bokningar och förfrågningar: skapa ett konto hos Plausible eller GoatCounter och fyll i `.env` (se README, avsnittet *Mätning*). Utan det mäts ingenting.
- [ ] **Slutdatum på kampanjerna:** lägg in `giltigtTill` i `src/data/erbjudanden.ts` när ni vet det, så kan sajten visa ett riktigt "gäller till". Kräver att sajten byggs om dagligen.
- [ ] **Helgöppettider:** lägg in avvikande dagar i `undantag` i `src/data/site.ts` så att "Öppet nu" stämmer.

## 3. När webbshopen ska öppna

- [ ] Följ `VILLKOR-WEBBSHOP.md` (köpvillkor, ångerrätt, leverans, retur, reklamation) och lägg produkterna i `src/data/webbshop.ts`.

## Medvetet utelämnat från den gamla sajten

Galleri, "Nyheter i butiken", 10-årsjubileum och Standardt (innehåll eller rättigheter saknas), tredje parts varumärkeslogotyper (märkena visas som text), bildkarusellen (kravspecen avråder från automatiska karuseller) och drop-in-tillfället med Jenny 1/10-26 (datumet har passerat).
