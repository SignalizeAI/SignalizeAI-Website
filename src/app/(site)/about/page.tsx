import { Metadata } from "next";
import Link from "next/link";
import { audienceCards, principles } from "./content";

export const metadata: Metadata = {
  title: "About | SignalizeAI",
  description:
    "Learn how SignalizeAI turns public website content into structured sales intelligence.",
};

const AboutPage = () => {
  return (
    <main>
      <section className="relative overflow-hidden bg-white pb-16 pt-28 dark:bg-[#000000] md:pb-20 md:pt-32 lg:pb-24 lg:pt-36">
        <div className="absolute left-0 top-0 h-72 w-72 -translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-[120px]" />
        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                Why SignalizeAI exists
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                The product is built to remove the slow part of website research.
              </h2>
              <p className="mt-6 max-w-[640px] text-lg leading-8 text-slate-600 dark:text-white/65">
                SignalizeAI turns public business websites into usable sales context. Instead of stitching together copy, positioning, audience clues, and readiness signals by hand, the extension generates a structured read that is easier to act on.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/docs" className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200">
                  Read documentation
                </Link>
                <Link href="/privacy" className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5">
                  Review privacy
                </Link>
              </div>
            </div>
            <div className="grid gap-4">
              {principles.map((item, index) => (
                <div key={item.title} className="rounded-[2rem] border border-gray-200 bg-gray-50/90 p-6 shadow-lg dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-accent text-sm font-black text-white dark:text-black">
                      0{index + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-[#050505] md:py-20 lg:py-24">
        <div className="container">
          <div className="mx-auto mb-14 max-w-[840px] text-center">
            <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
              Who it is for
            </span>
            <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Different teams use the product differently
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-white/65">
              The core product is the same, but the reason people reach for it changes depending on whether they are selling, operating, or researching.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {audienceCards.map((card) => (
              <div key={card.title} className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#0d0d0d]">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{card.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
