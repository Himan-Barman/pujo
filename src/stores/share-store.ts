import { create } from 'zustand';

export interface SharePayload {
  titleBn: string;
  titleEn?: string;
  descriptionBn: string;
  descriptionEn?: string;
  categoryBn?: string;
  categoryEn?: string;
  tagBn?: string;
  tagEn?: string;
  url?: string;
  image?: string;
  customQuoteBn?: string;
  customQuoteEn?: string;
}

interface ShareState {
  isOpen: boolean;
  payload: SharePayload | null;
  openShare: (payload: SharePayload) => void;
  closeShare: () => void;
}

export const useShareStore = create<ShareState>((set) => ({
  isOpen: false,
  payload: null,
  openShare: (payload: SharePayload) => set({ isOpen: true, payload }),
  closeShare: () => set({ isOpen: false }),
}));
