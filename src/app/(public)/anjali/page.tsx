import React from 'react';
import { MANTRAS_DATA } from '@/data/mantras';
import { MantraExplorer } from '@/components/mantras/mantra-explorer';
import { SectionHeading } from '@/components/shared/section-heading';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'পুষ্পাঞ্জলি ও পূজা স্তোত্র | আগমনী (Agomoni)',
  description: 'দেবী দুর্গার প্রণাম মন্ত্র, মহাষ্টমীর ৩ পর্যায়ের পুষ্পাঞ্জলি, সন্ধিপূজা স্তোত্র এবং মহিষাসুরমর্দিনী স্তোত্রম বিশুদ্ধ বাংলা ও সংস্কৃত হরফে।',
};

export default function AnjaliPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      <SectionHeading
        tagBn="পুণ্য পুষ্পাঞ্জলি ও স্তোত্রমালা"
        tagEn="Sacred Pushpanjali & Stotras"
        titleBn="পুষ্পাঞ্জলি মন্ত্র ও দুর্গা স্তোত্রমালা"
        titleEn="Pushpanjali Verses & Devi Durga Stotras"
        subtitleBn="বিশুদ্ধ বাংলা হরফ, দেবনাগরী সংস্কৃত ও ইংরেজি উচ্চারণসহ সরল বঙ্গানুবাদ, অডিও আবাহন ও ৩ দফার পুষ্পাঞ্জলি।"
        subtitleEn="Authentic Bengali script, Devanagari, English transliteration, audio chants, and 3-round Pushpanjali guide."
        align="center"
      />

      <MantraExplorer mantras={MANTRAS_DATA} />
    </div>
  );
}
