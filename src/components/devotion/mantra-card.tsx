'use client';

import React, { useState } from 'react';
import { MantraItem } from '@/types/mantra';
import { useUIStore } from '@/stores/ui-store';
import { audioSynth } from '@/lib/audio-synth';
import { Volume2, ChevronDown, ChevronUp, Copy, Check, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MantraCardProps {
  mantra: MantraItem;
  className?: string;
}

export const MantraCard: React.FC<MantraCardProps> = ({ mantra, className }) => {
  const language = useUIStore((state) => state.language);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'bengali' | 'sanskrit' | 'transliteration'>('bengali');
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handlePlaySound = () => {
    if (mantra.synthSound === 'mantra-drone') {
      setIsPlayingAudio(true);
      const drone = audioSynth.createMantraDrone();
      setTimeout(() => {
        drone.stop();
        setIsPlayingAudio(false);
      }, 8000);
    } else if (mantra.synthSound === 'evening-aarti') {
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
      activeTab === 'bengali'
        ? mantra.bengaliScript
        : activeTab === 'sanskrit'
        ? mantra.sanskritDevanagari
        : mantra.transliteration;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        'rounded-[32px] p-6 sm:p-7 bg-[#FFFDF8]/8 backdrop-blur-xl border border-[#FFFDF8]/12 transition-all duration-300 relative overflow-hidden shadow-xs',
        isExpanded && 'border-[#C99A3D] shadow-md',
        className
      )}
    >
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#FFFDF8]/10">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFDF8]/10 backdrop-blur-md border border-[#FFFDF8]/12 text-[11px] text-[#E7C878] mb-1 font-bold">
            <Sparkles className="w-3 h-3 text-[#C99A3D]" />
            <span>{language === 'bn' ? mantra.deityBn : mantra.deityEn}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#FFF8EA]">
            {language === 'bn' ? mantra.titleBn : mantra.titleEn}
          </h3>
          <p className="text-xs text-[#FFF8EA]/50 mt-0.5 font-medium">
            {language === 'bn' ? mantra.purposeBn : mantra.purposeEn}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePlaySound}
            className={cn(
              'apple-btn-primary px-4 py-1.5 text-xs flex items-center gap-1.5 cursor-pointer',
              isPlayingAudio && 'bg-[#741313]'
            )}
            title="Listen to chant ambiance"
          >
            <Volume2 className={cn('w-3.5 h-3.5', isPlayingAudio && 'animate-pulse')} />
            <span>{isPlayingAudio ? (language === 'bn' ? 'বাজছে...' : 'Playing...') : (language === 'bn' ? 'শুনুন' : 'Listen')}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-full bg-[#FFFDF8]/10 backdrop-blur-md hover:bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/12 text-[#FFF8EA]/70 transition-all cursor-pointer active:scale-95"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Script Language Switcher Tabs in Apple-style capsule */}
      <div className="flex items-center justify-between mt-4 mb-3">
        <div className="flex items-center gap-1 p-1 rounded-full bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/12 text-xs">
          <button
            onClick={() => setActiveTab('bengali')}
            className={cn(
              'px-3 py-1 rounded-full transition-all duration-200 font-bold',
              activeTab === 'bengali'
                ? 'bg-[#A61B1B] text-white shadow-xs'
                : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
            )}
          >
            বাংলা হরফ
          </button>
          <button
            onClick={() => setActiveTab('sanskrit')}
            className={cn(
              'px-3 py-1 rounded-full transition-all duration-200 font-bold',
              activeTab === 'sanskrit'
                ? 'bg-[#A61B1B] text-white shadow-xs'
                : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
            )}
          >
            সংস্কৃত
          </button>
          <button
            onClick={() => setActiveTab('transliteration')}
            className={cn(
              'px-3 py-1 rounded-full transition-all duration-200 font-bold',
              activeTab === 'transliteration'
                ? 'bg-[#A61B1B] text-white shadow-xs'
                : 'text-[#FFF8EA]/70 hover:text-[#FFF8EA]'
            )}
          >
            English
          </button>
        </div>

        <button
          onClick={handleCopy}
          className="p-2 rounded-full bg-[#FFFDF8]/10 backdrop-blur-md hover:bg-[#FFFDF8]/8 backdrop-blur-md text-[#FFF8EA]/70 border border-[#FFFDF8]/12 text-xs flex items-center gap-1 cursor-pointer active:scale-90 transition-all"
          title="Copy Mantra"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Main Mantra Verse Box with 24px squircle radius */}
      <div className="p-5 rounded-[24px] bg-[#FFFDF8]/10 backdrop-blur-md border border-[#C99A3D] text-base sm:text-lg font-serif text-[#3D302B] leading-relaxed whitespace-pre-line shadow-xs">
        {activeTab === 'bengali' && mantra.bengaliScript}
        {activeTab === 'sanskrit' && mantra.sanskritDevanagari}
        {activeTab === 'transliteration' && (
          <span className="text-[#FFF8EA]/50 font-sans text-sm">{mantra.transliteration}</span>
        )}
      </div>

      {/* Expandable Meaning Box */}
      {isExpanded && (
        <div className="mt-5 space-y-4 pt-4 border-t border-[#FFFDF8]/10 animate-fade-in">
          {/* Meaning Card */}
          <div className="p-5 rounded-[22px] bg-[#FFFDF8]/10 backdrop-blur-md border border-[#C99A3D] space-y-2">
            <h4 className="text-xs font-bold text-[#FFF8EA] uppercase tracking-wider">
              {language === 'bn' ? 'সরল বঙ্গানুবাদ (Meaning)' : 'Meaning & Interpretation'}
            </h4>
            <p className="text-sm text-[#FFF8EA] leading-relaxed font-serif">
              {mantra.bengaliMeaning}
            </p>
            <p className="text-xs text-[#FFF8EA]/50 leading-relaxed italic border-t border-[#FFFDF8]/10 pt-2 font-sans">
              {mantra.englishMeaning}
            </p>
          </div>

          {/* 3-Step Pushpanjali Breakdown with 20px squircle radius */}
          {mantra.steps && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#FFF8EA] uppercase tracking-wider">
                {language === 'bn' ? 'পর্যায়ক্রমিক পুষ্পাঞ্জলি বিধি' : 'Step-by-Step Pushpanjali Sequence'}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {mantra.steps.map((step) => (
                  <div
                    key={step.stepNumber}
                    className="p-4 rounded-[20px] bg-[#FFFDF8]/10 backdrop-blur-md border border-[#FFFDF8]/12 text-xs"
                  >
                    <div className="font-bold text-[#E7C878] mb-1 font-serif">
                      {language === 'bn' ? step.titleBn : step.titleEn}
                    </div>
                    <p className="text-[#FFF8EA]/70 text-[11px] mb-2 leading-tight">
                      {language === 'bn' ? step.instructionsBn : step.instructionsEn}
                    </p>
                    <p className="p-2.5 rounded-[14px] bg-[#FFFDF8]/8 backdrop-blur-md text-[11px] text-[#FFF8EA] font-serif leading-snug border border-[#FFFDF8]/12">
                      {language === 'bn' ? step.bengaliScript : step.transliteration}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Context */}
          <p className="text-xs text-[#FFF8EA]/50 italic">
            <span className="font-semibold text-[#FFF8EA]">ঐতিহ্যগত তাৎপর্য: </span>
            {language === 'bn' ? mantra.culturalContextBn : mantra.culturalContextEn}
          </p>
        </div>
      )}
    </div>
  );
};
