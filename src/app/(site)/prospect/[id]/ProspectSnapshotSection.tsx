import { getReadinessTone } from "./prospectFormat";
import type { ProspectRecord } from "./prospectTypes";

type ProspectSnapshotSectionProps = {
  prospect: ProspectRecord;
};

function Row({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="h-full min-h-[152px] w-full rounded-2xl bg-white/80 p-4 dark:bg-white/[0.04]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-white/45">
        {label}
      </div>
      <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-white/76">{value || "—"}</p>
    </div>
  );
}

function ReadinessCard({ score }: { score: number }) {
  const readiness = getReadinessTone(score);

  return (
    <div className="h-full min-h-[152px] w-full rounded-2xl bg-white/80 p-4 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-white/45">
          Sales readiness
        </div>
        <div className="rounded-full bg-slate-950/6 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-white/8 dark:text-white/75">
          {readiness.label}
        </div>
      </div>
      <div className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{score}</div>
      <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10">
        <div className={`h-full rounded-full ${readiness.bar}`} style={{ width: `${Math.max(10, Math.min(score, 100))}%` }} />
      </div>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/64">Quick signal for outreach priority.</p>
    </div>
  );
}

export default function ProspectSnapshotSection({ prospect }: ProspectSnapshotSectionProps) {
  const score = prospect.sales_readiness_score || 0;

  return (
    <section className="min-h-[620px] w-full rounded-[2rem] border border-slate-200 bg-slate-50/72 p-6 dark:border-white/10 dark:bg-white/5 lg:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-accent">
        Snapshot
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Row label="Target customer" value={prospect.target_customer} />
        <Row label="Best persona" value={prospect.best_sales_persona} />
        <Row label="What they do" value={prospect.what_they_do} />
        <Row label="Value proposition" value={prospect.value_proposition} />
        <div className="sm:col-span-2">
          <ReadinessCard score={score} />
        </div>
      </div>
    </section>
  );
}
