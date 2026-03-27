"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LazyBrowserModal from "@/components/BrowserModal/LazyBrowserModal";
import { useExtensionInstallState } from "@/hooks/useExtensionInstallState";
import { useWebsiteSessionState } from "@/hooks/useWebsiteSessionState";
import DesktopNav from "./DesktopNav";
import HeaderGlobalStyles from "./HeaderGlobalStyles";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import ThemeToggler from "./ThemeToggler";
import useStickyHeader from "./useStickyHeader";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();
  const sticky = useStickyHeader(50);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const hideAuthCta = pathname === "/signin";
  const { installed } = useExtensionInstallState();
  const { signedIn, loading } = useWebsiteSessionState(installed);

  const ctaLabel = installed ? (loading ? "Sign in" : signedIn ? "Sign out" : "Sign in") : "Get Extension";

  const handleCtaClick = async () => {
    if (installed && signedIn) {
      const { getSupabaseClient } = await import("@/utils/supabaseClient");
      const supabase = getSupabaseClient();
      window.postMessage({ type: "SIGNALIZE_WEBSITE_SIGN_OUT" }, window.location.origin);
      await supabase.auth.signOut();
      return;
    }
    if (installed) {
      router.push("/signin");
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <HeaderGlobalStyles />

      <header
        className={`nav-morph fixed left-1/2 z-[999] flex w-full -translate-x-1/2 items-center justify-between border border-transparent bg-white/80 backdrop-blur-[10px] dark:bg-[#0a0a0a]/80 ${
          sticky
            ? "top-0 border-b border-gray-200 bg-white/95 px-4 py-4 shadow-sm dark:border-white/10 dark:bg-[#111111]/80 lg:top-6 lg:max-w-5xl lg:rounded-full lg:px-6 lg:py-4.5 lg:shadow-lg dark:lg:shadow-[0_0_18px_rgba(0,0,0,0.32)]"
            : "top-0 max-w-full rounded-none border-b border-gray-100 bg-white/50 px-4 py-4 dark:border-white/5 dark:bg-transparent lg:px-8 lg:py-5"
        }`}
      >
        <div className="flex shrink-0 items-center gap-3">
          <Logo />
        </div>
        <DesktopNav sticky={sticky} isHomePage={isHomePage} pathname={pathname} />
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden gap-2 lg:flex">
            <ThemeToggler />
          </div>
          {!hideAuthCta ? (
            <button
              onClick={() => void handleCtaClick()}
              className={`hidden items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg lg:flex ${
                sticky
                  ? "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] shadow-md dark:shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                  : "border border-transparent bg-slate-900 hover:bg-slate-800 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
              }`}
            >
              {ctaLabel}
            </button>
          ) : null}
          <div className="text-slate-800 dark:text-white lg:hidden">
            <ThemeToggler />
          </div>
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label="Toggle Mobile Menu"
            className="p-2 text-slate-800 dark:text-white lg:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                  navbarOpen ? "top-2.5 rotate-45" : "top-1"
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 block h-0.5 w-full bg-current transition-all duration-300 ${
                  navbarOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                  navbarOpen ? "top-2.5 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
        <MobileNav
          isOpen={navbarOpen}
          closeMenu={() => setNavbarOpen(false)}
          isHomePage={isHomePage}
          openModal={() => setModalOpen(true)}
          pathname={pathname}
          ctaLabel={hideAuthCta ? null : ctaLabel}
          onCtaClick={() => void handleCtaClick()}
        />
      </header>

      <LazyBrowserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
