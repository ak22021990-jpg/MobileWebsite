import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";

interface AccessibilitySettings {
  highContrast: boolean;
  readMode: boolean;
  adhdSupport: boolean;
  keyboardNav: boolean;
  screenReader: boolean;
  focusHighlight: boolean;
  linkHighlight: boolean;
  fontSize: number;
  cursor: "default" | "large" | "xl";
}

const defaultAccessibilitySettings: AccessibilitySettings = {
  highContrast: false,
  readMode: false,
  adhdSupport: false,
  keyboardNav: false,
  screenReader: false,
  focusHighlight: false,
  linkHighlight: false,
  fontSize: 16,
  cursor: "default",
};

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  accessibilitySettings: AccessibilitySettings;
  updateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
  resetAccessibility: () => void;
}

const initialState: ThemeProviderState = {
  theme: "light",
  setTheme: () => null,
  accessibilitySettings: defaultAccessibilitySettings,
  updateAccessibility: () => null,
  resetAccessibility: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "vite-ui-theme",
}: {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(() => {
    const saved = localStorage.getItem("lyca-accessibility");
    return saved ? JSON.parse(saved) : defaultAccessibilitySettings;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    if (theme === "dark") {
      root.classList.add("dark");
    }
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Apply accessibility classes
    root.classList.toggle("high-contrast", accessibilitySettings.highContrast);
    root.classList.toggle("read-mode", accessibilitySettings.readMode);
    root.classList.toggle("adhd-mode", accessibilitySettings.adhdSupport);
    root.classList.toggle("keyboard-nav", accessibilitySettings.keyboardNav);
    root.classList.toggle("focus-highlight", accessibilitySettings.focusHighlight);
    root.classList.toggle("link-highlight", accessibilitySettings.linkHighlight);
    
    root.classList.remove("cursor-large", "cursor-xl");
    if (accessibilitySettings.cursor === "large") root.classList.add("cursor-large");
    if (accessibilitySettings.cursor === "xl") root.classList.add("cursor-xl");

    root.style.fontSize = `${accessibilitySettings.fontSize}px`;

    localStorage.setItem("lyca-accessibility", JSON.stringify(accessibilitySettings));
  }, [accessibilitySettings]);

  const value = {
    theme,
    setTheme: (theme: Theme) => setTheme(theme),
    accessibilitySettings,
    updateAccessibility: (settings: Partial<AccessibilitySettings>) => {
      setAccessibilitySettings((prev) => ({ ...prev, ...settings }));
    },
    resetAccessibility: () => setAccessibilitySettings(defaultAccessibilitySettings),
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
      {accessibilitySettings.screenReader && (
        <div aria-live="polite" className="sr-only">
          Screen reader mode enabled
        </div>
      )}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");
  return context;
};
