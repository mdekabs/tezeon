"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

import { HERO_SLIDE_INTERVAL_MS } from "@/lib/animations";
import { HERO_SLIDES } from "@/lib/data";
import { cn } from "@/lib/utils";

const SLIDE_COUNT = HERO_SLIDES.length;

/**
 * Full-bleed video hero matching the legacy `.vid-hero` implementation:
 * a conventional carousel below the desktop breakpoint and three expanding,
 * always-visible video panels on desktop with one combined caption.
 */
export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const goTo = useCallback((next: number) => {
    setIndex(((next % SLIDE_COUNT) + SLIDE_COUNT) % SLIDE_COUNT);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => {
      setIndex((current) => (current + 1) % SLIDE_COUNT);
    }, HERO_SLIDE_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  useEffect(() => {
    videoRefs.current.forEach((video, videoIndex) => {
      if (!video) return;
      const shouldPlay = videoIndex < 3 || videoIndex === index;
      if (shouldPlay) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [index]);

  return (
    <section
      id="vidHero"
      aria-label="Featured services"
      className="hero-section relative h-[100svh] min-h-[520px] w-full overflow-hidden bg-dark lg:h-[88vh]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="hero-slides absolute inset-0 flex lg:flex-row">
        {HERO_SLIDES.map((slide, slideIndex) => (
          <div
            key={slide.headingTop + slide.headingBottom}
            aria-hidden={slideIndex !== index}
            className={cn(
              "hero-slide absolute inset-0 opacity-0 transition-[flex,opacity] duration-800 ease-out",
              slideIndex === index ? "z-[2] opacity-100" : "pointer-events-none",
            )}
          >
            <video
              ref={(element) => {
                videoRefs.current[slideIndex] = element;
              }}
              className="absolute inset-0 size-full object-cover"
              autoPlay={slideIndex < 3}
              muted
              loop
              playsInline
              preload={slideIndex < 3 ? "auto" : "none"}
              poster={slide.poster}
            >
              <source src={slide.videoSrc} type="video/mp4" />
            </video>
            <div className="hero-overlay absolute inset-0" />

            <div className="hero-caption absolute bottom-[18%] left-[5%] z-10 max-w-[85vw] lg:hidden">
              <p className="hero-sub mb-3.5 inline-block text-[0.78rem] font-semibold uppercase tracking-[4px] text-primary">
                {slide.sub}
              </p>
              <h2 className="hero-heading mb-5 text-[clamp(1.9rem,5.5vw,4rem)] font-bold leading-[1.12] text-white">
                {slide.headingTop}
                <br />
                {slide.headingBottom}
              </h2>
              {slide.cta.external ? (
                <a href={slide.cta.href} target="_blank" rel="noopener noreferrer" className="hero-cta">
                  {slide.cta.label}
                </a>
              ) : (
                <Link href={slide.cta.href} className="hero-cta">
                  {slide.cta.label}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(index - 1)}
        className="hero-control absolute left-[10px] top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-[20px] transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-dark lg:left-[22px] lg:size-[52px]"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(index + 1)}
        className="hero-control absolute right-[10px] top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-[20px] transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-dark lg:right-[22px] lg:size-[52px]"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>

      <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 lg:hidden">
        {HERO_SLIDES.map((slide, slideIndex) => (
          <button
            key={slide.headingTop}
            type="button"
            aria-label={`Go to slide ${slideIndex + 1}`}
            aria-current={slideIndex === index ? "true" : undefined}
            onClick={() => goTo(slideIndex)}
            className={cn(
              "size-2 rounded-full border-0 bg-white/35 transition-[background,width]",
              slideIndex === index ? "w-[26px] rounded-[4px] bg-primary" : "hover:bg-white/60",
            )}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 z-20 h-[3px] w-full bg-white/15 lg:hidden">
        <div
          key={index}
          className="h-full w-0 animate-hero-progress bg-primary"
          style={{ animationPlayState: paused ? "paused" : "running" }}
        />
      </div>

      <div className="hero-caption-combined pointer-events-none absolute bottom-[10%] left-0 right-0 z-10 hidden px-[6%] text-center lg:block">
        <p className="hero-sub mb-4 inline-block rounded-[20px] border border-white/15 bg-white/[0.08] px-[18px] py-[5px] text-[0.72rem] font-medium uppercase tracking-[3px] text-white/80 backdrop-blur-[8px]">
          Nigeria&apos;s Premier Water Engineers
        </p>
        <h1 className="hero-heading mb-7 text-[clamp(2.2rem,4.5vw,4rem)] font-extrabold leading-[1.15] tracking-[-0.5px] text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.45)]">
          Clean Water Solutions
          <br />
          for Every Scale
        </h1>
        <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-4">
          <a href={HERO_SLIDES[0].cta.href} target="_blank" rel="noopener noreferrer" className="hero-cta">
            Get A Free Quote
          </a>
          <Link href="/services" className="hero-cta hero-cta-outline">
            Our Services
          </Link>
        </div>
      </div>
    </section>
  );
}
