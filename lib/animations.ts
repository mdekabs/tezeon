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

/*
 * Apple-style springs (WWDC "Designing Fluid Interfaces"). Motion's
 * `bounce`/`duration` map to Apple's damping ratio/response:
 * bounce 0 = critically damped (damping 1.0) — the default for UI;
 * bounce > 0 only after momentum (a flick or drag release).
 */

/** Default UI spring — move/reposition, panels, layout changes (damping 1.0, response 0.4). */
export const SPRING = { type: "spring", bounce: 0, duration: 0.4 } as const;

/** Small controls — chips, toggles, indicators (damping 1.0, response 0.3). */
export const SPRING_SNAPPY = { type: "spring", bounce: 0, duration: 0.3 } as const;

/** Sheets released after a drag carry a touch of bounce (damping ~0.8, response 0.3). */
export const SPRING_SHEET = { type: "spring", bounce: 0.2, duration: 0.3 } as const;

/** Apple's momentum projection: where a flick would come to rest (decelerationRate 0.998). */
export function projectMomentum(velocity: number, decelerationRate = 0.998): number {
  return ((velocity / 1000) * decelerationRate) / (1 - decelerationRate);
}
