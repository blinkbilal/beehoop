'use client'

import { getProcessPhase } from '@/lib/processPhaseStore'
import { useEffect, useRef } from 'react'

// ── Seeded PRNG — deterministic layout, no SSR/client mismatch ───────────────
function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function clamp(v: number, lo: number, hi: number) { return v < lo ? lo : v > hi ? hi : v }
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

// ── Phase blend — smooth active-phase-driven cross-fade ──────────────────────
// Alpha based on distance from the smoothly-interpolated active phase index.
// Adjacent phases cross-fade with overlap: when smoothPhase = 0.5,
// Phase 0 has alpha 0.25 and Phase 1 has alpha 0.25 (both visible).
function phaseAlphaSmooth(smoothPhase: number, phaseIndex: number): number {
  return clamp(1 - Math.abs(smoothPhase - phaseIndex) * 1.5, 0, 1)
}

// ── 3-layer radial glow node ─────────────────────────────────────────────────
function drawGlowNode(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  coreR: number,
  rgb: [number, number, number],
  alpha: number,
  oMul: number,
) {
  if (alpha < 0.01) return
  const [r, g, b] = rgb
  // Outer atmospheric halo
  const g1 = ctx.createRadialGradient(x, y, 0, x, y, coreR * 9)
  g1.addColorStop(0,   `rgba(${r},${g},${b},${(0.18 * alpha * oMul).toFixed(3)})`)
  g1.addColorStop(1,   `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = g1
  ctx.beginPath(); ctx.arc(x, y, coreR * 9, 0, Math.PI * 2); ctx.fill()
  // Mid glow
  const g2 = ctx.createRadialGradient(x, y, 0, x, y, coreR * 3.2)
  g2.addColorStop(0,   `rgba(${r},${g},${b},${(0.60 * alpha * oMul).toFixed(3)})`)
  g2.addColorStop(0.5, `rgba(${r},${g},${b},${(0.25 * alpha * oMul).toFixed(3)})`)
  g2.addColorStop(1,   `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = g2
  ctx.beginPath(); ctx.arc(x, y, coreR * 3.2, 0, Math.PI * 2); ctx.fill()
  // White-hot core
  const g3 = ctx.createRadialGradient(x, y, 0, x, y, coreR)
  g3.addColorStop(0,   `rgba(255,255,255,${(0.95 * alpha).toFixed(3)})`)
  g3.addColorStop(0.5, `rgba(${r},${g},${b},${(0.80 * alpha).toFixed(3)})`)
  g3.addColorStop(1,   `rgba(${r},${g},${b},0)`)
  ctx.fillStyle = g3
  ctx.beginPath(); ctx.arc(x, y, coreR, 0, Math.PI * 2); ctx.fill()
}

// ── Double-pass glow line ────────────────────────────────────────────────────
function drawGlowLine(
  ctx: CanvasRenderingContext2D,
  x1: number, y1: number,
  x2: number, y2: number,
  rgb: [number, number, number],
  alpha: number,
  oMul: number,
) {
  if (alpha < 0.005) return
  const [r, g, b] = rgb
  // Wide soft fringe
  ctx.beginPath()
  ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.08 * alpha * oMul).toFixed(3)})`
  ctx.lineWidth = 6
  ctx.stroke()
  // Crisp bright core
  ctx.beginPath()
  ctx.moveTo(x1, y1); ctx.lineTo(x2, y2)
  ctx.strokeStyle = `rgba(${r},${g},${b},${(0.45 * alpha * oMul).toFixed(3)})`
  ctx.lineWidth = 1.2
  ctx.stroke()
}

// ────────────────────────────────────────────────────────────────────────────
//  Phase-specific colour palettes
// ────────────────────────────────────────────────────────────────────────────
const AMBER:    [number,number,number] = [200, 146, 10]
const SAPPHIRE: [number,number,number] = [59,  130, 246]
const EMERALD:  [number,number,number] = [16,  185, 129]

// ── Per-phase atmospheric glow — large radial tint that fills the viewport ──
function drawPhaseAtmosphere(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  color: [number, number, number],
  alpha: number,
  isDark: boolean,
) {
  const oMul = isDark ? 1.0 : 0.45
  const cx = w * 0.50, cy = h * 0.50
  const r = Math.min(w, h) * 0.50
  if (alpha < 0.01) return
  const [cr, cg, cb] = color
  // Large atmospheric radial glow
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
  g.addColorStop(0,   `rgba(${cr},${cg},${cb},${(0.18 * alpha * oMul).toFixed(3)})`)
  g.addColorStop(0.4, `rgba(${cr},${cg},${cb},${(0.08 * alpha * oMul).toFixed(3)})`)
  g.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`)
  ctx.fillStyle = g
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.fill()
}

function drawPhaseTint(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  color: [number, number, number],
  alpha: number,
  isDark: boolean,
) {
  if (alpha < 0.01) return
  const [r, g, b] = color
  const tintAlpha = (isDark ? 0.20 : 0.09) * alpha
  ctx.fillStyle = `rgba(${r},${g},${b},${tintAlpha.toFixed(3)})`
  ctx.fillRect(0, 0, w, h)
}

// ────────────────────────────────────────────────────────────────────────────
//  PHASE 1 — THE LENS: Discovery
//  Radial focal point with pulsing sensor rings.
//  Scatter particles coalesce into structured clusters as phase progresses.
// ────────────────────────────────────────────────────────────────────────────
interface LensParticle {
  baseX: number; baseY: number  // target (ring) position
  scatterX: number; scatterY: number  // initial scattered position
  size: number; phase: number; speed: number
}

function buildLensParticles(w: number, h: number, rng: () => number): LensParticle[] {
  const cx = w * 0.50, cy = h * 0.50
  const rings = [0.12, 0.22, 0.32]  // radii as fraction of min(w,h)
  const count = 48
  const particles: LensParticle[] = []
  for (let i = 0; i < count; i++) {
    const ringR = rings[Math.floor(rng() * rings.length)] * Math.min(w, h)
    const angle  = rng() * Math.PI * 2
    particles.push({
      baseX:    cx + Math.cos(angle) * ringR,
      baseY:    cy + Math.sin(angle) * ringR,
      scatterX: rng() * w,
      scatterY: rng() * h,
      size:   2.5 + rng() * 2.5,
      phase:  rng() * Math.PI * 2,
      speed:  0.4 + rng() * 0.8,
    })
  }
  return particles
}

function drawPhase1(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  t: number, pa: number, particles: LensParticle[],
  isDark: boolean, isMobile: boolean,
) {
  const oMul = isDark ? 1.0 : 0.55
  const cx = w * 0.50, cy = h * 0.50
  const minD = Math.min(w, h)
  // coalesce: scatter→ring as phase alpha rises
  const gather = easeInOut(clamp(pa * 1.4, 0, 1))

  // ── Central focal glow ──────────────────────────────────────────────────
  drawGlowNode(ctx, cx, cy, isMobile ? 5 : 8, AMBER, pa, oMul)

  // ── Sensor rings (4 expanding circles) ────────────────────────────────
  const ringRadii = [0.10, 0.19, 0.29, 0.38]
  ringRadii.forEach((rf, ri) => {
    const rr = rf * minD
    // rings pulse slowly
    const pulse = 1 + 0.025 * Math.sin(t * 0.6 + ri * 1.1)
    const ringAlpha = pa * (0.3 - ri * 0.05) * oMul
    if (ringAlpha < 0.01) return
    ctx.beginPath()
    ctx.arc(cx, cy, rr * pulse, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${ringAlpha.toFixed(3)})`
    ctx.lineWidth = 1.2
    ctx.setLineDash([6, 10])
    ctx.stroke()
    ctx.setLineDash([])
  })

  // ── Rotating radar sweep line ──────────────────────────────────────────
  const sweepAngle = t * 0.7
  const sweepLen   = ringRadii[3] * minD * 1.05
  ctx.save()
  const sweepGrad = ctx.createLinearGradient(
    cx, cy,
    cx + Math.cos(sweepAngle) * sweepLen,
    cy + Math.sin(sweepAngle) * sweepLen,
  )
  sweepGrad.addColorStop(0,   `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${(0.6 * pa * oMul).toFixed(3)})`)
  sweepGrad.addColorStop(1,   `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},0)`)
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(sweepAngle) * sweepLen, cy + Math.sin(sweepAngle) * sweepLen)
  ctx.strokeStyle = sweepGrad
  ctx.lineWidth = 2.0
  ctx.stroke()
  // sweep fringe glow
  ctx.beginPath()
  ctx.moveTo(cx, cy)
  ctx.lineTo(cx + Math.cos(sweepAngle) * sweepLen, cy + Math.sin(sweepAngle) * sweepLen)
  ctx.strokeStyle = `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${(0.08 * pa * oMul).toFixed(3)})`
  ctx.lineWidth = 18
  ctx.stroke()
  ctx.restore()

  // ── Scatter particles coalescing into rings ────────────────────────────
  particles.forEach((p) => {
    const px   = lerp(p.scatterX, p.baseX, gather)
    const py   = lerp(p.scatterY, p.baseY, gather)
    const puls = 1 + 0.3 * Math.sin(t * p.speed + p.phase)
    drawGlowNode(ctx, px, py, p.size * puls, AMBER, pa * 0.7, oMul * 0.6)
  })
}

// ────────────────────────────────────────────────────────────────────────────
//  PHASE 2 — THE CONSTELLATION: Strategy
//  Diamond lattice crystallises from discovered data.
//  Connection lines draw in as phase progresses.
// ────────────────────────────────────────────────────────────────────────────
// 9-node diamond lattice layout (normalised positions)
const LATTICE_POS: [number, number][] = [
  [0.50, 0.15],  // 0 — top
  [0.30, 0.30],  // 1 — upper-left
  [0.70, 0.30],  // 2 — upper-right
  [0.15, 0.50],  // 3 — left
  [0.50, 0.50],  // 4 — CENTRE hub
  [0.85, 0.50],  // 5 — right
  [0.30, 0.70],  // 6 — lower-left
  [0.70, 0.70],  // 7 — lower-right
  [0.50, 0.85],  // 8 — bottom
]
const LATTICE_EDGES: [number, number][] = [
  [0,1],[0,2],[1,3],[2,5],[3,6],[5,7],[6,8],[7,8],
  [1,4],[2,4],[3,4],[4,5],[4,6],[4,7],  // hub connections
  [0,4],[4,8],  // vertical spine
]

function drawPhase2(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  t: number, pa: number,
  isDark: boolean,
) {
  const oMul = isDark ? 1.0 : 0.55
  const cx = w * 0.50, cy = h * 0.50
  const scale = Math.min(w, h) * 0.44   // scale the lattice to fit nicely

  const pts = LATTICE_POS.map(([nx, ny]) => ({
    x: cx + (nx - 0.50) * scale,
    y: cy + (ny - 0.50) * scale,
  }))

  // connection line draw-in progress: pa drives how far lines are drawn
  const lineIn = easeInOut(clamp(pa * 1.3, 0, 1))

  LATTICE_EDGES.forEach(([i, j], edgeIdx) => {
    const p1 = pts[i], p2 = pts[j]
    // stagger each edge slightly
    const edgeProgress = clamp((lineIn - edgeIdx * 0.03) * 1.4, 0, 1)
    if (edgeProgress < 0.01) return
    const ex = lerp(p1.x, p2.x, edgeProgress)
    const ey = lerp(p1.y, p2.y, edgeProgress)
    drawGlowLine(ctx, p1.x, p1.y, ex, ey, SAPPHIRE, pa, oMul)
  })

  // nodes: hub (idx 4) is larger with amber accent
  pts.forEach((p, i) => {
    const isHub = i === 4
    const nodeAlpha = pa * (isHub ? 1.0 : 0.85)
    const puls      = 1 + (isHub ? 0.15 : 0.06) * Math.sin(t * (isHub ? 1.2 : 0.6) + i * 0.7)
    const coreR     = (isHub ? 12 : 6) * puls
    const colour    = isHub ? AMBER : SAPPHIRE
    drawGlowNode(ctx, p.x, p.y, coreR, colour, nodeAlpha, oMul)
  })

  // navigational heading lines from diamond tips
  const tips = [pts[0], pts[3], pts[5], pts[8]]
  const dirs = [[0,-1],[-1,0],[1,0],[0,1]]
  tips.forEach((tp, ti) => {
    const dx = dirs[ti][0] * w * 0.18
    const dy = dirs[ti][1] * h * 0.18
    const lineA = pa * 0.35 * oMul
    ctx.beginPath()
    ctx.moveTo(tp.x, tp.y)
    ctx.lineTo(tp.x + dx, tp.y + dy)
    ctx.strokeStyle = `rgba(${SAPPHIRE[0]},${SAPPHIRE[1]},${SAPPHIRE[2]},${lineA.toFixed(3)})`
    ctx.lineWidth = 1.0
    ctx.setLineDash([4, 8])
    ctx.stroke()
    ctx.setLineDash([])
  })
}

// ────────────────────────────────────────────────────────────────────────────
//  PHASE 3 — THE CRUCIBLE: Validation
//  Pressure waves stress-test the lattice.
//  Nodes pulse between validated/failing states. Trend line rises.
// ────────────────────────────────────────────────────────────────────────────
interface CrucibleWave {
  birthTime: number
  color: [number,number,number]
}

interface CrucibleState {
  waves: CrucibleWave[]
  lastWave: number
}

function initCrucibleState(): CrucibleState {
  return { waves: [], lastWave: 0 }
}

// trend line points (normalised)
const TREND_PTS: [number, number][] = [
  [0.12, 0.75], [0.28, 0.62], [0.46, 0.48], [0.66, 0.36], [0.85, 0.22]
]

function drawPhase3(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  t: number, pa: number, cs: CrucibleState,
  isDark: boolean,
) {
  const oMul = isDark ? 1.0 : 0.55
  const cx = w * 0.50, cy = h * 0.50
  const scale = Math.min(w, h) * 0.44

  // spawn pressure waves ~1 per second when phase is active
  if (pa > 0.15 && t - cs.lastWave > 1.1) {
    cs.waves.push({ birthTime: t, color: Math.random() > 0.5 ? SAPPHIRE : EMERALD })
    cs.lastWave = t
  }
  // cull old waves
  cs.waves = cs.waves.filter(wv => t - wv.birthTime < 3.0)

  // draw pressure waves
  cs.waves.forEach(wv => {
    const age  = t - wv.birthTime
    const maxR = Math.min(w, h) * 0.36
    const fr   = age / 3.0
    const r    = fr * maxR
    const wa   = pa * (1 - fr) * 0.45 * oMul
    if (wa < 0.01) return
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${wv.color[0]},${wv.color[1]},${wv.color[2]},${wa.toFixed(3)})`
    ctx.lineWidth = 1 + (1 - fr) * 2
    ctx.stroke()
  })

  // lattice nodes — some fail then restore
  const pts = LATTICE_POS.map(([nx, ny]) => ({
    x: cx + (nx - 0.50) * scale,
    y: cy + (ny - 0.50) * scale,
  }))
  pts.forEach((p, i) => {
    const isHub     = i === 4
    const failCycle = Math.sin(t * 0.9 + i * 2.3)
    const failing   = !isHub && failCycle > 0.65
    const colour    = failing ? [120, 60, 60] as [number,number,number] : (isHub ? EMERALD : SAPPHIRE)
    const a         = failing ? pa * 0.35 : pa * (isHub ? 1 : 0.75)
    const puls      = 1 + 0.08 * Math.sin(t * 1.1 + i)
    drawGlowNode(ctx, p.x, p.y, (isHub ? 12 : 6) * puls, colour, a, oMul)
  })

  // rising trend line
  const trendProgress = easeInOut(clamp(pa * 1.5, 0, 1))
  const trendCount    = Math.floor(trendProgress * (TREND_PTS.length - 1) * 100) / 100
  for (let i = 0; i < TREND_PTS.length - 1; i++) {
    const segFrac = clamp(trendCount - i, 0, 1)
    if (segFrac < 0.01) break
    const p1 = { x: TREND_PTS[i][0] * w,   y: TREND_PTS[i][1] * h }
    const p2 = { x: TREND_PTS[i+1][0] * w, y: TREND_PTS[i+1][1] * h }
    const ex = lerp(p1.x, p2.x, segFrac)
    const ey = lerp(p1.y, p2.y, segFrac)
    drawGlowLine(ctx, p1.x, p1.y, ex, ey, EMERALD, pa * 0.9, oMul)
    drawGlowNode(ctx, p1.x, p1.y, 5, EMERALD, pa * 0.8, oMul)
  }

  // checkmark resolves at high pa
  const checkAlpha = smoothstep(0.72, 0.85, pa)
  if (checkAlpha > 0.01) {
    const cmX = w * 0.78, cmY = h * 0.28, cmS = Math.min(w, h) * 0.08
    drawGlowLine(ctx, cmX - cmS, cmY, cmX - cmS * 0.35, cmY + cmS * 0.65, EMERALD, checkAlpha, oMul)
    drawGlowLine(ctx, cmX - cmS * 0.35, cmY + cmS * 0.65, cmX + cmS, cmY - cmS * 0.6, EMERALD, checkAlpha, oMul)
  }
}

// ────────────────────────────────────────────────────────────────────────────
//  PHASE 4 — THE FORGE: Engineering & Build
//  Blueprint grid materialises. Modular components slide into alignment.
//  Central gear meshes — precision assembly.
// ────────────────────────────────────────────────────────────────────────────
interface ForgeModule {
  targetX: number; targetY: number; w: number; h: number
  startX: number;  startY: number
  delay: number    // normalised 0–1 within phase
}

function buildForgeModules(w: number, h: number): ForgeModule[] {
  const cx = w * 0.50, cy = h * 0.50
  const cell = Math.min(w, h) * 0.12
  const defs: [number,number,number,number,number][] = [   // [nx, ny, tw, th, delay]
    [-1.2, -1.2, 2.0, 0.8, 0.0],
    [ 0.4, -1.2, 1.8, 0.8, 0.08],
    [-1.2,  0.0, 0.8, 1.8, 0.15],
    [ 1.2,  0.0, 0.8, 1.8, 0.22],
    [-0.6,  1.2, 1.4, 0.8, 0.30],
    [ 0.8,  1.2, 1.4, 0.8, 0.36],
  ]
  return defs.map(([nx, ny, tw, th, delay]) => ({
    targetX: cx + nx * cell,
    targetY: cy + ny * cell,
    w: tw * cell, h: th * cell,
    startX: cx + nx * cell + (nx < 0 ? -w * 0.35 : w * 0.35),
    startY: cy + ny * cell + (ny < 0 ? -h * 0.30 : h * 0.30),
    delay,
  }))
}

function drawPhase4(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  t: number, pa: number, modules: ForgeModule[],
  isDark: boolean,
) {
  const oMul = isDark ? 1.0 : 0.55
  const cx = w * 0.50, cy = h * 0.50
  const assembleIn = easeInOut(clamp(pa * 1.3, 0, 1))

  // ── Blueprint grid ────────────────────────────────────────────────────
  const gridA = pa * 0.28 * oMul
  if (gridA > 0.01) {
    const cell = Math.min(w, h) * 0.08
    const cols = Math.ceil(w / cell) + 1
    const rows = Math.ceil(h / cell) + 1
    ctx.strokeStyle = `rgba(${SAPPHIRE[0]},${SAPPHIRE[1]},${SAPPHIRE[2]},${gridA.toFixed(3)})`
    ctx.lineWidth = 0.5
    ctx.setLineDash([3, 6])
    for (let c = 0; c < cols; c++) {
      ctx.beginPath(); ctx.moveTo(c * cell, 0); ctx.lineTo(c * cell, h); ctx.stroke()
    }
    for (let r = 0; r < rows; r++) {
      ctx.beginPath(); ctx.moveTo(0, r * cell); ctx.lineTo(w, r * cell); ctx.stroke()
    }
    ctx.setLineDash([])
  }

  // ── Sliding modular components ─────────────────────────────────────────
  modules.forEach((m) => {
    const localT = clamp((assembleIn - m.delay) / (1 - m.delay + 0.001), 0, 1)
    const easedT = easeInOut(localT)
    const mx = lerp(m.startX, m.targetX, easedT)
    const my = lerp(m.startY, m.targetY, easedT)
    const alpha = pa * easedT * oMul

    // module box glow
    ctx.strokeStyle = `rgba(${SAPPHIRE[0]},${SAPPHIRE[1]},${SAPPHIRE[2]},${(alpha * 0.8).toFixed(3)})`
    ctx.fillStyle   = `rgba(${SAPPHIRE[0]},${SAPPHIRE[1]},${SAPPHIRE[2]},${(alpha * 0.08).toFixed(3)})`
    ctx.lineWidth   = 1.5
    ctx.beginPath()
    // roundRect fallback for older browsers
    const rx = mx - m.w / 2, ry = my - m.h / 2
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(rx, ry, m.w, m.h, 4)
    } else {
      ctx.rect(rx, ry, m.w, m.h)
    }
    ctx.fill(); ctx.stroke()

    // assembly spark — tiny bright flash at corners when module snaps in
    if (easedT > 0.88) {
      const sparkA = pa * (easedT - 0.88) / 0.12 * 0.7
      const corners = [
        [mx - m.w/2, my - m.h/2], [mx + m.w/2, my - m.h/2],
        [mx - m.w/2, my + m.h/2], [mx + m.w/2, my + m.h/2],
      ]
      corners.forEach(([sx, sy]) => {
        drawGlowNode(ctx, sx, sy, 4, AMBER, sparkA, oMul)
      })
    }
  })

  // ── Central precision gear ─────────────────────────────────────────────
  const gearAlpha = pa * oMul
  if (gearAlpha > 0.03) {
    const gRot1 =  t * 0.25
    const gRot2 = -t * 0.18
    const gR1   = Math.min(w, h) * 0.10
    const gR2   = Math.min(w, h) * 0.06
    const teeth  = 8

    const gearDefs: [number, number, number, number, [number,number,number]][] = [
      [cx, cy, gR1, gRot1, SAPPHIRE],
      [cx + gR1 * 1.85, cy, gR2, gRot2, AMBER],
    ]
    gearDefs.forEach(([gx, gy, gr, grot, gcol], gi) => {
      const gnum = gi === 0 ? teeth : 6
      ctx.save()
      ctx.translate(gx as number, gy as number)
      ctx.rotate(grot as number)
      // gear body
      ctx.beginPath()
      ctx.arc(0, 0, gr as number, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(${gcol[0]},${gcol[1]},${gcol[2]},${(gearAlpha * 0.55).toFixed(3)})`
      ctx.lineWidth = 1.5
      ctx.stroke()
      // gear teeth
      for (let ti = 0; ti < gnum; ti++) {
        const ang = (ti / gnum) * Math.PI * 2
        const r1 = gr as number
        const r2 = (gr as number) * 1.25
        ctx.beginPath()
        ctx.moveTo(Math.cos(ang - 0.18) * r1, Math.sin(ang - 0.18) * r1)
        ctx.lineTo(Math.cos(ang - 0.18) * r2, Math.sin(ang - 0.18) * r2)
        ctx.lineTo(Math.cos(ang + 0.18) * r2, Math.sin(ang + 0.18) * r2)
        ctx.lineTo(Math.cos(ang + 0.18) * r1, Math.sin(ang + 0.18) * r1)
        ctx.closePath()
        ctx.fillStyle = `rgba(${gcol[0]},${gcol[1]},${gcol[2]},${(gearAlpha * 0.20).toFixed(3)})`
        ctx.fill()
        ctx.strokeStyle = `rgba(${gcol[0]},${gcol[1]},${gcol[2]},${(gearAlpha * 0.45).toFixed(3)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }
      ctx.restore()
    })

    // centre hub
    drawGlowNode(ctx, cx, cy, 8, SAPPHIRE, pa, oMul)
  }
}

// ────────────────────────────────────────────────────────────────────────────
//  PHASE 5 — THE ORBIT: Launch & Partnership
//  Three orbital arcs (amber/sapphire/emerald) reconnect capability worlds.
//  Expanding pulse rings radiate. Micro-logo at orbit centre.
// ────────────────────────────────────────────────────────────────────────────
interface OrbitParticle {
  orbitR: number; angle: number; speed: number; color: [number,number,number]
  size: number; trail: number[]  // past angles
}

function buildOrbitParticles(w: number, h: number): OrbitParticle[] {
  const minD = Math.min(w, h)
  return [
    // amber orbit
    { orbitR: minD * 0.14, angle: 0.0,           speed: 0.40, color: AMBER,    size: 3.5, trail: [] },
    { orbitR: minD * 0.14, angle: Math.PI,        speed: 0.40, color: AMBER,    size: 2.5, trail: [] },
    // sapphire orbit
    { orbitR: minD * 0.24, angle: Math.PI * 0.5,  speed: -0.30, color: SAPPHIRE, size: 3.5, trail: [] },
    { orbitR: minD * 0.24, angle: Math.PI * 1.5,  speed: -0.30, color: SAPPHIRE, size: 2.5, trail: [] },
    // emerald orbit
    { orbitR: minD * 0.35, angle: Math.PI * 0.33, speed: 0.22, color: EMERALD,  size: 3.5, trail: [] },
    { orbitR: minD * 0.35, angle: Math.PI * 1.33, speed: 0.22, color: EMERALD,  size: 2.5, trail: [] },
    { orbitR: minD * 0.35, angle: Math.PI * 0.85, speed: 0.22, color: EMERALD,  size: 2.0, trail: [] },
  ]
}

let orbitParticleCache: OrbitParticle[] | null = null

function drawPhase5(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  t: number, pa: number,
  isDark: boolean, dt: number,
  logoImg: HTMLImageElement | null,
) {
  const oMul  = isDark ? 1.0 : 0.55
  const cx    = w * 0.50
  const cy    = h * 0.50

  // rebuild cache on first call or resize
  if (!orbitParticleCache || orbitParticleCache[0].orbitR !== Math.min(w, h) * 0.14) {
    orbitParticleCache = buildOrbitParticles(w, h)
  }
  const particles = orbitParticleCache

  // ── Orbital arc backgrounds (full ellipses, faint) ─────────────────────
  const orbitRadii = [Math.min(w,h)*0.14, Math.min(w,h)*0.24, Math.min(w,h)*0.35]
  const orbitCols  = [AMBER, SAPPHIRE, EMERALD]
  orbitRadii.forEach((r, ri) => {
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${orbitCols[ri][0]},${orbitCols[ri][1]},${orbitCols[ri][2]},${(pa * 0.30 * oMul).toFixed(3)})`
    ctx.lineWidth = 1.2
    ctx.stroke()
  })

  // ── Pulse rings from centre ────────────────────────────────────────────
  for (let pi = 0; pi < 3; pi++) {
    const cycleT = ((t * 0.45) + pi * 0.33) % 1.0
    const pr = cycleT * Math.min(w, h) * 0.42
    const pA = pa * (1 - cycleT) * 0.50 * oMul
    if (pA < 0.01) continue
    ctx.beginPath()
    ctx.arc(cx, cy, pr, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(${AMBER[0]},${AMBER[1]},${AMBER[2]},${pA.toFixed(3)})`
    ctx.lineWidth = 1.0 + (1 - cycleT) * 1.5
    ctx.stroke()
  }

  // ── Advancing orbit particles ──────────────────────────────────────────
  particles.forEach(p => {
    p.angle += p.speed * dt
    const TRAIL_LEN = 5
    p.trail.push(p.angle)
    if (p.trail.length > TRAIL_LEN) p.trail.shift()

    // draw ghost trail
    p.trail.forEach((ta, idx) => {
      const trailFrac = idx / TRAIL_LEN
      const tx = cx + Math.cos(ta) * p.orbitR
      const ty = cy + Math.sin(ta) * p.orbitR
      drawGlowNode(ctx, tx, ty, p.size * 0.45 * trailFrac, p.color, pa * trailFrac * 0.4, oMul * 0.5)
    })

    // live particle
    const px = cx + Math.cos(p.angle) * p.orbitR
    const py = cy + Math.sin(p.angle) * p.orbitR
    drawGlowNode(ctx, px, py, p.size * 1.4, p.color, pa, oMul)
  })

  // ── Central nucleus glow ───────────────────────────────────────────────
  const nucPulse = 1 + 0.12 * Math.sin(t * 1.4)
  drawGlowNode(ctx, cx, cy, 14 * nucPulse, AMBER, pa, oMul)

  // frosted disc behind logo
  if (pa > 0.05) {
    const discR = 22
    const discGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, discR)
    discGrad.addColorStop(0,   isDark ? `rgba(8,8,8,${(pa * 0.85).toFixed(2)})` : `rgba(248,248,244,${(pa * 0.85).toFixed(2)})`)
    discGrad.addColorStop(0.7, isDark ? `rgba(8,8,8,${(pa * 0.50).toFixed(2)})` : `rgba(248,248,244,${(pa * 0.50).toFixed(2)})`)
    discGrad.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = discGrad
    ctx.beginPath(); ctx.arc(cx, cy, discR, 0, Math.PI * 2); ctx.fill()
  }

  // beehoop micro-logo at orbit centre
  if (logoImg && logoImg.complete && logoImg.naturalWidth > 0 && pa > 0.05) {
    const logoSize = 28
    ctx.save()
    ctx.globalAlpha = pa * 0.95
    ctx.drawImage(logoImg, cx - logoSize / 2, cy - logoSize / 2, logoSize, logoSize)
    ctx.restore()
  }

  // ── Radiating connection beams from orbit out to canvas edges ─────────
  const beamDirs = [
    [0, -1], [0.7, -0.7], [1, 0], [0.7, 0.7],
    [0, 1], [-0.7, 0.7], [-1, 0], [-0.7, -0.7],
  ]
  const beamAlpha = pa * 0.15 * oMul
  if (beamAlpha > 0.005) {
    beamDirs.forEach(([bx, by], bi) => {
      const col = orbitCols[bi % 3]
      const bLen = Math.max(w, h) * 0.55
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(cx + bx * bLen, cy + by * bLen)
      ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${beamAlpha.toFixed(3)})`
      ctx.lineWidth = 0.8
      ctx.stroke()
    })
  }
}

// ────────────────────────────────────────────────────────────────────────────
//  AMBIENT NEBULA — permanent underlying cosmos
// ────────────────────────────────────────────────────────────────────────────
interface NebulaDrift {
  x: number; y: number; r: number
  vx: number; vy: number
  color: [number,number,number]
  alpha: number
}

function buildNebula(w: number, h: number, rng: () => number): NebulaDrift[] {
  const count = 8
  const pool: NebulaDrift[] = []
  const colours = [AMBER, SAPPHIRE, EMERALD]
  for (let i = 0; i < count; i++) {
    pool.push({
      x: rng() * w, y: rng() * h,
      r: w * (0.12 + rng() * 0.22),
      vx: (rng() - 0.5) * 0.4, vy: (rng() - 0.5) * 0.3,
      color: colours[Math.floor(rng() * 3)],
      alpha: 0.025 + rng() * 0.035,
    })
  }
  return pool
}

function drawAmbient(
  ctx: CanvasRenderingContext2D, w: number, h: number,
  nebula: NebulaDrift[], dt: number, isDark: boolean,
) {
  const oMul = isDark ? 1.0 : 0.40
  nebula.forEach(n => {
    n.x += n.vx * dt * 30; n.y += n.vy * dt * 30
    if (n.x < -n.r) n.x = w + n.r
    if (n.x > w + n.r) n.x = -n.r
    if (n.y < -n.r) n.y = h + n.r
    if (n.y > h + n.r) n.y = -n.r

    const ng = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r)
    ng.addColorStop(0,   `rgba(${n.color[0]},${n.color[1]},${n.color[2]},${(n.alpha * oMul).toFixed(3)})`)
    ng.addColorStop(1,   `rgba(${n.color[0]},${n.color[1]},${n.color[2]},0)`)
    ctx.fillStyle = ng
    ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill()
  })
}

// ────────────────────────────────────────────────────────────────────────────
//  EXPORTED COMPONENT
// ────────────────────────────────────────────────────────────────────────────
interface ProcessCanvasProps {
  className?: string
}

export default function ProcessCanvas({ className = '' }: ProcessCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = () => window.innerWidth < 1024

    // ── Theme ──────────────────────────────────────────────────────────────
    let isDark = document.documentElement.classList.contains('dark')
    const themeObs = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
    })
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // ── Logo ───────────────────────────────────────────────────────────────
    let logoImg: HTMLImageElement | null = null
    const img = new window.Image()
    img.src = '/logo.png'
    img.onload = () => { logoImg = img }

    // ── Mutable scene state ───────────────────────────────────────────────
    let width = 0, height = 0, animId = 0, lastTime = 0
    let smoothPhase = 0  // smoothly interpolates toward active phase
    let lensParticles: LensParticle[]   = []
    let forgeModules:  ForgeModule[]    = []
    let nebula:        NebulaDrift[]    = []
    let crucibleState: CrucibleState    = initCrucibleState()
    const rng = mulberry32(0xBEEB0CEA)

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width  = rect.width
      height = rect.height
      canvas.width  = width  * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)

      // Rebuild scene data that depends on canvas dimensions
      const r = mulberry32(0xBEEB0CEA)
      lensParticles = buildLensParticles(width, height, r)
      forgeModules  = buildForgeModules(width, height)
      nebula        = buildNebula(width, height, r)
      orbitParticleCache = null  // force rebuild
    }

    const resizeObs = new ResizeObserver(() => { resize() })
    resizeObs.observe(canvas)
    resize()

    // ── Phase is driven by DOM data attribute ─────────────────────────────
    // Process.tsx sets data-active-phase={activeStep} on the section.
    // We read it directly from the DOM every frame — zero closure issues.

    // ── Render loop ───────────────────────────────────────────────────────
    const render = (now: number) => {
      animId = requestAnimationFrame(render)
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      const t = now / 1000
      const mob = isMobile()
      const phaseOffsetX = mob ? 0 : width * 0.14

      // Read target phase directly from module store — synchronous, no React batching delay
      const targetPhase = getProcessPhase()

      // Smooth exponential interpolation toward target phase
      smoothPhase += (targetPhase - smoothPhase) * Math.min(1, 4.0 * dt)
      if (Math.abs(targetPhase - smoothPhase) < 0.002) smoothPhase = targetPhase

      ctx.clearRect(0, 0, width, height)

      // ambient nebula — permanent backdrop
      drawAmbient(ctx, width, height, nebula, dt, isDark)

      if (prefersReduced) {
        drawPhase1(ctx, width, height, 0.5, 0.4, lensParticles, isDark, mob)
        drawPhase2(ctx, width, height, 0.5, 0.4, isDark)
        return
      }

      // per-phase alpha from smooth phase distance
      const p1a = phaseAlphaSmooth(smoothPhase, 0)
      const p2a = phaseAlphaSmooth(smoothPhase, 1)
      const p3a = phaseAlphaSmooth(smoothPhase, 2)
      const p4a = phaseAlphaSmooth(smoothPhase, 3)
      const p5a = phaseAlphaSmooth(smoothPhase, 4)

      // Strong base tint makes the active phase visible even before fine detail resolves.
      const PHASE_COLORS: [number,number,number][] = [AMBER, SAPPHIRE, SAPPHIRE, EMERALD, EMERALD]
      const phaseAlphas = [p1a, p2a, p3a, p4a, p5a]
      phaseAlphas.forEach((a, i) => {
        if (a > 0.01) drawPhaseTint(ctx, width, height, PHASE_COLORS[i], a, isDark)
      })

      ctx.save()
      ctx.translate(phaseOffsetX, 0)
      phaseAlphas.forEach((a, i) => {
        if (a > 0.01) drawPhaseAtmosphere(ctx, width, height, PHASE_COLORS[i], a, isDark)
      })

      if (p1a > 0.005) drawPhase1(ctx, width, height, t, p1a, lensParticles, isDark, mob)
      if (p2a > 0.005) drawPhase2(ctx, width, height, t, p2a, isDark)
      if (p3a > 0.005) drawPhase3(ctx, width, height, t, p3a, crucibleState, isDark)
      if (p4a > 0.005) drawPhase4(ctx, width, height, t, p4a, forgeModules, isDark)
      if (p5a > 0.005) drawPhase5(ctx, width, height, t, p5a, isDark, dt, logoImg)
      ctx.restore()
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      themeObs.disconnect()
      resizeObs.disconnect()
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
