import { useState } from "react";
import { motion } from "framer-motion";
import { Gift, Share2, DollarSign, Users, Copy, Check, ChevronRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageLayout } from "@/components/layout/PageLayout";

const steps = [
  { icon: Share2, title: "Share Your Referral Link", desc: "Get your unique link and share it with friends and family via text, email, or social media." },
  { icon: Users, title: "Friend Signs Up", desc: "Your friend uses your link to purchase a new Lyca Mobile plan or SIM card." },
  { icon: DollarSign, title: "You Both Get Rewarded", desc: "You get $5 credit added to your account, and your friend gets a discount on their first month." },
];

export default function ReferPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://lycamobile.us/refer?code=LYCA-YOURCODE";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=Join%20Lyca%20Mobile%20and%20save!%20${encodeURIComponent(referralLink)}`, color: "bg-green-500 hover:bg-green-600" },
    { label: "SMS", href: `sms:?body=Join%20Lyca%20Mobile%20using%20my%20link:%20${encodeURIComponent(referralLink)}`, color: "bg-blue-500 hover:bg-blue-600" },
    { label: "Email", href: `mailto:?subject=Join%20Lyca%20Mobile&body=Use%20my%20referral%20link:%20${encodeURIComponent(referralLink)}`, color: "bg-gray-700 hover:bg-gray-800" },
  ];

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0E1F5C] to-[#0066FF] py-20 px-4 text-white text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-20 h-20 bg-[#00D084] rounded-full flex items-center justify-center mx-auto mb-5">
            <Gift className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">Refer a Friend & Earn $5</h1>
          <p className="text-xl text-blue-100 max-w-xl mx-auto">
            Share the Lyca Mobile experience. Every time a friend joins using your link, you both get rewarded.
          </p>
        </motion.div>
      </section>

      {/* Referral Card */}
      <section className="py-14 px-4">
        <div className="container mx-auto max-w-xl">
          <div className="bg-white dark:bg-slate-800 border border-border rounded-2xl p-8 shadow-xl text-center">
            <h2 className="font-bold text-xl mb-2">Your Referral Link</h2>
            <p className="text-sm text-muted-foreground mb-5">Share this link to earn rewards when friends activate a plan.</p>
            <div className="flex items-center gap-2 mb-4">
              <Input readOnly value={referralLink} className="flex-1 text-xs bg-slate-50 dark:bg-slate-700 font-mono" />
              <Button onClick={handleCopy} className={`shrink-0 gap-2 ${copied ? "bg-[#00D084] hover:bg-[#00D084]" : "bg-[#0066FF] hover:bg-[#0052cc]"} text-white`}>
                {copied ? <><Check className="w-4 h-4" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy</>}
              </Button>
            </div>
            <div className="flex gap-2 justify-center">
              {shareLinks.map(sl => (
                <a key={sl.label} href={sl.href} target="_blank" rel="noopener noreferrer">
                  <Button className={`${sl.color} text-white text-xs px-4`}>{sl.label}</Button>
                </a>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              * You must have an active Lyca Mobile plan to refer. Log in at lycamobile.us to get your unique code.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-14 px-4 bg-slate-50 dark:bg-transparent">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="bg-white dark:bg-slate-800 border border-border rounded-2xl p-6 text-center shadow-sm">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#0E1F5C] flex items-center justify-center text-white font-bold text-lg">{i + 1}</div>
                </div>
                <step.icon className="w-7 h-7 text-[#0066FF] mx-auto mb-2" />
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rewards breakdown */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-[#0E1F5C] text-white rounded-2xl p-8">
            <h2 className="text-xl font-bold text-center mb-6">Reward Summary</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <DollarSign className="w-8 h-8 text-[#00D084] mx-auto mb-1" />
                <p className="text-3xl font-extrabold">$5</p>
                <p className="text-sm text-blue-200">You receive per referral</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4 text-center">
                <Gift className="w-8 h-8 text-[#00D084] mx-auto mb-1" />
                <p className="text-3xl font-extrabold">No Limit</p>
                <p className="text-sm text-blue-200">Maximum referrals</p>
              </div>
            </div>
            <p className="text-center text-blue-200 text-xs mt-4">Rewards applied within 3–5 business days after your friend activates their plan.</p>
          </div>
        </div>
      </section>

      <section className="py-10 px-4 text-center border-t border-border">
        <p className="text-muted-foreground mb-3">Questions about the Refer a Friend program?</p>
        <div className="flex justify-center gap-3">
          <Button className="bg-[#0066FF] hover:bg-[#0052cc] text-white gap-2"
            onClick={() => window.dispatchEvent(new CustomEvent("openAIAssistant"))}>
            <ChevronRight className="w-4 h-4" /> Ask LIA
          </Button>
          <a href="tel:18662773221">
            <Button variant="outline" className="gap-2"><Phone className="w-4 h-4" /> Call Us</Button>
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
