import type { Metadata } from "next";
import SavedProspectsPageClient from "./SavedProspectsPageClient";

export const metadata: Metadata = {
  title: "Saved Prospects",
  description: "Browse the saved prospects in your SignalizeAI account.",
};

export default function SavedProspectsPage() {
  return <SavedProspectsPageClient />;
}
