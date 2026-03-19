import "../styles/index.css";
import Providers from "./providers";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://signalizeai.org"),
  title: {
    default: "SignalizeAI",
    template: "%s | SignalizeAI",
  },
  description:
    "Sell to any company. Get sales-ready insights and outreach in seconds.",
  openGraph: {
    title: "SignalizeAI",
    description:
      "Sell to any company. Get sales-ready insights and outreach in seconds.",
    url: "https://signalizeai.org",
    siteName: "SignalizeAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SignalizeAI",
    description:
      "Sell to any company. Get sales-ready insights and outreach in seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className="!scroll-smooth"
      data-scroll-behavior="smooth"
      lang="en"
    >
      <body suppressHydrationWarning className={`${inter.variable} bg-white text-dark dark:bg-[#000000] dark:text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
