import type { Metadata } from 'next'
import { Nunito, Syne, Space_Grotesk } from 'next/font/google'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import SmoothScroll from '@/components/ui/SmoothScroll'
import PageLoader from '@/components/ui/PageLoader'
import MobileCTA from '@/components/ui/MobileCTA'
import './globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-nunito',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://blinkbilal.github.io/beehoop'),
  title: 'beehoop — Strategy & Management Consulting',
  description:
    'beehoop is a boutique consultancy working with leadership teams on strategy, structure, and execution — when it matters most.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'beehoop — Strategy & Management Consulting',
    description:
      'Strategy, Financial, and Branding Advisory firm — combining advanced planning, rigorous analysis, and proven execution expertise.',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'beehoop — Strategy & Management Consulting',
    description:
      'Strategy, Financial, and Branding Advisory firm — combining advanced planning, rigorous analysis, and proven execution expertise.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans antialiased bg-white text-text-primary overflow-x-hidden">
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'beehoop',
              url: 'https://blinkbilal.github.io/beehoop',
              description: 'Strategy, Financial, and Branding Advisory firm — combining advanced planning, rigorous analysis, and proven execution expertise.',
              sameAs: ['https://linkedin.com/company/beehoop'],
            }),
          }}
        />
        {/* Hidden SVG filter for pencil-sketch effect (optimized) */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <filter id="pencil-texture">
              <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <PageLoader />
        <SmoothScroll>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-accent">
            Skip to main content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileCTA />
        </SmoothScroll>
      </body>
    </html>
  )
}
