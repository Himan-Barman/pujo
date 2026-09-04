'use client';

import React, { useState, useEffect } from 'react';
import { useUIStore, Language } from '@/stores/ui-store';
import { cn } from '@/lib/utils';
import { Globe, Check, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LanguageToggleProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className,
  variant = 'compact',
}) => {
  const language = useUIStore((state) => state.language);
  const setLanguage = useUIStore((state) => state.setLanguage);
  const [isOpen, setIsOpen] = useState(false);

  // Close modal on Escape key
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
    <>
      {/* Navbar Trigger Button: Displays Selected Option */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={cn(
          'group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer select-none active:scale-95 shadow-xs',
          'bg-[#FFFDF8]/8 hover:bg-[#FFFDF8]/15 border border-[#FFFDF8]/15 hover:border-[#E7C878]/50 text-[#FFF8EA]',
          className
        )}
        title={language === 'bn' ? 'ভাষা পরিবর্তন করুন' : 'Change Language'}
        aria-label={`Current language: ${currentLabel}. Click to change language.`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#E7C878] group-hover:rotate-45 transition-transform duration-300" />
        <span className="font-serif tracking-wide">{currentLabel}</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#E7C878]/80 group-hover:scale-125 transition-transform" />
      </button>

      {/* Language Selection Popup Window / Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="lang-modal-title"
              className="relative w-full max-w-md bg-[#140D0B] border-2 border-[#E7C878]/40 rounded-[28px] p-5 sm:p-6 shadow-[0_25px_70px_rgba(0,0,0,0.95)] z-10 overflow-hidden"
            >
              {/* Decorative Sacred Background Glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#A61B1B]/20 rounded-full blur-3xl pointer-events-none -z-10" />
              <div className="absolute bottom-0 left-0 w-44 h-44 bg-[#E7C878]/15 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#FFFDF8]/12">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-2xl bg-[#A61B1B]/30 border border-[#E7C878]/30 flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#E7C878]" />
                  </div>
                  <div>
                    <h3 id="lang-modal-title" className="text-base font-bold font-serif text-[#FFF8EA]">
                      {language === 'bn' ? 'ভাষা নির্বাচন করুন' : 'Select Language'}
                    </h3>
                    <p className="text-[11px] text-[#FFF8EA]/60 font-sans">
                      {language === 'bn' ? 'আপনার পছন্দের ভাষা বেছে নিন' : 'Choose your preferred language'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full bg-[#FFFDF8]/8 hover:bg-[#FFFDF8]/15 border border-[#FFFDF8]/12 text-[#FFF8EA]/70 hover:text-[#FFF8EA] transition-colors cursor-pointer"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Language Options List */}
              <div className="space-y-3 my-5">
                {/* 1. Bengali Option Card */}
                <button
                  type="button"
                  onClick={() => selectLanguage('bn')}
                  className={cn(
                    'w-full p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group relative border',
                    language === 'bn'
                      ? 'bg-gradient-to-r from-[#A61B1B]/40 to-[#741313]/30 border-[#E7C878] text-[#FFFDF8] shadow-md'
                      : 'bg-[#1C120F] border-[#FFFDF8]/10 hover:border-[#E7C878]/40 hover:bg-[#241713] text-[#FFF8EA]'
                  )}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={cn(
                        'w-11 h-11 rounded-2xl flex items-center justify-center text-lg font-bold font-serif flex-shrink-0 transition-transform group-hover:scale-105 border',
                        language === 'bn'
                          ? 'bg-[#A61B1B] text-[#FFFDF8] border-[#E7C878]/50 shadow-xs'
                          : 'bg-[#140D0B] text-[#E7C878] border-[#FFFDF8]/10'
                      )}
                    >
                      বাং
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold font-serif text-[#FFF8EA]">
                          বাংলা
                        </span>
                        <span className="text-xs text-[#E7C878]/80 font-medium">(Bengali)</span>
                      </div>
                      <p className="text-xs text-[#FFF8EA]/70 truncate mt-0.5 font-sans">
                        মাতৃভাষায় আগমনী শারদোৎসবের পূর্ণ অনুভব
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                      language === 'bn'
                        ? 'bg-[#E7C878] text-[#140D0B] shadow-xs'
                        : 'border border-[#FFFDF8]/20 group-hover:border-[#E7C878]/50'
                    )}
                  >
                    {language === 'bn' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>

                {/* 2. English Option Card */}
                <button
                  type="button"
                  onClick={() => selectLanguage('en')}
                  className={cn(
                    'w-full p-4 rounded-2xl text-left transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 group relative border',
                    language === 'en'
                      ? 'bg-gradient-to-r from-[#A61B1B]/40 to-[#741313]/30 border-[#E7C878] text-[#FFFDF8] shadow-md'
                      : 'bg-[#1C120F] border-[#FFFDF8]/10 hover:border-[#E7C878]/40 hover:bg-[#241713] text-[#FFF8EA]'
                  )}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={cn(
                        'w-11 h-11 rounded-2xl flex items-center justify-center text-sm font-extrabold flex-shrink-0 transition-transform group-hover:scale-105 border font-mono',
                        language === 'en'
                          ? 'bg-[#A61B1B] text-[#FFFDF8] border-[#E7C878]/50 shadow-xs'
                          : 'bg-[#140D0B] text-[#E7C878] border-[#FFFDF8]/10'
                      )}
                    >
                      EN
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm sm:text-base font-bold font-serif text-[#FFF8EA]">
                          English
                        </span>
                        <span className="text-xs text-[#E7C878]/80 font-medium">(International)</span>
                      </div>
                      <p className="text-xs text-[#FFF8EA]/70 truncate mt-0.5 font-sans">
                        Experience Durga Puja rituals, panjika & culture
                      </p>
                    </div>
                  </div>

                  <div
                    className={cn(
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                      language === 'en'
                        ? 'bg-[#E7C878] text-[#140D0B] shadow-xs'
                        : 'border border-[#FFFDF8]/20 group-hover:border-[#E7C878]/50'
                    )}
                  >
                    {language === 'en' && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              </div>

              {/* Bottom Quick Dismiss Action */}
              <div className="pt-3 border-t border-[#FFFDF8]/10 flex items-center justify-between text-xs text-[#FFF8EA]/60">
                <span className="flex items-center gap-1.5 text-[11px] text-[#E7C878]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'স্বয়ংক্রিয় প্রয়োগ' : 'Applies instantly'}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-3.5 py-1.5 rounded-full bg-[#FFFDF8]/8 hover:bg-[#FFFDF8]/15 text-[#FFF8EA] text-xs font-semibold cursor-pointer transition-colors"
                >
                  {language === 'bn' ? 'সম্পন্ন' : 'Done'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
