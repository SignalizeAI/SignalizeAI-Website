import { AuthClient } from "@supabase/auth-js";

const createSupabaseClient = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const baseUrl = new URL(url);

  return {
    auth: new AuthClient({
      url: new URL("auth/v1", baseUrl).href,
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
      },
      storageKey: `sb-${baseUrl.hostname.split(".")[0]}-auth-token`,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    }),
  };
};

export const completeAuthCallback = async () => {
  const supabase = createSupabaseClient();
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");
  const code = searchParams.get("code");
  const errorStr = searchParams.get("error") || hashParams.get("error");

  if (errorStr) {
    throw new Error(searchParams.get("error_description") || hashParams.get("error_description") || errorStr);
  }

  if (accessToken && refreshToken) {
    const { error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (error) throw error;
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
  }

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    throw error || new Error("Failed to fetch session after auth");
  }

  window.postMessage(
    {
      type: "SIGNALIZE_AUTH_SUCCESS",
      session: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      },
    },
    "*",
  );
};
