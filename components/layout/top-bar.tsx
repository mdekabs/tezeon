import Image from "next/image";
import Link from "next/link";

import { COMPANY, TOP_BAR_ITEMS } from "@/lib/data";

/**
 * Dark utility bar (`.top-bar`): cyan `#33d0fd` bar (legacy `style.css:361-365`),
 * logo on the left, opening hours / phone / email on the right with navy
 * icons + text. Info items are hidden below `lg`, matching the legacy
 * `d-none d-lg-block` behaviour. Legacy top-bar is 90px tall desktop,
 * auto height + centered on mobile.
 */
export function TopBar() {
  return (
    <div className="bg-cyan text-dark">
      <div className="container-x flex flex-col items-center gap-6 py-3 lg:h-[90px] lg:flex-row lg:justify-between lg:gap-0 lg:py-0 lg:px-[60px]">
        <Link
          href="/"
          aria-label={`${COMPANY.name} home`}
          className="inline-flex items-center"
        >
          <Image
            src={COMPANY.logo}
            alt={COMPANY.name}
            width={210}
            height={84}
            priority
            className="h-auto max-h-[70px] w-auto lg:max-h-[110px]"
          />
        </Link>

        <div className="hidden items-center gap-10 lg:flex xl:gap-16">
          {TOP_BAR_ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center text-dark">
                <item.icon className="size-9" strokeWidth={1.5} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-base font-normal leading-tight text-dark">
                  {item.title}
                </h3>
                <p className="text-[13px] font-normal leading-tight text-dark">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}