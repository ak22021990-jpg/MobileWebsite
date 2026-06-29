import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ThumbsUp, ThumbsDown, HelpCircle, Clock, Calendar } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const categories = [
  "Getting Started",
  "Account & Billing",
  "Service Management",
  "Device & Connectivity",
  "International Services",
  "Policies & Compliance"
];

const articles = {
  "Getting Started": [
    { id: "gs1", title: "How to activate your Lyca Mobile SIM", desc: "Step-by-step instructions to get your new SIM card working.", readTime: "3 min read", updatedDate: "Jun 18, 2026", content: "To activate your SIM card, insert it into your unlocked phone. Turn the phone on. Once it finds a signal, dial *100# and press call. Your balance will be displayed, and your SIM is now active. You can also activate online through our website by entering your SIM number (ICCID) and PUK code." },
    { id: "gs2", title: "Porting your existing number", desc: "Bring your current phone number to Lyca Mobile easily.", readTime: "5 min read", updatedDate: "Jun 20, 2026", content: "You can keep your current number when switching to Lyca Mobile. First, get your Account Number and PIN from your current provider. Then, either during activation or by calling customer service, request a number port. It usually takes 1-3 business days to complete." },
    { id: "gs3", title: "Setting up voicemail", desc: "How to initialize and secure your Lyca voicemail.", readTime: "2 min read", updatedDate: "Jun 15, 2026", content: "Dial 121 from your Lyca Mobile phone. Follow the voice prompts to set up your greeting and a 4-digit PIN. To check voicemail from another phone, call your Lyca number, press * when you hear the greeting, and enter your PIN." },
    { id: "gs4", title: "Finding your Lyca Mobile number", desc: "Ways to quickly check your assigned phone number.", readTime: "1 min read", updatedDate: "Jun 10, 2026", content: "If you don't know your Lyca Mobile number, simply dial *132# from your phone and press call. Your number will instantly appear on your screen." },
    { id: "gs5", title: "Understanding eSIM", desc: "What is an eSIM and how does it work with Lyca?", readTime: "4 min read", updatedDate: "Jun 22, 2026", content: "An eSIM is a digital SIM that allows you to activate a cellular plan without having to use a physical nano-SIM. You can install an eSIM directly from our website after purchase using a QR code." },
    { id: "gs6", title: "Checking device compatibility", desc: "Ensure your phone will work on our network.", readTime: "2 min read", updatedDate: "Jun 12, 2026", content: "Lyca Mobile USA operates on the T-Mobile network. To use our service, your phone must be unlocked and compatible with GSM bands 2, 4, 12, 66, or 71." }
  ],
  "Account & Billing": [
    { id: "ab1", title: "How to view your current balance", desc: "Check your remaining data, minutes, and texts.", readTime: "1 min read", updatedDate: "Jun 21, 2026", content: "Dial *611# from your Lyca Mobile to see your balance on-screen, or log into your online account. The My Lyca App also shows real-time balance." },
    { id: "ab2", title: "Setting up Auto-Renewal", desc: "Never miss a payment with automatic plan renewals.", readTime: "3 min read", updatedDate: "Jun 19, 2026", content: "Log into your account, go to 'Payment Methods', add a credit/debit card, and toggle 'Auto-Renewal' on for your active plan. You can turn this off at any time." },
    { id: "ab3", title: "Understanding your billing cycle", desc: "How our 30-day plans are calculated.", readTime: "4 min read", updatedDate: "Jun 8, 2026", content: "Lyca Mobile plans are valid for 30 days from the date of activation. If you activate on the 1st, your plan renews on the 31st." },
    { id: "ab4", title: "Updating payment methods", desc: "How to change or remove saved cards.", readTime: "2 min read", updatedDate: "Jun 14, 2026", content: "Go to 'My Account' > 'Payment Details'. Here you can add new cards, delete old ones, and select your default payment method." },
    { id: "ab5", title: "Viewing transaction history", desc: "Access your past recharges and plan purchases.", readTime: "2 min read", updatedDate: "Jun 11, 2026", content: "In your online account, navigate to the 'Billing History' tab. You can view and download receipts for all transactions in the last 12 months." },
    { id: "ab6", title: "Requesting a refund", desc: "Our policy and process for returning funds.", readTime: "3 min read", updatedDate: "Jun 17, 2026", content: "Refunds for unused plans must be requested within 14 days of purchase. Used plans or partial data usage are non-refundable. Contact support to initiate a request." }
  ],
  "Service Management": [
    { id: "sm1", title: "Changing your plan", desc: "Upgrade or downgrade your monthly plan.", readTime: "3 min read", updatedDate: "Jun 16, 2026", content: "You can change your plan at any time through your online account. Note: If you change mid-cycle, you will lose remaining benefits of your current plan. It's best to queue the change for your next renewal date." },
    { id: "sm2", title: "Adding extra data", desc: "What to do when you run out of high-speed data.", readTime: "2 min read", updatedDate: "Jun 20, 2026", content: "If you exceed your plan's high-speed data allowance, you can buy a Data Add-on. Text *139*PIN# or purchase via the website/app to add instant data." },
    { id: "sm3", title: "Pausing your service", desc: "Options for when you travel or don't need service.", readTime: "3 min read", updatedDate: "Jun 9, 2026", content: "We do not offer a formal 'pause' feature, but you can turn off Auto-Renewal. Your number remains valid for 90 days after your plan expires before deactivation." },
    { id: "sm4", title: "SIM replacement", desc: "How to get a new SIM if yours is lost or damaged.", readTime: "3 min read", updatedDate: "Jun 13, 2026", content: "Order a replacement SIM online or pick one up from a retailer. Call support to have your number and balance transferred to the new ICCID." },
    { id: "sm5", title: "Managing family lines", desc: "Control multiple numbers from one account.", readTime: "4 min read", updatedDate: "Jun 18, 2026", content: "With a Family Plan, the primary account holder can add up to 4 additional lines. Go to 'Family Management' in your account to invite members or pay for their plans." },
    { id: "sm6", title: "Canceling your service", desc: "Steps to close your Lyca Mobile account.", readTime: "2 min read", updatedDate: "Jun 7, 2026", content: "To cancel, simply turn off Auto-Renewal and stop recharging. Your service will end when your plan expires, and the number will be recycled after 90 days of inactivity." }
  ],
  "Device & Connectivity": [
    { id: "dc1", title: "APN Settings Guide", desc: "Configure your phone to connect to our mobile internet.", readTime: "5 min read", updatedDate: "Jun 22, 2026", content: "If data isn't working, check your APN. Name: Lyca Mobile. APN: data.lycamobile.com. Leave username and password blank. Restart your phone after saving." },
    { id: "dc2", title: "Setting up Personal Hotspot", desc: "How to share your Lyca data with other devices.", readTime: "3 min read", updatedDate: "Jun 17, 2026", content: "Ensure your plan includes tethering. Go to Settings > Personal Hotspot (iOS) or Network > Tethering (Android) and toggle it on. Set a strong password." },
    { id: "dc3", title: "WiFi Calling setup", desc: "Make calls over WiFi when cellular signal is weak.", readTime: "4 min read", updatedDate: "Jun 20, 2026", content: "First, register your E911 address in your Lyca account. Then, go to your phone's cellular settings and enable WiFi Calling." },
    { id: "dc4", title: "Troubleshooting 'No Service'", desc: "Steps to fix signal drops and connection issues.", readTime: "4 min read", updatedDate: "Jun 23, 2026", content: "1. Toggle Airplane mode. 2. Restart phone. 3. Check network selection is set to Automatic. 4. Ensure SIM is seated properly. 5. Check coverage map for your area." },
    { id: "dc5", title: "5G vs 4G LTE", desc: "Understanding our network speeds and availability.", readTime: "3 min read", updatedDate: "Jun 15, 2026", content: "Lyca offers 5G at no extra cost on compatible devices in covered areas. If 5G is unavailable, your device will automatically drop to 4G LTE." },
    { id: "dc6", title: "SIM Not Supported error", desc: "What to do if your phone rejects the Lyca SIM.", readTime: "2 min read", updatedDate: "Jun 11, 2026", content: "This usually means your phone is locked to your previous carrier. You must contact them to request a network unlock before using Lyca." }
  ],
  "International Services": [
    { id: "is1", title: "How to make international calls", desc: "Dialing formats and country codes.", readTime: "2 min read", updatedDate: "Jun 19, 2026", content: "To call internationally, dial: 011 + Country Code + Phone Number. Or dial: + + Country Code + Phone Number." },
    { id: "is2", title: "Adding International Credit", desc: "Pay-as-you-go balance for non-included countries.", readTime: "3 min read", updatedDate: "Jun 16, 2026", content: "If your country isn't in the unlimited list, you need International Credit. Recharge this separately from your plan via your account dashboard." },
    { id: "is3", title: "Using Lyca while roaming abroad", desc: "Rates and setup for using your phone outside the US.", readTime: "5 min read", updatedDate: "Jun 21, 2026", content: "International roaming must be enabled in your account. You will be charged per MB, minute, and text from your Roaming Credit balance while abroad." },
    { id: "is4", title: "Unlimited International lists", desc: "Which countries are included in your plan.", readTime: "4 min read", updatedDate: "Jun 18, 2026", content: "Most plans include unlimited calls to 75+ countries including Mexico, Canada, UK, India, and China. Check your specific plan details for the exact list." },
    { id: "is5", title: "Texting internationally", desc: "SMS/MMS policies for foreign numbers.", readTime: "2 min read", updatedDate: "Jun 14, 2026", content: "Unlimited international texting is included in all our monthly plans at no extra charge to over 100 countries." },
    { id: "is6", title: "Troubleshooting international calls", desc: "Why your call might not be connecting.", readTime: "3 min read", updatedDate: "Jun 10, 2026", content: "Ensure you are using the correct country code. Check if the destination is included in your plan, or if you have sufficient International Credit." }
  ],
  "Policies & Compliance": [
    { id: "pc1", title: "Acceptable Use Policy", desc: "Rules for data and voice usage on our network.", readTime: "4 min read", updatedDate: "Jun 1, 2026", content: "Our unlimited plans are for personal, non-commercial use. Excessive data usage or continuous automated calling may result in speed throttling or suspension." },
    { id: "pc2", title: "Privacy Policy", desc: "How we collect, use, and protect your data.", readTime: "6 min read", updatedDate: "Jun 1, 2026", content: "We do not sell your personal data to third parties. Information is only used to provide service, process billing, and comply with legal requirements." },
    { id: "pc3", title: "Terms and Conditions", desc: "The legal agreement between you and Lyca Mobile.", readTime: "8 min read", updatedDate: "Jun 1, 2026", content: "By activating service, you agree to our terms including binding arbitration, billing practices, and service limitations." },
    { id: "pc4", title: "Data Throttling explained", desc: "What happens after you use your high-speed allowance.", readTime: "3 min read", updatedDate: "Jun 8, 2026", content: "On 'Unlimited' data plans, speeds are reduced to 128kbps or 256kbps (depending on the plan) after the high-speed allotment is consumed." },
    { id: "pc5", title: "CPNI & E911 Information", desc: "Important details about emergency services.", readTime: "4 min read", updatedDate: "Jun 4, 2026", content: "When using WiFi Calling, you must provide a valid physical address for emergency responders. Location accuracy may be lower than traditional cellular 911." },
    { id: "pc6", title: "Unlocking Policy", desc: "Rules for unlocking Lyca-purchased devices.", readTime: "3 min read", updatedDate: "Jun 12, 2026", content: "Phones purchased directly from Lyca Mobile must be active on our network for 12 continuous months before they are eligible for unlocking." }
  ]
};

// Unique FAQs — not duplicating any trending/knowledge article topics
const faqs = [
  {
    id: "faq1",
    question: "Can I use a Lyca Mobile SIM in an iPad or tablet?",
    answer: "Yes! Lyca Mobile SIMs and eSIMs work in any unlocked tablet that supports cellular data. Note that voice calls are not available on most tablets — you'll have data and SMS only. For voice, you'd need a compatible device or use apps like WhatsApp.",
    updatedDate: "Jun 20, 2026",
  },
  {
    id: "faq2",
    question: "What happens to my unused data when my plan expires?",
    answer: "Unused data does not carry over — it expires with your plan. To avoid losing data, set up Auto-Renewal so your plan renews seamlessly before the expiry date. You can enable this in your account under 'Payment Methods.'",
    updatedDate: "Jun 22, 2026",
  },
  {
    id: "faq3",
    question: "Can two people share one Lyca Mobile account?",
    answer: "One Lyca account is tied to one phone number and one primary user. However, with a Family Plan, the account holder can manage up to 4 additional lines under a single account, with separate numbers and data allowances for each person.",
    updatedDate: "Jun 18, 2026",
  },
  {
    id: "faq4",
    question: "Does Lyca Mobile offer senior or military discounts?",
    answer: "Lyca Mobile currently does not offer specific senior or military discount programs. However, our prepaid plans are already among the most affordable on the market — starting from just $3/month — making them an excellent value for all customers.",
    updatedDate: "Jun 15, 2026",
  },
  {
    id: "faq5",
    question: "How do I check if Lyca covers my area before I buy?",
    answer: "Visit lycamobile.us/coverage and enter your zip code to see coverage maps for both 4G LTE and 5G in your area. You can also check indoor vs. outdoor coverage. We recommend checking before purchasing to ensure service quality meets your needs.",
    updatedDate: "Jun 21, 2026",
  },
  {
    id: "faq6",
    question: "Can I receive international calls on my Lyca Mobile number?",
    answer: "Absolutely — your US Lyca number can receive calls from any country, 24/7. Callers from abroad dial your US number just like any other US mobile. Incoming calls are always free for you; the calling party pays international rates from their end.",
    updatedDate: "Jun 19, 2026",
  },
  {
    id: "faq7",
    question: "My SIM card got wet or physically damaged — what do I do?",
    answer: "If your SIM is damaged, order a replacement SIM from lycamobile.us or pick one up at a retail location. Once you have the new SIM, call 1-866-277-3221 and our team will transfer your number, balance, and active plan to the new ICCID at no charge.",
    updatedDate: "Jun 17, 2026",
  },
  {
    id: "faq8",
    question: "How do I update my name, address, or email on my Lyca account?",
    answer: "Log in at lycamobile.us → 'My Account' → 'Personal Details.' You can update your name, email address, billing address, and notification preferences there. For changes to your primary email or phone number, you may need to verify your identity via a one-time code.",
    updatedDate: "Jun 23, 2026",
  },
];

export function KnowledgeCenter() {
  const [activeTab, setActiveTab] = useState(categories[0]);
  const [feedbackGiven, setFeedbackGiven] = useState<Record<string, boolean>>({});

  const handleFeedback = (articleId: string, helpful: boolean) => {
    setFeedbackGiven(prev => ({ ...prev, [articleId]: helpful }));
  };

  return (
    <section className="py-20 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/20" id="knowledge">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Knowledge Center</h2>
          <p className="text-muted-foreground text-lg">Browse our comprehensive library of support articles — updated weekly.</p>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 mb-8 gap-2 border-b border-border pb-px">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-4 py-3 text-sm font-semibold transition-all border-b-2 ${
                activeTab === cat
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <AnimatePresence mode="popLayout">
            {articles[activeTab as keyof typeof articles]?.map((article, idx) => (
              <motion.div key={article.id}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <Accordion type="single" collapsible>
                  <AccordionItem value={article.id} className="border-0">
                    <AccordionTrigger className="hover:no-underline px-6 py-5 data-[state=open]:bg-slate-50 dark:data-[state=open]:bg-slate-800/50 transition-colors">
                      <div className="flex flex-col items-start text-left gap-2 w-full pr-4">
                        <div className="flex items-center gap-2 w-full">
                          <div className="bg-[#00D084]/10 text-[#00D084] dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                            {activeTab}
                          </div>
                          <div className="ml-auto flex items-center gap-1 text-[10px] text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            <span>Updated {article.updatedDate}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg leading-tight">{article.title}</h3>
                        <p className="text-sm text-muted-foreground font-normal line-clamp-1">{article.desc}</p>
                        <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {article.readTime}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-6 pt-2">
                      <div className="prose prose-sm dark:prose-invert max-w-none mb-6">
                        <p className="text-base leading-relaxed text-foreground/80">{article.content}</p>
                      </div>

                      <div className="border-t border-border pt-6 mt-6">
                        <h4 className="text-sm font-semibold mb-3">Related Articles</h4>
                        <ul className="space-y-2 mb-8">
                          {[1, 2, 3].map(i => (
                            <li key={i}>
                              <a href="#" className="text-sm text-primary hover:underline flex items-center">
                                <ChevronRight className="h-3 w-3 mr-1" />
                                {articles[activeTab as keyof typeof articles][(idx + i) % 6]?.title || "Related topic"}
                              </a>
                            </li>
                          ))}
                        </ul>

                        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <span className="text-sm font-medium">Was this article helpful?</span>
                          {feedbackGiven[article.id] !== undefined ? (
                            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Thanks for your feedback!</span>
                          ) : (
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" onClick={() => handleFeedback(article.id, true)} className="gap-2">
                                <ThumbsUp className="h-4 w-4" /> Yes
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleFeedback(article.id, false)} className="gap-2">
                                <ThumbsDown className="h-4 w-4" /> No
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-[#0066FF]/10 text-[#0066FF] text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> Help Center
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
              Frequently Asked Questions (FAQs)
            </h3>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, idx) => (
              <motion.div key={faq.id}
                initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                <AccordionItem value={faq.id} className="bg-white dark:bg-slate-800 border border-border rounded-xl overflow-hidden shadow-sm px-5 data-[state=open]:shadow-md">
                  <AccordionTrigger className="hover:no-underline py-4 text-left [&>svg]:shrink-0">
                    <div className="flex items-start gap-3 w-full pr-3">
                      <div className="w-7 h-7 rounded-full bg-[#0066FF]/10 flex items-center justify-center shrink-0 mt-0.5">
                        <HelpCircle className="w-4 h-4 text-[#0066FF]" />
                      </div>
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-semibold text-sm">{faq.question}</p>
                        <p className="text-[10px] text-muted-foreground mt-1 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Updated {faq.updatedDate}
                        </p>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-10 pb-4 pt-1 border-t border-border">
                      <p className="text-sm text-foreground/80 leading-relaxed">{faq.answer}</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <div className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Still have questions?{" "}
              <button
                onClick={() => window.dispatchEvent(new Event("openAIAssistant"))}
                className="text-[#0066FF] font-semibold hover:underline">
                Ask LIA, our AI assistant
              </button>
              {" "}or call us at{" "}
              <a href="tel:18662773221" className="text-[#0066FF] font-semibold hover:underline">1-866-277-3221</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
