'use client'

import { useEffect, useRef } from 'react'

type RGB = [number, number, number]

// ── Seeded PRNG — deterministic layout, no SSR/client mismatch ─────────────
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ── Three capability stream definitions ─────────────────────────────────────
// Strategy (amber) / Intelligence (sapphire) / Engineering (emerald)
// Streams flow LEFT → RIGHT — three disciplines flowing into the beehoop nucleus on the right
// nodeXNorms are listed low → high (leftmost origin first, rightmost terminal last)
const STREAM_DEFS = [
  { color: [200, 146, 10]  as RGB, baseYNorm: 0.22, nodeXNorms: [0.04, 0.18, 0.32, 0.48, 0.62] as const }, // amber
  { color: [59,  130, 246] as RGB, baseYNorm: 0.50, nodeXNorms: [0.04, 0.17, 0.31, 0.47, 0.62] as const }, // sapphire
  { color: [16,  185, 129] as RGB, baseYNorm: 0.78, nodeXNorms: [0.04, 0.19, 0.33, 0.49, 0.63] as const }, // emerald
] as const

const MOBILE_XNORMS = [0.06, 0.32, 0.58] as const  // left → right, 3 nodes on narrow screens
const NUCLEUS_X = 0.82   // Right zone — beehoop logo convergence point, clearly in right spacer
const NUCLEUS_Y = 0.50

interface StreamNode {
  x: number
  y: number       // live: includes oscillation each frame
  baseY: number   // fixed nominal y
  coreR: number   // dot radius
  glowR: number   // outer atmospheric halo radius
  pulsePhase: number
  pulseAmp: number
  pulseSpeed: number
}

interface Packet {
  segT: number    // fractional segment index (0→totalSegs, wraps)
  speed: number   // segments per second
}

interface ComputedStream {
  si: number
  color: RGB
  nodes: StreamNode[]
  packets: Packet[]
  terminusX: number   // nucleus x
  terminusY: number   // nucleus y
}

export default function AboutCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // ── Theme ──────────────────────────────────────────────────────────────
    let isDark = document.documentElement.classList.contains('dark')
    const themeObs = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    let width = 0, height = 0
    let streams: ComputedStream[] = []
    let nucX = 0, nucY = 0
    let animId = 0, lastTime = 0
    const rng = mulberry32(0xBEE4F00D)

    // ── Beehoop logo — loaded once, rendered at the nucleus convergence point ──
    let logoImg: HTMLImageElement | null = null
    {
      const img = new window.Image()
      img.onload = () => { logoImg = img }
      img.src = '/logo.png'
    }

    // ── Build stream nodes and packets ─────────────────────────────────────
    function initStreams(w: number, h: number) {
      nucX = NUCLEUS_X * w
      nucY = NUCLEUS_Y * h
      const isMobile = w < 768

      streams = STREAM_DEFS.map((def, si) => {
        const xNorms = isMobile ? MOBILE_XNORMS : def.nodeXNorms
        const packetsPerStream = isMobile ? 2 : 3

        const nodes: StreamNode[] = xNorms.map((xn) => {
          const baseY = def.baseYNorm * h
          // Larger radius = visible from a distance; 5–8px core
          const coreR = 5.0 + rng() * 3.0
          return {
            x: xn * w,
            y: baseY,
            baseY,
            coreR,
            glowR: coreR * 9,      // wide atmospheric halo
            pulsePhase: rng() * Math.PI * 2,
            pulseAmp: 2.5 + rng() * 3.0,    // ±2.5–5.5px vertical drift
            pulseSpeed: 0.5 + rng() * 0.7,  // slow breathing
          }
        })

        // Stagger packet start positions evenly across the path
        const totalSegs = nodes.length  // nodes.length segments (last goes to nucleus)
        const packets: Packet[] = Array.from({ length: packetsPerStream }, (_, i) => ({
          segT: (i / packetsPerStream) * totalSegs,
          speed: 0.22 + rng() * 0.18,  // 0.22–0.40 segments/sec — deliberate pace
        }))

        return {
          si,
          color: def.color as RGB,
          nodes,
          packets,
          terminusX: nucX,
          terminusY: nucY,
        }
      })
    }

    // ── Resize ─────────────────────────────────────────────────────────────
    const resizeObs = new ResizeObserver(() => {
      const rect = canvas!.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas!.width  = Math.round(width  * dpr)
      canvas!.height = Math.round(height * dpr)
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStreams(width, height)
    })
    resizeObs.observe(canvas)

    // ── Scroll progress ────────────────────────────────────────────────────
    function updateProgress() {
      const section = canvas!.closest('section')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const raw = (vh - rect.top) / (vh + rect.height)
      progressRef.current = Math.max(0, Math.min(1, raw))
    }
    window.addEventListener('scroll', updateProgress, { passive: true })

    // ── Get position on piecewise path ─────────────────────────────────────
    // segT: 0.0 = node[0], 1.0 = node[1], ..., N.0 = terminus
    function getPathXY(stream: ComputedStream, segT: number): [number, number] {
      const N = stream.nodes.length
      const totalSegs = N  // N segments: node[0]→...→node[N-1]→terminus
      const clamped = Math.max(0, Math.min(totalSegs - 0.001, segT))
      const idx = Math.floor(clamped)
      const frac = clamped - idx

      const a = stream.nodes[idx]
      if (!a) return [stream.nodes[0].x, stream.nodes[0].y]

      const bx = idx < N - 1 ? stream.nodes[idx + 1].x : stream.terminusX
      const by = idx < N - 1 ? stream.nodes[idx + 1].y : stream.terminusY

      return [a.x + (bx - a.x) * frac, a.y + (by - a.y) * frac]
    }

    // ── Draw a glowing node — 3-layer radial gradient halos ───────────────
    // This is the key technique for WebGL-quality glow on 2D canvas
    function drawGlowNode(x: number, y: number, coreR: number, col: RGB, alpha: number) {
      if (alpha < 0.008) return

      // Layer 3 — outer atmospheric envelope (very wide, very soft)
      const outerR = coreR * 9
      const l3 = ctx!.createRadialGradient(x, y, 0, x, y, outerR)
      l3.addColorStop(0,   `rgba(${col[0]},${col[1]},${col[2]},${0.09 * alpha})`)
      l3.addColorStop(0.4, `rgba(${col[0]},${col[1]},${col[2]},${0.04 * alpha})`)
      l3.addColorStop(1,   `rgba(${col[0]},${col[1]},${col[2]},0)`)
      ctx!.fillStyle = l3
      ctx!.beginPath()
      ctx!.arc(x, y, outerR, 0, Math.PI * 2)
      ctx!.fill()

      // Layer 2 — inner focused glow (visible, defines the node identity)
      const midR = coreR * 3.2
      const l2 = ctx!.createRadialGradient(x, y, 0, x, y, midR)
      l2.addColorStop(0,   `rgba(${col[0]},${col[1]},${col[2]},${0.42 * alpha})`)
      l2.addColorStop(0.6, `rgba(${col[0]},${col[1]},${col[2]},${0.16 * alpha})`)
      l2.addColorStop(1,   `rgba(${col[0]},${col[1]},${col[2]},0)`)
      ctx!.fillStyle = l2
      ctx!.beginPath()
      ctx!.arc(x, y, midR, 0, Math.PI * 2)
      ctx!.fill()

      // Layer 1 — bright core dot with white hot center
      const l1 = ctx!.createRadialGradient(x, y, 0, x, y, coreR)
      l1.addColorStop(0,   `rgba(255,245,200,${0.95 * alpha})`)
      l1.addColorStop(0.4, `rgba(${col[0]},${col[1]},${col[2]},${0.90 * alpha})`)
      l1.addColorStop(1,   `rgba(${col[0]},${col[1]},${col[2]},0)`)
      ctx!.fillStyle = l1
      ctx!.beginPath()
      ctx!.arc(x, y, coreR, 0, Math.PI * 2)
      ctx!.fill()
    }

    // ── Draw glowing connection between two points: double-pass ───────────
    // Wide soft fringe (bloom effect) + sharp bright core line
    function drawGlowLine(
      x1: number, y1: number,
      x2: number, y2: number,
      col: RGB, alpha: number, lw = 1.2,
      curveCP?: [number, number],  // optional quadratic bezier control point
    ) {
      if (alpha < 0.005) return

      const path = () => {
        ctx!.beginPath()
        ctx!.moveTo(x1, y1)
        if (curveCP) ctx!.quadraticCurveTo(curveCP[0], curveCP[1], x2, y2)
        else ctx!.lineTo(x2, y2)
      }

      // Glow fringe — wide, soft
      path()
      ctx!.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha * 0.11})`
      ctx!.lineWidth = lw * 5
      ctx!.lineCap = 'round'
      ctx!.stroke()

      // Core line — crisp, bright
      path()
      ctx!.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`
      ctx!.lineWidth = lw
      ctx!.lineCap = 'round'
      ctx!.stroke()
    }

    // ── Main render loop ───────────────────────────────────────────────────
    function draw(timestamp: number) {
      animId = requestAnimationFrame(draw)
      if (!ctx || !width || !height) return

      const dt = prefersReduced ? 0 : Math.min((timestamp - lastTime) / 1000, 0.05)
      lastTime = timestamp
      if (!prefersReduced) updateProgress()
      const prog = prefersReduced ? 0.55 : progressRef.current
      const t = prefersReduced ? 0 : timestamp / 1000

      // Scroll-driven convergence cross-connections
      const convergeProg = Math.max(0, Math.min(1, (prog - 0.25) / 0.55))

      // Theme — reduce intensity slightly on light backgrounds
      const oMul = isDark ? 1.0 : 0.60
      const gMul = isDark ? 1.0 : 0.55

      ctx.clearRect(0, 0, width, height)

      // ── 1. PERMANENT ambient nebula — visible from frame 0, no scroll gate
      // Large radial glow at nucleus position gives the whole section atmospheric warmth
      {
        const nr = width * 0.80
        const neb = ctx.createRadialGradient(nucX, nucY, 0, nucX, nucY, nr)
        neb.addColorStop(0,   `rgba(200,146,10,${0.12 * oMul})`)
        neb.addColorStop(0.3, `rgba(200,146,10,${0.05 * oMul})`)
        neb.addColorStop(0.7, `rgba(200,146,10,${0.015 * oMul})`)
        neb.addColorStop(1,   `rgba(200,146,10,0)`)
        ctx.fillStyle = neb
        ctx.fillRect(0, 0, width, height)
      }

      // ── 2. Animate node vertical positions (gentle breathing), advance packets
      for (const stream of streams) {
        for (const node of stream.nodes) {
          node.y = node.baseY + Math.sin(t * node.pulseSpeed + node.pulsePhase) * node.pulseAmp
        }
        for (const pkt of stream.packets) {
          pkt.segT += pkt.speed * dt
          if (pkt.segT >= stream.nodes.length) pkt.segT -= stream.nodes.length
        }
      }

      // ── 3. Draw stream connections — lines BEFORE nodes so nodes render on top
      for (const stream of streams) {
        const col = stream.color
        const N = stream.nodes.length

        for (let i = 0; i < N; i++) {
          const a = stream.nodes[i]!
          // Last node → nucleus: quadratic bezier (90° bend)
          if (i === N - 1) {
            const cpx = stream.terminusX
            const cpy = a.y   // horizontal run, then vertical drop
            drawGlowLine(
              a.x, a.y, stream.terminusX, stream.terminusY,
              col, 0.30 * oMul, 1.3,
              [cpx, cpy],
            )
          } else {
            // Node → next node: straight
            const b = stream.nodes[i + 1]!
            drawGlowLine(a.x, a.y, b.x, b.y, col, 0.30 * oMul, 1.3)
          }
        }
      }

      // ── 4. Scroll-driven cross-connections between adjacent streams ────────
      // Vertical bridges form between amber↔sapphire and sapphire↔emerald
      // Visualises the integration of the three disciplines converging
      if (convergeProg > 0.005) {
        const pairs: [number, number][] = [[0, 1], [1, 2]]
        for (const [siA, siB] of pairs) {
          const sA = streams[siA], sB = streams[siB]
          if (!sA || !sB) continue
          const minNodes = Math.min(sA.nodes.length, sB.nodes.length)
          for (let ni = 1; ni < minNodes; ni++) {  // skip first node (origin)
            const nA = sA.nodes[ni], nB = sB.nodes[ni]
            if (!nA || !nB) continue
            const alpha = 0.18 * convergeProg * oMul
            const grad = ctx.createLinearGradient(nA.x, nA.y, nB.x, nB.y)
            grad.addColorStop(0, `rgba(${sA.color[0]},${sA.color[1]},${sA.color[2]},${alpha})`)
            grad.addColorStop(1, `rgba(${sB.color[0]},${sB.color[1]},${sB.color[2]},${alpha})`)
            // Soft wide pass
            ctx.beginPath(); ctx.moveTo(nA.x, nA.y); ctx.lineTo(nB.x, nB.y)
            ctx.strokeStyle = `rgba(255,220,100,${alpha * 0.08})`
            ctx.lineWidth = 4; ctx.stroke()
            // Core gradient line
            ctx.beginPath(); ctx.moveTo(nA.x, nA.y); ctx.lineTo(nB.x, nB.y)
            ctx.strokeStyle = grad; ctx.lineWidth = 0.8; ctx.stroke()
          }
        }
      }

      // ── 5. Draw stream nodes — back-to-front: emerald → sapphire → amber
      for (let si = 2; si >= 0; si--) {
        const stream = streams[si]
        if (!stream) continue
        for (const node of stream.nodes) {
          drawGlowNode(node.x, node.y, node.coreR, stream.color, oMul)
        }
      }

      // ── 6. Draw traveling packets with ghost trails ───────────────────────
      // Each packet leaves a trail of 5 fading echo dots — creates motion blur feel
      const TRAIL = 5
      for (let si = 2; si >= 0; si--) {
        const stream = streams[si]
        if (!stream) continue
        for (const pkt of stream.packets) {
          for (let tr = TRAIL; tr >= 0; tr--) {
            const trailSegT = pkt.segT - tr * 0.055
            if (trailSegT < 0) continue
            const [px, py] = getPathXY(stream, trailSegT)
            // Trail fades in size and alpha
            const trailFrac = tr === 0 ? 1.0 : (1 - tr / (TRAIL + 1))
            const dotR   = 2.2 * trailFrac + 0.6
            const dotAlpha = (tr === 0 ? 0.92 : trailFrac * 0.45) * oMul
            drawGlowNode(px, py, dotR, stream.color, dotAlpha)
          }
        }
      }

      // ── 7. Convergence nucleus — always visible, three-layer pyramid glow
      {
        const breathe = Math.sin(t * 1.1)
        const coreR = 9 + 2.5 * breathe

        // Layer 3 — wide atmospheric halo (establishes presence from frame 0)
        const l3 = ctx.createRadialGradient(nucX, nucY, 0, nucX, nucY, 150)
        l3.addColorStop(0,   `rgba(200,146,10,${0.14 * gMul})`)
        l3.addColorStop(0.3, `rgba(200,146,10,${0.06 * gMul})`)
        l3.addColorStop(0.7, `rgba(200,146,10,${0.02 * gMul})`)
        l3.addColorStop(1,   `rgba(200,146,10,0)`)
        ctx.fillStyle = l3
        ctx.beginPath(); ctx.arc(nucX, nucY, 150, 0, Math.PI * 2); ctx.fill()

        // Layer 2 — mid focal glow
        const l2 = ctx.createRadialGradient(nucX, nucY, 0, nucX, nucY, 60)
        l2.addColorStop(0,   `rgba(245,200,66,${0.55 * gMul})`)
        l2.addColorStop(0.5, `rgba(200,146,10,${0.28 * gMul})`)
        l2.addColorStop(1,   `rgba(200,146,10,0)`)
        ctx.fillStyle = l2
        ctx.beginPath(); ctx.arc(nucX, nucY, 60, 0, Math.PI * 2); ctx.fill()

        // Layer 1 — hot bright core
        const l1 = ctx.createRadialGradient(nucX, nucY, 0, nucX, nucY, coreR)
        l1.addColorStop(0,   `rgba(255,245,200,${gMul})`)
        l1.addColorStop(0.45, `rgba(255,200,50,${0.92 * gMul})`)
        l1.addColorStop(1,   `rgba(200,146,10,0)`)
        ctx.fillStyle = l1
        ctx.beginPath(); ctx.arc(nucX, nucY, coreR, 0, Math.PI * 2); ctx.fill()

        // ── Beehoop logo — brand as convergence point ──────────────────────
        // A frosted disc behind the logo ensures crisp readability on any theme
        const logoS = 52  // rendered diameter in CSS px
        const discR = logoS * 0.68
        const disc = ctx.createRadialGradient(nucX, nucY, 0, nucX, nucY, discR)
        disc.addColorStop(0,   isDark ? `rgba(255,255,255,${0.18 * gMul})` : `rgba(255,255,255,${0.72 * gMul})`)
        disc.addColorStop(0.65, isDark ? `rgba(255,255,255,${0.07 * gMul})` : `rgba(255,255,255,${0.28 * gMul})`)
        disc.addColorStop(1,   'rgba(255,255,255,0)')
        ctx.fillStyle = disc
        ctx.beginPath(); ctx.arc(nucX, nucY, discR, 0, Math.PI * 2); ctx.fill()
        if (logoImg) {
          ctx.save()
          ctx.globalAlpha = isDark ? 0.94 * gMul : 0.88 * gMul
          ctx.drawImage(logoImg, nucX - logoS / 2, nucY - logoS / 2, logoS, logoS)
          ctx.restore()
        }

        // Continuously expanding pulse rings (two, phase-offset)
        for (let ri = 0; ri < 2; ri++) {
          const ringProg = ((t * 0.50 + ri * 0.50) % 1)
          const ringR    = 18 + ringProg * 100
          const ringA    = (1 - ringProg) * 0.32 * gMul
          ctx.beginPath(); ctx.arc(nucX, nucY, ringR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(200,146,10,${ringA})`
          ctx.lineWidth = 1.5
          ctx.stroke()
        }

        // Three orbital micro-nodes (desktop only — adds life at wider viewports)
        if (width > 900) {
          const orbitDefs = [
            { r: 26, speed:  0.30, dotR: 2.4, a: 0.85 },
            { r: 48, speed: -0.20, dotR: 1.8, a: 0.60 },
            { r: 70, speed:  0.13, dotR: 1.3, a: 0.40 },
          ]
          for (const od of orbitDefs) {
            const angle = t * od.speed
            const ox = nucX + Math.cos(angle) * od.r
            const oy = nucY + Math.sin(angle) * od.r
            // Orbital track
            ctx.beginPath(); ctx.arc(nucX, nucY, od.r, 0, Math.PI * 2)
            ctx.strokeStyle = `rgba(200,146,10,${0.08 * gMul})`
            ctx.lineWidth = 0.5; ctx.stroke()
            // Orbital dot
            drawGlowNode(ox, oy, od.dotR, [200, 146, 10], od.a * gMul)
          }
        }
      }
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      resizeObs.disconnect()
      themeObs.disconnect()
      window.removeEventListener('scroll', updateProgress)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}



