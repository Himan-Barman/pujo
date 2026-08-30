'use client';

import React, { useState } from 'react';
import { usePujaDay } from '@/hooks/use-puja-day';
import { useUIStore } from '@/stores/ui-store';
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

      {/* 2. Master Panjika Astronomical Almanac Card (Luxurious & Symmetrical) */}
      <div className="agomoni-card p-6 sm:p-8 lg:p-10 relative overflow-hidden border-2 border-[#E7C878]/35 shadow-2xl bg-gradient-to-b from-[#1C120F] to-[#120B09]">
        {/* Decorative Top Accent Bar with Dual Panjika Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#FFFDF8]/10">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#120B09] border border-[#E7C878]/40 text-[#E7C878] text-xs font-bold shadow-xs">
              <CalendarIcon className="w-3.5 h-3.5 text-[#E7C878]" />
              <span>
                {language === 'bn'
                  ? (currentDay.dateBn || currentDay.date)
                  : (currentDay.dateEn || currentDay.date)}
              </span>
              {currentDay.bengaliDateBn && (
                <>
                  <span className="opacity-35">•</span>
                  <span className="text-[#FFF8EA]">
                    {language === 'bn' ? currentDay.bengaliDateBn : currentDay.bengaliDateEn}
                  </span>
                </>
              )}
            </div>

            <span className="px-3.5 py-1.5 rounded-full bg-[#A61B1B]/85 border border-[#E7C878]/40 text-xs font-bold text-[#FFFDF8] shadow-xs">
              {language === 'bn' ? currentDay.tithiBn : currentDay.tithiEn}
            </span>
          </div>

          {/* Interactive Panjika Selection Capsule (Benimadhab Shil vs Gupta Press) */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-[#E7C878]/80 font-mono">
              <Compass className="w-3.5 h-3.5 text-[#E7C878]" />
              <span>{language === 'bn' ? 'পঞ্জিকা নির্বাচন:' : 'Panjika Almanac:'}</span>
            </div>

            <div className="inline-flex items-center p-1 rounded-full bg-[#120B09] border border-[#E7C878]/35 shadow-inner gap-1">
              <button
                type="button"
                onClick={() => setSelectedPanjika('benimadhab')}
                className={cn(
                  'px-3.5 py-1 rounded-full text-xs font-bold font-serif transition-all cursor-pointer',
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
                  'px-3.5 py-1 rounded-full text-xs font-bold font-serif transition-all cursor-pointer',
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-6">
          {/* Left Column: Title, Description, Tithi Windows & Vahana Lore */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold font-serif text-[#FFF8EA] leading-tight tracking-normal">
                  {language === 'bn' ? mainTitleBn : mainTitleEn}
                </h2>
                {(subTitleBn || subTitleEn) && (
                  <span className="px-3 py-1 rounded-full bg-[#E7C878]/15 border border-[#E7C878]/40 text-xs sm:text-sm font-serif font-bold text-[#E7C878] shadow-xs">
                    {language === 'bn' ? subTitleBn : subTitleEn}
                  </span>
                )}
              </div>

              <p className="text-sm sm:text-base text-[#FFF8EA]/85 leading-relaxed font-sans">
                {language === 'bn' ? currentDay.descriptionBn : currentDay.descriptionEn}
              </p>
            </div>

            {/* Astronomical Tithi Window Box (Reflects Active Selected Panjika) */}
            <div className="p-5 sm:p-6 rounded-[24px] bg-[#FFFDF8]/[0.04] border border-[#E7C878]/25 space-y-4 shadow-xs">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#FFFDF8]/10">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E7C878] uppercase tracking-wider">
                  <Clock className="w-4 h-4 text-[#E7C878]" />
                  <span>
                    {language === 'bn'
                      ? `${selectedPanjika === 'benimadhab' ? 'বেণীমাধব শীল' : 'গুপ্তপ্রেস'} পঞ্জিকানুযায়ী তিথি সময়সীমা`
                      : `${selectedPanjika === 'benimadhab' ? 'Benimadhab Seal' : 'Gupta Press'} Tithi Window`}
                  </span>
                </div>
                <span className="text-[11px] text-[#FFF8EA]/60 font-mono">
                  {language === 'bn' ? currentDay.tithiBn : currentDay.tithiEn}
                </span>
              </div>

              {/* Start & End Dual Cards */}
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

              {/* Auspicious Yog Time */}
              {currentSchedule.amritaYogaBn && (
                <div className="pt-2 border-t border-[#FFFDF8]/8 flex items-center gap-2 text-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />
                  <span className="text-[#D4AA50] font-bold">
                    {language === 'bn' ? 'অমৃতযোগ / শুভ লগ্ন:' : 'Amrita Yoga / Auspicious Window:'}
                  </span>
                  <span className="text-[#FFF8EA]/90 font-mono">
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
          <div className="lg:col-span-5 p-6 sm:p-7 rounded-[26px] bg-[#120B09]/95 backdrop-blur-md border-2 border-[#E7C878]/35 flex flex-col justify-between space-y-4 shadow-xl">
            <div className="text-xs font-bold text-[#E7C878] uppercase tracking-wider flex items-center justify-between pb-3 border-b border-[#FFFDF8]/12">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E7C878]" />
                <span>{language === 'bn' ? 'প্রধান শুভ মুহূর্ত ও নির্ঘণ্ট' : 'Key Puja Nirghanta & Timings'}</span>
              </div>
              <span className="text-[11px] text-[#E7C878] font-bold font-mono px-2 py-0.5 rounded-full bg-[#FFFDF8]/[0.08] border border-[#E7C878]/30">
                {selectedPanjika === 'benimadhab'
                  ? (language === 'bn' ? 'বেণীমাধব শীল' : 'Benimadhab Seal')
                  : (language === 'bn' ? 'গুপ্তপ্রেস' : 'Gupta Press')}
              </span>
            </div>

            <div className="space-y-3 flex-1 flex flex-col justify-center">
              {currentSchedule.timingHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-4 rounded-[20px] border flex items-center justify-between gap-3 transition-all',
                    highlight.importance === 'primary'
                      ? 'bg-gradient-to-r from-[#A61B1B]/40 to-[#741313]/30 border-[#E7C878]/40 shadow-xs'
                      : highlight.importance === 'special'
                      ? 'bg-[#E7C878]/10 border-[#E7C878]/30'
                      : 'bg-[#FFFDF8]/[0.04] border-[#FFFDF8]/10'
                  )}
                >
                  <div className="space-y-0.5">
                    <div className="text-sm sm:text-base font-bold text-[#FFF8EA] font-serif">
                      {language === 'bn' ? highlight.titleBn : highlight.titleEn}
                    </div>
                    <span className="text-[11px] text-[#E7C878]/80 font-sans block">
                      {highlight.importance === 'primary'
                        ? language === 'bn' ? 'সর্বোচ্চ পুণ্য লগ্ন' : 'Primary Auspicious Hour'
                        : highlight.importance === 'special'
                        ? language === 'bn' ? 'বিশেষ সময়সীমা' : 'Special Ritual Window'
                        : language === 'bn' ? 'বিহিত পূজা' : 'Prescribed Puja'}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#E7C878] whitespace-nowrap font-mono px-3.5 py-1.5 rounded-full bg-[#120B09] border border-[#E7C878]/35 shadow-xs">
                    {language === 'bn' ? highlight.timeBn : highlight.timeEn}
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

      {/* 3. Deep Tithi Details Tabs (Mahatmya, Bidhi, Samagri, Mantra) */}
      <div className="agomoni-card p-6 sm:p-8 lg:p-10 space-y-8 shadow-2xl border border-[#E7C878]/25 bg-gradient-to-b from-[#1C120F] to-[#120B09]">
        {/* Tab Navigation Header (Centered & Stacked) */}
        <div className="text-center space-y-5 pb-6 border-b border-[#FFFDF8]/10 max-w-4xl mx-auto">
          <div className="space-y-1.5">
            <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#FFF8EA]">
              {language === 'bn'
                ? `${mainTitleBn}-এর প্রামাণ্য শাস্ত্রীয় দর্শন ও বিধি`
                : `Comprehensive Scriptural Lore & Ritual Guide`}
            </h3>
            <p className="text-xs sm:text-sm text-[#E7C878]/80 font-sans">
              {language === 'bn'
                ? 'তিথি মাহাত্ম্য, বৈদিক পূজাক্রম, সামগ্রী ও ধ্যানমন্ত্র'
                : 'Puranic legends, step-by-step Vedic bidhi, samagri, and hymns'}
            </p>
          </div>

          {/* Horizontal Capsule Tabs (Full Horizontal Row Below Heading) */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-[#120B09] backdrop-blur-xl border border-[#FFFDF8]/15 text-xs shadow-inner flex-wrap justify-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('lore')}
              className={cn(
                'px-4 sm:px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm',
                activeTab === 'lore'
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] shadow-md border border-[#E7C878]/40 scale-[1.02]'
                  : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/8'
              )}
            >
              <BookOpen className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'তিথি মাহাত্ম্য' : 'Puranic Lore'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('bidhi')}
              className={cn(
                'px-4 sm:px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm',
                activeTab === 'bidhi'
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] shadow-md border border-[#E7C878]/40 scale-[1.02]'
                  : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/8'
              )}
            >
              <CheckCircle2 className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'পূজাবিধির ধাপসমূহ' : 'Puja Bidhi Steps'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('samagri')}
              className={cn(
                'px-4 sm:px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm',
                activeTab === 'samagri'
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] shadow-md border border-[#E7C878]/40 scale-[1.02]'
                  : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/8'
              )}
            >
              <Package className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'পূজার উপচার' : 'Samagri List'}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('mantra')}
              className={cn(
                'px-4 sm:px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm',
                activeTab === 'mantra'
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] shadow-md border border-[#E7C878]/40 scale-[1.02]'
                  : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/8'
              )}
            >
              <Scroll className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'ধ্যান ও প্রণাম' : 'Dhyan Shloka'}</span>
            </button>
          </div>
        </div>

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
