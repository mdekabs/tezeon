import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

/**
 * Button style recipes. Mirrors the legacy `.btn` contract:
 * square corners, gold fill, dark text, hover swaps to dark fill / gold text.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-semibold uppercase tracking-wide transition-all duration-300 ease-out hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-gold-start via-gold-mid to-gold-end text-dark shadow-[0_4px_16px_0_rgba(253,190,51,0.35)] hover:from-gold-mid hover:via-gold-end hover:to-gold-deep hover:shadow-[0_6px_20px_0_rgba(253,190,51,0.45)]",
        outline:
          "border border-brand-gold bg-transparent text-dark hover:bg-brand-gold hover:text-dark",
        outlineLight:
          "border border-brand-gold bg-transparent text-white hover:bg-brand-gold hover:text-dark",
        dark: "bg-dark text-white hover:bg-brand-gold hover:text-dark",
        ghost: "bg-transparent text-dark hover:text-primary",
      },
      size: {
        sm: "px-5 py-2 text-xs",
        md: "px-7 py-3 text-sm",
        lg: "px-9 py-4 text-base",
        icon: "size-12 p-0 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}