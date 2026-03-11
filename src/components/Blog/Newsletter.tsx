const dotPattern = [
  [1.39737, 44.6026],
  [1.39737, 7.9913],
  [13.6943, 44.6026],
  [13.6943, 7.9913],
  [25.9911, 44.6026],
  [25.9911, 7.9913],
  [38.288, 44.6026],
  [38.288, 7.9913],
  [1.39737, 32.3058],
  [13.6943, 32.3058],
  [25.9911, 32.3058],
  [38.288, 32.3058],
  [1.39737, 20.0086],
  [13.6943, 20.0086],
  [25.9911, 20.0086],
  [38.288, 20.0086],
];

const Dots = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
    {dotPattern.map(([cx, cy]) => (
      <circle
        key={`${cx}-${cy}`}
        cx={cx}
        cy={cy}
        r="1.39737"
        transform={`rotate(-90 ${cx} ${cy})`}
        fill="white"
        fillOpacity="0.44"
      />
    ))}
  </svg>
);

const Newsletter = () => {
  return (
    <div
      className="wow fadeInUp relative mb-12 overflow-hidden rounded-[5px] bg-primary px-11 py-[60px] text-center lg:px-8"
      data-wow-delay=".1s"
    >
      <h3 className="mb-[6px] text-[28px] font-semibold leading-[40px] text-white">
        Join our newsletter!
      </h3>
      <p className="mb-5 text-base text-white">Enter your email to receive our latest newsletter.</p>
      <form>
        <input
          type="email"
          id="newsletter-email"
          name="email"
          placeholder="Your email address"
          autoComplete="email"
          className="mb-4 h-[50px] w-full rounded-md border border-transparent bg-white/10 text-center text-base text-white outline-none placeholder:text-white/60 focus:border-white focus-visible:shadow-none"
        />
        <input
          type="submit"
          value="Subscribe Now"
          className="mb-4 h-[50px] w-full cursor-pointer rounded-md bg-secondary text-center text-sm font-medium text-white transition duration-300 ease-in-out hover:bg-[#0BB489] hover:bg-opacity-90"
        />
      </form>
      <p className="text-sm font-medium text-white">Don&#39;t worry, we don&#39;t spam</p>
      <span className="absolute right-0 top-0"><Dots /></span>
      <span className="absolute bottom-0 left-0"><Dots /></span>
    </div>
  );
};

export default Newsletter;
