import { supabase } from "@/utils/supabaseClient";

export const completeAuthCallback = async () => {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const searchParams = new URLSearchParams(window.location.search);
  const accessToken = hashParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token");
  const code = searchParams.get("code");
  const authState = searchParams.get("auth_state") || hashParams.get("auth_state");
  const errorStr = searchParams.get("error") || hashParams.get("error");

  if (errorStr) {
    throw new Error(searchParams.get("error_description") || hashParams.get("error_description") || errorStr);
  }

  let resolvedSession: {
    access_token: string;
    refresh_token: string;
  } | null = null;

  if (accessToken && refreshToken) {
    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken,
      refresh_token: refreshToken,
    });
    if (error) throw error;
    resolvedSession = data.session
      ? {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        }
      : null;
  } else if (code) {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) throw error;
    resolvedSession = data.session
      ? {
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        }
      : null;
  }

  if (!resolvedSession) {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error || !session) {
      throw error || new Error("Failed to fetch session after auth");
    }

    resolvedSession = {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
    };
  }

  const redirectTarget =
    searchParams.get("next") ||
    hashParams.get("next") ||
    searchParams.get("redirect") ||
    "/";

  window.postMessage(
    {
      type: "SIGNALIZE_AUTH_SUCCESS",
      session: resolvedSession,
    },
    window.location.origin,
  );

  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(
      {
        type: "SIGNALIZE_WEBSITE_AUTH_SUCCESS",
        state: authState,
      },
      window.location.origin,
    );
  }

  return redirectTarget.startsWith("/") ? redirectTarget : "/";
};
