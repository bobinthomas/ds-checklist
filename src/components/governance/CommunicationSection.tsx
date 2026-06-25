import { communicationChannels } from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

export function CommunicationSection() {
  return (
    <section
      id="communication"
      aria-labelledby="communication-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="communication-heading"
        eyebrow="Stay Connected"
        title="Communication"
      />
      <div className="grid gap-4 sm:grid-cols-3">
        {communicationChannels.map((channel) => (
          <article
            key={channel.id}
            className="rounded-2xl border border-ink/10 bg-surface-raised p-6 transition-shadow hover:shadow-md"
          >
            <span className="text-2xl" aria-hidden="true">
              {channel.icon}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-ink">
              {channel.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {channel.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
