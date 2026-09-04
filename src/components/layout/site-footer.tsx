'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/stores/ui-store';
import { BengaliPattern } from '@/components/shared/bengali-pattern';
import { MAIN_NAV_ITEMS } from '@/config/navigation';
import { cn } from '@/lib/utils';

export const SiteFooter: React.FC = () => {
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const language = useUIStore((state) => state.language);

  return (
    <footer
      className={cn(
        'relative bg-[#1A1210]/60 backdrop-blur-2xl text-[#FFF8EA] pt-12 pb-24 sm:pt-16 sm:pb-24 overflow-hidden border-t border-[#FFFDF8]/10',
        !isHomePage && 'hidden sm:block'
      )}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          {/* Authentic Clean Agomoni Logo Emblem (Bilingual) */}
          <div className="h-16 sm:h-20 w-48 sm:w-60 relative mx-auto mb-3 sm:mb-4">
            <Image
              src={language === 'bn' ? '/images/logo/agomoni-logo-bn.jpg' : '/images/logo/agomoni-logo-en.jpg'}
              alt={language === 'bn' ? 'আগমনী — শারদোৎসব' : 'Agomoni — Sharodotsav'}
              fill
              sizes="(max-width: 640px) 190px, 240px"
              className="object-contain"
            />
          </div>
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#E7C878] mt-1 font-bold">
            {language === 'bn'
              ? 'আগমনী • শারদোৎসবের ডিজিটাল মিলনমেলা'
              : 'AGOMONI • A Digital Celebration of Durga Puja'}
          </p>
          <p className="text-xs sm:text-sm text-[#E9D8C6] mt-2 sm:mt-3 leading-relaxed">
            {language === 'bn'
              ? 'যেখানে জীবন্ত হয়ে ওঠেন মা দুর্গা। শারদোৎসবের ভক্তি, ঐতিহ্য, সুর ও পবিত্র মিলনমেলা।'
              : 'Where Maa Comes Alive. A digital autumn in Bengal celebrating devotion, sacred rituals, music, and heritage.'}
          </p>
          <div className="w-20 sm:w-24 h-[1px] bg-[#8C4C3F] mx-auto my-4 sm:my-6" />
        </div>

        {/* Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-6 text-center sm:text-left mb-8 sm:mb-12 border-b border-[#8C4C3F]/60 pb-8 sm:pb-12">
          {MAIN_NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs sm:text-sm text-[#E9D8C6] hover:text-[#E7C878] transition-colors py-1 flex items-center gap-1.5 justify-center sm:justify-start"
            >
              <span className="text-[10px] sm:text-xs text-[#C99A3D]">❖</span>
              <span>{language === 'bn' ? item.titleBn : item.titleEn}</span>
            </Link>
          ))}
        </div>

        {/* Bottom Farewell Message */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[11px] sm:text-xs text-[#E9D8C6]/80 text-center sm:text-left">
          <p>
            {language === 'bn'
              ? `© ${new Date().getFullYear()} আগমনী। সর্বস্বত্ব সংরক্ষিত।`
              : `© ${new Date().getFullYear()} Agomoni. All cultural rights reserved.`}
          </p>
          <div className="flex items-center gap-2 text-[#E7C878] font-serif text-sm sm:text-base font-bold">
            <span>{language === 'bn' ? '“আসছে বছর আবার হবে…”' : '“Asche Bochor Abar Hobe…”'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
