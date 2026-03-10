import Link from "next/link";

const resourceCards = [
  {
    title: "Documentation",
    description:
      "Read setup, workflows, outputs, privacy, and troubleshooting in one place.",
    href: "/docs",
    cta: "Open docs",
  },
  {
    title: "Plans and limits",
    description:
      "Compare analysis volume, batch limits, saved-analysis capacity, and export access.",
    href: "/pricing",
    cta: "View pricing",
  },
  {
    title: "Support channels",
    description:
      "Use Discord, email, or privacy resources when you need product help or answers.",
    href: "/#contact",
    cta: "Contact us",
  },
];

const trustPoints = [
  "Public website content only",
  "Batch analysis on supported plans",
  "Saved analyses and export where available",
];

const CallToAction = () => {
  return (
    <section className="relative z-10 overflow-hidden bg-white py-16 dark:bg-[#000000] md:py-24 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-[2.75rem] border border-gray-200 bg-gray-50/70 p-8 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-[#0a0a0a]/70 md:p-12 lg:p-16">
          <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-primary/10 blur-[110px]" />
          <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-accent/10 blur-[110px]" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-primary uppercase dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                Next steps
              </span>

              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                Use the rest of the site
                <span className="mt-2 block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  without hitting the same message twice.
                </span>
              </h2>

              <p className="mt-6 max-w-[540px] text-lg leading-8 text-slate-600 dark:text-white/65">
                The homepage should explain the product. Everything after that
                should help you go deeper. Use docs for guidance, pricing for
                limits, and support when you need help or policy clarity.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  Explore documentation
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-white dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  Compare plans
                </Link>
              </div>

              <div className="mt-8 grid gap-3">
                {trustPoints.map((point) => (
                  <div key={point} className="flex items-start gap-3">
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
                    <p className="text-sm leading-7 text-slate-600 dark:text-white/65">
                      {point}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              {resourceCards.map((card) => (
                <Link
                  key={card.title}
                  href={card.href}
                  className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl dark:border-white/10 dark:bg-[#111111]"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent dark:via-accent/60" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {card.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
                        {card.description}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_20px_40px_-20px_rgba(26,35,126,0.5)] dark:text-black">
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3 dark:text-accent">
                    {card.cta}
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.2}
                        d="M5 12h14m-5-5l5 5-5 5"
                      />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
