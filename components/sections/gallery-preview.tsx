import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { buttonVariants } from "@/components/ui/button";
import { COLLAGE_ITEMS } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Home gallery teaser (`.home-gallery-preview`): a photo collage with glass
 * labels and a CTA into the full gallery route.
 */
export function GalleryPreview() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-x">
        <SectionHeader
          eyebrow="Our Work in Pictures"
          title={
            <>
              Water Engineering You Can{" "}
              <span className="text-primary">Trust</span>
            </>
          }
        />

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {COLLAGE_ITEMS.map((item, index) => (
            <Reveal
              key={item.label}
              delay={index * 0.08}
              className={cn(item.tall && "row-span-2")}
            >
              <figure className="group relative h-full min-h-44 overflow-hidden bg-dark lg:min-h-60">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                  <item.icon className="size-3.5" aria-hidden="true" />
                  {item.label}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/gallery" className={buttonVariants({ size: "lg" })}>
            Explore Full Gallery
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}