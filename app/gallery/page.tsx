import type { Metadata } from "next";

import { GalleryGrid } from "@/components/sections/gallery-grid";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";

import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Photo Gallery | Water Engineering Work",
  description:
    "Browse Tezeon Services Limited's photo gallery — borehole drilling, water filtration, reservoir construction, plumbing and home water systems across Nigeria.",
  keywords: [
    "Tezeon gallery",
    "water engineering photos Nigeria",
    "borehole drilling photos",
    "water filtration gallery",
    "reservoir construction Nigeria",
  ],
  alternates: { canonical: "/gallery/" },
  openGraph: {
    url: "/gallery/",
    images: [{ url: COMPANY.logo, alt: COMPANY.name }],
    title: "Photo Gallery | Tezeon Services Limited",
    description:
      "Browse our water engineering gallery — borehole drilling, filtration, reservoir construction and plumbing work across Nigeria.",
  },
};

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