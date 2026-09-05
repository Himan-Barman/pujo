'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { CULTURE_ARTICLES } from '@/data/culture-articles';
import { CultureCard } from '@/components/culture/culture-card';
import { CultureInteractiveHighlights } from '@/components/culture/culture-interactive-highlights';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';
import { Leaf, Shield, BookOpen, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

type LandingCultureTab = 'plants' | 'weapons' | 'articles';

export const HomeCultureSection: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const [activeTab, setActiveTab] = useState<LandingCultureTab>('plants');

  const TABS = [
    {
      id: 'plants' as LandingCultureTab,
      labelBn: 'নবপত্রিকা (৯ উদ্ভিদ)',
      labelEn: 'Nabapatrika (9 Plants)',
      count: '৯',
      icon: Leaf,
    },
    {
      id: 'weapons' as LandingCultureTab,
      labelBn: 'দশভুজার মহাশস্ত্র (১০)',
      labelEn: '10 Divine Weapons',
      count: '১০',
      icon: Shield,
    },
    {
      id: 'articles' as LandingCultureTab,
      labelBn: 'ঐতিহাসিক প্রবন্ধমালা',
      labelEn: 'Heritage Articles',
      count: '৬',
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Segmented Filter Selector Bar (Without "All" Option for Landing Page) */}
      <ScrollReveal delay={0.05} distance={20}>
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar py-2 px-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer select-none active:scale-95 border flex-shrink-0 shadow-sm',
                  isActive
                    ? 'bg-[#A61B1B] text-[#FFFDF8] border-[#E7C878]/60 shadow-[0_4px_20px_rgba(166,27,27,0.4)] scale-105'
                    : 'agomoni-filter-tab bg-[#1A1210]/70 backdrop-blur-md text-[#FFF8EA]/75 border-[#FFFDF8]/12 hover:text-[#FFFDF8]'
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

      {/* Tab 1: Nabapatrika 9 Plants (Top 3 on Landing Page) */}
      {activeTab === 'plants' && (
        <ScrollReveal delay={0.1} distance={30}>
          <CultureInteractiveHighlights
            limit={3}
            activeFilterTab="nabapatrika"
            hideSwitcher={true}
            showViewAllButton={true}
          />
        </ScrollReveal>
      )}

      {/* Tab 2: 10 Divine Weapons (Top 3 on Landing Page) */}
      {activeTab === 'weapons' && (
        <ScrollReveal delay={0.1} distance={30}>
          <CultureInteractiveHighlights
            limit={3}
            activeFilterTab="weapons"
            hideSwitcher={true}
            showViewAllButton={true}
          />
        </ScrollReveal>
      )}

      {/* Tab 3: Historical Articles (Top 3 on Landing Page) */}
      {activeTab === 'articles' && (
        <ScrollReveal delay={0.1} distance={30}>
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 sm:pb-6 border-b border-[#FFFDF8]/10">
              <div className="space-y-1.5 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[#E7C878] text-[11px] sm:text-xs font-semibold shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-[#C99A3D]" />
                  <span>{language === 'bn' ? 'ঐতিহাসিক ইতিবৃত্ত ও দর্শন' : 'Historical Chronicles & Lore'}</span>
                </div>
                <h3 className="text-xl sm:text-3xl font-extrabold font-serif text-[#FFF8EA] drop-shadow-sm">
                  {language === 'bn' ? 'বাঙালির দুর্গোৎসবের প্রামাণ্য ইতিহাস (প্রথম ৩টি)' : 'Historical Chronicles of Durga Puja (Top 3)'}
                </h3>
                <p className="text-xs sm:text-sm text-[#E7C878]/90 font-sans max-w-2xl">
                  {language === 'bn'
                    ? 'পূজার সুপ্রাচীন বিবর্তন, সন্ধিপূজার নিভৃত রহস্য ও সাংস্কৃতিক ঐতিহ্যের প্রামাণ্য নিবন্ধমালা।'
                    : 'Authentic chronicles into the evolution of autumnal worship and cultural traditions.'}
                </p>
              </div>

              <Link
                href="/culture"
                className="apple-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 whitespace-nowrap self-start sm:self-auto"
              >
                <span>{language === 'bn' ? 'সকল ইতিহাস পাঠ করুন' : 'Explore All Lore'}</span>
                <ArrowRight className="w-4 h-4 text-[#E7C878]" />
              </Link>
            </div>

            {/* Grid of only 3 articles */}
            <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {CULTURE_ARTICLES.slice(0, 3).map((article) => (
                <StaggerItem key={article.id} className="h-full">
                  <CultureCard article={article} />
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Centered All Articles Action Button */}
            <div className="pt-4 border-t border-[#FFFDF8]/10 flex items-center justify-center">
              <Link
                href="/culture"
                className="apple-btn-primary px-8 py-3.5 text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-xl border border-[#E7C878]/40 active:scale-95 transition-all"
              >
                <Layers className="w-4 h-4 text-[#E7C878]" />
                <span>{language === 'bn' ? 'সব ৬টি ঐতিহ্য ও ইতিহাস নিবন্ধ দেখুন' : 'View All 6 Heritage Articles'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
};
