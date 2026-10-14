import type { ProjectStatus } from "@/types";

/**
 * Apple-style pill badge for project lifecycle state.
 *  - `coming-soon` → warm amber "Upcoming"
 *  - `ongoing`     → emerald chip with a pulsing radar dot
 *  - `completed`   → neutral translucent chip
 */
export function ProjectStatusBadge({ status }: { status: ProjectStatus }) {
  if (status === "coming-soon") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-gold/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-brand-gold backdrop-blur-md">
        Upcoming
      </span>
    );
  }

  if (status === "ongoing") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-emerald-400 backdrop-blur-md">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-status-pulse rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Ongoing
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-white/80 backdrop-blur-md">
      Completed
    </span>
  );
}