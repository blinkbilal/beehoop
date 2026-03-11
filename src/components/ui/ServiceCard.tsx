'use client'

import { Compass, GitMerge, Palette, BarChart2 } from 'lucide-react'
import AnimatedSection from '@/components/ui/AnimatedSection'

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
  index: number
}

export default function ServiceCard({
  icon,
  title,
  description,
  index,
}: ServiceCardProps) {
  const IconComponent = iconMap[icon]

  return (
    <AnimatedSection delay={index * 0.1}>
      <div className="group bg-background-white border border-border rounded-2xl p-8 hover:border-accent hover:shadow-md transition-all duration-300 cursor-pointer h-full">
        <div className="w-12 h-12 rounded-xl bg-accent-pale flex items-center justify-center group-hover:bg-accent-light transition-colors duration-300">
          <IconComponent className="w-5 h-5 text-accent" />
        </div>
        <h3 className="font-syne text-lg font-bold text-text-primary mt-5">
          {title}
        </h3>
        <p className="font-sans text-sm text-text-secondary leading-relaxed mt-2">
          {description}
        </p>
      </div>
    </AnimatedSection>
  )
}
