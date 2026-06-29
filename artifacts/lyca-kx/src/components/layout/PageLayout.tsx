import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AIAssistant } from "@/components/panels/AIAssistant";
import { AccessibilityPanel } from "@/components/panels/AccessibilityPanel";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AIAssistant />
      <AccessibilityPanel />
    </div>
  );
}
