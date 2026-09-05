'use client';

import React, { useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
  interactive?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className,
  spotlightColor = 'rgba(231, 200, 120, 0.16)',
  spotlightRadius = 380,
  interactive = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={interactive ? handleMouseMove : undefined}
      onMouseEnter={interactive ? handleMouseEnter : undefined}
      onMouseLeave={interactive ? handleMouseLeave : undefined}
      className={cn(
        'agomoni-card relative overflow-hidden group',
        interactive && 'cursor-pointer',
        className
      )}
      {...props}
    >
      {/* 1. Dynamic Cursor Spotlight Ambient Aura */}
      {interactive && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-500 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(${spotlightRadius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, rgba(166, 27, 27, 0.06), transparent 75%)`,
          }}
        />
      )}

      {/* 2. Dynamic Luminous Border Highlight (Traced on cursor) */}
      {interactive && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-500 z-1 border border-[#E7C878]/60"
          style={{
            opacity: isHovered ? 1 : 0,
            WebkitMaskImage: `radial-gradient(240px circle at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
            maskImage: `radial-gradient(240px circle at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
          }}
        />
      )}

      {/* 3. Card Content */}
      <div className="relative z-10 w-full h-full">{children}</div>
    </div>
  );
};
