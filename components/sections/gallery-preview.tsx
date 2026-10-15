"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { SectionHeader } from "@/components/shared/section-header";
import { COLLAGE_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Legacy `.home-gallery-preview` (style.css:2970-3115): 1.3fr/1fr/1fr photo
 * collage with a tall lead image, hover zoom + frosted labels (always shown on
 * phones) and a gold pill CTA into the full gallery. The trailing photo spans
 * the full row so the grid never leaves an orphaned cell.
 */
export function GalleryPreview() {
  return (
    <section className="relative bg-[linear-gradient(160deg,#f0f4f8_0%,#e8edf3_100%)] pt-[60px] pb-[70px]">
      <div className="container-bs">
        <SectionHeader
          eyebrow="Our Work in Pictures"
          title={
            <>
              Water Engineering You Can <span className="text-primary">Trust</span>
            </>
          }
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "0px 0px -18% 0px" }}
          className="grid auto-rows-[220px] grid-cols-[1.3fr_1fr_1fr] gap-3 max-md:auto-rows-[160px] max-md:grid-cols-2 max-md:gap-[9px] max-[479px]:auto-rows-[120px] max-[479px]:gap-1.5"
        >
          {COLLAGE_ITEMS.map((item, index) => (
            <motion.figure
              key={item.label}
              variants={{
                hidden: { opacity: 0, scale: 0.88 },
                show: { opacity: 1, scale: 1, transition: { duration: 0.65, delay: index * 0.09 } },
              }}
              className={cn(
                "collage-item group relative m-0 cursor-pointer overflow-hidden rounded-[10px]",
                item.tall && "row-span-2",
                index === COLLAGE_ITEMS.length - 1 && "col-span-full",
              )}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 40vw, 50vw"
                className="block object-cover transition-transform duration-[550ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-[1.07]"
              />
              <figcaption className="collage-label glass-label pointer-events-none absolute bottom-4 left-4 z-[2] translate-y-2 rounded-[30px] px-4 py-1.5 text-[13px] font-semibold tracking-[0.2px] whitespace-nowrap text-white opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:bottom-2.5 max-md:left-2.5 max-md:translate-y-0 max-md:px-[11px] max-md:py-[5px] max-md:text-[11px] max-md:opacity-100">
                <item.icon aria-hidden="true" className="mr-1 inline align-[-0.125em]" />
                {item.label}
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>

        <div className="mt-[38px] text-center">
          <Link
            href="/gallery"
            className="touch-bounce inline-flex items-center gap-2 rounded-[50px] border border-transparent bg-primary px-[38px] py-3.5 text-[15px] leading-normal font-bold tracking-[0.3px] text-dark shadow-[0_6px_28px_rgba(253,190,51,0.5)] transition-all duration-[320ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] hover:-translate-y-[3px] hover:bg-dark hover:text-primary hover:shadow-[0_12px_36px_rgba(3,15,39,0.28)] max-[479px]:px-7 max-[479px]:py-3 max-[479px]:text-sm"
          >
            Explore Full Gallery <FaArrowRight aria-hidden="true" className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
