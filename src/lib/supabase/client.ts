// Browser Supabase client placeholder
// In future production: import { createBrowserClient } from '@supabase/ssr'

export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Return mock client interface for graceful offline / local development
    return {
      isConfigured: false,
      from: (table: string) => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: (data: unknown) => Promise.resolve({ data, error: null }),
      }),
    };
  }

  // Placeholder for initialized Supabase client:
  return {
    isConfigured: true,
    supabaseUrl,
    from: (table: string) => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: (data: unknown) => Promise.resolve({ data, error: null }),
    }),
  };
}
