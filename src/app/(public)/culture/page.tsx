import React from 'react';
import { CulturePageView } from '@/components/culture/culture-page-view';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ঐতিহ্য ও ইতিহাস | আগমনী (Agomoni)',
  description: 'বাঙালির দুর্গাপূজার ইতিহাস, নবপত্রিকার ৯ উদ্ভিদ, দশভুজার ১০ মহাশস্ত্র, সন্ধিপূজার ১০৮ পদ্ম ও ধুনুচি নাচের পৌরাণিক তাৎপর্য।',
};

export default function CulturePage() {
  return <CulturePageView />;
}

