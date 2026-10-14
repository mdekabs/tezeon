import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { BackToTop } from "@/components/layout/back-to-top";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Chatbot } from "@/components/shared/chatbot";
import { MotionProvider } from "@/components/shared/motion-provider";
import { COMPANY } from "@/lib/data";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(COMPANY.siteUrl),
  title: {
    default: COMPANY.defaultTitle,
    template: `%s | ${COMPANY.name}`,
  },
  description: COMPANY.description,
  keywords: [
    "water engineering Lagos",
    "borehole drilling Nigeria",
    "water filtration",
    "reservoir construction",
    "plumbing Lagos",
    "hydrogeological services",
  ],
  openGraph: {
    type: "website",
    siteName: COMPANY.name,
    title: `${COMPANY.name} | Water Engineering Lagos`,
    description:
      "Expert borehole drilling, water filtration, reservoir construction and plumbing across Nigeria. Get a free consultation today.",
    url: "/",
    images: [{ url: COMPANY.logo, alt: COMPANY.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${COMPANY.name} | Water Engineering Lagos`,
    description:
      "Expert borehole drilling, water filtration, reservoir construction and plumbing across Nigeria. Get a free consultation today.",
    images: [COMPANY.logo],
  },
  icons: { icon: COMPANY.logo },
};

/**
 * Organization + WebSite graph published site-wide. The payload is a static,
 * code-owned constant (no user input), so `dangerouslySetInnerHTML` carries no
 * XSS surface; `<` is still escaped defensively.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${COMPANY.siteUrl}/#organization`,
      name: COMPANY.name,
      url: COMPANY.siteUrl,
      logo: COMPANY.logo,
      email: COMPANY.email,
      telephone: COMPANY.tel,
      address: {
        "@type": "PostalAddress",
        streetAddress: COMPANY.street,
        addressLocality: COMPANY.city,
        addressRegion: COMPANY.region,
        addressCountry: COMPANY.country,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${COMPANY.siteUrl}/#website`,
      url: COMPANY.siteUrl,
      name: COMPANY.name,
      publisher: { "@id": `${COMPANY.siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${poppins.variable} h-full`}>
      <body className="flex min-h-full flex-col font-sans">
        <MotionProvider>
        <script
          type="application/ld+json"
          // Static, code-owned JSON — no untrusted input passes through here.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(STRUCTURED_DATA).replace(/</g, "\\u003c"),
          }}
        />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <BackToTop />
        <Chatbot />
        </MotionProvider>
      </body>
    </html>
  );
}
