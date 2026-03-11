import { Metadata } from 'next'
import Contact from '@/components/sections/Contact'

export const metadata: Metadata = {
  title: 'Contact — beehoop',
  description:
    'Get in touch with the beehoop advisory team. We offer a free initial consultation for prospective clients.',
}

export default function ContactPage() {
  return <Contact />
}
