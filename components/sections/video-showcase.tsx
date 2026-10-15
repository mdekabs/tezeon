"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";

import { VideoModal } from "@/components/shared/video-modal";
import { SHOWCASE_VIDEO } from "@/lib/data";

/**
 * Legacy `.video` teaser (style.css:159-174, 1099-1191, 2581-2593):
 * fixed-background navy section with the "Watch This Space" caption laid
 * across it. The pulsing gold play button sits in front of the caption and is
 * fully opaque (client request; legacy rendered it at 60% behind the text).
 * The background drifts from 50% to 70% while scrolling (initParallax).
 */
export function VideoShowcase() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], ["50%", "70%"]);

  return (
    <motion.section
      ref={ref}
      style={{ backgroundPositionY }}
      className="bg-video-showcase relative my-[45px] h-full min-h-[500px] overflow-hidden"
    >
      <button
        type="button"
        aria-label="Play ongoing project video"
        onClick={() => setOpen(true)}
        className="play-button absolute top-1/2 left-1/2 z-[2] block h-11 w-8 -translate-1/2 rounded-full pt-[18px] pr-5 pb-[18px] pl-7 outline-none box-content"
      >
        <span
          aria-hidden="true"
          className="relative z-[3] block size-0 border-y-[22px] border-l-[32px] border-y-transparent border-l-dark"
        />
      </button>

      <p className="pointer-events-none absolute inset-0 z-[1] m-0 flex w-full items-center justify-center px-5 text-center text-[clamp(18px,3vw,34px)] text-white [text-shadow:0_0_12px_rgba(253,190,51,0.48)]">
        {SHOWCASE_VIDEO.caption}
      </p>

      <VideoModal
        open={open}
        onOpenChange={setOpen}
        src={SHOWCASE_VIDEO.src}
        poster={SHOWCASE_VIDEO.poster}
        title="Ongoing project preview"
      />
    </motion.section>
  );
}
