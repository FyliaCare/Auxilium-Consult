import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Insights & Resources - Auxilium Consult',
  description: 'Expert insights on investment facilitation, business advisory, and funding opportunities across African markets.',
}

export default function InsightsPage() {
  const featuredArticles = [
    {
      id: 1,
      title: "Navigating Africa's Renewable Energy Investment Landscape in 2024",
      excerpt: "Exploring the opportunities and challenges in securing funding for renewable energy projects across Sub-Saharan Africa.",
      category: "Energy",
      date: "October 20, 2025",
      readTime: "8 min read",
      image: "📊"
    },
    {
      id: 2,
      title: "5 Key Steps to Making Your Startup Investor-Ready",
      excerpt: "A comprehensive guide to preparing your early-stage venture for successful fundraising and investor engagement.",
      category: "Startup Advisory",
      date: "October 15, 2025",
      readTime: "6 min read",
      image: "🚀"
    },
    {
      id: 3,
      title: "The Rise of Impact Investing in African Agribusiness",
      excerpt: "How sustainability-focused investors are transforming the agricultural sector and creating lasting value.",
      category: "Agribusiness",
      date: "October 10, 2025",
      readTime: "10 min read",
      image: "🌾"
    }
  ]

  const recentInsights = [
    {
      title: "Understanding Debt vs. Equity Financing for SMEs",
      category: "SME Growth",
      date: "October 5, 2025",
      readTime: "5 min read"
    },
    {
      title: "Ghana's Mining Sector: Investment Opportunities and Regulatory Updates",
      category: "Mining",
      date: "September 28, 2025",
      readTime: "7 min read"
    },
    {
      title: "Building Bankable Project Documents: A Practical Guide",
      category: "Investment Structuring",
      date: "September 22, 2025",
      readTime: "9 min read"
    },
    {
      title: "Post-Funding Success: Governance and Performance Management",
      category: "Strategic Advisory",
      date: "September 15, 2025",
      readTime: "6 min read"
    },
    {
      title: "Emerging Trends in African Industrial Development",
      category: "Industry",
      date: "September 8, 2025",
      readTime: "8 min read"
    },
    {
      title: "Valuation Methods for Early-Stage African Startups",
      category: "Startup Advisory",
      date: "September 1, 2025",
      readTime: "7 min read"
    }
  ]

  const categories = [
    "All Insights",
    "Energy",
    "Agribusiness",
    "Mining",
    "Industry",
    "Startup Advisory",
    "SME Growth",
    "Investment Structuring"
  ]

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & Resources</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Expert perspectives on investment facilitation, business growth, and funding opportunities across African markets
            </p>
          </div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex overflow-x-auto gap-3 scrollbar-hide">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
                  index === 0
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Insights</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="bg-primary-100 h-48 flex items-center justify-center text-6xl">
                  {article.image}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">{article.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-primary-600 cursor-pointer">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{article.date}</span>
                    <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                      Read More →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Insights */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Insights</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentInsights.map((insight, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-6 hover:border-primary-600 hover:shadow-md transition-all cursor-pointer">
                <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-3 py-1 rounded inline-block mb-3">
                  {insight.category}
                </span>
                <h3 className="font-bold text-gray-900 mb-3 hover:text-primary-600">
                  {insight.title}
                </h3>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{insight.date}</span>
                  <span>{insight.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Informed</h2>
          <p className="text-xl text-primary-100 mb-8">
            Subscribe to our newsletter for the latest insights on investment opportunities and business growth
          </p>
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-700 hover:bg-gray-100 px-6 py-3 rounded-lg font-semibold transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-primary-100 mt-3">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Downloadable Resources</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary-600">
              <div className="text-3xl mb-3">📄</div>
              <h3 className="font-bold text-gray-900 mb-2">Startup Funding Guide</h3>
              <p className="text-sm text-gray-600 mb-4">
                Complete guide to securing your first round of funding
              </p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                Download PDF →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary-600">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="font-bold text-gray-900 mb-2">Investment Checklist</h3>
              <p className="text-sm text-gray-600 mb-4">
                Essential documents and metrics investors look for
              </p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                Download PDF →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-primary-600">
              <div className="text-3xl mb-3">💼</div>
              <h3 className="font-bold text-gray-900 mb-2">Sector Report 2024</h3>
              <p className="text-sm text-gray-600 mb-4">
                Analysis of investment trends across key sectors
              </p>
              <button className="text-primary-600 hover:text-primary-700 font-semibold text-sm">
                Download PDF →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Need Personalized Advice?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Our team is ready to provide tailored guidance for your specific funding needs
          </p>
          <Link href="/contact" className="inline-block bg-primary-600 text-white hover:bg-primary-700 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  )
}