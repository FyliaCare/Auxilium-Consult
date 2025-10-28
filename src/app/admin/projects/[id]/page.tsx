'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { use } from 'react'

interface Milestone {
  id: string
  title: string
  description: string | null
  dueDate: string | null
  completedDate: string | null
  isCompleted: boolean
}

interface ProjectUpdate {
  id: string
  title: string
  description: string
  stage: number
  createdBy: string
  createdAt: string
}

interface ProjectDetail {
  id: string
  projectName: string
  description: string
  clientName: string
  clientEmail: string
  sector: string
  status: string
  fundingRequired: number
  fundingSecured: number
  progressPercentage: number
  currentStage: number
  startDate: string
  targetCloseDate: string | null
  milestones: Milestone[]
  updates: ProjectUpdate[]
}

export default function AdminProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params)
  const { data: session, status } = useSession()
  const router = useRouter()
  const [project, setProject] = useState<ProjectDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/admin-signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/')
    }
  }, [status, session, router])

  const fetchProjectDetail = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/projects/${resolvedParams.id}`)
      if (response.ok) {
        const data = await response.json()
        setProject(data)
      }
    } catch (error) {
      console.error('Error fetching project:', error)
    } finally {
      setLoading(false)
    }
  }, [resolvedParams.id])

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchProjectDetail()
    }
  }, [status, session, fetchProjectDetail])

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      INTAKE: 'bg-blue-100 text-blue-700',
      DUE_DILIGENCE: 'bg-yellow-100 text-yellow-700',
      INVESTOR_ENGAGEMENT: 'bg-purple-100 text-purple-700',
      FUNDING: 'bg-orange-100 text-orange-700',
      POST_FUNDING: 'bg-green-100 text-green-700',
      COMPLETED: 'bg-gray-100 text-gray-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session || session.user.role !== 'ADMIN' || !project) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/projects" className="text-sm text-gray-600 hover:text-primary-600 mb-2 inline-block">
                ← Back to Projects
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">{project.projectName}</h1>
              <p className="text-sm text-gray-600">{project.clientName}</p>
            </div>
            <div className="flex gap-3">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Edit Project
              </Link>
              <button className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Add Update
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Project Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(project.status)}`}>
                    {project.status.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Sector</p>
                  <p className="font-medium text-gray-900">{project.sector}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Start Date</p>
                  <p className="font-medium text-gray-900">{new Date(project.startDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Target Close</p>
                  <p className="font-medium text-gray-900">
                    {project.targetCloseDate ? new Date(project.targetCloseDate).toLocaleDateString() : 'Not set'}
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-2">Description</p>
                <p className="text-gray-700">{project.description}</p>
              </div>
            </div>

            {/* Funding Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Funding Progress</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Required</p>
                  <p className="text-2xl font-bold text-gray-900">${(project.fundingRequired / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Secured</p>
                  <p className="text-2xl font-bold text-green-600">${(project.fundingSecured / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Completion</p>
                  <p className="text-2xl font-bold text-primary-600">{Math.round((project.fundingSecured / project.fundingRequired) * 100)}%</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-primary-600 h-4 rounded-full"
                  style={{ width: `${Math.min((project.fundingSecured / project.fundingRequired) * 100, 100)}%` }}
                ></div>
              </div>
            </div>

            {/* Milestones */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Milestones</h2>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  + Add Milestone
                </button>
              </div>
              <div className="space-y-3">
                {project.milestones.map((milestone) => (
                  <div key={milestone.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={milestone.isCompleted}
                      className="mt-1 h-5 w-5 text-primary-600 rounded"
                      readOnly
                    />
                    <div className="flex-1">
                      <p className={`font-medium ${milestone.isCompleted ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                        {milestone.title}
                      </p>
                      {milestone.description && (
                        <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                      )}
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        {milestone.dueDate && (
                          <span>Due: {new Date(milestone.dueDate).toLocaleDateString()}</span>
                        )}
                        {milestone.completedDate && (
                          <span className="text-green-600">Completed: {new Date(milestone.completedDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Project Updates */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Project Timeline</h2>
              <div className="space-y-4">
                {project.updates.map((update, index) => (
                  <div key={update.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                        {update.stage}
                      </div>
                      {index < project.updates.length - 1 && (
                        <div className="w-0.5 h-full bg-gray-200 my-1"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <p className="font-medium text-gray-900">{update.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{update.description}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        By {update.createdBy} • {new Date(update.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-4">Client Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Company</p>
                  <p className="font-medium text-gray-900">{project.clientName}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{project.clientEmail}</p>
                </div>
                <Link
                  href={`mailto:${project.clientEmail}`}
                  className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Contact Client
                </Link>
              </div>
            </div>

            {/* Stage Progress */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-4">Current Stage</h3>
              <div className="space-y-2">
                {['Intake', 'Due Diligence', 'Investor Engagement', 'Funding', 'Post-Funding'].map((stage, index) => (
                  <div
                    key={stage}
                    className={`p-3 rounded-lg ${
                      index + 1 === project.currentStage
                        ? 'bg-primary-100 border-2 border-primary-600'
                        : index + 1 < project.currentStage
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${
                        index + 1 === project.currentStage
                          ? 'text-primary-700'
                          : index + 1 < project.currentStage
                          ? 'text-green-700'
                          : 'text-gray-600'
                      }`}>
                        {index + 1}. {stage}
                      </span>
                      {index + 1 < project.currentStage && (
                        <span className="text-green-600">✓</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                  📤 Upload Document
                </button>
                <button className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                  💬 Send Message
                </button>
                <button className="w-full text-left px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-sm transition-colors">
                  📊 Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
