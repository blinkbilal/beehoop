'use client'

import { motion } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { processSteps } from '@/lib/data'

const lineDraw = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 2, ease: 'easeInOut' } },
}

export default function Process() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
        <AnimatedSection>
          <p className="text-xs font-sans font-semibold uppercase tracking-label text-accent mb-4">
            Our Approach
          </p>
          <h2 className="font-syne text-lg md:text-xl font-bold text-text-primary tracking-heading">
            How we work
          </h2>
          <p className="font-sans text-base text-text-secondary mt-3 max-w-lg leading-relaxed">
            A structured, iterative approach that balances rigour with speed — designed to deliver actionable outcomes, not just reports.
          </p>
        </AnimatedSection>

        <div className="mt-16 relative">
          {/* SVG hand-drawn connecting line */}
          <motion.svg
            className="absolute left-[28px] md:left-[36px] top-0 bottom-0 w-4 h-full"
            viewBox="0 0 16 100"
            preserveAspectRatio="none"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            aria-hidden="true"
          >
            <motion.path
              d="M8 0 Q6 20 10 40 Q6 60 10 80 Q8 90 8 100"
              fill="none"
              stroke="#C8920A"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={0.3}
              variants={lineDraw}
            />
          </motion.svg>

          <div className="space-y-12">
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 0.1} direction="left">
                <div className="flex gap-6 md:gap-8 relative">
                  {/* Number bubble */}
                  <div className="relative z-10 flex-shrink-0 w-14 h-14 md:w-[72px] md:h-[72px] rounded-full bg-background border-2 border-accent/20 flex items-center justify-center">
                    <span className="font-syne text-xl md:text-2xl font-bold text-accent">
                      {step.number}
                    </span>
                  </div>

                  <div className="pt-2 md:pt-4">
                    <h3 className="font-syne text-lg md:text-xl font-bold text-text-primary tracking-heading">
                      {step.title}
                    </h3>
                    <p className="font-sans text-sm text-text-secondary leading-relaxed mt-2 max-w-md">
                      {step.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
