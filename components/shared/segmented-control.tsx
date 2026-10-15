"use client";

import { motion } from "motion/react";
import { useId } from "react";

import { SPRING_SNAPPY } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface SegmentOption<T extends string> {
  value: T;
  label: string;
  count?: number;
}

interface SegmentedControlProps<T extends string> {
  label: string;
  options: readonly SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Apple-style segmented control: a glass track with a thumb that glides to the
 * selected segment on a critically damped spring (shared-layout animation).
 */
export function SegmentedControl<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: SegmentedControlProps<T>) {
  const thumbId = useId();

  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "liquid-glass inline-flex max-w-full gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none]",
        className,
      )}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.value)}
            className={cn(
              "press relative shrink-0 rounded-full px-3 py-2 text-[13px] font-medium whitespace-nowrap transition-colors duration-200 sm:px-5 sm:text-sm",
              selected ? "text-dark" : "text-dark/60 hover:text-dark",
            )}
          >
            {selected ? (
              <motion.span
                layoutId={thumbId}
                transition={SPRING_SNAPPY}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgba(3,15,39,0.08),0_4px_12px_rgba(3,15,39,0.12)]"
              />
            ) : null}
            <span className="relative flex items-center gap-1.5">
              {option.label}
              {option.count !== undefined ? (
                <span
                  className={cn(
                    "min-w-5 rounded-full px-1.5 text-center text-[11px] leading-5 font-semibold tabular-nums",
                    selected ? "bg-primary text-dark" : "bg-dark/[0.07] text-dark/60",
                  )}
                >
                  {option.count}
                </span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}
