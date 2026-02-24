"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface BrowserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BrowserModal = ({ isOpen, onClose }: BrowserModalProps) => {
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-200">
        <div className="rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900 dark:border dark:border-white/10">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition"
            aria-label="Close modal"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="mb-6 text-center">
            <h3 className="text-2xl font-bold text-black dark:text-white">
              Choose your browser
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Select your browser to install SignalizeAI
            </p>
          </div>

          {/* Browser Options */}
          <div className="space-y-3">
            {/* Chrome */}
            <Link
              href="https://chromewebstore.google.com/detail/nhgeihbbpdnhcfccedpnkionaofdpaib?utm_source=item-share-cb"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-lg dark:border-gray-700 dark:bg-slate-800 dark:hover:border-primary"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Chrome_icon_%28February_2022%29.svg"
                  alt="Chrome"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-black dark:text-white group-hover:text-primary">
                  Google Chrome
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Install from Chrome Web Store
                </p>
              </div>
              <svg
                className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>

            {/* Firefox */}
            <Link
              href="https://addons.mozilla.org/en-US/firefox/addon/signalizeai/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={onClose}
              className="group flex items-center gap-4 rounded-xl border-2 border-gray-200 bg-white p-4 transition-all hover:border-primary hover:shadow-lg dark:border-gray-700 dark:bg-slate-800 dark:hover:border-primary"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a0/Firefox_logo%2C_2019.svg"
                  alt="Firefox"
                  width={48}
                  height={48}
                  className="h-12 w-12"
                />
              </div>
              <div className="flex-1 text-left">
                <h4 className="font-semibold text-black dark:text-white group-hover:text-primary">
                  Mozilla Firefox
                </h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Install from Firefox Add-ons
                </p>
              </div>
              <svg
                className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
            Both versions offer the same features and functionality
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrowserModal;
