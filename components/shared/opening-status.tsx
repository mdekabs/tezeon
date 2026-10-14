"use client";

import { useSyncExternalStore } from "react";

type OpenState = "open" | "closed";

const OPEN_WEEKDAYS = new Set([1, 2, 3, 4, 5]); // Mon–Fri
const OPENS_HOUR = 8;
const CLOSES_HOUR = 21;
const REFRESH_INTERVAL_MS = 60_000;

function computeLagosState(): OpenState {
  /* Africa/Lagos is UTC+1 with no DST, so a fixed local-time read is deterministic. */
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Lagos",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const dayIndex: Record<string, number> = {
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
    Sun: 0,
  };

  const weekdayNumber = dayIndex[weekday] ?? 0;
  const isOpen =
    OPEN_WEEKDAYS.has(weekdayNumber) && hour >= OPENS_HOUR && hour < CLOSES_HOUR;

  return isOpen ? "open" : "closed";
}

/* --------------------------------------------------------------------------
 * Clock store consumed via `useSyncExternalStore`: the effect body only
 * subscribes to an external timer (no synchronous setState), and the server
 * snapshot stays `null` so hydration is deterministic.
 * ------------------------------------------------------------------------ */

const listeners = new Set<() => void>();
let snapshot: OpenState | null = null;
let timer: number | null = null;

function refresh(): void {
  snapshot = computeLagosState();
  listeners.forEach((listener) => {
    listener();
  });
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);

  if (timer === null) {
    refresh();
    timer = window.setInterval(refresh, REFRESH_INTERVAL_MS);
  }

  return () => {
    listeners.delete(onStoreChange);
    if (listeners.size === 0 && timer !== null) {
      window.clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot(): OpenState | null {
  return snapshot;
}

function getServerSnapshot(): null {
  return null;
}

/**
 * Inline office-status chip for the footer legal bar. Resolves the current
 * open/closed state from the published Mon–Fri 08:00–21:00 (Africa/Lagos)
 * schedule and refreshes every minute. Hydration-safe: the server render
 * shows the static hours, and the live state swaps in after mount.
 */
export function OpeningStatus() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (state === null) {
    return (
      <span className="inline-flex items-center gap-2 text-xs text-white/50">
        <span className="size-2 rounded-full bg-white/30" aria-hidden="true" />
        Mon–Fri · 08:00–21:00
      </span>
    );
  }

  const isOpen = state === "open";

  return (
    <span
      className="inline-flex items-center gap-2 text-xs"
      role="status"
      aria-label={isOpen ? "Office is currently open" : "Office is currently closed"}
    >
      <span className="relative flex size-2">
        {isOpen ? (
          <span
            className="absolute inline-flex h-full w-full animate-status-pulse rounded-full bg-emerald-400 opacity-75"
            aria-hidden="true"
          />
        ) : null}
        <span
          className={`relative inline-flex size-2 rounded-full ${
            isOpen ? "bg-emerald-500" : "bg-amber-400"
          }`}
          aria-hidden="true"
        />
      </span>
      <span className={isOpen ? "text-emerald-400" : "text-amber-400"}>
        {isOpen ? "Open now" : "Closed"}
      </span>
      <span className="text-white/40">· Mon–Fri 08:00–21:00</span>
    </span>
  );
}