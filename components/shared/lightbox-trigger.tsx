"use client";

import { useState } from "react";

import { buttonVariants } from "@/components/ui/button";
import { Lightbox } from "@/components/shared/lightbox";
import { cn } from "@/lib/utils";

interface LightboxTriggerProps {
  src: string;
  alt: string;
  caption?: string;
  /** Accessible label for the trigger button (defaults to "View {alt}"). */
  label?: string;
  className?: string;
}

/**
 * Self-contained "+" affordance used on service, project and gallery cards.
 * Owns its own dialog state so the parent section can stay a Server Component.
 */
export function LightboxTrigger({
  src,
  alt,
  caption,
  label,
  className,
}: LightboxTriggerProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label={label ?? `View ${alt}`}
        onClick={() => setOpen(true)}
        className={cn(buttonVariants({ variant: "primary", size: "icon" }), className)}
      >
        +
      </button>
      <Lightbox open={open} onOpenChange={setOpen} src={src} alt={alt} caption={caption} />
    </>
  );
}