'use client'

import FadeInWhenVisible from './FadeInWhenVisible'

export default function About() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInWhenVisible>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">About Auxilium Consult</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Auxilium Consult is a Ghana-based business advisory and investment facilitation firm focused on helping businesses access the funding they need to grow and achieve their goals.
            </p>
          </div>
        </FadeInWhenVisible>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <FadeInWhenVisible direction="right">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To help businesses access the funding they need to grow and achieve their purpose by providing structured, transparent, and impactful investment facilitation and advisory services across Africa and beyond.
              </p>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To become Africa&apos;s leading investment facilitation and growth partner — bridging the gap between credible businesses and global capital through trust, structure, and innovation.
              </p>
            </div>
          </FadeInWhenVisible>

          <FadeInWhenVisible direction="left" delay={0.2}>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Principles</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Integrity</h4>
                    <p className="text-gray-600 text-sm">We uphold transparency and honesty in every engagement, ensuring trust in all client and investor relationships.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Excellence</h4>
                    <p className="text-gray-600 text-sm">We deliver professional, results-driven advisory that meets international standards.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Access</h4>
                    <p className="text-gray-600 text-sm">We connect credible businesses to global funding sources through structured facilitation.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 bg-primary-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Impact</h4>
                    <p className="text-gray-600 text-sm">We focus on creating long-term value for clients, investors, and communities through every deal we structure.</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  )
}