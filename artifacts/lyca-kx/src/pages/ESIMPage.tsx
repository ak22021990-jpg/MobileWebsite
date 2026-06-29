import { motion } from "framer-motion";
import { Smartphone, Zap, Globe, Shield, Check, ChevronRight, Download, QrCode, Settings, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { Link } from "wouter";

const steps = [
  { icon: Download, title: "Purchase eSIM Online", desc: "Visit our website or call 1-866-277-3221. Choose your plan and select eSIM as your SIM type." },
  { icon: QrCode, title: "Receive QR Code", desc: "A QR code will be emailed to you instantly after purchase. Keep it ready on another device." },
  { icon: Settings, title: "Install the Profile", desc: "Go to Settings → Mobile Data → Add eSIM. Scan the QR code and follow the on-screen prompts." },
  { icon: Wifi, title: "Connect & Go", desc: "Your plan activates instantly. Enable the Lyca line and start making calls and using data immediately." },
];

const compatible = [
  "iPhone XS / XS Max / XR and newer", "iPhone SE (2nd & 3rd generation)",
  "Samsung Galaxy S21 and newer", "Google Pixel 3 and newer",
  "iPad Pro (2018 and newer)", "iPad Air (3rd gen+)", "iPad mini (5th gen+)",
];

export default function ESIMPage() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0E1F5C] to-[#0066FF] py-20 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-4 text-sm font-semibold">
            <Zap className="w-4 h-4 text-[#00D084]" /> Instant Activation
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Go Digital with Lyca eSIM</h1>
          <p className="text-xl text-blue-100 max-w-xl mx-auto mb-8">
            No physical SIM needed. Download your plan directly to your device and connect in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/plans">
              <Button className="bg-[#00D084] hover:bg-[#00b372] text-white font-bold px-8 py-6 text-base">
                Browse eSIM Plans
              </Button>
            </Link>
            <Link href="/activate">
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 px-8 py-6 text-base">
                Activate eSIM
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-14 px-4 bg-slate-50 dark:bg-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon: Zap, title: "Instant Setup", desc: "Activate in under 5 minutes — no waiting for shipping." },
              { icon: Globe, title: "Multiple Profiles", desc: "Keep your existing SIM and use Lyca eSIM simultaneously." },
              { icon: Shield, title: "Secure & Encrypted", desc: "Your eSIM profile is encrypted and locked to your device." },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-border shadow-sm">
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <f.icon className="w-6 h-6 text-[#0066FF]" />
                </div>
                <h3 className="font-bold mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-10">How to Set Up Your eSIM</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-border rounded-2xl p-5 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-[#0E1F5C] text-white flex items-center justify-center shrink-0 font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <step.icon className="w-4 h-4 text-[#0066FF]" />
                    <h3 className="font-bold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Devices */}
      <section className="py-14 px-4 bg-slate-50 dark:bg-transparent">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-[#0066FF]" /> Compatible Devices
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {compatible.map((device, i) => (
              <div key={i} className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-border rounded-xl p-3">
                <Check className="w-4 h-4 text-[#00D084] shrink-0" />
                <span className="text-sm">{device}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Your device must be carrier-unlocked. Contact your current carrier if unsure.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4 bg-[#0E1F5C] text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to go digital?</h2>
        <p className="text-blue-200 mb-6">Set up your eSIM in minutes — no store visit needed.</p>
        <div className="flex justify-center gap-3">
          <Link href="/plans">
            <Button className="bg-[#00D084] hover:bg-[#00b372] text-white gap-2">
              Get eSIM Now <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant="outline" className="border-white/40 text-white hover:bg-white/10"
            onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))}>
            Ask LIA for Help
          </Button>
        </div>
      </section>
    </PageLayout>
  );
}
