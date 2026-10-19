/** Gemensam FAQ. Varje svar länkar till rätt sida. */
import { site } from './site';

export interface FaqPost {
  fraga: string;
  svar: string;
  lank?: { text: string; href: string };
  /** Visas på startsidan */
  startsida?: boolean;
}

export const faq: FaqPost[] = [
  {
    fraga: 'Var ligger butiken och finns det parkering?',
    svar: `Vi finns på ${site.adress.gata} i Borlänge, i samma hus som gamla Dollarstore, bredvid Procurator. Det finns gratis parkering direkt utanför.`,
    lank: { text: 'Hitta hit', href: '/kontakt/' },
    startsida: true,
  },
  {
    fraga: 'Vilka öppettider har ni?',
    svar: 'Måndag, onsdag–fredag 10.00–18.00, tisdag 10.00–19.00 och lördag 10.00–15.00. Söndagar har vi stängt.',
    lank: { text: 'Se alla öppettider', href: '/kontakt/#oppettider' },
    startsida: true,
  },
  {
    fraga: 'Kan ni beställa hem produkter ni inte har?',
    svar: 'Ja, saknar du något i vårt sortiment kan du fråga oss. Vi beställer hem produkten om det går.',
    lank: { text: 'Se sortimentet', href: '/produkter/' },
    startsida: true,
  },
  {
    fraga: 'Hur bokar jag kloklippning och vad kostar det?',
    svar: 'Kloklippning kostar 160 kr. Du bokar en tid via Bokadirekt och betalar med Klarna i samma steg. Avboka senast 24 timmar innan – uteblivna besök debiteras till 100 %.',
    lank: { text: 'Om kloklippning', href: '/tjanster/kloklippning/' },
    startsida: true,
  },
  {
    fraga: 'Hur bokar jag hundtrim?',
    svar: 'Skicka ett sms till Anna-Lena’s hundtrim på 072-308 05 00 och skriv att det gäller Borlänge. Även kattklippning erbjuds.',
    lank: { text: 'Om hundtrim', href: '/tjanster/hundtrim/' },
  },
  {
    fraga: 'Hur anmäler jag mig till en hundkurs?',
    svar: 'Anmälan sker i butiken eller via Facebook. Frågor om kurserna kan du ställa till Anette.',
    lank: { text: 'Om hundkurser', href: '/kurser/' },
  },
  {
    fraga: 'Har ni någon webbutik?',
    svar: 'Nej, sortimentet och priserna ser du i butiken. Ring eller mejla oss så kollar vi gärna om vi har det du söker.',
    lank: { text: 'Kontakta oss', href: '/kontakt/' },
  },
  {
    fraga: 'Vilka foder- och tillbehörsmärken har ni?',
    svar: 'Bland fodermärkena finns bland annat Royal Canin, Eukanuba, Taste of the Wild, Four Friends och Profine. Hela listan finns på produktsidan.',
    lank: { text: 'Se alla märken', href: '/produkter/#marken' },
  },
  {
    fraga: 'Var hittar jag aktuella erbjudanden?',
    svar: 'Våra foderkampanjer visas under Erbjudanden. Du hittar även erbjudanden på vår Facebooksida.',
    lank: { text: 'Se erbjudanden', href: '/erbjudanden/' },
  },
  {
    fraga: 'Hur behandlar ni mina personuppgifter?',
    svar: 'Vi använder uppgifterna du skickar i kontaktformuläret för att svara på din fråga, och vi använder inga cookies för spårning.',
    lank: { text: 'Läs integritetspolicyn', href: '/integritet/' },
  },
];
