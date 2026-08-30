'use client';

import React, { useState, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useUIStore } from '@/stores/ui-store';
import { FlowerType } from '@/types/user';
import { audioSynth } from '@/lib/audio-synth';
import {
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Share2,
  Download,
  Flame,
  Volume2,
  VolumeX,
  Heart,
  Shield,
  BookOpen,
  Award,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// Expanded Sacred Floral & Holy Offerings
const SACRED_OFFERINGS: {
  id: FlowerType | 'genda-mala';
  nameBn: string;
  nameEn: string;
  significanceBn: string;
  significanceEn: string;
  color: string;
  badgeBn: string;
  badgeEn: string;
}[] = [
  {
    id: 'rakta-jaba',
    nameBn: 'রক্তজবা',
    nameEn: 'Red Hibiscus',
    significanceBn: 'মা দুর্গার সর্বপ্রিয় পুষ্প। শক্তি, তেজ ও পরম ভক্তির প্রতীক।',
    significanceEn: 'The supreme floral offering to Devi Durga, signifying divine shakti.',
    color: '#D95757',
    badgeBn: 'দেবীর সর্বপ্রিয়',
    badgeEn: 'Beloved to Devi',
  },
  {
    id: 'padma',
    nameBn: 'রক্তপদ্ম ও নীলপদ্ম',
    nameEn: 'Sacred Lotus',
    significanceBn: 'সন্ধিপূজার ১০৮ পদ্মের মহাপ্রসাদ। পরম পবিত্রতা ও মোক্ষের প্রতীক।',
    significanceEn: 'Sacred 108 lotus offering of Sandhi Puja symbolizing divine purity.',
    color: '#E7C878',
    badgeBn: 'সন্ধিপূজার অর্ঘ্য',
    badgeEn: 'Sandhi Offering',
  },
  {
    id: 'bel-pata',
    nameBn: 'চন্দনচর্চিত ত্রিদল বিল্বপত্র',
    nameEn: 'Three-Leaf Bilva',
    significanceBn: 'সত্ত্ব, রজ ও তম গুণের ঊর্ধ্বে ত্রিনয়নীর চরণে কায়মনোবাক্যে সমর্পণ।',
    significanceEn: 'Trifoliate sacred leaves representing the three divine eyes of the Mother.',
    color: '#487254',
    badgeBn: 'সাত্ত্বিক অর্ঘ্য',
    badgeEn: 'Trifoliate Leaf',
  },
  {
    id: 'shiuli',
    nameBn: 'সুগন্ধি শিউলি ফুল',
    nameEn: 'Autumn Shiuli',
    significanceBn: 'শরতের শুভ্র সকালে দেবীর আগমনী বার্তা ও নির্মল শান্তির প্রকাশ।',
    significanceEn: 'Fragrant autumn blossoms heralding the auspicious arrival of the Goddess.',
    color: '#FFA94D',
    badgeBn: 'আগমনী সুবাস',
    badgeEn: 'Autumn Fragrance',
  },
  {
    id: 'aparajita',
    nameBn: 'নীল অপরাজিতা',
    nameEn: 'Blue Aparajita',
    significanceBn: 'সর্বসিদ্ধিদায়িনী ও অপরাজিত শক্তির বরদাত্রী পুষ্পার্ঘ্য।',
    significanceEn: 'Conferring victory, protection, and unvanquished spiritual vitality.',
    color: '#5C6B9E',
    badgeBn: 'অপরাজিত শক্তি',
    badgeEn: 'Goddess of Victory',
  },
  {
    id: 'genda-mala' as FlowerType,
    nameBn: 'সোনালী গাঁদা ফুলের মালা',
    nameEn: 'Golden Marigold Garland',
    significanceBn: 'সৌভাগ্য, সমৃদ্ধি ও মণ্ডপ সজ্জার পবিত্র মঙ্গলময় অর্ঘ্য।',
    significanceEn: 'Auspicious garland invoking prosperity, joy, and divine grace.',
    color: '#F59F00',
    badgeBn: 'মঙ্গল মালা',
    badgeEn: 'Auspicious Garland',
  },
];

// Sacred Sankalpa Wishes
const SANKALPA_OPTIONS = [
  {
    id: 'health-family',
    bn: 'পরিবারের সকলের সুস্বাস্থ্য, আরোগ্য ও দীর্ঘায়ু',
    en: 'Health, wellness, and longevity for all family members',
  },
  {
    id: 'education-career',
    bn: 'জ্ঞান, প্রজ্ঞা, বিদ্যাসাধনা ও কর্মক্ষেত্রে পরম সাফল্য',
    en: 'Wisdom, education, clarity, and professional success',
  },
  {
    id: 'peace-prosperity',
    bn: 'গৃহশান্তি, সমৃদ্ধি ও সর্বপ্রকার অশুভ শক্তির বিনাশ',
    en: 'Domestic harmony, abundance, and dispelling of negativity',
  },
  {
    id: 'global-peace',
    bn: 'বিশ্বশান্তি ও মানবজাতির সর্বাঙ্গীন কল্যাণ',
    en: 'Universal peace, harmony, and welfare of humanity',
  },
];

export const DigitalAnjali: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const selectedPujaDay = useUIStore((state) => state.selectedPujaDay);

  const [devoteeName, setDevoteeName] = useState('');
  const [gotra, setGotra] = useState('');
  const [selectedFlower, setSelectedFlower] = useState<string>('rakta-jaba');
  const [selectedSankalpa, setSelectedSankalpa] = useState<string>('health-family');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPlayingMantra, setIsPlayingMantra] = useState(false);
  const [flowerShowerActive, setFlowerShowerActive] = useState(false);

  const certificateRef = useRef<HTMLDivElement>(null);

  const [offeringResult, setOfferingResult] = useState<{
    id: string;
    name: string;
    gotra: string;
    flowerName: string;
    sankalpaBn: string;
    sankalpaEn: string;
    timestamp: string;
  } | null>(null);

  const handleOfferAnjali = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!devoteeName.trim()) return;

    setIsSubmitting(true);
    setFlowerShowerActive(true);

    // 1. Play procedural Shankha (Conch) & Temple Bell chimes
    audioSynth.playShankha(3.5);
    setTimeout(() => audioSynth.playTempleBell(0.8), 800);
    setTimeout(() => audioSynth.playTempleBell(1.6), 1600);
    setTimeout(() => audioSynth.playTempleBell(2.2), 2200);

    // 2. Confetti flower shower
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#A61B1B', '#C99A3D', '#E7C878', '#FFF8EA', '#D95757', '#F59F00'],
    });

    const chosenFlower = SACRED_OFFERINGS.find((f) => f.id === selectedFlower);
    const chosenSankalpa = SANKALPA_OPTIONS.find((s) => s.id === selectedSankalpa);

    try {
      const res = await fetch('/api/anjali', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          devoteeName,
          gotra,
          flowerType: selectedFlower,
          pujaDay: selectedPujaDay,
          sankalpa: chosenSankalpa?.bn,
        }),
      });

      const data = await res.json();
      setOfferingResult({
        id: data.offering?.id || `anjali-${Date.now()}`,
        name: devoteeName,
        gotra: gotra.trim() || (language === 'bn' ? 'স্বগোত্র' : 'Sva-gotra'),
        flowerName: language === 'bn' ? chosenFlower?.nameBn || 'রক্তজবা' : chosenFlower?.nameEn || 'Red Hibiscus',
        sankalpaBn: chosenSankalpa?.bn || '',
        sankalpaEn: chosenSankalpa?.en || '',
        timestamp: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
          hour: '2-digit',
          minute: '2-digit',
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
      });
    } catch {
      setOfferingResult({
        id: `anjali-${Date.now()}`,
        name: devoteeName,
        gotra: gotra.trim() || (language === 'bn' ? 'স্বগোত্র' : 'Sva-gotra'),
        flowerName: language === 'bn' ? chosenFlower?.nameBn || 'রক্তজবা' : chosenFlower?.nameEn || 'Red Hibiscus',
        sankalpaBn: chosenSankalpa?.bn || '',
        sankalpaEn: chosenSankalpa?.en || '',
        timestamp: new Date().toLocaleTimeString(),
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFlowerShowerActive(false), 4000);
    }
  };

  const handleToggleMantra = () => {
    if (!isPlayingMantra) {
      audioSynth.playShankha(3.0);
      setIsPlayingMantra(true);
      setTimeout(() => setIsPlayingMantra(false), 3000);
    } else {
      setIsPlayingMantra(false);
    }
  };

  const resetOffering = () => {
    setOfferingResult(null);
    setDevoteeName('');
    setGotra('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      {!offeringResult ? (
        <div className="agomoni-card p-6 sm:p-10 relative overflow-hidden shadow-2xl border-2 border-[#E7C878]/35 bg-[#1A1210]/95">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Visual Sacred Idol Altar */}
            <div className="lg:col-span-5 flex flex-col items-center justify-between p-4 sm:p-6 rounded-[28px] bg-[#120B09] border border-[#E7C878]/30 shadow-inner relative overflow-hidden text-center">
              {/* Floating Ambient Aura */}
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-[#A61B1B]/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#E7C878]/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative w-full space-y-4">
                {/* Devi Idol Circle with Radiant Border */}
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full p-2 bg-gradient-to-tr from-[#A61B1B] via-[#E7C878] to-[#A61B1B] shadow-2xl animate-pulse">
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[#FFFDF8]/30">
                    <Image
                      src="/images/durga/durga-hero.jpg"
                      alt="Sacred Altar of Devi Durga"
                      fill
                      className="object-cover"
                      priority
                    />
                    {flowerShowerActive && (
                      <div className="absolute inset-0 bg-[#A61B1B]/20 animate-ping" />
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#E7C878]">
                    {language === 'bn' ? 'শ্রী শ্রী চণ্ডীচরণে সমর্পণ' : 'Surrender at the Lotus Feet'}
                  </h3>
                  <p className="text-xs text-[#FFF8EA]/75 font-sans mt-1">
                    {language === 'bn'
                      ? 'করজোড়ে পুষ্পাঞ্জলি ও সংকল্প সমর্পণ করে জগন্মাতার পরম আশীর্বাদ গ্রহণ করুন।'
                      : 'Offer your sacred flowers and sincere wishes to invoke the supreme grace of Devi Durga.'}
                  </p>
                </div>
              </div>

              {/* Pushpanjali Mantra Box with Audio */}
              <div className="w-full mt-6 p-4 rounded-[20px] bg-[#1A1210]/90 border border-[#E7C878]/30 space-y-2 shadow-xs text-left">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold text-[#E7C878] uppercase tracking-wider font-mono">
                    {language === 'bn' ? 'পুষ্পাঞ্জলি মূল মন্ত্র' : 'Pushpanjali Pranam Mantra'}
                  </span>

                  <button
                    type="button"
                    onClick={handleToggleMantra}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#A61B1B] text-[#FFFDF8] hover:bg-[#851515] text-[10px] font-bold transition-all shadow-xs active:scale-95 cursor-pointer"
                  >
                    {isPlayingMantra ? (
                      <>
                        <VolumeX className="w-3 h-3 animate-spin" />
                        <span>{language === 'bn' ? 'শঙ্খধ্বনি...' : 'Playing...'}</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-3 h-3" />
                        <span>{language === 'bn' ? 'শঙ্খ বাজান' : 'Conch Sound'}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-[#E7C878] font-mono font-bold leading-relaxed italic">
                  {language === 'bn'
                    ? 'ওঁ জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী। দুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥'
                    : 'Om Jayanti Mangala Kali Bhadrakali Kapalini | Durga Shiva Kshama Dhatri Svaha Svadha Namo’stu Te ||'}
                </p>
              </div>
            </div>

            {/* Right Column: Interactive Offering Form */}
            <form onSubmit={handleOfferAnjali} className="lg:col-span-7 flex flex-col justify-between space-y-5">
              <div className="space-y-4">
                {/* 1. Devotee Name & Gotra in Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#E7C878] uppercase tracking-wider mb-2">
                      {language === 'bn' ? '১. ভক্তের নাম' : '1. Devotee Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={devoteeName}
                      onChange={(e) => setDevoteeName(e.target.value)}
                      placeholder={language === 'bn' ? 'আপনার পূর্ণ নাম লিখুন...' : 'Enter your full name...'}
                      className="apple-input w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#E7C878] uppercase tracking-wider mb-2">
                      {language === 'bn' ? '২. গোত্র (ঐচ্ছিক)' : '2. Gotra (Optional)'}
                    </label>
                    <input
                      type="text"
                      value={gotra}
                      onChange={(e) => setGotra(e.target.value)}
                      placeholder={language === 'bn' ? 'যেমন: কাশ্যপ, শাণ্ডিল্য বা স্বগোত্র' : 'e.g. Kashyap, Sandilya'}
                      className="apple-input w-full"
                    />
                  </div>
                </div>

                {/* 2. Choose Sacred Offering Flower */}
                <div>
                  <label className="block text-xs font-bold text-[#E7C878] uppercase tracking-wider mb-2">
                    {language === 'bn' ? '৩. পবিত্র পুষ্পার্ঘ্য নির্বাচন করুন' : '3. Choose Sacred Floral Offering'}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {SACRED_OFFERINGS.map((flower) => {
                      const isSelected = selectedFlower === flower.id;
                      return (
                        <button
                          key={flower.id}
                          type="button"
                          onClick={() => setSelectedFlower(flower.id)}
                          className={cn(
                            'p-3 rounded-[20px] border text-left transition-all duration-200 cursor-pointer active:scale-[0.97]',
                            isSelected
                              ? 'bg-[#A61B1B] text-[#FFFDF8] border-[#E7C878] shadow-md ring-2 ring-[#E7C878]/30'
                              : 'bg-[#FFFDF8]/[0.06] backdrop-blur-md border-[#FFFDF8]/12 hover:border-[#E7C878]/50 text-[#FFF8EA]'
                          )}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{ backgroundColor: flower.color }}
                            />
                            <span className={cn(
                              'text-[9px] px-1.5 py-0.5 rounded-full font-bold',
                              isSelected ? 'bg-[#FFFDF8]/20 text-[#FFFDF8]' : 'bg-[#241B18] text-[#E7C878]'
                            )}>
                              {language === 'bn' ? flower.badgeBn : flower.badgeEn}
                            </span>
                          </div>
                          <p className="text-xs font-bold font-serif leading-tight">
                            {language === 'bn' ? flower.nameBn : flower.nameEn}
                          </p>
                          <p className={cn(
                            'text-[10px] line-clamp-1 mt-1 font-sans',
                            isSelected ? 'text-[#FFFDF8]/85' : 'text-[#FFF8EA]/60'
                          )}>
                            {language === 'bn' ? flower.significanceBn : flower.significanceEn}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Choose Sacred Sankalpa (Wish) */}
                <div>
                  <label className="block text-xs font-bold text-[#E7C878] uppercase tracking-wider mb-2">
                    {language === 'bn' ? '৪. ভক্তিপূর্ণ সংকল্প ও প্রার্থনা' : '4. Sacred Devotional Sankalpa'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SANKALPA_OPTIONS.map((sankalpa) => {
                      const isSelected = selectedSankalpa === sankalpa.id;
                      return (
                        <button
                          key={sankalpa.id}
                          type="button"
                          onClick={() => setSelectedSankalpa(sankalpa.id)}
                          className={cn(
                            'p-3 rounded-[18px] border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] flex items-center gap-2.5',
                            isSelected
                              ? 'bg-[#241B18] border-[#E7C878] shadow-xs text-[#E7C878]'
                              : 'bg-[#FFFDF8]/[0.05] border-[#FFFDF8]/10 text-[#FFF8EA]/80 hover:border-[#E7C878]/30'
                          )}
                        >
                          <Heart className={cn('w-3.5 h-3.5 flex-shrink-0', isSelected ? 'text-[#E7C878]' : 'text-[#FFF8EA]/40')} />
                          <span className="text-xs font-medium leading-relaxed">
                            {language === 'bn' ? sankalpa.bn : sankalpa.en}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Submit Action Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || !devoteeName.trim()}
                  className="apple-btn-primary w-full py-3.5 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 text-sm font-bold shadow-lg"
                >
                  <Sparkles className="w-4 h-4 text-[#E7C878]" />
                  <span>
                    {isSubmitting
                      ? language === 'bn'
                        ? 'মা দুর্গার চরণে পুষ্পার্ঘ্য নিবেদিত হচ্ছে...'
                        : 'Offering Sacred Blossoms...'
                      : language === 'bn'
                      ? 'শ্রী শ্রী চণ্ডীচরণে পুষ্পাঞ্জলি নিবেদন করুন'
                      : 'Offer Digital Pushpanjali at Devi’s Feet'}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        /* Blessed Royal Benediction Certificate */
        <div className="space-y-6">
          <div
            ref={certificateRef}
            className="agomoni-card p-8 sm:p-14 text-center shadow-2xl relative overflow-hidden border-4 border-[#E7C878]/60 bg-gradient-to-b from-[#1E110E] via-[#150B08] to-[#1E110E]"
          >
            {/* Ornate Corner Accents */}
            <div className="absolute top-3 left-3 text-[#E7C878]/60 text-lg font-serif select-none">❖</div>
            <div className="absolute top-3 right-3 text-[#E7C878]/60 text-lg font-serif select-none">❖</div>
            <div className="absolute bottom-3 left-3 text-[#E7C878]/60 text-lg font-serif select-none">❖</div>
            <div className="absolute bottom-3 right-3 text-[#E7C878]/60 text-lg font-serif select-none">❖</div>

            {/* Glowing Holy Emblem */}
            <div className="w-20 h-20 rounded-full bg-[#120B09] border-2 border-[#E7C878] flex items-center justify-center mx-auto mb-4 text-[#E7C878] shadow-2xl ring-4 ring-[#E7C878]/20">
              <CheckCircle2 className="w-10 h-10 text-[#E7C878]" />
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-[#E7C878] font-bold mb-1 font-mono">
              {language === 'bn' ? '❖ শারদীয়া মহাশক্তির আশীর্বাদ পত্র ❖' : '❖ SACRED DURGA PUJA BENEDICTION ❖'}
            </p>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#FFF8EA] mb-1">
              {offeringResult.name}
            </h2>

            <p className="text-xs text-[#E7C878] font-mono font-bold">
              {language === 'bn' ? `গোত্র: ${offeringResult.gotra}` : `Gotra: ${offeringResult.gotra}`}
            </p>

            {/* Benediction Shloka Ribbon */}
            <div className="max-w-2xl mx-auto my-6 p-6 sm:p-8 rounded-[24px] bg-[#FFFDF8]/[0.06] backdrop-blur-md border border-[#E7C878]/30 space-y-3 shadow-inner">
              <p className="text-lg sm:text-xl text-[#E7C878] font-serif font-bold leading-relaxed">
                “সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে।<br />
                শরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥”
              </p>

              <div className="pt-3 border-t border-[#FFFDF8]/10 text-xs sm:text-sm text-[#FFF8EA]/90 font-sans leading-relaxed">
                {language === 'bn'
                  ? `মা দুর্গার চরণে আপনার "${offeringResult.flowerName}" পুষ্পার্ঘ্য পরম ভক্তিসহকারে গৃহীত হয়েছে। আপনার সংকল্প—"${offeringResult.sankalpaBn}" দেবীর কৃপায় পূর্ণ হোক এবং আপনার জীবন সর্বপ্রকার আনন্দ ও শান্তিতে ভরে উঠুক।`
                  : `Your sacred offering of "${offeringResult.flowerName}" has been received with deep devotion at the lotus feet of Maa Durga. May your wish "${offeringResult.sankalpaEn}" be fulfilled by Her grace.`}
              </div>
            </div>

            {/* Timestamp and ID Footer */}
            <div className="text-xs text-[#FFF8EA]/60 space-y-1 mb-8">
              <p>{language === 'bn' ? `পবিত্র নিবেদনের সময়: ${offeringResult.timestamp}` : `Time of Offering: ${offeringResult.timestamp}`}</p>
              <p className="text-[10px] font-mono text-[#E7C878]/70">
                {language === 'bn' ? `নিবন্ধন পরিচিতি: #${offeringResult.id.slice(-8).toUpperCase()}` : `Benediction ID: #${offeringResult.id.slice(-8).toUpperCase()}`}
              </p>
            </div>

            {/* Interactive Actions */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={resetOffering}
                className="apple-btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'পুনরায় অঞ্জলি দিন' : 'Offer Another Anjali'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.print();
                  }
                }}
                className="apple-btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Download className="w-3.5 h-3.5 text-[#E7C878]" />
                <span>{language === 'bn' ? 'আশীর্বাদ পত্র সংরক্ষণ / প্রিন্ট' : 'Save Certificate'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: 'Agomoni - Digital Anjali Benediction',
                      text: `আমি মা দুর্গার চরণে ডিজিটাল পুষ্পাঞ্জলি নিবেদন করে আশীর্বাদ পত্র লাভ করেছি — আগমনী (Agomoni)।`,
                      url: window.location.href,
                    }).catch(() => {});
                  }
                }}
                className="apple-btn-primary px-6 py-2.5 text-xs flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{language === 'bn' ? 'শুভকামনা শেয়ার করুন' : 'Share Blessings'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
