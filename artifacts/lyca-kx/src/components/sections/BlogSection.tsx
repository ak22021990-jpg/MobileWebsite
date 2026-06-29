import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, Wifi, Smartphone, Globe, CreditCard, Star, MapPin, X, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const BASE_BLOG = "https://www.lycamobile.us/en/blog";

// 10 blog posts — weekly rotation shows 6 at a time (changes each ISO week)
const ALL_BLOGS = [
  {
    id: 1,
    title: "The 2026 Guide to Choosing American SIM Cards for Tourists",
    excerpt: "Planning to visit the USA? Here's everything you need to know about choosing the right prepaid SIM card — from coverage and data speeds to cost and activation.",
    date: "May 21, 2026",
    author: "Lyca Mobile",
    category: "Travel Tips",
    href: `${BASE_BLOG}/2026-guide-american-sim-cards-tourists/`,
    icon: MapPin,
    gradient: "from-[#0E1F5C] to-[#0066FF]",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "Visiting the USA? Getting connected is one of the most important things to do on arrival. A good prepaid SIM card means you have access to navigation, communication, and data without paying sky-high roaming charges from your home carrier.\n\nWhen choosing an American SIM, consider these key factors:\n\n1. **Network coverage** — The USA has four main networks: T-Mobile, AT&T, Verizon, and US Cellular. Lyca Mobile USA runs on T-Mobile's network, giving you coverage in 99% of the US population.\n\n2. **Data speeds** — Look for plans that include 4G LTE or 5G for smooth video calls and fast streaming. Lyca's $24/month plan includes 5GB of high-speed data with unlimited calling.\n\n3. **International calling** — If you need to call home frequently, look for plans with international minutes included. Lyca offers calls to 75+ countries at no extra charge.\n\n4. **Activation time** — Some SIMs take hours to activate. Lyca activates instantly online or via our app — perfect for travelers who land and need to get online immediately.\n\n5. **eSIM compatibility** — If you have a modern smartphone, an eSIM (digital SIM) means zero wait time — download the profile in minutes using a QR code.\n\nFor most tourists visiting the USA for under 30 days, a $19–$29 monthly prepaid plan from Lyca Mobile offers the best value.",
  },
  {
    id: 2,
    title: "Travel SIM Cards in the USA: Here's How to Choose the Right One",
    excerpt: "With so many travel SIM options available, making the right choice matters. We break down what separates a great travel SIM from a costly mistake.",
    date: "May 19, 2026",
    author: "Lyca Mobile",
    category: "eSIM & SIM",
    href: `${BASE_BLOG}/travel-sim-cards-usa/`,
    icon: Globe,
    gradient: "from-[#0066FF] to-[#0044cc]",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "Navigating the US SIM card market can feel overwhelming — there are dozens of providers, all claiming to offer the best deal. Here's what actually matters:\n\n**Price vs. Value**\nThe cheapest SIM isn't always the best deal. A $5 SIM with only 500MB of data will run out in hours if you're using maps and streaming. Look at the cost per GB of data to compare plans fairly.\n\n**Contract vs. Prepaid**\nFor travelers, prepaid always wins. No credit check, no contract, no cancellation fees. Buy what you need for your trip duration and move on.\n\n**Network quality**\nAsk which underlying network the MVNO uses. Lyca Mobile uses T-Mobile's network — one of the fastest and most widely available 5G networks in the US, covering major cities and rural highways alike.\n\n**Customer support**\nFor tourists, easy customer support is essential. Look for providers with English-language phone and chat support available during US business hours.\n\n**SIM vs. eSIM**\nIf your phone supports eSIM (iPhone XS or newer, most Android flagships from 2020+), an eSIM eliminates the wait for a physical card to arrive. Just scan a QR code and you're online.\n\nLyca Mobile ticks all these boxes, making it one of the most popular choices for international visitors to the United States.",
  },
  {
    id: 3,
    title: "How to Earn Money with Lycamobile US Refer a Friend Program",
    excerpt: "Share Lyca with friends and family and earn cash rewards every time someone joins. Learn how the referral program works and start earning today.",
    date: "May 19, 2026",
    author: "Lyca Mobile",
    category: "Offers & Rewards",
    href: `${BASE_BLOG}/earn-money-lycamobile-refer-a-friend/`,
    icon: CreditCard,
    gradient: "from-[#00D084] to-[#00a066]",
    imageUrl: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "Did you know you can earn cash by simply sharing Lyca Mobile with the people you care about? Our Refer a Friend program rewards you for spreading the word — and there's no limit to how much you can earn.\n\n**How it works:**\n\n1. Log in to your Lyca Mobile account and navigate to the 'Refer a Friend' section.\n2. Share your unique referral link via text, WhatsApp, email, or social media.\n3. When your friend signs up and activates a plan using your link, you both receive a reward.\n4. Rewards are credited to your account within 5 business days.\n\n**What do you earn?**\nCurrently, successful referrals earn you $5 in account credit per person. That's a free month of our entry-level plan for every 3 or 4 friends you refer!\n\n**Tips to maximize your earnings:**\n- Share with family members who call internationally — Lyca is a natural fit for them.\n- Post in community groups where people might be looking for affordable mobile plans.\n- Remind friends that Lyca has no contracts and plans start from just $3/month.\n\nThere's no cap on how many friends you can refer, so the earning potential is unlimited.",
  },
  {
    id: 4,
    title: "How to Set Up eSIM on iPhone and Android in 2026",
    excerpt: "Step-by-step guide to activating your Lyca Mobile eSIM profile — no physical SIM card needed. Get connected in minutes on any eSIM-compatible device.",
    date: "June 5, 2026",
    author: "Lyca Mobile",
    category: "eSIM & SIM",
    href: `${BASE_BLOG}/setup-esim-iphone-android-2026/`,
    icon: Smartphone,
    gradient: "from-[#1a0ea0] to-[#0066FF]",
    imageUrl: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "eSIM technology has made activating mobile service faster and more convenient than ever. Here's how to set up your Lyca Mobile eSIM on both iPhone and Android devices.\n\n**Before you start:**\n- Your device must be eSIM-compatible and unlocked.\n- Purchase your Lyca Mobile eSIM plan online at lycamobile.us.\n- You'll receive a QR code via email within minutes.\n\n**iPhone (iOS 16+):**\n1. Go to Settings → Cellular → Add eSIM.\n2. Tap 'Use QR Code' and scan the QR code from your email.\n3. Confirm the plan details and tap 'Add Cellular Plan.'\n4. Choose whether this eSIM is your Primary or Secondary line.\n5. Your plan activates automatically — usually within 5 minutes.\n\n**Android (Google Pixel, Samsung Galaxy, etc.):**\n1. Open Settings → Connections → SIM Card Manager → Add Mobile Plan.\n2. Tap 'Scan Carrier QR Code.'\n3. Point your camera at the QR code from your email.\n4. Follow the on-screen prompts to confirm and activate.\n5. Restart your device to ensure the eSIM activates fully.\n\n**Troubleshooting tips:**\n- If the QR code scan fails, ensure you're in a well-lit area or try entering the code manually.\n- Make sure your device has an internet connection (Wi-Fi) before scanning.\n- Contact Lyca support at 1-866-277-3221 if activation fails after 15 minutes.",
  },
  {
    id: 5,
    title: "Lyca Mobile 5G Network: Coverage Updates and What It Means for You",
    excerpt: "Our 5G network continues to expand. Check the latest coverage updates, find out if your area is covered, and learn how to switch to 5G data on your device.",
    date: "June 12, 2026",
    author: "Lyca Mobile",
    category: "Network & Coverage",
    href: `${BASE_BLOG}/lyca-mobile-5g-coverage-update/`,
    icon: Wifi,
    gradient: "from-[#0E1F5C] to-[#1a3385]",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "5G is no longer just for early adopters — it's now mainstream, and Lyca Mobile customers get access to it at no extra charge. Here's everything you need to know about our 5G network.\n\n**What is 5G?**\n5G is the fifth generation of mobile network technology. It's significantly faster than 4G LTE, with peak speeds of 1–10 Gbps in ideal conditions and typical speeds of 50–300 Mbps in everyday use. This means faster downloads, smoother video calls, and lower latency for gaming.\n\n**Where is Lyca 5G available?**\nThrough our T-Mobile network partnership, Lyca Mobile 5G is available in all major US cities and suburbs, including New York, Los Angeles, Chicago, Houston, Phoenix, Philadelphia, San Antonio, San Diego, Dallas, and San Jose.\n\n**How to enable 5G on your device:**\n- **iPhone:** Settings → Cellular → Cellular Data Options → Voice & Data → 5G On.\n- **Android:** Settings → Connections → Mobile Networks → Network Mode → 5G/4G/3G (or similar).\n\n**Will my current plan work on 5G?**\nYes! All Lyca Mobile plans that support 4G LTE automatically include 5G access where available. No plan change or upgrade required — just make sure your device supports 5G.\n\n**Check your coverage:**\nVisit lycamobile.us/coverage and enter your zip code to confirm 5G availability in your area.",
  },
  {
    id: 6,
    title: "Best Prepaid Plans for International Callers: Summer 2026 Roundup",
    excerpt: "Calling family abroad has never been more affordable. We compare our top unlimited international calling plans and help you find the best fit for your needs.",
    date: "June 17, 2026",
    author: "Lyca Mobile",
    category: "Plans & Pricing",
    href: `${BASE_BLOG}/best-prepaid-plans-international-callers-2026/`,
    icon: Star,
    gradient: "from-[#0066FF] to-[#0E1F5C]",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "If you have family, friends, or business contacts abroad, your choice of mobile plan can save — or cost — you hundreds of dollars a year. Here's our summer 2026 breakdown of the best Lyca Mobile plans for international callers.\n\n**Why prepaid beats postpaid for international callers:**\nPostpaid plans often charge $10–$15 per day for international calling add-ons. Lyca's prepaid plans include international calls to 75+ countries at no extra charge, every month.\n\n**Top picks for summer 2026:**\n\n🥇 **$29/month plan** — Best overall for heavy users. Includes 10GB high-speed data, unlimited talk & text in the US, and unlimited calls to 75+ countries. Best for: immigrants staying in touch with family.\n\n🥈 **$19/month plan** — Best budget option. 3GB data, unlimited US calls, and international calling to 50+ countries. Best for: light data users who prioritize calling.\n\n🥉 **$49/month plan** — Best for families. Unlimited everything, including 25GB high-speed data and international calls to 85+ countries. Best for: those who use heavy data and call internationally daily.\n\n**Countries included:**\nMexico, Canada, UK, India, Bangladesh, Pakistan, Sri Lanka, Philippines, China, Jamaica, Dominican Republic, Nigeria, and 60+ more.\n\n**How to switch:**\nSwitching to Lyca Mobile takes under 10 minutes online. Keep your number — porting is free and takes 1–3 business days.",
  },
  {
    id: 7,
    title: "Understanding Data Throttling: What Happens After Your Allowance Runs Out",
    excerpt: "We explain exactly what 'unlimited data' means on prepaid plans and what to expect when you hit your high-speed data limit.",
    date: "June 20, 2026",
    author: "Lyca Mobile",
    category: "Plans & Pricing",
    href: `${BASE_BLOG}/understanding-data-throttling/`,
    icon: Wifi,
    gradient: "from-[#0E1F5C] to-[#0066FF]",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "You've probably seen the phrase 'unlimited data' on mobile plans — but what does it actually mean? Here's the honest breakdown of how data works on Lyca Mobile's prepaid plans.\n\n**High-speed data vs. unlimited data:**\nAll Lyca Mobile plans include a fixed amount of high-speed (4G LTE / 5G) data — for example, 3GB, 5GB, or 10GB. Once you've used this allowance, you still have data — but speeds are reduced (throttled) to a lower tier.\n\n**What speed is 'throttled' data?**\n- Entry plans: reduced to 128 kbps after high-speed allowance.\n- Mid-tier plans: reduced to 256 kbps.\n- Premium plans: reduced to 512 kbps.\n\nAt 256 kbps, you can still: send WhatsApp messages, make voice calls (VoIP), check email, and browse basic web pages. You cannot: stream HD video, make smooth video calls, or download large files quickly.\n\n**How to avoid throttling:**\n- Monitor your data usage via *611# or the My Lyca app.\n- Buy a data add-on ($5 for 1GB, $10 for 3GB) before you run out.\n- Connect to Wi-Fi whenever possible to preserve your high-speed allowance.\n\n**Does throttling reset?**\nYes — your high-speed data allowance resets every 30 days when your plan renews.",
  },
  {
    id: 8,
    title: "How to Keep Your Phone Number When Switching to Lyca Mobile",
    excerpt: "Number porting doesn't have to be stressful. Follow our simple guide to bring your existing phone number to Lyca Mobile without any downtime.",
    date: "June 22, 2026",
    author: "Lyca Mobile",
    category: "Getting Started",
    href: `${BASE_BLOG}/keep-number-switching-lyca-mobile/`,
    icon: Smartphone,
    gradient: "from-[#0066FF] to-[#0E1F5C]",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "Switching carriers doesn't mean losing your number. Number porting (officially called 'Local Number Portability' or LNP) lets you bring your existing phone number to Lyca Mobile for free. Here's how.\n\n**Step 1: Get your account info from your current carrier**\nBefore you cancel or switch, gather:\n- Your account number (shown on your bill or in your online account)\n- Your account PIN or password\n- The billing address and name on the account\n\n**Step 2: Do NOT cancel your current service yet**\nThis is the #1 mistake people make. Canceling your current service before porting can cause you to lose your number permanently. Keep it active until the port is complete.\n\n**Step 3: Start the port during Lyca activation**\nWhen activating your Lyca SIM online at lycamobile.us, select 'Transfer my existing number.' Enter your current number, carrier account number, and PIN.\n\n**Step 4: Wait for confirmation**\nPorting typically takes 1–3 business days. You'll receive an SMS when your number is active on Lyca. During this time, your old SIM stays active — so you won't miss any calls.\n\n**Step 5: Insert your Lyca SIM**\nOnce you receive the confirmation SMS, swap your SIM (or activate your eSIM profile). Your number is now on Lyca!\n\n**Porting is free — always.** No fees, no tricks.",
  },
  {
    id: 9,
    title: "Lyca Mobile Family Plans: Save More with Multiple Lines",
    excerpt: "Managing mobile service for the whole family? Lyca's family plans let you keep everyone connected under one account with significant savings per line.",
    date: "June 23, 2026",
    author: "Lyca Mobile",
    category: "Plans & Pricing",
    href: `${BASE_BLOG}/lyca-mobile-family-plans-2026/`,
    icon: Star,
    gradient: "from-[#00D084] to-[#0066FF]",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "Managing multiple phone lines for the family doesn't have to mean multiple bills, multiple logins, and multiple headaches. Lyca Mobile's family plan structure lets you control up to 5 lines from a single account.\n\n**How family plans work:**\nOne primary account holder sets up the main account and can then add up to 4 additional lines. Each line gets its own phone number, data allowance, and plan — but all billing is consolidated under the primary account.\n\n**Benefits of the family plan:**\n- Simplified billing — one payment covers everyone\n- Easy top-ups for family members from your account\n- Primary holder can monitor usage across all lines\n- Each member can still choose their own plan tier\n\n**Savings example:**\nIf 4 people each buy individual $29/month plans = $116/month total. With a family setup, each additional line after the first gets a $3–$5 discount — saving the family up to $20/month.\n\n**Setting it up:**\n1. Log in at lycamobile.us\n2. Go to 'My Account' → 'Family Management'\n3. Click 'Add a Line' and enter the new member's details\n4. Choose their plan and complete payment\n5. They'll receive an activation link via email\n\nAll family lines include full access to Lyca's international calling destinations — perfect for families staying connected with relatives abroad.",
  },
  {
    id: 10,
    title: "Lyca Mobile Security Tips: Protect Your Account in 2026",
    excerpt: "With SIM swapping and account fraud on the rise, here are the essential security steps every Lyca Mobile customer should take to protect their number and account.",
    date: "June 24, 2026",
    author: "Lyca Mobile",
    category: "Account & Billing",
    href: `${BASE_BLOG}/account-security-tips-2026/`,
    icon: CreditCard,
    gradient: "from-[#0E1F5C] to-[#1a3385]",
    imageUrl: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&h=280&auto=format&fit=crop&q=80",
    fullContent: "Mobile account security has never been more important. SIM swapping attacks — where fraudsters hijack your phone number — are on the rise. Here's how to protect your Lyca Mobile account.\n\n**1. Set a strong account PIN**\nYour Lyca account PIN is different from your phone's lock screen PIN. Set it in 'My Account' → 'Security Settings.' Use a unique PIN you don't use anywhere else.\n\n**2. Enable Two-Factor Authentication (2FA)**\nWhen 2FA is enabled, any login attempt from a new device triggers an SMS verification code. Enable it in Account Settings → Security.\n\n**3. Add a Port Freeze (Number Lock)**\nA port freeze prevents anyone — including Lyca staff — from transferring your number without additional verification. Contact support to request a port freeze if you don't plan to switch carriers.\n\n**4. Use a strong password for your online account**\nAvoid passwords tied to your name, birthday, or phone number. Use a password manager and generate a random 16+ character password.\n\n**5. Be cautious of phishing**\nLyca will never ask for your PIN, password, or payment card details via text or email. If you receive such a message, report it immediately by emailing security@lycamobile.com.\n\n**6. Monitor your account regularly**\nCheck your transaction history and active plan monthly. Unexpected charges or plan changes can be early signs of unauthorized access.",
  },
];

// Get current ISO week number for rotation
function getISOWeek(): number {
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const diff = now.getTime() - startOfYear.getTime();
  return Math.floor(diff / (7 * 24 * 60 * 60 * 1000));
}

function getWeeklyBlogs() {
  const week = getISOWeek();
  const startIdx = (week * 2) % ALL_BLOGS.length;
  const result: typeof ALL_BLOGS = [];
  for (let i = 0; i < 6; i++) {
    result.push(ALL_BLOGS[(startIdx + i) % ALL_BLOGS.length]);
  }
  return result;
}

export function BlogSection() {
  const [readingBlog, setReadingBlog] = useState<typeof ALL_BLOGS[0] | null>(null);
  const blogs = getWeeklyBlogs();

  return (
    <>
      <section id="blog" className="py-20 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              View our recent blogs
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-xl mx-auto">
              Tips, guides, and news to help you get the most out of your Lyca Mobile service.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xs text-muted-foreground/60 mt-2">
              Refreshed weekly — come back next week for new articles
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, idx) => {
              const Icon = blog.icon;
              return (
                <motion.div key={blog.id}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: idx * 0.07 }}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  {/* Thumbnail — real image with gradient fallback */}
                  <div className={`relative h-48 bg-gradient-to-br ${blog.gradient} flex items-center justify-center overflow-hidden`}>
                    {blog.imageUrl && (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute inset-0 opacity-20"
                      style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 0)", backgroundSize: "24px 24px" }} />
                    <div className="relative z-10 flex flex-col items-center gap-3 opacity-0 group-hover:opacity-0">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 z-20">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/20">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-[#0066FF] transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 flex-1">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {blog.date}</span>
                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {blog.author}</span>
                      </div>
                      <button
                        onClick={() => setReadingBlog(blog)}
                        className="flex items-center gap-1 text-xs font-semibold text-[#0066FF] group-hover:gap-2 transition-all hover:underline">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <a href={`${BASE_BLOG}/`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#0066FF] hover:underline">
              View all articles on lycamobile.us <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Inline Blog Reader Modal */}
      <AnimatePresence>
        {readingBlog && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={e => { if (e.target === e.currentTarget) setReadingBlog(null); }}>
            <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }} transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden">
              {/* Modal header image */}
              <div className={`relative h-40 bg-gradient-to-br ${readingBlog.gradient} flex items-center justify-center shrink-0`}>
                {readingBlog.imageUrl && (
                  <img src={readingBlog.imageUrl} alt={readingBlog.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative z-10 p-5 pb-4 w-full mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 bg-white/10 px-2 py-0.5 rounded-full mb-2 inline-block">
                    {readingBlog.category}
                  </span>
                  <h2 className="text-white font-bold text-lg leading-tight">{readingBlog.title}</h2>
                </div>
                <button onClick={() => setReadingBlog(null)}
                  className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-4 px-6 py-3 border-b border-border text-xs text-muted-foreground shrink-0">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {readingBlog.date}</span>
                <span className="flex items-center gap-1"><User className="w-3 h-3" /> {readingBlog.author}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> ~4 min read</span>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-5 prose prose-sm dark:prose-invert max-w-none">
                <p className="text-muted-foreground mb-4 text-sm italic">{readingBlog.excerpt}</p>
                {readingBlog.fullContent.split("\n\n").map((para, i) => {
                  if (para.startsWith("**") && para.endsWith("**")) {
                    return <h3 key={i} className="font-bold text-base mt-5 mb-2 not-italic">{para.slice(2, -2)}</h3>;
                  }
                  const withBold = para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
                  return (
                    <p key={i} className="text-foreground/80 leading-relaxed text-sm mb-3"
                      dangerouslySetInnerHTML={{ __html: withBold }} />
                  );
                })}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-border bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between shrink-0">
                <button onClick={() => setReadingBlog(null)}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <ChevronLeft className="w-4 h-4" /> Back to blogs
                </button>
                <a href={readingBlog.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#0066FF] hover:underline">
                  Full article on lycamobile.us <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
