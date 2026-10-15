"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

import { useCloseWhenHidden } from "@/hooks/use-close-when-hidden";
import { SHOWCASE_VIDEO } from "@/lib/data";

/**
 * Ongoing-project teaser — legacy `.video` (style.css:159-174, 1099-1191,
 * 2581-2593): fixed-background navy band with the "Watch This Space" caption
 * and a pulsing gold play button in front of it (client request).
 *
 * The clip plays inline inside the section (client request, replacing the
 * legacy modal) and closes itself — paused and unloaded — as soon as the
 * section is scrolled out of view, or on Escape / the close button.
 */
export function VideoShowcase() {
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playButtonRef = useRef<HTMLButtonElement>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const backgroundPositionY = useTransform(scrollYProgress, [0, 1], ["50%", "70%"]);

  const stop = useCallback(() => setPlaying(false), []);
  useCloseWhenHidden(sectionRef, playing, stop);

  /* Start playback as soon as the player mounts. */
  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => undefined);
  }, [playing]);

  const close = (): void => {
    setPlaying(false);
    playButtonRef.current?.focus({ preventScroll: true });
  };

  return (
    <motion.section
      ref={sectionRef}
      aria-label="Ongoing project"
      style={{ backgroundPositionY }}
      className="bg-video-showcase relative my-[45px] h-full min-h-[500px] overflow-hidden"
    >
      <button
        ref={playButtonRef}
        type="button"
        aria-label={`Play video: ${SHOWCASE_VIDEO.title}`}
        onClick={() => setPlaying(true)}
        className="play-button absolute top-1/2 left-1/2 z-[2] box-content block h-11 w-8 -translate-1/2 rounded-full pt-[18px] pr-5 pb-[18px] pl-7 outline-none"
      >
        <span
          aria-hidden="true"
          className="relative z-[3] block size-0 border-y-[22px] border-l-[32px] border-y-transparent border-l-dark"
        />
      </button>

      <p className="pointer-events-none absolute inset-0 z-[1] m-0 flex w-full items-center justify-center px-5 text-center text-[clamp(18px,3vw,34px)] text-white [text-shadow:0_0_12px_rgba(253,190,51,0.48)]">
        {SHOWCASE_VIDEO.caption}
      </p>

      <AnimatePresence>
        {playing ? (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-[5] bg-black"
          >
            <video
              ref={videoRef}
              src={SHOWCASE_VIDEO.src}
              poster={SHOWCASE_VIDEO.poster}
              controls
              playsInline
              preload="metadata"
              aria-label={SHOWCASE_VIDEO.title}
              className="size-full object-contain"
            />
            <p className="pointer-events-none absolute top-4 left-5 m-0 max-w-[70%] text-sm font-medium text-white/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
              {SHOWCASE_VIDEO.title}
            </p>
            <button
              type="button"
              aria-label="Close video"
              onClick={close}
              className="absolute top-3 right-3 flex size-[30px] items-center justify-center bg-[#00000079] text-[30px] leading-none text-white transition-colors hover:text-primary"
            >
              &times;
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.section>
  );
}
