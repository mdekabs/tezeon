"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";

import { useScrollPosition } from "@/hooks/use-scroll-position";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Scroll offsets from legacy script.js (sticky) and animations.js (glass). */
const STICKY_OFFSET = 90;
const GLASS_OFFSET = 60;

function isCurrent(pathname: string, href: string): boolean {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Bootstrap 4 `.navbar-dark .navbar-toggler-icon` artwork. */
function TogglerIcon() {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" className="size-[1.5em]">
      <path
        d="M4 7h22M4 15h22M4 23h22"
        stroke="rgba(255,255,255,0.5)"
        strokeLinecap="round"
        strokeMiterlimit={10}
        strokeWidth={2}
      />
    </svg>
  );
}

/**
 * Legacy `.nav-bar` (style.css:440-538, 2777-2789, 3464-3474):
 * - ≥992px: cyan frame (75px side padding) around a navy navbar with
 *   left-aligned uppercase links; the "MENU" brand is hidden.
 * - <992px: "MENU" brand + toggler, links in a collapsible navy panel.
 * - Fixed to the top past 90px of scroll, frosted glass past 60px. A spacer
 *   holds the navbar's height so content doesn't jump when it detaches.
 */
export function MainNav() {
  const pathname = usePathname();
  const scrollY = useScrollPosition();
  const [open, setOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  const sticky = scrollY > STICKY_OFFSET;
  const glassed = scrollY > GLASS_OFFSET;

  useLayoutEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const observer = new ResizeObserver(() => setHeight(bar.offsetHeight));
    observer.observe(bar);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={barRef}
        className={cn(
          "relative bg-cyan transition-[background,backdrop-filter,box-shadow] duration-400 lg:px-[75px]",
          sticky &&
            "fixed top-0 left-1/2 z-[999] w-full max-w-[1366px] -translate-x-1/2 shadow-[0_2px_5px_rgba(0,0,0,0.3)] lg:px-0",
        )}
      >
        <nav
          aria-label="Main navigation"
          className={cn(
            "flex flex-wrap items-center justify-between bg-dark p-[15px] lg:flex-nowrap lg:justify-start lg:p-5",
            glassed &&
              "border-b border-white/[0.07] !bg-[rgba(3,15,39,0.65)] shadow-[0_4px_30px_rgba(0,0,0,0.22)] backdrop-blur-[20px] backdrop-saturate-[180%]",
          )}
        >
          <span className="mr-4 py-[0.3125rem] text-xl leading-normal text-white lg:hidden">
            MENU
          </span>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="primary-nav-links"
            aria-label="Toggle navigation"
            className="rounded-[0.25rem] border border-white/10 px-3 py-1 text-xl leading-none lg:hidden"
          >
            <TogglerIcon />
          </button>

          {/* Desktop links */}
          <ul className="hidden lg:mr-auto lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <NavLink href={link.href} label={link.label} active={isCurrent(pathname, link.href)} />
              </li>
            ))}
          </ul>

          {/* Mobile collapse */}
          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                id="primary-nav-links"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="w-full basis-full overflow-hidden lg:hidden"
              >
                <ul className="bg-dark px-[15px] py-2.5">
                  {NAV_LINKS.map((link) => (
                    <li key={link.href} className="border-b border-white/[0.07] last:border-b-0">
                      <NavLink
                        href={link.href}
                        label={link.label}
                        active={isCurrent(pathname, link.href)}
                        onNavigate={() => setOpen(false)}
                      />
                    </li>
                  ))}
                </ul>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </nav>
      </div>
      {sticky ? <div aria-hidden="true" style={{ height }} /> : null}
    </>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  active: boolean;
  onNavigate?: () => void;
}

function NavLink({ href, label, active, onNavigate }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={active ? "page" : undefined}
      className={cn(
        "block px-[5px] py-2 transition-none hover:text-primary lg:px-2.5 lg:pb-2 lg:pt-2.5 lg:text-[15px] lg:uppercase",
        active ? "text-primary" : "text-white",
      )}
    >
      {label}
    </Link>
  );
}
