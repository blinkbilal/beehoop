'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import CaseCard from '@/components/ui/CaseCard'
import { cases } from '@/lib/data'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const filters = ['All', 'Strategy', 'M&A', 'Brand', 'Analytics']

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filtered = activeFilter === 'All'
    ? cases
    : cases.filter((c) => c.service === activeFilter)

  return (
    <section id="cases" className="bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <AnimatedSection>
          <p className="text-xs font-sans font-semibold uppercase tracking-label text-accent mb-4">
            Selected Work
          </p>
          <h2 className="font-syne text-2xl md:text-lg font-bold text-text-primary tracking-heading">
            Client outcomes
          </h2>
          <p className="font-sans text-base text-text-secondary mt-4 max-w-lg leading-relaxed">
            A curated snapshot of high-impact projects across industries and
            geographies — strategy, M&A, brand, and analytics.
          </p>
        </AnimatedSection>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mt-8">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-sans font-semibold transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-accent-light text-text-primary'
                  : 'bg-background-card text-text-secondary hover:bg-border'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <AnimatePresence mode="popLayout">
            {filtered.map((c, i) => (
              <CaseCard
                key={c.slug}
                tag={c.tag}
                slug={c.slug}
                client={c.client}
                outcome={c.outcome}
                description={c.description}
                metric={c.metric}
                metricLabel={c.metricLabel}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        <AnimatedSection className="mt-12 text-center">
          <Link
            href="/cases"
            className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-text-primary hover:text-accent transition-colors group"
          >
            View all case studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  )
}
