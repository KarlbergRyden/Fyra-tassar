# Så får ni kontaktformuläret att nå er

Utan inställning öppnar formuläret besökarens e-postprogram. Det fungerar, men den som saknar ett installerat e-postprogram (många på mobil) når aldrig fram. Koppla därför en formulärtjänst. Det tar ca 10 minuter.

Sajten skickar meddelandet som JSON (`namn`, `epost`, `telefon`, `meddelande`, `subject`) till en adress ni anger. Inga hemligheter ligger i koden.

## Alternativ A – Formspree

1. Skapa ett konto på formspree.io och ett nytt formulär. Ange `info@fyratassar.nu` som mottagare och bekräfta e-posten.
2. Kopiera formulärets adress, t.ex. `https://formspree.io/f/abcdwxyz`.
3. Sätt miljövariabeln vid bygget:

   ```
   PUBLIC_FORM_ENDPOINT=https://formspree.io/f/abcdwxyz
   ```

## Alternativ B – Web3Forms

1. Gå till web3forms.com och skapa en åtkomstnyckel för `info@fyratassar.nu`.
2. Sätt båda variablerna:

   ```
   PUBLIC_FORM_ENDPOINT=https://api.web3forms.com/submit
   PUBLIC_FORM_ACCESS_KEY=din-nyckel-här
   ```

   Nyckeln är publik på det sättet tjänsten är byggd, och går bara att använda för att skicka till er egen e-post.

## Sätta variablerna

- **Lokalt:** kopiera `.env.example` till `.env` och fyll i. (`.env` ligger i `.gitignore` och checkas aldrig in.)
- **På webbhotellet/CI:** lägg in samma variabler som miljövariabler och kör `npm run build`.

## Testa

1. Bygg sajten och öppna `/kontakt/`.
2. Skicka ett riktigt meddelande. Du ska se bekräftelsen "Tack för ditt meddelande!" och få e-post.
3. Skicka även från en kampanj: knappen "Fråga / reservera" på `/erbjudanden/` ska öppna formuläret med produkten ifylld.

## Integritet

När en formulärtjänst används är tjänstens leverantör personuppgiftsbiträde. Uppdatera `/integritet/` med tjänstens namn och teckna deras biträdesavtal (de flesta tjänster har ett standardavtal). Texten på sidan anpassar sig automatiskt när `PUBLIC_FORM_ENDPOINT` är satt, men kontrollera den.
