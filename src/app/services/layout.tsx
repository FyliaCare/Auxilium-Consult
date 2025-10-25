import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Services',
  description: 'Comprehensive business advisory services including startup advisory, SME growth consulting, project investment structuring, capital partnerships, and strategic advisory for businesses in Ghana and across Africa.',
  openGraph: {
    title: 'Services - Auxilium Consult',
    description: 'Expert business advisory services to help you access funding and grow your business.',
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

