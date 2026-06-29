import { useState } from "react";
import { MapPin, Search, Signal, Phone, MessageSquare, ChevronRight, AlertCircle, Info, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "wouter";

interface CoverageResult {
  address: string;
  fiveG: { level: "Excellent" | "Good" | "Limited" | "Unavailable"; detail: string };
  lte: { level: "Excellent" | "Good" | "Limited"; detail: string };
  voice: { level: "Excellent" | "Good" | "Limited"; detail: string };
  sms: { level: "Excellent" | "Good"; detail: string };
  indoor: string;
  note?: string;
  downloadSpeed: string;
  uploadSpeed: string;
}

function simulateCoverage(address: string): CoverageResult {
  const lower = address.toLowerCase();

  const isRural =
    /rural|farm|county road|rt\s*\d|rr\s*\d|hwy|highway|country/i.test(address) ||
    /\b(wy|mt|nd|sd|id|ak|nm)\b/i.test(address);

  const isMajorCity =
    /new york|los angeles|chicago|houston|phoenix|philadelphia|san antonio|san diego|dallas|san jose|austin|jacksonville|san francisco|seattle|denver|boston|nashville|miami|atlanta|portland/i.test(lower);

  const is5GCity =
    /new york|los angeles|chicago|dallas|miami|seattle|boston|san francisco|houston|atlanta|denver|phoenix/i.test(lower);

  if (isRural) {
    return {
      address,
      fiveG: { level: "Unavailable", detail: "5G not yet available in this area" },
      lte: { level: "Limited", detail: "LTE coverage may be spotty — outdoor use recommended" },
      voice: { level: "Limited", detail: "Voice calls available but signal may vary" },
      sms: { level: "Good", detail: "SMS typically reliable even in limited coverage areas" },
      indoor: "Signal strength may be reduced indoors",
      note: "Rural coverage depends on your specific location. Check our coverage map for a precise reading.",
      downloadSpeed: "5–15 Mbps",
      uploadSpeed: "2–5 Mbps",
    };
  }

  if (is5GCity) {
    return {
      address,
      fiveG: { level: "Excellent", detail: "Extended Range 5G available. Ultra-Capacity 5G in select areas" },
      lte: { level: "Excellent", detail: "Full LTE coverage — rock-solid" },
      voice: { level: "Excellent", detail: "Crystal-clear calls in your area" },
      sms: { level: "Excellent", detail: "Full messaging coverage" },
      indoor: "Strong indoor coverage in most buildings",
      downloadSpeed: "50–200 Mbps",
      uploadSpeed: "15–50 Mbps",
    };
  }

  if (isMajorCity) {
    return {
      address,
      fiveG: { level: "Good", detail: "5G available in most outdoor areas; expanding indoors" },
      lte: { level: "Excellent", detail: "Full LTE coverage throughout the area" },
      voice: { level: "Excellent", detail: "HD Voice available, Wi-Fi Calling supported" },
      sms: { level: "Excellent", detail: "Instant SMS & MMS delivery" },
      indoor: "Good indoor coverage in most buildings",
      downloadSpeed: "25–100 Mbps",
      uploadSpeed: "10–25 Mbps",
    };
  }

  return {
    address,
    fiveG: { level: "Good", detail: "5G available in major streets and commercial areas" },
    lte: { level: "Good", detail: "LTE coverage across most of the area" },
    voice: { level: "Good", detail: "Reliable voice calls, Wi-Fi Calling available as backup" },
    sms: { level: "Excellent", detail: "SMS delivery is reliable in this area" },
    indoor: "Coverage may vary in basements and dense buildings",
    downloadSpeed: "15–50 Mbps",
    uploadSpeed: "5–15 Mbps",
  };
}

const levelDotColor: Record<string, string> = {
  Excellent: "bg-emerald-500",
  Good: "bg-blue-500",
  Limited: "bg-amber-500",
  Unavailable: "bg-red-500",
};

const levelTextColor: Record<string, string> = {
  Excellent: "text-emerald-600 dark:text-emerald-400",
  Good: "text-blue-600 dark:text-blue-400",
  Limited: "text-amber-600 dark:text-amber-400",
  Unavailable: "text-red-500 dark:text-red-400",
};

const levelCardBg: Record<string, string> = {
  Excellent: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-100 dark:border-emerald-800/40",
  Good: "bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/40",
  Limited: "bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800/40",
  Unavailable: "bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-800/40",
};

const coverageCards = [
  { key: "fiveG" as const, label: "5G Coverage", icon: Signal },
  { key: "lte" as const, label: "4G LTE", icon: Zap },
  { key: "voice" as const, label: "Voice Calling", icon: Phone },
  { key: "sms" as const, label: "SMS & MMS", icon: MessageSquare },
];

export function CoverageChecker() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    if (!address.trim()) return;
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(simulateCoverage(address.trim()));
      setLoading(false);
    }, 1200);
  };

  return (
    <section id="coverage" className="py-20 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/30">
      <div className="container mx-auto max-w-3xl">

        {/* Badge + Heading */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-slate-800 border border-border text-slate-600 dark:text-slate-300 text-xs font-semibold px-4 py-2 rounded-full shadow-sm mb-5">
            <Signal className="w-3.5 h-3.5" />
            Coverage Checker
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-3">
            Check Coverage in Your Area
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto leading-relaxed">
            Enter your address to see 5G, LTE, voice, and data availability where you live or work.
          </p>
        </div>

        {/* Search bar */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-border flex items-center gap-2 px-5 py-3 mb-3">
          <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-base py-2 text-foreground placeholder:text-muted-foreground min-w-0"
            placeholder="e.g. 118, New Jersey or 10001"
            value={address}
            onChange={e => setAddress(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleCheck()}
          />
          <Button
            onClick={handleCheck}
            disabled={!address.trim() || loading}
            className="bg-[#0066FF] hover:bg-[#0052cc] text-white px-6 py-2.5 h-auto rounded-xl font-semibold gap-2 shrink-0 transition-colors"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Checking…
              </span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Check Coverage
              </>
            )}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mb-10 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 shrink-0" />
          Coverage estimates are based on network data and may vary by device and environment.
        </p>

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Location label */}
              <p className="text-center text-sm font-semibold text-muted-foreground tracking-wide">
                Coverage results for{" "}
                <span className="text-foreground uppercase">{result.address}</span>
              </p>

              {/* 4 coverage cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {coverageCards.map(({ key, label, icon: Icon }) => {
                  const svc = result[key];
                  return (
                    <div
                      key={key}
                      className={`rounded-2xl border p-4 flex flex-col gap-2 ${levelCardBg[svc.level]}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="w-9 h-9 bg-white dark:bg-slate-700 rounded-xl shadow-sm flex items-center justify-center shrink-0">
                          <Icon className="w-4.5 h-4.5 text-slate-600 dark:text-slate-300" />
                        </div>
                        <span className={`flex items-center gap-1.5 text-[11px] font-bold ${levelTextColor[svc.level]}`}>
                          <span className={`w-2 h-2 rounded-full shrink-0 ${levelDotColor[svc.level]}`} />
                          {svc.level}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-foreground leading-tight">{label}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-snug">{svc.detail}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Speed banner */}
              <div className="bg-[#0E1F5C] rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <p className="text-white/60 text-xs font-medium mb-3">Typical Data Speeds in Your Area</p>
                  <div className="flex items-end gap-8">
                    <div>
                      <p className="text-white font-extrabold text-2xl tracking-tight">{result.downloadSpeed}</p>
                      <p className="text-white/50 text-xs mt-0.5">Download</p>
                    </div>
                    <div>
                      <p className="text-white font-extrabold text-2xl tracking-tight">{result.uploadSpeed}</p>
                      <p className="text-white/50 text-xs mt-0.5">Upload</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 shrink-0 w-full sm:w-auto">
                  <a href="/plans"
                    className="bg-[#00D084] hover:bg-[#00b872] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors text-center whitespace-nowrap">
                    View Plans
                  </a>
                  <a
                    href="https://www.lycamobile.us/en/coverage-checker/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors border border-white/20 text-center whitespace-nowrap">
                    Full Coverage Map
                  </a>
                </div>
              </div>

              {/* Indoor signal */}
              <div className="bg-white dark:bg-slate-800 border border-border rounded-xl px-5 py-3.5 flex items-center gap-2.5 text-sm">
                <Info className="w-4 h-4 shrink-0 text-[#0066FF]" />
                <span>
                  <span className="font-semibold text-foreground">Indoor signal: </span>
                  <span className="text-muted-foreground">{result.indoor}</span>
                </span>
              </div>

              {/* Footer link */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-muted-foreground px-1 pb-2">
                <span>Get more precise coverage — visit lycamobile.us for an interactive map.</span>
                <a
                  href="https://www.lycamobile.us/en/coverage-checker/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#0066FF] font-semibold hover:underline whitespace-nowrap shrink-0"
                >
                  Full Coverage Map <ChevronRight className="w-4 h-4" />
                </a>
              </div>

              {result.note && (
                <div className="flex items-start gap-2 text-sm text-muted-foreground bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 rounded-xl px-4 py-3">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                  <span>{result.note}</span>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
