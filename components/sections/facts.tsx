"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { FACTS } from "@/lib/data";
import type { Stat } from "@/types";

/**
 * Statistics band (`.fact`) — legacy split design (style.css:934-998):
 * - Left half: navy gradient `#030f27→#051a3a→#0a1e3d`, gold text + gold icons
 * - Right half: gold gradient `#fdbe33→#ffcb4a→#ffe596`, navy text + navy icons
 * - Count-up triggered on viewport entry (counterup.js + waypoints replacement)
 */
export function Facts() {
  return (
    <section aria-label="Company statistics">
      <div className="grid md:grid-cols-2">
        <div className="bg-fact-left-gradient grid grid-cols-2 gap-6 px-6 py-[60px] text-primary [@media(max-width:767.98px)]:py-[30px]">
          {FACTS.slice(0, 2).map((stat) => (
            <FactItem key={stat.label} stat={stat} tone="gold" />
          ))}
        </div>
        <div className="bg-fact-right-gradient grid grid-cols-2 gap-6 px-6 py-[60px] text-dark [@media(max-width:767.98px)]:py-[30px]">
          {FACTS.slice(2, 4).map((stat) => (
            <FactItem key={stat.label} stat={stat} tone="navy" />
          ))}
        </div>
      </div>
    </section>
  );
}

function FactItem({ stat, tone }: { stat: Stat; tone: "gold" | "navy" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            /* counterup.js: delay 10ms, time 2000ms */
            const target = stat.value;
            const duration = 2000;
            const startTime = performance.now();

            const tick = (now: number): void => {
              const progress = Math.min((now - startTime) / duration, 1);
              /* counterup uses easeOutQuad-ish; cubic-out matches closely */
              const eased = 1 - Math.pow(1 - progress, 3);
              setValue(Math.round(target * eased));
              if (progress < 1) {
                requestAnimationFrame(tick);
              }
            };
            requestAnimationFrame(tick);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4"
    >
      <span
        className={`mt-[7px] shrink-0 ${tone === "gold" ? "text-primary" : "text-dark"}`}
        aria-hidden="true"
      >
        <stat.icon className="size-[60px]" strokeWidth={1.4} />
      </span>
      <div>
        <h2 className="text-[35px] font-bold leading-none">{value}</h2>
        <p className="mt-1 text-base font-semibold uppercase">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}
