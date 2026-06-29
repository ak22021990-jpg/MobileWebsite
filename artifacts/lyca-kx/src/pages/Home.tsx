import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSearch } from "@/components/sections/HeroSearch";
import { JumpToNav } from "@/components/sections/JumpToNav";
import { JourneyHub } from "@/components/sections/JourneyHub";
import { ServiceStatus } from "@/components/sections/ServiceStatus";
import { CoverageChecker } from "@/components/sections/CoverageChecker";
import { SimulatorCenter } from "@/components/sections/SimulatorCenter";
import { KnowledgeCenter } from "@/components/sections/KnowledgeCenter";
import { AppDownload } from "@/components/sections/AppDownload";
import { InternationalExplorer } from "@/components/sections/InternationalExplorer";
import { BlogSection } from "@/components/sections/BlogSection";
import { AIAssistant } from "@/components/panels/AIAssistant";
import { AccessibilityPanel } from "@/components/panels/AccessibilityPanel";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">
        <HeroSearch />
        <JumpToNav />
        <JourneyHub />
        <ServiceStatus />
        <CoverageChecker />
        <SimulatorCenter />
        <KnowledgeCenter />
        <BlogSection />
        <AppDownload />
        <InternationalExplorer />
      </main>
      <Footer />

      <AIAssistant />
      <AccessibilityPanel />
    </div>
  );
}
