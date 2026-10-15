"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

import { CHAT_GREETING, localChatAdapter } from "@/lib/chat";
import { COMPANY } from "@/lib/data";
import { cn } from "@/lib/utils";
import type { ChatAdapter, ChatMessage } from "@/types";

const INPUT_MAX_HEIGHT_PX = 96;

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
 * "Teza" assistant — legacy chatbot.js + chatbot.css: navy logo launcher in
 * the bottom-left corner opening a white chat card (bottom sheet on phones).
 * Replies come from a swappable `ChatAdapter` (local keyword engine by default).
 */
export function Chatbot({ adapter = localChatAdapter }: ChatbotProps) {
  const [open, setOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<readonly ChatMessage[]>(() => [
    /* Hydration-stable seed; random ids are only minted in event handlers. */
    { id: "assistant-greeting", role: "assistant", content: CHAT_GREETING, timestamp: 0 },
  ]);

  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const body = bodyRef.current;
    if (body) body.scrollTop = body.scrollHeight;
  }, [messages, thinking]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 260);
    const onKeyDown = (event: globalThis.KeyboardEvent): void => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  async function send(): Promise<void> {
    const text = draft.trim();
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
          `Our assistant is temporarily unavailable. Please use our contact form or call ${COMPANY.phone}.`,
        ),
      ]);
    } finally {
      setThinking(false);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    void send();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
  }

  function autoGrow(element: HTMLTextAreaElement): void {
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, INPUT_MAX_HEIGHT_PX)}px`;
  }

  return (
    <>
      <button
        type="button"
        aria-label={open ? "Close Tezeon chat assistant" : "Open Tezeon chat assistant"}
        aria-expanded={open}
        aria-controls="tez-chatbot"
        onClick={() => setOpen((value) => !value)}
        className="chat-toggler fixed bottom-7 left-7 z-[9999] flex size-14 items-center justify-center overflow-hidden rounded-full max-[480px]:bottom-[18px] max-[480px]:left-[18px]"
      >
        <Image
          src={COMPANY.logo}
          alt=""
          width={32}
          height={32}
          className={cn(
            "absolute size-8 rounded-full object-contain transition-[opacity,transform] duration-[220ms]",
            open && "scale-50 rotate-45 opacity-0",
          )}
        />
        <span
          aria-hidden="true"
          className={cn(
            "absolute text-[1.65rem] leading-none text-primary transition-opacity duration-[220ms]",
            open ? "opacity-100" : "opacity-0",
          )}
        >
          &times;
        </span>
      </button>

      <div
        id="tez-chatbot"
        role="dialog"
        aria-label="Tezeon chat assistant"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "chat-popup fixed bottom-[98px] left-7 z-[9998] w-[360px] max-w-[calc(100vw-44px)] origin-bottom-left overflow-hidden rounded-[20px] bg-white max-[480px]:inset-x-0 max-[480px]:bottom-0 max-[480px]:w-full max-[480px]:max-w-full max-[480px]:origin-bottom max-[480px]:rounded-b-none",
          open ? "pointer-events-auto translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-[0.82] opacity-0",
        )}
      >
        <header className="flex items-center justify-between bg-[linear-gradient(135deg,#030f27_0%,#0a1e3d_100%)] px-[18px] py-3.5">
          <div className="flex items-center gap-2.5">
            <Image
              src={COMPANY.logo}
              alt=""
              width={38}
              height={38}
              className="size-[38px] shrink-0 rounded-full bg-white/[0.14] p-[7px]"
            />
            <div>
              <h3 className="mb-px text-base font-semibold text-primary">Teza</h3>
              <span className="block text-[0.7rem] tracking-[0.03em] text-white/55">
                Tezeon Water Assistant · Online
              </span>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close chat"
            onClick={() => setOpen(false)}
            className="rounded-md px-1.5 py-1 text-2xl leading-none text-white/70 transition-colors hover:bg-white/[0.08] hover:text-primary"
          >
            &times;
          </button>
        </header>

        <div
          ref={bodyRef}
          role="log"
          aria-live="polite"
          className="chat-body flex h-[340px] flex-col gap-3 overflow-y-auto bg-[#f8fafd] px-3.5 py-4 max-[480px]:h-[calc(55vh-55px)]"
        >
          {messages.map((message) =>
            message.role === "assistant" ? (
              <div key={message.id} className="flex max-w-[88%] items-end gap-2 self-start">
                <BotAvatar />
                <p className="m-0 rounded-[16px_16px_16px_4px] bg-white px-3.5 py-2.5 text-[0.855rem] leading-[1.55] break-words text-[#1a2637] shadow-[0_1px_6px_rgba(3,15,39,0.08)]">
                  {message.content}
                </p>
              </div>
            ) : (
              <div key={message.id} className="flex max-w-[82%] flex-row-reverse items-end gap-2 self-end">
                <p className="m-0 rounded-[16px_16px_4px_16px] bg-[linear-gradient(135deg,#030f27_0%,#0c2247_100%)] px-3.5 py-2.5 text-[0.855rem] leading-[1.55] break-words text-white">
                  {message.content}
                </p>
              </div>
            ),
          )}

          {thinking ? (
            <div className="flex max-w-[88%] items-end gap-2 self-start" aria-label="Teza is typing">
              <BotAvatar />
              <span className="flex gap-1 rounded-[16px_16px_16px_4px] bg-white px-4 py-3.5 shadow-[0_1px_6px_rgba(3,15,39,0.08)]">
                {[0, 180, 360].map((delayMs) => (
                  <span
                    key={delayMs}
                    style={{ animationDelay: `${delayMs}ms` }}
                    className="size-[7px] animate-dot-bounce rounded-full bg-dark opacity-40"
                  />
                ))}
              </span>
            </div>
          ) : null}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-end gap-2 border-t border-dark/[0.07] bg-white px-3 pt-2.5 pb-3"
        >
          <textarea
            ref={inputRef}
            rows={1}
            value={draft}
            onChange={(event) => {
              setDraft(event.target.value);
              autoGrow(event.target);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask about water systems..."
            aria-label="Type your message"
            className="chat-input max-h-24 flex-1 resize-none overflow-y-auto rounded-[20px] border-[1.5px] border-dark/[0.14] bg-[#f8fafd] px-3.5 py-[9px] text-[0.855rem] leading-[1.45] outline-none transition-colors focus:border-dark focus:bg-white"
          />
          <button
            type="submit"
            aria-label="Send message"
            className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#fdbe33_0%,#ffc94d_100%)] text-dark transition-[transform,box-shadow] duration-200 hover:scale-110 hover:shadow-[0_3px_14px_rgba(253,190,51,0.45)]"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <p className="m-0 bg-white pt-[5px] pb-[7px] text-center text-[0.62rem] tracking-[0.04em] text-dark/30">
          {COMPANY.name}
        </p>
      </div>
    </>
  );
}

function BotAvatar() {
  return (
    <Image
      src={COMPANY.logo}
      alt=""
      width={28}
      height={28}
      className="mb-0.5 size-7 shrink-0 rounded-full bg-dark p-[5px]"
    />
  );
}
