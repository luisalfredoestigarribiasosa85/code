"use client"

import { useEffect, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { Container } from "@/components/container"

const strata = [
  { name: "Backend", skills: ["Ruby on Rails", "Node.js", "Express", "PostgreSQL", "REST APIs"] },
  { name: "Frontend", skills: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS"] },
  { name: "DevOps & Cloud", skills: ["Docker", "Kamal", "Google Cloud", "Render", "Git/GitHub"] },
  { name: "Tools", skills: ["Swagger/OpenAPI", "SQL", "NoSQL"] },
]

export function AboutSection() {
  const { t } = useLanguage()
  const [is3D, setIs3D] = useState(true)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)")
    const update = () => setIs3D(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  return (
    <section id="about" className="scroll-mt-28 border-t border-[var(--panel-border)] bg-[rgb(0_0_0/0.08)] py-20 dark:bg-[rgb(255_255_255/0.02)] sm:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="space-y-8 lg:col-span-5">
            <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-none tracking-tight">{t.about.title}</h2>
            <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">{t.about.body}</p>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild className="h-12 px-6 text-base">
                <a href="/Luis_Estigarribia_Resume.pdf" download="Luis_Estigarribia_Resume.pdf">
                  {t.hero.ctaSecondary}
                  <FileDown className="size-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Strata stack — layered plates (3D only at sm and up) */}
          <div
            className="lg:col-span-7"
            style={is3D ? { perspective: "1200px" } : undefined}
            aria-label="Tech stack by layer"
            role="img"
          >
            <div
              className="relative flex flex-col gap-3 sm:gap-4"
              style={is3D ? { transform: "rotateX(14deg)", transformStyle: "preserve-3d" } : undefined}
            >
              {strata.map((layer, i) => (
                <div
                  key={layer.name}
                  className="panel flex flex-col gap-3 px-5 py-4 transition-transform duration-300 ease-out sm:flex-row sm:items-center sm:gap-6 sm:px-6 sm:py-5"
                  style={{
                    transform: is3D ? `translateZ(${(strata.length - i) * 22}px)` : undefined,
                    boxShadow: "var(--panel-shadow)",
                    opacity: is3D ? 0.75 + i * 0.08 : 1,
                  }}
                >
                  <p className="w-28 shrink-0 text-xs font-semibold text-muted-foreground sm:text-sm">
                    {layer.name}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {layer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-[var(--panel-border)] bg-[var(--accent-soft)] px-2.5 py-1 text-[11px] leading-tight text-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
