import { create } from 'zustand';
import { PujaDayId, PanjikaType } from '@/types/puja';

export type Language = 'bn' | 'en';

interface UIState {
  language: Language;
  selectedPujaDay: PujaDayId;
  selectedPanjika: PanjikaType;
  isPujaMode: boolean;
  isMobileMenuOpen: boolean;
  isAnjaliModalOpen: boolean;
  activeDhakPlaying: boolean;

  // Actions
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  setSelectedPujaDay: (day: PujaDayId) => void;
  setSelectedPanjika: (panjika: PanjikaType) => void;
  togglePujaMode: () => void;
  setPujaMode: (enabled: boolean) => void;
  setMobileMenuOpen: (open: boolean) => void;
  setAnjaliModalOpen: (open: boolean) => void;
  setActiveDhakPlaying: (playing: boolean) => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  language: 'bn',
  selectedPujaDay: 'ashtami',
  selectedPanjika: 'benimadhab', // Benimadhab Shil is the default
  isPujaMode: false,
  isMobileMenuOpen: false,
  isAnjaliModalOpen: false,
  activeDhakPlaying: false,

  setLanguage: (language: Language) => set({ language }),

  toggleLanguage: () => {
    const current = get().language;
    set({ language: current === 'bn' ? 'en' : 'bn' });
  },

  setSelectedPujaDay: (selectedPujaDay: PujaDayId) => set({ selectedPujaDay }),

  setSelectedPanjika: (selectedPanjika: PanjikaType) => set({ selectedPanjika }),

  togglePujaMode: () => {
    const current = get().isPujaMode;
    set({ isPujaMode: !current });
  },

  setPujaMode: (enabled: boolean) => set({ isPujaMode: enabled }),

  setMobileMenuOpen: (isMobileMenuOpen: boolean) => set({ isMobileMenuOpen }),

  setAnjaliModalOpen: (isAnjaliModalOpen: boolean) => set({ isAnjaliModalOpen }),

  setActiveDhakPlaying: (activeDhakPlaying: boolean) => set({ activeDhakPlaying }),
}));
