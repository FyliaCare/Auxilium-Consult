'use client'

import FadeInWhenVisible from './FadeInWhenVisible'
import { motion } from 'framer-motion'

export default function Partners() {
  const partners = [
    {
      name: "Pecunia Investment Company FZCO",
      location: "UAE",
      role: "Institutional Finance Partner",
      description: "Institutional finance partner and gateway for structured funding, providing access to international capital markets and investment networks.",
      type: "Strategic Partner",
      icon: "🏦"
    },
    {
      name: "Sync Capital",
      location: "Ghana",
      role: "Strategic Brokerage Partner",
      description: "Strategic brokerage and co-facilitation partner enhancing our capacity to connect businesses with the right funding sources.",
      type: "Partnership in Progress",
      icon: "🤝"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Partner Network</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Auxilium Consult works with a growing network of trusted local and international partners to expand funding access and deal quality.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.2}>
              <motion.div 
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow h-full"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-5xl">{partner.icon}</div>
                  <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {partner.type}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {partner.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-primary-600 text-sm">📍</span>
                  <span className="text-gray-600 text-sm font-medium">{partner.location}</span>
                </div>
                
                <p className="text-primary-700 font-semibold mb-4">
                  {partner.role}
                </p>
                
                <p className="text-gray-600 leading-relaxed">
                  {partner.description}
                </p>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible delay={0.4}>
          <div className="mt-12 text-center">
            <div className="bg-primary-600 text-white p-6 rounded-lg max-w-3xl mx-auto">
              <p className="text-lg font-medium">
                These collaborations strengthen Auxilium Consult&apos;s ability to bridge businesses and capital globally.
              </p>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.6}>
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Interested in partnering with us?
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary-600 text-white hover:bg-primary-700 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
