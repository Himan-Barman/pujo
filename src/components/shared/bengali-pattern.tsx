import React from 'react';
import { cn } from '@/lib/utils';

interface BengaliPatternProps {
  className?: string;
  variant?: 'divider' | 'mandala' | 'corner' | 'lotus' | 'trishul';
}

export const BengaliPattern: React.FC<BengaliPatternProps> = ({
  className,
  variant = 'divider',
}) => {
  if (variant === 'divider') {
    return (
      <div className={cn('flex items-center justify-center gap-3 my-6 opacity-85', className)}>
        <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent via-[#C99A2E] to-transparent" />
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#C99A2E"
          strokeWidth="1.5"
          className="w-5 h-5 text-[#C99A2E]"
        >
          {/* Traditional Alpana Kalas / Diya Motif */}
          <path d="M12 2C12 2 7 7.5 7 12a5 5 0 0010 0c0-4.5-5-10-5-10z" fill="rgba(201, 154, 46, 0.25)" />
          <path d="M12 7c-1.5 2-2 3.5-2 5a2 2 0 004 0c0-1.5-.5-3-2-5z" fill="#F5D77F" />
          <path d="M9 19h6M10 22h4" strokeLinecap="round" />
        </svg>
        <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent via-[#C99A2E] to-transparent" />
      </div>
    );
  }

  if (variant === 'lotus') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        className={cn('w-8 h-8 text-[#C62828]', className)}
      >
        <path
          d="M20 4C20 4 14 14 14 22C14 26.5 16.5 29 20 29C23.5 29 26 26.5 26 22C26 14 20 4 20 4Z"
          fill="currentColor"
          fillOpacity="0.85"
        />
        <path
          d="M13 13C13 13 6 18 6 25C6 29 10 31 14 30C16 29.5 18 27 18 24C18 19 13 13 13 13Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        <path
          d="M27 13C27 13 34 18 34 25C34 29 30 31 26 30C24 29.5 22 27 22 24C22 19 27 13 27 13Z"
          fill="currentColor"
          fillOpacity="0.6"
        />
        <circle cx="20" cy="32" r="2" fill="#C99A2E" />
      </svg>
    );
  }

  if (variant === 'trishul') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={cn('w-6 h-6 text-[#C99A2E]', className)}
      >
        <path d="M12 2v20M6 4v6a6 6 0 0012 0V4" strokeLinecap="round" />
        <path d="M4 4l2 2-2 2M20 4l-2 2 2 2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <div className={cn('relative w-12 h-12 flex items-center justify-center', className)}>
      <div className="absolute inset-0 rounded-full border border-[#C99A2E]/30 animate-spin" style={{ animationDuration: '24s' }} />
      <div className="w-6 h-6 rounded-full bg-[#C99A2E]/20 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-[#F5D77F]" />
      </div>
    </div>
  );
};
