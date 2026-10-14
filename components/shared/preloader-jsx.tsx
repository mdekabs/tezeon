"use client";

import Image from "next/image";
import { COMPANY } from "@/lib/data";

const BUBBLE_SPECS = [
  { left: "12%", bottom: "-22px", size: "18px", duration: "7.5s", delay: "0s" },
  { left: "30%", bottom: "-22px", size: "10px", duration: "9.2s", delay: "1.2s" },
  { left: "56%", bottom: "-22px", size: "24px", duration: "8s", delay: "2.5s" },
  { left: "75%", bottom: "-22px", size: "14px", duration: "10.5s", delay: "0.7s" },
  { left: "88%", bottom: "-22px", size: "8px", duration: "6.8s", delay: "3.1s" },
] as const;

export function PreloaderJSX({ scopeRef }: { scopeRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={scopeRef}
      aria-hidden="true"
      className="fixed inset-0 z-[300] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(155deg, var(--color-preloader-bg-start) 0%, var(--color-preloader-bg-mid) 40%, var(--color-preloader-bg-end) 70%, #0a1e3d 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 65% 55% at 50% 44%, rgba(253, 190, 51, 0.09) 0%, transparent 68%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {BUBBLE_SPECS.map((spec, i) => (
          <span
            key={i}
            className="pre-bub absolute block rounded-full"
            style={{
              left: spec.left,
              bottom: spec.bottom,
              width: spec.size,
              height: spec.size,
              animationDuration: spec.duration,
              animationDelay: spec.delay,
              backgroundColor: "rgba(253, 190, 51, 0.1)",
              border: "1px solid rgba(253, 190, 51, 0.18)",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6">
        <div className="relative flex flex-col items-center">
          <Image
            src={COMPANY.logo}
            alt=""
            width={220}
            height={88}
            priority
            className="pre-logo h-auto w-[180px] sm:w-[220px]"
            style={{
              filter: "drop-shadow(0 0 18px rgba(253, 190, 51, 0.55))",
            }}
          />
          <span
            className="pre-drop absolute -bottom-1 block"
            style={{
              left: "50%",
              marginLeft: "-7px",
              width: "14px",
              height: "20px",
              background: "radial-gradient(ellipse at 38% 28%, rgba(175, 230, 255, 0.96) 0%, rgba(40, 130, 230, 0.88) 50%, rgba(10, 55, 155, 0.92) 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0,
              filter: "drop-shadow(0 3px 8px rgba(0, 140, 255, 0.55))",
              transformOrigin: "center top",
            }}
          />
          <span
            className="pre-drop pre-drop-sm absolute -bottom-1 block"
            style={{
              left: "calc(50% + 11px)",
              marginLeft: 0,
              width: "9px",
              height: "13px",
              background: "radial-gradient(ellipse at 38% 28%, rgba(175, 230, 255, 0.96) 0%, rgba(40, 130, 230, 0.88) 50%, rgba(10, 55, 155, 0.92) 100%)",
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              opacity: 0,
              filter: "drop-shadow(0 3px 8px rgba(0, 140, 255, 0.55))",
              transformOrigin: "center top",
            }}
          />
        </div>

        {/* Name: dim base layer + gold fill rising from the bottom */}
        <div className="relative mt-8 select-none">
          <span className="block text-3xl font-bold tracking-tight text-white/14 sm:text-4xl">
            Tezeon Services
          </span>
          <span
            className="pre-name-fill absolute inset-0 block text-3xl font-bold tracking-tight text-primary sm:text-4xl"
            style={{ textShadow: "0 0 24px rgba(253, 190, 51, 0.48)" }}
          >
            Tezeon Services
          </span>
        </div>

        {/* Ripple pool: elliptical rings from impact */}
        <div className="relative mt-6" style={{ width: "220px", height: "38px" }}>
          <span
            className="pre-ring pre-ring-1 absolute inset-0 border-2 rounded-[50%] opacity-0"
            style={{ borderColor: "rgba(40, 150, 255, 0.7)", transform: "scale(0)", transformOrigin: "center" }}
          />
          <span
            className="pre-ring pre-ring-2 absolute inset-0 border-2 rounded-[50%] opacity-0"
            style={{ borderColor: "rgba(110, 185, 255, 0.52)", transform: "scale(0)", transformOrigin: "center" }}
          />
          <span
            className="pre-ring pre-ring-3 absolute inset-0 border-2 rounded-[50%] opacity-0"
            style={{ borderColor: "rgba(170, 215, 255, 0.36)", transform: "scale(0)", transformOrigin: "center" }}
          />
        </div>

        <p
          className="pre-tagline mt-4 text-xs font-medium uppercase text-white/50"
          style={{ letterSpacing: "4px", opacity: 0 }}
        >
          Water Engineering Excellence
        </p>

        {/* Progress bar — 200×2px, 1.85s fill */}
        <div className="mt-8" style={{ width: "200px" }}>
          <div className="h-0.5 w-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="pre-fill h-full w-0"
              style={{
                background: "linear-gradient(90deg, #fdbe33 0%, #ffe080 100%)",
                transition: "width 1.85s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Animated SVG waves — 2 full periods for a seamless loop */}
      <div className="pointer-events-none absolute bottom-0 left-0 w-[200%]" style={{ height: "90px" }}>
        <svg
          viewBox="0 0 2880 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="block h-full w-full animate-wave-shift"
          aria-hidden="true"
        >
          <path
            d="M0,50 C240,90 480,10 720,50 C960,90 1200,10 1440,50 C1680,90 1920,10 2160,50 C2400,90 2640,10 2880,50 L2880,100 L0,100 Z"
            style={{ fill: "rgba(253, 190, 51, 0.07)" }}
          />
        </svg>
        <svg
          viewBox="0 0 2880 100"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 block h-full w-full animate-wave-shift-reverse"
          aria-hidden="true"
        >
          <path
            d="M0,65 C360,20 720,90 1080,40 C1260,15 1380,65 1440,55 C1800,20 2160,90 2520,40 C2700,15 2820,65 2880,55 L2880,100 L0,100 Z"
            style={{ fill: "rgba(30, 100, 220, 0.09)" }}
          />
        </svg>
      </div>
    </div>
  );
}

