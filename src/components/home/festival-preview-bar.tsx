'use client';

import React, { useState } from 'react';
import { FestivalStateId } from '@/types/festival';
import { Sparkles, ChevronUp, ChevronDown, Check, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FestivalPreviewBarProps {
  activeStateId: FestivalStateId;
  isOverrideActive: boolean;
  onSelectState: (stateId: FestivalStateId | null) => void;
}

const ALL_FESTIVAL_STATES: { id: FestivalStateId; labelBn: string; labelEn: string; date: string }[] = [
  { id: 'pre-mahalaya', labelBn: '১. প্রাক-মহালয়া (অপেক্ষা)', labelEn: 'Pre-Mahalaya', date: 'Before Oct 10' },
  { id: 'mahalaya', labelBn: '২. শুভ মহালয়া (চণ্ডীপাঠ)', labelEn: 'Mahalaya', date: 'Oct 10' },
  { id: 'post-mahalaya', labelBn: '৩. দেবীপক্ষ (ষষ্ঠীর অপেক্ষা)', labelEn: 'Post-Mahalaya', date: 'Oct 11-14' },
  { id: 'panchami', labelBn: '৪. মহাপঞ্চমী (প্রাক-সন্ধ্যা)', labelEn: 'Panchami', date: 'Oct 15' },
  { id: 'shashthi', labelBn: '৫. মহাষষ্ঠী (বোধন ও আগমন)', labelEn: 'Shashthi', date: 'Oct 16' },
  { id: 'saptami', labelBn: '৬. মহাসপ্তমী (নবপত্রিকা)', labelEn: 'Saptami', date: 'Oct 17' },
  { id: 'ashtami', labelBn: '৭. মহাষ্টমী (সন্ধিপূজা)', labelEn: 'Ashtami', date: 'Oct 18' },
  { id: 'navami', labelBn: '৮. মহানবমী (ধুনুচি আরতি)', labelEn: 'Navami', date: 'Oct 19' },
  { id: 'dashami', labelBn: '৯. বিজয়া দশমী (বিদায় ও বরণ)', labelEn: 'Dashami', date: 'Oct 20' },
  { id: 'post-dashami', labelBn: '১০. বিজয়া উত্তর (পুনরাবর্তন)', labelEn: 'Post-Dashami', date: 'Post Oct 20' },
];

export const FestivalPreviewBar: React.FC<FestivalPreviewBarProps> = ({
  activeStateId,
  isOverrideActive,
  onSelectState,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // In production outside dev/query mode, keep it discreet or hidden unless dev requested
  return (
    <aside aria-label="Festival Phase Preview Controller" className="fixed bottom-3 right-3 z-50 flex flex-col items-end gap-2 pointer-events-auto">
      {/* Expanded Control Box */}
      {isExpanded && (
        <div className="p-3.5 sm:p-4 rounded-[22px] bg-[#1A1210]/95 backdrop-blur-2xl border-2 border-[#E7C878]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_20px_rgba(231,200,120,0.2)] w-[300px] sm:w-[340px] text-left animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#FFFDF8]/12">
            <div className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#E7C878]" />
              <span className="text-xs font-bold text-[#FFF8EA] font-serif">
                উৎসবে ১০ পর্যায় সিমুলেটর
              </span>
            </div>
            {isOverrideActive && (
              <button
                type="button"
                onClick={() => onSelectState(null)}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#A61B1B] text-[#FFFDF8] font-bold flex items-center gap-1 hover:bg-[#741313] transition-colors cursor-pointer"
                title="Reset to Live Real-time Kolkata Clock"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>রিয়েলটাইম IST</span>
              </button>
            )}
          </div>

          <p className="text-[10px] text-[#FFF8EA]/70 mb-2 leading-relaxed">
            যেকোনো পর্বে ট্যাপ করে ওয়েবসাইটের পরিবর্তন, ক্ষণগণনা ও আবেগিক রূপান্তর পরীক্ষা করুন:
          </p>

          <div className="grid grid-cols-1 gap-1 max-h-[260px] overflow-y-auto pr-1">
            {ALL_FESTIVAL_STATES.map((state) => {
              const isCurrent = activeStateId === state.id;
              return (
                <button
                  key={state.id}
                  type="button"
                  onClick={() => onSelectState(state.id)}
                  className={cn(
                    'w-full px-2.5 py-1.5 rounded-xl text-left flex items-center justify-between text-xs transition-all cursor-pointer font-sans',
                    isCurrent
                      ? 'bg-[#A61B1B] text-[#FFFDF8] font-bold shadow-xs border border-[#E7C878]/40'
                      : 'hover:bg-[#FFFDF8]/10 text-[#FFF8EA]/80 border border-transparent'
                  )}
                >
                  <div className="truncate pr-2">
                    <span className="block text-[11px] truncate">{state.labelBn}</span>
                    <span className="block text-[9.5px] opacity-75 font-mono">{state.date} • {state.labelEn}</span>
                  </div>
                  {isCurrent && <Check className="w-3.5 h-3.5 text-[#E7C878] flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Pill Toggle Button */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'px-3 py-1.5 rounded-full backdrop-blur-xl border text-xs font-bold flex items-center gap-2 transition-all shadow-xl cursor-pointer active:scale-95',
          isOverrideActive
            ? 'bg-[#A61B1B] border-[#E7C878] text-[#FFFDF8] ring-2 ring-[#E7C878]/40'
            : 'bg-[#1A1210]/90 border-[#E7C878]/35 text-[#E7C878] hover:text-[#FFF8EA]'
        )}
      >
        <span className="w-2 h-2 rounded-full bg-[#E7C878] animate-pulse flex-shrink-0" />
        <span className="text-[11px]">
          {isOverrideActive ? `টেস্ট মোড: ${activeStateId}` : 'উৎসব পর্যায়'}
        </span>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#E7C878]" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-[#E7C878]" />
        )}
      </button>
    </aside>
  );
};
