"use client";

import { useEffect, useState } from "react";

const useStickyHeader = (threshold = 50) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateSticky = () => {
      setSticky(window.scrollY >= threshold);
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateSticky);
    };

    updateSticky();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return sticky;
};

export default useStickyHeader;
