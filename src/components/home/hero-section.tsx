'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/ui-store';
import { getCurrentPujaCountdown, formatCountdownBn, CountdownTime } from '@/lib/dates';
import { Music, ArrowRight, Flame, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sacred slogans and festive lore rotating automatically
const PUJA_SLOGANS = [
  {
    id: 'pratima-daak',
    titleBn: 'দেবী দুর্গার সাবেক ডাকের সাজ',
    titleEn: 'Traditional Daaker Saaj Pratima',
    quoteBn: '“যা দেবী সর্বভূতেষু শক্তিরূপেণ সংস্থিতা…”',
    quoteEn: '“Ya Devi Sarvabhuteshu Shakti-rupena Samsthita…”',
  },
  {
    id: 'kumartuli-chokkhu',
    titleBn: 'কুমারটুলির নিপুণ চক্ষুদান পর্ব',
    titleEn: 'Kumartuli Artisan Chokkhudaan',
    quoteBn: '“তুলির শেষ টানে মৃন্ময়ী মা হন চিন্ময়ী…”',
    quoteEn: '“Clay transforms into divine grace…”',
  },
  {
    id: 'sandhi-108',
    titleBn: 'সন্ধিপূজার ১০৮ প্রদীপ ও রক্তপদ্ম',
    titleEn: '108 Sacred Sandhi Lamps',
    quoteBn: '“চামুণ্ডা বন্দনায় ১০৮ মাটির প্রদীপের দিব্য জ্যোতি…”',
    quoteEn: '“Divine radiance of 108 sacred earthen lamps…”',
  },
  {
    id: 'evening-aarti',
    titleBn: 'সন্ধ্যা আরতি ও পঞ্চপ্রদীপ শিখা',
    titleEn: 'Evening Aarti & Camphor Flame',
    quoteBn: '“শঙ্খ-ঘণ্টার ধ্বনিতে দেবীর মহারতি বন্দনা…”',
    quoteEn: '“Reverent evening invocation to the Mother…”',
  },
  {
    id: 'sindoor-dashami',
    titleBn: 'বিজয়া দশমীর শুভ সম্ভাষণ',
    titleEn: 'Subho Bijoya Benediction',
    quoteBn: '“আসছে বছর আবার হবে…”',
    quoteEn: '“Until next autumn, the Mother stays within us…”',
  },
  {
    id: 'dhunuchi-kash',
    titleBn: 'কাশবন ও উদ্দাম ধুনুচি নাচ',
    titleEn: 'Dhunuchi Dance & Autumn Kash',
    quoteBn: '“ঢাকের বোলে আর ধুনোর গন্ধে বিজয়ের উন্মাদনা…”',
    quoteEn: '“Ecstatic euphoria to the thunder of Bengali Dhak…”',
  },
];

export const HeroSection: React.FC = () => {
  const language = useUIStore((state) => state.language);

  // ── Dynamic Countdown ──
  const [countdown, setCountdown] = useState<CountdownTime>({
    days: 41,
    hours: 14,
    minutes: 20,
    seconds: 0,
    isPast: false,
    eventTitleBn: 'মহালয়ার পুণ্য প্রভাত',
    eventTitleEn: 'Auspicious Mahalaya Dawn',
    eventLabelBn: 'মহালয়ার আগমনী ক্ষণগণনা',
    eventLabelEn: 'Countdown to Mahalaya',
  });

  useEffect(() => {
    setCountdown(getCurrentPujaCountdown());
    const timer = setInterval(() => setCountdown(getCurrentPujaCountdown()), 1000);
    return () => clearInterval(timer);
  }, []);

  const countdownBn = formatCountdownBn(countdown);

  // ── Slogan Auto-Changing Carousel ──
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % PUJA_SLOGANS.length);
    }, 4800);
    return () => clearInterval(interval);
  }, []);

  const slogan = PUJA_SLOGANS[currentIdx];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-transparent py-12 sm:py-16">
      {/* Floating Shiuli Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-petal text-xs select-none opacity-30"
            style={{
              left: `${8 + i * 16}%`,
              animationDelay: `${i * 2.2}s`,
              animationDuration: `${14 + i * 2.5}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* ================================================================== */}
      {/* MAIN CONTENT (Horizontally Center-Aligned)                          */}
      {/* ================================================================== */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full text-center flex flex-col items-center">

        {/* 1. Greeting Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF8]/15 backdrop-blur-md border border-[#E7C878]/30 text-[#FFF8EA] text-xs font-semibold tracking-wide shadow-xs mb-4"
        >
          <span className="text-sm">🪔</span>
          <span>
            {language === 'bn'
              ? 'শারদীয়া দুর্গোৎসবের আন্তরিক প্রীতি ও শুভেচ্ছা'
              : 'Warm Sharodiya Durga Puja Greetings & Blessings'}
          </span>
          <span className="text-[#E7C878] text-[10px]">❖</span>
        </motion.div>

        {/* 2. Headline & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2 mb-8"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-[5.5rem] font-black font-serif tracking-tight text-[#FFF8EA] leading-[0.95] drop-shadow-lg">
            {language === 'bn' ? 'মা আসছেন…' : 'Maa Is Arriving…'}
          </h1>
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase font-sans font-bold text-[#E7C878]/90">
            {language === 'bn'
              ? 'আগমনী — যেখানে জীবন্ত হয়ে ওঠেন মা দুর্গা'
              : 'AGOMONI — WHERE MAA COMES ALIVE'}
          </p>
        </motion.div>

        {/* 3. Equal-Sized Dual Cards: Countdown Time Box & Auto-Changing Slogan Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-4xl mx-auto items-stretch mb-6"
        >
          {/* Card A: Dynamic Countdown Time Box */}
          <div className="agomoni-card p-4 sm:p-5 w-full shadow-2xl flex flex-col justify-between text-left">
            <div className="flex items-center justify-between gap-2 mb-3 px-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#D95757] animate-pulse" />
                <span className="text-xs font-bold text-[#FFF8EA] font-serif">
                  {language === 'bn' ? countdown.eventLabelBn : countdown.eventLabelEn}
                </span>
              </div>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#1A1210]/60 border border-[#E7C878]/30 text-[#E7C878] font-bold">
                {language === 'bn' ? countdown.eventTitleBn : countdown.eventTitleEn}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
              {[
                { val: language === 'bn' ? countdownBn.days : countdown.days, label: language === 'bn' ? 'দিন' : 'Days' },
                { val: language === 'bn' ? countdownBn.hours : countdown.hours, label: language === 'bn' ? 'ঘণ্টা' : 'Hours' },
                { val: language === 'bn' ? countdownBn.minutes : countdown.minutes, label: language === 'bn' ? 'মিনিট' : 'Mins' },
                { val: language === 'bn' ? countdownBn.seconds : countdown.seconds, label: language === 'bn' ? 'সেকেন্ড' : 'Secs' },
              ].map((item, i) => (
                <div key={i} className="rounded-[20px] p-2.5 sm:p-3 text-center bg-[#FFFDF8]/10 backdrop-blur-md border border-[#FFFDF8]/15">
                  <div className="text-2xl sm:text-3xl font-extrabold font-serif text-[#FFF8EA] leading-none">
                    {item.val}
                  </div>
                  <div className="text-[10px] text-[#E7C878]/80 uppercase font-bold tracking-wider mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card B: Auto-Changing Slogan Box (Smooth Blur & Vertical Fade Transition) */}
          <div className="agomoni-card p-5 sm:p-6 w-full shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Subtle background radial glow */}
            <div className="absolute inset-0 bg-radial from-[#E7C878]/8 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col justify-center items-center min-h-[95px]">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1A1210]/60 border border-[#E7C878]/30 text-[10px] font-bold text-[#E7C878] mb-2.5 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#E7C878] animate-pulse" />
                <span>{language === 'bn' ? 'শারদ আগমনী মহিমা' : 'Festival Reflection'}</span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`slogan-${slogan.id}`}
                  initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(5px)' }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-1 w-full"
                >
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-[#FFF8EA] drop-shadow-sm">
                    {language === 'bn' ? slogan.titleBn : slogan.titleEn}
                  </h3>
                  <p className="text-sm sm:text-base font-serif text-[#E7C878] italic leading-relaxed drop-shadow-sm">
                    {language === 'bn' ? slogan.quoteBn : slogan.quoteEn}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* 4. Action Buttons (Horizontally Center-Aligned Below: 3 Full Capsule Buttons) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
        >
          {/* Button 1: Digital Anjali */}
          <Link
            href="/anjali"
            className="apple-btn-primary px-8 py-3.5 flex items-center gap-2 text-sm cursor-pointer shadow-lg active:scale-[0.97]"
          >
            <Flame className="w-4 h-4 text-[#E7C878]" />
            <span>{language === 'bn' ? 'অঞ্জলি দিন' : 'Offer Pushpanjali'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {/* Button 2: Calendar */}
          <Link
            href="/calendar"
            className="apple-btn-secondary px-7 py-3.5 flex items-center gap-2 text-sm cursor-pointer active:scale-[0.97]"
          >
            <span>{language === 'bn' ? 'পঞ্জিকা দেখুন' : 'View Calendar'}</span>
          </Link>

          {/* Button 3: Sharod Melodies & Bhakti Sangeet (Dedicated Puja Songs Hub) */}
          <Link
            href="/songs"
            className="apple-btn-secondary px-7 py-3.5 flex items-center gap-2 text-sm cursor-pointer active:scale-[0.97] shadow-xs text-[#FFF8EA]"
          >
            <Music className="w-4 h-4 text-[#E7C878]" />
            <span>{language === 'bn' ? 'শারদ সুর ও ভক্তিগীতি' : 'Puja Melodies & Songs'}</span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
