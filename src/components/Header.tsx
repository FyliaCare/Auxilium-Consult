'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Insights', href: '/insights' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image 
                src="/Auxillium.png" 
                alt="Auxilium Consult Logo" 
                width={150}
                height={60}
                className="h-12 w-auto"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {menuItems.map((item) => (
                <Link 
                  key={item.name}
                  href={item.href} 
                  className="text-gray-900 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                href="/auth/admin-signin" 
                className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Admin
              </Link>
              <Link 
                href="/client-portal" 
                className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Client Portal
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-900 hover:text-primary-600 p-2"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-gray-900 hover:bg-primary-50 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: menuItems.length * 0.1 }}
              >
                <Link
                  href="/auth/admin-signin"
                  className="border border-primary-600 text-primary-600 hover:bg-primary-50 block px-3 py-2 rounded-md text-base font-medium text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Sign In
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: (menuItems.length + 1) * 0.1 }}
              >
                <Link
                  href="/client-portal"
                  className="bg-primary-600 text-white hover:bg-primary-700 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Client Portal
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}