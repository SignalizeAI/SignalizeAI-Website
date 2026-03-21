"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useExtensionInstallState } from "@/hooks/useExtensionInstallState";

interface BrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const browserOptions = [
  {
    name: "Google Chrome",
    storeLabel: "Install from Chrome Web Store",
    href: "https://chromewebstore.google.com/detail/nhgeihbbpdnhcfccedpnkionaofdpaib?utm_source=item-share-cb",
    icon: "/images/browser/chrome.svg",
  },
  {
    name: "Mozilla Firefox",
    storeLabel: "Install from Firefox Add-ons",
    href: "https://addons.mozilla.org/en-US/firefox/addon/signalizeai/",
    icon: "/images/browser/firefox.svg",
  },
];

const BrowserModal = ({ isOpen, onClose }: BrowserModalProps) => {
  const { installed, browser } = useExtensionInstallState();

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 mx-4 w-full max-w-md animate-in fade-in zoom-in duration-200">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#111111]">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 transition hover:text-gray-600 dark:hover:text-gray-300"
            aria-label="Close modal"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-black dark:text-white">Choose your browser</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Select your browser to install SignalizeAI
            </p>
          </div>
          <div className="space-y-3">
            {browserOptions.map((browserOption) => {
              const disabled =
                (installed && browser === "firefox" && browserOption.name === "Mozilla Firefox") ||
                (installed && browser === "chrome" && browserOption.name === "Google Chrome");
              const description =
                installed && browser === "firefox" && browserOption.name === "Google Chrome"
                  ? "Try on Chrome instead"
                  : installed && browser === "chrome" && browserOption.name === "Google Chrome"
                    ? "Installed on Chrome"
                  : disabled
                    ? "Installed on Firefox"
                    : browserOption.storeLabel;

              const inner = (
                <>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                    <Image src={browserOption.icon} alt="" width={48} height={48} className="h-12 w-12" />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className="font-semibold text-slate-900 group-hover:text-primary dark:text-white dark:group-hover:text-accent">
                      {browserOption.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-white/65">{description}</p>
                  </div>
                  {disabled ? null : (
                    <svg
                      className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  )}
                </>
              );

              if (disabled) {
                return (
                  <div
                    key={browserOption.name}
                    className="flex items-center gap-4 rounded-xl border-2 border-emerald-200 bg-emerald-50 p-4 dark:border-emerald-400/20 dark:bg-emerald-400/12"
                  >
                    {inner}
                  </div>
                );
              }

              return (
                <Link
                  key={browserOption.name}
                  href={browserOption.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-lg dark:border-white/10 dark:bg-white/5 dark:hover:border-accent"
                >
                  {inner}
                </Link>
              );
            })}
          </div>
          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            Both versions offer the same features and functionality
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrowserModal;
