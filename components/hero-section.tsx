"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Linkedin } from "lucide-react"
import { Container } from "@/components/container"

const techStack = [
  "Ruby on Rails",
  "Node.js",
  "Express",
  "HTML",
  "CSS",
  "Bootstrap",
  "JavaScript",
  "Docker",
  "Google Cloud",
  "Render",
  "Kamal",
  "Swagger/OpenAPI",
  "Git/GitHub",
  "SQL",
  "PostgreSQL",
]

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="home" className="scroll-mt-20 min-h-[60vh] flex items-center py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight text-balance">{t.hero.title}</h1>
            <p className="text-lg text-muted-foreground sm:text-xl max-w-prose mx-auto text-balance leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href="#projects">{t.hero.ctaPrimary}</a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <a href="/Luis_Estigarribia_Resume.pdf" download="Luis_Estigarribia_Resume.pdf">
                {t.hero.ctaSecondary}
              </a>
            </Button>
          </div>

          <div className="pt-8">
            <Button variant="ghost" size="icon" asChild className="size-10" aria-label="LinkedIn">
              <a
                href="https://www.linkedin.com/in/luis-estigarribia-3225591a3/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="size-5" />
              </a>
            </Button>
          </div>

          <div className="pt-8 space-y-4">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{t.stack.title}</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
