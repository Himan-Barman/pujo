'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { Sparkles, Shield, Leaf, ArrowRight, BookOpen, Layers } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { WEAPONS_DATA } from '@/data/weapons';
import { NABAPATRIKA_PLANTS_DATA } from '@/data/nabapatrika-plants';
import { StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';

interface CultureInteractiveHighlightsProps {
  limit?: number;
  showViewAllButton?: boolean;
  activeFilterTab?: 'all' | 'nabapatrika' | 'weapons';
  onTabChange?: (tab: 'nabapatrika' | 'weapons') => void;
  hideSwitcher?: boolean;
}

export const CultureInteractiveHighlights: React.FC<CultureInteractiveHighlightsProps> = ({
  limit,
  showViewAllButton = true,
  activeFilterTab,
  hideSwitcher = false,
}) => {
  const language = useUIStore((state) => state.language);
  const [activeTab, setActiveTab] = useState<'nabapatrika' | 'weapons'>('nabapatrika');

  // If controlled by parent
  const currentTab = activeFilterTab && activeFilterTab !== 'all' ? activeFilterTab : activeTab;

  const displayedPlants = limit ? NABAPATRIKA_PLANTS_DATA.slice(0, limit) : NABAPATRIKA_PLANTS_DATA;
  const displayedWeapons = limit ? WEAPONS_DATA.slice(0, limit) : WEAPONS_DATA;

  return (
    <div className="space-y-6 sm:space-y-8 relative">
      {/* Header and Segmented Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-5 pb-4 sm:pb-6 border-b border-[#FFFDF8]/10">
        <div className="text-center lg:text-left space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[#E7C878] text-[11px] sm:text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E7C878]" />
            <span>{language === 'bn' ? 'ঐতিহ্যের প্রামাণ্য চিত্রশালা ও দর্শন' : 'Sacred Illustrated Lore & Gallery'}</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-extrabold font-serif text-[#FFF8EA] drop-shadow-sm">
            {currentTab === 'nabapatrika'
              ? language === 'bn'
                ? `নবপত্রিকা বা কলাবউয়ের ৯টি পবিত্র উদ্ভিদ ${limit ? `(প্রথম ৩টি রূপ)` : ''}`
                : `9 Sacred Botanical Incarnations of Nabapatrika ${limit ? `(Top 3)` : ''}`
              : language === 'bn'
              ? `দেবী দুর্গার দশভুজার ১০টি মহাশস্ত্র ও দর্শন ${limit ? `(প্রথম ৩টি অস্ত্র)` : ''}`
              : `10 Divine Weapons & Spiritual Symbolism ${limit ? `(Top 3)` : ''}`}
          </h3>
          <p className="text-xs sm:text-sm text-[#E7C878]/90 font-sans max-w-2xl">
            {currentTab === 'nabapatrika'
              ? language === 'bn'
                ? 'প্রতিটি উদ্ভিদের ছবিতে ট্যাপ করে তার পূর্ণাঙ্গ পৌরাণিক আখ্যান, অধিষ্ঠাত্রী দেবী ও ভেষজ দর্শন পাঠ করুন।'
                : 'Tap any botanical photo card to open its dedicated page with complete Vedic history and Ayurvedic lore.'
              : language === 'bn'
                ? 'প্রতিটি মহাশস্ত্রের ছবিতে ট্যাপ করে তার সম্পূর্ণ পৌরাণিক কাহিনী, দাতা দেবতা ও শাস্ত্রীয় শ্লোক পাঠ করুন।'
                : 'Tap any weapon photo card to open its dedicated page with complete Markandeya Purana battle lore and hymns.'}
          </p>
        </div>

        {/* Segmented Capsule Switcher (Hidden when hideSwitcher is true) */}
        {!hideSwitcher && (
          <div className="flex items-center p-1 rounded-full bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/15 text-xs shadow-inner flex-shrink-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setActiveTab('nabapatrika')}
              className={cn(
                'px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm flex-1 sm:flex-initial text-center',
                currentTab === 'nabapatrika'
                  ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/30'
                  : 'agomoni-filter-tab text-[#FFF8EA]/70 hover:text-[#FFFDF8]'
              )}
            >
              <Leaf className="w-3.5 h-3.5 text-[#6EE7B7]" />
              <span>{language === 'bn' ? 'নবপত্রিকা' : 'Nabapatrika'}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('weapons')}
              className={cn(
                'px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full font-bold flex items-center justify-center gap-1.5 sm:gap-2 transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm flex-1 sm:flex-initial text-center',
                currentTab === 'weapons'
                  ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/30'
                  : 'agomoni-filter-tab text-[#FFF8EA]/70 hover:text-[#FFFDF8]'
              )}
            >
              <Shield className="w-3.5 h-3.5 text-[#E7C878]" />
              <span>{language === 'bn' ? '১০ মহাশস্ত্র' : '10 Weapons'}</span>
            </button>
          </div>
        )}
      </div>

      {/* Grid Content with Floating Cards and Smooth Staggering */}
      {currentTab === 'nabapatrika' ? (
        <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {displayedPlants.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <Link
                href={`/culture/plants/${item.id}`}
                className="agomoni-card overflow-hidden transition-all duration-300 flex flex-row sm:flex-col justify-between h-auto sm:h-full group hover:border-[#6EE7B7]/80 hover:bg-[#FFFDF8]/[0.12] cursor-pointer active:scale-[0.98] text-left p-2.5 sm:p-0 shadow-lg gap-3 sm:gap-0 rounded-[20px] sm:rounded-[28px] hover:-translate-y-1 sm:hover:-translate-y-2.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(110,231,183,0.2)]"
              >
                {/* Photo Banner with Zoom on Hover */}
                <div className="relative w-20 h-20 sm:w-full sm:h-52 rounded-xl sm:rounded-none overflow-hidden bg-[#1A1210] flex-shrink-0 self-center sm:self-auto">
                  <Image
                    src={item.image}
                    alt={item.nameEn}
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/25 to-transparent" />

                  {/* Badges on Top of Photo (Desktop) */}
                  <div className="hidden sm:flex absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/85 border border-[#6EE7B7]/30 text-[11px] text-[#6EE7B7] font-bold shadow-xs backdrop-blur-md items-center gap-1.5">
                    <Leaf className="w-3 h-3 text-[#6EE7B7]" />
                    <span>{item.number}/৯</span>
                  </div>

                  <div className="hidden sm:block absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1A1210]/85 border border-[#FFFDF8]/15 text-[10px] text-[#E7C878] font-mono italic backdrop-blur-md shadow-xs">
                    {item.botanical}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-0 sm:p-5 flex flex-col flex-1 justify-center sm:justify-between sm:space-y-3 min-w-0">
                  <div>
                    {/* Mobile Badges Row */}
                    <div className="flex sm:hidden items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#1A1210] border border-[#6EE7B7]/30 text-[9.5px] text-[#6EE7B7] font-bold flex items-center gap-1">
                        <Leaf className="w-2.5 h-2.5 text-[#6EE7B7]" />
                        <span>{item.number}/৯</span>
                      </span>
                      <span className="text-[10px] text-[#E7C878] font-mono italic truncate max-w-[150px]">
                        {item.botanical}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1.5">
                      <h4 className="text-sm sm:text-lg font-bold text-[#FFF8EA] group-hover:text-[#6EE7B7] font-serif transition-colors truncate">
                        {language === 'bn' ? item.nameBn : item.nameEn}
                      </h4>
                    </div>

                    <span className="text-xs text-[#E7C878] font-bold block mb-1 sm:mb-2 truncate">
                      {language === 'bn' ? `অধিষ্ঠাত্রী: ${item.deityBn}` : `Presiding: ${item.deityEn}`}
                    </span>

                    <p className="text-[11px] sm:text-xs text-[#FFF8EA]/80 leading-relaxed font-sans truncate sm:whitespace-normal sm:line-clamp-2">
                      {language === 'bn' ? item.significanceBn : item.significanceEn}
                    </p>
                  </div>

                  {/* Desktop Footer Action */}
                  <div className="hidden sm:flex pt-3 border-t border-[#FFFDF8]/8 items-center justify-between text-xs text-[#6EE7B7] font-bold">
                    <span className="truncate text-[11px] text-[#E7C878] font-serif italic max-w-[150px]">
                      {language === 'bn' ? item.mantraBn : item.mantraEn}
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[11px]">
                      <span>{language === 'bn' ? 'সম্পূর্ণ কাহিনী' : 'Full Story'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Mobile Right Arrow */}
                <div className="flex sm:hidden items-center justify-center pr-1 text-[#6EE7B7] flex-shrink-0 self-center">
                  <div className="w-7 h-7 rounded-full bg-[#FFFDF8]/8 border border-[#FFFDF8]/12 flex items-center justify-center group-hover:bg-[#6EE7B7] group-hover:text-[#120B09] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        /* 10 Weapons with Floating Hover and High-Res Weapon Photo */
        <StaggerContainer staggerDelay={0.07} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {displayedWeapons.map((item) => (
            <StaggerItem key={item.id} className="h-full">
              <Link
                href={`/culture/weapons/${item.id}`}
                className="agomoni-card overflow-hidden transition-all duration-300 flex flex-row sm:flex-col justify-between h-auto sm:h-full group hover:border-[#E7C878]/80 hover:bg-[#FFFDF8]/[0.12] cursor-pointer active:scale-[0.98] text-left p-2.5 sm:p-0 shadow-lg gap-3 sm:gap-0 rounded-[20px] sm:rounded-[28px] hover:-translate-y-1 sm:hover:-translate-y-2.5 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(231,200,120,0.25)]"
              >
                {/* Photo Banner with Zoom on Hover */}
                <div className="relative w-20 h-20 sm:w-full sm:h-52 rounded-xl sm:rounded-none overflow-hidden bg-[#1A1210] flex-shrink-0 self-center sm:self-auto">
                  <Image
                    src={item.image}
                    alt={item.nameEn}
                    fill
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />

                  {/* Sequence Badge (Desktop) */}
                  <div className="hidden sm:flex absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/35 text-[11px] text-[#E7C878] font-bold shadow-xs backdrop-blur-md items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#E7C878]" />
                    <span>{item.number}/১০</span>
                  </div>

                  <div className="hidden sm:block absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1A1210]/85 border border-[#FFFDF8]/15 text-[10px] text-[#D4AA50] font-bold backdrop-blur-md shadow-xs truncate max-w-[160px]">
                    {language === 'bn' ? item.donorBn : item.donorEn}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-0 sm:p-5 flex flex-col flex-1 justify-center sm:justify-between sm:space-y-3 min-w-0">
                  <div>
                    {/* Mobile Badges Row */}
                    <div className="flex sm:hidden items-center gap-2 mb-1 flex-wrap">
                      <span className="px-2 py-0.5 rounded-full bg-[#1A1210] border border-[#E7C878]/35 text-[9.5px] text-[#E7C878] font-bold flex items-center gap-1">
                        <Shield className="w-2.5 h-2.5 text-[#E7C878]" />
                        <span>{item.number}/১০</span>
                      </span>
                      <span className="text-[10px] text-[#D4AA50] font-bold truncate max-w-[150px]">
                        {language === 'bn' ? item.donorBn : item.donorEn}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-2 mb-0.5 sm:mb-1.5">
                      <h4 className="text-sm sm:text-lg font-bold text-[#FFF8EA] group-hover:text-[#E7C878] font-serif transition-colors truncate">
                        {language === 'bn' ? item.nameBn : item.nameEn}
                      </h4>
                    </div>

                    <span className="text-xs text-[#D4AA50] font-bold block mb-1 sm:mb-2 truncate">
                      {language === 'bn' ? `উৎস: ${item.donorBn}` : `Source: ${item.donorEn}`}
                    </span>

                    <p className="text-[11px] sm:text-xs text-[#FFF8EA]/80 leading-relaxed font-sans truncate sm:whitespace-normal sm:line-clamp-2">
                      {language === 'bn' ? item.significanceBn : item.significanceEn}
                    </p>
                  </div>

                  {/* Desktop Footer Action */}
                  <div className="hidden sm:flex pt-3 border-t border-[#FFFDF8]/8 items-center justify-between text-xs text-[#E7C878] font-bold">
                    <span className="truncate text-[11px] text-[#6EE7B7] font-sans">
                      {language === 'bn' ? item.focusBn : item.focusEn}
                    </span>
                    <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform text-[11px]">
                      <span>{language === 'bn' ? 'পৌরাণিক কাহিনী' : 'Full Lore'}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Mobile Right Arrow */}
                <div className="flex sm:hidden items-center justify-center pr-1 text-[#E7C878] flex-shrink-0 self-center">
                  <div className="w-7 h-7 rounded-full bg-[#FFFDF8]/8 border border-[#FFFDF8]/12 flex items-center justify-center group-hover:bg-[#A61B1B] group-hover:text-[#FFFDF8] transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      )}

      {/* Action Button: When limited to 3 on landing page OR full view */}
      {showViewAllButton && (
        <div className="pt-4 border-t border-[#FFFDF8]/10 flex flex-col sm:flex-row items-center justify-center gap-3">
          {limit ? (
            <Link
              href="/culture"
              className="apple-btn-primary px-7 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 transition-all active:scale-95 shadow-xl border border-[#E7C878]/40"
            >
              <Layers className="w-4 h-4 text-[#E7C878]" />
              <span>
                {currentTab === 'nabapatrika'
                  ? language === 'bn'
                    ? 'সব ৯টি পবিত্র উদ্ভিদের দর্শন ও কাহিনী দেখুন'
                    : 'View All 9 Sacred Plants of Nabapatrika'
                  : language === 'bn'
                  ? 'দশভুজার সব ১০টি মহাশস্ত্রের পৌরাণিক কাহিনী দেখুন'
                  : 'View All 10 Divine Weapons & Hymns'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          ) : (
            <Link
              href={currentTab === 'nabapatrika' ? '/culture/plants/kadali' : '/culture/weapons/trishula'}
              className="apple-btn-secondary px-7 py-3 text-xs sm:text-sm font-bold text-[#E7C878] hover:text-[#FFF8EA] flex items-center gap-2 transition-all active:scale-95 shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              <span>
                {currentTab === 'nabapatrika'
                  ? language === 'bn'
                    ? 'নবপত্রিকার সম্পূর্ণ বৈদিক, শাস্ত্রীয় ও ভেষজ অধ্যায় শুরু করুন'
                    : 'Start Full Nabapatrika Scriptural & Ayurvedic Chapter'
                  : language === 'bn'
                    ? '১০টি মহাশস্ত্রের পৌরাণিক রহস্য ও শ্লোক পাঠ শুরু করুন'
                    : 'Start 10 Divine Weapons Lore & Vedic Hymns Chapter'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
};
