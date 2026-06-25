"use client";

import { useState } from "react";
import { defaultResources, type Resource } from "@/lib/governance-content";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { SectionHeading } from "./SectionHeading";

export function ResourcesPanel() {
  const [resources, setResources, resetResources] = useLocalStorage<
    Resource[]
  >("ds-governance-resources", defaultResources);
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<Resource[]>(resources);

  const startEditing = () => {
    setDraft(resources);
    setIsEditing(true);
  };

  const save = () => {
    setResources(draft);
    setIsEditing(false);
  };

  const cancel = () => {
    setDraft(resources);
    setIsEditing(false);
  };

  const updateDraft = (
    id: string,
    field: keyof Pick<Resource, "label" | "url">,
    value: string,
  ) => {
    setDraft((prev) =>
      prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)),
    );
  };

  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="resources-heading"
        eyebrow="Tooling"
        title="Tooling & Resources"
        description="Quick links to design system assets. Edit URLs to match your team."
      />

      <div className="mb-4 flex items-center justify-end gap-3">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={cancel}
              className="rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink-muted hover:bg-surface-raised"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark"
            >
              Save links
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => resetResources()}
              className="text-sm font-medium text-ink-muted underline-offset-2 hover:text-accent hover:underline"
            >
              Reset to defaults
            </button>
            <button
              type="button"
              onClick={startEditing}
              className="rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink hover:bg-surface-raised"
            >
              Edit links
            </button>
          </>
        )}
      </div>

      <ul className="space-y-3">
        {(isEditing ? draft : resources).map((resource) => (
          <li
            key={resource.id}
            className="rounded-xl border border-ink/10 bg-surface-raised p-4"
          >
            {isEditing ? (
              <div className="space-y-3">
                <div>
                  <label
                    htmlFor={`label-${resource.id}`}
                    className="text-xs font-medium text-ink-muted"
                  >
                    Label
                  </label>
                  <input
                    id={`label-${resource.id}`}
                    type="text"
                    value={resource.label}
                    onChange={(e) =>
                      updateDraft(resource.id, "label", e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
                <div>
                  <label
                    htmlFor={`url-${resource.id}`}
                    className="text-xs font-medium text-ink-muted"
                  >
                    URL
                  </label>
                  <input
                    id={`url-${resource.id}`}
                    type="url"
                    value={resource.url}
                    onChange={(e) =>
                      updateDraft(resource.id, "url", e.target.value)
                    }
                    className="mt-1 w-full rounded-lg border border-ink/10 bg-white px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              </div>
            ) : (
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <span className="font-display text-base font-semibold text-ink group-hover:text-accent">
                  {resource.label} →
                </span>
                <p className="mt-1 text-sm text-ink-muted">
                  {resource.description}
                </p>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
