# Fotoguide – egna bilder till sajten

Egna foton gör mer för förtroendet än något annat på sajten. Sajten är förberedd: **lägg filerna i rätt mapp med rätt namn, kör ett kommando, så dyker bilderna upp.** Så länge en bild saknas visas ingenting (ingen tom ruta och ingen stockbild).

## Så gör ni

1. Lägg bildfilerna i mappen `source-images/foton/`.
2. Namnet på filen är platsen, t.ex. `fasad.jpg`. Filtyper: jpg, png eller webp.
3. Kör `npm run images`. Då skapas små, snabba versioner (och mobilfoton som ligger på sidan i filen vänds rätt automatiskt).
4. Kör `npm run ci` för att kontrollera sajten.

Ta bort en bild genom att ta bort filen och köra `npm run images` igen.

## Foton att ta (i den här ordningen)

| Filnamn             | Vad                                                        | Format             | Visas                       |
| ------------------- | ---------------------------------------------------------- | ------------------ | --------------------------- |
| `fasad.jpg`         | Butiken utifrån med skylten, i dagsljus                    | Liggande, 16:9     | Kontakt                     |
| `interior.jpg`      | Butiken inifrån, hyllor och gärna någon i bild             | Liggande, 16:9     | Startsidan                  |
| `lotta.jpg`         | Lotta, gärna med ett djur                                  | Stående porträtt   | Om oss                      |
| `wilma.jpg`         | Wilma                                                      | Stående porträtt   | Om oss, kloklippning        |
| `emma.jpg`          | Emma                                                       | Stående porträtt   | Om oss                      |
| `caroline.jpg`      | Caroline                                                   | Stående porträtt   | Om oss, kloklippning        |
| `produkt-<id>.jpg`  | En produkt på ljus eller enfärgad bakgrund, rakt framifrån | Kvadratisk, 1:1    | Webbshopen (ersätter ritningen) |

Produktens `id` står i `src/data/webbshop.ts`, t.ex. `produkt-hundfoder.jpg` eller `produkt-kattsand.jpg`.

**Byta ut en befintlig bild:** heter filen som en bild som redan finns (`hero.jpg`, `team.jpg`, `kursledare.jpg`, `bannerHund.jpg`, `bannerSkog.jpg`, `bannerKatt.jpg`) ersätter den originalet. Hjältebilden `hero.jpg` bör vara liggande, minst 2000 px bred, med hunden eller katten tydligt i bild och lugn bakgrund.

## Tips

- Fotografera i dagsljus, nära fönster eller utomhus. Telefonen räcker, men torka linsen.
- Håll telefonen i höjd med djurets ögon. Ta många bilder och välj de bästa.
- Minst 1600 px på långsidan. Större är bättre, filerna krymps automatiskt.
- Foton på kunder och deras djur: fråga om lov skriftligen först. Personer i bild ska ha godkänt det.
- Bilder ni inte själva tagit eller har rättigheter till ska inte läggas här.

## Tekniken i korthet

- Platserna beskrivs i `src/data/foton.ts` (id, alt-text, format). Lägg till en rad där om ni vill ha en ny plats, och använd komponenten `Foto` eller `Fotoband`.
- Bilderna blir WebP i `public/images/` och beskrivs i `src/data/bilder.manifest.json` (genereras, ändra inte för hand).
