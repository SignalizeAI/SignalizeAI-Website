export const initialFormState = {
  fullName: "",
  email: "",
  topic: "Product Support",
  message: "",
};

export const supportTopics = [
  {
    title: "Product support",
    body: "Setup help, batch analysis questions, and troubleshooting.",
  },
  {
    title: "Privacy and permissions",
    body: "Questions about what SignalizeAI reads, stores, and why.",
  },
  {
    title: "Teams and partnerships",
    body: "Team rollout, higher-volume usage, and partnership discussions.",
  },
  {
    title: "Billing & Subscriptions",
    body: "Questions about plans, invoices, and managing your subscription.",
  },
];

export const inquiryOptions = [
  "Product Support",
  "Bug Report",
  "Billing",
  "Feature Request",
  "Partnership",
  "Other",
];

export const detailCards = [
  {
    title: "Best way to get help",
    body: "Include your browser, the page you analyzed, what you expected, and what happened instead.",
  },
];
