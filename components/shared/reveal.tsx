"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { EASE_OUT, VIEWPORT_ONCE } from "@/lib/animations";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds (mirrors the legacy per-item GSAP delays). */
  delay?: number;
  /** Animation length in seconds. */
  duration?: number;
  /** Horizontal offset in px (negative = from the left). */
  x?: number;
  /** Vertical offset in px the element rises from. */
  distance?: number;
  /** Starting scale (legacy cards start at 0.95–0.96). */
  scale?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper replacing the legacy WOW.js + GSAP ScrollTrigger
 * `gsap.from()` reveals. Animates once when the element enters the viewport.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  x = 0,
  distance = 30,
  scale = 1,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y: x === 0 ? distance : 0, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
