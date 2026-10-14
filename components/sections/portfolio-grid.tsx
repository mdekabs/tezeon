"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { ProjectCard } from "@/components/sections/project-card";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { SPRING_TRANSITION } from "@/lib/animations";
import { PORTFOLIO_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { PortfolioFilter } from "@/types";

const FILTERS: readonly { value: PortfolioFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Completed" },
  { value: "ongoing", label: "Ongoing" },
  /* Internal value stays `coming-soon` (data + types); the visible label the
     client asked for is "Upcoming". */
  { value: "coming-soon", label: "Upcoming" },
];

/**
 * Projects page grid (`.portfolio`): isotope-style category filtering as
 * declarative React state with spring-driven Motion layout animations and
 * Apple-style pill filter chips.
 */
export function PortfolioGrid() {
  const [filter, setFilter] = useState<PortfolioFilter>("all");

  const visible = PORTFOLIO_ITEMS.filter(
    (item) => filter === "all" || item.status === filter,
  );

  return (
    <section className="bg-apple-canvas py-16 lg:py-28">
      <div className="container-x">
        <SectionHeader eyebrow="Our Projects" title="Visit Our Projects" />

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-semibold tracking-wide transition-colors",
                  filter === option.value
                    ? "border-transparent bg-gradient-to-r from-gold-start via-gold-mid to-gold-end text-dark shadow-[0_4px_16px_0_rgba(253,190,51,0.35)]"
                    : "border-gray-200 bg-white/70 text-muted backdrop-blur-md hover:border-brand-gold/40 hover:text-dark",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {visible.map((item) => (
              <motion.div
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRING_TRANSITION}
              >
                <ProjectCard item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 text-center">
          <Link href="/gallery" className={buttonVariants({ size: "lg" })}>
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}