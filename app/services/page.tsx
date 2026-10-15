import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";

import { COMPANY } from "@/lib/data";
import { Faqs } from "@/components/sections/faqs";
import { Services } from "@/components/sections/services";

export const metadata: Metadata = {
  title: "Our Services | Water Filtration, Drilling & Plumbing",
  description:
    "Tezeon Services offers water filtration, borehole drilling, reservoir construction, plumbing, home water systems and treatment plant management across Nigeria.",
  keywords: [
    "water filtration Nigeria",
    "borehole drilling Lagos",
    "reservoir construction",
    "plumbing Lagos",
    "water treatment plant",
    "home water system",
  ],
  alternates: { canonical: "/services" },
  openGraph: {
    url: "/services",
    images: [{ url: COMPANY.logo, alt: COMPANY.name }],
    title: "Water Engineering Services | Tezeon Services Limited",
    description:
      "Filtration, borehole drilling, reservoir construction, plumbing and home water systems. Professional water solutions across Nigeria.",
  },
};

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