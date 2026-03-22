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
              <h2 className="font-syne text-3xl lg:text-4xl font-bold text-text-primary tracking-heading mb-6">The Challenge</h2>
              <p className="font-sans text-lg lg:text-xl text-text-secondary leading-loose">{caseStudy.description}</p>

              <h2 className="font-syne text-3xl lg:text-4xl font-bold text-text-primary tracking-heading mt-16 mb-6">Our Approach</h2>
              <p className="font-sans text-lg lg:text-xl text-text-secondary leading-loose">
                We deployed a dedicated team to work alongside the client&apos;s leadership, combining deep sector expertise with rigorous analytical frameworks. Our approach prioritised speed without sacrificing thoroughness — delivering actionable insights and clear recommendations at every stage.
              </p>

              <div className="my-16 pl-8 border-l-4 border-accent relative">
                <span className="absolute -left-3 -top-4 font-syne text-6xl text-accent/20">&ldquo;</span>
                <p className="font-syne text-2xl lg:text-3xl text-text-primary italic leading-relaxed font-bold">
                  The engagement delivered unprecedented market visibility, securing competitive margins globally.
                </p>
              </div>

              <h2 className="font-syne text-3xl lg:text-4xl font-bold text-text-primary tracking-heading mt-16 mb-6">The Result</h2>
              <p className="font-sans text-lg lg:text-xl text-text-secondary leading-loose">
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

      {/* Frictionless Next Project Routing */}
      {related.length > 0 && (
        <Link href={`/cases/${related[0].slug}`} className="block group cursor-pointer bg-background-card border-t border-border">
          <section className="py-24 md:py-32 hover:bg-black/20 transition-colors duration-700">
            <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-20 text-center">
              <AnimatedSection>
                <p className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-[0.3em] text-accent mb-6">
                  Up Next — {related[0].tag}
                </p>
                <h3 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary tracking-heading leading-[1.1] mb-10 group-hover:text-accent transition-colors duration-500">
                  {related[0].outcome}
                </h3>
                <span className="inline-flex items-center gap-3 bg-accent text-[#090a0c] font-sans font-bold uppercase tracking-[0.15em] px-8 py-4 rounded-full text-xs hover:scale-[1.05] transition-transform duration-300">
                  Read Case Study
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </span>
              </AnimatedSection>
            </div>
          </section>
        </Link>
      )}

      <Contact />
    </>
  )
}
