import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Space_Grotesk, JetBrains_Mono } from "next/font/google"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://luisestigarribia.com"),
  title: "Luis Estigarribia | Full-Stack Developer",
  description:
    "Full-stack developer focused on clean, reliable web apps. Experienced with Ruby on Rails, Node.js, Docker, and cloud deployment.",
  keywords: ["Luis Estigarribia", "Full-Stack Developer", "Ruby on Rails", "Node.js", "Web Development"],
  authors: [{ name: "Luis Estigarribia" }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: "es_ES",
    url: "https://luisestigarribia.com",
    title: "Luis Estigarribia | Full-Stack Developer",
    description: "Full-stack developer focused on clean, reliable web apps.",
    siteName: "Luis Estigarribia Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luis Estigarribia | Full-Stack Developer",
    description: "Full-stack developer focused on clean, reliable web apps.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
