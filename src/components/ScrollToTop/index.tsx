"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Top: 0 takes us all the way back to the top of the page
  // Behavior: smooth keeps it smooth!
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    let ticking = false;
    let frameId = 0;

    const updateVisibility = () => {
      const nextVisible = window.scrollY > 300;
      setIsVisible((currentVisible) =>
        currentVisible === nextVisible ? currentVisible : nextVisible,
      );
      ticking = false;
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      frameId = window.requestAnimationFrame(updateVisibility);
    };

    updateVisibility();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="back-to-top flex h-10 w-10 cursor-pointer items-center justify-center rounded-md bg-slate-900 dark:bg-white text-white shadow-md transition duration-300 ease-in-out hover:bg-slate-800 dark:hover:bg-gray-200"
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-l border-t border-white dark:border-slate-900"></span>
        </button>
      )}
    </div>
  );
}
