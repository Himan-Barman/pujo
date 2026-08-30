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

  return (
    <div className="w-full">
      <ScrollReveal delay={0.05} distance={35}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* LEFT SIDEBAR: Days & Phases of Durga Puja (Icons only)          */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-3">
            <div className="px-3 py-1 flex items-center justify-between text-xs font-bold text-[#E7C878] uppercase tracking-wider">
              <span>{language === 'bn' ? 'পূজার দিন ও তিথি' : 'Festival Days'}</span>
              <span className="text-[10px] text-[#FFF8EA]/50 font-normal">
                {language === 'bn' ? 'দিন বাছাই করুন' : 'Select Day'}
              </span>
            </div>

            {/* Vertical Day Navigation (Horizontal scroll on mobile) with generous padding */}
            <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible no-scrollbar p-3 sm:p-3.5 rounded-[30px] bg-[#1A1210]/60 backdrop-blur-xl border border-[#FFFDF8]/10 shadow-lg">
              {DAY_TABS.map((tab) => {
                const isActive = selectedDay === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setSelectedDay(tab.id)}
                    className={cn(
                      'w-full text-left p-3 sm:p-3.5 rounded-[20px] transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.98] flex-shrink-0 lg:flex-shrink',
                      isActive
                        ? 'bg-[#A61B1B] text-[#FFFDF8] shadow-md border border-[#E7C878]/30'
                        : 'hover:bg-[#FFFDF8]/8 text-[#FFF8EA]/80 hover:text-[#FFF8EA]'
                    )}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-[12px] flex items-center justify-center flex-shrink-0 border',
                          isActive
                            ? 'bg-[#FFFDF8]/20 border-[#FFFDF8]/30 text-[#FFF8EA]'
                            : 'bg-[#FFFDF8]/8 border-[#FFFDF8]/10 text-[#E7C878]'
                        )}
                      >
                        {renderDayIcon(tab.iconType, 'w-4 h-4')}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold font-serif leading-tight truncate">
                          {language === 'bn' ? tab.titleBn : tab.titleEn}
                        </h4>
                        <p
                          className={cn(
                            'text-[10px] truncate mt-0.5',
                            isActive ? 'text-[#FFFDF8]/80' : 'text-[#FFF8EA]/50'
                          )}
                        >
                          {language === 'bn' ? tab.subtitleBn : tab.subtitleEn}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
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
                          'w-4 h-4 transition-transform hidden lg:block',
                          isActive ? 'text-[#FFF8EA] translate-x-0.5' : 'text-[#FFF8EA]/30'
                        )}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════ */}
          {/* RIGHT CONTENT: Selected Day Songs & Audio Controls              */}
          {/* ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 space-y-4">

            {/* Day Header Glass Card */}
            <div className="agomoni-card p-5 sm:p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-[18px] bg-gradient-to-br from-[#A61B1B] to-[#C99A3D] p-0.5 shadow-md flex items-center justify-center flex-shrink-0">
                  <div className="w-full h-full rounded-[16px] bg-[#1A1210]/80 backdrop-blur-md flex items-center justify-center text-[#E7C878]">
                    {renderDayIcon(activeTab.iconType, 'w-6 h-6')}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#FFF8EA]">
                    {language === 'bn' ? activeTab.titleBn : activeTab.titleEn}
                  </h3>
                  <p className="text-xs text-[#E7C878] mt-0.5">
                    {language === 'bn' ? activeTab.subtitleBn : activeTab.subtitleEn}
                  </p>
                </div>
              </div>

              {/* Action Buttons: Play All + Shankha / Bell sound triggers */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePlayFirstInList}
                  className="apple-btn-primary px-5 py-2.5 text-xs flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  <span>{language === 'bn' ? 'সব গান চালান' : 'Play Day'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => audioSynth.playShankha(3.5)}
                  className="px-3.5 py-2 rounded-full bg-[#1A1210]/70 hover:bg-[#2A2420] border border-[#FFFDF8]/12 text-[#E7C878] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-xs"
                  title="Shankha"
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-sans">{language === 'bn' ? 'শঙ্খ' : 'Shankha'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => audioSynth.playTempleBell()}
                  className="px-3.5 py-2 rounded-full bg-[#1A1210]/70 hover:bg-[#2A2420] border border-[#FFFDF8]/12 text-[#E7C878] text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer active:scale-95 shadow-xs"
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
                        'p-3.5 sm:p-4 rounded-[22px] flex items-center justify-between gap-4 transition-all duration-200 border cursor-pointer group select-none active:scale-[0.99]',
                        isCurrent
                          ? 'bg-[#FFFDF8]/[0.12] backdrop-blur-md border-[#E7C878]/45 shadow-sm'
                          : 'bg-[#1A1210]/45 hover:bg-[#FFFDF8]/[0.08] border-[#FFFDF8]/6 hover:border-[#FFFDF8]/15'
                      )}
                    >
                      {/* Left: Play button and Track Info */}
                      <div className="flex items-center gap-3.5 min-w-0">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            playTrack(track, filteredTracks);
                          }}
                          className={cn(
                            'w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all cursor-pointer shadow-xs active:scale-90',
                            isCurrent && isPlaying
                              ? 'bg-[#A61B1B] text-[#FFFDF8] scale-105 shadow-md'
                              : 'bg-[#FFFDF8]/10 backdrop-blur-md text-[#E7C878] border border-[#FFFDF8]/15 group-hover:bg-[#A61B1B] group-hover:text-[#FFFDF8]'
                          )}
                          aria-label={isCurrent && isPlaying ? 'Pause' : 'Play'}
                        >
                          {isCurrent && isPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          )}
                        </button>

                        <div className="min-w-0">
                          <h4
                            className={cn(
                              'text-sm sm:text-base font-bold truncate font-serif',
                              isCurrent ? 'text-[#E7C878]' : 'text-[#FFF8EA]'
                            )}
                          >
                            {language === 'bn' ? track.titleBn : track.titleEn}
                          </h4>
                          <p className="text-xs text-[#FFF8EA]/75 truncate mt-0.5 font-medium">
                            {language === 'bn' ? track.artistBn : track.artistEn}
                          </p>
                          <p className="text-[11px] text-[#FFF8EA]/50 truncate mt-0.5">
                            {language === 'bn' ? track.descriptionBn : track.descriptionEn}
                          </p>
                        </div>
                      </div>

                      {/* Right: Mood Tag and Duration */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full bg-[#1A1210]/60 border border-[#E7C878]/25 text-[10px] text-[#E7C878] font-semibold">
                          {language === 'bn' ? track.moodBn : track.moodEn}
                        </span>
                        <span className="text-xs font-mono text-[#FFF8EA]/70 font-bold">
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
