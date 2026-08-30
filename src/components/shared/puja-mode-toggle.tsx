'use client';

import React from 'react';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { audioSynth } from '@/lib/audio-synth';

export const PujaModeToggle: React.FC<{ className?: string }> = ({ className }) => {
  const isPujaMode = useUIStore((state) => state.isPujaMode);
  const togglePujaMode = useUIStore((state) => state.togglePujaMode);
  const language = useUIStore((state) => state.language);

  const handleToggle = () => {
    togglePujaMode();
    if (!isPujaMode) {
      audioSynth.playTempleBell();
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        'group relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer shadow-xs',
        isPujaMode
          ? 'bg-[#D4AA50] text-[#171A1B] border border-[#E7C878] shadow-sm ring-1 ring-[#D4AA50]'
          : 'bg-[#A61B1B] text-[#FFFDF8] hover:bg-[#741313]',
        className
      )}
      aria-label="Toggle Pandal Night mode"
    >
      <span className="text-sm">🪔</span>
      <span>{language === 'bn' ? (isPujaMode ? 'পূজা মোড সক্রিয়' : 'পূজা মোড') : (isPujaMode ? 'Puja Mode Active' : 'Puja Mode')}</span>
    </button>
  );
};
