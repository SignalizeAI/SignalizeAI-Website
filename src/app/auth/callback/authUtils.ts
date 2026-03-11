import { createClient } from "@supabase/supabase-js";

const createSupabaseClient = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

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
