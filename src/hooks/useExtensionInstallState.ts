"use client";

import { useEffect, useMemo, useState } from "react";

type BrowserKind = "chrome" | "firefox" | "unknown";

function detectBrowser(): BrowserKind {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("chrome") || ua.includes("chromium") || ua.includes("edg")) return "chrome";
  return "unknown";
}

export function useExtensionInstallState() {
  const [installed, setInstalled] = useState(false);
  const browser = useMemo(() => detectBrowser(), []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId = 0;
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.data?.type !== "SIGNALIZE_EXTENSION_CHECK_RESULT") return;
      setInstalled(Boolean(event.data.installed));
      window.clearTimeout(timeoutId);
    };

    window.addEventListener("message", handleMessage);
    window.postMessage({ type: "SIGNALIZE_PAGE_EXTENSION_CHECK" }, "*");

    timeoutId = window.setTimeout(() => {
      setInstalled(false);
    }, 700);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.clearTimeout(timeoutId);
    };
  }, []);

  return { installed, browser };
}
