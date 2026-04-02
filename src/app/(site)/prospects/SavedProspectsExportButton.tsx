"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type SavedProspectsExportButtonProps = {
  disabled: boolean;
  exportingFormat: "csv" | "excel" | null;
  onExport: (format: "csv" | "excel") => void;
};

export default function SavedProspectsExportButton({
  disabled,
  exportingFormat,
  onExport,
}: SavedProspectsExportButtonProps) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handleExport = (format: "csv" | "excel") => {
    onExport(format);
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setOpen((value) => !value);
        }}
        className={`inline-flex h-12 list-none cursor-pointer items-center gap-2 rounded-2xl border px-4 text-sm font-semibold transition [&::-webkit-details-marker]:hidden ${
          disabled
            ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white/30"
            : "border-slate-200 bg-white text-slate-900 hover:border-primary/40 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:hover:border-accent/40"
        }`}
      >
        {exportingFormat === "csv"
          ? "Exporting CSV..."
          : exportingFormat === "excel"
            ? "Exporting Excel..."
            : "Export"}
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m6 8 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {!disabled && open ? (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-white/10 dark:bg-[#151515]">
          <button
            type="button"
            onClick={() => handleExport("csv")}
            className="flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 dark:text-white/78 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => handleExport("excel")}
            className="mt-1 flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 dark:text-white/78 dark:hover:bg-white/5 dark:hover:text-white"
          >
            Export Excel
          </button>
        </div>
      ) : null}
    </div>
  );
}
