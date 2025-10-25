import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { WebVitals } from '@/components/WebVitals'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://auxiliumconsult.com'),
  title: {
    default: 'Auxilium Consult - Business Advisory & Investment Facilitation in Ghana',
    template: '%s | Auxilium Consult'
  },
  description: 'Ghana-based business advisory and investment facilitation firm helping businesses access funding across energy, agribusiness, mining, and industry sectors. Expert startup advisory, SME consulting, and project investment structuring.',
  keywords: ['business advisory Ghana', 'investment facilitation', 'startup funding Africa', 'SME consulting', 'project finance', 'agribusiness investment', 'mining finance', 'energy sector funding', 'Ghana business advisory', 'West Africa investment'],
  authors: [{ name: 'Auxilium Consult' }],
  creator: 'Auxilium Consult',
  publisher: 'Auxilium Consult',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://auxiliumconsult.com',
    title: 'Auxilium Consult - Business Advisory & Investment Facilitation',
    description: 'Expert business advisory and investment facilitation services in Ghana. Helping businesses access funding across energy, agribusiness, mining, and industry sectors.',
    siteName: 'Auxilium Consult',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Auxilium Consult - Business Advisory Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Auxilium Consult - Business Advisory & Investment Facilitation',
    description: 'Expert business advisory and investment facilitation services in Ghana.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WebVitals />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}