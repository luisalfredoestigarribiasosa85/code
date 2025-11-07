"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { Home } from "lucide-react"
import { Container } from "@/components/container"

export default function NotFound() {
  const { locale } = useLanguage()

  const content = {
    en: {
      title: "404 - Page Not Found",
      description: "The page you're looking for doesn't exist.",
      button: "Back to Home",
    },
    es: {
      title: "404 - Página No Encontrada",
      description: "La página que buscás no existe.",
      button: "Volver al Inicio",
    },
  }

  const t = content[locale]

  return (
    <>
      <Navigation />
      <main className="min-h-screen flex items-center justify-center py-24">
        <Container>
          <div className="text-center space-y-6">
            <h1 className="text-[clamp(3rem,8vw,6rem)] font-bold">404</h1>
            <h2 className="text-[clamp(1.25rem,2.2vw,1.75rem)] font-semibold">{t.title}</h2>
            <p className="text-muted-foreground max-w-prose mx-auto">{t.description}</p>
            <Button asChild size="lg">
              <Link href="/">
                <Home className="size-4 mr-2" />
                {t.button}
              </Link>
            </Button>
          </div>
        </Container>
      </main>
    </>
  )
}
