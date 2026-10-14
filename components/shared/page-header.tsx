import Link from "next/link";
import type { Breadcrumb } from "@/types";
import { COMPANY } from "@/lib/data";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  breadcrumbs: readonly Breadcrumb[];
}

const HEADER_BACKGROUND = {
  background:
    "linear-gradient(135deg, #33d0fd 0%, #b7e3ee 50%, #e0eff1 100%)",
} as const;

/**
 * Inner-page hero band (`.page-header` in the legacy markup, style.css:668-718):
 * cyan gradient background, navy title with centered navy underline,
 * navy breadcrumb trail with `/` separators, slide-down entrance animation
 * (style.css:2820-2824). Padding 90px desktop / 60px tablet / 35px mobile.
 */
export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${COMPANY.siteUrl}${crumb.href}` : undefined,
    })),
  };

  return (
    <section style={HEADER_BACKGROUND} className="py-[60px] text-center lg:py-[90px] [@media(max-width:480px)]:py-[35px]">
      {/* Static, code-owned payload — locales escape `<` defensively. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container-x">
        <h1
          className="text-[45px] font-bold leading-tight text-dark lg:text-[60px] [@media(max-width:480px)]:text-[26px]"
          style={{ animation: "tez-slide-down 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) both" }}
        >
          {title}
          <span
            aria-hidden="true"
            className="mx-auto mt-1.5 block h-0.5 w-[100px] bg-dark"
          />
        </h1>
        <nav
          aria-label="Breadcrumb"
          className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
          style={{ animation: "tez-fade-in 0.7s ease 0.3s both" }}
        >
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <span key={crumb.label} className="flex items-center">
                {crumb.href && !isLast ? (
                  <Link
                    href={crumb.href}
                    className="px-3 text-[18px] text-dark transition-colors hover:text-white lg:text-[22px] [@media(max-width:480px)]:text-[14px]"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span
                    aria-current={isLast ? "page" : undefined}
                    className={cn(
                      "px-3 text-[18px] lg:text-[22px] [@media(max-width:480px)]:text-[14px]",
                      isLast ? "text-dark" : "text-dark",
                    )}
                  >
                    {crumb.label}
                  </span>
                )}
                {!isLast ? (
                  <span aria-hidden="true" className="text-[#121518]">/</span>
                ) : null}
              </span>
            );
          })}
        </nav>
      </div>
    </section>
  );
}