"use client";

import { useEffect, useState } from "react";

const AUTH_STATE_KEY = "signalizeai:website-auth-state";

type WebsiteUserProfile = {
  name: string;
  avatarUrl: string | null;
};

function notifyExtensionAuthStateChanged() {
  window.postMessage({ type: "SIGNALIZE_WEBSITE_AUTH_STATE_CHANGED" }, window.location.origin);
}

function requestExtensionSessionSync() {
  window.postMessage({ type: "SIGNALIZE_REQUEST_EXTENSION_SESSION_SYNC" }, window.location.origin);
}

export function useWebsiteSessionState(enabled = true) {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(enabled);
  const [profile, setProfile] = useState<WebsiteUserProfile | null>(null);

  const setSignedOutState = () => {
    setSignedIn(false);
    setProfile(null);
    setLoading(false);
  };

  useEffect(() => {
    if (!enabled) {
      setSignedOutState();
      return;
    }

    let mounted = true;
    let unsubscribe = () => {};
    let removeWindowHandlers = () => {};

    void (async () => {
      try {
        const { getSupabaseClient } = await import("@/utils/supabaseClient");
        if (!mounted) return;

        const supabase = getSupabaseClient();
        const buildProfile = (user: {
          email?: string | null;
          user_metadata?: Record<string, unknown>;
        }): WebsiteUserProfile => ({
          name:
            String(
              user.user_metadata?.full_name ||
                user.user_metadata?.name ||
                user.email ||
                "Account",
            ) || "Account",
          avatarUrl:
            typeof user.user_metadata?.avatar_url === "string"
              ? user.user_metadata.avatar_url
              : typeof user.user_metadata?.picture === "string"
                ? user.user_metadata.picture
                : null,
        });

        const resolveSessionState = async () => {
          const {
            data: { session },
          } = await supabase.auth.getSession();

          if (!mounted) return;
          if (!session) {
            setSignedOutState();
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
            setSignedOutState();
            return;
          }

          setSignedIn(true);
          setProfile(buildProfile(user));
          setLoading(false);
          notifyExtensionAuthStateChanged();
        };

        const handleMessage = async (event: MessageEvent) => {
          if (event.origin !== window.location.origin) return;
          if (event.data?.type === "SIGNALIZE_EXTENSION_SESSION_SYNC") {
            const session = event.data?.session;
            if (!session?.access_token || !session?.refresh_token) return;
            try {
              await supabase.auth.setSession({
                access_token: session.access_token,
                refresh_token: session.refresh_token,
              });
              void resolveSessionState();
            } catch (error) {
              console.error("Failed to apply extension session on website", error);
            }
            return;
          }
          if (event.data?.type === "SIGNALIZE_WEBSITE_AUTH_SUCCESS") {
            const expectedState = window.sessionStorage.getItem(AUTH_STATE_KEY);
            if (!expectedState || event.data?.state !== expectedState) return;
            window.sessionStorage.removeItem(AUTH_STATE_KEY);
            void resolveSessionState();
            return;
          }
          if (event.source !== window) return;
          if (event.data?.type === "SIGNALIZE_EXTENSION_SIGNED_OUT") {
            setSignedOutState();
            await supabase.auth.signOut();
          }
        };

        const handleFocus = () => {
          requestExtensionSessionSync();
          void resolveSessionState();
        };

        window.addEventListener("message", handleMessage);
        window.addEventListener("focus", handleFocus);
        document.addEventListener("visibilitychange", handleFocus);

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          if (!session) {
            setSignedOutState();
            return;
          }
          void resolveSessionState();
        });

        unsubscribe = () => subscription.unsubscribe();
        removeWindowHandlers = () => {
          window.removeEventListener("message", handleMessage);
          window.removeEventListener("focus", handleFocus);
          document.removeEventListener("visibilitychange", handleFocus);
        };

        void resolveSessionState();
        requestExtensionSessionSync();
      } catch (error) {
        console.error("Failed to initialize website session state", error);
        if (!mounted) return;
        setSignedOutState();
      }
    })();

    return () => {
      mounted = false;
      unsubscribe();
      removeWindowHandlers();
    };
  }, [enabled]);

  return { signedIn, loading, profile };
}
