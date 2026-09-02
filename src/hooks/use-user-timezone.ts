'use client';

import { useState, useEffect } from 'react';

export interface UserLocationTimezone {
  timezone: string;
  zoneNameBn: string;
  zoneNameEn: string;
  cityBn: string;
  cityEn: string;
  utcOffsetString: string;
}

const DEFAULT_TIMEZONE = 'Asia/Kolkata';

// Curated dictionary for Bengali & English Timezone Display Names
const TIMEZONE_LABELS: Record<
  string,
  { bn: string; en: string; cityBn: string; cityEn: string }
> = {
  'Asia/Kolkata': {
    bn: 'কলকাতা সময় (IST)',
    en: 'Kolkata Time (IST)',
    cityBn: 'কলকাতা',
    cityEn: 'Kolkata',
  },
  'Asia/Calcutta': {
    bn: 'কলকাতা সময় (IST)',
    en: 'Kolkata Time (IST)',
    cityBn: 'কলকাতা',
    cityEn: 'Kolkata',
  },
  'Asia/Dhaka': {
    bn: 'ঢাকা সময় (BST)',
    en: 'Dhaka Time (BST)',
    cityBn: 'ঢাকা',
    cityEn: 'Dhaka',
  },
  'America/New_York': {
    bn: 'নিউ ইয়র্ক সময় (EDT)',
    en: 'New York (EDT)',
    cityBn: 'নিউ ইয়র্ক',
    cityEn: 'New York',
  },
  'America/Chicago': {
    bn: 'শিকাগো সময় (CDT)',
    en: 'Chicago (CDT)',
    cityBn: 'শিকাগো',
    cityEn: 'Chicago',
  },
  'America/Denver': {
    bn: 'ডেনভার সময় (MDT)',
    en: 'Denver (MDT)',
    cityBn: 'ডেনভার',
    cityEn: 'Denver',
  },
  'America/Los_Angeles': {
    bn: 'লস অ্যাঞ্জেলেস (PDT)',
    en: 'Los Angeles (PDT)',
    cityBn: 'লস অ্যাঞ্জেলেস',
    cityEn: 'Los Angeles',
  },
  'America/Toronto': {
    bn: 'টরন্টো সময় (EDT)',
    en: 'Toronto (EDT)',
    cityBn: 'টরন্টো',
    cityEn: 'Toronto',
  },
  'America/Vancouver': {
    bn: 'ভ্যাঙ্কুভার সময় (PDT)',
    en: 'Vancouver (PDT)',
    cityBn: 'ভ্যাঙ্কুভার',
    cityEn: 'Vancouver',
  },
  'Europe/London': {
    bn: 'লন্ডন সময় (BST)',
    en: 'London Time (BST)',
    cityBn: 'লন্ডন',
    cityEn: 'London',
  },
  'Europe/Paris': {
    bn: 'প্যারিস সময় (CEST)',
    en: 'Paris Time (CEST)',
    cityBn: 'প্যারিস',
    cityEn: 'Paris',
  },
  'Europe/Berlin': {
    bn: 'বার্লিন সময় (CEST)',
    en: 'Berlin Time (CEST)',
    cityBn: 'বার্লিন',
    cityEn: 'Berlin',
  },
  'Asia/Dubai': {
    bn: 'দুবাই সময় (GST)',
    en: 'Dubai Time (GST)',
    cityBn: 'দুবাই',
    cityEn: 'Dubai',
  },
  'Asia/Singapore': {
    bn: 'সিঙ্গাপুর সময় (SGT)',
    en: 'Singapore (SGT)',
    cityBn: 'সিঙ্গাপুর',
    cityEn: 'Singapore',
  },
  'Asia/Bangkok': {
    bn: 'ব্যাংকক সময় (ICT)',
    en: 'Bangkok (ICT)',
    cityBn: 'ব্যাংকক',
    cityEn: 'Bangkok',
  },
  'Asia/Tokyo': {
    bn: 'টোকিও সময় (JST)',
    en: 'Tokyo Time (JST)',
    cityBn: 'টোকিও',
    cityEn: 'Tokyo',
  },
  'Australia/Sydney': {
    bn: 'সিডনি সময় (AEST)',
    en: 'Sydney (AEST)',
    cityBn: 'সিডনি',
    cityEn: 'Sydney',
  },
  'Australia/Melbourne': {
    bn: 'মেলবোর্ন সময় (AEST)',
    en: 'Melbourne (AEST)',
    cityBn: 'মেলবোর্ন',
    cityEn: 'Melbourne',
  },
};

export function resolveTimezoneInfo(ianaTz?: string): {
  timezone: string;
  zoneNameBn: string;
  zoneNameEn: string;
  cityBn: string;
  cityEn: string;
  utcOffsetString: string;
} {
  const tz = ianaTz || DEFAULT_TIMEZONE;

  // Check dictionary
  if (TIMEZONE_LABELS[tz]) {
    const info = TIMEZONE_LABELS[tz];
    const offsetMin = -new Date().getTimezoneOffset();
    const sign = offsetMin >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offsetMin) / 60);
    const mins = Math.abs(offsetMin) % 60;
    const utcOffsetString = `UTC${sign}${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

    return {
      timezone: tz,
      zoneNameBn: info.bn,
      zoneNameEn: info.en,
      cityBn: info.cityBn,
      cityEn: info.cityEn,
      utcOffsetString,
    };
  }

  // Fallback: parse city from IANA timezone string (e.g. 'Europe/Amsterdam' -> 'Amsterdam')
  try {
    const parts = tz.split('/');
    const cityRaw = parts[parts.length - 1].replace(/_/g, ' ');

    // Get formatted timezone abbreviation if possible
    const date = new Date();
    const shortTzName =
      new Intl.DateTimeFormat('en-US', {
        timeZone: tz,
        timeZoneName: 'short',
      })
        .formatToParts(date)
        .find((part) => part.type === 'timeZoneName')?.value || 'Local';

    const offsetMin = -new Date().getTimezoneOffset();
    const sign = offsetMin >= 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offsetMin) / 60);
    const mins = Math.abs(offsetMin) % 60;
    const utcOffsetString = `UTC${sign}${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;

    return {
      timezone: tz,
      zoneNameBn: `${cityRaw} সময় (${shortTzName})`,
      zoneNameEn: `${cityRaw} (${shortTzName})`,
      cityBn: cityRaw,
      cityEn: cityRaw,
      utcOffsetString,
    };
  } catch {
    return {
      timezone: DEFAULT_TIMEZONE,
      zoneNameBn: 'কলকাতা সময় (IST)',
      zoneNameEn: 'Kolkata Time (IST)',
      cityBn: 'কলকাতা',
      cityEn: 'Kolkata',
      utcOffsetString: 'UTC+05:30',
    };
  }
}

export function useUserTimezone(): UserLocationTimezone {
  const [info, setInfo] = useState<{
    timezone: string;
    zoneNameBn: string;
    zoneNameEn: string;
    cityBn: string;
    cityEn: string;
    utcOffsetString: string;
  }>(() => resolveTimezoneInfo(DEFAULT_TIMEZONE));

  useEffect(() => {
    try {
      const browserTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (browserTz) {
        setInfo(resolveTimezoneInfo(browserTz));
      }
    } catch {
      setInfo(resolveTimezoneInfo(DEFAULT_TIMEZONE));
    }
  }, []);

  return info;
}

