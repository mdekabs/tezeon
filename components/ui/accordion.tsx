"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentPropsWithoutRef } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

/** Legacy `.faqs .card` (style.css:1400-1408, 3526-3539). */
function AccordionItem({ className, ...props }: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        "rounded-lg border border-black/[0.06] bg-white/[0.96] shadow-[0_2px_16px_rgba(0,0,0,0.06)] backdrop-blur-[8px] transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)]",
        className,
      )}
      {...props}
    />
  );
}

/** Legacy `.faqs .card-header a` (style.css:1410-1449). */
function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="bg-white">
      <AccordionPrimitive.Trigger
        className={cn(
          "group block w-full border border-black/10 px-[25px] py-2.5 text-left text-base leading-10 text-[#121518] transition-all duration-500 hover:text-primary data-[state=open]:bg-primary",
          className,
        )}
        {...props}
      >
        {children}
        <span aria-hidden="true" className="float-right text-xs text-primary group-data-[state=open]:text-dark">
          <FaPlus className="inline group-data-[state=open]:hidden" />
          <FaMinus className="hidden group-data-[state=open]:inline" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

/** Legacy `.faqs .card-body` (style.css:1451-1457) with Bootstrap's collapse. */
function AccordionContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-collapse-up data-[state=open]:animate-collapse-down"
      {...props}
    >
      <div className={cn("border border-t-0 border-black/10 bg-white px-[25px] py-5 text-base", className)}>
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
