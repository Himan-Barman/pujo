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

  const FILTERS = [
    {
      id: 'all' as FilterType,
      labelBn: 'সবগুলো ঐতিহ্য',
      labelEn: 'All Heritage & Lore',
      count: '২৫',
      icon: Layers,
    },
    {
      id: 'plants' as FilterType,
      labelBn: 'নবপত্রিকা (৯ উদ্ভিদ)',
      labelEn: 'Nabapatrika (9 Plants)',
      count: '৯',
      icon: Leaf,
    },
    {
      id: 'weapons' as FilterType,
      labelBn: 'দশভুজার মহাশস্ত্র (১০)',
      labelEn: '10 Divine Weapons',
      count: '১০',
      icon: Shield,
    },
    {
      id: 'articles' as FilterType,
      labelBn: 'ঐতিহাসিক প্রবন্ধমালা',
      labelEn: 'Heritage Articles',
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
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
          {FILTERS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none active:scale-95 border flex-shrink-0 shadow-sm',
                  isActive
                    ? 'bg-[#A61B1B] text-[#FFFDF8] border-[#E7C878]/60 shadow-[0_4px_20px_rgba(166,27,27,0.4)] scale-105'
                    : 'bg-[#1A1210]/70 backdrop-blur-md text-[#FFF8EA]/75 border-[#FFFDF8]/12 hover:border-[#E7C878]/40 hover:text-[#FFF8EA]'
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-[#FFFDF8]' : 'text-[#E7C878]')} />
                <span>{language === 'bn' ? tab.labelBn : tab.labelEn}</span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-extrabold',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#120B09] text-[#E7C878] border border-[#FFFDF8]/10'
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </ScrollReveal>

      {/* 3. Interactive Illustrated Lore Explorer (Shown for All, Plants, Weapons) */}
      {(activeFilter === 'all' || activeFilter === 'plants' || activeFilter === 'weapons') && (
        <ScrollReveal delay={0.1} distance={40}>
          <CultureInteractiveHighlights
            activeFilterTab={
              activeFilter === 'plants'
                ? 'nabapatrika'
                : activeFilter === 'weapons'
                ? 'weapons'
                : 'all'
            }
          />
        </ScrollReveal>
      )}

      {/* 4. Editorial History Articles (Shown for All and Articles) */}
      {(activeFilter === 'all' || activeFilter === 'articles') && (
        <div className="space-y-6 pt-4">
          {activeFilter === 'all' && (
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
          )}

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
