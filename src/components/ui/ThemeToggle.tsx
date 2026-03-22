"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full hover:scale-110 active:scale-95 transition-transform outline-none focus-visible:ring-2 focus-visible:ring-accent"
      aria-label="Toggle theme"
    >
      {/* Sun — visible in light mode, warm amber */}
      <Sun className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 text-amber-500 transition-all dark:-rotate-90 dark:scale-0" />
      {/* Moon — visible in dark mode, cool indigo-tinged white */}
      <Moon className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 text-slate-300 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
