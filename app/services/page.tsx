import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";

import { Faqs } from "@/components/sections/faqs";
import { Services } from "@/components/sections/services";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/services",
  title: "Borehole, Filtration & Plumbing Services",
  description:
    "Borehole drilling, water filtration, reservoir construction, home water systems and plumbing for homes, estates and industry across Nigeria. Get a free quote.",
});

export default function ServicesPage() {
  return (
    <>
      <PageLoader />
      <PageHeader
        title="Our Services"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Services", href: "/services" },
        ]}
      />
      <Services />
      <Faqs />
    </>
  );
}