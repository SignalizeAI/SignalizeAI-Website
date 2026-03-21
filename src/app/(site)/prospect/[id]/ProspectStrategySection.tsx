import CopyTextButton from "./CopyTextButton";
import type { ProspectRecord } from "./prospectTypes";

type ProspectStrategySectionProps = {
  prospect: ProspectRecord;
};

function StrategyItem({ label, value, canCopy = false }: { label: string; value?: string | null; canCopy?: boolean }) {
  return (
    <div className="h-full min-h-[120px] w-full rounded-2xl bg-white/80 p-4 dark:bg-white/[0.04]">
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 dark:text-white/45">
          {label}
        </div>
        {canCopy && value ? <CopyTextButton value={value} /> : null}
      </div>
      <p className="mt-2 text-sm leading-7 text-slate-700 dark:text-white/76">{value || "—"}</p>
    </div>
  );
}

function LargeStrategyItem(props: { label: string; value?: string | null; canCopy?: boolean }) {
  return <StrategyItem {...props} canCopy={props.canCopy} />;
}

export default function ProspectStrategySection({ prospect }: ProspectStrategySectionProps) {
  return (
    <section className="min-h-[620px] w-full rounded-[2rem] border border-slate-200 bg-slate-50/72 p-6 dark:border-white/10 dark:bg-white/5 lg:p-8">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-accent">
        Strategy
      </div>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <StrategyItem label="Goal" value={prospect.recommended_outreach_goal} />
        <StrategyItem label="Who should reach out" value={prospect.recommended_outreach_persona} />
        <div className="sm:col-span-2">
          <LargeStrategyItem label="Sales angle" value={prospect.sales_angle} />
        </div>
        <div className="sm:col-span-2">
          <LargeStrategyItem label="Suggested message" value={prospect.recommended_outreach_message} canCopy />
        </div>
      </div>
    </section>
  );
}
