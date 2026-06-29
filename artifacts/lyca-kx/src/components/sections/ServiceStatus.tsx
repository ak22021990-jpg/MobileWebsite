import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertTriangle, Clock, ArrowRight, X, Info, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface StatusItem {
  id: number;
  name: string;
  status: "operational" | "warning" | "maintenance";
  text: string;
  time: string;
  detail: {
    headline: string;
    body: string;
    lastUpdated: string;
    affectedRegions?: string;
    eta?: string;
  };
}

const statuses: StatusItem[] = [
  {
    id: 1,
    name: "Network Status",
    status: "operational",
    text: "All Systems Operational",
    time: "Checked 2 mins ago",
    detail: {
      headline: "Network is fully operational nationwide.",
      body: "All voice, data, and SMS services are running normally across 4G LTE and 5G networks. No reported outages or degraded performance in any region.",
      lastUpdated: "Jun 19, 2026 · 10:42 AM EST",
      affectedRegions: "None — all 50 states normal"
    }
  },
  {
    id: 2,
    name: "Planned Maintenance",
    status: "maintenance",
    text: "Scheduled: Sunday 2–4am EST",
    time: "Upcoming",
    detail: {
      headline: "Planned network upgrade — Sunday June 22, 2:00–4:00 AM EST.",
      body: "We will be performing a core network infrastructure upgrade to improve 5G speeds and reliability in the Northeast region. Voice and SMS services will remain active. Mobile data may experience brief interruptions of 3–5 minutes during this window.",
      lastUpdated: "Jun 18, 2026 · 3:00 PM EST",
      affectedRegions: "Northeast US (NY, NJ, CT, MA, PA)",
      eta: "June 22 · 4:00 AM EST"
    }
  },
  {
    id: 3,
    name: "eSIM Service",
    status: "operational",
    text: "Operational",
    time: "Checked 5 mins ago",
    detail: {
      headline: "eSIM provisioning and activation is fully operational.",
      body: "All eSIM QR code deliveries, profile downloads, and device activations are working normally. Average activation time is under 3 minutes.",
      lastUpdated: "Jun 19, 2026 · 10:38 AM EST"
    }
  },
  {
    id: 4,
    name: "International Calling",
    status: "operational",
    text: "Operational",
    time: "Checked 10 mins ago",
    detail: {
      headline: "International calling is operational across all 75+ included countries.",
      body: "Voice calls to all included international destinations are completing normally. International SMS delivery is normal. A brief delay of 1–2 seconds may be noticed on calls to West Africa — our engineering team is monitoring.",
      lastUpdated: "Jun 19, 2026 · 10:30 AM EST",
      affectedRegions: "Minor latency to West Africa only"
    }
  },
  {
    id: 5,
    name: "My Lyca App",
    status: "operational",
    text: "Operational",
    time: "Checked 12 mins ago",
    detail: {
      headline: "My Lyca iOS and Android apps are fully operational.",
      body: "Account management, balance checks, recharges, and plan renewals are all functioning normally on both app platforms. App Store version 4.2.1 and Play Store version 4.2.0 are current.",
      lastUpdated: "Jun 19, 2026 · 10:28 AM EST"
    }
  },
];

const BASE_TRENDING_COUNTS = [1240, 850, 420, 150];

const trendingIssuesBase = [
  {
    id: 1,
    title: "Can't connect to 5G network",
    desc: "Users in NY reporting 5G fallback to LTE.",
    steps: [
      "Restart your device completely (power off, wait 10 sec, power on)",
      "Toggle Airplane Mode on for 30 seconds, then off",
      "Go to Settings → Cellular → Network Selection → set to Automatic",
      "If on Android, go to Network → Preferred Network Type → set to 5G/LTE/Auto",
      "Check coverage at lycamobile.us/coverage to confirm 5G is available in your area"
    ]
  },
  {
    id: 2,
    title: "Delayed SMS delivery",
    desc: "Some international texts experiencing delays up to 15 minutes.",
    steps: [
      "Ensure you include the correct country code (e.g., +44 for UK, +91 for India)",
      "Check your SMS plan balance at lycamobile.us or dial *611#",
      "Wait 15 minutes and retry — international routing can occasionally be delayed",
      "Try sending via WhatsApp or iMessage over WiFi as an alternative",
      "If the issue persists for over 1 hour, contact support at 1-866-277-3221"
    ]
  },
  {
    id: 3,
    title: "App login timeout",
    desc: "My Lyca app timing out during authentication for some users.",
    steps: [
      "Force-close the app completely and reopen it",
      "Clear app cache: Settings → Apps → My Lyca → Storage → Clear Cache",
      "Update to the latest version from App Store or Google Play",
      "Try logging in via the website at lycamobile.us instead",
      "If using biometric login, disable it temporarily and use your password"
    ]
  },
  {
    id: 4,
    title: "Voicemail setup failing",
    desc: "New accounts unable to set voicemail PIN on first attempt.",
    steps: [
      "Wait 2 hours after SIM activation before setting up voicemail",
      "Dial 123 from your Lyca phone (not 121 — that is the old number)",
      "If prompted for a default PIN, try 0000 or 1234 to enter the system",
      "Follow voice prompts to set a new 4-digit PIN of your choice",
      "If still failing, call support at 1-866-277-3221 to reset voicemail remotely"
    ]
  },
];

const trendingIssues = trendingIssuesBase.map((issue, i) => ({
  ...issue,
  users: `${BASE_TRENDING_COUNTS[i].toLocaleString()} users`,
}));

const recentArticles = [
  { id: 1, cat: "Network", title: "5G Coverage Expansion — Summer 2026", time: "3 min read", content: "Lyca Mobile has expanded 5G coverage to 12 new metropolitan areas including Phoenix, Denver, and Miami. Customers with 5G-capable devices will automatically connect to faster speeds at no extra charge." },
  { id: 2, cat: "Billing", title: "Understanding Your First Bill", time: "4 min read", content: "Your first Lyca bill reflects the 30-day plan you activated. Charges are prepaid — you pay before you use. If you see an unexpected charge, check your transaction history at lycamobile.us." },
  { id: 3, cat: "Device", title: "iOS 18 Compatibility Update", time: "2 min read", content: "Lyca Mobile is fully compatible with iOS 18. If you notice any connectivity issues after updating, reset your Network Settings and re-enter APN: data.lycamobile.com." },
  { id: 4, cat: "Account", title: "New: Family Plan Dashboard", time: "3 min read", content: "We've launched a redesigned Family Plan dashboard. Primary account holders can now set individual data limits for each line, view usage in real time, and add/remove members with one tap." },
  { id: 5, cat: "International", title: "New Calling Rates: Latin America", time: "2 min read", content: "We've reduced per-minute rates to Colombia, Ecuador, and Peru by up to 40%. Most monthly plans already include unlimited calls to Mexico and Dominican Republic at no extra cost." },
  { id: 6, cat: "Security", title: "Account Security Best Practices", time: "3 min read", content: "Enable two-factor authentication in your account settings. Never share your account PIN with anyone — Lyca agents will never ask for your full PIN. Update your password every 90 days." },
];

const statusIcon = (status: StatusItem["status"]) => {
  if (status === "operational") return <CheckCircle2 className="h-4 w-4 text-emerald-500 mr-1.5" />;
  if (status === "maintenance") return <Wrench className="h-4 w-4 text-amber-500 mr-1.5" />;
  return <AlertTriangle className="h-4 w-4 text-red-500 mr-1.5" />;
};

const statusTextClass = (status: StatusItem["status"]) => {
  if (status === "operational") return "text-emerald-600 dark:text-emerald-400";
  if (status === "maintenance") return "text-amber-600 dark:text-amber-400";
  return "text-red-600 dark:text-red-400";
};

export function ServiceStatus() {
  const [activeStatus, setActiveStatus] = useState<StatusItem | null>(null);
  const [activeArticle, setActiveArticle] = useState<(typeof recentArticles)[0] | null>(null);

  return (
    <>
      <section id="service-status" className="py-20 px-4 md:px-6 bg-white dark:bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Service Status & Updates</h2>
              <p className="text-muted-foreground">Real-time information about our network and services.</p>
            </div>
            <div className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 px-4 py-2 rounded-full w-fit">
              <span className="relative flex h-3 w-3 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              System Normal
            </div>
          </div>

          {/* Clickable Status Cards */}
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-5 gap-4 snap-x">
            {statuses.map((item, idx) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                onClick={() => setActiveStatus(activeStatus?.id === item.id ? null : item)}
                data-testid={`status-card-${item.id}`}
                className={`text-left bg-card border rounded-xl p-4 min-w-[240px] md:min-w-0 snap-start flex-shrink-0 flex flex-col justify-between transition-all cursor-pointer group ${
                  activeStatus?.id === item.id
                    ? "border-primary/50 shadow-lg ring-2 ring-primary/20"
                    : "border-border hover:shadow-md hover:border-primary/30"
                }`}
              >
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-sm">{item.name}</h4>
                    <Info className={`w-3.5 h-3.5 shrink-0 transition-colors ${activeStatus?.id === item.id ? "text-primary" : "text-muted-foreground/40 group-hover:text-muted-foreground"}`} />
                  </div>
                  <div className="flex items-center text-xs font-medium">
                    {statusIcon(item.status)}
                    <span className={statusTextClass(item.status)}>{item.text}</span>
                  </div>
                </div>
                <div className="text-[10px] text-muted-foreground flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {item.time}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Expanded status detail */}
          <AnimatePresence>
            {activeStatus && (
              <motion.div
                key={activeStatus.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`mt-4 rounded-xl border p-5 relative ${
                  activeStatus.status === "maintenance"
                    ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800/50"
                    : "bg-emerald-50 dark:bg-emerald-900/10 border-emerald-200 dark:border-emerald-800/50"
                }`}>
                  <button
                    onClick={() => setActiveStatus(null)}
                    className="absolute top-3 right-3 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-white/50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      activeStatus.status === "maintenance" ? "bg-amber-200 dark:bg-amber-800/50" : "bg-emerald-200 dark:bg-emerald-800/50"
                    }`}>
                      {activeStatus.status === "maintenance" ? <Wrench className="w-4 h-4 text-amber-700 dark:text-amber-300" /> : <Zap className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm mb-1">{activeStatus.name} — Update</h4>
                      <p className={`text-sm font-semibold mb-2 ${statusTextClass(activeStatus.status)}`}>{activeStatus.detail.headline}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{activeStatus.detail.body}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Updated: {activeStatus.detail.lastUpdated}</span>
                        {activeStatus.detail.affectedRegions && (
                          <span className="flex items-center gap-1"><Info className="w-3 h-3" /> {activeStatus.detail.affectedRegions}</span>
                        )}
                        {activeStatus.detail.eta && (
                          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Expected completion: {activeStatus.detail.eta}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trending Issues */}
          <div className="mt-12 mb-8">
            <h3 className="text-xl font-bold mb-6">Trending Issues & Solutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trendingIssues.map((issue, idx) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="bg-slate-50 dark:bg-slate-900 rounded-xl p-1 border border-border"
                >
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value={`issue-${issue.id}`} className="border-0">
                      <AccordionTrigger className="hover:no-underline px-4 py-3">
                        <div className="flex flex-col items-start text-left gap-1 w-full">
                          <div className="flex items-center justify-between w-full">
                            <span className="font-semibold text-sm">{issue.title}</span>
                            <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap ml-2 shrink-0">
                              {issue.users}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground font-normal">{issue.desc}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4 pt-1">
                        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-border">
                          <h5 className="font-semibold text-sm mb-3 text-[#0066FF] flex items-center gap-1.5">
                            <CheckCircle2 className="h-4 w-4" /> Resolution Steps:
                          </h5>
                          <ol className="space-y-2.5">
                            {issue.steps.map((step, i) => (
                              <li key={i} className="flex items-start text-sm gap-3">
                                <span className="bg-[#0066FF]/10 text-[#0066FF] w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
                                <span className="text-muted-foreground leading-snug">{step}</span>
                              </li>
                            ))}
                          </ol>
                          <div className="mt-4 pt-3 border-t border-border">
                            <p className="text-xs text-muted-foreground">
                              Still having issues? <button onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))} className="text-[#0066FF] hover:underline font-medium">Ask Lyca AI</button> or call <strong>1-866-277-3221</strong>
                            </p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recently Updated Articles */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Recently Updated Articles</h3>
              <Button variant="ghost" className="text-primary gap-1"
                onClick={() => {
                  const el = document.getElementById("knowledge");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                  else window.location.href = "/help#knowledge";
                }}>
                View all <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0 gap-4 snap-x">
              {recentArticles.map((art, idx) => (
                <motion.button
                  key={art.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  onClick={() => setActiveArticle(activeArticle?.id === art.id ? null : art)}
                  data-testid={`recent-article-${art.id}`}
                  className="text-left bg-card border border-border rounded-xl p-5 min-w-[280px] max-w-[280px] flex-shrink-0 snap-start hover:border-primary/40 hover:shadow-md cursor-pointer transition-all group"
                >
                  <div className="bg-[#0E1F5C]/10 dark:bg-blue-900/30 text-[#0E1F5C] dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-3">
                    {art.cat}
                  </div>
                  <h4 className="font-bold mb-3 group-hover:text-primary transition-colors text-sm leading-snug">{art.title}</h4>
                  <div className="text-xs text-muted-foreground font-medium flex items-center">
                    <Clock className="h-3 w-3 mr-1.5" /> {art.time}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Expanded article content */}
            <AnimatePresence>
              {activeArticle && (
                <motion.div
                  key={activeArticle.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden mt-4"
                >
                  <div className="bg-slate-50 dark:bg-slate-900 border border-border rounded-xl p-6 relative">
                    <button
                      onClick={() => setActiveArticle(null)}
                      className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-full hover:bg-white dark:hover:bg-slate-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="bg-[#0E1F5C]/10 dark:bg-blue-900/30 text-[#0E1F5C] dark:text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full w-fit mb-3">
                      {activeArticle.cat}
                    </div>
                    <h4 className="font-bold text-base mb-3 pr-8">{activeArticle.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{activeArticle.content}</p>
                    <div className="mt-4 flex gap-3">
                      <button
                        onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))}
                        className="text-xs text-[#0066FF] hover:underline font-medium flex items-center gap-1"
                      >
                        Ask AI about this <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
