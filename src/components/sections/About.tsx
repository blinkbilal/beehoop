'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { clientTypes, metrics } from '@/lib/data'
import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return { count, ref }
}

function MetricCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(value)
  return (
    <div ref={ref}>
      <span className="font-mono text-3xl md:text-4xl font-bold text-accent">
        {count}{suffix}
      </span>
      <p className="font-sans text-xs text-text-secondary uppercase tracking-label mt-1 leading-snug">
        {label}
      </p>
    </div>
  )
}

export default function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="bg-gradient-to-br from-background-card to-white rounded-3xl mx-4 md:mx-10 lg:mx-20 px-5 sm:px-8 md:px-16 py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left column */}
            <AnimatedSection>
              <p className="text-xs font-sans font-semibold uppercase tracking-label text-accent mb-6">
                About beehoop
              </p>

              {/* Blockquote with gold accent bar */}
              <div className="relative pl-6 border-l-4 border-accent">
                <blockquote className="font-syne text-3xl md:text-4xl lg:text-5xl text-text-primary italic leading-[1.2] font-bold">
                  &ldquo;We don&apos;t stop at the plan. We work at the intersection of strategy and execution.&rdquo;
                </blockquote>
              </div>

              {/* Metrics with count-up */}
              <hr className="border-border mt-12 mb-8" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {metrics.map((metric, i) => (
                  <MetricCounter
                    key={i}
                    value={metric.value}
                    suffix={metric.suffix}
                    label={metric.label}
                  />
                ))}
              </div>
            </AnimatedSection>

            {/* Right column */}
            <AnimatedSection delay={0.15} direction="right">
              <div className="space-y-5 font-sans text-base text-text-secondary leading-[1.7]">
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

