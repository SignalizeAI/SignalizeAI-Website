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

/** Factual chips shown under the hero CTAs. No invented social proof. */
export const heroTrustChips = [
  "Chrome Web Store",
  "Firefox Add-ons",
  "Free plan available",
];

/** Mock of a real prospect record, mirroring the outputs listed in /docs. */
export const heroProspectRecord = {
  domain: "northwind-logistics.com",
  status: "Analyzed",
  fields: [
    {
      label: "Target customer",
      value:
        "Mid-market freight brokers and 3PLs running 50-500 loads a week.",
    },
    {
      label: "Value proposition",
      value:
        "Cuts manual load matching by consolidating carrier capacity into one live board.",
    },
    {
      label: "Best persona",
      value: "VP Operations / Head of Carrier Sales",
    },
  ],
  outreach:
    "Noticed you position the live board around carrier capacity. Most brokers we talk to lose hours reconciling that by hand. Worth a look at how your team handles it today?",
};

/** Retained for the auth entry screen (`(auth)/AuthEntryClient.tsx`). */
export const heroUsers = [1, 2, 3, 4, 5];
