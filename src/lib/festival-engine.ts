import {
  FestivalStateId,
  FestivalStateData,
  TimeOfDayPeriod,
  FestivalSlogan,
} from '@/types/festival';
import { toBengaliNumeral } from './formatters';

// Canonical Festival Schedule Configuration by Year (Asia/Kolkata)
export interface FestivalCalendarYear {
  year: number;
  mahalayaStart: string; // e.g. '2026-10-10T00:00:00+05:30'
  mahalayaEnd: string;   // '2026-10-10T23:59:59+05:30'
  panchamiStart: string; // '2026-10-15T00:00:00+05:30'
  shashthiStart: string; // '2026-10-16T00:00:00+05:30'
  saptamiStart: string;  // '2026-10-17T00:00:00+05:30'
  ashtamiStart: string;  // '2026-10-18T00:00:00+05:30'
  navamiStart: string;   // '2026-10-19T00:00:00+05:30'
  dashamiStart: string;  // '2026-10-20T00:00:00+05:30'
  dashamiEnd: string;    // '2026-10-20T23:59:59+05:30'
  nextMahalayaStart: string; // '2027-09-29T00:00:00+05:30'
}

export const FESTIVAL_CALENDARS: Record<number, FestivalCalendarYear> = {
  2026: {
    year: 2026,
    mahalayaStart: '2026-10-10T00:00:00+05:30',
    mahalayaEnd: '2026-10-10T23:59:59+05:30',
    panchamiStart: '2026-10-15T00:00:00+05:30',
    shashthiStart: '2026-10-16T00:00:00+05:30',
    saptamiStart: '2026-10-17T00:00:00+05:30',
    ashtamiStart: '2026-10-18T00:00:00+05:30',
    navamiStart: '2026-10-19T00:00:00+05:30',
    dashamiStart: '2026-10-20T00:00:00+05:30',
    dashamiEnd: '2026-10-20T23:59:59+05:30',
    nextMahalayaStart: '2027-09-29T00:00:00+05:30',
  },
  2027: {
    year: 2027,
    mahalayaStart: '2027-09-29T00:00:00+05:30',
    mahalayaEnd: '2027-09-29T23:59:59+05:30',
    panchamiStart: '2027-10-04T00:00:00+05:30',
    shashthiStart: '2027-10-05T00:00:00+05:30',
    saptamiStart: '2027-10-06T00:00:00+05:30',
    ashtamiStart: '2027-10-07T00:00:00+05:30',
    navamiStart: '2027-10-08T00:00:00+05:30',
    dashamiStart: '2027-10-09T00:00:00+05:30',
    dashamiEnd: '2027-10-09T23:59:59+05:30',
    nextMahalayaStart: '2028-10-17T00:00:00+05:30',
  },
};

export const STATE_SIMULATED_DATES: Record<FestivalStateId, string> = {
  'pre-mahalaya': '2026-09-01T10:00:00+05:30',
  'mahalaya': '2026-10-10T05:30:00+05:30',
  'post-mahalaya': '2026-10-12T10:00:00+05:30',
  'panchami': '2026-10-15T18:00:00+05:30',
  'shashthi': '2026-10-16T08:00:00+05:30',
  'saptami': '2026-10-17T09:00:00+05:30',
  'ashtami': '2026-10-18T10:00:00+05:30',
  'navami': '2026-10-19T11:00:00+05:30',
  'dashami': '2026-10-20T12:00:00+05:30',
  'post-dashami': '2026-10-25T10:00:00+05:30',
};

/**
 * Returns the current time-of-day period in Kolkata timezone (UTC+5:30)
 */
export function getTimeOfDayInKolkata(date: Date = new Date()): TimeOfDayPeriod {
  // Convert date to IST hours
  const utc = date.getTime() + date.getTimezoneOffset() * 60000;
  const istDate = new Date(utc + 3600000 * 5.5);
  const hour = istDate.getHours();

  if (hour >= 4 && hour < 6) return 'dawn';
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 17) return 'afternoon';
  if (hour >= 17 && hour < 21) return 'evening';
  return 'night';
}

/**
 * Resolves the active festival state based on Kolkata time or a forced state override
 */
export function resolveFestivalStateId(
  currentDate: Date = new Date(),
  forceState?: FestivalStateId
): { stateId: FestivalStateId; year: number } {
  if (forceState) {
    return { stateId: forceState, year: 2026 };
  }

  const nowTime = currentDate.getTime();
  const year = currentDate.getFullYear();
  const calendar = FESTIVAL_CALENDARS[year] || FESTIVAL_CALENDARS[2026];

  const mahalayaStart = new Date(calendar.mahalayaStart).getTime();
  const mahalayaEnd = new Date(calendar.mahalayaEnd).getTime();
  const panchamiStart = new Date(calendar.panchamiStart).getTime();
  const shashthiStart = new Date(calendar.shashthiStart).getTime();
  const saptamiStart = new Date(calendar.saptamiStart).getTime();
  const ashtamiStart = new Date(calendar.ashtamiStart).getTime();
  const navamiStart = new Date(calendar.navamiStart).getTime();
  const dashamiStart = new Date(calendar.dashamiStart).getTime();
  const dashamiEnd = new Date(calendar.dashamiEnd).getTime();

  if (nowTime < mahalayaStart) {
    return { stateId: 'pre-mahalaya', year };
  }
  if (nowTime >= mahalayaStart && nowTime <= mahalayaEnd) {
    return { stateId: 'mahalaya', year };
  }
  if (nowTime > mahalayaEnd && nowTime < panchamiStart) {
    return { stateId: 'post-mahalaya', year };
  }
  if (nowTime >= panchamiStart && nowTime < shashthiStart) {
    return { stateId: 'panchami', year };
  }
  if (nowTime >= shashthiStart && nowTime < saptamiStart) {
    return { stateId: 'shashthi', year };
  }
  if (nowTime >= saptamiStart && nowTime < ashtamiStart) {
    return { stateId: 'saptami', year };
  }
  if (nowTime >= ashtamiStart && nowTime < navamiStart) {
    return { stateId: 'ashtami', year };
  }
  if (nowTime >= navamiStart && nowTime < dashamiStart) {
    return { stateId: 'navami', year };
  }
  if (nowTime >= dashamiStart && nowTime <= dashamiEnd) {
    return { stateId: 'dashami', year };
  }
  return { stateId: 'post-dashami', year };
}

/**
 * Returns the full, rich state configuration for the hero section
 */
export function getAgomoniFestivalState(
  overrideDate?: Date,
  forceState?: FestivalStateId
): FestivalStateData {
  let activeDate = overrideDate;
  if (!activeDate && forceState) {
    activeDate = new Date(STATE_SIMULATED_DATES[forceState]);
  } else if (!activeDate) {
    activeDate = new Date();
  }

  const { stateId, year } = resolveFestivalStateId(activeDate, forceState);
  const timeOfDay = getTimeOfDayInKolkata(activeDate);
  const calendar = FESTIVAL_CALENDARS[year] || FESTIVAL_CALENDARS[2026];

  switch (stateId) {
    case 'pre-mahalaya': {
      return {
        stateId: 'pre-mahalaya',
        year,
        greetingBadgeBn: 'শারদীয়া দুর্গোৎসবের আন্তরিক প্রীতি ও শুভেচ্ছা',
        greetingBadgeEn: 'Warm Sharodiya Durga Puja Greetings & Blessings',
        headlineBn: 'মা আসছেন…',
        headlineEn: 'Maa Is Arriving…',
        subtitleBn: 'আগমনী — শরতের আগমনে মায়ের আবাহন',
        subtitleEn: 'AGOMONI — WHERE MAA COMES ALIVE',
        emotionalKeywordBn: 'প্রতীক্ষা',
        emotionalKeywordEn: 'Waiting',
        visualIntensity: 'low',
        timeOfDayGreetingBn:
          timeOfDay === 'dawn'
            ? 'শরতের শান্ত ভোরে শিউলি ঝরার গন্ধ'
            : timeOfDay === 'evening'
            ? 'শারদ সন্ধ্যায় দূর কাশবনে মন্দ বাতাস'
            : 'শরতের নীল আকাশ ও কাশের দোলা',
        timeOfDayGreetingEn:
          timeOfDay === 'dawn'
            ? 'Fragrance of morning Shiuli in the autumn breeze'
            : 'Gentle autumn dusk over whispering Kash fields',
        statusCard: {
          mode: 'countdown',
          cardBadgeBn: 'মহালয়ার ক্ষণগণনা',
          cardBadgeEn: 'Countdown to Mahalaya',
          titleBn: 'মহালয়ার অপেক্ষা',
          titleEn: 'Awaiting Mahalaya Dawn',
          subtitleBn: 'পিতৃপক্ষের অবসান ও দেবীপক্ষের শুভ আবাহন লগ্ন',
          subtitleEn: 'End of Pitru Paksha & Awakening of Devi Paksha',
          targetDate: new Date(calendar.mahalayaStart),
          countdownLabelBn: 'মহালয়ার আগমনী ক্ষণগণনা',
          countdownLabelEn: 'Countdown to Auspicious Mahalaya',
          targetEventBn: 'মহালয়ার পুণ্য প্রভাত',
          targetEventEn: 'Auspicious Mahalaya Dawn',
        },
        slogans: [
          {
            id: 'kumartuli-chokkhu',
            titleBn: 'কুমারটুলির নিপুণ চক্ষুদান পর্ব',
            titleEn: 'Kumartuli Artisan Chokkhudaan',
            quoteBn: '“তুলির শেষ টানে মৃন্ময়ী মা হন চিন্ময়ী…”',
            quoteEn: '“Clay transforms into divine grace with the final brush stroke…”',
          },
          {
            id: 'pratima-daak',
            titleBn: 'দেবী দুর্গার সাবেক ডাকের সাজ',
            titleEn: 'Traditional Daaker Saaj Pratima',
            quoteBn: '“যা দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা…”',
            quoteEn: '“Ya Devi Sarvabhuteshu Shakti-rupena Samsthita…”',
          },
          {
            id: 'dhunuchi-kash',
            titleBn: 'কাশবন ও শারদ আগমনী বার্তা',
            titleEn: 'Autumn Kash & Sacred Awakening',
            quoteBn: '“নীল আকাশে সাদা মেঘের ভেলা, শুরু হলো পুজো পুজো খেলা…”',
            quoteEn: '“White clouds in azure skies herald the arrival of Maa…”',
          },
        ],
        ctas: [
          {
            id: 'anjali',
            labelBn: 'অঞ্জলি দিন',
            labelEn: 'Offer Pushpanjali',
            href: '/anjali',
            variant: 'primary',
            icon: 'flame',
          },
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা দেখুন',
            labelEn: 'View Calendar',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
          {
            id: 'songs',
            labelBn: 'শারদ সুর ও ভক্তিগীতি',
            labelEn: 'Puja Melodies & Songs',
            href: '/songs',
            variant: 'secondary',
            icon: 'music',
          },
        ],
      };
    }

    case 'mahalaya': {
      return {
        stateId: 'mahalaya',
        year,
        greetingBadgeBn: 'আজ শুভ মহালয়া • দেবীপক্ষের পুণ্য আবাহন',
        greetingBadgeEn: 'Auspicious Mahalaya • Awakening of Devi Paksha',
        headlineBn: 'শুভ মহালয়া',
        headlineEn: 'Subho Mahalaya',
        subtitleBn: 'মায়ের আগমনী সুরে শুরু হোক দেবীপক্ষের পুণ্য অপেক্ষা',
        subtitleEn: 'The Immortal Melodies of Chandi Path Awaken the Soul',
        emotionalKeywordBn: 'আবাহন',
        emotionalKeywordEn: 'Invocation',
        visualIntensity: 'medium',
        timeOfDayGreetingBn:
          timeOfDay === 'dawn'
            ? 'ভোর ৪টার স্তব্ধতায় বীরেন্দ্রকৃষ্ণের অমর চণ্ডীপাঠ'
            : 'দেবীপক্ষের প্রথম আলোকমালায় পবিত্র আগমনী বার্তা',
        timeOfDayGreetingEn:
          timeOfDay === 'dawn'
            ? 'Immortal pre-dawn radio broadcast of Chandi Path'
            : 'First radiant morning of Devi Paksha',
        statusCard: {
          mode: 'status-info',
          cardBadgeBn: 'আজকের পুণ্য লগ্ন',
          cardBadgeEn: "Today's Sacred Window",
          titleBn: 'আজ শুভ মহালয়া',
          titleEn: 'Auspicious Mahalaya',
          subtitleBn: 'পিতৃতর্পণ, আকাশবাণীর চণ্ডীপাঠ ও চক্ষুদান পর্ব',
          subtitleEn: 'Ancestral Tarpan, Akashvani Chandi Path & Chokkhudaan',
          highlights: [
            {
              labelBn: 'চণ্ডীপাঠ সম্প্রচার লগ্ন',
              labelEn: 'Chandi Path Broadcast',
              timeBn: 'ভোর ০৪:০০',
              timeEn: '04:00 AM',
            },
            {
              labelBn: 'পিতৃতর্পণ প্রশস্ত কাল',
              labelEn: 'Tarpan Ritual Window',
              timeBn: 'সকাল ০৫:৫৮ - ০৯:৪৫',
              timeEn: '05:58 AM - 09:45 AM',
            },
            {
              labelBn: 'দেবীপক্ষ শুভারম্ভ',
              labelEn: 'Devi Paksha Begins',
              timeBn: 'প্রতিপদ তিথি',
              timeEn: 'Pratipada Tithi',
            },
          ],
        },
        slogans: [
          {
            id: 'mahalaya-radio',
            titleBn: 'আকাশবাণীর চিরন্তন সুর ও মহিষাসুরমর্দিনী',
            titleEn: 'Immortal Radiance of Birendra Krishna',
            quoteBn: '“আশ্বিনের শারদপ্রাতে বেজে উঠেছে আলোক মঞ্জীর…”',
            quoteEn: '“In the autumn dawn, anklets of light resonate across Bengal…”',
          },
          {
            id: 'tarpan-ganga',
            titleBn: 'গঙ্গাতীরে পবিত্র পিতৃতর্পণ',
            titleEn: 'Sacred Pitru Tarpan on Holy Ganges',
            quoteBn: '“তর্পণ করে পিতৃঋণ মুক্তি, অন্তরে দেবীর আবাহন ভক্তি…”',
            quoteEn: '“Fulfilling ancestral debts to welcome the Divine Mother…”',
          },
          {
            id: 'chokkhudan-divine',
            titleBn: 'কুমার্টুলিতে দেবীর চক্ষুদান',
            titleEn: 'Sacred Awakening of Devi’s Eyes',
            quoteBn: '“আজ মহালয়ার পুণ্য লগ্নে দেবীর চোখে দৃষ্টিপাত…”',
            quoteEn: '“Sacred ritual of infusing living vision into Maa Durga…”',
          },
        ],
        ctas: [
          {
            id: 'mahalaya-audio',
            labelBn: 'মহালয়া শুনুন',
            labelEn: 'Listen to Mahalaya',
            href: '/songs',
            variant: 'primary',
            icon: 'music',
          },
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা দেখুন',
            labelEn: 'View Calendar',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
          {
            id: 'pandal',
            labelBn: 'প্যান্ডেল গ্যালারি',
            labelEn: 'Explore Pandals',
            href: '/gallery',
            variant: 'secondary',
            icon: 'compass',
          },
        ],
      };
    }

    case 'post-mahalaya': {
      return {
        stateId: 'post-mahalaya',
        year,
        greetingBadgeBn: 'দেবীপক্ষ সমাগত • শারদোৎসবের শুভ অপেক্ষা',
        greetingBadgeEn: 'Devi Paksha Arrival • Sacred Countdown to Shashthi',
        headlineBn: 'মা আসছেন…',
        headlineEn: 'Maa Is Arriving…',
        subtitleBn: 'আর মাত্র কয়েকদিন… আকাশে বাতাসে পুজো পুজো গন্ধ',
        subtitleEn: 'A Few Days Remain — Autumn Air Filled with Festive Euphoria',
        emotionalKeywordBn: 'প্রত্যাশা',
        emotionalKeywordEn: 'Anticipation',
        visualIntensity: 'medium',
        timeOfDayGreetingBn: 'শিউলিঝরা ভোরে ঢাকের সুরের মৃদু আগমন',
        timeOfDayGreetingEn: 'Distant rhythms of dhak echoing in the crisp morning',
        statusCard: {
          mode: 'countdown',
          cardBadgeBn: 'মহাষষ্ঠীর ক্ষণগণনা',
          cardBadgeEn: 'Countdown to Shashthi',
          titleBn: 'ষষ্ঠীর অপেক্ষা',
          titleEn: 'Awaiting Maha Shashthi',
          subtitleBn: 'মায়ের বোধন ও কল্পারম্ভের পুণ্য ক্ষণগণনা',
          subtitleEn: 'Countdown to Divine Bodhon & Kalparambha',
          targetDate: new Date(calendar.shashthiStart),
          countdownLabelBn: 'মহাষষ্ঠীর আগমনী ক্ষণগণনা',
          countdownLabelEn: 'Countdown to Maha Shashthi',
          targetEventBn: 'মহাষষ্ঠী কল্পারম্ভ ও বোধন',
          targetEventEn: 'Maha Shashthi Bodhon',
        },
        slogans: [
          {
            id: 'kumartuli-preparation',
            titleBn: 'কুমারটুলি থেকে মণ্ডপের পথে প্রতিমা',
            titleEn: 'Idols Journeying to Grand Pandals',
            quoteBn: '“প্যান্ডেলে প্যান্ডেলে বাঁশের কাঠামোয় প্রাণের স্পন্দন…”',
            quoteEn: '“Grand pandal architecture awakens to life…”',
          },
          {
            id: 'dhak-tune',
            titleBn: 'ঢাকের বোল ও কাঁসির বাদ্য',
            titleEn: 'Echoes of Traditional Dhak & Kanshi',
            quoteBn: '“ঢাকের কাঠি পড়লো বলে, চলো এবার মণ্ডপতলে…”',
            quoteEn: '“The beating of dhak signals it is time to gather…”',
          },
          {
            id: 'alpona-art',
            titleBn: 'উঠোনে উঠোনে শুভ আলপনা',
            titleEn: 'Sacred Alpona Floor Art',
            quoteBn: '“চালগুঁড়ির আলপনায় সেজে উঠছে বাংলার রাজপথ ও গৃহকোণ…”',
            quoteEn: '“Intricate rice-paste motifs adorn homes and streets…”',
          },
        ],
        ctas: [
          {
            id: 'pandal',
            labelBn: 'প্যান্ডেল দেখুন',
            labelEn: 'Discover Pandals',
            href: '/gallery',
            variant: 'primary',
            icon: 'compass',
          },
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা দেখুন',
            labelEn: 'View Calendar',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
          {
            id: 'songs',
            labelBn: 'শারদ সুর ও ভক্তিগীতি',
            labelEn: 'Puja Melodies & Songs',
            href: '/songs',
            variant: 'secondary',
            icon: 'music',
          },
        ],
      };
    }

    case 'panchami': {
      return {
        stateId: 'panchami',
        year,
        greetingBadgeBn: 'আজ মহাপঞ্চমী • প্রাক-পূজা সান্ধ্য আলোকসজ্জা',
        greetingBadgeEn: 'Maha Panchami • Festive Eve Illuminations',
        headlineBn: 'মা আসছেন, আর মাত্র এক প্রহর…',
        headlineEn: 'The Mother Arrives Tomorrow…',
        subtitleBn: 'আর অপেক্ষা নয়, আলোকমালায় সেজে উঠেছে বাংলার প্রতিটি প্রান্তর',
        subtitleEn: 'The Wait Ends — Illuminations Light Up Every Corner of Bengal',
        emotionalKeywordBn: 'উন্মাদনা',
        emotionalKeywordEn: 'Eve of Arrival',
        visualIntensity: 'medium',
        timeOfDayGreetingBn: 'সন্ধ্যা নামতেই মণ্ডপে মণ্ডপে আলোর রোশনাই',
        timeOfDayGreetingEn: 'Dusk falls as glowing illumination illuminates every street',
        statusCard: {
          mode: 'countdown',
          cardBadgeBn: 'আগামীকাল মহাষষ্ঠী',
          cardBadgeEn: 'Maha Shashthi Tomorrow',
          titleBn: 'বোধন ও অধিবাস প্রস্তুতি',
          titleEn: 'Bodhon & Adhibas Eve',
          subtitleBn: 'মায়ের আগমন বার্তা ও প্যান্ডেল উদ্বোধনের রাত',
          subtitleEn: 'Pandal Inaugurations & Festive Eve Celebrations',
          targetDate: new Date(calendar.shashthiStart),
          countdownLabelBn: 'মহাষষ্ঠীর আর মাত্র বাকি',
          countdownLabelEn: 'Hours Remaining for Shashthi',
          targetEventBn: 'মহাষষ্ঠী বোধন লগ্ন',
          targetEventEn: 'Maha Shashthi Bodhon Dawn',
        },
        slogans: [
          {
            id: 'panchami-light',
            titleBn: 'আলোর মালায় সাজানো চন্দননগরের কারুকাজ',
            titleEn: 'Chandannagar Light Artistry',
            quoteBn: '“আলোয় আলোয় ভেসে যাওয়া শহর, উৎসবের আনন্দে মাতোয়ারা…”',
            quoteEn: '“Cities glowing in radiant light, pure festive joy…”',
          },
          {
            id: 'eve-darshan',
            titleBn: 'সান্ধ্য প্যান্ডেল পরিক্রমা ও জনজোয়ার',
            titleEn: 'Panchami Evening Darshan',
            quoteBn: '“নতুন পোশাকে খুশির মেলা, শুরু হলো উৎসব বেলা…”',
            quoteEn: '“Festive garments, smiling faces, the carnival unfolds…”',
          },
        ],
        ctas: [
          {
            id: 'pandal',
            labelBn: 'প্যান্ডেল দেখুন',
            labelEn: 'Discover Pandals',
            href: '/gallery',
            variant: 'primary',
            icon: 'compass',
          },
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা দেখুন',
            labelEn: 'View Calendar',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
          {
            id: 'anjali',
            labelBn: 'অঞ্জলি প্রস্তুতি',
            labelEn: 'Pushpanjali Guide',
            href: '/anjali',
            variant: 'secondary',
            icon: 'flame',
          },
        ],
      };
    }

    case 'shashthi': {
      return {
        stateId: 'shashthi',
        year,
        greetingBadgeBn: 'আজ মহাষষ্ঠী • দেবীর বোধন ও শুভ কল্পারম্ভ',
        greetingBadgeEn: 'Maha Shashthi • Sacred Bodhon & Invocation',
        headlineBn: 'মা এসেছেন…',
        headlineEn: 'Maa Has Arrived…',
        subtitleBn: 'আজ শুরু মায়ের আরাধনা। মর্ত্যলোকে দেবীর বোধন ও শুভ অধিবাস।',
        subtitleEn: 'The Sacred Sharodotsav Begins. Bodhon & Invocation to the Mother.',
        emotionalKeywordBn: 'আবির্ভাব',
        emotionalKeywordEn: 'Arrival',
        visualIntensity: 'medium',
        timeOfDayGreetingBn: 'বিল্ববৃক্ষমূলে দেবীর প্রাণময় জাগরণ লগ্ন',
        timeOfDayGreetingEn: 'Sacred Bodhon ritual beneath the Bilva tree',
        statusCard: {
          mode: 'status-info',
          cardBadgeBn: 'আজকের প্রধান পূজা',
          cardBadgeEn: "Today's Sacred Ritual",
          titleBn: 'আজ মহাষষ্ঠী',
          titleEn: 'Maha Shashthi',
          subtitleBn: 'কল্পারম্ভ, বোধন, আমন্ত্রণ ও শুভ অধিবাস',
          subtitleEn: 'Kalparambha, Bodhon, Amantran & Adhibas',
          highlights: [
            {
              labelBn: 'কল্পারম্ভ ও সংকল্প লগ্ন',
              labelEn: 'Kalparambha Window',
              timeBn: 'সকাল ০৬:১৫ - ০৮:৩০',
              timeEn: '06:15 AM - 08:30 AM',
            },
            {
              labelBn: 'সায়ংকালে বোধন ও আমন্ত্রণ',
              labelEn: 'Evening Bodhon & Adhibas',
              timeBn: 'সন্ধ্যা ০৫:৪৫ - ০৭:২০',
              timeEn: '05:45 PM - 07:20 PM',
            },
            {
              labelBn: 'শুভ অমৃতযোগ',
              labelEn: 'Auspicious Amrita Yoga',
              timeBn: 'সকাল ০৯:১৫ হতে',
              timeEn: 'From 09:15 AM',
            },
          ],
        },
        slogans: [
          {
            id: 'bodhon-bilva',
            titleBn: 'বিল্ববৃক্ষে দেবীর জাগ্রত বোধন',
            titleEn: 'Awakening under the Sacred Bilva Tree',
            quoteBn: '“শ্রীরামচন্দ্রের অকালবোধন, আজ মর্ত্যে মা দুর্গার আগমন…”',
            quoteEn: '“Akalbodhon by Lord Rama, welcoming Maa Durga to Earth…”',
          },
          {
            id: 'evening-bodhon-aarti',
            titleBn: 'সন্ধ্যা আরতি ও পঞ্চপ্রদীপের আলো',
            titleEn: 'Evening Aarti & Camphor Flame',
            quoteBn: '“শঙ্খ আর কাঁসির রোলে শুরু হলো ষষ্ঠীর বন্দনা…”',
            quoteEn: '“Conch shells and bells ring in the glory of Maha Shashthi…”',
          },
        ],
        ctas: [
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা দেখুন',
            labelEn: 'View Calendar',
            href: '/calendar',
            variant: 'primary',
            icon: 'calendar',
          },
          {
            id: 'pandal',
            labelBn: 'প্যান্ডেল দেখুন',
            labelEn: 'Discover Pandals',
            href: '/gallery',
            variant: 'secondary',
            icon: 'compass',
          },
          {
            id: 'anjali',
            labelBn: 'অঞ্জলি দিন',
            labelEn: 'Pushpanjali Guide',
            href: '/anjali',
            variant: 'secondary',
            icon: 'flame',
          },
        ],
      };
    }

    case 'saptami': {
      return {
        stateId: 'saptami',
        year,
        greetingBadgeBn: 'আজ মহাসপ্তমী • নবপত্রিকা প্রবেশ ও প্রাণপ্রতিষ্ঠা',
        greetingBadgeEn: 'Maha Saptami • Nabapatrika Entry & Consecration',
        headlineBn: 'শুভ মহাসপ্তমী',
        headlineEn: 'Subho Maha Saptami',
        subtitleBn: 'উৎসবের ছন্দে, ভক্তিময় আরাধনায় কাটুক নবপত্রিকা প্রবেশের পুণ্য দিন',
        subtitleEn: 'Celebration & Devotion on the Auspicious Day of Nabapatrika Snan',
        emotionalKeywordBn: 'উৎসব',
        emotionalKeywordEn: 'Celebration',
        visualIntensity: 'high',
        timeOfDayGreetingBn: 'ভোরে গঙ্গার ঘাটে নবপত্রিকা স্নানের মঙ্গল ধ্বনি',
        timeOfDayGreetingEn: 'Sacred dawn bathing of Nabapatrika on holy ghats',
        statusCard: {
          mode: 'status-info',
          cardBadgeBn: 'আজকের প্রধান পূজা',
          cardBadgeEn: "Today's Main Ritual",
          titleBn: 'আজ মহাসপ্তমী',
          titleEn: 'Maha Saptami',
          subtitleBn: 'নবপত্রিকা প্রবেশ, মহাসপ্তমীর বিহিত পূজা ও পুষ্পাঞ্জলি',
          subtitleEn: 'Nabapatrika Entry, Saptami Vihita Puja & Pushpanjali',
          highlights: [
            {
              labelBn: 'নবপত্রিকা স্নান ও প্রবেশ',
              labelEn: 'Nabapatrika Bath & Entry',
              timeBn: 'সকাল ০৬:০০ - ০৮:১৫',
              timeEn: '06:00 AM - 08:15 AM',
            },
            {
              labelBn: 'সপ্তমী পুষ্পাঞ্জলি লগ্ন',
              labelEn: 'Pushpanjali Timings',
              timeBn: 'সকাল ০৯:৩০ - ১০:৪৫',
              timeEn: '09:30 AM - 10:45 AM',
            },
            {
              labelBn: 'সন্ধ্যা আরতি ও ভোগরাগ',
              labelEn: 'Evening Aarti & Bhog',
              timeBn: 'সন্ধ্যা ০৬:১৫ হতে',
              timeEn: 'From 06:15 PM',
            },
          ],
        },
        slogans: [
          {
            id: 'nabapatrika-lore',
            titleBn: 'নবপত্রিকার নয়টি পবিত্র উদ্ভিদ ও দেবীর রূপ',
            titleEn: 'Nine Sacred Plants of Nabapatrika',
            quoteBn: '“কদলী, কচু, হরিদ্রা, জয়ন্তী, বিল্ব—প্রকৃতির মাঝে মায়ের উপস্থিতি…”',
            quoteEn: '“Nine sacred flora embodying the divine energy of Mother Earth…”',
          },
          {
            id: 'kola-bou',
            titleBn: 'কলাবউ স্নান ও সিঁদুর বরণ',
            titleEn: 'Kola Bou Rituals & Vermilion Consecration',
            quoteBn: '“গঙ্গাস্নান সেরে নববধূর সাজে মা আসেন মণ্ডপে…”',
            quoteEn: '“Draped in red-bordered saree, the Mother arrives at the sanctum…”',
          },
        ],
        ctas: [
          {
            id: 'pandal',
            labelBn: 'প্যান্ডেল দেখুন',
            labelEn: 'Discover Pandals',
            href: '/gallery',
            variant: 'primary',
            icon: 'compass',
          },
          {
            id: 'anjali',
            labelBn: 'পুষ্পাঞ্জলি দিন',
            labelEn: 'Offer Pushpanjali',
            href: '/anjali',
            variant: 'secondary',
            icon: 'flame',
          },
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা দেখুন',
            labelEn: 'View Calendar',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
        ],
      };
    }

    case 'ashtami': {
      return {
        stateId: 'ashtami',
        year,
        greetingBadgeBn: 'আজ মহাষ্টমী • কুমারী পূজা ও মহা সন্ধিপূজা লগ্ন',
        greetingBadgeEn: 'Maha Ashtami • Kumari Puja & Sandhi Puja Window',
        headlineBn: 'শুভ মহাষ্টমী',
        headlineEn: 'Subho Maha Ashtami',
        subtitleBn: 'অঞ্জলির ফুল আর সন্ধিপূজার ১০৮ প্রদীপের শিখায় উদ্ভাসিত হোক অন্তর',
        subtitleEn: 'May the Pushpanjali Blooms & 108 Sandhi Lamps Illuminate Every Heart',
        emotionalKeywordBn: 'ভক্তি ও পরাকাষ্ঠা',
        emotionalKeywordEn: 'Peak Devotion',
        visualIntensity: 'high',
        timeOfDayGreetingBn: 'অষ্টমীর পুষ্পাঞ্জলি ও সান্ধ্য সন্ধিপূজার দিব্য জ্যোতি',
        timeOfDayGreetingEn: 'Pushpanjali devotion and the radiant 108 lamps of Sandhi Puja',
        statusCard: {
          mode: 'status-info',
          cardBadgeBn: 'আজকের পুণ্য লগ্ন',
          cardBadgeEn: "Today's Sacred Window",
          titleBn: 'আজ মহাষ্টমী ও সন্ধিপূজা',
          titleEn: 'Maha Ashtami & Sandhi Puja',
          subtitleBn: 'মহাষ্টমী অঞ্জলি, কুমারী পূজা ও ১০৮ পদ্মে সন্ধিপূজা',
          subtitleEn: 'Maha Ashtami Pushpanjali, Kumari Puja & Sandhi Puja',
          highlights: [
            {
              labelBn: 'মহাষ্টমী পুষ্পাঞ্জলি',
              labelEn: 'Pushpanjali Window',
              timeBn: 'সকাল ০৯:৪৫ - ১১:৩০',
              timeEn: '09:45 AM - 11:30 AM',
            },
            {
              labelBn: 'সন্ধিপূজা (১০৮ পদ্ম ও প্রদীপ)',
              labelEn: 'Sandhi Puja (108 Lamps)',
              timeBn: 'সন্ধ্যা ০৫:২৪ - ০৬:১২',
              timeEn: '05:24 PM - 06:12 PM',
            },
            {
              labelBn: 'কুমারী পূজা লগ্ন',
              labelEn: 'Kumari Puja Window',
              timeBn: 'বেলা ১১:০০ হতে',
              timeEn: 'From 11:00 AM',
            },
          ],
        },
        slogans: [
          {
            id: 'sandhi-108-lore',
            titleBn: 'সন্ধিপূজার ১০৮ মাটির প্রদীপ ও রক্তপদ্ম',
            titleEn: '108 Sacred Sandhi Lamps & Red Lotuses',
            quoteBn: '“অষ্টমী-নবমীর মিলনক্ষণে মা চামুণ্ডার দিব্য সংহার রূপ…”',
            quoteEn: '“At the juncture of Ashtami and Navami, Goddess Chamunda awakens…”',
          },
          {
            id: 'anjali-bhakti',
            titleBn: 'হাতে বেলপাতা ও জবাফুলে অঞ্জলি',
            titleEn: 'Sacred Pushpanjali with Hibiscus & Bel Leaves',
            quoteBn: '“সর্বমঙ্গল মঙ্গল্যে শিবে সর্বার্থ সাধিকে…”',
            quoteEn: '“Sarva Mangala Mangalye Shive Sarvartha Sadhike…”',
          },
          {
            id: 'kumari-puja',
            titleBn: 'জীবন্ত কুমারীতে দেবী দুর্গার আবাহন',
            titleEn: 'Kumari Puja — Worship of Divine Innocence',
            quoteBn: '“নারীর চিন্ময়ী রূপে পরমব্রহ্মের বন্দনা…”',
            quoteEn: '“Worshipping the supreme divine mother in young girls…”',
          },
        ],
        ctas: [
          {
            id: 'anjali',
            labelBn: 'অষ্টমীর পুষ্পাঞ্জলি',
            labelEn: 'Offer Pushpanjali',
            href: '/anjali',
            variant: 'primary',
            icon: 'flame',
          },
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা দেখুন',
            labelEn: 'View Calendar',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
          {
            id: 'pandal',
            labelBn: 'প্যান্ডেল দেখুন',
            labelEn: 'Discover Pandals',
            href: '/gallery',
            variant: 'secondary',
            icon: 'compass',
          },
        ],
      };
    }

    case 'navami': {
      return {
        stateId: 'navami',
        year,
        greetingBadgeBn: 'আজ মহানবমী • নবমী বিহিত পূজা ও মহা আরতি',
        greetingBadgeEn: 'Maha Navami • Sacred Homam & Grand Dhunuchi Aarti',
        headlineBn: 'শুভ মহানবমী',
        headlineEn: 'Subho Maha Navami',
        subtitleBn: 'ঢাকের তাল আর উদ্দাম ধুনুচি নাচে উৎসবের শেষ প্রহরগুলি হোক চিরস্মরণীয়',
        subtitleEn: 'Vibrant Dhunuchi Rhythms & Sacred Homam in the Final Splendor',
        emotionalKeywordBn: 'উচ্ছ্বাস ও আরতি',
        emotionalKeywordEn: 'Ecstatic Aarti',
        visualIntensity: 'high',
        timeOfDayGreetingBn: 'ধুনোর গন্ধ আর কাঁসর-ঘণ্টায় নবমী সন্ধ্যার মহা আরতি',
        timeOfDayGreetingEn: 'Fragrance of frankincense and thunderous dhak at Navami Aarti',
        statusCard: {
          mode: 'status-info',
          cardBadgeBn: 'আজকের পুণ্য লগ্ন',
          cardBadgeEn: "Today's Sacred Window",
          titleBn: 'আজ মহানবমী',
          titleEn: 'Maha Navami',
          subtitleBn: 'নবমী হোমযজ্ঞ, কুমারী ভোজন ও সন্ধ্যার উদ্দাম ধুনুচি নাচ',
          subtitleEn: 'Navami Sacred Homam & Grand Evening Dhunuchi Dance',
          highlights: [
            {
              labelBn: 'মহানবমী বিহিত পূজা',
              labelEn: 'Navami Vihita Puja',
              timeBn: 'সকাল ০৯:০০ - ১১:১৫',
              timeEn: '09:00 AM - 11:15 AM',
            },
            {
              labelBn: 'নবমী মহাযজ্ঞ ও হোম',
              labelEn: 'Navami Maha Homam',
              timeBn: 'বেলা ১১:৪৫ - ০১:৩০',
              timeEn: '11:45 AM - 01:30 PM',
            },
            {
              labelBn: 'সান্ধ্য ধুনুচি আরতি',
              labelEn: 'Evening Dhunuchi Aarti',
              timeBn: 'সন্ধ্যা ০৬:৩০ হতে',
              timeEn: 'From 06:30 PM',
            },
          ],
        },
        slogans: [
          {
            id: 'dhunuchi-dance',
            titleBn: 'কাঁসর-ঘণ্টা আর উদ্দাম ধুনুচি নাচ',
            titleEn: 'Euphoric Dhunuchi Dance & Thunder of Drums',
            quoteBn: '“ধুনোর ধোঁয়া আর ঢাকের কাঠি, আনন্দে মাতোয়ারা রাত…”',
            quoteEn: '“Aromatic smoke of camphor and ecstatic dance before Maa…”',
          },
          {
            id: 'navami-homam',
            titleBn: 'শান্তি ও সমৃদ্ধির নবমী মহাযজ্ঞ',
            titleEn: 'Sacred Navami Fire Ceremony',
            quoteBn: '“ঘৃতাহুতির পুণ্য শিখায় বিশ্বজগতের কল্যাণ প্রার্থনা…”',
            quoteEn: '“Sacred oblations for universal peace, prosperity, and harmony…”',
          },
          {
            id: 'last-night',
            titleBn: 'উৎসবের বিদায়লগ্নের আগের রাত',
            titleEn: 'The Eve of Farewell',
            quoteBn: '“নবমীর নিশি যেন আর না পোহায়…”',
            quoteEn: '“May this glorious Navami night never fade away…”',
          },
        ],
        ctas: [
          {
            id: 'pandal',
            labelBn: 'প্যান্ডেল দেখুন',
            labelEn: 'Discover Pandals',
            href: '/gallery',
            variant: 'primary',
            icon: 'compass',
          },
          {
            id: 'calendar',
            labelBn: 'নবমীর পঞ্জিকা',
            labelEn: 'Navami Calendar',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
          {
            id: 'anjali',
            labelBn: 'অঞ্জলি দিন',
            labelEn: 'Offer Pushpanjali',
            href: '/anjali',
            variant: 'secondary',
            icon: 'flame',
          },
        ],
      };
    }

    case 'dashami': {
      return {
        stateId: 'dashami',
        year,
        greetingBadgeBn: 'আজ বিজয়া দশমী • সিঁদুরখেলা ও শান্তিজলের আশীর্বাদ',
        greetingBadgeEn: 'Vijaya Dashami • Sindoor Khela & Sacred Immersion',
        headlineBn: 'বিদায় মা…',
        headlineEn: 'Farewell, Mother…',
        subtitleBn: 'আবার এসো মা। উৎসব শেষ হলেও হৃদয়ে থেকে যায় ফিরে আসার চিরন্তন প্রতিশ্রুতি।',
        subtitleEn: 'Return Again, Mother. The Festival Ends, Leaving the Eternal Promise of Her Return.',
        emotionalKeywordBn: 'বিদায় ও বিজয়া',
        emotionalKeywordEn: 'Farewell & Bijoya',
        visualIntensity: 'reflective',
        timeOfDayGreetingBn: 'দেবী বরণ শেষে মিষ্টিমুখ আর গুরুজনদের প্রণাম',
        timeOfDayGreetingEn: 'Devi Baran, sweets, and blessings of Bijoya',
        statusCard: {
          mode: 'status-info',
          cardBadgeBn: 'আজকের পুণ্য লগ্ন',
          cardBadgeEn: "Today's Sacred Ritual",
          titleBn: 'আজ বিজয়া দশমী',
          titleEn: 'Vijaya Dashami',
          subtitleBn: 'দর্পণ বিসর্জন, অপরাজিতা পূজা, সিঁদুরখেলা ও শান্তিজল',
          subtitleEn: 'Darpan Visarjan, Aparajita Puja, Sindoor Khela & Shantijal',
          highlights: [
            {
              labelBn: 'দর্পণ বিসর্জন ও অপরাজিতা পূজা',
              labelEn: 'Darpan Visarjan & Aparajita',
              timeBn: 'সকাল ০৮:৩০ - ১০:০০',
              timeEn: '08:30 AM - 10:00 AM',
            },
            {
              labelBn: 'দেবী বরণ ও সিঁদুরখেলা',
              labelEn: 'Devi Baran & Sindoor Khela',
              timeBn: 'বেলা ১০:৩০ - ০১:০০',
              timeEn: '10:30 AM - 01:00 PM',
            },
            {
              labelBn: 'শুভ নিরঞ্জন ও শান্তিজল',
              labelEn: 'Sacred Immersion & Shantijal',
              timeBn: 'অপরাহ্ন ০৩:০০ হতে',
              timeEn: 'From 03:00 PM',
            },
          ],
        },
        slogans: [
          {
            id: 'sindoor-khela',
            titleBn: 'সিঁদুরখেলা ও শুভ বিজয়ার শুভেচ্ছা',
            titleEn: 'Sindoor Khela & Subho Bijoya Blessings',
            quoteBn: '“আসছে বছর আবার হবে, মা থাকবেন অন্তরে…”',
            quoteEn: '“Until next autumn, the Divine Mother lives forever in our hearts…”',
          },
          {
            id: 'visarjan-tears',
            titleBn: 'গঙ্গার ঘাটে মায়ের বিদায় ও শান্তিজল',
            titleEn: 'Sacred Immersion on the Holy Ganges',
            quoteBn: '“বলো দুর্গা মাই কি জয়! শান্তির বারিধারায় সিক্ত হোক ধরণী…”',
            quoteEn: '“Glory to Mother Durga! May her sacred waters bring universal peace…”',
          },
          {
            id: 'bijoya-sweets',
            titleBn: 'নারকেল নাড়ু, মিষ্টিমুখ ও কোলাকুলি',
            titleEn: 'Traditional Sweets & Warm Bijoya Embraces',
            quoteBn: '“ছোটদের স্নেহাশিস, বড়দের প্রণাম আর সমবয়সীদের প্রীতি…”',
            quoteEn: '“Blessings to the young, reverence to elders, love to all…”',
          },
        ],
        ctas: [
          {
            id: 'bijoya',
            labelBn: 'বিজয়ার শুভেচ্ছা পাঠান',
            labelEn: 'Send Bijoya Greetings',
            href: '/bijoya',
            variant: 'primary',
            icon: 'send',
          },
          {
            id: 'culture',
            labelBn: 'আগমনী স্মৃতি দেখুন',
            labelEn: 'Heritage & Memories',
            href: '/culture',
            variant: 'secondary',
            icon: 'book',
          },
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা দেখুন',
            labelEn: 'View Calendar',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
        ],
      };
    }

    case 'post-dashami':
    default: {
      return {
        stateId: 'post-dashami',
        year,
        greetingBadgeBn: 'শুভ বিজয়া • শারদ স্মৃতির স্নিগ্ধ আবহ',
        greetingBadgeEn: 'Subho Bijoya • Sweet Memories & Awaiting Next Autumn',
        headlineBn: 'আবার এসো মা…',
        headlineEn: 'Until Next Autumn…',
        subtitleBn: 'মায়ের বিদায়ের পরও অন্তরে থেকে যায় শারদ স্মৃতির স্নিগ্ধ আলোকশিখা।',
        subtitleEn: 'Autumn Fades into Nostalgia as the Heart Yearns for the Next Sharodotsav.',
        emotionalKeywordBn: 'স্মৃতি ও পুনর্জাগরণ',
        emotionalKeywordEn: 'Nostalgia & Return',
        visualIntensity: 'reflective',
        timeOfDayGreetingBn: 'আসছে বছর আবার মা আসবেন আমাদের ঘরে',
        timeOfDayGreetingEn: 'Until next year when the Divine Mother returns again',
        statusCard: {
          mode: 'countdown',
          cardBadgeBn: 'পরের মহালয়ার ক্ষণগণনা',
          cardBadgeEn: 'Countdown to Next Mahalaya',
          titleBn: 'পরের মহালয়ার অপেক্ষা',
          titleEn: 'Awaiting Next Sharodotsav',
          subtitleBn: 'আসছে বছরের মহালয়ার আগমনী ক্ষণগণনা',
          subtitleEn: 'Countdown to Next Year’s Sacred Mahalaya',
          targetDate: new Date(calendar.nextMahalayaStart),
          countdownLabelBn: 'পরের মহালয়ার ক্ষণগণনা',
          countdownLabelEn: 'Countdown to Next Mahalaya',
          targetEventBn: 'আগামী বছরের মহালয়ার পুণ্য প্রভাত',
          targetEventEn: 'Next Year’s Auspicious Mahalaya Dawn',
        },
        slogans: [
          {
            id: 'asche-bochor',
            titleBn: 'আসছে বছর আবার হবে',
            titleEn: 'The Eternal Annual Promise',
            quoteBn: '“বিদায় দিয়েছি মা’কে জলে, স্মৃতিটুকু রইলো হিয়ার তলে…”',
            quoteEn: '“Immersed in sacred waters, Maa stays alive in our souls…”',
          },
          {
            id: 'bijoya-bond',
            titleBn: 'সম্প্রীতি, আত্মীয়তা ও বিজয়ার বন্ধন',
            titleEn: 'Eternal Bond of Bijoya & Harmony',
            quoteBn: '“বাঙালির বারো মাসে তেরো পার্বণ, শারদ স্মৃতি চির অমলিন…”',
            quoteEn: '“Twelve months of celebration, but Durga Puja stays immortal…”',
          },
        ],
        ctas: [
          {
            id: 'bijoya',
            labelBn: 'বিজয়ার শুভেচ্ছা পাঠান',
            labelEn: 'Send Bijoya Greetings',
            href: '/bijoya',
            variant: 'primary',
            icon: 'send',
          },
          {
            id: 'calendar',
            labelBn: 'পঞ্জিকা আর্কাইভ',
            labelEn: 'Calendar Archives',
            href: '/calendar',
            variant: 'secondary',
            icon: 'calendar',
          },
          {
            id: 'songs',
            labelBn: 'শারদ সুর ও ভক্তিগীতি',
            labelEn: 'Puja Melodies & Songs',
            href: '/songs',
            variant: 'secondary',
            icon: 'music',
          },
        ],
      };
    }
  }
}

export function calculateRemainingTime(
  targetDate?: Date | string,
  fromDate?: Date | string
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  daysBn: string;
  hoursBn: string;
  minutesBn: string;
  secondsBn: string;
} {
  if (!targetDate) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      daysBn: '০০',
      hoursBn: '০০',
      minutesBn: '০০',
      secondsBn: '০০',
    };
  }

  const target = typeof targetDate === 'string' ? new Date(targetDate).getTime() : targetDate.getTime();
  const now = fromDate
    ? typeof fromDate === 'string'
      ? new Date(fromDate).getTime()
      : fromDate.getTime()
    : new Date().getTime();

  const diff = target - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      daysBn: '০০',
      hoursBn: '০০',
      minutesBn: '০০',
      secondsBn: '০০',
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
    daysBn: toBengaliNumeral(days.toString().padStart(2, '0')),
    hoursBn: toBengaliNumeral(hours.toString().padStart(2, '0')),
    minutesBn: toBengaliNumeral(minutes.toString().padStart(2, '0')),
    secondsBn: toBengaliNumeral(seconds.toString().padStart(2, '0')),
  };
}
