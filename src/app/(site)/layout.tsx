import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";
import type { ReactNode } from "react";

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
