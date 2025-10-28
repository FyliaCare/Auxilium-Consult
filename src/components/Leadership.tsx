'use client'

import FadeInWhenVisible from './FadeInWhenVisible'
import { motion } from 'framer-motion'

export default function Leadership() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Leadership</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Guided by experience, driven by impact
            </p>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.2}>
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="bg-gradient-to-br from-primary-50 to-white p-8 md:p-12 rounded-lg shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="md:flex md:items-start md:gap-8">
                <div className="md:w-1/3 mb-6 md:mb-0">
                  <div className="w-48 h-48 mx-auto bg-gradient-to-br from-primary-600 to-primary-800 rounded-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <div className="text-6xl mb-2">👨‍💼</div>
                      <div className="text-sm font-semibold">Founder & CEO</div>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                    Sean Desmond Allotey
                  </h3>
                  <p className="text-primary-600 font-semibold mb-4 text-lg">
                    Founder & CEO
                  </p>
                  
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700 mb-4">
                      Sean is an investment facilitator and strategic advisor passionate about helping African businesses unlock their potential. With experience in project structuring, finance, and partnership development, he leads Auxilium Consult&apos;s mission to build sustainable business growth across the continent.
                    </p>
                    
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h4 className="font-semibold text-gray-900 mb-3">Areas of Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          'Investment Facilitation',
                          'Project Structuring',
                          'Strategic Advisory',
                          'Partnership Development',
                          'Capital Access',
                          'Business Growth'
                        ].map((expertise, index) => (
                          <span 
                            key={index}
                            className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {expertise}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.4}>
          <div className="mt-12 text-center">
            <p className="text-gray-600 mb-4">
              Under Sean&apos;s leadership, Auxilium Consult remains committed to empowering businesses through access to strategic capital and sustainable growth solutions.
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  )
}
