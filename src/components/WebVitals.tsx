'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function WebVitalsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track page views
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // You can send this to your analytics service
      console.log('Page view:', url)
    }
  }, [pathname, searchParams])

  return null
}

export function WebVitals() {
  return (
    <Suspense fallback={null}>
      <WebVitalsInner />
    </Suspense>
  )
}

export function reportWebVitals(metric: any) {
  // You can send metrics to your analytics service
  // Example: Google Analytics, Vercel Analytics, etc.
  if (process.env.NODE_ENV === 'production') {
    console.log(metric)
    
    // Example: Send to Google Analytics
    // window.gtag('event', metric.name, {
    //   value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //   event_label: metric.id,
    //   non_interaction: true,
    // })
  }
}
