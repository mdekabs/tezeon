"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useEffect, useRef } from "react";

interface VideoModalProps {
  src: string | null;
  poster?: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Legacy `#galleryVideoModal` (style.css:2920-2962): 860px transparent dialog
 * with a large × above it and a rounded, muted player that waits for a click.
 * As in the legacy script, the source is attached on open and released
 * (pause + clear + load) on close so nothing keeps buffering.
 */
export function VideoModal({ src, poster, title, open, onOpenChange }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (open && src && video) video.src = src;
  }, [open, src]);

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
          className="fixed top-10 left-1/2 z-[9991] w-[calc(100%-30px)] max-w-[860px] -translate-x-1/2 outline-none data-[state=open]:animate-fade-in max-md:top-[15px] max-md:w-[calc(100%-20px)]"
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <DialogPrimitive.Close
            aria-label="Close video"
            className="absolute -top-[38px] right-0 z-[999] text-[2rem] leading-none text-white opacity-80 transition-opacity hover:opacity-100"
          >
            &times;
          </DialogPrimitive.Close>
          <video
            ref={videoRef}
            controls
            playsInline
            muted
            preload="none"
            poster={poster}
            className="block h-auto max-h-[76vh] w-full rounded-md bg-black object-contain"
          />
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
