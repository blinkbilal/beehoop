'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { clientTypes } from '@/lib/data'

// Use client type names from case studies as marquee content
const marqueeItems = [
  ...clientTypes,
  'Energy & Utilities',
  'Maritime & Shipping',
  'Infrastructure & Real Estate',
  'Financial Services & Banking',
  'FMCG & Distribution',
]

export default function ClientLogos() {
  return (
    <section className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 mb-10">
        <AnimatedSection className="text-center">
          <p className="text-xs font-sans font-semibold uppercase tracking-label text-accent mb-2">
            Trusted By
          </p>
          <p className="font-sans text-sm text-text-muted">
            Working with forward-thinking organisations across sectors and geographies
          </p>
        </AnimatedSection>
      </div>

      {/* Row 1 — scrolling left */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex logo-marquee whitespace-nowrap">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-6 px-5 py-2.5 rounded-full border border-border-subtle font-sans text-xs font-medium text-text-muted hover:text-text-secondary hover:border-border transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Row 2 — scrolling right */}
      <div className="relative mt-4">
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex logo-marquee-reverse whitespace-nowrap">
          {[...marqueeItems.slice().reverse(), ...marqueeItems.slice().reverse()].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center mx-6 px-5 py-2.5 rounded-full border border-border-subtle font-sans text-xs font-medium text-text-muted hover:text-text-secondary hover:border-border transition-colors"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
