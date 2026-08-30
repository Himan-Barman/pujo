'use client';

import React from 'react';
import Link from 'next/link';
import { usePujaDay } from '@/hooks/use-puja-day';
import { useUIStore } from '@/stores/ui-store';
import { RITUALS_DATA } from '@/data/rituals';
import { MANTRAS_DATA } from '@/data/mantras';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollSection } from '@/components/shared/scroll-section';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import { Clock, Calendar as CalendarIcon, Sparkles, ArrowRight, HeartHandshake } from 'lucide-react';
import { audioSynth } from '@/lib/audio-synth';

export const TodaysPuja: React.FC = () => {
  const { currentDay } = usePujaDay();
  const language = useUIStore((state) => state.language);

  // Match main ritual for the active day
  const mainRitual =
    RITUALS_DATA.find((r) => r.dayId === currentDay.id) || RITUALS_DATA[2];
  const featuredMantra =
    MANTRAS_DATA.find((m) => m.type === 'pushpanjali') || MANTRAS_DATA[0];

  return (
    <ScrollSection>
      <SectionHeading
        tagBn="আজকের তিথি ও শুভলগ্ন"
        tagEn="Today's Sacred Tithi & Rituals"
        titleBn="আজকের প্রধান পূজা ও পুষ্পাঞ্জলি"
        titleEn="Today's Sacred Auspicious Window"
        subtitleBn="তিথি ক্ষণ, পুষ্পাঞ্জলির সময় এবং চণ্ডীপাঠের পুণ্য মুহূর্ত।"
        subtitleEn="Live Tithi coordinates, Pushpanjali schedule, and sacred mantras for today."
      />

      <ScrollReveal delay={0.1} distance={50}>
        <div className="agomoni-card p-6 sm:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Box: Day Info and Main Ritual */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[#E7C878] text-xs font-semibold flex items-center gap-1.5 shadow-xs">
                  <CalendarIcon className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{language === 'bn' ? (currentDay.dateBn || currentDay.date) : (currentDay.dateEn || currentDay.date)}</span>
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#FFFDF8]/10 backdrop-blur-md border border-[#FFFDF8]/12 text-xs text-[#FFF8EA]/70 font-medium">
                  {language === 'bn' ? currentDay.tithiBn : currentDay.tithiEn}
                </span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-extrabold font-serif text-[#E7C878] drop-shadow-sm">
                {language === 'bn' ? currentDay.nameBn : currentDay.nameEn}
              </h3>

              <div className="p-5 rounded-2xl bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/12 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#E7C878]">
                  <Clock className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>
                    {language === 'bn' ? mainRitual.titleBn : mainRitual.titleEn} —{' '}
                    {language === 'bn' ? mainRitual.timeBn : mainRitual.timeEn}
                  </span>
                </div>
                <p className="text-sm text-[#FFF8EA]/75 leading-relaxed">
                  {language === 'bn' ? mainRitual.fullDescBn : mainRitual.fullDescEn}
                </p>
              </div>

              {/* Apple-style Capsule Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/anjali"
                  className="apple-btn-primary px-6 py-3 text-xs flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <HeartHandshake className="w-4 h-4 text-[#E7C878]" />
                  <span>{language === 'bn' ? 'অঞ্জলি দিন' : 'Offer Pushpanjali'}</span>
                </Link>

                <Link
                  href="/calendar"
                  className="apple-btn-secondary px-5 py-3 text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{language === 'bn' ? 'সম্পূর্ণ পঞ্জিকা দেখুন' : 'Full Calendar'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Right Box: Minimal Dark Apple-style Sacred Mantra Card */}
            <div className="lg:col-span-5 p-6 rounded-[24px] bg-[#1A1210]/60 backdrop-blur-xl border border-[#FFFDF8]/8 text-[#FFF8EA] space-y-4 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-[#FFFDF8]/8">
                <div className="text-xs font-bold text-[#E7C878] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                  <Sparkles className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{language === 'bn' ? 'আজকের মন্ত্র' : "Today's Sacred Stotram"}</span>
                </div>
                <button
                  type="button"
                  onClick={() => audioSynth.playShankha(3.2)}
                  className="text-[11px] px-3 py-1 rounded-full bg-[#2A2420] text-[#FFF8EA] hover:bg-[#342D28] border border-[#FFFDF8]/8 transition-all flex items-center gap-1 cursor-pointer font-medium active:scale-95 shadow-xs"
                >
                  <span>{language === 'bn' ? 'শঙ্খধ্বনি' : 'Sound Shankha'}</span>
                </button>
              </div>

              <p className="text-sm font-serif text-[#FFF8EA] leading-relaxed whitespace-pre-line bg-[#1A1210]/70 backdrop-blur-xl p-4 rounded-xl border border-[#FFFDF8]/8 italic">
                {language === 'bn' ? featuredMantra.bengaliScript : featuredMantra.transliteration}
              </p>

              <p className="text-xs text-[#FFF8EA]/70 leading-relaxed font-sans">
                <span className="font-semibold text-[#E7C878]">
                  {language === 'bn' ? 'সরলার্থ: ' : 'Meaning: '}
                </span>
                {language === 'bn' ? featuredMantra.bengaliMeaning : featuredMantra.englishMeaning}
              </p>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </ScrollSection>
  );
};
