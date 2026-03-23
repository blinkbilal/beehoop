'use client'

import { useEffect, useRef } from 'react'

interface DataEngineCanvasProps {
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

export function DataEngineCanvas({ className = '' }: DataEngineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024

    // Theme detection
    let isDark = document.documentElement.classList.contains('dark')
    const themeObs = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let animationId = 0
    let width = 0
    let height = 0
    let lastTime = 0
    let frameCount = 0

    const rng = mulberry32(91)

    // ── Neural network layout ────────────────────────────────────────────────
    // 3-layer architecture: Input → Process → Insight
    // [normX, normY, layer, baseRadius]
    const NODE_DEFS_DESKTOP = [
      // Layer 0 — Input (8 nodes, y 15–25%)
      [0.10, 0.17, 0, 2.5], [0.22, 0.20, 0, 2.5], [0.34, 0.15, 0, 2.8],
      [0.46, 0.22, 0, 2.5], [0.58, 0.17, 0, 2.8], [0.70, 0.21, 0, 2.5],
      [0.82, 0.16, 0, 2.5], [0.92, 0.20, 0, 2.8],
      // Layer 1 — Process (5 nodes, y 42–55%)
      [0.20, 0.45, 1, 4.0], [0.38, 0.48, 1, 4.2], [0.54, 0.44, 1, 4.0],
      [0.70, 0.50, 1, 4.2], [0.84, 0.46, 1, 4.0],
      // Layer 2 — Insight (3 nodes, y 72–82%)
      [0.30, 0.76, 2, 6.5], [0.54, 0.74, 2, 7.0], [0.76, 0.78, 2, 6.5],
    ] as const

    const NODE_DEFS_TABLET = [
      [0.12, 0.18, 0, 2.5], [0.30, 0.16, 0, 2.5], [0.48, 0.20, 0, 2.8],
      [0.66, 0.17, 0, 2.5], [0.84, 0.19, 0, 2.8],
      [0.24, 0.46, 1, 4.0], [0.48, 0.44, 1, 4.2], [0.72, 0.48, 1, 4.0],
      [0.36, 0.76, 2, 6.5], [0.64, 0.74, 2, 6.5],
    ] as const
    // Extra desktop-only connections
    const NODE_DEFS_MOBILE = [
      [0.15, 0.18, 0, 2.5], [0.40, 0.16, 0, 2.8], [0.65, 0.20, 0, 2.5],
      [0.88, 0.17, 0, 2.5],
      [0.28, 0.46, 1, 4.0], [0.58, 0.44, 1, 4.2], [0.82, 0.48, 1, 4.0],
      [0.36, 0.76, 2, 6.5], [0.66, 0.74, 2, 6.5],
    ] as const

    const nodeDefs = isMobile ? NODE_DEFS_MOBILE : isTablet ? NODE_DEFS_TABLET : NODE_DEFS_DESKTOP

    // Connections: [fromIdx, toIdx] — all flow downward (layer N → N+1)
    function buildConnections(defs: readonly (readonly [number, number, number, number])[]) {
      const conns: [number, number][] = []
      const connRng = mulberry32(42)
      for (let i = 0; i < defs.length; i++) {
        const [, , layerA] = defs[i]
        if (layerA >= 2) continue
        const targets: number[] = []
        for (let j = 0; j < defs.length; j++) {
          if (defs[j][2] === layerA + 1) targets.push(j)
        }
        // Each node connects to 1–2 nodes in next layer
        const count = 1 + (connRng() > 0.45 ? 1 : 0)
        // Sort by horizontal proximity
        targets.sort((a, b) => Math.abs(defs[a][0] - defs[i][0]) - Math.abs(defs[b][0] - defs[i][0]))
        for (let c = 0; c < Math.min(count, targets.length); c++) {
          conns.push([i, targets[c]])
        }
      }
      return conns
    }

    const connections = buildConnections(nodeDefs)

    interface NeuralNode {
      baseX: number; baseY: number
      x: number; y: number
      layer: number
      radius: number
      glowIntensity: number
      phase: number
      driftFreqX: number; driftFreqY: number
      flashTimer: number // countdown for arrival flash
    }

    interface DustMote {
      nx: number; ny: number
      radius: number
      baseOpacity: number
      twinklePhase: number
      twinkleSpeed: number
    }

    interface SignalPulse {
      connIdx: number
      t: number
      speed: number
      active: boolean
    }

    let nodes: NeuralNode[] = []
    let dust: DustMote[] = []
    let pulses: SignalPulse[] = []

    const DUST_COUNT = isMobile ? 20 : 40
    const PULSE_COUNT = isMobile ? 5 : isTablet ? 7 : 10
    const SPOTLIGHT_RADIUS = 200

    function init() {
      width = canvas!.offsetWidth
      height = canvas!.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      const layoutRng = mulberry32(13)

      nodes = nodeDefs.map(([nx, ny, layer, radius]) => ({
        baseX: (nx as number) * width,
        baseY: (ny as number) * height,
        x: (nx as number) * width,
        y: (ny as number) * height,
        layer: layer as number,
        radius: radius as number,
        glowIntensity: 0,
        phase: layoutRng() * Math.PI * 2,
        driftFreqX: 0.15 + layoutRng() * 0.25,
        driftFreqY: 0.12 + layoutRng() * 0.20,
        flashTimer: 0,
      }))

      const dustRng = mulberry32(7)
      dust = Array.from({ length: DUST_COUNT }, () => ({
        nx: dustRng(),
        ny: dustRng(),
        radius: 0.4 + dustRng() * 0.8,
        baseOpacity: 0.05 + dustRng() * 0.18,
        twinklePhase: dustRng() * Math.PI * 2,
        twinkleSpeed: 0.3 + dustRng() * 0.7,
      }))

      // Initialize pulse pool
      pulses = Array.from({ length: PULSE_COUNT }, (_, i) => ({
        connIdx: i % connections.length,
        t: rng(),
        speed: 0.4 + rng() * 0.4,
        active: false,
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

    function draw(time: number) {
      if (!ctx) return
      const dt = Math.min((time - lastTime) * 0.001, 0.05)
      lastTime = time
      const prog = progressRef.current
      const now = time * 0.001

      // Mobile: 30fps via frame-skipping
      frameCount++
      if (isMobile && frameCount % 2 !== 0 && !prefersReduced) return

      ctx.clearRect(0, 0, width, height)

      // ── Per-frame theme tokens ─────────────────────────────────────────────
      const SAPPHIRE      = isDark ? [59, 130, 246]  : [29, 93, 191]
      const SAPPHIRE_MID  = isDark ? [37, 99, 210]   : [22, 72, 158]
      const SAPPHIRE_PULSE = isDark ? [96, 165, 250] : [59, 130, 246]
      const STAR_RGB      = isDark ? '180,200,255'    : '29,93,191'
      const oMul = isDark ? 1.0 : 0.55
      const gMul = isDark ? 1.0 : 0.65
      const nMul = isDark ? 1.0 : 0.50

      const mx = mouseRef.current.x * width
      const my = mouseRef.current.y * height

      // ── Nebula (dark mode only) ────────────────────────────────────────────
      if (isDark) {
        const nebulaVis = Math.min(prog * 1.4, 1)
        if (nebulaVis > 0.01) {
          const nbX = width * 0.5 + Math.cos(now * 0.06) * width * 0.035
          const nbY = height * 0.5 + Math.sin(now * 0.04) * height * 0.025
          const nbR = Math.min(width, height) * 0.5
          const nb = ctx.createRadialGradient(nbX, nbY, 0, nbX, nbY, nbR)
          nb.addColorStop(0, `rgba(59,130,246,${0.06 * nebulaVis})`)
          nb.addColorStop(0.35, `rgba(30,50,140,${0.024 * nebulaVis})`)
          nb.addColorStop(0.7, `rgba(15,15,80,${0.01 * nebulaVis})`)
          nb.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.beginPath()
          ctx.arc(nbX, nbY, nbR, 0, Math.PI * 2)
          ctx.fillStyle = nb
          ctx.fill()
        }
      } else {
        // Light: subtle cool sky wash
        const nebulaVis = Math.min(prog * 1.2, 1)
        if (nebulaVis > 0.01) {
          const nbX = width * 0.5
          const nbY = height * 0.48
          const nbR = Math.min(width, height) * 0.48
          const nb = ctx.createRadialGradient(nbX, nbY, 0, nbX, nbY, nbR)
          nb.addColorStop(0, `rgba(96,165,250,${0.12 * nebulaVis * nMul})`)
          nb.addColorStop(0.35, `rgba(59,130,246,${0.05 * nebulaVis * nMul})`)
          nb.addColorStop(0.7, `rgba(37,99,210,${0.02 * nebulaVis * nMul})`)
          nb.addColorStop(1, 'rgba(0,0,0,0)')
          ctx.beginPath()
          ctx.arc(nbX, nbY, nbR, 0, Math.PI * 2)
          ctx.fillStyle = nb
          ctx.fill()
        }
      }

      // ── Update node positions (ambient drift) ─────────────────────────────
      for (const n of nodes) {
        n.x = n.baseX + Math.sin(now * n.driftFreqX + n.phase) * 3
        n.y = n.baseY + Math.cos(now * n.driftFreqY + n.phase) * 3
        // Decay flash timer
        if (n.flashTimer > 0) n.flashTimer = Math.max(0, n.flashTimer - dt)
      }

      // ── Dust motes ─────────────────────────────────────────────────────────
      const dustVis = Math.min(prog * 1.6, 1)
      for (const d of dust) {
        const twinkle = 0.5 + 0.5 * Math.sin(now * d.twinkleSpeed + d.twinklePhase)
        const alpha = d.baseOpacity * twinkle * dustVis * oMul
        ctx.beginPath()
        ctx.arc(d.nx * width, d.ny * height, d.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${STAR_RGB},${alpha})`
        ctx.fill()
      }

      // ── Connections ─────────────────────────────────────────────────────────
      // Phase thresholds: dormant < 0.15, awakening 0.15–0.40, processing 0.40–0.70, insight > 0.70
      if (prog > 0.08) {
        for (let ci = 0; ci < connections.length; ci++) {
          const [aIdx, bIdx] = connections[ci]
          const a = nodes[aIdx]
          const b = nodes[bIdx]

          // Connections activate layer-by-layer
          let connPhaseMin = 0.08
          if (a.layer === 1) connPhaseMin = 0.35
          if (prog < connPhaseMin) continue

          const connVis = Math.min((prog - connPhaseMin) * 3.0, 1)
          let baseAlpha = (isDark ? 0.12 : 0.15) * connVis * oMul

          // Mouse proximity spotlight (desktop only)
          if (!isMobile) {
            const midX = (a.x + b.x) / 2
            const midY = (a.y + b.y) / 2
            const distToMouse = Math.sqrt((midX - mx) ** 2 + (midY - my) ** 2)
            if (distToMouse < SPOTLIGHT_RADIUS) {
              const boost = (1 - distToMouse / SPOTLIGHT_RADIUS) * 0.25
              baseAlpha += boost * connVis * oMul
            }
          }

          // Full-network alpha boost in insight phase
          if (prog > 0.70) {
            baseAlpha *= 1 + (prog - 0.70) * 2.0
          }

          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
          ctx.strokeStyle = `rgba(${SAPPHIRE_MID.join(',')},${Math.min(baseAlpha, 0.45)})`
          ctx.lineWidth = isDark ? 0.8 : 0.6
          ctx.stroke()
        }
      }

      // ── Signal pulses ──────────────────────────────────────────────────────
      const pulsePhaseMin = 0.15
      if (prog > pulsePhaseMin) {
        const pulseVis = Math.min((prog - pulsePhaseMin) * 2.5, 1)
        // Activate pulses progressively
        const activeFrac = Math.min((prog - pulsePhaseMin) / 0.55, 1)
        const activeCount = Math.ceil(pulses.length * activeFrac)

        for (let pi = 0; pi < pulses.length; pi++) {
          const p = pulses[pi]
          if (pi >= activeCount) { p.active = false; continue }
          if (!p.active) {
            // Spawn on a random connection
            p.connIdx = Math.floor(rng() * connections.length)
            p.t = 0
            p.speed = 0.4 + rng() * 0.4
            p.active = true
          }

          const [aIdx, bIdx] = connections[p.connIdx]
          const a = nodes[aIdx]
          const b = nodes[bIdx]
          const px = a.x + (b.x - a.x) * p.t
          const py = a.y + (b.y - a.y) * p.t

          // Glow trail
          const glowR = 7
          const grd = ctx.createRadialGradient(px, py, 0, px, py, glowR)
          grd.addColorStop(0, `rgba(${SAPPHIRE_PULSE.join(',')},${0.65 * pulseVis * gMul})`)
          grd.addColorStop(0.4, `rgba(${SAPPHIRE_MID.join(',')},${0.22 * pulseVis * gMul})`)
          grd.addColorStop(1, `rgba(${SAPPHIRE_MID.join(',')},0)`)
          ctx.beginPath()
          ctx.arc(px, py, glowR, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()

          // Bright core
          ctx.beginPath()
          ctx.arc(px, py, 2.2, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${SAPPHIRE_PULSE.join(',')},${0.92 * pulseVis})`
          ctx.fill()

          // Advance pulse
          p.t += p.speed * dt
          if (p.t >= 1) {
            // Trigger flash on destination node
            nodes[bIdx].flashTimer = 0.4
            // Try to cascade: find a connection starting from bIdx
            const cascadeConns = connections
              .map((c, idx) => ({ c, idx }))
              .filter(({ c }) => c[0] === bIdx)
            if (cascadeConns.length > 0) {
              const pick = cascadeConns[Math.floor(rng() * cascadeConns.length)]
              p.connIdx = pick.idx
              p.t = 0
              p.speed = 0.4 + rng() * 0.4
            } else {
              p.active = false // reached insight layer
            }
          }
        }
      }

      // ── Node flash effects ─────────────────────────────────────────────────
      for (const n of nodes) {
        if (n.flashTimer > 0) {
          const flashProg = 1 - n.flashTimer / 0.4 // 0→1
          const ringR = n.radius * 3 + flashProg * n.radius * 8
          const ringAlpha = (1 - flashProg) * 0.35 * gMul
          ctx.beginPath()
          ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(${SAPPHIRE_PULSE.join(',')},${ringAlpha})`
          ctx.lineWidth = 1.2 * (1 - flashProg)
          ctx.stroke()
        }
      }

      // ── Node rendering ─────────────────────────────────────────────────────
      for (const n of nodes) {
        const breathing = 0.7 + 0.3 * Math.sin(now * 0.8 + n.phase)
        // Layer visibility: 0 first, then 1, then 2
        let nodePhaseMin = 0.0
        if (n.layer === 1) nodePhaseMin = 0.12
        if (n.layer === 2) nodePhaseMin = 0.30
        const vis = Math.min(Math.max((prog - nodePhaseMin) * 3.0, 0), 1)
        if (vis < 0.01) continue

        // Glow halo — larger for insight nodes
        const glowMul = n.layer === 2 ? 9 : n.layer === 1 ? 7 : 5
        const glowR = n.radius * glowMul
        const haloIntensity = n.layer === 2 && prog > 0.70
          ? 0.22 + (prog - 0.70) * 0.5 // bloom in insight phase
          : 0.14
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        glow.addColorStop(0, `rgba(${SAPPHIRE.join(',')},${haloIntensity * breathing * vis * gMul})`)
        glow.addColorStop(0.5, `rgba(${SAPPHIRE_MID.join(',')},${haloIntensity * 0.3 * breathing * vis * gMul})`)
        glow.addColorStop(1, `rgba(${SAPPHIRE_MID.join(',')},0)`)
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Node core
        const coreR = (n.radius * 0.88 + n.radius * 0.12 * breathing) * vis
        const core = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.radius)
        if (isDark) {
          core.addColorStop(0, `rgba(150,200,255,${0.95 * vis})`)
          core.addColorStop(0.45, `rgba(59,130,246,${0.82 * vis})`)
          core.addColorStop(1, `rgba(37,99,210,${0.4 * vis})`)
        } else {
          core.addColorStop(0, `rgba(59,130,246,${0.98 * vis})`)
          core.addColorStop(0.45, `rgba(29,93,191,${0.88 * vis})`)
          core.addColorStop(1, `rgba(22,72,158,${0.5 * vis})`)
        }
        ctx.beginPath()
        ctx.arc(n.x, n.y, coreR, 0, Math.PI * 2)
        ctx.fillStyle = core
        ctx.fill()
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
