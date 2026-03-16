export const docsNav = [
  { href: "#getting-started", label: "Getting Started" },
  { href: "#workflows", label: "Workflows" },
  { href: "#outputs", label: "Outputs" },
  { href: "#access", label: "Access" },
  { href: "#privacy", label: "Privacy" },
  { href: "#troubleshooting", label: "Troubleshooting" },
];

export const heroFacts = [
  { label: "Format", value: "Product docs" },
  { label: "Focus", value: "Usage + safeguards" },
  { label: "Scope", value: "Single + batch workflows" },
];

export const browserLinks = [
  {
    label: "Install on Chrome",
    mobileLabel: "Chrome",
    href: "https://chromewebstore.google.com/detail/nhgeihbbpdnhcfccedpnkionaofdpaib",
    icon: "/images/browser/chrome.svg",
  },
  {
    label: "Install on Firefox",
    mobileLabel: "Firefox",
    href: "https://addons.mozilla.org/en-US/firefox/addon/signalizeai/",
    icon: "/images/browser/firefox.svg",
  },
] as const;

export const gettingStartedSteps = [
  {
    title: "Install the extension",
    description:
      "Add SignalizeAI to Chrome or Firefox and keep it pinned so it is available when you are reviewing public business sites.",
  },
  {
    title: "Open a public company page",
    description:
      "Use a homepage, product page, or pricing page where the business clearly explains what it sells and who it serves.",
  },
  {
    title: "Run a quick website check",
    description:
      "SignalizeAI reads visible page content on demand and converts it into a sales-focused brief instead of generic metadata.",
  },
  {
    title: "Decide what happens next",
    description:
      "Continue with batch analysis, save the result for follow-up, or move the insight into your outreach workflow.",
  },
];

export const workflowCards = [
  {
    eyebrow: "Single analysis",
    title: "Quick website check",
    description:
      "Use SignalizeAI on the active tab when you need fast context on one account without leaving the page.",
    points: [
      "Runs on the page you are currently viewing",
      "Uses public visible website content only",
      "Best for quick qualification and outreach prep",
    ],
  },
  {
    eyebrow: "Scaled research",
    title: "Batch analysis",
    description:
      "Run research across multiple companies from a pasted URL list or CSV when one-by-one review is too slow.",
    points: [
      "Useful for prospecting sprints and market sweeps",
      "Supports user-submitted URL lists",
      "Availability depends on plan capabilities",
    ],
  },
  {
    eyebrow: "Ongoing workflow",
    title: "Saved analyses",
    description:
      "Keep important results accessible so you can return later, filter what matters, and export when the workflow requires it.",
    points: [
      "Useful when research spans more than one session",
      "Supports revisiting and organizing useful accounts",
      "Search, filtering, and export depend on plan access",
    ],
  },
];

export const outputCards = [
  {
    title: "Business summary",
    description:
      "A concise explanation of what the company appears to do and how it presents itself.",
  },
  {
    title: "Target customer",
    description:
      "The likely buyer segment inferred from messaging, offer structure, and page context.",
  },
  {
    title: "Value proposition",
    description:
      "The most obvious product or service angle surfaced from the public copy.",
  },
  {
    title: "Recommended persona",
    description:
      "The role most likely to care about the problem or budget signaled by the site.",
  },
  {
    title: "Readiness signal",
    description:
      "A directional indicator for how ready the account appears for outreach and why.",
  },
  {
    title: "Exportable working set",
    description:
      "When supported, saved analyses can become a reusable set for filtering, export, and follow-up.",
  },
];

export const accessCards = [
  {
    title: "Quick website check",
    availability: "Available to all users",
    description:
      "The core single-page workflow for active-tab analysis and immediate context generation.",
  },
  {
    title: "Batch analysis",
    availability: "Plan-dependent",
    description:
      "Used when you need to process multiple domains at once rather than manually review each site.",
  },
  {
    title: "Saved analyses",
    availability: "Plan-dependent",
    description:
      "Storage, organization features, and export access vary by plan and should be compared on the pricing page.",
  },
];

export const privacyPoints = [
  "SignalizeAI analyzes public website content on demand rather than monitoring general browsing.",
  "The extension does not collect form inputs, cookies, or private account data.",
  "API keys stay server-side and requests are rate-limited.",
  "Saved analyses are optional and tied to the authenticated user account.",
  "Users can remove saved analyses through the product interface.",
];

export const permissions = [
  {
    title: "activeTab",
    description: "Access the current tab only when you request analysis.",
  },
  {
    title: "tabs",
    description: "Read the active page URL for analysis context.",
  },
  {
    title: "scripting",
    description: "Inject the extraction script into the page on demand.",
  },
  {
    title: "storage",
    description: "Store preferences and local extension state.",
  },
  {
    title: "sidePanel / sidebar_action",
    description: "Render the SignalizeAI UI inside the browser side panel or sidebar.",
  },
  {
    title: "host permissions",
    description:
      "Allow secure requests to SignalizeAI services, Supabase, and requested analysis targets.",
  },
];

export const troubleshootingCards = [
  {
    title: "Nothing happens when I run a check",
    description:
      "Refresh the page and retry on a public website. Browser-protected tabs, PDFs, and restricted pages do not allow content scripts.",
  },
  {
    title: "The output feels too thin",
    description:
      "Try a stronger page source such as the homepage, product page, or pricing page where the business explains itself clearly.",
  },
  {
    title: "Batch analysis is unavailable",
    description:
      "Batch analysis is not a universal feature. Check plan access if the workflow is not available in your account.",
  },
  {
    title: "Saved analyses are missing",
    description:
      "Confirm you are signed in to the same account used when the analyses were created.",
  },
];
