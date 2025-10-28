import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'

// Lazy load components that are below the fold
const About = dynamic(() => import('@/components/About'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})
const Services = dynamic(() => import('@/components/Services'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
})
const Testimonials = dynamic(() => import('@/components/Testimonials'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})
const CaseStudies = dynamic(() => import('@/components/CaseStudies'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
})
const FAQ = dynamic(() => import('@/components/FAQ'), {
  loading: () => <div className="h-96 bg-white animate-pulse" />
})
const Contact = dynamic(() => import('@/components/Contact'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})
const Partners = dynamic(() => import('@/components/Partners'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
})

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <CaseStudies />
      <Testimonials />
      <Partners />
      <FAQ />
      <Contact />
    </main>
  )
}