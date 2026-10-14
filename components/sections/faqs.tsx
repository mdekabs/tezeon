import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "@/components/shared/section-header";
import { FAQS } from "@/lib/data";

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

/**
 * Two-column FAQ accordion (`.faqs`) — legacy spec (style.css:1356-1457):
 * - Section: linear-gradient(180deg, #edf4ff, #f8fbff 50%, #fff)
 * - 1px GOLD vertical divider between the two columns (hidden < 768px)
 * - Square cards; open header flips to solid gold with navy "×"
 * - Radix `type="single" collapsible` = one open item per column,
 *   exactly like the legacy `data-parent` behaviour.
 */
export function Faqs() {
  return (
    <section id="faqs" className="bg-faq-gradient relative py-11">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQ_SCHEMA).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container-x relative">
        <SectionHeader eyebrow="Frequently Asked Question" title="You May Ask" />

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Legacy gold centre divider: `.faqs .row::after` */}
          <span
            aria-hidden="true"
            className="hairline-divider-gold absolute left-1/2 top-0 hidden h-full md:block"
          />

          <Accordion type="single" collapsible className="space-y-4 md:pr-[15px]">
            {FAQS.slice(0, 5).map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible className="space-y-4 md:pl-[15px]">
            {FAQS.slice(5).map((faq) => (
              <AccordionItem key={faq.question} value={faq.question}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}