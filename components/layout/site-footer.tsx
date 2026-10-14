import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { OpeningStatus } from "@/components/shared/opening-status";
import { SocialIcon } from "@/components/shared/social-icons";
import {
  COMPANY,
  FOOTER_MENU,
  FOOTER_PAGES,
  FOOTER_SERVICE_AREAS,
  FOOTER_SOCIALS,
} from "@/lib/data";

const CONTACT_ROWS = [
  { icon: MapPin, text: COMPANY.addressLine },
  { icon: Phone, text: COMPANY.phone },
  { icon: Mail, text: COMPANY.email },
] as const;

/**
 * Apple-style structural footer anchor:
 *  - ambient gold radial glow behind the branding area,
 *  - hairline gradient divider instead of a hard border,
 *  - 4 → 2 → 1 responsive column matrix with muted link hierarchy,
 *  - liquid-glass newsletter card,
 *  - legal bar carrying locale chip, live office-status indicator, copyright
 *    and the HTML Codex attribution required by the CC BY 4.0 license.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-dark text-white/60">
      {/* Ambient brand glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-72 w-[48rem] max-w-none -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(253,190,51,0.14),transparent_70%)] blur-3xl"
      />

      <div className="hairline-divider" />

      <div className="container-x relative grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4 lg:py-20">
        <div>
          <h2 className="mb-5 text-base font-semibold tracking-tight text-white">
            Office Contact
          </h2>
          <ul className="space-y-3 text-sm">
            {CONTACT_ROWS.map((row) => (
              <li key={row.text} className="flex items-start gap-2.5">
                <row.icon className="mt-0.5 size-4 shrink-0 text-brand-gold" aria-hidden="true" />
                <span className="text-white/60">{row.text}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex items-center gap-2">
            {FOOTER_SOCIALS.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                aria-label={social.platform}
                className="grid size-9 place-items-center rounded-full border border-white/10 text-white/60 transition-colors duration-300 hover:border-brand-gold hover:bg-brand-gold hover:text-dark"
              >
                <SocialIcon platform={social.platform} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-5 text-base font-semibold tracking-tight text-white">
            Services Areas
          </h2>
          <ul className="space-y-2.5 text-sm">
            {FOOTER_SERVICE_AREAS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-base font-semibold tracking-tight text-white">
            Useful Pages
          </h2>
          <ul className="space-y-2.5 text-sm">
            {FOOTER_PAGES.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="text-white/60 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-5 text-base font-semibold tracking-tight text-white">
            Newsletter
          </h2>
          <div className="glass-panel-dark rounded-2xl p-5">
            <p className="text-sm text-white/60">Subscribe to our newsletter</p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-5 text-sm">
          {FOOTER_MENU.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-white/50 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-5 text-sm md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 md:justify-start">
            <p>
              ©{" "}
              <Link href="/" className="text-white/60 transition-colors hover:text-white">
                tezeonservicesltd.com
              </Link>
              , All Right Reserved.
            </p>
            <span
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50"
              title="This site is published in English."
            >
              <Globe className="size-3" aria-hidden="true" />
              English · NG
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <OpeningStatus />
            <p>
              Designed By{" "}
              <a
                href="https://htmlcodex.com"
                rel="noopener noreferrer"
                target="_blank"
                className="text-white/60 transition-colors hover:text-white"
              >
                HTML Codex
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}