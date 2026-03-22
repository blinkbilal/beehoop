'use client'

import { useEffect, useRef } from 'react'

interface DigitalEngineeringCanvasProps {
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

// Rounded rectangle path helper (cross-browser safe)
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  const cr = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + cr, y)
  ctx.lineTo(x + w - cr, y)
  ctx.arcTo(x + w, y, x + w, y + cr, cr)
  ctx.lineTo(x + w, y + h - cr)
  ctx.arcTo(x + w, y + h, x + w - cr, y + h, cr)
  ctx.lineTo(x + cr, y + h)
  ctx.arcTo(x, y + h, x, y + h - cr, cr)
  ctx.lineTo(x, y + cr)
  ctx.arcTo(x, y, x + cr, y, cr)
  ctx.closePath()
}

export function DigitalEngineeringCanvas({ className = '' }: DigitalEngineeringCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const scanLineRef = useRef(0) // 0–1 vertical scan position

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768

    // Theme detection — boosts luminance for light-mode sessions
    let isDark = document.documentElement.classList.contains('dark')
    const themeObs = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let animationId = 0
    let width = 0
    let height = 0
    let lastTime = 0

    const rng = mulberry32(17)

    // ── Component block definitions ──────────────────────────────────────────
    // [normCenterX, normCenterY, normW, normH] — 3-tier system architecture layout
    const BLOCK_DEFS = [
      // Tier 0 — Inputs
      [0.18, 0.16, 0.13, 0.085],  // 0 Input Layer
      [0.50, 0.16, 0.15, 0.085],  // 1 API Gateway
      [0.82, 0.16, 0.13, 0.085],  // 2 Auth Service
      // Tier 1 — Core processing
      [0.22, 0.40, 0.15, 0.09],   // 3 Transform
      [0.50, 0.40, 0.17, 0.10],   // 4 Core Engine
      [0.78, 0.40, 0.13, 0.09],   // 5 Cache
      // Tier 2 — Persistence
      [0.28, 0.64, 0.13, 0.085],  // 6 Database
      [0.52, 0.64, 0.15, 0.085],  // 7 Event Queue
      [0.76, 0.64, 0.13, 0.085],  // 8 Analytics
      // Tier 3 — Output
      [0.50, 0.86, 0.15, 0.075],  // 9 Output
    ] as const

    // Tiny PCB-style block identifiers
    const BLOCK_LABELS = ['I/O', 'API', 'AUTH', 'XFORM', 'CORE', 'CACHE', 'DB', 'QUEUE', 'ANLTX', 'OUTPUT']

    // Orthogonal connection pairs (from → to)
    const CONNECTIONS: [number, number][] = [
      [0, 3], [0, 4],
      [1, 4],
      [2, 4], [2, 5],
      [3, 6],
      [4, 7],
      [5, 8],
      [6, 9], [7, 9], [8, 9],
    ]

    interface Block {
      // Target (assembled) position — top-left px
      tx: number
      ty: number
      tw: number
      th: number
      // Chaotic initial position
      cx: number
      cy: number
      // Current rendered position (lerped)
      x: number
      y: number
      // Corner detail phase
      detailPhase: number
      label: string
    }

    interface TrailPoint { x: number; y: number }

    interface Packet {
      connIdx: number
      t: number      // 0 → 1 along L-path
      speed: number
      trail: TrailPoint[]
    }

    let blocks: Block[] = []
    let packets: Packet[] = []

    // ── L-path position helper — orthogonal route from block a bottom → block b top
    function getLPathXY(a: Block, b: Block, frac: number): [number, number] {
      const ax = a.x + a.tw / 2
      const ay = a.y + a.th        // exit bottom-centre
      const bx = b.x + b.tw / 2
      const by = b.y               // enter top-centre
      const bendy = (ay + by) / 2  // horizontal bend midpoint

      const seg1 = Math.abs(bendy - ay)
      const seg2 = Math.hypot(bx - ax, by - bendy)
      const total = seg1 + seg2
      if (total < 1) return [ax, ay]

      const f1 = seg1 / total
      if (frac <= f1) {
        const lt = frac / f1
        return [ax, ay + (bendy - ay) * lt]
      }
      const lt = (frac - f1) / (1 - f1)
      return [ax + (bx - ax) * lt, bendy + (by - bendy) * lt]
    }

    function init() {
      width = canvas!.offsetWidth
      height = canvas!.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      // Scatter initial positions far from target
      const scatterRng = mulberry32(33)

      blocks = BLOCK_DEFS.map(([ncx, ncy, nw, nh], i) => {
        const tw = (nw as number) * width
        const th = (nh as number) * height
        const tx = (ncx as number) * width - tw / 2
        const ty = (ncy as number) * height - th / 2

        // Scatter initial positions from off-screen edges
        const edge = scatterRng()
        let cx: number
        let cy: number
        if (edge < 0.25) { cx = -tw - scatterRng() * 60; cy = scatterRng() * height }
        else if (edge < 0.5) { cx = width + scatterRng() * 60; cy = scatterRng() * height }
        else if (edge < 0.75) { cx = scatterRng() * width; cy = -th - scatterRng() * 60 }
        else { cx = scatterRng() * width; cy = height + scatterRng() * 60 }

        return { tx, ty, tw, th, cx, cy, x: cx, y: cy, detailPhase: scatterRng() * Math.PI * 2, label: BLOCK_LABELS[i] ?? '' }
      })

      packets = CONNECTIONS.map((_, i) => ({
        connIdx: i,
        t: rng(),
        speed: 0.055 + rng() * 0.075,
        trail: [],
      }))
    }

    function updateScrollProgress() {
      if (!canvas) return
      const section = canvas.closest('section')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = 1 - rect.top / vh
      progressRef.current = Math.max(0, Math.min(1, raw * 0.9))
    }

    // ── PCB dot grid ─────────────────────────────────────────────────────────
    function drawDotGrid(prog: number, EM: number[], oMul: number) {
      const gridAlpha = Math.min(prog * 2.8, 1) * (isDark ? 0.044 : 0.028) * oMul
      if (gridAlpha < 0.002) return
      const step = isMobile ? 32 : 40
      ctx!.fillStyle = `rgba(${EM.join(',')},${gridAlpha})`
      for (let gx = step; gx < width; gx += step) {
        for (let gy = step; gy < height; gy += step) {
          ctx!.beginPath()
          ctx!.arc(gx, gy, 0.85, 0, Math.PI * 2)
          ctx!.fill()
        }
      }
    }

    function draw(time: number) {
      if (!ctx) return
      const dt = Math.min((time - lastTime) * 0.001, 0.05)
      lastTime = time
      const prog = progressRef.current
      const now = time * 0.001

      // ── Per-frame theme palette ──────────────────────────────────────────
      // Dark:  void-green field → emerald blueprint assembles from darkness
      // Light: warm parchment field → jade-ink circuit assembles on paper
      // The whole experience flips: instead of emerald on black, it's
      // a rich circuit-board diagram rendered in jade ink on cream vellum.
      const EM   = isDark ? [16, 185, 129]  : [6,  120, 80]   // primary emerald/jade
      const EM_B = isDark ? [52, 211, 153]  : [20, 160, 100]  // bright accent
      const EM_X = isDark ? [110, 231, 183] : [60, 190, 130]  // ultra-bright core
      const oMul = isDark ? 1.0 : 0.70   // opacity multiplier — ink reads crisply
      const gMul = isDark ? 1.0 : 0.45   // glow budget — much less on bright bg

      ctx.clearRect(0, 0, width, height)

      // PCB dot grid — blueprint foundation
      drawDotGrid(prog, EM, oMul)

      // Advance diagnostic scan line after assembly begins
      if (prog > 0.6) {
        scanLineRef.current = (scanLineRef.current + dt * 0.062) % 1
      }

      // Ease-out assembly lerp
      const lerpT = Math.pow(prog, 0.72)
      for (const b of blocks) {
        b.x = b.cx + (b.tx - b.cx) * lerpT
        b.y = b.cy + (b.ty - b.cy) * lerpT
      }

      // ── Orthogonal L-traces ──────────────────────────────────────────────
      if (prog > 0.55) {
        const connVis = Math.min((prog - 0.55) * 3.5, 1) * oMul
        for (const [aIdx, bIdx] of CONNECTIONS) {
          const a = blocks[aIdx]
          const b = blocks[bIdx]
          const ax = a.x + a.tw / 2
          const ay = a.y + a.th
          const bx = b.x + b.tw / 2
          const by = b.y
          const bendy = (ay + by) / 2

          // Gradient trace
          const tg = ctx.createLinearGradient(ax, ay, bx, by)
          tg.addColorStop(0, `rgba(${EM_B.join(',')},${0.36 * connVis})`)
          tg.addColorStop(0.5, `rgba(${EM.join(',')},${0.20 * connVis})`)
          tg.addColorStop(1, `rgba(${EM_B.join(',')},${0.32 * connVis})`)
          ctx.beginPath()
          ctx.moveTo(ax, ay)
          ctx.lineTo(ax, bendy)
          ctx.lineTo(bx, bendy)
          ctx.lineTo(bx, by)
          ctx.strokeStyle = tg
          ctx.lineWidth = 1.0
          ctx.stroke()

          // Solder dots
          for (const [ex, ey] of [[ax, ay], [bx, by]] as [number, number][]) {
            ctx.beginPath()
            ctx.arc(ex, ey, 2.4, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${EM_B.join(',')},${0.52 * connVis})`
            ctx.fill()
          }
        }
      }

      // ── Data packets with fading trails ─────────────────────────────────
      if (prog > 0.70) {
        const packetVis = Math.min((prog - 0.70) * 4.5, 1) * oMul

        for (const p of packets) {
          const [aIdx, bIdx] = CONNECTIONS[p.connIdx]
          const a = blocks[aIdx]
          const b = blocks[bIdx]
          const [pkx, pky] = getLPathXY(a, b, p.t)

          // Fading trail
          for (let ti = 0; ti < p.trail.length; ti++) {
            const trailA = packetVis * (1 - (ti + 1) / (p.trail.length + 2)) * 0.44
            ctx.beginPath()
            ctx.arc(p.trail[ti].x, p.trail[ti].y, 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(${EM_B.join(',')},${trailA})`
            ctx.fill()
          }

          // Glow aura
          const grd = ctx.createRadialGradient(pkx, pky, 0, pkx, pky, 9)
          grd.addColorStop(0, `rgba(${EM_B.join(',')},${0.65 * packetVis * gMul})`)
          grd.addColorStop(0.45, `rgba(${EM.join(',')},${0.22 * packetVis * gMul})`)
          grd.addColorStop(1, `rgba(${EM.join(',')},0)`)
          ctx.beginPath()
          ctx.arc(pkx, pky, 9, 0, Math.PI * 2)
          ctx.fillStyle = grd; ctx.fill()

          // Bright core
          ctx.beginPath()
          ctx.arc(pkx, pky, 2.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${EM_X.join(',')},${0.95 * packetVis})`
          ctx.fill()

          p.trail.unshift({ x: pkx, y: pky })
          if (p.trail.length > 5) p.trail.pop()
          p.t = (p.t + p.speed * dt) % 1
        }
      }

      // ── Diagnostic scan line ─────────────────────────────────────────────
      if (prog > 0.62) {
        const scanVis = Math.min((prog - 0.62) * 3.0, 1) * (isDark ? 0.30 : 0.16) * oMul
        const sy = scanLineRef.current * height

        const sg = ctx.createLinearGradient(0, sy - 9, 0, sy + 9)
        sg.addColorStop(0, `rgba(${EM_B.join(',')},0)`)
        sg.addColorStop(0.5, `rgba(${EM_B.join(',')},${scanVis})`)
        sg.addColorStop(1, `rgba(${EM_B.join(',')},0)`)
        ctx.fillStyle = sg
        ctx.fillRect(0, sy - 9, width, 18)

        const blockVis = Math.min(prog * 3.2, 1)
        for (const b of blocks) {
          if (blockVis > 0.05 && sy >= b.y - 2 && sy <= b.y + b.th + 2) {
            roundRect(ctx, b.x, b.y, b.tw, b.th, 5)
            ctx.fillStyle = `rgba(${EM_B.join(',')},${scanVis * 1.8})`
            ctx.fill()
          }
        }
      }

      // ── Component blocks ─────────────────────────────────────────────────
      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      for (const b of blocks) {
        const blockVis = Math.min(prog * 3.2, 1)
        if (blockVis < 0.02) continue

        const bCx = b.x + b.tw / 2
        const bCy = b.y + b.th / 2
        const dist = Math.hypot(bCx - mx, bCy - my)
        const isHovered = !isMobile && dist < 72

        const fillA = (isHovered
          ? (isDark ? 0.18 : 0.12)
          : (isDark ? 0.07 : 0.06)) * blockVis
        const strokeA = (isHovered
          ? (isDark ? 0.62 : 0.55)
          : (isDark ? 0.27 : 0.32)) * blockVis * oMul

        // Fill
        roundRect(ctx, b.x, b.y, b.tw, b.th, 5)
        ctx.fillStyle = `rgba(${EM.join(',')},${fillA})`
        ctx.fill()

        // Gradient stroke — top brighter
        const strokeGrd = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.th)
        strokeGrd.addColorStop(0, `rgba(${EM_B.join(',')},${strokeA})`)
        strokeGrd.addColorStop(1, `rgba(${EM.join(',')},${strokeA * 0.62})`)
        roundRect(ctx, b.x, b.y, b.tw, b.th, 5)
        ctx.strokeStyle = strokeGrd
        ctx.lineWidth = isHovered ? 1.6 : 0.9
        ctx.stroke()

        // Hover inner radial glow
        if (isHovered) {
          const hg = ctx.createRadialGradient(bCx, bCy, 0, bCx, bCy, b.tw * 0.68)
          hg.addColorStop(0, `rgba(${EM_B.join(',')},${0.16 * gMul})`)
          hg.addColorStop(1, `rgba(${EM.join(',')},0)`)
          roundRect(ctx, b.x, b.y, b.tw, b.th, 5)
          ctx.fillStyle = hg; ctx.fill()
        }

        // PCB nubs
        for (const nubX of [b.x + 7, b.x + b.tw - 10]) {
          ctx.fillStyle = `rgba(${EM.join(',')},${0.44 * blockVis * oMul})`
          ctx.fillRect(nubX, b.y - 2.5, 3, 2.5)
        }

        // Status indicator — pulsing corner dot
        const pulse = 0.55 + 0.45 * Math.sin(now * 1.4 + b.detailPhase)
        ctx.beginPath()
        ctx.arc(b.x + b.tw - 5.5, b.y + 5.5, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${EM_B.join(',')},${0.58 * pulse * blockVis * oMul})`
        ctx.fill()

        // Block label
        if (prog > 0.68 && !isMobile) {
          const labelVis = Math.min((prog - 0.68) * 4.5, 1)
          const fontSize = Math.max(7, Math.round(b.tw * 0.125))
          ctx.font = `600 ${fontSize}px "SF Mono", "Fira Code", "Space Mono", monospace`
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillStyle = `rgba(${EM_B.join(',')},${(isDark ? 0.38 : 0.50) * labelVis * oMul})`
          ctx.fillText(b.label, bCx, bCy)
        }
      }

      // ── Build progress bar ─────────────────────────────────────────────────
      if (prog > 0.15) {
        const barVis = Math.min((prog - 0.15) * 2.5, 1) * oMul
        const barY = height - 6
        const barH = 1.5
        const barW = width * 0.7
        const barX = (width - barW) / 2
        const fillW = barW * Math.min(prog, 1)
        // Track
        ctx.fillStyle = `rgba(${EM.join(',')},${0.06 * barVis})`
        ctx.fillRect(barX, barY, barW, barH)
        // Fill
        const barGrd = ctx.createLinearGradient(barX, barY, barX + fillW, barY)
        barGrd.addColorStop(0, `rgba(${EM.join(',')},${0.12 * barVis})`)
        barGrd.addColorStop(1, `rgba(${EM_B.join(',')},${0.35 * barVis})`)
        ctx.fillStyle = barGrd
        ctx.fillRect(barX, barY, fillW, barH)
        // Leading edge glow
        if (fillW > 2) {
          ctx.beginPath()
          ctx.arc(barX + fillW, barY + barH / 2, 3, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${EM_B.join(',')},${0.4 * barVis * gMul})`
          ctx.fill()
        }
      }
    }

    function loop(time: number) {
      updateScrollProgress()
      draw(time)
      animationId = requestAnimationFrame(loop)
    }

    // Mouse tracking on section (canvas is pointer-events:none)
    const section = canvas.closest('section')
    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    section?.addEventListener('mousemove', handleMouseMove as EventListener)
    section?.addEventListener('mouseleave', handleMouseLeave)

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
      section?.removeEventListener('mouseleave', handleMouseLeave)
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
