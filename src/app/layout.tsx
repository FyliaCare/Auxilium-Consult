import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Auxilium Consult - Business Advisory & Investment Facilitation',
  description: 'Ghana-based business advisory and investment facilitation firm helping businesses access funding across energy, agribusiness, mining, and industry sectors.',
  keywords: 'business advisory, investment facilitation, Ghana, Africa, funding, startup advisory, SME consulting',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}