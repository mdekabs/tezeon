import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  align?: "center" | "left";
  className?: string;
}

/**
 * Legacy `.section-header` (style.css:754-778, 2739-2746, 3154-3162):
 * gold glass "pill" eyebrow above a 50px bold heading, 45px bottom margin.
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
        "relative mb-[45px] w-full",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p className="glass-sub-label mb-[5px] inline-block px-4 py-[3px] text-lg font-semibold text-primary max-[480px]:text-[15px]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="relative m-0 text-[50px] font-bold max-md:text-[30px] max-[480px]:text-2xl">
        {title}
      </h2>
    </div>
  );
}
