import Footer from '@/components/layout/Footer'
import Navbar from '@/components/layout/Navbar'
import { CustomCursor } from '@/components/ui/CustomCursor'
import MobileCTA from '@/components/ui/MobileCTA'
import PageLoader from '@/components/ui/PageLoader'
import SmoothScroll from '@/components/ui/SmoothScroll'
import { ThemeProvider } from '@/components/ui/ThemeProvider'
import type { Metadata } from 'next'
import { Inter, Space_Grotesk, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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

const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

export const metadata: Metadata = {
  metadataBase: new URL('https://blinkbilal.github.io/beehoop'),
  title: {
    default: 'beehoop | Strategy, Data & Engineering Consultancy',
    template: '%s | beehoop',
  },
  description:
    'beehoop is an end-to-end strategic and engineering consultancy. We deliver management strategy, M&A advisory, data pipelines, business intelligence, custom software development, and web engineering — combining boardroom thinking with deep technical execution.',
  keywords: [
    'management consultancy',
    'strategy consulting',
    'M&A advisory',
    'data engineering',
    'business intelligence',
    'data pipelines',
    'custom software development',
    'executive dashboards',
    'web development consultancy',
    'system integration',
    'financial modelling',
    'brand strategy',
  ],
  icons: {
    icon: `${bp}/favicon.ico`,
  },
  openGraph: {
    title: 'beehoop | Strategy, Data & Engineering Consultancy',
    description:
      'End-to-end strategic and engineering partner. From M&A advisory and financial modelling to data pipelines, BI dashboards, and custom software — we engineer the intelligence behind market-leading decisions.',
    type: 'website',
    locale: 'en_GB',
    siteName: 'beehoop',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'beehoop — Strategy, Data & Engineering Consultancy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'beehoop | Strategy, Data & Engineering Consultancy',
    description:
      'End-to-end strategic and engineering partner — management strategy, M&A, data pipelines, BI dashboards, and custom software development.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: 'https://blinkbilal.github.io/beehoop',
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
      suppressHydrationWarning
      className={`${inter.variable} ${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body
        className="font-sans antialiased text-foreground bg-background overflow-x-hidden transition-colors duration-300"
        style={{ '--noise-url': `url('${bp}/textures/noise.png')` } as React.CSSProperties}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'beehoop',
              url: 'https://blinkbilal.github.io/beehoop',
              description: 'End-to-end strategic and engineering consultancy specialising in management strategy, M&A advisory, data pipelines, business intelligence, and custom software development.',
              email: 'hello@beehoop.com',
              areaServed: 'Worldwide',
              sameAs: ['https://linkedin.com/company/beehoop'],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Consulting & Engineering Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Strategy Development' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'M&A & Transactions' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand & Market Strategy' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Financial & Data Analytics' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Data Architecture & Pipelines' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Intelligence' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Executive Dashboards & Reporting' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Software Development' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Web & Application Development' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'System Integration & APIs' } },
                ],
              },
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
        <CustomCursor />
        <PageLoader />
        <SmoothScroll>
          <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-background focus:px-4 focus:py-2 focus:rounded focus:ring-2 focus:ring-accent">
            Skip to main content
          </a>
          <Navbar />
          <main id="main">{children}</main>
          <Footer />
          <MobileCTA />
        </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}
