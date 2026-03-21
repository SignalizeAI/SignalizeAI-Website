"use client";

import Image from "next/image";
import Link from "next/link";
import { installLinks } from "./content";
import { useExtensionInstallState } from "@/hooks/useExtensionInstallState";

function getChromeLabel(installed: boolean, browser: string) {
  if (!installed) return "Install on Chrome";
  if (browser === "firefox") return "Try on Chrome instead";
  return "Installed on Chrome";
}

export default function HeroInstallButtons() {
  const { installed, browser } = useExtensionInstallState();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
      {installLinks.map((browserLink) => {
        const isChrome = browserLink.label.includes("Chrome");
        const isFirefox = browserLink.label.includes("Firefox");

        const label = isChrome
          ? getChromeLabel(installed, browser)
          : installed && browser === "firefox"
            ? "Already installed on Firefox"
            : browserLink.label;

        const disabled =
          (installed && browser === "firefox" && isFirefox) ||
          (installed && browser === "chrome" && isChrome);
        const className = disabled
          ? "flex w-full max-w-[280px] items-center justify-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-base font-bold text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/12 dark:text-emerald-200 sm:w-auto sm:max-w-none sm:px-8 sm:py-5 sm:text-lg"
          : browserLink.className;

        const content = (
          <>
            <Image src={browserLink.icon} alt="" width={22} height={22} className="h-5 w-5 sm:h-5.5 sm:w-5.5" />
            {label}
            {browserLink.glow && !disabled ? (
              <div className="absolute inset-0 -z-10 rounded-2xl bg-primary/20 blur-xl opacity-0 transition-opacity group-hover:opacity-100" />
            ) : null}
          </>
        );

        if (disabled) {
          return <div key={browserLink.label} className={className}>{content}</div>;
        }

        return (
          <Link key={browserLink.label} target="_blank" rel="noopener noreferrer" href={browserLink.href} className={className}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
