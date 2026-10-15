"use client";

import { cn } from "@/lib/utils";

interface PortfolioFiltersProps<T extends string> {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  /** Gallery page adds the lift/shadow interactions and entrance (style.css:2833-2848). */
  animated?: boolean;
}

/** Legacy `#portfolio-flters` — square gold chips; navy when active or hovered. */
export function PortfolioFilters<T extends string>({
  options,
  value,
  onChange,
  animated = false,
}: PortfolioFiltersProps<T>) {
  return (
    <ul
      className={cn(
        "-mt-[15px] mb-[25px] p-0 text-center",
        animated && "animate-[tez-fade-up_0.6s_ease_0.35s_both]",
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <li key={option.value} className="inline-block">
            <button
              type="button"
              aria-pressed={active}
              onClick={() => onChange(option.value)}
              className={cn(
                "m-[5px] px-[15px] py-2 text-sm font-medium uppercase transition-all duration-300 hover:bg-dark hover:text-primary max-[480px]:px-2.5 max-[480px]:py-1.5 max-[480px]:text-xs",
                active ? "bg-dark text-primary" : "bg-primary text-dark",
                animated &&
                  "duration-[220ms] hover:-translate-y-[3px] hover:shadow-[0_6px_18px_rgba(253,190,51,0.4)]",
                animated && active && "shadow-[0_4px_14px_rgba(3,15,39,0.28)]",
              )}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
