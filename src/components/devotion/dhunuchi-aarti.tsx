'use client';

import React, { useState, useEffect } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { audioSynth } from '@/lib/audio-synth';
import {
  Flame,
  Sparkles,
  Volume2,
  VolumeX,
  RotateCcw,
  Wind,
  Award,
  Music,
  Shield,
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const DhunuchiAarti: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const [isDhakPlaying, setIsDhakPlaying] = useState(false);
  const [dhunuchiLevel, setDhunuchiLevel] = useState(1);
  const [aartiMode, setAartiMode] = useState<'dhunuchi' | 'panchapradeep' | 'camphor'>('dhunuchi');
  const [fanningCount, setFanningCount] = useState(0);

  // Handle Dhak Loop
  const toggleDhak = () => {
    if (isDhakPlaying) {
      audioSynth.stopAll();
      setIsDhakPlaying(false);
    } else {
      audioSynth.playPreset('dhak-fast');
      setIsDhakPlaying(true);
    }
  };

  const handleFanSmoke = () => {
    setFanningCount((prev) => prev + 1);
    audioSynth.playTempleBell();
    if (fanningCount % 3 === 0) {
      audioSynth.playTempleBell(0.3);
    }
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      audioSynth.stopAll();
    };
  }, []);

  return (
    <div className="agomoni-card p-6 sm:p-10 border border-[#FFFDF8]/12 bg-[#1A1210]/95 backdrop-blur-2xl shadow-2xl space-y-8 text-[#FFF8EA]">
      {/* Header Info & Audio Controls */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-6 border-b border-[#FFFDF8]/10">
        <div className="text-center lg:text-left space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#241B18] border border-[#E7C878]/30 text-xs text-[#E7C878] font-bold shadow-xs">
            <Flame className="w-3.5 h-3.5 text-[#E7C878]" />
            <span>{language === 'bn' ? 'সান্ধ্য আরতি ও ধুনুচি নৃত্য' : 'Evening Aarti & Dhunuchi Dance'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#FFF8EA]">
            {language === 'bn' ? 'দেবীর শ্রীচরণে আরতি ও ধুনো সমর্পণ' : 'Sacred Aarti & Fragrant Dhuno Offering'}
          </h3>
          <p className="text-xs sm:text-sm text-[#E7C878]/90 font-sans max-w-xl">
            {language === 'bn'
              ? 'ঢাকের বোলে পঞ্চপ্রদীপ, কর্পূর ও মাটির ধুনুচির ধোঁয়ায় দুর্গামণ্ডপের সান্ধ্য আরতির অনুভূতি অনুভব করুন।'
              : 'Immerse in the electrifying resonance of temple Dhak and offer sacred evening aarti lamps.'}
          </p>
        </div>

        {/* Dhak Rhythm Player Pill */}
        <button
          type="button"
          onClick={toggleDhak}
          className={cn(
            'flex items-center gap-2.5 px-6 py-3 rounded-full text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95 cursor-pointer flex-shrink-0 border',
            isDhakPlaying
              ? 'bg-[#A61B1B] text-[#FFFDF8] border-[#E7C878]/50 animate-pulse'
              : 'bg-[#241B18] text-[#E7C878] border-[#E7C878]/30 hover:bg-[#A61B1B] hover:text-[#FFFDF8]'
          )}
        >
          {isDhakPlaying ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>{language === 'bn' ? 'ঢাকের বোল বন্ধ করুন' : 'Stop Dhak Rhythm'}</span>
            </>
          ) : (
            <>
              <Music className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'ঢাকের বোল বাজান' : 'Play Dhak Rhythm'}</span>
            </>
          )}
        </button>
      </div>

      {/* Aarti Mode Segmented Switcher */}
      <div className="flex items-center justify-center gap-2 p-1.5 rounded-full bg-[#120B09] border border-[#FFFDF8]/12 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setAartiMode('dhunuchi')}
          className={cn(
            'flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer',
            aartiMode === 'dhunuchi'
              ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/30'
              : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
          )}
        >
          {language === 'bn' ? 'ধুনুচি আরতি' : 'Dhunuchi Smoke'}
        </button>
        <button
          type="button"
          onClick={() => setAartiMode('panchapradeep')}
          className={cn(
            'flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer',
            aartiMode === 'panchapradeep'
              ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/30'
              : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
          )}
        >
          {language === 'bn' ? 'পঞ্চপ্রদীপ আরতি' : 'Pancha Pradeep'}
        </button>
        <button
          type="button"
          onClick={() => setAartiMode('camphor')}
          className={cn(
            'flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all cursor-pointer',
            aartiMode === 'camphor'
              ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/30'
              : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
          )}
        >
          {language === 'bn' ? 'কর্পূর আরতি' : 'Camphor Aarti'}
        </button>
      </div>

      {/* Interactive Visual Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8 rounded-[28px] bg-[#120B09] border-2 border-[#E7C878]/30 shadow-inner">
        {/* Left Visual Area */}
        <div className="lg:col-span-6 text-center space-y-4">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto rounded-[24px] overflow-hidden border-2 border-[#E7C878]/40 shadow-2xl bg-[#1A1210] group">
            <Image
              src="/images/gallery/dhunuchi-naach.jpg"
              alt="Dhunuchi Dance Aarti"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#120B09] via-transparent to-transparent" />

            {/* Glowing Smoke & Fire Overlay */}
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-[16px] bg-[#120B09]/85 backdrop-blur-md border border-[#E7C878]/30 text-center">
              <span className="text-xs text-[#E7C878] font-bold font-mono">
                {aartiMode === 'dhunuchi'
                  ? language === 'bn' ? 'মাটির ধুনুচি ও নারকেলের ছোবড়ার ধূপ' : 'Earthen Dhunuchi with Coconut Husks'
                  : aartiMode === 'panchapradeep'
                  ? language === 'bn' ? 'পিতলের পঞ্চমুখী ঘৃতপ্রদীপ' : 'Five-Wick Brass Ghee Lamp'
                  : language === 'bn' ? 'নির্মল কর্পূরের পবিত্র শিখা' : 'Pure Camphor Sacred Flame'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Interaction Panel */}
        <div className="lg:col-span-6 space-y-5 text-left">
          <div className="space-y-2">
            <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#E7C878]">
              {language === 'bn' ? 'আরতির পবিত্র ধ্বনি ও গন্ধ' : 'Aura of Fragrance & Devotion'}
            </h4>
            <p className="text-xs sm:text-sm text-[#FFF8EA]/80 leading-relaxed font-sans">
              {language === 'bn'
                ? 'ধুনোর সুগন্ধ মন ও পরিবেশকে শুদ্ধ করে এবং আসুরিক শক্তি দূর করে। নিচে ট্যাপ করে দেবীর চরণে ধুনো বাতাস করুন।'
                : 'The fragrant smoke of Dhuno cleanses negative energy and sanctifies the environment.'}
            </p>
          </div>

          {/* Fan Smoke Button & Count */}
          <div className="p-5 rounded-[22px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#E7C878]">
              <span>{language === 'bn' ? 'নিবেদিত আরতি পরিক্রমা:' : 'Aarti Circles Offered:'}</span>
              <span className="text-lg font-bold text-[#FFF8EA]">{fanningCount} বার</span>
            </div>

            <button
              type="button"
              onClick={handleFanSmoke}
              className="apple-btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-xs font-bold cursor-pointer active:scale-95 shadow-md"
            >
              <Wind className="w-4 h-4 text-[#E7C878]" />
              <span>
                {language === 'bn' ? 'দেবীর চরণে আরতি করুন (ট্যাপ করুন)' : 'Offer Aarti Circles (Tap)'}
              </span>
            </button>
          </div>

          {/* Lore Note */}
          <div className="p-4 rounded-[18px] bg-[#A61B1B]/15 border border-[#A61B1B]/35 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-[#E7C878] flex-shrink-0 mt-0.5" />
            <p className="text-xs text-[#FFF8EA]/85 leading-relaxed font-sans italic">
              {language === 'bn'
                ? 'ধুনুচি নৃত্য হলো মহিষাসুর সংহারের পর দেবীর বিজয়োৎসবের ঐতিহ্যবাহী বীররসাত্মক অঙ্গ।'
                : 'Dhunuchi dance embodies the triumph of divine righteousness over evil forces.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
