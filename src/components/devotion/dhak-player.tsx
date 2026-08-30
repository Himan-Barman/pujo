'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUIStore } from '@/stores/ui-store';
import { audioSynth } from '@/lib/audio-synth';
import { Play, Pause, Disc } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RhythmPattern {
  id: string;
  nameBn: string;
  nameEn: string;
  bolTextBn: string;
  bolTextEn: string;
  pattern: ('dha' | 'tak' | 'koor' | 'rest')[];
  bpm: number;
}

const RHYTHMS: RhythmPattern[] = [
  {
    id: 'agomoni',
    nameBn: 'শারদ আগমনী তাল',
    nameEn: 'Sharod Agomoni Groove',
    bolTextBn: 'কাং তাং কাং তাং... ধা কুর কুর তাক',
    bolTextEn: 'Dha Koor Koor Tak... Dha Tak',
    pattern: ['dha', 'tak', 'koor', 'tak', 'dha', 'dha', 'tak', 'rest'],
    bpm: 115,
  },
  {
    id: 'dhunuchi',
    nameBn: 'ধুনুচি নাচ দ্রুত লয়',
    nameEn: 'Fast Dhunuchi Dance Beat',
    bolTextBn: 'ধা তাক ধা তাক ধা... ঝাঁঝ ঝাঁঝ তাক',
    bolTextEn: 'Dha Tak Dha Tak Dha... Jham Jham Tak',
    pattern: ['dha', 'tak', 'dha', 'tak', 'dha', 'koor', 'tak', 'tak'],
    bpm: 135,
  },
  {
    id: 'bisarjan',
    nameBn: 'বিসর্জন অন্তিম বিদায় তাল',
    nameEn: 'Poignant Bisarjan Rhythm',
    bolTextBn: 'আসছে বছর আবার হবে... ধা তাং ধা তাং',
    bolTextEn: 'Asche Bochor Abar Hobe... Dha Taang',
    pattern: ['dha', 'rest', 'tak', 'koor', 'dha', 'rest', 'tak', 'rest'],
    bpm: 95,
  },
];

export const DhakPlayer: React.FC = () => {
  const language = useUIStore((state) => state.language);
  const [selectedRhythm, setSelectedRhythm] = useState<RhythmPattern>(RHYTHMS[0]);
  const [isPlayingLoop, setIsPlayingLoop] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [lastHit, setLastHit] = useState<string | null>(null);

  const loopControllerRef = useRef<{ stop: () => void } | null>(null);

  const handlePadStrike = (type: 'dha' | 'tak' | 'koor' | 'jham') => {
    setLastHit(type);
    audioSynth.playDhakStrike(type);
    setTimeout(() => setLastHit(null), 180);
  };

  const toggleLoop = () => {
    if (isPlayingLoop) {
      loopControllerRef.current?.stop();
      setIsPlayingLoop(false);
      setActiveStep(-1);
    } else {
      setIsPlayingLoop(true);
      const controller = audioSynth.playRhythmPattern(
        selectedRhythm.pattern,
        selectedRhythm.bpm,
        (step: number) => setActiveStep(step)
      );
      loopControllerRef.current = controller;
    }
  };

  useEffect(() => {
    return () => {
      loopControllerRef.current?.stop();
    };
  }, []);

  const changeRhythm = (rhythm: RhythmPattern) => {
    if (isPlayingLoop) {
      loopControllerRef.current?.stop();
      setIsPlayingLoop(false);
      setActiveStep(-1);
    }
    setSelectedRhythm(rhythm);
  };

  return (
    <div className="agomoni-card p-4 sm:p-8 md:p-10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 sm:pb-6 border-b border-[#FFFDF8]/10 mb-6 sm:mb-8 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/12 text-[11px] text-[#E7C878] mb-2 font-bold">
            <Disc className="w-3.5 h-3.5 text-[#C99A3D]" />
            <span>{language === 'bn' ? 'ঢাকের বোল ও বাদ্যযন্ত্র' : 'Traditional Bengali Dhak Beats'}</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-bold font-serif text-[#E7C878]">
            {language === 'bn' ? 'ঢাকের তালে উৎসবের স্পন্দন' : 'Experience the Thunder of Bengal Dhak'}
          </h3>
        </div>

        {/* Play Loop Button with Apple-style capsule */}
        <button
          type="button"
          onClick={toggleLoop}
          className={cn(
            'apple-btn-primary w-full sm:w-auto px-6 py-2.5 text-xs flex items-center justify-center gap-2 cursor-pointer',
            isPlayingLoop && 'bg-[#741313]'
          )}
        >
          {isPlayingLoop ? (
            <>
              <Pause className="w-4 h-4 fill-current" />
              <span>{language === 'bn' ? 'তাল থামান' : 'Stop Rhythm Loop'}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{language === 'bn' ? 'তাল বাজান (Play Loop)' : 'Play Rhythm Loop'}</span>
            </>
          )}
        </button>
      </div>

      {/* Rhythm Selection Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
        {RHYTHMS.map((rhythm) => (
          <button
            key={rhythm.id}
            type="button"
            onClick={() => changeRhythm(rhythm)}
            className={cn(
              'px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-[16px] sm:rounded-[18px] text-[11px] sm:text-xs font-semibold border transition-all duration-200 cursor-pointer active:scale-[0.97] flex-1 sm:flex-initial text-center',
              selectedRhythm.id === rhythm.id
                ? 'bg-[#F3E3D0] border-[#A61B1B] text-[#E7C878] shadow-xs'
                : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 text-[#FFF8EA]/70 hover:border-[#E7C878]/30'
            )}
          >
            <div>{language === 'bn' ? rhythm.nameBn : rhythm.nameEn}</div>
            <div className="text-[9.5px] sm:text-[10px] text-[#FFF8EA]/50 mt-0.5">{rhythm.bpm} BPM</div>
          </button>
        ))}
      </div>

      {/* Bol Caption & Step Sequencer */}
      <div className="p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/12 mb-6 sm:mb-8 text-center">
        <p className="text-[10.5px] sm:text-xs text-[#E7C878] uppercase tracking-widest font-bold mb-1">
          {language === 'bn' ? 'ঐতিহ্যবাহী বোল' : 'Traditional Bol Recitation'}
        </p>
        <p className="text-lg sm:text-2xl font-bold font-serif text-[#FFF8EA]">
          “{language === 'bn' ? selectedRhythm.bolTextBn : selectedRhythm.bolTextEn}”
        </p>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
          {selectedRhythm.pattern.map((step, idx) => (
            <div
              key={`step-${idx}`}
              className={cn(
                'w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-150',
                activeStep === idx
                  ? 'bg-[#A61B1B] scale-150 ring-2 ring-[#C99A3D]'
                  : step === 'rest'
                  ? 'bg-[#DDCFB8]/50'
                  : 'bg-[#DDCFB8]'
              )}
            />
          ))}
        </div>
      </div>

      {/* Interactive Dhak Strike Pads with 22px squircle radius */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3.5">
        <button
          type="button"
          onClick={() => handlePadStrike('dha')}
          className={cn(
            'p-4 sm:p-6 rounded-[18px] sm:rounded-[22px] border text-center transition-all duration-150 cursor-pointer active:scale-[0.94]',
            lastHit === 'dha'
              ? 'bg-[#F3E3D0] border-[#A61B1B] shadow-sm'
              : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 hover:border-[#E7C878]/30'
          )}
        >
          <div className="text-2xl sm:text-3xl mb-1">🥁</div>
          <div className="text-xs sm:text-sm font-bold text-[#E7C878] font-serif">ধা (Dha)</div>
          <p className="text-[9px] sm:text-[10px] text-[#FFF8EA]/50 mt-0.5 font-medium">Bass Drum Strike</p>
        </button>

        <button
          type="button"
          onClick={() => handlePadStrike('tak')}
          className={cn(
            'p-4 sm:p-6 rounded-[18px] sm:rounded-[22px] border text-center transition-all duration-150 cursor-pointer active:scale-[0.94]',
            lastHit === 'tak'
              ? 'bg-[#F3E3D0] border-[#A61B1B] shadow-sm'
              : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 hover:border-[#E7C878]/30'
          )}
        >
          <div className="text-2xl sm:text-3xl mb-1">🥢</div>
          <div className="text-xs sm:text-sm font-bold text-[#E7C878] font-serif">তাক (Tak)</div>
          <p className="text-[9px] sm:text-[10px] text-[#FFF8EA]/50 mt-0.5 font-medium">Snappy Wooden Rim</p>
        </button>

        <button
          type="button"
          onClick={() => handlePadStrike('koor')}
          className={cn(
            'p-4 sm:p-6 rounded-[18px] sm:rounded-[22px] border text-center transition-all duration-150 cursor-pointer active:scale-[0.94]',
            lastHit === 'koor'
              ? 'bg-[#F3E3D0] border-[#A61B1B] shadow-sm'
              : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 hover:border-[#E7C878]/30'
          )}
        >
          <div className="text-2xl sm:text-3xl mb-1">✋</div>
          <div className="text-xs sm:text-sm font-bold text-[#E7C878] font-serif">কুর (Koor)</div>
          <p className="text-[9px] sm:text-[10px] text-[#FFF8EA]/50 mt-0.5 font-medium">Muted Tap Slap</p>
        </button>

        <button
          type="button"
          onClick={() => handlePadStrike('jham')}
          className={cn(
            'p-4 sm:p-6 rounded-[18px] sm:rounded-[22px] border text-center transition-all duration-150 cursor-pointer active:scale-[0.94]',
            lastHit === 'jham'
              ? 'bg-[#F3E3D0] border-[#A61B1B] shadow-sm'
              : 'bg-[#FFFDF8]/10 backdrop-blur-md border-[#FFFDF8]/12 hover:border-[#E7C878]/30'
          )}
        >
          <div className="text-2xl sm:text-3xl mb-1">🔔</div>
          <div className="text-xs sm:text-sm font-bold text-[#E7C878] font-serif">কাঁসর/ঝাঁঝ (Jham)</div>
          <p className="text-[9px] sm:text-[10px] text-[#FFF8EA]/50 mt-0.5 font-medium">Brass Bell Clash</p>
        </button>
      </div>
    </div>
  );
};
