"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { HERO_SLIDE_INTERVAL_MS } from "@/lib/animations";
import { COMPANY, HERO_SLIDES } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { HeroSlide } from "@/types";

const SLIDE_COUNT = HERO_SLIDES.length;
const DESKTOP_PANELS = 3;
const SWIPE_THRESHOLD_PX = 50;

/** GSAP `power3.out` equivalent. */
const POWER3_OUT: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

/** Caption entrance (legacy animations.js `animateCaption`). */
const captionItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: POWER3_OUT },
  }),
};

/** Combined desktop caption entrance (legacy `animateCombinedCaption`). */
const combinedItem: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: POWER3_OUT },
  }),
};

/**
 * Legacy `.vid-hero` (style.css:3169-3457, animations.js initVideoHero):
 * - <992px: autoplaying 7s carousel with arrows, dots, progress bar and swipe.
 * - ≥992px: three side-by-side video panels that widen on hover, with a
 *   single centred caption; carousel controls are hidden.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const touchStartX = useRef(0);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  /* Autoplay — restarting on every index change mirrors `startTimer()`. */
  useEffect(() => {
    const timer = window.setTimeout(() => goTo(index + 1), HERO_SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, goTo]);

  /* Desktop plays the three panels; mobile plays only the active slide from 0. */
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 992px)").matches;
    videoRefs.current.forEach((video, videoIndex) => {
      if (!video) return;
      const active = desktop ? videoIndex < DESKTOP_PANELS : videoIndex === index;
      if (active) {
        if (!desktop) video.currentTime = 0;
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [index]);

  const onTouchStart = (event: TouchEvent): void => {
    touchStartX.current = event.touches[0].clientX;
  };

  const onTouchEnd = (event: TouchEvent): void => {
    const diff = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD_PX) goTo(diff > 0 ? index + 1 : index - 1);
  };

  return (
    <section
      id="vidHero"
      aria-label="Featured services"
      aria-roledescription="carousel"
      className="relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-dark lg:h-[88vh]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="hero-slides absolute inset-0">
        {HERO_SLIDES.map((slide, slideIndex) => {
          const active = slideIndex === index;
          return (
            <div
              key={slide.headingTop + slide.headingBottom}
              aria-hidden={!active}
              className={cn("hero-slide absolute inset-0", active ? "z-[2] opacity-100" : "z-[1] opacity-0")}
            >
              <video
                ref={(element) => {
                  videoRefs.current[slideIndex] = element;
                }}
                className="absolute inset-0 size-full object-cover object-center"
                autoPlay={slideIndex === 0}
                muted
                loop
                playsInline
                preload={slideIndex < DESKTOP_PANELS ? "auto" : "none"}
                poster={slide.poster}
              >
                <source src={slide.videoSrc} type="video/mp4" />
              </video>
              <div className="hero-overlay absolute inset-0" />
              {active ? <SlideCaption slide={slide} /> : null}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
        className="hero-control hero-arrow left-[22px] max-md:left-2.5"
      >
        <FaChevronLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
        className="hero-control hero-arrow right-[22px] max-md:right-2.5"
      >
        <FaChevronRight aria-hidden="true" />
      </button>

      <div className="hero-control absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.headingTop}
            type="button"
            aria-label={`Slide ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => goTo(slideIndex)}
            className={cn("hero-dot", slideIndex === index && "hero-dot-active")}
          />
        ))}
      </div>

      <div className="hero-control absolute inset-x-0 bottom-0 z-10 h-[3px] bg-white/[0.12]">
        <div key={index} className="h-full w-0 animate-hero-progress bg-primary" />
      </div>

      {/* Combined caption — desktop only, spans all three panels */}
      <motion.div
        initial="hidden"
        animate="show"
        className="pointer-events-none absolute inset-x-0 bottom-[10%] z-10 hidden px-[6%] text-center lg:block"
      >
        <motion.p
          custom={0.4}
          variants={combinedItem}
          className="mb-4 inline-block rounded-[20px] border border-white/[0.14] bg-white/[0.08] px-[18px] py-[5px] text-[0.72rem] font-medium uppercase tracking-[3px] text-white/[0.82] backdrop-blur-[8px]"
        >
          Nigeria&apos;s Premier Water Engineers
        </motion.p>
        <motion.h1
          custom={0.7}
          variants={combinedItem}
          className="mb-7 text-[clamp(2.2rem,4.5vw,4rem)] font-extrabold leading-[1.15] tracking-[-0.5px] text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.45)]"
        >
          Clean Water Solutions
          <br />
          for Every Scale
        </motion.h1>
        <motion.div
          custom={1.05}
          variants={combinedItem}
          className="pointer-events-auto flex justify-center gap-4"
        >
          <a href={COMPANY.whatsappUrl} target="_blank" rel="noopener noreferrer" className="hero-cta">
            Get A Free Quote
          </a>
          <Link href="/services" className="hero-cta hero-cta-outline">
            Our Services
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** Per-slide caption (mobile/tablet), re-animated whenever its slide becomes active. */
function SlideCaption({ slide }: { slide: HeroSlide }) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      className="absolute bottom-[14%] left-[7%] z-[3] max-w-[min(680px,85vw)] max-md:bottom-[18%] max-md:left-[5%] lg:hidden"
    >
      <motion.p
        custom={0.2}
        variants={captionItem}
        className="mb-3.5 inline-block text-[0.78rem] font-semibold uppercase tracking-[4px] text-primary"
      >
        {slide.sub}
      </motion.p>
      <motion.h2
        custom={0.38}
        variants={captionItem}
        className="mb-[30px] text-[clamp(1.9rem,5.5vw,4rem)] font-bold leading-[1.12] text-white max-md:mb-5"
      >
        {slide.headingTop}
        <br />
        {slide.headingBottom}
      </motion.h2>
      <motion.div custom={0.58} variants={captionItem}>
        {slide.cta.external ? (
          <a href={slide.cta.href} target="_blank" rel="noopener noreferrer" className="hero-cta">
            {slide.cta.label}
          </a>
        ) : (
          <Link href={slide.cta.href} className="hero-cta">
            {slide.cta.label}
          </Link>
        )}
      </motion.div>
    </motion.div>
  );
}
