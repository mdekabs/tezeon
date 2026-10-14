"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface UseCounterResult {
  value: number;
  /** Starts (or restarts) the count-up animation toward the target. */
  start: () => void;
}

/**
 * rAF-driven count-up hook that replaces the legacy `counterup` jQuery plugin.
 * SSR-safe: initial value is 0 and animation only begins when `start()` is
 * invoked from a client-side viewport trigger.
 */
export function useCounter(target: number, durationMs: number): UseCounterResult {
  const [value, setValue] = useState(0);
  const frameRef = useRef<number | null>(null);

  const stop = useCallback((): void => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
  }, []);

  const start = useCallback((): void => {
    stop();
    const startTime = performance.now();

    const tick = (now: number): void => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = null;
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [durationMs, stop, target]);

  useEffect(() => stop, [stop]);

  return { value, start };
}