'use client'

import { useEffect, useRef } from 'react';

interface DataEngineCanvasProps {
  className?: string
}

// Seeded PRNG for deterministic layout
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export function DataEngineCanvas({ className = '' }: DataEngineCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0) // 0 = chaos, 1 = grid

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Reduced motion: skip animation entirely
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let animationId: number
    let width = 0
    let height = 0

    const PARTICLE_COUNT = 120
    const CONNECTION_DIST = 130
    const rng = mulberry32(77)

    interface Particle {
      // Chaotic position (random drift)
      cx: number; cy: number
      vx: number; vy: number
      // Grid target position (structured)
      gx: number; gy: number
      // Current rendered position
      x: number; y: number
      radius: number
      phase: number // for subtle pulse
    }

    let particles: Particle[] = []

    function buildGrid(w: number, h: number) {
      // Arrange particles in a nice grid centered in the canvas
      const cols = Math.ceil(Math.sqrt(PARTICLE_COUNT * (w / h)))
      const rows = Math.ceil(PARTICLE_COUNT / cols)
      const cellW = w / (cols + 2)
      const cellH = h / (rows + 2)
      const offsetX = (w - cols * cellW) / 2 + cellW / 2
      const offsetY = (h - rows * cellH) / 2 + cellH / 2

      for (let i = 0; i < particles.length; i++) {
        const col = i % cols
        const row = Math.floor(i / cols)
        particles[i].gx = offsetX + col * cellW
        particles[i].gy = offsetY + row * cellH
      }
    }

    function init() {
      width = canvas!.offsetWidth
      height = canvas!.offsetHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)

      if (particles.length === 0) {
        particles = Array.from({ length: PARTICLE_COUNT }, () => ({
          cx: rng() * width,
          cy: rng() * height,
          vx: (rng() - 0.5) * 0.4,
          vy: (rng() - 0.5) * 0.4,
          gx: 0, gy: 0,
          x: 0, y: 0,
          radius: 1.2 + rng() * 1.2,
          phase: rng() * Math.PI * 2,
        }))
      }
      // Re-place chaotic positions if resized
      for (const p of particles) {
        p.cx = rng() * width
        p.cy = rng() * height
      }
      buildGrid(width, height)
    }

    // Scroll-driven morphing: measure how far the section is through the viewport
    function updateScrollProgress() {
      if (!canvas) return
      const section = canvas.closest('section')
      if (!section) return
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      // 0 when section top enters viewport, 1 when section is centered
      const raw = 1 - rect.top / vh
      progressRef.current = Math.max(0, Math.min(1, raw * 0.8))
    }

    function draw(time: number) {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      const t = progressRef.current

      // Update chaotic positions (drifting)
      for (const p of particles) {
        p.cx += p.vx
        p.cy += p.vy
        if (p.cx < 0 || p.cx > width) p.vx *= -1
        if (p.cy < 0 || p.cy > height) p.vy *= -1
        // Lerp between chaos and grid based on scroll
        p.x = p.cx + (p.gx - p.cx) * t
        p.y = p.cy + (p.gy - p.cy) * t
      }

      // Draw connections — more visible as structure forms
      const baseAlpha = 0.08 + t * 0.14
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * baseAlpha
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(200, 146, 10, ${alpha})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }

      // Draw particles with subtle pulse
      const now = time * 0.001
      for (const p of particles) {
        const pulse = 0.6 + 0.4 * Math.sin(now * 1.5 + p.phase)
        const opacity = (0.25 + t * 0.45) * pulse
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 146, 10, ${opacity})`
        ctx.fill()

        // Glow halo when structured
        if (t > 0.3) {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(200, 146, 10, ${(t - 0.3) * 0.04 * pulse})`
          ctx.fill()
        }
      }
    }

    function loop(time: number) {
      updateScrollProgress()
      draw(time)
      animationId = requestAnimationFrame(loop)
    }

    const resizeObs = new ResizeObserver(() => init())
    resizeObs.observe(canvas)
    init()

    if (prefersReduced) {
      // Show static grid state
      progressRef.current = 1
      for (const p of particles) { p.x = p.gx; p.y = p.gy }
      draw(0)
    } else {
      loop(0)
    }

    return () => {
      cancelAnimationFrame(animationId)
      resizeObs.disconnect()
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
