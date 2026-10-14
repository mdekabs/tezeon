"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { HERO_SLIDE_INTERVAL_MS } from "@/lib/animations";
import { HERO_SLIDES } from "@/lib/data";
import { cn } from "@/lib/utils";

const SLIDE_COUNT = HERO_SLIDES.length;

/**
 * Full-bleed video hero (`.vid-hero`): crossfading video slides, glass
 * prev/next arrows, dot indicators, an autoplay progress bar and the
 * desktop-only combined caption. Only the active slide's video plays; every
 * other media element is paused for deterministic CPU/bandwidth usage.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    if (paused) {
      return;
    }
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % SLIDE_COUNT);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [index, paused]);

  useEffect(() => {
    videoRefs.current.forEach((video, videoIndex) => {
      if (!video) {
        return;
      }
      if (videoIndex === index) {
        const playPromise = video.play();
        if (playPromise) {
          playPromise.catch(() => {
            /* Autoplay can be blocked; the poster frame remains visible. */
          });
        }
      } else {
        video.pause();
      }
    });
  }, [index]);

  return (
    <section
      id="vidHero"
      aria-label="Featured services"
      className="relative h-[85vh] min-h-[560px] w-full overflow-hidden bg-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="absolute inset-0">
        {HERO_SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.headingTop + slide.headingBottom}
            aria-hidden={slideIndex !== index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-out",
              slideIndex === index ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {/* Muted decorative background media; no audio track to caption. */}
            <video
              ref={(element) => {
                videoRefs.current[slideIndex] = element;
              }}
              className="absolute inset-0 size-full object-cover"
              autoPlay={slideIndex === 0}
              muted
              loop
              playsInline
              preload={slideIndex === 0 ? "auto" : "none"}
              poster={slide.poster}
            >
              <source src={slide.videoSrc} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-dark/70 via-dark/30 to-dark/85" />

            {/* Per-slide caption — mobile/tablet only */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center lg:hidden">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                {slide.sub}
              </p>
              <h2 className="mt-4 text-3xl font-bold leading-tight text-white sm:text-4xl">
                {slide.headingTop}
                <br />
                {slide.headingBottom}
              </h2>
              {slide.cta.external ? (
                <a
                  href={slide.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={buttonVariants({ size: "lg", className: "mt-8" })}
                >
                  {slide.cta.label}
                </a>
              ) : (
                <Link
                  href={slide.cta.href}
                  className={buttonVariants({ size: "lg", className: "mt-8" })}
                >
                  {slide.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Glass arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
        className="glass-panel-dark absolute left-4 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full text-white transition-all duration-300 ease-out hover:scale-110 hover:text-dark"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
        className="glass-panel-dark absolute right-4 top-1/2 z-20 grid size-12 -translate-y-1/2 place-items-center rounded-full text-white transition-all duration-300 ease-out hover:scale-110 hover:text-dark"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-14 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3">
        {HERO_SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.headingTop}
            type="button"
            aria-label={`Go to slide ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => goTo(slideIndex)}
            className={cn(
              "size-3 rounded-full border border-white/70 transition-colors",
              slideIndex === index ? "bg-primary" : "bg-transparent hover:bg-white/40",
            )}
          />
        ))}
      </div>

      {/* Slide progress bar */}
      <div className="absolute bottom-0 left-0 z-20 h-1 w-full bg-white/15">
        <div
          key={index}
          className="h-full w-0 animate-hero-progress bg-primary"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        />
      </div>

      {/* Combined caption — desktop only, spans all panels */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden flex-col items-center justify-center px-6 text-center lg:flex">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Nigeria&apos;s Premier Water Engineers
        </p>
        <h1 className="mt-5 text-5xl font-bold leading-tight text-white xl:text-6xl">
          Clean Water Solutions
          <br />
          for Every Scale
        </h1>
        <div className="pointer-events-auto mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={HERO_SLIDES[0].cta.href}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ variant: "primary", size: "lg" })}
          >
            Get A Free Quote
          </a>
          <Link
            href="/services"
            className={buttonVariants({ variant: "outlineLight", size: "lg" })}
          >
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}