'use client'

import { motion } from 'framer-motion'

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: i * 0.2, type: 'spring', duration: 1.5, bounce: 0 },
      opacity: { delay: i * 0.2, duration: 0.01 },
    },
  }),
}

const fillIn = {
  hidden: { fillOpacity: 0 },
  visible: (i: number) => ({
    fillOpacity: 1,
    transition: { delay: 0.5 + i * 0.2, duration: 0.8 },
  }),
}

// Strategy compass rose
export function SketchCompass({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={`sketch-style ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Outer circle */}
      <motion.circle cx="60" cy="60" r="50" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={0} variants={draw} />
      {/* Inner circle */}
      <motion.circle cx="60" cy="60" r="20" fill="none" stroke="#0A0A0A" strokeWidth="1" custom={1} variants={draw} />
      {/* North arrow */}
      <motion.path d="M60 10 L60 40" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={2} variants={draw} />
      <motion.path d="M60 10 L55 20 L65 20 Z" fill="#C8920A" stroke="none" custom={2} variants={fillIn} />
      {/* South */}
      <motion.path d="M60 80 L60 110" fill="none" stroke="#0A0A0A" strokeWidth="1" custom={3} variants={draw} />
      {/* East */}
      <motion.path d="M80 60 L110 60" fill="none" stroke="#0A0A0A" strokeWidth="1" custom={3} variants={draw} />
      {/* West */}
      <motion.path d="M10 60 L40 60" fill="none" stroke="#0A0A0A" strokeWidth="1" custom={3} variants={draw} />
      {/* NE diagonal */}
      <motion.path d="M75 45 L95 25" fill="none" stroke="#0A0A0A" strokeWidth="0.8" strokeDasharray="3 3" custom={4} variants={draw} />
      {/* NW diagonal */}
      <motion.path d="M45 45 L25 25" fill="none" stroke="#0A0A0A" strokeWidth="0.8" strokeDasharray="3 3" custom={4} variants={draw} />
      {/* Center dot */}
      <motion.circle cx="60" cy="60" r="3" fill="#C8920A" stroke="none" custom={3} variants={fillIn} />
    </motion.svg>
  )
}

// M&A merge paths
export function SketchMerge({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={`sketch-style ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Left branch */}
      <motion.path d="M20 30 Q50 30 60 60" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={0} variants={draw} />
      {/* Right branch */}
      <motion.path d="M100 30 Q70 30 60 60" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={1} variants={draw} />
      {/* Merged trunk */}
      <motion.path d="M60 60 L60 100" fill="none" stroke="#0A0A0A" strokeWidth="2" custom={2} variants={draw} />
      {/* Left node */}
      <motion.circle cx="20" cy="30" r="8" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={0} variants={draw} />
      {/* Right node */}
      <motion.circle cx="100" cy="30" r="8" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={1} variants={draw} />
      {/* Merge point */}
      <motion.circle cx="60" cy="60" r="6" fill="#C8920A" stroke="#0A0A0A" strokeWidth="1" custom={3} variants={fillIn} />
      {/* Result node */}
      <motion.circle cx="60" cy="100" r="10" fill="none" stroke="#C8920A" strokeWidth="2" custom={3} variants={draw} />
      {/* Accent arrows */}
      <motion.path d="M35 25 L28 30 L35 35" fill="none" stroke="#0A0A0A" strokeWidth="1" custom={2} variants={draw} />
      <motion.path d="M85 25 L92 30 L85 35" fill="none" stroke="#0A0A0A" strokeWidth="1" custom={2} variants={draw} />
    </motion.svg>
  )
}

// Brand palette/brush
export function SketchBrush({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={`sketch-style ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Paintbrush handle */}
      <motion.path d="M85 85 L50 50" fill="none" stroke="#0A0A0A" strokeWidth="2" custom={0} variants={draw} />
      <motion.path d="M90 80 L80 90" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={0} variants={draw} />
      {/* Brush tip */}
      <motion.path d="M50 50 Q40 40 30 45 Q20 50 25 60 Q30 65 35 60 Q40 55 50 50" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={1} variants={draw} />
      {/* Paint strokes */}
      <motion.path d="M30 70 Q20 75 15 85" fill="none" stroke="#C8920A" strokeWidth="2" strokeLinecap="round" custom={2} variants={draw} />
      <motion.path d="M25 65 Q15 70 12 78" fill="none" stroke="#F5C842" strokeWidth="1.5" strokeLinecap="round" custom={3} variants={draw} />
      <motion.path d="M35 72 Q28 80 22 90" fill="none" stroke="#C8920A" strokeWidth="1" strokeLinecap="round" custom={4} variants={draw} />
      {/* Color dots */}
      <motion.circle cx="70" cy="25" r="6" fill="#C8920A" stroke="#0A0A0A" strokeWidth="1" custom={3} variants={fillIn} />
      <motion.circle cx="85" cy="20" r="4" fill="#F5C842" stroke="#0A0A0A" strokeWidth="0.8" custom={4} variants={fillIn} />
      <motion.circle cx="95" cy="30" r="5" fill="#FEF3C7" stroke="#0A0A0A" strokeWidth="0.8" custom={4} variants={fillIn} />
    </motion.svg>
  )
}

// Analytics chart
export function SketchChart({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={`sketch-style ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Axes */}
      <motion.path d="M20 100 L20 15" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={0} variants={draw} />
      <motion.path d="M20 100 L105 100" fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={0} variants={draw} />
      {/* Bars */}
      <motion.rect x="30" y="70" width="12" height="30" fill="none" stroke="#0A0A0A" strokeWidth="1" rx="1" custom={1} variants={draw} />
      <motion.rect x="30" y="70" width="12" height="30" fill="#FEF3C7" stroke="none" rx="1" custom={1} variants={fillIn} />
      <motion.rect x="50" y="50" width="12" height="50" fill="none" stroke="#0A0A0A" strokeWidth="1" rx="1" custom={2} variants={draw} />
      <motion.rect x="50" y="50" width="12" height="50" fill="#F5C842" stroke="none" rx="1" custom={2} variants={fillIn} />
      <motion.rect x="70" y="35" width="12" height="65" fill="none" stroke="#0A0A0A" strokeWidth="1" rx="1" custom={3} variants={draw} />
      <motion.rect x="70" y="35" width="12" height="65" fill="#C8920A" stroke="none" rx="1" custom={3} variants={fillIn} />
      <motion.rect x="90" y="25" width="12" height="75" fill="none" stroke="#0A0A0A" strokeWidth="1" rx="1" custom={4} variants={draw} />
      <motion.rect x="90" y="25" width="12" height="75" fill="#C8920A" stroke="none" rx="1" custom={4} variants={fillIn} />
      {/* Trend line */}
      <motion.path d="M36 68 L56 48 L76 33 L96 22" fill="none" stroke="#C8920A" strokeWidth="1.5" strokeDasharray="4 2" custom={5} variants={draw} />
      {/* Arrow tip on trend line */}
      <motion.path d="M93 25 L96 22 L93 19" fill="none" stroke="#C8920A" strokeWidth="1.5" custom={5} variants={draw} />
    </motion.svg>
  )
}

// Network/strategy illustration for Hero
export function SketchNetwork({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 500 460"
      className={`sketch-style ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      role="img"
      aria-label="Strategic network — interconnected nodes representing beehoop's advisory approach"
    >
      {/* Central hexagon filled with gold */}
      <motion.polygon
        points="250,190 280,207 280,241 250,258 220,241 220,207"
        fill="#F5C842"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        custom={0}
        variants={fillIn}
        style={{ transformOrigin: '250px 224px' }}
      />
      <motion.polygon
        points="250,190 280,207 280,241 250,258 220,241 220,207"
        fill="none"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        custom={0}
        variants={draw}
      />

      {/* Connecting lines from center */}
      {[
        'M250,190 L250,158',
        'M250,258 L250,320',
        'M220,207 L170,174',
        'M280,207 L330,174',
        'M220,241 L170,287',
        'M280,241 L330,287',
      ].map((d, i) => (
        <motion.path key={d} d={d} fill="none" stroke="#0A0A0A" strokeWidth="1.5" custom={i * 0.3 + 1} variants={draw} />
      ))}

      {/* Surrounding hexagons */}
      {[
        '250,90 280,107 280,141 250,158 220,141 220,107',
        '360,140 390,157 390,191 360,208 330,191 330,157',
        '140,140 170,157 170,191 140,208 110,191 110,157',
        '360,270 390,287 390,321 360,338 330,321 330,287',
        '140,270 170,287 170,321 140,338 110,321 110,287',
        '250,320 280,337 280,371 250,388 220,371 220,337',
      ].map((pts, i) => (
        <motion.polygon
          key={i}
          points={pts}
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="1.5"
          custom={i * 0.3 + 2}
          variants={draw}
        />
      ))}

      {/* Outer connecting lines */}
      {[
        'M280,107 L330,157',
        'M220,107 L170,157',
        'M390,157 L420,115',
        'M110,157 L80,115',
        'M140,208 L140,270',
        'M360,208 L360,270',
        'M170,321 L220,337',
        'M330,321 L280,337',
      ].map((d, i) => (
        <motion.path key={d} d={d} fill="none" stroke="#0A0A0A" strokeWidth="1" opacity={0.5} custom={i * 0.15 + 3} variants={draw} />
      ))}

      {/* Far hexagons */}
      <motion.polygon
        points="430,75 452,88 452,114 430,127 408,114 408,88"
        fill="none" stroke="#0A0A0A" strokeWidth="1" opacity={0.3}
        custom={5} variants={draw}
      />
      <motion.polygon
        points="70,75 92,88 92,114 70,127 48,114 48,88"
        fill="none" stroke="#0A0A0A" strokeWidth="1" opacity={0.3}
        custom={5.2} variants={draw}
      />

      {/* Node dots */}
      {[
        [250, 124], [250, 290], [195, 190], [305, 190], [195, 264], [305, 264],
      ].map(([cx, cy], i) => (
        <motion.circle
          key={i}
          cx={cx}
          cy={cy}
          r="3"
          fill="#0A0A0A"
          custom={i * 0.2 + 4}
          variants={fillIn}
        />
      ))}

      {/* Decorative arcs */}
      <motion.path
        d="M140 338 Q190 400 250 388"
        fill="none" stroke="#0A0A0A" strokeWidth="1" opacity={0.2}
        strokeDasharray="4 4"
        custom={6} variants={draw}
      />
      <motion.path
        d="M360 338 Q310 400 250 388"
        fill="none" stroke="#0A0A0A" strokeWidth="1" opacity={0.2}
        strokeDasharray="4 4"
        custom={6.2} variants={draw}
      />
    </motion.svg>
  )
}

// Handshake / conversation for Contact section
export function SketchConversation({ className = '' }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 120 120"
      className={`sketch-style ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {/* Left speech bubble */}
      <motion.path
        d="M15 30 Q15 15 35 15 L55 15 Q70 15 70 30 L70 50 Q70 60 55 60 L35 60 L25 70 L28 60 Q15 60 15 50 Z"
        fill="none" stroke="#0A0A0A" strokeWidth="1.5"
        custom={0} variants={draw}
      />
      {/* Right speech bubble */}
      <motion.path
        d="M50 55 Q50 45 65 45 L90 45 Q105 45 105 55 L105 75 Q105 85 90 85 L70 85 L80 95 L75 85 Q50 85 50 75 Z"
        fill="none" stroke="#0A0A0A" strokeWidth="1.5"
        custom={1} variants={draw}
      />
      {/* Dots in left bubble */}
      <motion.circle cx="30" cy="37" r="2" fill="#C8920A" custom={2} variants={fillIn} />
      <motion.circle cx="40" cy="37" r="2" fill="#C8920A" custom={2.5} variants={fillIn} />
      <motion.circle cx="50" cy="37" r="2" fill="#C8920A" custom={3} variants={fillIn} />
      {/* Lines in right bubble */}
      <motion.path d="M60 60 L96 60" fill="none" stroke="#0A0A0A" strokeWidth="1" custom={3} variants={draw} />
      <motion.path d="M60 68 L88 68" fill="none" stroke="#0A0A0A" strokeWidth="1" custom={3.5} variants={draw} />
      {/* Connection spark */}
      <motion.path d="M58 50 L62 48" fill="none" stroke="#C8920A" strokeWidth="2" strokeLinecap="round" custom={4} variants={draw} />
    </motion.svg>
  )
}
