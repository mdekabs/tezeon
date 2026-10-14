"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ComponentPropsWithoutRef, ElementRef } from "react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

function AccordionItem({
  className,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      className={cn(
        /* Legacy `.faqs .card`: square, border none (header/body carry borders) */
        "border-none bg-transparent shadow-none",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        className={cn(
          /* Legacy `.faqs .card-header a`: 1px border rgba(0,0,0,.1), white bg,
             10px/25px padding, line-height 40px; open state flips to SOLID GOLD */
          "group flex w-full flex-1 items-center justify-between gap-4 border border-black/10 bg-white px-[25px] py-2.5 text-left text-base font-normal leading-10 text-[#121518] transition-colors duration-500 hover:bg-primary hover:text-dark data-[state=open]:bg-primary data-[state=open]:text-dark",
          className,
        )}
        {...props}
      >
        <span className="flex-1">{children}</span>
        {/* Legacy FA glyph: plus (f067) closed → minus (f068) open */}
        <span
          aria-hidden="true"
          className="shrink-0 text-xs font-black text-primary transition-colors duration-500 group-data-[state=open]:text-dark"
        >
          <span className="group-data-[state=open]:hidden">+</span>
          <span className="hidden group-data-[state=open]:inline">&minus;</span>
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      className="overflow-hidden data-[state=closed]:animate-fade-in data-[state=open]:animate-fade-in"
      {...props}
    >
      <div
        className={cn(
          /* Legacy `.faqs .card-body`: white, 1px border (no top border), 20/25 padding */
          "border border-t-0 border-black/10 bg-white px-[25px] py-5 text-base leading-relaxed text-muted",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
}

export type AccordionTriggerElement = ElementRef<typeof AccordionPrimitive.Trigger>;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };