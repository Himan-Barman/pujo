'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useUIStore } from '@/stores/ui-store';
import { Sparkles, Heart, ArrowRight } from 'lucide-react';

export const BijoyaCTA: React.FC = () => {
  const language = useUIStore((state) => state.language);

  return (
    <section className="py-12 sm:py-20 relative overflow-hidden bg-transparent">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="agomoni-card p-8 sm:p-14 text-center relative overflow-hidden">
          {/* Subtle Ambient Radial Glow inside card */}
          <div className="absolute inset-0 bg-radial from-[#C99A3D]/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1210]/70 backdrop-blur-md border border-[#E7C878]/30 text-[#E7C878] text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#E7C878]" />
              <span>{language === 'bn' ? 'শুভ বিজয়ার সম্ভাষণ' : 'Subho Bijoya Benediction'}</span>
            </div>

            <h2 className="text-4xl sm:text-6xl font-extrabold font-serif text-[#E7C878] tracking-tight drop-shadow-md">
              “আসছে বছর আবার হবে…”
            </h2>

            <p className="text-sm sm:text-base text-[#FFF8EA]/80 leading-relaxed max-w-xl mx-auto font-sans">
              {language === 'bn'
                ? 'বিজয়ার মিষ্টিমুখ, প্রবীণদের প্রণাম ও ছোটদের প্রাণভরা স্নেহের আশীর্বাদে উৎসবের পূর্ণতা। আপনার প্রিয়জনদের কাছে পাঠান ঐতিহ্যবাহী বিজয়ার শুভেচ্ছা বার্তা।'
                : 'Celebrate the sweetness of Bijoya with pranam to elders and warm embraces. Create a personalized festive greeting card for your loved ones.'}
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/bijoya"
                className="apple-btn-primary px-8 py-3.5 flex items-center gap-2 text-sm cursor-pointer shadow-lg"
              >
                <Heart className="w-4 h-4 text-[#FFF8EA] fill-current" />
                <span>{language === 'bn' ? 'বিজয়ার শুভেচ্ছা কার্ড বানান' : 'Generate Bijoya Card'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
