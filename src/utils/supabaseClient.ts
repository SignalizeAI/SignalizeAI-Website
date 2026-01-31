import { createClient } from "@supabase/supabase-js";

let supabaseInstance: any = null;

function getSupabaseClient() {
  if (typeof window === "undefined") {
    // Server-side
    return null;
  }

  if (!supabaseInstance) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (url && key) {
      supabaseInstance = createClient(url, key);
    }
  }

  return supabaseInstance;
}

// Export as getter to ensure lazy initialization
export const supabase = {
  get auth() {
    return getSupabaseClient()?.auth || {
      getSession: async () => ({ data: { session: null } }),
      signInWithOAuth: async () => ({ data: null, error: null }),
    };
  },
};
