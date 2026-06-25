import { SectionHeading } from "./SectionHeading";

export function GovernanceModel() {
  return (
    <section
      id="model"
      aria-labelledby="model-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="model-heading"
        eyebrow="Structure"
        title="Governance Model"
      />
      <div className="rounded-2xl border border-ink/10 bg-surface-raised p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-widest text-ink-muted">
          Model Type
        </p>
        <p className="mt-2 font-display text-2xl font-semibold text-ink">
          Hybrid
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted">
          Core team owns foundations; product teams contribute components.
          This balances consistency at the base layer with flexibility where
          products need it most.
        </p>
      </div>
    </section>
  );
}
