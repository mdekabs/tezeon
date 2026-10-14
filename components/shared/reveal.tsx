"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";

import { EASE_OUT, VIEWPORT_ONCE, fadeInUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  /** Motion variants; defaults to the legacy WOW.js `fadeInUp` equivalent. */
  variants?: Variants;
  /** Stagger delay in seconds (mirrors `data-wow-delay`). */
  delay?: number;
  className?: string;
}

/**
 * Scroll-reveal wrapper replacing WOW.js `fadeInUp` / `slideInLeft` /
 * `slideInRight` classes with Motion `whileInView`. Animates once, cleans up
 * automatically on unmount.
 */
export function Reveal({
  children,
  variants = fadeInUp,
  delay = 0,
  className,
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT_ONCE}
      variants={variants}
      transition={{ duration: 0.9, ease: EASE_OUT, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}