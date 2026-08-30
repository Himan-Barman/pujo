'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/stores/ui-store';
import { PRIMARY_NAV_ITEMS, MORE_NAV_ITEMS } from '@/config/navigation';
import { PujaModeToggle } from '@/components/shared/puja-mode-toggle';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { cn } from '@/lib/utils';
import { X, Home, Calendar, Radio, Heart, BookOpen, Utensils, Image as ImageIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const language = useUIStore((state) => state.language);
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
  const isPujaMode = useUIStore((state) => state.isPujaMode);

  // Lock body scroll smoothly when mobile drawer is open
  React.useEffect(() => {
    if (isMobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

  const getNavIcon = (href: string) => {
    switch (href) {
      case '/':
        return <Home className="w-4 h-4 text-[#E7C878]" />;
      case '/calendar':
        return <Calendar className="w-4 h-4 text-[#C99A3D]" />;
      case '/songs':
        return <Radio className="w-4 h-4 text-[#F59F00]" />;
      case '/anjali':
        return <Sparkles className="w-4 h-4 text-[#E7C878]" />;
      case '/culture':
        return <BookOpen className="w-4 h-4 text-[#5EB876]" />;
      case '/bhog':
        return <Utensils className="w-4 h-4 text-[#C99A3D]" />;
      case '/gallery':
        return <ImageIcon className="w-4 h-4 text-[#38BDF8]" />;
      case '/bijoya':
        return <Heart className="w-4 h-4 text-[#F43F5E]" />;
      default:
        return <span className="text-xs">✦</span>;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Slide-in Drawer */}
          <motion.div
            initial={{ x: '100%', opacity: 0.8 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{
              type: 'spring',
              stiffness: 280,
              damping: 32,
              mass: 0.8,
            }}
            className={cn(
              'relative ml-auto w-[85%] max-w-sm h-full p-5 sm:p-6 flex flex-col justify-between shadow-2xl overflow-y-auto border-l overscroll-contain z-10',
              isPujaMode
                ? 'bg-[#120B09] border-[#E7C878]/30 text-[#FFF8EA]'
                : 'bg-[#160E0C]/98 backdrop-blur-3xl border-[#E7C878]/25 text-[#FFF8EA]'
            )}
          >
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#FFFDF8]/12">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 relative flex-shrink-0">
                    <Image
                      src="/durga.png"
                      alt="Agomoni Durga Logo"
                      fill
                      sizes="36px"
                      className="object-contain filter drop-shadow-[0_2px_8px_rgba(231,200,120,0.6)]"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xl font-black font-serif leading-none bg-gradient-to-r from-[#FFF8EA] via-[#F3DE9C] to-[#E7C878] bg-clip-text text-transparent">
                      আগমনী
                    </span>
                    <span className="text-[7.5px] tracking-[0.24em] uppercase font-bold text-[#E7C878]/80 mt-0.5">
                      AGOMONI
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-[#FFFDF8]/8 border border-[#FFFDF8]/12 text-[#FFF8EA] hover:text-[#E7C878] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Quick Language Switcher & Ceremonial Mode */}
              <div className="p-3 rounded-2xl bg-[#1A1210] border border-[#FFFDF8]/12 shadow-inner space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-[#E7C878] font-serif">
                    {language === 'bn' ? 'ভাষা নির্বাচন' : 'Language'}
                  </span>
                  <LanguageToggle />
                </div>
                <div className="pt-2 border-t border-[#FFFDF8]/8 flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold text-[#FFF8EA]/75 font-sans">
                    {language === 'bn' ? 'পূজা মোড' : 'Puja Mode'}
                  </span>
                  <PujaModeToggle />
                </div>
              </div>

              {/* Core Primary Navigation Links */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-[#E7C878]/70 uppercase tracking-wider font-mono block px-2">
                  {language === 'bn' ? 'মূল বিভাগসমূহ' : 'Main Sections'}
                </span>
                <nav className="flex flex-col gap-1">
                  {PRIMARY_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.98]',
                          isActive
                            ? 'bg-[#A61B1B] text-[#FFFDF8] font-bold shadow-md border border-[#E7C878]/40'
                            : 'text-[#FFF8EA]/80 hover:bg-[#FFFDF8]/8 hover:text-[#E7C878]'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {getNavIcon(item.href)}
                          <span>{language === 'bn' ? item.titleBn : item.titleEn}</span>
                        </div>
                        {item.badgeBn && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#C99A3D] text-[#FFF8EA]">
                            {language === 'bn' ? item.badgeBn : item.badgeEn}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* More Cultural & Heritage Links */}
              <div className="space-y-1.5 pt-2 border-t border-[#FFFDF8]/10">
                <span className="text-[10px] font-bold text-[#E7C878]/70 uppercase tracking-wider font-mono block px-2">
                  {language === 'bn' ? 'সাংস্কৃতিক বৈশিষ্ট্য' : 'Cultural Highlights'}
                </span>
                <nav className="flex flex-col gap-1">
                  {MORE_NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm flex items-center justify-between transition-all duration-200 cursor-pointer active:scale-[0.98]',
                          isActive
                            ? 'bg-[#A61B1B] text-[#FFFDF8] font-bold shadow-md border border-[#E7C878]/40'
                            : 'text-[#FFF8EA]/80 hover:bg-[#FFFDF8]/8 hover:text-[#E7C878]'
                        )}
                      >
                        <div className="flex items-center gap-2.5">
                          {getNavIcon(item.href)}
                          <div className="flex flex-col">
                            <span>{language === 'bn' ? item.titleBn : item.titleEn}</span>
                            {item.subtitleBn && (
                              <span className="text-[10px] text-[#FFF8EA]/50 font-normal truncate max-w-[170px]">
                                {language === 'bn' ? item.subtitleBn : item.subtitleEn}
                              </span>
                            )}
                          </div>
                        </div>
                        {item.badgeBn && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#C99A3D] text-[#FFF8EA]">
                            {language === 'bn' ? item.badgeBn : item.badgeEn}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Footer info in drawer */}
            <div className="pt-5 mt-6 border-t border-[#FFFDF8]/12 text-center text-xs text-[#FFF8EA]/50">
              <p className="font-serif text-[#E7C878] font-bold text-sm">
                {language === 'bn' ? '“আসছে বছর আবার হবে…”' : '“Asche Bochor Abar Hobe…”'}
              </p>
              <p className="mt-1 text-[10px] text-[#FFF8EA]/60">
                {language === 'bn'
                  ? 'আগমনী • শারদোৎসব ডিজিটাল প্ল্যাটফর্ম'
                  : 'Agomoni • Sharodotsav Platform'}
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
