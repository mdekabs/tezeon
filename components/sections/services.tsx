import Image from "next/image";

import { LightboxTrigger } from "@/components/shared/lightbox-trigger";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { SERVICES } from "@/lib/data";

/**
 * Services grid (`.service`) — legacy spec (style.css:1003-1093, 3142-3147):
 * - Section background: linear-gradient(160deg, #f0f7ff, #e8f2ff 60%, #f5f9ff)
 * - Cards: square, image scales 1.1 on hover
 * - Overlay: glassmorphism navy rgba(3,15,39,.42) + blur(8px) + top hairline
 * - Title strip: navy gradient `#030f27→#0a1e3d`, 60px tall, gold h3
 * - "+" button: 60×60 white tile / navy glyph → gold tile / white on hover
 */
export function Services() {
  return (
    <section id="services" className="bg-service-gradient py-11 pb-[15px]">
      <div className="container-x">
        <SectionHeader eyebrow="Our Services" title="We Provide Services" />

        <div className="mt-12 grid gap-x-[30px] gap-y-[30px] md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 0.1}>
              <article className="group h-full text-center">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                  <div className="glass-overlay absolute inset-0 flex items-center justify-center p-[30px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 [@media(max-width:575.98px)]:p-[15px]">
                    <p className="text-base text-white">{service.description}</p>
                  </div>
                </div>
                <div className="bg-dark flex h-[60px] items-center overflow-hidden">
                  <h3 className="w-[calc(100%-60px)] truncate px-[15px] pl-[25px] text-left text-xl font-bold text-primary">
                    {service.title}
                  </h3>
                  <LightboxTrigger
                    src={service.image}
                    alt={service.alt}
                    caption={service.title}
                    label={`View ${service.title} image`}
                    className="size-[60px] shrink-0 rounded-none bg-white p-0 text-[54px] font-thin leading-none text-dark shadow-none hover:bg-primary hover:text-white"
                  />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}