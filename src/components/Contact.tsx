'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import FadeInWhenVisible from './FadeInWhenVisible'

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ready to take your business to the next level? Contact us today to discuss how we can help you access the funding you need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-6 h-6 text-primary-600 mr-4">📍</div>
                <div>
                  <p className="font-semibold text-gray-900">Address</p>
                  <p className="text-gray-600">Accra, Ghana</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 text-primary-600 mr-4">📞</div>
                <div>
                  <p className="font-semibold text-gray-900">Phone</p>
                  <p className="text-gray-600">+233 XX XXX XXXX</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 text-primary-600 mr-4">✉️</div>
                <div>
                  <p className="font-semibold text-gray-900">Email</p>
                  <p className="text-gray-600">info@auxiliumconsult.com</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Business Hours</h4>
              <div className="text-gray-600">
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 2:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <motion.input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'name' ? 1.02 : 1,
                    borderColor: focusedField === 'name' ? 'rgb(34, 197, 94)' : 'rgb(209, 213, 219)'
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <motion.input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'email' ? 1.02 : 1,
                    borderColor: focusedField === 'email' ? 'rgb(34, 197, 94)' : 'rgb(209, 213, 219)'
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Organization
                </label>
                <motion.input
                  type="text"
                  id="company"
                  name="company"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'company' ? 1.02 : 1,
                    borderColor: focusedField === 'company' ? 'rgb(34, 197, 94)' : 'rgb(209, 213, 219)'
                  }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                  Service of Interest
                </label>
                <motion.select
                  id="service"
                  name="service"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  onFocus={() => setFocusedField('service')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'service' ? 1.02 : 1,
                    borderColor: focusedField === 'service' ? 'rgb(34, 197, 94)' : 'rgb(209, 213, 219)'
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <option value="">Select a service</option>
                  <option value="startup-advisory">Startup Advisory</option>
                  <option value="sme-consulting">SME Growth Consulting</option>
                  <option value="investment-structuring">Project Investment Structuring</option>
                  <option value="capital-partnerships">Capital Partnerships</option>
                  <option value="strategic-advisory">Strategic Advisory</option>
                </motion.select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <motion.textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  animate={{
                    scale: focusedField === 'message' ? 1.02 : 1,
                    borderColor: focusedField === 'message' ? 'rgb(34, 197, 94)' : 'rgb(209, 213, 219)'
                  }}
                  transition={{ duration: 0.2 }}
                ></motion.textarea>
              </div>
              <motion.button
                type="submit"
                className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}