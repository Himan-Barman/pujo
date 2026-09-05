export type FestivalStateId =
  | 'pre-mahalaya'
  | 'mahalaya'
  | 'post-mahalaya'
  | 'panchami'
  | 'shashthi'
  | 'saptami'
  | 'ashtami'
  | 'navami'
  | 'dashami'
  | 'post-dashami';

export type TimeOfDayPeriod = 'dawn' | 'morning' | 'afternoon' | 'evening' | 'night';

export type VisualIntensityLevel = 'low' | 'medium' | 'high' | 'reflective';

export interface FestivalCTA {
  id: string;
  labelBn: string;
  labelEn: string;
  href: string;
  variant: 'primary' | 'secondary';
  icon?: 'flame' | 'calendar' | 'music' | 'compass' | 'send' | 'sparkles' | 'book';
}

export interface FestivalSlogan {
  id: string;
  titleBn: string;
  titleEn: string;
  quoteBn: string;
  quoteEn: string;
  contextBn?: string;
  contextEn?: string;
}

export interface FestivalStatusHighlight {
  labelBn: string;
  labelEn: string;
  timeBn?: string;
  timeEn?: string;
  descBn?: string;
  descEn?: string;
}

export interface FestivalStatusCardData {
  mode: 'countdown' | 'status-info';
  cardBadgeBn: string;
  cardBadgeEn: string;
  titleBn: string;
  titleEn: string;
  subtitleBn?: string;
  subtitleEn?: string;
  highlights?: FestivalStatusHighlight[];
  // Countdown properties (active when mode === 'countdown')
  targetDate?: Date;
  countdownLabelBn?: string;
  countdownLabelEn?: string;
  targetEventBn?: string;
  targetEventEn?: string;
}

export interface FestivalStateData {
  stateId: FestivalStateId;
  year: number;
  greetingBadgeBn: string;
  greetingBadgeEn: string;
  headlineBn: string;
  headlineEn: string;
  subtitleBn: string;
  subtitleEn: string;
  emotionalKeywordBn: string;
  emotionalKeywordEn: string;
  statusCard: FestivalStatusCardData;
  slogans: FestivalSlogan[];
  ctas: FestivalCTA[];
  visualIntensity: VisualIntensityLevel;
  timeOfDayGreetingBn?: string;
  timeOfDayGreetingEn?: string;
}
