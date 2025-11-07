"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { type Locale, translations } from "@/lib/i18n"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: typeof translations.en
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = localStorage.getItem("locale") as Locale
    if (saved && (saved === "en" || saved === "es")) {
      setLocaleState(saved)
      document.documentElement.lang = saved
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase()
      const detectedLocale = browserLang.startsWith("es") ? "es" : "en"
      setLocaleState(detectedLocale)
      document.documentElement.lang = detectedLocale
      localStorage.setItem("locale", detectedLocale)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem("locale", newLocale)
    document.documentElement.lang = newLocale
  }

  const t = translations[locale]

  // Prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return <LanguageContext.Provider value={{ locale, setLocale, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
