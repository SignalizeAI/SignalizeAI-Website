"use client";

import { useEffect, useState } from "react";

const useStickyHeader = (threshold = 50) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY >= threshold);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return sticky;
};

export default useStickyHeader;
