import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Header from "@/components/Header"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Get Your Free AI TrustScore Report | Brainito",
  description:
    "Get a comprehensive analysis of your digital trustworthiness and AI visibility. Discover how your business appears to AI systems and customers with our free AI TrustScore report.",
  generator: "Brainito",
  keywords: ["AI TrustScore", "AI Visibility", "Digital Trust", "Brainito Report", "Business Trust Analysis"],
  authors: [{ name: "Brainito Team" }],
  creator: "Brainito",
  publisher: "Brainito",
  icons: "/favicon.png",
  robots: "index, follow",
  metadataBase: new URL("https://ai.brainito.com"),
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Meta Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '933894453735634');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TZ12MSQ2JS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TZ12MSQ2JS');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* NoScript for Meta Pixel */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=933894453735634&ev=PageView&noscript=1"
          />
        </noscript>

        <Header />
        <Analytics />
        <SpeedInsights />
        {children}
      </body>
    </html>
  )
}
