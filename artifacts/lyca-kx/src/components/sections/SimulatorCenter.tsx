import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Smartphone, CreditCard, RefreshCcw, HandCoins, Settings, UserCheck, ChevronRight, ChevronLeft, CheckCircle, Wifi } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const simulators = [
  { id: "sim", title: "SIM Activation", icon: CreditCard, desc: "Step-by-step guide to activate your physical SIM." },
  { id: "esim", title: "eSIM Activation", icon: Smartphone, desc: "Download and install your digital eSIM profile." },
  { id: "port", title: "Port Number Transfer", icon: RefreshCcw, desc: "Bring your existing number to Lyca Mobile." },
  { id: "recharge", title: "Quick Recharge", icon: HandCoins, desc: "Add credit or buy a bundle plan instantly." },
  { id: "renew", title: "Plan Renewal", icon: Settings, desc: "Set up auto-renewal or change your plan." },
  { id: "setup", title: "Account Setup", icon: UserCheck, desc: "Create your My Lyca account profile." },
];

export function SimulatorCenter() {
  const [activeSim, setActiveSim] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [esimType, setEsimType] = useState("iphone");

  const closeSim = () => {
    setActiveSim(null);
    setTimeout(() => {
      setStep(1);
      setIsProcessing(false);
    }, 300);
  };

  const nextStep = () => {
    if (activeSim === "sim" && step === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
      }, 3000);
    } else if (activeSim === "port" && step === 3) {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep(4);
      }, 2000);
    } else {
      setStep(s => s + 1);
    }
  };

  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const renderSimContent = () => {
    if (activeSim === "sim") {
      return (
        <div className="h-full flex flex-col">
          <div className="flex-1 py-8 px-6 flex flex-col items-center justify-center text-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-sm">
                  <div className="w-24 h-32 bg-slate-100 rounded-xl mx-auto mb-8 relative border-2 border-slate-200 flex items-center justify-center">
                    <CreditCard className="w-12 h-12 text-slate-400" />
                    <div className="absolute -right-4 top-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-bounce">
                      <ChevronLeft className="text-white w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Insert your SIM card</h3>
                  <p className="text-muted-foreground">Pop out the right size SIM for your phone from the multi-fit card and insert it into your device's SIM tray.</p>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-sm">
                  <div className="w-24 h-48 bg-slate-900 rounded-3xl mx-auto mb-8 border-4 border-slate-800 flex items-center justify-center relative overflow-hidden">
                    <div className="w-16 h-32 bg-gradient-to-t from-blue-500 to-emerald-400 opacity-50 blur-xl"></div>
                    <div className="absolute right-0 top-10 w-1 h-8 bg-slate-700 rounded-l"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Turn on your phone</h3>
                  <p className="text-muted-foreground">Power on your device. Make sure it's fully charged. Wait a few moments for it to boot up completely.</p>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-sm">
                  <div className="w-32 h-32 rounded-full border-4 border-slate-100 flex items-center justify-center mx-auto mb-8 relative">
                    <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
                    <Wifi className="w-10 h-10 text-primary animate-pulse" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Wait for network</h3>
                  <p className="text-muted-foreground">We're searching for the Lyca Mobile network. This usually takes 1-3 minutes. You should see bars appear at the top of your screen.</p>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div key="4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="max-w-sm">
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl mx-auto mb-8 font-mono text-3xl font-bold tracking-widest text-primary border border-border">
                    *100#
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Dial *100# to verify</h3>
                  <p className="text-muted-foreground">Open your phone app and dial this code to check your balance and confirm activation is complete.</p>
                </motion.div>
              )}
              {step === 5 && (
                <motion.div key="5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">You're activated!</h3>
                  <p className="text-muted-foreground">Your Lyca Mobile SIM is ready to use. Welcome to the network!</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }

    if (activeSim === "esim") {
      return (
        <div className="h-full flex flex-col">
          <div className="flex-1 py-8 px-6 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-md w-full">
                  <h3 className="text-2xl font-bold mb-6 text-center">Select your device</h3>
                  <RadioGroup defaultValue={esimType} onValueChange={setEsimType} className="gap-4">
                    <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${esimType === 'iphone' ? 'border-primary bg-primary/5' : 'border-border bg-card'}`} onClick={() => setEsimType('iphone')}>
                      <RadioGroupItem value="iphone" id="iphone" />
                      <Label htmlFor="iphone" className="flex-1 font-semibold text-lg cursor-pointer">iPhone (iOS)</Label>
                    </div>
                    <div className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${esimType === 'android' ? 'border-primary bg-primary/5' : 'border-border bg-card'}`} onClick={() => setEsimType('android')}>
                      <RadioGroupItem value="android" id="android" />
                      <Label htmlFor="android" className="flex-1 font-semibold text-lg cursor-pointer">Android (Samsung, Pixel, etc.)</Label>
                    </div>
                  </RadioGroup>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-sm text-center">
                  <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-2xl mb-8 border border-border inline-block">
                    <Settings className="w-12 h-12 mx-auto text-slate-500 mb-2" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Go to Settings</h3>
                  {esimType === 'iphone' ? (
                    <p className="text-muted-foreground text-lg">Open <b>Settings</b> &gt; <b>Cellular</b> &gt; <b>Add Cellular Plan</b> or <b>Add eSIM</b>.</p>
                  ) : (
                    <p className="text-muted-foreground text-lg">Open <b>Settings</b> &gt; <b>Connections</b> &gt; <b>SIM Manager</b> &gt; <b>Add eSIM</b>.</p>
                  )}
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-sm text-center">
                  <div className="w-48 h-48 bg-white border-4 border-slate-200 mx-auto mb-6 p-2 rounded-xl">
                    <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48cGF0aCBkPSJNMCAwdjQwaDQwdi00MGgtNDB6bTEwIDEwaDIwdjIwaC0yMHYtMjB6bTQwIDB2NDBoNDB2LTQwaC00MHptMTAgMTBoMjB2MjBoLTIwdi0yMHptLTYwIDMwdjQwaDQwdi00MGgtNDB6bTEwIDEwaDIwdjIwaC0yMHYtMjB6bTQwIDB2MTBoMTB2LTEwaC0xMHptMjAgMHYxMGgxMHYtMTBoLTEwem0tMjAgMTB2MTBoMTB2LTEwaC0xMHptMjAgMHYxMGgxMHYtMTBoLTEwem0tMjAgMTB2MTBoMTB2LTEwaC0xMHptMjAgMHYxMGgxMHYtMTBoLTEweiIgZmlsbD0iIzAwMCIvPjwvc3ZnPg==')] bg-cover opacity-80"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Scan QR Code</h3>
                  <p className="text-muted-foreground mb-4">Use your phone's camera to scan the QR code we emailed you.</p>
                  <Button variant="outline" className="w-full">Enter details manually instead</Button>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div key="4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="max-w-sm text-center w-full">
                  <h3 className="text-2xl font-bold mb-6">Enter Confirmation</h3>
                  <p className="text-muted-foreground mb-6">If prompted, enter the 4-digit confirmation code provided in your email.</p>
                  <div className="flex gap-2 justify-center mb-8">
                    {[1, 2, 3, 4].map(i => (
                      <Input key={i} className="w-14 h-16 text-center text-2xl font-bold border-2 focus-visible:ring-primary" maxLength={1} placeholder="•" />
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 5 && (
                <motion.div key="5" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="max-w-sm text-center">
                  <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12" />
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-emerald-600 dark:text-emerald-400">eSIM Installed!</h3>
                  <p className="text-muted-foreground">Your profile is active. You may need to restart your device for services to fully connect.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      );
    }
    
    // Default fallback for other simulators
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{simulators.find(s => s.id === activeSim)?.title} Simulator</h2>
        <p className="text-xl text-muted-foreground mb-8">Step {step} of 4</p>
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
          <Settings className="w-10 h-10 text-primary" />
        </div>
        <p className="max-w-md mx-auto">This interactive guide is fully functional in the full implementation.</p>
      </div>
    );
  };

  return (
    <section id="simulator-center" className="py-20 px-4 md:px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Step-by-Step Guided Support</h2>
          <p className="text-muted-foreground text-lg">Follow our interactive guides to resolve issues in minutes.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {simulators.map((sim, idx) => (
            <motion.div
              key={sim.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => { setActiveSim(sim.id); setStep(1); }}
              className="bg-card border border-border rounded-2xl p-6 cursor-pointer hover:shadow-lg hover:border-primary/50 transition-all group flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#0E1F5C]/5 dark:bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <sim.icon className="h-8 w-8 text-[#0066FF]" />
              </div>
              <h3 className="text-lg font-bold mb-2">{sim.title}</h3>
              <p className="text-sm text-muted-foreground">{sim.desc}</p>
              <div className="mt-4 text-sm font-medium text-primary flex items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">
                Start Guide <ChevronRight className="h-4 w-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!activeSim} onOpenChange={(open) => !open && closeSim()}>
        <DialogContent className="max-w-2xl h-[80vh] md:h-[600px] p-0 gap-0 border-0 rounded-2xl overflow-hidden flex flex-col bg-background">
          {activeSim && (
            <>
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between bg-card z-10 relative">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    {(() => {
                      const Icon = simulators.find(s => s.id === activeSim)?.icon || Settings;
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                  </div>
                  <h3 className="font-bold text-lg">{simulators.find(s => s.id === activeSim)?.title}</h3>
                </div>
                <div className="text-sm font-medium text-muted-foreground bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  Step {step} of 5
                </div>
              </div>

              {/* Progress Bar */}
              <Progress value={(step / 5) * 100} className="h-1 rounded-none bg-slate-100" />

              {/* Content Area */}
              <div className="flex-1 relative overflow-hidden bg-white dark:bg-background">
                {renderSimContent()}
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t bg-card flex justify-between items-center z-10 relative">
                <Button 
                  variant="ghost" 
                  onClick={prevStep} 
                  disabled={step === 1 || isProcessing || step === 5}
                  className="gap-2"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </Button>
                
                <div className="flex gap-1.5">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === step ? 'bg-primary scale-125' : i < step ? 'bg-primary/50' : 'bg-slate-200 dark:bg-slate-700'}`} />
                  ))}
                </div>

                {step === 5 ? (
                  <Button onClick={closeSim} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                    Done
                  </Button>
                ) : (
                  <Button 
                    onClick={nextStep} 
                    disabled={isProcessing}
                    className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground min-w-[100px]"
                  >
                    {isProcessing ? "Processing..." : (
                      <>Next <ChevronRight className="w-4 h-4" /></>
                    )}
                  </Button>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
