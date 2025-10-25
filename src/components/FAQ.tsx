'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import FadeInWhenVisible from './FadeInWhenVisible'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: "What types of businesses do you work with?",
      answer: "We work with startups, SMEs, and established enterprises across energy, agribusiness, mining, and industrial sectors. Whether you're seeking seed funding, growth capital, or project financing, we can help structure and facilitate your funding journey."
    },
    {
      question: "How long does the funding process typically take?",
      answer: "The timeline varies based on project complexity and funding requirements. Typically, startup advisory can take 2-4 months from engagement to investor introduction, while larger project structuring may take 6-12 months. We work to accelerate the process while ensuring thoroughness."
    },
    {
      question: "What are your fees?",
      answer: "Our fee structure is tailored to each engagement and typically includes a combination of advisory fees and success-based components. We offer transparent pricing and will provide a detailed fee proposal during our initial consultation."
    },
    {
      question: "Do I need to have a business plan before engaging your services?",
      answer: "Not necessarily. We can help you develop or refine your business plan as part of our advisory services. However, having a clear understanding of your business concept and goals will help us serve you more effectively from the start."
    },
    {
      question: "What makes Auxilium Consult different from other advisory firms?",
      answer: "We offer end-to-end execution, not just advice. We work hands-on with clients from initial structuring through investor negotiation, fund disbursement, and post-funding support. Our deep sector expertise and extensive investor network are key differentiators."
    },
    {
      question: "Can you help with both debt and equity financing?",
      answer: "Yes, we facilitate both debt and equity financing, as well as hybrid structures. We'll help you determine the optimal capital structure for your specific situation and connect you with appropriate financing partners."
    },
    {
      question: "Do you only work with businesses in Ghana?",
      answer: "While we're based in Ghana, we work with businesses across Africa and facilitate connections with global investors. Our network spans multiple countries and we have experience structuring cross-border transactions."
    },
    {
      question: "What documentation do I need to get started?",
      answer: "Initially, we'll need basic information about your business and project. As we progress, we'll work together to develop comprehensive documentation including financial models, investment memoranda, and due diligence materials."
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Get answers to common questions about our services
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeInWhenVisible key={index} delay={index * 0.1}>
              <motion.div 
                className="border border-gray-200 rounded-lg overflow-hidden"
                initial={false}
              >
                <motion.button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors flex items-center justify-between"
                  whileHover={{ backgroundColor: 'rgb(249, 250, 251)' }}
                >
                  <span className="font-semibold text-gray-900 pr-8">{faq.question}</span>
                  <motion.span 
                    className="text-primary-600 text-2xl flex-shrink-0"
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {openIndex === index ? '−' : '+'}
                  </motion.span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeInWhenVisible>
          ))}
        </div>

        <FadeInWhenVisible delay={0.8}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">Still have questions?</p>
            <motion.a 
              href="/contact" 
              className="inline-block bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 rounded-lg font-semibold transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Us
            </motion.a>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}