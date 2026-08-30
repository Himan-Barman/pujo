// Supabase Database Types Definition for future PostgreSQL & pgvector schema

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          avatar_url?: string | null;
          created_at?: string;
        };
      };
      anjali_offerings: {
        Row: {
          id: string;
          devotee_name: string;
          gotra: string | null;
          location: string | null;
          flower_type: string;
          prarthana: string | null;
          puja_day: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          devotee_name: string;
          gotra?: string | null;
          location?: string | null;
          flower_type: string;
          prarthana?: string | null;
          puja_day: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          devotee_name?: string;
          gotra?: string | null;
          location?: string | null;
          flower_type?: string;
          prarthana?: string | null;
          puja_day?: string;
          created_at?: string;
        };
      };
      rituals: {
        Row: {
          id: string;
          day_id: string;
          title_bn: string;
          title_en: string;
          time_bn: string;
          time_en: string;
          tithi_bn: string;
          tithi_en: string;
          description_bn: string;
          description_en: string;
          created_at: string;
        };
        Insert: {
          id: string;
          day_id: string;
          title_bn: string;
          title_en: string;
          time_bn: string;
          time_en: string;
          tithi_bn: string;
          tithi_en: string;
          description_bn: string;
          description_en: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          day_id?: string;
          title_bn?: string;
          title_en?: string;
          time_bn?: string;
          time_en?: string;
          tithi_bn?: string;
          tithi_en?: string;
          description_bn?: string;
          description_en?: string;
          created_at?: string;
        };
      };
      songs: {
        Row: {
          id: string;
          title_bn: string;
          title_en: string;
          artist_bn: string;
          artist_en: string;
          category: string;
          audio_url: string;
          duration: string;
          created_at: string;
        };
        Insert: {
          id: string;
          title_bn: string;
          title_en: string;
          artist_bn: string;
          artist_en: string;
          category: string;
          audio_url: string;
          duration: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          title_bn?: string;
          title_en?: string;
          artist_bn?: string;
          artist_en?: string;
          category?: string;
          audio_url?: string;
          duration?: string;
          created_at?: string;
        };
      };
      favourites: {
        Row: {
          id: string;
          user_id: string;
          item_type: 'mantra' | 'song' | 'ritual' | 'bhog';
          item_id: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          item_type: 'mantra' | 'song' | 'ritual' | 'bhog';
          item_id: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          item_type?: 'mantra' | 'song' | 'ritual' | 'bhog';
          item_id?: string;
          created_at?: string;
        };
      };
      interaction_events: {
        Row: {
          id: string;
          event_type: string;
          metadata: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          event_type: string;
          metadata?: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          event_type?: string;
          metadata?: Json;
          created_at?: string;
        };
      };
    };
  };
}
