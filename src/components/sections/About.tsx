'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { clientTypes } from '@/lib/data'



export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="bg-gradient-to-br from-background-card to-background rounded-3xl mx-4 md:mx-10 lg:mx-20 px-5 sm:px-8 md:px-16 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column */}
            <AnimatedSection>
              <p className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] text-accent mb-6">
                About beehoop
              </p>

              {/* Blockquote with gold accent bar */}
              <div className="relative pl-6 md:pl-8 border-l-[3px] border-accent/80">
                <blockquote className="font-syne text-3xl md:text-4xl lg:text-5xl text-text-primary italic leading-[1.25] font-bold">
                  &ldquo;We don&apos;t stop at the plan. We build the system that executes it.&rdquo;
                </blockquote>
              </div>
            </AnimatedSection>

            {/* Right column */}
            <AnimatedSection delay={0.15} direction="right" className="pl-0 lg:pl-10">
              <div className="space-y-6 font-sans text-base md:text-lg text-text-secondary leading-relaxed md:leading-loose">
                <p>
                  Born from the intersection of finance, technology, and operational
                  expertise. beehoop is a consultancy that refuses to choose between
                  thinking and building. We bring boardroom strategy, M&amp;A advisory,
                  data engineering, business intelligence, and bespoke software —
                  the full spectrum — so our clients never need to coordinate between
                  firms.
                </p>
                <p>
                  Most consultancies hand over a strategy deck and move on. We
                  don&apos;t. Our engineering practice builds the data pipelines,
                  executive dashboards, and software platforms that turn
                  recommendations into running systems. The plan and the product
                  come from the same team.
                </p>
                <p>
                  We partner with ambitious, analytically rigorous organisations on
                  the initiatives that matter most — delivering measurable
                  improvements in performance while engineering the technical
                  infrastructure for compounding growth.
                </p>
              </div>

              {/* Client types with gold dot indicators */}
              <div className="mt-10">
                <p className="font-sans text-xs font-semibold uppercase tracking-label text-text-muted mb-4">
                  We work with
                </p>
                <div className="flex flex-wrap gap-2">
                  {clientTypes.map((type) => (
                    <span
                      key={type}
                      className="inline-flex items-center gap-1.5 bg-background border border-border text-text-secondary font-sans text-xs font-medium px-3 py-1.5 rounded-full hover:bg-accent-pale hover:border-accent-pale transition-colors duration-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  )
}

