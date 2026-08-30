'use client';

import React, { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/stores/ui-store';
import { BHOG_ITEMS } from '@/data/bhog-menu';
import {
  ArrowLeft,
  Utensils,
  Clock,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  Heart,
  ShieldCheck,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { cn } from '@/lib/utils';

interface BhogDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function BhogDetailPage({ params }: BhogDetailPageProps) {
  const resolvedParams = use(params);
  const language = useUIStore((state) => state.language);
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const itemIndex = BHOG_ITEMS.findIndex((b) => b.id === resolvedParams.id);
  const item = BHOG_ITEMS[itemIndex];

  if (!item) {
    notFound();
  }

  const prevItem = itemIndex > 0 ? BHOG_ITEMS[itemIndex - 1] : BHOG_ITEMS[BHOG_ITEMS.length - 1];
  const nextItem = itemIndex < BHOG_ITEMS.length - 1 ? BHOG_ITEMS[itemIndex + 1] : BHOG_ITEMS[0];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      if (navigator.share) {
        navigator
          .share({
            title: language === 'bn' ? item.nameBn : item.nameEn,
            text: language === 'bn' ? item.taglineBn : item.taglineEn,
            url: window.location.href,
          })
          .catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  const handleToggleAudio = () => {
    if (!isPlayingAudio) {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 3);
        setIsPlayingAudio(true);
        setTimeout(() => setIsPlayingAudio(false), 3000);
      } catch {
        setIsPlayingAudio(false);
      }
    } else {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* 1. Top Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <Link
          href="/bhog"
          className="apple-btn-secondary px-4 sm:px-5 py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 w-full sm:w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'সকল মহাপ্রসাদে ফিরে যান' : 'Back to All Offerings'}</span>
        </Link>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleShare}
            className="apple-btn-secondary px-4 sm:px-5 py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-95 w-full sm:w-fit"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Share2 className="w-3.5 h-3.5 text-[#E7C878]" />}
            <span>
              {copied
                ? language === 'bn'
                  ? 'লিঙ্ক কপি হয়েছে!'
                  : 'Link Copied!'
                : language === 'bn'
                ? 'প্রসাদের কাহিনী শেয়ার করুন'
                : 'Share Bhog Lore'}
            </span>
          </button>
        </div>
      </div>

      {/* 2. Section Heading */}
      <SectionHeading
        tagBn={`পবিত্র দেবভোগ • ${item.pujaDayAssocBn}`}
        tagEn={`Sacred Offering • ${item.pujaDayAssocEn}`}
        titleBn={item.nameBn}
        titleEn={item.nameEn}
        subtitleBn={item.taglineBn}
        subtitleEn={item.taglineEn}
      />

      {/* 3. Hero Showcase Banner with Photo & Mantra */}
      <ScrollReveal delay={0.08} distance={40}>
        <div className="agomoni-card overflow-hidden relative shadow-2xl p-3.5 sm:p-6 border border-[#E7C878]/35 bg-[#1A1210]/95">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Left Photo Showcase */}
            <div className="lg:col-span-5 relative min-h-[260px] sm:min-h-[420px] w-full overflow-hidden rounded-[22px] sm:rounded-[28px] border-2 border-[#E7C878]/40 bg-[#120B09] shadow-2xl group">
              <Image
                src={item.image}
                alt={item.nameEn}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />

              {/* Floating Top Badge */}
              <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 flex items-center gap-2">
                <span className="px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/50 text-[11px] sm:text-xs font-bold text-[#E7C878] shadow-lg backdrop-blur-md flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{item.category.toUpperCase()}</span>
                </span>
              </div>

              {/* Bottom Tagline Overlay */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3.5 sm:left-3.5 sm:right-3.5 p-3 sm:p-4 rounded-[16px] sm:rounded-[20px] bg-[#1A1210]/90 backdrop-blur-md border border-[#E7C878]/30 shadow-xl text-center space-y-0.5 sm:space-y-1">
                <h3 className="text-base sm:text-xl font-bold font-serif text-[#FFF8EA]">
                  {language === 'bn' ? item.nameBn : item.nameEn}
                </h3>
                <p className="text-[11px] sm:text-xs font-sans text-[#E7C878] font-medium">
                  {language === 'bn' ? item.pujaDayAssocBn : item.pujaDayAssocEn}
                </p>
              </div>
            </div>

            {/* Right Meta, Lore & Sacred Mantra */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-5 p-2 sm:p-4">
              <div className="space-y-4">
                {/* Meta Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 sm:p-5 rounded-[22px] bg-[#FFFDF8]/[0.06] border border-[#E7C878]/30 space-y-1.5 shadow-xs">
                    <span className="text-xs text-[#E7C878]/80 block font-sans font-medium uppercase tracking-wider">
                      {language === 'bn' ? 'রন্ধন সময়' : 'Cooking Time'}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#FFF8EA] block font-mono">
                      {item.cookingTime}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5 rounded-[22px] bg-[#FFFDF8]/[0.06] border border-[#E7C878]/30 space-y-1.5 shadow-xs">
                    <span className="text-xs text-[#E7C878]/80 block font-sans font-medium uppercase tracking-wider">
                      {language === 'bn' ? 'সাত্ত্বিক শুদ্ধতা' : 'Sattvic Quality'}
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-[#FFF8EA] block flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#E7C878]" />
                      <span>{language === 'bn' ? 'পেঁয়াজ-রসুনহীন খাঁটি ঘি' : 'Zero Alliums & Desi Ghee'}</span>
                    </span>
                  </div>
                </div>

                {/* Lore / Significance */}
                <div className="p-5 rounded-[22px] bg-[#FFFDF8]/[0.06] border border-[#FFFDF8]/10 space-y-2">
                  <span className="text-[11px] font-bold text-[#E7C878] uppercase tracking-wider block font-mono">
                    {language === 'bn' ? 'শাস্ত্রীয় তাৎপর্য ও মাহাত্ম্য' : 'Spiritual Significance'}
                  </span>
                  <p className="text-sm text-[#FFF8EA]/85 leading-relaxed font-sans">
                    {language === 'bn' ? item.significanceBn : item.significanceEn}
                  </p>
                </div>

                {/* Offering Mantra */}
                <div className="p-5 rounded-[24px] bg-[#120B09]/95 border-2 border-[#E7C878]/35 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold text-[#E7C878] uppercase tracking-widest font-mono">
                      {language === 'bn' ? 'ভোগ নিবেদন বৈদিক মন্ত্র' : 'Sacred Naivedya Mantra'}
                    </span>

                    <button
                      type="button"
                      onClick={handleToggleAudio}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#A61B1B] text-[#FFFDF8] hover:bg-[#851515] text-[10px] font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                    >
                      {isPlayingAudio ? (
                        <>
                          <VolumeX className="w-3 h-3 animate-spin" />
                          <span>{language === 'bn' ? 'বাজছে...' : 'Playing...'}</span>
                        </>
                      ) : (
                        <>
                          <Volume2 className="w-3 h-3" />
                          <span>{language === 'bn' ? 'মন্ত্রধ্বনি শুনুন' : 'Chant Sound'}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#E7C878] font-mono font-bold leading-relaxed italic">
                    {language === 'bn'
                      ? 'ওঁ অমৃতোপস্তরণমসি স্বাহা। ওঁ প্রাণায় স্বাহা, ওঁ অপানায় স্বাহা, ওঁ ব্যানায় স্বাহা, ওঁ উদানায় স্বাহা, ওঁ সমানায় স্বাহা। ওঁ ব্রহ্মণে স্বাহা॥'
                      : 'Om Amritopastaranamasi Svaha | Om Pranaya Svaha, Om Apanaya Svaha, Om Vyanaya Svaha, Om Udanaya Svaha, Om Samanaya Svaha | Om Brahmane Svaha ||'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Complete Recipe Breakdown: Ingredients & Step-by-Step Method */}
      <ScrollReveal delay={0.12} distance={45}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Ingredients */}
          <div className="lg:col-span-5 space-y-4">
            <div className="agomoni-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#E7C878] uppercase tracking-wider pb-3 border-b border-[#FFFDF8]/10">
                <Utensils className="w-4 h-4 text-[#E7C878]" />
                <span>{language === 'bn' ? 'প্রয়োজনীয় বৈদিক উপাদানসমূহ' : 'Key Ingredients List'}</span>
              </div>

              <div className="space-y-2.5">
                {(language === 'bn' ? item.ingredientsBn : item.ingredientsEn).map((ing, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[16px] bg-[#241B18]/70 border border-[#FFFDF8]/8 flex items-center justify-between text-xs sm:text-sm text-[#FFF8EA]/95 font-sans hover:border-[#E7C878]/40 transition-colors"
                  >
                    <span className="font-medium">{ing}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
                  </div>
                ))}
              </div>

              {/* Serving Recommendation */}
              <div className="p-4 rounded-[18px] bg-[#241B18]/80 border border-[#E7C878]/30 space-y-1.5 mt-4">
                <span className="text-[11px] font-bold text-[#E7C878] uppercase tracking-wider block font-mono">
                  {language === 'bn' ? 'ঐতিহ্যবাহী পরিবেশন শৈলী:' : 'Traditional Accompaniments:'}
                </span>
                <p className="text-xs text-[#FFF8EA]/90 leading-relaxed font-sans">
                  {language === 'bn' ? item.servedWithBn : item.servedWithEn}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Cooking Method */}
          <div className="lg:col-span-7 space-y-4">
            <div className="agomoni-card p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[#E7C878] uppercase tracking-wider pb-3 border-b border-[#FFFDF8]/10">
                <BookOpen className="w-4 h-4 text-[#E7C878]" />
                <span>{language === 'bn' ? 'পর্যায়ক্রমিক ঐতিহ্যবাহী রন্ধন প্রণালী' : 'Step-by-Step Traditional Method'}</span>
              </div>

              <div className="space-y-3.5">
                {(language === 'bn' ? item.traditionalPreparationBn : item.traditionalPreparationEn).map(
                  (step, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-[20px] bg-[#241B18]/70 border border-[#FFFDF8]/8 flex items-start gap-3.5 shadow-xs hover:border-[#E7C878]/40 transition-colors"
                    >
                      <span className="w-8 h-8 rounded-full bg-[#1A1210] border border-[#E7C878]/40 text-[#E7C878] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 shadow-xs mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-[#FFF8EA]/95 leading-relaxed font-sans">
                        {step}
                      </p>
                    </div>
                  )
                )}
              </div>

              {/* Devotional Quote */}
              <div className="p-4 rounded-[18px] bg-[#A61B1B]/15 border border-[#A61B1B]/35 flex items-start gap-3 mt-4">
                <Heart className="w-4 h-4 text-[#E7C878] flex-shrink-0 mt-0.5" />
                <p className="text-xs text-[#FFF8EA]/90 leading-relaxed font-sans italic">
                  {language === 'bn'
                    ? 'ভোগ রান্নার প্রধান উপকরণ হলো অচঞ্চল চিত্ত ও অপার ভক্তি। শুদ্ধ মনে তৈরি প্রসাদেই দেবী পরম প্রসন্ন হন।'
                    : 'The ultimate ingredient of sacred Mahaprasad is unconditional love and devotion to the Mother.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 5. Previous / Next Bhog Item Navigation Bar */}
      <div className="pt-6 border-t border-[#FFFDF8]/12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link
          href={`/bhog/${prevItem.id}`}
          className="apple-btn-secondary px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>
            {language === 'bn' ? `পূর্ববর্তী: ${prevItem.nameBn}` : `Prev: ${prevItem.nameEn}`}
          </span>
        </Link>

        <Link
          href={`/bhog/${nextItem.id}`}
          className="apple-btn-secondary px-6 py-3 text-xs sm:text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <span>
            {language === 'bn' ? `পরবর্তী: ${nextItem.nameBn}` : `Next: ${nextItem.nameEn}`}
          </span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 6. Explore Other Bhog Offerings Photo Grid (3 items in a row) */}
      <div className="space-y-8 pt-4">
        <SectionHeading
          tagBn="অষ্টবিধ শারদ মহাপ্রসাদ"
          tagEn="Explore All Sacred Offerings"
          titleBn="অন্যান্য ঐতিহ্যবাহী দেবভোগ পদসমূহ"
          titleEn="Explore Other Traditional Bhog Courses"
          subtitleBn="যে কোনো পদে ট্যাপ করে তার সম্পূর্ণ বৈদিক রেসিপি ও রন্ধন প্রণালী পাঠ করুন।"
          subtitleEn="Tap any dish to open its dedicated recipe chapter and ritual breakdown."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {BHOG_ITEMS.map((b) => (
            <Link
              key={b.id}
              href={`/bhog/${b.id}`}
              className={cn(
                'agomoni-card overflow-hidden transition-all duration-300 flex flex-col justify-between h-full group cursor-pointer active:scale-[0.98] text-left p-0 shadow-md',
                b.id === item.id
                  ? 'border-2 border-[#E7C878] shadow-xl scale-[1.02] ring-2 ring-[#E7C878]/30'
                  : 'border border-[#FFFDF8]/12 hover:border-[#E7C878]/60 hover:bg-[#FFFDF8]/[0.12]'
              )}
            >
              <div className="relative w-full h-44 overflow-hidden bg-[#1A1210]">
                <Image
                  src={b.image}
                  alt={b.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210] via-[#1A1210]/20 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/35 text-[11px] text-[#E7C878] font-bold">
                  {language === 'bn' ? b.pujaDayAssocBn : b.pujaDayAssocEn}
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                <div>
                  <h4 className={cn(
                    'text-lg font-bold font-serif transition-colors',
                    b.id === item.id ? 'text-[#E7C878]' : 'text-[#FFF8EA] group-hover:text-[#E7C878]'
                  )}>
                    {language === 'bn' ? b.nameBn : b.nameEn}
                  </h4>
                  <p className="text-xs text-[#D4AA50] font-semibold block mt-1 line-clamp-1 italic">
                    {language === 'bn' ? b.taglineBn : b.taglineEn}
                  </p>
                  <p className="text-xs text-[#FFF8EA]/70 mt-1.5 line-clamp-2">
                    {language === 'bn' ? b.significanceBn : b.significanceEn}
                  </p>
                </div>

                <div className="pt-2.5 border-t border-[#FFFDF8]/8 flex items-center justify-between text-xs text-[#E7C878] font-bold">
                  <span>{language === 'bn' ? 'সম্পূর্ণ রেসিপি দেখুন' : 'View Full Recipe'}</span>
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
