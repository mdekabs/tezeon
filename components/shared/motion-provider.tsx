"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Site-wide Motion defaults. `reducedMotion="user"` swaps spring/scroll
 * animations for short opacity cross-fades when the visitor has reduced
 * motion enabled at OS level — Apple's guidance that reduced motion means a
 * gentler equivalent, not *no* feedback.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
