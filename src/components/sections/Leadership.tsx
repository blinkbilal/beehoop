'use client'

import { KineticText } from '@/components/ui/KineticText'
import { team } from '@/lib/data'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type Track = 'advisory' | 'data' | 'engineering'

const trackMeta: Record<Track, { label: string; accent: string }> = {
  advisory: { label: 'Strategic Advisory', accent: 'text-accent' },
  data: { label: 'Data & Intelligence', accent: 'text-accent' },
  engineering: { label: 'Digital Engineering', accent: 'text-accent' },
}

const trackOrder: Track[] = ['advisory', 'data', 'engineering']

function groupByTrack() {
  const groups: Record<Track, typeof team> = { advisory: [], data: [], engineering: [] }
  team.forEach((m) => {
    const t = (m.track as Track) ?? 'advisory'
    groups[t].push(m)
  })
  return trackOrder.filter((t) => groups[t].length > 0).map((t) => ({
    track: t,
    ...trackMeta[t],
    members: groups[t],
  }))
}

export default function Leadership() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10%' })

  const groups = groupByTrack()

  return (
    <section className="py-24 md:py-40 bg-background noise-overlay relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">

        {/* Header */}
        <div className="mb-16 md:mb-24 max-w-2xl">
          <p className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] text-accent mb-6">
            The Minds Behind beehoop
          </p>
          <KineticText as="h2" className="font-syne text-3xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-heading leading-[1.1]">
            Strategy thinkers. Data architects. Engineering builders.
          </KineticText>
        </div>

        {/* Track-grouped layout */}
        <div ref={containerRef} className="space-y-20">
          {groups.map((g, gi) => (
            <div key={g.track}>
              {/* Track header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: gi * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-10 flex items-center gap-4"
              >
                <span className="w-2 h-2 rounded-full bg-accent" />
                <h3 className="font-syne text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {g.label}
                </h3>
                <div className="flex-1 h-px bg-border/40" />
              </motion.div>

              {/* Members grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
                {g.members.map((member, i) => (
                  <motion.div
                    key={member.name}
                    initial={{ y: 60, opacity: 0 }}
                    animate={isInView ? { y: 0, opacity: 1 } : { y: 60, opacity: 0 }}
                    transition={{ delay: 0.2 + gi * 0.12 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative cursor-pointer"
                  >
                    <div className="overflow-hidden rounded-xl aspect-[3/4] mb-8 relative bg-[#101216] border border-[#1e293b]/50">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover filter grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 absolute inset-0 mix-blend-luminosity"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#090a0c] via-[#090a0c]/40 to-transparent opacity-80" />
                    </div>

                    <h4 className="font-syne text-3xl font-bold text-text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="font-sans text-xs tracking-[0.15em] text-text-muted uppercase font-semibold mb-6">
                      {member.role}
                    </p>
                    <p className="font-sans text-base leading-relaxed text-text-secondary pr-4">
                      {member.bio}
                    </p>

                    <hr className="mt-8 border-[#1e293b] group-hover:border-accent/40 transition-colors duration-500" />
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
