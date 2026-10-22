"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";

const RADIUS = 22;

/**
 * Scroll-to-top control with a progress ring.
 * The original used jQuery + an `index.html` inline script; this is a single
 * dependency-free React component driven by one rAF-throttled scroll listener.
 */
export default function ScrollToTop() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
      setIsVisible(window.scrollY > 100);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      className={`progress-wrap${isVisible ? "active-progress" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      tabIndex={isVisible ? 0 : -1}
    >
      <svg viewBox="0 0 50 50" aria-hidden>
        <circle
          cx="25"
          cy="25"
          r={RADIUS}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
        />
      </svg>
      <FaArrowUp className="progress-icon" aria-hidden />
    </button>
  );
}
