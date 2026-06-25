"use client";

import Link from "next/link";
import { useState } from "react";
import { templates } from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

export function TemplatesSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const copyOutline = async (id: string, outline: readonly string[]) => {
    const text = outline.map((item, i) => `${i + 1}. ${item}`).join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <section
      id="templates"
      aria-labelledby="templates-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="templates-heading"
        eyebrow="Getting Started"
        title="Templates"
        description="Click a template to expand its outline. Copy or open the full template."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {templates.map((template) => {
          const isExpanded = expandedId === template.id;
          return (
            <article
              key={template.id}
              className={`rounded-2xl border p-6 transition-all ${
                isExpanded
                  ? "border-accent bg-accent/5 shadow-md"
                  : "border-ink/10 bg-surface-raised"
              }`}
            >
              <button
                type="button"
                onClick={() => toggle(template.id)}
                aria-expanded={isExpanded}
                className="w-full text-left"
              >
                <h3 className="font-display text-lg font-semibold text-ink">
                  {template.title}
                </h3>
                <p className="mt-2 text-sm text-ink-muted">
                  {template.description}
                </p>
              </button>

              <div
                className={`grid transition-all duration-300 ease-out motion-reduce:transition-none ${
                  isExpanded
                    ? "mt-4 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <ul className="space-y-2 border-t border-ink/10 pt-4">
                    {template.outline.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-ink"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden="true"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => copyOutline(template.id, template.outline)}
                      className="rounded-lg border border-ink/10 px-3 py-1.5 text-sm font-medium text-ink hover:bg-white"
                    >
                      {copiedId === template.id ? "Copied!" : "Copy outline"}
                    </button>
                    <Link
                      href={template.url}
                      className="rounded-lg bg-accent px-3 py-1.5 text-sm font-medium text-white hover:bg-accent-dark"
                    >
                      Open template →
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
