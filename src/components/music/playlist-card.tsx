'use client';

import React from 'react';
import { Playlist } from '@/types/music';
import { useAudioStore } from '@/stores/audio-store';
import { useUIStore } from '@/stores/ui-store';
import { Play, Pause, Radio, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlaylistCardProps {
  playlist: Playlist;
  className?: string;
}

export const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, className }) => {
  const language = useUIStore((state) => state.language);
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudioStore();

  const isPlaylistActive = playlist.tracks.some((t) => t.id === currentTrack?.id);

  const handlePlayFirst = () => {
    if (isPlaylistActive && isPlaying) {
      togglePlay();
    } else if (playlist.tracks.length > 0) {
      playTrack(playlist.tracks[0]);
    }
  };

  return (
    <div
      className={cn(
        'agomoni-card p-6 transition-all duration-300 hover:border-[#E7C878]/30 flex flex-col justify-between group active:scale-[0.98]',
        isPlaylistActive && 'border-[#A61B1B] bg-[#F3E3D0]',
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-[18px] bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/12 flex items-center justify-center text-xl text-[#E7C878] group-hover:scale-105 transition-transform shadow-xs">
            <Radio className="w-6 h-6 text-[#A61B1B]" />
          </div>

          <button
            onClick={handlePlayFirst}
            className="w-10 h-10 rounded-full bg-[#A61B1B] hover:bg-[#741313] text-[#FFFDF8] flex items-center justify-center shadow-xs active:scale-90 transition-all cursor-pointer"
            aria-label={isPlaylistActive && isPlaying ? 'Pause Playlist' : 'Play Playlist'}
          >
            {isPlaylistActive && isPlaying ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current ml-0.5" />
            )}
          </button>
        </div>

        <h3 className="text-lg font-bold text-[#E7C878] font-serif mb-1">
          {language === 'bn' ? playlist.titleBn : playlist.titleEn}
        </h3>

        <p className="text-xs text-[#FFF8EA]/70 line-clamp-2 mb-4 leading-relaxed">
          {language === 'bn' ? playlist.subtitleBn : playlist.subtitleEn}
        </p>
      </div>

      <div className="pt-3 border-t border-[#FFFDF8]/10 flex items-center justify-between text-[11px] text-[#FFF8EA]/50">
        <span className="flex items-center gap-1">
          <Music className="w-3.5 h-3.5 text-[#C99A3D]" />
          <span>
            {playlist.trackCount} {language === 'bn' ? 'টি গান' : 'tracks'}
          </span>
        </span>
        <span className="capitalize text-[#FFF8EA] font-bold px-2 py-0.5 rounded-full bg-[#FFFDF8]/8 backdrop-blur-md border border-[#FFFDF8]/12">
          {playlist.timeCategory}
        </span>
      </div>
    </div>
  );
};
