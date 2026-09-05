'use client';

import React, { useState, useEffect, useTransition } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/ui-store';
import { useUserTimezone } from '@/hooks/use-user-timezone';
import {
  getAgomoniFestivalState,
  calculateRemainingTime,
} from '@/lib/festival-engine';
import { FestivalStateId, FestivalStateData } from '@/types/festival';
import { FestivalPreviewBar } from '@/components/home/festival-preview-bar';
import {
  Flame,
  ArrowRight,
  Calendar as CalendarIcon,
  Music,
  Globe,
  Compass,
  Send,
  BookOpen,
  Sparkles,
  Clock,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const HeroSection: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const userTz = useUserTimezone();
  const [, startTransition] = useTransition();

  const [mounted, setMounted] = useState(false);

  // State Override for developer testing / query testing
  const [overrideStateId, setOverrideStateId] = useState<FestivalStateId | null>(null);

  // Read optional URL search param for quick preview on mount
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const stateParam = params.get('state') as FestivalStateId | null;
      if (
        stateParam &&
        [
          'pre-mahalaya',
          'mahalaya',
          'post-mahalaya',
          'panchami',
          'shashthi',
          'saptami',
          'ashtami',
          'navami',
          'dashami',
          'post-dashami',
        ].includes(stateParam)
      ) {
        setOverrideStateId(stateParam);
      }
    }
  }, []);

  // Compute festival state data
  const festivalState: FestivalStateData = getAgomoniFestivalState(
    undefined,
    overrideStateId || undefined
  );

  // ── Live Countdown State (Updates every second) ──
  const [countdownTime, setCountdownTime] = useState(() =>
    calculateRemainingTime(festivalState.statusCard.targetDate)
  );

  useEffect(() => {
    // Immediate calculation on state change
    setCountdownTime(calculateRemainingTime(festivalState.statusCard.targetDate));

    if (festivalState.statusCard.mode === 'countdown' && festivalState.statusCard.targetDate) {
      const timer = setInterval(() => {
        setCountdownTime(calculateRemainingTime(festivalState.statusCard.targetDate));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [festivalState.statusCard.mode, festivalState.statusCard.targetDate]);

  // ── Auto-Rotating Slogans for Right Card ──
  const [sloganIdx, setSloganIdx] = useState(0);

  useEffect(() => {
    setSloganIdx(0);
    const interval = setInterval(() => {
      setSloganIdx((prev) => (prev + 1) % festivalState.slogans.length);
    }, 5200);
    return () => clearInterval(interval);
  }, [festivalState.stateId, festivalState.slogans.length]);

  const currentSlogan = festivalState.slogans[sloganIdx] || festivalState.slogans[0];

  const handleSelectDevState = (stateId: FestivalStateId | null) => {
    startTransition(() => {
      setOverrideStateId(stateId);
    });
  };

  // Helper for CTA icon resolution
  const renderCTAIcon = (icon?: string) => {
    switch (icon) {
      case 'flame':
        return <Flame className="w-4 h-4 text-[#E7C878] flex-shrink-0" />;
      case 'calendar':
        return <CalendarIcon className="w-4 h-4 text-[#E7C878] flex-shrink-0" />;
      case 'music':
        return <Music className="w-4 h-4 text-[#E7C878] flex-shrink-0" />;
      case 'compass':
        return <Compass className="w-4 h-4 text-[#E7C878] flex-shrink-0" />;
      case 'send':
        return <Send className="w-4 h-4 text-[#E7C878] flex-shrink-0" />;
      case 'book':
        return <BookOpen className="w-4 h-4 text-[#E7C878] flex-shrink-0" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#E7C878] flex-shrink-0" />;
    }
  };

  // Ambient floating petals density & speed based on visual intensity
  const petalCount = festivalState.visualIntensity === 'high' ? 8 : festivalState.visualIntensity === 'reflective' ? 5 : 6;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden bg-transparent py-10 sm:py-16">
      {/* Floating Shiuli Petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10 select-none">
        {[...Array(petalCount)].map((_, i) => (
          <div
            key={i}
            className={cn(
              'absolute animate-petal text-xs select-none',
              festivalState.visualIntensity === 'high'
                ? 'opacity-40'
                : festivalState.visualIntensity === 'reflective'
                ? 'opacity-25'
                : 'opacity-30'
            )}
            style={{
              left: `${6 + i * (90 / petalCount)}%`,
              animationDelay: `${i * 2.1}s`,
              animationDuration: `${festivalState.visualIntensity === 'reflective' ? 18 + i * 3 : 13 + i * 2.2}s`,
            }}
          >
            🌸
          </div>
        ))}
      </div>

      {/* Radiant ambient glow breathing gently */}
      <div
        className={cn(
          'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none blur-3xl transition-opacity duration-1000',
          festivalState.visualIntensity === 'high'
            ? 'w-[580px] h-[580px] bg-radial from-[#A61B1B]/18 via-[#E7C878]/10 to-transparent opacity-80'
            : festivalState.visualIntensity === 'reflective'
            ? 'w-[520px] h-[520px] bg-radial from-[#C99A3D]/12 via-[#A61B1B]/8 to-transparent opacity-50'
            : 'w-[500px] h-[500px] bg-radial from-[#E7C878]/12 via-[#A61B1B]/6 to-transparent opacity-65'
        )}
      />

      {/* ================================================================== */}
      {/* MAIN HERO CONTENT (Horizontally Center-Aligned)                     */}
      {/* ================================================================== */}
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20 w-full text-center flex flex-col items-center">
        {/* 1. Dynamic Greeting Eyebrow Badge */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`badge-${festivalState.stateId}`}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#FFFDF8]/15 backdrop-blur-md border border-[#E7C878]/30 text-[#FFF8EA] text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs mb-3 sm:mb-4 max-w-full text-center"
          >
            <span className="text-xs sm:text-sm">🪔</span>
            <span className="truncate">
              {language === 'bn' ? festivalState.greetingBadgeBn : festivalState.greetingBadgeEn}
            </span>
            <span className="text-[#E7C878] text-[10px] hidden sm:inline">❖</span>
          </motion.div>
        </AnimatePresence>

        {/* 2. Headline & Subtitle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`headline-${festivalState.stateId}`}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-2 mb-6 sm:mb-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black font-serif tracking-tight text-[#FFF8EA] leading-[0.96] drop-shadow-lg">
              {language === 'bn' ? festivalState.headlineBn : festivalState.headlineEn}
            </h1>
            <p className="text-[10.5px] sm:text-xs md:text-sm tracking-[0.2em] sm:tracking-[0.28em] uppercase font-sans font-bold text-[#E7C878]/90 max-w-3xl mx-auto leading-relaxed">
              {language === 'bn' ? festivalState.subtitleBn : festivalState.subtitleEn}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* 3. Equal-Sized Dual Cards: Adaptive Left Box & Dynamic Slogan Right Box */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl mx-auto items-stretch mb-6"
        >
          {/* ────────────────────────────────────────────────────────── */}
          {/* Card A: Adaptive Festival Status & Countdown Box           */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="agomoni-card p-3.5 sm:p-5 w-full shadow-2xl flex flex-col justify-between text-left">
            {/* Top Meta Bar */}
            <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3 px-1">
              <div className="flex items-center gap-1.5 min-w-0">
                <span className="w-2 h-2 rounded-full bg-[#D95757] animate-pulse flex-shrink-0" />
                <span className="text-xs font-bold text-[#FFF8EA] font-serif truncate">
                  {language === 'bn'
                    ? festivalState.statusCard.cardBadgeBn
                    : festivalState.statusCard.cardBadgeEn}
                </span>
              </div>
              <span
                title={
                  language === 'bn'
                    ? `সময় অঞ্চল: ${userTz.timezone} (${userTz.utcOffsetString})`
                    : `Timezone: ${userTz.timezone} (${userTz.utcOffsetString})`
                }
                className="text-[9.5px] sm:text-[10px] px-2.5 py-0.5 rounded-full bg-[#1A1210]/75 border border-[#E7C878]/35 text-[#E7C878] font-bold flex-shrink-0 inline-flex items-center gap-1 shadow-xs"
              >
                <Globe className="w-2.5 h-2.5 text-[#E7C878] flex-shrink-0" />
                <span className="truncate max-w-[135px] sm:max-w-none">
                  {language === 'bn' ? userTz.zoneNameBn : userTz.zoneNameEn}
                </span>
              </span>
            </div>

            {/* Content Area: Mode A (Live Countdown) vs Mode B (Sacred Day Timings/Highlights) */}
            {festivalState.statusCard.mode === 'countdown' ? (
              <div className="space-y-2">
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2.5">
                  {[
                    {
                      val: language === 'bn' ? countdownTime.daysBn : countdownTime.days,
                      label: language === 'bn' ? 'দিন' : 'Days',
                    },
                    {
                      val: language === 'bn' ? countdownTime.hoursBn : countdownTime.hours,
                      label: language === 'bn' ? 'ঘণ্টা' : 'Hours',
                    },
                    {
                      val: language === 'bn' ? countdownTime.minutesBn : countdownTime.minutes,
                      label: language === 'bn' ? 'মিনিট' : 'Mins',
                    },
                    {
                      val: language === 'bn' ? countdownTime.secondsBn : countdownTime.seconds,
                      label: language === 'bn' ? 'সেকেন্ড' : 'Secs',
                    },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="rounded-[16px] sm:rounded-[20px] p-2 sm:p-3 text-center bg-[#FFFDF8]/10 backdrop-blur-md border border-[#FFFDF8]/15"
                    >
                      <div
                        className="text-xl sm:text-3xl font-extrabold font-serif text-[#FFF8EA] leading-none"
                        suppressHydrationWarning
                      >
                        {item.val}
                      </div>
                      <div className="text-[9px] sm:text-[10px] text-[#E7C878]/80 uppercase font-bold tracking-wider mt-1">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>

                <p
                  className="text-[10px] sm:text-[11px] text-[#FFF8EA]/70 text-center font-sans truncate px-1"
                  suppressHydrationWarning
                >
                  {language === 'bn'
                    ? festivalState.statusCard.countdownLabelBn
                    : festivalState.statusCard.countdownLabelEn}
                </p>
              </div>
            ) : (
              /* Mode B: Active Puja Day Highlights & Auspicious Timings */
              <div className="space-y-2.5 flex-1 flex flex-col justify-center">
                <div>
                  <h4 className="text-sm sm:text-base font-bold font-serif text-[#FFF8EA] leading-snug">
                    {language === 'bn'
                      ? festivalState.statusCard.titleBn
                      : festivalState.statusCard.titleEn}
                  </h4>
                  <p className="text-[10.5px] sm:text-xs text-[#E7C878] font-sans truncate mt-0.5">
                    {language === 'bn'
                      ? festivalState.statusCard.subtitleBn
                      : festivalState.statusCard.subtitleEn}
                  </p>
                </div>

                {festivalState.statusCard.highlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 pt-1">
                    {festivalState.statusCard.highlights.map((h, idx) => (
                      <div
                        key={idx}
                        className="rounded-[14px] p-2 bg-[#FFFDF8]/8 border border-[#FFFDF8]/12 text-left space-y-0.5"
                      >
                        <span className="text-[9.5px] text-[#FFF8EA]/70 font-sans block truncate">
                          {language === 'bn' ? h.labelBn : h.labelEn}
                        </span>
                        <div
                          className="text-[10.5px] sm:text-[11px] font-bold text-[#E7C878] font-mono flex items-center gap-1"
                          suppressHydrationWarning
                        >
                          <Clock className="w-2.5 h-2.5 text-[#E7C878] flex-shrink-0" />
                          <span className="truncate">{language === 'bn' ? h.timeBn : h.timeEn}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ────────────────────────────────────────────────────────── */}
          {/* Card B: Auto-Changing Slogan & Sacred Lore Box              */}
          {/* ────────────────────────────────────────────────────────── */}
          <div className="agomoni-card p-4 sm:p-6 w-full shadow-2xl flex flex-col justify-center items-center text-center relative overflow-hidden">
            {/* Subtle background radial glow */}
            <div className="absolute inset-0 bg-radial from-[#E7C878]/8 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 w-full flex flex-col justify-center items-center min-h-[90px] sm:min-h-[95px]">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1A1210]/60 border border-[#E7C878]/30 text-[10px] font-bold text-[#E7C878] mb-2 shadow-xs">
                <Sparkles className="w-3 h-3 text-[#E7C878] animate-pulse" />
                <span>
                  {language === 'bn'
                    ? festivalState.emotionalKeywordBn || 'শারদ মহিমা'
                    : festivalState.emotionalKeywordEn || 'Festival Reflection'}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`slogan-${currentSlogan?.id}-${festivalState.stateId}`}
                  initial={{ opacity: 0, y: 12, filter: 'blur(5px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -12, filter: 'blur(5px)' }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="space-y-1 w-full"
                >
                  <h3 className="text-base sm:text-xl font-bold font-serif text-[#FFF8EA] drop-shadow-sm truncate">
                    {language === 'bn' ? currentSlogan?.titleBn : currentSlogan?.titleEn}
                  </h3>
                  <p className="text-xs sm:text-sm font-serif text-[#E7C878] italic leading-relaxed drop-shadow-sm line-clamp-2">
                    {language === 'bn' ? currentSlogan?.quoteBn : currentSlogan?.quoteEn}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* 4. Context-Aware Dynamic Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 pt-2 w-full sm:w-auto"
        >
          {festivalState.ctas.map((cta) => (
            <Link
              key={cta.id}
              href={cta.href}
              className={cn(
                cta.variant === 'primary'
                  ? 'apple-btn-primary w-full sm:w-auto px-7 sm:px-8 py-3 sm:py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-lg active:scale-[0.97]'
                  : 'apple-btn-secondary w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer active:scale-[0.97]'
              )}
            >
              {renderCTAIcon(cta.icon)}
              <span>{language === 'bn' ? cta.labelBn : cta.labelEn}</span>
              {cta.variant === 'primary' && <ArrowRight className="w-4 h-4 flex-shrink-0" />}
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Developer Preview Bar (10-State Simulator for Real-Time Testing & QA) */}
      {mounted && (
        <FestivalPreviewBar
          activeStateId={festivalState.stateId}
          isOverrideActive={overrideStateId !== null}
          onSelectState={handleSelectDevState}
        />
      )}
    </section>
  );
};
