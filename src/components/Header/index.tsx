"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import LazyBrowserModal from "@/components/BrowserModal/LazyBrowserModal";
import { useExtensionInstallState } from "@/hooks/useExtensionInstallState";
import { useWebsiteSessionState } from "@/hooks/useWebsiteSessionState";
import AccountMenu from "./AccountMenu";
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
  const { signedIn, loading, profile } = useWebsiteSessionState(installed);

  const ctaLabel = installed ? (loading ? "Sign in" : signedIn ? "Sign out" : "Sign in") : "Get Extension";

  const handleSignOut = async () => {
    const { getSupabaseClient } = await import("@/utils/supabaseClient");
    const supabase = getSupabaseClient();
    window.postMessage({ type: "SIGNALIZE_WEBSITE_SIGN_OUT" }, window.location.origin);
    await supabase.auth.signOut();
  };

  const handleCtaClick = async () => {
    if (installed && signedIn) {
      await handleSignOut();
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
        className={`nav-morph fixed left-1/2 z-[999] flex w-full -translate-x-1/2 items-center justify-between border border-transparent bg-white/80 backdrop-blur-[10px] dark:bg-dark/80 ${
          sticky
            ? "top-0 border-b border-black/8 bg-white/95 px-4 py-4 shadow-sm dark:border-white/10 dark:bg-dark-2/80 lg:top-6 lg:max-w-5xl lg:rounded-full lg:px-6 lg:py-4.5 lg:shadow-lg dark:lg:shadow-[0_0_18px_rgba(0,0,0,0.32)]"
            : "top-0 max-w-full rounded-none border-b border-black/8 bg-white/50 px-4 py-4 dark:border-white/5 dark:bg-transparent lg:px-8 lg:py-5"
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
          {!hideAuthCta && installed && signedIn && profile ? (
            <AccountMenu
              name={profile.name}
              avatarUrl={profile.avatarUrl}
              sticky={sticky}
              onSignOut={() => void handleSignOut()}
            />
          ) : null}
          {!hideAuthCta && (!installed || !signedIn || !profile) ? (
            <button
              onClick={() => void handleCtaClick()}
              className={`hidden items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-all lg:flex ${
                sticky
                  ? "bg-primary hover:bg-primary-deep"
                  : "bg-primary hover:bg-primary-deep"
              }`}
            >
              {ctaLabel}
            </button>
          ) : null}
          <div className="text-ink dark:text-white lg:hidden">
            <ThemeToggler />
          </div>
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label="Toggle Mobile Menu"
            className="p-2 text-ink dark:text-white lg:hidden"
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
          signedIn={signedIn}
          accountName={profile?.name || null}
          avatarUrl={profile?.avatarUrl || null}
        />
      </header>

      <LazyBrowserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
