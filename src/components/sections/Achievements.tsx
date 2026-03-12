'use client'

import AnimatedSection from '@/components/ui/AnimatedSection'
import { achievements } from '@/lib/data'
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

function AchievementBadge({ numericValue, suffix, label, index }: { numericValue: number; suffix: string; label: string; index: number }) {
  const { count, ref } = useCountUp(numericValue)
  return (
    <AnimatedSection delay={index * 0.1} direction="scale">
      <div ref={ref} className="text-center px-6 py-4">
        <span className="font-mono text-3xl md:text-4xl font-bold text-accent">
          {count}{suffix}
        </span>
        <p className="font-sans text-xs text-text-muted uppercase tracking-label mt-1">{label}</p>
      </div>
    </AnimatedSection>
  )
}

export default function Achievements() {
  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="max-w-4xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x divide-border-subtle">
          {achievements.map((a, i) => (
            <AchievementBadge key={i} numericValue={a.numericValue} suffix={a.suffix} label={a.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
