'use client'

import { motion } from 'framer-motion'
import FadeInWhenVisible from './FadeInWhenVisible'

export default function CaseStudies() {
  const cases = [
    {
      title: "Solar Energy Expansion",
      sector: "Energy",
      client: "Confidential Solar Developer",
      challenge: "A growing solar energy company needed $2.5M to expand operations and deploy new solar installations across three regions.",
      solution: "We structured a hybrid financing package combining equity and debt, prepared comprehensive financial models, and facilitated introductions to impact investors focused on renewable energy.",
      results: [
        "Secured $2.5M in 5 months",
        "Successfully deployed 50 new solar installations",
        "Created 120 jobs in rural communities",
        "Achieved 15% IRR for investors"
      ],
      fundingAmount: "$2.5M",
      timeline: "5 months",
      icon: "⚡"
    },
    {
      title: "Agribusiness Scale-Up",
      sector: "Agribusiness",
      client: "Premium Food Processing SME",
      challenge: "An established food processing company needed growth capital to upgrade facilities and expand distribution networks across West Africa.",
      solution: "We conducted market analysis, developed investor-ready documentation, and connected the client with regional private equity firms specializing in agribusiness.",
      results: [
        "Raised $1.2M Series A funding",
        "Expanded to 4 new countries",
        "Increased production capacity by 200%",
        "Doubled revenue within 18 months"
      ],
      fundingAmount: "$1.2M",
      timeline: "4 months",
      icon: "🌾"
    },
    {
      title: "Mining Project Finance",
      sector: "Mining",
      client: "Gold Mining Operation",
      challenge: "A mining company required $15M in project financing to develop a new gold extraction site and purchase modern equipment.",
      solution: "We structured a complex project finance deal, conducted due diligence support, and negotiated favorable terms with international mining finance institutions.",
      results: [
        "Secured $15M project financing",
        "Achieved 70% LTV on asset financing",
        "Completed project 2 months ahead of schedule",
        "Generated 300+ local jobs"
      ],
      fundingAmount: "$15M",
      timeline: "10 months",
      icon: "⛏️"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Real results from our investment facilitation and advisory work
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="space-y-12">
          {cases.map((caseStudy, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.2}>
              <motion.div 
                className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="md:flex">
                <div className="md:w-1/3 bg-primary-600 text-white p-8">
                  <div className="text-6xl mb-4">{caseStudy.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{caseStudy.title}</h3>
                  <p className="text-primary-100 mb-6">{caseStudy.sector}</p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-primary-100">Funding Secured</p>
                      <p className="text-2xl font-bold">{caseStudy.fundingAmount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-primary-100">Timeline</p>
                      <p className="text-xl font-semibold">{caseStudy.timeline}</p>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3 p-8">
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">The Challenge</h4>
                    <p className="text-gray-700">{caseStudy.challenge}</p>
                  </div>
                  
                  <div className="mb-6">
                    <h4 className="font-bold text-gray-900 mb-2">Our Solution</h4>
                    <p className="text-gray-700">{caseStudy.solution}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Key Results</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {caseStudy.results.map((result, idx) => (
                        <div key={idx} className="flex items-start">
                          <span className="text-primary-600 mr-2 mt-1">✓</span>
                          <span className="text-gray-700">{result}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        <div className="mt-12 text-center">
          <FadeInWhenVisible delay={0.6}>
            <p className="text-gray-600 mb-4 text-lg">Ready to write your own success story?</p>
            <motion.a 
              href="/contact" 
              className="inline-block bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Today
            </motion.a>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}