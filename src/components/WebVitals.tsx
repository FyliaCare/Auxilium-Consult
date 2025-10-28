'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function WebVitalsInner() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && 'performance' in window) {
      // Track page views
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      
      // Only log in development
      if (process.env.NODE_ENV === 'development') {
        console.log('Page view:', url)
      }
      
      // Send to analytics in production
      if (process.env.NODE_ENV === 'production' && window.gtag) {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
          page_path: url,
        })
      }
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
  // Only log metrics in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric)
  }
  
  // Send metrics to analytics in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    // if (window.gtag) {
    //   window.gtag('event', metric.name, {
    //     value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    //     event_label: metric.id,
    //     non_interaction: true,
    //   })
    // }
  }
}
