import Header from "@/components/Header";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"));

export const metadata: Metadata = {
  description:
    "Sell to any company. Get sales-ready insights and outreach in seconds.",
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
