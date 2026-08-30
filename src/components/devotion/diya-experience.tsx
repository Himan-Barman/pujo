'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { toBengaliNumeral } from '@/lib/formatters';
import { audioSynth } from '@/lib/audio-synth';
import { Flame, Sparkles, RotateCcw, Play, Zap, Shield, Moon, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '@/lib/utils';

export const DiyaExperience: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const [litDiyas, setLitDiyas] = useState<boolean[]>(new Array(108).fill(false));
  const [isAutoLighting, setIsAutoLighting] = useState(false);

  const litCount = litDiyas.filter(Boolean).length;
  const isAllLit = litCount === 108;
  const progressPercent = Math.round((litCount / 108) * 100);

  const toggleDiya = (index: number) => {
    const updated = [...litDiyas];
    const willLight = !updated[index];
    updated[index] = willLight;
    setLitDiyas(updated.slice(0, 108));

    if (willLight) {
      audioSynth.playTempleBell();
    }
  };

  const lightAllDiyas = () => {
    if (isAutoLighting) return;
    setIsAutoLighting(true);

    let current = 0;
    const interval = setInterval(() => {
      if (current < 108) {
        const step = current;
        setLitDiyas((prev) => {
          const next = [...prev];
          if (step < 108) {
            next[step] = true;
          }
          return next.slice(0, 108);
        });

        if (step % 8 === 0) {
          audioSynth.playTempleBell();
        }

        current++;
      }

      if (current >= 108) {
        clearInterval(interval);
        setIsAutoLighting(false);
        audioSynth.playShankha(4.0);
        setTimeout(() => audioSynth.playTempleBell(1.2), 1200);

        confetti({
          particleCount: 150,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#E7C878', '#D4AA50', '#FFF8EA', '#A61B1B', '#F59F00'],
        });
      }
    }, 30);
  };

  const lightTenMore = () => {
    setLitDiyas((prev) => {
      const next = [...prev];
      let added = 0;
      for (let i = 0; i < 108 && added < 10; i++) {
        if (!next[i]) {
          next[i] = true;
          added++;
        }
      }
      return next;
    });
    audioSynth.playTempleBell();
  };

  const resetDiyas = () => {
    setLitDiyas(new Array(108).fill(false));
    setIsAutoLighting(false);
  };

  return (
    <div className="agomoni-card p-4 sm:p-8 md:p-10 border border-[#FFFDF8]/12 bg-[#1A1210]/95 backdrop-blur-2xl text-[#FFF8EA] relative overflow-hidden shadow-2xl space-y-6 sm:space-y-8">
      {/* 1. Header Info & Counter Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-[#FFFDF8]/10">
        <div className="text-center lg:text-left space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#241B18] border border-[#E7C878]/30 text-[11px] sm:text-xs text-[#E7C878] font-bold shadow-xs">
            <Flame className="w-3.5 h-3.5 text-[#E7C878]" />
            <span>
              {language === 'bn' ? 'সন্ধিপূজার ১০৮ প্রদীপ প্রজ্জ্বলন' : 'Sandhi Puja 108 Sacred Diyas'}
            </span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold font-serif text-[#E7C878] tracking-tight">
            {language === 'bn' ? '১০৮ মাটির প্রদীপে চামুণ্ডা আবাহন' : 'Invoke Maa Chamunda with 108 Diyas'}
          </h3>
          <p className="text-xs sm:text-sm text-[#FFF8EA]/75 max-w-xl font-sans">
            {language === 'bn'
              ? 'অষ্টমী ও নবমীর মিলনক্ষণে ৪৮ মিনিটের সন্ধিক্ষণে দেবী চামুণ্ডার উদ্দেশ্যে প্রতিটি প্রদীপ জ্বালিয়ে ভক্তি নিবেদন করুন।'
              : 'At the exact juncture of Ashtami and Navami, light 108 sacred earthen lamps to honor Devi Chamunda.'}
          </p>
        </div>

        {/* Lit Count Badge */}
        <div className="flex items-center gap-4 bg-[#120B09] p-3 sm:p-4 rounded-[22px] border border-[#E7C878]/35 shadow-inner flex-shrink-0">
          <div className="text-center px-2 sm:px-3">
            <span className="text-2xl sm:text-4xl font-extrabold font-serif text-[#FFF8EA] leading-none block">
              {language === 'bn' ? toBengaliNumeral(litCount) : litCount}
              <span className="text-xs sm:text-base text-[#E7C878]/70 font-normal"> / {language === 'bn' ? '১০৮' : '108'}</span>
            </span>
            <span className="text-[10px] text-[#E7C878] uppercase font-mono font-bold tracking-wider block mt-1">
              {language === 'bn' ? 'প্রজ্বলিত প্রদীপ' : 'Diyas Lit'}
            </span>
          </div>

          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#A61B1B]/40 border-2 border-[#E7C878] flex items-center justify-center text-[#E7C878] font-mono font-bold text-xs sm:text-sm shadow-xs">
            {progressPercent}%
          </div>
        </div>
      </div>

      {/* 2. Quick Action Controls */}
      <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-[20px] sm:rounded-[22px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10">
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={lightAllDiyas}
            disabled={isAutoLighting || isAllLit}
            className="apple-btn-primary flex-1 sm:flex-initial px-4 sm:px-5 py-2 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 shadow-xs"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>
              {isAutoLighting
                ? language === 'bn' ? 'প্রদীপ জ্বলছে...' : 'Lighting...'
                : language === 'bn' ? 'সমগ্র ১০৮ প্রদীপ' : 'Light All 108 Diyas'}
            </span>
          </button>

          <button
            type="button"
            onClick={lightTenMore}
            disabled={isAutoLighting || isAllLit}
            className="apple-btn-secondary flex-1 sm:flex-initial px-3 sm:px-4 py-2 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Zap className="w-3 h-3 text-[#E7C878]" />
            <span>{language === 'bn' ? '+১০টি জ্বালান' : '+10 Diyas'}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={resetDiyas}
          disabled={isAutoLighting || litCount === 0}
          className="apple-btn-secondary w-full sm:w-auto px-4 py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-30 active:scale-95 text-[#FFF8EA]/70 hover:text-[#FFF8EA]"
        >
          <RotateCcw className="w-3 h-3" />
          <span>{language === 'bn' ? 'পুনরায় শুরু করুন' : 'Reset All'}</span>
        </button>
      </div>

      {/* 3. The 108 Sacred Earthen Diya Grid */}
      <div className="p-3 sm:p-6 rounded-[22px] sm:rounded-[28px] bg-[#120B09] border-2 border-[#E7C878]/25 shadow-inner">
        <div className="grid grid-cols-6 sm:grid-cols-9 md:grid-cols-12 gap-1.5 sm:gap-2.5 md:gap-3">
          {litDiyas.map((isLit, index) => (
            <button
              key={index}
              type="button"
              onClick={() => toggleDiya(index)}
              title={language === 'bn' ? `প্রদীপ #${toBengaliNumeral(index + 1)}` : `Diya #${index + 1}`}
              className={cn(
                'relative aspect-square rounded-[12px] sm:rounded-[16px] md:rounded-[18px] flex flex-col items-center justify-center transition-all duration-300 cursor-pointer select-none group',
                isLit
                  ? 'bg-gradient-to-t from-[#741313] via-[#A61B1B] to-[#C99A3D] shadow-[0_0_15px_rgba(231,200,120,0.5)] border border-[#E7C878] scale-105'
                  : 'bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 hover:border-[#E7C878]/40 hover:bg-[#FFFDF8]/[0.08]'
              )}
            >
              {/* Flame or Unlit Wick Icon */}
              <div className="relative">
                {isLit ? (
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-5 h-5 rounded-full bg-[#E7C878]/30 blur-xs animate-ping" />
                    <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFFDF8] fill-[#E7C878] animate-bounce" />
                  </div>
                ) : (
                  <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFF8EA]/20 group-hover:text-[#E7C878]/60 transition-colors" />
                )}
              </div>

              {/* Number Label */}
              <span className={cn(
                'text-[8px] sm:text-[9px] font-mono font-bold mt-0.5 sm:mt-1 transition-colors',
                isLit ? 'text-[#FFFDF8]' : 'text-[#FFF8EA]/30 group-hover:text-[#E7C878]'
              )}>
                {language === 'bn' ? toBengaliNumeral(index + 1) : index + 1}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Sandhi Puja 48-Minute Window & Chamunda Lore Card */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center p-6 rounded-[24px] bg-[#FFFDF8]/[0.05] border border-[#E7C878]/25">
        <div className="md:col-span-8 space-y-2 text-left">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E7C878] uppercase tracking-wider font-mono">
            <Moon className="w-3.5 h-3.5 text-[#E7C878]" />
            <span>{language === 'bn' ? 'সন্ধিপূজার ৪৮ মিনিটের মাহেন্দ্রক্ষণ' : 'The Sacred 48-Minute Window'}</span>
          </div>

          <h4 className="text-lg sm:text-xl font-bold font-serif text-[#FFF8EA]">
            {language === 'bn'
              ? 'অষ্টমী ও নবমীর মিলনক্ষণে মা চামুণ্ডার আবির্ভাব'
              : 'The Auspicious Advent of Devi Chamunda'}
          </h4>

          <p className="text-xs sm:text-sm text-[#FFF8EA]/80 leading-relaxed font-sans">
            {language === 'bn'
              ? 'মহাষ্টমীর শেষ ২৪ মিনিট এবং মহানবমীর প্রথম ২৪ মিনিট—এই যুগলক্ষণ হলো দুর্গাপূজার পরম শক্তির মুহূর্ত। এই সময় দেবী চামুণ্ডারূপে চণ্ড ও মুণ্ডের বিনাশ করেন। ১০৮টি মাটির প্রদীপ ও ১০৮টি রক্তপদ্ম দিয়ে সন্ধিপূজা সুসম্পন্ন হয়।'
              : 'The last 24 minutes of Ashtami and the first 24 minutes of Navami constitute the pivotal Sandhi moment when Devi Durga assumes the fiercest Chamunda form to destroy the demons Chanda and Munda.'}
          </p>
        </div>

        <div className="md:col-span-4 p-4 rounded-[20px] bg-[#120B09] border border-[#E7C878]/30 text-center space-y-1.5 shadow-inner">
          <Award className="w-6 h-6 text-[#E7C878] mx-auto" />
          <span className="text-xs font-bold text-[#E7C878] block font-mono">
            {language === 'bn' ? '১০৮ পদ্ম ও প্রদীপের তাৎপর্য' : 'Significance of 108'}
          </span>
          <p className="text-[11px] text-[#FFF8EA]/70 leading-relaxed font-sans">
            {language === 'bn'
              ? '১০৮ সংখ্যাটি বিশ্বব্রহ্মাণ্ডের পূর্ণতা ও আত্মার অষ্টোত্তরশতনাম স্তোত্রের প্রতীক।'
              : 'Represents universal completeness and total surrender across the 108 cosmic realms.'}
          </p>
        </div>
      </div>
    </div>
  );
};
