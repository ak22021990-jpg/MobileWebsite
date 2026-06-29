import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone, QrCode, Check, ChevronRight, Phone, MessageSquare, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLayout } from "@/components/layout/PageLayout";

type SimType = "physical" | "esim";

const physicalSteps = [
  "Remove your Lyca SIM from its packaging. Note the ICCID number (20-digit) printed on the card.",
  "Power off your phone, insert the Lyca SIM into the SIM tray, then power back on.",
  "Wait for the network to register (you'll see 'Lyca Mobile' or 'T-Mobile' in the status bar).",
  "Enter your ICCID below and click Activate to complete the process.",
  "If data doesn't connect, set APN to: data.lycamobile.com (Settings → Mobile Data → APN).",
];

const esimSteps = [
  "Complete your eSIM purchase online — you'll receive a QR code via email immediately.",
  "On your phone, go to Settings → Mobile Data (or Cellular) → Add Plan.",
  "Tap 'Use QR Code' and scan the code from your email. Keep the email open on another device.",
  "Follow the on-screen prompts to install the Lyca eSIM profile.",
  "Enable the Lyca line and select it as your primary data line.",
];

export default function ActivatePage() {
  const [simType, setSimType] = useState<SimType>("physical");
  const [iccid, setIccid] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [iccidError, setIccidError] = useState("");

  const handleActivate = () => {
    if (simType === "physical") {
      if (!iccid.match(/^\d{19,20}$/)) {
        setIccidError("Please enter a valid 19 or 20-digit ICCID number.");
        return;
      }
      setSubmitted(true);
    } else {
      window.dispatchEvent(new CustomEvent("openAIAssistant"));
    }
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0E1F5C] to-[#0066FF] py-16 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Activate Your SIM</h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">Get connected in minutes. Choose your SIM type and follow the steps below.</p>
        </motion.div>
      </section>

      <section className="py-14 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* SIM type toggle */}
          <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-8">
            <button onClick={() => { setSimType("physical"); setSubmitted(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-colors ${simType === "physical" ? "bg-white dark:bg-slate-700 text-[#0E1F5C] dark:text-white shadow-sm" : "text-muted-foreground"}`}>
              <Smartphone className="w-4 h-4" /> Physical SIM
            </button>
            <button onClick={() => { setSimType("esim"); setSubmitted(false); }}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold transition-colors ${simType === "esim" ? "bg-white dark:bg-slate-700 text-[#0E1F5C] dark:text-white shadow-sm" : "text-muted-foreground"}`}>
              <QrCode className="w-4 h-4" /> eSIM
            </button>
          </div>

          {!submitted ? (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold mb-4">
                  {simType === "physical" ? "Physical SIM Activation Steps" : "eSIM Activation Steps"}
                </h2>
                <ol className="space-y-3">
                  {(simType === "physical" ? physicalSteps : esimSteps).map((step, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                      className="flex items-start gap-3 bg-white dark:bg-slate-800 border border-border rounded-xl p-4">
                      <span className="w-7 h-7 rounded-full bg-[#0066FF] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-sm">{step}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>

              {simType === "physical" ? (
                <div className="bg-white dark:bg-slate-800 border border-border rounded-xl p-6 space-y-4">
                  <h3 className="font-bold">Quick Activate — Enter your ICCID</h3>
                  <div>
                    <Input placeholder="e.g. 8901260000000000000"
                      value={iccid} onChange={e => { setIccid(e.target.value.replace(/\D/g, "")); setIccidError(""); }}
                      className={iccidError ? "border-red-400" : ""} maxLength={20} />
                    {iccidError && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{iccidError}</p>}
                    <p className="text-xs text-muted-foreground mt-1">Found on the back of your SIM card.</p>
                  </div>
                  <Button onClick={handleActivate} className="w-full bg-[#00D084] hover:bg-[#00b372] text-white font-bold">
                    Activate SIM <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              ) : (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    eSIM activation is completed through your device settings using the QR code sent to your email. 
                    If you need the QR code resent or need help, our AI assistant can guide you.
                  </p>
                  <Button className="mt-3 bg-[#0066FF] hover:bg-[#0052cc] text-white gap-2"
                    onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))}>
                    <MessageSquare className="w-4 h-4" /> Get eSIM Help from LIA
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-[#00D084]/10 border border-[#00D084]/30 rounded-2xl p-10">
              <div className="w-16 h-16 bg-[#00D084] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Activation Request Submitted!</h2>
              <p className="text-muted-foreground mb-1">ICCID: <span className="font-mono font-semibold">{iccid}</span></p>
              <p className="text-sm text-muted-foreground mb-6">Your SIM activation typically completes within 1 hour. You'll receive a confirmation SMS once active.</p>
              <Button onClick={() => { setSubmitted(false); setIccid(""); }} variant="outline">Activate Another SIM</Button>
            </motion.div>
          )}

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href="tel:18662773221">
              <Button variant="outline" className="gap-2 w-full sm:w-auto"><Phone className="w-4 h-4" /> Call for Support</Button>
            </a>
            <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white gap-2 w-full sm:w-auto"
              onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))}>
              <MessageSquare className="w-4 h-4" /> Chat with LIA
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
