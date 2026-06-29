import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppDownload() {
  return (
    <section id="app-download" className="py-24 px-4 md:px-6 bg-[#0E1F5C] text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#0066FF]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#00D084]/10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* Left: Compact Phone Mockup */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-end relative">
            <div className="relative w-[220px] sm:w-[240px] h-[460px] sm:h-[490px] bg-slate-900 rounded-[2.5rem] border-[7px] border-slate-800 shadow-2xl overflow-hidden shrink-0">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-3xl z-20"></div>
              <div className="absolute inset-0 bg-slate-50 flex flex-col">
                <div className="bg-[#0E1F5C] pt-10 pb-5 px-5 text-white rounded-b-[1.5rem] shadow-md z-10">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold tracking-tight">LYCA</span>
                    <div className="w-7 h-7 rounded-full bg-white/20"></div>
                  </div>
                  <p className="text-blue-200 text-xs mb-1">Hello, John</p>
                  <h3 className="text-2xl font-bold mb-1">$45.50</h3>
                  <p className="text-blue-200 text-[10px]">Available Balance</p>
                </div>
                <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-slate-800 text-xs">Unlimited Plan</span>
                      <span className="text-[10px] text-[#0066FF] font-semibold bg-blue-50 px-2 py-0.5 rounded">Active</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mb-3">Renews in 12 days</p>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium text-slate-700">
                        <span>Data Usage</span><span>12GB / 40GB</span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-[#00D084] h-1.5 rounded-full w-[30%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2.5 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center text-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0066FF] flex items-center justify-center font-bold">+</div>
                      <span className="text-[10px] font-semibold text-slate-700">Recharge</span>
                    </div>
                    <div className="bg-white p-2.5 rounded-lg shadow-sm border border-slate-100 flex flex-col items-center text-center gap-1">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 text-[#00D084] flex items-center justify-center">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-700">Plans</span>
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mt-auto">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-orange-500 shrink-0">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" /></svg>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-800">Refer a Friend</p>
                        <p className="text-[9px] text-slate-500">Get $5 credit free</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-1/4 -right-8 w-20 h-20 bg-[#00D084] rounded-2xl rotate-12 opacity-80 blur-sm -z-10"></div>
            <div className="absolute bottom-1/4 -left-6 w-24 h-24 bg-[#0066FF] rounded-full opacity-60 blur-sm -z-10"></div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2 flex flex-col text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full w-fit mb-6 border border-white/20 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#00D084] animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wide uppercase">New Version Available</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-tight">
              Manage Everything <br/>
              <span className="text-[#00D084]">in One Place</span>
            </h2>
            <p className="text-lg text-blue-100/80 mb-8 max-w-lg">
              Download the My Lyca app to take full control of your account, monitor usage, and get support instantly.
            </p>
            <ul className="space-y-4 mb-10">
              {["Check your balance instantly", "Renew plans with one tap", "Monitor data usage in real time", "Access 24/7 support"].map((benefit, i) => (
                <li key={i} className="flex items-center text-lg text-white/90 font-medium">
                  <CheckCircle2 className="h-6 w-6 text-[#00D084] mr-3 shrink-0" />{benefit}
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              {/* QR code */}
              <div className="bg-white p-3 rounded-xl shrink-0 hidden sm:block shadow-xl">
                <svg width="90" height="90" viewBox="0 0 21 21" className="fill-slate-900">
                  <path d="M0 0h7v7H0zM2 2h3v3H2zM14 0h7v7h-7zM16 2h3v3h-3zM0 14h7v7H0zM2 16h3v3H2zM9 0h1v2H9zM10 1h2v1h-2zM11 2h1v1h-1zM9 3h1v1H9zM12 3h2v1h-2zM8 4h1v1H8zM10 4h1v1h-1zM13 4h1v1h-1zM9 5h2v1H9zM12 5h1v1h-1zM8 6h1v1H8zM10 6h3v1h-3zM0 8h2v1H0zM3 8h1v1H3zM5 8h2v1H5zM8 8h1v1H8zM10 8h1v2h-1zM12 8h1v1h-1zM14 8h1v1h-1zM16 8h1v1h-1zM18 8h3v1h-3zM0 9h1v1H0zM2 9h2v1H2zM5 9h1v1H5zM7 9h1v1H7zM11 9h1v1h-1zM13 9h1v1h-1zM15 9h2v1h-2zM18 9h1v1h-1zM20 9h1v1h-1zM0 10h1v1H0zM2 10h1v1H2zM4 10h2v1H4zM7 10h2v1H7zM12 10h1v1h-1zM14 10h1v1h-1zM16 10h1v1h-1zM18 10h1v1h-1zM20 10h1v1h-1zM1 11h2v1H1zM4 11h1v1H4zM6 11h1v1H6zM8 11h1v1H8zM10 11h3v1h-3zM14 11h1v1h-1zM16 11h1v2h-1zM18 11h2v1h-2zM0 12h1v1H0zM2 12h1v1H2zM4 12h1v1H4zM6 12h2v1H6zM9 12h1v1H9zM11 12h1v1h-1zM13 12h1v1h-1zM15 12h1v1h-1zM18 12h1v1h-1zM20 12h1v1h-1z" />
                </svg>
              </div>

              <div className="flex flex-col gap-3 w-full sm:w-auto">
                {/* Apple App Store */}
                <a href="https://apps.apple.com/us/app/my-lyca/id1215252009" target="_blank" rel="noopener noreferrer">
                  <Button className="h-14 px-6 bg-black hover:bg-gray-900 text-white rounded-xl gap-3 justify-start w-full sm:w-auto overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0 fill-white">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] uppercase font-semibold text-white/70 leading-none">Download on the</span>
                      <span className="text-lg font-bold leading-none mt-0.5">App Store</span>
                    </div>
                  </Button>
                </a>

                {/* Google Play */}
                <a href="https://play.google.com/store/apps/details?id=com.lycamobile.us" target="_blank" rel="noopener noreferrer">
                  <Button className="h-14 px-6 bg-white hover:bg-gray-50 text-slate-900 rounded-xl gap-3 justify-start w-full sm:w-auto overflow-hidden relative group border border-slate-200">
                    <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <svg viewBox="0 0 512 512" className="w-7 h-7 shrink-0">
                      <path fill="#4FC3F7" d="M48 59.6v392.8c0 21.8 24 35.1 42.4 23.5l347.6-196.4c18.6-10.5 18.6-37.2 0-47.8L90.4 36.1C72 24.5 48 37.8 48 59.6z"/>
                      <path fill="#F44336" d="M395.3 337.5L105 490.2c-5.7 3.2-11.6 4.4-17.2 4L303 256 395.3 337.5z"/>
                      <path fill="#4CAF50" d="M395.3 174.5L303 256l92.3-81.5 58.4 33-58.4-33zm0 0l58.4 33C472 217.8 476 236.5 476 256s-4 38.2-22.3 48.5l-58.4 33 58.4-33z" opacity=".85"/>
                      <path fill="#FFCA28" d="M87.8 17.8c5.6-.4 11.5.8 17.2 4L395.3 174.5 303 256 87.8 17.8z"/>
                    </svg>
                    <div className="flex flex-col items-start text-left">
                      <span className="text-[10px] uppercase font-semibold text-slate-500 leading-none">GET IT ON</span>
                      <span className="text-lg font-bold leading-none mt-0.5">Google Play</span>
                    </div>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
