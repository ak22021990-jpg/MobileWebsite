import { Fragment, useEffect, useState } from "react";
import { Search, HelpCircle, Activity, Compass, BookOpen, Rss, Smartphone, Globe, Signal } from "lucide-react";

const navItems = [
  { label: "Search", icon: Search, id: "search" },
  { label: "Help Topics", icon: HelpCircle, id: "journey-hub" },
  { label: "Service Status", icon: Activity, id: "service-status" },
  { label: "Guided Support", icon: Compass, id: "simulator-center" },
  { label: "Knowledge Center", icon: BookOpen, id: "knowledge" },
  { label: "Blog", icon: Rss, id: "blog" },
  { label: "Get the App", icon: Smartphone, id: "app-download" },
  { label: "International", icon: Globe, id: "international" },
  { label: "Coverage", icon: Signal, id: "coverage" },
];

export function JumpToNav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  };

  return (
    <div className="sticky top-16 z-40 w-full bg-white dark:bg-slate-900 border-b border-border shadow-sm">
      <nav className="overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-center min-w-max w-full px-6">
          {navItems.map(({ label, icon: Icon, id }, i) => (
            <Fragment key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`flex items-center gap-1.5 px-4 py-3.5 text-xs font-medium whitespace-nowrap border-b-2 transition-all duration-200 ${
                  active === id
                    ? "border-[#0066FF] text-[#0066FF]"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-slate-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{label}</span>
              </button>
              {i < navItems.length - 1 && (
                <span className="w-px h-3 bg-border shrink-0" />
              )}
            </Fragment>
          ))}
        </div>
      </nav>
    </div>
  );
}
