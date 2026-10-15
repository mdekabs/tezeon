"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

interface ParallaxVideoProps {
  src: string;
  /** Total upward drift (in % of the video height) across the scroll range. */
  drift?: number;
}

/**
 * Muted looping video that drifts upward while its section scrolls through
 * the viewport — legacy animations.js `initParallax` (yPercent -14, scrub).
 */
export function ParallaxVideo({ src, drift = 14 }: ParallaxVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `-${drift}%`]);

  return (
    <motion.video
      ref={ref}
      style={{ y }}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="block h-auto w-full rounded-[4px]"
    >
      <source src={src} type="video/mp4" />
    </motion.video>
  );
}
