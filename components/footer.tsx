"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Linkedin, Mail } from "lucide-react"
import { Container } from "@/components/container"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30">
      <Container>
        <div className="py-12 md:py-16">
          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a
                  href="https://www.linkedin.com/in/luis-estigarribia-3225591a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="size-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:contact@example.com" aria-label="Email">
                  <Mail className="size-5" />
                </a>
              </Button>
            </div>

            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">
                © {currentYear} Luis Estigarribia. {t.footer.rights}
              </p>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}
