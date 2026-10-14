"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, MessageCircle, RotateCcw, Sparkles, X } from "lucide-react";
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  CHAT_GREETING,
  CHAT_QUICK_REPLIES,
  localChatAdapter,
  quickReplyToMessage,
} from "@/lib/chat";
import { SPRING_SNAP, SPRING_TRANSITION } from "@/lib/animations";
import { cn } from "@/lib/utils";
import type { ChatAdapter, ChatMessage } from "@/types";

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

/**
 * Self-contained floating assistant (successor to the legacy `chatbot.js`
 * script). Liquid-glass launcher + spring-expanded panel, typed message
 * queue, simulated typing indicator and quick-reply inquiry pills. All state
 * is local React state; the transport is a swappable `ChatAdapter`.
 */
export function Chatbot({ adapter = localChatAdapter }: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<readonly ChatMessage[]>(() => [
    /* Hydration-stable seed: ids/timestamps with non-deterministic values
     * (Date.now/Math.random) are only minted inside client event handlers. */
    { id: "assistant-greeting", role: "assistant", content: CHAT_GREETING, timestamp: 0 },
  ]);

  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const busyRef = useRef(false);

  useEffect(() => {
    const log = logRef.current;
    if (log) {
      log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
    }
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  async function dispatch(rawMessage: string): Promise<void> {
    const message = rawMessage.trim();
    if (!message || busyRef.current) {
      return;
    }

    busyRef.current = true;
    setDraft("");
    setMessages((current) => [...current, createMessage("user", message)]);
    setTyping(true);

    try {
      const reply = await adapter.send(message, messages);
      setMessages((current) => [...current, createMessage("assistant", reply)]);
    } catch {
      setMessages((current) => [
        ...current,
        createMessage(
          "assistant",
          "Something went wrong on our side. Please try again, or reach us directly at +234 803 096 7886.",
        ),
      ]);
    } finally {
      setTyping(false);
      busyRef.current = false;
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void dispatch(draft);
  }

  function resetConversation(): void {
    setMessages([createMessage("assistant", CHAT_GREETING)]);
    setDraft("");
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        type="button"
        aria-label={open ? "Close assistant" : "Open assistant"}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        transition={SPRING_SNAP}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="glass-panel-dark fixed bottom-6 right-6 z-50 grid size-14 place-items-center rounded-full text-brand-gold"
      >
        {open ? (
          <X className="size-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="size-6" aria-hidden="true" />
        )}
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.section
            key="chat-panel"
            role="dialog"
            aria-label="Tezeon assistant"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={SPRING_TRANSITION}
            className="glass-panel-dark fixed bottom-24 right-6 z-50 flex h-[min(32rem,calc(100vh-8rem))] w-[min(24rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl"
          >
            {/* Header */}
            <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold-start to-gold-end text-dark">
                <Sparkles className="size-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="truncate text-sm font-semibold tracking-tight text-white">
                  Tezeon Assistant
                </h2>
                <p className="truncate text-xs text-white/50">
                  Water engineering · Replies instantly
                </p>
              </div>
              <button
                type="button"
                onClick={resetConversation}
                aria-label="Reset conversation"
                className="grid size-9 place-items-center rounded-full text-white/50 transition-colors hover:bg-white/10 hover:text-white"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
              </button>
            </header>

            {/* Conversation log */}
            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <p
                    className={cn(
                      "max-w-[85%] px-4 py-2.5 text-sm leading-relaxed",
                      message.role === "user"
                        ? "rounded-2xl rounded-br-md bg-gradient-to-r from-gold-start to-gold-end text-dark"
                        : "rounded-2xl rounded-bl-md border border-white/10 bg-white/10 text-white/90",
                    )}
                  >
                    {message.content}
                  </p>
                </div>
              ))}

              {typing ? (
                <div className="flex justify-start" aria-label="Assistant is typing">
                  <span className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/10 px-4 py-3">
                    {[0, 150, 300].map((delayMs) => (
                      <span
                        key={delayMs}
                        style={{ animationDelay: `${delayMs}ms` }}
                        className="size-1.5 animate-bubble-rise rounded-full bg-white/70"
                      />
                    ))}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Quick replies */}
            <div className="flex gap-2 overflow-x-auto border-t border-white/10 px-4 py-3">
              {CHAT_QUICK_REPLIES.map((reply) => (
                <button
                  key={reply.id}
                  type="button"
                  onClick={() => {
                    void dispatch(quickReplyToMessage(reply.id));
                  }}
                  className="shrink-0 rounded-full border border-brand-gold/30 bg-brand-gold-subtle px-3 py-1.5 text-xs font-medium text-brand-gold transition-colors hover:border-brand-gold hover:bg-brand-gold hover:text-dark"
                >
                  {reply.label}
                </button>
              ))}
            </div>

            {/* Composer */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="Ask about water or plumbing…"
                aria-label="Message"
                className="h-10 min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 focus:border-brand-gold focus:outline-none"
              />
              <button
                type="submit"
                aria-label="Send message"
                disabled={draft.trim().length === 0 || typing}
                className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-to-r from-gold-start to-gold-end text-dark transition-transform hover:scale-105 disabled:opacity-40"
              >
                <ArrowUp className="size-4" aria-hidden="true" />
              </button>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>
    </>
  );
}