import { Smartphone, Store } from "lucide-react";
import { Link } from "wouter";

const internalLinks: Record<string, string> = {
  "Best Prepaid Phone Plans": "/plans",
  "eSIM": "/esim",
  "Become a retailer": "https://www.lycamobile.us/en/become-a-retailer/",
  "Student offers": "/plans",
  "Register on our website": "https://www.lycamobile.us/en/register/",
  "Lycamobile Reviews": "https://www.lycamobile.us/en/reviews/",
  "California MTS": "https://www.lycamobile.us/en/california-mts/",
  "Rates": "https://www.lycamobile.us/en/international-calls/rates/",
  "Quick recharge": "/quick-recharge",
  "Coverage & services": "https://www.lycamobile.us/en/coverage/",
  "Activate your plan": "/activate",
  "Plan changes update": "https://www.lycamobile.us/en/plan-changes/",
  "Use of this website": "https://www.lycamobile.us/en/use-of-this-website/",
  "Refer a Friend": "/refer",
  "Contact us": "/help",
  "Security": "https://www.lycamobile.us/en/security/",
  "Cookie policy": "https://www.lycamobile.us/en/cookie-policy/",
  "Port-in status": "https://www.lycamobile.us/en/port-in-status/",
  "Mobile web settings": "https://www.lycamobile.us/en/mobile-web-settings/",
  "FAQ": "/help",
  "About us": "https://www.lycamobile.us/en/about-us/",
  "Blog": "https://www.lycamobile.us/en/blog/",
  "Privacy policy": "https://www.lycamobile.us/en/privacy-policy/",
  "Network Management Policy": "https://www.lycamobile.us/en/network-management-policy/",
  "Terms and conditions": "https://www.lycamobile.us/en/terms-and-conditions/",
  "California billing notice": "https://www.lycamobile.us/en/california-billing-notice/",
  "Become a Lyca Mobile retailer": "https://www.lycamobile.us/en/become-a-retailer/",
  "2G Shutdown": "https://www.lycamobile.us/en/2g-shutdown/",
};

const cols = [
  {
    title: "Join Lyca Mobile",
    links: ["Best Prepaid Phone Plans", "eSIM", "California MTS", "Become a retailer", "Student offers", "Register on our website", "Lycamobile Reviews"],
  },
  {
    title: "Quick links",
    links: ["Rates", "Quick recharge", "Coverage & services", "Activate your plan", "Plan changes update", "Use of this website", "Refer a Friend"],
  },
  {
    title: "Help & support",
    links: ["Contact us", "Security", "Cookie policy", "Port-in status", "Mobile web settings", "FAQ"],
  },
  {
    title: "Lyca Mobile US",
    links: ["About us", "Blog", "Privacy policy", "Network Management Policy", "Terms and conditions", "California billing notice", "Become a Lyca Mobile retailer", "2G Shutdown"],
  },
];

function FooterLink({ label }: { label: string }) {
  const href = internalLinks[label] ?? "#";
  const isInternal = href.startsWith("/");
  const className = "text-white/60 hover:text-white transition-colors text-xs leading-relaxed block";

  if (isInternal) {
    return <Link href={href} className={className}>{label}</Link>;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{label}</a>;
}

export function Footer() {
  return (
    <footer className="bg-[#0E1F5C] text-white pt-14 pb-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
          {cols.map((col) => (
            <div key={col.title} className="flex flex-col gap-2">
              <h4 className="font-bold text-sm mb-2 text-white">{col.title}</h4>
              {col.links.map((label) => (
                <FooterLink key={label} label={label} />
              ))}
            </div>
          ))}

          {/* Lyca on the go */}
          <div className="flex flex-col gap-3 col-span-2 md:col-span-1">
            <h4 className="font-bold text-sm mb-2 text-white">Lyca on the go</h4>
            <a href="https://play.google.com/store/apps/details?id=com.lycamobile.us"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2.5 transition-colors">
              <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path d="M3.18 23.76A1.99 1.99 0 0 1 2 22V2c0-.76.44-1.43 1.09-1.76L13.37 12 3.18 23.76z" fill="#4FC3F7"/>
                  <path d="M16.64 15.4 5.12 21.91l8.25-9.27 3.27 2.76z" fill="#00BCD4"/>
                  <path d="M21.5 10.87c.64.37 1.03 1.01 1.03 1.65s-.39 1.28-1.03 1.65l-3.16 1.85-3.6-3.26 3.6-3.26 3.16 1.37z" fill="#FFCA28"/>
                  <path d="M5.12 2.09 16.64 8.6l-3.27 2.76-8.25-9.27z" fill="#F44336"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/60 uppercase tracking-wide leading-none">GET IT ON</span>
                <span className="text-xs font-bold text-white leading-tight mt-0.5">Google Play</span>
              </div>
            </a>
            <a href="https://apps.apple.com/us/app/my-lyca/id1215252009"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2.5 transition-colors">
              <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center shrink-0">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="white">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/60 uppercase tracking-wide leading-none">Available on the</span>
                <span className="text-xs font-bold text-white leading-tight mt-0.5">App Store</span>
              </div>
            </a>
            <a href="https://www.lycamobile.us/en/store-locator/" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-3 py-2.5 transition-colors">
              <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center shrink-0">
                <Store className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] text-white/60 uppercase tracking-wide leading-none">Find a</span>
                <span className="text-xs font-bold text-white leading-tight mt-0.5">Store locator</span>
              </div>
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-6 border-t border-white/15 gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-extrabold text-white tracking-tighter">LYCA</span>
            <span className="text-[9px] font-bold tracking-widest text-[#00D084] uppercase">Mobile</span>
          </Link>

          <p className="text-xs text-white/50 text-center">
            © 2026 Lycamobile USA Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://www.facebook.com/LycaMobileUSA" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://twitter.com/LycaMobileUSA" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href="https://www.instagram.com/lycamobileusa/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
