'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { metrics, clientTypes } from '@/lib/data'

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="bg-background-card rounded-3xl mx-6 md:mx-10 lg:mx-20 px-8 md:px-16 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column */}
            <AnimatedSection>
              <p className="text-xs font-sans font-semibold uppercase tracking-widest text-accent mb-6">
                About beehoop
              </p>
              <blockquote className="font-serif text-3xl md:text-4xl text-text-primary italic leading-snug">
                &ldquo;We don&apos;t stop at
                <br />
                the plan. We work
                <br />
                at the intersection
                <br />
                of strategy and
                <br />
                execution.&rdquo;
              </blockquote>

              {/* Metrics */}
              <hr className="border-border mt-12 mb-8" />
              <div className="grid grid-cols-3 gap-6">
                {metrics.map((metric, i) => (
                  <div key={i}>
                    <span className="font-syne text-3xl md:text-4xl font-bold text-accent">
                      {metric.value}
                    </span>
                    <p className="font-sans text-xs text-text-secondary uppercase tracking-wider mt-1 leading-snug">
                      {metric.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* Right column */}
            <AnimatedSection delay={0.15}>
              <div className="space-y-5 font-sans text-base text-text-secondary leading-relaxed">
                <p>
                  beehoop is a strategy, financial, and branding advisory firm
                  that combines advanced planning, rigorous analysis, and proven
                  execution expertise to help businesses achieve meaningful
                  outcomes across strategic, financial, operational, and
                  brand-building fronts.
                </p>
                <p>
                  We specialise in strategy development, transformation,
                  branding, and value creation — ensuring our clients
                  consistently make better decisions, enhance performance, and
                  boost shareholder returns.
                </p>
                <p>
                  Our team partners with sophisticated, forward-thinking
                  organisations on their most critical initiatives. We pride
                  ourselves on delivering rapid, visible, and sustainable
                  improvements in performance while strengthening organisational
                  foundations for future growth.
                </p>
              </div>

              {/* Client types */}
              <div className="mt-10">
                <p className="font-sans text-xs font-semibold uppercase tracking-widest text-text-muted mb-4">
                  We work with
                </p>
                <div className="flex flex-wrap gap-2">
                  {clientTypes.map((type) => (
                    <span
                      key={type}
                      className="inline-block bg-background border border-border text-text-secondary font-sans text-xs font-medium px-3 py-1.5 rounded-full"
                    >
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

