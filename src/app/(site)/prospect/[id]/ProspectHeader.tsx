import StatusDropdown from "./StatusDropdown";
import type { ProspectRecord } from "./prospectTypes";

type ProspectHeaderProps = {
  prospect: ProspectRecord;
  statusLoading: boolean;
  onStatusChange: (status: string) => void;
};

export default function ProspectHeader({
  prospect,
  statusLoading,
  onStatusChange,
}: ProspectHeaderProps) {
  return (
    <header className="rounded-[2rem] border border-slate-200 bg-slate-50/88 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/5 lg:p-8">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-accent">
            Prospect
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 dark:text-white lg:text-4xl">
            {prospect.title || prospect.domain}
          </h1>
          <p className="mt-3 text-sm text-slate-600 dark:text-white/65">
            {prospect.domain || prospect.url}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          {prospect.id ? (
            <StatusDropdown
              value={prospect.prospect_status || "not_contacted"}
              disabled={statusLoading}
              onChange={onStatusChange}
            />
          ) : null}
        </div>
      </div>
    </header>
  );
}
