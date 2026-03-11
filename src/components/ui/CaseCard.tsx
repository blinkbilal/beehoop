'use client'

import { ArrowRight, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface CaseCardProps {
  tag: string
  slug: string
  client: string
  outcome: string
  description: string
  metric: string
  metricLabel: string
  index: number
}

export default function CaseCard({
  tag,
  slug,
  client,
  outcome,
  description,
  metric,
  metricLabel,
  index,
}: CaseCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/cases/${slug}`} className="block h-full">
        <div className="group bg-background-white rounded-2xl border border-border p-8 flex flex-col gap-4 hover:shadow-[0_8px_30px_rgba(200,146,10,0.08)] hover:-translate-y-1 transition-all duration-300 h-full">
          <div className="flex items-start justify-between gap-4">
            <span className="inline-block self-start bg-accent-pale text-accent text-xs font-sans font-semibold uppercase tracking-label px-3 py-1 rounded-full">
              {tag}
            </span>
            {metric && (
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-accent" />
                  <span className="font-mono text-xl font-bold text-accent">{metric}</span>
                </div>
                <p className="font-sans text-[10px] text-text-muted uppercase tracking-wider">{metricLabel}</p>
              </div>
            )}
          </div>
          <p className="font-sans text-xs text-text-muted mt-1">{client}</p>
          <h3 className="font-syne text-lg font-bold text-text-primary leading-snug tracking-heading">
            {outcome}
          </h3>
          <p className="font-sans text-sm text-text-secondary leading-relaxed">
            {description}
          </p>
          <div className="mt-auto pt-4">
            <span className="inline-flex items-center gap-2 text-sm font-sans font-semibold text-text-primary group-hover:text-accent transition-colors">
              Read more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
