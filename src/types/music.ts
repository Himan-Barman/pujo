export type TimeCategory =
  | 'all'
  | 'mahalaya'
  | 'shashthi'
  | 'saptami'
  | 'ashtami'
  | 'sandhi'
  | 'navami'
  | 'dashami'
  | 'dhak'
  | 'morning'
  | 'evening'
  | 'night';

export interface Track {
  id: string;
  titleBn: string;
  titleEn: string;
  artistBn: string;
  artistEn: string;
  duration: string;
  category: TimeCategory;
  dayId?: 'mahalaya' | 'shashthi' | 'saptami' | 'ashtami' | 'sandhi' | 'navami' | 'dashami' | 'dhak';
  moodBn: string;
  moodEn: string;
  audioUrl: string;
  coverImage?: string;
  descriptionBn: string;
  descriptionEn: string;
  lyricsBn?: string;
  lyricsEn?: string;
  synthPreset?:
    | 'shankha'
    | 'dhak-fast'
    | 'dhak-dhaak'
    | 'temple-flute'
    | 'mantra-drone'
    | 'evening-aarti'
    | 'shiuli-morning';
}

export interface Playlist {
  id: string;
  slug: string;
  titleBn: string;
  titleEn: string;
  subtitleBn: string;
  subtitleEn: string;
  timeCategory: TimeCategory;
  coverImage: string;
  trackCount: number;
  tracks: Track[];
}
