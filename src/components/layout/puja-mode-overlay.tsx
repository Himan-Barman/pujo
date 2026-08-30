'use client';

import React from 'react';
import { useUIStore } from '@/stores/ui-store';
import { usePrefersReducedMotion } from '@/hooks/use-reduced-motion';

export const PujaModeOverlay: React.FC = () => {
  const isPujaMode = useUIStore((state) => state.isPujaMode);
  const prefersReducedMotion = usePrefersReducedMotion();

  if (!isPujaMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Ambient Deep Vignette & Temple Warm Glow */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#260B0B]/30 to-[#120404]/60 mix-blend-multiply transition-opacity duration-1000" />

      {/* Golden Corner Diya Glow Illumination */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#C99A2E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#C62828]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#C99A2E]/12 rounded-full blur-3xl pointer-events-none" />

      {!prefersReducedMotion && (
        <>
          {/* Floating Shiuli Flower Petals */}
          {[...Array(9)].map((_, i) => (
            <div
              key={`petal-${i}`}
              className="absolute animate-petal text-sm select-none"
              style={{
                left: `${10 + (i * 10.5)}%`,
                top: '-20px',
                animationDelay: `${i * 1.3}s`,
                animationDuration: `${10 + (i % 4) * 3}s`,
              }}
            >
              🌸
            </div>
          ))}

          {/* Drifting Incense Smoke Streams */}
          <div
            className="absolute bottom-4 left-8 w-16 h-32 bg-gradient-to-t from-white/15 to-transparent blur-md rounded-full animate-smoke"
            style={{ animationDuration: '7s' }}
          />
          <div
            className="absolute bottom-4 right-8 w-16 h-32 bg-gradient-to-t from-[#F5D77F]/15 to-transparent blur-md rounded-full animate-smoke"
            style={{ animationDuration: '8.5s', animationDelay: '2s' }}
          />
        </>
      )}

      {/* Subtle Puja Mode Active Badge */}
      <div className="fixed bottom-24 right-4 z-40 bg-[#260B0B]/90 border border-[#C99A2E]/40 px-3 py-1 rounded-full text-[11px] text-[#F5D77F] shadow-lg flex items-center gap-1.5 backdrop-blur-sm pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-[#C99A2E] animate-ping" />
        <span>পূজা মোড সক্রিয় (Puja Mode On)</span>
      </div>
    </div>
  );
};
