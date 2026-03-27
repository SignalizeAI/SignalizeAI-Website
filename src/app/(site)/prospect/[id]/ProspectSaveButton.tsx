type ProspectSaveButtonProps = {
  saved: boolean;
  loading: boolean;
  onClick: () => void;
};

export default function ProspectSaveButton({
  saved,
  loading,
  onClick,
}: ProspectSaveButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`inline-flex min-h-11 items-center justify-center rounded-2xl border px-4 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-70 ${
        saved
          ? "border-rose-300 text-rose-700 hover:border-rose-400 dark:border-rose-400/30 dark:text-rose-200 dark:hover:border-rose-300/50"
          : "border-slate-300 text-slate-900 hover:border-slate-400 dark:border-white/15 dark:text-white dark:hover:border-white/30"
      }`}
    >
      {loading ? (saved ? "Removing..." : "Saving...") : saved ? "Unsave" : "Save"}
    </button>
  );
}
