import Link from "next/link";

import { COMPANY } from "@/lib/data";
import type { Breadcrumb } from "@/types";

interface PageHeaderProps {
  title: string;
  breadcrumbs: readonly Breadcrumb[];
}

/**
 * Legacy `.page-header` (style.css:668-748, 2726-2736, 2820-2825): cyan
 * gradient band, 60px navy title with a centred underline and a "/"-separated
 * breadcrumb trail. Padding steps 90 → 60 → 45 → 35px as the viewport narrows.
 */
export function PageHeader({ title, breadcrumbs }: PageHeaderProps) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: `${COMPANY.siteUrl}${crumb.href}`,
    })),
  };

  return (
    <section className="bg-page-header-gradient relative mb-[45px] py-[90px] text-center max-lg:py-[60px] max-md:py-[45px] max-[480px]:py-[35px]">
      <script
        type="application/ld+json"
        // Static, code-owned payload; `<` is escaped defensively.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container-bs">
        <h1 className="animate-[tez-slide-down_0.7s_cubic-bezier(0.25,0.46,0.45,0.94)_both] relative mb-5 pb-[5px] text-[60px] font-bold text-dark after:absolute after:bottom-0 after:left-[calc(50%-50px)] after:h-0.5 after:w-[100px] after:bg-dark after:content-[''] max-lg:text-[45px] max-md:text-[35px] max-[480px]:text-[26px]">
          {title}
        </h1>
        <nav aria-label="Breadcrumb" className="animate-[tez-fade-in_0.7s_ease_0.3s_both]">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <Link
                key={crumb.label}
                href={crumb.href}
                aria-current={isLast ? "page" : undefined}
                className="relative px-3 text-[22px] text-dark after:absolute after:-top-0.5 after:-right-[7px] after:h-2 after:w-2 after:text-center after:text-[#121518] after:content-['/'] last:after:hidden hover:text-white max-lg:text-xl max-md:text-lg max-[480px]:text-sm"
              >
                {crumb.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </section>
  );
}
