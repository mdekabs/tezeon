import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us | Lagos Water Engineering",
  description:
    "Contact Tezeon Services Limited for water engineering consultations and quotes. 30 Bayo Shodikpo Ave, Ajah, Lagos. Call +234 803 096 7886 or email us today.",
  keywords: [
    "contact Tezeon",
    "water engineering Lagos contact",
    "borehole quote Nigeria",
    "water services consultation",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    url: "/contact",
    images: [{ url: COMPANY.logo, alt: COMPANY.name }],
    title: `Contact ${COMPANY.name} | Lagos Water Engineering`,
    description:
      "Get a free quote for water engineering services. Office in Ajah, Lagos. Call +234 803 096 7886 or email info@tezeonservicesltd.com",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageLoader />
      <PageHeader
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us" },
        ]}
      />
      <ContactSection />
    </>
  );
}