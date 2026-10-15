import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";
import { AboutSection } from "@/components/sections/about";
import { Facts } from "@/components/sections/facts";
import { Faqs } from "@/components/sections/faqs";
import { ABOUT_PAGE_VIDEO_SRC, COMPANY } from "@/lib/data";

const ABOUT_TITLE = "About Tezeon Services Limited | Lagos Water Engineering";

export const metadata: Metadata = {
  title: "About Us | 10 Years of Hydrogeological Excellence",
  description:
    "Tezeon Services Limited — 10+ years delivering clean, safe water solutions for homes, estates and industries across Nigeria. Learn about our mission and team.",
  keywords: [
    "Tezeon Services about",
    "water company Nigeria",
    "hydrogeological company Lagos",
    "water solutions Nigeria",
  ],
  alternates: { canonical: "/about/" },
  openGraph: {
    url: "/about/",
    images: [{ url: COMPANY.logo, alt: COMPANY.name }],
    title: ABOUT_TITLE,
    description:
      "10+ years of hydrogeological excellence. We provide clean, safe and reliable water for communities, estates and industries across Nigeria.",
  },
};

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