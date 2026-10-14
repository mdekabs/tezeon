"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { NewsletterFormValues } from "@/types";

const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

/**
 * Footer newsletter field. The legacy template never wired this form to a
 * backend (`<input>` + `<button>` with no handler), so the migration keeps
 * identical visuals and adds deterministic client-side validation feedback.
 */
export function NewsletterForm() {
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = (): void => {
    setSubscribed(true);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4 space-y-3">
      <div className="flex min-w-0 gap-2">
        <Input
          {...register("email")}
          type="email"
          aria-label="Email address"
          placeholder="Email here"
          className="h-11 min-w-0 flex-1 rounded-full border-white/20 bg-white/10 pl-5 text-white placeholder:text-white/50 focus:border-primary focus:ring-primary"
        />
        <Button type="submit" size="sm" className="h-11 shrink-0 px-6 py-0">
          Submit
        </Button>
      </div>
      {errors.email ? (
        <p role="alert" className="text-xs text-primary">
          {errors.email.message}
        </p>
      ) : null}
      {subscribed && !errors.email ? (
        <p role="status" className="text-xs text-white/70">
          Thanks — you&apos;re on the list.
        </p>
      ) : null}
    </form>
  );
}