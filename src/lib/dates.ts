import { toBengaliNumeral } from './formatters';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  eventTitleBn: string;
  eventTitleEn: string;
  eventLabelBn: string;
  eventLabelEn: string;
}

export interface PujaKeyMilestone {
  id: string;
  targetDate: Date;
  eventTitleBn: string;
  eventTitleEn: string;
  eventLabelBn: string;
  eventLabelEn: string;
}

export const PUJA_MILESTONES: PujaKeyMilestone[] = [
  {
    id: 'mahalaya',
    targetDate: new Date('2026-10-10T05:00:00+05:30'),
    eventTitleBn: 'মহালয়ার পুণ্য প্রভাত',
    eventTitleEn: 'Auspicious Mahalaya Dawn',
    eventLabelBn: 'মহালয়ার আগমনী ক্ষণগণনা',
    eventLabelEn: 'Countdown to Mahalaya',
  },
  {
    id: 'shashthi',
    targetDate: new Date('2026-10-16T06:00:00+05:30'),
    eventTitleBn: 'মহাষষ্ঠী কল্পারম্ভ ও বোধন',
    eventTitleEn: 'Maha Shashthi Bodhon',
    eventLabelBn: 'মহাষষ্ঠীর আগমনী ক্ষণগণনা',
    eventLabelEn: 'Countdown to Shashthi',
  },
  {
    id: 'saptami',
    targetDate: new Date('2026-10-17T06:00:00+05:30'),
    eventTitleBn: 'মহাসপ্তমী নবপত্রিকা প্রবেশ',
    eventTitleEn: 'Maha Saptami Nabapatrika',
    eventLabelBn: 'মহাসপ্তমীর শুভ ক্ষণগণনা',
    eventLabelEn: 'Countdown to Saptami',
  },
  {
    id: 'ashtami',
    targetDate: new Date('2026-10-18T06:00:00+05:30'),
    eventTitleBn: 'মহাষ্টমী পুষ্পাঞ্জলি ও কুমারী পূজা',
    eventTitleEn: 'Maha Ashtami Pushpanjali',
    eventLabelBn: 'মহাষ্টমীর পুণ্য ক্ষণগণনা',
    eventLabelEn: 'Countdown to Ashtami',
  },
  {
    id: 'sandhi',
    targetDate: new Date('2026-10-18T17:15:00+05:30'),
    eventTitleBn: 'সন্ধিপূজা (১০৮ পদ্ম ও প্রদীপ)',
    eventTitleEn: 'Sandhi Puja (108 Lotuses & Diyas)',
    eventLabelBn: 'সন্ধিপূজার শুভ ক্ষণ',
    eventLabelEn: 'Countdown to Sandhi Puja',
  },
  {
    id: 'navami',
    targetDate: new Date('2026-10-19T06:00:00+05:30'),
    eventTitleBn: 'মহানবমী ভোগ ও ধুনুচি আরতি',
    eventTitleEn: 'Maha Navami Dhunuchi Aarti',
    eventLabelBn: 'মহানবমীর ক্ষণগণনা',
    eventLabelEn: 'Countdown to Navami',
  },
  {
    id: 'dashami',
    targetDate: new Date('2026-10-20T08:00:00+05:30'),
    eventTitleBn: 'বিজয়া দশমী সিঁদুরখেলা ও বিসর্জন',
    eventTitleEn: 'Vijaya Dashami & Sindoor Khela',
    eventLabelBn: 'বিজয়া দশমীর ক্ষণগণনা',
    eventLabelEn: 'Countdown to Dashami',
  },
];

export function getCurrentPujaCountdown(): CountdownTime {
  const now = new Date().getTime();

  // Find the next upcoming milestone
  const nextMilestone = PUJA_MILESTONES.find((m) => m.targetDate.getTime() > now) || PUJA_MILESTONES[0];

  const diff = nextMilestone.targetDate.getTime() - now;

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
      eventTitleBn: nextMilestone.eventTitleBn,
      eventTitleEn: nextMilestone.eventTitleEn,
      eventLabelBn: nextMilestone.eventLabelBn,
      eventLabelEn: nextMilestone.eventLabelEn,
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
    eventTitleBn: nextMilestone.eventTitleBn,
    eventTitleEn: nextMilestone.eventTitleEn,
    eventLabelBn: nextMilestone.eventLabelBn,
    eventLabelEn: nextMilestone.eventLabelEn,
  };
}

export function formatCountdownBn(countdown: CountdownTime): {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
} {
  return {
    days: toBengaliNumeral(countdown.days.toString().padStart(2, '0')),
    hours: toBengaliNumeral(countdown.hours.toString().padStart(2, '0')),
    minutes: toBengaliNumeral(countdown.minutes.toString().padStart(2, '0')),
    seconds: toBengaliNumeral(countdown.seconds.toString().padStart(2, '0')),
  };
}
