"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";
import BrowserModal from "@/components/BrowserModal";

// --- 1. UTILITY HOOKS & HELPERS ---

/**
 * Hook to handle scroll detection for sticky header
 */
const useStickyHeader = (threshold = 50) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY >= threshold);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return sticky;
};

/**
 * Smooth scroll handler for anchor links
 */
const handleSmoothScroll = (
  e: React.MouseEvent<HTMLAnchorElement>,
  path: string,
  closeMobileMenu?: () => void,
) => {
  if (path.startsWith("/#")) {
    e.preventDefault();
    const sectionId = path.substring(2);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
      if (closeMobileMenu) closeMobileMenu();
    }
  }
};

// --- 2. SUB-COMPONENTS ---

const Logo = () => (
  <Link href="/" className="group flex items-center gap-2">
    <div className="relative h-7 w-7 transition-transform duration-300 group-hover:scale-110">
      <Image
        src="/images/logo/logo-dark.png"
        alt="SignalizeAI Logo"
        fill
        sizes="28px"
        className="object-contain dark:hidden"
      />
      <Image
        src="/images/logo/logo-white.png"
        alt="SignalizeAI Logo"
        fill
        sizes="28px"
        className="hidden object-contain dark:block"
      />
    </div>
    <span className="text-lg font-bold tracking-tight text-slate-900 transition-all duration-300 dark:text-white">
      Signalize<span className="text-primary dark:text-accent">AI</span>
    </span>
  </Link>
);

const isPathActive = (pathname: string, path?: string) => {
  if (!path) return false;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

const isMenuActive = (pathname: string, menuItem: (typeof menuData)[number]) => {
  if (isPathActive(pathname, menuItem.path)) return true;
  return (
    menuItem.submenu?.some(
      (sub) => !!sub.path && sub.path.startsWith("/") && isPathActive(pathname, sub.path),
    ) ?? false
  );
};

const DesktopNav = ({
  sticky,
  isHomePage,
  pathname,
}: {
  sticky: boolean;
  isHomePage: boolean;
  pathname: string;
}) => {
  const [markerStyle, setMarkerStyle] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const navRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    if (!navRef.current) return;
    const parentRect = navRef.current.getBoundingClientRect();
    const targetRect = e.currentTarget.getBoundingClientRect();
    setMarkerStyle({
      left: targetRect.left - parentRect.left,
      width: targetRect.width,
      opacity: 1,
    });
  };

  const handleMouseLeave = () =>
    setMarkerStyle((prev) => ({ ...prev, opacity: 0 }));

  return (
    <nav className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
      <ul
        ref={navRef}
        className="relative flex items-center rounded-full border border-gray-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none"
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Marker */}
        <div
          className="marker-transition marker-glow pointer-events-none absolute top-1 bottom-1 rounded-full bg-gray-100 dark:bg-white/10"
          style={{ ...markerStyle }}
        />

        {menuData.map((menuItem, index) => {
          if (menuItem.title === "Home" && isHomePage) return null;
          const active = isMenuActive(pathname, menuItem);
          return (
            <li key={index} className="group relative z-10">
              {menuItem.submenu ? (
                <>
                  <button
                    type="button"
                    onMouseEnter={handleMouseEnter}
                    className={`flex cursor-pointer items-center gap-1 rounded-full px-5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "text-slate-950 dark:text-white"
                        : sticky
                          ? "text-slate-600 hover:text-black dark:text-white/70 dark:hover:text-white"
                          : "text-slate-800 hover:text-black dark:text-white/80 dark:hover:text-white"
                    }`}
                  >
                    {menuItem.title}
                    <ChevronIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  </button>
                  {/* Dropdown */}
                  <div className="invisible absolute top-full left-0 mt-2 w-[200px] rounded-2xl border border-gray-100 bg-white dark:border-white/10 dark:bg-[#111111] p-3 opacity-0 shadow-lg dark:shadow-2xl transition-all duration-300 group-hover:visible group-hover:top-full group-hover:opacity-100 backdrop-blur-xl">
                    {menuItem.submenu.map((sub, idx) => (
                      <Link
                        key={idx}
                        href={sub.path || "#"}
                        target={sub.newTab ? "_blank" : "_self"}
                        className="flex items-center gap-4 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 dark:text-white/70 transition hover:bg-slate-50 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white"
                      >
                        {sub.icon && (
                          <span className="h-5 w-5 fill-current text-[#3b82f6] dark:text-[#00e5ff]">{sub.icon}</span>
                        )}
                        {sub.title}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={menuItem.path || "#"}
                  onClick={(e) => handleSmoothScroll(e, menuItem.path || "")}
                  onMouseEnter={handleMouseEnter}
                  className={`block rounded-full px-5 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    active
                      ? "bg-gray-100 text-slate-950 dark:bg-white/10 dark:text-white"
                      : sticky
                        ? "text-slate-600 hover:text-black dark:text-white/70 dark:hover:text-white"
                        : "text-slate-800 hover:text-black dark:text-white/80 dark:hover:text-white"
                  }`}
                >
                  {menuItem.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

const MobileNav = ({
  isOpen,
  closeMenu,
  isHomePage,
  openModal,
  pathname,
}: {
  isOpen: boolean;
  closeMenu: () => void;
  isHomePage: boolean;
  openModal: () => void;
  pathname: string;
}) => {
  const [submenuOpen, setSubmenuOpen] = useState<number>(-1);
  const handleMobileLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    handleSmoothScroll(e, path, closeMenu);
    if (!path.startsWith("/#")) {
      closeMenu();
    }
  };

  return (
    <>
      <div
        className={`absolute top-full left-0 mt-4 w-full px-4 transition-all duration-300 lg:hidden ${isOpen
          ? "visible translate-y-0 opacity-100"
          : "invisible -translate-y-4 opacity-0"
          }`}
      >
        <div className="w-full rounded-2xl border border-gray-100 bg-white dark:border-white/10 dark:bg-[#111111] p-4 shadow-xl dark:shadow-2xl">
          <ul className="flex flex-col gap-2">
            {menuData.map((menuItem, index) => {
              if (menuItem.title === "Home" && isHomePage) return null;
              const active = isMenuActive(pathname, menuItem);
              return (
                <li
                  key={index}
                  className={menuItem.submenu ? "group relative" : ""}
                >
                  {menuItem.submenu ? (
                    <>
                      <button
                        onClick={() =>
                          setSubmenuOpen(submenuOpen === index ? -1 : index)
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                          active
                            ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                        }`}
                      >
                        {menuItem.title}
                        <ChevronIcon
                          className={`h-4 w-4 transition-transform ${submenuOpen === index ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${submenuOpen === index
                          ? "max-h-[400px] opacity-100"
                          : "max-h-0 opacity-0"
                          }`}
                      >
                        <ul className="ml-4 flex flex-col gap-2">
                          {menuItem.submenu.map((sub, idx) => (
                            <li key={idx}>
                              <Link
                                href={sub.path || "#"}
                                target={sub.newTab ? "_blank" : "_self"}
                                onClick={(e) =>
                                  handleMobileLinkClick(e, sub.path || "")
                                }
                                className="flex items-center gap-4 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-[#3b82f6] dark:hover:text-[#00e5ff] transition"
                              >
                                {sub.icon && (
                                  <span className="h-5 w-5 fill-current">
                                    {sub.icon}
                                  </span>
                                )}
                                {sub.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menuItem.path || "#"}
                      onClick={(e) =>
                        handleMobileLinkClick(e, menuItem.path || "")
                      }
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                        active
                          ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                      }`}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              );
            })}
            <li className="border-t border-gray-100 dark:border-white/10 pt-3">
              <button
                onClick={() => {
                  closeMenu();
                  openModal();
                }}
                className="bg-gradient-to-r from-[#3b82f6] to-[#00e5ff] flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white transition hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:scale-[1.02]"
              >
                Install extension
              </button>
            </li>
          </ul>
        </div>
      </div>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[998] bg-transparent"
          onClick={closeMenu}
        />
      )}
    </>
  );
};

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`fill-current ${className}`}
  >
    <path d="M12 16.0313C11.75 16.0313 11.5312 15.9375 11.375 15.75L6.03125 10.0625C5.75 9.75 5.75 9.28125 6.03125 8.96875C6.3125 8.6875 6.78125 8.6875 7.09375 8.96875L12 14.1875L16.9062 8.96875C17.2188 8.6875 17.6875 8.6875 17.9688 8.96875C18.25 9.28125 18.25 9.75 17.9688 10.0625L12.625 15.75C12.4688 15.9375 12.25 16.0313 12 16.0313Z" />
  </svg>
);

// --- 3. MAIN COMPONENT ---

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const sticky = useStickyHeader(50);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

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
          bottom: -4px;
          left: 15%;
          width: 70%;
          height: 8px;
          background: linear-gradient(90deg, rgba(26, 35, 126, 0.32), rgba(0, 229, 255, 0.32));
          filter: blur(8px);
          opacity: 0.6;
          z-index: -1;
        }
      `}</style>

      <header
        className={`nav-morph fixed left-1/2 z-[999] flex w-full -translate-x-1/2 items-center justify-between border border-transparent bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-xl ${sticky
          ? "top-0 border-b border-gray-200 dark:border-white/10 px-4 py-4 lg:top-6 lg:max-w-5xl lg:rounded-full lg:px-6 lg:py-2.5 shadow-md lg:shadow-xl dark:lg:shadow-[0_0_30px_rgba(0,0,0,0.5)] bg-white/95 dark:bg-[#111111]/80"
          : "top-0 max-w-full rounded-none border-b border-gray-100 dark:border-white/5 px-4 py-4 lg:px-8 bg-white/50 dark:bg-transparent"
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
            onClick={() => setModalOpen(true)}
            className={`hidden items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white transition-all hover:scale-105 hover:shadow-lg lg:flex ${
              sticky
                ? "bg-gradient-to-r from-[#3b82f6] to-[#00e5ff] shadow-md dark:shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                : "border border-transparent bg-slate-900 hover:bg-slate-800 dark:border-white/10 dark:bg-white/10 dark:hover:bg-white/20"
            }`}
          >
            Install
          </button>

          <div className="lg:hidden text-slate-800 dark:text-white">
            <ThemeToggler />
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label="Toggle Mobile Menu"
            className="p-2 text-slate-800 dark:text-white lg:hidden"
          >
            <span className="relative block h-5 w-5">
              <span
                className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${navbarOpen ? "top-2.5 rotate-45" : "top-1"}`}
              />
              <span
                className={`absolute top-2.5 left-0 block h-0.5 w-full bg-current transition-all duration-300 ${navbarOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${navbarOpen ? "top-2.5 -rotate-45" : "top-4"}`}
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
        />
      </header>

      <BrowserModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Header;
