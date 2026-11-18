"use client"

import { useLanguage } from "@/contexts/language-context"
import { projects } from "@/lib/projects"
import { Button } from "@/components/ui/button"
import { ExternalLink, FileText, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/container"

export function ProjectsSection() {
  const { locale, t } = useLanguage()

  return (
    <section id="projects" className="scroll-mt-28 py-20 sm:py-24">
      <Container>
        <div className="mb-14 flex flex-col gap-4 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-none tracking-tight">
            {t.projects.title}
          </h2>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">{t.hero.subtitle}</p>
        </div>

        <div className="border-t border-[var(--panel-border)]">
          {projects.map((project, index) => {
            const flip = index % 2 === 1
            return (
              <article
                key={project.slug}
                className="group relative grid gap-8 overflow-hidden border-b border-[var(--panel-border)] py-10 transition-colors duration-300 sm:py-14 lg:grid-cols-12 lg:gap-12"
              >
                {/* outline word */}
                <span
                  aria-hidden="true"
                  className="outline-word pointer-events-none absolute top-1/2 -translate-y-1/2 select-none text-[clamp(3.5rem,11vw,8rem)] font-bold uppercase leading-none tracking-tighter opacity-100"
                  style={flip ? { right: "-0.05em" } : { left: "-0.05em" }}
                >
                  {project.title.en.split(" ")[0]}
                </span>

                {/* Copy */}
                <div
                  className={`relative flex flex-col justify-center gap-6 lg:col-span-7 ${flip ? "lg:order-2 lg:pl-4" : ""}`}
                >
                  <div className="space-y-3">
                    <h3 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-[1.05] tracking-tight">
                      {project.title[locale]}
                    </h3>
                    <p className="max-w-lg leading-relaxed text-muted-foreground">{project.description[locale]}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="chip">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                    {project.links.map((link) => (
                      <Button key={link.href} asChild className="h-11 w-full justify-center px-5 sm:w-auto">
                        <a href={link.href} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="size-4" />
                          {t.projects.visit}
                        </a>
                      </Button>
                    ))}
                    <Button variant="outline" asChild className="h-11 w-full justify-center px-5 sm:w-auto">
                      <Link href={`/projects/${project.slug}`}>
                        <FileText className="size-4" />
                        {t.projects.caseStudy}
                        <ArrowUpRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </Button>
                  </div>
                </div>

                {/* Depth plate */}
                <div className={`relative flex items-center justify-center lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
                  <div className="panel flex h-44 w-full max-w-sm flex-col justify-between overflow-hidden p-6 transition-transform duration-300 ease-out group-hover:-translate-y-2 sm:h-52">
                    <span aria-hidden="true" className="iri-text font-bold leading-none text-6xl tracking-tighter">
                      {project.title[locale].slice(0, 1)}
                    </span>
                    <div className="flex items-end justify-between gap-4">
                      <p className="whitespace-pre-line font-mono text-[10.5px] leading-relaxed text-muted-foreground">
                        {project.stack.slice(0, 3).join("\n")}
                      </p>
                      <span aria-hidden="true" className="font-mono text-[10.5px] text-muted-foreground">
                        ./{project.slug}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
