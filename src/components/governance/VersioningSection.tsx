import { breakingChangeRequirements } from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

export function VersioningSection() {
  return (
    <section
      id="versioning"
      aria-labelledby="versioning-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="versioning-heading"
        eyebrow="Change Management"
        title="Versioning & Change Management"
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-ink/10 bg-surface-raised p-6">
          <p className="text-sm font-medium text-ink-muted">Version Format</p>
          <code className="mt-2 block font-mono text-2xl font-semibold text-ink">
            MAJOR.MINOR.PATCH
          </code>
          <p className="mt-2 text-sm text-ink-muted">e.g. 2.4.1</p>
        </div>
        <div className="rounded-2xl border border-ink/10 bg-surface-raised p-6">
          <p className="mb-4 text-sm font-medium text-ink-muted">
            Breaking changes require
          </p>
          <ul className="space-y-3">
            {breakingChangeRequirements.map((item) => (
              <li key={item} className="flex items-start gap-3 text-ink">
                <span
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
