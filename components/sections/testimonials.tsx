"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import { SPRING_TRANSITION, TESTIMONIAL_INTERVAL_MS } from "@/lib/animations";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Client logo rail + quote slider (`.testimonial`). Selecting a logo switches
 * the quote; the carousel also autoplays and pauses on hover/focus — the
 * behaviour of the legacy Slick slider + synced nav thumbnails.
 */
export function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      return;
    }
    const timer = window.setTimeout(() => {
      setActive((current) => (current + 1) % TESTIMONIALS.length);
    }, TESTIMONIAL_INTERVAL_MS);
    return () => {
      window.clearTimeout(timer);
    };
  }, [active, paused]);

  const current = TESTIMONIALS[active];

  return (
    <section
      id="testimonial"
      aria-label="Client testimonials"
      className="bg-light py-16 lg:py-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="container-x">
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {TESTIMONIALS.map((testimonial, index) => (
            <li key={testimonial.name}>
              <button
                type="button"
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-pressed={index === active}
                onClick={() => setActive(index)}
                className={cn(
                  "grid size-20 place-items-center overflow-hidden bg-white p-2 transition-all duration-300",
                  index === active
                    ? "scale-110 shadow-lg ring-2 ring-primary"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                <Image
                  src={testimonial.logo}
                  alt={testimonial.logoAlt}
                  width={72}
                  height={72}
                  className="h-full w-full object-contain"
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="relative mx-auto mt-12 max-w-2xl text-center" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={SPRING_TRANSITION}
            >
              <blockquote>
                <p className="text-lg italic leading-relaxed text-body">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </blockquote>
              <figcaption className="mt-5">
                <span className="block text-lg font-bold text-dark">{current.name}</span>
                <span className="mt-1 block text-sm font-medium uppercase tracking-wide text-primary">
                  {current.role}
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}