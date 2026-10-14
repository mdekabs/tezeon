"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

import { useScrollLock } from "@/hooks/use-scroll-lock";
import { PRELOADER_HARD_CAP_MS, PRELOADER_MIN_DURATION_MS } from "@/lib/animations";
import { PreloaderJSX } from "@/components/shared/preloader-jsx";

gsap.registerPlugin(useGSAP);

export function HomePreloader() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);

  useScrollLock(!dismissed);

  useGSAP(
    (_context, contextSafe) => {
      if (!contextSafe) {
        return;
      }

      const select = gsap.utils.selector(scopeRef);
      const sequence = gsap.timeline({ defaults: { ease: "power2.out" } });

      sequence
        .from(select(".pre-logo"), {
          scale: 0.4,
          opacity: 0,
          duration: 0.55,
          ease: "back.out(2.5)",
        })
        .from(
          select(".pre-bub"),
          { opacity: 0, y: 20, stagger: 0.18, duration: 0.6 },
          "-=0.3",
        )
        .to(select(".pre-drop"), { opacity: 1, duration: 0.18 }, "+=0.15")
        .to(select(".pre-drop"), {
          scaleY: 1.5,
          scaleX: 0.75,
          duration: 0.18,
          ease: "power1.in",
        })
        .to(select(".pre-drop"), {
          y: 108,
          scaleY: 1.3,
          scaleX: 0.7,
          duration: 0.38,
          ease: "power3.in",
        })
        .to(select(".pre-drop"), {
          y: 114,
          scaleY: 0.12,
          scaleX: 3,
          opacity: 0,
          duration: 0.12,
          ease: "power2.out",
        })
        .set(select(".pre-drop-sm"), { opacity: 1 }, "-=0.05")
        .to(
          select(".pre-drop-sm"),
          { y: 95, scaleY: 1.2, scaleX: 0.75, duration: 0.32, ease: "power3.in" },
          "-=0.02",
        )
        .to(select(".pre-drop-sm"), {
          y: 100,
          scaleY: 0.1,
          scaleX: 2.5,
          opacity: 0,
          duration: 0.1,
        })
        .fromTo(
          select(".pre-ring-1"),
          { scale: 0, opacity: 1 },
          { scale: 5, opacity: 0, duration: 1.3, ease: "power2.out" },
          "-=0.1",
        )
        .fromTo(
          select(".pre-ring-2"),
          { scale: 0, opacity: 0.7 },
          { scale: 5, opacity: 0, duration: 1.55, ease: "power2.out" },
          "-=1.25",
        )
        .fromTo(
          select(".pre-ring-3"),
          { scale: 0, opacity: 0.45 },
          { scale: 5, opacity: 0, duration: 1.8, ease: "power2.out" },
          "-=1.5",
        )
        .fromTo(
          select(".pre-name-fill"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power3.inOut" },
          "-=1.2",
        )
        .from(select(".pre-tagline"), { opacity: 0, y: 14, duration: 0.5 }, "-=0.5");

      sequence.call(
        () => {
          const fill = select(".pre-fill")[0] as HTMLDivElement | undefined;
          if (fill) {
            fill.style.width = "100%";
          }
        },
        undefined,
        0.95,
      );

      let hasDismissed = false;
      const startTime = Date.now();

      const dismiss = contextSafe((): void => {
        if (hasDismissed) {
          return;
        }
        hasDismissed = true;

        gsap.to(scopeRef.current, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => {
            setDismissed(true);
          },
        });
      });

      const handleLoad = (): void => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, PRELOADER_MIN_DURATION_MS - elapsed);
        window.setTimeout(dismiss, remaining);
      };

      if (document.readyState === "complete") {
        handleLoad();
      } else {
        window.addEventListener("load", handleLoad, { once: true });
      }

      const hardCap = window.setTimeout(dismiss, PRELOADER_HARD_CAP_MS);

      return () => {
        window.removeEventListener("load", handleLoad);
        window.clearTimeout(hardCap);
      };
    },
    { scope: scopeRef },
  );

  if (dismissed) {
    return null;
  }

  return <PreloaderJSX scopeRef={scopeRef} />;
}