import {
  systemHealthMetrics,
  systemHealthNote,
  systemHealthReviewThreshold,
} from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

export function SystemHealthSection() {
  return (
    <section
      id="system-health"
      aria-labelledby="system-health-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="system-health-heading"
        eyebrow="Metrics"
        title="System Health"
        description="How we measure whether the design system is actually working."
      />
      <div className="grid gap-6 sm:grid-cols-2">
        {systemHealthMetrics.map((metric) => (
          <div
            key={metric.id}
            className="rounded-2xl border border-ink/10 bg-surface-raised p-6"
          >
            <p className="flex items-center gap-2 text-sm font-medium text-ink-muted">
              {metric.title}
              {metric.primary && (
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  Primary metric
                </span>
              )}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink">
              {metric.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-ink/10 bg-surface-raised p-6">
        <p className="text-sm font-medium text-ink-muted">Review threshold</p>
        <p className="mt-2 text-sm leading-relaxed text-ink">
          {systemHealthReviewThreshold}
        </p>
      </div>

      <p className="mt-6 text-sm leading-relaxed text-ink-muted">
        {systemHealthNote}
      </p>
    </section>
  );
}
