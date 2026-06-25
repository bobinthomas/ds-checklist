export type TemplateField =
  | {
      type: "text";
      id: string;
      label: string;
      placeholder: string;
    }
  | {
      type: "textarea";
      id: string;
      label: string;
      placeholder: string;
    }
  | {
      type: "checklist";
      id: string;
      label: string;
      items: string[];
    };

export type TemplateSection = {
  id: string;
  title: string;
  description?: string;
  fields: TemplateField[];
};

export type TemplateBody = {
  slug: string;
  title: string;
  description: string;
  sections: TemplateSection[];
};

export const templateBodies: TemplateBody[] = [
  {
    slug: "proposal",
    title: "Component Proposal",
    description:
      "Use this template when requesting a new component or pattern for core team review.",
    sections: [
      {
        id: "meta",
        title: "Proposal metadata",
        fields: [
          {
            type: "text",
            id: "proposer",
            label: "Proposer name / team",
            placeholder: "e.g. Checkout team — Jane Doe",
          },
          {
            type: "text",
            id: "date",
            label: "Date submitted",
            placeholder: "YYYY-MM-DD",
          },
          {
            type: "text",
            id: "component-name",
            label: "Proposed component name",
            placeholder: "e.g. SplitButton, DataTableFilter",
          },
        ],
      },
      {
        id: "problem",
        title: "Problem statement",
        description: "What gap does this fill? Why can't existing components solve it?",
        fields: [
          {
            type: "textarea",
            id: "problem",
            label: "Problem",
            placeholder:
              "Describe the user or product need. Include where inconsistency appears today and the impact of not solving it.",
          },
          {
            type: "textarea",
            id: "products",
            label: "Affected products and use cases",
            placeholder:
              "List products, flows, or screens that would use this component. Include frequency and priority.",
          },
        ],
      },
      {
        id: "proposal-detail",
        title: "Proposed solution",
        fields: [
          {
            type: "textarea",
            id: "api",
            label: "Proposed API and variant structure",
            placeholder:
              "Outline props, slots, sizes, and states. Note naming conventions you followed.",
          },
          {
            type: "text",
            id: "figma-link",
            label: "Figma explorations or wireframes",
            placeholder: "https://figma.com/file/...",
          },
          {
            type: "textarea",
            id: "accessibility",
            label: "Accessibility considerations",
            placeholder:
              "Keyboard interaction, focus order, ARIA roles, contrast targets, screen reader behavior.",
          },
          {
            type: "textarea",
            id: "alternatives",
            label: "Alternatives considered",
            placeholder:
              "Existing components evaluated, why they were insufficient, and trade-offs of your proposal.",
          },
        ],
      },
    ],
  },
  {
    slug: "spec",
    title: "Component Spec",
    description:
      "Detailed specification for an approved component before design and engineering implementation.",
    sections: [
      {
        id: "identity",
        title: "Component identity",
        fields: [
          {
            type: "text",
            id: "name",
            label: "Component name",
            placeholder: "e.g. Button, Modal, Combobox",
          },
          {
            type: "text",
            id: "category",
            label: "Category",
            placeholder: "e.g. Actions, Overlays, Forms, Data display",
          },
          {
            type: "textarea",
            id: "summary",
            label: "One-line summary",
            placeholder: "What this component does and when to use it.",
          },
        ],
      },
      {
        id: "anatomy",
        title: "Anatomy and structure",
        fields: [
          {
            type: "textarea",
            id: "anatomy",
            label: "Anatomy and sub-components",
            placeholder:
              "List parts (container, label, icon, trigger, etc.) and how they compose.",
          },
          {
            type: "textarea",
            id: "props",
            label: "Props / attributes and defaults",
            placeholder:
              "Prop name, type, default, required/optional, and behavior notes.",
          },
        ],
      },
      {
        id: "behavior",
        title: "States and responsiveness",
        fields: [
          {
            type: "textarea",
            id: "states",
            label: "States",
            placeholder:
              "Default, hover, focus, active, disabled, error, loading — visual and behavioral differences.",
          },
          {
            type: "textarea",
            id: "responsive",
            label: "Responsive behavior",
            placeholder:
              "Layout and interaction changes at sm / md / lg breakpoints.",
          },
        ],
      },
      {
        id: "delivery",
        title: "Design and dev deliverables",
        fields: [
          {
            type: "text",
            id: "figma",
            label: "Figma component structure",
            placeholder: "Link to Figma component set and variant matrix",
          },
          {
            type: "textarea",
            id: "storybook",
            label: "Storybook story requirements",
            placeholder:
              "Required stories, controls, and docs page content for reviewers.",
          },
        ],
      },
    ],
  },
  {
    slug: "pr-checklist",
    title: "PR Review Checklist",
    description:
      "Checklist for maintainers reviewing a component contribution pull request.",
    sections: [
      {
        id: "meta",
        title: "PR metadata",
        fields: [
          {
            type: "text",
            id: "pr-url",
            label: "Pull request URL",
            placeholder: "https://github.com/org/repo/pull/123",
          },
          {
            type: "text",
            id: "component",
            label: "Component under review",
            placeholder: "e.g. DataTable",
          },
          {
            type: "text",
            id: "reviewer",
            label: "Reviewer",
            placeholder: "Your name",
          },
        ],
      },
      {
        id: "review",
        title: "Review checklist",
        fields: [
          {
            type: "checklist",
            id: "checks",
            label: "Verification items",
            items: [
              "Matches approved spec and Figma design",
              "Passes accessibility checklist (contrast, keyboard, screen reader)",
              "Unit tests included and passing",
              "Visual regression tests included where applicable",
              "Storybook stories cover all variants and states",
              "No breaking changes without migration guide",
              "Component documentation updated",
              "Changelog entry added with correct semver impact",
            ],
          },
          {
            type: "textarea",
            id: "notes",
            label: "Reviewer notes",
            placeholder:
              "Blocking issues, requested changes, or approval comments.",
          },
        ],
      },
    ],
  },
  {
    slug: "deprecation",
    title: "Deprecation Notice",
    description:
      "Template for announcing component deprecation to adopters and planning migration.",
    sections: [
      {
        id: "meta",
        title: "Deprecation metadata",
        fields: [
          {
            type: "text",
            id: "component",
            label: "Component being deprecated",
            placeholder: "e.g. LegacyModal, OldButton",
          },
          {
            type: "text",
            id: "version-deprecated",
            label: "Deprecated in version",
            placeholder: "e.g. 3.2.0",
          },
          {
            type: "text",
            id: "version-removed",
            label: "Scheduled removal version",
            placeholder: "e.g. 4.0.0",
          },
        ],
      },
      {
        id: "rationale",
        title: "Rationale and replacement",
        fields: [
          {
            type: "textarea",
            id: "reason",
            label: "Reason for deprecation",
            placeholder:
              "Why this component is being retired — duplication, accessibility gaps, API limitations, etc.",
          },
          {
            type: "text",
            id: "replacement",
            label: "Recommended replacement",
            placeholder: "e.g. Use Modal v2 / Dialog instead",
          },
          {
            type: "textarea",
            id: "migration",
            label: "Migration steps",
            placeholder:
              "Step-by-step migration with before/after code examples.",
          },
        ],
      },
      {
        id: "rollout",
        title: "Timeline and communication",
        fields: [
          {
            type: "textarea",
            id: "timeline",
            label: "Timeline",
            placeholder:
              "Notice period start, deprecation date, removal date, and any extension policy.",
          },
          {
            type: "textarea",
            id: "affected",
            label: "Affected products to audit",
            placeholder: "Teams or repos known to consume this component.",
          },
          {
            type: "text",
            id: "support",
            label: "Support channel",
            placeholder: "e.g. #design-system Slack or office hours",
          },
        ],
      },
    ],
  },
];

export function getTemplateBySlug(slug: string): TemplateBody | undefined {
  return templateBodies.find((t) => t.slug === slug);
}

export function getAllTemplateSlugs(): string[] {
  return templateBodies.map((t) => t.slug);
}
