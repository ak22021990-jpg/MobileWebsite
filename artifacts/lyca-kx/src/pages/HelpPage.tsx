import { HeroSearch } from "@/components/sections/HeroSearch";
import { JumpToNav } from "@/components/sections/JumpToNav";
import { JourneyHub } from "@/components/sections/JourneyHub";
import { ServiceStatus } from "@/components/sections/ServiceStatus";
import { CoverageChecker } from "@/components/sections/CoverageChecker";
import { SimulatorCenter } from "@/components/sections/SimulatorCenter";
import { KnowledgeCenter } from "@/components/sections/KnowledgeCenter";
import { BlogSection } from "@/components/sections/BlogSection";
import { InternationalExplorer } from "@/components/sections/InternationalExplorer";
import { PageLayout } from "@/components/layout/PageLayout";

export default function HelpPage() {
  return (
    <PageLayout>
      <HeroSearch />
      <JumpToNav />
      <JourneyHub />
      <ServiceStatus />
      <CoverageChecker />
      <SimulatorCenter />
      <KnowledgeCenter />
      <BlogSection />
      <InternationalExplorer />
    </PageLayout>
  );
}
