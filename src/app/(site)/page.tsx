import About from "@/components/About";
// import HomeBlogSection from "@/components/Blog/HomeBlogSection";
import CallToAction from "@/components/CallToAction";
// import Clients from "@/components/Clients";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import PricingTeaserSection from "@/components/Pricing/TeaserSection";
import dynamic from "next/dynamic";
// import Team from "@/components/Team";
// import Testimonials from "@/components/Testimonials";
// import { getAllPosts } from "@/utils/markdown";
import { Metadata } from "next";

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
  // const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);

  return (
    <main>
      <Hero />
      <About />
      <Features />
      <PricingTeaserSection />
      <CallToAction />
      {/* <Testimonials /> */}
      <Faq />
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
