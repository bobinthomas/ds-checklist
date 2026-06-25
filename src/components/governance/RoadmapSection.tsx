"use client";

import { useMemo, useState } from "react";
import {
  roadmapQuarters,
  roadmapStatusLabels,
  type RoadmapStatus,
} from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

type StatusFilter = "all" | RoadmapStatus;

const statusStyles: Record<RoadmapStatus, string> = {
  planned: "bg-blue-50 text-blue-800 border-blue-200",
  "in-progress": "bg-amber-50 text-amber-800 border-amber-200",
  done: "bg-green-50 text-green-800 border-green-200",
  deferred: "bg-ink/5 text-ink-muted border-ink/10",
};

const filterOptions: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In Progress" },
  { id: "planned", label: "Planned" },
  { id: "done", label: "Done" },
];

export function RoadmapSection() {
  const [activeQuarterId, setActiveQuarterId] = useState(
    roadmapQuarters[0].id,
  );
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const activeQuarter =
    roadmapQuarters.find((q) => q.id === activeQuarterId) ?? roadmapQuarters[0];

  const filteredInitiatives = useMemo(() => {
    if (statusFilter === "all") return activeQuarter.initiatives;
    return activeQuarter.initiatives.filter((i) => i.status === statusFilter);
  }, [activeQuarter, statusFilter]);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="roadmap-heading"
        eyebrow="Direction"
        title="Roadmap"
        description="Quarterly priorities and initiative status. Click an initiative for details."
      />

      {/* Status filter */}
      <div
        className="mb-4 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter by status"
      >
        {filterOptions.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => setStatusFilter(opt.id)}
            aria-pressed={statusFilter === opt.id}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              statusFilter === opt.id
                ? "bg-accent text-white"
                : "border border-ink/10 bg-surface-raised text-ink-muted hover:text-ink"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Quarter tabs */}
      <div
        role="tablist"
        aria-label="Roadmap quarters"
        className="mb-6 flex flex-wrap gap-2"
      >
        {roadmapQuarters.map((quarter) => (
          <button
            key={quarter.id}
            type="button"
            role="tab"
            aria-selected={activeQuarterId === quarter.id}
            onClick={() => {
              setActiveQuarterId(quarter.id);
              setExpandedId(null);
            }}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
              activeQuarterId === quarter.id
                ? "border-accent bg-accent/10 text-accent ring-2 ring-accent/20"
                : "border-ink/10 bg-surface-raised text-ink-muted hover:border-ink/20 hover:text-ink"
            }`}
          >
            {quarter.label}
          </button>
        ))}
      </div>

      {/* Initiatives */}
      <div role="tabpanel" aria-label={`${activeQuarter.label} initiatives`}>
        {filteredInitiatives.length === 0 ? (
          <p className="rounded-xl border border-ink/10 bg-surface-raised p-6 text-center text-sm text-ink-muted">
            No initiatives match this filter for {activeQuarter.label}.
          </p>
        ) : (
          <ul className="space-y-3">
            {filteredInitiatives.map((initiative) => {
              const isExpanded = expandedId === initiative.id;
              return (
                <li key={initiative.id}>
                  <button
                    type="button"
                    onClick={() => toggle(initiative.id)}
                    aria-expanded={isExpanded}
                    className={`w-full rounded-xl border p-4 text-left transition-all ${
                      isExpanded
                        ? "border-accent bg-accent/5 shadow-sm"
                        : "border-ink/10 bg-surface-raised hover:border-ink/20"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-display font-semibold text-ink">
                        {initiative.title}
                      </h3>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[initiative.status]}`}
                      >
                        {roadmapStatusLabels[initiative.status]}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-ink-muted">
                      Owner: {initiative.owner}
                    </p>
                    <div
                      className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                        isExpanded
                          ? "mt-3 grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-ink/10 pt-3 text-sm leading-relaxed text-ink">
                          {initiative.description}
                        </p>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
