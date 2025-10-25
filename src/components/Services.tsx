'use client'

import { motion } from 'framer-motion'
import FadeInWhenVisible from './FadeInWhenVisible'

export default function Services() {
  const services = [
    {
      title: "Startup Advisory",
      description: "Guiding early-stage ventures through investor readiness and structuring.",
      icon: "🚀"
    },
    {
      title: "SME Growth Consulting",
      description: "Helping small and medium enterprises scale through capital access.",
      icon: "📈"
    },
    {
      title: "Project Investment Structuring",
      description: "Developing bankable financial and strategic frameworks.",
      icon: "🏗️"
    },
    {
      title: "Capital Partnerships",
      description: "Connecting clients to finance houses and institutional investors.",
      icon: "🤝"
    },
    {
      title: "Strategic Advisory",
      description: "Providing sustainability and governance support post-funding.",
      icon: "💡"
    },
    {
      title: "End-to-End Execution",
      description: "Not only advising but helping execute fundraising, investor negotiation, disbursement, performance monitoring.",
      icon: "⚡"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We operate across key sectors — energy, agribusiness, mining, and industry — connecting credible businesses with investors, financial institutions, and strategic partners globally.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <motion.div 
                className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible delay={0.3}>
          <div className="mt-16 bg-primary-50 p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Edge</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Access to Projects", desc: "Broad portfolio across key growth sectors." },
                { title: "Sector Experience", desc: "Deep understanding of emerging market dynamics." },
                { title: "End-to-End Advisory", desc: "From concept structuring to investor engagement and closure." },
                { title: "Sustainability Focus", desc: "Structuring deals that generate lasting economic and social impact." }
              ].map((edge, index) => (
                <motion.div 
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h4 className="font-semibold text-primary-700 mb-2">{edge.title}</h4>
                  <p className="text-gray-600 text-sm">{edge.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}