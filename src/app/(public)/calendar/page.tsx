import React, { Suspense } from 'react';
import { PujaCalendar } from '@/components/puja/puja-calendar';
import { SectionHeading } from '@/components/shared/section-heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'পূজা পঞ্জিকা ও নির্ঘণ্ট | আগমনী (Agomoni)',
  description: 'শারদীয়া দুর্গাপূজার সম্পূর্ণ দিনপঞ্জি, তিথি ক্ষণ, পুষ্পাঞ্জলি ও সন্ধিপূজার সঠিক সময়সূচি।',
};

export default function CalendarPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <SectionHeading
        tagBn="বিশুদ্ধ দিনপঞ্জিকা"
        tagEn="Sharad Almanac"
        titleBn="দুর্গাপূজা পঞ্জিকা ও তিথি নির্ঘণ্ট"
        titleEn="Sharodiya Durga Puja Calendar & Tithis"
        subtitleBn="মহালয়া থেকে বিজয়া দশমী—প্রতিটি পুণ্য তিথি, পুষ্পাঞ্জলির সময় এবং প্রধান পূজাবিধির রূপরেখা।"
        subtitleEn="Comprehensive day-by-day ritual schedule with astronomical Tithi timings and Pushpanjali hours."
      />

      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="w-10 h-10 border-2 border-[#E7C878] border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <PujaCalendar />
      </Suspense>
    </div>
  );
}

