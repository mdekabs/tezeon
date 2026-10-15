import type { MetadataRoute } from "next";

import { COMPANY } from "@/lib/data";

/* Generated once at build time for the static export. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${COMPANY.siteUrl}/sitemap.xml`,
  };
}