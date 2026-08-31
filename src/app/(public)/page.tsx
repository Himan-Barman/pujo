import React from 'react';
import { HeroSection } from '@/components/home/hero-section';
import { TodaysPuja } from '@/components/home/todays-puja';
import { PujaTimeline } from '@/components/home/puja-timeline';
import { FeatureGrid } from '@/components/home/feature-grid';
import { RadioSection } from '@/components/music/radio-section';
import { CultureCard } from '@/components/culture/culture-card';
import { CultureInteractiveHighlights } from '@/components/culture/culture-interactive-highlights';
import { CULTURE_ARTICLES } from '@/data/culture-articles';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollSection } from '@/components/shared/scroll-section';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';
import { BijoyaCTA } from '@/components/home/bijoya-cta';
import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Today's Puja Section */}
      <TodaysPuja />

      {/* 3. Ritual Journey Timeline */}
      <PujaTimeline />

      {/* 4. Interactive Feature Grid */}
      <FeatureGrid />

      {/* 5. Puja Radio Section */}
      <ScrollSection>
        <SectionHeading
          tagBn="শারদ সুরতরঙ্গ"
          tagEn="Puja Radio & Melodies"
          titleBn="পূজা রেডিও ও ভক্তির সুর"
          titleEn="Sharodotsav Radio & Melodies"
          subtitleBn="মহালয়ার চণ্ডীপাঠ, ভোরের আগমনী, ঢাকের বোল ও সন্ধ্যা আরতির অমর সুর।"
          subtitleEn="Experience evocative dawn chants, dhak beats, and atmospheric evening aartis."
        />
        <RadioSection />
      </ScrollSection>

      {/* 6. Culture & Heritage Section */}
      <ScrollSection>
        <SectionHeading
          tagBn="ঐতিহ্য ও ইতিহাস"
          tagEn="Culture & Heritage"
          titleBn="বাঙালির দুর্গাপূজার ঐতিহ্য"
          titleEn="Timeless Cultural Traditions of Bengal"
          subtitleBn="নবপত্রিকা স্নান থেকে সন্ধিপূজা ও ধুনুচি নাচের অন্তর্নিহিত তাৎপর্য।"
          subtitleEn="Deep-dive editorials into the sacred symbolism behind each age-old custom."
        />

        {/* Interactive Botanical & Weapon Lore (Top 3 items with Explore All button) */}
        <ScrollReveal delay={0.15} distance={45}>
          <CultureInteractiveHighlights limit={3} showViewAllButton />
        </ScrollReveal>

        {/* Historical Chronicles Sub-Heading & 3 Articles Grid with View All button */}
        <div className="mt-14 sm:mt-20 pt-10 border-t border-[#FFFDF8]/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1.5 text-left">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[#E7C878] text-[11px] sm:text-xs font-semibold shadow-xs">
                <BookOpen className="w-3.5 h-3.5 text-[#C99A3D]" />
                <span>ঐতিহাসিক ইতিবৃত্ত ও দর্শন • Historical Chronicles</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold font-serif text-[#FFF8EA]">
                বাঙালির দুর্গোৎসবের প্রামাণ্য ইতিহাস
              </h3>
              <p className="text-xs sm:text-sm text-[#E7C878]/90 font-sans max-w-2xl">
                পূজার সুপ্রাচীন বিবর্তন, সন্ধিপূজার নিভৃত রহস্য ও সাংস্কৃতিক ঐতিহ্যের প্রামাণ্য নিবন্ধমালা।
              </p>
            </div>

            <Link
              href="/culture"
              className="apple-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 whitespace-nowrap self-start sm:self-auto"
            >
              <span>সকল ইতিহাস পাঠ করুন</span>
              <ArrowRight className="w-4 h-4 text-[#E7C878]" />
            </Link>
          </div>

          {/* Grid of only 3 articles with equal height */}
          <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {CULTURE_ARTICLES.slice(0, 3).map((article) => (
              <StaggerItem key={article.id} className="h-full">
                <CultureCard article={article} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Centered All Articles Button */}
          <div className="text-center pt-3">
            <Link
              href="/culture"
              className="apple-btn-primary px-8 py-3.5 text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-xl border border-[#E7C878]/40 active:scale-95 transition-all"
            >
              <span>সকল ঐতিহ্য ও ইতিহাস নিবন্ধ দেখুন</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </ScrollSection>

      {/* 7. Final Bijoya CTA */}
      <BijoyaCTA />
    </div>
  );
}
