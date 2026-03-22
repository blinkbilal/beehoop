# beehoop — Comprehensive Implementation Plan
### From Corporate Template → Awwwards-Grade Strategic & Engineering Powerhouse
---

## Table of Contents
1. [Executive Summary](#1-executive-summary)
2. [Current State Audit](#2-current-state-audit)
3. [Phase 1 — Content & Narrative Overhaul](#3-phase-1--content--narrative-overhaul)
4. [Phase 2 — Service Matrix Restructure](#4-phase-2--service-matrix-restructure)
5. [Phase 3 — Case Studies & Proof Layer](#5-phase-3--case-studies--proof-layer)
6. [Phase 4 — Hero: Neural Pulse Environment](#6-phase-4--hero-neural-pulse-environment)
7. [Phase 5 — The "Intelligence Engine" Section](#7-phase-5--the-intelligence-engine-section)
8. [Phase 6 — Process Architecture Reimagining](#8-phase-6--process-architecture-reimagining)
9. [Phase 7 — Accessibility & Micro-Interactions](#9-phase-7--accessibility--micro-interactions)
10. [Phase 8 — Missing Parts (Not in Criticism)](#10-phase-8--missing-parts-not-in-criticism)
11. [File-Level Change Map](#11-file-level-change-map)
12. [Dependency & Package Changes](#12-dependency--package-changes)
13. [Implementation Sequence](#13-implementation-sequence)

---

## 1. Executive Summary

beehoop is a full-spectrum consultancy — strategy, finance, brand, marketing, data pipelines, BI, dashboards, software development, and web development. The current site presents it as a traditional advisory firm only. This plan transforms the site into an immersive, tech-savvy experience that communicates both the "thinking" and the "building" — while targeting Awwwards-level design quality.

**Three criticism documents drive this plan:**
1. **Content & Narrative Architecture** — Messaging misrepresents technical capabilities
2. **Front-End & Experiential Design** — Static grid layouts, no depth or immersion
3. **Missing "Engine Room" Section** — Data, Analytics & Engineering are invisible

---

## 2. Current State Audit

### What Exists (File → Purpose)
| File | Current State | Problem |
|------|--------------|---------|
| `src/lib/data.ts` → `services[]` | 4 services: Strategy, M&A, Brand, Financial & Data Analytics | **Software Dev, Web Dev, Data Pipelines, BI, Dashboards are invisible** |
| `src/lib/data.ts` → `cases[]` | 6 case studies — all traditional business outcomes | **Zero tech-first case studies** |
| `src/components/sections/Hero.tsx` | "We help organisations make better decisions, faster." | **Passive advisory statement — no mention of building/engineering** |
| `src/components/ui/HeroCanvas.tsx` | 2000 spherical particles, slow rotation, mouse parallax | **Generic particle cloud — no interactivity, no network structure, no click events** |
| `src/components/sections/Services.tsx` | Flat 2×2 grid of identical rounded-rectangle cards | **Visual fatigue, template feel, no pillar grouping** |
| `src/components/sections/Process.tsx` | Horizontal Swiper carousel of 5 flat cards | **No scroll-pinning, no SVG path animation, monotonous** |
| `src/components/sections/ClientLogos.tsx` | Marquee tags — `text-text-muted` on white | **Fails WCAG 4.5:1 contrast** |
| `src/components/sections/Contact.tsx` | Standard form with floating labels | **Functional but not distinctive, no magnetic button** |
| `src/app/globals.css` | `--text-muted: 215 14% 65%` (light) / `215 15% 45%` (dark) | **Muted text too light for WCAG on light backgrounds** |
| **Missing entirely** | No Data/Intelligence/Engineering section | **The loudest gap — zero representation of technical services** |
| **Missing entirely** | No dark-mode thematic inversion on scroll | **Relentlessly bright, no "tech lab" feel** |
| **Missing entirely** | No text-scramble, no magnetic buttons, no glassmorphism | **No micro-interactions that signal "tech-savvy"** |

---

## 3. Phase 1 — Content & Narrative Overhaul

### 3.1 Hero Copy Rewrite

**File:** `src/components/sections/Hero.tsx`

| Element | Current | New |
|---------|---------|-----|
| Eyebrow | "Your Strategic Partner" | "Strategy · Engineering · Intelligence" |
| Headline | "We help organisations make better decisions, faster." | "Architecting Strategy. Engineering the Future." |
| Sub-copy | "beehoop is a strategy, financial, and branding advisory firm…" | "beehoop is an end-to-end strategic and engineering partner. From boardroom advisory and financial modelling to scalable software, data architecture, and intelligent dashboards — we turn complex challenges into operational realities." |
| CTA Primary | "Start a conversation" (unchanged) | Keep as-is |
| CTA Secondary | "See our work" (unchanged) | Keep as-is |

**Implementation:**
- Edit the `<motion.p>` eyebrow text in Hero.tsx
- Edit the `<KineticText>` string from "We help organisations…" to new headline
- Remove the separate `<h1>` with `<OrganicHighlight>faster.</OrganicHighlight>` — fold the highlighted word into the KineticText or create a combined approach: `"Architecting Strategy."` as KineticText line 1, `"Engineering the "` + `<OrganicHighlight>Future.</OrganicHighlight>` as line 2
- Edit the `<motion.p>` sub-copy paragraph

### 3.2 About Section Copy
**File:** `src/components/sections/About.tsx`

The blockquote and supporting text need to encompass both advisory and engineering identities. Add language about technical execution alongside strategic thinking.

### 3.3 Footer Service Links
**File:** `src/components/layout/Footer.tsx`

Update the "Services" column links to reflect the new 3-pillar taxonomy (see Phase 2). Currently shows 4 services — will expand to 6–7.

### 3.4 Navbar Service Dropdown
**File:** `src/components/layout/Navbar.tsx`

The desktop dropdown lists 4 services with icons. Must be updated to show the new pillar-grouped structure.

---

## 4. Phase 2 — Service Matrix Restructure

### 4.1 Data Architecture

**File:** `src/lib/data.ts` → `services[]`

Restructure from 4 flat services into 3 pillars with sub-services:

```
Pillar 1: Strategic Advisory
  ├── Strategy Development (existing — keep, refine copy)
  ├── M&A & Transactions (existing — keep)
  └── Brand & Market Strategy (existing — keep)

Pillar 2: Data & Intelligence
  ├── Data Architecture & Pipelines (NEW)
  ├── Business Intelligence (NEW)
  └── Executive Dashboards & Reporting (NEW)

Pillar 3: Digital Engineering
  ├── Custom Software Development (NEW)
  ├── Full-Stack Web Development (NEW)
  └── System Integration (NEW)
```

**Changes to `data.ts`:**
- Add a `pillar` field to each service object: `pillar: 'advisory' | 'intelligence' | 'engineering'`
- Add a `pillarLabel` field: e.g., `"Strategic Advisory"`
- Add 5–6 new service entries with `slug`, `description`, `longDescription[]`, `deliverables[]`
- Keep existing 4 services, assign them to pillars
- Merge "Financial & Data Analytics" partly into Pillar 2 and keep a refined "Financial Modelling & Advisory" in Pillar 1, or fold financial modelling into Strategy Development's deliverables

**New service entries needed:**
1. `data-architecture-pipelines` — Data Architecture & Pipelines
2. `business-intelligence` — Business Intelligence
3. `executive-dashboards` — Executive Dashboards & Reporting
4. `custom-software-development` — Custom Software Development
5. `web-development` — Full-Stack Web Development
6. `system-integration` — System Integration

Each needs: icon mapping, slug, description (~30 words), longDescription (3 paragraphs), deliverables (5 items).

### 4.2 New Sketch Icons

**File:** `src/components/ui/SketchIllustrations.tsx`

Add new hand-drawn SVG icon components:
- `SketchDatabase` — for Data Architecture & Pipelines
- `SketchDashboard` — for BI / Dashboards
- `SketchCode` — for Software Development
- `SketchGlobe` — for Web Development
- `SketchPlug` — for System Integration

### 4.3 Services Section UI Redesign

**File:** `src/components/sections/Services.tsx`

**Current:** Flat 2×2 grid with `ServiceCard`.
**New:** Pillar-based layout with 3 horizontal bands.

```
┌─────────────────────────────────────────────────────┐
│ PILLAR LABEL: Strategic Advisory                     │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│ │ Strategy │ │  M&A     │ │  Brand   │             │
│ └──────────┘ └──────────┘ └──────────┘             │
├─────────────────────────────────────────────────────┤
│ PILLAR LABEL: Data & Intelligence                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│ │Pipelines │ │   BI     │ │Dashboards│             │
│ └──────────┘ └──────────┘ └──────────┘             │
├─────────────────────────────────────────────────────┤
│ PILLAR LABEL: Digital Engineering                    │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐             │
│ │ Software │ │   Web    │ │Integratn │             │
│ └──────────┘ └──────────┘ └──────────┘             │
└─────────────────────────────────────────────────────┘
```

Design: Each pillar has a subtle label, then a 3-column card row. Cards use the existing `ServiceCard` component with minor modifications to accept the new icon names.

### 4.4 Service Detail Pages

**File:** `src/app/services/[slug]/page.tsx` + `src/components/pages/ServiceDetail.tsx`

- `generateStaticParams()` must iterate over the expanded services array
- ServiceDetail layout unchanged — it already handles `longDescription[]` and `deliverables[]`
- Verify routing works for all new slugs

---

## 5. Phase 3 — Case Studies & Proof Layer

### 5.1 New Tech-First Case Studies

**File:** `src/lib/data.ts` → `cases[]`

Add 3–4 new case studies that showcase engineering/data outcomes:

| # | Tag | Client | Outcome | Metric |
|---|-----|--------|---------|--------|
| 7 | Data Architecture | Global logistics company | Built real-time data pipeline reducing reporting lag from 48h to real-time | 98% ↓ latency |
| 8 | Business Intelligence | Regional retail chain | Deployed predictive BI dashboard that identified $12M in hidden cost savings | $12M savings |
| 9 | Software Development | FinTech start-up | Engineered proprietary transaction monitoring platform processing 2M+ daily events | 2M+ events/day |
| 10 | Web Development | Professional services firm | Designed and built conversion-optimised web platform increasing qualified leads 3x | 3x leads |

Each needs: `tag`, `slug`, `client`, `outcome`, `description`, `metric`, `metricLabel`, `service` (new service category values).

### 5.2 Case Studies Filter Tabs

**File:** `src/components/sections/CaseStudies.tsx`

Current filter tabs: `All, Strategy, M&A, Brand, Analytics`
New filter tabs: `All, Strategy, M&A, Brand, Data & Intelligence, Engineering`

Update the filter logic to map to the new `service` field values.

### 5.3 Achievements Update

**File:** `src/lib/data.ts` → `achievements[]`

Current: `320%+ ROI, $50M+ Value, 15+ AI Models, 4+ Continents`
Add/replace to include tech metrics:
- "2M+ Data records processed daily" or "99.9% System uptime"
- Keep the strongest existing ones, swap out the weakest

---

## 6. Phase 4 — Hero: Neural Pulse Environment

This is the highest-impact visual upgrade. Replaces the current generic particle cloud with an interactive neural network.

### 6.1 Replace HeroCanvas.tsx

**File:** `src/components/ui/HeroCanvas.tsx` — **Full rewrite**

**Current:** 2000 random spherical particles, `PointsMaterial`, slow rotation + mouse parallax.

**New architecture:**

```
HeroCanvas
├── NeuralNetwork (R3F component)
│   ├── Nodes (InstancedMesh — 500–800 nodes)
│   ├── Edges (Custom LineSegments via BufferGeometry)
│   ├── Pulses (animated dash-offset on edges)
│   └── CursorAttractor (Raycaster + magnetic field)
├── PostProcessing
│   ├── EffectComposer
│   └── UnrealBloomPass (bloom on gold emissive nodes)
└── EventHandlers
    └── onClick → Neural cascade
```

**Implementation steps:**

1. **Graph generation function** (`generateNetworkGraph(nodeCount, connectionRadius)`)
   - Place ~600 nodes in a 3D volume biased to the right side of canvas
   - K-Nearest Neighbors to compute edges (max 3–4 connections per node)
   - Return `{ positions: Float32Array, edges: Uint16Array[] }`

2. **Nodes — InstancedMesh**
   - `THREE.SphereGeometry(0.04, 8, 8)` with MeshStandardMaterial
   - `emissive: #C8920A`, `emissiveIntensity` animated per-node
   - Use `InstancedMesh` for single draw call (critical for 600 nodes)

3. **Edges — LineSegments with custom shader**
   - Install `meshline` or use `@react-three/drei`'s `Line` component
   - Gold color `#C8920A` at low opacity (0.15), animated opacity oscillation via GSAP

4. **Post-processing — Bloom**
   - `@react-three/postprocessing` with `Bloom` effect
   - Settings: `intensity: 0.4, luminanceThreshold: 0.6, radius: 0.4`
   - This makes emissive nodes actually glow

5. **Cursor attractor**
   - Bind normalized mouse coords to a `Raycaster`
   - Nodes within distance threshold offset 0.2× toward cursor
   - Spring-lerp back when cursor moves away

6. **Click → Neural cascade**
   - `onPointerDown` on canvas
   - Find nearest node via raycaster
   - Fire GSAP timeline:
     - Node_Origin → emissive white-hot (1.0)
     - Cascade along edges: animate `dashOffset` on connected lines
     - Next node lights up → cascades to *its* connections
     - Decay: intensity drops ~30% per hop, max 4 hops
   - Total cascade: ~1.2s timeline

7. **Camera integration**
   - Camera positioned to focus network right-of-center
   - GSAP ScrollTrigger: slow rotation as user scrolls hero → about

8. **Performance gates**
   - DPR capped at `[1, 1.5]` (down from `[1, 2]`)
   - FPS monitor: if < 40fps for 2s, disable bloom + reduce node count
   - `InstancedMesh` mandatory — no individual mesh per node

### 6.2 Install Dependencies

```bash
npm install @react-three/postprocessing meshline
```

`@react-three/postprocessing` wraps Three.js EffectComposer for R3F declaratively.

### 6.3 Pointer Events

**Current:** `pointer-events-none` on the canvas wrapper div.
**New:** Remove `pointer-events-none` from right 60% canvas area (needed for click interaction). Add `pointer-events-none` only to the left text column overlay.

---

## 7. Phase 5 — The "Intelligence Engine" Section (NEW)

This is the entirely new section that addresses the biggest gap.

### 7.1 Placement in Homepage Flow

**File:** `src/app/page.tsx`

**Current order:**
```
Hero → About → Achievements → Services → Process → CaseStudies → ClientLogos → Testimonials → BlogPreview → Contact
```

**New order:**
```
Hero → About → Achievements → Services → Process → ⭐ DataEngine (NEW) → CaseStudies → ClientLogos → Testimonials → BlogPreview → Contact
```

Insert after Process, before CaseStudies. Logic: you've told the user *how* you think (Services) and *how* you work (Process). Now plunge them into the *technology* powering execution, setting up the massive ROI metrics in CaseStudies.

### 7.2 New Component

**Create:** `src/components/sections/DataEngine.tsx`

**Content architecture:**
```
Section wrapper (dark bg: #0A0A0A)
├── Three.js canvas (background — 3D point cloud / network)
├── Section header
│   ├── Eyebrow: "The Engine Room"
│   ├── Headline: "The Intelligence Engine."
│   └── Sub-headline: "From raw telemetry to radical clarity..."
├── Three Glassmorphism pillar cards
│   ├── 01: Data Architecture & Pipelines
│   ├── 02: Business Intelligence
│   └── 03: Executive Dashboards
└── Scroll-triggered "Lights Out" transition
```

### 7.3 The "Lights Out" Scroll Transition

**Mechanism:** GSAP ScrollTrigger on the DataEngine section wrapper.

- **Trigger:** When section enters viewport (top 80%)
- **Animation:** `backgroundColor` of section transitions from `var(--background)` → `#0A0A0A`
- **Duration:** Pinned for 1 viewport height while transition plays
- **Exit:** When user scrolls past, smoothly return to normal background for the CaseStudies section

**Alternative (simpler, recommended):** The DataEngine section itself is permanently dark (`bg-[#0A0A0A]`). Use a CSS gradient transition at the top/bottom edges to smoothly blend into the surrounding light sections. No ScrollTrigger pinning needed.

```css
/* Top edge: light → dark */
background: linear-gradient(180deg, hsl(var(--background)) 0%, #0A0A0A 8%, #0A0A0A 92%, hsl(var(--background)) 100%);
```

### 7.4 Background Visualization (Three.js)

**Create:** `src/components/ui/DataEngineCanvas.tsx`

- Point cloud / network graph similar to hero but with different aesthetic
- Particles start chaotic → as user scrolls through the 3 pillars, particles mathematically organise into a structured grid shape (using GSAP ScrollTrigger to drive morph progress)
- Gold accent nodes on dark background
- Lower particle count (~300) for performance — this section is heavier due to glassmorphism

### 7.5 Glassmorphism Cards

**CSS in globals.css or inline Tailwind:**

```css
.glass-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 1.5rem;
}
.glass-card:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(200, 146, 10, 0.3);
  transform: scale(1.02);
}
```

### 7.6 Text Scramble Effect on Numbers

**Create:** `src/components/ui/TextScramble.tsx`

- On scroll-in-view, numbers "01", "02", "03" cycle through random characters (`0xF8...`, `B2A...`) for ~0.6s before locking to final value
- Use `requestAnimationFrame` loop with character pool: `0123456789ABCDEF!@#$%`
- Trigger: Intersection Observer, once per lifecycle

### 7.7 Copy for the Three Pillars

| Pillar | Headline | Copy |
|--------|----------|------|
| 01 | Data Architecture & Pipelines | Building the bedrock. We architect scalable, secure data pipelines that seamlessly ingest, clean, and unify your disparate data streams into a single source of truth. |
| 02 | Business Intelligence | Connecting the dots. We deploy advanced BI frameworks that transform static databases into dynamic, predictive intelligence — uncovering hidden operational efficiencies and market gaps. |
| 03 | Executive Dashboards | Clarity at a glance. Bespoke, real-time reporting dashboards designed for the C-Suite. We distill millions of data points into beautiful, actionable visual interfaces. |

---

## 8. Phase 6 — Process Architecture Reimagining

### 8.1 Scroll-Pinned Layout

**File:** `src/components/sections/Process.tsx` — **Major rewrite**

**Current:** Horizontal Swiper carousel with 5 flat cards.
**New:** Split-screen scroll-pinned architecture.

```
┌───────────────────────────────────────────────┐
│  ┌──────────────┐  ┌────────────────────────┐ │
│  │              │  │                        │ │
│  │  PINNED      │  │  SCROLLING CONTENT     │ │
│  │  LEFT SIDE   │  │                        │ │
│  │              │  │  Step 01               │ │
│  │  "How We     │  │  Discovery & Diagnosis │ │
│  │   Engage"    │  │                        │ │
│  │              │  │  (scroll to reveal     │ │
│  │  Process     │  │   steps 02–05 with    │ │
│  │  Architecture│  │   cross-fade)          │ │
│  │              │  │                        │ │
│  └──────────────┘  └────────────────────────┘ │
└───────────────────────────────────────────────┘
```

**Implementation:**
1. Use GSAP `ScrollTrigger` with `pin: true` on the left column
2. Right column: 5 step blocks, each ~80vh tall
3. As user scrolls, left stays fixed, right slides through steps
4. Typography: large step number with text-scramble animation
5. SVG path animation: each step has a unique line-drawing icon (e.g., magnifying glass for Discovery, grid for Framework, chart for Analysis)

**Fallback (mobile):** Revert to vertical stacked cards — scroll-pinning is desktop-only (`lg:` breakpoint).

### 8.2 SVG Path Animations

**Create:** `src/components/ui/ProcessIcons.tsx`

5 simple SVG line-drawing icons, animated with `stroke-dasharray` / `stroke-dashoffset` on scroll trigger:
1. Magnifying glass (Discovery)
2. Grid/matrix (Framework)
3. Chart/graph (Analysis)
4. Blueprint/pencil (Solution Design)
5. Rocket/launch (Execution)

---

## 9. Phase 7 — Accessibility & Micro-Interactions

### 9.1 WCAG Contrast Fixes

**File:** `src/app/globals.css`

| Variable | Current (light) | New (light) | WCAG Ratio |
|----------|-----------------|-------------|------------|
| `--text-muted` | `215 14% 65%` (#94a3b8) | `215 16% 47%` (#64748b) | 4.6:1 ✓ |
| `--text-secondary` | `215 16% 47%` (#64748b) | `215 20% 40%` (#516177) | 5.7:1 ✓ |

**Dark mode:** Current values are acceptable (light text on dark bg). No changes.

**Files affected:** Any component using `text-text-muted` or `text-text-secondary` class on light backgrounds:
- `ClientLogos.tsx` — marquee tags (`text-text-muted`)
- `Footer.tsx` — secondary text
- `BlogPreview.tsx` — date/read time
- `About.tsx` — supporting text

### 9.2 Magnetic Button Effect

**File:** `src/components/ui/Button.tsx` + `src/components/ui/Magnetic.tsx`

The `Magnetic` component already exists. Wrap the primary CTA buttons:
- Hero "Start a conversation" → wrap in `<Magnetic>`
- Contact "Send message" → wrap in `<Magnetic>`
- DataEngine section CTAs → wrap in `<Magnetic>`

### 9.3 Liquid Gradient Hover on Primary Buttons

**File:** `src/components/ui/Button.tsx` or inline in Hero.tsx

On hover, reveal an animated gradient across the button surface:

```css
.btn-primary {
  background: hsl(var(--accent) / 0.8);
  background-size: 200% 200%;
  transition: background-position 0.4s ease, transform 0.3s ease;
}
.btn-primary:hover {
  background: linear-gradient(135deg, #F5C842 0%, #C8920A 50%, #F5C842 100%);
  background-size: 200% 200%;
  background-position: right center;
}
```

### 9.4 Enhanced Form Inputs

**File:** `src/app/globals.css` (form-field styles)

Current floating labels already work well. Enhancements:
- Add a subtle `transition: transform 0.3s ease` to the label shift (already exists)
- Add a thin gold underline animation (width 0→100%) on focus (partially exists via `border-bottom-color` transition)
- No major changes needed — current implementation is clean

### 9.5 Reduced Motion Compliance

**Current:** `@media (prefers-reduced-motion: reduce)` rule already exists in globals.css — good.
**Enhancement:** Also disable Three.js animations when reduced motion is preferred:

```tsx
// In HeroCanvas, DataEngineCanvas:
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
// If true: skip useFrame animations, show static network
```

---

## 10. Phase 8 — Missing Parts (Not in Criticism)

These are gaps identified beyond the three criticism documents that are **critical for a complete, award-grade implementation:**

### 10.1 ❌ No SEO for New Service Pages
**Problem:** Adding 6 new services means 6 new dynamic routes. Currently `generateStaticParams()` in `src/app/services/[slug]/page.tsx` iterates `services` from data.ts — this will auto-expand, but:
- `src/app/sitemap.ts` must be verified to pick up new service slugs
- OpenGraph metadata for new service detail pages needs `generateMetadata()`

**Action:** Verify sitemap.ts dynamically maps all service slugs. Add OG images per service if desired.

### 10.2 ❌ No "Tech Stack" or "Our Approach to Engineering" Page
**Problem:** The criticism adds a homepage section for Data & Intelligence, but there's no dedicated page that deep-dives into the engineering methodology, tech stack, or tools the team uses.
**Recommendation:** Create `src/app/engineering/page.tsx` — a dedicated page similar to the About page but focused on the technical DNA: languages, frameworks, deployment pipelines, security practices, tooling.

### 10.3 ❌ No Team Members for Engineering/Data Roles
**Problem:** `src/lib/data.ts` → `team[]` has 3 people: Managing Partner, Partner (Strategy), Head of Data & Analytics. No software engineers, no data engineers, no web developers.
**Action:** Add 2–3 team members representing the engineering bench:
- Head of Software Engineering
- Lead Data Engineer
- Principal Web Developer

Update `src/components/sections/Leadership.tsx` to display the expanded team. Consider grouping by track (Advisory vs. Engineering).

### 10.4 ❌ No Blog Posts About Engineering/Data Topics
**Problem:** `blogPosts[]` has 3 entries — Strategy, M&A, Analytics. Nothing about data pipelines, software architecture, or engineering best practices.
**Action:** Add 2–3 blog posts:
- "Building Data Pipelines That Scale: Lessons from the Field"
- "Why Custom Software Beats Off-the-Shelf for Complex Operations"
- "The Modern BI Stack: From Raw Data to Real-Time Decisions"

### 10.5 ❌ No Testimonials from Tech/Data Clients
**Problem:** All 3 testimonials are from traditional business clients (Infrastructure, Energy, Oil & Gas).
**Action:** Add 1–2 testimonials from data/software clients:
- CTO of a FinTech praising the data pipeline work
- VP of Operations praising the BI dashboard

### 10.6 ❌ `noise.png` Texture Path Hardcoded to `/beehoop/`
**Problem:** In `globals.css`, the noise overlay uses `url('/beehoop/textures/noise.png')`. This hardcoded path breaks in local dev where `basePath` is not set.
**Action:** Move to a dynamic approach or use CSS fallback:
```css
background-image: url('/textures/noise.png');
```
And rely on `next.config.mjs` asset prefix, or conditionally inject the basePath.

### 10.7 ❌ No Loading/Skeleton States for Dynamic Sections
**Problem:** All sections below Hero are `dynamic(() => import(...))` but no `loading` fallback is provided. On slow connections, sections pop in abruptly.
**Action:** Add subtle skeleton placeholders:
```tsx
const Services = dynamic(() => import(...), {
  loading: () => <div className="h-96 animate-pulse bg-background-alt rounded-3xl mx-20" />
})
```

### 10.8 ❌ No 404 Page
**Problem:** No `src/app/not-found.tsx` exists. Invalid slugs show the default Next.js 404.
**Action:** Create a branded 404 page with navigation back to home.

### 10.9 ❌ No Favicon in Multiple Sizes
**Problem:** Only `favicon.ico` exists. Modern PWA/mobile needs `apple-touch-icon.png`, `favicon-32x32.png`, `favicon-16x16.png`.
**Action:** Generate favicon set from the bee logo and add to `src/app/` using Next.js metadata API or `public/`.

### 10.10 ❌ No Performance Budget / Lighthouse Baseline
**Problem:** Three.js + GSAP + Framer Motion + Lottie + Swiper — this is a heavy bundle. No evidence of performance monitoring.
**Action:** After implementation, run Lighthouse and establish baselines:
- Target: Performance > 85, Accessibility > 95, Best Practices > 95
- Implement `next/dynamic` with SSR disabled for all Three.js components (already done for HeroCanvas — verify for DataEngineCanvas)

### 10.11 ❌ No Analytics / Event Tracking
**Problem:** No analytics integration (GA4, Plausible, etc.). For a consultancy site, tracking form submissions, CTA clicks, and case study views is essential.
**Recommendation:** Add a lightweight privacy-respecting analytics tool (e.g., Plausible or Umami) via `_document` or layout.tsx script tag.

### 10.12 ❌ Navbar Doesn't Reflect New Service Pillars
**Problem:** The service dropdown in `Navbar.tsx` shows 4 flat services. With the new 3-pillar taxonomy, it needs a mega-menu or grouped dropdown.
**Action:** Redesign the dropdown as a 3-column grouped menu:
```
┌────────────────────────────────────────────┐
│ Strategic Advisory │ Data & Intelligence │ Digital Engineering │
│ · Strategy         │ · Data Pipelines    │ · Software Dev      │
│ · M&A              │ · BI                │ · Web Dev           │
│ · Brand            │ · Dashboards        │ · Integration       │
└────────────────────────────────────────────┘
```

---

## 11. File-Level Change Map

| File | Action | Phase |
|------|--------|-------|
| `src/lib/data.ts` | Major update — add services, cases, team, blog posts, testimonials | 2, 3, 8 |
| `src/components/sections/Hero.tsx` | Copy rewrite + layout adjustment for new headline | 1 |
| `src/components/ui/HeroCanvas.tsx` | **Full rewrite** — neural network + bloom + click interaction | 4 |
| `src/components/sections/Services.tsx` | Redesign to pillar-based layout | 2 |
| `src/components/ui/ServiceCard.tsx` | Minor update — support new icon names | 2 |
| `src/components/ui/SketchIllustrations.tsx` | Add 5 new sketch icon components | 2 |
| **`src/components/sections/DataEngine.tsx`** | **NEW FILE** — Intelligence Engine section | 5 |
| **`src/components/ui/DataEngineCanvas.tsx`** | **NEW FILE** — Three.js background for data section | 5 |
| **`src/components/ui/TextScramble.tsx`** | **NEW FILE** — number scramble animation | 5, 6 |
| `src/components/sections/Process.tsx` | **Major rewrite** — scroll-pinned split-screen | 6 |
| **`src/components/ui/ProcessIcons.tsx`** | **NEW FILE** — SVG line-drawing icons | 6 |
| `src/components/sections/CaseStudies.tsx` | Update filter tabs, handle new service categories | 3 |
| `src/components/sections/About.tsx` | Copy update — mention engineering | 1 |
| `src/components/sections/Leadership.tsx` | Support expanded team array with grouping | 8 |
| `src/components/sections/ClientLogos.tsx` | Fix contrast (via CSS variable change) | 7 |
| `src/components/sections/BlogPreview.tsx` | No code change — new posts auto-render from data | 3 |
| `src/components/sections/Testimonials.tsx` | No code change — new testimonials auto-render | 8 |
| `src/components/ui/Button.tsx` | Add Magnetic wrap + gradient hover | 7 |
| `src/components/layout/Navbar.tsx` | Mega-menu grouped dropdown | 8 |
| `src/components/layout/Footer.tsx` | Update service links to new taxonomy | 1 |
| `src/app/page.tsx` | Import and insert DataEngine section | 5 |
| `src/app/globals.css` | WCAG fixes, glassmorphism utility, noise path fix | 7, 5, 8 |
| `src/app/sitemap.ts` | Verify new slugs are generated | 8 |
| **`src/app/not-found.tsx`** | **NEW FILE** — branded 404 page | 8 |
| `package.json` | Add `@react-three/postprocessing` | 4 |

---

## 12. Dependency & Package Changes

### Install
```bash
npm install @react-three/postprocessing
```

### Already Available (no install needed)
- `three` ✓
- `@react-three/fiber` ✓
- `@react-three/drei` ✓ (has `Line`, `MeshLineGeometry`, `MeshLineMaterial`)
- `gsap` ✓ (has `ScrollTrigger`)
- `framer-motion` ✓
- `lottie-react` ✓

### Optional
```bash
npm install meshline  # Only if @react-three/drei's Line is insufficient for thick weighted edges
```

---

## 13. Implementation Sequence

Ordered by dependency chain and impact:

### Sprint 1: Foundation (Data + Content)
1. **data.ts overhaul** — new services, cases, team, blog posts, testimonials
2. **Hero.tsx copy** — new headline, sub-copy, eyebrow
3. **About.tsx copy** — add engineering language
4. **globals.css WCAG fixes** — contrast variables
5. **globals.css noise.png path fix**

### Sprint 2: Service Matrix
6. **SketchIllustrations.tsx** — new icons
7. **Services.tsx** — pillar-based layout
8. **ServiceCard.tsx** — support new icons
9. **Navbar.tsx** — mega-menu dropdown
10. **Footer.tsx** — updated service links
11. **Verify service/[slug] routing** for all new slugs

### Sprint 3: Hero Transformation
12. **Install `@react-three/postprocessing`**
13. **HeroCanvas.tsx full rewrite** — graph generation, InstancedMesh, edges, bloom
14. **Hero.tsx pointer-events adjustment** — enable click on canvas
15. **Performance testing** — FPS monitoring, resolution scaling

### Sprint 4: Intelligence Engine Section
16. **TextScramble.tsx** — new component
17. **DataEngineCanvas.tsx** — new component (simpler variant of hero network)
18. **DataEngine.tsx** — full new section with glassmorphism cards
19. **page.tsx** — insert DataEngine in homepage flow
20. **globals.css** — glassmorphism utility classes

### Sprint 5: Process Reimagining
21. **ProcessIcons.tsx** — new SVG line-drawing icons
22. **Process.tsx rewrite** — scroll-pinned split-screen (desktop), vertical stack (mobile)
23. **GSAP ScrollTrigger integration** — pin left, scroll right

### Sprint 6: Polish & Missing Parts
24. **CaseStudies.tsx** — updated filter tabs
25. **Leadership.tsx** — expanded team with grouping
26. **Button.tsx** — Magnetic wrap + gradient hover
27. **not-found.tsx** — branded 404
28. **Reduced motion** compliance in Three.js components
29. **Lighthouse audit** — performance, accessibility, best practices
30. **Dynamic import loading skeletons**

---

*This plan is designed to be executed incrementally — each sprint produces a shippable improvement. Sprints 1–2 are content-heavy and low-risk. Sprints 3–5 are the high-impact visual overhauls. Sprint 6 is polish and fills the gaps the criticism didn't cover.*
