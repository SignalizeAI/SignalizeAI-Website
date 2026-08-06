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
    <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
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
          ? "flex w-full items-center justify-center gap-3 rounded-2xl border border-signal/50 bg-signal/15 px-6 py-3.5 text-base font-semibold text-emerald-800 dark:border-signal/25 dark:bg-signal/10 dark:text-signal sm:w-auto sm:px-7"
          : browserLink.className;

        const content = (
          <>
            <Image src={browserLink.icon} alt="" width={22} height={22} className="h-5 w-5" />
            {label}
            {browserLink.glow && !disabled ? (
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-2xl bg-primary/40 opacity-0 blur-xl transition-opacity group-hover:opacity-100" />
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
