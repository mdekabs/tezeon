import { Reveal } from "@/components/shared/reveal";
import { FEATURES } from "@/lib/data";

/**
 * Three-column value strip (`.feature`) directly below the hero.
 * Legacy spec (style.css:784-873, 3123-3135):
 * - Columns alternate: navy gradient (1st, 3rd) / gold gradient (2nd)
 * - Cards: min-h 250px, glass border rgba(255,255,255,.14), inset highlights,
 *   backdrop-blur(6px), hover adds rgba(255,255,255,.06) fill
 * - Navy column: gold icon + gold h3 + gold p; gold column: navy icon/text
 * - Mobile: min-h auto, padding 20px 15px, smaller type
 */
export function Features() {
  return (
    <section aria-label="Why choose Tezeon" className="py-11">
      <div className="container-x grid gap-0 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const gold = index === 1;
          return (
            <Reveal key={feature.title} delay={index * 0.1}>
              <article
                className={
                  gold
                    ? "bg-feature-gold-gradient flex h-full min-h-[250px] items-center justify-start p-[30px] text-dark [@media(max-width:767.98px)]:min-h-auto [@media(max-width:767.98px)]:p-5"
                    : "bg-feature-navy-gradient flex h-full min-h-[250px] items-center justify-start p-[30px] text-primary [@media(max-width:767.98px)]:min-h-auto [@media(max-width:767.98px)]:p-5"
                }
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255, 255, 255, 0.08), inset 0 -1px 0 rgba(0, 0, 0, 0.08)",
                  backdropFilter: "blur(6px)",
                  WebkitBackdropFilter: "blur(6px)",
                  transition: "background 0.3s ease, transform 0.3s ease",
                }}
              >
                <span
                  className="relative grid size-[60px] shrink-0 place-items-center"
                  aria-hidden="true"
                >
                  {/* Dotted ring (legacy ::before) */}
                  <span
                    aria-hidden="true"
                    className="absolute -left-2.5 -top-5 size-20 rounded-full border-2 border-dotted border-white"
                  />
                  {/* Solid disc (legacy ::after) */}
                  <span
                    aria-hidden="true"
                    className={gold ? "absolute -left-[9px] -top-[18px] size-[79px] rounded-full bg-primary" : "absolute -left-[9px] -top-[18px] size-[79px] rounded-full bg-dark"}
                  />
                  <feature.icon
                    className={`relative size-[60px] ${gold ? "text-dark" : "text-primary"}`}
                    strokeWidth={1.4}
                  />
                </span>
                <div className="pl-[30px]">
                  <h3 className="mb-2.5 text-[25px] font-semibold [@media(max-width:767.98px)]:text-xl">
                    {feature.title}
                  </h3>
                  <p className="text-lg [@media(max-width:767.98px)]:text-[15px]">
                    {feature.description}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}