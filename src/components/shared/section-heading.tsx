'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BengaliPattern } from './bengali-pattern';
import { useUIStore } from '@/stores/ui-store';

interface SectionHeadingProps {
  titleBn: string;
  titleEn: string;
  subtitleBn?: string;
  subtitleEn?: string;
  tagBn?: string;
  tagEn?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
  showPattern?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  titleBn,
  titleEn,
  subtitleBn,
  subtitleEn,
  tagBn,
  tagEn,
  align = 'center',
  className,
  showPattern = true,
}) => {
  const language = useUIStore((state) => state.language);
  const activeTag = language === 'bn' ? (tagBn || tagEn) : (tagEn || tagBn);
  const activeTitle = language === 'bn' ? titleBn : titleEn;
  const activeSubtitle = language === 'bn' ? (subtitleBn || subtitleEn) : (subtitleEn || subtitleBn);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={cn(
        'max-w-3xl mb-6 sm:mb-10 px-2 sm:px-0 select-none',
        align === 'center' && 'mx-auto text-center',
        align === 'left' && 'text-left',
        align === 'right' && 'text-right',
        className
      )}
    >
      {activeTag && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#FFFDF8]/10 backdrop-blur-md border border-[#E7C878]/30 text-[#E7C878] text-[10.5px] sm:text-xs font-semibold tracking-wider uppercase mb-2 sm:mb-3 shadow-xs"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#E7C878] animate-pulse" />
          <span>{activeTag}</span>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="text-2xl sm:text-3xl md:text-5xl font-extrabold mb-2 text-[#E7C878] font-serif drop-shadow-md leading-[1.3] sm:leading-[1.4] tracking-normal py-0.5 sm:py-1"
      >
        <span className="block">{activeTitle}</span>
      </motion.h2>

      {activeSubtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs sm:text-base text-[#FFF8EA]/75 leading-relaxed mt-1 sm:mt-2 max-w-2xl mx-auto"
        >
          {activeSubtitle}
        </motion.p>
      )}

      {showPattern && <BengaliPattern variant="divider" className="my-4 opacity-70" />}
    </motion.div>
  );
};
