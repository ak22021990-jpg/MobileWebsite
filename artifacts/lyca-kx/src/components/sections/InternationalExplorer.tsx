import { useState } from "react";
import { Search, MapPin, SignalHigh, CheckCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const countries = [
  { name: "USA", code: "US", flag: "🇺🇸", rate: "0.00", coverage: "Excellent", included: true },
  { name: "Mexico", code: "MX", flag: "🇲🇽", rate: "0.00", coverage: "Excellent", included: true },
  { name: "Canada", code: "CA", flag: "🇨🇦", rate: "0.00", coverage: "Excellent", included: true },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧", rate: "0.01", coverage: "Excellent", included: true },
  { name: "India", code: "IN", flag: "🇮🇳", rate: "0.01", coverage: "Good", included: true },
  { name: "Pakistan", code: "PK", flag: "🇵🇰", rate: "0.03", coverage: "Good", included: false },
  { name: "Bangladesh", code: "BD", flag: "🇧🇩", rate: "0.02", coverage: "Good", included: false },
  { name: "Nigeria", code: "NG", flag: "🇳🇬", rate: "0.08", coverage: "Variable", included: false },
  { name: "Ghana", code: "GH", flag: "🇬🇭", rate: "0.15", coverage: "Variable", included: false },
  { name: "Philippines", code: "PH", flag: "🇵🇭", rate: "0.10", coverage: "Good", included: false },
  { name: "Brazil", code: "BR", flag: "🇧🇷", rate: "0.02", coverage: "Good", included: true },
  { name: "Spain", code: "ES", flag: "🇪🇸", rate: "0.01", coverage: "Excellent", included: true },
  { name: "France", code: "FR", flag: "🇫🇷", rate: "0.01", coverage: "Excellent", included: true },
  { name: "Germany", code: "DE", flag: "🇩🇪", rate: "0.01", coverage: "Excellent", included: true },
  { name: "China", code: "CN", flag: "🇨🇳", rate: "0.01", coverage: "Good", included: true },
  { name: "UAE", code: "AE", flag: "🇦🇪", rate: "0.12", coverage: "Good", included: false },
  { name: "Saudi Arabia", code: "SA", flag: "🇸🇦", rate: "0.09", coverage: "Good", included: false },
  { name: "Jamaica", code: "JM", flag: "🇯🇲", rate: "0.18", coverage: "Variable", included: false },
  { name: "Dominican Rep.", code: "DO", flag: "🇩🇴", rate: "0.04", coverage: "Good", included: false },
  { name: "Colombia", code: "CO", flag: "🇨🇴", rate: "0.02", coverage: "Good", included: true },
];

export function InternationalExplorer() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<typeof countries[0] | null>(null);

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="international" className="py-24 px-4 md:px-6 bg-white dark:bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">International Services</h2>
          <p className="text-muted-foreground text-lg mb-8">Check calling rates and coverage for over 200 destinations worldwide.</p>

          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              className="pl-12 py-6 text-lg rounded-full shadow-sm bg-slate-50 border-slate-200 focus-visible:ring-[#0066FF]"
              placeholder="Search for a country..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((country, idx) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx % 10 * 0.05 }}
              onClick={() => setSelected(country)}
              className="bg-card border border-border rounded-xl p-4 flex flex-col items-center text-center cursor-pointer hover:shadow-lg hover:border-[#0066FF]/40 hover:-translate-y-0.5 transition-all group"
            >
              <span className="text-xl font-black text-[#0E1F5C] dark:text-white mb-1 tracking-wide">{country.code}</span>
              <h3 className="font-medium text-xs text-muted-foreground mb-2 leading-tight">{country.name}</h3>
              {country.included ? (
                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  INCLUDED
                </span>
              ) : (
                <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                  From ${country.rate}/min
                </span>
              )}
            </motion.div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No countries found matching "{search}"
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 rounded-2xl">
          {selected && (
            <>
              <div className="bg-[#0E1F5C] p-8 text-center text-white relative">
                <button onClick={() => setSelected(null)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
                <div className="text-3xl font-black text-white/40 mb-1">{selected.code}</div>
                <DialogTitle className="text-2xl font-bold mb-2">{selected.name}</DialogTitle>
                <div className="inline-flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full text-sm font-medium">
                  <SignalHigh className="w-4 h-4 text-[#00D084]" />
                  Coverage: {selected.coverage}
                </div>
              </div>

              <div className="p-6">
                {selected.included ? (
                  <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6 flex gap-3">
                    <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <h4 className="font-bold text-emerald-900 text-sm">Included in Unlimited Plans</h4>
                      <p className="text-xs text-emerald-700 mt-1">Calls to this destination are free with most monthly plans.</p>
                    </div>
                  </div>
                ) : (
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-6">
                    <h4 className="font-semibold text-sm mb-3">Pay As You Go Rates</h4>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-sm text-muted-foreground">Landline</span>
                      <span className="font-bold">${selected.rate}/min</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-slate-200">
                      <span className="text-sm text-muted-foreground">Mobile</span>
                      <span className="font-bold">${(parseFloat(selected.rate) + 0.04).toFixed(2)}/min</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-muted-foreground">SMS</span>
                      <span className="font-bold">$0.10/msg</span>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h4 className="font-semibold text-sm">Roaming Information</h4>
                  <div className="flex items-start gap-3 p-3 rounded-lg border border-border">
                    <MapPin className="w-5 h-5 text-[#0066FF] mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium">Data Roaming Available</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Standard international roaming data rates apply when traveling here. Turn on data roaming in your device settings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
