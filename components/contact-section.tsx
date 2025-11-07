"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Container } from "@/components/container"

export function ContactSection() {
  const { t } = useLanguage()
  const [formState, setFormState] = useState<"idle" | "success" | "error">("idle")
  const [formData, setFormData] = useState({ name: "", email: "", message: "", honeypot: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (formData.honeypot) {
      return
    }

    try {
      // Placeholder for form submission - replace with actual endpoint
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

      // For now, use mailto as fallback
      const mailtoLink = `mailto:contact@example.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}`
      window.location.href = mailtoLink

      setFormState("success")
      setFormData({ name: "", email: "", message: "", honeypot: "" })

      setTimeout(() => setFormState("idle"), 5000)
    } catch (error) {
      setFormState("error")
      setTimeout(() => setFormState("idle"), 5000)
    }
  }

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto max-w-2xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-[clamp(1.5rem,2.5vw,2rem)] font-bold tracking-tight">{t.contact.title}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-prose mx-auto">{t.contact.body}</p>
          </div>

          <Card className="rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle>{t.contact.title}</CardTitle>
              <CardDescription>{t.contact.body}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.form.name}</Label>
                  <Input
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder={t.contact.form.name}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">{t.contact.form.email}</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder={t.contact.form.email}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">{t.contact.form.message}</Label>
                  <Textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.contact.form.message}
                  />
                </div>

                {/* Honeypot field */}
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

                <Button type="submit" className="w-full" disabled={formState === "success"}>
                  {t.contact.form.send}
                </Button>

                {formState === "success" && (
                  <p className="text-sm text-green-600 dark:text-green-400 text-center">{t.contact.form.success}</p>
                )}

                {formState === "error" && (
                  <p className="text-sm text-destructive text-center">{t.contact.form.error}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </Container>
    </section>
  )
}
