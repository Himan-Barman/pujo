'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import {
  Home,
  Calendar,
  Radio,
  Sparkles,
  LayoutGrid,
  BookOpen,
  Utensils,
  Image as ImageIcon,
  Heart,
  X,
  ChevronRight,
  Share2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useShare } from '@/hooks/use-share';

interface BottomNavItem {
  id: string;
  titleBn: string;
  titleEn: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const PRIMARY_BOTTOM_NAV: BottomNavItem[] = [
  {
    id: 'home',
    titleBn: 'হোম',
    titleEn: 'Home',
    href: '/',
    icon: Home,
  },
  {
    id: 'calendar',
    titleBn: 'পঞ্জিকা',
    titleEn: 'Calendar',
    href: '/calendar',
    icon: Calendar,
  },
  {
    id: 'radio',
    titleBn: 'রেডিও',
    titleEn: 'Radio',
    href: '/songs',
    icon: Radio,
  },
  {
    id: 'anjali',
    titleBn: 'অঞ্জলি',
    titleEn: 'Anjali',
    href: '/anjali',
    icon: Sparkles,
  },
];

interface MoreExperienceItem {
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  badgeBn?: string;
  badgeEn?: string;
}

const MORE_EXPERIENCES: MoreExperienceItem[] = [
  {
    titleBn: 'ঐতিহ্য',
    titleEn: 'Culture',
    subtitleBn: 'বাঙালির ইতিহাস, বনেদি পূজা ও ঐতিহ্য',
    subtitleEn: 'Heritage, Bonedi Pujas & folklore',
    href: '/culture',
    icon: BookOpen,
    iconColor: 'text-[#5EB876]',
    badgeBn: 'ঐতিহ্য',
    badgeEn: 'Culture',
  },
  {
    titleBn: 'মহাপ্রসাদ',
    titleEn: 'Bhog',
    subtitleBn: 'সাত্ত্বিক অন্নভোগ ও প্রসাদ রেসিপি',
    subtitleEn: 'Sacred recipes & Mahaprasad',
    href: '/bhog',
    icon: Utensils,
    iconColor: 'text-[#C99A3D]',
    badgeBn: 'রেসিপি',
    badgeEn: 'Recipes',
  },
  {
    titleBn: 'চিত্রশালা',
    titleEn: 'Gallery',
    subtitleBn: 'প্রতিমা, মণ্ডপ ও আলোকসজ্জা',
    subtitleEn: 'Photography & Pratima art',
    href: '/gallery',
    icon: ImageIcon,
    iconColor: 'text-[#38BDF8]',
    badgeBn: 'এইচডি',
    badgeEn: 'HD',
  },
  {
    titleBn: 'বিজয়া',
    titleEn: 'Bijoya',
    subtitleBn: 'শুভ বিজয়ার ডিজিটাল কার্ড ও বার্তা',
    subtitleEn: 'Personalized greeting cards',
    href: '/bijoya',
    icon: Heart,
    iconColor: 'text-[#F43F5E]',
    badgeBn: 'শুভেচ্ছা',
    badgeEn: 'Cards',
  },
];

export const MobileNavigation: React.FC = () => {
  const pathname = usePathname();
  const language = useUIStore((state) => state.language);
  const isPujaMode = useUIStore((state) => state.isPujaMode);
  const { openShare } = useShare();

  const [isMoreDrawerOpen, setIsMoreDrawerOpen] = useState(false);

  // Check if current path matches any of the "More" items
  const isMoreActive = MORE_EXPERIENCES.some((item) =>
    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
  );

  // Lock body scroll when More drawer is open
  useEffect(() => {
    if (isMoreDrawerOpen) {
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
  }, [isMoreDrawerOpen]);

  // Close drawer upon navigating
  useEffect(() => {
    setIsMoreDrawerOpen(false);
  }, [pathname]);

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MORE EXPERIENCES SLIDE-UP BOTTOM SHEET / DRAWER                 */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isMoreDrawerOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMoreDrawerOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Slide-Up Bottom Sheet Card */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="relative w-full max-h-[85vh] bg-[#120B09] border-t-2 border-[#E7C878]/40 rounded-t-[32px] p-5 pb-8 shadow-[0_-20px_50px_rgba(0,0,0,0.9)] z-10 overflow-y-auto overscroll-contain flex flex-col"
            >
              {/* Drag Handle Bar */}
              <div className="w-12 h-1.5 rounded-full bg-[#FFFDF8]/25 mx-auto mb-4" />

              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-[#FFFDF8]/12 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#A61B1B]/30 border border-[#E7C878]/30 flex items-center justify-center">
                    <LayoutGrid className="w-4 h-4 text-[#E7C878]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-serif text-[#FFF8EA]">
                      {language === 'bn' ? 'অন্যান্য অভিজ্ঞতা ও বৈশিষ্ট্য' : 'More Experiences'}
                    </h3>
                    <p className="text-[11px] text-[#FFF8EA]/60 font-sans">
                      {language === 'bn' ? 'ঐতিহ্য, ভোগ, চিত্রশালা ও বিজয়া' : 'Culture, Bhog, Gallery & Bijoya'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsMoreDrawerOpen(false)}
                  className="p-2 rounded-full bg-[#FFFDF8]/8 hover:bg-[#FFFDF8]/15 border border-[#FFFDF8]/12 text-[#FFF8EA]/70 hover:text-[#FFF8EA] transition-colors cursor-pointer"
                  aria-label="Close experiences menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* 4 Feature Option Bars (Culture, Bhog, Gallery, Bijoya) with matching Capsule Radius */}
              <div className="grid grid-cols-1 gap-2.5">
                {MORE_EXPERIENCES.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMoreDrawerOpen(false)}
                      className={cn(
                        'px-3.5 py-3 rounded-full flex items-center justify-between gap-3.5 transition-all duration-200 border group active:scale-[0.98]',
                        isActive
                          ? 'bg-gradient-to-r from-[#A61B1B]/50 via-[#8C1616]/40 to-[#741313]/35 border-[#E7C878] text-[#FFFDF8] shadow-md'
                          : 'bg-[#1C120F] border-[#FFFDF8]/10 hover:border-[#E7C878]/40 hover:bg-[#241713] text-[#FFF8EA]'
                      )}
                    >
                      <div className="flex items-center gap-3.5 min-w-0 flex-1 pl-0.5">
                        <div
                          className={cn(
                            'w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#140D0B] border border-[#FFFDF8]/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform shadow-xs',
                            isActive && 'border-[#E7C878]/60 bg-[#A61B1B]/20'
                          )}
                        >
                          <Icon className={cn('w-5 h-5', item.iconColor)} />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold font-serif text-[#FFF8EA] group-hover:text-[#E7C878] transition-colors">
                              {language === 'bn' ? item.titleBn : item.titleEn}
                            </span>
                            {item.badgeBn && (
                              <span className="px-2 py-0.2 rounded-full text-[9px] font-extrabold bg-[#A61B1B] text-white border border-[#E7C878]/40 shadow-xs">
                                {language === 'bn' ? item.badgeBn : item.badgeEn}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#FFF8EA]/65 truncate mt-0.5 font-sans">
                            {language === 'bn' ? item.subtitleBn : item.subtitleEn}
                          </p>
                        </div>
                      </div>

                      <div className="pr-1.5 flex items-center justify-center">
                        <ChevronRight className="w-4 h-4 text-[#FFF8EA]/40 group-hover:text-[#E7C878] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                    </Link>
                  );
                })}

                {/* Direct Share Button in Mobile Drawer */}
                <button
                  type="button"
                  onClick={() => {
                    setIsMoreDrawerOpen(false);
                    openShare({
                      titleBn: 'আগমনী — যেখানে জীবন্ত হয়ে ওঠেন মা দুর্গা',
                      titleEn: 'Agomoni — Where Maa Comes Alive',
                      descriptionBn: 'বাঙালির শারদোৎসবের এক নিবিড়, পবিত্র ও জীবন্ত ডিজিটাল রূপ।',
                      descriptionEn: 'A digital autumn in Bengal celebrating devotion, sacred rituals, music, and heritage.',
                      categoryBn: 'শারদোৎসব ২০২৬ • Sharodotsav',
                      categoryEn: 'Sharodotsav 2026',
                      image: '/images/durga/durga-hero.jpg',
                    });
                  }}
                  className="w-full px-3.5 py-3 rounded-2xl flex items-center justify-between transition-all duration-150 text-left bg-gradient-to-r from-[#A61B1B]/30 to-[#741313]/20 border border-[#E7C878]/35 text-[#FFF8EA] hover:border-[#E7C878]/60 cursor-pointer active:scale-[0.98] mt-2"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#A61B1B] border border-[#E7C878]/40 flex items-center justify-center flex-shrink-0 shadow-xs">
                      <Share2 className="w-4 h-4 text-[#FFFDF8]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-bold font-serif text-[#FFF8EA] block">
                        {language === 'bn' ? 'শারদোৎসব শেয়ার করুন' : 'Share Agomoni'}
                      </span>
                      <p className="text-xs text-[#FFF8EA]/65 truncate mt-0.5 font-sans">
                        {language === 'bn' ? 'প্রিয়জনদের সাথে আনন্দ ভাগ করে নিন' : 'Spread the joy with friends & family'}
                      </p>
                    </div>
                  </div>
                  <div className="pr-1.5 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-[#E7C878]" />
                  </div>
                </button>
              </div>

              {/* Bottom Quote & Cultural Farewell in Sheet */}
              <div className="mt-5 pt-4 border-t border-[#FFFDF8]/10 text-center">
                <p className="font-serif text-[#E7C878] font-bold text-xs">
                  {language === 'bn' ? '“আসছে বছর আবার হবে…”' : '“Asche Bochor Abar Hobe…”'}
                </p>
                <p className="text-[10px] text-[#FFF8EA]/50 mt-0.5">
                  {language === 'bn' ? 'আগমনী • শারদোৎসব' : 'Agomoni • Sharodotsav'}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════ */}
      {/* MOBILE BOTTOM NAVIGATION BAR (Fixed at bottom on Mobile)         */}
      {/* ═══════════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Mobile Bottom Navigation"
        className={cn(
          'fixed bottom-0 left-0 right-0 z-40 lg:hidden w-full transition-all duration-300',
          'bg-[#140D0B]/95 backdrop-blur-2xl border-t border-[#E7C878]/25 shadow-[0_-8px_30px_rgba(0,0,0,0.85)]',
          'px-2 py-1.5 pb-[calc(env(safe-area-inset-bottom,0px)+0.375rem)]',
          isPujaMode && 'border-[#C99A3D]/40 bg-[#171A1B]/95'
        )}
      >
        <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-around gap-1 relative">
          {/* Primary Nav Items: Home, Calendar, Radio, Anjali */}
          {PRIMARY_BOTTOM_NAV.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(item.href);

            return (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'relative flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all duration-200 select-none cursor-pointer active:scale-95',
                  isActive ? 'text-[#FFFDF8]' : 'text-[#FFF8EA]/60 hover:text-[#FFF8EA]'
                )}
              >
                {/* Active Capsule Shape Highlighter with Ultra-Smooth Spring Transition */}
                {isActive && (
                  <motion.div
                    layoutId="mobile-bottom-capsule"
                    className="absolute inset-x-1 inset-y-0.5 rounded-full bg-gradient-to-r from-[#A61B1B] via-[#941717] to-[#741313] shadow-[0_2px_14px_rgba(166,27,27,0.55)] -z-10 border border-[#E7C878]/55"
                    transition={{
                      type: 'spring',
                      stiffness: 360,
                      damping: 28,
                      mass: 0.7,
                    }}
                  />
                )}

                <div className="relative flex items-center justify-center">
                  <Icon
                    className={cn(
                      'w-5 h-5 transition-transform duration-200',
                      isActive ? 'text-[#FFFDF8] scale-105' : 'text-[#FFF8EA]/70'
                    )}
                  />
                </div>

                <span
                  className={cn(
                    'text-[10px] font-serif font-bold tracking-tight mt-0.5 truncate max-w-full leading-tight',
                    isActive ? 'text-[#FFFDF8]' : 'text-[#FFF8EA]/70'
                  )}
                >
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </span>
              </Link>
            );
          })}

          {/* 5th Nav Item: "More / আরও" Experiences Trigger Button */}
          <button
            type="button"
            onClick={() => setIsMoreDrawerOpen(true)}
            className={cn(
              'relative flex flex-col items-center justify-center py-1.5 px-1 rounded-full transition-all duration-200 select-none cursor-pointer active:scale-95',
              isMoreActive || isMoreDrawerOpen
                ? 'text-[#FFFDF8]'
                : 'text-[#FFF8EA]/60 hover:text-[#FFF8EA]'
            )}
            aria-label="More Puja features and experiences"
            aria-expanded={isMoreDrawerOpen}
          >
            {/* Active Capsule Shape Highlighter with Ultra-Smooth Spring Transition */}
            {(isMoreActive || isMoreDrawerOpen) && (
              <motion.div
                layoutId="mobile-bottom-capsule"
                className="absolute inset-x-1 inset-y-0.5 rounded-full bg-gradient-to-r from-[#A61B1B] via-[#941717] to-[#741313] shadow-[0_2px_14px_rgba(166,27,27,0.55)] -z-10 border border-[#E7C878]/55"
                transition={{
                  type: 'spring',
                  stiffness: 360,
                  damping: 28,
                  mass: 0.7,
                }}
              />
            )}

            <div className="relative flex items-center justify-center">
              <LayoutGrid
                className={cn(
                  'w-5 h-5 transition-transform duration-200',
                  isMoreActive || isMoreDrawerOpen ? 'text-[#FFFDF8] scale-105' : 'text-[#FFF8EA]/70'
                )}
              />
              <span className="absolute -top-0.5 -right-1 w-1.5 h-1.5 rounded-full bg-[#E7C878] shadow-xs" />
            </div>

            <span
              className={cn(
                'text-[10px] font-serif font-bold tracking-tight mt-0.5 truncate max-w-full leading-tight',
                isMoreActive || isMoreDrawerOpen ? 'text-[#FFFDF8]' : 'text-[#FFF8EA]/70'
              )}
            >
              {language === 'bn' ? 'আরও' : 'More'}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
