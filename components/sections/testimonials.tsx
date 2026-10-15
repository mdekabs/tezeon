"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";

import { TESTIMONIAL_INTERVAL_MS } from "@/lib/animations";
import { TESTIMONIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

const COUNT = TESTIMONIALS.length;
const SWIPE_THRESHOLD_PX = 50;

/** Shortest signed distance from `active` to `index` on the circular track. */
function circularOffset(index: number, active: number): number {
  let offset = index - active;
  if (offset > COUNT / 2) offset -= COUNT;
  if (offset < -COUNT / 2) offset += COUNT;
  return offset;
}

/**
 * Legacy `.testimonial` (style.css:1463-1549, 2688-2695, 3498-3506; Slick in
 * script.js): navy band with a centre-mode logo rail (centre logo 1.8×, its
 * neighbours 1.3×) synced to a sliding glass quote card. Autoplays every 3s,
 * pauses while the quote is hovered; logos and swipes navigate.
 */
export function Testimonials() {
  const [state, setState] = useState({ active: 0, direction: 1 });
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  const goTo = useCallback((next: number, direction: number) => {
    setState({ active: ((next % COUNT) + COUNT) % COUNT, direction });
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(() => goTo(state.active + 1, 1), TESTIMONIAL_INTERVAL_MS);
    return () => window.clearTimeout(timer);
  }, [state.active, paused, goTo]);

  const onTouchStart = (event: TouchEvent): void => {
    touchStartX.current = event.touches[0].clientX;
  };
  const onTouchEnd = (event: TouchEvent): void => {
    const diff = touchStartX.current - event.changedTouches[0].clientX;
    if (Math.abs(diff) > SWIPE_THRESHOLD_PX) goTo(state.active + Math.sign(diff), Math.sign(diff));
  };

  const current = TESTIMONIALS[state.active];

  return (
    <section
      id="testimonial"
      aria-label="Client testimonials"
      aria-roledescription="carousel"
      className="relative my-[45px] bg-[rgba(3,15,39,0.9)] py-[90px] text-center max-md:py-[60px]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="container-bs !max-w-[760px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }}
          className="relative mx-auto h-[160px] w-[300px] max-md:w-[240px]"
        >
          {TESTIMONIALS.map((testimonial, index) => {
            const offset = circularOffset(index, state.active);
            const visible = Math.abs(offset) <= 1;
            return (
              <button
                key={testimonial.name}
                type="button"
                tabIndex={visible ? 0 : -1}
                aria-label={`Show testimonial from ${testimonial.name}`}
                aria-current={offset === 0 ? "true" : undefined}
                onClick={() => goTo(index, offset >= 0 ? 1 : -1)}
                style={{ left: `calc(22px + (100% - 44px) / 3 * ${offset + 1})` }}
                className={cn(
                  "absolute top-0 w-[calc((100%-44px)/3)] transition-all duration-500",
                  offset === 0 ? "z-[1] scale-[1.8]" : "scale-[1.3]",
                  visible ? "opacity-100" : "pointer-events-none opacity-0",
                )}
              >
                <Image
                  src={testimonial.logo}
                  alt={testimonial.logoAlt}
                  width={86}
                  height={86}
                  className="mt-[37px] block h-auto w-full rounded-[100px]"
                />
              </button>
            );
          })}
        </motion.div>

        <div
          className="relative mt-[15px] overflow-hidden pt-[50px]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          aria-live={paused ? "polite" : "off"}
        >
          <AnimatePresence initial={false} mode="popLayout" custom={state.direction}>
            <motion.figure
              key={current.name}
              custom={state.direction}
              variants={{
                enter: (direction: number) => ({ x: `${direction * 100}%` }),
                center: { x: 0 },
                exit: (direction: number) => ({ x: `${direction * -100}%` }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="mx-2 rounded-xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-[16px] backdrop-saturate-[160%]"
            >
              <figcaption>
                <h3 className="mb-2 text-[22px] font-bold text-primary">{current.name}</h3>
                <h4 className="mb-2.5 text-sm font-light text-white italic">{current.role}</h4>
              </figcaption>
              <blockquote className="m-0">
                <p className="m-0 text-base font-light text-white">{current.quote}</p>
              </blockquote>
            </motion.figure>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
