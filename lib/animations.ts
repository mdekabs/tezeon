/** Shared cubic-bezier easing used across every Motion transition. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Scroll-viewport defaults: animate once when 20% of the element is visible. */
export const VIEWPORT_ONCE = { once: true, amount: 0.2 } as const;

/** Milliseconds each hero slide stays on screen (legacy DURATION; matches the 7s progress bar). */
export const HERO_SLIDE_INTERVAL_MS = 7000;

/** Testimonial autoplay cadence (Slick default `autoplaySpeed`). */
export const TESTIMONIAL_INTERVAL_MS = 3000;

/** Preloader timing rules lifted verbatim from the legacy inline script. */
export const PRELOADER_MIN_DURATION_MS = 2200;
export const PRELOADER_HARD_CAP_MS = 4500;

/** Counter-up duration for the "Facts" statistics (legacy counterUp `time`). */
export const COUNTER_DURATION_MS = 2000;
