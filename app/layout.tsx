import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Get Your Free AI TrustScore Report | Brainito",
  description:
    "Get a comprehensive analysis of your digital trustworthiness and AI visibility. Discover how your business appears to AI systems and customers with our free AI TrustScore report.",
   generator: 'Brainito',
  icons: "/favicon.png",

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Analytics />
        <SpeedInsights />
        {children}
        </body>
    </html>
  )
}
