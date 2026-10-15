import localFont from "next/font/local";

import { cn } from "@/lib/utils";

/** The legacy template's Flaticon icon font (legacy/lib/flaticon), self-hosted. */
const flaticonFont = localFont({
  src: [
    { path: "../../app/fonts/Flaticon.woff2", style: "normal" },
    { path: "../../app/fonts/Flaticon.woff", style: "normal" },
  ],
  display: "block",
  preload: false,
});

/** Code points from `legacy/lib/flaticon/font/flaticon.css`. */
const GLYPHS = {
  concrete: "\u{f100}",
  worker: "\u{f101}",
  measure: "\u{f102}",
  building: "\u{f103}",
  brush: "\u{f104}",
  crane: "\u{f105}",
  call: "\u{f106}",
  calendar: "\u{f107}",
  "send-mail": "\u{f108}",
  address: "\u{f109}",
} as const;

export type FlaticonName = keyof typeof GLYPHS;

interface FlaticonProps {
  name: FlaticonName;
  /** Size, line-height and colour utilities, e.g. `text-[40px] leading-normal text-dark`. */
  className?: string;
}

/** Decorative Flaticon glyph — equivalent of legacy `<i class="flaticon-*">`. */
export function Flaticon({ name, className }: FlaticonProps) {
  return (
    <i aria-hidden="true" className={cn(flaticonFont.className, "not-italic", className)}>
      {GLYPHS[name]}
    </i>
  );
}
