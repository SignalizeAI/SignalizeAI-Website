import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation | SignalizeAI",
  description:
    "SignalizeAI documentation for setup, workflows, outputs, access, privacy, and troubleshooting.",
};

const docsNav = [
  { href: "#getting-started", label: "Getting Started" },
  { href: "#workflows", label: "Workflows" },
  { href: "#outputs", label: "Outputs" },
  { href: "#access", label: "Access" },
  { href: "#privacy", label: "Privacy" },
  { href: "#troubleshooting", label: "Troubleshooting" },
];

const heroFacts = [
  { label: "Format", value: "Product docs" },
  { label: "Focus", value: "Usage + safeguards" },
  { label: "Scope", value: "Single + batch workflows" },
];

const browserLinks = [
  {
    label: "Install on Chrome",
    href: "https://chromewebstore.google.com/detail/nhgeihbbpdnhcfccedpnkionaofdpaib",
  },
  {
    label: "Install on Firefox",
    href: "https://addons.mozilla.org/en-US/firefox/addon/signalizeai/",
  },
];

const gettingStartedSteps = [
  {
    title: "Install the extension",
    description:
      "Add SignalizeAI to Chrome or Firefox and keep it pinned so it is available when you are reviewing public business sites.",
  },
  {
    title: "Open a public company page",
    description:
      "Use a homepage, product page, or pricing page where the business clearly explains what it sells and who it serves.",
  },
  {
    title: "Run a quick website check",
    description:
      "SignalizeAI reads visible page content on demand and converts it into a sales-focused brief instead of generic metadata.",
  },
  {
    title: "Decide what happens next",
    description:
      "Continue with batch analysis, save the result for follow-up, or move the insight into your outreach workflow.",
  },
];

const workflowCards = [
  {
    eyebrow: "Single analysis",
    title: "Quick website check",
    description:
      "Use SignalizeAI on the active tab when you need fast context on one account without leaving the page.",
    points: [
      "Runs on the page you are currently viewing",
      "Uses public visible website content only",
      "Best for quick qualification and outreach prep",
    ],
  },
  {
    eyebrow: "Scaled research",
    title: "Batch analysis",
    description:
      "Run research across multiple companies from a pasted URL list or CSV when one-by-one review is too slow.",
    points: [
      "Useful for prospecting sprints and market sweeps",
      "Supports user-submitted URL lists",
      "Availability depends on plan capabilities",
    ],
  },
  {
    eyebrow: "Ongoing workflow",
    title: "Saved analyses",
    description:
      "Keep important results accessible so you can return later, filter what matters, and export when the workflow requires it.",
    points: [
      "Useful when research spans more than one session",
      "Supports revisiting and organizing useful accounts",
      "Search, filtering, and export depend on plan access",
    ],
  },
];

const outputCards = [
  {
    title: "Business summary",
    description:
      "A concise explanation of what the company appears to do and how it presents itself.",
  },
  {
    title: "Target customer",
    description:
      "The likely buyer segment inferred from messaging, offer structure, and page context.",
  },
  {
    title: "Value proposition",
    description:
      "The most obvious product or service angle surfaced from the public copy.",
  },
  {
    title: "Recommended persona",
    description:
      "The role most likely to care about the problem or budget signaled by the site.",
  },
  {
    title: "Readiness signal",
    description:
      "A directional indicator for how ready the account appears for outreach and why.",
  },
  {
    title: "Exportable working set",
    description:
      "When supported, saved analyses can become a reusable set for filtering, export, and follow-up.",
  },
];

const accessCards = [
  {
    title: "Quick website check",
    availability: "Available to all users",
    description:
      "The core single-page workflow for active-tab analysis and immediate context generation.",
  },
  {
    title: "Batch analysis",
    availability: "Plan-dependent",
    description:
      "Used when you need to process multiple domains at once rather than manually review each site.",
  },
  {
    title: "Saved analyses",
    availability: "Plan-dependent",
    description:
      "Storage, organization features, and export access vary by plan and should be compared on the pricing page.",
  },
];

const privacyPoints = [
  "SignalizeAI analyzes public website content on demand rather than monitoring general browsing.",
  "The extension does not collect form inputs, cookies, or private account data.",
  "API keys stay server-side and requests are rate-limited.",
  "Saved analyses are optional and tied to the authenticated user account.",
  "Users can remove saved analyses through the product interface.",
];

const permissions = [
  {
    title: "activeTab",
    description: "Access the current tab only when you request analysis.",
  },
  {
    title: "tabs",
    description: "Read the active page URL for analysis context.",
  },
  {
    title: "scripting",
    description: "Inject the extraction script into the page on demand.",
  },
  {
    title: "storage",
    description: "Store preferences and local extension state.",
  },
  {
    title: "sidePanel / sidebar_action",
    description: "Render the SignalizeAI UI inside the browser side panel or sidebar.",
  },
  {
    title: "host permissions",
    description:
      "Allow secure requests to SignalizeAI services, Supabase, and requested analysis targets.",
  },
];

const troubleshootingCards = [
  {
    title: "Nothing happens when I run a check",
    description:
      "Refresh the page and retry on a public website. Browser-protected tabs, PDFs, and restricted pages do not allow content scripts.",
  },
  {
    title: "The output feels too thin",
    description:
      "Try a stronger page source such as the homepage, product page, or pricing page where the business explains itself clearly.",
  },
  {
    title: "Batch analysis is unavailable",
    description:
      "Batch analysis is not a universal feature. Check plan access if the workflow is not available in your account.",
  },
  {
    title: "Saved analyses are missing",
    description:
      "Confirm you are signed in to the same account used when the analyses were created.",
  },
];

const DocsPage = () => {
  return (
    <main className="bg-white dark:bg-[#000000]">
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
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                SignalizeAI documentation
              </div>

              <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-[64px] lg:leading-[1.02]">
                Setup, workflows,
                <br className="hidden sm:block" />
                outputs, safeguards
                <span className="block bg-gradient-to-r from-primary via-blue-500 to-accent bg-clip-text text-transparent">
                  without the marketing fluff.
                </span>
              </h1>

              <p className="mt-8 max-w-[720px] text-lg leading-8 text-slate-600 dark:text-white/68 sm:text-xl">
                This guide explains how SignalizeAI works in practice: how to
                get started, when to use single-page analysis versus batch
                workflows, what the output means, and how privacy and access are
                handled.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                {browserLinks.map((browser) => (
                  <Link
                    key={browser.label}
                    href={browser.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-7 py-4 text-base font-bold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    {browser.label}
                  </Link>
                ))}
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-7 py-4 text-base font-bold text-slate-900 transition hover:border-slate-500 hover:bg-white dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  Privacy details
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2.25rem] border border-gray-200 bg-white/90 p-6 shadow-2xl backdrop-blur-xl dark:border-white/10 dark:bg-[#0a0a0a]/90 sm:p-8">
                <div className="rounded-[1.75rem] border border-gray-200 bg-gray-50/90 p-6 dark:border-white/10 dark:bg-[#101010]">
                  <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary dark:text-accent">
                        Guide coverage
                      </p>
                      <h2 className="mt-3 max-w-[12ch] text-[2rem] font-black leading-[1.05] tracking-tight text-slate-900 dark:text-white sm:max-w-none sm:text-3xl">
                        One documentation surface, not six disconnected cards
                      </h2>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-[0_20px_40px_-20px_rgba(26,35,126,0.45)] dark:text-black sm:h-14 sm:w-14">
                      <svg
                        className="h-6 w-6 sm:h-7 sm:w-7"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6M7 4h10a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2z"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {heroFacts.map((fact) => (
                      <div
                        key={fact.label}
                        className="rounded-2xl border border-gray-200 bg-white px-4 py-4 dark:border-white/10 dark:bg-white/5"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400 dark:text-white/35">
                          {fact.label}
                        </p>
                        <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">
                          {fact.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-gray-200 bg-white p-5 dark:border-white/10 dark:bg-white/5">
                    <p className="text-sm leading-7 text-slate-600 dark:text-white/65">
                      Use this page to understand how SignalizeAI behaves. Use
                      the pricing page only when you need billing or plan
                      comparison. Use privacy when the question is about data
                      handling or permissions.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {browserLinks.map((browser) => (
                        <Link
                          key={browser.label}
                          href={browser.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                        >
                          {browser.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-16 lg:pb-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]">
                <div className="border-b border-gray-200 px-6 py-5 dark:border-white/10">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary dark:text-accent">
                    On this page
                  </p>
                </div>

                <nav className="px-4 py-4">
                  <div className="space-y-2">
                    {docsNav.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="block rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-gray-50 hover:text-slate-950 dark:text-white/70 dark:hover:bg-white/5 dark:hover:text-white"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </nav>
              </div>
            </aside>

            <div className="space-y-8">
              <section
                id="getting-started"
                className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]"
              >
                <div className="border-b border-gray-200 px-8 py-7 dark:border-white/10 md:px-10">
                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                    Getting started
                  </span>
                  <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Start here before you think about edge cases
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/65">
                    These steps establish the normal use path. If the basics are
                    unclear, the rest of the documentation will feel more
                    complicated than it needs to.
                  </p>
                </div>

                <div className="px-8 py-8 md:px-10">
                  <div className="space-y-6">
                    {gettingStartedSteps.map((step, index) => (
                      <div
                        key={step.title}
                        className="grid gap-4 rounded-[1.75rem] border border-gray-200 bg-gray-50/80 p-5 dark:border-white/10 dark:bg-white/5 md:grid-cols-[72px_minmax(0,1fr)]"
                      >
                        <div className="flex items-start">
                          <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-gradient-to-r from-primary to-accent text-lg font-black text-white dark:text-black">
                            {index + 1}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {step.title}
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="workflows"
                className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-gray-50/80 shadow-xl dark:border-white/10 dark:bg-[#060606]"
              >
                <div className="px-8 py-7 md:px-10">
                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                    Workflows
                  </span>
                  <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    The product has three main workflow modes
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/65">
                    The goal here is not to repeat the homepage. It is to show
                    when each mode is appropriate and what users should expect
                    from it.
                  </p>
                </div>

                <div className="grid gap-4 px-8 pb-8 md:px-10 lg:grid-cols-3">
                  {workflowCards.map((card, index) => (
                    <div
                      key={card.title}
                      className="group relative overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[#0d0d0d]"
                    >
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent dark:via-accent/60" />
                      <div className="mb-6 flex items-center justify-between gap-4">
                        <span className="text-xs font-semibold uppercase tracking-[0.24em] text-primary dark:text-accent">
                          {card.eyebrow}
                        </span>
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-sm font-black text-primary dark:bg-accent/10 dark:text-accent">
                          0{index + 1}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                        {card.title}
                      </h3>
                      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/65">
                        {card.description}
                      </p>

                      <div className="mt-6 space-y-3">
                        {card.points.map((point) => (
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
                  ))}
                </div>
              </section>

              <section
                id="outputs"
                className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]"
              >
                <div className="grid gap-0 xl:grid-cols-[0.85fr_1.15fr]">
                  <div className="border-b border-gray-200 bg-gray-50/80 px-8 py-8 dark:border-white/10 dark:bg-white/5 md:px-10 xl:border-b-0 xl:border-r">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                      Output reference
                    </span>
                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                      What each run is trying to tell you
                    </h2>
                    <p className="mt-4 text-base leading-8 text-slate-600 dark:text-white/65">
                      SignalizeAI output is meant to be actionable for sales and
                      research, not just descriptive. The fields below are the
                      main pieces of context the product surfaces.
                    </p>
                  </div>

                  <div className="grid gap-4 px-8 py-8 md:px-10 lg:grid-cols-2">
                    {outputCards.map((item) => (
                      <div
                        key={item.title}
                        className="rounded-[1.75rem] border border-gray-200 bg-gray-50/90 p-5 dark:border-white/10 dark:bg-white/5"
                      >
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>
                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              <section
                id="access"
                className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-gray-50/80 shadow-xl dark:border-white/10 dark:bg-[#060606]"
              >
                <div className="px-8 py-7 md:px-10">
                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                    Access and availability
                  </span>
                  <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Understand which workflows are available
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/65">
                    This section explains which product capabilities exist and
                    how they generally fit. Billing, subscription changes, and
                    live plan comparison belong on the pricing page.
                  </p>
                </div>

                <div className="grid gap-4 px-8 pb-8 md:px-10 md:grid-cols-2 xl:grid-cols-3">
                  {accessCards.map((card) => (
                    <div
                      key={card.title}
                      className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#0d0d0d]"
                    >
                      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {card.title}
                        </h3>
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary dark:bg-accent/10 dark:text-accent">
                          {card.availability}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-white/65">
                        {card.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="px-8 pb-8 md:px-10">
                  <Link
                    href="/pricing"
                    className="inline-flex items-center rounded-2xl border border-gray-300 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-white dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                  >
                    View pricing separately
                  </Link>
                </div>
              </section>

              <section
                id="privacy"
                className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0a0a]"
              >
                <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                  <div className="border-b border-gray-200 px-8 py-8 dark:border-white/10 md:px-10 lg:border-b-0 lg:border-r">
                    <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                      Privacy and security
                    </span>
                    <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                      Built for on-demand analysis, not passive tracking
                    </h2>
                    <div className="mt-6 space-y-4">
                      {privacyPoints.map((point) => (
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

                    <div className="mt-8">
                      <Link
                        href="/privacy"
                        className="inline-flex items-center rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                      >
                        Read full privacy policy
                      </Link>
                    </div>
                  </div>

                  <div className="bg-slate-950 px-8 py-8 text-white dark:bg-[#0b0b0b] md:px-10">
                    <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                      Browser permissions
                    </span>
                    <div className="mt-6 grid gap-4">
                      {permissions.map((permission) => (
                        <div
                          key={permission.title}
                          className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5"
                        >
                          <p className="font-mono text-sm font-semibold text-accent">
                            {permission.title}
                          </p>
                          <p className="mt-2 text-sm leading-7 text-white/65">
                            {permission.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section
                id="troubleshooting"
                className="overflow-hidden rounded-[2.5rem] border border-gray-200 bg-gray-50/80 shadow-xl dark:border-white/10 dark:bg-[#060606]"
              >
                <div className="px-8 py-7 md:px-10">
                  <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                    Troubleshooting and support
                  </span>
                  <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                    Fix common problems without leaving the page
                  </h2>
                  <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-white/65">
                    Most issues come down to unsupported pages, weak source
                    pages, or account and access mismatches. Start here before
                    escalating.
                  </p>
                </div>

                <div className="grid gap-4 px-8 pb-8 md:px-10 md:grid-cols-2">
                  {troubleshootingCards.map((item) => (
                    <div
                      key={item.title}
                      className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#0d0d0d]"
                    >
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {item.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="px-8 pb-8 md:px-10">
                  <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-lg dark:border-white/10 dark:bg-[#0d0d0d] md:p-8">
                    <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
                      <div>
                        <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                          Need direct help?
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 dark:text-white/65">
                          Use Discord for fast product questions, GitHub for
                          code visibility, and privacy documentation when the
                          question is specifically about data handling.
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                        <Link
                          href="https://discord.gg/eCvhD6WZhX"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                        >
                          Join Discord
                        </Link>
                        <Link
                          href="https://github.com/SignalizeAI"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                        >
                          View GitHub
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DocsPage;
