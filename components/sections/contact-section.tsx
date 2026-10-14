"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { SectionHeader } from "@/components/shared/section-header";
import { COMPANY } from "@/lib/data";
import type { ContactFormValues } from "@/types";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  subject: z.string().min(3, "Please enter a subject"),
  message: z.string().min(10, "Please enter your message"),
});

const CONTACT_ITEMS = [
  { icon: MapPin, title: "Location", text: COMPANY.addressLine },
  { icon: Phone, title: "Phone", text: `${COMPANY.phone}, ${COMPANY.phoneAlt}` },
  { icon: Mail, title: "Email", text: COMPANY.email },
] as const;

const FIELD_CLASSES =
  "w-full rounded-none border border-white/40 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white focus:border-white focus:outline-none focus:ring-1 focus:ring-white/60 disabled:cursor-not-allowed disabled:opacity-50";

/**
 * Contact section (`.contact`, style.css:2185-2296) — legacy-exact split
 * design: navy left panel with bordered contact items (gold icons/headings,
 * white body, rgba(255,255,255,.2) hairline frames), and a gold right panel
 * carrying the form — transparent inputs with white text and placeholders,
 * bordered in rgba(255,255,255,.4), and a navy submit button with gold text
 * that inverts to white/navy on hover.
 *
 * The legacy `mail/contact.js` transport was not part of the provided source,
 * so rather than fabricate an endpoint the form validates with Zod and hands
 * the composed message to the visitor's email client via `mailto:` — a real,
 * functional transport using the published company address.
 */
export function ContactSection() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (values: ContactFormValues): void => {
    const body = [
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      "",
      values.message,
    ].join("\n");

    /* Hand the composed message to the visitor's email client (mailto transport). */
    window.location.assign(
      `mailto:${COMPANY.email}?subject=${encodeURIComponent(
        values.subject,
      )}&body=${encodeURIComponent(body)}`,
    );

    setSent(true);
    reset();
  };

  return (
    <section
      id="contact"
      className="py-11"
      style={{
        background: "linear-gradient(160deg, #ffffff 0%, #edf4ff 55%, #f5f9ff 100%)",
      }}
    >
      <div className="container-x">
        <SectionHeader eyebrow="Reach Us" title="For Any Query" />

        <div className="mt-10 grid gap-0 md:grid-cols-2">
          {/* .contact-info on legacy #030f27 navy panel */}
          <div className="space-y-[30px] bg-dark px-4 py-[30px] sm:px-[30px]">
            {CONTACT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="flex items-start border border-white/20 p-[30px]"
              >
                <item.icon
                  className="size-10 shrink-0 text-primary"
                  strokeWidth={1.4}
                  aria-hidden="true"
                />
                <div className="pl-5">
                  <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
                  <p className="mt-2 text-base leading-relaxed text-white">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* .contact-form on legacy #fdbe33 gold panel */}
          <div className="bg-primary px-4 py-[30px] sm:px-[30px]">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="flex flex-col gap-4"
            >
              <div className="space-y-1.5">
                <label htmlFor="contact-name" className="sr-only">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  autoComplete="name"
                  placeholder="Your Name"
                  className={`h-10 ${FIELD_CLASSES}`}
                  {...register("name")}
                />
                {errors.name ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-email" className="sr-only">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  autoComplete="email"
                  placeholder="Your Email"
                  className={`h-10 ${FIELD_CLASSES}`}
                  {...register("email")}
                />
                {errors.email ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-subject" className="sr-only">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  placeholder="Subject"
                  className={`h-10 ${FIELD_CLASSES}`}
                  {...register("subject")}
                />
                {errors.subject ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {errors.subject.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  placeholder="Message"
                  className={`${FIELD_CLASSES} min-h-0 resize-none`}
                  style={{ height: 185 }}
                  {...register("message")}
                />
                {errors.message ? (
                  <p role="alert" className="text-sm font-medium text-red-700">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex cursor-pointer items-center justify-center bg-dark px-[30px] py-4 text-base font-semibold text-primary transition-colors duration-300 hover:bg-white hover:text-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Send Message
                </button>
              </div>

              {sent ? (
                <p role="status" className="text-sm font-medium text-dark">
                  Thanks — your email client should now be open with your message ready to
                  send. You can also reach us directly at {COMPANY.email}.
                </p>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
