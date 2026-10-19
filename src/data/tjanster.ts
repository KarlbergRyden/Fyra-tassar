/**
 * Innehållsmodell för tjänster. En post = en sida på /tjanster/<slug>/.
 * Skriv bara in uppgifter som är verifierade – utelämnade fält visas inte.
 */
import { site } from './site';
import type { BildNamn } from './bilder';

export interface Lank {
  text: string;
  href: string;
  extern?: boolean;
}

export interface Tjanst {
  slug: string;
  namn: string;
  ikon: 'scissors' | 'paw' | 'heart';
  /** Kort beskrivning för kort och listor */
  sammanfattning: string;
  /** Vilket kundproblem tjänsten löser */
  kundnytta: string;
  /** Bild som visas i tjänsteväljaren och som sidbanner */
  bild: BildNamn;
  /** Det kunden får – konkreta, verifierbara punkter */
  kundFar: string[];
  passarFor: string[];
  begransningar?: string[];
  steg: { titel: string; text: string }[];
  pris: { rubrik: string; belopp?: number; text: string };
  tidsatgang?: string;
  forberedelse?: string[];
  villkor?: string[];
  utforare: { rubrik: string; text: string };
  /** Tydlig primär handling */
  cta: Lank;
  /** Alternativ kontaktväg */
  altKontakt: Lank;
  faq: { fraga: string; svar: string }[];
  relaterade: string[];
  seo: { title: string; description: string };
}

export const tjanster: Tjanst[] = [
  {
    slug: 'kloklippning',
    namn: 'Kloklippning',
    ikon: 'scissors',
    sammanfattning:
      'Tidsbokad kloklippning för 160 kr. Boka och betala i förväg via Bokadirekt.',
    kundnytta:
      'Du slipper klippa klorna själv. Vi tar hand om det på en bokad tid, och du betalar redan när du bokar.',
    bild: 'rottweiler',
    kundFar: [
      'En tid som är bokad åt dig, vanligtvis på tisdagseftermiddagar',
      'Kloklippning av butikens egna kloklippare',
      'Ett fast pris: 160 kr, betalt i förväg med Klarna',
      'Gratis parkering direkt utanför',
    ],
    passarFor: [
      'Dig som vill ha hjälp med att klippa klor på ditt djur',
      'Dig som föredrar en fast, bokad tid framför att komma in oanmäld',
    ],
    steg: [
      {
        titel: 'Välj tid',
        text: 'Öppna vår bokningssida på Bokadirekt och välj en ledig tid.',
      },
      {
        titel: 'Betala vid bokning',
        text: 'Du betalar 160 kr med Klarna direkt när du bokar.',
      },
      {
        titel: 'Kom på din tid',
        text: `Kom till butiken på ${site.adress.gata} vid din bokade tid. Parkering är gratis utanför.`,
      },
    ],
    pris: {
      rubrik: '160 kr',
      belopp: 160,
      text: 'Betalas med Klarna när du bokar tiden.',
    },
    tidsatgang:
      'Kloklippning erbjuds vanligtvis tisdagar ca 15.00–19.00, om inget annat anges i bokningen. Tiderna är tidsbokade.',
    villkor: [
      'Bokad tid avbokas senast 24 timmar innan.',
      'Uteblivna besök debiteras till 100 %.',
    ],
    utforare: {
      rubrik: 'Vem klipper?',
      text: 'Butikens kloklippare Wilma Andersson och Caroline Ohlsson.',
    },
    cta: { text: 'Boka kloklippning', href: site.bokningUrl, extern: true },
    altKontakt: { text: `Ring ${site.telefon.visning}`, href: site.telefon.href },
    faq: [
      {
        fraga: 'Vad kostar kloklippning?',
        svar: 'Kloklippning kostar 160 kr. Du betalar med Klarna när du bokar tiden.',
      },
      {
        fraga: 'Hur bokar jag?',
        svar: 'Du bokar via vår sida på Bokadirekt. Välj en ledig tid och betala i samma steg.',
      },
      {
        fraga: 'Hur avbokar jag?',
        svar: `Bokad tid ska avbokas senast 24 timmar innan. Behöver du hjälp, ring oss på ${site.telefon.visning}.`,
      },
      {
        fraga: 'Vad händer om jag inte kommer?',
        svar: 'Uteblivna besök debiteras till 100 %.',
      },
      {
        fraga: 'Vilka dagar finns tider?',
        svar: 'Vanligtvis tisdagar ca 15.00–19.00, om inget annat anges. Lediga tider ser du i bokningen.',
      },
    ],
    relaterade: ['hundtrim', 'hundfriskvard'],
    seo: {
      title: 'Kloklippning i Borlänge – 160 kr, boka online',
      description:
        'Boka kloklippning hos Fyra Tassar i Borlänge. 160 kr, tidsbokat och betalas med Klarna via Bokadirekt. Avbokning senast 24 timmar innan.',
    },
  },
  {
    slug: 'hundtrim',
    namn: 'Hundtrim',
    ikon: 'paw',
    sammanfattning:
      'Vardagstrimning efter dina önskemål – även kattklippning. Utförs av Anna-Lena’s hundtrim.',
    kundnytta:
      'Din hund får en trim som passar just den, utifrån vad du önskar och vad pälsen behöver i vardagen.',
    bild: 'bordercollie',
    kundFar: [
      'En trim efter dina önskemål, anpassad för vardagen',
      'Även kattklippning',
      'Du bokar direkt med utföraren via sms',
    ],
    passarFor: [
      'Hundägare som vill ha hjälp med vardagstrim',
      'Dig som också vill ha hjälp med kattklippning',
    ],
    steg: [
      {
        titel: 'Skicka ett sms',
        text: 'Skriv till Anna-Lena’s hundtrim på 072-308 05 00. Skriv att det gäller Borlänge.',
      },
      {
        titel: 'Berätta vad du önskar',
        text: 'Beskriv din hund eller katt och vilken typ av trim eller klippning du vill ha.',
      },
      {
        titel: 'Boka tid',
        text: 'Anna-Lena’s hundtrim återkommer och ni bestämmer tid.',
      },
    ],
    pris: {
      rubrik: 'Pris lämnas vid bokning',
      text: 'Priset sätts av Anna-Lena’s hundtrim. Fråga när du skickar ditt sms.',
    },
    utforare: {
      rubrik: 'Vem trimmar?',
      text: 'Anna-Lena’s hundtrim. Bokning sker direkt med dem, inte via butiken.',
    },
    cta: {
      text: 'Skicka sms för att boka',
      href: 'sms:+46723080500',
    },
    altKontakt: { text: `Fråga butiken: ${site.telefon.visning}`, href: site.telefon.href },
    faq: [
      {
        fraga: 'Hur bokar jag hundtrim?',
        svar: 'Skicka ett sms till Anna-Lena’s hundtrim på 072-308 05 00 och skriv att det gäller Borlänge.',
      },
      {
        fraga: 'Kan ni klippa katter?',
        svar: 'Ja, kattklippning erbjuds också av Anna-Lena’s hundtrim.',
      },
      {
        fraga: 'Vad kostar det?',
        svar: 'Priset lämnas vid bokning. Fråga Anna-Lena’s hundtrim när du hör av dig.',
      },
    ],
    relaterade: ['kloklippning', 'hundfriskvard'],
    seo: {
      title: 'Hundtrim i Borlänge – boka via sms',
      description:
        'Hundtrim och kattklippning i Borlänge via Anna-Lena’s hundtrim. Vardagstrimmar efter dina önskemål. Boka med sms och skriv att det gäller Borlänge.',
    },
  },
  {
    slug: 'hundfriskvard',
    namn: 'Hundfriskvård',
    ikon: 'heart',
    sammanfattning:
      'Förebyggande friskvård och rehabilitering för hund hos Nillans hundhälsa – massage, laser och elektroterapi.',
    kundnytta:
      'Hjälp att hålla hunden rörlig och välmående, eller att komma tillbaka efter skada, genom behandling av muskler, skelett och leder.',
    bild: 'bannerSkog',
    kundFar: [
      'Förebyggande friskvård och rehabilitering för din hund',
      'Massage, laser och elektroterapi',
      'Behandling av en certifierad hundosteopat och diplomerad hundmassör',
      'Du bokar direkt med Nillans hundhälsa',
    ],
    passarFor: [
      'Hundar som behöver förebyggande friskvård',
      'Hundar som behöver rehabilitering',
    ],
    steg: [
      {
        titel: 'Kontakta Nillans hundhälsa',
        text: 'Ring 073-698 10 09 eller besök deras webbplats.',
      },
      {
        titel: 'Berätta om din hund',
        text: 'Beskriv hundens behov så att rätt behandling kan väljas.',
      },
      {
        titel: 'Boka tid',
        text: 'Ni bestämmer tid direkt med Nillans hundhälsa.',
      },
    ],
    pris: {
      rubrik: 'Pris lämnas av Nillans hundhälsa',
      text: 'Fråga om pris när du kontaktar dem.',
    },
    utforare: {
      rubrik: 'Vem behandlar?',
      text: 'Gunilla, som driver Nillans hundhälsa. Hon är certifierad hundosteopat (fysioterapi för hundens muskler, skelett och leder), diplomerad hundmassör och har utökad djurvårdsutbildning.',
    },
    cta: { text: 'Ring Nillans hundhälsa', href: 'tel:+46736981009' },
    altKontakt: {
      text: 'Besök nillanshundhalsa.se',
      href: 'https://www.nillanshundhalsa.se',
      extern: true,
    },
    faq: [
      {
        fraga: 'Vad innebär hundfriskvård?',
        svar: 'Förebyggande friskvård och rehabilitering för hund, bland annat med massage, laser och elektroterapi.',
      },
      {
        fraga: 'Hur bokar jag?',
        svar: 'Kontakta Nillans hundhälsa direkt på 073-698 10 09 eller via nillanshundhalsa.se.',
      },
    ],
    relaterade: ['kloklippning', 'hundtrim'],
    seo: {
      title: 'Hundfriskvård och rehabilitering för hund',
      description:
        'Förebyggande friskvård och rehabilitering för hund: massage, laser och elektroterapi hos Nillans hundhälsa. Certifierad hundosteopat. Kontakta dem för tid.',
    },
  },
];

export const hittaTjanst = (slug: string) => tjanster.find((t) => t.slug === slug);
