import React from 'react';
import { CULTURE_ARTICLES } from '@/data/culture-articles';
import { CultureCard } from '@/components/culture/culture-card';
import { CultureInteractiveHighlights } from '@/components/culture/culture-interactive-highlights';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ঐতিহ্য ও ইতিহাস | আগমনী (Agomoni)',
  description: 'বাঙালির দুর্গাপূজার ইতিহাস, নবপত্রিকা স্নান, সন্ধিপূজার ১০৮ পদ্ম ও ধুনুচি নাচের পৌরাণিক তাৎপর্য।',
};

export default function CulturePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <SectionHeading
        tagBn="ঐতিহ্য ও সংস্কৃতি"
        tagEn="Cultural Heritage & Lore"
        titleBn="বাঙালির দুর্গাপূজার সুপ্রাচীন ঐতিহ্য"
        titleEn="Living Traditions & History of Durga Puja"
        subtitleBn="প্রকৃতিপূজা থেকে শুরু করে রাজবাড়ির আভিজাত্য ও সর্বজনীন মিলনমেলার প্রামাণ্য ইতিহাস।"
        subtitleEn="In-depth editorial articles explaining the ancient philosophy behind Bengal’s grandest festival."
      />

      {/* Interactive Lore Explorer */}
      <ScrollReveal delay={0.1} distance={40}>
        <CultureInteractiveHighlights />
      </ScrollReveal>

      {/* Articles Grid with equal heights */}
      <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {CULTURE_ARTICLES.map((article) => (
          <StaggerItem key={article.id} className="h-full">
            <CultureCard article={article} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  );
}
