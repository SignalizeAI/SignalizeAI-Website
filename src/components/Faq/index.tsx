import Link from "next/link";
import SectionTitle from "../Common/SectionTitle";
import SingleFaq from "./SingleFaq";

const faqItems = [
  {
    question: "What does SignalizeAI scan?",
    answer:
      "Only the publicly visible text on the page you are viewing. We do not collect or send personal data or browsing history to the AI.",
  },
  {
    question: "What does change detection actually do?",
    answer:
      "You save an account, and SignalizeAI stores a snapshot of its public pages. On a schedule it reads those pages again and compares the new read against the last one. When something moved on pricing, the careers page, the homepage message, or a new product page appeared, you get the before and after plus a suggested opener.",
  },
  {
    question: "How fast will I hear about a change?",
    answer:
      "Checks are scheduled, not real-time, and they run inside your browser while it is open. Free checks weekly, Pro every 48 hours, Team daily. If your browser is closed for a stretch, the check happens the next time it is running. We do not send email alerts and we do not guarantee delivery of any individual check.",
  },
  {
    question: "What will change detection miss?",
    answer:
      "Anything not visible in the public text of the pages we read. That means changes behind a login, inside images or PDFs, on sites that block automated requests, and anything that never reaches the website at all such as a funding round announced only on a news site. Small wording edits may also be reported as a messaging change when they are not meaningful.",
  },
  {
    question: "Which plans include batch prospecting and export?",
    answer:
      "Free covers 3 watched accounts, weekly checks, and 25 saved prospects. Paid plans raise the watch limit, check more often, keep change history, and unlock batch prospecting and export.",
  },
  {
    question: "When should I use quick website check versus batch prospecting?",
    answer:
      "Use quick website check when you want fast selling context on one account. Use batch prospecting when you need to score and prioritize a larger target list.",
  },
  {
    question: "Do you track users or sell data?",
    answer: (
      <>
        No. SignalizeAI does not track you, run ads, or sell data. We respect{" "}
        <a
          href="/privacy"
          className="text-primary underline underline-offset-2 hover:text-primary-deep dark:text-accent dark:hover:text-accent/80"
        >
          privacy
        </a>{" "}
        and only process public website content.
      </>
    ),
  },
  {
    question: "What gets saved in a saved prospect?",
    answer:
      "The target domain, the generated sales insights, timestamps, and a snapshot of the page content. That snapshot is what a later check gets compared against, so saving an account is what makes change detection possible for it.",
  },
  {
    question: "Where should I go if I need help?",
    answer: (
      <>
        Start with the{" "}
        <Link
          href="/docs"
          className="text-primary underline underline-offset-2 hover:text-primary-deep dark:text-accent dark:hover:text-accent/80"
        >
          documentation
        </Link>{" "}
        for setup and workflow details, then use Discord or email support if
        you need direct help.
      </>
    ),
  },
];

const Faq = () => {
  return (
    <section className="relative z-20 overflow-hidden bg-white dark:bg-dark pt-16 pb-12 lg:pt-28 lg:pb-20">
      <div className="container">
        <SectionTitle
          subtitle="FAQ"
          title="Questions that matter before you start"
          paragraph="These answers focus on how change detection works, what it cannot see, plan differences, privacy, and where to go when you need help."
          width="640px"
          center
        />

        <div className="-mx-4 mt-15 grid gap-y-2 lg:mt-20 lg:grid-cols-2">
          {faqItems.map((item) => (
            <div key={item.question} className="px-4">
              <SingleFaq question={item.question} answer={item.answer} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
