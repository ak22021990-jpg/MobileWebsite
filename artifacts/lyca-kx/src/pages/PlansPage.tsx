import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Phone, Globe, Wifi, Zap, Shield, HelpCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: 9.99,
    data: "2GB",
    tag: null,
    color: "border-border",
    btnClass: "border-[#0E1F5C] text-[#0E1F5C] hover:bg-[#0E1F5C] hover:text-white",
    features: [
      "2GB LTE Data",
      "Unlimited Talk & Text",
      "Free calls to 30+ countries",
      "Wi-Fi Calling",
      "Mobile Hotspot (up to 2GB)",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: 19.99,
    data: "8GB",
    tag: null,
    color: "border-border",
    btnClass: "border-[#0066FF] text-[#0066FF] hover:bg-[#0066FF] hover:text-white",
    features: [
      "8GB LTE Data",
      "Unlimited Talk & Text",
      "Free calls to 60+ countries",
      "Wi-Fi Calling",
      "Mobile Hotspot (up to 5GB)",
      "International Texting",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited",
    price: 29.99,
    data: "Unlimited",
    tag: "Best Seller",
    color: "border-[#0066FF]",
    btnClass: "bg-[#0066FF] text-white hover:bg-[#0052cc]",
    features: [
      "Unlimited LTE/5G Data",
      "Unlimited Talk & Text",
      "Free calls to 75+ countries",
      "Wi-Fi Calling",
      "Mobile Hotspot (20GB)",
      "International Texting",
      "Voicemail & Call Waiting",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: 39.99,
    data: "Unlimited+",
    tag: "5G Ready",
    color: "border-[#00D084]",
    btnClass: "bg-[#0E1F5C] text-white hover:bg-[#1a3385]",
    features: [
      "Unlimited 5G Data (priority)",
      "Unlimited Talk & Text",
      "Free calls to 75+ countries",
      "Wi-Fi Calling",
      "Hotspot 40GB at full speed",
      "International Texting",
      "Voicemail & Call Waiting",
      "International Data Roaming 1GB",
    ],
  },
];

const faqs = [
  { q: "Can I keep my current number?", a: "Yes! Lyca Mobile supports number porting from any US carrier. Simply select 'Transfer existing number' during activation." },
  { q: "Are there any activation fees?", a: "No activation fees! Just purchase your SIM or eSIM and choose a plan. Your first month starts from the activation date." },
  { q: "Which countries are included in free international calls?", a: "Over 75 countries including India, Pakistan, Bangladesh, Philippines, Nigeria, Mexico, and more. Full list available at lycamobile.us." },
  { q: "Can I use my data for hotspot/tethering?", a: "Yes, all plans include mobile hotspot. The amount varies by plan — from 2GB on Basic to 40GB on Premium." },
  { q: "How does the 30-day plan cycle work?", a: "Plans auto-renew every 30 days from your activation date. You'll receive a reminder before renewal. You can change or cancel anytime." },
];

type Duration = "1" | "3" | "6" | "12";

const durations: { value: Duration; label: string; discount: number; badge?: string }[] = [
  { value: "1", label: "1 Month", discount: 0 },
  { value: "3", label: "3 Months", discount: 5, badge: "Save 5%" },
  { value: "6", label: "6 Months", discount: 10, badge: "Save 10%" },
  { value: "12", label: "12 Months", discount: 15, badge: "Save 15%" },
];

export default function PlansPage() {
  const [duration, setDuration] = useState<Duration>("1");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const selectedDuration = durations.find(d => d.value === duration)!;
  const months = parseInt(duration);
  const discount = selectedDuration.discount;

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0E1F5C] to-[#0066FF] py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Simple, Affordable Plans</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8">
            No contracts. No hidden fees. International calling included in every plan.
          </p>

          {/* Duration dropdown */}
          <div className="inline-flex flex-col items-center gap-2">
            <label className="text-white/70 text-sm font-medium">Select plan duration:</label>
            <div className="relative">
              <select
                value={duration}
                onChange={e => setDuration(e.target.value as Duration)}
                className="appearance-none bg-white text-[#0E1F5C] font-bold text-sm px-6 py-3 pr-10 rounded-full border-2 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer shadow-lg min-w-[180px]"
              >
                {durations.map(d => (
                  <option key={d.value} value={d.value}>
                    {d.label}{d.badge ? ` — ${d.badge}` : ""}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0E1F5C] pointer-events-none" />
            </div>
            {discount > 0 && (
              <div className="inline-flex items-center gap-1.5 bg-[#00D084] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5" /> {selectedDuration.badge} — Pay for {months} months upfront
              </div>
            )}
          </div>
        </motion.div>
      </section>

      {/* Plans Grid */}
      <section className="py-14 px-4 bg-slate-50 dark:bg-transparent">
        <div className="container mx-auto max-w-6xl">
          {months > 1 && (
            <div className="text-center mb-8">
              <p className="text-muted-foreground text-sm">
                Prices shown as <strong>monthly rate</strong> — billed as a single payment of the total below each plan.
              </p>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {plans.map((plan, idx) => {
              const monthlyRate = plan.price * (1 - discount / 100);
              const total = monthlyRate * months;
              return (
                <motion.div key={plan.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.08 }}
                  className={`relative bg-white dark:bg-slate-800 rounded-2xl border-2 ${plan.color} p-6 flex flex-col shadow-sm hover:shadow-lg transition-shadow`}>
                  {plan.tag && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap ${plan.tag === "Best Seller" ? "bg-[#0066FF] text-white" : "bg-[#00D084] text-white"}`}>
                        {plan.tag === "Best Seller" ? "⭐ " : "⚡ "}{plan.tag}
                      </span>
                    </div>
                  )}
                  <div className="mb-4 pt-2">
                    <h3 className="font-bold text-lg">{plan.name}</h3>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-3xl font-extrabold">${monthlyRate.toFixed(2)}</span>
                      <span className="text-sm text-muted-foreground">/mo</span>
                    </div>
                    {months > 1 && (
                      <div className="text-xs text-muted-foreground mt-0.5">
                        Total: <span className="font-bold text-foreground">${total.toFixed(2)}</span> for {months} months
                      </div>
                    )}
                    <div className="text-sm font-bold text-[#0066FF] mt-1">{plan.data} Data</div>
                  </div>
                  <ul className="space-y-2.5 flex-1 mb-6">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-[#00D084] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className={`w-full font-semibold ${plan.btnClass} transition-colors`}>
                    {months > 1 ? `Get ${months}-Month Plan` : "Get This Plan"}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Lyca */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-4xl text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Why Lyca Mobile?</h2>
          <p className="text-muted-foreground">Millions of customers trust Lyca Mobile for reliable, affordable wireless service.</p>
        </div>
        <div className="container mx-auto max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { icon: Globe, label: "75+ Countries", desc: "Free international calls" },
            { icon: Wifi, label: "5G Network", desc: "T-Mobile powered coverage" },
            { icon: Shield, label: "No Contracts", desc: "Cancel anytime" },
            { icon: Zap, label: "Instant eSIM", desc: "Start in minutes" },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center gap-2 p-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-1">
                <item.icon className="w-7 h-7 text-[#0066FF]" />
              </div>
              <p className="font-bold">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call band */}
      <section className="py-10 px-4 bg-[#0E1F5C] text-white text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div>
            <h3 className="text-xl font-bold mb-1">Need help choosing a plan?</h3>
            <p className="text-blue-200 text-sm">Our team is available Mon–Sat 8AM–10PM EST.</p>
          </div>
          <div className="flex items-center gap-3">
            <a href="tel:18662773221">
              <Button className="bg-[#00D084] hover:bg-[#00b372] text-white gap-2">
                <Phone className="w-4 h-4" /> Call 1-866-277-3221
              </Button>
            </a>
            <Button variant="outline" className="border-white/40 text-white hover:bg-white/10"
              onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))}>
              Chat with LIA
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-2xl">
          <h2 className="text-2xl font-bold mb-8 text-center flex items-center justify-center gap-2">
            <HelpCircle className="w-6 h-6 text-[#0066FF]" /> Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-border rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left gap-3">
                  <span className="font-semibold text-sm">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-4 pb-4 text-sm text-muted-foreground border-t border-border pt-3">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
