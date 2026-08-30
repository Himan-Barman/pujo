import React from 'react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  titleBn: string;
  titleEn: string;
  descriptionBn?: string;
  descriptionEn?: string;
  actionTextBn?: string;
  actionTextEn?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  titleBn,
  titleEn,
  descriptionBn,
  descriptionEn,
  actionTextBn,
  actionTextEn,
  onAction,
  className,
}) => {
  return (
    <div
      className={cn(
        'glass-card rounded-2xl p-8 sm:p-12 text-center max-w-lg mx-auto border border-[#C99A2E]/20',
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-[#3D1414] border border-[#C99A2E]/40 flex items-center justify-center mx-auto mb-4 text-2xl">
        🪔
      </div>
      <h3 className="text-xl font-bold gold-gradient-text mb-1">{titleBn}</h3>
      <p className="text-xs text-[#FFF8E8]/60 uppercase tracking-wider mb-3">{titleEn}</p>

      {descriptionBn && (
        <p className="text-sm text-[#FFF8E8]/80 mb-1">{descriptionBn}</p>
      )}
      {descriptionEn && (
        <p className="text-xs text-[#FFF8E8]/60 mb-6">{descriptionEn}</p>
      )}

      {actionTextBn && (
        <button
          onClick={onAction}
          className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#8E1B1B] to-[#C62828] text-[#FFF8E8] text-sm font-semibold hover:shadow-lg hover:shadow-[#C62828]/30 transition-all cursor-pointer"
        >
          {actionTextBn} {actionTextEn && `(${actionTextEn})`}
        </button>
      )}
    </div>
  );
};
