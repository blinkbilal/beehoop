'use client'

import { Compass, GitMerge, Palette, BarChart2, ArrowRight } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'
import Link from 'next/link'

const iconMap = {
  Compass,
  GitMerge,
  Palette,
  BarChart2,
} as const

interface ServiceCardProps {
  icon: keyof typeof iconMap
  title: string
  description: string
  slug: string
  index: number
}

export default function ServiceCard({
  icon,
  title,
  description,
  slug,
  index,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon]
  const number = String(index + 1).padStart(2, '0')

  return (
    <AnimatedSection delay={index * 0.1}>
      <Link href={`/services/${slug}`} className="block h-full">
        <div className="group relative bg-background-white border border-border rounded-2xl p-8 hover:border-accent hover:shadow-[0_8px_30px_rgba(200,146,10,0.08)] hover:-translate-y-1 transition-all duration-300 cursor-pointer h-full overflow-hidden">
          {/* Background number */}
          <span className="absolute top-4 right-6 font-syne text-7xl font-bold text-border-subtle select-none pointer-events-none group-hover:text-accent-pale transition-colors duration-300">
            {number}
          </span>

          <div className="relative z-10">
            <div className="w-16 h-16 rounded-xl bg-accent-pale flex items-center justify-center group-hover:bg-accent-light transition-colors duration-300">
              <IconComponent className="w-6 h-6 text-accent" />
            </div>
            <h3 className="font-syne text-lg font-bold text-text-primary mt-5 tracking-heading">
              {title}
            </h3>
            <p className="font-sans text-sm text-text-secondary leading-relaxed mt-2">
              {description}
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm font-sans font-semibold text-text-primary group-hover:text-accent transition-colors">
              Learn more
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </AnimatedSection>
  )
}
