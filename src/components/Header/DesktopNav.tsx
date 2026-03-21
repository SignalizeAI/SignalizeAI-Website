"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ChevronIcon from "./ChevronIcon";
import menuData from "./menuData";
import { handleSmoothScroll, isMenuActive } from "./headerUtils";

type DesktopNavProps = {
  sticky: boolean;
  isHomePage: boolean;
  pathname: string;
};

const DesktopNav = ({ sticky, isHomePage, pathname }: DesktopNavProps) => {
  const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);
  const [hoveredSubmenu, setHoveredSubmenu] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const toggleSubmenu = (index: number) => {
    setHoveredSubmenu(null);
    setOpenSubmenu((current) => (current === index ? null : index));
  };

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setOpenSubmenu(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenSubmenu(null);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="absolute left-1/2 hidden -translate-x-1/2 lg:block"
    >
      <div className="relative">
        <ul className="relative z-10 flex items-center rounded-full border border-gray-200 bg-white p-1.5 shadow-sm dark:border-white/10 dark:bg-white/5 dark:shadow-none">
          {menuData.map((menuItem, index) => {
            if (menuItem.title === "Home" && isHomePage) return null;
            const active = isMenuActive(pathname, menuItem);
            const highlightClass = menuItem.highlight
              ? "border border-amber-200/80 bg-amber-50 text-amber-900 shadow-sm hover:border-amber-300 hover:bg-amber-100 dark:border-amber-400/20 dark:bg-amber-300/10 dark:text-amber-100 dark:hover:border-amber-300/30 dark:hover:bg-amber-300/15"
              : "";
            const idleClass = sticky
              ? "text-slate-600 hover:bg-gray-100 hover:text-black dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              : "text-slate-800 hover:bg-gray-100 hover:text-black dark:text-white/80 dark:hover:bg-white/10 dark:hover:text-white";
            const textClass = active
              ? "text-slate-950 dark:text-white"
              : `${idleClass} ${highlightClass}`.trim();

            return (
              <li
                key={index}
                className="group relative z-10"
                onMouseLeave={() => setHoveredSubmenu((current) => (current === index ? null : current))}
              >
                {menuItem.submenu ? (
                  <>
                    <button
                      type="button"
                      onClick={() => toggleSubmenu(index)}
                      onMouseEnter={() => setHoveredSubmenu(index)}
                      aria-expanded={openSubmenu === index}
                      aria-haspopup="menu"
                      className={`flex items-center gap-1 rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${menuItem.highlight ? highlightClass : textClass}`}
                    >
                      {menuItem.title}
                      <ChevronIcon className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                    </button>
                    <div
                      className={`absolute left-0 top-full mt-2 w-[200px] rounded-2xl border border-gray-100 bg-white p-3 shadow-lg transition-all duration-300 dark:border-white/10 dark:bg-[#111111] dark:shadow-2xl ${
                        openSubmenu === index || hoveredSubmenu === index
                          ? "visible opacity-100"
                          : "invisible opacity-0"
                      }`}
                    >
                      {menuItem.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.path || "#"}
                          prefetch={subItem.prefetch}
                          target={subItem.newTab ? "_blank" : "_self"}
                          onClick={() => setOpenSubmenu(null)}
                          className="flex items-center gap-4 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          {subItem.icon && (
                            <span className="h-5 w-5 fill-current text-[#3b82f6] dark:text-[#00e5ff]">
                              {subItem.icon}
                            </span>
                          )}
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={menuItem.path || "#"}
                    prefetch={menuItem.prefetch}
                    onClick={(event) => handleSmoothScroll(event, menuItem.path || "")}
                    className={`block rounded-full px-5 py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "bg-gray-100 text-slate-950 dark:bg-white/10 dark:text-white"
                        : menuItem.highlight
                          ? highlightClass
                          : textClass
                    }`}
                  >
                    {menuItem.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNav;
