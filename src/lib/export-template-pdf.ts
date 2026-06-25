import { jsPDF } from "jspdf";
import type { TemplateBody } from "./template-bodies";

export type TemplateFormValues = Record<string, string | boolean[]>;

const MARGIN = 20;
const PAGE_HEIGHT = 297;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LINE_HEIGHT = 5;

function getTextValue(value: string, placeholder: string): string {
  const trimmed = value.trim();
  return trimmed || placeholder;
}

export function exportTemplateToPdf(
  template: TemplateBody,
  values: TemplateFormValues,
): void {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN;

  const ensureSpace = (needed: number) => {
    if (y + needed > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      y = MARGIN;
    }
  };

  const writeLines = (
    text: string,
    fontSize: number,
    style: "normal" | "bold" | "italic" = "normal",
    indent = 0,
  ) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", style);
    doc.setTextColor(26, 26, 46);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH - indent) as string[];
    const blockHeight = lines.length * LINE_HEIGHT + 2;
    ensureSpace(blockHeight);
    doc.text(lines, MARGIN + indent, y);
    y += blockHeight;
  };

  const writeMuted = (text: string, fontSize = 10) => {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(92, 92, 110);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH) as string[];
    const blockHeight = lines.length * LINE_HEIGHT + 2;
    ensureSpace(blockHeight);
    doc.text(lines, MARGIN, y);
    y += blockHeight;
    doc.setTextColor(26, 26, 46);
  };

  // Header accent line
  doc.setDrawColor(232, 93, 76);
  doc.setLineWidth(0.8);
  doc.line(MARGIN, y, MARGIN + 24, y);
  y += 8;

  writeLines(template.title, 18, "bold");
  writeMuted(template.description, 11);
  y += 4;

  const exportedAt = new Date().toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  writeMuted(`Exported ${exportedAt}`, 9);
  y += 6;

  for (const section of template.sections) {
    ensureSpace(16);
    writeLines(section.title, 13, "bold");
    if (section.description) {
      writeMuted(section.description, 10);
    }
    y += 2;

    for (const field of section.fields) {
      ensureSpace(12);
      writeLines(field.label, 10, "bold");

      if (field.type === "checklist") {
        const checked = (values[field.id] as boolean[]) ?? [];
        for (let i = 0; i < field.items.length; i++) {
          const mark = checked[i] ? "[x]" : "[ ]";
          const isFilled = checked[i];
          const line = `${mark}  ${field.items[i]}`;
          doc.setFontSize(10);
          doc.setFont("helvetica", isFilled ? "bold" : "normal");
          doc.setTextColor(26, 26, 46);
          const lines = doc.splitTextToSize(line, CONTENT_WIDTH - 4) as string[];
          ensureSpace(lines.length * LINE_HEIGHT + 1);
          doc.text(lines, MARGIN + 2, y);
          y += lines.length * LINE_HEIGHT + 1;
        }
        y += 2;
      } else {
        const raw = (values[field.id] as string) ?? "";
        const display = getTextValue(raw, field.placeholder);
        const isPlaceholder = !raw.trim();
        writeLines(
          display,
          10,
          isPlaceholder ? "italic" : "normal",
          2,
        );
        y += 2;
      }
    }

    y += 4;
  }

  const filename = `${template.slug}-${new Date().toISOString().slice(0, 10)}.pdf`;
  doc.save(filename);
}

export function templateToMarkdown(
  template: TemplateBody,
  values: TemplateFormValues,
): string {
  const lines: string[] = [`# ${template.title}`, "", template.description, ""];

  for (const section of template.sections) {
    lines.push(`## ${section.title}`);
    if (section.description) {
      lines.push("", section.description);
    }
    lines.push("");

    for (const field of section.fields) {
      if (field.type === "checklist") {
        const checked = (values[field.id] as boolean[]) ?? [];
        lines.push(`### ${field.label}`);
        field.items.forEach((item, i) => {
          lines.push(`- [${checked[i] ? "x" : " "}] ${item}`);
        });
      } else {
        const raw = (values[field.id] as string) ?? "";
        const value = getTextValue(raw, field.placeholder);
        lines.push(`### ${field.label}`, "", value, "");
      }
    }
    lines.push("");
  }

  return lines.join("\n").trim();
}
