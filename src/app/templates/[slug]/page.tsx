import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TemplateForm } from "@/components/templates/TemplateForm";
import {
  getAllTemplateSlugs,
  getTemplateBySlug,
} from "@/lib/template-bodies";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllTemplateSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);
  if (!template) return { title: "Template not found" };
  return {
    title: `${template.title} — Design Governance`,
    description: template.description,
  };
}

export default async function TemplatePage({ params }: PageProps) {
  const { slug } = await params;
  const template = getTemplateBySlug(slug);

  if (!template) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-16">
      <TemplateForm template={template} />
    </div>
  );
}
