"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

import { PortfolioCard } from "@/components/sections/portfolio-card";
import { PortfolioFilters } from "@/components/sections/portfolio-filters";
import { LightboxGroup, type LightboxImage } from "@/components/shared/lightbox";
import { SectionHeader } from "@/components/shared/section-header";
import { VideoModal } from "@/components/shared/video-modal";
import { PORTFOLIO_BLUR, PORTFOLIO_ITEMS } from "@/lib/data";
import type { PortfolioFilter, PortfolioItem } from "@/types";

const FILTERS: readonly { value: PortfolioFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "completed", label: "Complete" },
  { value: "ongoing", label: "Ongoing" },
  { value: "coming-soon", label: "Upcoming" },
];

const IMAGE_ITEMS = PORTFOLIO_ITEMS.filter((item): item is PortfolioItem & { image: string } =>
  Boolean(item.image),
);
const LIGHTBOX_IMAGES: readonly LightboxImage[] = IMAGE_ITEMS.map((item) => ({
  src: item.image,
  alt: item.alt ?? item.title,
  title: item.title,
}));

/**
 * Legacy `.portfolio` on portfolio.html (style.css:2112-2251): status filter
 * chips over a 4/3/2/1-column card grid (isotope → Motion layout animations)
 * and a "View Full Gallery" button.
 */
export function PortfolioGrid() {
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const [video, setVideo] = useState<PortfolioItem | null>(null);

  const visible = PORTFOLIO_ITEMS.filter((item) => filter === "all" || item.status === filter);

  return (
    <section className="relative py-[45px]">
      <div className="container-bs">
        <SectionHeader eyebrow="Our Projects" title="Visit Our Projects" />
        <PortfolioFilters options={FILTERS} value={filter} onChange={setFilter} />

        <LightboxGroup images={LIGHTBOX_IMAGES}>
          <motion.div layout className="grid gap-x-[30px] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <AnimatePresence mode="popLayout">
              {visible.map((item, index) => (
                <motion.div
                  key={item.title}
                  layout
                  initial={{ opacity: 0, y: 40, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.001 }}
                  transition={{ duration: 0.4, delay: (index % 4) * 0.09 }}
                >
                  <PortfolioCard
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    alt={item.alt}
                    video={item.video}
                    poster={item.poster}
                    lightboxIndex={IMAGE_ITEMS.findIndex((entry) => entry.title === item.title)}
                    onPlayVideo={item.video ? () => setVideo(item) : undefined}
                    blurDataURL={PORTFOLIO_BLUR[item.title]}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LightboxGroup>

        <div className="text-center">
          <Link
            href="/gallery"
            className="m-[5px] inline-block bg-primary px-[35px] py-[15px] text-base font-medium text-dark uppercase transition-all duration-300 hover:bg-dark hover:text-primary"
          >
            View Full Gallery
          </Link>
        </div>
      </div>

      <VideoModal
        variant="gallery"
        open={video !== null}
        onOpenChange={(open) => !open && setVideo(null)}
        src={video?.video ?? null}
        poster={video?.poster}
        title={video?.title ?? "Project video"}
      />
    </section>
  );
}
