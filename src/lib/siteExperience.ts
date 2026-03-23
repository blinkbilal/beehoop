export const premiumMotion = {
  duration: {
    fast: 0.28,
    base: 0.5,
    slow: 0.8,
    drift: 1.2,
  },
  easing: {
    standard: [0.25, 0.1, 0.25, 1] as const,
    expressive: [0.16, 1, 0.3, 1] as const,
    settle: [0.2, 0.8, 0.2, 1] as const,
  },
} as const

export const premiumThemeTokens = {
  light: {
    canvasBase: "#F5F5F2",
    canvasEdge: "#DBD6C4",
    surfaceText: "#111111",
    surfaceMuted: "#4A4638",
    accent: "#C8920A",
    accentStrong: "#F5C842",
  },
  dark: {
    canvasBase: "#000000",
    canvasEdge: "#070707",
    surfaceText: "#F2F2F2",
    surfaceMuted: "rgba(255,255,255,0.68)",
    accent: "#C8920A",
    accentStrong: "#F5C842",
  },
} as const

export const homepageCapabilitySequence = [
  "strategic-advisory",
  "intelligence-engine",
  "digital-engineering",
] as const

export type HomepageCapabilityKey = typeof homepageCapabilitySequence[number]

export const homepageCapabilityWorlds: Record<HomepageCapabilityKey, {
  label: string
  headline: string
  summary: string
  emotionalRole: string
  spatialMetaphor: string[]
  designIntent: string
}> = {
  "strategic-advisory": {
    label: "Strategic Advisory",
    headline: "Navigate complexity with strategic precision.",
    summary: "A premium navigation field that turns ambiguity into alignment, direction, and decisive movement.",
    emotionalRole: "Authority and orientation",
    spatialMetaphor: ["navigation field", "constellation of possibilities", "decision gravity"],
    designIntent: "Lead the homepage capability sequence with calm strategic control.",
  },
  "intelligence-engine": {
    label: "Intelligence Engine",
    headline: "Transform fragmented signals into executive clarity.",
    summary: "An intelligence chamber where noise becomes pattern, clusters become systems, and systems become insight.",
    emotionalRole: "Clarity and synthesis",
    spatialMetaphor: ["signal emergence", "routing", "pattern formation"],
    designIntent: "Upgrade the existing section into the homepage's most iconic intelligence scene.",
  },
  "digital-engineering": {
    label: "Digital Engineering",
    headline: "Operationalize strategy through precise digital systems.",
    summary: "A structural assembly chamber where modular systems lock into elegant, scalable execution.",
    emotionalRole: "Execution and confidence",
    spatialMetaphor: ["structural assembly", "precision fit", "operational framework"],
    designIntent: "Complete the capability sequence by turning insight into engineered reality.",
  },
}

export const phaseOneFoundationChecklist = [
  "Lock premium dark and light theme tokens",
  "Establish shared premium motion durations and easing",
  "Standardize premium surfaces and material language",
  "Codify homepage capability sequence metadata",
  "Adopt shared primitives in Hero, Navbar, and Intelligence Engine",
] as const