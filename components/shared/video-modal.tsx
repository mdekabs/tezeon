"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useCallback } from "react";

interface VideoModalProps {
  src: string | null;
  poster?: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/** Start playback, falling back to muted if the browser blocks sound. */
function playWithFallback(video: HTMLVideoElement): void {
  video.play().catch(() => {
    video.muted = true;
    video.play().catch(() => undefined);
  });
}

/**
 * Video player dialog — legacy `#galleryVideoModal` look (style.css:2920-2962):
 * 860px transparent dialog with a large × above a rounded player.
 *
 * The dialog's content mounts a frame after `open` flips (portal), so playback
 * is started from a callback ref — i.e. exactly when the <video> exists.
 * Closing unmounts the element, which stops the download.
 */
export function VideoModal({ src, poster, title, open, onOpenChange }: VideoModalProps) {
  const attachVideo = useCallback((video: HTMLVideoElement | null) => {
    if (video) playWithFallback(video);
  }, []);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
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
          {src ? (
            <video
              key={src}
              ref={attachVideo}
              src={src}
              poster={poster}
              controls
              playsInline
              preload="auto"
              className="block h-auto max-h-[76vh] w-full rounded-md bg-black object-contain"
            />
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
