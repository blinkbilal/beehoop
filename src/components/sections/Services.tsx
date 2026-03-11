'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import ServiceCard from '@/components/ui/ServiceCard'
import { services } from '@/lib/data'

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="bg-background-card rounded-3xl mx-6 md:mx-10 lg:mx-20 px-8 md:px-16 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection>
            <p className="text-xs font-sans font-semibold uppercase tracking-widest text-accent mb-4">
              What We Do
            </p>
            <h2 className="font-syne text-3xl md:text-4xl font-bold text-text-primary">
              Our services
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {services.map((service, i) => (
              <ServiceCard
                key={service.title}
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
