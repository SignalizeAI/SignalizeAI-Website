"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabaseClient";

type AuthEntryClientProps = {
  mode: "signin" | "signup";
  isPopup?: boolean;
};

export default function AuthEntryClient({ mode, isPopup = false }: AuthEntryClientProps) {
  const [loading, setLoading] = useState(false);
  const isSignIn = mode === "signin";

  const handleGoogleAuth = async () => {
    try {
      setLoading(true);
      const redirectParams = new URLSearchParams();
      if (isPopup) redirectParams.set("popup", "1");
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${redirectParams.toString() ? `?${redirectParams.toString()}` : ""}`,
        },
      });
    } catch (error) {
      console.error("Auth error:", error);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.14),_transparent_42%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_100%)] px-4 py-18 dark:bg-[radial-gradient(circle_at_top,_rgba(0,229,255,0.12),_transparent_35%),linear-gradient(180deg,#050505_0%,#0b1020_100%)] sm:px-6 sm:py-24">
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-200/80 bg-white/88 p-8 shadow-[0_28px_80px_-44px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-[#0f172acc] dark:shadow-[0_24px_70px_-40px_rgba(0,0,0,0.82)]">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-accent">
          {isSignIn ? "Welcome back" : "Create account"}
        </div>
        <h1 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">
          {isSignIn ? "Sign in to SignalizeAI" : "Start with SignalizeAI"}
        </h1>
        <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/70">
          {isPopup
            ? "Continue with Google to unlock your website session. This window will close automatically after sign in."
            : "Use Google to access saved prospects, dashboard views, pricing, and future workflow tools."}
        </p>

        <button
          type="button"
          onClick={handleGoogleAuth}
          disabled={loading}
          className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
        >
          <span>{loading ? "Redirecting..." : isSignIn ? "Continue with Google" : "Sign up with Google"}</span>
        </button>

        {!isPopup ? (
          <p className="mt-6 text-center text-sm text-slate-500 dark:text-white/60">
            {isSignIn ? "Need an account?" : "Already have an account?"}{" "}
            <Link href={isSignIn ? "/signup" : "/signin"} className="font-semibold text-primary hover:underline dark:text-accent">
              {isSignIn ? "Sign up" : "Sign in"}
            </Link>
          </p>
        ) : null}
      </div>
    </main>
  );
}
