"use client"

import { useLanguage } from "@/contexts/language-context"
import { Linkedin, Mail, FileDown } from "lucide-react"
import { Container } from "@/components/container"

export function Footer() {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--panel-border)]">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-lg text-[10px] font-bold tracking-widest text-[var(--on-grad)]"
              style={{ background: "var(--accent-grad)" }}
            >
              LE
            </span>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Luis Estigarribia. {t.footer.rights}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://www.linkedin.com/in/luis-estigarribia-3225591a3/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <Linkedin className="size-5" />
            </a>
            <a
              href="mailto:luisalfredoestigarribiasosa85@gmail.com"
              aria-label="Email"
              className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <Mail className="size-5" />
            </a>
            <a
              href="/Luis_Estigarribia_Resume.pdf"
              download="Luis_Estigarribia_Resume.pdf"
              aria-label={t.hero.ctaSecondary}
              className="rounded-xl p-2.5 text-muted-foreground transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              <FileDown className="size-5" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
