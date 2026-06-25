import { SectionNav } from "@/components/governance/SectionNav";
import { OverviewHero } from "@/components/governance/OverviewHero";
import { GovernanceModel } from "@/components/governance/GovernanceModel";
import { RolesGrid } from "@/components/governance/RolesGrid";
import { WorkflowStepper } from "@/components/governance/WorkflowStepper";
import { RaciMatrix } from "@/components/governance/RaciMatrix";
import { TemplatesSection } from "@/components/governance/TemplatesSection";
import { LifecycleExplorer } from "@/components/governance/LifecycleExplorer";
import { RoadmapSection } from "@/components/governance/RoadmapSection";
import { VersioningSection } from "@/components/governance/VersioningSection";
import { CommunicationSection } from "@/components/governance/CommunicationSection";
import { AccessibilityChecklist } from "@/components/governance/AccessibilityChecklist";
import { DecisionLog } from "@/components/governance/DecisionLog";
import { ResourcesPanel } from "@/components/governance/ResourcesPanel";

export default function Home() {
  return (
    <>
      <a href="#overview" className="skip-link">
        Skip to content
      </a>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-[200px_1fr] lg:gap-12">
          <SectionNav />

          <main className="min-w-0 space-y-20 pb-16 pt-4 lg:pt-0">
            <OverviewHero />
            <GovernanceModel />
            <RolesGrid />
            <WorkflowStepper />
            <RaciMatrix />
            <TemplatesSection />
            <LifecycleExplorer />
            <RoadmapSection />
            <VersioningSection />
            <CommunicationSection />
            <AccessibilityChecklist />
            <DecisionLog />
            <ResourcesPanel />
          </main>
        </div>
      </div>
    </>
  );
}
