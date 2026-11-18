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
      const scrollPosition = window.scrollY + 100

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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        {t.skipToContent}
      </a>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Container>
          <nav className="flex h-16 items-center justify-between" aria-label="Main navigation">
            <Link href="/" className="text-lg font-semibold hover:text-primary transition-colors">
              LE
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`/#${item.id}`}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-1",
                    activeSection === item.id ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden size-9" aria-label={t.nav.menu}>
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <div className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <a
                        key={item.id}
                        href={`/#${item.id}`}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "text-left text-base font-medium transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm px-2 py-2",
                          activeSection === item.id ? "text-primary" : "text-muted-foreground",
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
