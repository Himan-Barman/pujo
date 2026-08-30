'use client';

import React, { useState } from 'react';
import { GALLERY_DATA } from '@/data/gallery-data';
import { useUIStore } from '@/stores/ui-store';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';
import { MapPin } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'all', labelBn: 'সকল চিত্র', labelEn: 'All Photos' },
  { id: 'pratima', labelBn: 'দেবী প্রতিমা', labelEn: 'Devi Pratima' },
  { id: 'rituals', labelBn: 'আচার ও উৎসব', labelEn: 'Sacred Rituals' },
];

export default function GalleryPage() {
  const language = useUIStore((state) => state.language);
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredItems =
    activeCategory === 'all'
      ? GALLERY_DATA
      : GALLERY_DATA.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <SectionHeading
        tagBn="শারদ চিত্রশালা"
        tagEn="Visual Festival Showcase"
        titleBn="দুর্গাপূজা চিত্র গ্যালারি"
        titleEn="Sharodotsav Visual Art & Moments"
        subtitleBn="ডাকের সাজ, কুমারটুলির প্রতিমা নির্মাণ, ধুনুচি আরতি ও রাজবাড়ির পূজার দুর্লভ মুহূর্ত।"
        subtitleEn="Capturing the divine craftsmanship, glowing lamps, and spirited euphoria of Bengal."
      />

      {/* Category Pills in Apple-style capsule bar */}
      <ScrollReveal delay={0.05} distance={30}>
        <div className="flex items-center justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-5 py-2 rounded-full text-xs font-semibold border transition-all duration-200 cursor-pointer active:scale-[0.97]',
                activeCategory === cat.id
                  ? 'bg-[#A61B1B] text-[#FFFDF8] border-[#741313] shadow-xs'
                  : 'bg-[#FFFDF8]/10 backdrop-blur-md text-[#FFF8EA]/70 border-[#FFFDF8]/12 hover:border-[#E7C878]/30'
              )}
            >
              {language === 'bn' ? cat.labelBn : cat.labelEn}
            </button>
          ))}
        </div>
      </ScrollReveal>

      {/* Gallery Grid with 32px squircle cards */}
      <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <StaggerItem key={item.id}>
            <div className="rounded-[32px] overflow-hidden border border-[#E7C878]/25 bg-[#1A1210]/65 backdrop-blur-xl text-[#FFF8EA] group transition-all duration-300 hover:border-[#E7C878]/40 shadow-xl">
              <div className="relative h-64 sm:h-80 w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt={item.titleEn}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1210]/80 via-transparent to-transparent" />

                <div className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#1A1210]/70 backdrop-blur-xl border border-[#E7C878]/30 text-[11px] text-[#E7C878] flex items-center gap-1.5 shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{language === 'bn' ? item.locationBn : item.locationEn}</span>
                </div>
              </div>

              <div className="p-6 sm:p-7">
                <h3 className="text-xl font-bold font-serif text-[#E7C878] mb-1">
                  {language === 'bn' ? item.titleBn : item.titleEn}
                </h3>
                <p className="text-xs sm:text-sm text-[#FFF8EA]/75 leading-relaxed">
                  {language === 'bn' ? item.descriptionBn : item.descriptionEn}
                </p>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
