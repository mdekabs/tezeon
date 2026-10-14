import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { SocialIcon } from "@/components/shared/social-icons";
import { TEAM_MEMBERS } from "@/lib/data";
import type { SocialLink } from "@/types";

/** Brand colours for the social chips (static map so Tailwind sees every class). */
const SOCIAL_BACKGROUND: Record<SocialLink["platform"], string> = {
  twitter: "bg-[#1da1f2]",
  facebook: "bg-[#1877f2]",
  linkedin: "bg-[#0a66c2]",
  instagram: "bg-[#e1306c]",
  youtube: "bg-[#ff0000]",
};

/**
 * Team grid (`.team`) — legacy spec (style.css:1253-1350):
 * - Section: linear-gradient(155deg, #f5f9ff, #eaeffb 60%, #f0f6ff)
 * - Cards: image 280px (object-position top), text panel navy gradient
 *   `#030f27→#0a1e3d` with gold h2 + white role
 * - Hover: panel flips to gold gradient `#fdbe33→#ffe080`, navy heading
 * - Social icons slide out from behind the card (staggered 0.1s each)
 */
export function Team() {
  return (
    <section id="team" className="bg-team-gradient pb-[15px] pt-11">
      <div className="container-x">
        <SectionHeader eyebrow="Our Team" title="Meet Our Engineers" />

        <div className="mt-12 grid gap-x-[30px] gap-y-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.1}>
              <article className="group relative h-full overflow-hidden">
                <div className="relative h-[280px] overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="bg-dark px-[15px] py-[25px] text-center transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-[#ffe080]">
                  <h3 className="text-xl font-semibold text-primary transition-all duration-500 group-hover:text-dark group-hover:tracking-[1px]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-base text-white transition-colors duration-500 group-hover:text-dark">
                    {member.role}
                  </p>
                </div>
                {member.socials ? (
                  <div className="absolute left-0 top-0 flex flex-col">
                    {member.socials.map((social, socialIndex) => (
                      <a
                        key={social.platform}
                        href={social.href}
                        aria-label={`${member.name} on ${social.platform}`}
                        className={`relative -left-[50px] grid size-[50px] place-items-center text-white transition-all duration-300 group-hover:left-0 ${SOCIAL_BACKGROUND[social.platform]}`}
                        style={{ transitionDelay: `${socialIndex * 0.1}s` }}
                      >
                        <SocialIcon platform={social.platform} />
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}