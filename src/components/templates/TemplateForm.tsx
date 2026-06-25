"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { TemplateBody } from "@/lib/template-bodies";
import {
  exportTemplateToPdf,
  templateToMarkdown,
  type TemplateFormValues,
} from "@/lib/export-template-pdf";

function buildInitialValues(template: TemplateBody): TemplateFormValues {
  const values: TemplateFormValues = {};
  for (const section of template.sections) {
    for (const field of section.fields) {
      if (field.type === "checklist") {
        values[field.id] = field.items.map(() => false);
      } else {
        values[field.id] = "";
      }
    }
  }
  return values;
}

type TemplateFormProps = {
  template: TemplateBody;
};

export function TemplateForm({ template }: TemplateFormProps) {
  const storageKey = `ds-template-${template.slug}`;
  const [values, setValues] = useState<TemplateFormValues>(() =>
    buildInitialValues(template),
  );
  const [hydrated, setHydrated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setValues(JSON.parse(stored) as TemplateFormValues);
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, [storageKey]);

  const persist = useCallback(
    (next: TemplateFormValues) => {
      setValues(next);
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
      } catch {
        // ignore
      }
    },
    [storageKey],
  );

  const updateText = (id: string, value: string) => {
    persist({ ...values, [id]: value });
  };

  const toggleChecklistItem = (fieldId: string, index: number) => {
    const current = [...((values[fieldId] as boolean[]) ?? [])];
    current[index] = !current[index];
    persist({ ...values, [fieldId]: current });
  };

  const copyMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(templateToMarkdown(template, values));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const downloadPdf = () => {
    setDownloading(true);
    try {
      exportTemplateToPdf(template, values);
    } finally {
      setTimeout(() => setDownloading(false), 500);
    }
  };

  const reset = () => {
    const initial = buildInitialValues(template);
    persist(initial);
    localStorage.removeItem(storageKey);
  };

  if (!hydrated) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-1/3 rounded bg-ink/10" />
        <div className="h-32 rounded-xl bg-ink/5" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/#templates"
          className="text-sm font-medium text-accent hover:underline"
        >
          ← Back to governance
        </Link>
        <div className="flex flex-wrap gap-3">
          {saved && (
            <span className="self-center text-sm text-ink-muted">Saved</span>
          )}
          <button
            type="button"
            onClick={reset}
            className="rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink-muted hover:bg-surface-raised"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={copyMarkdown}
            className="rounded-lg border border-ink/10 px-4 py-2 text-sm font-medium text-ink hover:bg-surface-raised"
          >
            {copied ? "Copied!" : "Copy as Markdown"}
          </button>
          <button
            type="button"
            onClick={downloadPdf}
            disabled={downloading}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent-dark disabled:opacity-60"
          >
            {downloading ? "Generating…" : "Download PDF"}
          </button>
        </div>
      </div>

      <header>
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          Template
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-ink sm:text-4xl">
          {template.title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-muted">
          {template.description}
        </p>
      </header>

      {template.sections.map((section) => (
        <section
          key={section.id}
          className="rounded-2xl border border-ink/10 bg-surface-raised p-6 sm:p-8"
        >
          <h2 className="font-display text-xl font-semibold text-ink">
            {section.title}
          </h2>
          {section.description && (
            <p className="mt-2 text-sm text-ink-muted">{section.description}</p>
          )}

          <div className="mt-6 space-y-6">
            {section.fields.map((field) => {
              if (field.type === "checklist") {
                const checked = (values[field.id] as boolean[]) ?? [];
                return (
                  <fieldset key={field.id}>
                    <legend className="mb-3 text-sm font-medium text-ink">
                      {field.label}
                    </legend>
                    <ul className="space-y-2">
                      {field.items.map((item, i) => (
                        <li key={item}>
                          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-ink/10 p-3 hover:bg-surface">
                            <input
                              type="checkbox"
                              checked={checked[i] ?? false}
                              onChange={() =>
                                toggleChecklistItem(field.id, i)
                              }
                              className="mt-0.5 h-4 w-4 rounded border-ink/20 text-accent focus:ring-accent"
                            />
                            <span className="text-sm text-ink">{item}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </fieldset>
                );
              }

              const value = (values[field.id] as string) ?? "";
              const isTextarea = field.type === "textarea";

              return (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="mb-2 block text-sm font-medium text-ink"
                  >
                    {field.label}
                  </label>
                  {isTextarea ? (
                    <textarea
                      id={field.id}
                      value={value}
                      onChange={(e) => updateText(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      rows={4}
                      className="w-full rounded-lg border border-ink/10 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  ) : (
                    <input
                      id={field.id}
                      type="text"
                      value={value}
                      onChange={(e) => updateText(field.id, e.target.value)}
                      placeholder={field.placeholder}
                      className="w-full rounded-lg border border-ink/10 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-muted/60 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
