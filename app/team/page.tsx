import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";

import { COMPANY } from "@/lib/data";
import { Team } from "@/components/sections/team";

export const metadata: Metadata = {
  title: "Our Team | Water Engineering Specialists",
  description:
    "Meet the expert water engineers and hydrogeologists at Tezeon Services Limited, delivering quality water solutions for homes, estates and industries across Nigeria.",
  keywords: [
    "Tezeon team",
    "water engineers Nigeria",
    "hydrogeologist Lagos",
    "water specialists Nigeria",
  ],
  alternates: { canonical: "/team/" },
  openGraph: {
    url: "/team/",
    images: [{ url: COMPANY.logo, alt: COMPANY.name }],
    title: "Our Team | Tezeon Services Limited",
    description:
      "Expert water engineers and geologists delivering quality hydrogeological solutions across Nigeria.",
  },
};

export default function TeamPage() {
  return (
    <>
      <PageLoader />
      <PageHeader
        title="Our Team"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Team", href: "/team" },
        ]}
      />
      <Team />
    </>
  );
}