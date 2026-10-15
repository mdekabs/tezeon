import Image from "next/image";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { SocialIcon } from "@/components/shared/social-icons";
import { TEAM_MEMBERS } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { SocialLink } from "@/types";

/** Legacy hover colours + stagger per slot (style.css:1328-1350). */
const SOCIAL_SLOTS = [
  "group-hover:bg-[#00acee] group-hover:delay-0",
  "group-hover:bg-[#3b5998] group-hover:delay-100",
  "group-hover:bg-[#0e76a8] group-hover:delay-200",
  "group-hover:bg-[#3f729b] group-hover:delay-300",
] as const;

/**
 * Legacy `.team` grid (style.css:1253-1350, 2681-2685): 280px top-anchored
 * photo over a navy name panel that flips to gold on hover, while the social
 * links slide in from the left edge one after another.
 */
export function Team() {
  return (
    <section id="team" className="bg-team-gradient relative w-full pt-[45px] pb-[15px]">
      <div className="container-bs">
        <SectionHeader eyebrow="Our Team" title="Meet Our Engineers" />

        <div className="grid gap-x-[30px] md:grid-cols-2 lg:grid-cols-4">
          {TEAM_MEMBERS.map((member, index) => (
            <Reveal key={member.name} delay={(index % 4) * 0.12} duration={0.65} distance={40}>
              <article className="card-lift touch-bounce group relative mb-[30px] overflow-hidden max-sm:mb-5">
                <div className="relative">
                  <Image
                    src={member.image}
                    alt={member.alt}
                    width={255}
                    height={280}
                    sizes="(min-width: 992px) 255px, (min-width: 768px) 50vw, 100vw"
                    className="h-[280px] w-full object-cover object-top"
                  />
                </div>
                <div className="relative bg-[linear-gradient(135deg,#030f27_0%,#0a1e3d_100%)] px-[15px] py-[25px] text-center transition-all duration-500 group-hover:bg-[linear-gradient(135deg,#fdbe33_0%,#ffe080_100%)]">
                  <h2 className="mb-2 text-xl font-semibold text-primary transition-all duration-500 group-hover:tracking-[1px] group-hover:text-dark">
                    {member.name}
                  </h2>
                  <p className="m-0 text-white">{member.role}</p>
                </div>
                {member.socials ? <TeamSocials name={member.name} socials={member.socials} /> : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSocials({ name, socials }: { name: string; socials: readonly SocialLink[] }) {
  return (
    <div className="absolute top-0 -left-[50px] flex w-[100px] flex-col">
      {socials.map((social, index) => (
        <a
          key={social.platform}
          href={social.href}
          aria-label={`${name} on ${social.platform}`}
          className={cn(
            "relative left-0 flex size-[50px] items-center justify-center text-lg text-white group-hover:left-[50px] group-hover:transition-all group-hover:duration-300",
            SOCIAL_SLOTS[index % SOCIAL_SLOTS.length],
          )}
        >
          <SocialIcon platform={social.platform} />
        </a>
      ))}
    </div>
  );
}
