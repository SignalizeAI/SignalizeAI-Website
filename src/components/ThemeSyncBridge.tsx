"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";

export default function ThemeSyncBridge() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "SIGNALIZE_EXTENSION_THEME_CHANGED") return;
      if (event.data?.theme !== "light" && event.data?.theme !== "dark") return;
      setTheme(event.data.theme);
    };

    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [setTheme]);

  return null;
}
