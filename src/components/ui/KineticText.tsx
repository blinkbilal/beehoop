"use client"

import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

// Register GSAP plugins globally once
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function KineticText({
  children,
  className,
  as: Component = "div",
  delay = 0,
}: {
  children: string
  className?: string
  as?: React.ElementType
  delay?: number
}) {
  const containerRef = useRef<HTMLElement>(null)
  
  // Split words with a trailing non-breaking space
  const words = children.split(' ').map((word) => word + "\u00A0")

  useEffect(() => {
    if (!containerRef.current) return
    const ctx = gsap.context(() => {
      const wordsElements = containerRef.current!.querySelectorAll(".kinetic-word")
      
      gsap.fromTo(
        wordsElements,
        {
          y: "120%",
          rotateZ: 6,
          opacity: 0,
        },
        {
          y: "0%",
          rotateZ: 0,
          opacity: 1,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.04,
          delay: delay,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      )
    }, containerRef)

    // Cleanup context on unmount to prevent memory leaks and React hydration issues
    return () => ctx.revert()
  }, [children, delay])

  return (
    <Component ref={containerRef} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden relative">
          <span className="inline-block kinetic-word origin-bottom-left will-change-[transform,opacity]">
            {word}
          </span>
        </span>
      ))}
    </Component>
  )
}
