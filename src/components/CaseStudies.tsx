'use client'

import { motion } from 'framer-motion'
import FadeInWhenVisible from './FadeInWhenVisible'

export default function CaseStudies() {
  const cases = [
    {
      title: "Mechaso Rock-to-Wealth Project",
      sector: "Industry / Mining",
      client: "Mechaso Rock-to-Wealth",
      challenge: "A waste rock recycling and supply chain industrialization initiative needed structured investment facilitation to drive sustainable construction in Ghana.",
      solution: "We developed comprehensive project documentation, conducted feasibility analysis, and structured bankable investment frameworks to attract financing for sustainable industrial development.",
      results: [
        "Developed investor-ready project structure",
        "Positioned for sustainable construction impact",
        "Created framework for waste-to-value transformation",
        "Established supply chain industrialization model"
      ],
      fundingAmount: "In Progress",
      timeline: "Active",
      icon: "♻️"
    },
    {
      title: "Olames Biochar & BioPellets Project",
      sector: "Energy / Agribusiness",
      client: "Olames",
      challenge: "A renewable energy venture producing green fuels for industrial and agricultural applications required investment structuring and capital access.",
      solution: "We structured the biochar and biopellets production project, prepared investor documentation, and facilitated connections with impact investors focused on renewable energy and sustainable agriculture.",
      results: [
        "Structured bankable renewable energy project",
        "Positioned for green fuel production",
        "Created dual-impact framework (industry + agriculture)",
        "Developed sustainability metrics for investors"
      ],
      fundingAmount: "In Progress",
      timeline: "Active",
      icon: "🌱"
    },
    {
      title: "GEM Cashew Pro",
      sector: "Agribusiness",
      client: "GEM Cashew Pro",
      challenge: "An integrated cashew processing project with strong export potential needed structured investment facilitation to unlock local value addition and international market access.",
      solution: "We developed comprehensive project structuring including financial modeling, market analysis, and investor-ready documentation for this value-addition agribusiness venture.",
      results: [
        "Structured integrated processing framework",
        "Positioned for export market access",
        "Created local value addition model",
        "Developed investor engagement strategy"
      ],
      fundingAmount: "In Progress",
      timeline: "Active",
      icon: "�"
    },
    {
      title: "ClickInsure (TransactShield Africa)",
      sector: "FinTech / InsurTech",
      client: "TransactShield Africa",
      challenge: "A digital insurance platform revolutionizing policy access and management for individuals and businesses across Africa required strategic positioning and investment structuring.",
      solution: "We provided strategic advisory and investment structuring for this integrated InsurTech solution, positioning it for scale across African markets with proper governance frameworks.",
      results: [
        "Structured scalable InsurTech platform",
        "Positioned for pan-African expansion",
        "Developed digital transformation framework",
        "Created investor-ready governance structure"
      ],
      fundingAmount: "In Progress",
      timeline: "Active",
      icon: "📱"
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Current Portfolio Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Active projects demonstrating our commitment to sustainable growth and impact across Africa
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