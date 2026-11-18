"use client"

import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Container } from "@/components/container"

export default function NotFound() {
  const { locale } = useLanguage()

  const content = {
    en: {
      description: "The page you're looking for doesn't exist.",
      button: "Back to Home",
    },
    es: {
      description: "La página que buscás no existe.",
      button: "Volver al Inicio",
    },
  }

  const t = content[locale]

  return (
    <>
      <Navigation />
      <main id="main-content" className="relative flex min-h-screen items-center overflow-hidden py-24">
        <p
          aria-hidden="true"
          className="outline-word pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[clamp(8rem,30vw,18rem)] font-bold leading-none tracking-tighter"
        >
          404
        </p>
        <Container className="relative">
          <div className="mx-auto max-w-lg space-y-8 text-center">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tighter">404</h1>
              <p className="text-xl leading-relaxed text-muted-foreground">{t.description}</p>
            </div>
            <Button size="lg" asChild className="h-12 px-6">
              <Link href="/">
                <ArrowLeft className="size-5" />
                {t.button}
              </Link>
            </Button>
          </div>
        </Container>
      </main>
    </>
  )
}
