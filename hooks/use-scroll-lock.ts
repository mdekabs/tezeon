"use client";

import { useEffect } from "react";

/**
 * Locks body scrolling while an overlay (mobile drawer, preloader, modal) is
 * open and restores the previous value on unlock/unmount.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [locked]);
}