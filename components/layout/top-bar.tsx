import Image from "next/image";
import Link from "next/link";

import { Flaticon } from "@/components/shared/flaticon";
import { COMPANY, TOP_BAR_ITEMS } from "@/lib/data";

/**
 * Legacy `.top-bar` (style.css:361-434, 2596-2608): 90px cyan bar with the
 * 110px logo on the left (it intentionally overhangs into the nav bar) and
 * three contact items on the right. Below 992px the bar collapses to a
 * centred 70px logo and the contact items are hidden.
 */
export function TopBar() {
  return (
    <div className="relative h-[90px] bg-cyan lg:px-[60px] max-lg:h-auto max-lg:px-5 max-lg:py-3 max-lg:text-center">
      <div className="container-fluid">
        <div className="-mx-[15px] flex flex-wrap items-center">
          <div className="w-full px-[15px] lg:w-1/3">
            <div className="overflow-hidden py-[5px] text-left max-lg:text-center">
              <Link href="/" aria-label={`${COMPANY.name} home`} className="inline-block align-middle">
                <Image
                  src={COMPANY.logo}
                  alt={COMPANY.name}
                  width={110}
                  height={110}
                  priority
                  className="block size-[110px] max-lg:size-[70px]"
                />
              </Link>
            </div>
          </div>

          <div className="hidden w-2/3 px-[15px] lg:block">
            <div className="-mx-[15px] flex">
              {TOP_BAR_ITEMS.map((item) => (
                <div key={item.title} className="w-1/3 px-[15px]">
                  <div className="flex items-center justify-end">
                    <div className="flex w-10 items-center justify-center">
                      <Flaticon name={item.icon} className="text-[40px] leading-normal text-dark" />
                    </div>
                    <div className="pl-[15px]">
                      <h3 className="mb-[5px] text-base font-normal text-dark">{item.title}</h3>
                      <p className="m-0 text-[13px] font-normal text-dark">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
