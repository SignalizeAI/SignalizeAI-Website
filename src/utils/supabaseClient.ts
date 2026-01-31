import { createClient } from "@supabase/supabase-js";

let supabaseInstance: any = null;

export const supabase = (() => {
  if (typeof window === "undefined") {
    // Server-side: return a dummy object
    return {
      auth: {
        getSession: async () => ({ data: { session: null } }),
        signInWithOAuth: async () => ({ data: null, error: null }),
      },
    };
  }

  // Client-side: create real instance
  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return supabaseInstance;
})();
