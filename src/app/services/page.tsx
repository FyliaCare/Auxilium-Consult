import type { Metadata } from 'next'
import FeeStructure from '@/components/FeeStructure'

export const metadata: Metadata = {
  title: 'Our Services - Auxilium Consult',
  description: 'Comprehensive business advisory and investment facilitation services including startup advisory, SME consulting, investment structuring, and strategic partnerships.',
}

export default function ServicesPage() {
  const services = [
    {
      title: "Startup Advisory",
      icon: "🚀",
      description: "Guiding early-stage ventures through investor readiness and structuring.",
      details: [
        "Business model validation and refinement",
        "Investor pitch deck development",
        "Financial projections and modeling",
        "Investor readiness assessment",
        "Due diligence preparation",
        "Valuation guidance"
      ],
      idealFor: "Early-stage startups seeking seed or Series A funding"
    },
    {
      title: "SME Growth Consulting",
      icon: "📈",
      description: "Helping small and medium enterprises scale through capital access.",
      details: [
        "Growth strategy development",
        "Operational efficiency optimization",
        "Market expansion planning",
        "Capital requirements analysis",
        "Funding source identification",
        "Performance metrics implementation"
      ],
      idealFor: "Established SMEs looking to scale operations"
    },
    {
      title: "Project Investment Structuring",
      icon: "🏗️",
      description: "Developing bankable financial and strategic frameworks.",
      details: [
        "Project feasibility studies",
        "Financial structuring and modeling",
        "Risk assessment and mitigation",
        "Legal and regulatory compliance",
        "Environmental and social impact assessment",
        "Bankable project documentation"
      ],
      idealFor: "Large-scale projects in energy, mining, and infrastructure"
    },
    {
      title: "Capital Partnerships",
      icon: "🤝",
      description: "Connecting clients to finance houses and institutional investors.",
      details: [
        "Investor identification and targeting",
        "Investment memorandum preparation",
        "Investor roadshow coordination",
        "Term sheet negotiation support",
        "Deal structuring and closure",
        "Post-investment relationship management"
      ],
      idealFor: "Businesses seeking equity or debt financing"
    },
    {
      title: "Strategic Advisory",
      icon: "💡",
      description: "Providing sustainability and governance support post-funding.",
      details: [
        "Corporate governance framework design",
        "Sustainability strategy development",
        "Board advisory services",
        "Stakeholder engagement planning",
        "Impact measurement and reporting",
        "Long-term value creation strategies"
      ],
      idealFor: "Funded businesses seeking sustainable growth"
    },
    {
      title: "End-to-End Execution",
      icon: "⚡",
      description: "Complete fundraising and investment management support.",
      details: [
        "Full fundraising campaign management",
        "Investor negotiation representation",
        "Fund disbursement coordination",
        "Implementation oversight",
        "Performance monitoring and reporting",
        "Continuous strategic support"
      ],
      idealFor: "Clients requiring comprehensive execution support"
    }
  ]

  const sectors = [
    {
      name: "Energy",
      icon: "⚡",
      description: "Renewable energy, power generation, and energy infrastructure projects",
      examples: ["Solar farms", "Hydro projects", "Power distribution", "Energy storage"]
    },
    {
      name: "Agribusiness",
      icon: "🌾",
      description: "Agriculture, food processing, and agro-industrial ventures",
      examples: ["Commercial farming", "Food processing", "Agro-exports", "Irrigation systems"]
    },
    {
      name: "Mining",
      icon: "⛏️",
      description: "Mining operations, mineral processing, and resource extraction",
      examples: ["Gold mining", "Mineral exploration", "Processing plants", "Mining services"]
    },
    {
      name: "Industry",
      icon: "🏭",
      description: "Manufacturing, industrial production, and value-added processing",
      examples: ["Manufacturing", "Industrial parks", "Processing facilities", "Logistics"]
    }
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Comprehensive business advisory and investment facilitation across all stages of your growth journey
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Tailored solutions to help you access funding and achieve sustainable growth
            </p>
          </div>

          <div className="space-y-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="md:flex">
                  <div className="md:w-1/3 bg-primary-600 text-white p-8 flex flex-col justify-center">
                    <div className="text-6xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                    <p className="text-primary-100">{service.description}</p>
                  </div>
                  <div className="md:w-2/3 p-8">
                    <h4 className="font-semibold text-gray-900 mb-4">What We Do:</h4>
                    <ul className="grid md:grid-cols-2 gap-3 mb-6">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-primary-600 mr-2">✓</span>
                          <span className="text-gray-700">{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-white p-4 rounded border-l-4 border-primary-600">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Ideal for:</span> {service.idealFor}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Sectors We Serve</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deep expertise across Africa&apos;s key growth sectors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sectors.map((sector, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{sector.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{sector.name}</h3>
                <p className="text-gray-600 mb-4 text-sm">{sector.description}</p>
                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">Examples:</p>
                  <div className="flex flex-wrap gap-2">
                    {sector.examples.map((example, idx) => (
                      <span key={idx} className="text-xs bg-primary-50 text-primary-700 px-2 py-1 rounded">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A structured, 5-step approach to delivering results
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Client Intake & Qualification</h3>
              <p className="text-sm text-gray-600">Assess project readiness and funding objectives</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Due Diligence & Structuring</h3>
              <p className="text-sm text-gray-600">Prepare investor-ready documentation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Investor Engagement</h3>
              <p className="text-sm text-gray-600">Match clients with vetted financiers and investors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Funding Facilitation</h3>
              <p className="text-sm text-gray-600">Coordinate negotiations through deal closure</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                5
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Post-Funding Support</h3>
              <p className="text-sm text-gray-600">Monitor performance and provide continuous advisory</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fee Structure Section */}
      <FeeStructure />

      {/* CTA Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Schedule a consultation to discuss your funding needs and how we can help
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Contact Us
            </a>
            <a href="/about" className="border-2 border-white text-white hover:bg-primary-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
              Learn More About Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}