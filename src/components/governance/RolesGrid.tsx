"use client";

import { useState } from "react";
import { roles } from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

export function RolesGrid() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="roles"
      aria-labelledby="roles-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="roles-heading"
        eyebrow="People"
        title="Roles & Responsibilities"
        description="Click a role to see expanded responsibilities."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {roles.map((role) => {
          const isExpanded = expandedId === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => toggle(role.id)}
              aria-expanded={isExpanded}
              className={`rounded-2xl border p-6 text-left transition-all ${
                isExpanded
                  ? "border-accent bg-accent/5 shadow-md"
                  : "border-ink/10 bg-surface-raised hover:border-ink/20 hover:shadow-sm"
              }`}
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {role.title}
              </h3>
              <p className="mt-2 text-sm text-ink-muted">
                {role.responsibility}
              </p>
              <div
                className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                  isExpanded
                    ? "mt-4 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="border-t border-ink/10 pt-4 text-sm leading-relaxed text-ink">
                    {role.detail}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
