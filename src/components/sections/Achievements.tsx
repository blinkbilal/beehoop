'use client'

import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import AnimatedSection from '@/components/ui/AnimatedSection'
import { achievements } from '@/lib/data'

function AchievementBadge({ value, label, index }: { value: string; label: string; index: number }) {
  return (
    <AnimatedSection delay={index * 0.1} direction="scale">
      <div className="text-center px-6 py-4">
        <span className="font-mono text-2xl md:text-3xl font-bold text-accent">{value}</span>
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
            <AchievementBadge key={i} value={a.value} label={a.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
