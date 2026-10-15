"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Flaticon, type FlaticonName } from "@/components/shared/flaticon";
import { Reveal } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { COMPANY } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { ContactFormValues } from "@/types";

/** Messages match the legacy jqBootstrapValidation `data-validation-required-message`s. */
const contactSchema = z.object({
  name: z.string().trim().min(1, "Please enter your name"),
  email: z.email("Please enter your email"),
  subject: z.string().trim().min(1, "Please enter a subject"),
  message: z.string().trim().min(1, "Please enter your message"),
});

const CONTACT_ITEMS: readonly { icon: FlaticonName; title: string; text: string }[] = [
  { icon: "address", title: "Location", text: COMPANY.addressLine },
  { icon: "call", title: "Phone", text: `${COMPANY.phone}, ${COMPANY.phoneAlt}` },
  { icon: "send-mail", title: "Email", text: COMPANY.email },
];

const FIELD_CLASSES =
  "block w-full border border-white/40 bg-transparent px-3 py-1.5 text-base text-white outline-none placeholder:text-white placeholder:opacity-100 focus:border-[#80bdff]";

/**
 * Legacy `.contact` (style.css:2257-2383, 2665-2678, 3509-3521): navy column
 * of glass contact cards beside a gold column holding the enquiry form.
 *
 * The legacy `mail/contact.php` transport isn't deployable here, so the form
 * validates client-side and hands the composed message to the visitor's
 * email client via `mailto:` addressed to the published company inbox.
 */
export function ContactSection() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  const onSubmit = (values: ContactFormValues): void => {
    const body = [`Name: ${values.name}`, `Email: ${values.email}`, "", values.message].join("\n");
    window.location.assign(
      `mailto:${COMPANY.email}?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(body)}`,
    );
    setSent(true);
    reset();
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[linear-gradient(160deg,#ffffff_0%,#edf4ff_55%,#f5f9ff_100%)] py-[45px]"
    >
      <div className="container-bs">
        <SectionHeader eyebrow="Reach Us" title="For Any Query" />

        <div className="-mx-[15px] flex flex-wrap">
          <div className="w-full bg-dark px-[15px] py-[30px] md:w-1/2">
            <div className="relative w-full px-[15px] max-md:px-[5px]">
              {CONTACT_ITEMS.map((item, index) => (
                <Reveal key={item.title} x={-30} duration={0.6} delay={index * 0.1} className="mb-[30px] last:mb-0">
                  <div className="contact-card relative flex items-start p-[30px] max-md:px-[15px] max-md:py-5">
                    <Flaticon name={item.icon} className="text-[40px] leading-normal text-primary" />
                    <div className="relative pl-5">
                      <h2 className="mb-2 text-xl font-semibold text-primary">{item.title}</h2>
                      <p className="m-0 text-base text-white">{item.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="w-full bg-primary px-[15px] py-[30px] md:w-1/2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="relative px-[15px] max-md:px-[5px]"
            >
              <Field id="contact-name" label="Your Name" error={errors.name?.message}>
                <input
                  id="contact-name"
                  autoComplete="name"
                  placeholder="Your Name"
                  className={cn(FIELD_CLASSES, "h-10")}
                  {...register("name")}
                />
              </Field>
              <Field id="contact-email" label="Your Email" error={errors.email?.message}>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your Email"
                  className={cn(FIELD_CLASSES, "h-10")}
                  {...register("email")}
                />
              </Field>
              <Field id="contact-subject" label="Subject" error={errors.subject?.message}>
                <input
                  id="contact-subject"
                  placeholder="Subject"
                  className={cn(FIELD_CLASSES, "h-10")}
                  {...register("subject")}
                />
              </Field>
              <Field id="contact-message" label="Message" error={errors.message?.message}>
                <textarea
                  id="contact-message"
                  placeholder="Message"
                  className={cn(FIELD_CLASSES, "h-[185px] resize-y max-md:h-[130px]")}
                  {...register("message")}
                />
              </Field>

              <button
                type="submit"
                disabled={isSubmitting}
                className="touch-bounce bg-dark px-[30px] py-4 text-base leading-normal font-semibold text-primary transition-all duration-300 hover:bg-white hover:text-dark disabled:opacity-60"
              >
                Send Message
              </button>

              {sent ? (
                <p role="status" className="mt-4 mb-0 text-sm font-medium text-dark">
                  Thanks — your email app should now be open with your message ready to send.
                  You can also reach us directly at {COMPANY.email}.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Legacy `.control-group`: field followed by a `.help-block.text-danger` line. */
function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      {children}
      <p role={error ? "alert" : undefined} className="mb-4 min-h-0 text-[#dc3545]">
        {error}
      </p>
    </div>
  );
}
