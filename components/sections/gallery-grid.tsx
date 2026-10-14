"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import { useState } from "react";

import { LightboxTrigger } from "@/components/shared/lightbox-trigger";
import { SectionHeader } from "@/components/shared/section-header";
import { VideoModal } from "@/components/shared/video-modal";
import { SPRING_TRANSITION } from "@/lib/animations";
import { GALLERY_ITEMS } from "@/lib/data";
import type { GalleryFilter, GalleryItem } from "@/types";
import { cn } from "@/lib/utils";

const FILTERS: readonly { value: GalleryFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "drilling", label: "Drilling" },
  { value: "filtration", label: "Filtration" },
  { value: "construction", label: "Construction" },
  { value: "plumbing", label: "Plumbing" },
  { value: "video", label: "Videos" },
];

interface ActiveVideo {
  src: string;
  poster?: string;
  title: string;
}

/**
 * Gallery page (`.portfolio` with `#portfolio-flters`): category filtering
 * over mixed image/video tiles. Images open the lightbox; videos open the
 * modal player and release their media source on close.
 */
export function GalleryGrid() {
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [activeVideo, setActiveVideo] = useState<ActiveVideo | null>(null);

  const visible = GALLERY_ITEMS.filter(
    (item) => filter === "all" || item.categories.includes(filter),
  );

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-x">
        <SectionHeader eyebrow="Photo Gallery" title="Our Work in Pictures" />

        <ul className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {FILTERS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                aria-pressed={filter === option.value}
                onClick={() => setFilter(option.value)}
                className={cn(
                  "border px-5 py-2 text-sm font-semibold uppercase tracking-wide transition-colors",
                  filter === option.value
                    ? "border-primary bg-primary text-dark"
                    : "border-gray-200 bg-white text-muted hover:border-primary hover:text-dark",
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
              <motion.article
                key={item.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={SPRING_TRANSITION}
                className="group h-full overflow-hidden rounded-2xl border border-gray-100 bg-white ambient-card-shadow transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.01]"
              >
                <GalleryMedia
                  item={item}
                  onPlayVideo={(video) => setActiveVideo(video)}
                />
                <div className="flex items-center justify-between gap-4 border-t border-gray-100 p-5">
                  <h3 className="text-base font-semibold text-dark">{item.title}</h3>
                  {item.image ? (
                    <LightboxTrigger
                      src={item.image}
                      alt={item.alt ?? item.title}
                      caption={item.title}
                      label={`View ${item.title} image`}
                    />
                  ) : null}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <VideoModal
        open={activeVideo !== null}
        onOpenChange={(open) => {
          if (!open) {
            setActiveVideo(null);
          }
        }}
        src={activeVideo?.src ?? null}
        poster={activeVideo?.poster}
        title={activeVideo?.title ?? "Gallery video"}
      />
    </section>
  );
}

function GalleryMedia({
  item,
  onPlayVideo,
}: {
  item: GalleryItem;
  onPlayVideo: (video: ActiveVideo) => void;
}) {
  if (item.video && item.poster) {
    return (
      <button
        type="button"
        onClick={() =>
          onPlayVideo({ src: item.video!, poster: item.poster, title: item.title })
        }
        aria-label={`Play ${item.title} video`}
        className="relative block aspect-[4/3] w-full overflow-hidden"
      >
        <Image
          src={item.poster}
          alt={item.description}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center bg-dark/40 transition-colors group-hover:bg-dark/60">
          <span className="grid size-14 place-items-center rounded-full bg-primary text-dark">
            <Play className="ml-0.5 size-6 fill-current" aria-hidden="true" />
          </span>
        </span>
      </button>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      {item.image ? (
        <Image
          src={item.image}
          alt={item.alt ?? item.title}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : null}
      <div className="absolute inset-0 flex items-end bg-dark/70 p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-sm leading-relaxed text-white">{item.description}</p>
      </div>
    </div>
  );
}