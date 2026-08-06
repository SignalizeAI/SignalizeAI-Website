import dynamic from "next/dynamic";
import { Metadata } from "next";
import Hero from "@/components/Hero";

const DeferredAbout = dynamic(() => import("@/components/About"));
const DeferredFeatures = dynamic(() => import("@/components/Features"));
const DeferredPricingTeaserSection = dynamic(() => import("@/components/Pricing/TeaserSection"));
const DeferredCallToAction = dynamic(() => import("@/components/CallToAction"));
const DeferredFaq = dynamic(() => import("@/components/Faq"));
const DeferredContact = dynamic(() => import("@/components/Contact"));

export const metadata: Metadata = {
  title: {
    absolute: "SignalizeAI | Home",
  },
  description:
    "Know when your target accounts change. SignalizeAI turns any company website into a sales brief, then re-checks it and tells you what changed since last time.",
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/logo/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/images/logo/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
    ],
    apple: [
       { url: '/images/logo/favicon.png' },
    ],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <DeferredAbout />
      <DeferredFeatures />
      <DeferredPricingTeaserSection />
      <DeferredCallToAction />
      {/* <Testimonials /> */}
      <DeferredFaq />
      {/* <Team /> */}
      {/* <HomeBlogSection posts={posts} /> */}
      <DeferredContact />
      {/* <Clients /> */}
      <section
        style={{
          position: "absolute",
          left: "-9999px",
          top: "auto",
          width: "1px",
          height: "1px",
          overflow: "hidden",
        }}
        aria-hidden="true"
      >
        <h1>SignalizeAI</h1>

        <p>
          SignalizeAI is a B2B sales prospecting and account monitoring
          extension for Chrome and Firefox. It turns any business website into
          a sales brief, then watches that account for changes worth reaching
          out about.
        </p>

        <h2>Account change detection</h2>

        <p>
          Save the companies you sell to and SignalizeAI re-checks their public
          pages on a schedule, comparing each read against the last one. It
          reports pricing page changes, new job postings, rewritten homepage
          messaging, and new product pages, with a suggested outreach opener
          written from the change.
        </p>

        <h2>Company research and outreach</h2>

        <p>
          Run a check on any public company page for what they do, their target
          customer, their value proposition, the buyer persona most likely to
          care, and a suggested outreach angle. Generate cold outreach emails
          and follow-up emails from the same record. Batch prospecting handles a
          pasted list of URLs or a CSV and exports to CSV or Excel.
        </p>

        <h2>Who it is for</h2>

        <p>
          Founders selling their own product, first sales hires, SDRs and AEs at
          small teams, and agency owners running outbound who already have a
          named list of target accounts and no research team behind them.
        </p>
      </section>
    </main>
  );
}
