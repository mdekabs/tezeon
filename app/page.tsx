import type { Metadata } from "next";

import { AboutSection } from "@/components/sections/about";
import { Facts } from "@/components/sections/facts";
import { Faqs } from "@/components/sections/faqs";
import { Features } from "@/components/sections/features";
import { GalleryPreview } from "@/components/sections/gallery-preview";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Team } from "@/components/sections/team";
import { Testimonials } from "@/components/sections/testimonials";
import { VideoShowcase } from "@/components/sections/video-showcase";
import { HomePreloader } from "@/components/shared/home-preloader";
import { COMPANY } from "@/lib/data";

export const metadata: Metadata = {
  title: COMPANY.defaultTitle,
  description: COMPANY.description,
  alternates: { canonical: "/" },
  openGraph: {
    url: "/",
    title: `${COMPANY.name} | Water Engineering Lagos`,
    description:
      "Expert borehole drilling, water filtration, reservoir construction and plumbing across Nigeria. Get a free consultation today.",
    images: [{ url: COMPANY.logo, alt: COMPANY.name }],
  },
};

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: COMPANY.name,
  description:
    "Expert water engineering company providing borehole drilling, water filtration, reservoir construction and plumbing services across Nigeria.",
  url: COMPANY.siteUrl,
  logo: COMPANY.logo,
  image: COMPANY.logo,
  telephone: COMPANY.tel,
  email: COMPANY.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: COMPANY.street,
    addressLocality: COMPANY.city,
    addressRegion: COMPANY.region,
    addressCountry: COMPANY.country,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "21:00",
  },
  sameAs: [],
  serviceArea: {
    "@type": "Country",
    name: "Nigeria",
  },
};

export default function HomePage() {
  return (
    <>
      <HomePreloader />
      <script
        type="application/ld+json"
        // Static LocalBusiness payload lifted verbatim from the legacy index.html.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Features />
      <AboutSection />
      <Facts />
      <Services />
      <VideoShowcase />
      <Team />
      <Faqs />
      <GalleryPreview />
      <Testimonials />
    </>
  );
}
