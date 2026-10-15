"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { NewsletterFormValues } from "@/types";

const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

/**
 * Legacy `.footer .newsletter .form` (style.css:2476-2507): 50px input with
 * the gold-outlined Submit button inset on its right edge. The legacy form
 * had no backend, so submission is validated client-side and acknowledged.
 */
export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({ resolver: zodResolver(newsletterSchema) });

  const onSubmit = (): void => {
    setSubscribed(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="relative mx-auto max-w-[400px] max-md:max-w-full">
        <input
          {...register("email")}
          type="email"
          aria-label="Email address"
          aria-invalid={errors.email ? "true" : "false"}
          placeholder="Email here"
          className="block h-[50px] w-full border-2 border-[#121518] bg-white px-3 py-1.5 text-base text-[#495057] outline-none placeholder:text-[#6c757d] focus:border-[#80bdff]"
        />
        <button
          type="submit"
          className="absolute top-[5px] right-[5px] h-10 border-2 border-primary bg-[#121518] px-2.5 py-2 text-sm leading-normal font-medium text-primary uppercase transition-all duration-300 hover:bg-primary hover:text-[#121518]"
        >
          Submit
        </button>
      </div>
      {errors.email ? (
        <p role="alert" className="mt-2 text-xs text-primary">
          {errors.email.message}
        </p>
      ) : null}
      {subscribed && !errors.email ? (
        <p role="status" className="mt-2 text-xs text-white/70">
          Thanks — you&apos;re on the list.
        </p>
      ) : null}
    </form>
  );
}
