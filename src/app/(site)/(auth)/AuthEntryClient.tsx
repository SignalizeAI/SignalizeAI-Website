"use client";

import { useState } from "react";
import Link from "next/link";
import { getSupabaseClient } from "@/utils/supabaseClient";

type AuthEntryClientProps = {
  mode: "signin" | "signup";
  isPopup?: boolean;
  authState?: string;
};

export default function AuthEntryClient({ mode, isPopup = false, authState }: AuthEntryClientProps) {
  const [loading, setLoading] = useState(false);
  const isSignIn = mode === "signin";

  const handleGoogleAuth = async () => {
    try {
      const supabase = getSupabaseClient();
      setLoading(true);
      const redirectParams = new URLSearchParams();
      if (isPopup) redirectParams.set("popup", "1");
      if (authState) redirectParams.set("auth_state", authState);
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
    <main className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#f8fbff_0%,#edf3ff_54%,#f8fbff_100%)] px-4 py-16 dark:bg-[linear-gradient(180deg,#040508_0%,#0a1020_55%,#040508_100%)] sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] [background-size:34px_34px] dark:opacity-20" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-72 w-72 -translate-x-[62%] rounded-full bg-primary/12 blur-[120px] dark:bg-primary/20" />
      <div className="pointer-events-none absolute right-[12%] top-1/3 h-64 w-64 rounded-full bg-accent/12 blur-[140px] dark:bg-accent/16" />

      <div className="relative mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-6xl items-center justify-center">
        <div className="w-full max-w-[34rem] animate-in fade-in zoom-in-95 rounded-[2rem] border border-slate-200/85 bg-white/90 p-8 shadow-[0_32px_90px_-48px_rgba(15,23,42,0.36)] backdrop-blur-xl duration-300 dark:border-white/10 dark:bg-[#0f172acc] dark:shadow-[0_30px_90px_-48px_rgba(0,0,0,0.82)] sm:p-10">
          <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
            {isSignIn ? "Welcome back" : "Create account"}
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-slate-950 dark:text-white sm:text-[2.7rem]">
            {isSignIn ? "Sign in" : "Start now"}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-white/64">
            {isPopup
              ? "Continue with Google to unlock your website session. This window will close automatically after sign in."
              : "Access prospects, outreach workflows, pricing, and your website dashboard in one place."}
          </p>

          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-[0_16px_36px_-24px_rgba(15,23,42,0.7)] transition hover:-translate-y-0.5 hover:bg-slate-900 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.78)] disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white dark:text-slate-950 dark:shadow-[0_16px_34px_-24px_rgba(255,255,255,0.45)] dark:hover:bg-slate-100"
          >
            <span>{loading ? "Redirecting..." : isSignIn ? "Continue with Google" : "Sign up with Google"}</span>
          </button>

          <div className="mt-5 rounded-2xl border border-slate-200/80 bg-slate-50/90 px-4 py-3 text-center text-xs font-medium text-slate-500 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/56">
            Your data is secure and never shared.
          </div>

          {!isPopup ? (
            <p className="mt-6 text-center text-sm text-slate-500 dark:text-white/60">
              {isSignIn ? "Need an account?" : "Already have an account?"}{" "}
              <Link href={isSignIn ? "/signup" : "/signin"} className="font-semibold text-primary hover:underline dark:text-accent">
                {isSignIn ? "Sign up" : "Sign in"}
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </main>
  );
}
