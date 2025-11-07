"use client"

import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/container"

const skills = {
  backend: ["Ruby on Rails", "Node.js", "Express", "PostgreSQL", "REST APIs"],
  frontend: ["HTML", "CSS", "JavaScript", "Bootstrap", "Tailwind CSS"],
  devops: ["Docker", "Kamal", "Google Cloud", "Render", "Git/GitHub"],
  tools: ["Swagger/OpenAPI", "SQL", "NoSQL"],
}

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-muted/30">
      <Container>
        <div className="mx-auto max-w-4xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-tight">{t.about.title}</h2>
          </div>

          <Card className="rounded-2xl shadow-lg">
            <CardContent className="pt-6 space-y-8">
              <p className="text-lg leading-relaxed text-muted-foreground max-w-prose">{t.about.body}</p>

              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.backend.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.frontend.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    DevOps & Cloud
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.devops.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.tools.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button asChild>
                  <a href="Luis_Estigarribia_Resume.pdf" download="Luis_Estigarribia_Resume.pdf">
                    {t.hero.ctaSecondary}
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
