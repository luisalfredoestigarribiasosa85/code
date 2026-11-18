"use client"

import { useLanguage } from "@/contexts/language-context"
import { projects } from "@/lib/projects"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, FileText } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/container"

export function ProjectsSection() {
  const { locale, t } = useLanguage()

  return (
    <section id="projects" className="scroll-mt-20 py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-tight">{t.projects.title}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.slug}
                className="h-full flex flex-col rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-2xl">{project.title[locale]}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">{project.description[locale]}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge key={tech} variant="outline">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-2 mt-auto">
                  {project.links.map((link) => (
                    <Button key={link.href} asChild className="w-full">
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="size-4 mr-2" />
                        {t.projects.visit}
                      </a>
                    </Button>
                  ))}
                  <Button variant="outline" asChild className="w-full bg-transparent">
                    <Link href={`/projects/${project.slug}`}>
                      <FileText className="size-4 mr-2" />
                      {t.projects.caseStudy}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
