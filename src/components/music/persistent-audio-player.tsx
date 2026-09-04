'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useAudioStore, formatTimeDisplay } from '@/stores/audio-store';
import { useUIStore } from '@/stores/ui-store';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  X,
  Radio,
  Bell,
  Wind,
} from 'lucide-react';
import { audioSynth } from '@/lib/audio-synth';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export const PersistentAudioPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    volume,
    currentTime,
    duration,
    isLooping,
    isShuffle,
    togglePlay,
    setVolume,
    seekTo,
    setCurrentTime,
    playNextTrack,
    playPrevTrack,
    toggleLoop,
    toggleShuffle,
    stopAudio,
  } = useAudioStore();

  const language = useUIStore((state) => state.language);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [hoverPosition, setHoverPosition] = useState<number | null>(null);

  // Real-time playback timer tick
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        if (!isScrubbing) {
          const nextTime = currentTime + 1;
          if (nextTime >= duration) {
            playNextTrack();
          } else {
            setCurrentTime(nextTime);
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isScrubbing, currentTime, duration, playNextTrack, setCurrentTime]);

  // Click & Drag to Seek + Play
  const handleSeekFromEvent = useCallback(
    (clientX: number) => {
      if (!progressBarRef.current || duration <= 0) return;
      const rect = progressBarRef.current.getBoundingClientRect();
      const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const targetTime = Math.round(ratio * duration);
      seekTo(targetTime);
      if (!isPlaying) {
        togglePlay();
      }
    },
    [duration, seekTo, isPlaying, togglePlay]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsScrubbing(true);
    handleSeekFromEvent(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handleSeekFromEvent(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsScrubbing(false);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleMouseMoveHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverPosition(ratio * 100);
  };

  const handleMouseLeaveHover = () => {
    setHoverPosition(null);
  };

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 80, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Agomoni Interactive Audio Player"
        className="fixed bottom-[56px] sm:bottom-[58px] lg:bottom-0 left-0 right-0 z-30 bg-[#1A1210]/98 backdrop-blur-3xl border-t border-[#E7C878]/30 text-[#FFF8EA] shadow-[0_-12px_45px_rgba(0,0,0,0.6)] select-none"
      >
        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* INTERACTIVE SEEK / SCRUBBER BAR (Click Anywhere to Play There)  */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div
          ref={progressBarRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMoveHover}
          onMouseLeave={handleMouseLeaveHover}
          className="w-full h-3 -mt-1 relative cursor-pointer group flex items-center"
          title={language === 'bn' ? 'ক্লিক করে যেকোনো মুহূর্তে শুনুন' : 'Click to seek playback'}
        >
          {/* Background Track */}
          <div className="w-full h-1 group-hover:h-2 bg-[#2E201B] transition-all duration-200 relative overflow-hidden">
            {/* Hover preview indicator */}
            {hoverPosition !== null && (
              <div
                className="absolute top-0 bottom-0 left-0 bg-[#FFFDF8]/20 transition-all pointer-events-none"
                style={{ width: `${hoverPosition}%` }}
              />
            )}

            {/* Active Played Progress */}
            <div
              className="h-full bg-gradient-to-r from-[#A61B1B] via-[#E7C878] to-[#C99A3D] transition-all duration-150"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Glowing Scrubber Thumb handle */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#FFFDF8] border-2 border-[#A61B1B] shadow-[0_0_10px_rgba(231,200,120,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
            style={{ left: `${progressPercent}%` }}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════ */}
        {/* MAIN CONTROL BAR CONTENT                                       */}
        {/* ═══════════════════════════════════════════════════════════════ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">

          {/* 1. Track Info & Live Equalizer */}
          <div className="flex items-center gap-3 min-w-0 flex-1 sm:max-w-xs md:max-w-sm">
            <div className="w-11 h-11 rounded-[16px] bg-[#2E201B] border border-[#E7C878]/30 flex items-center justify-center flex-shrink-0 relative overflow-hidden shadow-xs">
              <Radio className={cn('w-5 h-5 text-[#E7C878]', isPlaying && 'animate-pulse')} />
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-[#E7C878] truncate font-serif leading-snug">
                {language === 'bn' ? currentTrack.titleBn : currentTrack.titleEn}
              </h4>
              <div className="flex items-center gap-2 text-xs text-[#FFF8EA]/65 truncate mt-0.5">
                <span className="truncate">{language === 'bn' ? currentTrack.artistBn : currentTrack.artistEn}</span>
                <span className="text-[#E7C878] hidden sm:inline">•</span>
                <span className="font-mono text-[#E7C878] text-[11px] font-bold hidden sm:inline">
                  {formatTimeDisplay(currentTime)} / {formatTimeDisplay(duration)}
                </span>
              </div>
            </div>
          </div>

          {/* 2. Central Smart Playback Controls */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 sm:gap-3.5">
              {/* Shuffle Button */}
              <button
                type="button"
                onClick={toggleShuffle}
                className={cn(
                  'p-2 rounded-full transition-all cursor-pointer hidden md:flex items-center justify-center active:scale-90',
                  isShuffle
                    ? 'text-[#E7C878] bg-[#FFFDF8]/15 shadow-xs'
                    : 'text-[#FFF8EA]/50 hover:text-[#FFF8EA]'
                )}
                title="Shuffle Playlist"
              >
                <Shuffle className="w-4 h-4" />
              </button>

              {/* Previous Song */}
              <button
                type="button"
                onClick={playPrevTrack}
                className="p-2 rounded-full text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/10 transition-all cursor-pointer active:scale-90"
                title={language === 'bn' ? 'পূর্ববর্তী গান' : 'Previous track'}
                aria-label="Previous Track"
              >
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              {/* Play / Pause Master Button */}
              <button
                type="button"
                onClick={togglePlay}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#A61B1B] to-[#741313] hover:from-[#B82222] hover:to-[#861717] text-[#FFFDF8] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border border-[#E7C878]/40"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-current" />
                ) : (
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                )}
              </button>

              {/* Next Song */}
              <button
                type="button"
                onClick={playNextTrack}
                className="p-2 rounded-full text-[#FFF8EA]/80 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/10 transition-all cursor-pointer active:scale-90"
                title={language === 'bn' ? 'পরবর্তী গান' : 'Next track'}
                aria-label="Next Track"
              >
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              {/* Repeat / Loop Button */}
              <button
                type="button"
                onClick={toggleLoop}
                className={cn(
                  'p-2 rounded-full transition-all cursor-pointer hidden md:flex items-center justify-center active:scale-90',
                  isLooping
                    ? 'text-[#E7C878] bg-[#FFFDF8]/15 shadow-xs'
                    : 'text-[#FFF8EA]/50 hover:text-[#FFF8EA]'
                )}
                title="Loop Current Track"
              >
                <Repeat className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Time indicator below buttons */}
            <div className="flex sm:hidden text-[10px] font-mono text-[#E7C878] font-bold">
              {formatTimeDisplay(currentTime)} / {formatTimeDisplay(duration)}
            </div>
          </div>

          {/* 3. Atmospheric Shortcuts & Volume Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Quick Temple Bell Trigger */}
            <button
              type="button"
              onClick={() => audioSynth.playTempleBell()}
              title={language === 'bn' ? 'মন্দির ঘণ্টা বাজান' : 'Play Temple Bell'}
              className="hidden lg:flex px-3 py-1.5 rounded-full bg-[#FFFDF8]/8 hover:bg-[#FFFDF8]/15 border border-[#FFFDF8]/12 text-[#E7C878] text-xs items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Bell className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{language === 'bn' ? 'ঘণ্টা' : 'Bell'}</span>
            </button>

            {/* Quick Shankha Trigger */}
            <button
              type="button"
              onClick={() => audioSynth.playShankha(3.5)}
              title={language === 'bn' ? 'শঙ্খধ্বনি বাজান' : 'Play Shankha'}
              className="hidden lg:flex px-3 py-1.5 rounded-full bg-[#FFFDF8]/8 hover:bg-[#FFFDF8]/15 border border-[#FFFDF8]/12 text-[#E7C878] text-xs items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Wind className="w-3.5 h-3.5" />
              <span className="text-[11px] font-semibold">{language === 'bn' ? 'শঙ্খ' : 'Shankha'}</span>
            </button>

            {/* Volume Control Bar */}
            <div className="hidden sm:flex items-center gap-2 pl-2">
              <button
                type="button"
                onClick={() => setVolume(volume > 0 ? 0 : 0.8)}
                className="text-[#FFF8EA]/70 hover:text-[#E7C878] cursor-pointer transition-colors p-1"
                aria-label={volume === 0 ? 'Unmute' : 'Mute'}
              >
                {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-18 sm:w-20 accent-[#E7C878] h-1.5 bg-[#FFFDF8]/15 rounded-lg cursor-pointer transition-all"
                title={`Volume: ${Math.round(volume * 100)}%`}
              />
            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={stopAudio}
              className="p-2 rounded-full bg-[#FFFDF8]/8 text-[#FFF8EA]/70 hover:text-[#FFF8EA] hover:bg-[#FFFDF8]/15 transition-colors cursor-pointer border border-[#FFFDF8]/10 active:scale-90"
              aria-label="Close audio player"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.aside>
    </AnimatePresence>
  );
};
