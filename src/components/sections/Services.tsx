'use client'

import { KineticText } from '@/components/ui/KineticText'
import ServiceCard from '@/components/ui/ServiceCard'
import { pillarMeta, services, type ServicePillar } from '@/lib/data'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

const pillars: ServicePillar[] = ['advisory', 'intelligence', 'engineering']

// Subtle accent tint per pillar — adds visual differentiation without breaking brand
const pillarGradient: Record<ServicePillar, string> = {
  advisory:     'from-amber-50/60 via-white/80 to-transparent dark:from-amber-900/[0.07] dark:via-background-card/80 dark:to-transparent',
  intelligence: 'from-sky-50/50 via-white/80 to-transparent dark:from-sky-900/[0.07] dark:via-background-card/80 dark:to-transparent',
  engineering:  'from-emerald-50/40 via-white/80 to-transparent dark:from-emerald-900/[0.07] dark:via-background-card/80 dark:to-transparent',
}

// Pillar accent colour for the rule + number
const pillarColor: Record<ServicePillar, string> = {
  advisory:     'text-amber-600 dark:text-amber-400',
  intelligence: 'text-sky-600 dark:text-sky-400',
  engineering:  'text-emerald-600 dark:text-emerald-400',
}

const pillarRule: Record<ServicePillar, string> = {
  advisory:     'bg-amber-500/40',
  intelligence: 'bg-sky-500/40',
  engineering:  'bg-emerald-500/40',
}

export default function Services() {
  return (
    <section id="services" className="py-28 md:py-36 bg-background relative overflow-hidden">
      {/* Decorative accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">

        {/* Section header */}
        <div className="mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-[0.25em] text-accent mb-6"
          >
            What We Do
          </motion.p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16">
            <KineticText as="h2" className="font-syne text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-heading leading-[1.08] max-w-2xl">
              Three practices. One integrated partnership.
            </KineticText>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="font-sans text-base text-text-secondary max-w-sm leading-relaxed lg:text-right lg:pb-1"
            >
              Strategy, Data & Intelligence, and Digital Engineering — working as a single, coherent team.
            </motion.p>
          </div>
        </div>

        {/* Pillar blocks */}
        <div className="space-y-20 md:space-y-28">
          {pillars.map((pillar, pi) => {
            const meta = pillarMeta[pillar]
            const pillarServices = services.filter((s) => s.pillar === pillar)

            return (
              <motion.div
                key={pillar}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-6%' }}
                transition={{ duration: 0.8, delay: pi * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Pillar header */}
                <div className="flex items-center gap-4 mb-10">
                  <span className={`font-mono text-xs font-bold tracking-widest ${pillarColor[pillar]}`}>
                    {String(pi + 1).padStart(2, '0')}
                  </span>
                  <div className={`h-px w-10 ${pillarRule[pillar]}`} />
                  <h3 className="font-syne text-xl md:text-2xl font-bold text-text-primary tracking-heading">
                    {meta.label}
                  </h3>
                  <span className="hidden md:inline font-sans text-sm text-text-muted italic ml-1">
                    — {meta.description}
                  </span>
                </div>

                {/* Gradient container for service cards */}
                <div className={`rounded-[1.25rem] bg-gradient-to-br ${pillarGradient[pillar]} border border-border-subtle/60 p-5 md:p-7`}>
                  <div className={`grid grid-cols-1 ${
                    pillarServices.length <= 2 ? 'md:grid-cols-2' :
                    pillarServices.length === 3 ? 'md:grid-cols-2 lg:grid-cols-3' :
                    'md:grid-cols-2 lg:grid-cols-4'
                  } gap-4 md:gap-5`}>
                    {pillarServices.map((service, i) => (
                      <ServiceCard
                        key={service.slug}
                        icon={service.icon as Parameters<typeof ServiceCard>[0]['icon']}
                        title={service.title}
                        description={service.description}
                        slug={service.slug}
                        index={i}
                        pillarIndex={pi}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Section footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-20 md:mt-28 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2.5 font-sans text-sm font-semibold text-text-primary hover:text-accent transition-colors group"
          >
            View all services in detail
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

