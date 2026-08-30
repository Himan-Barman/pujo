'use client';

import React from 'react';
import Link from 'next/link';
import { useUIStore } from '@/stores/ui-store';
import { SectionHeading } from '@/components/shared/section-heading';
import { ScrollSection } from '@/components/shared/scroll-section';
import { StaggerContainer, StaggerItem } from '@/components/shared/scroll-reveal';
import { HeartHandshake, Flame, Disc, Bot, Sparkles, ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

export const FeatureGrid: React.FC = () => {
  const language = useUIStore((state) => state.language);

  const features = [
    {
      id: 'anjali',
      titleBn: 'ডিজিটাল পুষ্পাঞ্জলি',
      titleEn: 'Digital Pushpanjali',
      descBn: 'মা দুর্গার শ্রীচরণে রক্তজবা, পদ্ম ও বিল্বপত্র নিবেদন করে আশীর্বাদ গ্রহণ করুন।',
      descEn: 'Offer sacred flowers, bilva patra, and sacred prayers directly to Maa Durga.',
      icon: HeartHandshake,
      href: '/anjali',
      badgeBn: 'লাইভ অভিজ্ঞতা',
      badgeEn: 'Live Ritual',
      accentColor: '#A61B1B',
    },
    {
      id: 'diya',
      titleBn: '১০৮ প্রদীপ প্রজ্জ্বলন',
      titleEn: '108 Sacred Diyas',
      descBn: 'সন্ধিপূজার মাহেন্দ্রক্ষণে দেবীর উদ্দেশ্যে একে একে ১০৮ মাটির প্রদীপ প্রজ্জ্বলন করুন।',
      descEn: 'Light 108 auspicious earthen lamps for Sandhi Puja with sacred intent.',
      icon: Flame,
      href: '/anjali#diyas',
      badgeBn: 'সন্ধিপূজা বিশেষ',
      badgeEn: 'Sandhi Special',
      accentColor: '#C99A3D',
    },
    {
      id: 'dhak',
      titleBn: 'ঢাকের বাদ্য ও বোল',
      titleEn: 'Dhak & Kash Beats',
      descBn: 'শারদ আগমনী ও ধুনুচি নাচের তালের সাথে সরাসরি ঢাকের বোল বাজান।',
      descEn: 'Play live authentic Bengali Dhak bols and traditional rhythmic grooves.',
      icon: Disc,
      href: '/songs#dhak',
      badgeBn: 'বাদ্যযন্ত্র',
      badgeEn: 'Acoustic',
      accentColor: '#741313',
    },
    {
      id: 'guide',
      titleBn: 'আগমনী সহায় AI (Puja Sathi)',
      titleEn: 'Puja Sathi AI Guide',
      descBn: 'তিথির সময়, পূজাবিধি, পুষ্পাঞ্জলির নিয়ম এবং ঐতিহ্যের তাৎক্ষণিক নির্দেশিকা।',
      descEn: 'Ask anything about mantras, muhurtas, ritual significance, and customs.',
      icon: Bot,
      href: '/puja-guide',
      badgeBn: 'AI সহায়ক',
      badgeEn: 'AI Assistant',
      accentColor: '#315C45',
    },
    {
      id: 'culture',
      titleBn: 'ঐতিহ্য ও ইতিহাস আর্কাইভ',
      titleEn: 'Heritage & Lore Archives',
      descBn: 'নবপত্রিকা স্নান, কুমারী পূজা, ধুনুচি নাচ ও রাজবাড়ির পূজার প্রামাণ্য ইতিহাস।',
      descEn: 'Editorial deep-dives into centuries-old traditions and folklore.',
      icon: BookOpen,
      href: '/culture',
      badgeBn: 'সংস্কৃতি',
      badgeEn: 'Culture',
      accentColor: '#5C4940',
    },
    {
      id: 'bijoya',
      titleBn: 'শুভ বিজয়া কার্ড মেকার',
      titleEn: 'Subho Bijoya Card Maker',
      descBn: 'প্রিয়জনদের জন্য ব্যক্তিগতকৃত শুভ বিজয়ার শুভেচ্ছা কার্ড তৈরি ও শেয়ার করুন।',
      descEn: 'Create custom Subho Bijoya greetings with blessings and personal notes.',
      icon: Sparkles,
      href: '/bijoya',
      badgeBn: 'দশমী বিশেষ',
      badgeEn: 'Bijoya',
      accentColor: '#A61B1B',
    },
  ];

  return (
    <ScrollSection>
      <SectionHeading
        tagBn="ডিজিটাল উৎসব মণ্ডপ"
        tagEn="Interactive Cultural Hub"
        titleBn="ইন্টারেক্টিভ পূজা অভিজ্ঞতা"
        titleEn="Interactive Devotion & Cultural Experiences"
        subtitleBn="অঞ্জলি, প্রদীপ প্রজ্জ্বলন, ঢাকের তাল, এআই সহায়িকা ও ঐতিহ্য পরিক্রমা।"
        subtitleEn="Explore rich digital rituals designed to immerse you into the festival spirit."
      />

      <StaggerContainer staggerDelay={0.09} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((item) => {
          const Icon = item.icon;
          return (
            <StaggerItem key={item.id}>
              <Link
                href={item.href}
                className="agomoni-card p-7 h-full transition-all duration-300 hover:border-[#E7C878]/40 hover:bg-[#FFFDF8]/[0.12] flex flex-col justify-between group cursor-pointer active:scale-[0.98]"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-12 h-12 rounded-[18px] flex items-center justify-center text-white shadow-xs"
                      style={{ backgroundColor: item.accentColor }}
                    >
                      <Icon className="w-6 h-6 text-[#FFFDF8]" />
                    </div>

                    <span className="px-3.5 py-1 rounded-full bg-[#1A1210]/70 backdrop-blur-md border border-[#FFFDF8]/10 text-[#E7C878] text-[10px] font-bold tracking-wider uppercase">
                      {language === 'bn' ? item.badgeBn : item.badgeEn}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-serif text-[#E7C878] mb-2 drop-shadow-sm">
                    {language === 'bn' ? item.titleBn : item.titleEn}
                  </h3>

                  <p className="text-sm text-[#FFF8EA]/75 leading-relaxed mb-6">
                    {language === 'bn' ? item.descBn : item.descEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FFFDF8]/10 flex items-center justify-between text-xs font-bold text-[#E7C878]">
                  <span>{language === 'bn' ? 'অভিজ্ঞতা নিন' : 'Explore Now'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </ScrollSection>
  );
};
