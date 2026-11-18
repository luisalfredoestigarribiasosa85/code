"use client"

import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Linkedin, ArrowDownRight, FileDown, Rocket } from "lucide-react"
import { Container } from "@/components/container"

const consoleLines = [
  { text: "$ kamal deploy", tone: "cmd" },
  { text: "⇢ image: vendelo-rails:latest", tone: "dim" },
  { text: "⇢ rolling out on gcp/e2-medium…", tone: "dim" },
  { text: "✓ vendelo.info is live", tone: "ok" },
  { text: "✓ vestiventa.onrender.com is live", tone: "ok" },
] as const

function DeployConsole() {
  const ref = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)")
    if (reduce.matches || !fine.matches) return

    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      const py = (e.clientY - rect.top) / rect.height - 0.5
      setTilt({ x: py * -12, y: px * 14 })
    }
    const onLeave = () => setTilt({ x: 0, y: 0 })

    el.addEventListener("mousemove", onMove)
    el.addEventListener("mouseleave", onLeave)
    return () => {
      el.removeEventListener("mousemove", onMove)
      el.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="relative select-none"
      style={{ perspective: "1100px" }}
      aria-hidden="true"
    >
      {/* glow behind the console */}
      <div className="absolute inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(closest-side,var(--aurora-2),transparent)] blur-2xl" />

      <div
        className="panel panel-bright overflow-hidden rounded-2xl transition-transform duration-200 ease-out will-change-transform"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
      >
        {/* title bar */}
        <div className="flex items-center gap-3 border-b border-[var(--panel-border)] px-5 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/80" />
            <span className="size-2.5 rounded-full bg-yellow-400/80" />
            <span className="size-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground">deploy — production</p>
        </div>

        {/* terminal body */}
        <div className="space-y-2.5 px-5 py-5 font-mono text-[12.5px] leading-relaxed sm:text-[13px]">
          {consoleLines.map((line, i) => (
            <p
              key={i}
              className={
                line.tone === "cmd"
                  ? "text-foreground"
                  : line.tone === "ok"
                    ? "text-[var(--ok)]"
                    : "text-muted-foreground"
              }
            >
              {line.text}
            </p>
          ))}
          <p className="text-foreground">
            $ <span className="caret" />
          </p>
        </div>
      </div>

      {/* floating depth chips */}
      <div
        className="glass absolute -left-3 top-10 hidden rounded-xl px-3 py-2 font-mono text-[10.5px] text-muted-foreground shadow-lg sm:block"
        style={{ transform: `translateZ(60px) rotate(-2deg)` }}
      >
        kamal · docker
      </div>
      <div
        className="glass absolute -right-4 bottom-16 hidden rounded-xl px-3 py-2 font-mono text-[10.5px] text-muted-foreground shadow-lg sm:block"
        style={{ transform: `translateZ(80px) rotate(2deg)` }}
      >
        zero downtime
      </div>
    </div>
  )
}

export function HeroSection() {
  const { t } = useLanguage()

  return (
    <section id="home" className="relative flex scroll-mt-28 items-start overflow-hidden pb-16 pt-24 sm:pt-28 lg:min-h-[88vh] lg:items-center lg:py-16">
      {/* giant outline word in the background */}
      <p
        aria-hidden="true"
        className="outline-word pointer-events-none absolute -bottom-4 left-1/2 w-full -translate-x-1/2 text-center font-bold uppercase leading-none tracking-tighter text-[clamp(4rem,17vw,13rem)]"
      >
        Estigarribia
      </p>

      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy */}
          <div className="space-y-8 lg:col-span-7">
            <div className="reveal reveal-1 chip w-fit">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--ok)] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[var(--ok)]" />
              </span>
              {t.hero.badge}
            </div>

            <h1 className="reveal reveal-2 font-bold leading-[0.98] tracking-tighter text-[clamp(2.6rem,7vw,4.2rem)]">
              {t.hero.title}
              <span className="iri-text mt-2 block">Full-stack developer</span>
            </h1>

            <p className="reveal reveal-3 max-w-md text-lg leading-relaxed text-muted-foreground">
              {t.hero.subtitle}
            </p>

            <div className="reveal reveal-4 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button size="lg" asChild className="h-12 w-full px-6 text-base sm:w-auto">
                <a href="#projects">
                  {t.hero.ctaPrimary}
                  <ArrowDownRight className="size-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="h-12 w-full px-6 text-base sm:w-auto" asChild>
                <a href="/Luis_Estigarribia_Resume.pdf" download="Luis_Estigarribia_Resume.pdf">
                  {t.hero.ctaSecondary}
                  <FileDown className="size-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild className="size-12" aria-label="LinkedIn">
                <a
                  href="https://www.linkedin.com/in/luis-estigarribia-3225591a3/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="size-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Deploy console */}
          <div className="reveal reveal-3 lg:col-span-5">
            <DeployConsole />
          </div>
        </div>
      </Container>
    </section>
  )
}
