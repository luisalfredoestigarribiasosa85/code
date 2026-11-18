"use client"

import type { ReactNode } from "react"
import { useLanguage } from "@/contexts/language-context"
import type { Project } from "@/lib/projects"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ExternalLink, ArrowLeft, ArrowUpRight } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/container"

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="panel space-y-4 p-6 sm:p-8">
      <h2 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">{title}</h2>
      {children}
    </section>
  )
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="max-w-prose space-y-2.5 text-muted-foreground">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed">
          <span aria-hidden="true" className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ProjectDetailClient({ project }: { project: Project }) {
  const { locale, t } = useLanguage()

  return (
    <>
      <Navigation />
      <main id="main-content" className="relative min-h-screen overflow-hidden">
        {/* background outline slug */}
        <p
          aria-hidden="true"
          className="outline-word pointer-events-none absolute -top-2 right-0 select-none text-[clamp(3.5rem,14vw,9rem)] font-bold uppercase leading-none tracking-tighter"
        >
          {project.slug}
        </p>

        <Container className="relative">
          <article className="mx-auto max-w-4xl space-y-6 py-14 sm:py-16 lg:py-20">
            {/* Back */}
            <Button variant="ghost" asChild className="-ml-3 text-muted-foreground hover:text-foreground">
              <Link href="/#projects">
                <ArrowLeft className="size-4" />
                {t.caseStudy.backToProjects}
              </Link>
            </Button>

            {/* Header */}
            <header className="space-y-6 pb-6">
              <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] font-bold leading-[1.02] tracking-tighter">
                {project.title[locale]}
              </h1>
              <p className="max-w-prose text-xl leading-relaxed text-muted-foreground">
                {project.description[locale]}
              </p>
              <div className="flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <Button key={link.href} asChild className="h-11 px-5">
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="size-4" />
                      {link.label}
                      <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                ))}
              </div>
            </header>

            {project.overview && (
              <Section title={t.caseStudy.overview}>
                <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
                  {project.overview[locale]}
                </p>
              </Section>
            )}

            <Section title={t.caseStudy.techStack}>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="chip">
                    {tech}
                  </span>
                ))}
              </div>
            </Section>

            {project.role && (
              <Section title={t.caseStudy.role}>
                <Bullets items={project.role} />
              </Section>
            )}

            {project.problemSolution && (
              <Section title={t.caseStudy.problem}>
                <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
                  {project.problemSolution[locale]}
                </p>
              </Section>
            )}

            {project.architecture && (
              <Section title={t.caseStudy.architecture}>
                <Bullets items={project.architecture} />
              </Section>
            )}

            {project.challenges && (
              <Section title={t.caseStudy.challenges}>
                <Bullets items={project.challenges} />
              </Section>
            )}

            {project.outcomes && (
              <Section title={t.caseStudy.outcomes}>
                <Bullets items={project.outcomes} />
              </Section>
            )}

            <Section title={t.caseStudy.links}>
              <Bullets items={project.highlightPoints} />
            </Section>

            <div className="pt-4">
              <Button variant="outline" asChild className="h-11 px-5">
                <Link href="/#projects">
                  <ArrowLeft className="size-4" />
                  {t.caseStudy.backToProjects}
                </Link>
              </Button>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}
