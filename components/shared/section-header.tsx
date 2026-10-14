import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/**
 * Gold eyebrow + bold heading pair used above every legacy section
 * (`.section-header` in the source markup).
 */
export function SectionHeader({
  eyebrow,
  title,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <p className="mb-2 text-base font-semibold text-primary">{eyebrow}</p> : null}
      <h2 className="text-3xl font-bold leading-tight text-dark lg:text-4xl">{title}</h2>
    </div>
  );
}