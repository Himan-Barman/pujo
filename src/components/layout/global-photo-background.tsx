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
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % BG_PHOTOS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const photo = BG_PHOTOS[idx];

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Cycling blurred photos */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={`global-bg-${photo.id}`}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            priority
            className="object-cover blur-[22px] scale-110"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark warm overlay */}
      <div className="absolute inset-0 bg-[#1A1210]/55" />
      {/* Top-bottom gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A1210]/50 via-[#1A1210]/30 to-[#1A1210]/60" />
      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1A1210]/30 via-transparent to-[#1A1210]/30" />
    </div>
  );
};
