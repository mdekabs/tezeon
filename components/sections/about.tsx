import Link from "next/link";

import { ParallaxVideo } from "@/components/shared/parallax-video";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { ABOUT_INTRO, HOME_VIDEO_SRC } from "@/lib/data";

interface AboutSectionProps {
  /** `index.html` uses the water-testing clip; `about.html` uses the completed-project loop. */
  videoSrc?: string;
}

/**
 * Legacy `.about` (style.css:879-928, 2574-2579): looping video (5/12) beside
 * the mission copy (7/12) from 768px up, flat gold "Learn More" button.
 */
export function AboutSection({ videoSrc = HOME_VIDEO_SRC }: AboutSectionProps) {
  return (
    <section id="about" className="bg-about-gradient relative w-full py-[45px]">
      <div className="container-bs">
        <div className="-mx-[15px] flex flex-wrap items-center">
          <div className="w-full px-[15px] md:w-1/2 lg:w-5/12">
            <Reveal x={-55} duration={0.85} className="relative h-full max-md:mb-[30px] max-md:h-auto">
              <ParallaxVideo src={videoSrc} />
            </Reveal>
          </div>

          <div className="w-full px-[15px] md:w-1/2 lg:w-7/12">
            <Reveal x={45} duration={0.7}>
              <SectionHeader
                align="left"
                eyebrow={ABOUT_INTRO.eyebrow}
                title={ABOUT_INTRO.title}
                className="mb-[30px]"
              />
            </Reveal>
            <Reveal distance={25} duration={0.65} delay={0.2}>
              <p className="mb-4 text-base">{ABOUT_INTRO.paragraphs[0]}</p>
              <p className="mb-4 text-base">
                <strong className="font-bold">{ABOUT_INTRO.missionLead}</strong>{" "}
                {ABOUT_INTRO.paragraphs[1]}
              </p>
              <Link
                href="/about"
                className="touch-bounce relative mt-[15px] inline-block border border-transparent bg-primary px-[35px] py-[15px] text-base leading-normal font-medium tracking-[1px] text-dark transition-all duration-300 hover:bg-dark hover:text-primary"
              >
                Learn More
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
