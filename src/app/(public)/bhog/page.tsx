'use client';

import React from 'react';
import { SectionHeading } from '@/components/shared/section-heading';
import { BhogExplorer } from '@/components/bhog/bhog-explorer';

export default function BhogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      <SectionHeading
        tagBn="পবিত্র মহাপ্রসাদ ও ৫৬ ভোগ"
        tagEn="Sacred Mahaprasad Feast"
        titleBn="দুর্গাপূজার মহাপ্রসাদ ও ঐতিহ্যবাহী ভোগ"
        titleEn="Traditional Durga Puja Mahaprasad"
        subtitleBn="ঘিয়ের সুবাসে গোবিন্দভোগ চালের খিচুড়ি, বাসন্তী পোলাও, পঞ্চব্যঞ্জন লাবড়া, ধোঁকার ডালনা ও সুস্বাদু ছানার পায়েশের সাত্ত্বিক বৈদিক রেসিপি।"
        subtitleEn="The culinary soul of Durga Puja: authentic sattvic recipes cooked with pure devotion, desi ghee, and traditional spices."
      />

      {/* Interactive Comprehensive Bhog Experience */}
      <BhogExplorer />
    </div>
  );
}
