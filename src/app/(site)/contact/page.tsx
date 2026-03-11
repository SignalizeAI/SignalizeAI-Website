import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | SignalizeAI",
  description:
    "Contact SignalizeAI for product support, privacy questions, workflow help, or team inquiries.",
};

const contactLanes = [
  {
    title: "Product support",
    description:
      "Questions about setup, analysis behavior, saved results, browser-specific issues, or unclear output.",
  },
  {
    title: "Privacy and permissions",
    description:
      "Questions about what SignalizeAI reads, what gets stored, and how the extension permissions map to functionality.",
  },
  {
    title: "Team and rollout questions",
    description:
      "Use this lane if your team needs higher-volume workflows, internal rollout help, or a product discussion.",
  },
];

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact"
        pageDescription="Get help with setup, workflows, privacy, or team-level questions."
      />

      <section className="bg-white py-16 dark:bg-[#000000] md:py-20 lg:py-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
                Before you send a message
              </span>
              <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
                Send the question to the right lane.
              </h2>
              <p className="mt-6 max-w-[620px] text-lg leading-8 text-slate-600 dark:text-white/65">
                The fastest support requests are specific. Include the browser,
                the kind of page you were analyzing, what you expected, and what
                actually happened.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/docs"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  Read docs first
                </Link>
                <Link
                  href="/privacy"
                  className="inline-flex items-center justify-center rounded-2xl border border-gray-300 px-6 py-3.5 text-sm font-semibold text-slate-900 transition hover:border-slate-500 hover:bg-gray-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                >
                  Privacy questions
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {contactLanes.map((lane) => (
                <div
                  key={lane.title}
                  className="rounded-[2rem] border border-gray-200 bg-gray-50/90 p-6 shadow-lg dark:border-white/10 dark:bg-white/5"
                >
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {lane.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-white/65">
                    {lane.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-16 dark:bg-[#050505] md:py-20 lg:py-24">
        <Contact variant="page" />
      </section>
    </>
  );
};

export default ContactPage;
