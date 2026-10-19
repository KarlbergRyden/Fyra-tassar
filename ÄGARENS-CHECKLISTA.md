# Ägarens checklista före publicering

All information på webbplatsen är hämtad från den nuvarande sajten fyratassar.nu (hämtad 2026-10-12). Inget är påhittat, men **flera uppgifter kan vara inaktuella eller saknas**. Gå igenom listan innan lansering.

## 1. Måste verifieras (kan vara fel eller föråldrat)

- [ ] **Foderkampanjerna** (`src/data/erbjudanden.ts`) är kopierade från sidan "Aktuellt". Är priserna och produkterna fortfarande aktuella? Sätt annars `aktiv: false` eller `giltigtTill`.
- [ ] **Kloklippning, 160 kr** (`src/data/tjanster.ts`): stämmer priset, att det betalas med Klarna vid bokning, tiderna ("vanligtvis tisdagar ca 15–19") och villkoren (avbokning 24 h innan, uteblivet besök debiteras 100 %)?
- [ ] **Moms:** sidan *Priser* anger att priserna är inklusive moms. Bekräfta.
- [ ] **Vilka djur klipps klor på?** Texten säger "ditt djur" eftersom källan inte specificerar det. Skriv gärna "hund" och/eller "katt".
- [ ] **Bokadirekt-länk** (`site.ts` → `bokningUrl`): öppna länken och kontrollera att den går till rätt sida.
- [ ] **Facebook och Instagram** (`site.ts` → `sociala`): är kontona aktiva och officiella?
- [ ] **Samarbetspartners:** Anna-Lena’s hundtrim (sms 072-308 05 00) och Nillans hundhälsa (073-698 10 09, nillanshundhalsa.se). Är kontaktuppgifterna aktuella, och är det okej att de nämns? Vet du pris eller var behandlingarna sker kan det läggas till.
- [ ] **Hundkurser:** källsidan hade inga kurser, datum eller priser, bara "anmälan i butiken eller via Facebook" och Anettes e-post. Sidan `/kurser/` är skriven därefter. **Lägg till aktuella kurser (namn, datum, pris)** när du har dem.
- [ ] **Personal** (`src/data/team.ts`): kontrollera namn, roller och texter. Har personerna godkänt att de visas?
- [ ] **Vi har besökt tillverkarna** (Fourfriends i Prag, Profine): stämmer formuleringen?
- [ ] **4pets PRO-hundbur:** "schweiziskt tillverkat, giftfritt, TÜV SÜD-certifierat för krocksäkerhet, visningsex i butiken". Kontrollera mot tillverkaren.
- [ ] **Märkeslistor** (`produkter.ts`): fodermärken och leverantörer är kopierade från den gamla sajten. Ta bort märken ni inte längre säljer.
- [ ] **Öppettider** och **vägbeskrivningen** ("samma hus som gamla Dollarstore, bredvid Procurator").

## 2. Saknas – måste fyllas i

- [ ] **Organisationsnummer** (`site.ts` → `organisationsnummer`). Visas i sidfot och integritetspolicy när det är ifyllt.
- [ ] **Kontaktformuläret:** välj mottagare. Standard öppnar besökarens e-postprogram. Se README, avsnittet *Kontaktformuläret*, för att koppla en formulärtjänst (kräver konto hos en tjänst, ingen nyckel läggs i koden).
- [ ] **Integritetspolicyn** beskriver hur webbplatsen *faktiskt* fungerar (bara kontaktformuläret, inga cookies). Läs igenom den. Behåller ni uppgifter längre eller använder andra system (t.ex. kundregister) måste texten kompletteras. Det finns ingen cookiebanner, eftersom inga cookies eller spårare används.
- [ ] **Bildrättigheter.** Logotyp, djurfries, hero- och bannerfoton, bildplattorna, personalbilden och kursbilden är hämtade från fyratassar.nu (sparade i `source-images/`). Bekräfta att ni har rätt att använda dem. Fotona ser ut att vara stockbilder, så kontrollera licensen för användning på en ny sajt. Byt gärna mot egna bilder på butiken och produkterna. Lägg ny originalfil i `source-images/`, justera `scripts/process-images.mjs` och kör `npm run images`.
- [ ] **Bildtexter:** alt-texterna i `src/data/bilder.ts` är beskrivande men korta. Originalets bildtext "Märta Andersson med sina hundar" (kurssidan) är inte med eftersom jag inte vet vem som avbildas. Skriv rätt namn och roll om ni vill ha den.
- [ ] **Omdömen och referenser:** inga äkta kundomdömen fanns att hämta, så sidorna `/referenser/` och omdömen är utelämnade medvetet. Lägg till när du har skriftligt tillstånd av kunderna.

### Kundnärvaro (nytt)

- [ ] **Koppla formulärtjänsten** enligt `GUIDE-FORMULAR.md`. Annars når meddelanden bara fram om besökaren har ett e-postprogram, och "Fråga / reservera" fungerar sämre.
- [ ] **Bekräfta att ni kan hantera "Fråga / reservera"** (att svara och eventuellt lägga undan en vara), eller be mig ändra knappens text.
- [ ] **Omdömen:** när ni har riktiga omdömen med skriftligt tillstånd, eller Google-betyg, lägg in dem i `src/data/omdomen.ts`. Sektionen visas då automatiskt.
- [ ] **Egna butiksbilder** (fasad, interiör, produkter) ökar förtroendet mer än något annat. Leverera dem så byter jag ut stockfotona.
- [ ] **Avvikande öppettider** (helger): lägg in dem i `undantag` i `src/data/site.ts` så att "Öppet nu" stämmer.

## 3. Medvetet utelämnat från den gamla sajten

| Gammal sida | Skäl |
| --- | --- |
| Galleri (Hundens dag 2017–2019, Hundens helg 2015, Familjedag 2014 och 2025) | Foton saknas och rättigheter ej verifierade |
| Nyheter i butiken, 10-årsjubileum, Standardt | Innehåll kunde inte hämtas |
| Leverantörs- och fodermärkenas logotyper | Tredje parts varumärken. Märkena visas som textlistor istället |
| Bildkarusellen på startsidan (flera bilder som byts automatiskt) | Kravspecen avråder från automatiska karuseller. Första bilden är hero, den andra är hundkurs-bandet |
| Drop-in-kloklippning 1/10-26 med Jenny | Datumet har passerat. Lägg till nya drop-in-tillfällen i `kloklippning` när de är bestämda |
| Kontaktformulärets sifferkontroll | Ersatt av ett dolt skräpskydd som inte stör besökaren |

## 4. Efter publicering

- [ ] Sätt upp 301-omdirigeringar från gamla adresser (se README → *Publicering*).
- [ ] Skicka in sitemap i Google Search Console.
- [ ] Skicka ett testmeddelande via kontaktformuläret och kontrollera att det når `info@fyratassar.nu`.
- [ ] Uppdatera Google-företagsprofil och Bokadirekt så att de pekar på den nya sajten.
