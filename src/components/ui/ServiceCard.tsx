'use client'

import {
    SketchBrush,
    SketchChart,
    SketchCode,
    SketchCompass,
    SketchDashboard,
    SketchDatabase,
    SketchGlobe,
    SketchMerge,
    SketchPlug,
    SketchTrending,
} from '@/components/ui/SketchIllustrations'
import { ArrowUpRight, BarChart2, Code2, Compass, Cpu, Database, GitMerge, Globe, LayoutDashboard, Palette, TrendingUp } from 'lucide-react'
import Link from 'next/link'

const iconMap = {
  Compass,
  GitMerge,
  Palette,
  BarChart2,
  Database,
  TrendingUp,
  LayoutDashboard,
  Code2,
  Globe,
  Cpu,
} as const

const sketchMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass: SketchCompass,
  GitMerge: SketchMerge,
  Palette: SketchBrush,
  BarChart2: SketchChart,
  Database: SketchDatabase,
  TrendingUp: SketchTrending,
  LayoutDashboard: SketchDashboard,
  Code2: SketchCode,
  Globe: SketchGlobe,
  Cpu: SketchPlug,
}

interface ServiceCardProps {
  icon: keyof typeof iconMap
  title: string
  description: string
  slug: string
  index: number
  pillarIndex?: number
}

export default function ServiceCard({
  icon,
  title,
  description,
  slug,
  index,
}: ServiceCardProps) {
  const SketchIcon = sketchMap[icon]
  const number = String(index + 1).padStart(2, '0')

  return (
    <Link href={`/services/${slug}`} className="block h-full group">
      <div className="relative bg-card border border-border rounded-2xl p-6 md:p-8 h-full overflow-hidden transition-all duration-500 ease-out hover:border-accent/60 hover:shadow-[0_8px_40px_hsla(var(--accent)/0.10)] hover:-translate-y-1.5">
        {/* Background number — faint, shifts on hover */}
        <span
          className="absolute -top-2 -right-1 font-syne text-[5.5rem] font-bold text-border-subtle/60 select-none pointer-events-none transition-all duration-500 group-hover:text-accent/10 group-hover:-translate-y-1"
          aria-hidden="true"
        >
          {number}
        </span>

        {/* Gold glow dot — appears on hover */}
        <span className="absolute top-6 right-6 w-2.5 h-2.5 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform duration-500" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Sketch illustration */}
          <div className="w-16 h-16 mb-5 opacity-85 group-hover:opacity-100 transition-opacity duration-300">
            {SketchIcon && <SketchIcon className="w-16 h-16" />}
          </div>

          {/* Title */}
          <h3 className="font-syne text-lg md:text-xl font-bold text-text-primary tracking-heading leading-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="font-sans text-sm text-text-secondary leading-relaxed mt-2.5 line-clamp-3">
            {description}
          </p>

          {/* Footer link — pushed to bottom */}
          <div className="mt-auto pt-6 flex items-center justify-between">
            <span className="font-sans text-xs font-semibold text-text-muted group-hover:text-accent transition-colors duration-300 tracking-wide uppercase">
              Explore
            </span>
            <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <ArrowUpRight className="w-3.5 h-3.5 text-text-muted group-hover:text-accent transition-colors duration-300" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
