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
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  path: "/",
  title: COMPANY.defaultTitle,
  description: COMPANY.description,
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <HomePreloader />
      <Hero />
      <Features />
      <AboutSection />
      <Facts />
      <Services />
      <VideoShowcase />
      <Team />
      <Faqs withSchema />
      <GalleryPreview />
      <Testimonials />
    </>
  );
}
