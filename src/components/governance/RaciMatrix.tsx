"use client";

import { useState } from "react";
import {
  raciActivities,
  raciLegend,
  raciRoleColumns,
  type RaciValue,
} from "@/lib/governance-content";
import { SectionHeading } from "./SectionHeading";

type SelectedCell = {
  activity: string;
  role: string;
  value: RaciValue;
} | null;

const badgeStyles: Record<RaciValue, string> = {
  R: "bg-ink text-white",
  A: "bg-accent text-white",
  C: "bg-ink/10 text-ink",
  I: "bg-ink/5 text-ink-muted",
  "—": "bg-transparent text-ink/30",
};

function RaciBadge({ value }: { value: RaciValue }) {
  return (
    <span
      className={`inline-flex h-7 w-7 items-center justify-center rounded-md text-xs font-semibold ${badgeStyles[value]}`}
    >
      {value}
    </span>
  );
}

export function RaciMatrix() {
  const [selected, setSelected] = useState<SelectedCell>(null);

  const handleCellClick = (
    activity: string,
    role: string,
    value: RaciValue,
  ) => {
    if (value === "—") {
      setSelected(null);
      return;
    }
    setSelected((prev) =>
      prev?.activity === activity && prev?.role === role
        ? null
        : { activity, role, value },
    );
  };

  return (
    <section
      id="raci"
      aria-labelledby="raci-heading"
      className="scroll-mt-28"
    >
      <SectionHeading
        id="raci-heading"
        eyebrow="Accountability"
        title="RACI Matrix"
        description="Click a cell to see what each assignment means for that activity."
      />

      {/* Legend */}
      <div className="mb-6 flex flex-wrap gap-3">
        {(["R", "A", "C", "I"] as const).map((key) => (
          <div
            key={key}
            className="flex items-center gap-2 text-sm text-ink-muted"
          >
            <RaciBadge value={key} />
            <span>
              <strong className="text-ink">{raciLegend[key].label}</strong>
              {" — "}
              {raciLegend[key].description}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-x-auto rounded-2xl border border-ink/10 md:block">
        <table className="w-full text-left text-sm" aria-label="RACI matrix">
          <thead>
            <tr className="border-b border-ink/10 bg-surface-raised">
              <th className="px-4 py-3 font-medium text-ink-muted">Activity</th>
              {raciRoleColumns.map((col) => (
                <th
                  key={col.id}
                  className="px-4 py-3 text-center font-medium text-ink-muted"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {raciActivities.map((row) => (
              <tr
                key={row.id}
                className="border-b border-ink/5 last:border-0 hover:bg-surface-raised/50"
              >
                <td className="px-4 py-3 font-medium text-ink">
                  {row.activity}
                </td>
                {raciRoleColumns.map((col) => {
                  const value = row[col.id as keyof typeof row] as RaciValue;
                  const isSelected =
                    selected?.activity === row.activity &&
                    selected?.role === col.label;
                  return (
                    <td key={col.id} className="px-4 py-3 text-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleCellClick(row.activity, col.label, value)
                        }
                        aria-pressed={isSelected}
                        aria-label={`${row.activity}, ${col.label}: ${raciLegend[value].label}`}
                        className={`rounded-lg p-1 transition-shadow ${
                          isSelected ? "ring-2 ring-accent ring-offset-1" : ""
                        }`}
                      >
                        <RaciBadge value={value} />
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {raciActivities.map((row) => (
          <article
            key={row.id}
            className="rounded-2xl border border-ink/10 bg-surface-raised p-4"
          >
            <h3 className="font-medium text-ink">{row.activity}</h3>
            <dl className="mt-3 grid grid-cols-2 gap-3">
              {raciRoleColumns.map((col) => {
                const value = row[col.id as keyof typeof row] as RaciValue;
                const isSelected =
                  selected?.activity === row.activity &&
                  selected?.role === col.label;
                return (
                  <div key={col.id} className="flex items-center gap-2">
                    <dt className="text-xs text-ink-muted">{col.label}</dt>
                    <dd>
                      <button
                        type="button"
                        onClick={() =>
                          handleCellClick(row.activity, col.label, value)
                        }
                        aria-pressed={isSelected}
                        aria-label={`${row.activity}, ${col.label}: ${raciLegend[value].label}`}
                        className={`rounded-lg p-1 ${
                          isSelected ? "ring-2 ring-accent ring-offset-1" : ""
                        }`}
                      >
                        <RaciBadge value={value} />
                      </button>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </article>
        ))}
      </div>

      {/* Detail panel */}
      {selected && selected.value !== "—" && (
        <div
          className="mt-4 rounded-xl border border-accent/20 bg-accent/5 p-4"
          role="status"
        >
          <p className="text-sm text-ink">
            <strong>{selected.role}</strong> is{" "}
            <strong>{raciLegend[selected.value].label}</strong> for{" "}
            <em>{selected.activity}</em>.
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            {raciLegend[selected.value].description}
          </p>
        </div>
      )}
    </section>
  );
}
