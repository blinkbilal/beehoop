'use client'

import { useEffect, useRef } from 'react'

interface StrategicAdvisoryCanvasProps {
  className?: string
}

// Seeded PRNG — deterministic layout across SSR/client
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Quadratic Bezier evaluation
function quadBezier(
  t: number,
  x1: number, y1: number,
  cpx: number, cpy: number,
  x2: number, y2: number,
): [number, number] {
  const mt = 1 - t
  return [
    mt * mt * x1 + 2 * mt * t * cpx + t * t * x2,
    mt * mt * y1 + 2 * mt * t * cpy + t * t * y2,
  ]
}

export function StrategicAdvisoryCanvas({ className = '' }: StrategicAdvisoryCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 }) // normalised 0-1

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    // Theme detection — picks up both Next Themes class and system preference
    let isDark = document.documentElement.classList.contains('dark')
    const themeObs = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let animationId = 0
    let width = 0
    let height = 0
    let lastTime = 0

    const rng = mulberry32(42)

    // ── Orbital nodes ────────────────────────────────────────────────────────
    // 1 stationary anchor + 6 orbiting decision nodes
    // Orbital parameters: all radii computed from canvas dimensions in init()
    const NODE_DEFS = [
      // [orbitCenterNX, orbitCenterNY, orbitRxFrac, orbitRyFrac, speed_rad_s, phase, isAnchor, baseRadius]
      [0.50, 0.48,  0.00, 0.00,  0.000,  0.00, true,  9.5],  // 0 — anchor (stationary) +1.5
      [0.50, 0.48,  0.16, 0.11,  0.190,  0.00, false, 6.5],  // 1 +1.5
      [0.50, 0.48,  0.14, 0.09, -0.140,  2.09, false, 6.0],  // 2 +1.5
      [0.50, 0.48,  0.17, 0.12,  0.110,  4.19, false, 5.7],  // 3 +1.5
      [0.50, 0.48,  0.30, 0.19,  0.075,  1.05, false, 5.3],  // 4 +1.5
      [0.50, 0.48,  0.28, 0.17, -0.092,  3.35, false, 5.5],  // 5 +1.5
      [0.50, 0.48,  0.32, 0.20,  0.058,  5.15, false, 5.0],  // 6 +1.5
    ] as const

    // Arc connections (pairs of node indices)
    const ARC_PAIRS: [number, number][] = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
      [1, 2], [2, 3], [4, 5], [5, 6], [1, 4],
    ]

    interface Node {
      orbitCenterX: number
      orbitCenterY: number
      orbitRadiusX: number
      orbitRadiusY: number
      speed: number
      phase: number
      isAnchor: boolean
      baseRadius: number
      x: number
      y: number
    }

    interface Star {
      nx: number
      ny: number
      radius: number
      baseOpacity: number
      twinklePhase: number
      twinkleSpeed: number
    }

    interface Pulse {
      arcIdx: number
      t: number
      speed: number
    }

    interface Ripple {
      x: number; y: number
      age: number     // seconds since spawn
      maxAge: number  // total lifetime
    }

    let nodes: Node[] = []
    let stars: Star[] = []
    let pulses: Pulse[] = []
    let ripples: Ripple[] = []

    const STAR_COUNT = isMobile ? 28 : 52

    function init() {
      width = canvas!.offsetWidth
      height = canvas!.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Scale orbital radii to canvas — use short dimension to keep nodes on-screen
      const scale = Math.min(width, height * 1.8)

      nodes = NODE_DEFS.map(([ncx, ncy, rxFrac, ryFrac, speed, phase, isAnchor, radius]) => ({
        orbitCenterX: (ncx as number) * width,
        orbitCenterY: (ncy as number) * height,
        orbitRadiusX: (rxFrac as number) * scale,
        orbitRadiusY: (ryFrac as number) * scale,
        speed: speed as number,
        phase: phase as number,
        isAnchor: isAnchor as boolean,
        baseRadius: radius as number,
        x: (ncx as number) * width,
        y: (ncy as number) * height,
      }))

      // Recreate stars with deterministic positions
      const starRng = mulberry32(7)
      stars = Array.from({ length: STAR_COUNT }, () => ({
        nx: starRng(),
        ny: starRng(),
        radius: 0.5 + starRng() * 0.9,
        baseOpacity: 0.06 + starRng() * 0.20,
        twinklePhase: starRng() * Math.PI * 2,
        twinkleSpeed: 0.35 + starRng() * 0.75,
      }))

      pulses = ARC_PAIRS.map((_, idx) => ({
        arcIdx: idx,
        t: rng(),
        speed: 0.07 + rng() * 0.10,
      }))
    }

    function updateScrollProgress() {
      if (!canvas) return
      const section = canvas.closest('section')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = 1 - rect.top / vh
      progressRef.current = Math.max(0, Math.min(1, raw * 0.88))
    }

    // Control point for arc — perpendicular mid-offset for curvature
    function arcControlPoint(
      x1: number, y1: number, x2: number, y2: number,
    ): [number, number] {
      const mx = (x1 + x2) / 2
      const my = (y1 + y2) / 2
      const dx = x2 - x1
      const dy = y2 - y1
      const len = Math.sqrt(dx * dx + dy * dy) || 1
      const offset = len * 0.22
      return [mx - (dy / len) * offset, my + (dx / len) * offset]
    }

    function draw(time: number) {
      if (!ctx) return
      const dt = Math.min((time - lastTime) * 0.001, 0.05) // seconds, capped
      lastTime = time
      const prog = progressRef.current
      const now = time * 0.001

      ctx.clearRect(0, 0, width, height)

      // ── Per-frame theme tokens ─────────────────────────────────────────────
      // Full visual language switch — not just a brightness nudge.
      // Dark:  void-black → amber gold constellation
      // Light: warm parchment #FDFAF4 → amber ink gossamer threads
      const AMBER_CORE  = isDark ? [255, 220, 100] : [180, 100, 10]   // node core
      const AMBER_MID   = isDark ? [200, 146, 10]  : [160,  88,  6]   // glow / arcs
      const AMBER_PULSE = isDark ? [245, 200, 66]  : [200, 130, 18]   // pulse + bright
      const STAR_RGB    = isDark ? '255,255,255'   : '180,100,10'      // star/dust color
      // In light mode opacity budget is tighter — ink on bright paper reads differently
      const oMul = isDark ? 1.0 : 0.52   // global opacity scalar for stars + arcs
      const gMul = isDark ? 1.0 : 0.70   // glow halos — roll back to avoid mud
      const nMul = isDark ? 1.0 : 0.55   // nebula — subtle wash, not fog

      // ── Nebula / ambient field ─────────────────────────────────────────────
      const nebulaVis = Math.min(prog * 1.6, 1)
      if (nebulaVis > 0.01) {
        const nbX = width * 0.5 + Math.cos(now * 0.07) * width * 0.04
        const nbY = height * 0.48 + Math.sin(now * 0.05) * height * 0.03
        const nbR = Math.min(width, height) * 0.48
        const nb = ctx.createRadialGradient(nbX, nbY, 0, nbX, nbY, nbR)
        if (isDark) {
          nb.addColorStop(0, `rgba(200,146,10,${0.06 * nebulaVis})`)
          nb.addColorStop(0.4, `rgba(100,55,130,${0.024 * nebulaVis})`)
          nb.addColorStop(0.75, `rgba(40,18,75,${0.010 * nebulaVis})`)
        } else {
          // Warm sunrise wash over parchment
          nb.addColorStop(0, `rgba(255,200,80,${0.14 * nebulaVis * nMul})`)
          nb.addColorStop(0.35, `rgba(220,150,40,${0.06 * nebulaVis * nMul})`)
          nb.addColorStop(0.75, `rgba(200,120,20,${0.025 * nebulaVis * nMul})`)
        }
        nb.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.beginPath()
        ctx.arc(nbX, nbY, nbR, 0, Math.PI * 2)
        ctx.fillStyle = nb
        ctx.fill()
      }

      const mx = mouseRef.current.x * width
      const my = mouseRef.current.y * height

      // ── Update node positions ──
      for (const n of nodes) {
        const angle = n.phase + n.speed * now
        const baseX = n.orbitCenterX + Math.cos(angle) * n.orbitRadiusX
        const baseY = n.orbitCenterY + Math.sin(angle) * n.orbitRadiusY

        let gx = 0; let gy = 0
        if (prog > 0.25 && !n.isAnchor && !isMobile) {
          const dx = baseX - mx; const dy = baseY - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const maxDist = 180
          if (dist < maxDist && dist > 1) {
            const strength = (1 - dist / maxDist) * 18 * Math.min(prog, 1)
            gx = (dx / dist) * strength; gy = (dy / dist) * strength
          }
        }
        n.x = baseX + gx; n.y = baseY + gy
      }

      // ── Background stars / dust motes ──────────────────────────────────────
      const starVis = Math.min(prog * 1.8, 1)
      for (const s of stars) {
        const twinkle = 0.52 + 0.48 * Math.sin(now * s.twinkleSpeed + s.twinklePhase)
        const alpha = s.baseOpacity * twinkle * starVis * oMul
        ctx.beginPath()
        ctx.arc(s.nx * width, s.ny * height, s.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${STAR_RGB},${alpha})`
        ctx.fill()
      }

      // ── Orbital path rings ─────────────────────────────────────────────────
      if (prog > 0.15) {
        const ringAlphaBase = Math.min((prog - 0.15) * 1.5, 1) * 0.04 * oMul
        ctx.save()
        const rings = [
          { rx: nodes[1].orbitRadiusX, ry: nodes[1].orbitRadiusY },
          { rx: nodes[4].orbitRadiusX, ry: nodes[4].orbitRadiusY },
        ]
        for (const ring of rings) {
          const cx = nodes[0].orbitCenterX; const cy = nodes[0].orbitCenterY
          ctx.beginPath()
          ctx.ellipse(cx, cy, ring.rx, ring.ry, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${AMBER_MID.join(',')},${ringAlphaBase})`
          ctx.lineWidth = 0.7
          ctx.setLineDash([3, 9])
          ctx.stroke()
          ctx.setLineDash([])
        }
        ctx.restore()
      }

      // ── Probability arcs ───────────────────────────────────────────────────
      if (prog > 0.08) {
        const arcAlpha = Math.min((prog - 0.08) * 2.5, 1) * (isDark ? 0.13 : 0.20) * oMul
        for (const [aIdx, bIdx] of ARC_PAIRS) {
          const a = nodes[aIdx]; const b = nodes[bIdx]
          const [cpx, cpy] = arcControlPoint(a.x, a.y, b.x, b.y)
          // Variable weight: anchor connections are thicker
          const isAnchorConn = aIdx === 0 || bIdx === 0
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.quadraticCurveTo(cpx, cpy, b.x, b.y)
          ctx.strokeStyle = `rgba(${AMBER_MID.join(',')},${arcAlpha})`
          ctx.lineWidth = isAnchorConn ? (isDark ? 1.4 : 1.1) : (isDark ? 0.70 : 0.55)
          ctx.stroke()
        }
      }

      // ── Traveling insight pulses ────────────────────────────────────────────
      if (prog > 0.35) {
        const pulseVis = Math.min((prog - 0.35) * 2.2, 1)
        for (const p of pulses) {
          const [aIdx, bIdx] = ARC_PAIRS[p.arcIdx]
          const a = nodes[aIdx]; const b = nodes[bIdx]
          const [cpx, cpy] = arcControlPoint(a.x, a.y, b.x, b.y)
          const [px, py] = quadBezier(p.t, a.x, a.y, cpx, cpy, b.x, b.y)

          const glowR = 8
          const grd = ctx.createRadialGradient(px, py, 0, px, py, glowR)
          grd.addColorStop(0, `rgba(${AMBER_PULSE.join(',')},${0.70 * pulseVis * gMul})`)
          grd.addColorStop(0.4, `rgba(${AMBER_MID.join(',')},${0.28 * pulseVis * gMul})`)
          grd.addColorStop(1, `rgba(${AMBER_MID.join(',')},0)`)
          ctx.beginPath()
          ctx.arc(px, py, glowR, 0, Math.PI * 2)
          ctx.fillStyle = grd; ctx.fill()

          ctx.beginPath()
          ctx.arc(px, py, 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${AMBER_PULSE.join(',')},${0.94 * pulseVis * gMul})`
          ctx.fill()

          const prevT = p.t
          p.t = (p.t + p.speed * dt) % 1
          // Decision ripple: when pulse wraps (reaches destination node)
          if (p.t < prevT) {
            ripples.push({ x: b.x, y: b.y, age: 0, maxAge: 0.8 })
          }
        }
      }

      // ── Decision ripples ──────────────────────────────────────────────────
      for (let ri = ripples.length - 1; ri >= 0; ri--) {
        const r = ripples[ri]
        r.age += dt
        if (r.age >= r.maxAge) { ripples.splice(ri, 1); continue }
        const rProg = r.age / r.maxAge // 0→1
        const alpha = (1 - rProg) * 0.28 * gMul
        for (const rMult of [1.0, 1.8]) {
          const ringR = 6 + rProg * 38 * rMult
          ctx.beginPath()
          ctx.arc(r.x, r.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${AMBER_PULSE.join(',')},${alpha * (rMult === 1 ? 1 : 0.5)})`
          ctx.lineWidth = 0.8 * (1 - rProg)
          ctx.stroke()
        }
      }

      // ── Orbital nodes ─────────────────────────────────────────────────────
      for (const n of nodes) {
        const pulse = 0.72 + 0.28 * Math.sin(now * 1.6 + n.phase)
        const vis = Math.min(prog * 2.8, 1)

        // Outer ambient glow
        const glowR = n.baseRadius * (n.isAnchor ? 8.5 : 6)
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        glow.addColorStop(0, `rgba(${AMBER_MID.join(',')},${0.17 * pulse * vis * gMul})`)
        glow.addColorStop(0.5, `rgba(${AMBER_MID.join(',')},${0.055 * pulse * vis * gMul})`)
        glow.addColorStop(1, `rgba(${AMBER_MID.join(',')},0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = glow; ctx.fill()

        // Anchor: concentric rings
        if (n.isAnchor && prog > 0.18) {
          const ringV = Math.min((prog - 0.18) * 3, 1)
          for (const [rMult, a] of [[2.8, 0.17], [4.5, 0.09], [6.5, 0.055]] as [number, number][]) {
            ctx.beginPath()
            ctx.arc(n.x, n.y, n.baseRadius * rMult, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(${AMBER_PULSE.join(',')},${a * ringV * gMul})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }

        // Node core — different treatment for light
        const coreR = (n.baseRadius * 0.88 + n.baseRadius * 0.12 * pulse) * vis
        const core = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.baseRadius)
        if (isDark) {
          core.addColorStop(0, `rgba(255,220,100,${0.95 * vis})`)
          core.addColorStop(0.45, `rgba(200,146,10,${0.82 * vis})`)
          core.addColorStop(1, `rgba(160,105,6,${0.4 * vis})`)
        } else {
          // Richer amber ink — fully saturated, smaller halos
          core.addColorStop(0, `rgba(240,180,60,${0.98 * vis})`)
          core.addColorStop(0.45, `rgba(180,100,8,${0.88 * vis})`)
          core.addColorStop(1, `rgba(130,70,4,${0.5 * vis})`)
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, coreR, 0, Math.PI * 2)
        ctx.fillStyle = core; ctx.fill()
      }
    }

    function loop(time: number) {
      updateScrollProgress()
      draw(time)
      animationId = requestAnimationFrame(loop)
    }

    // Mouse tracking — desktop only
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    // Pointer events need to go on the section, not the canvas (canvas is pointer-events: none)
    const section = canvas.closest('section')
    section?.addEventListener('mousemove', handleMouseMove as EventListener)

    const resizeObs = new ResizeObserver(() => init())
    resizeObs.observe(canvas)
    init()

    if (prefersReduced) {
      progressRef.current = 1
      lastTime = 0
      draw(0)
    } else {
      animationId = requestAnimationFrame(loop)
    }

    return () => {
      cancelAnimationFrame(animationId)
      resizeObs.disconnect()
      themeObs.disconnect()
      section?.removeEventListener('mousemove', handleMouseMove as EventListener)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  )
}
