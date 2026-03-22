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
const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <SectionSkeleton className="h-[32rem]" />,
})
const Process = dynamic(() => import('@/components/sections/Process'), {
  loading: () => <SectionSkeleton className="h-[28rem]" />,
})
const DataEngine = dynamic(() => import('@/components/sections/DataEngine'), {
  loading: () => <SectionSkeleton className="h-[32rem]" />,
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
      <Achievements />
      <Services />
      <Process />
      <DataEngine />
      <CaseStudies />
      <ClientLogos />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </>
  )
}
