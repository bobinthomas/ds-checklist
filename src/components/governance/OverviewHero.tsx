import { DESIGN_SYSTEM_NAME } from "@/lib/governance-content";

export function OverviewHero() {
  return (
    <section
      id="overview"
      aria-labelledby="overview-heading"
      className="scroll-mt-28"
    >
      <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
        Design Governance
      </p>
      <h1
        id="overview-heading"
        className="font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl"
      >
        {DESIGN_SYSTEM_NAME}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
        This document outlines the governance structure, roles, and processes
        that guide the development and maintenance of our design system.
      </p>
      <div className="mt-8 h-px w-24 bg-accent" aria-hidden="true" />
    </section>
  );
}
