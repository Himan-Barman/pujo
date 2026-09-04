'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/stores/ui-store';
import { BHOG_ITEMS } from '@/data/bhog-menu';
import { cn } from '@/lib/utils';
import {
  Utensils,
  Clock,
  Sparkles,
  BookOpen,
  Calendar,
  Flame,
  Volume2,
  VolumeX,
  Layers,
  Leaf,
  ShieldCheck,
  Award,
  ArrowRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

// Filter Categories matching the culture aesthetic
const CATEGORIES = [
  { id: 'all', bn: 'সব পদ', en: 'All 8 Offerings', icon: Layers },
  { id: 'khichuri', bn: 'খিচুড়ি ও অন্ন', en: 'Khichuri & Rice', icon: Utensils },
  { id: 'pulao', bn: 'বাসন্তী পোলাও', en: 'Basanti Pulao', icon: Sparkles },
  { id: 'luchi', bn: 'লুচি ও ডাল', en: 'Luchi & Dal', icon: Flame },
  { id: 'curry', bn: 'ব্যঞ্জন ও তরকারি', en: 'Curries & Labra', icon: Leaf },
  { id: 'fry', bn: 'পঞ্চভাজা', en: 'Pancha Bhaja', icon: Flame },
  { id: 'chutney', bn: 'চাটনি ও পাঁপড়', en: 'Chutney & Papad', icon: BookOpen },
  { id: 'sweet', bn: 'মিষ্টান্ন ও পরমান্ন', en: 'Payesh & Sweets', icon: Award },
];

// Tithi-wise Schedule
const TITHI_SCHEDULE = [
  {
    dayBn: 'মহা ষষ্ঠী',
    dayEn: 'Maha Sasthi',
    titleBn: 'বোধন ও পঞ্চামৃত নৈবেদ্য',
    titleEn: 'Bodhan & Panchamrita',
    descBn: 'বেলতলায় দেবীর আবাহন। তাজা ঋতুভিত্তিক ফলমূল, ননী, মিছরি, ক্ষীর ও পঞ্চামৃত সহযোগে শীতল নৈবেদ্য।',
    descEn: 'Awakening of Devi. Seasonal fresh fruits, butter, rock sugar, kheer, and Panchamrita cold offering.',
    highlightBn: 'ফলমূল ও মিষ্টান্ন',
    highlightEn: 'Fruits & Sweets',
  },
  {
    dayBn: 'মহা সপ্তমী',
    dayEn: 'Maha Saptami',
    titleBn: 'নবপত্রিকা প্রবেশ ও অন্নভোগ',
    titleEn: 'Nabapatrika & Annabhog',
    descBn: 'গোবিন্দভোগ চালের খাঁটি ঘিয়ে ভাজা খিচুড়ি, পঞ্চমিশালি লাবড়া, মুচমুচে বেগুনী ও আমসত্ত্বের চাটনি।',
    descEn: 'Aromatic Gobindobhog Khichuri, Panch Mishali Labra, crispy Beguni, and mango-date chutney.',
    highlightBn: 'খিচুড়ি ও লাবড়া',
    highlightEn: 'Khichuri & Labra',
  },
  {
    dayBn: 'মহা অষ্টমী',
    dayEn: 'Maha Ashtami',
    titleBn: 'রাজকীয় পুষ্পাঞ্জলি ও মহাভোগ',
    titleEn: 'Royal Pushpanjali Feast',
    descBn: 'ঘিয়ে ভাজা ফুলকো লুচি, নারকেল কোরা ছোলার ডাল, বাসন্তী পোলাও, ধোঁকার ডালনা ও ছানার পায়েশ।',
    descEn: 'Crisp puffed Luchi, coconut-tempered Chana Dal, Basanti Pulao, Dhokar Dalna, and Chhanar Payesh.',
    highlightBn: 'লুচি, পোলাও ও পায়েশ',
    highlightEn: 'Luchi & Pulao',
  },
  {
    dayBn: 'সন্ধিপূজা (রাত)',
    dayEn: 'Sandhi Puja',
    titleBn: '১০৮ প্রদীপ ও রক্তপদ্ম নৈবেদ্য',
    titleEn: '108 Diyas & Lotus Offering',
    descBn: 'অষ্টমী-নবমীর সন্ধিক্ষণে মা চামুণ্ডার পূজায় ১০৮টি মাটির প্রদীপ, ১০৮টি রক্তপদ্ম, মাখন, গুড় ও বিশেষ নৈবেদ্য।',
    descEn: 'Offering to Devi Chamunda with 108 earthen lamps, 108 red lotuses, makhan, and special naivedya.',
    highlightBn: '১০৮ পদ্ম ও প্রদীপ',
    highlightEn: '108 Diyas & Lotuses',
  },
  {
    dayBn: 'মহা নবমী',
    dayEn: 'Maha Navami',
    titleBn: 'মহাযজ্ঞ সমাপন ও রাজভোগ',
    titleEn: 'Yajna Maha Rajbhog',
    descBn: 'যজ্ঞের পূর্ণাহুতি উপলক্ষে এলাচ-জাফরানি খিচুড়ি, পঞ্চব্যঞ্জন, কাশ্মীরি আলুর দম, রাজকীয় ক্ষীর ও সন্দেশ।',
    descEn: 'Grand Yajna feast featuring rich ghee khichuri, Pancha Bhaja, Alur Dum, Sandesh, and Kheer.',
    highlightBn: 'রাজকীয় মহাপ্রসাদ',
    highlightEn: 'Grand Mahaprasad',
  },
  {
    dayBn: 'বিজয়া দশমী',
    dayEn: 'Bijoya Dashami',
    titleBn: 'দর্পণ বিসর্জন ও শীতল ভোগ',
    titleEn: 'Darpan & Shital Bhog',
    descBn: 'দেবীর বিদায়লগ্নে মুখ মিষ্টির জন্য গরম রসগোল্লা ও ঐতিহ্যবাহী শীতল ভোগ (জলঢালা পান্তা ভাত ও কচু শাক)।',
    descEn: 'Traditional departure offering: cool watered Panta Bhat with tender greens and warm Rosogollas.',
    highlightBn: 'পান্তা ভাত ও রসগোল্লা',
    highlightEn: 'Panta & Sweets',
  },
];

// Sattvic Pillars
const SATTVIC_PILLARS = [
  {
    titleBn: 'পেঁয়াজ-রসুনহীন পরম শুদ্ধতা',
    titleEn: 'Zero Alliums (Sattvic Purity)',
    descBn: 'তামসিক ও রাজসিক প্রভাব দূর করে চিত্তে শান্তি ও ভক্তি জাগ্রত রাখতে কোনো পেঁয়াজ বা রসুন ব্যবহৃত হয় না।',
    descEn: 'Excludes onions and garlic to preserve mental serenity, spiritual clarity, and Sattvic harmony.',
    icon: ShieldCheck,
  },
  {
    titleBn: 'খাঁটি গাওয়া ঘি ও সৈন্ধব লবণ',
    titleEn: 'Pure Desi Ghee & Sendha Salt',
    descBn: 'সাধারণ সামুদ্রিক লবণের বদলে পবিত্র সৈন্ধব লবণ এবং উদ্ভিজ্জ তেলের বদলে খাঁটি গরুর দুধের গাওয়া ঘি প্রধান।',
    descEn: 'Cooked with pure cow-milk desi ghee and mineral-rich Himalayan rock salt for sacred vitality.',
    icon: Flame,
  },
  {
    titleBn: 'কাঁসা, পিতল ও শালপাতার ঐতিহ্য',
    titleEn: 'Bell Metal & Organic Sal Leaves',
    descBn: 'ঐতিহ্যবাহী কাঁসার পাত্রে রান্না ও পরিবেশন করা হয়, যা খাদ্যগুণ অক্ষুণ্ণ রাখে ও সুবাস বহুগুণ বাড়ায়।',
    descEn: 'Served in traditional bell-metal (Kansa) and fresh sal leaf thalis for natural purity and grounding.',
    icon: Award,
  },
  {
    titleBn: 'মৌন ভক্তি ও নিবেদন মন্ত্র',
    titleEn: 'Devotional Chant & Mantras',
    descBn: 'রান্নার সময় পবিত্র মন্ত্র উচ্চারণ ও দেবী দুর্গার চরণে পূর্ণ সমর্পণভাব বজায় রাখা হয়।',
    descEn: 'Prepared in quiet meditation and offered with the ancient Vedic Gayatri and Naivedya mantras.',
    icon: Leaf,
  },
];

export const BhogExplorer: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const filteredItems =
    activeCategory === 'all'
      ? BHOG_ITEMS
      : BHOG_ITEMS.filter((item) => item.category === activeCategory);

  // Play synthetic Vedic bells sound
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
    <div className="space-y-16">
      {/* 1. Hero Platter Showcase Banner */}
      <div className="agomoni-card overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Visual Platter Image */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 w-full">
            <Image
              src="/images/bhog/bhog-khichuri.jpg"
              alt="Durga Puja Bhog Mahaprasad Platter"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#241B18]/70 via-transparent to-transparent" />
          </div>

          {/* Right Info Box & Sacred Mantra Audio */}
          <div className="lg:col-span-5 p-6 sm:p-10 space-y-4 bg-[#FFFDF8]/8 backdrop-blur-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[#E7C878] text-xs font-bold shadow-xs">
              <Utensils className="w-3.5 h-3.5 text-[#E7C878]" />
              <span>{language === 'bn' ? 'সাত্ত্বিক অন্নভোগ' : 'Pure Sattvic Offering'}</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-[#E7C878] font-serif">
              {language === 'bn' ? 'কাঁসার থালায় শারদ মহাপ্রসাদ' : 'Sacred Puja Bhog Platter'}
            </h3>

            <p className="text-sm text-[#FFF8EA]/75 leading-relaxed font-sans">
              {language === 'bn'
                ? 'দুর্গাপূজার ভোগে পেঁয়াজ-রসুনের বিন্দুমাত্র স্পর্শ থাকে না। শুদ্ধ চিত্তে ঘিয়ে ভাজা সোনা মুগ ডাল, সুগন্ধি গোবিন্দভোগ চাল এবং কাজু-কিশমিশের মেলবন্ধনে তৈরি হয় অমৃতসম প্রসাদ।'
                : 'Prepared strictly without onion or garlic, seasoned with whole fragrant spices, ginger, and pure desi ghee, this sacred prasad nourishes body and soul.'}
            </p>

            {/* Sacred Bhog Mantra Snippet & Audio Button */}
            <div className="p-4 rounded-[20px] bg-[#241B18] border border-[#FFFDF8]/10 space-y-2 shadow-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-[#E7C878] uppercase tracking-wider font-mono">
                  {language === 'bn' ? 'ভোগ নিবেদন মন্ত্র' : 'Naivedya Mantra'}
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
                      <span>{language === 'bn' ? 'মন্ত্রধ্বনি' : 'Audio'}</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-[#E7C878] font-mono font-bold leading-relaxed italic">
                {language === 'bn'
                  ? 'ওঁ অমৃতোপস্তরণমসি স্বাহা। ওঁ প্রাণায় স্বাহা, ওঁ অপানায় স্বাহা, ওঁ ব্যানায় স্বাহা, ওঁ উদানায় স্বাহা, ওঁ সমানায় স্বাহা। ওঁ ব্রহ্মণে স্বাহা॥'
                  : 'Om Amritopastaranamasi Svaha | Om Pranaya Svaha, Om Apanaya Svaha, Om Vyanaya Svaha, Om Udanaya Svaha, Om Samanaya Svaha | Om Brahmane Svaha ||'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Category Filter Bar */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#241B18] text-[10px] uppercase font-bold text-[#E7C878] tracking-wider shadow-xs">
            <Sparkles className="w-3 h-3 text-[#C99A3D]" />
            <span>{language === 'bn' ? 'অষ্টবিধ রাজভোগ' : 'The 8 Sacred Courses'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#E7C878]">
            {language === 'bn' ? 'মহাপ্রসাদের অষ্টবিধ পদসমূহ' : 'The 8 Sacred Offering Courses'}
          </h3>
          <p className="text-xs sm:text-sm text-[#FFF8EA]/75 font-sans">
            {language === 'bn'
              ? 'নিচের যে কোনো পদে ট্যাপ করে তার সম্পূর্ণ বৈদিক রেসিপি, রন্ধন প্রণালী ও তাৎপর্য পাঠ করুন'
              : 'Tap any course below to open its dedicated page with authentic preparation steps and ingredients.'}
          </p>
        </div>

        {/* Horizontal Category Segmented Pill Bar with Unified Capsule Container & Edge Blur */}
        <div className="relative w-full rounded-full p-1 sm:p-1.5 bg-[#120B09]/60 backdrop-blur-xl border border-[#FFFDF8]/10 shadow-xl overflow-hidden group/nav select-none">
          {/* Scroll Track with Progressive Edge Mask */}
          <div
            className="w-full overflow-x-auto no-scrollbar py-1 px-4 sm:px-10 flex items-center justify-start lg:justify-center gap-2 sm:gap-3 scroll-smooth relative z-0"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 1.5%, rgba(0,0,0,0.8) 4%, black 8%, black 92%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.3) 98.5%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 1.5%, rgba(0,0,0,0.8) 4%, black 8%, black 92%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.3) 98.5%, transparent 100%)',
            }}
          >
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={(e) => {
                    setActiveCategory(cat.id);
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
                      : 'bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.08]'
                  )}
                >
                  <Icon className={cn('w-3.5 h-3.5', isActive ? 'text-[#FFFDF8]' : 'text-[#E7C878]')} />
                  <span>{language === 'bn' ? cat.bn : cat.en}</span>
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

        {/* 3. Course Cards: Sleek horizontal bars on mobile, full visual cards on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 items-stretch">
          {filteredItems.map((item) => (
            <Link
              key={item.id}
              href={`/bhog/${item.id}`}
              className="agomoni-card overflow-hidden transition-all duration-300 flex flex-row sm:flex-col justify-between h-auto sm:h-full group hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.12] cursor-pointer active:scale-[0.98] text-left p-2.5 sm:p-0 shadow-lg gap-3 sm:gap-0 rounded-[20px] sm:rounded-[28px]"
            >
              {/* Left Thumbnail on Mobile, Full Top Banner on Desktop */}
              <div className="relative w-20 h-20 sm:w-full sm:h-56 rounded-xl sm:rounded-none overflow-hidden bg-[#1A1210] flex-shrink-0 self-center sm:self-auto">
                <Image
                  src={item.image}
                  alt={item.nameEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 640px) 80px, (max-width: 768px) 50vw, 33vw"
                />
                <div className="hidden sm:block absolute inset-0 bg-gradient-to-t from-[#241B18]/80 via-transparent to-transparent" />

                {/* Top Left: Tithi Badge (Desktop) */}
                <div className="hidden sm:block absolute top-3 left-3 px-3 py-1 rounded-full bg-[#1A1210]/90 border border-[#E7C878]/35 text-[11px] text-[#E7C878] font-bold shadow-xs backdrop-blur-md">
                  {language === 'bn' ? item.pujaDayAssocBn : item.pujaDayAssocEn}
                </div>

                {/* Top Right: Cooking Time Badge (Desktop) */}
                <div className="hidden sm:flex absolute top-3 right-3 px-3 py-1 rounded-full bg-[#241B18]/90 border border-[#FFFDF8]/10 text-[11px] text-[#FFF8EA] font-semibold items-center gap-1.5 backdrop-blur-md shadow-xs">
                  <Clock className="w-3 h-3 text-[#C99A3D]" />
                  <span>{item.cookingTime}</span>
                </div>
              </div>

              {/* Recipe Content Body */}
              <div className="flex flex-col flex-1 justify-center sm:justify-between p-0 sm:p-6 md:p-7 min-w-0">
                <div>
                  {/* Mobile Meta Row */}
                  <div className="flex sm:hidden items-center gap-2 mb-1 flex-wrap">
                    <span className="px-2 py-0.5 rounded-full bg-[#241B18] text-[9.5px] uppercase font-bold text-[#E7C878] border border-[#E7C878]/30">
                      {language === 'bn' ? item.pujaDayAssocBn : item.pujaDayAssocEn}
                    </span>
                    <span className="text-[10px] text-[#FFF8EA]/60 flex items-center gap-1 font-mono">
                      <Clock className="w-2.5 h-2.5 text-[#E7C878]" />
                      <span>{item.cookingTime}</span>
                    </span>
                  </div>

                  {/* Desktop Category Pill Tag */}
                  <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#241B18] text-[10px] uppercase font-bold text-[#E7C878] tracking-wider mb-2.5 shadow-xs w-fit">
                    <Sparkles className="w-3 h-3 text-[#C99A3D]" />
                    <span>{item.category}</span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-xl md:text-2xl font-bold font-serif text-[#E7C878] group-hover:text-[#FFF8EA] transition-colors leading-snug truncate sm:whitespace-normal sm:min-h-[3.2rem] flex items-center sm:items-start">
                    {language === 'bn' ? item.nameBn : item.nameEn}
                  </h3>

                  {/* Tagline */}
                  <p className="text-[11px] sm:text-xs md:text-sm text-[#E7C878]/90 font-medium leading-relaxed italic truncate sm:whitespace-normal sm:line-clamp-2 mt-0.5 sm:mt-0">
                    {language === 'bn' ? item.taglineBn : item.taglineEn}
                  </p>
                </div>

                {/* Desktop Apple-style Capsule Footer Action Link */}
                <div className="hidden sm:block pt-4 sm:pt-6 mt-auto">
                  <div className="w-full py-2.5 rounded-full bg-[#FFFDF8]/10 backdrop-blur-md group-hover:bg-[#A61B1B] border border-[#A61B1B] text-xs font-bold text-[#E7C878] group-hover:text-[#FFFDF8] flex items-center justify-center gap-2 transition-all shadow-xs">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>
                      {language === 'bn' ? 'সম্পূর্ণ রন্ধন প্রণালী পাঠ করুন' : 'View Full Recipe & Method'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>

              {/* Mobile Right Arrow Action Icon */}
              <div className="flex sm:hidden items-center justify-center pr-1 text-[#E7C878] flex-shrink-0 self-center">
                <div className="w-7 h-7 rounded-full bg-[#FFFDF8]/8 border border-[#FFFDF8]/12 flex items-center justify-center group-hover:bg-[#A61B1B] group-hover:text-[#FFFDF8] transition-colors">
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Tithi-wise Special Bhog Schedule */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#241B18] text-[10px] uppercase font-bold text-[#E7C878] tracking-wider shadow-xs">
            <Calendar className="w-3.5 h-3.5 text-[#C99A3D]" />
            <span>{language === 'bn' ? 'তিথিভিত্তিক নির্ঘণ্ট' : 'Day-by-Day Calendar'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#E7C878]">
            {language === 'bn' ? 'পূজার দিনভিত্তিক বিশেষ ভোগের নির্ঘণ্ট' : 'Day-wise Special Bhog Offerings'}
          </h3>
          <p className="text-xs sm:text-sm text-[#FFF8EA]/75 font-sans">
            {language === 'bn'
              ? 'ষষ্ঠী থেকে দশমী পর্যন্ত প্রতিটি তিথিতে দেবী দুর্গার চরণে নিবেদিত নির্দিষ্ট সাত্ত্বিক নৈবেদ্যর নিয়ম'
              : 'The sacred sequence of offerings prescribed across each day from Sasthi to Dashami.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {TITHI_SCHEDULE.map((item, idx) => (
            <div
              key={idx}
              className="agomoni-card p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.12] transition-all duration-300"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#FFFDF8]/8">
                  <span className="text-base font-bold font-serif text-[#E7C878]">
                    {language === 'bn' ? item.dayBn : item.dayEn}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-[#241B18] border border-[#E7C878]/30 text-[10px] uppercase font-bold text-[#E7C878] tracking-wider">
                    {language === 'bn' ? item.highlightBn : item.highlightEn}
                  </span>
                </div>

                <h4 className="text-lg font-bold font-serif text-[#FFF8EA]">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h4>

                <p className="text-sm text-[#FFF8EA]/75 leading-relaxed font-sans">
                  {language === 'bn' ? item.descBn : item.descEn}
                </p>
              </div>

              <div className="pt-3.5 mt-4 border-t border-[#FFFDF8]/8 flex items-center gap-1.5 text-xs text-[#E7C878] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#C99A3D]" />
                <span>{language === 'bn' ? 'শাস্ত্রীয় বিধান' : 'Vedic Tradition'}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Four Golden Pillars of Sattvic Cuisine */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#241B18] text-[10px] uppercase font-bold text-[#E7C878] tracking-wider shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C99A3D]" />
            <span>{language === 'bn' ? 'শাস্ত্রীয় রন্ধনবিধি' : 'Vedic Principles'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#E7C878]">
            {language === 'bn' ? 'সাত্ত্বিক রন্ধনশৈলীর ৪টি বৈদিক স্তম্ভ' : 'The 4 Pillars of Sattvic Cooking'}
          </h3>
          <p className="text-xs sm:text-sm text-[#FFF8EA]/75 font-sans">
            {language === 'bn'
              ? 'পূজার ভোগের অনুপম স্বাদ ও আত্মিক প্রশান্তির নেপথ্যে থাকা চিরায়ত শাস্ত্রীয় নিয়মাবলী'
              : 'The spiritual and culinary rules behind the unforgettable divine flavor of Durga Puja Bhog.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SATTVIC_PILLARS.map((pillar, i) => {
            const Icon = pillar.icon;

            return (
              <div
                key={i}
                className="agomoni-card p-6 sm:p-7 flex flex-col justify-between h-full group hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.12] transition-all duration-300 text-left"
              >
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-[16px] bg-[#241B18] border border-[#FFFDF8]/10 flex items-center justify-center text-[#E7C878] shadow-xs">
                    <Icon className="w-5 h-5 text-[#C99A3D]" />
                  </div>

                  <h4 className="text-base font-bold font-serif text-[#E7C878]">
                    {language === 'bn' ? pillar.titleBn : pillar.titleEn}
                  </h4>

                  <p className="text-xs sm:text-sm text-[#FFF8EA]/75 leading-relaxed font-sans">
                    {language === 'bn' ? pillar.descBn : pillar.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
