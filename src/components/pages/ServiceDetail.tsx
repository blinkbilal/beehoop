'use client'

import { ArrowLeft, ArrowRight, CheckCircle2, Compass, GitMerge, Palette, BarChart2 } from 'lucide-react'
import Link from 'next/link'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Contact from '@/components/sections/Contact'

const iconMap = {
  Compass,
  GitMerge,
  Palette,
  BarChart2,
} as const

interface ServiceDetailProps {
  service: {
    icon: keyof typeof iconMap
    title: string
    slug: string
    description: string
    longDescription: string[]
    deliverables: string[]
  }
  relatedCases: {
    slug: string
    tag: string
    client: string
    outcome: string
  }[]
}

export default function ServiceDetailPage({ service, relatedCases }: ServiceDetailProps) {
  const IconComponent = iconMap[service.icon]

  return (
    <>
      {/* Hero */}
      <section className="gradient-hero-subtle noise-overlay py-20 md:py-32">
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
          <AnimatedSection>
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-sans text-text-muted hover:text-text-primary transition-colors mb-8">
              <ArrowLeft className="w-4 h-4" />
              All services
            </Link>

            <div className="w-16 h-16 rounded-xl bg-accent-pale flex items-center justify-center mb-6">
              <IconComponent className="w-7 h-7 text-accent" />
            </div>

            <h1 className="font-syne text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-heading leading-[1.1]">
              {service.title}
            </h1>
            <p className="font-sans text-md text-text-secondary mt-4 max-w-2xl leading-relaxed">
              {service.description}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Detail */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Long description */}
            <div className="lg:col-span-3">
              <AnimatedSection>
                <div className="space-y-6">
                  {service.longDescription.map((para, i) => (
                    <p key={i} className="font-sans text-base text-text-secondary leading-[1.7]">
                      {para}
                    </p>
                  ))}
                </div>
              </AnimatedSection>
            </div>

            {/* Deliverables */}
            <div className="lg:col-span-2">
              <AnimatedSection delay={0.15} direction="right">
                <div className="bg-background-card rounded-2xl p-6">
                  <h3 className="font-syne text-lg font-bold text-text-primary tracking-heading mb-4">
                    Key Deliverables
                  </h3>
                  <ul className="space-y-3">
                    {service.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        <span className="font-sans text-sm text-text-secondary">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Related case studies */}
      {relatedCases.length > 0 && (
        <section className="py-16 bg-background-card">
          <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
            <AnimatedSection>
              <h3 className="font-syne text-xl font-bold text-text-primary tracking-heading mb-8">
                Related Case Studies
              </h3>
              <div className="space-y-4">
                {relatedCases.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/cases/${c.slug}`}
                    className="group flex items-center justify-between p-4 bg-white rounded-xl border border-border hover:border-accent hover:shadow-sm transition-all"
                  >
                    <div>
                      <span className="text-xs font-sans font-semibold uppercase tracking-label text-accent">{c.tag}</span>
                      <p className="font-syne text-sm font-bold text-text-primary mt-1">{c.outcome}</p>
                      <p className="font-sans text-xs text-text-muted mt-0.5">{c.client}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
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
