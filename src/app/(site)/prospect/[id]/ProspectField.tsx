type ProspectFieldProps = {
  label: string;
  value?: string | number | null;
};

const ProspectField = ({ label, value }: ProspectFieldProps) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
    <div className="text-xs font-semibold uppercase tracking-[0.18em] text-primary dark:text-accent">
      {label}
    </div>
    <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-white/72">{value || "—"}</p>
  </div>
);

export default ProspectField;
