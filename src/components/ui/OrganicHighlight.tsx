"use client"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { cn } from "@/lib/utils"

export function OrganicHighlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  return (
    <span ref={ref} className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="relative z-10">{children}</span>
      <svg
        className="absolute w-[115%] h-[150%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[48%] text-accent pointer-events-none z-0"
        viewBox="0 0 100 40"
        preserveAspectRatio="none"
      >
        <motion.path
          // An erratic hand-drawn eclipse
          d="M 8,24 C 5,5 92,2 96,18 C 98,34 14,40 10,22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.5 }}
        />
      </svg>
    </span>
  )
}
