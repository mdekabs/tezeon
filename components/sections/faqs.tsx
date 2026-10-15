import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/data";
import type { Faq } from "@/types";

/**
 * Static FAQPage structured data so Google can render rich answer snippets
 * wherever this section appears (home, services, about). The payload is a
 * code-owned constant — no untrusted input passes through.
 */
const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

const COLUMNS = [FAQS.slice(0, 5), FAQS.slice(5)] as const;

/**
 * Legacy `.faqs` (style.css:1356-1457, 3526-3539): two independent
 * single-open accordions split by a 1px gold rule (hidden below 768px).
 */
export function Faqs() {
  return (
    <section id="faqs" className="bg-faq-gradient relative w-full py-[45px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container-bs">
        <SectionHeader eyebrow="Frequently Asked Question" title="You May Ask" />

        <div className="relative -mx-[15px] flex flex-wrap md:after:absolute md:after:top-0 md:after:left-[calc(50%-0.5px)] md:after:h-full md:after:w-px md:after:bg-primary md:after:content-['']">
          {COLUMNS.map((faqs, column) => (
            <div key={column} className="w-full px-[15px] md:w-1/2">
              <FaqColumn faqs={faqs} fromLeft={column === 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqColumn({ faqs, fromLeft }: { faqs: readonly Faq[]; fromLeft: boolean }) {
  return (
    <Accordion
      type="single"
      collapsible
      className={fromLeft ? "md:pr-[15px]" : "max-md:pt-[15px] md:pl-[15px]"}
    >
      {faqs.map((faq, index) => (
        <Reveal
          key={faq.question}
          x={fromLeft ? -30 : 30}
          duration={0.5}
          delay={index * 0.07}
          className="mb-[15px] last:mb-0"
        >
          <AccordionItem value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}
