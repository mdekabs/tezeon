"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type VideoModalVariant = "showcase" | "gallery";

/**
 * Legacy modal skins:
 * - `showcase` — home `#videoModal` (style.css:1193-1247): 800px black dialog
 *   60px from the top, × tab above the right corner, plays with sound.
 * - `gallery` — `#galleryVideoModal` (style.css:2920-2962): 860px transparent
 *   dialog, large × above, rounded muted player that waits for a click.
 */
const VARIANTS = {
  showcase: {
    content: "top-[60px] max-w-[800px] bg-black max-sm:top-[30px]",
    close:
      "-top-[30px] right-0 size-[30px] bg-[#00000079] text-[30px] leading-none font-normal text-white",
    video: "max-h-[80vh] max-sm:max-h-[70vh]",
    muted: false,
    autoPlay: true,
  },
  gallery: {
    content: "top-10 max-w-[860px] bg-transparent max-md:top-[15px] max-md:w-[calc(100%-20px)]",
    close:
      "-top-[38px] right-0 text-[2rem] leading-none text-white opacity-80 transition-opacity hover:opacity-100",
    video: "max-h-[76vh] rounded-md",
    muted: true,
    autoPlay: false,
  },
} as const;

interface VideoModalProps {
  src: string | null;
  poster?: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: VideoModalVariant;
}

/**
 * Video player dialog. Like the legacy script, the source is attached when
 * the dialog opens and released (pause + clear + load) when it closes.
 */
export function VideoModal({
  src,
  poster,
  title,
  open,
  onOpenChange,
  variant = "showcase",
}: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const skin = VARIANTS[variant];

  useEffect(() => {
    const video = videoRef.current;
    if (!open || !src || !video) return;
    video.src = src;
    if (skin.autoPlay) video.play().catch(() => undefined);
  }, [open, src, skin.autoPlay]);

  const handleOpenChange = (nextOpen: boolean): void => {
    const video = videoRef.current;
    if (!nextOpen && video) {
      video.pause();
      video.removeAttribute("src");
      video.load();
    }
    onOpenChange(nextOpen);
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[9990] bg-black/50 data-[state=open]:animate-fade-in" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          className={cn(
            "fixed left-1/2 z-[9991] w-[calc(100%-30px)] -translate-x-1/2 outline-none data-[state=open]:animate-fade-in",
            skin.content,
          )}
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Close aria-label="Close video" className={cn("absolute z-[999]", skin.close)}>
            &times;
          </DialogPrimitive.Close>
          <video
            ref={videoRef}
            controls
            playsInline
            muted={skin.muted}
            preload="none"
            poster={poster}
            className={cn("block h-auto w-full bg-black object-contain", skin.video)}
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
