"use client";

import { AnimatePresence, motion, useDragControls, type PanInfo } from "motion/react";
import Image from "next/image";
import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { HiArrowPath, HiArrowUp, HiXMark } from "react-icons/hi2";

import { useMediaQuery } from "@/hooks/use-media-query";
import { SPRING, SPRING_SHEET, SPRING_SNAPPY, projectMomentum } from "@/lib/animations";
import { CHAT_GREETING, CHAT_SUGGESTIONS, localChatAdapter } from "@/lib/chat";
import { COMPANY } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { ChatAdapter, ChatMessage } from "@/types";

const INPUT_MAX_HEIGHT_PX = 96;
const NUDGE_DELAY_MS = 6000;
const NUDGE_STORAGE_KEY = "teza-nudge-seen";
/** Fraction of the sheet's height a (projected) drag must cover to dismiss it. */
const SHEET_DISMISS_RATIO = 0.3;
const URL_PATTERN = /(https?:\/\/[^\s]+)/g;

const GREETING_MESSAGE: ChatMessage = {
  id: "assistant-greeting",
  role: "assistant",
  content: CHAT_GREETING,
  timestamp: 0,
};

interface ChatbotProps {
  /** Swap in an LLM/webhook transport without touching the UI. */
  adapter?: ChatAdapter;
}

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    timestamp: Date.now(),
  };
}

/** Renders plain-text replies with any URLs turned into links. */
function linkify(text: string): ReactNode {
  return text.split(URL_PATTERN).map((part, index) =>
    index % 2 === 1 ? (
      <a
        key={index}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold break-all text-dark underline decoration-primary decoration-2 underline-offset-2 hover:text-dark"
      >
        {part.replace(/^https?:\/\//, "")}
      </a>
    ) : (
      <Fragment key={index}>{part}</Fragment>
    ),
  );
}

/**
 * "Teza" — Tezeon's water assistant, in Apple's liquid-glass language:
 * a glass launcher that grows a translucent panel from its own position
 * (bottom sheet with drag-to-dismiss on phones), springy but critically damped
 * motion, one-tap suggestions and a WhatsApp hand-off to a real person.
 * Replies come from a swappable `ChatAdapter` (local keyword engine by default).
 */
export function Chatbot({ adapter = localChatAdapter }: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<readonly ChatMessage[]>([GREETING_MESSAGE]);

  /* Phones, and any viewport too short for the floating panel (e.g. landscape). */
  const compact = useMediaQuery("(max-width: 480px), (max-height: 560px)");
  const dragControls = useDragControls();
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    launcherRef.current?.focus({ preventScroll: true });
  }, []);

  /* A gentle, once-per-visit nudge so first-time visitors discover Teza. */
  useEffect(() => {
    if (window.sessionStorage.getItem(NUDGE_STORAGE_KEY)) return;
    const timer = window.setTimeout(() => setNudge(true), NUDGE_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, []);

  const dismissNudge = (): void => {
    setNudge(false);
    window.sessionStorage.setItem(NUDGE_STORAGE_KEY, "1");
  };

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTo({ top: body.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 200);
    const onKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const toggle = (): void => {
    if (nudge) dismissNudge();
    if (open) close();
    else setOpen(true);
  };

  async function send(rawText: string): Promise<void> {
    const text = rawText.trim();
    if (!text || thinking) return;

    setDraft("");
    if (inputRef.current) inputRef.current.style.height = "auto";
    setMessages((current) => [...current, createMessage("user", text)]);
    setThinking(true);

    try {
      const reply = await adapter.send(text, messages);
      setMessages((current) => [...current, createMessage("assistant", reply)]);
    } catch {
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          `I'm having trouble right now. Please call ${COMPANY.phone} or message us on WhatsApp: ${COMPANY.whatsappUrl}`,
        ),
      ]);
    } finally {
      setThinking(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void send(draft);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(draft);
    }
  }

  function autoGrow(element: HTMLTextAreaElement): void {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, INPUT_MAX_HEIGHT_PX)}px`;
  }

  /* Bottom sheet: dismiss when the drag, projected with its momentum, would travel far enough. */
  function handleSheetDragEnd(_event: PointerEvent | MouseEvent | TouchEvent, info: PanInfo): void {
    const height = sheetRef.current?.offsetHeight ?? 600;
    const projected = info.offset.y + projectMomentum(info.velocity.y);
    if (projected > height * SHEET_DISMISS_RATIO) close();
  }

  const asked = new Set(messages.filter((m) => m.role === "user").map((m) => m.content));
  const suggestions = CHAT_SUGGESTIONS.filter((suggestion) => !asked.has(suggestion));
  const canSend = draft.trim().length > 0 && !thinking;

  return (
    <>
      {/* Discovery nudge */}
      <AnimatePresence>
        {nudge && !open ? (
          <motion.div
            key="nudge"
            initial={{ opacity: 0, y: 8, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.94 }}
            transition={SPRING}
            style={{ transformOrigin: "bottom left" }}
            className="liquid-glass fixed bottom-[100px] left-7 z-[9998] flex max-w-[260px] items-start gap-2 rounded-2xl py-3 pr-2 pl-4 max-[480px]:bottom-[86px] max-[480px]:left-[18px]"
          >
            <button type="button" onClick={toggle} className="text-left text-sm leading-snug text-dark">
              <span className="block font-semibold">Need clean water?</span>
              <span className="text-dark/70">Ask Teza about boreholes, treatment or a free quote.</span>
            </button>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={dismissNudge}
              className="press grid size-6 shrink-0 place-items-center rounded-full text-dark/50 hover:bg-dark/5 hover:text-dark"
            >
              <HiXMark aria-hidden="true" className="size-4" />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Launcher */}
      <motion.button
        ref={launcherRef}
        type="button"
        aria-label={open ? "Close Teza, the Tezeon chat assistant" : "Chat with Teza, the Tezeon assistant"}
        aria-expanded={open}
        aria-controls="tez-chatbot"
        onClick={toggle}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={SPRING_SNAPPY}
        className={cn(
          "liquid-glass-dark fixed bottom-7 left-7 z-[9999] grid size-[60px] place-items-center rounded-full max-[480px]:bottom-[18px] max-[480px]:left-[18px]",
          /* The sheet carries its own close button and would sit under the launcher. */
          open && compact && "pointer-events-none invisible",
        )}
      >
        <AnimatePresence initial={false} mode="popLayout">
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={SPRING_SNAPPY}
            >
              <HiXMark aria-hidden="true" className="size-7 text-primary" />
            </motion.span>
          ) : (
            <motion.span
              key="logo"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={SPRING_SNAPPY}
              className="relative"
            >
              <Image src={COMPANY.logo} alt="" width={34} height={34} className="size-[34px] rounded-full object-contain" />
              <span className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-dark bg-emerald-400" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Panel / sheet */}
      <AnimatePresence>
        {open ? (
          <>
            {compact ? (
              <motion.div
                key="scrim"
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={close}
                className="fixed inset-0 z-[9997] bg-dark/30"
              />
            ) : null}
            <motion.section
              key="panel"
              ref={sheetRef}
              id="tez-chatbot"
              role="dialog"
              aria-label="Teza, the Tezeon chat assistant"
              {...(compact
                ? {
                    initial: { y: "100%" },
                    animate: { y: 0 },
                    exit: { y: "100%" },
                    transition: SPRING_SHEET,
                    drag: "y" as const,
                    dragListener: false,
                    dragControls,
                    dragConstraints: { top: 0, bottom: 0 },
                    dragElastic: { top: 0.06, bottom: 1 },
                    onDragEnd: handleSheetDragEnd,
                  }
                : {
                    initial: { opacity: 0, scale: 0.9, y: 16, filter: "blur(10px)" },
                    animate: { opacity: 1, scale: 1, y: 0, filter: "blur(0px)" },
                    exit: { opacity: 0, scale: 0.9, y: 16, filter: "blur(10px)" },
                    transition: SPRING,
                  })}
              style={{ transformOrigin: "bottom left" }}
              className={cn(
                "liquid-glass-thick fixed z-[9998] flex flex-col overflow-hidden",
                compact
                  ? "inset-x-0 bottom-0 h-[85svh] rounded-t-[28px]"
                  : "bottom-[100px] left-7 h-[min(600px,calc(100svh-140px))] w-[380px] rounded-[28px]",
              )}
            >
              {/* Header (drag handle on phones) */}
              <header
                onPointerDown={(event) => compact && dragControls.start(event)}
                className={cn("relative z-10 shrink-0 px-4 pt-3 pb-3", compact && "cursor-grab touch-none active:cursor-grabbing")}
              >
                {compact ? <span aria-hidden="true" className="mx-auto mb-3 block h-1.5 w-10 rounded-full bg-dark/20" /> : null}
                <div className="flex items-center gap-3">
                  <span className="relative grid size-11 shrink-0 place-items-center rounded-full bg-dark shadow-[0_4px_12px_rgba(3,15,39,0.25)]">
                    <Image src={COMPANY.logo} alt="" width={28} height={28} className="size-7 rounded-full object-contain" />
                    <span className="absolute right-0 bottom-0 size-3 rounded-full border-2 border-white bg-emerald-400" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-[17px] leading-tight font-semibold tracking-[-0.01em] text-dark">Teza</h2>
                    <p className="truncate text-xs text-dark/60">Tezeon water assistant · Replies instantly</p>
                  </div>
                  <IconButton label="Start a new conversation" onClick={() => setMessages([GREETING_MESSAGE])}>
                    <HiArrowPath aria-hidden="true" className="size-[18px]" />
                  </IconButton>
                  <IconButton label="Close chat" onClick={close}>
                    <HiXMark aria-hidden="true" className="size-5" />
                  </IconButton>
                </div>
              </header>

              {/* Conversation — fades under the header (scroll edge effect, no hard divider) */}
              <div
                ref={bodyRef}
                role="log"
                aria-live="polite"
                className="flex flex-1 flex-col gap-2.5 overflow-y-auto overscroll-contain px-4 pt-3 pb-4 [mask-image:linear-gradient(to_bottom,transparent,black_16px,black_calc(100%-12px),transparent)]"
              >
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    layout="position"
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={SPRING_SNAPPY}
                    style={{ transformOrigin: message.role === "user" ? "bottom right" : "bottom left" }}
                    className={cn("flex max-w-[85%]", message.role === "user" ? "self-end" : "self-start")}
                  >
                    <p
                      className={cn(
                        "m-0 px-3.5 py-2.5 text-[0.9rem] leading-[1.45] break-words",
                        message.role === "user"
                          ? "rounded-[20px_20px_6px_20px] bg-[linear-gradient(135deg,#0a1e3d_0%,#030f27_100%)] text-white shadow-[0_4px_14px_rgba(3,15,39,0.25)]"
                          : "rounded-[20px_20px_20px_6px] bg-white text-[#1a2637] shadow-[0_1px_2px_rgba(3,15,39,0.06),0_4px_14px_rgba(3,15,39,0.08)]",
                      )}
                    >
                      {message.role === "assistant" ? linkify(message.content) : message.content}
                    </p>
                  </motion.div>
                ))}

                <AnimatePresence>
                  {thinking ? (
                    <motion.div
                      key="thinking"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={SPRING_SNAPPY}
                      aria-label="Teza is typing"
                      className="flex gap-1 self-start rounded-[20px_20px_20px_6px] bg-white px-4 py-3.5 shadow-[0_4px_14px_rgba(3,15,39,0.08)]"
                    >
                      {[0, 180, 360].map((delayMs) => (
                        <span
                          key={delayMs}
                          style={{ animationDelay: `${delayMs}ms` }}
                          className="size-[7px] animate-dot-bounce rounded-full bg-dark"
                        />
                      ))}
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Suggestions */}
              {suggestions.length > 0 ? (
                <div className="flex shrink-0 snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none]">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      disabled={thinking}
                      onClick={() => void send(suggestion)}
                      className="press shrink-0 snap-start rounded-full border border-dark/10 bg-white/70 px-3.5 py-1.5 text-[13px] font-medium whitespace-nowrap text-dark transition-colors hover:border-primary hover:bg-primary/15 disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}

              {/* Composer */}
              <form onSubmit={handleSubmit} className="flex shrink-0 items-end gap-2 px-3 pt-1 pb-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={draft}
                  onChange={(event) => {
                    setDraft(event.target.value);
                    autoGrow(event.target);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about water systems…"
                  aria-label="Type your message"
                  className="max-h-24 flex-1 resize-none overflow-y-auto rounded-[22px] border border-dark/10 bg-white/80 px-4 py-[10px] text-[0.9rem] leading-[1.4] text-dark outline-none [scrollbar-width:none] placeholder:text-dark/40 focus:border-dark/30 focus:bg-white"
                />
                <motion.button
                  type="submit"
                  aria-label="Send message"
                  disabled={!canSend}
                  animate={{ scale: canSend ? 1 : 0.85, opacity: canSend ? 1 : 0.45 }}
                  whileTap={{ scale: 0.9 }}
                  transition={SPRING_SNAPPY}
                  className="grid size-[42px] shrink-0 place-items-center rounded-full bg-primary text-dark shadow-[0_4px_14px_rgba(253,190,51,0.45)]"
                >
                  <HiArrowUp aria-hidden="true" className="size-5 stroke-[0.6]" />
                </motion.button>
              </form>

              <a
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex shrink-0 items-center justify-center gap-1.5 pb-3 text-xs text-dark/55 hover:text-dark"
              >
                <FaWhatsapp aria-hidden="true" className="size-3.5 text-[#25d366]" />
                Prefer a person? Chat with our team on WhatsApp
              </a>
            </motion.section>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function IconButton({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="press grid size-9 shrink-0 place-items-center rounded-full bg-dark/[0.06] text-dark/70 transition-colors hover:bg-dark/10 hover:text-dark"
    >
      {children}
    </button>
  );
}
