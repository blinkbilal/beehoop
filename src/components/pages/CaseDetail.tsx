'use client'

import Contact from '@/components/sections/Contact'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { ArrowLeft, ArrowRight, TrendingUp } from 'lucide-react'
import Link from 'next/link'

interface CaseStudy {
  tag: string
  slug: string
  client: string
  outcome: string
  description: string
  metric: string
  metricLabel: string
  service: string
}

interface CaseDetailProps {
  caseStudy: CaseStudy
  related: CaseStudy[]
}

export default function CaseDetailPage({ caseStudy, related }: CaseDetailProps) {
  return (
    <>
      {/* Hero */}
      <section className="gradient-hero-subtle noise-overlay py-20 md:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
          <AnimatedSection>
            <Link href="/cases" className="inline-flex items-center gap-2 text-sm font-sans text-text-muted hover:text-text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              All case studies
            </Link>

            <span className="inline-block bg-accent-pale text-accent text-xs font-sans font-semibold uppercase tracking-label px-3 py-1 rounded-full mb-4">
              {caseStudy.tag}
            </span>

            <h1 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-heading leading-[1.1]">
              {caseStudy.outcome}
            </h1>
            <p className="font-sans text-sm text-text-muted mt-3">{caseStudy.client}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Metric + Description */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Key metric */}
            <AnimatedSection className="md:col-span-1" direction="left">
              <div className="bg-background-card rounded-2xl p-6 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="font-mono text-3xl font-bold text-accent">{caseStudy.metric}</span>
                </div>
                <p className="font-sans text-xs text-text-muted uppercase tracking-label">{caseStudy.metricLabel}</p>
              </div>
            </AnimatedSection>

            {/* Narrative */}
            <AnimatedSection className="md:col-span-3" delay={0.1}>
              <h2 className="font-syne text-2xl font-bold text-text-primary tracking-heading mb-4">The Challenge</h2>
              <p className="font-sans text-base text-text-secondary leading-[1.7]">{caseStudy.description}</p>

              <h2 className="font-syne text-2xl font-bold text-text-primary tracking-heading mt-10 mb-4">Our Approach</h2>
              <p className="font-sans text-base text-text-secondary leading-[1.7]">
                We deployed a dedicated team to work alongside the client&apos;s leadership, combining deep sector expertise with rigorous analytical frameworks. Our approach prioritised speed without sacrificing thoroughness — delivering actionable insights and clear recommendations at every stage.
              </p>

              <h2 className="font-syne text-2xl font-bold text-text-primary tracking-heading mt-10 mb-4">The Result</h2>
              <p className="font-sans text-base text-text-secondary leading-[1.7]">
                {caseStudy.outcome} The engagement delivered measurable impact through a combination of strategic clarity, operational rigour, and sustained execution support.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Client testimonial quote */}
      <section className="py-12 bg-background-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-10 lg:px-20 text-center">
          <AnimatedSection>
            <span className="font-syne text-[60px] leading-none text-accent-pale select-none" aria-hidden="true">&ldquo;</span>
            <p className="font-syne text-xl md:text-2xl text-text-primary italic leading-relaxed font-medium -mt-6">
              The engagement was transformative — beehoop brought clarity, rigour, and a commitment to results that exceeded our expectations.
            </p>
            <p className="font-sans text-xs text-text-muted uppercase tracking-label mt-4">{caseStudy.client}</p>
          </AnimatedSection>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-16 bg-background-card">
          <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
            <AnimatedSection>
              <h3 className="font-syne text-2xl md:text-3xl font-bold text-text-primary tracking-heading mb-8">
                Related Case Studies
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cases/${c.slug}`}
                    className="group bg-white rounded-xl border border-border p-6 hover:border-accent hover:shadow-sm transition-all"
                  >
                    <span className="text-xs font-sans font-semibold uppercase tracking-label text-accent">{c.tag}</span>
                    <p className="font-syne text-sm font-bold text-text-primary mt-2 leading-snug">{c.outcome}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs font-sans font-semibold text-text-muted group-hover:text-accent transition-colors">
                      Read more <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </section>
      )}

      <Contact />
    </>
  )
}
