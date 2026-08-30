'use client';

import React from 'react';
import { Ritual } from '@/types/puja';
import { useUIStore } from '@/stores/ui-store';
import { Clock, Layers, Sparkles, Scroll, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RitualCardProps {
  ritual: Ritual;
  className?: string;
}

export const RitualCard: React.FC<RitualCardProps> = ({ ritual, className }) => {
  const language = useUIStore((state) => state.language);

  return (
    <div
      className={cn(
        'agomoni-card p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between border-2 border-[#E7C878]/30 bg-gradient-to-b from-[#1C120F] to-[#120B09] shadow-2xl space-y-6 hover:border-[#E7C878]/50 transition-all duration-300',
        className
      )}
    >
      {/* 1. Header: Timing Badge & Tithi */}
      <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#FFFDF8]/10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#120B09] border border-[#E7C878]/40 text-xs sm:text-sm text-[#E7C878] font-mono font-bold shadow-xs">
          <Clock className="w-3.5 h-3.5 text-[#E7C878]" />
          <span>{language === 'bn' ? ritual.timeBn : ritual.timeEn}</span>
        </div>

        <span className="text-xs text-[#E7C878]/80 uppercase tracking-wider font-semibold font-mono px-3 py-1 rounded-full bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10">
          {language === 'bn' ? ritual.tithiBn : ritual.tithiEn}
        </span>
      </div>

      {/* 2. Main Title & Short Description */}
      <div className="space-y-2">
        <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#FFF8EA] leading-snug tracking-normal">
          {language === 'bn' ? ritual.titleBn : ritual.titleEn}
        </h3>

        <p className="text-sm sm:text-base text-[#FFF8EA]/85 leading-relaxed font-sans">
          {language === 'bn' ? ritual.shortDescBn : ritual.shortDescEn}
        </p>
      </div>

      {/* 3. Full Lore & Significance Box */}
      <div className="p-4 sm:p-5 rounded-[22px] bg-[#FFFDF8]/[0.04] border border-[#FFFDF8]/10 space-y-1.5 shadow-xs">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#E7C878] uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#E7C878]" />
          <span>{language === 'bn' ? 'আচারের বিস্তারিত তাৎপর্য ও বিধি' : 'Ritual Significance & Lore'}</span>
        </div>
        <p className="text-sm text-[#FFF8EA]/95 leading-relaxed font-sans pt-1">
          {language === 'bn' ? ritual.fullDescBn : ritual.fullDescEn}
        </p>
      </div>

      {/* 4. Sacred Mantra Box (Permanently Visible) */}
      {ritual.mantraPreviewBn && (
        <div className="p-5 rounded-[22px] bg-[#120B09] border-2 border-[#E7C878]/35 text-center space-y-2 shadow-inner">
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#E7C878] font-bold uppercase tracking-widest font-mono">
            <Scroll className="w-3.5 h-3.5 text-[#E7C878]" />
            <span>{language === 'bn' ? 'সংশ্লিষ্ট শাস্ত্রীয় মন্ত্র' : 'Sacred Shloka / Mantra'}</span>
          </div>
          <p className="text-sm sm:text-base font-mono text-[#E7C878] font-bold leading-relaxed">
            {language === 'bn' ? ritual.mantraPreviewBn : ritual.mantraPreviewEn}
          </p>
        </div>
      )}

      {/* 5. Spiritual Essence Quote */}
      {ritual.significanceBn && (
        <div className="p-4 rounded-[18px] bg-[#FFFDF8]/[0.04] border border-[#E7C878]/25 flex items-center gap-2.5 text-xs sm:text-sm text-[#FFF8EA]/90 font-medium">
          <HeartHandshake className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
          <span>
            <strong className="text-[#E7C878]">{language === 'bn' ? 'ভাবার্থ: ' : 'Essence: '}</strong>
            {language === 'bn' ? ritual.significanceBn : ritual.significanceEn}
          </span>
        </div>
      )}

      {/* 6. Required Items (উপকরণ) - Structured Premium Grid */}
      {ritual.itemsNeededBn && ritual.itemsNeededBn.length > 0 && (
        <div className="p-4 sm:p-5 rounded-[22px] bg-[#FFFDF8]/[0.04] border border-[#FFFDF8]/10 space-y-3 shadow-xs">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#FFFDF8]/8">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#E7C878] uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-[#E7C878]" />
              <span>{language === 'bn' ? 'প্রয়োজনীয় পূজার উপচার ও উপকরণ' : 'Items Required'}</span>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#E7C878] px-2.5 py-0.5 rounded-full bg-[#120B09] border border-[#E7C878]/30 shadow-xs">
              {language === 'bn' ? `${ritual.itemsNeededBn.length}টি উপকরণ` : `${ritual.itemsNeededBn.length} items`}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {(language === 'bn' ? ritual.itemsNeededBn : ritual.itemsNeededEn).map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-[16px] bg-[#120B09]/90 border border-[#E7C878]/25 hover:border-[#E7C878]/50 transition-all flex items-center gap-3 shadow-2xs"
              >
                <span className="w-6 h-6 rounded-full bg-[#E7C878]/15 text-[#E7C878] text-xs font-mono font-bold flex items-center justify-center flex-shrink-0">
                  {idx + 1}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#FFF8EA] font-sans leading-snug">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
