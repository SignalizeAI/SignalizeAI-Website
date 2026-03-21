import type { Metadata } from "next";
import ProspectPageClient from "./ProspectPageClient";

export const metadata: Metadata = {
  title: "Prospect",
  description: "View a saved prospect in the SignalizeAI dashboard.",
};

export default async function ProspectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProspectPageClient id={id} />;
}
