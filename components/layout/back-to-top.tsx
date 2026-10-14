"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronUp } from "lucide-react";

import { SPRING_SNAP } from "@/lib/animations";
import { useScrollPosition } from "@/hooks/use-scroll-position";

/**
 * Floating "back to top" control (`.back-to-top`): liquid-glass dark chip that
 * springs into view past the 300px threshold. Anchored above the chatbot
 * launcher so the two floating controls stack without overlap.
 */
export function BackToTop() {
  const scrollY = useScrollPosition();
  const visible = scrollY > 300;

  return (
    <AnimatePresence>
      {visible ? (
        <motion.button
          key="back-to-top"
          type="button"
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={SPRING_SNAP}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="glass-panel-dark fixed bottom-24 right-6 z-40 grid size-11 place-items-center rounded-full text-primary"
        >
          <ChevronUp className="size-5" aria-hidden="true" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}