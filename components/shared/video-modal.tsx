"use client";

import { useEffect, useRef } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

interface VideoModalProps {
  src: string | null;
  poster?: string;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Video player dialog replacing the legacy Bootstrap `#videoModal` /
 * `#galleryVideoModal` markup. Mirrors the legacy teardown behaviour: on
 * close the video is paused and its resource released (`src` cleared +
 * `load()`), which stops buffering and prevents leaked media pipelines.
 */
export function VideoModal({ src, poster, title, open, onOpenChange }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open && src && videoRef.current) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise) {
        playPromise.catch(() => {
          /* Autoplay can be blocked; controls remain available. */
        });
      }
    }
  }, [open, src]);

  const handleOpenChange = (nextOpen: boolean): void => {
    if (!nextOpen && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.removeAttribute("src");
      videoRef.current.load();
    }
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl border-none bg-transparent p-4 shadow-none">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {/* Muted player; legacy media ships without caption tracks. */}
        <video
          ref={videoRef}
          controls
          playsInline
          muted
          preload="none"
          poster={poster}
          className="aspect-video w-full bg-black object-contain"
        >
          {src ? <source src={src} /> : null}
        </video>
      </DialogContent>
    </Dialog>
  );
}