import { create } from 'zustand';
import { Track } from '@/types/music';
import { TRACKS_DATA } from '@/data/playlists';
import { audioSynth } from '@/lib/audio-synth';

export function parseDurationToSeconds(durationStr: string): number {
  if (!durationStr) return 240;
  const bnToEnMap: Record<string, string> = {
    '০': '0',
    '১': '1',
    '২': '2',
    '৩': '3',
    '৪': '4',
    '৫': '5',
    '৬': '6',
    '৭': '7',
    '৮': '8',
    '৯': '9',
  };
  const normalized = durationStr.replace(/[০-৯]/g, (d) => bnToEnMap[d] || d);
  const parts = normalized.split(':').map((p) => parseInt(p.trim(), 10));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return parts[0] * 60 + parts[1];
  }
  return 240;
}

export function formatTimeDisplay(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60);
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

interface AudioState {
  currentTrack: Track | null;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  playlist: Track[];
  isLooping: boolean;
  isShuffle: boolean;

  // Actions
  playTrack: (track: Track, customPlaylist?: Track[]) => void;
  togglePlay: () => void;
  pauseTrack: () => void;
  setVolume: (vol: number) => void;
  seekTo: (seconds: number) => void;
  setCurrentTime: (seconds: number) => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  stopAudio: () => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
  currentTrack: null,
  isPlaying: false,
  volume: 0.8,
  currentTime: 0,
  duration: 240,
  playlist: TRACKS_DATA,
  isLooping: false,
  isShuffle: false,

  playTrack: (track: Track, customPlaylist?: Track[]) => {
    const { isPlaying, currentTrack, playlist } = get();

    // If same track is playing, just toggle
    if (currentTrack?.id === track.id && isPlaying) {
      get().pauseTrack();
      return;
    }

    // Stop any existing sound
    audioSynth.stopAll();

    const trackDuration = parseDurationToSeconds(track.duration);
    const activeList = customPlaylist || (playlist.length > 0 ? playlist : TRACKS_DATA);

    set({
      currentTrack: track,
      playlist: activeList,
      isPlaying: true,
      currentTime: 0,
      duration: trackDuration,
    });

    // Start procedural sound synthesis
    audioSynth.playPreset(track.synthPreset);
  },

  togglePlay: () => {
    const { isPlaying, currentTrack } = get();
    if (!currentTrack) return;

    if (isPlaying) {
      audioSynth.stopAll();
      set({ isPlaying: false });
    } else {
      set({ isPlaying: true });
      audioSynth.playPreset(currentTrack.synthPreset);
    }
  },

  pauseTrack: () => {
    audioSynth.stopAll();
    set({ isPlaying: false });
  },

  setVolume: (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    audioSynth.setMasterVolume(clamped);
    set({ volume: clamped });
  },

  seekTo: (seconds: number) => {
    const { duration } = get();
    const clamped = Math.max(0, Math.min(duration, seconds));
    set({ currentTime: clamped });
  },

  setCurrentTime: (seconds: number) => {
    set({ currentTime: seconds });
  },

  playNextTrack: () => {
    const { playlist, currentTrack, isShuffle, isLooping } = get();
    if (playlist.length === 0) return;

    if (isLooping && currentTrack) {
      get().playTrack(currentTrack);
      return;
    }

    if (isShuffle) {
      const randomIdx = Math.floor(Math.random() * playlist.length);
      get().playTrack(playlist[randomIdx]);
      return;
    }

    const currentIdx = playlist.findIndex((t) => t.id === currentTrack?.id);
    const nextIdx = (currentIdx + 1) % playlist.length;
    get().playTrack(playlist[nextIdx]);
  },

  playPrevTrack: () => {
    const { playlist, currentTrack, currentTime } = get();
    if (playlist.length === 0) return;

    // If more than 3 seconds in, restart track
    if (currentTime > 3 && currentTrack) {
      get().seekTo(0);
      return;
    }

    const currentIdx = playlist.findIndex((t) => t.id === currentTrack?.id);
    const prevIdx = (currentIdx - 1 + playlist.length) % playlist.length;
    get().playTrack(playlist[prevIdx]);
  },

  toggleLoop: () => {
    set((state) => ({ isLooping: !state.isLooping }));
  },

  toggleShuffle: () => {
    set((state) => ({ isShuffle: !state.isShuffle }));
  },

  stopAudio: () => {
    audioSynth.stopAll();
    set({ currentTrack: null, isPlaying: false, currentTime: 0 });
  },
}));
