'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import CaseCard from '@/components/ui/CaseCard'
import { cases } from '@/lib/data'

export default function CaseStudies() {
  return (
    <section id="cases" className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <AnimatedSection>
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-accent mb-4">
            Selected Work
          </p>
          <h2 className="font-syne text-3xl md:text-4xl font-bold text-text-primary">
            Client outcomes
          </h2>
          <p className="font-sans text-base text-text-secondary mt-4 max-w-lg">
            A curated snapshot of high-impact projects across industries and
            geographies — strategy, M&A, brand, and analytics.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {cases.map((c, i) => (
            <CaseCard
              key={i}
              tag={c.tag}
              client={c.client}
              outcome={c.outcome}
              description={c.description}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
