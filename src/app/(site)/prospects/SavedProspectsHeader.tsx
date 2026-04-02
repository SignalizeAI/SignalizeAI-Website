type SavedProspectsHeaderProps = {
  totalCount: number;
  page: number;
  totalPages: number;
};

export default function SavedProspectsHeader({
  totalCount,
  page,
  totalPages,
}: SavedProspectsHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-slate-200 bg-slate-50/88 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/5 lg:p-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-accent">
            Workspace
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white lg:text-4xl">
            Saved prospects
          </h1>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/65">
            Review your saved prospect strategies, emails, and snapshots in one workspace.
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2 text-sm font-bold text-slate-400 dark:text-white/20">
          <span>{totalCount} Prospects</span>
          <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-white/10" />
          <span>
            Page {page} of {totalPages}
          </span>
        </div>
      </div>
    </header>
  );
}
