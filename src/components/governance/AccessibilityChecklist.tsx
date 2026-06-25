"use client";

import {
  checklistItems,
  type ChecklistItemId,
} from "@/lib/governance-content";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { SectionHeading } from "./SectionHeading";

type ChecklistState = Record<ChecklistItemId, boolean>;

const initialState: ChecklistState = Object.fromEntries(
  checklistItems.map((item) => [item.id, false]),
) as ChecklistState;

export function AccessibilityChecklist() {
  const [checked, setChecked, reset] = useLocalStorage<ChecklistState>(
    "ds-governance-checklist",
    initialState,
  );

  const completedCount = Object.values(checked).filter(Boolean).length;
  const total = checklistItems.length;

  const toggle = (id: ChecklistItemId) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="checklist"
      aria-labelledby="checklist-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="checklist-heading"
        eyebrow="Quality Gate"
        title="Accessibility & Compliance Checklist"
        description="Before approving a component, verify each item. Progress is saved in your browser."
      />

      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm font-medium text-ink-muted">
          <span className="text-accent">{completedCount}</span> of {total}{" "}
          complete
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-sm font-medium text-ink-muted underline-offset-2 hover:text-accent hover:underline"
        >
          Reset checklist
        </button>
      </div>

      {/* Progress bar */}
      <div
        className="mb-6 h-2 overflow-hidden rounded-full bg-ink/10"
        role="progressbar"
        aria-valuenow={completedCount}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label="Checklist completion"
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300 motion-reduce:transition-none"
          style={{ width: `${(completedCount / total) * 100}%` }}
        />
      </div>

      <ul className="space-y-3">
        {checklistItems.map((item) => {
          const isChecked = checked[item.id];
          return (
            <li key={item.id}>
              <label
                className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-colors ${
                  isChecked
                    ? "border-accent/30 bg-accent/5"
                    : "border-ink/10 bg-surface-raised hover:border-ink/20"
                }`}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(item.id)}
                  className="h-5 w-5 shrink-0 rounded border-ink/20 text-accent focus:ring-accent focus:ring-offset-0"
                />
                <span
                  className={`text-sm ${isChecked ? "text-ink line-through opacity-60" : "text-ink"}`}
                >
                  {item.label}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
