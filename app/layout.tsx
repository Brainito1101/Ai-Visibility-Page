import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "@/components/Header";

import Head from "next/head"


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
      <Head>
        <link rel="canonical" href="https://ai.brainito.com/" />
        <meta name="robots" content="index, follow" />
        <meta name="publisher" content="Brainito" />
      </Head>
      <body className={inter.className}>
        <Header />
        <Analytics />
        <SpeedInsights />
        {children}
        </body>
    </html>

  )
}
