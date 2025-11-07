import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/contexts/language-context"
import { Inter, Geist_Mono, Source_Serif_4, Inter as V0_Font_Inter, Geist_Mono as V0_Font_Geist_Mono, Source_Serif_4 as V0_Font_Source_Serif_4 } from 'next/font/google'

// Initialize fonts
const _inter = V0_Font_Inter({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _geistMono = V0_Font_Geist_Mono({ subsets: ['latin'], weight: ["100","200","300","400","500","600","700","800","900"] })
const _sourceSerif_4 = V0_Font_Source_Serif_4({ subsets: ['latin'], weight: ["200","300","400","500","600","700","800","900"] })

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] })
const geistMono = Geist_Mono({ subsets: ["latin"], weight: ["400", "500", "600"] })
const sourceSerif = Source_Serif_4({ subsets: ["latin"], weight: ["400", "600", "700"] })

export const metadata: Metadata = {
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
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} font-sans antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
