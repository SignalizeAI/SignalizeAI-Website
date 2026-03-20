import Link from "next/link";
import { permissions, privacyPoints } from "./content";

const CheckIcon = () => (
  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent">
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

const DocsPrivacySection = () => (
  <section id="privacy" className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]">
    <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
      <div className="border-b border-gray-200 px-8 py-8 dark:border-white/10 md:px-10 lg:border-b-0 lg:border-r">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">Privacy and security</span>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Built for on-demand prospecting, not passive tracking</h2>
        <div className="mt-6 space-y-4">{privacyPoints.map((point) => <div key={point} className="flex items-start gap-3"><CheckIcon /><p className="text-sm leading-7 text-slate-600 dark:text-white/65">{point}</p></div>)}</div>
        <div className="mt-8"><Link href="/privacy" className="inline-flex items-center rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5">Read full privacy policy</Link></div>
      </div>
      <div className="bg-slate-950 px-8 py-8 text-white dark:bg-[#0b0b0b] md:px-10">
        <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">Browser permissions</span>
        <div className="mt-6 grid gap-4">
          {permissions.map((permission) => (
            <div key={permission.title} className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5">
              <p className="font-mono text-sm font-semibold text-accent">{permission.title}</p>
              <p className="mt-2 text-sm leading-7 text-white/65">{permission.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default DocsPrivacySection;
