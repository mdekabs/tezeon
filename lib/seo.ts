import type { Metadata } from "next";

import { COMPANY, SERVICES } from "@/lib/data";

/** Brand suffix for page titles — kept short so titles stay under ~60 characters. */
export const TITLE_SUFFIX = "Tezeon Services";

/** 1200×630 share card (logo on brand gold) for WhatsApp, Facebook and X previews. */
export const SHARE_IMAGE = {
  url: "https://res.cloudinary.com/dxd3nmbag/image/upload/c_pad,w_1200,h_630,b_rgb:fdbe33/v1755441476/waterlog_lnxqbb.png",
  width: 1200,
  height: 630,
  alt: COMPANY.name,
} as const;

interface PageSeo {
  /** Site-relative path, e.g. "/about" — used for the canonical and og:url. */
  path: string;
  /** Page title without the brand suffix (about 40 characters or fewer). */
  title: string;
  /** 150–160 characters: what the page offers and why to click. */
  description: string;
  /** Use the title as-is, without the brand suffix (home page). */
  absoluteTitle?: boolean;
}

/**
 * Consistent per-page metadata: title, description, self-referencing
 * canonical, Open Graph and Twitter cards all describe the same page.
 */
export function pageMetadata({ path, title, description, absoluteTitle = false }: PageSeo): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${TITLE_SUFFIX}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "en_NG",
      siteName: COMPANY.name,
      url: path,
      title: fullTitle,
      description,
      images: [SHARE_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [SHARE_IMAGE.url],
    },
  };
}

const BUSINESS_ID = `${COMPANY.siteUrl}/#business`;

/**
 * Site-wide JSON-LD: one business entity (a LocalBusiness subtype, so it also
 * serves as the Organization) plus the WebSite. Only published, verifiable
 * facts — no coordinates, ratings or social profiles we can't vouch for.
 */
export const SITE_STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "HomeAndConstructionBusiness",
      "@id": BUSINESS_ID,
      name: COMPANY.name,
      alternateName: COMPANY.shortName,
      description: COMPANY.description,
      url: COMPANY.siteUrl,
      logo: COMPANY.logo,
      image: COMPANY.logo,
      email: COMPANY.email,
      telephone: COMPANY.tel,
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
      areaServed: [
        { "@type": "City", name: "Lagos" },
        { "@type": "Country", name: "Nigeria" },
      ],
      contactPoint: [COMPANY.tel, COMPANY.phoneAlt.replace(/\s/g, "")].map((telephone) => ({
        "@type": "ContactPoint",
        telephone,
        contactType: "customer service",
        areaServed: "NG",
        availableLanguage: "English",
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Water engineering services",
        itemListElement: SERVICES.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.title, description: service.description },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${COMPANY.siteUrl}/#website`,
      url: COMPANY.siteUrl,
      name: COMPANY.name,
      inLanguage: "en-NG",
      publisher: { "@id": BUSINESS_ID },
    },
  ],
};
