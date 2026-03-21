import { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import PrivacySection from "./PrivacySection";
import { heroCards, privacySections, tocItems } from "./content";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the SignalizeAI Chrome and Firefox extension.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-800 dark:from-[#020202] dark:via-[#060606] dark:to-[#020202] dark:text-white">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/15" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-accent/10 blur-[140px]" />

        <section className="relative z-10 px-4 pb-12 pt-28 sm:px-6 sm:pb-18 sm:pt-40">
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-slate-200 bg-white/85 p-5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.28)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] sm:rounded-[2.25rem] sm:p-10 lg:p-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-current" /></span>
                Last updated: March 9, 2026
              </div>
              <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">Privacy Policy</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/68 sm:text-lg sm:leading-9">
                This page explains what SignalizeAI processes, what can be stored in your account, and how permissions are used across Chrome and Firefox.
              </p>
              <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500 dark:text-white/52">
                The product is designed to turn publicly available business websites into sales-ready prospect data. It does not access private pages, form entries, cookies, or session data.
              </p>
              <div className="mt-8 grid gap-3 md:grid-cols-2">
                {heroCards.map((card) => (
                  <div key={card.label} className="rounded-[1.4rem] border border-slate-200 bg-slate-50/90 px-5 py-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">{card.label}</p>
                    <p className="mt-2 text-sm font-medium leading-7 text-slate-700 dark:text-white/68">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">Policy sections</p>
                <div className="mt-4 space-y-2">
                  {tocItems.map((item) => (
                    <a key={item.href} href={item.href} className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white">
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="rounded-[1.75rem] border border-slate-200 bg-white/92 p-5 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.28)] backdrop-blur-sm dark:border-white/10 dark:bg-[#0b0b0b]/92 dark:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.7)] sm:rounded-[2rem] sm:p-10">
              <div className="space-y-12">{privacySections.map((section) => <PrivacySection key={section.id} section={section} />)}</div>
              <div className="mt-12 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-6 py-6 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">Need product context too?</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/65">
                      Privacy explains data handling. For setup, workflows, and feature behavior, use the docs.
                    </p>
                  </div>
                  <Link href="/docs" className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
                    Open docs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
