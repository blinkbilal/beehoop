'use client'

import { ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

interface CaseCardProps {
  tag: string
  client: string
  outcome: string
  description: string
  index: number
}

export default function CaseCard({
  tag,
  client,
  outcome,
  description,
  index,
}: CaseCardProps) {
  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="bg-background-white rounded-2xl border border-border p-8 flex flex-col gap-4 hover:shadow-md transition-all duration-300 h-full">
        <span className="inline-block self-start bg-accent-pale text-accent text-xs font-sans font-semibold uppercase tracking-widest px-3 py-1 rounded-full">
          {tag}
        </span>
        <p className="font-sans text-xs text-text-muted mt-1">{client}</p>
        <h3 className="font-syne text-xl font-bold text-text-primary leading-snug">
          {outcome}
        </h3>
        <p className="font-sans text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-text-primary hover:gap-3 transition-all cursor-pointer group">
            Read more
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </AnimatedSection>
  )
}
