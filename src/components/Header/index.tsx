"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LazyBrowserModal from "@/components/BrowserModal/LazyBrowserModal";
import { useExtensionInstallState } from "@/hooks/useExtensionInstallState";
import { useWebsiteSessionState } from "@/hooks/useWebsiteSessionState";
import { supabase } from "@/utils/supabaseClient";
import DesktopNav from "./DesktopNav";
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
  const { installed } = useExtensionInstallState();
  const { signedIn, loading } = useWebsiteSessionState();

  const ctaLabel = loading ? "Get Extension" : installed ? (signedIn ? "Sign out" : "Sign in") : "Get Extension";
  const handleCtaClick = async () => {
    if (installed && signedIn) {
      window.postMessage({ type: "SIGNALIZE_WEBSITE_SIGN_OUT" }, "*");
      await supabase.auth.signOut();
      return;
    }
    if (installed) {
      const popup = window.open(
        `${window.location.origin}/signin?popup=1`,
        "signalizeai-signin",
        "popup=yes,width=520,height=720,resizable=yes,scrollbars=yes",
      );
      if (!popup) router.push("/signin");
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.1);
          --ease-smooth: cubic-bezier(0.165, 0.84, 0.44, 1);
        }
        @media (min-width: 1024px) {
          .nav-morph {
            transition:
              top 0.5s var(--ease-smooth),
              max-width 0.5s var(--ease-smooth),
              width 0.5s var(--ease-smooth),
              padding 0.5s var(--ease-smooth),
              border-radius 0.5s var(--ease-smooth),
              background-color 0.4s ease,
              backdrop-filter 0.4s ease,
              box-shadow 0.4s ease,
              border 0.4s ease;
          }
        }
        .marker-transition {
          transition:
            left 0.3s var(--ease-spring),
            width 0.3s var(--ease-spring),
            opacity 0.2s ease-out;
        }
        .marker-glow::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 18%;
          width: 64%;
          height: 6px;
          background: linear-gradient(90deg, rgba(26, 35, 126, 0.2), rgba(0, 229, 255, 0.2));
          filter: blur(5px);
          opacity: 0.35;
          z-index: -1;
        }
      `}</style>

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
          ctaLabel={ctaLabel}
          onCtaClick={() => void handleCtaClick()}
        />
      </header>

      <LazyBrowserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
