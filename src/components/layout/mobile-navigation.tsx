'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/stores/ui-store';
import { MAIN_NAV_ITEMS } from '@/config/navigation';
import { PujaModeToggle } from '@/components/shared/puja-mode-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const language = useUIStore((state) => state.language);
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
  const isPujaMode = useUIStore((state) => state.isPujaMode);

  if (!isMobileMenuOpen) return null;

  return (
    <div className="fixed inset-0 z-50 xl:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Drawer */}
      <div
        className={cn(
          'relative ml-auto w-4/5 max-w-sm h-full p-6 flex flex-col justify-between shadow-2xl overflow-y-auto border-l transition-colors',
          isPujaMode
            ? 'bg-[#1A1210]/70 backdrop-blur-xl border-[#FFFDF8]/8 text-[#FFF8EA]'
            : 'bg-[#FFFDF8]/8 backdrop-blur-xl border-[#FFFDF8]/12 text-[#FFF8EA]'
        )}
      >
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-[#FFFDF8]/12">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src="/durga.png"
                  alt="Agomoni Durga Logo"
                  fill
                  sizes="40px"
                  className="object-contain filter drop-shadow-[0_2px_8px_rgba(231,200,120,0.5)]"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black font-serif leading-none bg-gradient-to-r from-[#FFF8EA] via-[#F3DE9C] to-[#E7C878] bg-clip-text text-transparent">
                  আগমনী
                </span>
                <span className="text-[8px] tracking-[0.24em] uppercase font-bold text-[#E7C878]/80 mt-0.5">
                  AGOMONI
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-1.5 rounded-full bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/12 text-[#FFF8EA] hover:text-[#E7C878]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Puja Mode & Language Toggles */}
          <div className="my-5 flex items-center justify-between gap-2">
            <PujaModeToggle className="flex-1 justify-center py-2" />
            <LanguageToggle />
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1">
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-between transition-colors',
                    isActive
                      ? 'bg-[#A61B1B] text-[#FFFDF8] font-bold shadow-xs'
                      : isPujaMode
                      ? 'text-[#C1ADA0] hover:bg-[#1A1210]/60 backdrop-blur-xl hover:text-[#FFF8EA]'
                      : 'text-[#FFF8EA]/70 hover:bg-[#FFFDF8]/8 backdrop-blur-md hover:text-[#E7C878]'
                  )}
                >
                  <span>{language === 'bn' ? item.titleBn : item.titleEn}</span>
                  {item.badgeBn && (
                    <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-[#C99A3D] text-[#FFF8EA]">
                      {language === 'bn' ? item.badgeBn : item.badgeEn}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info in drawer */}
        <div className="pt-6 border-t border-[#FFFDF8]/12 text-center text-xs text-[#FFF8EA]/50">
          <p className="font-serif text-[#E7C878] font-bold text-sm">
            {language === 'bn' ? '“আসছে বছর আবার হবে…”' : '“Asche Bochor Abar Hobe…”'}
          </p>
          <p className="mt-1 text-[10px]">
            {language === 'bn'
              ? 'আগমনী • শারদোৎসব ডিজিটাল মঞ্চ'
              : 'Agomoni • Sharodotsav Platform'}
          </p>
        </div>
      </div>
    </div>
  );
};
