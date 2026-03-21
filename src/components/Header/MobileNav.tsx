"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import Link from "next/link";
import ChevronIcon from "./ChevronIcon";
import menuData from "./menuData";
import { handleSmoothScroll, isMenuActive } from "./headerUtils";

type MobileNavProps = {
  isOpen: boolean;
  closeMenu: () => void;
  isHomePage: boolean;
  openModal: () => void;
  pathname: string;
  ctaLabel: string | null;
  onCtaClick: () => void;
};

const MobileNav = ({
  isOpen,
  closeMenu,
  isHomePage,
  openModal,
  pathname,
  ctaLabel,
  onCtaClick,
}: MobileNavProps) => {
  const [submenuOpen, setSubmenuOpen] = useState(-1);

  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    handleSmoothScroll(event, path, closeMenu);
    if (!path.startsWith("/#")) closeMenu();
  };

  return (
    <>
      <div
        className={`absolute left-0 top-full mt-4 w-full px-4 transition-all duration-300 lg:hidden ${
          isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
        }`}
      >
        <div className="w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-[#111111] dark:shadow-2xl">
          <ul className="flex flex-col gap-2">
            {menuData.map((menuItem, index) => {
              if (menuItem.title === "Home" && isHomePage) return null;
              const active = isMenuActive(pathname, menuItem);
              const highlightClass = menuItem.highlight
                ? "border border-amber-200/80 bg-amber-50 text-amber-900 shadow-sm hover:border-amber-300 hover:bg-amber-100 dark:border-amber-400/20 dark:bg-amber-300/10 dark:text-amber-100 dark:hover:border-amber-300/30 dark:hover:bg-amber-300/15"
                : "";
              const itemClass = active
                ? "bg-slate-100 text-slate-900 dark:bg-white/10 dark:text-white"
                : menuItem.highlight
                  ? highlightClass
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white";

              return (
                <li key={index}>
                  {menuItem.submenu ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setSubmenuOpen(submenuOpen === index ? -1 : index)}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${itemClass}`}
                      >
                        {menuItem.title}
                        <ChevronIcon
                          className={`h-4 w-4 transition-transform ${submenuOpen === index ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          submenuOpen === index ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <ul className="ml-4 flex flex-col gap-2">
                          {menuItem.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={subItem.path || "#"}
                                prefetch={subItem.prefetch}
                                target={subItem.newTab ? "_blank" : "_self"}
                                onClick={(event) => handleLinkClick(event, subItem.path || "")}
                                className="flex items-center gap-4 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-[#3b82f6] dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-[#00e5ff]"
                              >
                                {subItem.icon && <span className="h-5 w-5 fill-current">{subItem.icon}</span>}
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={menuItem.path || "#"}
                      prefetch={menuItem.prefetch}
                      onClick={(event) => handleLinkClick(event, menuItem.path || "")}
                      className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${itemClass}`}
                    >
                      {menuItem.title}
                    </Link>
                  )}
                </li>
              );
            })}
            {ctaLabel ? (
              <li className="border-t border-gray-100 pt-3 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onCtaClick();
                  }}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#00e5ff] px-4 py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]"
                >
                  {ctaLabel}
                </button>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
      {isOpen && <div className="fixed inset-0 z-[998] bg-transparent" onClick={closeMenu} />}
    </>
  );
};

export default MobileNav;
