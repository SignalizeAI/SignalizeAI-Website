import Link from "next/link";
import type { ProspectRecord } from "../prospect/[id]/prospectTypes";
import SavedProspectStatusBadge from "./SavedProspectStatusBadge";

function formatSavedDate(value?: string | null) {
  if (!value) return "Recently saved";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently saved";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function SavedProspectCard({
  prospect,
  selectionMode,
  selected,
  deleting,
  onToggleSelect,
  onDelete,
}: {
  prospect: ProspectRecord;
  selectionMode: boolean;
  selected: boolean;
  deleting: boolean;
  onToggleSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const domain = prospect.domain || (prospect.url ? new URL(prospect.url).hostname : "");

  return (
    <article
      className={`group relative flex h-full flex-col overflow-hidden rounded-[2rem] border bg-white/80 p-6 transition-all duration-300 dark:bg-white/[0.04] ${
        selected
          ? "border-primary ring-4 ring-primary/10 dark:border-accent dark:ring-accent/15"
          : "border-slate-200 hover:border-primary/30 dark:border-white/10 dark:hover:border-accent/40"
      }`}
    >
      <div className="relative z-10 flex flex-1 flex-col">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400 dark:text-white/30">
              {domain}
            </div>
            <h2 className="mt-2 truncate text-xl font-bold tracking-tight text-slate-900 dark:text-white transition-colors group-hover:text-primary dark:group-hover:text-accent">
              {prospect.title || domain}
            </h2>
          </div>
          {selectionMode ? (
            <button
              type="button"
              aria-label={selected ? "Deselect prospect" : "Select prospect"}
              onClick={() => onToggleSelect(prospect.id!)}
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all ${
                selected
                  ? "border-primary bg-primary text-white dark:border-accent dark:bg-accent dark:text-slate-950"
                  : "border-slate-200 bg-white text-slate-500 hover:border-primary/40 dark:border-white/10 dark:bg-[#111111] dark:text-white/55 dark:hover:border-accent/40"
              }`}
            >
              {selected ? (
                <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M4 10.5 8 14l8-8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                <span className="h-4.5 w-4.5 rounded-md border border-current" />
              )}
            </button>
          ) : (
            <button
              type="button"
              disabled={deleting}
              title="Delete saved prospect"
              aria-label="Delete saved prospect"
              onClick={(e) => {
                e.preventDefault();
                onDelete(prospect.id!);
              }}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-600 shadow-sm transition-all hover:border-rose-300 hover:bg-rose-100 hover:text-rose-700 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:border-rose-400/35 dark:hover:bg-rose-500/16 dark:hover:text-rose-200"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>

        <div className="mb-6 flex items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-white/5">
          <SavedProspectStatusBadge status={prospect.prospect_status} />
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/20">
            {formatSavedDate(prospect.created_at)}
          </span>
        </div>

        <div className="mb-8 flex-1">
          <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400 dark:text-white/20">
            Snapshot
          </div>
          <p className="mt-3 line-clamp-3 text-sm leading-7 text-slate-600 dark:text-white/60">
            {prospect.description || prospect.what_they_do || "Detailed strategy and personalized outreach sequences are ready for review."}
          </p>
        </div>

        <Link
          href={`/prospect/${prospect.id}`}
          target="_blank"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-6 text-sm font-bold text-white transition-all hover:bg-primary dark:bg-white dark:text-black dark:hover:bg-accent"
        >
          <span>Open Workspace</span>
          <svg viewBox="0 0 20 20" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6.5l3 3m0 0l-3 3m3-3H3.5" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
