import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://luisestigarribia.com"),
  title: "Luis Estigarribia | Full-Stack Developer",
  description:
    "Full-stack developer focused on clean, reliable web apps. Experienced with Ruby on Rails, Node.js, Docker, and cloud deployment.",
  keywords: ["Luis Estigarribia", "Full-Stack Developer", "Ruby on Rails", "Node.js", "Web Development"],
  authors: [{ name: "Luis Estigarribia" }],
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
  alternates: {
    canonical: "/",
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
