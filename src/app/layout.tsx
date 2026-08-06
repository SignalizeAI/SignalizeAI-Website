import "../styles/index.css";
import Providers from "./providers";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const displayFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://signalizeai.org"),
  title: {
    default: "SignalizeAI",
    template: "%s | SignalizeAI",
  },
  description:
    "Know when your target accounts change. SignalizeAI turns any company website into a sales brief, then re-checks it and tells you what changed since last time.",
  openGraph: {
    title: "SignalizeAI",
    description:
      "Know when your target accounts change. SignalizeAI turns any company website into a sales brief, then re-checks it and tells you what changed since last time.",
    url: "https://signalizeai.org",
    siteName: "SignalizeAI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SignalizeAI",
    description:
      "Know when your target accounts change. SignalizeAI turns any company website into a sales brief, then re-checks it and tells you what changed since last time.",
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
      <body suppressHydrationWarning className={`${inter.variable} ${displayFont.variable} bg-white text-dark dark:bg-dark dark:text-white`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
