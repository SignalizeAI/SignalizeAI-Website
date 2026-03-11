import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | SignalizeAI",
  description: "Privacy Policy for the SignalizeAI Chrome and Firefox extension.",
};

const tocItems = [
  { href: "#information-we-collect", label: "1. Information We Collect" },
  { href: "#how-we-use-data", label: "2. How We Use Data" },
  { href: "#ai-processing", label: "3. AI Processing" },
  { href: "#data-storage-security", label: "4. Data Storage & Security" },
  { href: "#permissions-explanation", label: "5. Permissions Explanation" },
  { href: "#data-retention-deletion", label: "6. Data Retention & Deletion" },
  { href: "#third-party-services", label: "7. Third-Party Services" },
  { href: "#childrens-privacy", label: "8. Children's Privacy" },
  { href: "#changes-to-policy", label: "9. Changes to this Policy" },
  { href: "#contact-us", label: "10. Contact Us" },
];

const checklistClass =
  "flex items-start gap-3 text-sm leading-7 text-slate-700 dark:text-white/70";

const bulletIcon = (
  <svg
    className="mt-1 h-5 w-5 shrink-0 text-primary dark:text-accent"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white text-slate-800 dark:from-[#020202] dark:via-[#060606] dark:to-[#020202] dark:text-white">
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[140px] dark:bg-primary/15" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 translate-x-1/4 translate-y-1/4 rounded-full bg-accent/10 blur-[140px]" />

        <section className="relative z-10 px-6 pt-32 pb-14 sm:pt-40 sm:pb-18">
          <div className="mx-auto max-w-6xl">
            <div className="rounded-[2.25rem] border border-slate-200 bg-white/85 p-8 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.28)] backdrop-blur-sm dark:border-white/10 dark:bg-white/5 dark:shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] sm:p-10 lg:p-12">
              <div className="max-w-4xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-current"></span>
                  </span>
                  Last updated: March 9, 2026
                </div>

                <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                  Privacy Policy
                </h1>

                <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-600 dark:text-white/68">
                  This page explains what SignalizeAI processes, what can be
                  stored in your account, and how permissions are used across
                  Chrome and Firefox.
                </p>

                <p className="mt-4 max-w-3xl text-base leading-8 text-slate-500 dark:text-white/52">
                  The product is designed for analysis of publicly available
                  business websites. It does not access private pages, form
                  entries, cookies, or session data.
                </p>

                <div className="mt-8 grid gap-3 md:grid-cols-2">
                  <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50/90 px-5 py-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
                      Scope
                    </p>
                    <p className="mt-2 text-sm font-medium leading-7 text-slate-700 dark:text-white/68">
                      Public pages and URLs you intentionally submit.
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-slate-200 bg-slate-50/90 px-5 py-4 dark:border-white/10 dark:bg-white/[0.04]">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
                      Storage
                    </p>
                    <p className="mt-2 text-sm font-medium leading-7 text-slate-700 dark:text-white/68">
                      Saved analyses are optional and tied to your account.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 px-6 pb-20">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary dark:text-accent">
                  Policy sections
                </p>
                <div className="mt-4 space-y-2">
                  {tocItems.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-950 dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </aside>

            <div className="rounded-[2rem] border border-slate-200 bg-white/92 p-8 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.28)] backdrop-blur-sm dark:border-white/10 dark:bg-[#0b0b0b]/92 dark:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.7)] sm:p-10">
              <div className="space-y-12">
                <section id="information-we-collect">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">1.</span>
                    Information We Collect
                  </h2>

                  <div className="space-y-6 border-l-2 border-primary/20 pl-0 sm:pl-8 dark:border-accent/20">
                    <div>
                      <h3 className="mb-2 text-lg font-medium text-slate-950 dark:text-white">
                        1.1 Website Content
                      </h3>
                      <p className="mb-3 leading-8 text-slate-700 dark:text-white/70">
                        SignalizeAI processes publicly available content from
                        the active browser tab (single analysis) and from
                        user-submitted URLs in batch mode (CSV upload or pasted
                        URL list), including page titles, meta descriptions,
                        headings, and visible text. This data is used only to
                        generate on-screen analysis for the user and may require
                        injecting a content script into the active tab on
                        demand.
                      </p>
                      <div>
                        <span className="mb-2 block text-sm font-semibold text-slate-950 dark:text-white">
                          We do NOT collect:
                        </span>
                        <ul className="grid gap-3 text-sm">
                          {[
                            "Private/Password-protected pages",
                            "User form inputs",
                            "Cookies or session data",
                          ].map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-2 text-slate-700 dark:text-white/70"
                            >
                              <svg
                                className="mt-0.5 h-4 w-4 shrink-0 text-red-500 dark:text-red-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium text-slate-950 dark:text-white">
                        1.2 URL Inputs for Batch Analysis
                      </h3>
                      <p className="leading-8 text-slate-700 dark:text-white/70">
                        If a user runs batch analysis, SignalizeAI processes the
                        URL list they provide (via CSV or pasted text) to fetch
                        publicly available website content and generate
                        analyses.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium text-slate-950 dark:text-white">
                        1.3 User Account Information
                      </h3>
                      <p className="leading-8 text-slate-700 dark:text-white/70">
                        If a user chooses to sign in using Google, we receive
                        their email address and name via secure authentication
                        handled by Supabase.
                      </p>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium text-slate-950 dark:text-white">
                        1.4 Saved Analyses (Optional)
                      </h3>
                      <p className="leading-8 text-slate-700 dark:text-white/70">
                        If enabled by the user, saved analyses may include the
                        domain name, generated insights, and a timestamp. This
                        data is private and accessible only to the authenticated
                        user.
                      </p>
                    </div>
                  </div>
                </section>

                <section id="how-we-use-data">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">2.</span>
                    How We Use Data
                  </h2>
                  <div className="sm:pl-8">
                    <p className="mb-4 text-slate-700 dark:text-white/70">
                      Collected data is used strictly to:
                    </p>
                    <ul className="mb-6 space-y-3">
                      {[
                        "Generate AI-based business insights",
                        "Display results within the extension",
                        "Run user-requested batch analyses",
                        "Save user-requested analyses",
                        "Improve extension functionality and user experience",
                      ].map((item) => (
                        <li key={item} className={checklistClass}>
                          {bulletIcon}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm italic text-slate-500 dark:text-white/45">
                      We do not sell, share, or use data for advertising or
                      tracking.
                    </p>
                  </div>
                </section>

                <section id="ai-processing">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">3.</span>
                    AI Processing
                  </h2>
                  <div className="sm:pl-8">
                    <p className="mb-4 text-slate-700 dark:text-white/70">
                      SignalizeAI uses a third-party AI API to generate
                      insights.
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Only extracted website text is sent for analysis",
                        "No personal user data is sent to the AI service",
                        "API requests are rate-limited and secured server-side",
                        "AI responses are generated on-demand and are not used to train models",
                      ].map((item) => (
                        <li key={item} className={checklistClass}>
                          {bulletIcon}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section id="data-storage-security">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">4.</span>
                    Data Storage & Security
                  </h2>
                  <div className="sm:pl-8">
                    <ul className="space-y-3">
                      {[
                        "Authentication and saved data are stored using Supabase.",
                        "API keys are never exposed in the extension (client-side).",
                        "All backend requests are protected via origin checks and rate limiting.",
                        "Industry-standard security practices are followed for data encryption.",
                      ].map((item) => (
                        <li key={item} className={checklistClass}>
                          {bulletIcon}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section id="permissions-explanation">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">5.</span>
                    Permissions Explanation
                  </h2>
                  <div className="sm:pl-8">
                    <p className="mb-4 text-slate-700 dark:text-white/70">
                      SignalizeAI requests the following permissions only for
                      core functionality:
                    </p>
                    <ul className="space-y-3">
                      {[
                        {
                          title: "activeTab",
                          desc: "Access the active tab when the user runs an analysis",
                        },
                        {
                          title: "tabs",
                          desc: "Identify the active tab and read its URL for context",
                        },
                        {
                          title: "scripting",
                          desc: "Inject the content extraction script into the active tab",
                        },
                        { title: "storage", desc: "Save user preferences" },
                        {
                          title: "sidePanel / sidebar_action",
                          desc: "Display analysis UI (Chrome side panel, Firefox sidebar)",
                        },
                        {
                          title: "host permissions",
                          desc: "Allow requests to Supabase, SignalizeAI API environments, and user-requested analysis targets across domains",
                        },
                      ].map((perm) => (
                        <li key={perm.title} className={checklistClass}>
                          {bulletIcon}
                          <span>
                            <strong className="text-slate-950 dark:text-white">
                              {perm.title}:
                            </strong>{" "}
                            {perm.desc}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section id="data-retention-deletion">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">6.</span>
                    Data Retention & Deletion
                  </h2>
                  <div className="sm:pl-8">
                    <p className="mb-4 text-slate-700 dark:text-white/70">
                      We adhere to strict data retention policies:
                    </p>
                    <ul className="space-y-3">
                      {[
                        "Users may delete specific saved analyses at any time via the extension interface.",
                        "Users may sign out to remove extension access to their account.",
                        "Upon full account deletion request, all user data is permanently removed from our systems.",
                      ].map((item) => (
                        <li key={item} className={checklistClass}>
                          {bulletIcon}
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>

                <section id="third-party-services">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">7.</span>
                    Third-Party Services
                  </h2>
                  <div className="sm:pl-8">
                    <p className="mb-4 text-slate-700 dark:text-white/70">
                      SignalizeAI integrates with the following services:
                    </p>
                    <ul className="mb-4 space-y-2 text-slate-700 dark:text-white/70">
                      <li>
                        <strong className="text-slate-950 dark:text-white">
                          Google OAuth:
                        </strong>{" "}
                        For secure authentication.
                      </li>
                      <li>
                        <strong className="text-slate-950 dark:text-white">
                          Supabase:
                        </strong>{" "}
                        For database storage and authentication management.
                      </li>
                      <li>
                        <strong className="text-slate-950 dark:text-white">
                          AI API Provider:
                        </strong>{" "}
                        For processing text and generating insights.
                      </li>
                    </ul>
                    <p className="text-sm italic text-slate-500 dark:text-white/45">
                      Each service operates under its own privacy policy, which
                      governs their respective data handling practices.
                    </p>
                  </div>
                </section>

                <section id="childrens-privacy">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">8.</span>
                    Children&apos;s Privacy
                  </h2>
                  <div className="sm:pl-8">
                    <p className="text-slate-700 dark:text-white/70">
                      SignalizeAI is not intended for users under the age of 13.
                      We do not knowingly collect data from children.
                    </p>
                  </div>
                </section>

                <section id="changes-to-policy">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">9.</span>
                    Changes to this Policy
                  </h2>
                  <div className="sm:pl-8">
                    <p className="text-slate-700 dark:text-white/70">
                      This Privacy Policy may be updated from time to time. Any
                      changes will be reflected on this page with an updated
                      date.
                    </p>
                  </div>
                </section>

                <section id="contact-us">
                  <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-slate-950 dark:text-white">
                    <span className="text-primary dark:text-accent">10.</span>
                    Contact Us
                  </h2>
                  <div className="sm:pl-8">
                    <p className="mb-6 text-slate-700 dark:text-white/70">
                      If you have any questions or concerns regarding privacy,
                      please reach out to us directly at{" "}
                      <a
                        href="mailto:privacy@signalizeai.org"
                        className="font-semibold text-primary hover:underline dark:text-accent"
                      >
                        privacy@signalizeai.org
                      </a>
                      .
                    </p>
                  </div>
                </section>
              </div>

              <div className="mt-12 rounded-[1.75rem] border border-slate-200 bg-slate-50 px-6 py-6 dark:border-white/10 dark:bg-white/5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-950 dark:text-white">
                      Need product context too?
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-white/65">
                      Privacy explains data handling. For setup, workflows, and
                      feature behavior, use the docs.
                    </p>
                  </div>
                  <Link
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                  >
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
