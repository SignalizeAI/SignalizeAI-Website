import Image from "next/image";
import Link from "next/link";
import { guardrails, workflowSteps } from "./content";

const About = () => {
  return (
    <section
      id="about"
      className="relative z-10 overflow-hidden bg-white py-16 dark:bg-dark md:py-20 lg:py-28"
    >
      <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 -translate-y-1/3 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-80 w-80 -translate-x-1/3 translate-y-1/3 rounded-full bg-accent/10 blur-[120px]" />

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
              How it works
            </span>

            <h2 className="mt-6 display text-3xl font-extrabold text-ink dark:text-white sm:text-[42px] sm:leading-[1.1]">
              Prospect faster without turning your workflow into tab chaos.
            </h2>

            <p className="mt-6 max-w-[620px] text-base leading-8 text-muted dark:text-white/65">
              SignalizeAI is built for sales and growth teams that need useful
              context quickly. Instead of manually piecing together website
              copy, positioning, and buyer signals, the extension gives you a
              structured read on the business in a few seconds.
            </p>

            <div className="mt-8 space-y-4">
              {workflowSteps.map((step) => (
                <div key={step.title} className="rounded-2xl border border-black/8 bg-black/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-primary/35 dark:border-white/10 dark:bg-white/5 dark:hover:border-accent/35">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary dark:bg-accent/10 dark:text-accent">
                      {step.label}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-ink dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-muted dark:text-white/65">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/docs"
                className="inline-flex items-center justify-center rounded-2xl bg-primary px-7 py-3.5 text-base font-semibold text-white transition hover:bg-primary-deep"
              >
                Read the docs
              </Link>
              <Link
                href="/privacy"
                className="inline-flex items-center justify-center rounded-2xl border border-black/8 px-7 py-3.5 text-base font-semibold text-ink transition hover:border-primary/50 hover:bg-black/[0.02] dark:border-white/10 dark:text-white dark:hover:bg-white/5"
              >
                Privacy details
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.05fr_0.95fr]">
            <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-black/8 dark:border-white/10">
              <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/15 to-transparent z-10" />
              <Image
                src="/images/about/about-image-01.webp"
                alt="SignalizeAI workflow preview"
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                quality={70}
                className="object-cover object-center"
              />
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  Built for live prospecting
                </p>
                <p className="mt-3 max-w-[320px] text-sm leading-7 text-white/80">
                  Use quick website checks when you are evaluating one account,
                  or scale into batch prospecting when the list is bigger.
                </p>
              </div>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-black/8 bg-black/[0.02] p-6 dark:border-white/10 dark:bg-dark-2">
                <span className="block text-5xl font-extrabold text-ink dark:text-white">
                  &lt;5s
                </span>
                <span className="mt-2 block text-base font-semibold text-primary dark:text-accent">
                  Typical time to insight
                </span>
                <span className="mt-2 block text-sm font-medium text-muted dark:text-white/50">
                  From active page to sales-ready context
                </span>
              </div>

              <div className="rounded-2xl border border-black/8 bg-white p-6 dark:border-white/10 dark:bg-dark-2">
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">Guardrails</p>
                <div className="mt-4 space-y-3">
                  {guardrails.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary dark:bg-accent/10 dark:text-accent">
                        <svg
                          className="h-3.5 w-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                      <p className="text-sm leading-7 text-muted dark:text-white/65">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative min-h-[180px] overflow-hidden rounded-2xl border border-black/8 dark:border-white/10">
                <Image
                  src="/images/about/about-image-02.webp"
                  alt="SignalizeAI research workflow"
                  fill
                  sizes="(max-width: 1023px) 100vw, 33vw"
                  quality={70}
                  className="object-cover object-center opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-accent/20" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
