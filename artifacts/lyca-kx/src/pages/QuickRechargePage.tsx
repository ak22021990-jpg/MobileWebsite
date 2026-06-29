import { useState } from "react";
import { motion } from "framer-motion";
import { CreditCard, Smartphone, Zap, Check, Phone, MessageSquare, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLayout } from "@/components/layout/PageLayout";

const amounts = [5, 10, 15, 20, 25, 30, 40, 50];

const methods = [
  { icon: CreditCard, title: "Credit / Debit Card", desc: "Visa, Mastercard, American Express accepted" },
  { icon: Smartphone, title: "My Lyca App", desc: "Recharge instantly via the app on iOS or Android" },
  { icon: Phone, title: "Call to Recharge", desc: "Call 1-866-277-3221 and follow the automated prompts" },
];

export default function QuickRechargePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const finalAmount = selectedAmount ?? (customAmount ? parseFloat(customAmount) : null);

  const handleRecharge = () => {
    if (!phoneNumber.match(/^\d{10}$/) || !finalAmount) return;
    setSubmitted(true);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0E1F5C] to-[#0066FF] py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-center gap-2 mb-3">
            <Zap className="w-6 h-6 text-[#00D084]" />
            <span className="font-semibold text-blue-200">Fast & Secure</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Quick Recharge</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">Top up your Lyca Mobile balance in seconds. No account login required.</p>
        </motion.div>
      </section>

      <section className="py-14 px-4">
        <div className="container mx-auto max-w-xl">
          {!submitted ? (
            <div className="space-y-6">
              {/* Phone number */}
              <div>
                <label className="block text-sm font-bold mb-2">Lyca Mobile Number</label>
                <Input placeholder="10-digit number (e.g. 2125550100)"
                  value={phoneNumber} onChange={e => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="text-center text-lg font-mono tracking-widest py-5" maxLength={10} />
              </div>

              {/* Amount selection */}
              <div>
                <label className="block text-sm font-bold mb-3">Select Recharge Amount</label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {amounts.map(a => (
                    <button key={a}
                      onClick={() => { setSelectedAmount(a); setCustomAmount(""); }}
                      className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${selectedAmount === a ? "border-[#0066FF] bg-[#0066FF]/10 text-[#0066FF]" : "border-border hover:border-[#0066FF]/40"}`}>
                      ${a}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Or enter custom:</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">$</span>
                    <Input className="pl-7" placeholder="Other amount" type="number" min="1" max="200"
                      value={customAmount} onChange={e => { setCustomAmount(e.target.value); setSelectedAmount(null); }} />
                  </div>
                </div>
              </div>

              {/* Summary */}
              {phoneNumber.length === 10 && finalAmount && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4">
                  <p className="text-sm font-semibold text-green-800 dark:text-green-300">
                    Recharge summary: <strong>${finalAmount.toFixed(2)}</strong> to number <strong>{phoneNumber}</strong>
                  </p>
                </motion.div>
              )}

              <Button onClick={handleRecharge}
                disabled={!phoneNumber.match(/^\d{10}$/) || !finalAmount}
                className="w-full bg-[#00D084] hover:bg-[#00b372] text-white font-bold py-6 text-base disabled:opacity-50">
                <Zap className="w-5 h-5 mr-2" /> Recharge Now — ${finalAmount?.toFixed(2) ?? "0.00"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Secure payment processed by Lyca Mobile. For assistance, call 1-866-277-3221.
              </p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-[#00D084]/10 border border-[#00D084]/30 rounded-2xl p-10">
              <div className="w-16 h-16 bg-[#00D084] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Recharge Submitted!</h2>
              <p className="text-muted-foreground mb-1">Amount: <strong>${finalAmount?.toFixed(2)}</strong></p>
              <p className="text-muted-foreground mb-6">Number: <strong>{phoneNumber}</strong></p>
              <p className="text-sm text-muted-foreground mb-6">Your balance will update within 1–5 minutes. You'll receive an SMS confirmation.</p>
              <Button onClick={() => { setSubmitted(false); setPhoneNumber(""); setSelectedAmount(null); setCustomAmount(""); }}
                variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" /> Recharge Another Number
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Other methods */}
      <section className="py-10 px-4 bg-slate-50 dark:bg-transparent border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-xl font-bold text-center mb-6">Other Ways to Recharge</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {methods.map((m, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 border border-border rounded-xl p-4 text-center">
                <m.icon className="w-8 h-8 text-[#0066FF] mx-auto mb-2" />
                <h3 className="font-bold text-sm mb-1">{m.title}</h3>
                <p className="text-xs text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 px-4 text-center border-t border-border">
        <p className="text-muted-foreground text-sm mb-3">Need help with your recharge?</p>
        <div className="flex justify-center gap-3">
          <a href="tel:18662773221">
            <Button variant="outline" className="gap-2"><Phone className="w-4 h-4" /> Call Support</Button>
          </a>
          <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white gap-2"
            onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))}>
            <MessageSquare className="w-4 h-4" /> Chat with LIA
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
