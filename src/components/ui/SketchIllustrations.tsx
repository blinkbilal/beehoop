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

// Neural network illustration for Hero — animated with live signal pulses
export function SketchNetwork({ className = '' }: { className?: string }) {
  const layerX = [85, 250, 415]
  const nodeLayers = [
    [60, 145, 230, 315, 400],  // input:  5 nodes
    [103, 198, 293, 388],      // hidden: 4 nodes
    [148, 243, 338],           // output: 3 nodes
  ]

  // Build all background edges (dim, all-to-all)
  const edges: { d: string; idx: number }[] = []
  let eIdx = 0
  for (let l = 0; l < 2; l++) {
    for (const y1 of nodeLayers[l]) {
      for (const y2 of nodeLayers[l + 1]) {
        edges.push({ d: `M${layerX[l]},${y1} L${layerX[l + 1]},${y2}`, idx: eIdx++ })
      }
    }
  }

  // Highlighted "active" routes — signals travel along these
  const routes = [
    { sx: 85, sy: 60,  mx: 250, my: 103, ex: 415, ey: 148, delay: 2.2, rDelay: 3.8 },
    { sx: 85, sy: 230, mx: 250, my: 198, ex: 415, ey: 243, delay: 2.9, rDelay: 4.2 },
    { sx: 85, sy: 400, mx: 250, my: 388, ex: 415, ey: 338, delay: 3.6, rDelay: 3.8 },
    { sx: 85, sy: 145, mx: 250, my: 293, ex: 415, ey: 148, delay: 4.4, rDelay: 5.0 },
    { sx: 85, sy: 315, mx: 250, my: 103, ex: 415, ey: 338, delay: 5.2, rDelay: 5.0 },
  ]

  // Local dim-draw variant — visible state targets opacity 0.13, not 1
  const dimDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.13,
      transition: {
        pathLength: { delay: i * 0.018, type: 'spring', duration: 1.0, bounce: 0 },
        opacity: { delay: i * 0.018, duration: 0.01 },
      },
    }),
  }

  // Active-edge draw variant — gold, more visible
  const activeDraw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 0.5,
      transition: {
        pathLength: { delay: 0.7 + i * 0.12, type: 'spring', duration: 1.0, bounce: 0 },
        opacity: { delay: 0.7 + i * 0.12, duration: 0.25 },
      },
    }),
  }

  // Node scale-in via spring bounce
  const nodeIn = (delay: number) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay, type: 'spring' as const, stiffness: 300, damping: 11 },
    },
  })

  // Dot fade-in
  const dotIn = (delay: number) => ({
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay, duration: 0.35 } },
  })

  return (
    <motion.svg
      viewBox="0 0 500 460"
      className={`sketch-style ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      role="img"
      aria-label="Neural network — layers of interconnected nodes representing analytical intelligence"
    >
      <defs>
        {/* Soft glow for signals */}
        <filter id="nn-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Subtle glow for output halos */}
        <filter id="node-halo" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
        </filter>
      </defs>

      {/* ── Dim background edges ── */}
      {edges.map(e => (
        <motion.path
          key={`bg-${e.idx}`}
          d={e.d}
          stroke="#0A0A0A"
          strokeWidth="0.7"
          fill="none"
          custom={e.idx}
          variants={dimDraw}
        />
      ))}

      {/* ── Highlighted active pathways (gold) ── */}
      {routes.map((r, i) => (
        <g key={`route-${i}`}>
          <motion.path
            d={`M${r.sx},${r.sy} L${r.mx},${r.my}`}
            stroke="#C8920A"
            strokeWidth="1.4"
            fill="none"
            custom={i}
            variants={activeDraw}
          />
          <motion.path
            d={`M${r.mx},${r.my} L${r.ex},${r.ey}`}
            stroke="#C8920A"
            strokeWidth="1.4"
            fill="none"
            custom={i + 0.5}
            variants={activeDraw}
          />
        </g>
      ))}

      {/* ── Nodes ── */}
      {nodeLayers.map((ys, li) =>
        ys.map((y, ni) => {
          const cx = layerX[li]
          const r = [11, 13, 15][li]
          const isOutput = li === 2
          const isHidden = li === 1
          const entranceDelay = [0.45, 0.9, 1.35][li] + ni * 0.08

          return (
            <g key={`node-${li}-${ni}`}>
              {/* Gold halo behind output nodes — blurred glow */}
              {isOutput && (
                <motion.circle
                  cx={cx} cy={y} r={r + 10}
                  fill="#F5C842"
                  variants={dotIn(entranceDelay + 0.1)}
                  style={{ filter: 'url(#node-halo)', opacity: 0.55 }}
                />
              )}

              {/* Main filled circle */}
              <motion.circle
                cx={cx} cy={y} r={r}
                fill={isOutput ? '#F5C842' : '#FFFFFF'}
                stroke="#0A0A0A"
                strokeWidth="1.5"
                variants={nodeIn(entranceDelay)}
                style={{ transformOrigin: `${cx}px ${y}px` }}
              />

              {/* Inner accent dot */}
              {(isHidden || isOutput) && (
                <motion.circle
                  cx={cx} cy={y} r={isOutput ? 4 : 3}
                  fill={isOutput ? '#0A0A0A' : '#C8920A'}
                  variants={dotIn(entranceDelay + 0.25)}
                />
              )}

              {/* Expanding pulse rings on output nodes — looping */}
              {isOutput && (
                <>
                  <motion.circle
                    cx={cx} cy={y} r={r}
                    fill="none"
                    stroke="#C8920A"
                    strokeWidth="1.5"
                    animate={{ scale: [1, 2.6], opacity: [0.75, 0] }}
                    transition={{
                      duration: 1.8,
                      delay: 2.6 + ni * 0.55,
                      repeat: Infinity,
                      repeatDelay: 2.4,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: `${cx}px ${y}px` }}
                  />
                  <motion.circle
                    cx={cx} cy={y} r={r}
                    fill="none"
                    stroke="#F5C842"
                    strokeWidth="0.8"
                    animate={{ scale: [1, 3.4], opacity: [0.4, 0] }}
                    transition={{
                      duration: 2.2,
                      delay: 3.1 + ni * 0.55,
                      repeat: Infinity,
                      repeatDelay: 2.4,
                      ease: 'easeOut',
                    }}
                    style={{ transformOrigin: `${cx}px ${y}px` }}
                  />
                </>
              )}
            </g>
          )
        })
      )}

      {/* ── Traveling signal dots ── */}
      {routes.map((r, i) => (
        <motion.circle
          key={`sig-${i}`}
          r={4.5}
          fill="#F5C842"
          stroke="#C8920A"
          strokeWidth="1"
          style={{ filter: 'url(#nn-glow)' }}
          initial={{ opacity: 0, cx: r.sx, cy: r.sy }}
          animate={{
            cx: [r.sx, r.mx, r.ex],
            cy: [r.sy, r.my, r.ey],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.35,
            delay: r.delay,
            repeat: Infinity,
            repeatDelay: r.rDelay,
            ease: 'easeInOut',
            times: [0, 0.38, 0.78, 1],
          }}
        />
      ))}

      {/* ── Layer labels ── */}
      {[
        { label: 'Input',  x: 85 },
        { label: 'Hidden', x: 250 },
        { label: 'Output', x: 415 },
      ].map(({ label, x }) => (
        <motion.text
          key={label}
          x={x} y={432}
          textAnchor="middle"
          fontSize="11"
          fontFamily="sans-serif"
          fill="#0A0A0A"
          custom={7}
          variants={fillIn}
        >
          {label}
        </motion.text>
      ))}
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
