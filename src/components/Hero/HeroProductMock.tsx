import { heroProspectRecord } from "./content";

const HeroProductMock = () => {
  const { domain, status, fields, outreach } = heroProspectRecord;

  return (
    <div className="relative w-full max-w-[560px]">
      <div className="overflow-hidden rounded-2xl border border-black/8 bg-white shadow-[0_1px_2px_rgba(11,13,18,0.04),0_12px_32px_-16px_rgba(11,13,18,0.18)] dark:border-white/10 dark:bg-dark-2 dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),0_16px_40px_-20px_rgba(0,0,0,0.8)]">
        {/* window chrome */}
        <div className="flex items-center gap-3 border-b border-black/8 bg-black/[0.02] px-4 py-3 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-black/12 dark:bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/12 dark:bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-black/12 dark:bg-white/15" />
          </div>
          <span className="field-label truncate text-muted dark:text-white/45">
            Prospect record
          </span>
        </div>

        {/* company header */}
        <div className="flex items-start justify-between gap-4 border-b border-black/8 px-5 py-4 dark:border-white/10">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary dark:bg-accent/10 dark:text-accent">
              N
            </span>
            <span className="truncate text-sm font-semibold text-ink dark:text-white">
              {domain}
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-signal/40 bg-signal/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-signal">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-signal" />
            {status}
          </span>
        </div>

        {/* fields */}
        <div className="divide-y divide-black/[0.06] dark:divide-white/[0.07]">
          {fields.map((field) => (
            <div key={field.label} className="px-5 py-4">
              <p className="field-label text-muted dark:text-white/45">
                {field.label}
              </p>
              <p className="mt-1.5 text-[13px] leading-6 text-ink/80 dark:text-white/75">
                {field.value}
              </p>
            </div>
          ))}
        </div>

        {/* outreach snippet */}
        <div className="border-t border-black/8 bg-black/[0.02] px-5 py-4 dark:border-white/10 dark:bg-white/[0.03]">
          <div className="flex items-center justify-between gap-3">
            <p className="field-label text-muted dark:text-white/45">
              Suggested outreach
            </p>
            <span className="field-label rounded-md border border-black/8 px-1.5 py-0.5 text-muted dark:border-white/10 dark:text-white/45">
              Copy
            </span>
          </div>
          <p className="mt-2 rounded-xl border border-black/8 bg-white px-3.5 py-3 text-[13px] leading-6 text-ink/75 dark:border-white/10 dark:bg-dark dark:text-white/70">
            {outreach}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HeroProductMock;
