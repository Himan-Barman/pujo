'use client';

import React, { useEffect, useRef } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { PUJA_DAYS } from '@/data/puja-days';
import { PujaDayId } from '@/types/puja';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

interface PujaDaySelectorProps {
  className?: string;
}

const DAY_LABELS: Record<string, { bn: string; en: string; fullDateBn: string; fullDateEn: string; tithiOnlyBn: string; tithiOnlyEn: string }> = {
  mahalaya: { bn: 'মহালয়া', en: 'Mahalaya', fullDateBn: '১০ অক্টোবর', fullDateEn: '10 October', tithiOnlyBn: 'অমাবস্যা তিথি', tithiOnlyEn: 'Amavasya Tithi' },
  shashthi: { bn: 'মহা ষষ্ঠী', en: 'Maha Shashthi', fullDateBn: '১৬ অক্টোবর', fullDateEn: '16 October', tithiOnlyBn: 'ষষ্ঠী তিথি', tithiOnlyEn: 'Shashthi Tithi' },
  saptami: { bn: 'মহা সপ্তমী', en: 'Maha Saptami', fullDateBn: '১৭ অক্টোবর', fullDateEn: '17 October', tithiOnlyBn: 'সপ্তমী তিথি', tithiOnlyEn: 'Saptami Tithi' },
  ashtami: { bn: 'মহা অষ্টমী', en: 'Maha Ashtami', fullDateBn: '১৮ অক্টোবর', fullDateEn: '18 October', tithiOnlyBn: 'অষ্টমী তিথি', tithiOnlyEn: 'Ashtami Tithi' },
  sandhi: { bn: 'মহা সন্ধিপূজা', en: 'Sandhi Puja', fullDateBn: '১৮ অক্টোবর (রাত)', fullDateEn: '18 October (Night)', tithiOnlyBn: 'সন্ধি তিথি', tithiOnlyEn: 'Sandhi Tithi' },
  navami: { bn: 'মহা নবমী', en: 'Maha Navami', fullDateBn: '১৯ অক্টোবর', fullDateEn: '19 October', tithiOnlyBn: 'নবমী তিথি', tithiOnlyEn: 'Navami Tithi' },
  dashami: { bn: 'বিজয়া দশমী', en: 'Bijoya Dashami', fullDateBn: '২০ অক্টোবর', fullDateEn: '20 October', tithiOnlyBn: 'দশমী তিথি', tithiOnlyEn: 'Dashami Tithi' },
};

export const PujaDaySelector: React.FC<PujaDaySelectorProps> = ({ className }) => {
  const selectedPujaDay = useUIStore((state) => state.selectedPujaDay);
  const setSelectedPujaDay = useUIStore((state) => state.setSelectedPujaDay);
  const language = useUIStore((state) => state.language);
  const activeBtnRef = useRef<HTMLButtonElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll the selected day pill into center view smoothly
  useEffect(() => {
    if (activeBtnRef.current && scrollContainerRef.current) {
      activeBtnRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [selectedPujaDay]);

  return (
    <div className={cn('w-full select-none', className)}>
      {/* Horizontal Day Selector with Clean Tithi Only */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto no-scrollbar py-2 px-1 flex items-center justify-start lg:justify-center gap-2.5 sm:gap-3.5 scroll-smooth"
      >
        {PUJA_DAYS.map((day) => {
          const isSelected = selectedPujaDay === day.id;
          const label = DAY_LABELS[day.id] || {
            bn: day.nameBn,
            en: day.nameEn,
            fullDateBn: day.dateBn || day.date,
            fullDateEn: day.dateEn || day.date,
            tithiOnlyBn: day.tithiBn,
            tithiOnlyEn: day.tithiEn,
          };

          return (
            <button
              key={day.id}
              ref={isSelected ? activeBtnRef : null}
              type="button"
              onClick={() => setSelectedPujaDay(day.id as PujaDayId)}
              className={cn(
                'relative flex-shrink-0 transition-all duration-300 text-left flex flex-col justify-between cursor-pointer select-none active:scale-[0.97]',
                'px-4 py-2.5 rounded-full sm:rounded-[22px] sm:px-5 sm:py-3.5 min-w-0 sm:min-w-[160px] border',
                isSelected
                  ? 'bg-gradient-to-b from-[#A61B1B] to-[#6E1111] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.03] z-10'
                  : 'bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA] hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.08]'
              )}
            >
              {/* Top Row: Full Month Date Pill & Active Glow (Hidden on mobile) */}
              <div className="hidden sm:flex items-center justify-between gap-1.5 mb-1.5">
                <span
                  className={cn(
                    'text-[10px] sm:text-[11px] font-bold font-mono px-2.5 py-0.5 rounded-full whitespace-nowrap',
                    isSelected
                      ? 'bg-[#120B09]/80 text-[#E7C878] border border-[#E7C878]/40 shadow-xs'
                      : 'bg-[#FFFDF8]/[0.06] text-[#FFF8EA]/70'
                  )}
                >
                  {language === 'bn' ? label.fullDateBn : label.fullDateEn}
                </span>

                {isSelected && (
                  <Sparkles className="w-3.5 h-3.5 text-[#E7C878] animate-pulse" />
                )}
              </div>

              {/* Day Title (Always visible, clean and prominent) */}
              <span
                className={cn(
                  'text-xs sm:text-base font-bold font-serif leading-snug tracking-normal block whitespace-nowrap sm:whitespace-normal truncate',
                  isSelected ? 'text-[#FFFDF8]' : 'text-[#E7C878] group-hover:text-[#FFF8EA]'
                )}
              >
                {language === 'bn' ? label.bn : label.en}
              </span>

              {/* Tithi Only Subtitle (Hidden on mobile) */}
              <span
                className={cn(
                  'hidden sm:block text-[10px] sm:text-[11px] mt-1 line-clamp-1 font-sans font-semibold tracking-wide',
                  isSelected ? 'text-[#FFFDF8]/90' : 'text-[#FFF8EA]/60'
                )}
              >
                {language === 'bn' ? label.tithiOnlyBn : label.tithiOnlyEn}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

