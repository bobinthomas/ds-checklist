"use client";

import { useMemo, useState } from "react";
import {
  decisions,
  decisionStatusLabels,
  type DecisionStatus,
} from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

const statusStyles: Record<DecisionStatus, string> = {
  accepted: "bg-green-50 text-green-800 border-green-200",
  proposed: "bg-amber-50 text-amber-800 border-amber-200",
  superseded: "bg-ink/5 text-ink-muted border-ink/10",
};

export function DecisionLog() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<DecisionStatus | "all">(
    "all",
  );
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    return decisions
      .filter((d) => statusFilter === "all" || d.status === statusFilter)
      .filter(
        (d) =>
          !query ||
          d.title.toLowerCase().includes(query) ||
          d.id.toLowerCase().includes(query),
      )
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [search, statusFilter]);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="decisions"
      aria-labelledby="decisions-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="decisions-heading"
        eyebrow="History"
        title="Decision Log"
        description="Architecture decision records for key governance and technical choices."
      />

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search decisions..."
          aria-label="Search decisions"
          className="flex-1 rounded-lg border border-ink/10 bg-surface-raised px-4 py-2 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        />
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as DecisionStatus | "all")
          }
          aria-label="Filter by status"
          className="rounded-lg border border-ink/10 bg-surface-raised px-4 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
        >
          <option value="all">All statuses</option>
          <option value="accepted">Accepted</option>
          <option value="proposed">Proposed</option>
          <option value="superseded">Superseded</option>
        </select>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-ink/10 bg-surface-raised p-6 text-center text-sm text-ink-muted">
          No decisions match your search or filter.
        </p>
      ) : (
        <ul className="space-y-3">
          {filtered.map((decision) => {
            const isExpanded = expandedId === decision.id;
            const isSuperseded = decision.status === "superseded";
            return (
              <li key={decision.id}>
                <button
                  type="button"
                  onClick={() => toggle(decision.id)}
                  aria-expanded={isExpanded}
                  className={`w-full rounded-xl border p-4 text-left transition-all ${
                    isExpanded
                      ? "border-accent bg-accent/5 shadow-sm"
                      : "border-ink/10 bg-surface-raised hover:border-ink/20"
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs font-mono text-ink-muted">
                        {decision.id} · {decision.date}
                      </p>
                      <h3
                        className={`mt-1 font-display font-semibold text-ink ${
                          isSuperseded ? "line-through opacity-60" : ""
                        }`}
                      >
                        {decision.title}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[decision.status]}`}
                    >
                      {decisionStatusLabels[decision.status]}
                    </span>
                  </div>

                  <div
                    className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                      isExpanded
                        ? "mt-4 grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden space-y-4 border-t border-ink/10 pt-4 text-sm">
                      <div>
                        <p className="font-medium text-ink-muted">Context</p>
                        <p className="mt-1 leading-relaxed text-ink">
                          {decision.context}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-ink-muted">Decision</p>
                        <p className="mt-1 leading-relaxed text-ink">
                          {decision.decision}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-ink-muted">
                          Consequences
                        </p>
                        <ul className="mt-2 space-y-1">
                          {decision.consequences.map((c) => (
                            <li
                              key={c}
                              className="flex items-start gap-2 text-ink"
                            >
                              <span
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                                aria-hidden="true"
                              />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
