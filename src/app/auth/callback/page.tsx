"use client";

import { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function AuthCallbackPage() {
  useEffect(() => {
    async function handleAuth() {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);

      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");

      if (!access_token) {
        console.error("No access token found");
        return;
      }

      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      // If opened from extension, close tab
      window.close();

      // Fallback redirect (in case close is blocked)
      window.location.href = "/";
    }

    handleAuth();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h2>Signing you in…</h2>
      <p>You can close this tab.</p>
    </div>
  );
}
