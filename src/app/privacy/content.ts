export const tocItems = [
  { href: "#information-we-collect", label: "1. Information We Collect" },
  { href: "#how-we-use-data", label: "2. How We Use Data" },
  { href: "#ai-processing", label: "3. AI Processing" },
  { href: "#data-storage-security", label: "4. Data Storage & Security" },
  { href: "#permissions-explanation", label: "5. Permissions Explanation" },
  { href: "#data-retention-deletion", label: "6. Data Retention & Deletion" },
  { href: "#third-party-services", label: "7. Third-Party Services" },
  { href: "#childrens-privacy", label: "8. Children's Privacy" },
  { href: "#changes-to-policy", label: "9. Changes to this Policy" },
  { href: "#contact-us", label: "10. Contact Us" },
];

export const heroCards = [
  {
    label: "Scope",
    description: "Public pages and URLs you intentionally submit.",
  },
  {
    label: "Storage",
    description: "Saved prospects are optional and tied to your account.",
  },
];

export const privacySections = [
  {
    id: "information-we-collect",
    number: "1.",
    title: "Information We Collect",
    subsections: [
      {
        title: "1.1 Website Content",
        paragraphs: [
          "SignalizeAI processes publicly available content from the active browser tab (single prospecting run) and from user-submitted URLs in batch mode (CSV upload or pasted URL list), including page titles, meta descriptions, headings, and visible text. This data is used only to generate on-screen prospect data for the user and may require injecting a content script into the active tab on demand.",
        ],
        negativeItems: [
          "Private/Password-protected pages",
          "User form inputs",
          "Cookies or session data",
          "Browsing history",
        ],
      },
      {
        title: "1.2 URL Inputs for Batch Prospecting",
        paragraphs: [
          "If a user runs batch prospecting, SignalizeAI processes the URL list they provide (via CSV or pasted text) to fetch publicly available website content and generate prospect data.",
        ],
      },
      {
        title: "1.3 User Account Information",
        paragraphs: [
          "If a user chooses to sign in using Google, we receive their email address and name via secure authentication handled by Supabase.",
        ],
      },
      {
        title: "1.4 Saved Prospects (Optional)",
        paragraphs: [
          "If enabled by the user, saved prospects may include the domain name, URL, generated prospect data, outreach emails, follow-up emails, prospect status, and related timestamps. This data is private and accessible only to the authenticated user.",
          "Website prospect previews do not become saved records automatically. A prospect is stored only when the user explicitly saves it.",
        ],
      },
    ],
  },
  {
    id: "how-we-use-data",
    number: "2.",
    title: "How We Use Data",
    intro: "Collected data is used strictly to:",
    items: [
      "Generate AI-based prospect data, outreach emails, and follow-up emails",
      "Display results within the extension and website prospect views",
      "Run user-requested batch prospecting",
      "Save or unsave user-requested prospects",
      "Sync saved prospect state such as status, saved content, auth state, and theme across the extension and website",
      "Improve extension functionality and user experience",
    ],
    note: "SignalizeAI does not track browsing history, and we do not sell, share, or use data for advertising or tracking.",
  },
  {
    id: "ai-processing",
    number: "3.",
    title: "AI Processing",
    intro: "SignalizeAI uses a third-party AI API to generate insights.",
    items: [
      "Only extracted website text is sent to generate prospect data",
      "No personal user data is sent to the AI service",
      "API requests are rate-limited and secured server-side",
      "AI responses are generated on-demand and are not used to train models",
    ],
  },
  {
    id: "data-storage-security",
    number: "4.",
    title: "Data Storage & Security",
    items: [
      "Authentication and saved data are stored using Supabase.",
      "API keys are never exposed in the extension (client-side).",
      "All backend requests are protected via origin checks and rate limiting.",
      "Industry-standard security practices are followed for data encryption.",
    ],
  },
  {
    id: "permissions-explanation",
    number: "5.",
    title: "Permissions Explanation",
    intro: "SignalizeAI requests the following permissions only for core functionality:",
    permissions: [
      { title: "activeTab", desc: "Access the active tab when the user runs a prospecting request" },
      { title: "tabs", desc: "Identify the active tab and read its URL for context" },
      { title: "scripting", desc: "Inject the content extraction script into the active tab" },
      { title: "storage", desc: "Save user preferences" },
      { title: "sidePanel / sidebar_action", desc: "Display prospecting UI (Chrome side panel, Firefox sidebar)" },
      {
        title: "host permissions",
        desc: "Allow requests to Supabase, SignalizeAI API environments, and user-requested prospect targets across domains",
      },
    ],
  },
  {
    id: "data-retention-deletion",
    number: "6.",
    title: "Data Retention & Deletion",
    intro: "We adhere to strict data retention policies:",
    items: [
      "Users may save or remove specific prospects at any time through the extension or website product interface.",
      "Users may update outreach content, follow-ups, and prospect status on saved prospects through product interfaces tied to their account.",
      "Users may sign out to remove extension access to their account.",
      "Upon full account deletion request, all user data is permanently removed from our systems.",
    ],
  },
  {
    id: "third-party-services",
    number: "7.",
    title: "Third-Party Services",
    intro: "SignalizeAI integrates with the following services:",
    services: [
      { title: "Google OAuth", desc: "For secure authentication." },
      { title: "Supabase", desc: "For database storage and authentication management." },
      { title: "AI API Provider", desc: "For processing text and generating insights." },
    ],
    note:
      "Each service operates under its own privacy policy, which governs their respective data handling practices.",
  },
  {
    id: "childrens-privacy",
    number: "8.",
    title: "Children's Privacy",
    paragraphs: [
      "SignalizeAI is not intended for users under the age of 13. We do not knowingly collect data from children.",
    ],
  },
  {
    id: "changes-to-policy",
    number: "9.",
    title: "Changes to this Policy",
    paragraphs: [
      "This Privacy Policy may be updated from time to time. Any changes will be reflected on this page with an updated date.",
    ],
  },
  {
    id: "contact-us",
    number: "10.",
    title: "Contact Us",
    paragraphs: [
      "If you have any questions or concerns regarding privacy, please reach out to us directly at privacy@signalizeai.org.",
    ],
  },
];
