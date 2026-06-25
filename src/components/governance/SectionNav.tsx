"use client";

import { useEffect, useState } from "react";
import { sections, type SectionId } from "@/lib/governance-content";

export function SectionNav() {
  const [activeId, setActiveId] = useState<SectionId>("overview");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: SectionId) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <>
      {/* Mobile horizontal nav */}
      <nav
        aria-label="Page sections"
        className="sticky top-0 z-20 -mx-4 border-b border-ink/10 bg-surface/95 px-4 py-3 backdrop-blur-sm lg:hidden"
      >
        <ul className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {sections.map(({ id, label }) => (
            <li key={id} className="shrink-0">
              <button
                type="button"
                onClick={() => handleClick(id)}
                aria-current={activeId === id ? "true" : undefined}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  activeId === id
                    ? "bg-accent text-white"
                    : "bg-surface-raised text-ink-muted hover:text-ink"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop sidebar nav */}
      <nav
        aria-label="Page sections"
        className="hidden lg:block lg:sticky lg:top-8 lg:self-start"
      >
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-ink-muted">
          On this page
        </p>
        <ul className="space-y-1 border-l border-ink/10">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => handleClick(id)}
                aria-current={activeId === id ? "true" : undefined}
                className={`block w-full border-l-2 py-1.5 pl-4 text-left text-sm transition-colors ${
                  activeId === id
                    ? "border-accent font-medium text-accent"
                    : "border-transparent text-ink-muted hover:border-ink/20 hover:text-ink"
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
