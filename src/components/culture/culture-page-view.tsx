'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { CULTURE_ARTICLES } from '@/data/culture-articles';
import { CultureCard } from '@/components/culture/culture-card';
import { CultureInteractiveHighlights } from '@/components/culture/culture-interactive-highlights';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';
import { Layers, Leaf, Shield, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'plants' | 'weapons' | 'articles';

export const CulturePageView: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const FILTERS = [
    {
      id: 'all' as FilterType,
      labelBn: 'সকল ঐতিহ্য',
      labelEn: 'All Heritage',
      count: '২৫',
      icon: Layers,
    },
    {
      id: 'plants' as FilterType,
      labelBn: 'নবপত্রিকা',
      labelEn: 'Nabapatrika',
      count: '৯',
      icon: Leaf,
    },
    {
      id: 'weapons' as FilterType,
      labelBn: '১০ মহাশস্ত্র',
      labelEn: '10 Weapons',
      count: '১০',
      icon: Shield,
    },
    {
      id: 'articles' as FilterType,
      labelBn: 'প্রবন্ধমালা',
      labelEn: 'Articles',
      count: '৬',
      icon: BookOpen,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10 sm:space-y-12">
      {/* 1. Master Section Heading */}
      <SectionHeading
        tagBn="ঐতিহ্য ও সংস্কৃতি"
        tagEn="Cultural Heritage & Lore"
        titleBn="বাঙালির দুর্গাপূজার সুপ্রাচীন ঐতিহ্য"
        titleEn="Living Traditions & History of Durga Puja"
        subtitleBn="প্রকৃতিপূজা থেকে শুরু করে রাজবাড়ির আভিজাত্য ও সর্বজনীন মিলনমেলার প্রামাণ্য ইতিহাস।"
        subtitleEn="In-depth editorial articles explaining the ancient philosophy behind Bengal’s grandest festival."
      />

      {/* 2. Interactive Filter Selector Pill Bar */}
      <ScrollReveal delay={0.05} distance={20}>
        <div className="relative w-full rounded-full p-1 sm:p-1.5 bg-[#120B09]/60 backdrop-blur-xl border border-[#FFFDF8]/10 shadow-xl overflow-hidden group/nav select-none">
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
            {FILTERS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeFilter === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(e) => {
                    setActiveFilter(tab.id);
                    e.currentTarget.scrollIntoView({
                      behavior: 'smooth',
                      inline: 'center',
                      block: 'nearest',
                    });
                  }}
                  className={cn(
                    'relative flex-shrink-0 transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer select-none active:scale-[0.97]',
                    'px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full border text-xs sm:text-sm font-bold font-serif whitespace-nowrap',
                    isActive
                      ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.02] z-10'
                      : 'agomoni-filter-tab bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA]/80 hover:text-[#FFFDF8]'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-[#FFFDF8]' : 'text-[#E7C878]')} />
                  <span>{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[10px] font-mono font-bold',
                      isActive
                        ? 'bg-[#FFFDF8]/20 text-[#FFF8EA]'
                        : 'bg-[#FFFDF8]/8 text-[#E7C878]'
                    )}
                  >
                    {tab.count}
                  </span>
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
      </ScrollReveal>

      {/* 3. Illustrated Lore Explorers (Controlled exclusively by Upper Filters) */}
      {activeFilter === 'all' && (
        <div className="space-y-12">
          {/* Nabapatrika 9 Sacred Plants */}
          <ScrollReveal delay={0.08} distance={35}>
            <CultureInteractiveHighlights activeFilterTab="nabapatrika" hideSwitcher={true} />
          </ScrollReveal>

          {/* 10 Divine Weapons */}
          <ScrollReveal delay={0.12} distance={35}>
            <CultureInteractiveHighlights activeFilterTab="weapons" hideSwitcher={true} />
          </ScrollReveal>
        </div>
      )}

      {activeFilter === 'plants' && (
        <ScrollReveal delay={0.08} distance={35}>
          <CultureInteractiveHighlights activeFilterTab="nabapatrika" hideSwitcher={true} />
        </ScrollReveal>
      )}

      {activeFilter === 'weapons' && (
        <ScrollReveal delay={0.08} distance={35}>
          <CultureInteractiveHighlights activeFilterTab="weapons" hideSwitcher={true} />
        </ScrollReveal>
      )}

      {/* 4. Editorial History Articles (Shown for All and Articles) */}
      {(activeFilter === 'all' || activeFilter === 'articles') && (
        <div className="space-y-6 pt-6">
          <div className="flex items-center justify-between gap-4 pb-2 border-b border-[#FFFDF8]/10">
            <div className="space-y-1 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[10px] uppercase font-bold text-[#E7C878] tracking-wider shadow-xs">
                <BookOpen className="w-3 h-3 text-[#C99A3D]" />
                <span>{language === 'bn' ? 'প্রামাণ্য প্রবন্ধাবলী' : 'Editorial Articles'}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#FFF8EA]">
                {language === 'bn' ? 'ঐতিহাসিক ও পৌরাণিক ইতিবৃত্ত' : 'Historical & Scriptural Chronicles'}
              </h3>
            </div>
          </div>

          {/* Articles Grid with equal heights */}
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {CULTURE_ARTICLES.map((article) => (
              <StaggerItem key={article.id} className="h-full">
                <CultureCard article={article} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}
    </div>
  );
};
