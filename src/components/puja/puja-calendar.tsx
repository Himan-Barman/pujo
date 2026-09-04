'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePujaDay } from '@/hooks/use-puja-day';
import { useUIStore } from '@/stores/ui-store';
import { PUJA_DAYS } from '@/data/puja-days';
import { PujaDayId } from '@/types/puja';
import { RITUALS_DATA } from '@/data/rituals';
import { PujaDaySelector } from './puja-day-selector';
import { RitualCard } from './ritual-card';
import { SectionHeading } from '@/components/shared/section-heading';
import {
  Clock,
  Calendar as CalendarIcon,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Package,
  Scroll,
  Compass,
  Hourglass,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const PujaCalendar: React.FC = () => {
  const searchParams = useSearchParams();
  const dayParam = searchParams.get('day');
  const setSelectedPujaDay = useUIStore((state) => state.setSelectedPujaDay);

  // Sync with URL query parameter on load or change
  useEffect(() => {
    if (dayParam && PUJA_DAYS.some((d) => d.id === dayParam)) {
      setSelectedPujaDay(dayParam as PujaDayId);
    }
  }, [dayParam, setSelectedPujaDay]);

  const { currentDay, selectedDayId } = usePujaDay();
  const language = useUIStore((state) => state.language);
  const selectedPanjika = useUIStore((state) => state.selectedPanjika);
  const setSelectedPanjika = useUIStore((state) => state.setSelectedPanjika);
  const [activeTab, setActiveTab] = useState<'lore' | 'bidhi' | 'samagri' | 'mantra'>('lore');

  const dayRituals = RITUALS_DATA.filter((r) => r.dayId === selectedDayId);

  // Dynamic active Panjika Schedule (Benimadhab Shil is Default)
  const currentSchedule =
    (selectedPanjika === 'benimadhab'
      ? currentDay.benimadhabSchedule
      : currentDay.guptapressSchedule) ||
    currentDay.benimadhabSchedule ||
    currentDay.guptapressSchedule || {
      panjikaNameBn: 'বেণীমাধব শীল পঞ্জিকা',
      panjikaNameEn: 'Benimadhab Seal Panjika',
      tithiWindowBn: currentDay.tithiWindowBn,
      tithiWindowEn: currentDay.tithiWindowEn,
      tithiStartBn: currentDay.tithiStartBn,
      tithiStartEn: currentDay.tithiStartEn,
      tithiEndBn: currentDay.tithiEndBn,
      tithiEndEn: currentDay.tithiEndEn,
      amritaYogaBn: currentDay.amritaYogaBn,
      amritaYogaEn: currentDay.amritaYogaEn,
      timingHighlights: currentDay.timingHighlights,
    };

  // Split title if it has parenthesis for balanced typography
  const rawTitleBn = currentDay.nameBn;
  const rawTitleEn = currentDay.nameEn;
  const titlePartsBn = rawTitleBn.includes('(') ? rawTitleBn.split('(') : [rawTitleBn, ''];
  const titlePartsEn = rawTitleEn.includes('(') ? rawTitleEn.split('(') : [rawTitleEn, ''];

  const mainTitleBn = titlePartsBn[0].trim();
  const subTitleBn = titlePartsBn[1] ? titlePartsBn[1].replace(')', '').trim() : '';

  const mainTitleEn = titlePartsEn[0].trim();
  const subTitleEn = titlePartsEn[1] ? titlePartsEn[1].replace(')', '').trim() : '';

  return (
    <div className="space-y-10">
      {/* 1. Day Selector Navigation Bar with Hidden Scrollbar & Smooth Pill Alignment */}
      <div className="w-full">
        <PujaDaySelector />
      </div>

      {/* Mobile Panjika Switcher (Positioned cleanly above the master box on mobile, width & height matching other filters) */}
      <div className="flex sm:hidden items-center justify-center -mt-6 mb-2 w-full px-1">
        <div className="inline-flex items-center p-1 rounded-full bg-[#120B09]/95 border border-[#E7C878]/35 shadow-lg gap-1.5 w-full max-w-sm">
          <button
            type="button"
            onClick={() => setSelectedPanjika('benimadhab')}
            className={cn(
              'flex-1 px-4 py-2.5 rounded-full text-xs font-bold font-serif transition-all duration-200 cursor-pointer text-center active:scale-95 whitespace-nowrap',
              selectedPanjika === 'benimadhab'
                ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] border border-[#E7C878]/40 shadow-md scale-[1.02]'
                : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/5'
            )}
          >
            {language === 'bn' ? 'বেণীমাধব শীল' : 'Benimadhab Seal'}
          </button>

          <button
            type="button"
            onClick={() => setSelectedPanjika('guptapress')}
            className={cn(
              'flex-1 px-4 py-2.5 rounded-full text-xs font-bold font-serif transition-all duration-200 cursor-pointer text-center active:scale-95 whitespace-nowrap',
              selectedPanjika === 'guptapress'
                ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] border border-[#E7C878]/40 shadow-md scale-[1.02]'
                : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/5'
            )}
          >
            {language === 'bn' ? 'গুপ্তপ্রেস' : 'Gupta Press'}
          </button>
        </div>
      </div>

      {/* 2. Master Panjika Astronomical Almanac Card (Luxurious & Symmetrical) */}
      <div className="agomoni-card p-4 sm:p-8 lg:p-10 relative overflow-hidden border-2 border-[#E7C878]/35 shadow-2xl bg-gradient-to-b from-[#1C120F] to-[#120B09]">
        {/* Decorative Top Accent Bar with Dual Panjika Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4 pb-3 sm:pb-5 border-b border-[#FFFDF8]/10">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex flex-wrap items-center gap-1.5 sm:gap-2 p-0 sm:px-4 sm:py-2 bg-transparent sm:bg-[#120B09] border-0 sm:border sm:border-[#E7C878]/40 text-[#E7C878] text-xs font-bold sm:shadow-xs sm:rounded-full">
              <CalendarIcon className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />
              <span>
                {language === 'bn'
                  ? (currentDay.dateBn || currentDay.date)
                  : (currentDay.dateEn || currentDay.date)}
              </span>
              {currentDay.bengaliDateBn && (
                <>
                  <span className="opacity-35 text-[#FFF8EA]">•</span>
                  <span className="text-[#FFF8EA]">
                    {(language === 'bn' ? currentDay.bengaliDateBn : currentDay.bengaliDateEn || '')
                      .replace(/ বঙ্গাব্দ/g, '')
                      .replace(/ Bangabda/g, '')}
                  </span>
                </>
              )}
              <span className="opacity-35 text-[#FFF8EA]">•</span>
              <span className="text-[#FFF8EA]">
                {language === 'bn' ? currentDay.tithiBn : currentDay.tithiEn}
              </span>
            </div>
          </div>

          {/* Interactive Panjika Selection Capsule (Benimadhab Shil vs Gupta Press - Desktop view) */}
          <div className="hidden sm:flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-[#E7C878]/80 font-mono">
              <Compass className="w-3.5 h-3.5 text-[#E7C878]" />
              <span>{language === 'bn' ? 'পঞ্জিকা নির্বাচন:' : 'Panjika Almanac:'}</span>
            </div>

            <div className="inline-flex items-center p-1 rounded-full bg-[#120B09] border border-[#E7C878]/35 shadow-inner gap-1 w-full sm:w-auto justify-between sm:justify-start">
              <button
                type="button"
                onClick={() => setSelectedPanjika('benimadhab')}
                className={cn(
                  'px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold font-serif transition-all cursor-pointer flex-1 sm:flex-initial text-center',
                  selectedPanjika === 'benimadhab'
                    ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] border border-[#E7C878]/40 shadow-xs scale-[1.02]'
                    : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/5'
                )}
              >
                {language === 'bn' ? 'বেণীমাধব শীল' : 'Benimadhab Seal'}
              </button>

              <button
                type="button"
                onClick={() => setSelectedPanjika('guptapress')}
                className={cn(
                  'px-3 sm:px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold font-serif transition-all cursor-pointer flex-1 sm:flex-initial text-center',
                  selectedPanjika === 'guptapress'
                    ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] border border-[#E7C878]/40 shadow-xs scale-[1.02]'
                    : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/5'
                )}
              >
                {language === 'bn' ? 'গুপ্তপ্রেস' : 'Gupta Press'}
              </button>
            </div>
          </div>
        </div>

        {/* Master Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch pt-4 sm:pt-6">
          {/* Left Column: Title, Description, Tithi Windows & Vahana Lore */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <h2 className="text-2xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-serif text-[#FFF8EA] leading-tight tracking-normal">
                  {language === 'bn' ? mainTitleBn : mainTitleEn}
                </h2>
                {(subTitleBn || subTitleEn) && (
                  <span className="px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#E7C878]/15 border border-[#E7C878]/40 text-xs sm:text-sm font-serif font-bold text-[#E7C878] shadow-xs">
                    {language === 'bn' ? subTitleBn : subTitleEn}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-base text-[#FFF8EA]/85 leading-relaxed font-sans">
                {language === 'bn' ? currentDay.descriptionBn : currentDay.descriptionEn}
              </p>
            </div>

            {/* Astronomical Tithi Window Box (Reflects Active Selected Panjika) */}
            <div className="p-4 sm:p-6 rounded-[24px] bg-[#FFFDF8]/[0.04] border border-[#E7C878]/25 space-y-3.5 sm:space-y-4 shadow-xs">
              {/* Clean Header: Removed redundant tithi text for uncrowded mobile display */}
              <div className="flex items-center gap-2 pb-2.5 border-b border-[#FFFDF8]/10 text-xs sm:text-sm font-bold text-[#E7C878] uppercase tracking-wider font-serif">
                <Clock className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
                <span>
                  {language === 'bn'
                    ? `${selectedPanjika === 'benimadhab' ? 'বেণীমাধব শীল' : 'গুপ্তপ্রেস'} পঞ্জিকানুযায়ী তিথি সময়সীমা`
                    : `${selectedPanjika === 'benimadhab' ? 'Benimadhab Seal' : 'Gupta Press'} Tithi Window`}
                </span>
              </div>

              {/* Start & End Dual Cards (Kept as is) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-[16px] bg-[#120B09] border border-[#E7C878]/25 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#E7C878]/80 tracking-wider block">
                      {language === 'bn' ? 'তিথি আরম্ভ' : 'Tithi Begins'}
                    </span>
                    <span className="text-sm sm:text-base font-bold font-mono text-[#FFF8EA]">
                      {language === 'bn' ? currentSchedule.tithiStartBn : currentSchedule.tithiStartEn}
                    </span>
                  </div>
                  <Hourglass className="w-4 h-4 text-[#E7C878]/50 flex-shrink-0" />
                </div>

                <div className="p-3.5 rounded-[16px] bg-[#120B09] border border-[#E7C878]/25 flex items-center justify-between gap-2">
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-bold text-[#E7C878]/80 tracking-wider block">
                      {language === 'bn' ? 'তিথি সমাপ্তি' : 'Tithi Concludes'}
                    </span>
                    <span className="text-sm sm:text-base font-bold font-mono text-[#FFF8EA]">
                      {language === 'bn' ? currentSchedule.tithiEndBn : currentSchedule.tithiEndEn}
                    </span>
                  </div>
                  <Check className="w-4 h-4 text-[#E7C878]/50 flex-shrink-0" />
                </div>
              </div>

              {/* Auspicious Yog Time (Properly structured for mobile & desktop) */}
              {currentSchedule.amritaYogaBn && (
                <div className="pt-2.5 border-t border-[#FFFDF8]/10 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 text-xs leading-relaxed">
                  <div className="inline-flex items-center gap-1.5 flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />
                    <span className="text-[#E7C878] font-bold font-serif whitespace-nowrap">
                      {language === 'bn' ? 'অমৃতযোগ / শুভলগ্ন:' : 'Amrita Yoga / Auspicious Window:'}
                    </span>
                  </div>
                  <span className="text-[#FFF8EA]/90 font-sans font-medium pl-5 sm:pl-0">
                    {language === 'bn' ? currentSchedule.amritaYogaBn : currentSchedule.amritaYogaEn}
                  </span>
                </div>
              )}
            </div>

            {/* Vahana Arrival / Departure Badges (if present) */}
            {(currentDay.vahanaArrivalBn || currentDay.vahanaDepartureBn) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentDay.vahanaArrivalBn && (
                  <div className="p-4 rounded-[20px] bg-[#FFFDF8]/[0.04] border border-[#E7C878]/25 text-xs space-y-1 shadow-xs">
                    <span className="text-[10px] text-[#E7C878] font-bold uppercase tracking-wider block">
                      {language === 'bn' ? 'দেবীর আগমন বাহন' : 'Arrival Vahana'}
                    </span>
                    <span className="font-serif font-bold text-[#FFF8EA] text-sm block">
                      {language === 'bn' ? currentDay.vahanaArrivalBn : currentDay.vahanaArrivalEn}
                    </span>
                    <span className="text-[11px] text-[#FFF8EA]/75 italic block pt-0.5">
                      {language === 'bn' ? currentDay.vahanaArrivalResultBn : currentDay.vahanaArrivalResultEn}
                    </span>
                  </div>
                )}

                {currentDay.vahanaDepartureBn && (
                  <div className="p-4 rounded-[20px] bg-[#FFFDF8]/[0.04] border border-[#E7C878]/25 text-xs space-y-1 shadow-xs">
                    <span className="text-[10px] text-[#E7C878] font-bold uppercase tracking-wider block">
                      {language === 'bn' ? 'দেবীর গমন বাহন' : 'Departure Vahana'}
                    </span>
                    <span className="font-serif font-bold text-[#FFF8EA] text-sm block">
                      {language === 'bn' ? currentDay.vahanaDepartureBn : currentDay.vahanaDepartureEn}
                    </span>
                    <span className="text-[11px] text-[#FFF8EA]/75 italic block pt-0.5">
                      {language === 'bn' ? currentDay.vahanaDepartureResultBn : currentDay.vahanaDepartureResultEn}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column: Key Timing Highlights Box (Reflects Active Selected Panjika) */}
          <div className="lg:col-span-5 p-4 sm:p-7 rounded-[26px] bg-[#120B09]/95 backdrop-blur-md border-2 border-[#E7C878]/35 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="text-xs font-bold text-[#E7C878] uppercase tracking-wider flex items-center justify-between pb-3 border-b border-[#FFFDF8]/12">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E7C878]" />
                <span>{language === 'bn' ? 'প্রধান শুভ মুহূর্ত ও নির্ঘণ্ট' : 'Key Puja Nirghanta & Timings'}</span>
              </div>
            </div>

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {currentSchedule.timingHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-3.5 sm:p-4 rounded-[20px] border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 transition-all',
                    highlight.importance === 'primary'
                      ? 'bg-gradient-to-r from-[#A61B1B]/35 to-[#741313]/25 border-[#E7C878]/35 shadow-xs'
                      : highlight.importance === 'special'
                      ? 'bg-[#E7C878]/10 border-[#E7C878]/25'
                      : 'bg-[#FFFDF8]/[0.04] border-[#FFFDF8]/10'
                  )}
                >
                  <div className="text-sm sm:text-base font-bold text-[#FFF8EA] font-serif leading-snug">
                    {language === 'bn' ? highlight.titleBn : highlight.titleEn}
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-[#E7C878] font-mono flex items-center gap-1.5 whitespace-nowrap">
                    <Clock className="w-3.5 h-3.5 text-[#E7C878]/70 flex-shrink-0" />
                    <span>{language === 'bn' ? highlight.timeBn : highlight.timeEn}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-[#FFFDF8]/10 flex items-center justify-between text-xs text-[#E7C878]/80 font-sans">
              <span>
                {language === 'bn'
                  ? `${selectedPanjika === 'benimadhab' ? 'বেণীমাধব শীল' : 'গুপ্তপ্রেস'} অনুমোদিত বিশুদ্ধ সময় নির্ঘণ্ট`
                  : `${selectedPanjika === 'benimadhab' ? 'Benimadhab Seal' : 'Gupta Press'} prescribed auspicious hours`}
              </span>
              <span>✦</span>
            </div>
          </div>
        </div>

        {/* Dedicated Full-Width Horizontal Box for Day Observances (দিনের প্রধান আচারসমূহ) */}
        <div className="mt-8 pt-6 border-t border-[#FFFDF8]/10 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E7C878] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#E7C878]" />
              <span>
                {language === 'bn' ? 'দিনের প্রধান আচারসমূহ ও পুণ্য পর্ব' : 'Key Sacred Observances of the Day'}
              </span>
            </div>
            <span className="text-[10px] text-[#FFF8EA]/50 font-mono">
              {language === 'bn' ? 'শাস্ত্রীয় নির্ঘণ্ট' : 'Vedic Observance'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5">
            {(language === 'bn' ? currentDay.keyRitualsBn : currentDay.keyRitualsEn).map((ritual, idx) => (
              <div
                key={idx}
                className="p-4 rounded-[20px] bg-[#FFFDF8]/[0.04] border border-[#FFFDF8]/10 hover:border-[#E7C878]/35 transition-all shadow-xs flex items-center gap-3"
              >
                <span className="w-7 h-7 rounded-full bg-[#120B09] border border-[#E7C878]/40 text-[#E7C878] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 shadow-xs">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#FFF8EA] font-sans leading-snug">
                  {ritual}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Deep Tithi Details Header & Filter Tabs (Positioned Outside Card) */}
      <div className="space-y-6 pt-2">
        {/* Section Heading Outside Box */}
        <div className="text-center space-y-2 max-w-4xl mx-auto px-2">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-[#FFF8EA] drop-shadow-sm">
            {language === 'bn'
              ? `${mainTitleBn}-এর প্রামাণ্য শাস্ত্রীয় দর্শন ও বিধি`
              : `Comprehensive Scriptural Lore & Ritual Guide`}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-[#E7C878]/90 font-sans font-medium">
            {language === 'bn'
              ? 'তিথি মাহাত্ম্য, বৈদিক পূজাক্রম, সামগ্রী ও ধ্যানমন্ত্র'
              : 'Puranic legends, step-by-step Vedic bidhi, samagri, and hymns'}
          </p>
        </div>

        {/* Horizontal Capsule Tabs (Unified Capsule Container & Edge Blur) */}
        <div className="relative w-full rounded-full p-1 sm:p-1.5 bg-[#120B09]/60 backdrop-blur-xl border border-[#FFFDF8]/10 shadow-xl overflow-hidden group/nav select-none">
          {/* Scroll Track with Progressive Edge Mask */}
          <div
            className="w-full overflow-x-auto no-scrollbar py-1 px-4 sm:px-10 flex items-center justify-start lg:justify-center gap-2 sm:gap-3 scroll-smooth relative z-0"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 1.5%, rgba(0,0,0,0.8) 4%, black 8%, black 92%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.3) 98.5%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 1.5%, rgba(0,0,0,0.8) 4%, black 8%, black 92%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.3) 98.5%, transparent 100%)',
            }}
          >
            <button
              type="button"
              onClick={(e) => {
                setActiveTab('lore');
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
              className={cn(
                'relative flex-shrink-0 transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97]',
                'px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold font-serif whitespace-nowrap',
                activeTab === 'lore'
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.02] z-10'
                  : 'bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.08]'
              )}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />
              <span>{language === 'bn' ? 'তিথি মাহাত্ম্য' : 'Puranic Lore'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                setActiveTab('bidhi');
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
              className={cn(
                'relative flex-shrink-0 transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97]',
                'px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold font-serif whitespace-nowrap',
                activeTab === 'bidhi'
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.02] z-10'
                  : 'bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.08]'
              )}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />
              <span>{language === 'bn' ? 'পূজাবিধির ধাপ' : 'Puja Bidhi'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                setActiveTab('samagri');
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
              className={cn(
                'relative flex-shrink-0 transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97]',
                'px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold font-serif whitespace-nowrap',
                activeTab === 'samagri'
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.02] z-10'
                  : 'bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.08]'
              )}
            >
              <Package className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />
              <span>{language === 'bn' ? 'পূজার উপচার' : 'Samagri List'}</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                setActiveTab('mantra');
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
              className={cn(
                'relative flex-shrink-0 transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97]',
                'px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold font-serif whitespace-nowrap',
                activeTab === 'mantra'
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.02] z-10'
                  : 'bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.08]'
              )}
            >
              <Scroll className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />
              <span>{language === 'bn' ? 'ধ্যান ও প্রণাম' : 'Dhyan Shloka'}</span>
            </button>
          </div>

          {/* Left Edge Progressive Blur Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-28 z-20 rounded-l-full"
            style={{
              background:
                'linear-gradient(to right, rgba(18, 11, 9, 0.98) 0%, rgba(18, 11, 9, 0.85) 30%, rgba(18, 11, 9, 0.45) 70%, transparent 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              maskImage:
                'linear-gradient(to right, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)',
            }}
          />

          {/* Right Edge Progressive Blur Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-28 z-20 rounded-r-full"
            style={{
              background:
                'linear-gradient(to left, rgba(18, 11, 9, 0.98) 0%, rgba(18, 11, 9, 0.85) 30%, rgba(18, 11, 9, 0.45) 70%, transparent 100%)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              maskImage:
                'linear-gradient(to left, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to left, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)',
            }}
          />
        </div>

        {/* Content Box with Active Tab Content */}
        <div className="agomoni-card p-6 sm:p-8 lg:p-10 space-y-8 shadow-2xl border border-[#E7C878]/25 bg-gradient-to-b from-[#1C120F] to-[#120B09]">

        {/* Tab 1: Tithi Mahatmya (পৌরাণিক কাহিনী) */}
        {activeTab === 'lore' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-[#E7C878] pb-2 border-b border-[#FFFDF8]/8">
              <BookOpen className="w-5 h-5 text-[#E7C878]" />
              <h4 className="text-xl font-bold font-serif">
                {language === 'bn' ? 'পৌরাণিক আখ্যান ও শাস্ত্রীয় প্রেক্ষাপট' : 'Scriptural Narrative & Historical Lore'}
              </h4>
            </div>

            <div className="grid grid-cols-1 gap-5 text-sm sm:text-base text-[#FFF8EA]/90 leading-relaxed font-sans">
              {(language === 'bn' ? currentDay.tithiMahatmyaBn : currentDay.tithiMahatmyaEn).map((para, i) => (
                <div
                  key={i}
                  className="p-6 sm:p-7 rounded-[22px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 hover:border-[#E7C878]/30 transition-all shadow-xs"
                >
                  <div className="flex items-start gap-4">
                    <span className="w-7 h-7 rounded-full bg-[#120B09] border border-[#E7C878]/40 text-[#E7C878] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="leading-relaxed flex-1">{para}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Puja Bidhi Steps (শাস্ত্রীয় পূজাক্রম) */}
        {activeTab === 'bidhi' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-[#E7C878] pb-2 border-b border-[#FFFDF8]/8">
              <CheckCircle2 className="w-5 h-5 text-[#E7C878]" />
              <h4 className="text-xl font-bold font-serif">
                {language === 'bn' ? 'তিথির সম্পূর্ণ বৈদিক পূজাক্রম' : 'Step-by-Step Vedic Ritual Sequence'}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(language === 'bn' ? currentDay.pujaBidhiStepsBn : currentDay.pujaBidhiStepsEn).map((step) => (
                <div
                  key={step.step}
                  className="p-6 sm:p-7 rounded-[22px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 hover:border-[#E7C878]/30 transition-all shadow-xs space-y-3 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#FFFDF8]/10">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-full bg-[#120B09] border border-[#E7C878]/40 text-[#E7C878] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 shadow-xs">
                        {step.step}
                      </span>
                      <h5 className="text-base sm:text-lg font-bold font-serif text-[#FFF8EA]">
                        {language === 'bn' ? step.titleBn : step.titleEn}
                      </h5>
                    </div>

                    {(step.timeBn || step.timeEn) && (
                      <span className="text-xs font-mono text-[#E7C878] font-bold px-3 py-1 rounded-full bg-[#120B09] border border-[#E7C878]/30 shadow-xs whitespace-nowrap">
                        {language === 'bn' ? step.timeBn : step.timeEn}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base text-[#FFF8EA]/90 leading-relaxed font-sans">
                    {language === 'bn' ? step.descBn : step.descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Samagri List (পূজার উপচার ও দ্রব্যাদি) */}
        {activeTab === 'samagri' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-[#E7C878] pb-2 border-b border-[#FFFDF8]/8">
              <Package className="w-5 h-5 text-[#E7C878]" />
              <h4 className="text-xl font-bold font-serif">
                {language === 'bn' ? 'প্রয়োজনীয় পূজার উপচার ও সামগ্রী তালিকা' : 'Required Sacred Ritual Articles & Samagri'}
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {(language === 'bn' ? currentDay.samagriListBn : currentDay.samagriListEn).map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-[22px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 hover:border-[#E7C878]/30 transition-all shadow-xs flex items-center gap-3.5"
                >
                  <span className="w-7 h-7 rounded-full bg-[#120B09] border border-[#E7C878]/40 text-[#E7C878] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 shadow-xs">
                    {idx + 1}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#FFF8EA] font-sans leading-relaxed">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Dhyan Shloka & Pranati Mantra */}
        {activeTab === 'mantra' && (
          <div className="space-y-6">
            <div className="flex items-center gap-2.5 text-[#E7C878] pb-2 border-b border-[#FFFDF8]/8">
              <Scroll className="w-5 h-5 text-[#E7C878]" />
              <h4 className="text-xl font-bold font-serif">
                {language === 'bn' ? 'তিথির প্রধান ধ্যান ও প্রণাম মন্ত্র' : 'Primary Dhyan Shloka & Invocation Mantra'}
              </h4>
            </div>

            <div className="p-7 sm:p-10 rounded-[28px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 hover:border-[#E7C878]/30 transition-all shadow-xs text-center space-y-5">
              <p className="text-lg sm:text-2xl text-[#E7C878] font-mono font-bold tracking-wide leading-relaxed">
                {currentDay.dhyanShlokaBn}
              </p>

              <p className="text-xs sm:text-sm text-[#FFF8EA]/75 font-mono italic">
                {currentDay.dhyanShlokaEn}
              </p>

              <div className="p-5 sm:p-6 rounded-[22px] bg-[#120B09] border border-[#E7C878]/30 max-w-2xl mx-auto space-y-2 text-center shadow-inner">
                <span className="text-xs text-[#E7C878] font-bold block uppercase tracking-wider">
                  {language === 'bn' ? 'মন্ত্রের সরলার্থ ও তাৎপর্য:' : 'Translation & Significance:'}
                </span>
                <p className="text-sm sm:text-base text-[#FFF8EA]/90 font-sans leading-relaxed">
                  {language === 'bn' ? currentDay.dhyanShlokaMeaningBn : currentDay.dhyanShlokaMeaningEn}
                </p>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>

      {/* 4. Detailed Ritual Cards Grid with Center-Aligned Heading */}
      <div className="space-y-8 pt-4">
        <SectionHeading
          tagBn="তিথির আচার পরিক্রমা"
          tagEn="Ritual Observance"
          titleBn={`${mainTitleBn}-এর বিশিষ্ট আচারসমূহ`}
          titleEn="Key Sacred Rituals & Offerings"
          subtitleBn="সময়সূচি, উপকরণ এবং পূজাবিধির পূর্ণাঙ্গ সহায়িকা।"
          subtitleEn="Step-by-step guides for timings, requirements, and spiritual significance."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dayRituals.length > 0 ? (
            dayRituals.map((ritual) => (
              <RitualCard key={ritual.id} ritual={ritual} />
            ))
          ) : (
            <div className="col-span-2 agomoni-card p-8 text-center text-sm text-[#FFF8EA]/50">
              {language === 'bn'
                ? 'এই দিনের নির্দিষ্ট আচারসমূহ প্রস্তুত করা হচ্ছে।'
                : 'Ritual guides for this day are being finalized.'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
