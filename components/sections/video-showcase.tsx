"use client";

import { useState } from "react";

import { VideoModal } from "@/components/shared/video-modal";
import { SHOWCASE_VIDEO } from "@/lib/data";

/**
 * Ongoing-project teaser (`.video`) — legacy-exact port (style.css:1099-1178,
 * 2581-2593, and `.preview-proj` at 159-174):
 * - Full-bleed section min-h 500px with FIXED navy parallax background over
 *   the logo watermark (falls back to `scroll` on iOS + mobile)
 * - 100px gold play disc, centered, with two pulsing ring layers
 *   (`pulse-border` keyframes, before/after pseudo-elements)
 * - Caption "Watch This Space For Our Ongoing Project" absolutely overlaid
 *   across the section — white, clamp(18px,3vw,34px), gold text-shadow
 */
export function VideoShowcase() {
  const [open, setOpen] = useState(false);

  return (
    <section
      className="bg-video-showcase relative my-11 flex min-h-[500px] items-center justify-center overflow-hidden"
      style={{ margin: "45px 0" }}
    >
      {/* Caption overlaid across the whole section (legacy `.preview-proj`) */}
      <p
        className="pointer-events-none absolute inset-0 z-[1] flex items-center justify-center px-5 text-center font-medium text-white"
        style={{
          fontSize: "clamp(18px, 3vw, 34px)",
          textShadow: "0 0 12px rgba(253, 190, 51, 0.48)",
        }}
      >
        Watch This Space For Our Ongoing Project
      </p>

      <div className="relative z-10 flex flex-col items-center px-5">
        {/* Play control: 100px gold disc + 2 pulsing rings */}
        <button
          type="button"
          aria-label="Play ongoing project video"
          onClick={() => setOpen(true)}
          className="relative z-10 grid aspect-square place-items-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-primary/60"
          style={{ width: 100, height: 100 }}
        >
          {/* Ring 1 (legacy ::before) — solid gold disc */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
          />
          {/* Ring 2 (legacy ::after) — pulsing expanding ring */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 size-[100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary animate-pulse-border"
          />
          {/* Triangle glyph */}
          <span
            aria-hidden="true"
            className="relative z-10 block"
            style={{
              width: 0,
              height: 0,
              borderLeft: "32px solid #030f27",
              borderTop: "22px solid transparent",
              borderBottom: "22px solid transparent",
            }}
          />
        </button>
      </div>

      <VideoModal
        open={open}
        onOpenChange={setOpen}
        src={SHOWCASE_VIDEO.src}
        poster={SHOWCASE_VIDEO.poster}
        title="Ongoing project preview"
      />
    </section>
  );
}
