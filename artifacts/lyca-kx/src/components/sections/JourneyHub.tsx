import { useState } from "react";
import { UserPlus, Settings2, Wifi, CreditCard, Globe, Headphones, ChevronRight, MessageSquare, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ArticleModal } from "@/components/shared/ArticleModal";
import { findArticleById, type Article } from "@/data/articles";

interface CardContent {
  q: string;
  a: string;
  steps?: string[];
  articleId?: string;
}

const cards = [
  {
    id: "new-customer",
    icon: UserPlus,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    title: "New Customer",
    tasks: ["Join Lyca", "Activate Service", "Transfer Number"],
    content: [
      {
        q: "How do I join Lyca Mobile?",
        a: "You can order a SIM card online at lycamobile.us, purchase an eSIM, or visit an authorized retailer near you.",
        steps: ["Visit lycamobile.us/plans to choose your plan", "Select a SIM (physical or eSIM) and complete checkout", "You'll receive your SIM or eSIM QR code by email", "Follow the activation guide to go live"],
        articleId: "gs1"
      },
      {
        q: "How do I activate my new SIM card?",
        a: "Activation takes just a few minutes online or by phone.",
        steps: ["Insert SIM into your unlocked, powered-off phone", "Power on and wait for network signal", "Dial *100# — your balance displays = activated!", "Or activate online at lycamobile.us/activate with ICCID + PUK"],
        articleId: "gs1"
      },
      {
        q: "Can I keep my existing phone number?",
        a: "Yes — porting your number to Lyca is free and usually completes in 1–3 business days.",
        steps: ["Get your Account Number and PIN from your current carrier", "Do NOT cancel your current service yet", "Start activation at lycamobile.us → select 'Transfer my number'", "Enter your number, account number, and PIN", "Your number transfers automatically within 1–3 business days"],
        articleId: "gs2"
      }
    ]
  },
  {
    id: "account",
    icon: Settings2,
    color: "text-[#0E1F5C] dark:text-blue-400",
    bg: "bg-slate-100 dark:bg-slate-800",
    title: "Account Management",
    tasks: ["Recharge", "Renew Plans", "Manage Account"],
    content: [
      {
        q: "How do I recharge my account?",
        a: "There are multiple quick ways to top up your Lyca account.",
        steps: ["Online: lycamobile.us → Quick Recharge → enter your number and pay", "App: My Lyca App → Recharge tab → choose amount", "USSD: Dial *611# from your Lyca phone", "Phone: Call 1-866-277-3221 (automated payment)"],
        articleId: "rc1"
      },
      {
        q: "How does plan auto-renewal work?",
        a: "Auto-renewal charges your saved card automatically on your plan's expiry date so you never lose service.",
        steps: ["Log in at lycamobile.us → My Account → Payment Methods", "Add a credit or debit card", "Go to My Plans → toggle Auto-Renewal ON", "You'll get a reminder email 3 days before each renewal"],
        articleId: "ab2"
      },
      {
        q: "How do I check my remaining data and balance?",
        a: "Real-time balance is available via USSD, app, or online account.",
        steps: ["Dial *611# from your Lyca phone (fastest)", "Open My Lyca App → Home screen shows balance", "Log in at lycamobile.us → Dashboard", "Text BAL to 22555 to receive balance by SMS"],
        articleId: "ab1"
      }
    ]
  },
  {
    id: "device",
    icon: Wifi,
    color: "text-[#00D084]",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    title: "Device & Connectivity",
    tasks: ["Data Issues", "APN Settings", "WiFi Calling"],
    content: [
      {
        q: "My mobile data isn't working — what do I do?",
        a: "Data issues are usually fixed by configuring APN settings. Here's how:",
        steps: ["Go to your phone's APN/Mobile Network settings", "Add or edit: Name = Lyca Mobile, APN = data.lycamobile.com", "Leave Username and Password blank", "Save settings and restart your phone", "Ensure Mobile Data is toggled ON in your settings"],
        articleId: "dc1"
      },
      {
        q: "What are the correct APN settings?",
        a: "Use these exact values for Lyca Mobile APN configuration.",
        steps: ["Name: Lyca Mobile", "APN: data.lycamobile.com", "Username: (blank)", "Password: (blank)", "MCC: 310 | MNC: 260", "Save and restart your phone"],
        articleId: "dc1"
      },
      {
        q: "How do I enable WiFi Calling?",
        a: "Make calls over WiFi when cellular signal is weak — here's the setup process.",
        steps: ["Update your E911 address at lycamobile.us → My Account → Profile", "iPhone: Settings → Cellular → Wi-Fi Calling → ON", "Android: Phone app → Settings → Wi-Fi Calling → Enable", "Confirm your emergency address when prompted", "Test by making a call — you'll see a WiFi indicator"],
        articleId: "dc3"
      }
    ]
  },
  {
    id: "billing",
    icon: CreditCard,
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    title: "Billing & Payments",
    tasks: ["Transactions", "Refunds", "Payment Methods"],
    content: [
      {
        q: "Where can I view my transaction history?",
        a: "All past charges and recharges are stored in your account billing history.",
        steps: ["Log in at lycamobile.us", "Go to My Account → Billing History", "See all transactions from the past 12 months", "Click any transaction to see full details", "Click Download PDF to save a receipt"],
        articleId: "ab5"
      },
      {
        q: "What payment methods does Lyca accept?",
        a: "We accept all major credit and debit cards plus digital wallets.",
        steps: ["Visa, Mastercard, American Express, Discover", "PayPal", "Apple Pay (iOS devices)", "Google Pay (Android devices)", "Lyca recharge cards (available at major retailers)"],
        articleId: "ab4"
      },
      {
        q: "How do I request a refund?",
        a: "Unused plan refunds are available within 14 days of purchase.",
        steps: ["Contact support within 14 days of your purchase", "Call 1-866-277-3221 or dial 612 from your Lyca phone", "Provide account number, transaction date, and reason", "Approved refunds go back to your original payment method", "Allow 5–10 business days for the refund to appear"],
        articleId: "ab6"
      }
    ]
  },
  {
    id: "international",
    icon: Globe,
    color: "text-[#0E1F5C] dark:text-blue-400",
    bg: "bg-slate-100 dark:bg-slate-800",
    title: "International Services",
    tasks: ["Calling Rates", "Coverage", "International Credit"],
    content: [
      {
        q: "How much do international calls cost?",
        a: "Most Lyca plans include unlimited calls to 75+ countries at no extra charge.",
        steps: ["Check your plan's included countries at lycamobile.us → Plan Details", "For included countries: calls are free (0¢/min)", "For other countries: add International Credit and pay per minute", "Find per-minute rates at lycamobile.us/calling-rates", "Common free countries: Mexico, UK, India, China, Pakistan, Nigeria, Canada"],
        articleId: "is1"
      },
      {
        q: "How do I add International Credit?",
        a: "International Credit is a separate pay-as-you-go balance for countries not in your plan.",
        steps: ["Log in at lycamobile.us", "Go to International Calls → Add International Credit", "Choose $5, $10, $20, or $50", "Pay with your saved card — credit added instantly", "Check balance by dialing *611# or in your account dashboard"],
        articleId: "is2"
      },
      {
        q: "Can I use my Lyca SIM while traveling abroad?",
        a: "Yes, international roaming is supported in many countries.",
        steps: ["Before traveling: enable Roaming at lycamobile.us → My Account → Roaming Settings", "Add Roaming Credit to your account", "On arrival: your phone auto-connects to a partner network", "If not: Settings → Network → Manual → select a local carrier", "WiFi Calling over hotel WiFi uses standard plan rates — no roaming charge"],
        articleId: "is3"
      }
    ]
  },
  {
    id: "support",
    icon: Headphones,
    color: "text-[#00D084]",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    title: "Support",
    tasks: ["Live Chat", "Contact Support", "Service Requests"],
    content: [
      {
        q: "How do I reach Lyca customer support?",
        a: "Multiple channels are available — choose what works best for you.",
        steps: ["Call: 1-866-277-3221 (Mon–Sat 8AM–10PM EST, Sun 9AM–8PM EST)", "Dial 612 from your Lyca Mobile phone (free)", "Live Chat: lycamobile.us/help-support → click Chat with Us", "Email: support@lycamobile.com", "Social: @lycamobileusa on Twitter/X or Facebook DM"],
        articleId: "sp1"
      },
      {
        q: "What are your support hours?",
        a: "Our team is available 7 days a week.",
        steps: ["Monday to Saturday: 8:00 AM – 10:00 PM EST", "Sunday: 9:00 AM – 8:00 PM EST", "Live Chat is available during the same hours", "For urgent issues, call 1-866-277-3221 directly"],
        articleId: "sp1"
      },
      {
        q: "How do I track a service request or complaint?",
        a: "Service requests can be tracked online once submitted.",
        steps: ["Log in at lycamobile.us", "Go to My Account → Support Tickets", "Find your open or closed tickets with status updates", "Click any ticket for detailed notes and agent replies", "To escalate: call 1-866-277-3221 and quote your ticket number"],
        articleId: "sp1"
      }
    ]
  }
];

export function JourneyHub() {
  const [activeCard, setActiveCard] = useState<typeof cards[0] | null>(null);
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showCallInfo, setShowCallInfo] = useState(false);

  const openLiveChat = () => {
    setActiveCard(null);
    window.dispatchEvent(new CustomEvent("openAIAssistant"));
  };

  const openCallSupport = () => {
    setShowCallInfo(true);
  };

  return (
    <>
      <section id="journey-hub" className="py-20 px-4 md:px-6 bg-slate-50/50 dark:bg-background">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">What do you need help with?</h2>
            <p className="text-muted-foreground text-lg">Select a category to find guides and manage your services.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setActiveCard(card)}
                data-testid={`journey-card-${card.id}`}
                className="bg-card border border-border rounded-2xl p-6 cursor-pointer shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${card.bg}`}>
                  <card.icon className={`h-7 w-7 ${card.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">{card.title}</h3>
                <ul className="space-y-2">
                  {card.tasks.map((task, i) => (
                    <li key={i} className="flex items-center text-muted-foreground text-sm font-medium">
                      <ChevronRight className="h-4 w-4 mr-2 text-primary/50 group-hover:text-primary transition-colors" />
                      {task}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Modal */}
      <Dialog open={!!activeCard} onOpenChange={(open) => !open && setActiveCard(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0 border-0 rounded-2xl overflow-hidden">
          {activeCard && (
            <>
              <div className={`p-8 ${activeCard.bg} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-10">
                  <activeCard.icon className="w-48 h-48" />
                </div>
                <div className="relative z-10 flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    <activeCard.icon className={`h-6 w-6 ${activeCard.color}`} />
                  </div>
                  <DialogTitle className="text-2xl font-bold">{activeCard.title}</DialogTitle>
                </div>
                <DialogDescription className="text-muted-foreground relative z-10">
                  Tap a topic below for step-by-step instructions.
                </DialogDescription>
              </div>

              <div className="p-6 md:p-8">
                <Accordion type="single" collapsible className="w-full">
                  {activeCard.content.map((item: CardContent, i: number) => (
                    <AccordionItem key={i} value={`item-${i}`} className="border-b-border/50">
                      <AccordionTrigger className="text-left font-semibold text-base hover:no-underline hover:text-primary transition-colors py-4">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <p className="text-muted-foreground text-sm mb-3">{item.a}</p>
                        {item.steps && (
                          <ol className="space-y-2 mb-4">
                            {item.steps.map((step: string, si: number) => (
                              <li key={si} className="flex items-start gap-3">
                                <span className="mt-0.5 w-5 h-5 rounded-full bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold flex items-center justify-center shrink-0">{si + 1}</span>
                                <span className="text-sm text-foreground">{step}</span>
                              </li>
                            ))}
                          </ol>
                        )}
                        {item.articleId && (
                          <button
                            onClick={() => {
                              const art = findArticleById(item.articleId!);
                              if (art) setActiveArticle(art);
                            }}
                            className="text-xs text-[#0066FF] hover:underline flex items-center gap-1 font-medium"
                          >
                            View full guide <ChevronRight className="w-3 h-3" />
                          </button>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>

                <div className="mt-10 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 border border-border">
                  <h4 className="font-semibold mb-4 text-center">Still need help?</h4>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      variant="outline"
                      className="gap-2 bg-white dark:bg-transparent"
                      data-testid="live-chat-btn"
                      onClick={openLiveChat}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Start Live Chat
                    </Button>
                    <Button
                      className="gap-2 bg-[#0E1F5C] hover:bg-[#1a3385] text-white"
                      data-testid="call-support-btn"
                      onClick={openCallSupport}
                    >
                      <Phone className="h-4 w-4" />
                      Call Support
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Call Support Info Modal */}
      <AnimatePresence>
        {showCallInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCallInfo(false)}
            className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background border border-border rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
            >
              <div className="w-16 h-16 bg-[#0E1F5C] rounded-full flex items-center justify-center mx-auto mb-5">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-1">Call Support</h3>
              <p className="text-muted-foreground text-sm mb-5">Our agents are ready to help you right now.</p>
              <a
                href="tel:18662773221"
                className="block text-2xl font-extrabold text-[#0066FF] hover:text-[#0052cc] mb-1 transition-colors"
              >
                1-866-277-3221
              </a>
              <p className="text-xs text-muted-foreground mb-2">Free from any phone</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-1">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Mon–Sat: 8:00 AM – 10:00 PM EST
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                Sunday: 9:00 AM – 8:00 PM EST
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Or dial <strong>612</strong> from your Lyca Mobile phone (free)
              </p>
              <Button
                onClick={() => setShowCallInfo(false)}
                variant="outline"
                className="w-full"
              >
                Close
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Article Viewer from Journey Hub */}
      <ArticleModal
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
        onRelatedClick={(id) => {
          const art = findArticleById(id);
          if (art) setActiveArticle(art);
        }}
      />
    </>
  );
}
