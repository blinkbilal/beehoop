import Hero from '@/components/sections/Hero'
import dynamic from 'next/dynamic'

function SectionSkeleton({ className = 'h-96' }: { className?: string }) {
  return <div className={`${className} animate-pulse bg-background-alt/30 rounded-3xl mx-6 md:mx-20 my-4`} />
}

const About = dynamic(() => import('@/components/sections/About'), {
  loading: () => <SectionSkeleton />,
})
const Achievements = dynamic(() => import('@/components/sections/Achievements'), {
  loading: () => <SectionSkeleton className="h-48" />,
})
// ── Three capability worlds — Navigate → Illuminate → Build ──────────────────
const StrategicAdvisory = dynamic(() => import('@/components/sections/StrategicAdvisory'), {
  loading: () => <SectionSkeleton className="h-[36rem]" />,
})
const DataEngine = dynamic(() => import('@/components/sections/DataEngine'), {
  loading: () => <SectionSkeleton className="h-[36rem]" />,
})
const DigitalEngineering = dynamic(() => import('@/components/sections/DigitalEngineering'), {
  loading: () => <SectionSkeleton className="h-[36rem]" />,
})
// ─────────────────────────────────────────────────────────────────────────────
const Process = dynamic(() => import('@/components/sections/Process'), {
  loading: () => <SectionSkeleton className="h-[28rem]" />,
})
const CaseStudies = dynamic(() => import('@/components/sections/CaseStudies'), {
  loading: () => <SectionSkeleton className="h-[28rem]" />,
})
const ClientLogos = dynamic(() => import('@/components/sections/ClientLogos'), {
  loading: () => <SectionSkeleton className="h-32" />,
})
const Testimonials = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <SectionSkeleton className="h-80" />,
})
const BlogPreview = dynamic(() => import('@/components/sections/BlogPreview'), {
  loading: () => <SectionSkeleton />,
})
const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <SectionSkeleton className="h-[28rem]" />,
})

export default function Home() {
  return (
    <>
      <Hero />
      <About />

      {/* About → KPI: amber proof beat transition */}
      <div
        aria-hidden="true"
        className="about-to-kpi-hairline"
        style={{ height: '1px' }}
      />

      <Achievements />
      {/* ─── Immersive Capability Corridor ───────────────────────────────── */}
      {/* One continuous dark environment. Advisory fades IN, Engineering fades  */}
      {/* OUT. The two hairlines mark chapter transitions between worlds.        */}
      <StrategicAdvisory />

      {/* Act I → II: Advisory ⟶ Intelligence — amber dissolving into sapphire */}
      <div
        aria-hidden="true"
        className="capability-hairline-1"
        style={{ height: '1px' }}
      />

      <DataEngine />

      {/* Act II → III: Intelligence ⟶ Engineering — sapphire dissolving into emerald */}
      <div
        aria-hidden="true"
        className="capability-hairline-2"
        style={{ height: '1px' }}
      />

      <DigitalEngineering />

      {/* Engineering ⟶ Process: emerald cosmos dissolving into the engagement chamber */}
      <div
        aria-hidden="true"
        className="relative h-24 md:h-36 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, #020E08 0%, #000000 100%)',
        }}
      />

      <Process />

      {/* Process → Client Outcomes: engagement chamber dissolves into the proof field */}
      <div
        aria-hidden="true"
        className="relative pointer-events-none"
        style={{
          height: '72px',
          background: 'linear-gradient(to bottom, #000000 0%, #000208 100%)',
        }}
      />

      <CaseStudies />
      <ClientLogos />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </>
  )
}
