import type { Metadata } from "next";

import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";

import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Projects | Water Engineering Portfolio",
  description:
    "Browse completed and ongoing water engineering projects by Tezeon Services Limited — borehole drilling, industrial filtration, reservoir construction and more.",
  keywords: [
    "water engineering projects Nigeria",
    "borehole projects Lagos",
    "water filtration portfolio",
    "reservoir projects Nigeria",
  ],
  alternates: { canonical: "/projects/" },
  openGraph: {
    url: "/projects/",
    images: [{ url: COMPANY.logo, alt: COMPANY.name }],
    title: "Our Projects | Tezeon Services Limited",
    description:
      "Browse our water engineering portfolio — borehole drilling, industrial filtration, reservoir construction and home water systems across Nigeria.",
  },
};

export default function ProjectsPage() {
  return (
    <>
      <PageLoader />
      <PageHeader
        title="Our Projects"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Our Projects", href: "/projects" },
        ]}
      />
      <ProjectsShowcase />
    </>
  );
}