"use client";

import { useEffect, useRef, useState } from "react";

import { useScrollLock } from "@/hooks/use-scroll-lock";

/**
 * Inner-page loader — faithful port of legacy `#tez-page-loader`:
 * - Navy `#030f27` backdrop
 * - 3px gold gradient bar pinned to the TOP edge that fills ONCE over 0.75s
 * - Dismisses with a scaleY wipe-up (transform-origin top) over 0.75s
 *   after window load, minimum 800ms, hard cap 3000ms
 */
export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);

  useScrollLock(!dismissed);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader) {
      return;
    }

    let done = false;
    const startTime = Date.now();

    /* Kick the fill bar on next frame so the CSS transition runs once. */
    const frame = requestAnimationFrame(() => {
      const fill = loader.querySelector<HTMLElement>(".tpl-fill-bar");
      if (fill) {
        fill.style.width = "100%";
      }
    });

    /* Arrow closures inherit the non-null narrowing of `loader` above. */
    const dismiss = (): void => {
      if (done) {
        return;
      }
      done = true;

      loader.style.transition =
        "transform 0.75s cubic-bezier(0.65, 0, 0.35, 1)";
      loader.style.transform = "scaleY(0)";
      loader.style.transformOrigin = "top center";

      const onEnd = (): void => {
        setDismissed(true);
      };
      loader.addEventListener("transitionend", onEnd, { once: true });
      /* Fallback if transitionend never fires. */
      window.setTimeout(onEnd, 900);
    }

    const onLoad = (): void => {
      const elapsed = Date.now() - startTime;
      window.setTimeout(dismiss, Math.max(0, 800 - elapsed));
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    const cap = window.setTimeout(dismiss, 3000);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(cap);
    };
  }, []);

  if (dismissed) {
    return null;
  }

  return (
    <div
      ref={loaderRef}
      aria-hidden="true"
      className="fixed inset-0 z-[200] overflow-hidden bg-dark"
      style={{ willChange: "transform" }}
    >
      {/* 3px gold gradient bar pinned to the top edge — legacy `.tpl-fill-bar` */}
      <div
        className="tpl-fill-bar absolute left-0 top-0 h-[3px] w-0"
        style={{
          background: "linear-gradient(90deg, #fdbe33 0%, #ffda80 100%)",
          transition: "width 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}
