import React from 'react';
import { RadioSection } from '@/components/music/radio-section';
import { SectionHeading } from '@/components/shared/section-heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'শারদ সুরতরঙ্গ ও ভক্তিগীতি | আগমনী (Agomoni)',
  description: 'মহালয়া চণ্ডীপাঠ, মহাষষ্ঠী বোধন, মহাষ্টমী পুষ্পাঞ্জলি, সন্ধিপূজা, মহানবমী ও বিজয়ার সিঁদুরখেলার গান ও ঢাকের সুরতরঙ্গ।',
};

export default function SongsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      <SectionHeading
        tagBn="শারদ সুরতরঙ্গ"
        tagEn="Sacred Melodies"
        titleBn="পূজার সুর ও ভক্তিগীতি"
        titleEn="Puja Melodies & Devotional Songs"
      />
      <RadioSection />
    </div>
  );
}
