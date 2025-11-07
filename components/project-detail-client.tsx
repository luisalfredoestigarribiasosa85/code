"use client"

import { useLanguage } from "@/contexts/language-context"
import type { Project } from "@/lib/projects"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/container"

export function ProjectDetailClient({ project }: { project: Project }) {
  const { locale, t } = useLanguage()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Container>
          <article className="py-12 md:py-16 lg:py-20">
            <div className="mx-auto max-w-4xl space-y-12">
              {/* Back button */}
              <Button variant="ghost" asChild onClick={scrollToTop}>
                <Link href="/#projects">
                  <ArrowLeft className="size-4 mr-2" />
                  {t.caseStudy.backToProjects}
                </Link>
              </Button>

              {/* Header */}
              <header className="space-y-6">
                <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold tracking-tight text-balance">
                  {project.title[locale]}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-prose">
                  {project.description[locale]}
                </p>
                <div className="flex flex-wrap gap-3">
                  {project.links.map((link) => (
                    <Button key={link.href} asChild>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4 mr-2" />
                        {link.label}
                      </a>
                    </Button>
                  ))}
                </div>
              </header>

              {/* Overview */}
              {project.overview && (
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold">{t.caseStudy.overview}</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground max-w-prose">
                      {project.overview[locale]}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Tech Stack */}
              <Card className="rounded-2xl shadow-lg">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold">{t.caseStudy.techStack}</h2>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-sm">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Role & Responsibilities */}
              {project.role && (
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold">{t.caseStudy.role}</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground max-w-prose">
                      {project.role.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Problem → Solution */}
              {project.problemSolution && (
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold">{t.caseStudy.problem}</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground max-w-prose">
                      {project.problemSolution[locale]}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Architecture */}
              {project.architecture && (
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold">{t.caseStudy.architecture}</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground max-w-prose">
                      {project.architecture.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Challenges */}
              {project.challenges && (
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold">{t.caseStudy.challenges}</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground max-w-prose">
                      {project.challenges.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Outcomes */}
              {project.outcomes && (
                <Card className="rounded-2xl shadow-lg">
                  <CardContent className="pt-6 space-y-4">
                    <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold">{t.caseStudy.outcomes}</h2>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground max-w-prose">
                      {project.outcomes.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Highlight Points */}
              <Card className="rounded-2xl shadow-lg bg-muted/50">
                <CardContent className="pt-6 space-y-4">
                  <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-bold">{t.caseStudy.links}</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground max-w-prose">
                    {project.highlightPoints.map((point, index) => (
                      <li key={index} className="leading-relaxed">
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Back to projects */}
              <div className="pt-8">
                <Button variant="outline" asChild onClick={scrollToTop}>
                  <Link href="/#projects">
                    <ArrowLeft className="size-4 mr-2" />
                    {t.caseStudy.backToProjects}
                  </Link>
                </Button>
              </div>
            </div>
          </article>
        </Container>
      </main>
      <Footer />
    </>
  )
}
