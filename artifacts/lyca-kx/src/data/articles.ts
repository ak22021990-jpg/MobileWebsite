export interface Article {
  id: string;
  title: string;
  category: string;
  desc: string;
  readTime: string;
  keywords: string[];
  steps: string[];
  tips?: string[];
  note?: string;
  relatedIds?: string[];
}

export const articles: Article[] = [
  // ── GETTING STARTED ──────────────────────────────────────────────────────────
  {
    id: "gs1",
    title: "How to Activate Your Lyca Mobile SIM Card",
    category: "Getting Started",
    desc: "Complete step-by-step guide to get your new physical SIM working.",
    readTime: "3 min read",
    keywords: ["activate", "activation", "sim", "new", "setup", "start", "iccid", "puk"],
    steps: [
      "Remove your Lyca Mobile SIM from its packaging and note the ICCID (20-digit number on the card).",
      "Make sure your phone is unlocked and powered off before inserting the SIM.",
      "Insert the Lyca SIM into the SIM tray of your phone. Use the SIM-eject tool if needed.",
      "Power your phone back on and wait for it to register on the Lyca / T-Mobile network.",
      "Once you see signal bars, dial *100# and press Call. Your balance will display — this confirms activation.",
      "Alternatively, visit lycamobile.us/activate, enter your ICCID and PUK code, and follow the on-screen steps.",
      "Configure APN settings if mobile data doesn't connect automatically (APN: data.lycamobile.com).",
      "Restart your phone after APN setup to apply the changes."
    ],
    tips: [
      "If the SIM shows 'No Service', ensure your phone is carrier-unlocked.",
      "You can also call 1-866-277-3221 to activate by speaking with an agent.",
      "Activation is instant for digital purchases; physical SIMs take up to 1 hour."
    ],
    note: "Your SIM must be activated within 6 months of purchase.",
    relatedIds: ["gs5", "dc1", "gs4"]
  },
  {
    id: "gs2",
    title: "Porting Your Number to Lyca Mobile",
    category: "Getting Started",
    desc: "Bring your existing phone number from any US carrier to Lyca.",
    readTime: "5 min read",
    keywords: ["port", "transfer", "number", "keep", "porting", "existing", "switch", "carrier"],
    steps: [
      "Do NOT cancel your current service before porting — your number transfers automatically.",
      "Contact your current carrier and request your Account Number and Account PIN (or Transfer PIN).",
      "Purchase a Lyca Mobile SIM or eSIM from our website.",
      "During the online activation at lycamobile.us/activate, select 'Transfer existing number' when prompted.",
      "Enter your current 10-digit phone number, your carrier Account Number, and Account PIN.",
      "Select a Lyca plan and complete your purchase.",
      "The port request is submitted. You'll receive a confirmation email.",
      "Keep your current phone on and charged — the transfer happens automatically within 1–3 business days.",
      "Once complete, insert your Lyca SIM. Your old number will now be active on Lyca."
    ],
    tips: [
      "Ports initiated on weekdays usually complete within 24 hours.",
      "If your account has outstanding balances on the old carrier, the port may be delayed.",
      "You can check port status by calling 1-866-277-3221 or via your online account."
    ],
    note: "Do not cancel your current service until you confirm the port is complete.",
    relatedIds: ["gs1", "sm4", "gs6"]
  },
  {
    id: "gs3",
    title: "Setting Up Voicemail",
    category: "Getting Started",
    desc: "Initialize, personalize, and access your Lyca Mobile voicemail.",
    readTime: "2 min read",
    keywords: ["voicemail", "setup", "pin", "greeting", "123", "messages"],
    steps: [
      "From your Lyca phone, dial 123 and press Call.",
      "The voicemail system will prompt you to create a 4-digit PIN. Choose a PIN you'll remember.",
      "Record your personal greeting when prompted, or use the default system greeting.",
      "Press # to confirm and save your greeting.",
      "To check messages, dial 123 from your Lyca phone anytime.",
      "To retrieve voicemail from another phone: call your Lyca number, press * when the greeting plays, then enter your PIN."
    ],
    tips: [
      "If you forget your PIN, call customer support at 1-866-277-3221 to reset it.",
      "Voicemail messages are stored for 30 days before being deleted."
    ],
    relatedIds: ["gs1", "gs4"]
  },
  {
    id: "gs4",
    title: "Finding Your Lyca Mobile Phone Number",
    category: "Getting Started",
    desc: "Quick ways to check your assigned phone number.",
    readTime: "1 min read",
    keywords: ["find", "number", "check", "my number", "what is my number", "phone number"],
    steps: [
      "Dial *132# from your Lyca Mobile phone and press Call.",
      "Your 10-digit number will appear on screen immediately.",
      "Alternatively, log into your account at lycamobile.us and your number is displayed on the dashboard.",
      "You can also check inside the My Lyca app under 'My Account'."
    ],
    relatedIds: ["gs1", "ab1"]
  },
  {
    id: "gs5",
    title: "eSIM Setup — iPhone & Android",
    category: "Getting Started",
    desc: "Download and activate your digital eSIM profile with a QR code.",
    readTime: "4 min read",
    keywords: ["esim", "digital sim", "qr code", "iphone", "android", "download", "install", "e-sim"],
    steps: [
      "Purchase an eSIM plan at lycamobile.us. You'll receive a QR code by email.",
      "On iPhone: Go to Settings → Cellular → Add Cellular Plan. Point camera at QR code.",
      "On Android (Samsung): Go to Settings → Connections → SIM Manager → Add eSIM. Scan QR code.",
      "On other Android phones: Settings → Network & Internet → Mobile Network → Add a network. Scan QR code.",
      "Follow the on-screen prompts to label the plan (e.g., 'Lyca Mobile').",
      "If prompted, set Lyca as your primary data line.",
      "Restart your phone after installation.",
      "If data doesn't work, manually set APN to: data.lycamobile.com"
    ],
    tips: [
      "Your device must be eSIM-compatible and carrier-unlocked.",
      "Each QR code can only be scanned once — do not delete the eSIM without downloading a new one first.",
      "If the QR scan fails, use the manual entry code also provided in your email."
    ],
    note: "eSIM is not available on all plans. Check compatibility at checkout.",
    relatedIds: ["gs1", "dc1", "gs6"]
  },
  {
    id: "gs6",
    title: "Device Compatibility Check",
    category: "Getting Started",
    desc: "Make sure your phone will work on the Lyca / T-Mobile network.",
    readTime: "2 min read",
    keywords: ["compatible", "compatibility", "unlocked", "gsm", "tmobile", "bands", "work", "device"],
    steps: [
      "Your phone must be UNLOCKED from your previous carrier.",
      "Lyca Mobile USA operates on the T-Mobile GSM network.",
      "Required bands: Band 2 (1900MHz), Band 4 (1700/2100MHz), Band 12 (700MHz), Band 66, Band 71.",
      "To check if your phone is unlocked: Insert another carrier's SIM — if it shows signal, it's unlocked.",
      "To check band compatibility: Look up your model at kimovil.com or GSMArena and compare network bands.",
      "Most modern iPhones (XR or newer) and flagship Androids are fully compatible.",
      "If your phone is locked, contact your current carrier and request an unlock — most carriers unlock for free after 30–60 days of service."
    ],
    tips: [
      "CDMA-only phones (rare today) are not compatible with Lyca Mobile.",
      "Use our IMEI checker at lycamobile.us to confirm compatibility instantly."
    ],
    relatedIds: ["gs1", "dc6"]
  },

  // ── ACCOUNT & BILLING ─────────────────────────────────────────────────────────
  {
    id: "ab1",
    title: "Checking Your Balance & Usage",
    category: "Account & Billing",
    desc: "See your remaining data, minutes, texts, and plan expiry date.",
    readTime: "1 min read",
    keywords: ["balance", "check", "usage", "data", "minutes", "texts", "remaining", "611", "dial"],
    steps: [
      "Dial *611# from your Lyca phone and press Call — balance appears on screen instantly.",
      "Open the My Lyca App → Home screen shows your real-time data, minutes, and balance.",
      "Log into lycamobile.us → Dashboard shows full account summary and expiry date.",
      "You can also text BAL to 22555 to receive your balance by SMS."
    ],
    tips: [
      "Set up low-balance alerts in the app so you're notified before your plan expires.",
      "International credit balance is shown separately from your main plan balance."
    ],
    relatedIds: ["ab2", "ab5", "sm2"]
  },
  {
    id: "ab2",
    title: "Setting Up Auto-Renewal",
    category: "Account & Billing",
    desc: "Never miss a renewal — automatically charge your saved card when your plan expires.",
    readTime: "3 min read",
    keywords: ["auto renewal", "auto-renewal", "automatic", "payment", "renew", "subscription"],
    steps: [
      "Log into your account at lycamobile.us.",
      "Click on 'My Account' → 'Payment Methods'.",
      "Add a valid credit or debit card if none is saved.",
      "Navigate to 'My Plans' and find your current active plan.",
      "Toggle the 'Auto-Renewal' switch to ON.",
      "Confirm your saved card. You'll receive a confirmation email.",
      "Auto-renewal charges occur on your plan expiry date — you'll get an email reminder 3 days before."
    ],
    tips: [
      "You can turn off auto-renewal at any time before the renewal date.",
      "If your card is declined, you have a 24-hour grace period to update it before service is interrupted."
    ],
    relatedIds: ["ab4", "ab3", "sm1"]
  },
  {
    id: "ab3",
    title: "Understanding Your Billing Cycle",
    category: "Account & Billing",
    desc: "How your 30-day plan is calculated and when you're charged.",
    readTime: "4 min read",
    keywords: ["billing", "cycle", "30 day", "expiry", "expire", "when", "charge"],
    steps: [
      "Lyca Mobile plans run for exactly 30 days from your activation date.",
      "Example: If you activate on June 1, your plan expires June 30 at 11:59 PM EST.",
      "With Auto-Renewal: Your card is charged on the expiry date and your plan renews instantly.",
      "Without Auto-Renewal: Service stops at midnight on expiry. You have 90 days to recharge before the number is recycled.",
      "If you manually recharge before expiry, the 30-day clock restarts from that recharge date."
    ],
    tips: [
      "Changing plans mid-cycle forfeits remaining benefits — it's best to wait until renewal.",
      "View your exact expiry date at any time in your account dashboard."
    ],
    relatedIds: ["ab2", "sm1", "sm6"]
  },
  {
    id: "ab4",
    title: "Updating Payment Methods",
    category: "Account & Billing",
    desc: "Add, change, or remove credit/debit cards on your account.",
    readTime: "2 min read",
    keywords: ["payment", "card", "credit", "debit", "update", "change", "add", "remove", "visa", "mastercard"],
    steps: [
      "Log into your account at lycamobile.us.",
      "Go to 'My Account' → 'Payment Details'.",
      "To add a card: Click 'Add New Card', enter your card number, expiry, and CVV.",
      "To remove a card: Click the trash icon next to the card you want to delete.",
      "To set a default card: Click 'Set as Default' next to the card you prefer.",
      "Accepted methods: Visa, Mastercard, American Express, Discover, PayPal, Apple Pay, Google Pay."
    ],
    tips: [
      "Cards are stored securely using PCI-DSS compliant encryption.",
      "You cannot delete your only saved card if Auto-Renewal is active — add a new card first."
    ],
    relatedIds: ["ab2", "ab5"]
  },
  {
    id: "ab5",
    title: "Viewing Transaction History",
    category: "Account & Billing",
    desc: "Access and download receipts for all past recharges and plan purchases.",
    readTime: "2 min read",
    keywords: ["transaction", "history", "receipt", "billing", "past", "purchase", "invoice", "download"],
    steps: [
      "Log into your account at lycamobile.us.",
      "Click 'My Account' → 'Billing History'.",
      "You'll see a list of all transactions from the past 12 months.",
      "Click on any transaction to expand details: date, amount, plan, payment method.",
      "Click 'Download PDF' on any transaction to save a receipt."
    ],
    relatedIds: ["ab4", "ab6"]
  },
  {
    id: "ab6",
    title: "Requesting a Refund",
    category: "Account & Billing",
    desc: "Our policy and process for returning funds to your account.",
    readTime: "3 min read",
    keywords: ["refund", "money back", "return", "charge", "dispute", "credit", "error"],
    steps: [
      "Refund requests must be submitted within 14 days of the purchase date.",
      "Plans that have been used (any data, minutes, or texts consumed) are not refundable.",
      "Contact Lyca support: Call 1-866-277-3221 or dial 612 from your Lyca phone.",
      "Provide your account number, the date of the charge, and the reason for your refund request.",
      "Approved refunds are returned to your original payment method within 5–10 business days.",
      "If you were charged due to a system error, a credit will be applied to your account immediately."
    ],
    tips: [
      "Duplicate charges are always refunded in full.",
      "Keep your email receipts as they speed up the refund process."
    ],
    relatedIds: ["ab5", "ab3"]
  },

  // ── SERVICE MANAGEMENT ────────────────────────────────────────────────────────
  {
    id: "sm1",
    title: "Changing Your Plan",
    category: "Service Management",
    desc: "Upgrade, downgrade, or switch to a different monthly plan.",
    readTime: "3 min read",
    keywords: ["change", "plan", "upgrade", "downgrade", "switch", "new plan", "different"],
    steps: [
      "Log into your account at lycamobile.us.",
      "Go to 'My Plans' and click 'Change Plan'.",
      "Browse the available plans and select your preferred option.",
      "Choose 'Apply at Next Renewal' to avoid losing your current plan's remaining benefits.",
      "Or choose 'Apply Now' if you need the change immediately (current benefits are forfeited).",
      "Confirm your new plan and payment method.",
      "You'll receive a confirmation email with the new plan details."
    ],
    tips: [
      "Upgrading mid-cycle: You'll be charged the prorated difference.",
      "If downgrading, wait until your renewal date to avoid losing data or minutes."
    ],
    relatedIds: ["ab3", "sm2", "ab2"]
  },
  {
    id: "sm2",
    title: "Adding Extra Data",
    category: "Service Management",
    desc: "What to do when you've used up your high-speed data allowance.",
    readTime: "2 min read",
    keywords: ["data", "add", "extra", "more", "ran out", "slow", "throttled", "add-on", "top up data"],
    steps: [
      "When your high-speed data is exhausted, speeds reduce to 128kbps or 256kbps (depending on plan).",
      "To add instant high-speed data: Log into your account or open the My Lyca App.",
      "Select 'Data Add-On' from the top-up menu.",
      "Choose a data bundle: 1GB, 3GB, or 5GB options available.",
      "Pay using your saved card and data is added instantly.",
      "Alternatively, text *139*[PIN]# from your Lyca phone (PIN available at lycamobile.us)."
    ],
    tips: [
      "Data Add-Ons do not extend your plan's expiry date.",
      "Unused Add-On data does not carry over to the next cycle."
    ],
    relatedIds: ["ab1", "sm1", "dc1"]
  },
  {
    id: "sm4",
    title: "SIM Card Replacement",
    category: "Service Management",
    desc: "How to get a new SIM if yours is lost, stolen, or damaged.",
    readTime: "3 min read",
    keywords: ["replacement", "replace", "lost", "stolen", "damaged", "new sim", "swap", "broken"],
    steps: [
      "Order a replacement SIM at lycamobile.us for $0.99, or pick one up at any Lyca authorized retailer.",
      "Call customer support at 1-866-277-3221 and inform them of the lost/damaged SIM.",
      "An agent will suspend your old SIM to prevent unauthorized use.",
      "Once you receive the new SIM, call support again or visit lycamobile.us/replace-sim.",
      "Provide your new SIM's ICCID number — your existing number, balance, and plan are transferred.",
      "The swap takes effect within 2 hours."
    ],
    tips: [
      "If your phone was also stolen, request an immediate SIM block to protect your balance.",
      "eSIM users: Contact support to revoke the old eSIM and issue a new QR code."
    ],
    relatedIds: ["gs1", "gs5"]
  },
  {
    id: "sm6",
    title: "Canceling Your Service",
    category: "Service Management",
    desc: "Steps to stop your Lyca Mobile service and close your account.",
    readTime: "2 min read",
    keywords: ["cancel", "close", "deactivate", "stop", "quit", "leave", "port out"],
    steps: [
      "To cancel: Simply turn off Auto-Renewal in your account settings.",
      "Your service continues until your current plan's expiry date.",
      "Do not recharge after expiry — your number stays valid for 90 days of inactivity.",
      "After 90 days with no recharge, the number is released and cannot be recovered.",
      "To port your number to another carrier BEFORE canceling: Initiate the port from the new carrier's side — do not cancel Lyca first.",
      "To fully close and delete your account data: Contact support at 1-866-277-3221 or email privacy@lycamobile.com."
    ],
    relatedIds: ["gs2", "ab3"]
  },

  // ── DEVICE & CONNECTIVITY ─────────────────────────────────────────────────────
  {
    id: "dc1",
    title: "APN Settings — Android & iPhone",
    category: "Device & Connectivity",
    desc: "Configure your phone's Access Point Name to enable mobile data.",
    readTime: "5 min read",
    keywords: ["apn", "settings", "data", "mobile internet", "internet not working", "configure", "android", "iphone", "access point"],
    steps: [
      "On iPhone: Go to Settings → Cellular → Cellular Data Network → APN.",
      "On Android: Go to Settings → Network & Internet (or Connections) → Mobile Networks → Access Point Names → Add New APN.",
      "Enter the following settings exactly:",
      "  • Name: Lyca Mobile",
      "  • APN: data.lycamobile.com",
      "  • Username: (leave blank)",
      "  • Password: (leave blank)",
      "  • MCC: 310",
      "  • MNC: 260",
      "Save the APN settings and select it as your active APN.",
      "Restart your phone completely.",
      "Go to Settings → Cellular/Mobile Data and make sure Mobile Data is toggled ON."
    ],
    tips: [
      "APN settings are case-sensitive — enter 'data.lycamobile.com' in lowercase.",
      "On some iPhones, APN fields may be grayed out — try resetting Network Settings first.",
      "If you have both eSIM and physical SIM, ensure the APN is set for the Lyca line."
    ],
    note: "If data still doesn't work after APN setup, call 1-866-277-3221.",
    relatedIds: ["dc4", "gs5", "dc5"]
  },
  {
    id: "dc2",
    title: "Setting Up a Personal Hotspot",
    category: "Device & Connectivity",
    desc: "Share your Lyca mobile data with other devices via Wi-Fi hotspot.",
    readTime: "3 min read",
    keywords: ["hotspot", "tethering", "share", "wifi", "personal hotspot", "connect"],
    steps: [
      "First, ensure your plan includes hotspot/tethering (check your plan details at lycamobile.us).",
      "On iPhone: Settings → Personal Hotspot → toggle Allow Others to Join.",
      "On Android: Settings → Network → Hotspot & Tethering → Mobile Hotspot → toggle ON.",
      "Set a strong Wi-Fi password (at least 8 characters, mix of letters and numbers).",
      "On the device you want to connect, open Wi-Fi settings and select your phone's hotspot name.",
      "Enter the password and connect."
    ],
    tips: [
      "Hotspot uses your plan's data — monitor usage carefully.",
      "Hotspot is not available on some basic plans — upgrade if needed."
    ],
    relatedIds: ["dc1", "sm2"]
  },
  {
    id: "dc3",
    title: "WiFi Calling Setup",
    category: "Device & Connectivity",
    desc: "Make and receive calls over WiFi when cellular signal is weak.",
    readTime: "4 min read",
    keywords: ["wifi calling", "wi-fi calling", "weak signal", "no signal", "voip", "enable", "setup calling"],
    steps: [
      "First, log into lycamobile.us → 'My Account' → 'Profile' → update your E911 emergency address.",
      "On iPhone: Settings → Cellular → Wi-Fi Calling → toggle on 'Wi-Fi Calling on This iPhone'.",
      "Confirm your emergency address when prompted.",
      "On Android (Samsung): Phone app → Settings → Wi-Fi Calling → Enable.",
      "On Android (Pixel/Other): Settings → Network → Calls & SMS → Wi-Fi Calling → On.",
      "Make a test call — you'll see 'Lyca Wi-Fi' or a Wi-Fi icon in the status bar when using it."
    ],
    tips: [
      "WiFi Calling requires a minimum of 1 Mbps upload/download for clear voice quality.",
      "Calls via WiFi Calling use the same minutes as regular calls.",
      "If you move from WiFi to cellular mid-call, the call hands off automatically."
    ],
    relatedIds: ["dc1", "dc4"]
  },
  {
    id: "dc4",
    title: "Troubleshooting 'No Service' or Signal Issues",
    category: "Device & Connectivity",
    desc: "Step-by-step fixes for when your phone has no signal or can't connect.",
    readTime: "4 min read",
    keywords: ["no service", "signal", "no signal", "not working", "dead zone", "lost signal", "connection", "fix", "troubleshoot"],
    steps: [
      "Toggle Airplane Mode ON for 30 seconds, then OFF — this forces your phone to re-register on the network.",
      "Restart your phone completely (power off, wait 10 seconds, power back on).",
      "Go to Settings → Cellular/Mobile Network → Network Selection → set to 'Automatic'.",
      "Remove the SIM, inspect for damage, then re-seat it firmly.",
      "Check the Lyca coverage map at lycamobile.us/coverage — verify your area has service.",
      "Try manually selecting the network: Settings → Cellular → Network Selection → search for and select 'T-Mobile' or 'Lyca Mobile'.",
      "Reset Network Settings: Settings → General → Reset → Reset Network Settings (Note: this clears saved WiFi passwords)."
    ],
    tips: [
      "Indoor signal may be weaker — try near a window.",
      "If signal issues persist in a normally covered area, check lycamobile.us/status for outages."
    ],
    note: "If none of these steps work, contact support at 1-866-277-3221.",
    relatedIds: ["dc1", "dc5", "dc6"]
  },
  {
    id: "dc6",
    title: "'SIM Not Supported' or 'SIM Locked' Error",
    category: "Device & Connectivity",
    desc: "What to do if your phone rejects the Lyca SIM card.",
    readTime: "2 min read",
    keywords: ["sim not supported", "sim locked", "carrier locked", "unlock", "not compatible", "rejected"],
    steps: [
      "'SIM Not Supported' means your phone is carrier-locked to your previous provider.",
      "Contact your previous carrier and request a network unlock. Most carriers do this for free after service requirements are met.",
      "Once unlocked, power off, reinsert the Lyca SIM, and power back on.",
      "If your carrier refuses, contact a third-party unlocking service — search for your phone model online.",
      "After unlocking, if the error persists, perform a factory reset (back up data first)."
    ],
    tips: [
      "If your phone was purchased directly from a carrier (AT&T, Verizon, etc.), it is almost certainly locked.",
      "Phones purchased from Apple, Samsung, or Best Buy unlocked are already carrier-unlocked."
    ],
    relatedIds: ["gs6", "dc4"]
  },

  // ── INTERNATIONAL SERVICES ────────────────────────────────────────────────────
  {
    id: "is1",
    title: "Making International Calls",
    category: "International Services",
    desc: "Dialing formats, country codes, and how to call abroad from the US.",
    readTime: "2 min read",
    keywords: ["international", "call", "abroad", "overseas", "country code", "dial", "format"],
    steps: [
      "To call internationally from the US, dial: 011 + [Country Code] + [Phone Number].",
      "Or use the + shortcut: press and hold '0' until '+' appears, then dial: + [Country Code] + [Phone Number].",
      "Example — calling UK (+44): Dial 011-44-20-7946-0958 or +44-20-7946-0958.",
      "If your plan includes the country you're calling (most Lyca plans include 75+ countries), the call is free.",
      "If the country is not included, you need International Credit — check your balance before calling."
    ],
    tips: [
      "Always include the full country code — forgetting it is the most common reason calls fail.",
      "Mexico is +52, India is +91, UK is +44, Pakistan is +92, Nigeria is +234.",
      "Find rates for all countries at lycamobile.us/calling-rates."
    ],
    relatedIds: ["is2", "is4", "is6"]
  },
  {
    id: "is2",
    title: "Adding International Credit",
    category: "International Services",
    desc: "Top up your pay-as-you-go international balance for countries not in your plan.",
    readTime: "3 min read",
    keywords: ["international credit", "top up", "credit", "add", "international balance", "recharge"],
    steps: [
      "Log into your account at lycamobile.us.",
      "Go to 'International Calls' → 'Add International Credit'.",
      "Select a credit amount: $5, $10, $20, or $50.",
      "Complete payment using your saved card.",
      "International Credit is added instantly to your account.",
      "To check your International Credit balance, dial *611# or check your account dashboard."
    ],
    tips: [
      "International Credit does not expire as long as your account is active.",
      "Use lycamobile.us/calling-rates to check per-minute rates before calling."
    ],
    relatedIds: ["is1", "is4"]
  },
  {
    id: "is3",
    title: "Using Your Lyca SIM While Roaming Abroad",
    category: "International Services",
    desc: "How to use your US Lyca SIM in other countries.",
    readTime: "5 min read",
    keywords: ["roaming", "travel", "abroad", "international", "outside us", "foreign", "overseas"],
    steps: [
      "Before traveling: Log into your account and ensure 'International Roaming' is enabled.",
      "Go to My Account → 'Roaming Settings' → toggle Enable Roaming → add Roaming Credit.",
      "Upon arrival in the foreign country, your phone will automatically connect to a partner network.",
      "If it doesn't: Go to Settings → Network Selection → Manual → select a local carrier.",
      "Roaming charges apply per MB, minute, and text from your Roaming Credit balance.",
      "To check roaming rates: Visit lycamobile.us/roaming-rates before you travel."
    ],
    tips: [
      "Consider buying a local SIM for extended stays — it's usually cheaper than roaming.",
      "WiFi Calling (if enabled) lets you make calls over hotel/airport WiFi at your plan's standard rates."
    ],
    relatedIds: ["is1", "dc3"]
  },
  {
    id: "is6",
    title: "Troubleshooting International Calls Not Connecting",
    category: "International Services",
    desc: "Fix common issues when your international call fails or drops.",
    readTime: "3 min read",
    keywords: ["international call", "not connecting", "failed", "can't call", "no connection", "call failed"],
    steps: [
      "Verify you're dialing the correct country code — country codes must be included.",
      "Check if the destination country is included in your plan (lycamobile.us → Plan Details).",
      "If not included, check your International Credit balance (*611# or account dashboard).",
      "Try dialing with the + prefix instead of 011 (hold down 0 key to get +).",
      "If the call connects but has poor quality: use WiFi Calling if on a good WiFi network.",
      "Ensure you're not calling a number type not supported (some premium or satellite numbers are blocked).",
      "If the issue persists, call Lyca support at 1-866-277-3221 or dial 612 from your Lyca phone."
    ],
    relatedIds: ["is1", "is2", "is4"]
  },

  // ── RECHARGE & PAYMENTS ───────────────────────────────────────────────────────
  {
    id: "rc1",
    title: "How to Recharge Your Account",
    category: "Account & Billing",
    desc: "All the ways to add credit or renew your Lyca Mobile plan.",
    readTime: "3 min read",
    keywords: ["recharge", "top up", "add credit", "load", "money", "payment", "renew", "pay", "611"],
    steps: [
      "Online: Visit lycamobile.us → 'Quick Recharge' → enter your phone number and pay by card.",
      "App: Open the My Lyca App → Tap 'Recharge' → choose a plan or credit amount → confirm payment.",
      "USSD: Dial *611# from your Lyca phone → select recharge option → follow prompts.",
      "Phone: Call 1-866-277-3221 → follow the automated payment system.",
      "Retailer: Visit any Lyca authorized retailer or 7-Eleven/CVS with a Lyca recharge card.",
      "Recharge cards: Scratch off the PIN, then dial *150*[PIN]# from your Lyca phone."
    ],
    tips: [
      "Online and app recharges are instant 24/7.",
      "Keep a recharge card as backup for emergencies."
    ],
    relatedIds: ["ab2", "ab1", "sm1"]
  },

  // ── SUPPORT ────────────────────────────────────────────────────────────────────
  {
    id: "sp1",
    title: "Contacting Lyca Mobile Customer Support",
    category: "Getting Started",
    desc: "All the ways to reach a Lyca support agent.",
    readTime: "2 min read",
    keywords: ["contact", "support", "help", "agent", "customer service", "call", "chat", "email", "phone number"],
    steps: [
      "Phone: Call 1-866-277-3221 (free from any phone) or dial 612 from your Lyca Mobile.",
      "Live Chat: Visit lycamobile.us/help-support → click 'Chat with Us' in the bottom right.",
      "Email: Send detailed queries to support@lycamobile.com.",
      "Social Media: DM @lycamobileusa on Twitter/X or Facebook for quick help.",
      "Support Hours: Mon–Sat 8:00 AM – 10:00 PM EST | Sunday 9:00 AM – 8:00 PM EST."
    ],
    tips: [
      "For faster service, have your account number and phone number ready before calling.",
      "Call wait times are shortest before 10:00 AM on weekdays."
    ],
    relatedIds: ["ab6", "sm4"]
  }
];

export function findArticleById(id: string): Article | undefined {
  return articles.find(a => a.id === id);
}

export function searchArticles(query: string): Article[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase().trim();
  
  const synonymMap: Record<string, string[]> = {
    "top up": ["recharge"],
    "load money": ["recharge"],
    "add credit": ["recharge"],
    "no internet": ["data", "apn"],
    "no data": ["data", "apn"],
    "internet not working": ["apn", "data"],
    "switch carrier": ["port", "transfer"],
    "bring my number": ["port"],
    "cancel": ["cancel", "stop"],
    "not working": ["troubleshoot", "fix"],
    "help": ["contact", "support"],
  };

  let expandedTerms = [q];
  for (const [phrase, replacements] of Object.entries(synonymMap)) {
    if (q.includes(phrase)) {
      expandedTerms = [...expandedTerms, ...replacements];
    }
  }

  const scored = articles.map(article => {
    let score = 0;
    const searchStr = `${article.title} ${article.desc} ${article.keywords.join(" ")} ${article.category}`.toLowerCase();
    
    for (const term of expandedTerms) {
      if (article.title.toLowerCase().includes(term)) score += 10;
      if (article.keywords.some(k => k.includes(term) || term.includes(k))) score += 6;
      if (article.desc.toLowerCase().includes(term)) score += 4;
      if (article.category.toLowerCase().includes(term)) score += 3;
      if (searchStr.includes(term)) score += 1;
    }
    return { article, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map(s => s.article);
}

export function getAIResponse(query: string): string {
  const q = query.toLowerCase();
  const matches = searchArticles(query);
  
  if (matches.length === 0) {
    return "I don't have specific information on that topic right now. Please call us at 1-866-277-3221 (Mon–Sat 8AM–10PM EST) or dial 612 from your Lyca phone. Our agents are ready to help!";
  }

  const top = matches[0];

  if (q.includes("activate") || q.includes("activation")) {
    return `To activate your Lyca SIM:\n\n1. Insert SIM into your unlocked phone\n2. Power on and wait for signal\n3. Dial *100# to confirm activation\n\nOr activate online at lycamobile.us/activate with your ICCID and PUK code.\n\nNeed more help? Call 1-866-277-3221.`;
  }
  if (q.includes("apn") || (q.includes("data") && (q.includes("not work") || q.includes("internet")))) {
    return `APN Settings for Lyca Mobile:\n\n• Name: Lyca Mobile\n• APN: data.lycamobile.com\n• Username: (leave blank)\n• Password: (leave blank)\n\nAfter saving, restart your phone. On iPhone: Settings → Cellular → Cellular Data Network.`;
  }
  if (q.includes("port") || q.includes("transfer") || q.includes("keep my number")) {
    return `To port your number to Lyca:\n\n1. Get your Account Number & PIN from your current carrier\n2. Do NOT cancel your current service\n3. Start activation at lycamobile.us/activate → select 'Transfer existing number'\n4. Enter your number and PIN\n5. Wait 1–3 business days for completion`;
  }
  if (q.includes("esim") || q.includes("e-sim")) {
    return `Lyca eSIM Setup:\n\n📱 iPhone: Settings → Cellular → Add Cellular Plan → scan QR code\n\n📱 Android: Settings → Connections → SIM Manager → Add eSIM → scan QR code\n\nYou'll receive the QR code by email after purchase at lycamobile.us.`;
  }
  if (q.includes("recharge") || q.includes("top up") || q.includes("add credit") || q.includes("balance")) {
    return `How to recharge your Lyca account:\n\n• Online: lycamobile.us → Quick Recharge\n• App: My Lyca App → Recharge tab\n• USSD: Dial *611# from your Lyca phone\n• Phone: Call 1-866-277-3221\n\nCheck balance: Dial *611# or text BAL to 22555.`;
  }
  if (q.includes("international") || q.includes("abroad") || q.includes("overseas") || q.includes("country code")) {
    return `For international calls:\n\nDial: 011 + [Country Code] + [Number]\nOr:  + [Country Code] + [Number]\n\nMost Lyca plans include unlimited calls to 75+ countries (Mexico, UK, India, China, Pakistan + more).\n\nFor other countries, add International Credit at lycamobile.us.`;
  }
  if (q.includes("cancel") || q.includes("stop service")) {
    return `To cancel your Lyca service:\n\n1. Turn off Auto-Renewal in account settings\n2. Your service continues until plan expiry\n3. Your number stays active for 90 days without a recharge\n4. After 90 days, the number is released\n\nWant to keep your number? Port it to your new carrier BEFORE canceling.`;
  }
  if (q.includes("number") && (q.includes("find") || q.includes("what is") || q.includes("check"))) {
    return `To find your Lyca number:\n\nDial *132# from your phone — your number appears on screen instantly.\n\nOr log into lycamobile.us — your number is shown on the dashboard.`;
  }
  if (q.includes("support") || q.includes("contact") || q.includes("help") || q.includes("agent")) {
    return `Reach Lyca support:\n\n📞 Call: 1-866-277-3221 (free)\n📱 Dial 612 from your Lyca phone\n💬 Live Chat: lycamobile.us/help-support\n✉️ Email: support@lycamobile.com\n\nHours: Mon–Sat 8AM–10PM EST | Sun 9AM–8PM EST`;
  }
  if (q.includes("wifi calling") || q.includes("wi-fi calling")) {
    return `WiFi Calling setup:\n\n1. Update your E911 address at lycamobile.us/account\n2. iPhone: Settings → Cellular → Wi-Fi Calling → ON\n3. Android: Phone app → Settings → Wi-Fi Calling → Enable\n\nYou'll see a Wi-Fi indicator in the status bar when WiFi Calling is active.`;
  }
  if (q.includes("refund")) {
    return `Refund Policy:\n\n• Requests must be within 14 days of purchase\n• Unused plans may qualify for full refund\n• Plans with any usage are non-refundable\n\nContact us: Call 1-866-277-3221 or email support@lycamobile.com with your account number and transaction details.`;
  }
  if (q.includes("voicemail")) {
    return `Voicemail Setup:\n\n1. Dial 123 from your Lyca phone\n2. Create a 4-digit PIN when prompted\n3. Record your greeting\n\nTo check messages: Dial 123\nFrom another phone: Call your number → press * at greeting → enter PIN`;
  }
  if (q.includes("no service") || q.includes("signal") || q.includes("not working")) {
    return `Fix No Service / Signal Issues:\n\n1. Toggle Airplane Mode on/off\n2. Restart your phone\n3. Settings → Network → set to Automatic\n4. Re-seat SIM card\n5. Check coverage at lycamobile.us/coverage\n\nIf issues persist, call 1-866-277-3221.`;
  }

  const stepPreview = top.steps.slice(0, 3).map((s, i) => `${i+1}. ${s}`).join("\n");
  return `Here's what I found for "${top.title}":\n\n${stepPreview}\n\n${top.steps.length > 3 ? `...and ${top.steps.length - 3} more steps.` : ""}\n\nWould you like the full guide, or can I help with something more specific?`;
}
