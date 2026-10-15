import type { Metadata } from "next";

import { GalleryGrid } from "@/components/sections/gallery-grid";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/gallery",
  title: "Borehole & Water Project Photo Gallery",
  description:
    "Photos and videos of Tezeon's work: borehole drilling, water filtration, reservoir construction and plumbing projects across Lagos and Nigeria.",
});

export default function GalleryPage() {
  return (
    <>
      <PageLoader />
      <PageHeader
        title="Photo Gallery"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Photo Gallery", href: "/gallery" },
        ]}
      />
      <GalleryGrid />
    </>
  );
}