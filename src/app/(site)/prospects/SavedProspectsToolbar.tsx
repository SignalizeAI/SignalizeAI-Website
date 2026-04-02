"use client";

import { useState, useRef, useEffect } from "react";
import SavedProspectsExportButton from "./SavedProspectsExportButton";

type SavedProspectsToolbarProps = {
  search: string;
  status: string;
  canBulkDelete: boolean;
  selectionMode: boolean;
  exportingFormat: "csv" | "excel" | null;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onToggleSelectionMode: () => void;
  onExport: (format: "csv" | "excel") => void;
};

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "not_contacted", label: "Not contacted" },
  { value: "contacted", label: "Contacted" },
  { value: "follow_up_due", label: "Follow-up due" },
];

export default function SavedProspectsToolbar({
  search,
  status,
  canBulkDelete,
  selectionMode,
  exportingFormat,
  onSearchChange,
  onStatusChange,
  onToggleSelectionMode,
  onExport,
}: SavedProspectsToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = STATUS_OPTIONS.find((opt) => opt.value === status) || STATUS_OPTIONS[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:gap-6">
      <div className="relative flex-1">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            viewBox="0 0 20 20"
            className="h-5 w-5 text-slate-400 dark:text-white/30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="m14.5 14.5 3 3" strokeLinecap="round" />
            <circle cx="8.5" cy="8.5" r="5.5" />
          </svg>
        </div>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search by company, website, or keywords..."
          className="h-12 w-full rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-slate-900 outline-none ring-primary/20 transition focus:border-primary focus:ring-4 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:placeholder:text-white/30 dark:focus:border-accent dark:ring-accent/20"
        />
      </div>

      <div className="flex w-full gap-3 sm:w-auto">
        <div className="relative min-w-0 flex-1 sm:w-[240px]" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex h-12 w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-900 outline-none ring-primary/20 transition hover:border-primary/40 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:hover:border-accent/40 ${isOpen ? 'ring-4 border-primary dark:border-accent' : ''}`}
          >
            <div className="flex items-center gap-3">
              <svg
                viewBox="0 0 20 20"
                className="h-5 w-5 text-slate-400 dark:text-white/30"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M4 5h12M6.5 10h7M8.5 15h3" strokeLinecap="round" />
              </svg>
              <span>{selectedOption.label}</span>
            </div>
            <svg className={`h-4 w-4 text-slate-400 transition-transform dark:text-white/30 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute top-full z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl dark:border-white/10 dark:bg-[#151515]">
              {STATUS_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onStatusChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                    status === option.value
                      ? "bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent"
                      : "text-slate-600 hover:bg-slate-50 dark:text-white/60 dark:hover:bg-white/5"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <SavedProspectsExportButton
          disabled={exportingFormat !== null}
          exportingFormat={exportingFormat}
          onExport={onExport}
        />
        {canBulkDelete ? (
          <button
            type="button"
            onClick={onToggleSelectionMode}
            className={`inline-flex h-12 items-center justify-center rounded-2xl border px-4 text-sm font-semibold transition ${
              selectionMode
                ? "border-primary bg-primary/10 text-primary dark:border-accent dark:bg-accent/10 dark:text-accent"
                : "border-slate-200 bg-white text-slate-900 hover:border-primary/40 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:hover:border-accent/40"
            }`}
          >
            {selectionMode ? "Cancel" : "Delete multiple"}
          </button>
        ) : null}
      </div>
    </div>
  );
}
