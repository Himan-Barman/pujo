'use client';

import React, { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/stores/ui-store';
import { useShare } from '@/hooks/use-share';
import { NABAPATRIKA_PLANTS_DATA } from '@/data/nabapatrika-plants';
import { ArrowLeft, Leaf, Sparkles, BookOpen, Share2, Check, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
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
  const { openShare } = useShare();

  const plantIndex = NABAPATRIKA_PLANTS_DATA.findIndex((p) => p.id === resolvedParams.id);
  const plant = NABAPATRIKA_PLANTS_DATA[plantIndex];

  if (!plant) {
    notFound();
  }

  const prevPlant = plantIndex > 0 ? NABAPATRIKA_PLANTS_DATA[plantIndex - 1] : NABAPATRIKA_PLANTS_DATA[NABAPATRIKA_PLANTS_DATA.length - 1];
  const nextPlant = plantIndex < NABAPATRIKA_PLANTS_DATA.length - 1 ? NABAPATRIKA_PLANTS_DATA[plantIndex + 1] : NABAPATRIKA_PLANTS_DATA[0];

  const handleShare = () => {
    openShare({
      titleBn: plant.nameBn,
      titleEn: plant.nameEn,
      descriptionBn: plant.significanceBn,
      descriptionEn: plant.significanceEn,
      categoryBn: `নবপত্রিকার পবিত্র উদ্ভিদ • রূপ ${plant.number}/৯`,
      categoryEn: `Sacred Nabapatrika Flora • ${plant.number}/9`,
      tagBn: `দেবী রূপ: ${plant.deityBn}`,
      tagEn: `Deity Form: ${plant.deityEn}`,
      image: plant.image,
      customQuoteBn: plant.mantraBn,
      customQuoteEn: plant.mantraEn,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* 1. Top Navigation Bar (Mobile: Icon-only Left & Right | Desktop: Full Buttons) */}
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Left: Back Button */}
        <Link
          href="/culture"
          aria-label={language === 'bn' ? 'সকল ঐতিহ্য নিবন্ধে ফিরে যান' : 'Back to Heritage Archives'}
          className="w-10 h-10 sm:w-auto sm:px-5 sm:py-2.5 rounded-full bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/15 text-[#E7C878] hover:text-[#FFF8EA] hover:border-[#E7C878]/50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
          <span className="hidden sm:inline">
            {language === 'bn' ? 'সকল ঐতিহ্য নিবন্ধে ফিরে যান' : 'Back to Heritage Archives'}
          </span>
        </Link>

        {/* Right: Share Button */}
        <button
          type="button"
          onClick={handleShare}
          aria-label={language === 'bn' ? 'উদ্ভিদের কাহিনী শেয়ার করুন' : 'Share Plant Lore'}
          className="w-10 h-10 sm:w-auto sm:px-5 sm:py-2.5 rounded-full bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/15 text-[#E7C878] hover:text-[#FFF8EA] hover:border-[#E7C878]/50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
          ) : (
            <Share2 className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
          )}
          <span className="hidden sm:inline">
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
                sizes="(max-width: 1024px) 100vw, 40vw"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {NABAPATRIKA_PLANTS_DATA.map((p) => (
            <Link
              key={p.id}
              href={`/culture/plants/${p.id}`}
              className={cn(
                'agomoni-card overflow-hidden transition-all duration-300 flex flex-row sm:flex-col justify-between h-auto sm:h-full group cursor-pointer active:scale-[0.98] text-left p-2.5 sm:p-0 shadow-md gap-3 sm:gap-0 rounded-[20px] sm:rounded-[28px]',
                p.id === plant.id
                  ? 'border-2 border-[#E7C878] shadow-xl scale-[1.01] sm:scale-[1.03] ring-2 ring-[#E7C878]/30 bg-[#FFFDF8]/[0.08]'
                  : 'border border-[#FFFDF8]/12 hover:border-[#E7C878]/60 hover:bg-[#FFFDF8]/[0.12]'
              )}
            >
              {/* Thumbnail on Mobile, Full Banner on Desktop */}
              <div className="relative w-20 h-20 sm:w-full sm:h-44 rounded-xl sm:rounded-none overflow-hidden bg-[#1A1210] flex-shrink-0 self-center sm:self-auto">
                <Image
                  src={p.image}
                  alt={p.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 50vw, 33vw"
                />
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />
                <div className="hidden sm:block absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/35 text-[11px] text-[#E7C878] font-bold">
                  {p.number}/৯
                </div>
              </div>

              <div className="p-0 sm:p-4 flex flex-col flex-1 justify-center sm:justify-between sm:space-y-2 min-w-0">
                <div>
                  {/* Mobile Tag Row */}
                  <div className="flex sm:hidden items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#1A1210] border border-[#6EE7B7]/30 text-[9.5px] text-[#6EE7B7] font-bold">
                      {p.number}/৯
                    </span>
                    <span className="text-[10px] text-[#E7C878] font-mono italic truncate max-w-[150px]">
                      {p.botanical}
                    </span>
                  </div>

                  <h4 className={cn(
                    'text-sm sm:text-base font-bold font-serif transition-colors truncate',
                    p.id === plant.id ? 'text-[#E7C878]' : 'text-[#FFF8EA] group-hover:text-[#E7C878]'
                  )}>
                    {language === 'bn' ? p.nameBn : p.nameEn}
                  </h4>
                  <span className="text-[11px] sm:text-xs text-[#D4AA50] font-bold block mt-0.5 truncate">
                    {language === 'bn' ? `অধিষ্ঠাত্রী: ${p.deityBn}` : `Presiding: ${p.deityEn}`}
                  </span>
                </div>

                {/* Desktop Action */}
                <div className="hidden sm:flex pt-2 border-t border-[#FFFDF8]/8 items-center justify-between text-xs text-[#E7C878] font-bold">
                  <span>{language === 'bn' ? 'পাঠ করুন' : 'Read'}</span>
                  <span>→</span>
                </div>
              </div>

              {/* Mobile Right Arrow */}
              <div className="flex sm:hidden items-center justify-center pr-1 text-[#6EE7B7] flex-shrink-0 self-center">
                <div className="w-7 h-7 rounded-full bg-[#FFFDF8]/8 border border-[#FFFDF8]/12 flex items-center justify-center group-hover:bg-[#6EE7B7] group-hover:text-[#120B09] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
