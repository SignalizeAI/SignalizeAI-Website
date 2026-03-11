import { Metadata } from "next";
import DocsHero from "./DocsHero";
import DocsPrivacySection from "./DocsPrivacySection";
import DocsSidebar from "./DocsSidebar";
import {
  DocsAccessSection,
  DocsGettingStarted,
  DocsOutputSection,
  DocsTroubleshootingSection,
  DocsWorkflowSection,
} from "./DocsSections";

export const metadata: Metadata = {
  title: "Documentation | SignalizeAI",
  description:
    "SignalizeAI documentation for setup, workflows, outputs, access, privacy, and troubleshooting.",
};

const DocsPage = () => {
  return (
    <main className="bg-white dark:bg-[#000000]">
      <DocsHero />
      <section className="relative pb-16 lg:pb-24">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[300px_minmax(0,1fr)]">
            <DocsSidebar />
            <div className="space-y-8">
              <DocsGettingStarted />
              <DocsWorkflowSection />
              <DocsOutputSection />
              <DocsAccessSection />
              <DocsPrivacySection />
              <DocsTroubleshootingSection />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DocsPage;
