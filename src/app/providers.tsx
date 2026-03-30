"use client";

import { ThemeProvider } from "next-themes";
import React, { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode, PropsWithChildren } from "react";
import ThemeSyncBridge from "@/components/ThemeSyncBridge";

// --- Extension Status Types & Utility ---
type BrowserKind = "chrome" | "firefox" | "unknown";

function detectBrowser(): BrowserKind {
  if (typeof navigator === "undefined") return "unknown";
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes("firefox")) return "firefox";
  if (ua.includes("chrome") || ua.includes("chromium") || ua.includes("edg")) return "chrome";
  return "unknown";
}

interface ExtensionStatusContextType {
  installed: boolean;
  browser: BrowserKind;
}

const ExtensionStatusContext = createContext<ExtensionStatusContextType | undefined>(undefined);

// --- Extension Provider ---
function ExtensionStatusProvider({ children }: { children: ReactNode }) {
  const [installed, setInstalled] = useState(false);
  const browser = useMemo(() => detectBrowser(), []);
  const lastSuccessAtRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId = 0;
    let retryIntervalId = 0;
    const requestCheck = () => {
      window.clearTimeout(timeoutId);
      window.postMessage({ type: "SIGNALIZE_PAGE_EXTENSION_CHECK" }, window.location.origin);
      timeoutId = window.setTimeout(() => {
        if (Date.now() - lastSuccessAtRef.current > 5000) setInstalled(false);
      }, 1400);
    };

    const handleMessage = (event: MessageEvent) => {
      if (event.source !== window || event.origin !== window.location.origin) return;
      if (event.data?.type !== "SIGNALIZE_EXTENSION_CHECK_RESULT") return;
      lastSuccessAtRef.current = Date.now();
      setInstalled(Boolean(event.data.installed));
      window.clearTimeout(timeoutId);
    };

    const handleRefocus = () => requestCheck();
    const handleVisibilityChange = () => { if (document.visibilityState === "visible") requestCheck(); };

    window.addEventListener("message", handleMessage);
    window.addEventListener("focus", handleRefocus);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    requestCheck();
    
    retryIntervalId = window.setInterval(() => { if (!document.hidden) requestCheck(); }, 2000);

    return () => {
      window.removeEventListener("message", handleMessage);
      window.removeEventListener("focus", handleRefocus);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.clearTimeout(timeoutId);
      window.clearInterval(retryIntervalId);
    };
  }, []);

  const value = useMemo(() => ({ installed, browser }), [installed, browser]);

  return (
    <ExtensionStatusContext.Provider value={value}>
      {children}
    </ExtensionStatusContext.Provider>
  );
}

// --- Hook Export ---
export function useExtensionStatus() {
  const context = useContext(ExtensionStatusContext);
  if (context === undefined) {
    throw new Error("useExtensionStatus must be used within an ExtensionStatusProvider");
  }
  return context;
}

// --- Combined Providers ---
export default function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="dark"
    >
      <ExtensionStatusProvider>
        <ThemeSyncBridge />
        {children}
      </ExtensionStatusProvider>
    </ThemeProvider>
  );
}
