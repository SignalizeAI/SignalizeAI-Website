type SavedProspectsEmptyStateProps = {
  hasFilters: boolean;
  onReset: () => void;
};

export default function SavedProspectsEmptyState({
  hasFilters,
  onReset,
}: SavedProspectsEmptyStateProps) {
  return (
    <div className="rounded-[2.5rem] border border-dashed border-slate-200 bg-slate-50/50 py-24 text-center dark:border-white/10 dark:bg-white/[0.02]">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/5 dark:text-white/20">
        <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">
        {hasFilters ? "No prospects match your criteria" : "Start saving prospects"}
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm text-slate-600 dark:text-white/60">
        {hasFilters
          ? "Try adjusting your search terms or filters to find what you're looking for."
          : "Save your first prospect from the extension to see it appear here in your dashboard."}
      </p>
      {hasFilters ? (
        <button
          type="button"
          onClick={onReset}
          className="mt-6 text-sm font-semibold text-primary decoration-2 underline-offset-4 hover:underline dark:text-accent"
        >
          Reset all filters
        </button>
      ) : null}
    </div>
  );
}
