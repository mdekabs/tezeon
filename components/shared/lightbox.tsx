"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import Image from "next/image";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
}

interface LightboxContextValue {
  open: (index: number) => void;
}

const LightboxContext = createContext<LightboxContextValue | null>(null);

interface LightboxGroupProps {
  images: readonly LightboxImage[];
  children: ReactNode;
}

/**
 * Grouped image viewer replacing the legacy lightbox2 plugin
 * (`data-lightbox="<group>"`): every trigger inside the group opens the same
 * viewer, which can step through the whole set (arrows, keyboard, wrap-around).
 */
export function LightboxGroup({ images, children }: LightboxGroupProps) {
  const [index, setIndex] = useState<number | null>(null);
  const count = images.length;

  const open = useCallback((next: number) => setIndex(next), []);
  const step = useCallback(
    (delta: number) => setIndex((current) => (current === null ? null : (current + delta + count) % count)),
    [count],
  );
  const context = useMemo(() => ({ open }), [open]);

  const image = index === null ? null : images[index];

  return (
    <LightboxContext.Provider value={context}>
      {children}
      <DialogPrimitive.Root open={image !== null} onOpenChange={(next) => !next && setIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[9990] bg-black/80 data-[state=open]:animate-fade-in" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") step(-1);
              if (event.key === "ArrowRight") step(1);
            }}
            className="fixed top-[50px] left-1/2 z-[9991] -translate-x-1/2 text-center outline-none data-[state=open]:animate-fade-in"
          >
            {image ? (
              <>
                <DialogPrimitive.Title className="sr-only">{image.title ?? image.alt}</DialogPrimitive.Title>
                <div className="group/lb relative rounded-[4px] bg-white p-1">
                  <Image
                    key={image.src}
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={800}
                    sizes="90vw"
                    className="block h-auto max-h-[calc(100vh-150px)] w-auto max-w-[calc(100vw-40px)]"
                  />
                  {count > 1 ? (
                    <>
                      <LightboxNav direction="prev" onClick={() => step(-1)} />
                      <LightboxNav direction="next" onClick={() => step(1)} />
                    </>
                  ) : null}
                </div>
                <div className="flex items-start justify-between gap-6 pt-[5px] text-left">
                  <div>
                    {image.title ? (
                      <span className="block text-[13px] leading-none font-bold text-[#ccc]">{image.title}</span>
                    ) : null}
                    {count > 1 ? (
                      <span className="block pt-[0.5em] pb-[1em] text-xs text-[#999]">
                        Image {index! + 1} of {count}
                      </span>
                    ) : null}
                  </div>
                  <DialogPrimitive.Close
                    aria-label="Close"
                    className="text-[30px] leading-none text-white opacity-70 transition-opacity hover:opacity-100"
                  >
                    &times;
                  </DialogPrimitive.Close>
                </div>
              </>
            ) : null}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </LightboxContext.Provider>
  );
}

function LightboxNav({ direction, onClick }: { direction: "prev" | "next"; onClick: () => void }) {
  const prev = direction === "prev";
  return (
    <button
      type="button"
      aria-label={prev ? "Previous image" : "Next image"}
      onClick={onClick}
      className={cn(
        "absolute top-0 flex h-full w-[34%] items-center px-4 text-5xl text-white opacity-0 transition-opacity group-hover/lb:opacity-70 hover:!opacity-100 focus-visible:opacity-100",
        prev ? "left-0 justify-start" : "right-0 justify-end",
      )}
    >
      <span aria-hidden="true" className="[text-shadow:0_0_6px_rgba(0,0,0,0.6)]">
        {prev ? "‹" : "›"}
      </span>
    </button>
  );
}

interface LightboxTriggerProps {
  index: number;
  label: string;
  className?: string;
}

/** Legacy `<a class="btn" data-lightbox>+</a>` — the 60×60 "+" tile. */
export function LightboxTrigger({ index, label, className }: LightboxTriggerProps) {
  const context = useContext(LightboxContext);
  if (!context) throw new Error("LightboxTrigger must be rendered inside <LightboxGroup>.");

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => context.open(index)}
      className={cn(
        "flex size-[60px] shrink-0 items-center justify-center pt-[3px] pl-[3px] text-[60px] leading-[60px] font-thin transition-all duration-300",
        className,
      )}
    >
      +
    </button>
  );
}
