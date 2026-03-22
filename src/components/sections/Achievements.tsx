'use client'

import GsapStaggerSection from '@/components/ui/GsapStaggerSection'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { achievements } from '@/lib/data'

function AnimatedCounter({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })
  const count = useMotionValue(0)
  const display = useTransform(count, (latest) => `${prefix}${Math.round(latest)}${suffix}`)

  useEffect(() => {
    if (isInView) {
      animate(count, value, { duration: 2.5, ease: "easeOut" })
    }
  }, [isInView, value, count])

  return <motion.span ref={ref}>{display}</motion.span>
}

export default function Achievements() {
  return (
    <section className="py-20 md:py-24 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20 relative z-10">
        <div className="border border-border/50 rounded-3xl bg-card/30 backdrop-blur-xl p-8 md:p-12 hover:border-accent/40 transition-colors">
          <GsapStaggerSection className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 divide-y md:divide-y-0 md:divide-x divide-border/50">
            {achievements.map((a, i) => (
              <div key={i} className="flex flex-col items-center justify-center pt-8 md:pt-0 first:pt-0">
                <h3 className="font-syne text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tighter mb-4 text-center">
                  <AnimatedCounter value={a.numericValue} suffix={a.suffix} prefix={a.prefix} />
                </h3>
                <p className="font-sans text-xs md:text-sm font-medium text-muted-foreground uppercase tracking-widest text-center">
                  {a.label}
                </p>
              </div>
            ))}
          </GsapStaggerSection>
        </div>
      </div>
    </section>
  )
}
