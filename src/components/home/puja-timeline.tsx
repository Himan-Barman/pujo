'use client';

import React from 'react';
import Link from 'next/link';
import { useUIStore } from '@/stores/ui-store';
import { PUJA_DAYS } from '@/data/puja-days';
import { PujaDayId } from '@/types/puja';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollSection } from '@/components/shared/scroll-section';
import { StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';
import { Sparkles, ArrowRight, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PujaTimeline: React.FC = () => {
  const selectedPujaDay = useUIStore((state) => state.selectedPujaDay);
  const setSelectedPujaDay = useUIStore((state) => state.setSelectedPujaDay);
  const language = useUIStore((state) => state.language);

  return (
    <ScrollSection>
      <SectionHeading
        tagBn="শারদ দিনপঞ্জি পরিক্রমা"
        tagEn="Ritual Journey Timeline"
        titleBn="মহালয়া থেকে বিজয়া দশমী"
        titleEn="The Divine Journey: Mahalaya to Dashami"
        subtitleBn="প্রতিটি তিথির অনন্য মহিমা, ক্ষণ ও পূজাবিধির রূপরেখা।"
        subtitleEn="Follow the celestial trajectory of Sharodotsav across seven sacred moments."
      />

      <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
        {PUJA_DAYS.map((day) => {
          const isSelected = selectedPujaDay === day.id;
          return (
            <StaggerItem key={day.id}>
              <Link
                href={`/calendar?day=${day.id}`}
                onClick={() => setSelectedPujaDay(day.id as PujaDayId)}
                className={cn(
                  'agomoni-card p-4 sm:p-6 h-full flex flex-col justify-between cursor-pointer group active:scale-[0.98] transition-all duration-300 block text-left shadow-lg hover:-translate-y-1.5',
                  isSelected
                    ? 'border-[#E7C878] bg-[#FFFDF8]/[0.15] shadow-[0_12px_40px_rgba(201,154,61,0.25)]'
                    : 'hover:border-[#E7C878]/60 hover:bg-[#FFFDF8]/[0.12] hover:shadow-[0_16px_36px_rgba(0,0,0,0.6)]'
                )}
              >
                <div>
                  {/* Top Bar: Date & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={cn(
                        'px-3 py-1 rounded-full text-[11px] font-semibold border transition-colors',
                        isSelected
                          ? 'bg-[#1A1210]/90 text-[#E7C878] border-[#E7C878]/40 shadow-xs'
                          : 'bg-[#FFFDF8]/10 text-[#E7C878] border-[#FFFDF8]/12 group-hover:border-[#E7C878]/40'
                      )}
                    >
                      {language === 'bn'
                        ? (day.dateBn || day.date).split(' ')[0] + ' ' + (day.dateBn || day.date).split(' ')[1]
                        : (day.dateEn || day.date).split(' ')[0] + ' ' + (day.dateEn || day.date).split(' ')[1]}
                    </span>

                    {isSelected ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#A61B1B] text-white shadow-xs border border-[#E7C878]/30">
                        {language === 'bn' ? 'সক্রিয় তিথি' : 'Active'}
                      </span>
                    ) : (
                      <span className="text-[10px] text-[#FFF8EA]/50 uppercase font-bold tracking-wider group-hover:text-[#E7C878]/80 transition-colors">
                        {day.id === 'sandhi'
                          ? (language === 'bn' ? 'সন্ধিপূজা' : 'Sandhi')
                          : (language === 'bn' ? 'তিথি' : 'Tithi')}
                      </span>
                    )}
                  </div>

                  {/* Day Title */}
                  <h3
                    className={cn(
                      'text-xl font-bold font-serif mb-1.5 drop-shadow-sm transition-colors',
                      isSelected ? 'text-[#FFF8EA]' : 'text-[#E7C878] group-hover:text-[#FFFDF8]'
                    )}
                  >
                    {language === 'bn' ? day.nameBn : day.nameEn}
                  </h3>

                  <p className="text-xs line-clamp-2 leading-relaxed mb-4 text-[#FFF8EA]/75 group-hover:text-[#FFF8EA]/90 transition-colors">
                    {language === 'bn' ? day.descriptionBn : day.descriptionEn}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 pt-3 border-t border-[#FFFDF8]/10 text-xs text-[#FFF8EA]/70">
                    {(language === 'bn' ? day.keyRitualsBn : day.keyRitualsEn)
                      .slice(0, 2)
                      .map((rit, i) => (
                        <div key={i} className="flex items-center gap-1.5">
                          <Sparkles className="w-3 h-3 text-[#E7C878] flex-shrink-0" />
                          <span className="truncate">{rit}</span>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Footer Action Link with dynamic arrow hover */}
                <div className="mt-5 pt-3 border-t border-[#FFFDF8]/10 flex items-center justify-between text-xs font-bold text-[#E7C878] group-hover:text-[#FFFDF8] transition-colors">
                  <span>{language === 'bn' ? 'দিনটি দেখুন' : 'View Day Details'}</span>
                  <div className="w-6 h-6 rounded-full bg-[#120B09]/80 border border-[#E7C878]/30 flex items-center justify-center group-hover:bg-[#A61B1B] group-hover:border-[#E7C878] transition-all">
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform text-[#E7C878] group-hover:text-white" />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>

      {/* View Full Calendar CTA Button */}
      <div className="text-center pt-8 sm:pt-10">
        <Link
          href="/calendar"
          className="apple-btn-secondary px-8 py-3.5 text-xs sm:text-sm font-serif inline-flex items-center gap-2 shadow-lg group hover:scale-[1.02] active:scale-95 transition-all"
        >
          <Calendar className="w-4 h-4 text-[#E7C878]" />
          <span>{language === 'bn' ? 'সম্পূর্ণ পূজা পঞ্জিকা ও নির্ঘণ্ট দেখুন' : 'Explore Complete Sharad Almanac'}</span>
          <ArrowRight className="w-4 h-4 text-[#E7C878] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </ScrollSection>
  );
};

