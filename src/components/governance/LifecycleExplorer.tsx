"use client";

import { useState } from "react";
import {
  lifecycleStatuses,
  type LifecycleStatusId,
} from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

const colorMap = {
  amber: {
    dot: "bg-amber-400",
    ring: "ring-amber-400/30",
    bg: "bg-amber-50",
    border: "border-amber-200",
    text: "text-amber-900",
  },
  orange: {
    dot: "bg-orange-400",
    ring: "ring-orange-400/30",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-900",
  },
  green: {
    dot: "bg-green-500",
    ring: "ring-green-500/30",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-900",
  },
  blue: {
    dot: "bg-blue-500",
    ring: "ring-blue-500/30",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-900",
  },
} as const;

export function LifecycleExplorer() {
  const [activeId, setActiveId] = useState<LifecycleStatusId>("draft");
  const active = lifecycleStatuses.find((s) => s.id === activeId)!;
  const colors = colorMap[active.color];

  return (
    <section
      id="lifecycle"
      aria-labelledby="lifecycle-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="lifecycle-heading"
        eyebrow="Status"
        title="Component Lifecycle"
        description="Select a status to see what it means for adopters."
      />

      {/* Pipeline */}
      <div
        role="tablist"
        aria-label="Component lifecycle statuses"
        className="flex flex-wrap items-center gap-2 sm:gap-0"
      >
        {lifecycleStatuses.map((status, index) => {
          const isActive = activeId === status.id;
          const statusColors = colorMap[status.color];

          return (
            <div key={status.id} className="flex items-center">
              <button
                type="button"
                role="tab"
                id={`tab-${status.id}`}
                aria-selected={isActive}
                aria-controls="lifecycle-panel"
                onClick={() => setActiveId(status.id)}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? `${statusColors.bg} ${statusColors.border} ${statusColors.text} ring-2 ${statusColors.ring}`
                    : "border-ink/10 bg-surface-raised text-ink-muted hover:border-ink/20 hover:text-ink"
                }`}
              >
                <span aria-hidden="true">{status.emoji}</span>
                {status.label}
              </button>
              {index < lifecycleStatuses.length - 1 && (
                <span
                  className="mx-2 hidden text-ink/30 sm:inline"
                  aria-hidden="true"
                >
                  →
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div
        id="lifecycle-panel"
        role="tabpanel"
        aria-labelledby={`tab-${activeId}`}
        className={`mt-6 rounded-2xl border p-6 transition-colors duration-300 ${colors.bg} ${colors.border}`}
      >
        <div className="flex items-center gap-3">
          <span
            className={`h-3 w-3 rounded-full ${colors.dot}`}
            aria-hidden="true"
          />
          <h3 className={`font-display text-xl font-semibold ${colors.text}`}>
            {active.label}
          </h3>
        </div>
        <p className={`mt-3 text-base ${colors.text} opacity-80`}>
          {active.description}
        </p>
        <div className="mt-4 rounded-xl bg-white/60 p-4">
          <p className="text-xs font-medium uppercase tracking-widest text-ink-muted">
            For adopters
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink">
            {active.adopterGuidance}
          </p>
        </div>
      </div>
    </section>
  );
}
