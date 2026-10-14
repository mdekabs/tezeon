import Link from "next/link";

import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { ABOUT_INTRO, HOME_VIDEO_SRC } from "@/lib/data";

interface AboutSectionProps {
  /** `index.html` uses the water-testing clip; `about.html` uses the completed-project loop. */
  videoSrc?: string;
}

/**
 * About split (`.about`): looping muted video on the left (bordered container,
 * NOT full-bleed — legacy style.css:879-928), mission copy on the right with a
 * left-aligned section header and a square gold "Learn More" CTA.
 * Background: linear-gradient(180deg, #ffffff 0%, #edf4ff 100%).
 */
export function AboutSection({ videoSrc = HOME_VIDEO_SRC }: AboutSectionProps) {
  return (
    <section id="about" className="bg-about-gradient py-11 lg:py-11">
      <div className="container-x grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <div className="relative aspect-[4/3] overflow-hidden bg-dark">
            {/* Muted looping video; no audio track to caption. */}
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 size-full object-cover"
              style={{ borderRadius: "4px" }}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.1}>
          <div className="mb-[30px]">
            <SectionHeader
              align="left"
              eyebrow={ABOUT_INTRO.eyebrow}
              title={ABOUT_INTRO.title}
            />
          </div>
          <div className="text-body">
            <p className="text-base">{ABOUT_INTRO.paragraphs[0]}</p>
            <p className="text-base">
              <strong className="font-semibold text-dark">{ABOUT_INTRO.missionLead}</strong>{" "}
              {ABOUT_INTRO.paragraphs[1]}
            </p>
          </div>
          <Link
            href="/about"
            className="btn-base btn-primary mt-[15px] !py-[15px] !px-[35px] !text-base !font-medium !tracking-[1px]"
          >
            Learn More
          </Link>
        </Reveal>
      </div>
    </section>
  );
}