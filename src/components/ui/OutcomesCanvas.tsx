'use client'

import { getOutcomesActive, getOutcomesFilter } from '@/lib/outcomesStore'
import { useEffect, useRef } from 'react'

// ─── Seeded PRNG — deterministic layout across SSR/hydration ─────────────────
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function smoothstep(a: number, b: number, t: number): number {
  const x = Math.max(0, Math.min(1, (t - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

function lerpf(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

// ─── Pillar colours (match site design system) ───────────────────────────────
//  0 = advisory   — amber     #C8920A
//  1 = intelligence — sapphire #3B82F6
//  2 = engineering — emerald  #10B981
const PILLAR_RGB = [
  [200, 146, 10 ] as const,  // advisory
  [59,  130, 246] as const,  // intelligence
  [16,  185, 129] as const,  // engineering
]

// ─── Node definitions: [normX, normY, pillar, weight] ───────────────────────
// Galaxy arc: advisory spine top-right → bottom-left, then intelligence/engineering bottom → right
const NODE_DEFS = [
  [0.76, 0.24, 0, 1.50],  // 0 — Logistics 670% ROI    (advisory, largest)
  [0.58, 0.15, 0, 1.20],  // 1 — Energy +12 markets    (advisory)
  [0.40, 0.20, 0, 1.10],  // 2 — Brand +45%            (advisory)
  [0.23, 0.33, 0, 1.20],  // 3 — Digital banking       (advisory)
  [0.14, 0.51, 0, 1.10],  // 4 — Shipping JV 2x        (advisory)
  [0.25, 0.68, 0, 1.20],  // 5 — Acquisition 3x        (advisory)
  [0.44, 0.79, 1, 1.30],  // 6 — Data pipeline 99.8%   (intelligence)
  [0.63, 0.74, 1, 1.30],  // 7 — Retail BI $12M        (intelligence)
  [0.81, 0.61, 2, 1.20],  // 8 — FinTech 2M+           (engineering)
  [0.83, 0.40, 2, 1.10],  // 9 — Web platform 3x       (engineering)
] as const

// ─── Connection topology: intelligent wiring ─────────────────────────────────
const CONNECTIONS = [
  // Advisory spine (galaxy arc left side)
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  // Advisory → Intelligence bridge
  [5, 6], [6, 7],
  // Intelligence → Engineering arc
  [7, 8], [8, 9],
  // Close the loop (right-side arch)
  [0, 9],
  // Diagonal cross-links (intelligence of the network)
  [2, 5], [3, 6], [1, 9],
] as const

interface OutcomeNode {
  baseX: number
  baseY: number
  x: number
  y: number
  pillar: number
  baseRadius: number
  phase: number
  driftFreqX: number
  driftFreqY: number
  currentAlpha: number
}

interface Star {
  nx: number
  ny: number
  radius: number
  twinklePhase: number
  twinkleFreq: number
  baseAlpha: number
}

interface OutcomesCanvasProps {
  className?: string
  /** Set true by parent when section is in the viewport — triggers materialise */
  active?: boolean
}

export default function OutcomesCanvas({ className = '', active = false }: OutcomesCanvasProps) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  // Bridge React prop world → rAF closure world without re-running the heavy useEffect
  const activeRef  = useRef(active)
  useEffect(() => { activeRef.current = active }, [active])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile       = window.innerWidth < 768

    // ── Theme observation ────────────────────────────────────────────────────
    let isDark = document.documentElement.classList.contains('dark')
    const themeObs = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // ── State ────────────────────────────────────────────────────────────────
    let width = 0, height = 0
    let animId = 0
    let lastTimestamp = 0
    let elapsedMs = 0
    let materialiseProgress = 0
    const MATERIALISE_SPEED  = 1 / 1700  // full reveal in ~1.7s

    const rng = mulberry32(42)

    // ── Build nodes ───────────────────────────────────────────────────────────
    const nodes: OutcomeNode[] = (NODE_DEFS as unknown as [number, number, number, number][]).map(
      ([nx, ny, pillar, weight]) => ({
        baseX:      nx,
        baseY:      ny,
        x:          nx,
        y:          ny,
        pillar,
        baseRadius: 7 + weight * 5.5,  // ~13–16 px — more presence
        phase:      rng() * Math.PI * 2,
        driftFreqX: 0.00025 + rng() * 0.00020,
        driftFreqY: 0.00025 + rng() * 0.00020,
        currentAlpha: 0,
      })
    )

    // ── Build starfield ───────────────────────────────────────────────────────
    const STAR_COUNT = isMobile ? 60 : 88
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      nx:          rng(),
      ny:          rng(),
      radius:      0.7 + rng() * 1.3,
      twinklePhase: rng() * Math.PI * 2,
      twinkleFreq:  0.0004 + rng() * 0.0008,
      baseAlpha:    0.30 + rng() * 0.44,  // brighter stars
    }))

    const nebulaPhase = rng() * Math.PI * 2

    // ── Resize ───────────────────────────────────────────────────────────────
    function resize() {
      if (!canvas || !ctx) return
      const pr   = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2)
      const rect = canvas.getBoundingClientRect()
      width  = rect.width  || window.innerWidth
      height = rect.height || window.innerHeight
      canvas.width  = Math.round(width  * pr)
      canvas.height = Math.round(height * pr)
      ctx.setTransform(pr, 0, 0, pr, 0, 0)
    }
    const resizeObs = new ResizeObserver(resize)
    resizeObs.observe(canvas)
    resize()

    // ── Render ────────────────────────────────────────────────────────────────
    function draw(ts: number) {
      if (!ctx || !width || !height) return
      const dt = lastTimestamp ? Math.min(ts - lastTimestamp, 50) : 16
      lastTimestamp = ts
      if (!document.hidden) elapsedMs += dt
      const t = elapsedMs
      const TAU = Math.PI * 2

      // Materialise once active prop becomes true — polling the ref avoids
      // IntersectionObserver deadlock on visibility:hidden fixed elements
      if (activeRef.current && materialiseProgress < 1) {
        materialiseProgress = Math.min(1, materialiseProgress + dt * MATERIALISE_SPEED)
      }

      // Read active case + active pillar filter
      const activeCase = getOutcomesActive()
      const filter = getOutcomesFilter()
      const PILLAR_NAMES = ['advisory', 'intelligence', 'engineering'] as const

      // Update per-node alpha — factor in both card activation AND pillar filter
      nodes.forEach((node, i) => {
        const startP      = i * 0.085
        const matAlpha    = smoothstep(startP, startP + 0.08, materialiseProgress)
        const pillarMatch = filter === 'all' || PILLAR_NAMES[node.pillar] === filter
        const dimFactor   = activeCase === -1
          ? (pillarMatch ? 1.0 : 0.06)
          : (activeCase === i ? 1.0 : (pillarMatch ? 0.10 : 0.03))
        const target      = matAlpha * dimFactor
        node.currentAlpha = lerpf(node.currentAlpha, target, 0.055)

        // Organic slow drift
        node.x = node.baseX + Math.sin(t * node.driftFreqX + node.phase)       * 0.0055
        node.y = node.baseY + Math.cos(t * node.driftFreqY + node.phase * 1.3) * 0.0055
      })

      // ── 1. Background — always dark cosmos ──────────────────────────────────
      ctx.fillStyle = '#000208'
      ctx.fillRect(0, 0, width, height)

      // ── 2. Primary nebula — rich indigo deep-field ──────────────────────────
      const nx = width  * (0.44 + Math.sin(t * 0.000130 + nebulaPhase)       * 0.08)
      const ny = height * (0.50 + Math.cos(t * 0.000100 + nebulaPhase * 1.2) * 0.07)
      const nr = Math.max(width, height) * 0.75
      const nebGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, nr)
      nebGrad.addColorStop(0,    'rgba(18,28,72,0.72)')
      nebGrad.addColorStop(0.30, 'rgba(10,18,52,0.42)')
      nebGrad.addColorStop(0.65, 'rgba(4,8,28,0.18)')
      nebGrad.addColorStop(1,    'rgba(0,2,8,0)')
      ctx.fillStyle = nebGrad
      ctx.fillRect(0, 0, width, height)

      // Secondary nebula tint — adds colour depth
      const nx2 = width  * (0.70 + Math.sin(t * 0.000095 + nebulaPhase * 0.7) * 0.09)
      const ny2 = height * (0.35 + Math.cos(t * 0.000080 + nebulaPhase * 0.9) * 0.07)
      const nr2 = Math.max(width, height) * 0.45
      const nebGrad2 = ctx.createRadialGradient(nx2, ny2, 0, nx2, ny2, nr2)
      if (isDark) {
        nebGrad2.addColorStop(0,   'rgba(200,146,10,0.05)')
        nebGrad2.addColorStop(0.5, 'rgba(59,130,246,0.025)')
        nebGrad2.addColorStop(1,   'rgba(0,0,0,0)')
      } else {
        nebGrad2.addColorStop(0,   'rgba(200,146,10,0.04)')
        nebGrad2.addColorStop(1,   'rgba(255,255,255,0)')
      }
      ctx.fillStyle = nebGrad2
      ctx.fillRect(0, 0, width, height)

      // ── 3. Starfield ────────────────────────────────────────────────────────
      if (isDark) {
        stars.forEach((star) => {
          const twinkle = 0.6 + 0.4 * Math.sin(t * star.twinkleFreq + star.twinklePhase)
          const alpha   = star.baseAlpha * twinkle * Math.min(1, materialiseProgress * 2)
          if (alpha < 0.01) return
          ctx.fillStyle = `rgba(200,212,255,${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.arc(star.nx * width, star.ny * height, star.radius, 0, TAU)
          ctx.fill()
        })
      }

      // ── 4. Connection lines ─────────────────────────────────────────────────
      // Connections only fully draw after materialise > 0.78
      const connReveal = smoothstep(0.78, 1.0, materialiseProgress)
      if (connReveal > 0.005) {
        ;(CONNECTIONS as unknown as [number, number][]).forEach(([ai, bi]) => {
          const na = nodes[ai],  nb = nodes[bi]
          const ax = na.x * width,  ay = na.y * height
          const bx = nb.x * width,  by = nb.y * height

          // Blend colour from both pillar endpoints
          const [raR, raG, raB] = PILLAR_RGB[na.pillar]
          const [rbR, rbG, rbB] = PILLAR_RGB[nb.pillar]
          const r = Math.round((raR + rbR) / 2)
          const g = Math.round((raG + rbG) / 2)
          const b = Math.round((raB + rbB) / 2)

          const endpointAlpha = Math.min(na.currentAlpha, nb.currentAlpha)
          const isActiveConn  = activeCase !== -1 && (activeCase === ai || activeCase === bi)
          const multiplier    = isActiveConn ? 2.2 : 0.65
          const finalAlpha    = endpointAlpha * multiplier * connReveal
          if (finalAlpha < 0.005) return

          // Glow pass (wide, soft)
          ctx.save()
          ctx.shadowBlur  = isActiveConn ? 10 : 5
          ctx.shadowColor = `rgba(${r},${g},${b},${(finalAlpha * 0.45).toFixed(3)})`
          ctx.strokeStyle = `rgba(${r},${g},${b},${(finalAlpha * 0.22).toFixed(3)})`
          ctx.lineWidth   = isActiveConn ? 2.0 : 1.4
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(bx, by)
          ctx.stroke()
          ctx.restore()

          // Crisp core pass
          ctx.shadowBlur  = 0
          ctx.strokeStyle = `rgba(${r},${g},${b},${(finalAlpha * 0.30).toFixed(3)})`
          ctx.lineWidth   = 0.6
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(bx, by)
          ctx.stroke()
        })
      }

      // ── 5. Nodes ────────────────────────────────────────────────────────────
      nodes.forEach((node, i) => {
        const alpha = node.currentAlpha
        if (alpha < 0.008) return

        const px = node.x * width
        const py = node.y * height
        const [r, g, b] = PILLAR_RGB[node.pillar]
        const radius      = node.baseRadius
        const isActive    = i === activeCase

        // ── Outer nebula halo ──────────────────────────────────────────────
        const haloR = radius * (isActive ? 16 : 11)
        const halo  = ctx.createRadialGradient(px, py, 0, px, py, haloR)
        halo.addColorStop(0,   `rgba(${r},${g},${b},${(alpha * (isActive ? 0.26 : 0.16)).toFixed(3)})`)
        halo.addColorStop(0.35,`rgba(${r},${g},${b},${(alpha * (isActive ? 0.12 : 0.07)).toFixed(3)})`)
        halo.addColorStop(1,   'rgba(0,0,0,0)')
        ctx.fillStyle = halo
        ctx.beginPath()
        ctx.arc(px, py, haloR, 0, TAU)
        ctx.fill()

        // ── Expanding pulse rings (active node only) ───────────────────────
        if (isActive) {
          for (let ring = 0; ring < 3; ring++) {
            const rp = ((t + ring * 420) % 1260) / 1260
            const ringR  = radius * (1.6 + rp * 10)
            const ringA  = (1 - rp) * alpha * 0.50
            if (ringA < 0.005) continue
            ctx.strokeStyle = `rgba(${r},${g},${b},${ringA.toFixed(3)})`
            ctx.lineWidth   = 1.8 * (1 - rp * 0.7)
            ctx.shadowBlur  = 6
            ctx.shadowColor = `rgba(${r},${g},${b},${(ringA * 0.6).toFixed(3)})`
            ctx.beginPath()
            ctx.arc(px, py, ringR, 0, TAU)
            ctx.stroke()
            ctx.shadowBlur = 0
          }
        }

        // ── Inner accent ring ──────────────────────────────────────────────
        ctx.strokeStyle = `rgba(${r},${g},${b},${(alpha * (isActive ? 0.55 : 0.32)).toFixed(3)})`
        ctx.lineWidth   = 1.0
        ctx.shadowBlur  = 0
        ctx.beginPath()
        ctx.arc(px, py, radius * 1.7, 0, TAU)
        ctx.stroke()

        // ── Core dot ───────────────────────────────────────────────────────
        ctx.fillStyle  = `rgba(${r},${g},${b},${(alpha * (isActive ? 1.0 : 0.80)).toFixed(3)})`
        ctx.shadowBlur  = isActive ? 14 : 6
        ctx.shadowColor = `rgba(${r},${g},${b},${(alpha * 0.85).toFixed(3)})`
        ctx.beginPath()
        ctx.arc(px, py, radius, 0, TAU)
        ctx.fill()
        ctx.shadowBlur = 0

        // ── Inner bright specular (makes node feel lit) ────────────────────
        const specR = radius * 0.45
        const spec  = ctx.createRadialGradient(
          px - specR * 0.4, py - specR * 0.4, 0,
          px, py, specR * 1.2
        )
        spec.addColorStop(0, `rgba(255,255,255,${(alpha * (isActive ? 0.55 : 0.30)).toFixed(3)})`)
        spec.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = spec
        ctx.beginPath()
        ctx.arc(px, py, specR * 1.2, 0, TAU)
        ctx.fill()
      })
    }

    // ── Animation loop ────────────────────────────────────────────────────────
    function frame(ts: number) {
      if (!document.hidden) draw(ts)
      animId = requestAnimationFrame(frame)
    }

    if (prefersReduced) {
      // Static snapshot at 65% materialise with no animation
      materialiseProgress = 0.65
      nodes.forEach((n, i) => {
        n.currentAlpha = smoothstep(i * 0.085, i * 0.085 + 0.08, 0.65)
      })
      draw(0)
    } else {
      animId = requestAnimationFrame(frame)
    }

    return () => {
      cancelAnimationFrame(animId)
      resizeObs.disconnect()
      themeObs.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%' }}
    />
  )
}
