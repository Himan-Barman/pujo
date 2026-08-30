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
        'agomoni-card overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.12] cursor-pointer active:scale-[0.98]',
        className
      )}
    >
      <div className="flex flex-col flex-1">
        {/* Cover Image Banner with continuous squircle top */}
        <div className="relative w-full h-44 sm:h-56 overflow-hidden flex-shrink-0">
          <Image
            src={article.coverImage}
            alt={article.titleEn}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#241B18]/70 via-transparent to-transparent" />

          {/* Minimal Dark Capsule Reading Time Badge */}
          <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full bg-[#241B18]/85 border border-[#FFFDF8]/8 text-[10px] sm:text-[11px] text-[#FFF8EA] font-semibold flex items-center gap-1.5 backdrop-blur-md shadow-xs">
            <Clock className="w-3 h-3 text-[#C99A3D]" />
            <span>{article.readingTime}</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-4 sm:p-6 md:p-7 flex flex-col flex-1 justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full bg-[#241B18] text-[9.5px] sm:text-[10px] uppercase font-bold text-[#E7C878] tracking-wider mb-2 shadow-xs w-fit">
              <Sparkles className="w-3 h-3 text-[#C99A3D]" />
              <span>{article.category}</span>
            </div>

            <h3 className="text-lg sm:text-2xl font-bold font-serif text-[#E7C878] group-hover:text-[#FFF8EA] transition-colors mb-1.5 sm:mb-2 leading-tight sm:min-h-[3.2rem] flex items-start">
              {language === 'bn' ? article.titleBn : article.titleEn}
            </h3>

            <p className="text-xs text-[#E7C878]/90 font-semibold mb-2 sm:mb-3 sm:min-h-[2.5rem] line-clamp-2">
              {language === 'bn' ? article.subtitleBn : article.subtitleEn}
            </p>

            <p className="text-xs sm:text-sm text-[#FFF8EA]/75 leading-relaxed line-clamp-3 sm:line-clamp-4">
              {language === 'bn' ? article.introBn : article.introEn}
            </p>
          </div>
        </div>
      </div>

      {/* Apple-style Capsule Footer Action Link */}
      <div className="px-4 sm:px-7 pb-4 sm:pb-6 pt-1 sm:pt-2 mt-auto">
        <div className="w-full py-2.5 rounded-full bg-[#FFFDF8]/10 backdrop-blur-md group-hover:bg-[#A61B1B] border border-[#A61B1B] text-xs font-bold text-[#E7C878] group-hover:text-[#FFFDF8] flex items-center justify-center gap-2 transition-all shadow-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>
            {language === 'bn' ? 'সম্পূর্ণ নিবন্ধ পাঠ করুন' : 'Read Full Editorial'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
};
