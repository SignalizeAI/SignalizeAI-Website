"use client";

import { useEffect, useMemo, useRef, useState } from "react";

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
  const lastSuccessAtRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId = 0;
    let retryIntervalId = 0;
    const requestCheck = () => {
      window.clearTimeout(timeoutId);
      window.postMessage(
        { type: "SIGNALIZE_PAGE_EXTENSION_CHECK" },
        window.location.origin,
      );
      timeoutId = window.setTimeout(() => {
        if (Date.now() - lastSuccessAtRef.current > 5000) {
          setInstalled(false);
        }
      }, 1400);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window) return;
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "SIGNALIZE_EXTENSION_CHECK_RESULT") return;
      lastSuccessAtRef.current = Date.now();
      setInstalled(Boolean(event.data.installed));
      window.clearTimeout(timeoutId);
    };

    const handleRefocus = () => {
      requestCheck();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        requestCheck();
      }
    };

    window.addEventListener("message", handleMessage);
    window.addEventListener("focus", handleRefocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    requestCheck();
    retryIntervalId = window.setInterval(() => {
      if (!document.hidden) {
        requestCheck();
      }
    }, 2000);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("focus", handleRefocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearTimeout(timeoutId);
      window.clearInterval(retryIntervalId);
    };
  }, []);

  return { installed, browser };
}
