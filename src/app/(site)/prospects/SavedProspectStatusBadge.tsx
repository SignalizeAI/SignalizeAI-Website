const STATUS_STYLES: Record<string, { badge: string, dot: string }> = {
  not_contacted: {
    badge: "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-500/20 dark:bg-amber-500/10 dark:text-amber-200",
    dot: "bg-amber-500",
  },
  contacted: {
    badge: "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-200",
    dot: "bg-emerald-500",
  },
  follow_up_due: {
    badge: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-500/20 dark:bg-sky-500/10 dark:text-sky-200",
    dot: "bg-sky-500",
  },
};

const STATUS_LABELS: Record<string, string> = {
  not_contacted: "Not contacted",
  contacted: "Contacted",
  follow_up_due: "Follow-up due",
};

export default function SavedProspectStatusBadge({
  status,
}: {
  status?: string | null;
}) {
  const resolvedStatus = status || "not_contacted";
  const styles = STATUS_STYLES[resolvedStatus] || STATUS_STYLES.not_contacted;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${styles.badge}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot} animate-pulse shadow-[0_0_8px_rgba(0,0,0,0.1)]`} />
      {STATUS_LABELS[resolvedStatus] || STATUS_LABELS.not_contacted}
    </span>
  );
}
