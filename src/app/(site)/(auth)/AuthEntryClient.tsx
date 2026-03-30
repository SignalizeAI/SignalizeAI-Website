"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { heroUsers } from "@/components/Hero/content";

type AuthEntryClientProps = {
  mode: "signin" | "signup";
};

export default function AuthEntryClient({ mode }: AuthEntryClientProps) {
  const searchParams = useSearchParams();
  const isPopup = searchParams.get("popup") === "1" || searchParams.get("popup") === "true";
  const authState = searchParams.get("auth_state") || undefined;
  const [loading, setLoading] = useState(false);
  const isSignIn = mode === "signin";

  const handleGoogleAuth = async () => {
    try {
      const { getSupabaseClient } = await import("@/utils/supabaseClient");
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
    <main className="relative min-h-screen overflow-hidden bg-white dark:bg-[#000000] flex flex-col items-center justify-center pt-20 pb-12 px-6">
      {/* Background Gradients - Matching Hero Exactly */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-primary/20 to-transparent blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-accent/10 to-transparent blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[480px] text-center">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-5xl lg:text-[60px] font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
            {isSignIn ? "Sign in" : "Sign up"}
          </h1>
          <p className="text-lg text-slate-600 dark:text-white/70 mb-10 leading-relaxed px-4">
             {isSignIn ? "Access your insights and outreach dashboard." : "Create your account to unlock sales-ready insights."}
          </p>

          {/* Google Button - High Contrast: Black (Light) / White (Dark) */}
          <button
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="group relative flex w-full items-center justify-center gap-4 rounded-2xl bg-slate-950 px-6 py-4.5 text-lg font-bold text-white shadow-xl transition-all hover:scale-[1.02] hover:bg-slate-800 active:scale-95 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 disabled:opacity-70 disabled:cursor-not-allowed"
            id="google-signin-btn"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            <span>{loading ? "Proceeding..." : isSignIn ? "Continue with Google" : "Sign up with Google"}</span>
            <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
          </button>

          {!isPopup && (
            <div className="mt-12 flex flex-col items-center gap-6">
              <div className="flex -space-x-4">
                {heroUsers.map((i) => (
                  <div key={i} className="h-14 w-14 lg:h-16 lg:w-16 overflow-hidden rounded-full border-4 border-white dark:border-[#000000] bg-gray-100 dark:bg-gray-800 shadow-2xl relative hover:z-10 transition-all hover:scale-110">
                    <Image src={`/images/users/user-0${i}.webp`} alt="" width={64} height={64} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="text-base lg:text-lg font-medium tracking-wide text-gray-500 dark:text-white/70">
                <strong className="text-gray-900 dark:text-white/80">Used by</strong> founders, SDRs, and GTM teams
              </div>
            </div>
          )}
        </div>

        {!isPopup && (
          <div className="mt-16 pt-8 border-t border-slate-200/50 dark:border-white/5">
            <p className="text-sm text-slate-500 dark:text-white/60">
              {isSignIn ? "New here?" : "Joined already?"}{" "}
              <Link href={isSignIn ? "/signup" : "/signin"} className="font-bold text-slate-900 dark:text-white hover:underline transition-colors decoration-primary underline-offset-4">
                {isSignIn ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
