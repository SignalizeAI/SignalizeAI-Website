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
    question: "Which plans include batch prospecting and export?",
    answer:
      "Free is designed for lightweight single-site prospecting. Paid plans unlock batch prospecting, larger saved prospect capacity, and export where the plan includes it.",
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
          className="text-[#00e5ff] underline hover:opacity-80"
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
      "Saved prospects can include the target domain, generated sales insights, and timestamps so you can revisit, filter, and export later on supported plans.",
  },
  {
    question: "Where should I go if I need help?",
    answer: (
      <>
        Start with the{" "}
        <Link href="/docs" className="text-[#00e5ff] underline hover:opacity-80">
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
    <section className="relative z-20 overflow-hidden bg-white dark:bg-[#0a0a0a] pt-16 pb-12 lg:pt-28 lg:pb-20">
      <div className="container">
        <SectionTitle
          subtitle="FAQ"
          title="Questions that matter before you start"
          paragraph="These answers focus on workflow, plan differences, privacy, and where to go when you need help."
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
