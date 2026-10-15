"use client";

import { AnimatePresence, motion } from "motion/react";
import { FaChevronUp } from "react-icons/fa";

import { useScrollPosition } from "@/hooks/use-scroll-position";

const SHOW_AFTER_PX = 200;
const SCROLL_DURATION_MS = 1500;

/** jQuery Easing `easeInOutExpo`. */
function easeInOutExpo(t: number): number {
  if (t === 0 || t === 1) return t;
  return t < 0.5 ? 2 ** (20 * t - 10) / 2 : (2 - 2 ** (-20 * t + 10)) / 2;
}

function scrollToTop(): void {
  const start = window.scrollY;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }
  const startTime = performance.now();
  const tick = (now: number): void => {
    const progress = Math.min((now - startTime) / SCROLL_DURATION_MS, 1);
    window.scrollTo({ top: start * (1 - easeInOutExpo(progress)), behavior: "instant" });
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * Legacy `.back-to-top` (style.css:328-351, 2749-2753; script.js): 44px gold
 * square that fades in past 200px and eases the page back to the top.
 */
export function BackToTop() {
  const visible = useScrollPosition() > SHOW_AFTER_PX;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="back-to-top"
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          onClick={scrollToTop}
          className="fixed right-[15px] bottom-[15px] z-[9] flex size-11 items-start justify-center bg-primary pt-2.5 text-[22px] leading-none text-[#121518] transition-[background,color] duration-500 hover:bg-[#121518] hover:text-primary max-sm:bottom-[90px]"
        >
          <FaChevronUp aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
