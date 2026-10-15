import type { Metadata } from "next";

import { ContactSection } from "@/components/sections/contact-section";
import { PageHeader } from "@/components/shared/page-header";
import { PageLoader } from "@/components/shared/page-loader";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact Us for a Free Water Quote",
  description:
    "Get a free water engineering quote. Visit us at 30 Bayo Shodikpo Avenue, Ajah, Lagos, call +234 803 096 7886 or email info@tezeonservicesltd.com.",
});

export default function ContactPage() {
  return (
    <>
      <PageLoader />
      <PageHeader
        title="Contact Us"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact Us", href: "/contact" },
        ]}
      />
      <ContactSection />
    </>
  );
}