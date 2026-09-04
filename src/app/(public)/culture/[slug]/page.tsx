'use client';

import React, { use } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useUIStore } from '@/stores/ui-store';
import { useShare } from '@/hooks/use-share';
import { CULTURE_ARTICLES } from '@/data/culture-articles';
import { ArrowLeft, Clock, Sparkles, BookOpen, Share2, Check, Leaf, Shield, Heart } from 'lucide-react';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';
import { CultureCard } from '@/components/culture/culture-card';

interface CultureDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function CultureDetailPage({ params }: CultureDetailPageProps) {
  const resolvedParams = use(params);
  const language = useUIStore((state) => state.language);
  const [copied, setCopied] = React.useState(false);
  const { openShare } = useShare();

  const article = CULTURE_ARTICLES.find(
    (a) => a.slug === resolvedParams.slug || a.id === resolvedParams.slug
  );

  if (!article) {
    notFound();
  }

  const relatedArticles = CULTURE_ARTICLES.filter((a) => a.id !== article.id).slice(0, 3);

  const handleShare = () => {
    openShare({
      titleBn: article.titleBn,
      titleEn: article.titleEn,
      descriptionBn: article.subtitleBn,
      descriptionEn: article.subtitleEn,
      categoryBn: `ঐতিহ্য ও ইতিহাস • ${article.category}`,
      categoryEn: `Heritage & History • ${article.category}`,
      tagBn: article.category,
      tagEn: article.category,
      image: article.coverImage,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Top Header & Navigation Breadcrumb Bar (Mobile: Icon-only Left & Right | Desktop: Full Buttons) */}
      <div className="flex items-center justify-between gap-3 w-full">
        {/* Left: Back Button */}
        <Link
          href="/culture"
          aria-label={language === 'bn' ? 'সকল ঐতিহ্য নিবন্ধে ফিরে যান' : 'Back to Heritage Archives'}
          className="w-10 h-10 sm:w-auto sm:px-5 sm:py-2.5 rounded-full bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/15 text-[#E7C878] hover:text-[#FFF8EA] hover:border-[#E7C878]/50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
          <span className="hidden sm:inline">
            {language === 'bn' ? 'সকল ঐতিহ্য নিবন্ধে ফিরে যান' : 'Back to Heritage Archives'}
          </span>
        </Link>

        {/* Right: Share Button */}
        <button
          type="button"
          onClick={handleShare}
          aria-label={language === 'bn' ? 'নিবন্ধ শেয়ার করুন' : 'Share Article'}
          className="w-10 h-10 sm:w-auto sm:px-5 sm:py-2.5 rounded-full bg-[#1A1210]/80 backdrop-blur-xl border border-[#FFFDF8]/15 text-[#E7C878] hover:text-[#FFF8EA] hover:border-[#E7C878]/50 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-95 transition-all"
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
          ) : (
            <Share2 className="w-4 h-4 text-[#E7C878] flex-shrink-0" />
          )}
          <span className="hidden sm:inline">
            {copied
              ? language === 'bn'
                ? 'লিঙ্ক কপি হয়েছে!'
                : 'Link Copied!'
              : language === 'bn'
              ? 'নিবন্ধ শেয়ার করুন'
              : 'Share Article'}
          </span>
        </button>
      </div>

      {/* 1. Master Section Heading */}
      <SectionHeading
        tagBn="ঐতিহ্য ও ইতিহাস নিবন্ধ"
        tagEn="Heritage & Lore Editorial"
        titleBn={article.titleBn}
        titleEn={article.titleEn}
        subtitleBn={article.subtitleBn}
        subtitleEn={article.subtitleEn}
      />

      {/* 2. Featured Showcase Banner with split 32px squircle layout */}
      <ScrollReveal delay={0.08} distance={45}>
        <div className="agomoni-card overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            {/* Left Cover Image */}
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[420px] w-full">
              <Image
                src={article.coverImage}
                alt={article.titleEn}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1A1210]/95 via-[#1A1210]/40 to-transparent" />

              {/* Badges Floating on Image */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-[#1A1210]/80 backdrop-blur-md border border-[#E7C878]/30 text-xs font-bold text-[#E7C878] uppercase shadow-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E7C878]" />
                  <span>{article.category}</span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 px-3.5 py-1 rounded-full bg-[#1A1210]/80 backdrop-blur-md border border-[#FFFDF8]/15 text-xs text-[#FFF8EA] font-semibold flex items-center gap-1.5 shadow-xs">
                <Clock className="w-3.5 h-3.5 text-[#C99A3D]" />
                <span>{article.readingTime}</span>
              </div>
            </div>

            {/* Right Intro Panel */}
            <div className="lg:col-span-5 p-6 sm:p-10 space-y-5 bg-[#FFFDF8]/8 backdrop-blur-xl flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#FFFDF8]/10">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1A1210]/70 border border-[#E7C878]/30 text-[#E7C878] text-xs font-semibold shadow-xs">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{language === 'bn' ? 'প্রামাণ্য ইতিহাস ও দর্শন' : 'Authentic Scripture & History'}</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#E7C878] font-serif leading-tight">
                  {language === 'bn' ? article.titleBn : article.titleEn}
                </h3>

                <p className="text-xs sm:text-sm text-[#E7C878]/90 font-serif italic">
                  {language === 'bn' ? article.subtitleBn : article.subtitleEn}
                </p>

                <p className="text-sm text-[#FFF8EA]/80 leading-relaxed font-sans pt-1">
                  {language === 'bn' ? article.introBn : article.introEn}
                </p>
              </div>

              {/* Bottom Quote Capsule */}
              <div className="p-4 rounded-[20px] bg-[#1A1210]/70 border border-[#E7C878]/30 text-xs font-serif text-[#E7C878] italic leading-relaxed">
                {language === 'bn' ? article.highlightQuoteBn : article.highlightQuoteEn}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 3. Main Full Story & Lore Section */}
      <ScrollReveal delay={0.12} distance={45}>
        <div className="agomoni-card p-6 sm:p-12 space-y-8 shadow-2xl">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#FFFDF8]/10 text-[#E7C878]">
            <Sparkles className="w-5 h-5 text-[#C99A3D]" />
            <h3 className="text-2xl font-bold font-serif">
              {language === 'bn' ? 'বিশদ ইতিহাস ও অন্তর্নিহিত তাৎপর্য' : 'Detailed Lore & Spiritual Essence'}
            </h3>
          </div>

          {/* Paragraphs */}
          <div className="grid grid-cols-1 gap-6 text-sm sm:text-base text-[#FFF8EA]/85 leading-relaxed font-sans">
            {(language === 'bn' ? article.contentBn : article.contentEn).map((paragraph, index) => (
              <div
                key={index}
                className="p-5 sm:p-6 rounded-[22px] bg-[#FFFDF8]/[0.06] backdrop-blur-md border border-[#FFFDF8]/10 hover:border-[#E7C878]/30 transition-all shadow-xs"
              >
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-[#1A1210]/80 border border-[#E7C878]/30 text-[#E7C878] text-xs font-bold font-mono flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="leading-relaxed flex-1">{paragraph}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Key Spiritual Takeaways Box */}
          <div className="p-6 sm:p-8 rounded-[28px] bg-[#1A1210]/85 backdrop-blur-xl border border-[#E7C878]/35 space-y-4 shadow-md">
            <div className="flex items-center gap-2 text-sm font-bold text-[#E7C878] uppercase tracking-wider font-serif">
              <BookOpen className="w-4 h-4 text-[#E7C878]" />
              <span>{language === 'bn' ? 'প্রধান শিক্ষণীয় বার্তা ও দর্শন' : 'Key Takeaways & Spiritual Philosophy'}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
              {(language === 'bn' ? article.keyTakeawaysBn : article.keyTakeawaysEn).map((point, index) => (
                <div
                  key={index}
                  className="p-3.5 rounded-[18px] bg-[#FFFDF8]/8 border border-[#FFFDF8]/12 text-xs sm:text-sm text-[#FFF8EA] flex items-start gap-2.5 shadow-xs"
                >
                  <span className="text-[#E7C878] font-bold mt-0.5">•</span>
                  <span className="leading-snug">{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* 4. Related Heritage Articles in Standard 3-Column Width */}
      <div className="space-y-8 pt-4">
        <SectionHeading
          tagBn="আরও ঐতিহ্য পরিক্রমা"
          tagEn="Explore More Lore"
          titleBn="অন্যান্য ঐতিহ্যবাহী প্রবন্ধ"
          titleEn="More Heritage & Cultural Editorials"
          subtitleBn="শারদোৎসবের আরও অজানা পৌরাণিক কাহিনী ও প্রাচীন ঐতিহ্যের সন্ধানে।"
          subtitleEn="Discover more profound legends and historical dimensions of Bengal's greatest festival."
        />

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-6 items-stretch">
          {relatedArticles.map((rel) => (
            <StaggerItem key={rel.id} className="h-full">
              <CultureCard article={rel} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
}
