type SectionHeadingProps = {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="mb-8">
      {eyebrow && (
        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="font-display text-3xl font-semibold text-ink">
        {title}
      </h2>
      {description && (
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {description}
        </p>
      )}
    </header>
  );
}
