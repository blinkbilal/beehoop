# Comprehensive Beehoop Website Upgrade Prompt — V2

> **Context**: You are upgrading the Beehoop website (Next.js 14, TypeScript, Tailwind CSS, Framer Motion, Lenis). The site is inspired by [digitalkitchen.agency](https://digitalkitchen.ua) but currently sits at ~30% of that quality level. This prompt covers EVERY gap. Execute changes section by section. Do not skip any item. Confirm each section works before moving to the next.

---

## TABLE OF CONTENTS

1. [CRITICAL: Performance & Logo Fixes](#1-critical-performance--logo-fixes)
2. [CRITICAL: Lottie Pencil-Sketch Animations](#2-critical-lottie-pencil-sketch-animations)
3. [Typography Refinements](#3-typography-refinements)
4. [Color System & Visual Depth](#4-color-system--visual-depth)
5. [Hero Section Overhaul](#5-hero-section-overhaul)
6. [Navigation & Header Polish](#6-navigation--header-polish)
7. [About Section Enhancement](#7-about-section-enhancement)
8. [Achievements Section](#8-achievements-section)
9. [Services Section & Service Pages](#9-services-section--service-pages)
10. [Process/How We Work](#10-processhow-we-work)
11. [Case Studies & Case Pages](#11-case-studies--case-pages)
12. [Client Logos Marquee](#12-client-logos-marquee)
13. [Testimonials Carousel](#13-testimonials-carousel)
14. [Blog Preview & Blog Pages](#14-blog-preview--blog-pages)
15. [Contact Section](#15-contact-section)
16. [Footer](#16-footer)
17. [Scroll Animations & Motion Design](#17-scroll-animations--motion-design)
18. [Hover Effects & Micro-Interactions](#18-hover-effects--micro-interactions)
19. [Mobile & Tablet Optimization](#19-mobile--tablet-optimization)
20. [Page Loader & Transitions](#20-page-loader--transitions)
21. [SEO & Metadata](#21-seo--metadata)
22. [Accessibility](#22-accessibility)

---

## CURRENT STATE SNAPSHOT

**Tech stack**: Next.js 14.2.25, React 18, TypeScript 5, Tailwind CSS 3.4, Framer Motion 11, Lenis smooth scroll, lottie-react (installed but unused), Lucide icons.

**Architecture**: Multi-page site with App Router. Pages: `/`, `/about`, `/services`, `/services/[slug]`, `/cases`, `/cases/[slug]`, `/insights`, `/insights/[slug]`, `/contact`. Static export to GitHub Pages with `basePath: '/beehoop'`.

**Key problems to fix**:
- **LOGOS DO NOT LOAD**: Three PNG logos in `/public/` are catastrophically oversized (logo-with-name.png is 26,678×7,995px / 1.7MB, name-colored.png is 17,667×5,337px / 823KB, logo.png is 1,570×1,571px / 85KB). These cause massive memory pressure, slow decoding, and likely fail to render on mobile devices entirely.
- **SITE FEELS HEAVY AND SLOW WHEN SCROLLING**: Caused by (a) the oversized images above, (b) Lenis smooth scroll adding overhead on top of many Framer Motion intersection observers firing simultaneously, (c) every section wrapped in `AnimatedSection` with `useInView` — creating dozens of active observers, (d) the `noise-overlay` CSS uses an inline SVG data URI with `feTurbulence` filter that's computationally expensive to render at full viewport size, (e) the `sketch-wobble` filter (`feTurbulence` + `feDisplacementMap`) on the hero SVG is GPU-intensive.
- **LOTTIE INSTALLED BUT NEVER USED**: `lottie-react` is in package.json and `LottieAnimation.tsx` component exists, but zero Lottie animations are actually on any page. The site has no pencil-sketch animated illustrations at all — just a static SVG hexagon network in the hero.
- **NO VISUAL RICHNESS**: Compared to Digital Kitchen, which has rich Lottie hero animations, SVG case study illustrations, timeline graphics, team photos, and dense visual content — Beehoop is text-heavy with minimal visual interest.

---

## 1. CRITICAL: PERFORMANCE & LOGO FIXES

### 1A. Fix Oversized Logo Images

This is the #1 priority. The current PNG files are unusable at their current dimensions.

**Actions:**
1. **Resize all logos** to appropriate web dimensions:
   - `logo.png` (bee icon): Resize to **200×200px**, optimize as PNG with compression. Target: <15KB.
   - `logo-with-name.png` (bee + "beehoop" text): Resize to **400×120px**, optimize. Target: <30KB.
   - `name-colored.png` ("beehoop" text only): Resize to **300×90px**, optimize. Target: <20KB.

2. **Convert to WebP with PNG fallback** (optional but recommended):
   ```
   logo.webp (200×200, ~8KB)
   logo-with-name.webp (400×120, ~15KB)
   name-colored.webp (300×90, ~10KB)
   ```

3. **Add explicit `width` and `height` attributes** on every `<Image>` to prevent layout shift. Verify all Image components use appropriate display dimensions, not the source dimensions.

4. **Add a favicon**: Currently `favicon.ico` is referenced in metadata but doesn't exist in `/public/`. Create one from the bee logo at 32×32px and 16×16px.

### 1B. Fix Scroll Performance

**Problem**: Multiple performance bottlenecks compound:
- Lenis smooth scroll + dozens of Framer Motion `useInView` observers = excessive layout recalculations per frame
- `noise-overlay::before` pseudo-element with `feTurbulence` SVG filter renders continuously
- `sketch-wobble` filter with `feTurbulence` + `feDisplacementMap` is GPU-expensive on the hero SVG
- `logo-marquee` CSS animation runs continuously even when off-screen

**Fixes:**

1. **Optimize the noise overlay** — Replace the SVG filter approach with a static noise texture PNG (much cheaper to render):
   ```css
   /* REPLACE the current .noise-overlay::before */
   .noise-overlay::before {
     content: '';
     position: absolute;
     inset: 0;
     /* Use a tiny repeating noise tile instead of live SVG filter */
     background-image: url('/textures/noise.png');
     background-repeat: repeat;
     background-size: 200px 200px;
     opacity: 0.03;
     pointer-events: none;
     z-index: 1;
   }
   ```
   Create a 200×200px noise texture PNG (grayscale, subtle grain). This is infinitely cheaper than a live `feTurbulence` filter.

2. **Optimize the pencil-sketch filter** — The `#pencil-texture` SVG filter with `feTurbulence` is too expensive for the large hero SVG. Either:
   - Remove `sketch-wobble` class from the hero SVG entirely and rely on the path-drawing animation alone for the sketch feel, OR
   - Apply the filter only once to a static rendered image (pre-bake it), OR
   - Reduce `numOctaves` from 4 to 2 and increase `baseFrequency` from 0.03 to 0.05 (less detail = faster rendering)

3. **Optimize AnimatedSection observers** — The current setup creates a new `useInView` hook for every `AnimatedSection` instance. On the home page, there are 20+ instances firing simultaneously.
   - Add `amount: 0.1` to the `useInView` options (trigger earlier, less sensitive)
   - Consider using a single `IntersectionObserver` with a shared callback instead of per-component observers
   - OR use CSS `@keyframes` + `animation-timeline: view()` for simple fade-in animations (zero JS overhead, but check browser support)

4. **Pause off-screen animations**:
   - The marquee CSS animation in `ClientLogos` runs continuously. Add `will-change: transform` and ensure it only animates when in viewport.
   - The testimonial auto-rotate timer runs even when the section is off-screen. Guard it with an `isInView` check.

5. **Lenis configuration** — The current Lenis setup runs `requestAnimationFrame` in a continuous loop. This is correct behavior for Lenis, but ensure it doesn't conflict with Framer Motion's own RAF loop. Consider:
   ```tsx
   // In SmoothScroll.tsx, integrate with Framer Motion's frame loop
   import { useAnimationFrame } from 'framer-motion'

   // Replace the manual RAF loop with:
   useAnimationFrame((time) => {
     lenisRef.current?.raf(time)
   })
   ```
   This unifies the animation loops into one RAF cycle instead of two competing ones.

6. **Image lazy loading** — All images below the fold should have `loading="lazy"`. Only the hero logo and navbar logo should have `priority`.

### 1C. Fix basePath for GitHub Pages

The `basePath: '/beehoop'` in `next.config.mjs` means:
- Next.js `<Image>` components automatically prepend `/beehoop/` to `src` paths — this should work.
- But verify that `<Image src="/logo.png" ...>` resolves to `/beehoop/logo.png` in the built output.
- If logos still don't load in production, the issue is likely the browser failing to decode the massive images (26,678px wide). Resizing (Step 1A) will fix this.

---

## 2. CRITICAL: LOTTIE PENCIL-SKETCH ANIMATIONS

This is the most significant visual gap between Beehoop and Digital Kitchen. DK uses Lottie JSON animations for hero illustrations and service icons. Beehoop has `lottie-react` installed and a `LottieAnimation.tsx` wrapper but uses it NOWHERE.

### 2A. Create Lottie Animation Files

You need to create custom Lottie JSON animations that match the **pencil-sketch / hand-drawn aesthetic**. These should:
- Use **stroke-based line art** that appears to draw itself (path animation)
- Have **slightly organic, imperfect lines** — not perfectly geometric
- Use **monochrome strokes** (dark gray/black `#0A0A0A`) with **gold accent fills** (`#F5C842`)
- Loop smoothly with ease-in-out timing
- Be lightweight (<50KB per JSON file)

**Required Lottie files** (save in `/public/animations/`):

1. **`hero-network.json`** — A strategic network/constellation diagram being drawn. Nodes connect with lines, key nodes fill with gold. Should convey strategy/connections/systems thinking. This replaces the static SVG hexagon network currently in the hero. Must loop, ~3-4 second cycle.

2. **`strategy-icon.json`** — A compass being drawn with pencil strokes. For the Strategy Development service card and page. ~2 second play-once animation.

3. **`mergers-icon.json`** — Two arrows/paths merging into one, drawn in sketch style. For M&A & Transactions. ~2 second play-once.

4. **`brand-icon.json`** — A brush stroke creating a mark/shape. For Brand & Market Strategy. ~2 second play-once.

5. **`analytics-icon.json`** — A bar chart being drawn line by line, with data points appearing. For Financial & Data Analytics. ~2 second play-once.

6. **`contact-conversation.json`** — Two speech bubbles or connecting paths being drawn. For the Contact section background. Loops, ~3 second cycle.

7. **`loading-bee.json`** — The bee logo being drawn with a single continuous pencil line. For the page loader. Play-once, ~1.5 seconds.

8. **`process-flow.json`** — (Optional) A flowing line connecting dots/steps. For the Process section.

**How to create these**: Use [LottieFiles](https://lottiefiles.com) to find hand-drawn / line-art animations, or create them in After Effects with the Bodymovin plugin. Search for: "hand drawn", "line art", "sketch", "pencil drawing", "path animation". Alternatively, generate them programmatically using the Lottie JSON spec with path keyframes.

**If you cannot create Lottie files**, implement the equivalent using **SVG path-drawing animations** as described in Section 2B.

### 2B. SVG Path-Drawing Animation Fallback

For each illustration where a Lottie file isn't available, create SVG illustrations with CSS path-drawing animations:

```tsx
// Example: Animated compass for Strategy service
function SketchCompass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer circle */}
      <circle
        cx="32" cy="32" r="28"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        className="sketch-path"
        style={{ animationDelay: '0s' }}
      />
      {/* Compass needle */}
      <path
        d="M32 8 L36 32 L32 56 L28 32 Z"
        stroke="#0A0A0A"
        strokeWidth="1.5"
        fill="none"
        className="sketch-path"
        style={{ animationDelay: '0.5s' }}
      />
      {/* North fill */}
      <path
        d="M32 8 L36 32 L28 32 Z"
        fill="#F5C842"
        opacity="0"
        className="sketch-fill"
        style={{ animationDelay: '1s' }}
      />
      {/* Center dot */}
      <circle cx="32" cy="32" r="2" fill="#0A0A0A" opacity="0" className="sketch-fill" style={{ animationDelay: '1.2s' }} />
    </svg>
  )
}
```

Add the fill animation to globals.css:
```css
@keyframes sketch-fill {
  from { opacity: 0; }
  to { opacity: 1; }
}
.sketch-fill {
  animation: sketch-fill 0.5s ease-out forwards;
}
```

Create similar SVG illustrations for:
- **M&A**: Two parallel paths that converge into one (merger metaphor)
- **Brand**: A brush stroke creating a swoosh mark
- **Analytics**: Bar chart with 4 bars drawing up sequentially
- **Hero**: Larger network diagram with connected nodes (replace current hexagons)
- **Contact**: Two speech bubble outlines connecting

### 2C. Integrate Animations Into Components

1. **Hero** (`Hero.tsx`):
   - Replace the entire static SVG block (lines 110-213) with either:
     - `<LottieAnimation animationData={heroNetwork} className="w-full max-w-[520px]" />`, OR
     - A new `<SketchNetworkIllustration />` SVG component with path-drawing animations
   - The illustration should be visible on ALL screen sizes (currently hidden below `lg` breakpoint — show it on mobile too, above or below the text)

2. **Service cards** (`ServiceCard.tsx`):
   - Replace the static Lucide icon with an animated SVG sketch icon that plays its drawing animation when the card scrolls into view
   - On hover, replay the animation or add a subtle pulse effect
   - In the icon container (`w-16 h-16 rounded-xl bg-accent-pale`), render the sketch SVG instead of the Lucide `<IconComponent>`

3. **Service detail pages** (`ServiceDetail.tsx`):
   - Add a larger version of the service's sketch illustration in the hero section
   - Animate it on page load

4. **Contact section** (`Contact.tsx`):
   - Add a Lottie or SVG sketch illustration on the left side, below the "Free initial consultation" badge
   - Or use it as a subtle background element in the dark section

5. **Page loader** (`PageLoader.tsx`):
   - Replace the static `<Image src="/logo.png">` with an animated sketch of the bee logo being drawn
   - Use Lottie `loading-bee.json` or an SVG with path-drawing animation

6. **Case study cards** (`CaseCard.tsx`):
   - Add a small decorative sketch element at the top of each card (industry-specific: building for real estate, ship for shipping, chart for analytics, etc.)
   - These can be simple 2-3 path SVG sketches

### 2D. Pencil Texture Effect (Refined)

The current `#pencil-texture` SVG filter is too expensive. Replace with a lighter approach:

```css
/* Remove the sketch-wobble class from Hero SVG */
/* Instead, apply subtle imperfection via CSS only on static elements */
.sketch-style {
  /* Use a very subtle drop-shadow to simulate pencil edge */
  filter: drop-shadow(0.5px 0.5px 0px rgba(10, 10, 10, 0.15));
}
```

Or keep the SVG filter but only apply it to small, isolated elements (icons, not the full hero illustration):
```xml
<filter id="pencil-texture">
  <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="noise" />
  <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.8" xChannelSelector="R" yChannelSelector="G" />
</filter>
```
Note: `numOctaves` reduced from 4→2, `scale` from 1.5→0.8. Much cheaper.

---

## 3. TYPOGRAPHY REFINEMENTS

### Current State
- Fonts correctly loaded: Syne (headings), Nunito (body), Space Grotesk (metrics)
- Custom font size scale in tailwind.config.ts with line-height tuning
- Letter-spacing: `heading: -0.02em`, `label: 0.15em`

### Issues Found
- **Section headings use wrong size class**: Multiple sections use `text-2xl md:text-lg` which makes the heading SMALLER on desktop (`text-lg` = 36px in the custom scale, `text-2xl` = 56px). This is backwards. Should be `text-lg md:text-xl` or just `text-lg` (36px) consistently.
  - Affected: `Services.tsx` line 16, `Testimonials.tsx` line 34, `Process.tsx` line 14, `CaseStudies.tsx` line 27, `BlogPreview.tsx` line 16
  - **Fix all of these** to: `text-xl md:text-2xl` (42px → 56px) or a consistent size that works

- **Hero heading**: Currently `text-4xl md:text-6xl lg:text-7xl xl:text-[5.5rem]`. The `text-6xl` and `text-7xl` are Tailwind defaults (60px, 72px), not the custom scale. Update to use the custom scale or explicit sizes:
  ```
  text-[40px] md:text-[56px] lg:text-[72px] xl:text-[88px]
  ```

- **Body text `text-md`** in Hero.tsx is not a standard Tailwind class (it's custom in the config at 20px). Verify it compiles correctly. If not, use `text-[20px]` explicitly.

### Digital Kitchen Comparison
DK uses a CSS variable system: `small: 13px, medium: 20px, large: 36px, x-large: 42px`. Beehoop's scale is similar but the heading sizes need to be used correctly.

**Actions:**
1. Fix all backwards `text-2xl md:text-lg` instances across all section headings
2. Ensure consistent heading hierarchy:
   - Page titles (h1): `font-syne text-[36px] md:text-[42px] lg:text-[56px]`
   - Section titles (h2): `font-syne text-[28px] md:text-[36px]`
   - Sub-section titles (h3): `font-syne text-[20px] md:text-[24px]`
3. Verify all font classes resolve correctly in the Tailwind build

---

## 4. COLOR SYSTEM & VISUAL DEPTH

### Current State
Colors are well-defined in tailwind.config.ts. Gradients and noise overlay exist in globals.css. Background variety is good (white, card, cream, dark navy).

### Gaps vs. Digital Kitchen
- **DK uses a more prominent yellow/gold** as the primary brand accent — it appears in hero backgrounds, CTA buttons, section accents, and ratings badges. Beehoop uses gold more sparingly.
- **DK has visible gradient usage** — cool-to-warm, midnight gradient. Beehoop's gradients exist in CSS but are underused.
- **DK displays award badges** (Clutch 5.0, Google 5.0, etc.) with star ratings in gold — strong social proof visual.

### Actions
1. **Increase gold accent visibility** across the site:
   - Section label text (`text-accent`) is good — keep
   - Add gold accent lines/borders to more section dividers
   - The "Free initial consultation" badge is great — add similar badge treatments elsewhere (e.g., "Trusted by 30+ organisations" in About)

2. **Add a warm-toned section background** variant — DK alternates between white, cream, and subtle warm gray. Currently Beehoop uses `bg-background-cream` only for Testimonials. Consider using it for Process or BlogPreview too for variety.

3. **Dark section depth** — The Contact section uses `gradient-dark-navy` + `noise-overlay`. Good. Ensure the noise overlay is optimized per Section 1B.

4. **Add subtle gold gradient line separators** between major sections on the home page (similar to DK's visual flow between sections):
   ```tsx
   <div className="h-px w-24 mx-auto gradient-warm-gold opacity-40" />
   ```

---

## 5. HERO SECTION OVERHAUL

### Current State
- Two-column: text (left) + animated SVG hexagons (right)
- Parallax on both columns via `useScroll`/`useTransform`
- Staggered Framer Motion entrance
- Scroll indicator at bottom
- SVG visible on mobile now (good improvement from before)

### Remaining Gaps
1. **The SVG illustration is still geometric and static-feeling** even with path-drawing animations. The hexagons look technical but not "sketchy" or hand-drawn.
2. **No Lottie animation** — DK's hero has a looping Lottie SVG animation that feels alive.
3. **The parallax values may contribute to scroll jank** (`[0, 1], [0, -80]` for illustration, `[0, 1], [0, -30]` for text).

### Actions
1. **Replace the SVG illustration** with either a Lottie animation (`hero-network.json`) or a redesigned SVG that looks hand-drawn:
   - Replace geometric hexagons with organic, imperfect shapes (hand-drawn circles, rough rectangles, flowing connection lines)
   - Add more visual elements: small text labels, arrows, annotation marks — making it look like a strategy sketch on a whiteboard
   - Use `stroke-linecap: round` and `stroke-linejoin: round` for softer line endpoints

2. **Reduce parallax intensity** to prevent scroll performance issues:
   ```tsx
   const illustrationY = useTransform(scrollYProgress, [0, 1], [0, -40]) // was -80
   const textY = useTransform(scrollYProgress, [0, 1], [0, -15]) // was -30
   ```

3. **Add a subtle floating animation** to the illustration when not scrolling:
   ```tsx
   <motion.div
     animate={{ y: [0, -8, 0] }}
     transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
   >
     {/* Illustration here */}
   </motion.div>
   ```

4. **Mobile hero layout**: Currently the illustration shows on mobile with `max-w-[300px] mx-auto`. Good. But ensure the illustration appears BELOW the CTA buttons on mobile (currently it's in the grid's second column which renders below text naturally). Add `order-first lg:order-last` if needed for visual hierarchy.

5. **Scroll indicator**: The `animate-bounce-gentle` is good. Add `opacity` fade-out as user starts scrolling:
   ```tsx
   const indicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
   // Apply: style={{ opacity: indicatorOpacity }}
   ```

---

## 6. NAVIGATION & HEADER POLISH

### Current State
- Sticky with scroll detection (threshold 60px — good)
- Service dropdown with animated entrance
- Mobile hamburger with animated icon swap
- Mobile overlay with staggered links
- Background blur and shadow on scroll

### Gaps
1. **Service dropdown positioning** — `left-1/2 -translate-x-1/2` centers it relative to "Services" link but may clip on smaller screens. Add overflow protection.
2. **Mobile menu has no visual flair** — DK's mobile menu feels richer. The background bee watermark at 4% opacity is very subtle.

### Actions
1. **Dropdown overflow fix**:
   ```tsx
   className="absolute top-full left-0 mt-3 w-80 ..."
   // Remove -translate-x-1/2, anchor to left edge instead
   ```

2. **Mobile menu enhancement**:
   - Increase the background bee watermark opacity to 6-8% for more visual presence
   - Add a subtle gold gradient line at the top of the mobile menu overlay
   - Add the email address at the bottom of the mobile menu: `hello@beehoop.com`

3. **Navbar logo on mobile** — With the massive logo file fixed (Section 1A), the logo should now render properly. Ensure the mobile logo size is appropriate (120px width on mobile, 160px on desktop).

4. **Active page indicator** — Add a visual indicator for the current page in the nav:
   ```tsx
   // In Navbar.tsx, detect current path
   import { usePathname } from 'next/navigation'
   const pathname = usePathname()
   // Apply active class:
   className={`nav-link ... ${pathname === link.href || pathname.startsWith(link.href + '/') ? 'text-text-primary' : 'text-text-secondary'}`}
   ```
   Note: `usePathname` may not work with static export. If so, use client-side `window.location.pathname` check.

---

## 7. ABOUT SECTION ENHANCEMENT

### Current State
- Two-column: blockquote + metrics (left), description + client types (right)
- Count-up animation on metrics
- Gold accent bar on blockquote
- Gold dot indicators on client badges

### Gaps vs. Digital Kitchen
- DK's About page has: rich narrative, team section with photos, company timeline (2022-2025 with SVG illustrations each year), "Why clients choose us" principle cards with icons.
- Beehoop's About is text-heavy with no visual illustration.

### Actions
1. **Add a sketch illustration** to the About section — either:
   - A small Lottie/SVG sketch animation between the blockquote and metrics
   - Or a decorative sketch underline below the blockquote

2. **On the `/about` page** (not home page), add these additional sections:
   - **"Why organisations work with us"** — 4-6 principle cards (like DK's 6 principles) with sketch icons: Rigour, Speed, Partnership, Independence, Confidentiality, Impact. Each card: icon + title + one-line description.
   - **Company timeline** (optional if content exists) — Visual timeline showing key milestones.

3. **Client type badges improvement** — The gold dot + hover effect is good. Consider making these slightly larger and more visual — perhaps small sketch icons for each client type (factory for conglomerates, globe for multinationals, etc.).

---

## 8. ACHIEVEMENTS SECTION

### Current State
- 4-column grid with dividers
- Static text values (8+, 30+, 4+, 100%)
- Scale-in animation

### Gaps
- Values don't animate (no count-up like the About metrics)
- Very minimal visual treatment

### Actions
1. **Add count-up animation** to achievement values (reuse the `useCountUp` hook from About.tsx):
   ```tsx
   // Parse the number from "8+" → 8, suffix "+"
   // "100%" → 100, suffix "%"
   ```

2. **Increase visual prominence** — Add a subtle background card or gradient behind the achievements row:
   ```tsx
   <div className="bg-gradient-to-r from-accent-pale/30 via-transparent to-accent-pale/30 rounded-2xl p-8">
   ```

3. **Add small sketch icons** above each metric (calendar for years, folder for projects, globe for continents, handshake for retention).

---

## 9. SERVICES SECTION & SERVICE PAGES

### Current State
- 2×2 grid of ServiceCards with numbered backgrounds
- Cards link to individual service pages
- Service detail pages: hero + long description + deliverables sidebar + related cases + contact

### Gaps vs. Digital Kitchen
- **DK has rich service pages** with: dedicated Lottie hero animations per service, before/after comparisons, data visualizations (traffic charts), process timelines, FAQ accordions, client testimonials specific to that service.
- **Beehoop service pages are text-heavy** with no illustrations, no FAQ, no timeline, no data visualization.

### Actions for Service Cards
1. **Replace Lucide icons with sketch SVG icons** (from Section 2)
2. **Add hover animation replay** — When hovering a card, the sketch icon should replay its drawing animation

### Actions for Service Detail Pages
1. **Add a Lottie/sketch illustration** in the service page hero (larger version of the service icon)

2. **Add a process sub-section** specific to each service — e.g., "How we approach Strategy Development" with 3-4 numbered steps

3. **Add an FAQ accordion** at the bottom of each service page:
   ```tsx
   // Example FAQs for Strategy Development
   const faqs = [
     { q: 'How long does a typical strategy engagement take?', a: '...' },
     { q: 'What industries do you have experience in?', a: '...' },
     { q: 'How do you measure strategy success?', a: '...' },
   ]
   ```
   Use Framer Motion for smooth accordion open/close:
   ```tsx
   <motion.div
     initial={{ height: 0, opacity: 0 }}
     animate={{ height: 'auto', opacity: 1 }}
     exit={{ height: 0, opacity: 0 }}
     transition={{ duration: 0.3 }}
   >
   ```

4. **Add a CTA banner** between the content and contact section: "Ready to develop your strategy? Let's talk →"

---

## 10. PROCESS/HOW WE WORK

### Current State
- 5-step vertical timeline with numbered circles
- Dashed gold connecting line
- Left-entrance animations

### Gaps
- Feels static — DK has richer visual timelines with SVG illustrations per step
- The connecting line is CSS-only (`border-dashed`) — not hand-drawn

### Actions
1. **Replace the CSS dashed line** with an SVG hand-drawn line that animates (draws from top to bottom as user scrolls):
   ```tsx
   <svg className="absolute left-[35px] md:left-[35px] top-0" width="2" height="100%" style={{ overflow: 'visible' }}>
     <path
       d="M1,0 C1,50 1,100 1,150 ..." // Slightly wavy path
       stroke="#F5C842"
       strokeWidth="1"
       strokeDasharray="4 6"
       fill="none"
       className="sketch-path"
     />
   </svg>
   ```

2. **Add small sketch illustrations** next to each step (optional) — e.g., a magnifying glass for Discovery, a framework grid for Strategic Framework, etc.

3. **Add hover expansion** — On hover or click, each step reveals an additional 1-2 sentences of detail with smooth animation.

---

## 11. CASE STUDIES & CASE PAGES

### Current State
- Filter bar (All, Strategy, M&A, Brand, Analytics)
- 3-column card grid with metrics
- Case detail pages: hero + metric card + Challenge/Approach/Result narrative + related cases

### Gaps vs. Digital Kitchen
- **DK cases have SVG illustrations** (building.svg, construction.svg, etc.) per case
- **DK shows multiple metrics per case** (traffic growth ×100, keywords +680, leads ×20, ROI 560%)
- **DK has industry AND country filters** — Beehoop only has service type filters
- **DK case cards are more visually rich** with prominent metric displays and background illustrations

### Actions
1. **Add SVG illustrations to case cards** — Create simple sketch-style SVG icons representing each industry:
   - Logistics/Real Estate: sketch of a building
   - Energy: sketch of a lightning bolt or oil rig
   - FMCG: sketch of a shopping bag
   - Banking: sketch of a bank/coins
   - Shipping: sketch of a ship
   - Brand: sketch of a tag/logo mark
   Place these as a background element in the top portion of each card (low opacity, decorative).

2. **Add industry and geography filters** alongside service filters:
   ```tsx
   const serviceFilters = ['All', 'Strategy', 'M&A', 'Brand', 'Analytics']
   const industryFilters = ['All Industries', 'Energy', 'Real Estate', 'Financial Services', 'FMCG', 'Maritime']
   ```

3. **Enhance case cards with more prominent metrics** — Make the metric larger and more visually dominant:
   - Move metric to a dedicated top-bar of the card
   - Use gold background strip behind the metric value
   - Add an upward arrow icon (already present with TrendingUp)

4. **Case detail pages** — Add more visual richness:
   - Add the industry sketch illustration in the hero
   - Add a "Key Metrics" sidebar with multiple data points (even if some are placeholder)
   - Add a blockquote/testimonial from the client within the case narrative
   - Add a horizontal progress/timeline visual showing the engagement phases

---

## 12. CLIENT LOGOS MARQUEE

### Current State
- Two rows of text badges scrolling in opposite directions
- Gradient fade edges
- Text-only (client type names, not actual logos)

### Gaps
- DK has actual client logo images (19+ company logos in grayscale)
- Text badges feel less professional than actual logos

### Actions
1. **If actual client logos are available**, replace text badges with grayscale logo images that gain color/opacity on hover. Save logos in `/public/clients/` as optimized SVGs or small PNGs.

2. **If logos are not available**, enhance the current text badges:
   - Make them slightly more prominent (larger text, bolder)
   - Add a subtle sketch icon prefix for each (🏗️ for construction, ⛽ for energy, etc.) — but use SVG sketch icons, not emoji
   - Increase spacing between badges

3. **Performance fix** — Add `will-change: transform` to the marquee containers to hint GPU acceleration, and use `contain: layout style paint` to isolate repaints:
   ```css
   .logo-marquee, .logo-marquee-reverse {
     will-change: transform;
     contain: layout style paint;
   }
   ```

---

## 13. TESTIMONIALS CAROUSEL

### Current State
- Auto-rotating (6s) with pause on hover
- Drag-to-navigate
- Large decorative quote marks
- Prev/Next buttons + dot indicators
- Cream background

### Gaps vs. Digital Kitchen
- DK testimonials include: client photo, company logo, more elaborate layout
- Beehoop only shows quote + name + title — no photo, no company branding
- The carousel transition feels basic

### Actions
1. **Add client company name/logo** to each testimonial in the data:
   ```typescript
   // In data.ts, add to testimonials:
   { ..., company: 'Global Energy Corp', companyLogo: '/clients/energy-corp.svg' }
   ```
   Display company name below the client's title even if logo isn't available.

2. **Add a client photo placeholder** — Even without real photos, having a styled circle with initials adds visual weight:
   ```tsx
   <div className="w-12 h-12 rounded-full bg-accent-pale flex items-center justify-center mt-4">
     <span className="font-syne text-lg font-bold text-accent">
       {testimonials[current].name.split(' ').map(n => n[0]).join('')}
     </span>
   </div>
   ```

3. **Improve transition animation** — The current horizontal slide is good. Add a slight scale effect:
   ```tsx
   initial={{ opacity: 0, x: 40, scale: 0.98 }}
   animate={{ opacity: 1, x: 0, scale: 1 }}
   exit={{ opacity: 0, x: -40, scale: 0.98 }}
   ```

4. **Performance**: Guard the auto-rotate `setInterval` with an `isInView` check so it doesn't run when the section is off-screen.

---

## 14. BLOG PREVIEW & BLOG PAGES

### Current State
- 3-column grid of blog cards
- Category tag, title, excerpt, date, read time
- Blog detail page: tag + title + date + excerpt + placeholder body text + related articles

### Gaps
- No featured images or illustrations on blog cards — all text
- Blog detail page has generic placeholder body text (same for all posts)
- No reading progress indicator

### Actions
1. **Add sketch illustrations to blog cards** — A decorative header area in each card with a sketch illustration relevant to the topic:
   - Strategic Planning: sketch of a chess piece or roadmap
   - Cross-Border M&A: sketch of a globe with connecting arrows
   - Data-Driven Decisions: sketch of a chart/dashboard
   These don't need to be photographs — the sketch style keeps brand consistency.

2. **Unique content per blog post** — The current blog detail page uses the same generic "Our Approach" / "The Result" text for all posts. Create distinct body content for each post, or at least distinct section headings and opening paragraphs.

3. **Add a reading progress bar** to the blog detail page:
   ```tsx
   // At top of page
   <motion.div
     className="fixed top-0 left-0 h-1 bg-accent-light z-[60]"
     style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
   />
   ```

4. **Add estimated read time calculation** based on actual word count (currently hardcoded).

---

## 15. CONTACT SECTION

### Current State
- Dark navy gradient + noise overlay
- Two-column: info (left) + form (right)
- Floating label form with bottom-border inputs
- Mailto submission
- Bee watermark background
- "Free initial consultation" badge

### Good — this is one of the stronger sections. Minor refinements:

### Actions
1. **Add Lottie/sketch illustration** — Place `contact-conversation.json` or an SVG sketch illustration (two connecting speech bubbles) above or beside the email link on the left side.

2. **Form validation UX** — Add visual validation states:
   - Green checkmark when a field is valid
   - Red border + message when invalid
   - Animate the error message in with Framer Motion

3. **Submit button enhancement** — Add a loading state when form is submitted:
   ```tsx
   const [submitting, setSubmitting] = useState(false)
   // On submit: setSubmitting(true), then redirect to mailto after brief delay
   ```

4. **Add phone number or WhatsApp link** if available — DK has multiple contact methods.

5. **The noise overlay performance** on this dark section — already addressed in Section 1B with the static PNG texture replacement.

---

## 16. FOOTER

### Current State
- Dark navy gradient
- 4-column: Brand + Services + Company + Social
- Gold gradient top border line
- Back to top button
- Email link, LinkedIn, Twitter
- Copyright + Privacy/Terms

### Gaps
- DK footer has: star ratings (Clutch 5.0, Google 5.0), physical address, phone number, Instagram link, richer visual treatment
- Beehoop footer is functional but sparse

### Actions
1. **Add trust badges/ratings** if applicable — Below the brand description:
   ```tsx
   <div className="flex items-center gap-2 mt-4">
     <span className="text-xs text-gray-400">★★★★★</span>
     <span className="text-xs text-gray-500">Client satisfaction</span>
   </div>
   ```

2. **Add physical address** if the business has one.

3. **Add a newsletter signup** (optional) — Small email input with "Stay updated" CTA.

4. **Ensure all footer links work** — Privacy and Terms are currently just `<span>` elements with `cursor-pointer` but no actual links. Either create these pages or add `href` to planned pages.

---

## 17. SCROLL ANIMATIONS & MOTION DESIGN

### Current Issues
- All sections use the same `AnimatedSection` with `direction="up"` by default — repetitive
- Some sections correctly use `direction="left"` or `direction="right"` but most don't
- No stagger effect on children (the `stagger` prop exists but is never used)

### Actions
1. **Diversify animation directions** across the home page:
   - Hero: custom stagger (already done ✓)
   - About left column: `direction="up"` (default ✓)
   - About right column: `direction="right"` ✓
   - Achievements: `direction="scale"` ✓
   - Services: `direction="up"` — consider changing to "scale" for variety
   - Process steps: `direction="left"` ✓
   - Case Studies: `direction="up"` — keep
   - Testimonials: `direction="up"` — keep (center-focused)
   - Blog: stagger children (cards animate one after another)
   - Contact left: `direction="left"` ✓
   - Contact right: `direction="right"` ✓

2. **Use stagger on grid sections**: Service cards, case study cards, blog cards, achievement badges should stagger their children:
   ```tsx
   // In the parent container
   <AnimatedSection stagger>
     {items.map(item => <ChildCard />)}
   </AnimatedSection>
   ```
   Note: For this to work, the `AnimatedSection` `stagger` prop needs children to also be `motion.div` elements. Currently, stagger is set in the transition but children aren't wrapped in `motion.div`. Fix this by either:
   - Making child cards use `motion.div` with `variants` that inherit from parent, OR
   - Keeping the current per-card `AnimatedSection` with `delay={i * 0.1}` approach (which works but is heavier)

3. **Add a subtle parallax to decorative elements** — The gold divider lines, decorative shapes, etc. should shift slightly on scroll for depth.

4. **Text reveal animation for key headings** — Use the `reveal-up` keyframe that exists in globals.css but is never applied:
   ```tsx
   // For hero h1 and major section headings
   className="[animation:reveal-up_0.8s_ease-out_forwards]"
   ```

---

## 18. HOVER EFFECTS & MICRO-INTERACTIONS

### Current State
- Cards: `-translate-y-1` lift + gold shadow + border color change ✓
- Buttons: scale + glow shadow ✓
- Nav links: underline draw-in ✓
- "Read more" links: arrow translate ✓

### These are already well-implemented. Minor additions:

### Actions
1. **Service dropdown items** — Add a left-border indicator on hover:
   ```tsx
   className="... hover:border-l-2 hover:border-accent hover:pl-[10px]"
   ```

2. **Testimonial dots** — The active dot expands to `w-6` — good. Add a transition for the color too:
   ```tsx
   className={`... transition-all duration-300 ${i === current ? 'bg-accent w-6' : 'bg-border hover:bg-accent/30'}`}
   ```

3. **Footer links** — Add an underline-on-hover effect to footer navigation links:
   ```tsx
   className="... hover:text-accent-light hover:underline underline-offset-2 transition-colors"
   ```

4. **Back to top button** — Add a rotation on hover:
   ```tsx
   className="... hover:rotate-[-15deg] transition-transform"
   ```

---

## 19. MOBILE & TABLET OPTIMIZATION

### Current Issues
- Logos don't load on mobile (oversized files — fixed in Section 1A)
- Heavy scroll on mobile (fixed in Section 1B)
- Mobile CTA bar exists (MobileCTA.tsx) ✓
- Some font sizes may be too large on small phones

### Actions

1. **Test at 375px (iPhone SE)** — Verify:
   - Hero heading doesn't overflow (currently `text-4xl` = 40px from custom scale — might be tight)
   - All cards have adequate padding
   - No horizontal scroll anywhere
   - Contact form fields are full-width
   - The marquee doesn't cause horizontal overflow

2. **Tablet-specific layout (768px-1024px)**:
   - Case studies: ensure 2-column grid at `md` breakpoint (currently `md:grid-cols-2 lg:grid-cols-3` ✓)
   - Blog cards: keep 3-column only at `md` — may need `md:grid-cols-2 lg:grid-cols-3` instead
   - Process timeline: ensure adequate spacing between steps on tablet

3. **Mobile animations** — Reduce intensity on mobile:
   ```tsx
   // Create a hook
   function useIsMobile() {
     const [isMobile, setIsMobile] = useState(false)
     useEffect(() => {
       const check = () => setIsMobile(window.innerWidth < 768)
       check()
       window.addEventListener('resize', check)
       return () => window.removeEventListener('resize', check)
     }, [])
     return isMobile
   }

   // In Hero, disable parallax on mobile:
   const illustrationY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : -40])
   ```

4. **Disable noise overlay on mobile** — The texture adds GPU overhead:
   ```css
   @media (max-width: 768px) {
     .noise-overlay::before {
       display: none;
     }
   }
   ```

5. **Disable Lenis on mobile** (optional, if scroll issues persist):
   ```tsx
   // In SmoothScroll.tsx
   useEffect(() => {
     if (window.innerWidth < 768) return // Skip Lenis on mobile
     const lenis = new Lenis({ ... })
     ...
   }, [])
   ```

6. **Touch targets** — Verify all buttons meet 44×44px minimum. The filter buttons in CaseStudies (`px-4 py-2`) may be too small on mobile. Increase mobile padding: `px-4 py-2 md:px-4 md:py-2` → `px-5 py-3 md:px-4 md:py-2`.

7. **Mobile menu** — When the mobile menu is open, prevent scroll behind it. Currently `document.body.style.overflow = 'hidden'` ✓. But also need to handle iOS Safari which requires:
   ```css
   body.menu-open {
     position: fixed;
     width: 100%;
     height: 100%;
   }
   ```

---

## 20. PAGE LOADER & TRANSITIONS

### Current State
- PageLoader: white overlay with bee logo scale-in + loading bar, fades after 1.8s
- No page transition animations between routes

### Gaps
- The page loader uses the oversized logo (fixed in Section 1A)
- DK has smoother loading experiences
- No transition between pages — feels abrupt when navigating

### Actions
1. **Replace static logo in PageLoader** with the Lottie `loading-bee.json` sketch animation:
   ```tsx
   // In PageLoader.tsx
   import LottieAnimation from './LottieAnimation'
   import loadingBee from '../../public/animations/loading-bee.json'

   // Replace <Image> with:
   <LottieAnimation animationData={loadingBee} loop={false} className="w-16 h-16" />
   ```

2. **Reduce loader time** — 1.8s feels long. Reduce to 1.2s or tie it to actual page readiness:
   ```tsx
   useEffect(() => {
     const handleLoad = () => setTimeout(() => setLoading(false), 500)
     if (document.readyState === 'complete') handleLoad()
     else window.addEventListener('load', handleLoad)
     return () => window.removeEventListener('load', handleLoad)
   }, [])
   ```

3. **Page transitions** — Add route-based transitions. Since this is a static export, wrap page content in a transition component:
   ```tsx
   // Create src/components/ui/PageTransition.tsx
   'use client'
   import { motion } from 'framer-motion'

   export default function PageTransition({ children }: { children: React.ReactNode }) {
     return (
       <motion.div
         initial={{ opacity: 0, y: 12 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.4, ease: 'easeOut' }}
       >
         {children}
       </motion.div>
     )
   }
   ```
   Wrap each page's content in `<PageTransition>`. Note: `AnimatePresence` with `mode="wait"` requires a `key` based on pathname, which is tricky with static export. The simpler approach (entrance animation only) works reliably.

---

## 21. SEO & METADATA

### Current State
- Root metadata with title, description, OpenGraph, Twitter cards ✓
- JSON-LD structured data for Organization ✓
- Sitemap.ts ✓
- `metadataBase` set to GitHub Pages URL ✓

### Actions
1. **Create the missing favicon** — Referenced in metadata but not in `/public/`. Generate from bee logo:
   ```bash
   # Resize logo.png to 32×32 and convert to ICO
   ```

2. **Create OG image** — Referenced as `/og-image.png` but doesn't exist. Create a 1200×630px branded image with the beehoop logo and tagline.

3. **Per-page metadata** — Ensure each page has unique `<title>` and `<meta description>`:
   - `/about` → "About beehoop — Strategy & Advisory Firm"
   - `/services` → "Our Services — Strategy, M&A, Brand, Analytics | beehoop"
   - `/services/[slug]` → Dynamic title from service name
   - `/cases` → "Case Studies — Client Outcomes | beehoop"
   - etc.

4. **WebPage schema** per page — Add `@type: "WebPage"` structured data to each page (DK does this).

5. **BreadcrumbList schema** for nested pages:
   ```json
   { "@type": "BreadcrumbList", "itemListElement": [
     { "position": 1, "name": "Home", "item": "https://..." },
     { "position": 2, "name": "Services", "item": "https://..." },
     { "position": 3, "name": "Strategy Development" }
   ]}
   ```

---

## 22. ACCESSIBILITY

### Current State
- Skip to main content link ✓
- ARIA labels on interactive elements ✓
- Focus management for mobile menu ✓
- Reduced motion media query ✓
- Semantic HTML ✓

### Good foundation. Minor improvements:

### Actions
1. **Focus visible styles** — Ensure custom focus styles are visible on all interactive elements:
   ```css
   :focus-visible {
     outline: 2px solid #F5C842;
     outline-offset: 2px;
     border-radius: 4px;
   }
   ```

2. **Color contrast check** — `text-text-muted` (#9CA3AF) on white background has a contrast ratio of ~2.8:1 — fails WCAG AA for normal text. Options:
   - Darken muted text to `#6B7280` (currently used for `text-secondary`)
   - Or use muted only for large text / decorative elements

3. **Form labels** — The floating label pattern works visually but ensure screen readers can associate labels with inputs. Add `id` to inputs and `htmlFor` to labels:
   ```tsx
   <input id="contact-name" ... />
   <label htmlFor="contact-name">Your name</label>
   ```

4. **Carousel keyboard navigation** — Ensure testimonial carousel can be navigated with arrow keys:
   ```tsx
   onKeyDown={(e) => {
     if (e.key === 'ArrowLeft') prev()
     if (e.key === 'ArrowRight') next()
   }}
   ```

5. **`aria-live` for dynamic content** — When filter results change in CaseStudies or testimonial rotates:
   ```tsx
   <div aria-live="polite" aria-atomic="true">
     {/* Filtered results or current testimonial */}
   </div>
   ```

---

## IMPLEMENTATION ORDER (RECOMMENDED)

Execute in this exact sequence. Each step builds on the previous:

| Phase | Section | Priority | Impact |
|-------|---------|----------|--------|
| 1 | **§1A: Fix logo images** | CRITICAL | Logos appear, memory freed |
| 2 | **§1B: Fix scroll performance** | CRITICAL | Site feels fast |
| 3 | **§1C: Fix basePath** | CRITICAL | Production deployment works |
| 4 | **§2: Lottie/sketch animations** | HIGH | Visual signature achieved |
| 5 | **§3: Typography fixes** | HIGH | Headings render correctly |
| 6 | **§5: Hero overhaul** | HIGH | First impression transformed |
| 7 | **§6: Navigation polish** | MEDIUM | Active states, dropdown fix |
| 8 | **§9: Services + detail pages** | MEDIUM | Content depth added |
| 9 | **§11: Case studies** | MEDIUM | Visual richness, more filters |
| 10 | **§7-8: About + Achievements** | MEDIUM | Visual interest added |
| 11 | **§10: Process timeline** | MEDIUM | Sketch line animation |
| 12 | **§13: Testimonials** | MEDIUM | Company names, photos |
| 13 | **§14: Blog preview** | LOW | Illustrations, unique content |
| 14 | **§15-16: Contact + Footer** | LOW | Illustration, trust badges |
| 15 | **§17-18: Animations + Hover** | LOW | Polish layer |
| 16 | **§19: Mobile optimization** | MEDIUM | Performance + UX on mobile |
| 17 | **§20: Loader + transitions** | LOW | Refinement |
| 18 | **§21-22: SEO + A11y** | LOW | Quality assurance |

---

## CRITICAL REMINDERS

1. **Logo resizing is the #1 fix** — Nothing else matters if the logos don't render. A 26,678px-wide PNG will crash mobile browsers.

2. **Performance before aesthetics** — Fix the scroll jank (noise overlay, SVG filter, RAF conflicts) before adding more animations.

3. **The pencil-sketch aesthetic is the brand signature** — Every illustration should feel hand-drawn with organic, imperfect lines. Use `stroke-linecap: round`, `stroke-linejoin: round`, slightly wavy paths, and the `sketch-path` CSS animation for path drawing.

4. **Lottie animations must be lightweight** — Each JSON file should be <50KB. Prefer simple path animations over complex multi-layer compositions.

5. **Test on real mobile devices** — The iPhone SE (375px) and iPad (768px) are the critical breakpoints. Test scroll performance, logo rendering, and animation smoothness.

6. **Don't break static export** — The site uses `output: 'export'` with `basePath: '/beehoop'`. All features must work with static HTML/JS. No server-side rendering, no API routes, no dynamic server features.

7. **Gold accent consistency** — `#F5C842` for highlights/fills, `#C8920A` for text/borders, `#FEF3C7` for pale backgrounds, `#B07D08` for hover states. Never deviate from these values.

8. **Animation budget** — Keep total animation overhead under 16ms per frame. If scroll starts lagging, reduce animation complexity. Use `will-change: transform` sparingly and only on actively animating elements.

---

## FILES THAT NEED CHANGES

### Must modify:
- `public/logo.png` — Resize to 200×200px
- `public/logo-with-name.png` — Resize to 400×120px
- `public/name-colored.png` — Resize to 300×90px
- `src/app/globals.css` — Noise overlay optimization, focus styles, mobile disables
- `src/app/layout.tsx` — SVG filter optimization, favicon
- `src/components/sections/Hero.tsx` — Replace SVG with Lottie, parallax reduction
- `src/components/sections/Services.tsx` — Fix heading size class
- `src/components/sections/CaseStudies.tsx` — Fix heading size, add filters, illustrations
- `src/components/sections/Testimonials.tsx` — Fix heading size, add company info
- `src/components/sections/Process.tsx` — Fix heading size, SVG connecting line
- `src/components/sections/BlogPreview.tsx` — Fix heading size, add illustrations
- `src/components/sections/About.tsx` — Add illustration
- `src/components/sections/Achievements.tsx` — Count-up, visual enhancement
- `src/components/sections/Contact.tsx` — Add illustration, form validation
- `src/components/sections/ClientLogos.tsx` — Performance fix
- `src/components/layout/Navbar.tsx` — Active page indicator, dropdown fix
- `src/components/layout/Footer.tsx` — Trust badges, real links
- `src/components/ui/ServiceCard.tsx` — Sketch icons replace Lucide
- `src/components/ui/CaseCard.tsx` — Industry illustrations
- `src/components/ui/PageLoader.tsx` — Lottie animation replace
- `src/components/ui/SmoothScroll.tsx` — RAF unification with Framer Motion
- `src/components/ui/AnimatedSection.tsx` — Observer optimization
- `src/components/pages/ServiceDetail.tsx` — FAQ, illustration, process
- `src/components/pages/CaseDetail.tsx` — Industry illustration, metrics
- `src/components/pages/BlogDetail.tsx` — Unique content, reading progress
- `src/lib/data.ts` — Add company to testimonials, FAQ data, industry icons
- `tailwind.config.ts` — Verify font size usage
- `next.config.mjs` — Verify basePath behavior

### Must create:
- `public/textures/noise.png` — 200×200px static noise texture
- `public/animations/hero-network.json` — Lottie hero animation
- `public/animations/strategy-icon.json` — Strategy sketch animation
- `public/animations/mergers-icon.json` — M&A sketch animation
- `public/animations/brand-icon.json` — Brand sketch animation
- `public/animations/analytics-icon.json` — Analytics sketch animation
- `public/animations/contact-conversation.json` — Contact illustration
- `public/animations/loading-bee.json` — Loader sketch animation
- `public/favicon.ico` — 32×32 favicon
- `public/og-image.png` — 1200×630 OG image
- `src/components/ui/PageTransition.tsx` — Route transition wrapper
- Various SVG sketch illustration components (if not using Lottie files)
