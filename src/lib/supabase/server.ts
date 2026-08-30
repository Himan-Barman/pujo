// Server-side Supabase client placeholder
// External API keys & service roles stay strictly on the server

export async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return {
      isConfigured: false,
      from: (table: string) => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: (data: unknown) => Promise.resolve({ data, error: null }),
      }),
    };
  }

  return {
    isConfigured: true,
    from: (table: string) => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: (data: unknown) => Promise.resolve({ data, error: null }),
    }),
  };
}
