import type { ProspectRecord } from "./prospectTypes";

type ProspectStrategySectionProps = {
  prospect: ProspectRecord;
};

function StrategyItem({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="h-full min-h-[120px] w-full rounded-2xl bg-white/80 p-4 dark:bg-white/[0.04]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-white/45">
        {label}
      </div>
      <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700 dark:text-white/76">
        {value || "—"}
      </p>
    </div>
  );
}

function splitAngleItems(value?: string | null): string[] {
  return (value || "")
    .split(/\r?\n+/)
    .map((item) => item.replace(/^[-*•]\s*/, "").trim())
    .filter(Boolean);
}

function StrategyListItem({ label, value }: { label: string; value?: string | null }) {
  const items = splitAngleItems(value);

  return (
    <div className="h-full min-h-[120px] w-full rounded-2xl bg-white/80 p-4 dark:bg-white/[0.04]">
      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-white/45">
        {label}
      </div>
      {items.length ? (
        <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-700 dark:text-white/76">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-[10px] h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-white/45" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-white/76">—</p>
      )}
    </div>
  );
}

export default function ProspectStrategySection({ prospect }: ProspectStrategySectionProps) {
  return (
    <section className="w-full rounded-[2rem] border border-slate-200 bg-slate-50/72 p-6 dark:border-white/10 dark:bg-white/5 lg:p-8 xl:min-h-[620px]">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-accent">
        Strategy
      </div>
      <div className="mt-5 grid gap-4">
        <StrategyItem label="Goal" value={prospect.recommended_outreach_goal} />
        <StrategyListItem label="Outreach angle" value={prospect.recommended_outreach_angle} />
      </div>
    </section>
  );
}
