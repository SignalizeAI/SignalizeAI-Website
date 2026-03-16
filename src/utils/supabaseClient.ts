import { AuthClient } from "@supabase/auth-js";

let authClientInstance: InstanceType<typeof AuthClient> | null = null;

const getSupabaseConfig = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return null;
  }

  const baseUrl = new URL(url);
  return {
    authUrl: new URL("auth/v1", baseUrl).href,
    headers: {
      Authorization: `Bearer ${key}`,
      apikey: key,
    },
    storageKey: `sb-${baseUrl.hostname.split(".")[0]}-auth-token`,
  };
};

function getSupabaseClient() {
  if (typeof window === "undefined") {
    return null;
  }

  if (!authClientInstance) {
    const config = getSupabaseConfig();

    if (config) {
      authClientInstance = new AuthClient({
        url: config.authUrl,
        headers: config.headers,
        storageKey: config.storageKey,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
      });
    }
  }

  return authClientInstance;
}

export const supabase = {
  get auth() {
    return getSupabaseClient() || {
      getSession: async () => ({ data: { session: null } }),
      signInWithOAuth: async () => ({ data: null, error: null }),
    };
  },
};
