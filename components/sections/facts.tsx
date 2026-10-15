"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { Flaticon } from "@/components/shared/flaticon";
import { COUNTER_DURATION_MS } from "@/lib/animations";
import { FACTS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types";

type Tone = "gold" | "navy";

/** GSAP `back.out(1.5)` approximation. */
const BACK_OUT: [number, number, number, number] = [0.34, 1.56, 0.64, 1];

/**
 * Legacy `.fact` band (style.css:934-998, 2625-2644): a navy half and a gold
 * half (stacked below 768px), each with two count-up statistics.
 */
export function Facts() {
  return (
    <section aria-label="Company statistics" className="relative w-full py-[45px]">
      <div className="container-fluid">
        <div className="-mx-[15px] flex flex-wrap">
          <FactHalf stats={FACTS.slice(0, 2)} tone="gold" />
          <FactHalf stats={FACTS.slice(2, 4)} tone="navy" />
        </div>
      </div>
    </section>
  );
}

function FactHalf({ stats, tone }: { stats: readonly Stat[]; tone: Tone }) {
  const gold = tone === "gold";
  return (
    <motion.div
      initial={{ opacity: 0, x: gold ? "-100%" : "100%" }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={cn(
        "w-full px-[15px] py-[60px] md:w-1/2 max-md:py-[30px]",
        gold ? "bg-fact-left-gradient text-primary" : "bg-fact-right-gradient text-dark",
      )}
    >
      <div className="-mx-[15px] flex">
        {stats.map((stat, index) => (
          <FactItem key={stat.label} stat={stat} tone={tone} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function FactItem({ stat, tone, index }: { stat: Stat; tone: Tone; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const value = useCountUp(stat.value, inView);

  return (
    <div ref={ref} className="flex w-1/2 items-start px-[15px]">
      <div className="relative mx-[15px] mt-[7px] flex w-[60px] shrink-0 items-center justify-center max-md:mt-[5px] max-md:mr-2.5 max-md:ml-0">
        <Flaticon
          name={stat.icon}
          className={cn(
            "bg-clip-text text-[60px] leading-[60px] text-transparent max-md:text-[44px] max-md:leading-[44px]",
            tone === "gold"
              ? "bg-[linear-gradient(#ffffff,#fdbe33)]"
              : "bg-[linear-gradient(#ffffff,#030f27)]",
          )}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.88 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -18% 0px" }}
        transition={{ duration: 0.65, delay: index * 0.14, ease: BACK_OUT }}
      >
        <h2
          className={cn(
            "mb-2 text-[35px] font-bold max-md:text-[28px]",
            tone === "gold" ? "text-primary" : "text-dark",
          )}
        >
          {value}
        </h2>
        <p className="m-0 text-base font-semibold uppercase max-md:text-xs">{stat.label}</p>
      </motion.div>
    </div>
  );
}

/** counterup.js equivalent: linear count to `target` once `start` flips true. */
function useCountUp(target: number, start: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let frame = 0;
    const startTime = performance.now();
    const tick = (now: number): void => {
      const progress = Math.min((now - startTime) / COUNTER_DURATION_MS, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);

  return value;
}
