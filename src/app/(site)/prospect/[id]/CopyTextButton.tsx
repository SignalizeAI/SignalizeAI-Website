"use client";

import { useState } from "react";

type CopyTextButtonProps = {
  value: string;
  tone?: "default" | "inverse";
};

export default function CopyTextButton({ value, tone = "default" }: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <button
      type="button"
      onClick={() => void handleCopy()}
      className={`inline-flex items-center rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${
        tone === "inverse"
          ? "border-sky-200 bg-white/88 text-slate-800 hover:border-sky-300 hover:bg-white dark:border-white/16 dark:bg-white/8 dark:text-white dark:hover:bg-white/12"
          : "border-slate-300 bg-white text-slate-700 hover:border-slate-400 dark:border-white/12 dark:bg-white/[0.04] dark:text-white/76 dark:hover:border-white/24"
      }`}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
