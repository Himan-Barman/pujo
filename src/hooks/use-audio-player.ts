'use client';

import { useEffect, useState } from 'react';
import { useAudioStore } from '@/stores/audio-store';

export function useAudioPlayer() {
  const audioStore = useAudioStore();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (audioStore.isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 100) {
            audioStore.pauseTrack();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [audioStore.isPlaying, audioStore]);

  return {
    ...audioStore,
    currentTime,
  };
}
