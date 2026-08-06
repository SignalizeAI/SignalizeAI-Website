import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

export const metadata: Metadata = {
  description:
    "Know when your target accounts change. SignalizeAI turns any company website into a sales brief, then re-checks it and tells you what changed since last time.",
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
