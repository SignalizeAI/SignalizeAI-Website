"use client";

import { useEffect, useState } from "react";

const useStickyHeader = (threshold = 50) => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    let ticking = false;
    let frameId = 0;

    const updateSticky = () => {
      const nextSticky = window.scrollY >= threshold;
      setSticky((currentSticky) =>
        currentSticky === nextSticky ? currentSticky : nextSticky,
      );
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      frameId = window.requestAnimationFrame(updateSticky);
    };

    updateSticky();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [threshold]);

  return sticky;
};

export default useStickyHeader;
