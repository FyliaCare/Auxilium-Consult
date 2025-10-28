'use client'

import { motion } from 'framer-motion'
import FadeInWhenVisible from '@/components/FadeInWhenVisible'
import AnimatedCounter from '@/components/AnimatedCounter'
import Leadership from '@/components/Leadership'
import Partners from '@/components/Partners'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About Auxilium Consult</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Bridging the gap between promising African enterprises and global capital through trust, structure, and innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-primary-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🎯</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To help businesses access the funding they need to grow and achieve their purpose by providing structured, transparent, and impactful investment facilitation and advisory services across Africa and beyond.
              </p>
            </div>
            
            <div className="bg-primary-50 p-8 rounded-lg">
              <div className="text-4xl mb-4">🔭</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become Africa&apos;s leading investment facilitation and growth partner — bridging the gap between credible businesses and global capital through trust, structure, and innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Core Principles</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The values that guide everything we do at Auxilium Consult
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We uphold transparency and honesty in every engagement, ensuring trust in all client and investor relationships.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We deliver professional, results-driven advisory that meets international standards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Access</h3>
              <p className="text-gray-600">
                We connect credible businesses to global funding sources through structured facilitation.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Impact</h3>
              <p className="text-gray-600">
                We focus on creating long-term value for clients, investors, and communities through every deal we structure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Auxilium Consult was founded with a clear purpose: to bridge the critical funding gap that prevents many promising African businesses from reaching their full potential. We recognized that across key sectors like energy, agribusiness, mining, and industry, credible businesses with viable projects often struggle to connect with the right investors and financial partners.
              </p>
              <p className="text-gray-700 mb-4">
                Based in Ghana, we operate at the intersection of African enterprise and global capital. Our team brings together deep sector expertise, financial structuring knowledge, and an extensive network of investors and financial institutions. We don&apos;t just advise — we execute, working hands-on with our clients from initial concept through to successful funding and beyond.
              </p>
              <p className="text-gray-700">
                Today, Auxilium Consult is proud to serve startups, SMEs, and established enterprises across multiple sectors, helping them structure bankable projects, navigate investor relationships, and secure the capital they need to grow sustainably and create lasting impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <FadeInWhenVisible delay={0}>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter value={50} suffix="+" />
                </div>
                <div className="text-primary-100">Projects Structured</div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.1}>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter value={4} />
                </div>
                <div className="text-primary-100">Key Sectors</div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.2}>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter value={100} prefix="$" suffix="M+" />
                </div>
                <div className="text-primary-100">Capital Facilitated</div>
              </div>
            </FadeInWhenVisible>
            <FadeInWhenVisible delay={0.3}>
              <div>
                <div className="text-4xl md:text-5xl font-bold mb-2">
                  <AnimatedCounter value={95} suffix="%" />
                </div>
                <div className="text-primary-100">Client Satisfaction</div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </section>

      {/* Our Edge */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Sets Us Apart</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our unique advantages in investment facilitation and business advisory
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 mb-2">Access to Projects</h3>
                <p className="text-gray-600 text-sm">Broad portfolio across key growth sectors</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🎓</div>
                <h3 className="font-bold text-gray-900 mb-2">Sector Experience</h3>
                <p className="text-gray-600 text-sm">Deep understanding of emerging market dynamics</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🔄</div>
                <h3 className="font-bold text-gray-900 mb-2">End-to-End Advisory</h3>
                <p className="text-gray-600 text-sm">From concept structuring to investor engagement and closure</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                <div className="text-3xl mb-3">🌱</div>
                <h3 className="font-bold text-gray-900 mb-2">Sustainability Focus</h3>
                <p className="text-gray-600 text-sm">Structuring deals that generate lasting economic and social impact</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Grow Your Business?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let&apos;s discuss how we can help you access the funding you need to achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Get Started
            </a>
            <a href="/services" className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <Leadership />

      {/* Partners Section */}
      <Partners />

      {/* Closing Note */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Building Africa&apos;s Success Stories</h2>
          <p className="text-xl text-primary-100 mb-8 leading-relaxed">
            Auxilium Consult remains committed to empowering businesses through access to strategic capital and sustainable growth solutions. We invite investors, entrepreneurs, and institutions to partner with us in building the next wave of Africa&apos;s success stories.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Partner With Us
            </a>
            <a href="/insights" className="border-2 border-white text-white hover:bg-primary-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Read Our Insights
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}