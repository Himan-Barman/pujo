'use client';

import React, { useState } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { Sparkles, Shield, Leaf, ArrowRight, BookOpen } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { WEAPONS_DATA } from '@/data/weapons';
import { NABAPATRIKA_PLANTS_DATA } from '@/data/nabapatrika-plants';

export const CultureInteractiveHighlights: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const [activeTab, setActiveTab] = useState<'nabapatrika' | 'weapons'>('nabapatrika');

  return (
    <div className="agomoni-card p-6 sm:p-10 space-y-7 shadow-2xl relative overflow-hidden">
      {/* Header and Apple-style Segmented Switcher */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 pb-6 border-b border-[#FFFDF8]/10">
        <div className="text-center lg:text-left space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[#E7C878] text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E7C878]" />
            <span>{language === 'bn' ? 'ঐতিহ্যের প্রামাণ্য চিত্রশালা ও দর্শন' : 'Sacred Illustrated Lore & Gallery'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-serif text-[#FFF8EA] drop-shadow-sm">
            {activeTab === 'nabapatrika'
              ? language === 'bn'
                ? 'নবপত্রিকা বা কলাবউয়ের ৯টি পবিত্র উদ্ভিদ'
                : '9 Sacred Botanical Incarnations of Nabapatrika'
              : language === 'bn'
              ? 'দেবী দুর্গার দশভুজার ১০টি মহাশস্ত্র ও দর্শন'
              : '10 Divine Weapons & Spiritual Symbolism'}
          </h3>
          <p className="text-xs sm:text-sm text-[#E7C878]/90 font-sans max-w-2xl">
            {activeTab === 'nabapatrika'
              ? language === 'bn'
                ? 'প্রতিটি উদ্ভিদের ছবিতে ট্যাপ করে তার পূর্ণাঙ্গ পৌরাণিক আখ্যান, অধিষ্ঠাত্রী দেবী ও ভেষজ দর্শন পাঠ করুন।'
                : 'Tap any botanical photo card to open its dedicated page with complete Vedic history and Ayurvedic lore.'
              : language === 'bn'
                ? 'প্রতিটি মহাশস্ত্রের ছবিতে ট্যাপ করে তার সম্পূর্ণ পৌরাণিক কাহিনী, দাতা দেবতা ও শাস্ত্রীয় শ্লোক পাঠ করুন।'
                : 'Tap any weapon photo card to open its dedicated page with complete Markandeya Purana battle lore and hymns.'}
          </p>
        </div>

        {/* Apple-style Recessed Segmented Capsule Switcher */}
        <div className="flex items-center p-1 rounded-full bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/15 text-xs shadow-inner flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('nabapatrika')}
            className={cn(
              'px-4 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm',
              activeTab === 'nabapatrika'
                ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/30'
                : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/8'
            )}
          >
            <Leaf className="w-4 h-4 text-[#6EE7B7]" />
            <span>{language === 'bn' ? 'নবপত্রিকা (৯ উদ্ভিদ)' : 'Nabapatrika (9 Plants)'}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('weapons')}
            className={cn(
              'px-4 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all duration-200 cursor-pointer active:scale-95 text-xs sm:text-sm',
              activeTab === 'weapons'
                ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/30'
                : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/8'
            )}
          >
            <Shield className="w-4 h-4 text-[#E7C878]" />
            <span>{language === 'bn' ? 'মহাশস্ত্র (১০ অস্ত্র)' : '10 Divine Weapons'}</span>
          </button>
        </div>
      </div>

      {/* Grid Content with Authentic Photos on every Card */}
      {activeTab === 'nabapatrika' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {NABAPATRIKA_PLANTS_DATA.map((item) => (
            <Link
              key={item.id}
              href={`/culture/plants/${item.id}`}
              className="agomoni-card overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group hover:border-[#6EE7B7]/70 hover:bg-[#FFFDF8]/[0.12] cursor-pointer active:scale-[0.98] text-left p-0 shadow-lg"
            >
              {/* Photo Banner with Zoom on Hover */}
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#1A1210]">
                <Image
                  src={item.image}
                  alt={item.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/25 to-transparent" />

                {/* Badges on Top of Photo */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/85 border border-[#6EE7B7]/30 text-[11px] text-[#6EE7B7] font-bold shadow-xs backdrop-blur-md flex items-center gap-1.5">
                  <Leaf className="w-3 h-3 text-[#6EE7B7]" />
                  <span>{item.number}/৯</span>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1A1210]/85 border border-[#FFFDF8]/15 text-[10px] text-[#E7C878] font-mono italic backdrop-blur-md shadow-xs">
                  {item.botanical}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-lg font-bold text-[#FFF8EA] group-hover:text-[#6EE7B7] font-serif transition-colors">
                      {language === 'bn' ? item.nameBn : item.nameEn}
                    </h4>
                  </div>

                  <span className="text-xs text-[#E7C878] font-bold block mb-2">
                    {language === 'bn' ? `অধিষ্ঠাত্রী: ${item.deityBn}` : `Presiding: ${item.deityEn}`}
                  </span>

                  <p className="text-xs text-[#FFF8EA]/80 leading-relaxed font-sans line-clamp-2">
                    {language === 'bn' ? item.significanceBn : item.significanceEn}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#FFFDF8]/8 flex items-center justify-between text-xs text-[#6EE7B7] font-bold">
                  <span className="truncate text-[11px] text-[#E7C878] font-serif italic max-w-[150px]">
                    {language === 'bn' ? item.mantraBn : item.mantraEn}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                    <span>{language === 'bn' ? 'সম্পূর্ণ কাহিনী' : 'Full Story'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        /* 10 Weapons with High-Res Weapon Photo on each Card (3 items in a row) */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {WEAPONS_DATA.map((item) => (
            <Link
              key={item.id}
              href={`/culture/weapons/${item.id}`}
              className="agomoni-card overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group hover:border-[#E7C878]/70 hover:bg-[#FFFDF8]/[0.12] cursor-pointer active:scale-[0.98] text-left p-0 shadow-lg"
            >
              {/* Photo Banner with Zoom on Hover */}
              <div className="relative w-full h-44 sm:h-48 overflow-hidden bg-[#1A1210]">
                <Image
                  src={item.image}
                  alt={item.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />

                {/* Sequence Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/35 text-[11px] text-[#E7C878] font-bold shadow-xs backdrop-blur-md flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{item.number}/১০</span>
                </div>

                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#1A1210]/85 border border-[#FFFDF8]/15 text-[10px] text-[#D4AA50] font-bold backdrop-blur-md shadow-xs truncate max-w-[160px]">
                  {language === 'bn' ? item.donorBn : item.donorEn}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h4 className="text-lg font-bold text-[#FFF8EA] group-hover:text-[#E7C878] font-serif transition-colors">
                      {language === 'bn' ? item.nameBn : item.nameEn}
                    </h4>
                  </div>

                  <span className="text-xs text-[#D4AA50] font-bold block mb-2">
                    {language === 'bn' ? `উৎস: ${item.donorBn}` : `Source: ${item.donorEn}`}
                  </span>

                  <p className="text-xs text-[#FFF8EA]/80 leading-relaxed font-sans line-clamp-2">
                    {language === 'bn' ? item.significanceBn : item.significanceEn}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-[#FFFDF8]/8 flex items-center justify-between text-xs text-[#E7C878] font-bold">
                  <span className="truncate text-[11px] text-[#6EE7B7] font-sans">
                    {language === 'bn' ? item.focusBn : item.focusEn}
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                    <span>{language === 'bn' ? 'পৌরাণিক কাহিনী' : 'Full Lore'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Centered Footer Link to Full Lore Detail Page */}
      <div className="pt-4 border-t border-[#FFFDF8]/10 flex items-center justify-center">
        <Link
          href={activeTab === 'nabapatrika' ? '/culture/plants/kadali' : '/culture/weapons/trishula'}
          className="apple-btn-secondary px-7 py-3 text-xs sm:text-sm font-bold text-[#E7C878] hover:text-[#FFF8EA] flex items-center gap-2 transition-all active:scale-95 shadow-md"
        >
          <BookOpen className="w-4 h-4" />
          <span>
            {activeTab === 'nabapatrika'
              ? language === 'bn'
                ? 'নবপত্রিকার সম্পূর্ণ বৈদিক, শাস্ত্রীয় ও ভেষজ অধ্যায় শুরু করুন'
                : 'Start Full Nabapatrika Scriptural & Ayurvedic Chapter'
              : language === 'bn'
                ? '১০টি মহাশস্ত্রের পৌরাণিক রহস্য ও শ্লোক পাঠ শুরু করুন'
                : 'Start 10 Divine Weapons Lore & Vedic Hymns Chapter'}
          </span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
