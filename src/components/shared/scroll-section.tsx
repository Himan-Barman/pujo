'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  padding?: string;
}

/**
 * Universal Section container with transparent background and consistent layout spacing.
 * Inner components and cards handle their own scroll-triggered reveal animations.
 */
export const ScrollSection: React.FC<ScrollSectionProps> = ({
  children,
  className,
  id,
  padding = 'py-10 sm:py-20',
}) => {
  return (
    <section id={id} className={cn('relative w-full bg-transparent overflow-hidden content-auto', padding)}>
      <div className={cn('max-w-7xl mx-auto px-4 sm:px-6 lg:px-8', className)}>
        {children}
      </div>
    </section>
  );
};
