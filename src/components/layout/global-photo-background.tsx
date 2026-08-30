'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// The same photos used across the site — cycling through Durga Puja moments
const BG_PHOTOS = [
  { id: 'pratima', src: '/images/durga/durga-hero.jpg', alt: 'Durga Pratima' },
  { id: 'kumartuli', src: '/images/gallery/kumartuli-chokkhudaan.jpg', alt: 'Kumartuli Artisan' },
  { id: 'sandhi', src: '/images/gallery/sandhi-puja-diyas.jpg', alt: 'Sandhi Puja Diyas' },
  { id: 'aarti', src: '/images/gallery/evening-aarti.jpg', alt: 'Evening Aarti' },
  { id: 'sindoor', src: '/images/gallery/sindoor-khela.jpg', alt: 'Sindoor Khela' },
  { id: 'dhunuchi', src: '/images/gallery/dhunuchi-naach.jpg', alt: 'Dhunuchi Naach' },
];

/**
 * A fixed, full-viewport blurred photo slideshow that sits behind all page content.
 * Renders at z-0 so every page section floats above it with glassmorphic styling.
 */
export const GlobalPhotoBackground: React.FC = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    // On mobile / low power devices, use longer cycle interval to save CPU & battery
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % BG_PHOTOS.length);
    }, isMobile ? 12000 : 7000);
    return () => clearInterval(interval);
  }, []);

  const photo = BG_PHOTOS[idx];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transform-gpu" aria-hidden="true">
      {/* Cycling blurred photos with reduced quality for maximum load speed */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`global-bg-${photo.id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 will-change-[opacity]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority={idx === 0}
            quality={50}
            className="object-cover blur-[18px] sm:blur-[22px] scale-105"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark warm overlay */}
      <div className="absolute inset-0 bg-[#1A1210]/60" />
      {/* Top-bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1210]/50 via-[#1A1210]/30 to-[#1A1210]/60" />
      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1210]/30 via-transparent to-[#1A1210]/30" />
    </div>
  );
};
