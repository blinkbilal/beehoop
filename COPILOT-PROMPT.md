# Comprehensive Website Upgrade Prompt — Beehoop

> **Context for AI**: You are upgrading the Beehoop website (Next.js 14, TypeScript, Tailwind CSS, Framer Motion) to match the quality, polish, and visual sophistication of [digitalkitchen.agency](https://digitalkitchen.agency) (redirects to digitalkitchen.ua). The current site is approximately 30% of where it needs to be. This prompt covers EVERY gap — from micro-details to major structural changes. Do not skip any item. Implement changes incrementally, section by section, and confirm each before moving on.

---

## TABLE OF CONTENTS

1. [Typography & Fonts](#1-typography--fonts)
2. [Color System & Gradients](#2-color-system--gradients)
3. [Lottie & Pencil-Sketch Animations](#3-lottie--pencil-sketch-animations)
4. [Navigation & Header](#4-navigation--header)
5. [Hero Section](#5-hero-section)
6. [About Section](#6-about-section)
7. [Services Section](#7-services-section)
8. [Case Studies Section](#8-case-studies-section)
9. [Testimonials Section (NEW)](#9-testimonials-section-new)
10. [Process/How We Work Section (NEW)](#10-processhow-we-work-section-new)
11. [Client Logos Section (NEW)](#11-client-logos-section-new)
12. [Achievement Badges Section (NEW)](#12-achievement-badges-section-new)
13. [Blog Preview Section (NEW)](#13-blog-preview-section-new)
14. [Contact Section](#14-contact-section)
15. [Footer](#15-footer)
16. [Scroll Animations & Motion Design](#16-scroll-animations--motion-design)
17. [Hover Effects & Micro-Interactions](#17-hover-effects--micro-interactions)
18. [Mobile & Tablet Optimization](#18-mobile--tablet-optimization)
19. [Page Transitions & Loading](#19-page-transitions--loading)
20. [Multi-Page Architecture](#20-multi-page-architecture)
21. [Performance & SEO](#21-performance--seo)
22. [Accessibility](#22-accessibility)

---

## CURRENT STATE SUMMARY

**Tech Stack**: Next.js 14.2.25, React 18, TypeScript 5, Tailwind CSS 3.4, Framer Motion 11, Lucide React icons.

**Current Structure**: Single-page site with anchor navigation. Sections: Hero → About → Services (4 cards) → Case Studies (6 cards) → Contact. Minimal footer.

**Current Gaps vs. Digital Kitchen**:
- Only one font (Nunito) used everywhere — no typographic contrast or hierarchy
- No Lottie animations — only basic Framer Motion fade-in/slide-up
- No pencil-sketch or hand-drawn illustration style anywhere
- No testimonials, no process timeline, no FAQ, no blog section
- No client logo carousel or achievement badges
- No individual service pages — just 4 static cards
- No case study filtering (by service type, industry, geography)
- Contact section is just a mailto link — no form
- Footer is barebones (logo + copyright only)
- Mobile menu is a basic overlay with no animation
- No page transitions, no loading screen, no custom cursor
- No dark section backgrounds with rich gradient treatments
- No Lottie hero animation — just a static SVG hexagon network
- No scroll-triggered counter animations for metrics
- No parallax or advanced scroll effects
- No noise/grain texture overlays for depth

---

## 1. TYPOGRAPHY & FONTS

### Current State
- Single font: Nunito (all weights 300-800)
- CSS variables `--font-nunito`, `--font-serif`, `--font-syne`, `--font-sans` ALL point to Nunito
- No typographic contrast between headings and body

### Required Changes

**Install and configure a dual-font system:**
- **Headings font**: Use a geometric sans-serif with character — install `Syne` from Google Fonts (the variable name `--font-syne` already exists but maps to Nunito). Syne provides the bold, modern, editorial feel that Digital Kitchen uses for headlines.
- **Body font**: Keep `Nunito` for body text and UI elements — it's clean and readable.
- **Accent font** (optional): Consider `Space Grotesk` or `DM Sans` for metrics/numbers to add a data-driven feel.

**Update `tailwind.config.ts`:**
```typescript
fontFamily: {
  serif: ['Syne', 'system-ui', 'sans-serif'],     // Headings
  syne: ['Syne', 'system-ui', 'sans-serif'],       // Headings alias
  sans: ['Nunito', 'system-ui', 'sans-serif'],      // Body
  mono: ['Space Grotesk', 'monospace'],             // Metrics/numbers
},
```

**Update `layout.tsx`** to import both Syne and Nunito from `next/font/google`.

**Typography scale** (match Digital Kitchen's CSS variable system):
```
--font-size-xs: 13px      (labels, tags)
--font-size-sm: 14px      (body small)
--font-size-base: 16px    (body)
--font-size-md: 20px      (lead paragraphs)
--font-size-lg: 36px      (section headings)
--font-size-xl: 42px      (page titles)
--font-size-2xl: 56px     (hero headings)
--font-size-3xl: 72px     (hero heading desktop)
```

**Letter-spacing adjustments:**
- Headings: `-0.02em` (tighter tracking for Syne)
- Uppercase labels: `0.15em` tracking (already close, keep)
- Body text: `0` (natural tracking)

**Line-height refinements:**
- Headings: `1.1` (tighter than current `leading-tight` which is 1.25)
- Body: `1.7` (more generous than current `leading-relaxed` which is 1.625)
- Blockquotes: `1.3`

---

## 2. COLOR SYSTEM & GRADIENTS

### Current State
- Background: white (#FFFFFF), light gray (#F3F4F6), hero (#F4F6FA), dark (#0D0D0D)
- Accent: gold (#C8920A, #F5C842, #FEF3C7)
- Text: near-black (#0A0A0A), gray (#6B7280), muted (#9CA3AF)
- No gradients, no noise textures, no color depth

### Required Changes

**Expand the color palette in `tailwind.config.ts`:**
```typescript
colors: {
  background: {
    DEFAULT: '#FFFFFF',
    hero: '#F4F6FA',
    card: '#F8F9FB',         // Slightly warmer card background
    white: '#FFFFFF',
    dark: '#0D0D0D',
    navy: '#0A1628',          // NEW: Deep navy for rich dark sections
    cream: '#FFF9F0',         // NEW: Warm cream for variety
  },
  text: {
    primary: '#0A0A0A',
    secondary: '#4B5563',     // ADJUSTED: Slightly darker for better readability
    muted: '#9CA3AF',
    inverse: '#FFFFFF',
    accent: '#C8920A',        // NEW: For highlighted text
  },
  accent: {
    DEFAULT: '#C8920A',
    light: '#F5C842',
    pale: '#FEF3C7',
    hover: '#B07D08',
    glow: 'rgba(245, 200, 66, 0.15)',  // NEW: For subtle glow effects
  },
  border: {
    DEFAULT: '#E5E7EB',
    strong: '#D1D5DB',
    subtle: '#F3F4F6',        // NEW: Very subtle borders
  },
}
```

**Add gradient utility classes in `globals.css`:**
```css
.gradient-dark-navy {
  background: linear-gradient(135deg, #0A1628 0%, #1A2744 50%, #0D0D0D 100%);
}

.gradient-warm-gold {
  background: linear-gradient(135deg, #F5C842 0%, #C8920A 100%);
}

.gradient-hero-subtle {
  background: linear-gradient(180deg, #F4F6FA 0%, #FFFFFF 100%);
}

.noise-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}
```

**Apply noise overlay** to dark sections (Contact, any dark backgrounds) for subtle texture depth — this is a key detail that Digital Kitchen uses for visual richness.

---

## 3. LOTTIE & PENCIL-SKETCH ANIMATIONS

### Current State
- No Lottie animations at all
- Hero uses a static SVG hexagon network
- Only animation: Framer Motion fade-in (opacity 0→1, y: 32→0)

### Required Changes

This is the MOST CRITICAL gap. Digital Kitchen uses Lottie JSON animations extensively for hero sections and service illustrations. The pencil-sketch animation style is their signature.

**Step 1: Install Lottie**
```bash
npm install lottie-react
```

**Step 2: Create pencil-sketch style Lottie animations**

Create or source Lottie JSON files with a hand-drawn/pencil-sketch aesthetic. These should have:
- **Stroke-based line art** that appears to be drawn in real-time (path drawing animation)
- **Slight wobble/organic feel** — lines should not be perfectly straight
- **Monochrome or limited palette** — primarily black strokes with gold (#F5C842) accent fills
- **Continuous looping** with smooth ease-in-out transitions

You need Lottie animations for:
1. **Hero illustration** — Replace the static SVG hexagonal network with an animated Lottie that shows a hand-drawn network/strategy diagram being sketched in real time. The animation should loop, with lines appearing to be drawn by an invisible pencil, nodes connecting, and the gold accent filling in key nodes.
2. **Each service icon** — Create small Lottie animations for each service card that play on hover or on scroll-enter:
   - Strategy Development: An animated compass being drawn
   - M&A & Transactions: Animated merging arrows/paths being sketched
   - Brand & Market Strategy: An animated palette/brush stroke
   - Financial & Data Analytics: An animated bar chart being drawn line by line
3. **Contact section** — An animated illustration relevant to conversation/connection
4. **Loading/page transition** — A brief pencil-sketch logo animation

**Step 3: Create a reusable `LottieAnimation` component**
```tsx
// src/components/ui/LottieAnimation.tsx
'use client'
import Lottie from 'lottie-react'

interface LottieAnimationProps {
  animationData: object
  loop?: boolean
  autoplay?: boolean
  className?: string
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  className = '',
}: LottieAnimationProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
    />
  )
}
```

**Step 4: SVG path-drawing animations as fallback**

If Lottie JSON files aren't available, implement CSS/SVG path-drawing animations using `stroke-dasharray` and `stroke-dashoffset`:

```css
@keyframes sketch-draw {
  from {
    stroke-dashoffset: 1000;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.sketch-path {
  stroke-dasharray: 1000;
  stroke-dashoffset: 1000;
  animation: sketch-draw 2.5s ease-in-out forwards;
}

/* Add slight hand-drawn wobble with SVG filter */
.sketch-wobble {
  filter: url(#pencil-texture);
}
```

Create an SVG filter for pencil texture:
```html
<svg width="0" height="0">
  <defs>
    <filter id="pencil-texture">
      <feTurbulence type="turbulence" baseFrequency="0.03" numOctaves="4" result="noise" />
      <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" xChannelSelector="R" yChannelSelector="G" />
    </filter>
  </defs>
</svg>
```

This SVG filter makes any element look hand-drawn by applying micro-displacement — lines become slightly imperfect, like pencil on paper.

**Step 5: Place the hidden SVG filter element in `layout.tsx`** so it's globally available.

**Step 6: Apply pencil-sketch style to ALL illustrations on the site:**
- Hero SVG illustration → animate paths with `sketch-draw` + apply `pencil-texture` filter
- Service card icons → animate on hover with path-drawing effect
- Case study decorative elements → subtle sketch lines
- Section dividers → hand-drawn line separators instead of straight `<hr>`

---

## 4. NAVIGATION & HEADER

### Current State
- Sticky nav with scroll detection (transparent → white/blur)
- Desktop: horizontal links + "Let's talk →" CTA button
- Mobile: hamburger → fullscreen white overlay, no animation
- Nav link underline animation on hover (0→100% width)

### Required Changes

**Desktop Navigation Enhancements:**
1. **Add a service dropdown menu** — When hovering "Services", show a dropdown panel with all 4 services listed with icons and one-line descriptions (matching Digital Kitchen's service submenu pattern).
   ```
   Services (hover) →
   ┌────────────────────────────────────┐
   │ 🧭 Strategy Development            │
   │    Comprehensive strategic planning │
   │ 🔀 M&A & Transactions              │
   │    End-to-end deal advisory         │
   │ 🎨 Brand & Market Strategy          │
   │    Brand positioning & growth       │
   │ 📊 Financial & Data Analytics       │
   │    Data-driven insights             │
   └────────────────────────────────────┘
   ```
2. **Smoother scroll-based transition**: Current threshold is 20px which is too aggressive. Change to 60px. Add a subtle drop-shadow instead of just a border:
   ```
   scrolled ? 'bg-white/90 backdrop-blur-md shadow-[0_1px_3px_rgba(0,0,0,0.06)]' : 'bg-transparent'
   ```
3. **Nav link hover**: Keep the underline but add a color transition from `text-secondary` to `text-primary` that's smoother (increase duration to `0.3s`).
4. **CTA button**: Add a subtle gold glow on hover:
   ```
   hover:shadow-[0_0_20px_rgba(245,200,66,0.3)]
   ```
5. **Logo**: Slightly increase size on desktop — from 140px to 160px width for better presence.

**Mobile Navigation Enhancements:**
1. **Animated mobile menu**: Replace the hard cut-in overlay with an animated slide-down or fade-in using Framer Motion:
   ```tsx
   <AnimatePresence>
     {mobileOpen && (
       <motion.div
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         exit={{ opacity: 0, y: -20 }}
         transition={{ duration: 0.3, ease: 'easeInOut' }}
         className="fixed inset-0 z-40 bg-white ..."
       >
   ```
2. **Stagger nav link entrance**: Each link should animate in with 0.05s delay between them.
3. **Add a decorative element** in the mobile menu — e.g., a subtle sketch illustration or the bee logo mark at a large, low-opacity scale in the background.
4. **Close on outside click** and on scroll (currently only closes on link click).
5. **Hamburger animation**: Animate the Menu icon morphing into X icon instead of a hard swap. Use Framer Motion `layoutId` or CSS transitions.

---

## 5. HERO SECTION

### Current State
- Two-column layout: left (text + CTAs), right (static SVG hexagons)
- Staggered Framer Motion entrance (0.15s delay between elements)
- Typography: 5xl/6xl/7xl Nunito heading
- Background: flat #F4F6FA

### Required Changes

1. **Replace static SVG with animated Lottie illustration**: The hexagon network should be an animated Lottie or SVG with the pencil-sketch path-drawing effect described in Section 3. Lines should appear to draw themselves, nodes should fade in, and the gold center hexagon should fill with a smooth color wipe.

2. **Heading typography upgrade**:
   - Switch from Nunito to Syne for the h1
   - Increase desktop size to `text-8xl` (96px) — Digital Kitchen uses very large hero headings
   - Tighten line-height to `leading-[1.05]`
   - The italic "better decisions" should use a true italic serif feel — consider using `font-style: italic` with Syne (which has italic support) or a separate serif font for this one phrase

3. **Background treatment**:
   - Replace flat color with a subtle gradient: `linear-gradient(180deg, #F4F6FA 0%, #FFFFFF 80%)`
   - Add the noise overlay texture for depth (see Section 2)
   - Consider adding a very subtle animated grid or dot pattern in the background (low opacity, almost invisible — just adds texture)

4. **CTA buttons**:
   - Primary button: Add `hover:scale-[1.02]` and `hover:shadow-lg` for a lift effect
   - Secondary button ("See our work"): Add a subtle animated arrow that bounces right on hover
   - Increase button padding slightly: `px-8 py-4.5`

5. **Add a scroll indicator**: A small animated chevron or arrow at the bottom of the hero section indicating "scroll down", with a gentle bounce animation. This is a standard pattern on premium agency sites.
   ```css
   @keyframes bounce-gentle {
     0%, 100% { transform: translateY(0); }
     50% { transform: translateY(6px); }
   }
   ```

6. **Parallax effect**: As the user scrolls past the hero, the illustration should move at a slightly different speed than the text (parallax). Use Framer Motion's `useScroll` and `useTransform`:
   ```tsx
   const { scrollYProgress } = useScroll()
   const illustrationY = useTransform(scrollYProgress, [0, 0.3], [0, -60])
   ```

7. **Mobile hero**: On mobile, the SVG/Lottie illustration is currently `hidden lg:flex`. Instead, show a smaller version ABOVE the text (like Digital Kitchen's mobile layout) or below the CTAs. Use `w-full max-w-[300px] mx-auto mb-8` for mobile sizing.

---

## 6. ABOUT SECTION

### Current State
- Two-column: left (blockquote + 3 metrics), right (3 paragraphs + client type badges)
- Wrapped in a rounded gray card container
- Basic fade-in animation

### Required Changes

1. **Blockquote styling upgrade**:
   - Switch from Nunito to Syne italic for the quote
   - Add a decorative gold accent bar on the left side (4px wide, accent color)
   - Or add oversized typographic quote marks in gold at low opacity behind the text

2. **Metrics animation**: The metrics (30+, 4+, 15+) should animate with a **count-up effect** when they scroll into view. This is a key detail on professional agency sites.
   ```tsx
   // Use a counter animation hook
   function useCountUp(target: number, duration: number = 2000) {
     const [count, setCount] = useState(0)
     const ref = useRef(null)
     const isInView = useInView(ref, { once: true })

     useEffect(() => {
       if (!isInView) return
       let start = 0
       const increment = target / (duration / 16)
       const timer = setInterval(() => {
         start += increment
         if (start >= target) {
           setCount(target)
           clearInterval(timer)
         } else {
           setCount(Math.floor(start))
         }
       }, 16)
       return () => clearInterval(timer)
     }, [isInView, target, duration])

     return { count, ref }
   }
   ```
   Display: `30+` should animate from `0+` → `30+` over ~2 seconds with an ease-out curve.

3. **Client type badges**: Currently plain gray pills. Upgrade to:
   - Add a subtle gold left-border or dot indicator
   - On hover, shift background to `accent-pale` with a smooth transition
   - Consider arranging in a more visual layout (not just a flex-wrap of pills)

4. **Section background**: The rounded card container is good but add a subtle inner shadow or gradient for depth:
   ```
   bg-gradient-to-br from-background-card to-white
   ```

5. **Add a decorative sketch element**: A small hand-drawn underline or squiggle below the "About beehoop" label, using SVG path animation.

---

## 7. SERVICES SECTION

### Current State
- 2x2 grid of ServiceCard components inside a gray rounded container
- Each card: icon in pale gold background + title + description
- Basic hover: border turns gold + shadow appears

### Required Changes

1. **Convert to individual service pages**: Digital Kitchen has dedicated pages for each service (SEO, Analytics, SMM, etc.). Create individual pages:
   - `/services/strategy-development`
   - `/services/mergers-and-acquisitions`
   - `/services/brand-and-market-strategy`
   - `/services/financial-and-data-analytics`

   Each service page should contain:
   - Hero with Lottie animation specific to that service
   - Detailed description (3-4 paragraphs)
   - Key deliverables list
   - Process timeline (numbered steps)
   - Related case studies
   - FAQ accordion
   - CTA to contact

2. **Service card redesign**:
   - Make cards clickable (link to service pages)
   - Replace Lucide icons with animated Lottie icons OR SVG icons with the pencil-sketch filter + path-drawing animation on scroll-enter
   - Add a right-arrow indicator showing the card is clickable
   - Increase card padding and make the icon area larger (64x64 instead of 48x48)
   - Add a number indicator: "01", "02", "03", "04" in large, faded text behind each card

3. **Grid layout**: Consider a 1x4 vertical layout on desktop (full-width cards) for a more editorial feel, or keep 2x2 but add more vertical space. Digital Kitchen uses full-width service cards with icon + title + description in a horizontal layout.

4. **Hover animation**: On hover, the Lottie icon should play its animation. Add a subtle `translateY(-4px)` lift. The gold border should animate in from one corner, not just appear.

5. **Section heading**: Add a brief subheadline below "Our Services" describing the service philosophy.

---

## 8. CASE STUDIES SECTION

### Current State
- 3-column grid, 6 case study cards
- Each card: tag badge + client name + outcome heading + description + "Read more" link
- No filtering, no images, no metrics visualization

### Required Changes

1. **Add filtering system**: Digital Kitchen has filters for service type, industry, and geography. Implement:
   ```
   Filter bar: [All] [Strategy] [M&A] [Brand] [Analytics]
   Sub-filters: [All Industries] [Energy] [Real Estate] [Financial Services] ...
   ```
   Use animated filter transitions (Framer Motion `layout` prop for smooth reflow).

2. **Card redesign**:
   - Add an SVG illustration or image to each case study card (top section of card). Use pencil-sketch style illustrations representing the industry.
   - Add prominent **metrics/results** displayed visually — e.g., "670% ROI" or "+45% revenue" in large gold text
   - Add directional arrows (↑ for growth) next to key metrics
   - Increase card size and spacing

3. **Individual case study pages**: Each "Read more" should link to a dedicated case study page with:
   - Full-width hero with industry illustration
   - Challenge → Approach → Results narrative
   - Key metrics dashboard
   - Testimonial from the client
   - Related case studies carousel at the bottom

4. **Grid layout options**: Consider alternating between a large featured card (spanning 2 columns) and smaller cards for visual variety.

5. **Pagination or "Load more"**: If showing 30+ cases (the data file has 30+), implement lazy loading or a "View all cases" button.

---

## 9. TESTIMONIALS SECTION (NEW)

### Current State
- Does not exist

### Required Changes

**Create a new `Testimonials.tsx` section** between Case Studies and Contact.

**Design specification:**
- Section background: Off-white or very light cream (#FFF9F0)
- Section title: "What our clients say" with the standard accent label above
- Carousel/slider layout showing one testimonial at a time with navigation arrows
- Each testimonial includes:
  - Large quotation marks in gold (decorative, background)
  - Client quote text (Syne italic, large size ~24px)
  - Client name (bold)
  - Client title and company
  - Client company logo (grayscale)
  - Optional: Client photo in a circular frame
- Navigation: Left/right arrows + dot indicators
- Auto-advance every 6 seconds with pause on hover
- Smooth slide transition animation (horizontal slide or fade)

**Implementation**: Use Framer Motion with `AnimatePresence` for slide transitions. Store testimonials in `data.ts`.

---

## 10. PROCESS/HOW WE WORK SECTION (NEW)

### Current State
- Does not exist

### Required Changes

**Create a new `Process.tsx` section** after Services.

**Design specification:**
- Section background: White
- Title: "How we work" with accent label
- 5-step numbered vertical timeline:
  ```
  01 — Discovery & Diagnosis
       Brief description of initial assessment phase...

  02 — Strategic Framework
       Brief description of framework development...

  03 — Deep Analysis
       Brief description of data analysis phase...

  04 — Solution Design
       Brief description of solution architecture...

  05 — Execution & Support
       Brief description of implementation support...
  ```
- **Visual treatment**:
  - Large numbers ("01") in Syne bold, gold color, partially behind the text
  - Vertical connecting line (thin, gold, dashed) linking the steps
  - Each step animates in from left on scroll (staggered)
  - On hover, each step could expand to show more detail (accordion-style)
- **Pencil-sketch element**: A hand-drawn vertical line connecting the steps instead of a perfect straight line

---

## 11. CLIENT LOGOS SECTION (NEW)

### Current State
- Client types listed as text badges ("Leading Conglomerates", "Multinational Corporations", etc.)
- No actual client logos

### Required Changes

**Create a new `ClientLogos.tsx` section** or integrate into the About section.

**Design specification:**
- Title: "Trusted by" or "Our Clients" with accent label
- Horizontal scrolling logo marquee (infinite scroll animation)
- Logos displayed in grayscale with low opacity (0.5), turning full color or higher opacity on hover
- Two rows scrolling in opposite directions for visual interest
- Smooth, continuous scroll — not jerky

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.logo-marquee {
  animation: marquee 30s linear infinite;
}
```

**Note**: If actual client logos are not available, display the client type names in a styled marquee format, using the organization names from case studies as indicators.

---

## 12. ACHIEVEMENT BADGES SECTION (NEW)

### Current State
- Does not exist

### Required Changes

**Create an `Achievements.tsx` component** — a horizontal row of trust signals.

**Design specification:**
- Place between About and Services (or at the bottom of the About section)
- Show credibility indicators similar to Digital Kitchen's Clutch/Google/Facebook badges:
  - Industry association logos
  - Client satisfaction ratings
  - Years of experience badge
  - Number of countries operated in
- Displayed as a centered, horizontal row of badge cards
- Each badge: small icon/logo + metric + label
- Subtle entrance animation (fade-in from bottom, staggered)
- Muted styling — should not dominate, just add credibility

---

## 13. BLOG PREVIEW SECTION (NEW)

### Current State
- Does not exist

### Required Changes

**Create a `BlogPreview.tsx` section** near the bottom of the page.

**Design specification:**
- Title: "Insights" or "Latest thinking" with accent label
- 3-column grid showing the latest 3 blog posts
- Each blog card:
  - Featured image or illustration (pencil-sketch style)
  - Category tag
  - Post title (Syne, bold)
  - Brief excerpt (2 lines max)
  - Author name + date
  - Read time estimate
- "View all insights →" link below the grid
- This section establishes thought leadership

**Note**: For now, create placeholder blog posts. The structure should support a future blog. Create placeholder pages at `/insights` and `/insights/[slug]`.

---

## 14. CONTACT SECTION

### Current State
- Dark background with bee watermark
- Centered text: heading + subtitle + mailto button + email address
- No actual form, just a mailto link

### Required Changes

1. **Add a proper contact form**: Replace the mailto-only approach with a full form:
   ```
   ┌──────────────────────────────────────────────┐
   │  Your name                                    │
   │  Your email                                   │
   │  Company name                                 │
   │  How can we help? [Dropdown: Strategy / M&A / │
   │                    Brand / Analytics / Other]  │
   │  Tell us more (textarea)                      │
   │                                               │
   │  [Send message →]                             │
   └──────────────────────────────────────────────┘
   ```

2. **Layout**: Two-column on desktop:
   - Left: Heading, subtitle, direct contact info (email, phone), social links
   - Right: Contact form

3. **Background enhancement**:
   - Use the `gradient-dark-navy` gradient instead of flat #0D0D0D
   - Add the noise overlay for texture
   - Keep the bee watermark but make it a sketch-style outline SVG instead of a low-opacity PNG
   - Add subtle floating particles or dots in the background (very low opacity, slow animation)

4. **Form styling**:
   - Transparent/dark input fields with bottom-border only (no full borders)
   - Gold accent on focus state
   - Smooth label animation (label moves up when input is focused/filled)
   - Submit button with gold gradient background

5. **Add Lottie animation**: A pencil-sketch illustration of communication/connection on the left side or as a background element.

6. **Add a "bonus" incentive** like Digital Kitchen does — e.g., "Free initial consultation" badge near the form.

---

## 15. FOOTER

### Current State
- Dark background
- Single row: logo on left, copyright on right
- No links, no navigation, no social icons, no contact info

### Required Changes

**Complete footer redesign:**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  [beehoop logo]              Services          Company          │
│                              Strategy Dev.     About            │
│  Strategy, Financial,        M&A              Case Studies      │
│  and Branding Advisory       Brand Strategy    Insights         │
│                              Analytics         Contact          │
│                                                                 │
│  hello@beehoop.com           Follow Us                          │
│  +[phone number]             LinkedIn | Twitter                 │
│  [Address]                                                      │
│                                                                 │
│─────────────────────────────────────────────────────────────────│
│  © 2026 beehoop. All rights reserved.        Privacy | Terms   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Specific details:**
- Background: Same dark navy as contact section (seamless transition)
- 4-column grid: Brand info | Services links | Company links | Social/Legal
- Footer links: All nav sections + new pages
- Social icons: LinkedIn and Twitter/X at minimum (use Lucide or custom SVG)
- Add a "Back to top" button (circular, gold accent, with smooth scroll)
- Decorative top border: A thin gold gradient line or hand-drawn sketch line
- Responsive: Stack to 2 columns on tablet, single column on mobile

---

## 16. SCROLL ANIMATIONS & MOTION DESIGN

### Current State
- Only `AnimatedSection` wrapper: opacity 0→1, y: 32→0, duration 0.5s
- Triggers once at -80px margin
- All sections use the same animation — no variety

### Required Changes

1. **Diversify entrance animations**:
   - Sections entering from left: `x: -40, opacity: 0` → `x: 0, opacity: 1`
   - Sections entering from right: `x: 40, opacity: 0` → `x: 0, opacity: 1`
   - Sections with scale: `scale: 0.95, opacity: 0` → `scale: 1, opacity: 1`
   - Keep the standard `y: 32` for default, but alternate for visual variety

2. **Staggered children animation**: When a section enters view, its children should animate in with staggered delays (0.1s between each). Use Framer Motion's `staggerChildren`:
   ```tsx
   const containerVariants = {
     hidden: {},
     visible: {
       transition: { staggerChildren: 0.1 }
     }
   }
   ```

3. **Parallax scrolling**: Apply subtle parallax to:
   - Hero illustration (moves slower than text)
   - Background decorative elements
   - Section dividers
   Use `useScroll` + `useTransform` from Framer Motion.

4. **Smooth scroll with easing**: The current `scroll-behavior: smooth` is browser-native. For more control, consider implementing custom smooth scrolling with configurable easing curves (or use a library like `lenis` for butter-smooth scrolling):
   ```bash
   npm install @studio-freight/lenis
   ```

5. **Text reveal animations**: For key headings, implement a text reveal effect where each word or line appears with a clip-mask animation:
   ```css
   @keyframes reveal-up {
     from { clip-path: inset(100% 0 0 0); transform: translateY(20px); }
     to { clip-path: inset(0 0 0 0); transform: translateY(0); }
   }
   ```

6. **Section transitions**: Add subtle visual separators between sections — a thin line, a gradient fade, or a hand-drawn sketch divider that animates in on scroll.

---

## 17. HOVER EFFECTS & MICRO-INTERACTIONS

### Current State
- Cards: border color change + shadow-md on hover
- Buttons: background color change
- Nav links: underline width animation
- "Read more": gap increase + arrow translate

### Required Changes

1. **Card hover enhancement**:
   - Add `transform: translateY(-4px)` lift on hover (cards feel like they're floating up)
   - Shadow transition: `shadow-none` → `shadow-lg` with a gold-tinted shadow: `shadow-[0_8px_30px_rgba(200,146,10,0.08)]`
   - Border transition: animate from one corner, not instant swap
   - Background: subtle gradient shift on hover

2. **Button hover states**:
   - Primary CTA: Scale up 2%, add glow shadow, icon arrow bounces
   - Secondary (text) buttons: Underline draws in from left (like nav links)
   - Outline buttons: Fill with gold from left to right on hover

3. **Image/illustration hover**: On any illustration, apply a subtle `scale(1.03)` with overflow hidden on the container for a zoom effect.

4. **Link hover**: All text links should have a smooth underline draw-in effect (not just nav links).

5. **Custom cursor** (optional but impactful): On hover over interactive elements, change the cursor to a custom circular indicator:
   ```css
   .interactive-hover {
     cursor: none;
   }
   /* Create a custom cursor follower with JS */
   ```
   This is a nice-to-have. Only implement if time permits.

6. **Focus states**: Ensure all interactive elements have visible focus rings for keyboard navigation (gold outline with offset).

---

## 18. MOBILE & TABLET OPTIMIZATION

### Current State
- Basic responsive: stacking columns on mobile
- Hero SVG hidden on mobile entirely
- Mobile menu is a plain white overlay
- Typography scales down but not optimally

### Required Changes

1. **Hero on mobile**:
   - Show the Lottie/SVG illustration on mobile — place it above or below the text at a smaller scale
   - Reduce hero padding on mobile: `py-16` instead of `py-24`
   - Hero heading: `text-4xl` on mobile (currently `text-5xl` — slightly too large for small phones)
   - Center-align text and CTAs on mobile for cleaner appearance

2. **Touch-friendly targets**: Ensure all buttons and links have at least 44x44px touch targets (Apple guideline). Current pill buttons at `px-7 py-4` are good; verify all interactive elements meet this.

3. **Tablet-specific layout** (768px-1024px):
   - Services: Keep 2x2 grid but increase card padding
   - Case Studies: 2-column grid (not 3)
   - About: Consider keeping 2-column but with reduced gap
   - Contact form: Full-width on tablet

4. **Mobile menu upgrade** (covered in Section 4 but reiterating):
   - Animated entrance (slide down, not instant appear)
   - Staggered link animations
   - Background illustration
   - Close on scroll

5. **Swipe gestures**: On mobile, the testimonials carousel should support swipe left/right gestures.

6. **Reduce animation intensity on mobile**: Some animations that look great on desktop can feel laggy on mobile. For mobile devices:
   - Reduce parallax intensity or disable
   - Simplify Lottie animations (fewer frames)
   - Reduce stagger delays (faster entrance)
   - Disable noise overlay (performance)

   Detect mobile with a hook:
   ```tsx
   const isMobile = useMediaQuery('(max-width: 768px)')
   ```

7. **Viewport height handling**: Use `min-h-[100dvh]` instead of `min-h-[90vh]` for the hero on mobile (accounts for mobile browser chrome).

8. **Font sizes on mobile** (review all):
   ```
   Hero h1: text-4xl (not 5xl)
   Section h2: text-2xl (not 3xl)
   Body: text-base (16px) — keep as is
   Labels: text-xs — keep as is
   Metrics values: text-2xl (not 3xl-4xl)
   ```

9. **Horizontal scroll prevention**: Ensure no element causes horizontal overflow on mobile. Add to globals.css:
   ```css
   html, body {
     overflow-x: hidden;
   }
   ```

10. **Sticky CTA on mobile**: Add a fixed-bottom bar on mobile with the primary CTA ("Start a conversation") that appears after scrolling past the hero section. This increases conversion.

---

## 19. PAGE TRANSITIONS & LOADING

### Current State
- No page transitions
- No loading screen
- Instant render (which is fine for static but lacks polish)

### Required Changes

1. **Loading screen/preloader**:
   - On initial page load, show a brief (1-2 second) loading animation:
     - White background
     - Centered beehoop logo mark (bee icon)
     - Logo animates: pencil-sketch path draws the logo outline, then gold fills in
     - Fade out to reveal the page
   - Use React state to control: `const [loading, setLoading] = useState(true)`
   - After `window.onload` + minimum 1.5s, `setLoading(false)` with fade-out transition

2. **Page transition animations** (for multi-page architecture):
   - When navigating between pages, use a smooth transition:
     - Current page fades out (opacity 1→0, slight y shift)
     - New page fades in (opacity 0→1, slight y shift)
   - Implement using Next.js App Router with Framer Motion `AnimatePresence`:
   ```tsx
   // In layout.tsx or a transition wrapper
   <AnimatePresence mode="wait">
     <motion.div
       key={pathname}
       initial={{ opacity: 0, y: 20 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -20 }}
       transition={{ duration: 0.3 }}
     >
       {children}
     </motion.div>
   </AnimatePresence>
   ```

3. **Route prefetching**: Next.js handles this automatically with `<Link>`, but ensure all navigation uses `<Link>` component instead of `<a>` tags for client-side navigation.

---

## 20. MULTI-PAGE ARCHITECTURE

### Current State
- Single page with anchor links (#about, #services, #cases, #contact)
- No routing beyond index

### Required Changes

**Convert to multi-page site:**

```
/                           → Home (current, streamlined)
/about                      → Full about page
/services                   → Services overview
/services/[slug]            → Individual service pages (4 pages)
/cases                      → All case studies with filtering
/cases/[slug]               → Individual case study pages
/insights                   → Blog listing
/insights/[slug]            → Individual blog posts
/contact                    → Dedicated contact page
```

**Home page**: Keep all sections but as condensed previews with "Learn more →" links to full pages. The home page should be an appetizer, not the full meal.

**Routing setup**: Create the following directory structure:
```
src/app/
├── page.tsx                    (Home)
├── about/
│   └── page.tsx
├── services/
│   ├── page.tsx                (Services overview)
│   └── [slug]/
│       └── page.tsx            (Individual service)
├── cases/
│   ├── page.tsx                (All cases with filters)
│   └── [slug]/
│       └── page.tsx            (Individual case study)
├── insights/
│   ├── page.tsx                (Blog listing)
│   └── [slug]/
│       └── page.tsx            (Individual post)
├── contact/
│   └── page.tsx                (Contact page)
└── layout.tsx                  (Root layout with nav + footer)
```

**Update Navbar**: Change from anchor links to Next.js `<Link>` components for page navigation. Keep smooth scroll for same-page anchors.

**Update `next.config.mjs`**: Remove `output: 'export'` if dynamic routing is needed, OR use `generateStaticParams` for all dynamic routes to maintain static export capability.

---

## 21. PERFORMANCE & SEO

### Current State
- Static export configured
- Images unoptimized (required for static export)
- Basic meta title and description
- No structured data
- No Open Graph tags

### Required Changes

1. **Structured data (JSON-LD)**:
   Add Organization, WebPage, and BreadcrumbList structured data (matching what Digital Kitchen implements):
   ```tsx
   // In layout.tsx or a separate component
   <script type="application/ld+json" dangerouslySetInnerHTML={{
     __html: JSON.stringify({
       "@context": "https://schema.org",
       "@type": "Organization",
       "name": "beehoop",
       "url": "https://beehoop.com",
       "description": "Strategy, Financial, and Branding Advisory",
       "sameAs": ["https://linkedin.com/company/beehoop"]
     })
   }} />
   ```

2. **Open Graph & Twitter meta tags**: Add to `layout.tsx` metadata:
   ```tsx
   export const metadata = {
     title: 'beehoop — Strategy & Management Consulting',
     description: '...',
     openGraph: {
       title: 'beehoop — Strategy & Management Consulting',
       description: '...',
       type: 'website',
       url: 'https://beehoop.com',
       images: [{ url: '/og-image.png', width: 1200, height: 630 }],
     },
     twitter: {
       card: 'summary_large_image',
       title: 'beehoop',
       description: '...',
       images: ['/og-image.png'],
     },
   }
   ```

3. **Image optimization**: Create an OG image (1200x630) featuring the beehoop brand. Add favicon set (16x16, 32x32, apple-touch-icon).

4. **Performance**:
   - Lazy-load all Lottie animations below the fold
   - Use `next/dynamic` for heavy components with `{ ssr: false }`
   - Add `loading="lazy"` to all non-critical images
   - Minimize CSS — purge unused Tailwind classes (already configured)
   - Consider using `will-change: transform` sparingly for animated elements

5. **Sitemap**: Add a `sitemap.ts` in the app directory for automatic sitemap generation.

---

## 22. ACCESSIBILITY

### Current State
- Basic alt text on images
- aria-label on SVG illustration
- Semantic HTML (sections, nav, footer)
- Body scroll lock on mobile menu

### Required Changes

1. **Focus management**: When mobile menu opens, focus should move to the first menu item. When it closes, focus should return to the hamburger button.

2. **Skip navigation link**: Add a "Skip to main content" link at the very top of the page (hidden visually, visible on focus):
   ```tsx
   <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded">
     Skip to main content
   </a>
   ```

3. **ARIA landmarks**: Ensure all sections have appropriate `role` attributes or use semantic HTML elements.

4. **Color contrast**: Verify all text/background combinations meet WCAG AA contrast ratios. The current `text-muted` (#9CA3AF) on white may be too low contrast.

5. **Reduced motion**: Respect `prefers-reduced-motion` media query:
   ```css
   @media (prefers-reduced-motion: reduce) {
     *, *::before, *::after {
       animation-duration: 0.01ms !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

6. **Form accessibility**: Label all form inputs, provide error messages, ensure keyboard navigation works through the form.

---

## IMPLEMENTATION ORDER (RECOMMENDED)

Execute in this sequence for maximum efficiency:

1. **Typography & Colors** (Sections 1-2) — Foundation changes that affect everything
2. **Lottie & Sketch Animations** (Section 3) — Install dependencies, create animation components
3. **Navigation** (Section 4) — Global component, affects all pages
4. **Hero Section** (Section 5) — Highest-impact visual section
5. **About & Metrics** (Section 6) — Count-up animations, badges
6. **Services** (Section 7) — Cards + beginning of service pages
7. **Case Studies** (Section 8) — Filtering, card redesign
8. **New Sections** (Sections 9-13) — Testimonials, Process, Logos, Blog
9. **Contact & Footer** (Sections 14-15) — Form + full footer
10. **Scroll & Hover Effects** (Sections 16-17) — Polish layer
11. **Mobile Optimization** (Section 18) — Responsive refinement
12. **Multi-Page & Transitions** (Sections 19-20) — Architecture expansion
13. **Performance & Accessibility** (Sections 21-22) — Final quality pass

---

## KEY DEPENDENCIES TO INSTALL

```bash
npm install lottie-react @studio-freight/lenis
```

Optional but recommended:
```bash
npm install @formspree/react   # For contact form handling
npm install sharp               # For image optimization (if removing static export)
```

---

## CRITICAL REMINDERS

- **Pencil-sketch aesthetic is the signature** — Every illustration, icon, and decorative element should feel hand-drawn. Use SVG filters (`feTurbulence` + `feDisplacementMap`) and path-drawing animations (`stroke-dasharray/dashoffset`) throughout.
- **Animations should be subtle and purposeful** — Never flashy. Ease-out curves, gentle timing (0.3-0.6s), and staggered reveals.
- **Typography contrast matters** — Syne for headings (bold, geometric) vs. Nunito for body (soft, rounded) creates professional tension.
- **Dark sections need depth** — Gradients + noise texture + layered elements (not flat black).
- **Mobile is not an afterthought** — Every feature must work beautifully on mobile. Test at 375px (iPhone SE) and 768px (iPad).
- **Content-first** — The design should serve the consulting brand's authority. Every animation and visual choice should reinforce trust and expertise.
