import Image from "next/image";
import Link from "next/link";
import { browserLinks, heroFacts } from "./content";

const DocsHero = () => (
  <section className="relative overflow-hidden pb-16 pt-[120px] md:pt-[150px] lg:pb-20 lg:pt-[180px]">
    <div className="absolute inset-0">
      <div className="absolute left-1/2 top-0 h-[520px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary/18 to-transparent blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-accent/12 to-transparent blur-[120px]" />
      <div className="absolute right-0 top-1/3 h-[280px] w-[280px] rounded-full bg-primary/10 blur-[120px]" />
    </div>
    <div className="container relative z-10">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-800 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-white/90">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white dark:bg-accent dark:text-black">
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </span>
            SignalizeAI documentation
          </div>
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
            Setup, workflows,<br className="hidden sm:block" />outputs, safeguards
            <span className="block bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent">without the marketing fluff.</span>
          </h1>
          <p className="mt-8 max-w-[720px] text-lg leading-8 text-slate-600 dark:text-white/68 sm:text-xl">
            This guide explains how SignalizeAI works in practice: how to get started, when to use single-page analysis versus batch workflows, what the output means, and how privacy and access are handled.
          </p>
          <div className="mt-10 max-w-md sm:max-w-none">
            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              {browserLinks.map((browser) => (
                <Link
                  key={browser.label}
                  href={browser.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200 sm:px-7 sm:py-4 sm:text-base"
                >
                  <Image src={browser.icon} alt="" width={18} height={18} className="h-[18px] w-[18px]" />
                  <span className="sm:hidden">{browser.mobileLabel}</span>
                  <span className="hidden sm:inline">{browser.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2.25rem] border border-gray-200 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0a]/90 sm:p-8">
            <div className="rounded-[1.75rem] border border-gray-200 bg-gray-50/90 p-6 dark:border-white/10 dark:bg-[#101010]">
              <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary dark:text-accent">Guide coverage</p>
                  <h2 className="mt-3 max-w-[12ch] text-[2rem] font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:max-w-none sm:text-3xl">
                    What you can find in the docs
                  </h2>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_20px_40px_-20px_rgba(26,35,126,0.45)] dark:text-black sm:h-14 sm:w-14">
                  <svg className="h-6 w-6 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z" /></svg>
                </div>
              </div>
              <div className="mt-6 grid gap-3 md:grid-cols-3">
                {heroFacts.map((fact) => (
                  <div key={fact.label} className="rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-white/5">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-white/60">{fact.label}</p>
                    <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DocsHero;
