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

const DAY_LABELS: Record<string, { bn: string; en: string }> = {
  mahalaya: { bn: 'মহালয়া', en: 'Mahalaya' },
  shashthi: { bn: 'মহাষষ্ঠী', en: 'Maha Shashthi' },
  saptami: { bn: 'মহাসপ্তমী', en: 'Maha Saptami' },
  ashtami: { bn: 'মহাঅষ্টমী', en: 'Maha Ashtami' },
  sandhi: { bn: 'সন্ধিপূজা', en: 'Sandhi Puja' },
  navami: { bn: 'মহানবমী', en: 'Maha Navami' },
  dashami: { bn: 'বিজয়া দশমী', en: 'Bijoya Dashami' },
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
    <div
      className={cn(
        'relative w-full rounded-full p-1 sm:p-1.5 bg-[#120B09]/60 backdrop-blur-xl border border-[#FFFDF8]/10 shadow-xl overflow-hidden group/nav select-none',
        className
      )}
    >
      {/* Scroll Track with Progressive Edge Mask */}
      <div
        ref={scrollContainerRef}
        className="w-full overflow-x-auto no-scrollbar py-1 px-4 sm:px-10 flex items-center justify-start lg:justify-center gap-2 sm:gap-3 scroll-smooth relative z-0"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 1.5%, rgba(0,0,0,0.8) 4%, black 8%, black 92%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.3) 98.5%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 1.5%, rgba(0,0,0,0.8) 4%, black 8%, black 92%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.3) 98.5%, transparent 100%)',
        }}
      >
        {PUJA_DAYS.map((day) => {
          const isSelected = selectedPujaDay === day.id;
          const label = DAY_LABELS[day.id] || {
            bn: day.nameBn,
            en: day.nameEn,
          };

          return (
            <button
              key={day.id}
              ref={isSelected ? activeBtnRef : null}
              type="button"
              onClick={(e) => {
                setSelectedPujaDay(day.id as PujaDayId);
                e.currentTarget.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
              className={cn(
                'relative flex-shrink-0 transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97]',
                'px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold font-serif whitespace-nowrap',
                isSelected
                  ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.02] z-10'
                  : 'bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.08]'
              )}
            >
              {isSelected && (
                <Sparkles className="w-3.5 h-3.5 text-[#E7C878] animate-pulse flex-shrink-0" />
              )}

              <span>{language === 'bn' ? label.bn : label.en}</span>
            </button>
          );
        })}
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
  );
};


