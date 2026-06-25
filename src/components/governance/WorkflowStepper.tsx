"use client";

import { useState } from "react";
import { workflowSteps } from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

export function WorkflowStepper() {
  const [openStepId, setOpenStepId] = useState<string>(workflowSteps[0].id);

  const toggle = (id: string) => {
    setOpenStepId((prev) => (prev === id ? "" : id));
  };

  return (
    <section
      id="workflow"
      aria-labelledby="workflow-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="workflow-heading"
        eyebrow="Process"
        title="Contribution Workflow"
        description="Click each step to expand details."
      />
      <ol className="relative space-y-0">
        {workflowSteps.map((step, index) => {
          const isOpen = openStepId === step.id;
          const isLast = index === workflowSteps.length - 1;

          return (
            <li key={step.id} className="relative flex gap-6">
              {/* Connector line */}
              {!isLast && (
                <div
                  className="absolute left-[19px] top-10 h-[calc(100%-8px)] w-0.5 bg-ink/10"
                  aria-hidden="true"
                />
              )}

              {/* Step number */}
              <button
                type="button"
                onClick={() => toggle(step.id)}
                aria-expanded={isOpen}
                aria-controls={`step-panel-${step.id}`}
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 font-display text-sm font-semibold transition-colors ${
                  isOpen
                    ? "border-accent bg-accent text-white"
                    : "border-ink/20 bg-surface-raised text-ink hover:border-accent"
                }`}
              >
                {step.number}
              </button>

              {/* Step content */}
              <div className="min-w-0 flex-1 pb-8">
                <button
                  type="button"
                  onClick={() => toggle(step.id)}
                  aria-expanded={isOpen}
                  aria-controls={`step-panel-${step.id}`}
                  className="w-full text-left"
                >
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-ink-muted">{step.summary}</p>
                </button>

                <div
                  id={`step-panel-${step.id}`}
                  className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                    isOpen
                      ? "mt-4 grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <ul className="space-y-2 rounded-xl border border-ink/10 bg-surface-raised p-4">
                      {step.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex items-start gap-2 text-sm text-ink"
                        >
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                    {"linkLabel" in step && step.linkLabel && (
                      <a
                        href={step.linkHref}
                        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                      >
                        {step.linkLabel} →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
