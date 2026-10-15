"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { useScrollLock } from "@/hooks/use-scroll-lock";
import { PRELOADER_HARD_CAP_MS, PRELOADER_MIN_DURATION_MS } from "@/lib/animations";
import { COMPANY } from "@/lib/data";

gsap.registerPlugin(useGSAP);

/** Legacy `.pre-bub.b1`–`.b5` sizes, positions and timings. */
const BUBBLES = [
  { size: 18, left: "12%", duration: "7.5s", delay: "0s" },
  { size: 10, left: "30%", duration: "9.2s", delay: "1.2s" },
  { size: 24, left: "56%", duration: "8s", delay: "2.5s" },
  { size: 14, left: "75%", duration: "10.5s", delay: "0.7s" },
  { size: 8, left: "88%", duration: "6.8s", delay: "3.1s" },
] as const;

/**
 * Home-page water-drop preloader — legacy index.html `#tez-preloader` and its
 * inline GSAP script: logo pop, falling drops, ripple rings, gold name fill,
 * then a wipe-up after `load` (min 2.2s, hard cap 4.5s).
 */
export function HomePreloader() {
  const scopeRef = useRef<HTMLDivElement>(null);
  const [dismissed, setDismissed] = useState(false);

  useScrollLock(!dismissed);

  /* Safety net: never let a stalled `load` event or tween block the page. */
  useEffect(() => {
    const timeout = window.setTimeout(() => setDismissed(true), PRELOADER_HARD_CAP_MS + 1000);
    return () => window.clearTimeout(timeout);
  }, []);

  useGSAP(
    (_context, contextSafe) => {
      const root = scopeRef.current;
      if (!root || !contextSafe) return;
      const q = gsap.utils.selector(root);

      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .from(q("[data-pre=logo]"), { scale: 0.4, opacity: 0, duration: 0.55, ease: "back.out(2.5)" })
        .from(q("[data-pre=bubble]"), { opacity: 0, y: 20, stagger: 0.18, duration: 0.6 }, "-=0.3")
        .to(q("[data-pre=drop]"), { opacity: 1, duration: 0.18 }, "+=0.15")
        .to(q("[data-pre=drop]"), { scaleY: 1.5, scaleX: 0.75, duration: 0.18, ease: "power1.in" })
        .to(q("[data-pre=drop]"), { y: 108, scaleY: 1.3, scaleX: 0.7, duration: 0.38, ease: "power3.in" })
        .to(q("[data-pre=drop]"), { y: 114, scaleY: 0.12, scaleX: 3, opacity: 0, duration: 0.12 })
        .set(q("[data-pre=drop-sm]"), { opacity: 1 }, "-=0.05")
        .to(q("[data-pre=drop-sm]"), { y: 95, scaleY: 1.2, scaleX: 0.75, duration: 0.32, ease: "power3.in" }, "-=0.02")
        .to(q("[data-pre=drop-sm]"), { y: 100, scaleY: 0.1, scaleX: 2.5, opacity: 0, duration: 0.1 })
        .fromTo(q("[data-pre=ring-1]"), { scale: 0, opacity: 1 }, { scale: 5, opacity: 0, duration: 1.3 }, "-=0.1")
        .fromTo(q("[data-pre=ring-2]"), { scale: 0, opacity: 0.7 }, { scale: 5, opacity: 0, duration: 1.55 }, "-=1.25")
        .fromTo(q("[data-pre=ring-3]"), { scale: 0, opacity: 0.45 }, { scale: 5, opacity: 0, duration: 1.8 }, "-=1.5")
        .fromTo(
          q("[data-pre=name-fill]"),
          { clipPath: "inset(100% 0% 0% 0%)" },
          { clipPath: "inset(0% 0% 0% 0%)", duration: 1.05, ease: "power3.inOut" },
          "-=1.2",
        )
        .from(q("[data-pre=tagline]"), { opacity: 0, y: 14, duration: 0.5 }, "-=0.5")
        .call(
          () => {
            const fill = q("[data-pre=fill]")[0] as HTMLElement | undefined;
            if (fill) fill.style.width = "100%";
          },
          [],
          0.95,
        );

      let done = false;
      const startTime = Date.now();

      const dismiss = contextSafe(() => {
        if (done) return;
        done = true;
        gsap.to(root, {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 0.9,
          ease: "power4.inOut",
          onComplete: () => setDismissed(true),
        });
      });

      const onLoad = (): void => {
        window.setTimeout(dismiss, Math.max(0, PRELOADER_MIN_DURATION_MS - (Date.now() - startTime)));
      };

      if (document.readyState === "complete") onLoad();
      else window.addEventListener("load", onLoad, { once: true });
      const hardCap = window.setTimeout(dismiss, PRELOADER_HARD_CAP_MS);

      return () => {
        window.removeEventListener("load", onLoad);
        window.clearTimeout(hardCap);
      };
    },
    { scope: scopeRef },
  );

  if (dismissed) return null;

  return (
    <div ref={scopeRef} aria-hidden="true" className="preloader-root">
      <div className="preloader-ambient">
        {BUBBLES.map((bubble) => (
          <span
            key={bubble.left}
            data-pre="bubble"
            className="preloader-bubble"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.left,
              animationDuration: bubble.duration,
              animationDelay: bubble.delay,
            }}
          />
        ))}
      </div>

      <div className="preloader-content">
        <div className="preloader-logo-wrap">
          <Image data-pre="logo" src={COMPANY.logo} alt="" width={100} height={100} priority className="preloader-logo" />
          <div data-pre="drop" className="preloader-drop" />
          <div data-pre="drop-sm" className="preloader-drop preloader-drop-small" />
        </div>

        <div className="preloader-name-wrap">
          <span className="preloader-name-base">Tezeon Services</span>
          <span data-pre="name-fill" className="preloader-name-fill">
            Tezeon Services
          </span>
        </div>

        <div className="preloader-ripple-pool">
          <div data-pre="ring-1" className="preloader-ring" />
          <div data-pre="ring-2" className="preloader-ring" />
          <div data-pre="ring-3" className="preloader-ring" />
        </div>

        <p data-pre="tagline" className="preloader-tagline">
          Water Engineering Excellence
        </p>

        <div className="preloader-bar-wrap">
          <div className="preloader-bar">
            <div data-pre="fill" className="preloader-fill" />
          </div>
        </div>
      </div>

      <div className="preloader-waves">
        <svg viewBox="0 0 2880 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path
            className="preloader-wave-front"
            d="M0,50 C240,90 480,10 720,50 C960,90 1200,10 1440,50 C1680,90 1920,10 2160,50 C2400,90 2640,10 2880,50 L2880,100 L0,100 Z"
          />
          <path
            className="preloader-wave-back"
            d="M0,65 C360,20 720,90 1080,40 C1260,15 1380,65 1440,55 C1800,20 2160,90 2520,40 C2700,15 2820,65 2880,55 L2880,100 L0,100 Z"
          />
        </svg>
      </div>
    </div>
  );
}
