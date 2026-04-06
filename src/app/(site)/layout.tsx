import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

export const metadata: Metadata = {
  description:
    "Find the right angle to sell to any company in seconds. Get clear strategy, targeting, and outreach you can actually use without guessing.",
};

export default function SiteLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="isolate">
      <Header />
      {children}
      <Footer />
      <ScrollToTop />
    </div>
  );
}
