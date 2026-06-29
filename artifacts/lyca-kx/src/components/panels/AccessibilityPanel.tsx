import { useState, useEffect, useRef } from "react";
import { X, Moon, Sun, Type, Eye, AlignLeft, Palette, MousePointer2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, accessibilitySettings, updateAccessibility, resetAccessibility } = useTheme();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 left-6 z-50"
          >
            <button ref={triggerRef} onClick={() => setIsOpen(true)}
              className="w-12 h-12 rounded-full bg-[#0066FF] shadow-lg hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-[#0066FF] focus:ring-offset-2 flex items-center justify-center"
              aria-label="Accessibility Options">
              {/* Universal Accessibility Symbol — SVG */}
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="5" r="1.5" fill="white" stroke="none"/>
                <path d="M6 9h12M12 9v4M10 22l2-5 2 5M8 14l-2 5M16 14l2 5"/>
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, x: -50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 md:bottom-6 md:left-6 w-full md:w-[320px] max-h-[85vh] bg-background border border-border md:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            <div className="bg-[#0066FF] text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="1.5" fill="white" stroke="none"/>
                    <path d="M6 9h12M12 9v4M10 22l2-5 2 5M8 14l-2 5M16 14l2 5"/>
                  </svg>
                </div>
                <h3 className="font-bold">Accessibility</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar">
              {/* Theme Toggle */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Palette className="w-3 h-3" /> Visual
                </h4>
                <div className="flex items-center justify-between">
                  <Label htmlFor="dark-mode" className="flex items-center gap-2 cursor-pointer">
                    {theme === 'dark' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    Dark Mode
                  </Label>
                  <Switch id="dark-mode" checked={theme === 'dark'} onCheckedChange={(c) => setTheme(c ? 'dark' : 'light')} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="high-contrast" className="flex items-center gap-2 cursor-pointer">
                    <Eye className="w-4 h-4" />
                    High Contrast
                  </Label>
                  <Switch id="high-contrast" checked={accessibilitySettings.highContrast} onCheckedChange={(c) => updateAccessibility({ highContrast: c })} />
                </div>
              </div>

              {/* Typography */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <Type className="w-3 h-3" /> Typography
                </h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span>Text Size</span>
                    <span className="font-mono bg-muted px-2 py-0.5 rounded">{accessibilitySettings.fontSize}px</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button onClick={() => updateAccessibility({ fontSize: Math.max(12, accessibilitySettings.fontSize - 2) })}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">A-</button>
                    <Slider value={[accessibilitySettings.fontSize]} min={12} max={24} step={2}
                      onValueChange={(v) => updateAccessibility({ fontSize: v[0] })} className="flex-1" />
                    <button onClick={() => updateAccessibility({ fontSize: Math.min(24, accessibilitySettings.fontSize + 2) })}
                      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-lg">A+</button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Label htmlFor="read-mode" className="flex items-center gap-2 cursor-pointer">
                    <AlignLeft className="w-4 h-4" /> Read Mode (Serif)
                  </Label>
                  <Switch id="read-mode" checked={accessibilitySettings.readMode} onCheckedChange={(c) => updateAccessibility({ readMode: c })} />
                </div>
              </div>

              {/* Advanced */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                  <MousePointer2 className="w-3 h-3" /> Advanced
                </h4>
                <div className="flex items-center justify-between">
                  <Label htmlFor="adhd" className="cursor-pointer">ADHD Support Tint</Label>
                  <Switch id="adhd" checked={accessibilitySettings.adhdSupport} onCheckedChange={(c) => updateAccessibility({ adhdSupport: c })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="keyboard" className="cursor-pointer">Keyboard Navigation</Label>
                  <Switch id="keyboard" checked={accessibilitySettings.keyboardNav} onCheckedChange={(c) => updateAccessibility({ keyboardNav: c })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-reader" className="cursor-pointer">Screen Reader Support</Label>
                  <Switch id="screen-reader" checked={accessibilitySettings.screenReader} onCheckedChange={(c) => updateAccessibility({ screenReader: c })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="focus-ring" className="cursor-pointer">Focus Highlight</Label>
                  <Switch id="focus-ring" checked={accessibilitySettings.focusHighlight} onCheckedChange={(c) => updateAccessibility({ focusHighlight: c })} />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="link-hl" className="cursor-pointer">Link Highlight</Label>
                  <Switch id="link-hl" checked={accessibilitySettings.linkHighlight} onCheckedChange={(c) => updateAccessibility({ linkHighlight: c })} />
                </div>
                <div className="pt-2">
                  <Label className="mb-2 block">Cursor Size</Label>
                  <RadioGroup value={accessibilitySettings.cursor}
                    onValueChange={(v: "default" | "large" | "xl") => updateAccessibility({ cursor: v })}
                    className="flex gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="default" id="c-def" /><Label htmlFor="c-def">Default</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="large" id="c-lg" /><Label htmlFor="c-lg">Large</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="xl" id="c-xl" /><Label htmlFor="c-xl">XL</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <button onClick={() => { resetAccessibility(); setTheme('light'); }}
                  className="w-full py-2 text-sm font-semibold text-destructive hover:bg-destructive/10 rounded-lg transition-colors">
                  Reset All Settings
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
