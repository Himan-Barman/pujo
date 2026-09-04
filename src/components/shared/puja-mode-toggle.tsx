'use client';

import React from 'react';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { audioSynth } from '@/lib/audio-synth';
import { motion } from 'framer-motion';

interface PujaModeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export const PujaModeToggle: React.FC<PujaModeToggleProps> = ({
  className,
  showLabel = false,
}) => {
  const isPujaMode = useUIStore((state) => state.isPujaMode);
  const togglePujaMode = useUIStore((state) => state.togglePujaMode);
  const language = useUIStore((state) => state.language);

  const handleToggle = () => {
    togglePujaMode();
    if (!isPujaMode) {
      audioSynth.playTempleBell();
    }
  };

  const titleText = isPujaMode
    ? language === 'bn'
      ? 'পূজা মোড সক্রিয় (বন্ধ করতে ক্লিক করুন)'
      : 'Puja Mode Active (Click to turn off)'
    : language === 'bn'
    ? 'পূজা মোড চালু করুন (মন্দির আবহ)'
    : 'Turn on Puja Mode (Temple Ambience)';

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={titleText}
      aria-label={titleText}
      className={cn(
        'group relative inline-flex items-center justify-center transition-all duration-300 cursor-pointer select-none active:scale-95',
        showLabel
          ? 'gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold'
          : 'w-9 h-9 sm:w-10 sm:h-10 rounded-full',
        isPujaMode
          ? 'bg-gradient-to-br from-[#D4AA50] via-[#F3CE72] to-[#B88728] text-[#140D0B] shadow-[0_0_16px_rgba(231,200,120,0.7)] ring-2 ring-[#FFFDF8]/80'
          : 'bg-[#FFFDF8]/8 hover:bg-[#FFFDF8]/15 border border-[#FFFDF8]/15 hover:border-[#E7C878]/50 text-[#FFF8EA]',
        className
      )}
    >
      {/* Radiant Glowing Aura when Puja Mode is Active */}
      {isPujaMode && (
        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute -inset-1 rounded-full bg-[#E7C878]/30 blur-sm pointer-events-none -z-10"
        />
      )}

      {/* Diya Icon */}
      <span
        className={cn(
          'text-base sm:text-lg transition-transform duration-300 group-hover:scale-110 flex items-center justify-center',
          isPujaMode && 'drop-shadow-[0_0_8px_rgba(255,248,234,0.9)]'
        )}
      >
        🪔
      </span>

      {showLabel && (
        <span className="font-serif">
          {language === 'bn'
            ? isPujaMode
              ? 'পূজা মোড'
              : 'পূজা মোড'
            : isPujaMode
            ? 'Puja Mode'
            : 'Puja Mode'}
        </span>
      )}
    </button>
  );
};
