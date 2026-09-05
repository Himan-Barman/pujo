// Master Color System for "Agomoni" (আগমনী)

export const MASTER_COLORS = {
  // 1. Brand Colors
  sindoorRed: '#A61B1B',
  templeRed: '#741313',
  softVermilion: '#D95757',
  primaryVeryLight: '#F3D8D2',

  // Gold
  antiqueGold: '#C99A3D',
  softGold: '#E7C878',
  deepGold: '#9B7226',

  // 2. Background Colors
  sacredIvory: '#FFF8EA',
  warmCream: '#F7EEDB',
  tertiaryCream: '#EFE1C7',
  warmWhite: '#FFFDF8',
  elevatedSurface: '#F4E8D4',
  subtleSectionBg: '#FBF2E2',

  // 3. Text Colors
  templeCharcoal: '#241B18',
  earthBrown: '#5C4940',
  mutedText: '#77655B',
  subtleText: '#9B897D',
  disabledText: '#B9AAA0',
  textOnDark: '#FFF8EA',
  textOnRed: '#FFFDF8',
  textOnGold: '#241B18',

  // 4. Border Colors
  primaryBorder: '#DDCFB8',
  softBorder: '#E8DCC8',
  goldBorder: '#D8B66A',
  darkBorder: '#4A3B34',
  subtleDivider: '#E2D4BF',

  // 5. Nature & Decorative Colors
  bengalGreen: '#315C45',
  leafGreen: '#487254',
  mutedSage: '#71806A',
  terracotta: '#A65332',
  shiuliCenter: '#E7A33C',

  // 6. Night / Pandal Night Mode
  pandalNightBg: '#171A1B',
  pandalNightSurface: '#211D1A',
  pandalNightSurface2: '#2A2420',
  pandalNightPrimary: '#D95757',
  pandalNightGold: '#D4AA50',
  pandalNightMuted: '#C1ADA0',

  // 7. Footer
  footerBg: '#4A0E0E',
  footerHeading: '#FFF8EA',
  footerText: '#E9D8C6',
  footerHover: '#E7C878',
  footerDivider: '#8C4C3F',
} as const;

export const PUJA_DAYS_ORDER = [
  'mahalaya',
  'shashthi',
  'saptami',
  'ashtami',
  'sandhi',
  'navami',
  'dashami',
] as const;

export const FESTIVE_GREETINGS = {
  brandNameBn: 'আগমনী',
  brandNameEn: 'AGOMONI',
  brandTaglineBn: 'শরতের আগমনে মায়ের আবাহন',
  brandTaglineEn: 'Where Maa Comes Alive',
  heroHeadingBn: 'মা আসছেন…',
  heroHeadingEn: 'AGOMONI — WHERE MAA COMES ALIVE',
  heroSubtitleBn: 'শরতের নীল আকাশ, শিউলি আর ভোরের আলোয় দেবীর মর্ত্যে আগমন বার্তা। ভক্তি, স্তোত্র, সঙ্গীত ও সংস্কৃতির পবিত্র মেলবন্ধন।',
  heroSubtitleEn: 'Experience the sacred devotion of Durga Puja through authentic rituals, Agomoni melodies, mantras, and living Bengali heritage.',
  sharodiyaGreetingBn: 'শারদীয়া দুর্গোৎসবের আন্তরিক প্রীতি ও শুভেচ্ছা',
  sharodiyaGreetingEn: 'Warm Greetings on Sharodiya Durga Puja',
  bijoyaFarewellBn: 'আসছে বছর আবার হবে…',
  bijoyaFarewellEn: 'Until Next Year, Maa Will Return…',
};

export const FLOWERS_DATA = [
  {
    id: 'rakta-jaba',
    nameBn: 'রক্তজবা',
    nameEn: 'Red Hibiscus',
    descriptionBn: 'মা দুর্গার সর্বপ্রিয় পুষ্প। শক্তি ও পবিত্রতার প্রতীক।',
    descriptionEn: 'Sacred red hibiscus beloved to Devi Durga, signifying energy and devotion.',
    iconColor: '#A61B1B',
    petalColor: '#D95757',
  },
  {
    id: 'padma',
    nameBn: 'রক্তপদ্ম',
    nameEn: 'Sacred Lotus',
    descriptionBn: 'সন্ধিপূজার ১০৮ পদ্মের পবিত্র অর্ঘ্য। জ্ঞান ও মোক্ষের প্রতীক।',
    descriptionEn: 'Sacred 108 lotus offering of Sandhi Puja symbolizing divine purity.',
    iconColor: '#C62828',
    petalColor: '#E7C878',
  },
  {
    id: 'bel-pata',
    nameBn: 'ত্রিদল বিল্বপত্র',
    nameEn: 'Three-Leaf Bilva',
    descriptionBn: 'সত্ত্ব, রজ ও তম গুণের ঊর্ধ্বে ত্রিনয়নীর চরণে আত্মসমর্পণ।',
    descriptionEn: 'Trifoliate sacred leaves representing the three divine eyes of the Mother.',
    iconColor: '#315C45',
    petalColor: '#487254',
  },
  {
    id: 'shiuli',
    nameBn: 'শিউলি ফুল',
    nameEn: 'Shiuli (Night Jasmine)',
    descriptionBn: 'শরতের ভোরবেলায় দেবীর আগমনের সুবাসবাহী পুষ্প।',
    descriptionEn: 'Fragrant autumn blossoms heralding the advent of Devi Durga.',
    iconColor: '#E7A33C',
    petalColor: '#FFFDF8',
  },
  {
    id: 'aparajita',
    nameBn: 'নীল অপরাজিতা',
    nameEn: 'Blue Aparajita',
    descriptionBn: 'বিজয়ার অপরাজিতা পূজা ও সর্বজয়ী আশীর্বাদের প্রতীক।',
    descriptionEn: 'Aparajita blossoms of Bijoya conferring victory and divine blessings.',
    iconColor: '#303552',
    petalColor: '#5C6B9E',
  },
] as const;
