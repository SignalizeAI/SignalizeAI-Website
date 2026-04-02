type SavedProspectsBulkActionsProps = {
  selectedCount: number;
  allVisibleSelected: boolean;
  deleting: boolean;
  onToggleSelectAllVisible: () => void;
  onDeleteSelected: () => void;
  onCancel: () => void;
};

export default function SavedProspectsBulkActions({
  selectedCount,
  allVisibleSelected,
  deleting,
  onToggleSelectAllVisible,
  onDeleteSelected,
  onCancel,
}: SavedProspectsBulkActionsProps) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white/55 p-4 dark:border-white/10 dark:bg-white/[0.03]">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="text-sm font-medium text-slate-600 dark:text-white/65">
          {selectedCount} selected
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onToggleSelectAllVisible}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition hover:border-primary/40 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:hover:border-accent/40"
          >
            {allVisibleSelected ? "Clear visible" : "Select visible"}
          </button>
          <button
            type="button"
            disabled={selectedCount === 0 || deleting}
            onClick={onDeleteSelected}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 transition hover:border-rose-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:border-rose-400/35 dark:hover:bg-rose-500/16"
          >
            {deleting ? "Deleting..." : "Delete selected"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-900 transition hover:border-slate-300 dark:border-white/10 dark:bg-[#111111] dark:text-white dark:hover:border-white/20"
          >
            Cancel
          </button>
        </div>
      </div>
    </section>
  );
}
