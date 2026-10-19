/** Sortimentsdata. Inga priser eller lagersaldon visas online – de finns i butiken. */

export interface Kategori {
  id: 'hund' | 'katt';
  namn: string;
  ikon: 'dog' | 'cat';
  intro: string;
  artiklar: string[];
}

export const kategorier: Kategori[] = [
  {
    id: 'hund',
    namn: 'Hund',
    ikon: 'dog',
    intro: 'Foder, träningsutrustning, hundkläder och allt till vardagen.',
    artiklar: [
      'Leksaker',
      'Filtar',
      'Hundkläder',
      'Burar',
      'Arbetsutrustning',
      'Koppel',
      'Halsband',
      'Godis',
      'Schampo och balsam',
      'Kosttillskott',
      'Pälsvård (klosax, kammar, saxar)',
      'Matskålar',
      'Selar',
      'Sängar',
      'Skyltar och dekaler',
      'Fästingband',
      'Reflex- och blinkhalsband',
      'Flytvästar',
    ],
  },
  {
    id: 'katt',
    namn: 'Katt',
    ikon: 'cat',
    intro: 'Från kattsand och klösbrädor till sängar, leksaker och godis.',
    artiklar: [
      'Klösbrädor',
      'Klösträd',
      'Leksaker',
      'Pälsvård',
      'Matskålar',
      'Sängar',
      'Koppel',
      'Halsband',
      'Kattsand',
      'Kattlådor med tillbehör',
      'Reflexhalsband',
      'Fästingband',
      'Godis',
    ],
  },
];

export const fodermarken = [
  'Eukanuba',
  'Four Friends',
  'Mush',
  'Iams',
  'Royal Canin',
  'Taste of the Wild',
  'Vom og Hundemat',
  'Pondus',
  'Carrier',
  'Profine',
  'SP',
  'True Fresh',
  'Platinum',
  'Standardt',
  'Natural',
];

export const leverantorer = [
  'Dogman',
  'Eldorado',
  'Galltval',
  'Gibbon',
  'Globus Sport',
  'Hurtta',
  'Kruuse',
  'Nonstop',
  'Imazo',
  'Nobby',
  'Lupus',
  'Peewee',
  'Petcare',
  'Baltic',
  'Standardt',
  'Pritax',
  'Svenska Djurapoteket',
  'Sporzoo',
  'Metizo',
  'Dog Copenhagen',
  'Deaphar',
  'Everclean',
  'Monster',
  'Klin-Kassel',
  'Nutrolin',
  'Gustav Evita',
  'Rauh',
  'Classic',
  'Trixie',
  'Jokke',
  'Aveo',
  'Aptus',
];

/** Utvald produkt som lyfts på startsidan och produktsidan. */
export const utvaldProdukt = {
  namn: '4pets PRO hundbur',
  rubrik: 'Hundbur för bilen från 4pets PRO',
  text: 'Schweiziskt tillverkat, giftfritt och TÜV SÜD-certifierat för krocksäkerhet, enligt tillverkaren.',
  punkter: [
    'Visningsexemplar finns i butiken',
    'Övriga storlekar beställer vi hem på begäran',
    'Pris lämnas i butiken',
  ],
};
