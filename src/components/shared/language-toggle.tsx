'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useUIStore, Language } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageToggleProps {
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className }) => {
  const language = useUIStore((state) => state.language);
  const setLanguage = useUIStore((state) => state.setLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentLabel = language === 'bn' ? 'বাংলা' : 'English';

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Navbar Trigger Button: Displays Selected Option */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-xs',
          isOpen
            ? 'bg-[#FFFDF8]/15 border-[#E7C878]/60 text-[#FFFDF8]'
            : 'bg-[#FFFDF8]/8 hover:bg-[#FFFDF8]/15 border border-[#FFFDF8]/15 hover:border-[#E7C878]/50 text-[#FFF8EA]',
          className
        )}
        title={language === 'bn' ? 'ভাষা পরিবর্তন করুন' : 'Change Language'}
        aria-label={`Current language: ${currentLabel}. Click to change language.`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#E7C878] group-hover:rotate-45 transition-transform duration-300" />
        <span className="font-serif tracking-wide">{currentLabel}</span>
        <ChevronDown
          className={cn(
            'w-3 h-3 text-[#E7C878]/80 transition-transform duration-200',
            isOpen && 'rotate-180 text-[#E7C878]'
          )}
        />
      </button>

      {/* Small Dropdown Window (Showing ONLY language names) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{
              duration: 0.16,
              ease: [0.16, 1, 0.3, 1],
            }}
            role="listbox"
            aria-label="Select Language"
            className="absolute right-0 mt-2 w-32 sm:w-36 rounded-2xl bg-[#140D0B] border border-[#E7C878]/40 p-1.5 shadow-[0_15px_40px_rgba(0,0,0,0.92)] z-50 origin-top-right backdrop-blur-xl"
          >
            <div className="space-y-1">
              {/* Option 1: বাংলা */}
              <button
                type="button"
                role="option"
                aria-selected={language === 'bn'}
                onClick={() => selectLanguage('bn')}
                className={cn(
                  'w-full px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-serif font-bold transition-all duration-150 flex items-center justify-between cursor-pointer active:scale-98 select-none',
                  language === 'bn'
                    ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] shadow-xs border border-[#E7C878]/40'
                    : 'text-[#FFF8EA]/80 hover:bg-[#FFFDF8]/10 hover:text-[#FFF8EA]'
                )}
              >
                <span>বাংলা</span>
                {language === 'bn' && <Check className="w-3.5 h-3.5 text-[#FFFDF8] stroke-[3]" />}
              </button>

              {/* Option 2: English */}
              <button
                type="button"
                role="option"
                aria-selected={language === 'en'}
                onClick={() => selectLanguage('en')}
                className={cn(
                  'w-full px-3 py-2 rounded-xl text-left text-xs sm:text-sm font-sans font-bold transition-all duration-150 flex items-center justify-between cursor-pointer active:scale-98 select-none',
                  language === 'en'
                    ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] text-[#FFFDF8] shadow-xs border border-[#E7C878]/40'
                    : 'text-[#FFF8EA]/80 hover:bg-[#FFFDF8]/10 hover:text-[#FFF8EA]'
                )}
              >
                <span>English</span>
                {language === 'en' && <Check className="w-3.5 h-3.5 text-[#FFFDF8] stroke-[3]" />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
