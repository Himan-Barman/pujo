'use client';

import React from 'react';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SharePayload } from '@/stores/share-store';
import { useUIStore } from '@/stores/ui-store';

interface ShareCardPreviewProps {
  payload: SharePayload;
  className?: string;
}

export const ShareCardPreview: React.FC<ShareCardPreviewProps> = ({
  payload,
  className,
}) => {
  const language = useUIStore((state) => state.language);
  const isBn = language === 'bn';

  const title = isBn ? payload.titleBn : payload.titleEn || payload.titleBn;
  const description = isBn
    ? payload.descriptionBn
    : payload.descriptionEn || payload.descriptionBn;
  const category = isBn
    ? payload.categoryBn
    : payload.categoryEn || payload.categoryBn;
  const tag = isBn ? payload.tagBn : payload.tagEn;
  const quote = isBn ? payload.customQuoteBn : payload.customQuoteEn;

  return (
    <div
      className={cn(
        'relative w-full rounded-[24px] sm:rounded-[28px] overflow-hidden bg-gradient-to-br from-[#1C120F] via-[#120B09] to-[#1A0E0B] border-2 border-[#E7C878]/35 shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,253,248,0.12)] p-4 sm:p-6 flex flex-col justify-between select-none',
        className
      )}
    >
      {/* Sacred Ambient Backlight Glows */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-[#A61B1B]/15 rounded-full blur-3xl pointer-events-none -mr-12 -mt-12" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#C99A3D]/12 rounded-full blur-3xl pointer-events-none -ml-12 -mb-12" />

      {/* Traditional Alpona Corner Accents */}
      <div className="absolute top-2.5 left-2.5 pointer-events-none opacity-40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 2H12M2 2V12M2 2L8 8" stroke="#E7C878" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute top-2.5 right-2.5 pointer-events-none opacity-40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 2H12M22 2V12M22 2L16 8" stroke="#E7C878" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-2.5 left-2.5 pointer-events-none opacity-40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M2 22H12M2 22V12M2 22L8 16" stroke="#E7C878" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      <div className="absolute bottom-2.5 right-2.5 pointer-events-none opacity-40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M22 22H12M22 22V12M22 22L16 16" stroke="#E7C878" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>

      {/* 1. Top Brand Header Bar */}
      <div className="relative z-10 flex items-center justify-between gap-3 border-b border-[#FFFDF8]/10 pb-3 sm:pb-3.5 mb-3.5 sm:mb-4">
        {/* Brand Emblem */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1A1210] border border-[#E7C878]/40 flex items-center justify-center shadow-xs">
            <span className="text-base leading-none">🪔</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold font-serif text-[#FFF8EA] tracking-wide">
                {isBn ? 'আগমনী' : 'AGOMONI'}
              </span>
              <span className="text-[10px] text-[#E7C878]/70 font-serif">✦</span>
              <span className="text-[10px] text-[#E7C878] font-bold tracking-wider uppercase">
                {isBn ? 'শারদোৎসব' : 'Sharodotsav'}
              </span>
            </div>
            <p className="text-[9px] sm:text-[10px] text-[#FFF8EA]/60 font-sans leading-none">
              {isBn ? 'যেখানে জীবন্ত হয়ে ওঠেন মা দুর্গা' : 'Where Maa Comes Alive'}
            </p>
          </div>
        </div>

        {/* Category / Tag Badge */}
        {category && (
          <div className="px-2.5 sm:px-3 py-1 rounded-full bg-[#A61B1B]/35 border border-[#E7C878]/30 flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3 h-3 text-[#E7C878] flex-shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-[#FFF8EA] whitespace-nowrap">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* 2. Main Central Content */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-12 gap-3.5 sm:gap-4 items-center my-auto">
        {/* Left / Top Text Area */}
        <div className={cn(payload.image ? 'sm:col-span-7' : 'sm:col-span-12', 'space-y-2 sm:space-y-2.5')}>
          {tag && (
            <span className="inline-block text-[10px] sm:text-xs font-semibold tracking-wider text-[#E7C878] uppercase">
              {tag}
            </span>
          )}

          <h3 className="text-lg sm:text-2xl font-black font-serif text-[#FFF8EA] leading-snug tracking-tight">
            {title}
          </h3>

          <p className="text-xs sm:text-sm text-[#FFF8EA]/75 font-sans leading-relaxed line-clamp-3">
            {description}
          </p>

          {quote && (
            <p className="text-xs font-serif italic text-[#E7C878] border-l-2 border-[#E7C878]/50 pl-2.5 pt-0.5">
              “{quote}”
            </p>
          )}
        </div>

        {/* Right Visual Image Showcase (When Available) */}
        {payload.image && (
          <div className="sm:col-span-5 relative w-full h-32 sm:h-36 rounded-[18px] sm:rounded-[20px] overflow-hidden border-2 border-[#E7C878]/35 bg-[#140D0B] shadow-lg group">
            <Image
              src={payload.image}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, 240px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B09]/80 via-transparent to-transparent" />
            <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-[#120B09]/80 backdrop-blur-md border border-[#FFFDF8]/15 text-[9px] text-[#E7C878] font-bold">
              Agomoni
            </div>
          </div>
        )}
      </div>

      {/* 3. Understated Footer Bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 border-t border-[#FFFDF8]/10 pt-2.5 sm:pt-3 mt-3.5 sm:mt-4 text-[10px] sm:text-xs text-[#FFF8EA]/60 font-sans">
        <div className="flex items-center gap-1.5 text-[#E7C878]/90 font-mono">
          <span>agomoni.vercel.app</span>
        </div>
        <div className="text-right font-serif text-[#FFF8EA]/75 text-[10px] sm:text-[11px]">
          {isBn ? 'বাঙালির শারদোৎসবের ডিজিটাল তীর্থ' : 'Experience Durga Puja Digitally'}
        </div>
      </div>
    </div>
  );
};
