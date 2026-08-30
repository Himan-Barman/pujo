'use client';

import React, { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/stores/ui-store';
import { WEAPONS_DATA } from '@/data/weapons';
import { ArrowLeft, Shield, Sparkles, BookOpen, Share2, Check, Sparkle, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { cn } from '@/lib/utils';

interface WeaponDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function WeaponDetailPage({ params }: WeaponDetailPageProps) {
  const resolvedParams = use(params);
  const language = useUIStore((state) => state.language);
  const [copied, setCopied] = useState(false);

  const weaponIndex = WEAPONS_DATA.findIndex((w) => w.id === resolvedParams.id);
  const weapon = WEAPONS_DATA[weaponIndex];

  if (!weapon) {
    notFound();
  }

  const prevWeapon = weaponIndex > 0 ? WEAPONS_DATA[weaponIndex - 1] : WEAPONS_DATA[WEAPONS_DATA.length - 1];
  const nextWeapon = weaponIndex < WEAPONS_DATA.length - 1 ? WEAPONS_DATA[weaponIndex + 1] : WEAPONS_DATA[0];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: language === 'bn' ? weapon.nameBn : weapon.nameEn,
          text: language === 'bn' ? weapon.significanceBn : weapon.significanceEn,
          url: window.location.href,
        }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* 1. Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/culture"
          className="apple-btn-secondary px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'সকল ঐতিহ্য নিবন্ধে ফিরে যান' : 'Back to Heritage Archives'}</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleShare}
            className="apple-btn-secondary px-5 py-2.5 text-xs flex items-center gap-2 cursor-pointer shadow-xs active:scale-95 w-fit"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-[#E7C878]" />}
            <span>
              {copied
                ? language === 'bn'
                  ? 'লিঙ্ক কপি হয়েছে!'
                  : 'Link Copied!'
                : language === 'bn'
                ? 'অস্ত্রের কাহিনী শেয়ার করুন'
                : 'Share Weapon Lore'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Master Section Heading */}
      <SectionHeading
        tagBn={`দশভুজার মহাশস্ত্র • ক্রম ${weapon.number}/১০`}
        tagEn={`Divine Sacred Astra • ${weapon.number}/10`}
        titleBn={weapon.nameBn}
        titleEn={weapon.nameEn}
        subtitleBn={weapon.significanceBn}
        subtitleEn={weapon.significanceEn}
      />

      {/* 3. Featured Weapon Photo (Left) & Attributes (Right) Hero Showcase */}
      <ScrollReveal delay={0.08} distance={45}>
        <div className="agomoni-card overflow-hidden relative shadow-2xl p-4 sm:p-6 border-2 border-[#E7C878]/35 bg-[#1A1210]/95">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Side: High-Resolution Authentic Weapon Photo Showcase */}
            <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[440px] w-full overflow-hidden rounded-[28px] border-2 border-[#E7C878]/40 bg-[#120B09] shadow-2xl group">
              <Image
                src={weapon.image}
                alt={weapon.nameEn}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />

              {/* Floating Top Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#A61B1B]/90 border border-[#E7C878]/50 text-xs font-bold text-[#FFFDF8] shadow-lg backdrop-blur-md flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{language === 'bn' ? `দশভুজার ${weapon.number}ম মহাশস্ত্র` : `Weapon #${weapon.number} of 10`}</span>
                </span>
              </div>

              {/* Floating Bottom Sanskrit & Title Overlay */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded-[20px] bg-[#1A1210]/90 backdrop-blur-md border border-[#E7C878]/30 shadow-xl text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#FFF8EA]">
                  {language === 'bn' ? weapon.nameBn : weapon.nameEn}
                </h3>
                <p className="text-xs font-mono text-[#E7C878] font-bold tracking-widest uppercase">
                  {weapon.sanskritName}
                </p>
              </div>
            </div>

            {/* Right Side: Bestowed By, Battlefield Role, Sanskrit Shloka & Spiritual Focus */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 p-2 sm:p-4">
              <div className="space-y-4">
                {/* Top 2 Attribute Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 rounded-[22px] bg-[#FFFDF8]/[0.06] border border-[#E7C878]/30 space-y-1.5 shadow-xs">
                    <span className="text-xs text-[#E7C878]/80 block font-sans font-medium uppercase tracking-wider">
                      {language === 'bn' ? 'দাতা দেবতা / শাস্ত্রীয় উৎস' : 'Bestowed By / Divine Source'}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-[#FFF8EA] font-serif block">
                      {language === 'bn' ? weapon.donorBn : weapon.donorEn}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-[22px] bg-[#FFFDF8]/[0.06] border border-[#E7C878]/30 space-y-1.5 shadow-xs">
                    <span className="text-xs text-[#E7C878]/80 block font-sans font-medium uppercase tracking-wider">
                      {language === 'bn' ? 'যুদ্ধে প্রধান ভূমিকা' : 'Battlefield Role & Impact'}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#FFF8EA] block leading-relaxed">
                      {language === 'bn' ? weapon.battleMomentBn : weapon.battleMomentEn}
                    </span>
                  </div>
                </div>

                {/* Authentic Scriptural Shloka Box */}
                <div className="p-6 rounded-[24px] bg-[#120B09]/95 border-2 border-[#E7C878]/35 text-center space-y-3 shadow-inner">
                  <p className="text-base sm:text-lg text-[#E7C878] font-mono font-bold tracking-wide leading-relaxed">
                    {weapon.shlokaBn}
                  </p>
                  <p className="text-xs sm:text-sm text-[#FFF8EA]/90 font-sans italic pt-1 leading-relaxed">
                    {language === 'bn' ? weapon.shlokaMeaningBn : weapon.shlokaMeaningEn}
                  </p>
                  <div className="pt-2 border-t border-[#FFFDF8]/10 flex items-center justify-center gap-2 text-[11px] text-[#E7C878]/70 uppercase tracking-widest font-mono font-semibold">
                    <Sparkles className="w-3 h-3 text-[#E7C878]" />
                    <span>{language === 'bn' ? 'শ্রীশ্রীমার্কণ্ডেয় পুরাণ • দেবী মাহাত্ম্য' : 'Sri Sri Markandeya Purana • Devi Mahatmya'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Spiritual Theme Badge */}
              <div className="p-4 rounded-[20px] bg-[#FFFDF8]/[0.06] border border-[#E7C878]/30 text-xs sm:text-sm text-[#E7C878] font-semibold flex items-center justify-center gap-2.5 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
                <span className="text-center">{language === 'bn' ? weapon.focusBn : weapon.focusEn}</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Complete Multi-Paragraph Puranic Story (পৌরাণিক কাহিনী) */}
      <ScrollReveal delay={0.12} distance={45}>
        <div className="agomoni-card p-6 sm:p-12 space-y-8 shadow-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-[#FFFDF8]/10 text-[#E7C878]">
            <BookOpen className="w-6 h-6 text-[#E7C878]" />
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF8EA]">
                {language === 'bn' ? 'সম্পূর্ণ পৌরাণিক আখ্যান ও মহিষাসুর সংহার' : 'Complete Puranic Narrative & Battle Lore'}
              </h3>
              <p className="text-xs text-[#FFF8EA]/60 mt-0.5">
                {language === 'bn'
                  ? 'মার্কণ্ডেয় পুরাণে বর্ণিত অস্ত্রের সৃষ্টি ও রণক্ষেত্রের মহাশক্তি'
                  : 'Origin, bestowal, and deployment of the weapon in the Devi Mahatmya'}
              </p>
            </div>
          </div>

          {/* Narrative Paragraphs */}
          <div className="grid grid-cols-1 gap-6 text-sm sm:text-base text-[#FFF8EA]/90 leading-relaxed font-sans">
            {(language === 'bn' ? weapon.pouranicKahiniBn : weapon.pouranicKahiniEn).map((paragraph, index) => (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-[24px] bg-[#FFFDF8]/[0.06] backdrop-blur-md border border-[#FFFDF8]/10 hover:border-[#E7C878]/30 transition-all shadow-xs"
              >
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/40 text-[#E7C878] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    {index + 1}
                  </span>
                  <p className="leading-relaxed flex-1 text-base">{paragraph}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Spiritual Philosophy & Conquering 6 Inner Vices */}
          <div className="p-6 sm:p-8 rounded-[28px] bg-[#1A1210]/90 backdrop-blur-xl border border-[#E7C878]/35 space-y-3 shadow-md">
            <div className="flex items-center gap-2 text-sm font-bold text-[#E7C878] uppercase tracking-wider font-serif">
              <Sparkle className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'আধ্যাত্মিক দর্শন ও ষড়রিপু দমন' : 'Spiritual Philosophy & Conquering Inner Vices'}</span>
            </div>

            <p className="text-sm sm:text-base text-[#FFF8EA]/90 leading-relaxed font-sans pt-1">
              {language === 'bn' ? weapon.spiritualMeaningBn : weapon.spiritualMeaningEn}
            </p>
          </div>

          {/* Previous / Next Weapon Navigation Bar */}
          <div className="pt-6 border-t border-[#FFFDF8]/12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/culture/weapons/${prevWeapon.id}`}
              className="apple-btn-secondary px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>
                {language === 'bn' ? `পূর্ববর্তী: ${prevWeapon.nameBn}` : `Prev: ${prevWeapon.nameEn}`}
              </span>
            </Link>

            <Link
              href={`/culture/weapons/${nextWeapon.id}`}
              className="apple-btn-secondary px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>
                {language === 'bn' ? `পরবর্তী: ${nextWeapon.nameBn}` : `Next: ${nextWeapon.nameEn}`}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* 5. Explore All 10 Divine Weapons Photo Grid (3 items in a row) */}
      <div className="space-y-8 pt-4">
        <SectionHeading
          tagBn="দশভুজার ১০টি মহাশস্ত্র পরিক্রমা"
          tagEn="Explore All 10 Divine Weapons"
          titleBn="অন্যান্য মহাশস্ত্রের পৌরাণিক কাহিনী"
          titleEn="Explore Other Sacred Weapons"
          subtitleBn="যে কোনো অস্ত্রের ছবিতে ট্যাপ করে তার সম্পূর্ণ পৌরাণিক কাহিনী ও শ্লোক পাঠ করুন।"
          subtitleEn="Tap any weapon photo to open its dedicated lore chapter and scriptural breakdown."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {WEAPONS_DATA.map((w) => (
            <Link
              key={w.id}
              href={`/culture/weapons/${w.id}`}
              className={cn(
                'agomoni-card overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer active:scale-[0.98] text-left p-0 shadow-md',
                w.id === weapon.id
                  ? 'border-2 border-[#E7C878] shadow-xl scale-[1.03] ring-2 ring-[#E7C878]/30'
                  : 'border border-[#FFFDF8]/12 hover:border-[#E7C878]/60 hover:bg-[#FFFDF8]/[0.12]'
              )}
            >
              <div className="relative w-full h-44 overflow-hidden bg-[#1A1210]">
                <Image
                  src={w.image}
                  alt={w.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/35 text-[11px] text-[#E7C878] font-bold">
                  {w.number}/১০
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                <div>
                  <h4 className={cn(
                    'text-base font-bold font-serif leading-snug truncate',
                    w.id === weapon.id ? 'text-[#E7C878]' : 'text-[#FFF8EA] group-hover:text-[#E7C878]'
                  )}>
                    {language === 'bn' ? w.nameBn : w.nameEn}
                  </h4>
                  <p className="text-xs text-[#D4AA50] font-semibold truncate mt-0.5">
                    {language === 'bn' ? w.donorBn : w.donorEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#FFFDF8]/8 flex items-center justify-between text-xs text-[#E7C878] font-bold">
                  <span>{language === 'bn' ? 'পাঠ করুন' : 'Read'}</span>
                  <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
