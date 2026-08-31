'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/stores/ui-store';
import { PRIMARY_NAV_ITEMS, MORE_NAV_ITEMS } from '@/config/navigation';
import { LanguageToggle } from '@/components/shared/language-toggle';
import { PujaModeToggle } from '@/components/shared/puja-mode-toggle';
import { Menu, X, ChevronDown, BookOpen, Utensils, Image as ImageIcon, Heart, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const language = useUIStore((state) => state.language);
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const setMobileMenuOpen = useUIStore((state) => state.setMobileMenuOpen);
  const isPujaMode = useUIStore((state) => state.isPujaMode);

  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getMoreIcon = (name?: string) => {
    switch (name) {
      case 'BookOpen':
        return <BookOpen className="w-4 h-4 text-[#E7C878]" />;
      case 'Utensils':
        return <Utensils className="w-4 h-4 text-[#C99A3D]" />;
      case 'Image':
        return <ImageIcon className="w-4 h-4 text-[#5EB876]" />;
      case 'Heart':
        return <Heart className="w-4 h-4 text-[#D95757]" />;
      case 'Bot':
        return <Bot className="w-4 h-4 text-[#E7C878]" />;
      default:
        return <span className="text-sm">❖</span>;
    }
  };

  const activeMoreItem = MORE_NAV_ITEMS.find((item) =>
    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
  );
  const isMoreActive = !!activeMoreItem;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 w-full transition-all duration-300 border-b backdrop-blur-2xl shadow-[0_4px_25px_rgba(0,0,0,0.55)]',
        isPujaMode
          ? 'bg-[#171A1B]/95 border-[#4A3B34] text-[#FFF8EA]'
          : 'bg-[#140D0B]/90 border-[#FFFDF8]/10 text-[#FFF8EA]'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo with authentic Agomoni Calligraphic Emblem */}
        <Link
          href="/"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A3D] rounded-2xl p-0.5 transition-transform duration-200 active:scale-[0.96]"
        >
          {/* Authentic High-Res Sacred Emblem */}
          <div className="h-11 sm:h-12 w-32 sm:w-40 relative flex-shrink-0 group-hover:scale-[1.03] transition-all duration-300">
            <Image
              src="/images/logo/agomoni-logo.jpg"
              alt="আগমনী — Agomoni Sharodotsav"
              fill
              priority
              sizes="(max-width: 640px) 130px, 160px"
              className="object-contain filter drop-shadow-[0_2px_14px_rgba(201,154,61,0.45)] group-hover:drop-shadow-[0_4px_20px_rgba(201,154,61,0.7)] transition-all duration-300 rounded-xl"
            />
          </div>
        </Link>

        {/* Desktop Apple-style Capsule Navigation with Sliding Pill Animation */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-[#FFFDF8]/8 backdrop-blur-xl border border-[#FFFDF8]/12 shadow-xs relative">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const isDirectActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
            const isCurrentActive = isDirectActive && !isMoreOpen && !isMoreActive;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'relative px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-1.5 text-xs sm:text-sm font-bold z-10 select-none active:scale-[0.97]',
                  isCurrentActive
                    ? 'text-[#FFFDF8]'
                    : isPujaMode
                    ? 'text-[#C1ADA0] hover:text-[#FFF8EA]'
                    : 'text-[#FFF8EA]/60 hover:text-[#FFF8EA]'
                )}
              >
                {/* Sliding Animated Active Capsule */}
                {isCurrentActive && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-[#A61B1B] rounded-full shadow-xs -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                    }}
                  />
                )}

                <span>{language === 'bn' ? item.titleBn : item.titleEn}</span>
                {item.badgeBn && (
                  <span
                    className={cn(
                      'px-1.5 py-0.2 rounded-full text-[9px] font-extrabold transition-colors',
                      isCurrentActive ? 'bg-[#FFFDF8] text-[#A61B1B]' : 'bg-[#A61B1B] text-white'
                    )}
                  >
                    {language === 'bn' ? item.badgeBn : item.badgeEn}
                  </span>
                )}
              </Link>
            );
          })}

          {/* "আরও" / Selected Dropdown Option with Moving Pill Support */}
          <div className="relative z-10" ref={moreRef}>
            <button
              type="button"
              onClick={() => setIsMoreOpen(!isMoreOpen)}
              className={cn(
                'relative px-4 py-2 rounded-full transition-colors duration-200 flex items-center gap-1.5 text-xs sm:text-sm font-bold cursor-pointer select-none active:scale-[0.97]',
                isMoreActive
                  ? 'text-[#FFFDF8]'
                  : isMoreOpen
                  ? 'text-[#FFF8EA]'
                  : isPujaMode
                  ? 'text-[#C1ADA0] hover:text-[#FFF8EA]'
                  : 'text-[#FFF8EA]/60 hover:text-[#FFF8EA]'
              )}
            >
              {isMoreActive && (
                <motion.div
                  layoutId="navbar-active-pill"
                  className="absolute inset-0 bg-[#A61B1B] rounded-full shadow-xs -z-10"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 32,
                  }}
                />
              )}

              {isMoreOpen && !isMoreActive && (
                <motion.div
                  layoutId="navbar-active-pill"
                  className="absolute inset-0 bg-[#241B18] rounded-full shadow-xs -z-10"
                  transition={{
                    type: 'spring',
                    stiffness: 420,
                    damping: 32,
                  }}
                />
              )}

              <span>
                {activeMoreItem
                  ? (language === 'bn' ? activeMoreItem.titleBn : activeMoreItem.titleEn)
                  : (language === 'bn' ? 'আরও' : 'More')}
              </span>

              {activeMoreItem?.badgeBn && (
                <span
                  className={cn(
                    'px-1.5 py-0.2 rounded-full text-[9px] font-extrabold transition-colors',
                    isMoreActive ? 'bg-[#FFFDF8] text-[#A61B1B]' : 'bg-[#A61B1B] text-white'
                  )}
                >
                  {language === 'bn' ? activeMoreItem.badgeBn : activeMoreItem.badgeEn}
                </span>
              )}

              <ChevronDown
                className={cn(
                  'w-3.5 h-3.5 transition-transform duration-200',
                  isMoreOpen && 'rotate-180',
                  isMoreActive && 'text-[#FFFDF8]'
                )}
              />
            </button>

            {/* Solid Static Color Dropdown Menu Card */}
            <AnimatePresence>
              {isMoreOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: -6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="absolute right-0 mt-3 w-80 rounded-[30px] bg-[#120B09] border-2 border-[#E7C878]/35 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.92)] z-50 origin-top-right"
                >
                  <div className="px-4 py-2 text-[11px] uppercase font-bold text-[#E7C878] tracking-wider border-b border-[#FFFDF8]/12 mb-2 flex items-center justify-between">
                    <span>{language === 'bn' ? 'অন্যান্য সেবা ও ঐতিহ্য' : 'More Experiences'}</span>
                    <span className="text-[9px] text-[#E7C878]/60 font-mono">✦</span>
                  </div>

                  <div className="space-y-1.5">
                    {MORE_NAV_ITEMS.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMoreOpen(false)}
                          className={cn(
                            'p-3 rounded-[22px] flex items-center gap-3.5 transition-all duration-150 text-left group active:scale-[0.98]',
                            isActive
                              ? 'bg-gradient-to-r from-[#A61B1B]/40 to-[#741313]/30 border border-[#E7C878]/45 text-[#FFFDF8] shadow-xs'
                              : 'hover:bg-[#FFFDF8]/[0.08] hover:border-[#E7C878]/30 border border-transparent text-[#FFF8EA]'
                          )}
                        >
                          <div className="w-10 h-10 rounded-[16px] bg-[#1C120F] border border-[#E7C878]/25 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-[#E7C878]/50 transition-all shadow-xs">
                            {getMoreIcon(item.iconName)}
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-1">
                              <span className="text-xs sm:text-sm font-bold font-serif text-[#FFF8EA] group-hover:text-[#E7C878] transition-colors">
                                {language === 'bn' ? item.titleBn : item.titleEn}
                              </span>
                              {item.badgeBn && (
                                <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold bg-[#A61B1B] text-white border border-[#E7C878]/40 shadow-xs">
                                  {language === 'bn' ? item.badgeBn : item.badgeEn}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#FFF8EA]/70 truncate mt-0.5 font-sans">
                              {language === 'bn' ? item.subtitleBn : item.subtitleEn}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Action Controls: Puja Mode (desktop), Language Selector (desktop), Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <PujaModeToggle className="hidden sm:inline-flex" />
          <LanguageToggle className="hidden lg:inline-flex" />

          {/* Mobile menu button with smooth morphing icon animation */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative w-10 h-10 rounded-[16px] bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/10 text-[#FFF8EA] hover:text-[#E7C878] focus:outline-none shadow-xs active:scale-95 transition-all flex items-center justify-center cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {isMobileMenuOpen ? (
                <motion.div
                  key="close-icon"
                  initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <X className="w-5 h-5 text-[#E7C878]" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu-icon"
                  initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Menu className="w-5 h-5 text-[#FFF8EA]" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </header>
  );
};
