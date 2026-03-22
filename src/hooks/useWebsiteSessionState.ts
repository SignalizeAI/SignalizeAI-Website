"use client";

import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/utils/supabaseClient";

const AUTH_STATE_KEY = "signalizeai:website-auth-state";

function syncWebsiteSessionToExtension(session: {
  access_token: string;
  refresh_token: string;
} | null) {
  if (!session) return;
  window.postMessage(
    {
      type: "SIGNALIZE_AUTH_SUCCESS",
      session: {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      },
    },
    window.location.origin,
  );
}

export function useWebsiteSessionState() {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const supabase = getSupabaseClient();

    const resolveSessionState = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!mounted) return;
      if (!session) {
        setSignedIn(false);
        setLoading(false);
        return;
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (!mounted) return;
      if (error || !user) {
        await supabase.auth.signOut();
        if (!mounted) return;
        setSignedIn(false);
        setLoading(false);
        return;
      }

      setSignedIn(true);
      setLoading(false);
      syncWebsiteSessionToExtension({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
    };

    void resolveSessionState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setSignedIn(false);
        setLoading(false);
        return;
      }
      syncWebsiteSessionToExtension({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
      void resolveSessionState();
    });

    const handleMessage = async (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "SIGNALIZE_WEBSITE_AUTH_SUCCESS") {
        const expectedState = window.sessionStorage.getItem(AUTH_STATE_KEY);
        if (!expectedState || event.data?.state !== expectedState) return;
        window.sessionStorage.removeItem(AUTH_STATE_KEY);
        if (event.data?.session) {
          window.postMessage(
            {
              type: "SIGNALIZE_AUTH_SUCCESS",
              session: event.data.session,
            },
            window.location.origin,
          );
        }
        void resolveSessionState();
        return;
      }
      if (event.source !== window) return;
      if (event.data?.type === "SIGNALIZE_EXTENSION_SIGNED_OUT") {
        setSignedIn(false);
        await supabase.auth.signOut();
        return;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => {
      mounted = false;
      subscription.unsubscribe();
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return { signedIn, loading };
}
