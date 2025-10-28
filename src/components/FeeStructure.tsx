'use client'

import FadeInWhenVisible from './FadeInWhenVisible'
import { motion } from 'framer-motion'

export default function FeeStructure() {
  const feeComponents = [
    {
      title: "Engagement Fee",
      amount: "₵30,000",
      type: "Non-Refundable",
      timing: "Payable upon signing",
      icon: "🤝",
      description: "Initial engagement fee to cover due diligence, project structuring, and investor preparation activities."
    },
    {
      title: "Success Commission",
      amount: "3-4%",
      type: "Performance-Based",
      timing: "Payable upon disbursement",
      icon: "🎯",
      description: "Commission based on total funds raised, payable only when funding is successfully secured and disbursed."
    },
    {
      title: "Milestone Fees",
      amount: "Variable",
      type: "Optional",
      timing: "Multi-phase projects",
      icon: "📊",
      description: "Optional fees for complex, multi-phase projects covering investor introduction, LOI negotiation, and deal closure stages."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Fee Structure</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Transparent, performance-aligned pricing designed to ensure mutual success
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {feeComponents.map((fee, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.15}>
              <motion.div 
                className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-5xl mb-4 text-center">{fee.icon}</div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">
                  {fee.title}
                </h3>
                
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {fee.amount}
                  </div>
                  <div className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold mb-2">
                    {fee.type}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {fee.timing}
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm text-center leading-relaxed">
                  {fee.description}
                </p>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible delay={0.5}>
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 text-center">Our Commitment</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">Transparent Pricing</h4>
                  <p className="text-primary-100 text-sm">No hidden fees or surprise charges</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">Performance Aligned</h4>
                  <p className="text-primary-100 text-sm">Success commission only when you succeed</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">Flexible Structure</h4>
                  <p className="text-primary-100 text-sm">Options for different project complexities</p>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">✓</span>
                <div>
                  <h4 className="font-semibold mb-1">Value-Driven</h4>
                  <p className="text-primary-100 text-sm">Comprehensive support throughout the process</p>
                </div>
              </div>
            </div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.7}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4 text-lg">
              Ready to discuss your project and fee structure?
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
            >
              Schedule a Consultation
            </a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
