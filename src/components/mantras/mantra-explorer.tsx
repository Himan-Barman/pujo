'use client';

import React, { useState } from 'react';
import { MantraItem } from '@/types/mantra';
import { useUIStore } from '@/stores/ui-store';
import { audioSynth } from '@/lib/audio-synth';
import {
  Sparkles,
  Volume2,
  Copy,
  Check,
  BookOpen,
  Globe,
  Scroll,
  Layers,
  HeartHandshake,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface MantraExplorerProps {
  mantras: MantraItem[];
}

const SHORT_TITLES: Record<string, { bn: string; en: string }> = {
  'durga-pranam': { bn: 'প্রণাম মন্ত্র', en: 'Pranam Mantra' },
  'ashtami-pushpanjali-3step': { bn: 'অষ্টমী পুষ্পাঞ্জলি', en: 'Pushpanjali' },
  'sandhi-stotram': { bn: 'সন্ধিপূজা স্তোত্র', en: 'Sandhi Stotram' },
  'mahisasura-mardini-stotram': { bn: 'মহিষাসুরমর্দিনী', en: 'Mahishasuramardini' },
  'argala-stotram': { bn: 'অর্গলা স্তোত্র', en: 'Argala Stotram' },
  'durga-dhyan-mantra': { bn: 'ধ্যান মন্ত্র', en: 'Dhyan Mantra' },
  'aparajita-stotram': { bn: 'অপরাজিতা রক্ষা', en: 'Aparajita Stotra' },
  'bijoya-shanti-path': { bn: 'শান্তিপাঠ', en: 'Shanti Path' },
};

export const MantraExplorer: React.FC<MantraExplorerProps> = ({ mantras }) => {
  const language = useUIStore((state) => state.language);
  const [selectedMantraId, setSelectedMantraId] = useState<string>(mantras[0]?.id || 'durga-pranam');
  const [activeScript, setActiveScript] = useState<'bengali' | 'sanskrit' | 'transliteration'>('bengali');
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const selectedMantra = mantras.find((m) => m.id === selectedMantraId) || mantras[0];

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectMantra = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedMantraId(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  const handlePlaySound = () => {
    if (selectedMantra.synthSound === 'mantra-drone') {
      setIsPlayingAudio(true);
      const drone = audioSynth.createMantraDrone();
      setTimeout(() => {
        drone.stop();
        setIsPlayingAudio(false);
      }, 8000);
    } else if (selectedMantra.synthSound === 'evening-aarti') {
      setIsPlayingAudio(true);
      audioSynth.playTempleBell();
      audioSynth.playShankha(3.5);
      setTimeout(() => setIsPlayingAudio(false), 4000);
    } else {
      setIsPlayingAudio(true);
      audioSynth.playShankha(3.5);
      setTimeout(() => setIsPlayingAudio(false), 3600);
    }
  };

  const handleCopy = () => {
    const textToCopy =
      activeScript === 'bengali'
        ? selectedMantra.bengaliScript
        : activeScript === 'sanskrit'
        ? selectedMantra.sanskritDevanagari
        : selectedMantra.transliteration;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-10">
      {/* 1. Horizontal Mantra Selector Bar with Rounded Frame & Preserved Edge Blur */}
      <div className="relative w-full rounded-[28px] sm:rounded-[32px] p-1.5 sm:p-2 bg-[#120B09]/60 backdrop-blur-xl border border-[#FFFDF8]/10 shadow-xl overflow-hidden group/nav select-none">
        {/* Scroll Track with Progressive Edge Mask */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto no-scrollbar py-2.5 px-6 sm:px-12 flex items-center justify-start gap-2.5 sm:gap-3.5 scroll-smooth relative z-0"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 1.5%, rgba(0,0,0,0.8) 4%, black 8%, black 92%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.3) 98.5%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.3) 1.5%, rgba(0,0,0,0.8) 4%, black 8%, black 92%, rgba(0,0,0,0.8) 96%, rgba(0,0,0,0.3) 98.5%, transparent 100%)',
          }}
        >
          {mantras.map((item) => {
            const isSelected = selectedMantraId === item.id;
            const shortLabel = SHORT_TITLES[item.id] || {
              bn: item.titleBn,
              en: item.titleEn,
            };

            return (
              <button
                key={item.id}
                type="button"
                onClick={(e) => handleSelectMantra(item.id, e)}
                className={cn(
                  'relative flex-shrink-0 transition-all duration-200 text-center flex items-center justify-center gap-2 cursor-pointer select-none active:scale-[0.97]',
                  'px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border text-xs sm:text-sm font-bold font-serif whitespace-nowrap',
                  isSelected
                    ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.02] z-10'
                    : 'bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/12 text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:border-[#E7C878]/50 hover:bg-[#FFFDF8]/[0.08]'
                )}
              >
                {isSelected && (
                  <Sparkles className="w-3.5 h-3.5 text-[#E7C878] animate-pulse flex-shrink-0" />
                )}

                <span>{language === 'bn' ? shortLabel.bn : shortLabel.en}</span>
              </button>
            );
          })}
        </div>

        {/* Left Edge Progressive Blur Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-28 z-20 rounded-l-[28px] sm:rounded-l-[32px]"
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
          className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-28 z-20 rounded-r-[28px] sm:rounded-r-[32px]"
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

        {/* Left Scroll Arrow Button (z-30) */}
        <button
          type="button"
          onClick={() => handleScroll('left')}
          aria-label="Scroll Left"
          className="hidden sm:flex absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-[#120B09]/95 border-2 border-[#E7C878]/50 text-[#E7C878] items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.65)] hover:bg-[#A61B1B] hover:border-[#E7C878] hover:text-[#FFFDF8] hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Scroll Arrow Button (z-30) */}
        <button
          type="button"
          onClick={() => handleScroll('right')}
          aria-label="Scroll Right"
          className="hidden sm:flex absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-[#120B09]/95 border-2 border-[#E7C878]/50 text-[#E7C878] items-center justify-center shadow-[0_4px_16px_rgba(0,0,0,0.65)] hover:bg-[#A61B1B] hover:border-[#E7C878] hover:text-[#FFFDF8] hover:scale-110 active:scale-95 transition-all cursor-pointer backdrop-blur-xl"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Master Selected Mantra Showcase Card (Luxurious & Symmetrical) */}
      <div className="agomoni-card p-4 sm:p-8 lg:p-10 relative overflow-hidden border-2 border-[#E7C878]/35 shadow-2xl bg-gradient-to-b from-[#1C120F] to-[#120B09] space-y-6 sm:space-y-8">
        {/* Top Header & Actions Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#FFFDF8]/10">
          {/* Title & Deity Meta (Structured hierarchy) */}
          <div className="space-y-2">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full bg-[#120B09] border border-[#E7C878]/40 text-[#E7C878] text-[11px] sm:text-xs font-bold shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#E7C878]" />
                <span>{language === 'bn' ? selectedMantra.deityBn : selectedMantra.deityEn}</span>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-serif text-[#FFF8EA] leading-tight drop-shadow-sm">
              {language === 'bn' ? selectedMantra.titleBn : selectedMantra.titleEn}
            </h2>

            {/* Purpose / Significance Subtitle */}
            <p className="text-xs sm:text-sm text-[#E9D8C6]/90 font-sans font-medium leading-relaxed max-w-2xl pt-0.5">
              {language === 'bn' ? selectedMantra.purposeBn : selectedMantra.purposeEn}
            </p>
          </div>

          {/* Right Action Tools: Script Switcher, Audio Chanting & Copy */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* Script Language Switcher Tabs */}
            <div className="inline-flex items-center p-1 rounded-full bg-[#120B09] border border-[#E7C878]/35 shadow-inner gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveScript('bengali')}
                className={cn(
                  'px-3 sm:px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer',
                  activeScript === 'bengali'
                    ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] border border-[#E7C878]/40 shadow-xs scale-[1.02]'
                    : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
                )}
              >
                বাংলা হরফ
              </button>
              <button
                type="button"
                onClick={() => setActiveScript('sanskrit')}
                className={cn(
                  'px-3 sm:px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer',
                  activeScript === 'sanskrit'
                    ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] border border-[#E7C878]/40 shadow-xs scale-[1.02]'
                    : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
                )}
              >
                সংস্কৃত দেবনাগরী
              </button>
              <button
                type="button"
                onClick={() => setActiveScript('transliteration')}
                className={cn(
                  'px-3 sm:px-3.5 py-1.5 rounded-full font-bold transition-all cursor-pointer',
                  activeScript === 'transliteration'
                    ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] border border-[#E7C878]/40 shadow-xs scale-[1.02]'
                    : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
                )}
              >
                English
              </button>
            </div>

            {/* Audio Chanting Button */}
            <button
              type="button"
              onClick={handlePlaySound}
              className={cn(
                'px-4 py-2 rounded-full text-xs font-bold font-mono flex items-center gap-2 cursor-pointer transition-all border shadow-xs',
                isPlayingAudio
                  ? 'bg-[#A61B1B] border-[#E7C878] text-[#FFFDF8] animate-pulse'
                  : 'bg-[#120B09] border-[#E7C878]/40 text-[#E7C878] hover:bg-[#FFFDF8]/[0.08]'
              )}
              title="Listen to chant soundscape"
            >
              <Volume2 className={cn('w-4 h-4', isPlayingAudio && 'animate-bounce')} />
              <span>{isPlayingAudio ? (language === 'bn' ? 'বাজছে...' : 'Playing...') : (language === 'bn' ? 'শুনুন' : 'Listen')}</span>
            </button>

            {/* Copy Shloka Button */}
            <button
              type="button"
              onClick={handleCopy}
              className="p-2.5 rounded-full bg-[#120B09] border border-[#E7C878]/35 hover:border-[#E7C878] text-[#E7C878] hover:text-[#FFFDF8] text-xs flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all shadow-xs"
              title="Copy Mantra Shloka"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* 3. Hero Shloka Verse Container (Luminous & Centered) */}
        <div className="p-5 sm:p-10 rounded-[24px] sm:rounded-[28px] bg-[#120B09] border-2 border-[#E7C878]/35 text-center space-y-3 sm:space-y-4 shadow-2xl relative overflow-hidden">
          <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs text-[#E7C878] font-bold uppercase tracking-widest font-mono">
            <Scroll className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#E7C878]" />
            <span>
              {activeScript === 'bengali'
                ? 'পবিত্র শাস্ত্রীয় শ্লোক'
                : activeScript === 'sanskrit'
                ? 'मूल संस्कृत श्लोकम्'
                : 'Vedic Sanskrit Transliteration'}
            </span>
          </div>

          <p className="text-sm sm:text-2xl lg:text-3xl text-[#E7C878] font-mono font-bold leading-relaxed whitespace-pre-line tracking-wide drop-shadow-md">
            {activeScript === 'bengali' && selectedMantra.bengaliScript}
            {activeScript === 'sanskrit' && selectedMantra.sanskritDevanagari}
            {activeScript === 'transliteration' && selectedMantra.transliteration}
          </p>
        </div>

        {/* 4. Multi-step Breakdown (If available, e.g. 3-Step Pushpanjali) */}
        {selectedMantra.steps && (
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2.5 text-[#E7C878] pb-2 border-b border-[#FFFDF8]/8">
              <Layers className="w-5 h-5 text-[#E7C878]" />
              <h4 className="text-xl font-bold font-serif">
                {language === 'bn' ? 'পর্যায়ক্রমিক ৩ দফার পুষ্পাঞ্জলি বিধি' : 'Step-by-Step 3-Round Pushpanjali Sequence'}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {selectedMantra.steps.map((step) => (
                <div
                  key={step.stepNumber}
                  className="p-6 rounded-[22px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 hover:border-[#E7C878]/35 transition-all shadow-xs space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2.5 pb-2 border-b border-[#FFFDF8]/10">
                      <span className="w-7 h-7 rounded-full bg-[#120B09] border border-[#E7C878]/40 text-[#E7C878] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 shadow-xs">
                        {step.stepNumber}
                      </span>
                      <h5 className="text-base font-bold font-serif text-[#FFF8EA]">
                        {language === 'bn' ? step.titleBn : step.titleEn}
                      </h5>
                    </div>

                    <p className="text-xs text-[#FFF8EA]/80 font-sans leading-relaxed">
                      {language === 'bn' ? step.instructionsBn : step.instructionsEn}
                    </p>
                  </div>

                  <div className="p-4 rounded-[18px] bg-[#120B09] border border-[#E7C878]/30 space-y-2.5 shadow-inner">
                    {/* Shloka Verse */}
                    <p className="text-xs sm:text-sm font-mono text-[#E7C878] font-bold leading-relaxed">
                      {activeScript === 'sanskrit'
                        ? step.sanskritDevanagari
                        : activeScript === 'transliteration'
                        ? step.transliteration
                        : step.bengaliScript}
                    </p>

                    {/* Bengali Meaning */}
                    <div className="border-t border-[#FFFDF8]/10 pt-2 space-y-1">
                      <span className="text-[10px] font-bold text-[#E7C878] uppercase tracking-wider block">
                        {language === 'bn' ? 'সরল বঙ্গানুবাদ:' : 'Bengali Meaning:'}
                      </span>
                      <p className="text-xs text-[#FFF8EA]/95 font-sans leading-relaxed">
                        {step.bengaliMeaning}
                      </p>
                    </div>

                    {/* English Meaning */}
                    <div className="border-t border-[#FFFDF8]/10 pt-2 space-y-1">
                      <span className="text-[10px] font-bold text-[#E7C878] uppercase tracking-wider block">
                        {language === 'bn' ? 'ইংরেজি অর্থ:' : 'English Meaning:'}
                      </span>
                      <p className="text-xs text-[#FFF8EA]/85 font-sans italic leading-relaxed">
                        {step.englishMeaning}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Bengali & English Meaning Dual Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
          {/* Bangla Meaning Box */}
          <div className="p-6 sm:p-7 rounded-[22px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 hover:border-[#E7C878]/30 transition-all shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E7C878] uppercase tracking-wider pb-2 border-b border-[#FFFDF8]/8">
              <BookOpen className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'সরল বঙ্গানুবাদ ও ভাবার্থ' : 'Bengali Interpretation'}</span>
            </div>
            <div className="space-y-2 text-sm sm:text-base text-[#FFF8EA]/95 leading-relaxed font-sans whitespace-pre-line">
              {selectedMantra.bengaliMeaning}
            </div>
          </div>

          {/* English Meaning Box */}
          <div className="p-6 sm:p-7 rounded-[22px] bg-[#FFFDF8]/[0.05] border border-[#FFFDF8]/10 hover:border-[#E7C878]/30 transition-all shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#E7C878] uppercase tracking-wider pb-2 border-b border-[#FFFDF8]/8">
              <Globe className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'ইংরেজি অনুবাদ ও তাৎপর্য' : 'English Translation & Meaning'}</span>
            </div>
            <div className="space-y-2 text-sm sm:text-base text-[#FFF8EA]/90 leading-relaxed font-sans italic whitespace-pre-line">
              {selectedMantra.englishMeaning}
            </div>
          </div>
        </div>

        {/* 6. Cultural Context & Spiritual Significance Box */}
        <div className="p-5 sm:p-6 rounded-[22px] bg-[#FFFDF8]/[0.04] border border-[#E7C878]/25 flex items-start gap-3.5 shadow-xs">
          <HeartHandshake className="w-5 h-5 text-[#E7C878] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#E7C878] uppercase tracking-wider block">
              {language === 'bn' ? 'ঐতিহ্যগত তাৎপর্য ও শাস্ত্রীয় বিধান:' : 'Spiritual & Cultural Significance:'}
            </span>
            <p className="text-xs sm:text-sm text-[#FFF8EA]/90 leading-relaxed font-sans">
              {language === 'bn' ? selectedMantra.culturalContextBn : selectedMantra.culturalContextEn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
