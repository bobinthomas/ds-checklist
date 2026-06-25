# Design Governance Interactive Page

An interactive governance reference for design system teams — built with Next.js, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the page.

## Features

- **Sticky section navigation** with scroll-spy highlighting (13 sections)
- **Expandable role cards** and contribution workflow stepper
- **RACI matrix** with clickable cells explaining accountability
- **Templates** with expandable outlines and copy-to-clipboard
- **Lifecycle status explorer** with adopter guidance
- **Roadmap** with quarter tabs, status filters, and expandable initiatives
- **Decision log** with search, status filter, and expandable ADR cards
- **Persistent accessibility checklist** (saved in browser localStorage)
- **Editable resource links** with reset to defaults

## Customization

Edit [`src/lib/governance-content.ts`](src/lib/governance-content.ts) to update:

- `DESIGN_SYSTEM_NAME` — your design system name
- `raciActivities` — accountability matrix rows
- `templates` — proposal, spec, PR, and deprecation templates
- `roadmapQuarters` — quarterly initiatives and statuses
- `decisions` — architecture decision records
- `defaultResources` — Figma, Storybook, token, and tracker URLs
- Roles, workflow steps, lifecycle statuses, and checklist items

Users can also edit resource links directly in the browser via the Resources section.

## Build

```bash
npm run build
npm start
```
