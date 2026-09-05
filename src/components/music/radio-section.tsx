'use client';

import React, { useState } from 'react';
import { TRACKS_DATA } from '@/data/playlists';
import { Track, TimeCategory } from '@/types/music';
import { useAudioStore } from '@/stores/audio-store';
import { useUIStore } from '@/stores/ui-store';
import { ScrollReveal } from '@/components/shared/scroll-reveal';
import {
  Sun,
  Leaf,
  Waves,
  Sparkles,
  Flame,
  Zap,
  Heart,
  Disc,
  ListMusic,
  Bell,
  Play,
  Pause,
  ChevronRight,
  Wind,
} from 'lucide-react';
import { audioSynth } from '@/lib/audio-synth';
import { cn } from '@/lib/utils';

interface DayTab {
  id: TimeCategory | 'all';
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  iconType: string;
  count: number;
}

const DAY_TABS: DayTab[] = [
  {
    id: 'mahalaya',
    titleBn: 'মহালয়া',
    titleEn: 'Mahalaya',
    subtitleBn: 'ভোরের চণ্ডীপাঠ ও দেবীর আবাহন',
    subtitleEn: 'Dawn Invocations & Chandi Path',
    iconType: 'sun',
    count: 3,
  },
  {
    id: 'shashthi',
    titleBn: 'মহাষষ্ঠী',
    titleEn: 'Maha Shashthi',
    subtitleBn: 'বোধন ও বিল্ববৃক্ষে দেবীর অধিবাস',
    subtitleEn: 'Bodhon & Sacred Bel Tree Rituals',
    iconType: 'leaf',
    count: 2,
  },
  {
    id: 'saptami',
    titleBn: 'মহাসপ্তমী',
    titleEn: 'Maha Saptami',
    subtitleBn: 'নবপত্রিকা স্নান ও সপ্তমীর আরতি',
    subtitleEn: 'Nabapatrika Snan & Sandhya Aarti',
    iconType: 'waves',
    count: 2,
  },
  {
    id: 'ashtami',
    titleBn: 'মহাঅষ্টমী',
    titleEn: 'Maha Ashtami',
    subtitleBn: 'পুষ্পাঞ্জলি স্তোত্র ও কুমারী পূজা',
    subtitleEn: 'Pushpanjali Chants & Kumari Stuti',
    iconType: 'sparkles',
    count: 2,
  },
  {
    id: 'sandhi',
    titleBn: 'সন্ধিপূজা',
    titleEn: 'Sandhi Puja',
    subtitleBn: '১০৮ প্রদীপ ও চামুণ্ডা আরতি',
    subtitleEn: '108 Diyas & Chamunda Vandana',
    iconType: 'flame',
    count: 2,
  },
  {
    id: 'navami',
    titleBn: 'মহানবমী',
    titleEn: 'Maha Navami',
    subtitleBn: 'হোমাগ্নি যজ্ঞ ও উদ্দাম ধুনুচি নাচ',
    subtitleEn: 'Sacred Homa & Dhunuchi Dance',
    iconType: 'zap',
    count: 2,
  },
  {
    id: 'dashami',
    titleBn: 'বিজয়া দশমী',
    titleEn: 'Bijoya Dashami',
    subtitleBn: 'সিঁদুরখেলা ও নিরঞ্জন সঙ্গীত',
    subtitleEn: 'Sindoor Khela & Farewell Elegy',
    iconType: 'heart',
    count: 2,
  },
  {
    id: 'dhak',
    titleBn: 'ঢাকের বোল',
    titleEn: 'Dhak Beats',
    subtitleBn: 'শারদ আগমনী ও কাঁসরের সুর',
    subtitleEn: 'Traditional Percussion & Cymbals',
    iconType: 'disc',
    count: 2,
  },
  {
    id: 'all',
    titleBn: 'সকল গান',
    titleEn: 'All Tracks',
    subtitleBn: 'সম্পূর্ণ শারদ সুরভাণ্ডার',
    subtitleEn: 'Complete Devotional Archive',
    iconType: 'list-music',
    count: 17,
  },
];

const renderDayIcon = (type: string, className = 'w-4 h-4') => {
  switch (type) {
    case 'sun':
      return <Sun className={className} />;
    case 'leaf':
      return <Leaf className={className} />;
    case 'waves':
      return <Waves className={className} />;
    case 'sparkles':
      return <Sparkles className={className} />;
    case 'flame':
      return <Flame className={className} />;
    case 'zap':
      return <Zap className={className} />;
    case 'heart':
      return <Heart className={className} />;
    case 'disc':
      return <Disc className={className} />;
    case 'list-music':
    default:
      return <ListMusic className={className} />;
  }
};

export const RadioSection: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<TimeCategory | 'all'>('mahalaya');
  const { currentTrack, isPlaying, playTrack } = useAudioStore();
  const language = useUIStore((state) => state.language);

  const activeTab = DAY_TABS.find((t) => t.id === selectedDay) || DAY_TABS[0];

  const filteredTracks =
    selectedDay === 'all'
      ? TRACKS_DATA
      : TRACKS_DATA.filter((t) => t.category === selectedDay || t.dayId === selectedDay);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const handlePlayFirstInList = () => {
    if (filteredTracks.length > 0) {
      playTrack(filteredTracks[0]);
    }
  };

  // Smart wheel scroll forwarding: when bottom/top reached, smoothly scroll the entire window
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const isScrollingDown = e.deltaY > 0;
    const isAtBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight - 3;
    const isAtTop = el.scrollTop <= 3;

    if ((isScrollingDown && isAtBottom) || (!isScrollingDown && isAtTop)) {
      window.scrollBy({ top: e.deltaY, behavior: 'auto' });
    }
  };

  const handleSelectDay = (id: TimeCategory | 'all', e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedDay(id);
    e.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <div className="w-full">
      <ScrollReveal delay={0.05} distance={35}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* LEFT SIDEBAR: Days & Phases of Durga Puja (Filter Bar)          */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-3">
            <div className="px-3 py-1 flex items-center justify-between text-xs font-bold text-[#E7C878] uppercase tracking-wider">
              <span>{language === 'bn' ? 'পূজার দিন ও তিথি' : 'Festival Days'}</span>
              <span className="text-[10px] text-[#FFF8EA]/50 font-normal">
                {language === 'bn' ? 'দিন বাছাই করুন' : 'Select Day'}
              </span>
            </div>

            {/* Day Navigation (Exact Anjali Filter Bar Capsule on Mobile, Vertical Cards on Desktop) */}
            <div className="relative w-full rounded-full lg:rounded-[30px] p-1 sm:p-1.5 lg:p-3.5 bg-[#120B09]/60 backdrop-blur-xl border border-[#FFFDF8]/10 shadow-xl overflow-hidden group/nav select-none">
              {/* Scroll Track with Progressive Edge Mask on Mobile */}
              <div
                className="w-full overflow-x-auto lg:overflow-visible no-scrollbar py-1 lg:py-0 px-4 sm:px-10 lg:px-0 flex lg:flex-col items-center lg:items-stretch justify-start gap-2 sm:gap-2.5 scroll-smooth relative z-0 [mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.3)_1.5%,rgba(0,0,0,0.8)_4%,black_8%,black_92%,rgba(0,0,0,0.8)_96%,rgba(0,0,0,0.3)_98.5%,transparent_100%)] lg:[mask-image:none] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,rgba(0,0,0,0.3)_1.5%,rgba(0,0,0,0.8)_4%,black_8%,black_92%,rgba(0,0,0,0.8)_96%,rgba(0,0,0,0.3)_98.5%,transparent_100%)] lg:[-webkit-mask-image:none]"
              >
                {DAY_TABS.map((tab) => {
                  const isActive = selectedDay === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={(e) => handleSelectDay(tab.id, e)}
                      className={cn(
                        'relative flex-shrink-0 lg:flex-shrink transition-all duration-200 cursor-pointer select-none active:scale-[0.97] lg:active:scale-[0.98]',
                        // Mobile: exact Anjali compact capsule pill | Desktop: full vertical sidebar card
                        'flex items-center justify-center lg:justify-between gap-1.5 lg:gap-2.5 px-3.5 sm:px-5 py-1.5 sm:py-2.5 lg:p-3.5 rounded-full lg:rounded-[20px] border text-xs sm:text-sm font-bold font-serif whitespace-nowrap lg:whitespace-normal',
                        isActive
                          ? 'bg-gradient-to-r from-[#A61B1B] to-[#741313] border-2 border-[#E7C878] text-[#FFFDF8] shadow-[0_4px_22px_rgba(201,154,61,0.35)] scale-[1.02] lg:scale-100 z-10 lg:z-auto'
                          : 'agomoni-filter-tab bg-[#1A1210]/80 lg:bg-[#1A1210]/40 backdrop-blur-xl lg:backdrop-blur-none border-[#FFFDF8]/12 lg:border-[#FFFDF8]/8 text-[#FFF8EA]/80 hover:text-[#FFFDF8]'
                      )}
                    >
                      {/* Mobile Active Sparkles */}
                      {isActive && (
                        <Sparkles className="w-3.5 h-3.5 text-[#E7C878] animate-pulse flex-shrink-0 lg:hidden" />
                      )}

                      <div className="flex items-center gap-2.5 lg:gap-3 min-w-0">
                        {/* Icon: Hidden on mobile, visible on desktop */}
                        <div
                          className={cn(
                            'hidden lg:flex w-8 h-8 rounded-[12px] items-center justify-center flex-shrink-0 border',
                            isActive
                              ? 'bg-[#FFFDF8]/20 border-[#FFFDF8]/30 text-[#FFF8EA]'
                              : 'bg-[#FFFDF8]/8 border-[#FFFDF8]/10 text-[#E7C878]'
                          )}
                        >
                          {renderDayIcon(tab.iconType, 'w-4 h-4')}
                        </div>

                        <div className="min-w-0 text-left">
                          {/* Heading */}
                          <h4 className="text-xs sm:text-sm font-bold font-serif leading-tight truncate">
                            {language === 'bn' ? tab.titleBn : tab.titleEn}
                          </h4>
                          {/* Sub Heading: Hidden on mobile, visible on desktop */}
                          <p
                            className={cn(
                              'hidden lg:block text-[10px] truncate mt-0.5',
                              isActive ? 'text-[#FFFDF8]/80' : 'text-[#FFF8EA]/50'
                            )}
                          >
                            {language === 'bn' ? tab.subtitleBn : tab.subtitleEn}
                          </p>
                        </div>
                      </div>

                      {/* Count Badge & Chevron: Hidden on mobile, visible on desktop */}
                      <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded-full text-[10px] font-mono font-bold',
                            isActive ? 'bg-[#FFFDF8]/20 text-[#FFF8EA]' : 'bg-[#FFFDF8]/8 text-[#E7C878]'
                          )}
                        >
                          {tab.count}
                        </span>
                        <ChevronRight
                          className={cn(
                            'w-4 h-4 transition-transform',
                            isActive ? 'text-[#FFFDF8] translate-x-0.5' : 'text-[#FFF8EA]/30'
                          )}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Left Edge Progressive Blur Overlay (Mobile only) */}
              <div
                aria-hidden="true"
                className="lg:hidden pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-28 z-20 rounded-l-full"
                style={{
                  background:
                    'linear-gradient(to right, rgba(18, 11, 9, 0.98) 0%, rgba(18, 11, 9, 0.85) 30%, rgba(18, 11, 9, 0.45) 70%, transparent 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  maskImage:
                    'linear-gradient(to right, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to right, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)',
                }}
              />

              {/* Right Edge Progressive Blur Overlay (Mobile only) */}
              <div
                aria-hidden="true"
                className="lg:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-28 z-20 rounded-r-full"
                style={{
                  background:
                    'linear-gradient(to left, rgba(18, 11, 9, 0.98) 0%, rgba(18, 11, 9, 0.85) 30%, rgba(18, 11, 9, 0.45) 70%, transparent 100%)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  maskImage:
                    'linear-gradient(to left, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)',
                  WebkitMaskImage:
                    'linear-gradient(to left, black 0%, rgba(0,0,0,0.85) 45%, transparent 100%)',
                }}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* RIGHT CONTENT: Selected Day Songs & Audio Controls              */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">

            {/* Action Controls Bar */}
            <div className="flex items-center justify-between gap-2 px-1">
              <div className="hidden sm:flex items-center gap-2 text-xs font-serif font-bold text-[#E7C878]">
                <span>{language === 'bn' ? activeTab.titleBn : activeTab.titleEn}</span>
                <span className="text-[#FFF8EA]/30">•</span>
                <span className="text-[11px] text-[#FFF8EA]/60 font-sans font-normal">
                  {filteredTracks.length} {language === 'bn' ? 'টি গান' : 'tracks'}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-start sm:justify-end flex-wrap sm:flex-nowrap">
                <button
                  type="button"
                  onClick={handlePlayFirstInList}
                  className="apple-btn-primary px-5 py-2 text-xs flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95 flex-shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>{language === 'bn' ? 'সব চালান' : 'Play All'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => audioSynth.playShankha(3.5)}
                  className="px-3.5 py-2 rounded-full bg-[#1A1210]/80 hover:bg-[#2A2420] border border-[#FFFDF8]/15 text-[#E7C878] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md"
                  title="Shankha"
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-sans">{language === 'bn' ? 'শঙ্খ' : 'Shankha'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => audioSynth.playTempleBell()}
                  className="px-3.5 py-2 rounded-full bg-[#1A1210]/80 hover:bg-[#2A2420] border border-[#FFFDF8]/15 text-[#E7C878] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-md"
                  title="Temple Bell"
                >
                  <Bell className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-sans">{language === 'bn' ? 'ঘণ্টা' : 'Bell'}</span>
                </button>
              </div>
            </div>

            {/* Selected Day Song Container */}
            <div className="agomoni-card p-3 sm:p-4 shadow-xl overflow-hidden rounded-[32px]">
              {/* Inner Scrollable Viewport with smart wheel scroll forwarding */}
              <div
                ref={scrollContainerRef}
                onWheel={handleWheel}
                data-lenis-prevent="true"
                className="max-h-[460px] lg:max-h-[500px] overflow-y-auto glass-scrollbar pr-2 sm:pr-3 space-y-2"
              >
                {filteredTracks.map((track) => {
                  const isCurrent = currentTrack?.id === track.id;
                  return (
                    <div
                      key={track.id}
                      onClick={() => playTrack(track, filteredTracks)}
                      className={cn(
                        'p-3 sm:p-3.5 rounded-[22px] flex items-center justify-between gap-3 sm:gap-4 transition-all duration-300 border cursor-pointer group select-none active:scale-[0.99]',
                        isCurrent
                          ? 'bg-[#FFFDF8]/[0.14] backdrop-blur-md border-[#E7C878]/55 shadow-[0_4px_20px_rgba(0,0,0,0.4),0_0_18px_rgba(201,154,61,0.2)]'
                          : 'bg-[#1A1210]/45 hover:bg-[#FFFDF8]/[0.1] border-[#FFFDF8]/8 hover:border-[#E7C878]/40 hover:shadow-[0_6px_22px_rgba(0,0,0,0.4),0_0_16px_rgba(231,200,120,0.14)] hover:-translate-y-0.5'
                      )}
                    >
                      {/* Left: Play button and 2-Row Track Info */}
                      <div className="flex items-center gap-3 sm:gap-3.5 min-w-0 flex-1">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            playTrack(track, filteredTracks);
                          }}
                          className={cn(
                            'w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 cursor-pointer shadow-xs active:scale-90',
                            isCurrent && isPlaying
                              ? 'bg-[#A61B1B] text-[#FFFDF8] scale-105 shadow-[0_0_20px_rgba(166,27,27,0.6)]'
                              : 'bg-[#FFFDF8]/10 backdrop-blur-md text-[#E7C878] border border-[#FFFDF8]/15 group-hover:bg-[#A61B1B] group-hover:text-[#FFFDF8] group-hover:shadow-[0_0_18px_rgba(166,27,27,0.55)] group-hover:scale-105'
                          )}
                          aria-label={isCurrent && isPlaying ? 'Pause' : 'Play'}
                        >
                          {isCurrent && isPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </button>

                        <div className="min-w-0 flex-1">
                          {/* Row 1: Music Name */}
                          <h4
                            className={cn(
                              'text-sm sm:text-base font-bold truncate font-serif leading-snug transition-colors',
                              isCurrent ? 'text-[#E7C878]' : 'text-[#FFF8EA] group-hover:text-[#FFFDF8]'
                            )}
                          >
                            {language === 'bn' ? track.titleBn : track.titleEn}
                          </h4>
                          {/* Row 2: Music Details / Artist */}
                          <p className="text-xs text-[#FFF8EA]/65 truncate mt-0.5 font-sans font-medium group-hover:text-[#FFF8EA]/85 transition-colors">
                            {language === 'bn' ? track.artistBn : track.artistEn}
                          </p>
                        </div>
                      </div>

                      {/* Right: Time Only */}
                      <div className="flex items-center flex-shrink-0 pl-1 sm:pl-2">
                        <span className="text-xs sm:text-sm font-mono text-[#E7C878] font-bold group-hover:text-[#FFF8EA] transition-colors">
                          {track.duration}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>
      </ScrollReveal>
    </div>
  );
};
