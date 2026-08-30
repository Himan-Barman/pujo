'use client';

import { useUIStore } from '@/stores/ui-store';
import { PUJA_DAYS } from '@/data/puja-days';
import { PujaDay, PujaDayId } from '@/types/puja';

export function usePujaDay(): {
  selectedDayId: PujaDayId;
  currentDay: PujaDay;
  setPujaDay: (day: PujaDayId) => void;
  allDays: PujaDay[];
} {
  const selectedDayId = useUIStore((state) => state.selectedPujaDay);
  const setPujaDay = useUIStore((state) => state.setSelectedPujaDay);

  const currentDay = PUJA_DAYS.find((d) => d.id === selectedDayId) || PUJA_DAYS[3]; // Default Ashtami

  return {
    selectedDayId,
    currentDay,
    setPujaDay,
    allDays: PUJA_DAYS,
  };
}
