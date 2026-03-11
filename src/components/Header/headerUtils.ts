import type { MouseEvent } from "react";
import menuData from "./menuData";

export const handleSmoothScroll = (
  event: MouseEvent<HTMLAnchorElement>,
  path: string,
  closeMobileMenu?: () => void,
) => {
  if (!path.startsWith("/#")) {
    return;
  }

  event.preventDefault();
  const element = document.getElementById(path.substring(2));
  if (!element) {
    return;
  }

  window.scrollTo({
    top: element.getBoundingClientRect().top + window.scrollY - 80,
    behavior: "smooth",
  });
  closeMobileMenu?.();
};

export const isPathActive = (pathname: string, path?: string) => {
  if (!path) return false;
  if (path === "/") return pathname === "/";
  return pathname === path || pathname.startsWith(`${path}/`);
};

export const isMenuActive = (
  pathname: string,
  menuItem: (typeof menuData)[number],
) =>
  isPathActive(pathname, menuItem.path) ||
  (menuItem.submenu?.some(
    (subItem) =>
      !!subItem.path &&
      subItem.path.startsWith("/") &&
      isPathActive(pathname, subItem.path),
  ) ??
    false);
