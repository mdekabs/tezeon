import Image from "next/image";
import { ClockFading } from "lucide-react";

import { LightboxTrigger } from "@/components/shared/lightbox-trigger";
import { ProjectStatusBadge } from "@/components/shared/status-badge";
import { PORTFOLIO_BLUR } from "@/lib/data";
import type { PortfolioItem } from "@/types";

const CARD_SHELL = {
  borderRadius: "1.25rem",
  /* Apple material: brighter top edge so light catches the glass. */
  border: "1px solid rgba(255, 255, 255, 0.45)",
  boxShadow:
    "0 1px 2px 0 rgba(3, 15, 39, 0.04), 0 8px 24px -8px rgba(3, 15, 39, 0.12), inset 0 1px 0 0 rgba(255, 255, 255, 0.55)",
} as const;

/**
 * Single project card: Cloudinary image with responsive `sizes` and a baked
 * blur placeholder, overlaid lifecycle badge, gradient description reveal on
 * hover and the gold lightbox trigger. Hover uses the Apple lift + scale
 * micro-interaction over an ambient shadow.
 *
 * Apple-glass treatment: the card shell is a floating translucent panel
 * (bright top edge + liquid shadow) so the grid reads as a stack of physical
 * material cards. "Upcoming" projects intentionally carry no photo — the
 * media slot is an empty frosted reserve the client will fill with imagery
 * when they post the job (per client request).
 */
export function ProjectCard({ item }: { item: PortfolioItem }) {
  const blurDataURL = PORTFOLIO_BLUR[item.title];
  const isUpcoming = item.status === "coming-soon";

  return (
    <article
      className="glass-panel group h-full overflow-hidden transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:ambient-card-shadow-lifted"
      style={CARD_SHELL}
    >
      {isUpcoming ? (
        <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 bg-gradient-to-b from-white/70 via-white/40 to-white/20 text-center">
          <span
            aria-hidden="true"
            className="absolute inset-3 rounded-2xl border-2 border-dashed border-brand-gold/25"
          />
          <span className="grid size-12 place-items-center rounded-full border border-brand-gold/30 bg-brand-gold-subtle text-brand-gold backdrop-blur-md">
            <ClockFading className="size-6" strokeWidth={1.6} aria-hidden="true" />
          </span>
          <div className="px-8">
            <p className="text-sm font-semibold tracking-tight text-dark">
              Photos coming soon
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              This project is being scheduled for mobilisation — imagery will be
              posted here as work begins.
            </p>
          </div>
          <div className="absolute left-3 top-3 z-10">
            <ProjectStatusBadge status={item.status} />
          </div>
        </div>
      ) : (
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={item.image}
            alt={item.alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            placeholder={blurDataURL ? "blur" : "empty"}
            blurDataURL={blurDataURL}
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 z-10">
            <ProjectStatusBadge status={item.status} />
          </div>
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#030f27]/85 via-[#030f27]/20 to-transparent p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p className="text-sm leading-relaxed text-white">{item.description}</p>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between gap-4 border-t border-white/60 bg-white/50 px-5 py-4">
        <h3 className="text-base font-semibold tracking-tight text-dark">{item.title}</h3>
        {!isUpcoming ? (
          <LightboxTrigger
            src={item.image}
            alt={item.alt}
            caption={item.title}
            label={`View ${item.title} image`}
          />
        ) : null}
      </div>
    </article>
  );
}
