'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const dynamic = 'force-dynamic'

interface Project {
  id: string
  projectName: string
  sector: string
  status: string
  fundingRequired: number
  fundingSecured: number
  progressPercentage: number
  currentStage: number
}

interface ClientData {
  companyName: string
  contactPerson: string
  engagementStatus: string
  projects: Project[]
  unreadMessages: number
  documentsCount: number
}

export default function ClientDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [clientData, setClientData] = useState<ClientData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'CLIENT') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'CLIENT') {
      fetchClientData()
    }
  }, [status, session])

  const fetchClientData = async () => {
    try {
      const response = await fetch('/api/client/dashboard')
      if (response.ok) {
        const data = await response.json()
        setClientData(data)
      }
    } catch (error) {
      console.error('Error fetching client data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'CLIENT' || !clientData) {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      INTAKE: 'bg-blue-100 text-blue-700',
      DUE_DILIGENCE: 'bg-yellow-100 text-yellow-700',
      INVESTOR_ENGAGEMENT: 'bg-purple-100 text-purple-700',
      FUNDING: 'bg-orange-100 text-orange-700',
      POST_FUNDING: 'bg-green-100 text-green-700',
      COMPLETED: 'bg-gray-100 text-gray-700',
      ON_HOLD: 'bg-red-100 text-red-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  const getStageLabel = (stage: number) => {
    const stages = [
      'Intake & Qualification',
      'Due Diligence',
      'Investor Engagement',
      'Funding Facilitation',
      'Post-Funding Support'
    ]
    return stages[stage - 1] || 'Unknown'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{clientData.companyName}</h1>
              <p className="text-sm text-gray-600">Welcome back, {clientData.contactPerson}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
                Back to Website
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900">{clientData.projects.length}</p>
              </div>
              <div className="text-4xl">💼</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Documents</p>
                <p className="text-3xl font-bold text-gray-900">{clientData.documentsCount}</p>
              </div>
              <div className="text-4xl">📁</div>
            </div>
            <div className="mt-4">
              <Link href="/client/documents" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">New Messages</p>
                <p className="text-3xl font-bold text-gray-900">{clientData.unreadMessages}</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
            <div className="mt-4">
              <Link href="/client/messages" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View inbox →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Projects</h2>
          </div>

          {clientData.projects.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No projects yet</p>
              <Link href="/contact" className="text-primary-600 hover:text-primary-700 font-medium">
                Contact us to start your funding journey
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {clientData.projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-gray-900">{project.projectName}</h3>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                          {project.status.replace('_', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">Sector: {project.sector}</p>
                    </div>
                    <Link
                      href={`/client/projects/${project.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                    >
                      View Details →
                    </Link>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Funding Required</p>
                      <p className="text-lg font-semibold text-gray-900">${(project.fundingRequired / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Funding Secured</p>
                      <p className="text-lg font-semibold text-green-600">${(project.fundingSecured / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Progress</p>
                      <p className="text-lg font-semibold text-primary-600">{project.progressPercentage}%</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                      <span>Current Stage: {getStageLabel(project.currentStage)}</span>
                      <span>{project.progressPercentage}% Complete</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${project.progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Stage Indicators */}
                  <div className="flex justify-between">
                    {[1, 2, 3, 4, 5].map((stage) => (
                      <div
                        key={stage}
                        className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-semibold ${
                          stage <= project.currentStage
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {stage}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/client/documents" className="flex items-center p-4 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group">
              <span className="text-3xl mr-3">📁</span>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">View Documents</p>
                <p className="text-sm text-gray-600">Access all your files</p>
              </div>
            </Link>
            <Link href="/client/messages" className="flex items-center p-4 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group">
              <span className="text-3xl mr-3">💬</span>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">Messages</p>
                <p className="text-sm text-gray-600">Chat with your advisor</p>
              </div>
            </Link>
            <Link href="/contact" className="flex items-center p-4 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group">
              <span className="text-3xl mr-3">📞</span>
              <div>
                <p className="font-medium text-gray-900 group-hover:text-primary-600">Contact Support</p>
                <p className="text-sm text-gray-600">Get help anytime</p>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
