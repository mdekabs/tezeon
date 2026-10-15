import type { Metadata } from "next";

import { ProjectsShowcase } from "@/components/sections/projects-showcase";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/projects",
  title: "Water Engineering Projects in Lagos",
  description:
    "Completed, ongoing and upcoming Tezeon projects, including water reticulation at Orange Island, Lagos, reservoir builds and filtration tank installs.",
});

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