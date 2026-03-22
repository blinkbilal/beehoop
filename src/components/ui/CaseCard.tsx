'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
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
      <Link href={`/cases/${slug}`} className="block h-full relative z-10 outline-none">
        <div className="group relative bg-background-card rounded-2xl border border-border p-6 md:p-10 flex flex-col gap-5 overflow-hidden transform transition-all duration-700 hover:-translate-y-2 hover:border-accent/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] h-full">
          
          {/* Ambient hover glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-duration-700 pointer-events-none" />

          <div className="relative z-10 flex items-start justify-between gap-4">
            <span className="inline-flex justify-center min-w-[120px] bg-accent-pale text-accent text-[10px] font-sans font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-accent/10">
              {tag}
            </span>
            {metric && (
              <div className="text-right flex-shrink-0 group-hover:scale-105 transition-transform duration-500">
                <div className="flex items-center justify-end gap-1">
                  <TrendingUp className="w-4 h-4 text-accent" />
                  <span className="font-mono text-3xl font-bold text-accent">{metric}</span>
                </div>
                <p className="font-sans text-[10px] text-text-muted uppercase tracking-[0.2em] mt-1">{metricLabel}</p>
              </div>
            )}
          </div>
          
          <div className="relative z-10 mt-2">
            <p className="font-sans text-xs text-text-muted uppercase tracking-widest mb-3">{client}</p>
            <h3 className="font-syne text-xl md:text-2xl font-bold text-text-primary leading-[1.3] tracking-heading group-hover:text-accent transition-colors duration-300">
              {outcome}
            </h3>
            <p className="font-sans text-sm md:text-base text-text-secondary leading-relaxed mt-4">
              {description}
            </p>
          </div>
          
          <div className="relative z-10 mt-auto pt-6">
            <span className="inline-flex items-center gap-3 text-xs font-sans font-bold uppercase tracking-[0.2em] text-text-primary group-hover:text-accent transition-colors">
              Read Case Study
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
