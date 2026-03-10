import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <section className="relative z-10 py-16 md:py-20 lg:py-28 bg-gray-50 dark:bg-[#000000] overflow-hidden">
      {/* Decorative background accent */}
      <div className="absolute top-0 right-0 -z-10 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] dark:bg-accent/5" />
      <div className="absolute bottom-0 left-0 -z-10 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/5 blur-[120px] dark:bg-primary/5" />

      <div className="container">
        <div className="mb-16 lg:mb-24 flex justify-center">
          <SectionTitle
            subtitle="Capabilities"
            title="What SignalizeAI gives you on every run"
            paragraph="Move from raw website copy to a useful sales brief with summaries, targeting context, readiness signals, and saved or exportable research."
            center
            width="800px"
          />
        </div>

        <div className="-mx-4 flex flex-wrap justify-center">
          {featuresData.map((feature, i) => (
            <SingleFeature key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
