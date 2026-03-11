import Link from "next/link";
import { accessCards, gettingStartedSteps, outputCards, troubleshootingCards, workflowCards } from "./content";

const CheckIcon = () => (
  <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent">
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  </span>
);

export const DocsGettingStarted = () => (
  <section id="getting-started" className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]">
    <div className="border-b border-gray-200 px-8 py-7 dark:border-white/10 md:px-10">
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">Getting started</span>
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Start here before you think about edge cases</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/65">These steps establish the normal use path. If the basics are unclear, the rest of the documentation will feel more complicated than it needs to.</p>
    </div>
    <div className="space-y-6 px-8 py-8 md:px-10">
      {gettingStartedSteps.map((step, index) => (
        <div key={step.title} className="grid gap-4 rounded-[1.75rem] border border-gray-200 bg-gray-50/80 p-5 dark:border-white/10 dark:bg-white/5 md:grid-cols-[72px_minmax(0,1fr)]">
          <div className="flex items-start"><div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-r from-primary to-accent text-lg font-black text-white dark:text-black">{index + 1}</div></div>
          <div><h3 className="text-xl font-bold text-slate-900 dark:text-white">{step.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{step.description}</p></div>
        </div>
      ))}
    </div>
  </section>
);

export const DocsWorkflowSection = () => (
  <section id="workflows" className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-gray-50/80 shadow-xl dark:border-white/10 dark:bg-[#060606]">
    <div className="px-8 py-7 md:px-10">
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">Workflows</span>
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">The product has three main workflow modes</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/65">The goal here is not to repeat the homepage. It is to show when each mode is appropriate and what users should expect from it.</p>
    </div>
    <div className="grid gap-4 px-8 pb-8 md:px-10 lg:grid-cols-3">
      {workflowCards.map((card, index) => (
        <div key={card.title} className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[#0d0d0d]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent dark:via-accent/60" />
          <div className="mb-6 flex items-center justify-between gap-4"><span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary dark:text-accent">{card.eyebrow}</span><span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-black text-primary dark:bg-accent/10 dark:text-accent">0{index + 1}</span></div>
          <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">{card.title}</h3>
          <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/65">{card.description}</p>
          <div className="mt-6 space-y-3">{card.points.map((point) => <div key={point} className="flex items-start gap-3"><CheckIcon /><p className="text-sm leading-7 text-slate-600 dark:text-white/65">{point}</p></div>)}</div>
        </div>
      ))}
    </div>
  </section>
);

export const DocsOutputSection = () => (
  <section id="outputs" className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]">
    <div className="grid gap-0 xl:grid-cols-[0.85fr_1.15fr]">
      <div className="border-b border-gray-200 bg-gray-50/80 px-8 py-8 dark:border-white/10 dark:bg-white/5 md:px-10 xl:border-b-0 xl:border-r">
        <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">Output reference</span>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">What each run is trying to tell you</h2>
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/65">SignalizeAI output is meant to be actionable for sales and research, not just descriptive. The fields below are the main pieces of context the product surfaces.</p>
      </div>
      <div className="grid gap-4 px-8 py-8 md:px-10 lg:grid-cols-2">{outputCards.map((item) => <div key={item.title} className="rounded-[1.75rem] border border-gray-200 bg-gray-50/90 p-5 dark:border-white/10 dark:bg-white/5"><h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{item.description}</p></div>)}</div>
    </div>
  </section>
);

export const DocsAccessSection = () => (
  <section id="access" className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-gray-50/80 shadow-xl dark:border-white/10 dark:bg-[#060606]">
    <div className="px-8 py-7 md:px-10">
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">Access and availability</span>
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Understand which workflows are available</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/65">This section explains which product capabilities exist and how they generally fit. Billing, subscription changes, and live plan comparison belong on the pricing page.</p>
    </div>
    <div className="grid gap-4 px-8 pb-8 md:grid-cols-2 md:px-10 xl:grid-cols-3">{accessCards.map((card) => <div key={card.title} className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#0d0d0d]"><div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between"><h3 className="text-xl font-bold text-slate-900 dark:text-white">{card.title}</h3><span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-accent/10 dark:text-accent">{card.availability}</span></div><p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/65">{card.description}</p></div>)}</div>
    <div className="px-8 pb-8 md:px-10"><Link href="/pricing" className="inline-flex items-center rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-white dark:border-white/15 dark:text-white dark:hover:bg-white/5">View pricing separately</Link></div>
  </section>
);

export const DocsTroubleshootingSection = () => (
  <section id="troubleshooting" className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-gray-50/80 shadow-xl dark:border-white/10 dark:bg-[#060606]">
    <div className="px-8 py-7 md:px-10">
      <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">Troubleshooting and support</span>
      <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">Fix common problems without leaving the page</h2>
      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/65">Most issues come down to unsupported pages, weak source pages, or account and access mismatches. Start here before escalating.</p>
    </div>
    <div className="grid gap-4 px-8 pb-8 md:grid-cols-2 md:px-10">{troubleshootingCards.map((item) => <div key={item.title} className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#0d0d0d]"><h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{item.description}</p></div>)}</div>
    <div className="px-8 pb-8 md:px-10"><div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#0d0d0d] md:p-8"><div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center"><div><h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Need direct help?</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/65">Use Discord for fast product questions, GitHub for code visibility, and privacy documentation when the question is specifically about data handling.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link href="https://discord.gg/eCvhD6WZhX" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">Join Discord</Link><Link href="https://github.com/SignalizeAI" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5">View GitHub</Link></div></div></div></div>
  </section>
);
