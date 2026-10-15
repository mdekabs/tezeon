"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { PortfolioCard } from "@/components/sections/portfolio-card";
import { PortfolioFilters } from "@/components/sections/portfolio-filters";
import { LightboxGroup, type LightboxImage } from "@/components/shared/lightbox";
import { SectionHeader } from "@/components/shared/section-header";
import { VideoModal } from "@/components/shared/video-modal";
import { GALLERY_ITEMS } from "@/lib/data";
import type { GalleryFilter, GalleryItem } from "@/types";

const FILTERS: readonly { value: GalleryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "drilling", label: "Drilling" },
  { value: "filtration", label: "Filtration" },
  { value: "construction", label: "Construction" },
  { value: "plumbing", label: "Plumbing" },
  { value: "video", label: "Videos" },
];

const IMAGE_ITEMS = GALLERY_ITEMS.filter((item): item is GalleryItem & { image: string } =>
  Boolean(item.image),
);
const LIGHTBOX_IMAGES: readonly LightboxImage[] = IMAGE_ITEMS.map((item) => ({
  src: item.image,
  alt: item.alt ?? item.title,
  title: item.title,
}));

/**
 * Legacy gallery.html `.portfolio` (style.css:2112-2251, 2819-2963): category
 * filters over photo and video cards. Photos open the grouped lightbox,
 * videos open the gallery player modal.
 */
export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [video, setVideo] = useState<GalleryItem | null>(null);

  const visible = GALLERY_ITEMS.filter((item) => filter === "all" || item.categories.includes(filter));

  return (
    <section className="relative py-[45px]">
      <div className="container-bs">
        <SectionHeader
          eyebrow="Photo Gallery"
          title="Our Work in Pictures"
          className="animate-[tez-fade-up_0.65s_ease_0.1s_both]"
        />
        <PortfolioFilters options={FILTERS} value={filter} onChange={setFilter} animated />

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
                  transition={{ duration: 0.4, delay: Math.min(index, 7) * 0.07 }}
                >
                  <PortfolioCard
                    variant="gallery"
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    alt={item.alt}
                    video={item.video}
                    poster={item.poster}
                    lightboxIndex={IMAGE_ITEMS.findIndex((entry) => entry.title === item.title)}
                    onPlayVideo={item.video ? () => setVideo(item) : undefined}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LightboxGroup>
      </div>

      <VideoModal
        open={video !== null}
        onOpenChange={(open) => !open && setVideo(null)}
        src={video?.video ?? null}
        poster={video?.poster}
        title={video?.title ?? "Gallery video"}
      />
    </section>
  );
}
