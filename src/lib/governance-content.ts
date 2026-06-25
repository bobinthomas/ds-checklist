export const DESIGN_SYSTEM_NAME = "[Your Design System Name]";

export const sections = [
  { id: "overview", label: "Overview" },
  { id: "model", label: "Governance Model" },
  { id: "roles", label: "Roles" },
  { id: "workflow", label: "Workflow" },
  { id: "raci", label: "RACI" },
  { id: "templates", label: "Templates" },
  { id: "lifecycle", label: "Lifecycle" },
  { id: "roadmap", label: "Roadmap" },
  { id: "versioning", label: "Versioning" },
  { id: "communication", label: "Communication" },
  { id: "checklist", label: "Checklist" },
  { id: "decisions", label: "Decision Log" },
  { id: "resources", label: "Resources" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const roles = [
  {
    id: "owner",
    title: "Design System Owner",
    responsibility:
      "Sets roadmap, prioritizes work, leads communication",
    detail:
      "The owner aligns design system work with organizational goals, communicates priorities to stakeholders, and ensures the system evolves in step with product needs.",
  },
  {
    id: "maintainers",
    title: "Core Maintainers",
    responsibility:
      "Review and approve contributions, enforce standards",
    detail:
      "Maintainers gatekeep quality — reviewing proposals for consistency, accessibility, and technical soundness before components enter the shared library.",
  },
  {
    id: "contributors",
    title: "Contributors",
    responsibility:
      "Submit proposals and components, provide feedback",
    detail:
      "Product teams surface real-world needs by proposing new patterns, iterating on existing ones, and participating in design and code reviews.",
  },
  {
    id: "adopters",
    title: "Adopters",
    responsibility:
      "Use the system, report bugs/needs, request new components",
    detail:
      "Adopters are the system's primary users. Their feedback on gaps, bugs, and usability drives the contribution backlog.",
  },
] as const;

export const workflowSteps = [
  {
    id: "identify",
    number: 1,
    title: "Identify a Need",
    summary: "Missing component? Inconsistent pattern? File a proposal.",
    details: [
      "Document the gap — what component or pattern is missing?",
      "Note where inconsistency appears across products.",
      "Check if an existing component can be extended before proposing new work.",
    ],
  },
  {
    id: "proposal",
    number: 2,
    title: "Create a Proposal",
    summary: "Use the Proposal Template to structure your submission.",
    details: [
      "Fill out the proposal template with context, use cases, and mockups.",
      "Attach Figma explorations or link to a Notion doc.",
      "Include accessibility considerations from the start.",
    ],
    linkLabel: "Proposal Template",
    linkHref: "/templates/proposal",
  },
  {
    id: "submit",
    number: 3,
    title: "Submit for Review",
    summary: "Post in #design-system and add to the Pending Review Kanban.",
    details: [
      "Share your proposal in the #design-system Slack channel.",
      "Add the item to the \"Pending Review\" Kanban board.",
      "Tag relevant maintainers if the work is time-sensitive.",
    ],
  },
  {
    id: "review",
    number: 4,
    title: "Design + Dev Review",
    summary:
      "Core team reviews based on usability, accessibility, naming, responsiveness.",
    details: [
      "Usability: Does it solve the stated problem cleanly?",
      "Accessibility: WCAG AA contrast, keyboard nav, screen reader labels.",
      "Naming: Consistent with existing component vocabulary.",
      "Responsiveness: Works at common breakpoints.",
    ],
  },
  {
    id: "decide",
    number: 5,
    title: "Approve / Reject / Revise",
    summary:
      "Feedback within 5 business days. Approved components ship to Figma and code.",
    details: [
      "Approved: Component added to Figma library and code repo.",
      "Revise: Specific feedback returned; contributor iterates.",
      "Rejected: Rationale documented; alternative path suggested if possible.",
    ],
  },
] as const;

export const lifecycleStatuses = [
  {
    id: "draft",
    label: "Draft",
    emoji: "🟡",
    color: "amber",
    description: "In exploration, not ready for adoption",
    adopterGuidance:
      "Do not use in production. Draft components may change significantly or be removed without notice.",
  },
  {
    id: "in-review",
    label: "In Review",
    emoji: "🟠",
    color: "orange",
    description: "Being evaluated by core team",
    adopterGuidance:
      "Available for feedback and early testing only. Not approved for broad product use.",
  },
  {
    id: "approved",
    label: "Approved",
    emoji: "🟢",
    color: "green",
    description: "Ready for use across products",
    adopterGuidance:
      "Safe to adopt in production. Follow semver for updates and watch release notes for changes.",
  },
  {
    id: "deprecated",
    label: "Deprecated",
    emoji: "🔵",
    color: "blue",
    description: "Should no longer be used — slated for removal",
    adopterGuidance:
      "Migrate to the recommended replacement. Deprecated components receive no new features and will be removed after the notice period.",
  },
] as const;

export type LifecycleStatusId = (typeof lifecycleStatuses)[number]["id"];

export const checklistItems = [
  {
    id: "contrast",
    label: "Passes color contrast checks (WCAG AA+)",
  },
  {
    id: "keyboard",
    label: "Works with keyboard navigation",
  },
  {
    id: "screen-reader",
    label: "Supports screen reader labels",
  },
  {
    id: "responsive",
    label: "Responsive at common breakpoints",
  },
  {
    id: "variants",
    label: "Includes Figma + coded variants",
  },
] as const;

export type ChecklistItemId = (typeof checklistItems)[number]["id"];

export type Resource = {
  id: string;
  label: string;
  url: string;
  description: string;
};

export const defaultResources: Resource[] = [
  {
    id: "figma",
    label: "Figma Library",
    url: "#",
    description: "Component library and design tokens",
  },
  {
    id: "storybook",
    label: "Storybook / Component Repo",
    url: "#",
    description: "Live component documentation and source code",
  },
  {
    id: "tokens",
    label: "Design Tokens",
    url: "#",
    description: "Color, typography, spacing, and motion tokens",
  },
  {
    id: "tracker",
    label: "Bug or Enhancement Tracker",
    url: "#",
    description: "JIRA, Linear, or Notion backlog",
  },
  {
    id: "feedback",
    label: "Anonymous Feedback Form",
    url: "#",
    description: "Share suggestions without attribution",
  },
];

export const breakingChangeRequirements = [
  "Migration guide",
  "2-week notice before removal",
  "Announcement in Slack + email",
];

export const communicationChannels = [
  {
    id: "updates",
    icon: "📢",
    title: "Monthly Design System Update",
    description: "Posted in #design-system-updates",
  },
  {
    id: "office-hours",
    icon: "🎙️",
    title: "Office Hours",
    description: "Biweekly drop-in for questions + proposals",
  },
  {
    id: "feedback",
    icon: "🔎",
    title: "Feedback Form",
    description: "Anonymous feedback — link in Resources section",
  },
];

export type RaciValue = "R" | "A" | "C" | "I" | "—";

export const raciLegend = {
  R: { label: "Responsible", description: "Does the work to complete the activity." },
  A: { label: "Accountable", description: "Ultimately answerable; only one A per activity." },
  C: { label: "Consulted", description: "Provides input and expertise before decisions." },
  I: { label: "Informed", description: "Kept up to date on progress and outcomes." },
  "—": { label: "Not involved", description: "No role in this activity." },
} as const;

export const raciRoleColumns = [
  { id: "owner", label: "Owner" },
  { id: "maintainers", label: "Maintainers" },
  { id: "contributors", label: "Contributors" },
  { id: "adopters", label: "Adopters" },
] as const;

export const raciActivities = [
  {
    id: "set-roadmap",
    activity: "Set system roadmap",
    owner: "A" as RaciValue,
    maintainers: "R" as RaciValue,
    contributors: "C" as RaciValue,
    adopters: "I" as RaciValue,
  },
  {
    id: "propose-component",
    activity: "Propose a new component",
    owner: "I" as RaciValue,
    maintainers: "C" as RaciValue,
    contributors: "R" as RaciValue,
    adopters: "C" as RaciValue,
  },
  {
    id: "review-approve",
    activity: "Review and approve contributions",
    owner: "A" as RaciValue,
    maintainers: "R" as RaciValue,
    contributors: "C" as RaciValue,
    adopters: "I" as RaciValue,
  },
  {
    id: "publish-release",
    activity: "Publish a release",
    owner: "A" as RaciValue,
    maintainers: "R" as RaciValue,
    contributors: "C" as RaciValue,
    adopters: "I" as RaciValue,
  },
  {
    id: "deprecate",
    activity: "Deprecate a component",
    owner: "A" as RaciValue,
    maintainers: "R" as RaciValue,
    contributors: "C" as RaciValue,
    adopters: "I" as RaciValue,
  },
  {
    id: "report-bug",
    activity: "Report a bug or gap",
    owner: "I" as RaciValue,
    maintainers: "R" as RaciValue,
    contributors: "C" as RaciValue,
    adopters: "R" as RaciValue,
  },
  {
    id: "update-tokens",
    activity: "Update design tokens",
    owner: "A" as RaciValue,
    maintainers: "R" as RaciValue,
    contributors: "C" as RaciValue,
    adopters: "I" as RaciValue,
  },
  {
    id: "run-office-hours",
    activity: "Run office hours",
    owner: "A" as RaciValue,
    maintainers: "R" as RaciValue,
    contributors: "C" as RaciValue,
    adopters: "C" as RaciValue,
  },
];

export const templates = [
  {
    id: "proposal",
    title: "Component Proposal",
    description: "Structure a new component or pattern request for core team review.",
    url: "/templates/proposal",
    outline: [
      "Problem statement — what gap does this fill?",
      "Affected products and use cases",
      "Proposed API and variant structure",
      "Figma explorations or wireframes",
      "Accessibility considerations",
      "Alternatives considered",
    ],
  },
  {
    id: "spec",
    title: "Component Spec",
    description: "Detailed specification for an approved component before implementation.",
    url: "/templates/spec",
    outline: [
      "Component name and category",
      "Anatomy and sub-components",
      "Props / attributes and defaults",
      "States: default, hover, focus, disabled, error",
      "Responsive behavior at breakpoints",
      "Figma component structure",
      "Storybook story requirements",
    ],
  },
  {
    id: "pr-checklist",
    title: "PR Review Checklist",
    description: "Checklist for maintainers reviewing a component contribution PR.",
    url: "/templates/pr-checklist",
    outline: [
      "Matches approved spec and Figma design",
      "Passes accessibility checklist",
      "Unit and visual regression tests included",
      "Storybook stories cover all variants",
      "No breaking changes without migration guide",
      "Documentation updated",
      "Changelog entry added",
    ],
  },
  {
    id: "deprecation",
    title: "Deprecation Notice",
    description: "Template for announcing component deprecation to adopters.",
    url: "/templates/deprecation",
    outline: [
      "Component being deprecated and reason",
      "Recommended replacement",
      "Migration steps with code examples",
      "Timeline: notice period and removal date",
      "Affected products to audit",
      "Support channel for migration questions",
    ],
  },
];

export type RoadmapStatus = "planned" | "in-progress" | "done" | "deferred";

export const roadmapStatusLabels: Record<RoadmapStatus, string> = {
  planned: "Planned",
  "in-progress": "In Progress",
  done: "Done",
  deferred: "Deferred",
};

export const roadmapQuarters = [
  {
    id: "q3-2026",
    label: "Q3 2026",
    initiatives: [
      {
        id: "data-table-v2",
        title: "Data table v2",
        status: "in-progress" as RoadmapStatus,
        owner: "Core Maintainers",
        description:
          "Rebuild data table with sorting, filtering, and row selection. Aligns Figma and React implementations.",
      },
      {
        id: "token-migration",
        title: "Design token migration",
        status: "planned" as RoadmapStatus,
        owner: "Design System Owner",
        description:
          "Migrate legacy color tokens to semantic naming. Includes automated codemod for consuming teams.",
      },
      {
        id: "modal-a11y",
        title: "Modal accessibility audit",
        status: "done" as RoadmapStatus,
        owner: "Core Maintainers",
        description:
          "Focus trap, escape key, and screen reader announcements verified across all modal variants.",
      },
    ],
  },
  {
    id: "q4-2026",
    label: "Q4 2026",
    initiatives: [
      {
        id: "form-patterns",
        title: "Form patterns library",
        status: "planned" as RoadmapStatus,
        owner: "Contributors",
        description:
          "Standardize validation, error states, and multi-step form layouts across products.",
      },
      {
        id: "dark-mode",
        title: "Dark mode tokens",
        status: "planned" as RoadmapStatus,
        owner: "Core Maintainers",
        description:
          "Complete dark mode token set for color, elevation, and border. Ship with theme switcher utility.",
      },
      {
        id: "icon-system",
        title: "Icon system consolidation",
        status: "deferred" as RoadmapStatus,
        owner: "Design System Owner",
        description:
          "Deferred to Q1 2027 — pending audit of icon usage across three product lines.",
      },
    ],
  },
];

export type DecisionStatus = "accepted" | "proposed" | "superseded";

export const decisionStatusLabels: Record<DecisionStatus, string> = {
  accepted: "Accepted",
  proposed: "Proposed",
  superseded: "Superseded",
};

export const decisions = [
  {
    id: "adr-001",
    date: "2026-03-15",
    title: "Adopt hybrid governance model",
    status: "accepted" as DecisionStatus,
    context:
      "Product teams need to contribute components while foundations require centralized ownership. Pure federated and pure centralized models both failed in pilot programs.",
    decision:
      "Adopt a hybrid model: core team owns tokens, typography, and base components; product teams may propose and contribute domain-specific components through the standard review workflow.",
    consequences: [
      "Contribution workflow and RACI matrix published on governance page.",
      "Monthly office hours established for proposal intake.",
      "Maintainers block merges that bypass review.",
    ],
  },
  {
    id: "adr-002",
    date: "2026-04-02",
    title: "Enforce semver for all releases",
    status: "accepted" as DecisionStatus,
    context:
      "Adopters experienced breaking changes without notice when patch releases removed props. Trust in the system eroded.",
    decision:
      "All releases follow MAJOR.MINOR.PATCH. Breaking changes require migration guide, 2-week notice, and announcement in Slack and email.",
    consequences: [
      "Changelog required for every release.",
      "Deprecation workflow tied to major version bumps.",
      "Automated semver check added to CI.",
    ],
  },
  {
    id: "adr-003",
    date: "2026-05-10",
    title: "WCAG AA as minimum accessibility bar",
    status: "accepted" as DecisionStatus,
    context:
      "Inconsistent accessibility across components created compliance risk and poor experiences for assistive technology users.",
    decision:
      "No component ships without passing the accessibility checklist. WCAG 2.1 AA is the minimum; AAA encouraged where feasible.",
    consequences: [
      "Accessibility checklist added to review gate.",
      "axe-core tests required in component PRs.",
      "Maintainers reject PRs that fail contrast or keyboard nav.",
    ],
  },
  {
    id: "adr-004",
    date: "2026-06-01",
    title: "Consolidate on React + Figma as source of truth",
    status: "proposed" as DecisionStatus,
    context:
      "Some teams maintain parallel Vue implementations. Drift between design and code is increasing.",
    decision:
      "React is the canonical code implementation. Figma library is the canonical design source. Vue wrappers may be community-maintained but are not officially supported.",
    consequences: [
      "Pending stakeholder review from Vue product teams.",
      "If accepted, Vue docs move to community section.",
      "Figma-to-code parity checks added to release process.",
    ],
  },
  {
    id: "adr-005",
    date: "2025-11-20",
    title: "Centralized token repository",
    status: "superseded" as DecisionStatus,
    context:
      "Tokens were scattered across product repos with no single source of truth.",
    decision:
      "All design tokens live in a dedicated tokens package consumed via npm.",
    consequences: [
      "Superseded by ADR-002 token migration initiative in Q3 2026.",
      "Legacy token imports deprecated in v2.0.",
    ],
  },
];
