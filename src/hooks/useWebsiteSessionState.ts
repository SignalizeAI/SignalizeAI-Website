"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabaseClient";

const AUTH_STATE_KEY = "signalizeai:website-auth-state";

export function useWebsiteSessionState() {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

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
      void resolveSessionState();
    });

    const handleMessage = async (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === "SIGNALIZE_EXTENSION_SIGNED_OUT") {
        setSignedIn(false);
        await supabase.auth.signOut();
        return;
      }
      if (event.data?.type === "SIGNALIZE_WEBSITE_AUTH_SUCCESS") {
        const expectedState = window.sessionStorage.getItem(AUTH_STATE_KEY);
        if (!expectedState || event.data?.state !== expectedState) return;
        window.sessionStorage.removeItem(AUTH_STATE_KEY);
        void resolveSessionState();
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
