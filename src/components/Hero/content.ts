export const installLinks = [
  {
    label: "Install on Chrome",
    href: "https://chromewebstore.google.com/detail/nhgeihbbpdnhcfccedpnkionaofdpaib",
    icon: "/images/browser/chrome.svg",
    className:
      "group relative flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-6 py-3.5 text-base font-semibold text-white transition-all hover:bg-primary-deep active:scale-[0.99] sm:w-auto sm:px-7",
    glow: true,
  },
  {
    label: "Install on Firefox",
    href: "https://addons.mozilla.org/en-US/firefox/addon/signalizeai/",
    icon: "/images/browser/firefox.svg",
    className:
      "group relative flex w-full items-center justify-center gap-3 rounded-2xl border border-black/8 bg-white px-6 py-3.5 text-base font-semibold text-ink transition-all hover:border-primary/40 hover:bg-black/[0.02] active:scale-[0.99] dark:border-white/10 dark:bg-dark-2 dark:text-white dark:hover:border-accent/40 dark:hover:bg-dark-3 sm:w-auto sm:px-7",
  },
];

/**
 * Hero headline and subhead. Kept here so copy changes do not touch layout.
 * Claims must stay inside what the product actually does: scheduled re-checks
 * of public pages while the browser is running. No real-time or email promises.
 */
export const heroHeadline = {
  lead: "Know when your accounts change,",
  highlight: "so you always have a reason to reach out.",
};

export const heroSubhead =
  "Save the companies you sell to. SignalizeAI re-checks their pricing, careers, and homepage messaging on a schedule, then tells you what changed since last time with the outreach angle already written.";

/** Factual chips shown under the hero CTAs. No invented social proof. */
export const heroTrustChips = [
  "Chrome Web Store",
  "Firefox Add-ons",
  "Public pages only",
  "Free plan available",
];

/** Mock of a change alert, mirroring the change types the product detects. */
export const heroProspectRecord = {
  domain: "northwind-logistics.com",
  status: "Change detected",
  panelLabel: "Change detected",
  fields: [
    {
      label: "What changed",
      value:
        "Pricing page: the Starter tier moved from $49 to $79 a month, and a new Enterprise tier appeared.",
    },
    {
      label: "Also picked up",
      value:
        "Careers page added two roles: Enterprise Account Executive and RevOps Manager.",
    },
    {
      label: "Checked",
      value: "6 days ago, then again today",
    },
  ],
  outreach:
    "Saw you added an Enterprise tier and started hiring an Enterprise AE. Usually that means the old onboarding flow starts creaking. Worth comparing notes on how you are handling it?",
};

/** Retained for the auth entry screen (`(auth)/AuthEntryClient.tsx`). */
export const heroUsers = [1, 2, 3, 4, 5];
