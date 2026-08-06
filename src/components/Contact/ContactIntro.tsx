import Link from "next/link";
import { supportTopics } from "./contactContent";

const ContactIntro = ({ variant = "home" }: { variant?: "home" | "page" }) => {
  const isPageVariant = variant === "page";
  const title = isPageVariant ? "How can we help?" : "Need product help or a direct answer?";
  const description = isPageVariant
    ? "Tell us what you were trying to do and what happened. We'll get back to you as soon as possible."
    : "Use the contact page for the full support form, product questions, privacy clarifications, and team-level requests.";
  const introGridClass = isPageVariant
    ? "flex flex-col gap-6"
    : "grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start";

  const introBody = (
    <div className={introGridClass}>
      <div>
        {isPageVariant && (
          <p className="text-[11px] font-medium uppercase tracking-[0.11em] text-primary/70 dark:text-accent/70">
            Support & Help
          </p>
        )}
        {!isPageVariant && (
          <span className="inline-flex rounded-full border border-primary/15 bg-primary/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-primary dark:border-accent/20 dark:bg-accent/10 dark:text-accent">
            Contact
          </span>
        )}
        <h2 className="mb-5 mt-6 text-3xl font-extrabold leading-tight tracking-tight text-ink dark:text-white sm:text-4xl">
          {title}
        </h2>
        <p className="max-w-[560px] text-base leading-8 text-muted dark:text-white/65">
          {description}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
          {!isPageVariant && (
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-2xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-deep dark:bg-white dark:text-ink dark:hover:bg-black/[0.06]"
            >
              Open contact page
            </Link>
          )}
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-2xl bg-ink px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-deep dark:bg-white dark:text-ink dark:hover:bg-black/[0.06]"
          >
            {isPageVariant ? "Read docs first" : "Check docs first"}
          </Link>
          {isPageVariant && (
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center rounded-2xl border border-black/10 px-6 py-3.5 text-sm font-semibold text-ink transition hover:border-primary/50 hover:bg-black/[0.02] dark:border-white/15 dark:text-white dark:hover:bg-white/5"
            >
              Privacy questions
            </Link>
          )}
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-2">
        {supportTopics.map((topic) => (
          <div
            key={topic.title}
            className="h-full min-h-[132px] rounded-2xl border border-black/8 bg-black/[0.02] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/35 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 sm:p-6"
          >
            <h3 className="text-lg font-bold text-ink dark:text-white">{topic.title}</h3>
            <p className="mt-3 text-sm leading-7 text-muted dark:text-white/65">{topic.body}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (isPageVariant) {
    return introBody;
  }

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] border border-black/8 bg-white p-8 shadow-2xl dark:border-white/10 dark:bg-dark sm:p-10 lg:p-12">
      {introBody}
    </div>
  );
};

export default ContactIntro;
