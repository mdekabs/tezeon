import type { ComponentPropsWithRef } from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: ComponentPropsWithRef<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "h-12 w-full rounded-none border border-gray-300 bg-white px-4 text-sm text-dark placeholder:text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}