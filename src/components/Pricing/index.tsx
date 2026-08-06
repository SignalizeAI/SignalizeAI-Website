import SectionTitle from "../Common/SectionTitle";
import PricingFull from "./PricingFull";

const Pricing = () => (
  <section
    id="pricing"
    className="relative z-20 overflow-hidden bg-gradient-to-b from-white via-black/[0.02] to-white pb-16 pt-16 dark:from-dark dark:via-dark-2 dark:to-dark lg:pb-28 lg:pt-28"
  >
    <div className="pointer-events-none absolute inset-x-0 top-24 h-64 bg-gradient-to-r from-primary/6 via-transparent to-accent/8 blur-3xl dark:from-primary/10 dark:to-accent/12" />
    <div className="container">
      <div className="mb-15">
        <SectionTitle
          subtitle="Pricing"
          title="Plans for every sales team"
          paragraph="Choose based on daily prospect volume, batch capacity, saved prospect limits, website prospect access, outreach workflows, and whether your team needs search, filtering, and export."
          center
        />
      </div>
      <PricingFull />
    </div>
  </section>
);

export default Pricing;
