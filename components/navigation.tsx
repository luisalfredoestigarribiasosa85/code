"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Container } from "@/components/container"

export function Navigation() {
  const { t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "projects", "about", "contact"]
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { id: "home", label: t.nav.home },
    { id: "projects", label: t.nav.projects },
    { id: "about", label: t.nav.about },
    { id: "contact", label: t.nav.contact },
  ]

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        {t.skipToContent}
      </a>
      <header className="sticky top-4 z-40">
        <Container>
          <nav
            className="glass flex h-14 items-center justify-between gap-4 rounded-2xl px-3 sm:px-4"
            aria-label="Main navigation"
          >
            <Link
              href="/"
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold tracking-widest text-[var(--on-grad)]"
              style={{ background: "var(--accent-grad)" }}
              aria-label="Luis Estigarribia — home"
            >
              LE
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                    activeSection === item.id
                      ? "text-[var(--accent)]"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              <ThemeToggle />
              <LanguageToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-9 md:hidden" aria-label={t.nav.menu}>
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="border-[var(--panel-border)] bg-[var(--panel-solid)]">
                  <div className="mt-10 flex flex-col gap-2">
                    {navItems.map((item) => (
                      <a
                        key={item.id}
                        href={`/#${item.id}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "rounded-xl px-4 py-3 text-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]",
                          activeSection === item.id
                            ? "bg-[var(--accent-soft)] text-[var(--accent)]"
                            : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </nav>
        </Container>
      </header>
    </>
  )
}
