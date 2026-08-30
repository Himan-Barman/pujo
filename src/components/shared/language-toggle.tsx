'use client';

import React from 'react';
import { useUIStore } from '@/stores/ui-store';
import { cn } from '@/lib/utils';

export const LanguageToggle: React.FC<{ className?: string }> = ({ className }) => {
  const language = useUIStore((state) => state.language);
  const setLanguage = useUIStore((state) => state.setLanguage);

  return (
    <div
      className={cn(
        'flex items-center rounded-full bg-[#FFFDF8]/10 backdrop-blur-md p-1 border border-[#FFFDF8]/12 text-xs font-medium shadow-xs',
        className
      )}
      role="group"
      aria-label="Language selection"
    >
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        className={cn(
          'px-3 py-1 rounded-full transition-all duration-200 font-semibold',
          language === 'bn'
            ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-xs'
            : 'text-[#FFF8EA]/70 hover:text-[#E7C878]'
        )}
      >
        বাংলা
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={cn(
          'px-3 py-1 rounded-full transition-all duration-200 font-semibold',
          language === 'en'
            ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-xs'
            : 'text-[#FFF8EA]/70 hover:text-[#E7C878]'
        )}
      >
        English
      </button>
    </div>
  );
};
