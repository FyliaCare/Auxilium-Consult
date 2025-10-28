import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Client Portal - Auxilium Consult',
  description: 'Secure access to your investment projects, documents, and advisory resources.',
}

export default function ClientPortalPage() {
  // Redirect to the new sign-in page
  redirect('/auth/signin')
}
