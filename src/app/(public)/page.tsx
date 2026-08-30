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
import { ArrowRight } from 'lucide-react';

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

        {/* Interactive Botanical & Weapon Lore */}
        <ScrollReveal delay={0.15} distance={45}>
          <CultureInteractiveHighlights />
        </ScrollReveal>

        {/* Editorial Articles Grid with equal heights */}
        <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 items-stretch">
          {CULTURE_ARTICLES.map((article) => (
            <StaggerItem key={article.id} className="h-full">
              <CultureCard article={article} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </ScrollSection>

      {/* 7. Final Bijoya CTA */}
      <BijoyaCTA />
    </div>
  );
}
