'use client';

import React, { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/stores/ui-store';
import { NABAPATRIKA_PLANTS_DATA } from '@/data/nabapatrika-plants';
import { ArrowLeft, Leaf, Sparkles, BookOpen, Share2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { cn } from '@/lib/utils';

interface PlantDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PlantDetailPage({ params }: PlantDetailPageProps) {
  const resolvedParams = use(params);
  const language = useUIStore((state) => state.language);
  const [copied, setCopied] = useState(false);

  const plantIndex = NABAPATRIKA_PLANTS_DATA.findIndex((p) => p.id === resolvedParams.id);
  const plant = NABAPATRIKA_PLANTS_DATA[plantIndex];

  if (!plant) {
    notFound();
  }

  const prevPlant = plantIndex > 0 ? NABAPATRIKA_PLANTS_DATA[plantIndex - 1] : NABAPATRIKA_PLANTS_DATA[NABAPATRIKA_PLANTS_DATA.length - 1];
  const nextPlant = plantIndex < NABAPATRIKA_PLANTS_DATA.length - 1 ? NABAPATRIKA_PLANTS_DATA[plantIndex + 1] : NABAPATRIKA_PLANTS_DATA[0];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator.share({
          title: language === 'bn' ? plant.nameBn : plant.nameEn,
          text: language === 'bn' ? plant.significanceBn : plant.significanceEn,
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
                ? 'উদ্ভিদের কাহিনী শেয়ার করুন'
                : 'Share Plant Lore'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Master Section Heading */}
      <SectionHeading
        tagBn={`নবপত্রিকার পবিত্র উদ্ভিদ • রূপ ${plant.number}/৯`}
        tagEn={`Sacred Nabapatrika Flora • ${plant.number}/9`}
        titleBn={plant.nameBn}
        titleEn={plant.nameEn}
        subtitleBn={plant.significanceBn}
        subtitleEn={plant.significanceEn}
      />

      {/* 3. Featured Plant Photo (Left) & Attributes (Right) Hero Showcase */}
      <ScrollReveal delay={0.08} distance={45}>
        <div className="agomoni-card overflow-hidden relative shadow-2xl p-4 sm:p-6 border-2 border-[#E7C878]/35 bg-[#1A1210]/95">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left Side: High-Resolution Authentic Botanical Photo Showcase */}
            <div className="lg:col-span-5 relative min-h-[360px] sm:min-h-[440px] w-full overflow-hidden rounded-[28px] border-2 border-[#E7C878]/40 bg-[#120B09] shadow-2xl group">
              <Image
                src={plant.image}
                alt={plant.nameEn}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />

              {/* Floating Top Sequence Badge */}
              <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/50 text-xs font-bold text-[#E7C878] shadow-lg backdrop-blur-md flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{language === 'bn' ? `নবপত্রিকা ${plant.number}/৯` : `Plant #${plant.number} of 9`}</span>
                </span>
              </div>

              {/* Floating Bottom Botanical Overlay */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 p-4 rounded-[20px] bg-[#1A1210]/90 backdrop-blur-md border border-[#E7C878]/30 shadow-xl text-center space-y-1">
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#FFF8EA]">
                  {language === 'bn' ? plant.nameBn : plant.nameEn}
                </h3>
                <p className="text-xs font-mono text-[#E7C878] font-bold italic tracking-widest">
                  {plant.botanical}
                </p>
              </div>
            </div>

            {/* Right Side: Ayurvedic Healing, Ritual Application, Vedic Mantra & Presiding Goddess */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 p-2 sm:p-4">
              <div className="space-y-4">
                {/* Top 2 Attribute Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 rounded-[22px] bg-[#FFFDF8]/[0.06] border border-[#E7C878]/30 space-y-1.5 shadow-xs">
                    <span className="text-xs text-[#E7C878]/80 block font-sans font-medium uppercase tracking-wider">
                      {language === 'bn' ? 'আয়ুর্বেদিক ভেষজ গুণ' : 'Ayurvedic Healing Secrets'}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#FFF8EA] block leading-relaxed">
                      {language === 'bn' ? plant.healingBn : plant.healingEn}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-[22px] bg-[#FFFDF8]/[0.06] border border-[#E7C878]/30 space-y-1.5 shadow-xs">
                    <span className="text-xs text-[#E7C878]/80 block font-sans font-medium uppercase tracking-wider">
                      {language === 'bn' ? 'পূজাবিধি ও ব্যবহার' : 'Ritual Application'}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#FFF8EA] block leading-relaxed">
                      {language === 'bn' ? plant.ritualUseBn : plant.ritualUseEn}
                    </span>
                  </div>
                </div>

                {/* Authentic Scriptural Invocation Mantra */}
                <div className="p-6 rounded-[24px] bg-[#120B09]/95 border-2 border-[#E7C878]/35 text-center space-y-3 shadow-inner">
                  <p className="text-base sm:text-lg text-[#E7C878] font-mono font-bold tracking-wide leading-relaxed">
                    {plant.mantraBn}
                  </p>
                  <p className="text-xs sm:text-sm text-[#FFF8EA]/90 font-sans italic pt-1 leading-relaxed">
                    {language === 'bn'
                      ? 'বাঙালি সংস্কৃতিতে প্রকৃতির প্রতিটি উদ্ভিদকে জগন্মাতার চিন্ময়ী রূপ হিসেবে আবাহন করা হয়।'
                      : 'Invoking the supreme consciousness of the Mother through sacred plant energy.'}
                  </p>
                  <div className="pt-2 border-t border-[#FFFDF8]/10 flex items-center justify-center gap-2 text-[11px] text-[#E7C878]/70 uppercase tracking-widest font-mono font-semibold">
                    <Sparkles className="w-3 h-3 text-[#E7C878]" />
                    <span>{language === 'bn' ? 'নবপত্রিকা আবাহন বৈদিক মন্ত্র' : 'Nabapatrika Vedic Invocation Mantra'}</span>
                  </div>
                </div>
              </div>

              {/* Bottom Presiding Goddess Badge */}
              <div className="p-4 rounded-[20px] bg-[#FFFDF8]/[0.06] border border-[#E7C878]/30 text-xs sm:text-sm text-[#E7C878] font-semibold flex items-center justify-center gap-2.5 shadow-xs">
                <Sparkles className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
                <span className="text-center font-serif text-sm">
                  {language === 'bn' ? `অধিষ্ঠাত্রী দেবী: ${plant.deityBn}` : `Presiding Goddess: ${plant.deityEn}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Complete Multi-Paragraph Story (পৌরাণিক ও ভেষজ কাহিনী) */}
      <ScrollReveal delay={0.12} distance={45}>
        <div className="agomoni-card p-6 sm:p-12 space-y-8 shadow-2xl">
          <div className="flex items-center gap-3 pb-4 border-b border-[#FFFDF8]/10 text-[#E7C878]">
            <BookOpen className="w-6 h-6 text-[#E7C878]" />
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF8EA]">
                {language === 'bn' ? 'পৌরাণিক আখ্যান ও পরিবেশীয় তাৎপর্য' : 'Puranic Legend & Ecological Lore'}
              </h3>
              <p className="text-xs text-[#FFF8EA]/60 mt-0.5">
                {language === 'bn'
                  ? 'বৈদিক ঐতিহ্য, অধিষ্ঠাত্রী দেবী ও বাংলার প্রাচীন কৃষিভাবনা'
                  : 'Vedic heritage, presiding goddess, and agrarian ecology of Bengal'}
              </p>
            </div>
          </div>

          {/* Narrative Paragraphs */}
          <div className="grid grid-cols-1 gap-6 text-sm sm:text-base text-[#FFF8EA]/90 leading-relaxed font-sans">
            {(language === 'bn' ? plant.pouranicKahiniBn : plant.pouranicKahiniEn).map((paragraph, index) => (
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

          {/* Previous / Next Plant Navigation Bar */}
          <div className="pt-6 border-t border-[#FFFDF8]/12 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href={`/culture/plants/${prevPlant.id}`}
              className="apple-btn-secondary px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>
                {language === 'bn' ? `পূর্ববর্তী: ${prevPlant.nameBn}` : `Prev: ${prevPlant.nameEn}`}
              </span>
            </Link>

            <Link
              href={`/culture/plants/${nextPlant.id}`}
              className="apple-btn-secondary px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              <span>
                {language === 'bn' ? `পরবর্তী: ${nextPlant.nameBn}` : `Next: ${nextPlant.nameEn}`}
              </span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {/* 5. Explore All 9 Plants Photo Grid (3 items in a row) */}
      <div className="space-y-8 pt-4">
        <SectionHeading
          tagBn="নবপত্রিকার ৯টি পবিত্র উদ্ভিদ পরিক্রমা"
          tagEn="Explore All 9 Sacred Plants"
          titleBn="অন্যান্য ঔষধি উদ্ভিদের পৌরাণিক কাহিনী"
          titleEn="Explore Other Botanical Incarnations"
          subtitleBn="যে কোনো উদ্ভিদের ছবিতে ট্যাপ করে তার সম্পূর্ণ পৌরাণিক আখ্যান ও ঔষধি গুণ পাঠ করুন।"
          subtitleEn="Tap any plant photo to open its dedicated botanical chapter and scriptural breakdown."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {NABAPATRIKA_PLANTS_DATA.map((p) => (
            <Link
              key={p.id}
              href={`/culture/plants/${p.id}`}
              className={cn(
                'agomoni-card overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer active:scale-[0.98] text-left p-0 shadow-md',
                p.id === plant.id
                  ? 'border-2 border-[#E7C878] shadow-xl scale-[1.03] ring-2 ring-[#E7C878]/30'
                  : 'border border-[#FFFDF8]/12 hover:border-[#E7C878]/60 hover:bg-[#FFFDF8]/[0.12]'
              )}
            >
              <div className="relative w-full h-44 overflow-hidden bg-[#1A1210]">
                <Image
                  src={p.image}
                  alt={p.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/35 text-[11px] text-[#E7C878] font-bold">
                  {p.number}/৯
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                <div>
                  <h4 className={cn(
                    'text-base font-bold font-serif transition-colors',
                    p.id === plant.id ? 'text-[#E7C878]' : 'text-[#FFF8EA] group-hover:text-[#E7C878]'
                  )}>
                    {language === 'bn' ? p.nameBn : p.nameEn}
                  </h4>
                  <span className="text-xs text-[#D4AA50] font-bold block mt-0.5">
                    {language === 'bn' ? `অধিষ্ঠাত্রী: ${p.deityBn}` : `Presiding: ${p.deityEn}`}
                  </span>
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
