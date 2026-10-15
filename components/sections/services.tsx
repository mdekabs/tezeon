import Image from "next/image";

import { LightboxGroup, LightboxTrigger, type LightboxImage } from "@/components/shared/lightbox";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { SERVICES } from "@/lib/data";

const SERVICE_IMAGES: readonly LightboxImage[] = SERVICES.map((service) => ({
  src: service.image,
  alt: service.alt,
}));

/**
 * Legacy `.service` grid (style.css:1003-1093, 2647-2654, 3490-3495):
 * 250px image with a frosted overlay on hover, navy title strip and a gold
 * "+" tile that opens the image in the lightbox. Cards lift 7px on hover.
 */
export function Services() {
  return (
    <section id="services" className="bg-service-gradient relative w-full pt-[45px] pb-[15px]">
      <div className="container-bs">
        <SectionHeader eyebrow="Our Services" title="We Provide Services" />

        <LightboxGroup images={SERVICE_IMAGES}>
          <div className="grid gap-x-[30px] md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={(index % 4) * 0.1} duration={0.7} distance={50} scale={0.95}>
              <article className="card-lift touch-bounce group relative mb-[30px] w-full text-center">
                <div className="relative overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    width={360}
                    height={250}
                    sizes="(min-width: 1200px) 350px, (min-width: 768px) 50vw, 100vw"
                    className="h-[250px] w-full object-cover"
                  />
                  <div className="service-overlay absolute inset-0 flex items-center justify-center p-[30px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 max-sm:p-[15px]">
                    <p className="m-0 text-white">{service.description}</p>
                  </div>
                </div>
                <div className="flex h-[60px] items-center overflow-hidden bg-[linear-gradient(90deg,#030f27_0%,#0a1e3d_100%)]">
                  <h3 className="m-0 w-[calc(100%-60px)] truncate pr-[15px] pl-[25px] text-left text-xl font-bold text-primary max-sm:text-base">
                    {service.title}
                  </h3>
                  <LightboxTrigger
                    index={index}
                    label={`View ${service.title} image`}
                    className="bg-primary text-dark group-hover:text-white"
                  />
                </div>
              </article>
            </Reveal>
          ))}
          </div>
        </LightboxGroup>
      </div>
    </section>
  );
}
