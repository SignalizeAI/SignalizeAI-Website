"use client";

import { useEffect, useRef, useState } from "react";

type StatusDropdownProps = {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
};

const OPTIONS = [
  { value: "not_contacted", label: "Not contacted" },
  { value: "contacted", label: "Contacted" },
  { value: "follow_up", label: "Follow-up due" },
];

export default function StatusDropdown({ value, disabled = false, onChange }: StatusDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const selected = OPTIONS.find((option) => option.value === value) || OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex min-w-[168px] items-center justify-between gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/15 dark:bg-[#171717] dark:text-white dark:hover:border-white/30"
      >
        <span>{selected.label}</span>
        <svg viewBox="0 0 20 20" className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="m5 8 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 z-20 mt-2 min-w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-1 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.38)] dark:border-white/10 dark:bg-[#171717]">
          {OPTIONS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                setOpen(false);
                onChange(option.value);
              }}
              className={`flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm transition ${
                option.value === value
                  ? "bg-slate-100 font-semibold text-slate-950 dark:bg-white/10 dark:text-white"
                  : "text-slate-700 hover:bg-slate-100 dark:text-white/80 dark:hover:bg-white/8"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
