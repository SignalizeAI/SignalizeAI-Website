"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import menuData from "./menuData";

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string,
  ) => {
    if (path.startsWith("/#")) {
      e.preventDefault();
      const sectionId = path.substring(2);
      const element = document.getElementById(sectionId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setNavbarOpen(false);
      }
    }
  };

  const handleStickyNavbar = () => {
    if (window.scrollY >= 20) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  return (
    <>
      <header className="fixed top-4 left-0 z-[999] flex w-full justify-center px-4">
        <div
          className={`border-stroke/10 relative flex w-full max-w-5xl items-center justify-between rounded-full border bg-white/80 px-4 py-2 pl-6 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-[#0a0a0a]/80 ${
            sticky
              ? "shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
              : "shadow-[0_4px_15px_rgba(0,0,0,0.08)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.25)]"
          }`}
        >
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-7 w-7">
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

              <span className="text-l hidden font-bold tracking-tight text-slate-800 sm:block dark:text-white">
                Signalize
                <span className="text-primary dark:text-accent">AI</span>
              </span>
            </Link>
          </div>

          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
            <ul className="flex items-center gap-x-8">
              {menuData.map((menuItem, index) => (
                <li key={index}>
                  <Link
                    href={menuItem.path || "#"}
                    onClick={(e) => handleNavClick(e, menuItem.path || "")}
                    className="text-dark/70 hover:text-primary text-sm font-medium transition-colors dark:text-gray-300 dark:hover:text-white"
                  >
                    {menuItem.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="https://github.com/SignalizeAI"
              target="_blank"
              aria-label="Github Link"
              className="hidden h-9 w-9 items-center justify-center text-gray-700 transition hover:text-primary lg:flex dark:text-white dark:hover:text-primary/80"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </Link>

            <Link
              href="https://discord.gg/ThZ6jkcf"
              target="_blank"
              aria-label="Discord Link"
              className="hidden h-9 w-9 items-center justify-center text-gray-700 transition hover:text-primary lg:flex dark:text-white dark:hover:text-primary/80"
            >
               <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-5 w-5"
              >
                <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.5328-9.7413-3.4683-13.6373a.061.061 0 00-.0325-.0277zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.419-2.1568 2.419z" />
              </svg>
            </Link>

            <ThemeToggler />

            <Link
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="bg-primary hover:bg-primary/90 hidden items-center justify-center rounded-full px-5 py-2 text-sm font-semibold text-white transition lg:flex dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
              Get Started
            </Link>

            <button
              onClick={navbarToggleHandler}
              aria-label="Mobile Menu"
              className="text-dark flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 lg:hidden dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            >
              <span className="relative block h-5 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-full transform bg-current transition-all duration-300 ${
                    navbarOpen ? "top-2.5 rotate-45" : "top-1"
                  }`}
                />
                <span
                  className={`absolute top-2.5 left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                    navbarOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full transform bg-current transition-all duration-300 ${
                    navbarOpen ? "top-2.5 -rotate-45" : "top-4"
                  }`}
                />
              </span>
            </button>
          </div>

          <div
            className={`border-stroke/10 absolute top-full left-0 mt-2 w-full transform rounded-3xl border bg-white/95 p-4 shadow-xl backdrop-blur-xl transition-all duration-300 ease-in-out lg:hidden dark:border-white/10 dark:bg-[#0a0a0a]/95 ${
              navbarOpen
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-4 opacity-0"
            }`}
          >
            <ul className="flex flex-col gap-2">
              {menuData.map((menuItem, index) => (
                <li key={index}>
                  <Link
                    href={menuItem.path || "#"}
                    onClick={(e) => handleNavClick(e, menuItem.path || "")}
                    className="text-dark flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                  >
                    {menuItem.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="https://github.com/SignalizeAI"
                  target="_blank"
                  className="text-dark flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://discord.gg/ThZ6jkcf"
                  target="_blank"
                  className="text-dark flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
                >
                  Discord
                </Link>
              </li>
              <li className="mt-2">
                <Link
                  href="/#contact"
                  onClick={(e) => handleNavClick(e, "/#contact")}
                  className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-bold text-white transition dark:bg-white dark:text-black"
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {navbarOpen && (
        <div
          className="fixed inset-0 z-[998] bg-transparent"
          onClick={() => setNavbarOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
