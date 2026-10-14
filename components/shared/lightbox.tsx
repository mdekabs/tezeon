"use client";

import Image from "next/image";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface LightboxProps {
  src: string;
  alt: string;
  caption?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Full-screen image viewer replacing the legacy jQuery `lightbox` plugin.
 */
export function Lightbox({ src, alt, caption, open, onOpenChange }: LightboxProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">{caption ?? alt}</DialogTitle>
        <figure className="relative aspect-[3/2] w-full overflow-hidden bg-dark">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 64rem, calc(100vw - 2rem)"
            className="object-contain"
            priority
          />
        </figure>
        {caption ? (
          <figcaption className="mt-3 text-center text-sm font-medium text-white">
            {caption}
          </figcaption>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}