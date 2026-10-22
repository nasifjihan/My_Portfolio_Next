"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { cn } from "@/lib/cn";

const RADIUS = 22;

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
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      tabIndex={isVisible ? 0 : -1}
      className={cn(
        "fixed right-4 bottom-4 z-900 flex size-12.5 cursor-pointer items-center justify-center rounded-full bg-white shadow-[inset_0_0_0_2px_rgba(255,255,255,0.2)] transition-[opacity,visibility,translate] duration-200 min-[640px]:right-10 min-[640px]:bottom-10",
        isVisible ? "visible translate-y-0 opacity-100" : "invisible translate-y-3.75 opacity-0",
      )}
    >
      <svg viewBox="0 0 50 50" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle
          cx="25"
          cy="25"
          r={RADIUS}
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - progress}
          fill="none"
          strokeWidth={4}
          strokeLinecap="round"
          className="stroke-brand"
        />
      </svg>
      <FaArrowUp className="relative text-[22px] text-brand" aria-hidden />
    </button>
  );
}
