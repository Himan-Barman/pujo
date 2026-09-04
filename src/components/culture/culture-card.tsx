'use client';

import React from 'react';
import Link from 'next/link';
import { CultureArticle } from '@/types/culture';
import { useUIStore } from '@/stores/ui-store';
import { BookOpen, Sparkles, Clock, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface CultureCardProps {
  article: CultureArticle;
  className?: string;
}

export const CultureCard: React.FC<CultureCardProps> = ({ article, className }) => {
  const language = useUIStore((state) => state.language);

  return (
    <Link
      href={`/culture/${article.slug}`}
      className={cn(
        'agomoni-card overflow-hidden transition-all duration-300 flex flex-row sm:flex-col justify-between h-auto sm:h-full group hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.12] cursor-pointer active:scale-[0.98] text-left p-2.5 sm:p-0 shadow-lg gap-3 sm:gap-0 rounded-[20px] sm:rounded-[28px]',
        className
      )}
    >
      {/* Cover Image: Left Thumbnail on Mobile, Full Top Banner on Desktop */}
      <div className="relative w-20 h-20 sm:w-full sm:h-56 rounded-xl sm:rounded-none overflow-hidden flex-shrink-0 self-center sm:self-auto bg-[#1A1210]">
        <Image
          src={article.coverImage}
          alt={article.titleEn}
          fill
          sizes="(max-width: 640px) 80px, (max-width: 768px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#241B18]/70 via-transparent to-transparent" />

        {/* Minimal Dark Capsule Reading Time Badge (Desktop) */}
        <div className="hidden sm:flex absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#241B18]/85 border border-[#FFFDF8]/8 text-[10px] sm:text-[11px] text-[#FFF8EA] font-semibold items-center gap-1.5 backdrop-blur-md shadow-xs">
          <Clock className="w-3 h-3 text-[#C99A3D]" />
          <span>{article.readingTime}</span>
        </div>
      </div>

      {/* Article Body */}
      <div className="flex flex-col flex-1 justify-center sm:justify-between p-0 sm:p-6 md:p-7 min-w-0">
        <div>
          {/* Mobile Meta Row */}
          <div className="flex sm:hidden items-center gap-2 mb-1 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-[#241B18] text-[9.5px] uppercase font-bold text-[#E7C878] border border-[#E7C878]/30">
              {article.category}
            </span>
            <span className="text-[10px] text-[#FFF8EA]/60 flex items-center gap-1 font-mono">
              <Clock className="w-2.5 h-2.5 text-[#E7C878]" />
              <span>{article.readingTime}</span>
            </span>
          </div>

          {/* Desktop Category Tag */}
          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#241B18] text-[9.5px] sm:text-[10px] uppercase font-bold text-[#E7C878] tracking-wider mb-2 shadow-xs w-fit">
            <Sparkles className="w-3 h-3 text-[#C99A3D]" />
            <span>{article.category}</span>
          </div>

          {/* Title */}
          <h3 className="text-sm sm:text-2xl font-bold font-serif text-[#E7C878] group-hover:text-[#FFF8EA] transition-colors leading-snug truncate sm:whitespace-normal sm:min-h-[3.2rem] flex items-center sm:items-start">
            {language === 'bn' ? article.titleBn : article.titleEn}
          </h3>

          {/* Subtitle */}
          <p className="text-[11px] sm:text-xs text-[#E7C878]/90 font-semibold truncate sm:whitespace-normal sm:min-h-[2.5rem] sm:line-clamp-2 mt-0.5 sm:mt-1">
            {language === 'bn' ? article.subtitleBn : article.subtitleEn}
          </p>

          {/* Desktop Intro */}
          <p className="hidden sm:block text-xs sm:text-sm text-[#FFF8EA]/75 leading-relaxed line-clamp-3 sm:line-clamp-4 mt-2">
            {language === 'bn' ? article.introBn : article.introEn}
          </p>
        </div>

        {/* Desktop Apple-style Capsule Footer Action Link */}
        <div className="hidden sm:block pt-4 sm:pt-6 mt-auto">
          <div className="w-full py-2.5 rounded-full bg-[#FFFDF8]/10 backdrop-blur-md group-hover:bg-[#A61B1B] border border-[#A61B1B] text-xs font-bold text-[#E7C878] group-hover:text-[#FFFDF8] flex items-center justify-center gap-2 transition-all shadow-xs">
            <BookOpen className="w-3.5 h-3.5" />
            <span>
              {language === 'bn' ? 'সম্পূর্ণ নিবন্ধ পাঠ করুন' : 'Read Full Editorial'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Mobile Right Arrow */}
      <div className="flex sm:hidden items-center justify-center pr-1 text-[#E7C878] flex-shrink-0 self-center">
        <div className="w-7 h-7 rounded-full bg-[#FFFDF8]/8 border border-[#FFFDF8]/12 flex items-center justify-center group-hover:bg-[#A61B1B] group-hover:text-[#FFFDF8] transition-colors">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
};
