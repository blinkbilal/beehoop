import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Achievements from '@/components/sections/Achievements'
import Services from '@/components/sections/Services'
import Process from '@/components/sections/Process'
import CaseStudies from '@/components/sections/CaseStudies'
import ClientLogos from '@/components/sections/ClientLogos'
import Testimonials from '@/components/sections/Testimonials'
import BlogPreview from '@/components/sections/BlogPreview'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Achievements />
      <Services />
      <Process />
      <CaseStudies />
      <ClientLogos />
      <Testimonials />
      <BlogPreview />
      <Contact />
    </>
  )
}
