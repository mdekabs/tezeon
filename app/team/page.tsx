import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";

import { Team } from "@/components/sections/team";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/team",
  title: "Our Water Engineers & Geologists",
  description:
    "Meet Tezeon's water engineers, geologists and technicians: the Lagos team behind our borehole, water treatment and plumbing projects across Nigeria.",
});

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