"use client";

import { useEffect, useState } from "react";

/**
 * SSR-safe scroll offset hook. Replaces the legacy
 * `window.addEventListener('scroll', fn)` bindings with a passive listener,
 * rAF-batched state updates and deterministic teardown.
 */
export function useScrollPosition(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let frame = 0;

    const handleScroll = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return scrollY;
}