import type { Variants } from "motion/react";

/** Shared cubic-bezier easing used across every Motion transition. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Scroll-viewport defaults: animate once when 20% of the element is visible. */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12 },
  },
};

export const fadeTransition = {
  duration: 0.9,
  ease: EASE_OUT,
} as const;

/** Milliseconds each hero slide stays on screen (matches the CSS progress bar). */
export const HERO_SLIDE_INTERVAL_MS = 6000;

/** Testimonial autoplay cadence. */
export const TESTIMONIAL_INTERVAL_MS = 5000;

/** Preloader timing rules lifted verbatim from the legacy inline script. */
export const PRELOADER_MIN_DURATION_MS = 2200;
export const PRELOADER_HARD_CAP_MS = 4500;

/** Counter-up duration for the "Facts" statistics. */
export const COUNTER_DURATION_MS = 2200;

/**
 * Apple-style spring physics used for every Motion-driven UI state change
 * (drawer, panel, modal and layout transitions).
 */
export const SPRING_TRANSITION = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
} as const;

/** Snappier spring for small controls (chips, dots, launcher buttons). */
export const SPRING_SNAP = {
  type: "spring",
  bounce: 0,
  duration: 0.25,
} as const;