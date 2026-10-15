import Link from "next/link";
import type { ReactNode } from "react";
import { FaAngleRight, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

import { NewsletterForm } from "@/components/layout/newsletter-form";
import { SocialIcon } from "@/components/shared/social-icons";
import {
  COMPANY,
  FOOTER_MENU,
  FOOTER_PAGES,
  FOOTER_SERVICE_AREAS,
  FOOTER_SOCIALS,
} from "@/lib/data";
import type { NavLinkItem } from "@/types";

const CONTACT_ROWS = [
  { icon: FaMapMarkerAlt, text: COMPANY.addressLine },
  { icon: FaPhoneAlt, text: COMPANY.phone },
  { icon: FaEnvelope, text: COMPANY.email },
] as const;

/**
 * Legacy `.footer` (style.css:2388-2566, 2698-2723): four columns (contact,
 * service areas, useful pages, newsletter), a bordered link strip and the
 * copyright row carrying the HTML Codex credit required by the template licence.
 */
export function SiteFooter() {
  return (
    <footer className="relative mt-[45px] bg-footer-gradient pt-[90px] text-white">
      <div className="container-bs">
        <div className="-mx-[15px] flex flex-wrap">
          <FooterColumn title="Office Contact">
            {CONTACT_ROWS.map((row) => (
              <p key={row.text} className="mb-4">
                <row.icon aria-hidden="true" className="inline w-[25px] align-[-0.125em]" />
                {row.text}
              </p>
            ))}
            <div className="mt-5">
              {FOOTER_SOCIALS.map((social) => (
                <a
                  key={social.platform}
                  href={social.href}
                  aria-label={social.platform}
                  className="group mr-1 inline-flex size-10 items-center justify-center rounded-[60px] border border-white/30 transition-all duration-300 hover:border-primary hover:bg-primary"
                >
                  <SocialIcon platform={social.platform} className="text-[15px] text-white group-hover:text-dark" />
                </a>
              ))}
            </div>
          </FooterColumn>

          <FooterColumn title="Services Areas">
            <FooterLinks links={FOOTER_SERVICE_AREAS} />
          </FooterColumn>

          <FooterColumn title="Useful Pages">
            <FooterLinks links={FOOTER_PAGES} />
          </FooterColumn>

          <FooterColumn title="Newsletter">
            <p className="mb-4">Subscribe to our newsletter</p>
            <NewsletterForm />
          </FooterColumn>
        </div>
      </div>

      <div className="container-bs">
        <nav
          aria-label="Legal"
          className="relative border-y border-white/10 py-[15px] text-center max-sm:flex max-sm:flex-wrap max-sm:justify-center max-sm:gap-x-1 max-sm:gap-y-2"
        >
          {FOOTER_MENU.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="mr-[15px] border-r border-white/10 pr-[15px] text-base text-white last:mr-0 last:border-r-0 last:pr-0 hover:text-primary max-sm:m-0 max-sm:border-r-0 max-sm:px-2 max-sm:py-1 max-sm:text-[13px]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container-bs px-[15px] py-[30px]">
        <div className="-mx-[15px] flex flex-wrap">
          <div className="w-full px-[15px] md:w-1/2">
            <p className="m-0 text-white max-md:my-[5px] max-md:text-center">
              &copy;{" "}
              <Link href="/" className="font-medium tracking-[1px] text-primary hover:text-white">
                tezeonservicesltd.com
              </Link>
              , All Right Reserved.
            </p>
          </div>
          <div className="w-full px-[15px] md:w-1/2">
            <p className="m-0 text-right text-white max-md:my-[5px] max-md:text-center">
              Designed By{" "}
              <a
                href="https://htmlcodex.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium tracking-[1px] text-primary hover:text-white"
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

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-full px-[15px] md:w-1/2 lg:w-1/4">
      <div className="relative mb-[45px] max-md:mb-[30px]">
        <h2 className="relative mb-5 pb-2.5 text-xl font-semibold text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-[60px] after:bg-primary after:content-['']">
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}

function FooterLinks({ links }: { links: readonly NavLinkItem[] }) {
  return (
    <ul>
      {links.map((link) => (
        <li key={link.label}>
          <Link
            href={link.href}
            className="mb-2.5 block text-white transition-all duration-300 hover:tracking-[1px] hover:text-primary"
          >
            <FaAngleRight aria-hidden="true" className="mr-2.5 inline align-[-0.125em]" />
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
