"use client";

import { useEffect, type RefObject } from "react";

/**
 * While `active`, calls `onClose` once less than `minVisibleRatio` of the
 * element remains in the viewport (scrolled away) or when Escape is pressed.
 * Used by inline video players so playback never continues off-screen.
 */
export function useCloseWhenHidden(
  ref: RefObject<Element | null>,
  active: boolean,
  onClose: () => void,
  minVisibleRatio = 0.25,
): void {
  useEffect(() => {
    const element = ref.current;
    if (!active || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio < minVisibleRatio) onClose();
      },
      { threshold: [0, minVisibleRatio] },
    );
    observer.observe(element);

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [ref, active, onClose, minVisibleRatio]);
}
