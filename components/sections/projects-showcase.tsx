"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  HiArrowRight,
  HiCheckBadge,
  HiClock,
  HiMapPin,
  HiMiniPlay,
  HiOutlineMagnifyingGlassPlus,
  HiXMark,
} from "react-icons/hi2";

import { LightboxGroup, useLightbox, type LightboxImage } from "@/components/shared/lightbox";
import { SectionHeader } from "@/components/shared/section-header";
import { SegmentedControl, type SegmentOption } from "@/components/shared/segmented-control";
import { useCloseWhenHidden } from "@/hooks/use-close-when-hidden";
import { SPRING, SPRING_SNAPPY } from "@/lib/animations";
import { COMPANY, PORTFOLIO_BLUR, PORTFOLIO_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { PortfolioFilter, PortfolioItem } from "@/types";

/* ---------------------------------------------------------------------------
 * Data shaping (static, computed once)
 * ------------------------------------------------------------------------- */

const ONGOING = PORTFOLIO_ITEMS.filter((item) => item.status === "ongoing");
const COMPLETED = PORTFOLIO_ITEMS.filter((item) => item.status === "completed");
const UPCOMING = PORTFOLIO_ITEMS.filter((item) => item.status === "coming-soon");

/** Lightbox order: completed project photos, then ongoing site photos. */
const LIGHTBOX_IMAGES: readonly LightboxImage[] = [
  ...COMPLETED.filter((item) => item.image).map((item) => ({
    src: item.image!,
    alt: item.alt ?? item.title,
    title: item.title,
  })),
  ...ONGOING.flatMap((item) =>
    (item.photos ?? []).map((photo) => ({ src: photo.src, alt: photo.alt, title: item.title })),
  ),
];

const lightboxIndexOf = (src: string): number => LIGHTBOX_IMAGES.findIndex((image) => image.src === src);

const FILTERS: readonly SegmentOption<PortfolioFilter>[] = [
  { value: "all", label: "All", count: PORTFOLIO_ITEMS.length },
  { value: "completed", label: "Completed", count: COMPLETED.length },
  { value: "ongoing", label: "Ongoing", count: ONGOING.length },
  { value: "coming-soon", label: "Upcoming", count: UPCOMING.length },
];

const GRID_SIZES = "(min-width: 1200px) 360px, (min-width: 768px) 50vw, 100vw";

/**
 * Projects page — Apple liquid-glass presentation of the portfolio:
 * a segmented filter, the ongoing project featured with inline video and site
 * photos, completed work as photo cards, and upcoming work as "Coming soon"
 * cards (no imagery, per client request). Layout changes animate on springs.
 */
export function ProjectsShowcase() {
  const [filter, setFilter] = useState<PortfolioFilter>("all");

  const showOngoing = filter === "all" || filter === "ongoing";
  const gridItems = useMemo(
    () =>
      [...COMPLETED, ...UPCOMING].filter(
        (item) => filter === "all" || item.status === filter,
      ),
    [filter],
  );

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_45%,#f5f9ff_100%)] py-[45px] pb-[70px]">
      {/* Ambient colour behind the glass — gives the material something to refract. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 size-[420px] rounded-full bg-cyan/25 blur-[100px]" />
        <div className="absolute top-1/3 -right-32 size-[460px] rounded-full bg-primary/20 blur-[110px]" />
      </div>

      <div className="container-bs relative">
        <SectionHeader eyebrow="Our Projects" title="Visit Our Projects" className="mb-8" />

        <div className="mb-10 flex justify-center">
          <SegmentedControl label="Filter projects" options={FILTERS} value={filter} onChange={setFilter} />
        </div>

        <LightboxGroup images={LIGHTBOX_IMAGES}>
          <motion.div layout transition={SPRING} className="flex flex-col gap-[30px]">
            <AnimatePresence mode="popLayout" initial={false}>
              {showOngoing
                ? ONGOING.map((project) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={SPRING}
                    >
                      <FeaturedProject project={project} />
                    </motion.div>
                  ))
                : null}
            </AnimatePresence>

            <motion.ul layout transition={SPRING} className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="popLayout" initial={false}>
                {gridItems.map((project, index) => (
                  <motion.li
                    key={project.title}
                    layout
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ ...SPRING, delay: Math.min(index, 5) * 0.04 }}
                  >
                    {project.status === "completed" ? (
                      <ProjectCard project={project} />
                    ) : (
                      <UpcomingCard project={project} />
                    )}
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </motion.div>
        </LightboxGroup>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/gallery"
            className="press inline-flex items-center gap-2 rounded-full bg-dark px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_24px_rgba(3,15,39,0.25)] transition-colors hover:bg-[#0a1e3d] hover:text-primary"
          >
            View Full Gallery <HiArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <a
            href={COMPANY.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass press inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-semibold text-dark hover:text-dark"
          >
            <FaWhatsapp aria-hidden="true" className="size-4 text-[#25d366]" />
            Start your project
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
 * Featured ongoing project
 * ------------------------------------------------------------------------- */

function FeaturedProject({ project }: { project: PortfolioItem }) {
  const { open } = useLightbox();
  const [playing, setPlaying] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const stop = useCallback(() => setPlaying(false), []);
  useCloseWhenHidden(mediaRef, playing, stop);

  useEffect(() => {
    if (playing) videoRef.current?.play().catch(() => undefined);
  }, [playing]);

  return (
    <article className="liquid-glass grid gap-4 rounded-[32px] p-3 sm:p-4 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8">
      {/* Media — portrait 3:4 box matching the (cropped) footage, so it fills edge to edge */}
      <div
        ref={mediaRef}
        className="relative mx-auto aspect-[3/4] w-full max-w-[440px] overflow-hidden rounded-[24px] bg-dark md:max-w-none"
      >
        {project.poster ? (
          <Image
            src={project.poster}
            alt=""
            fill
            sizes="(min-width: 768px) 440px, 100vw"
            className="object-cover"
          />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,15,39,0.15)_0%,rgba(3,15,39,0.55)_100%)]" />

        <LiveBadge className="absolute top-4 left-4" />

        {project.video ? (
          <motion.button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play video: ${project.title}, ${project.location ?? ""}`}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={SPRING_SNAPPY}
            className="liquid-glass-chip absolute top-1/2 left-1/2 grid size-20 -translate-1/2 place-items-center rounded-full"
          >
            <span className="grid size-14 place-items-center rounded-full bg-primary shadow-[0_8px_24px_rgba(253,190,51,0.5)]">
              <HiMiniPlay aria-hidden="true" className="ml-1 size-7 text-dark" />
            </span>
          </motion.button>
        ) : null}

        <AnimatePresence>
          {playing && project.video ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={SPRING}
              className="absolute inset-0 z-10 bg-black"
            >
              <video
                ref={videoRef}
                src={project.video}
                poster={project.poster}
                controls
                playsInline
                preload="metadata"
                aria-label={project.title}
                className="size-full object-cover"
              />
              <button
                type="button"
                aria-label="Close video"
                onClick={stop}
                className="liquid-glass-chip press absolute top-3 right-3 grid size-9 place-items-center rounded-full text-white"
              >
                <HiXMark aria-hidden="true" className="size-5" />
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Details */}
      <div className="flex flex-col px-2 pb-2 lg:py-3 lg:pr-3">
        <p className="mb-2 text-xs font-semibold tracking-[0.12em] text-primary uppercase">Ongoing project</p>
        <h3 className="mb-2 text-[clamp(1.6rem,3vw,2.25rem)] leading-[1.1] font-bold tracking-[-0.02em] text-dark">
          {project.title}
        </h3>
        {project.location ? (
          <p className="mb-4 flex items-center gap-1.5 text-sm font-medium text-dark/70">
            <HiMapPin aria-hidden="true" className="size-4 text-primary" />
            {project.location}
          </p>
        ) : null}
        <p className="mb-5 text-[15px] text-body">{project.description}</p>

        {project.photos?.length ? (
          <div className="mb-6 grid grid-cols-3 gap-2.5">
            {project.photos.map((photo) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => open(lightboxIndexOf(photo.src))}
                aria-label={`View photo: ${photo.alt}`}
                className="press group relative aspect-square overflow-hidden rounded-2xl bg-dark/5"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 992px) 120px, 30vw"
                  className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
                />
                <span className="absolute inset-0 grid place-items-center bg-dark/0 text-white opacity-0 transition-all duration-300 group-hover:bg-dark/35 group-hover:opacity-100">
                  <HiOutlineMagnifyingGlassPlus aria-hidden="true" className="size-6" />
                </span>
              </button>
            ))}
          </div>
        ) : null}

        <a
          href={COMPANY.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="press mt-auto inline-flex items-center justify-center gap-2 self-start rounded-full bg-primary px-6 py-3 text-sm font-semibold text-dark shadow-[0_8px_24px_rgba(253,190,51,0.4)] transition-colors hover:bg-[#ffcb4a] hover:text-dark"
        >
          <FaWhatsapp aria-hidden="true" className="size-4" />
          Discuss a similar project
        </a>
      </div>
    </article>
  );
}

function LiveBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "liquid-glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-white",
        className,
      )}
    >
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
      </span>
      In progress
    </span>
  );
}

/* ---------------------------------------------------------------------------
 * Completed + upcoming cards
 * ------------------------------------------------------------------------- */

function ProjectCard({ project }: { project: PortfolioItem }) {
  const { open } = useLightbox();
  if (!project.image) return null;

  return (
    <button
      type="button"
      onClick={() => open(lightboxIndexOf(project.image!))}
      aria-label={`View photo: ${project.title}`}
      className="press group relative block aspect-[4/3] w-full overflow-hidden rounded-[28px] bg-dark text-left shadow-[0_2px_6px_rgba(3,15,39,0.08),0_18px_40px_-16px_rgba(3,15,39,0.35)] transition-shadow duration-300 hover:shadow-[0_4px_10px_rgba(3,15,39,0.1),0_28px_56px_-18px_rgba(3,15,39,0.45)]"
    >
      <Image
        src={project.image}
        alt={project.alt ?? project.title}
        fill
        sizes={GRID_SIZES}
        placeholder={PORTFOLIO_BLUR[project.title] ? "blur" : "empty"}
        blurDataURL={PORTFOLIO_BLUR[project.title]}
        className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
      />
      <span aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(3,15,39,0.55)_100%)]" />

      <span className="liquid-glass-chip absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-white">
        <HiCheckBadge aria-hidden="true" className="size-4 text-primary" />
        Completed
      </span>

      <span className="liquid-glass absolute inset-x-3 bottom-3 flex items-center justify-between gap-3 rounded-[20px] px-4 py-3">
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold tracking-[-0.01em] text-dark">{project.title}</span>
          <span className="block truncate text-xs text-dark/60">{project.description}</span>
        </span>
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-dark text-white transition-colors duration-300 group-hover:bg-primary group-hover:text-dark">
          <HiOutlineMagnifyingGlassPlus aria-hidden="true" className="size-[18px]" />
        </span>
      </span>
    </button>
  );
}

function UpcomingCard({ project }: { project: PortfolioItem }) {
  return (
    <article className="group relative flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-[28px] bg-[linear-gradient(145deg,#0a1e3d_0%,#030f27_70%)] p-6 text-white shadow-[0_18px_40px_-16px_rgba(3,15,39,0.45)]">
      {/* Concentric "ripple" rings — a quiet water motif in place of a photo. */}
      <span aria-hidden="true" className="absolute -right-16 -bottom-16 size-64">
        {[0, 1, 2].map((ring) => (
          <span
            key={ring}
            className="absolute inset-0 rounded-full border border-primary/25 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            style={{ transform: `scale(${1 - ring * 0.25})` }}
          />
        ))}
      </span>

      <span className="liquid-glass-chip inline-flex items-center gap-1.5 self-start rounded-full px-3 py-1.5 text-xs font-semibold">
        <HiClock aria-hidden="true" className="size-4 text-primary" />
        Upcoming
      </span>

      <div className="relative">
        <p className="mb-1 text-[clamp(1.5rem,2.4vw,2rem)] leading-none font-bold tracking-[-0.02em] text-primary">
          Coming soon
        </p>
        <h3 className="mb-1 text-lg font-semibold text-white">{project.title}</h3>
        <p className="m-0 text-sm text-white/65">{project.description}</p>
      </div>
    </article>
  );
}
