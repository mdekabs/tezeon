import { Flaticon } from "@/components/shared/flaticon";
import { Reveal } from "@/components/shared/reveal";
import { FEATURES } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Legacy `.feature` strip (style.css:784-873, 2611-2622, 3123-3135, 3482-3487):
 * three full-width columns — navy / gold / navy gradients — each holding a
 * glass-edged card with a dotted-ring Flaticon and gold (or navy) copy.
 * The ring and disc are centred on the glyph (legacy offset them 10px up).
 */
export function Features() {
  return (
    <section aria-label="Why choose Tezeon" className="mb-[45px]">
      <div className="container-fluid">
        <div className="-mx-[15px] grid items-center lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const gold = index % 2 === 1;
            return (
              <div
                key={feature.title}
                className={cn(
                  "group px-[15px]",
                  gold ? "bg-feature-gold-gradient text-dark" : "bg-feature-navy-gradient text-primary",
                )}
              >
                <Reveal delay={index * 0.1} duration={0.6} distance={35}>
                  <div className="feature-card flex min-h-[250px] items-center justify-start p-[30px] group-hover:bg-white/[0.06] max-md:min-h-0 max-md:px-[15px] max-md:py-5">
                    <div className="relative flex size-[60px] shrink-0 items-center justify-center">
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 left-1/2 z-[1] size-20 -translate-1/2 rounded-full border-2 border-dotted border-white"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute top-1/2 left-1/2 z-[2] size-[76px] -translate-1/2 rounded-full",
                          gold ? "bg-primary" : "bg-dark",
                        )}
                      />
                      <Flaticon name={feature.icon} className="relative z-[3] text-[60px] leading-[60px]" />
                    </div>
                    <div className="pl-[30px]">
                      <h3 className="mb-2.5 text-[25px] font-semibold text-inherit max-md:text-xl">
                        {feature.title}
                      </h3>
                      <p className="m-0 text-lg max-md:text-[15px]">{feature.description}</p>
                    </div>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
