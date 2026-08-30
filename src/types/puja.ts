export type PujaDayId =
  | 'mahalaya'
  | 'shashthi'
  | 'saptami'
  | 'ashtami'
  | 'sandhi'
  | 'navami'
  | 'dashami';

export type PanjikaType = 'benimadhab' | 'guptapress';

export interface PanjikaSchedule {
  panjikaNameBn: string;
  panjikaNameEn: string;
  tithiWindowBn: string;
  tithiWindowEn: string;
  tithiStartBn: string;
  tithiStartEn: string;
  tithiEndBn: string;
  tithiEndEn: string;
  amritaYogaBn?: string;
  amritaYogaEn?: string;
  timingHighlights: {
    titleBn: string;
    titleEn: string;
    timeBn: string;
    timeEn: string;
    importance?: 'primary' | 'special' | 'standard';
  }[];
}

export interface PujaBidhiStep {
  step: number;
  titleBn: string;
  titleEn: string;
  descBn: string;
  descEn: string;
  timeBn?: string;
  timeEn?: string;
}

export interface PujaDay {
  id: PujaDayId;
  nameBn: string;
  nameEn: string;
  date: string;
  dateBn?: string;
  dateEn?: string;
  bengaliDateBn?: string;
  bengaliDateEn?: string;
  tithiBn: string;
  tithiEn: string;
  tithiWindowBn: string;
  tithiWindowEn: string;
  tithiStartBn: string;
  tithiStartEn: string;
  tithiEndBn: string;
  tithiEndEn: string;
  amritaYogaBn?: string;
  amritaYogaEn?: string;
  mahendraYogaBn?: string;
  mahendraYogaEn?: string;
  vahanaArrivalBn?: string;
  vahanaArrivalEn?: string;
  vahanaArrivalResultBn?: string;
  vahanaArrivalResultEn?: string;
  vahanaDepartureBn?: string;
  vahanaDepartureEn?: string;
  vahanaDepartureResultBn?: string;
  vahanaDepartureResultEn?: string;
  themeColor: string;
  accentColor: string;
  bgGradient: string;
  descriptionBn: string;
  descriptionEn: string;
  keyRitualsBn: string[];
  keyRitualsEn: string[];
  tithiMahatmyaBn: string[];
  tithiMahatmyaEn: string[];
  pujaBidhiStepsBn: PujaBidhiStep[];
  pujaBidhiStepsEn: PujaBidhiStep[];
  samagriListBn: string[];
  samagriListEn: string[];
  dhyanShlokaBn: string;
  dhyanShlokaEn: string;
  dhyanShlokaMeaningBn: string;
  dhyanShlokaMeaningEn: string;
  timingHighlights: {
    titleBn: string;
    titleEn: string;
    timeBn: string;
    timeEn: string;
    importance?: 'primary' | 'special' | 'standard';
  }[];
  // Multi-Panjika Custom Schedules
  benimadhabSchedule: PanjikaSchedule;
  guptapressSchedule: PanjikaSchedule;
}

export interface Ritual {
  id: string;
  dayId: PujaDayId;
  titleBn: string;
  titleEn: string;
  timeBn: string;
  timeEn: string;
  tithiBn: string;
  tithiEn: string;
  shortDescBn: string;
  shortDescEn: string;
  fullDescBn: string;
  fullDescEn: string;
  mantraPreviewBn?: string;
  mantraPreviewEn?: string;
  iconName: string;
  significanceBn: string;
  significanceEn: string;
  itemsNeededBn: string[];
  itemsNeededEn: string[];
}
