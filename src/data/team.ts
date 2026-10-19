/** Personal och roller. Källa: fyratassar.nu/Om-oss. */
export interface Person {
  namn: string;
  roll: string;
  text: string;
}

export const team: Person[] = [
  {
    namn: 'Lotta Andersson',
    roll: 'VD och butiksägare',
    text: 'Har många års erfarenhet av hundar och har även haft katt och häst. Tränar och tävlar i bruks. Har arbetat i 20 år i djurbutik och har utbildning i foderlära. Äger kooikerhundarna Märta och Axa.',
  },
  {
    namn: 'Wilma Andersson',
    roll: 'Butiksmedarbetare och kloklippare',
    text: 'Lottas dotter. Har arbetat i butiken i fyra år och har varit med sedan starten, bland annat på personalutbildningar och handelsresor.',
  },
  {
    namn: 'Emma Roos',
    roll: 'Butiksmedarbetare',
    text: 'Arbetar i butiken 1–2 dagar i veckan vid sidan av studier. Har erfarenhet av kattuppfödning och äger en rottweiler.',
  },
  {
    namn: 'Caroline Ohlsson',
    roll: 'Kloklippare',
    text: 'Klipper klor hos oss.',
  },
];
