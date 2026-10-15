import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";
import { AboutSection } from "@/components/sections/about";
import { Facts } from "@/components/sections/facts";
import { Faqs } from "@/components/sections/faqs";
import { ABOUT_PAGE_VIDEO_SRC } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About Us: Water Engineers in Lagos",
  description:
    "For over 10 years Tezeon Services Limited has made water clean, safe and reliable for homes, estates and industries across Nigeria. Learn about our mission.",
});

export default function AboutPage() {
  return (
    <>
      <PageLoader />
      <PageHeader
        title="About Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
        ]}
      />
      <AboutSection videoSrc={ABOUT_PAGE_VIDEO_SRC} />
      <Facts />
      <Faqs />
    </>
  );
}