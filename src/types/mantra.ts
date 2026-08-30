export type MantraType = 'pranam' | 'pushpanjali' | 'sandhi' | 'chandi' | 'aarati' | 'bisarjan';

export interface MantraStep {
  stepNumber: number;
  titleBn: string;
  titleEn: string;
  instructionsBn: string;
  instructionsEn: string;
  bengaliScript: string;
  sanskritDevanagari: string;
  transliteration: string;
  bengaliMeaning: string;
  englishMeaning: string;
}

export interface MantraItem {
  id: string;
  type: MantraType;
  titleBn: string;
  titleEn: string;
  deityBn: string;
  deityEn: string;
  purposeBn: string;
  purposeEn: string;
  bengaliScript: string;
  sanskritDevanagari: string;
  transliteration: string;
  bengaliMeaning: string;
  englishMeaning: string;
  audioDuration: string;
  synthSound?: 'mantra-drone' | 'shankha' | 'evening-aarti';
  steps?: MantraStep[];
  culturalContextBn: string;
  culturalContextEn: string;
}
