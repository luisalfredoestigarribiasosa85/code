"use client"

import type React from "react"
import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/container"
import { Mail, Linkedin, Send, CircleCheck, Loader2 } from "lucide-react"

const inputClass =
  "h-12 border border-[var(--panel-border)] bg-[var(--panel)] px-4 text-[15px] backdrop-blur-md placeholder:text-muted-foreground/70 focus-visible:border-[var(--panel-border-bright)] focus-visible:ring-[var(--accent)]/30"

export function ContactSection() {
  const { t, locale } = useLanguage()

  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle")
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.honeypot) return

    setLoading(true)
    setFormState("idle")

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          lang: locale,
          honey: formData.honeypot,
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Request failed")
      }

      setFormState("success")
      setFormData({ name: "", email: "", message: "", honeypot: "" })
      setTimeout(() => setFormState("idle"), 6000)
    } catch {
      setFormState("error")
      setTimeout(() => setFormState("idle"), 6000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-28 border-t border-[var(--panel-border)] py-20 sm:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Copy + direct channels */}
          <div className="space-y-10 lg:col-span-5">
            <div className="space-y-5">
              <h2 className="text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.02] tracking-tight">
                {t.contact.title}
              </h2>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground">{t.contact.body}</p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">{t.contact.direct}</p>
              <a
                href="mailto:luisalfredoestigarribiasosa85@gmail.com"
                className="glass flex max-w-full items-center gap-3 break-all rounded-xl px-4 py-3 text-sm transition-colors hover:text-[var(--accent)]"
              >
                <Mail className="size-4 shrink-0 text-[var(--accent)]" />
                <span className="break-all">luisalfredoestigarribiasosa85@gmail.com</span>
              </a>
              <a
                href="https://www.linkedin.com/in/luis-estigarribia-3225591a3/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass flex max-w-full items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors hover:text-[var(--accent)]"
              >
                <Linkedin className="size-4 shrink-0 text-[var(--accent)]" />
                <span className="break-all">linkedin.com/in/luis-estigarribia-3225591a3</span>
              </a>
            </div>
          </div>

          {/* Form panel */}
          <div className="panel panel-bright p-6 sm:p-8 lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    {t.contact.form.name}
                  </Label>
                  <Input
                    id="name"
                    required
                    minLength={2}
                    maxLength={80}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.name}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    {t.contact.form.email}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.form.email}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  {t.contact.form.message}
                </Label>
                <Textarea
                  id="message"
                  required
                  rows={5}
                  minLength={10}
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder={t.contact.form.message}
                  className={`${inputClass} min-h-32 py-3 leading-relaxed`}
                />
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                className="sr-only"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <Button
                type="submit"
                size="lg"
                className="h-12 w-full text-base"
                disabled={loading || formState === "success"}
              >
                {loading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : formState === "success" ? (
                  <CircleCheck className="size-5" />
                ) : (
                  <Send className="size-5" />
                )}
                {t.contact.form.send}
              </Button>

              <div aria-live="polite" role="status">
                {formState === "success" && (
                  <p className="text-center text-sm text-[var(--ok)]">{t.contact.form.success}</p>
                )}
                {formState === "error" && (
                  <p className="text-center text-sm text-destructive">{t.contact.form.error}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}
