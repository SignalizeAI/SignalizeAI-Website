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
    "Sell to any company. SignalizeAI gives you sales-ready insights and outreach in seconds.",
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
          SignalizeAI helps reps and GTM teams turn any business website into a
          fast, sales-ready brief.
        </p>

        <p>
          It surfaces who to target, how to frame outreach, and what matters
          before you send the first message.
        </p>

        <h2>Key Capabilities</h2>

        <p>
          SignalizeAI gives you sales-ready insights and outreach in seconds.
        </p>

        <p>
          That means faster targeting, sharper messaging, and less manual prep
          before outreach.
        </p>

        <h2>Who It Is For</h2>

        <p>
          SignalizeAI is built for reps, founders, and GTM teams who need to
          decide fast who to target and how to sell.
        </p>
      </section>
    </main>
  );
}
