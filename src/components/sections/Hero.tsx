"use client"

import { KineticText } from "@/components/ui/KineticText"
import { Magnetic } from "@/components/ui/Magnetic"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const HeroCanvas = dynamic(
  () => import("@/components/ui/HeroCanvas").then(mod => mod.HeroCanvas),
  { ssr: false },
)
const OrganicHighlight = dynamic(
  () => import("@/components/ui/OrganicHighlight").then(mod => mod.OrganicHighlight),
)

const heroVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.18,
      duration: 0.7,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export default function Hero() {
  const sectionRef = useRef(null)
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const activeTheme = resolvedTheme ?? theme
  const isDark = !mounted || activeTheme === "dark"

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const textY = useTransform(scrollYProgress, [0, 1], [0, -25])
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0])
  // WebGL canvas fade-out + sink as user scrolls — organic dissolve into void
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.75, 0])
  const canvasSink = useTransform(scrollYProgress, [0, 1], [0, 60])
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  const glassPanelStyle = {
    background: isDark
      ? "linear-gradient(140deg, rgba(7,7,7,0.72) 0%, rgba(19,19,19,0.58) 58%, rgba(35,35,35,0.42) 100%)"
      : "linear-gradient(140deg, rgba(255,255,255,0.74) 0%, rgba(252,250,243,0.68) 58%, rgba(237,231,212,0.58) 100%)",
    border: `1px solid ${isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.12)"}`,
    boxShadow: isDark
      ? "0 34px 90px rgba(0,0,0,0.68), inset 0 1px 0 rgba(255,255,255,0.12)"
      : "0 28px 72px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.92)",
    backdropFilter: "blur(26px) saturate(155%)",
    WebkitBackdropFilter: "blur(26px) saturate(155%)",
  } as const

  return (
    <section
      ref={sectionRef}
      className="hero-fade-container relative w-screen h-screen overflow-hidden"
      style={{
        background: isDark
          ? "radial-gradient(125% 100% at 50% 42%, #161616 0%, #070707 45%, #000000 100%)"
          : "radial-gradient(125% 100% at 50% 35%, #FFFFFF 0%, #EFEDE3 48%, #DBD6C4 100%)",
        borderBottom: "none",
        boxShadow: "none",
      }}
    >
      {/* Full-viewport 3D canvas — sinks + fades on scroll for organic dissolve */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          opacity: isDark ? canvasOpacity : 1,
          y: isDark ? canvasSink : 0,
          zIndex: 0,
        }}
      >
        <HeroCanvas />
      </motion.div>

      {/* ── Floating text — NO background, NO card, NO container ── */}
      <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
        <motion.div
          style={{ y: textY }}
          className="pointer-events-auto px-6 md:px-16 lg:pl-20 lg:pr-0 max-w-[700px] -mt-[6vh]"
        >
          <div
            className="relative rounded-[28px] overflow-hidden p-6 md:p-8 lg:p-10"
            style={glassPanelStyle}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isDark
                  ? "radial-gradient(140% 100% at 0% 0%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 65%)"
                  : "radial-gradient(140% 100% at 0% 0%, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0) 70%)",
              }}
            />
            <motion.p
              custom={0}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="relative text-[10px] md:text-xs font-sans font-semibold uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#FFC107] mb-4"
            >
              Strategy · Engineering · Intelligence
            </motion.p>

            <KineticText
              as="h1"
              className={`relative font-syne text-[clamp(1.6rem,5vw,4.5rem)] leading-[1.08] tracking-heading font-bold ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]' : 'text-[#111111] drop-shadow-none'}`}
            >
              Architecting Strategy.
            </KineticText>
            <h1 className={`relative font-syne text-[clamp(1.6rem,5vw,4.5rem)] leading-[1.08] tracking-heading font-bold mt-2 ${isDark ? 'text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]' : 'text-[#111111] drop-shadow-none'}`}>
              Engineering the <OrganicHighlight>Future.</OrganicHighlight>
            </h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className={`relative font-sans text-sm md:text-base max-w-xl mt-8 leading-relaxed ${isDark ? 'text-slate-200/92 drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]' : 'text-[#3E3A2F]'}`}
            >
              beehoop is an end-to-end strategic and engineering powerhouse. We don&apos;t just advise; we engineer the intelligence behind market-leading decisions. From boardroom advisory and financial modeling to building scalable data pipelines, bespoke BI ecosystems, and full-stack software development — we are your partners from thinking to building.
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={heroVariants}
              className="relative mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-6"
            >
              <Magnetic>
                <Link
                  href="/contact"
                  className="inline-block btn-primary text-[#090a0c] font-sans font-semibold px-8 py-4 rounded-full text-sm"
                >
                  Start a conversation
                </Link>
              </Magnetic>
              <Link
                href="/cases"
                className={`font-sans text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all group ${isDark ? 'text-slate-200 hover:text-white' : 'text-[#4A4638] hover:text-[#111111]'}`}
              >
                See our work
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Fluid transition: long vertical gradient blend — no hard edges.
          Dark: #000000 → hsl(var(--background)) seamlessly.
          Light: #F5F5F2 → hsl(var(--background)) seamlessly.
          + subtle warm amber radial glow from bottom-centre for depth. */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[50vh] pointer-events-none z-[5]"
        style={{
          background: isDark
            ? "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 40%, hsl(var(--background)) 100%), radial-gradient(80% 60% at 50% 100%, rgba(200,146,10,0.10) 0%, rgba(200,146,10,0) 65%)"
            : "linear-gradient(to bottom, rgba(245,245,242,0) 0%, rgba(245,245,242,0.60) 42%, hsl(var(--background)) 100%), radial-gradient(80% 60% at 50% 100%, rgba(200,146,10,0.08) 0%, rgba(200,146,10,0) 60%)",
        }}
      />
      {/* Subtle filmic noise texture for analog warmth */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[40vh] pointer-events-none z-[6] opacity-[0.05]"
        style={{
          backgroundImage: `url(${basePath}/textures/noise.png)`,
          backgroundSize: "200px 200px",
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />
      {/* Warm amber corner glow — right side only for asymmetric sophistication */}
      <div
        className="absolute bottom-0 right-0 w-2/5 h-[35vh] pointer-events-none z-[6]"
        style={{
          background: isDark
            ? "radial-gradient(75% 65% at 100% 100%, rgba(200,146,10,0.14) 0%, rgba(200,146,10,0) 70%)"
            : "radial-gradient(75% 65% at 100% 100%, rgba(200,146,10,0.08) 0%, rgba(200,146,10,0) 70%)",
        }}
      />

      {/* Scroll indicator */}
      <motion.div
        style={{ opacity: scrollIndicatorOpacity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <ChevronDown className={`w-5 h-5 animate-bounce-gentle ${isDark ? 'text-slate-500' : 'text-[#999999]'}`} />
      </motion.div>
    </section>
  )
}
