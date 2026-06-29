import { useState } from "react";
import { ShoppingBag, User, Menu, ChevronDown, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AdminPanel } from "@/components/panels/AdminPanel";
import { Link, useLocation } from "wouter";
import lycaLogo from "@assets/{6835E840-DCAC-4F41-8E19-C7AE869BF118}_1781877614429.png";

const navLinks = [
  { label: "Plans", href: "/plans" },
  { label: "Help & Support", href: "/help" },
  { label: "Refer a Friend", href: "/refer" },
  { label: "eSIM", href: "/esim" },
  { label: "Activate SIM", href: "/activate" },
];

const languages = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇲🇽" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [lang, setLang] = useState(languages[0]);
  const [location] = useLocation();

  const isActive = (href: string) => location === href;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-white dark:bg-slate-900 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img src={lycaLogo} alt="Lyca Mobile" className="h-8 object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className={`px-3 py-2 rounded-lg transition-colors font-medium hover:text-[#0066FF] hover:bg-[#0066FF]/5 ${isActive(link.href) ? "text-[#0066FF] bg-[#0066FF]/10" : "text-muted-foreground"}`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/quick-recharge">
              <Button className="bg-[#00D084] hover:bg-[#00b372] text-white rounded-full px-5 font-semibold text-sm h-9">
                Quick Recharge
              </Button>
            </Link>

            <a href="https://www.lycamobile.us/en/my-account/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
                <User className="h-4 w-4" />
                <span>Account</span>
                <ChevronDown className="h-3 w-3 opacity-60" />
              </Button>
            </a>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1.5 px-2 text-sm">
                  <span className="text-base leading-none">{lang.flag}</span>
                  <span className="font-semibold">{lang.code.toUpperCase()}</span>
                  <ChevronDown className="h-3 w-3 opacity-60" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[140px]">
                {languages.map(l => (
                  <DropdownMenuItem key={l.code} onClick={() => setLang(l)} className="gap-2">
                    <span className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" onClick={() => setAdminOpen(true)}
              className="gap-1.5 text-xs text-muted-foreground hover:text-foreground px-2">
              <Lock className="h-3.5 w-3.5" /> Admin
            </Button>

            <a href="https://www.lycamobile.us/en/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-1 right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#0066FF] text-[8px] text-white font-bold">0</span>
              </Button>
            </a>
          </div>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <img src={lycaLogo} alt="Lyca Mobile" className="h-8 object-contain" />
                </Link>
                <nav className="flex flex-col gap-1 text-base font-medium">
                  {navLinks.map((link) => (
                    <Link key={link.label} href={link.href}
                      className={`px-3 py-3 rounded-lg transition-colors font-medium border-b border-border ${isActive(link.href) ? "text-[#0066FF] bg-[#0066FF]/10" : "text-foreground hover:text-[#0066FF]"}`}
                      onClick={() => setIsOpen(false)}>
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 mt-2">
                  <Link href="/quick-recharge" onClick={() => setIsOpen(false)}>
                    <Button className="bg-[#00D084] hover:bg-[#00b372] text-white rounded-full w-full">Quick Recharge</Button>
                  </Link>
                  <a href="https://www.lycamobile.us/en/my-account/" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="w-full justify-start gap-2"><User className="h-4 w-4" />Account</Button>
                  </a>
                  <Button variant="outline" className="w-full justify-start gap-2"
                    onClick={() => { setIsOpen(false); setAdminOpen(true); }}>
                    <Lock className="h-4 w-4" />Admin Panel
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <AdminPanel open={adminOpen} onClose={() => setAdminOpen(false)} />
    </>
  );
}
