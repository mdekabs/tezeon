"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

import { SPRING_TRANSITION } from "@/lib/animations";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import { NAV_LINKS } from "@/lib/data";
import { cn } from "@/lib/utils";

function isCurrent(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * Dark navigation bar (`.nav-bar`) — legacy-exact port:
 * - Cyan `#33d0fd` wrapper behind a navy `#030f27` navbar (style.css:440-462)
 * - STICKY at scrollY > 90px (script.js:23-31): fixed top, max-w 1366px,
 *   shadow `0 2px 5px rgba(0,0,0,.3)`, z-index 999
 * - GLASS at scrollY > 60px (animations.js:156-161 + style.css:3464-3476):
 *   rgba(3,15,39,.65) + blur(20px) saturate(180%) + bottom hairline
 * - Desktop: inline uppercase links, gold active/hover
 * - Mobile: hamburger toggles animated collapse panel, scroll locked
 */
export function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useScrollLock(open);

  useEffect(() => {
    let frame = 0;
    const onScroll = (): void => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const sticky = scrollY > 90;
  const glassed = scrollY > 60;

  return (
    <div className="relative z-40 bg-cyan transition-[box-shadow] duration-300">
      <div
        className={cn(
          "bg-dark transition-all duration-300",
          sticky &&
            "fixed left-1/2 top-0 z-50 w-full max-w-[1366px] -translate-x-1/2 shadow-[0_2px_5px_rgba(0,0,0,0.3)]",
          glassed &&
            "!bg-[rgba(3,15,39,0.65)] backdrop-blur-[20px] backdrop-saturate-[180%] shadow-[0_4px_30px_rgba(0,0,0,0.22)] border-b border-white/[0.07]",
        )}
      >
        <div className="mx-auto flex w-full max-w-[1366px] items-center justify-between px-4 sm:px-6 lg:px-0">
          <span className="py-4 text-sm font-bold tracking-[0.2em] text-white lg:px-5 lg:py-5">
            MENU
          </span>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav-links"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center text-white transition-colors hover:text-primary lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>

          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                    className={cn(
                      "block px-[15px] py-5 text-[15px] font-medium uppercase transition-colors",
                      isCurrent(pathname, link.href)
                        ? "text-primary"
                        : "text-white hover:text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div
              id="mobile-nav-links"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={SPRING_TRANSITION}
              className="overflow-hidden bg-dark lg:hidden"
            >
              <ul className="mx-auto flex w-full max-w-[1366px] flex-col px-4 py-2.5 sm:px-6">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "block border-b border-white/[0.07] py-2 text-sm font-medium transition-colors last:border-b-0",
                        isCurrent(pathname, link.href)
                          ? "text-primary"
                          : "text-white hover:text-primary",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      {/* Spacer when sticky so the following content doesn't jump */}
      {sticky ? <div aria-hidden="true" className="h-0" /> : null}
    </div>
  );
}