'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export const dynamic = 'force-dynamic'

interface DashboardStats {
  totalClients: number
  activeProjects: number
  totalFundingFacilitated: number
  pendingMessages: number
}

export default function AdminDashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats>({
    totalClients: 0,
    activeProjects: 0,
    totalFundingFacilitated: 0,
    pendingMessages: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/admin-signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchDashboardData()
    }
  }, [status, session])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/admin/dashboard-stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
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

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  const menuItems = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊', active: true },
    { name: 'Clients', href: '/admin/clients', icon: '👥', active: false },
    { name: 'Projects', href: '/admin/projects', icon: '💼', active: false },
    { name: 'Documents', href: '/admin/documents', icon: '📁', active: false },
    { name: 'Messages', href: '/admin/messages', icon: '💬', active: false },
    { name: 'Reports', href: '/admin/reports', icon: '📈', active: false },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️', active: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {session.user.name}</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
                View Website
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
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalClients}</p>
              </div>
              <div className="text-4xl">👥</div>
            </div>
            <div className="mt-4">
              <Link href="/admin/clients" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View all →
              </Link>
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
                <p className="text-sm text-gray-600 mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900">{stats.activeProjects}</p>
              </div>
              <div className="text-4xl">💼</div>
            </div>
            <div className="mt-4">
              <Link href="/admin/projects" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Manage →
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
                <p className="text-sm text-gray-600 mb-1">Total Funding</p>
                <p className="text-3xl font-bold text-gray-900">${(stats.totalFundingFacilitated / 1000000).toFixed(1)}M</p>
              </div>
              <div className="text-4xl">💰</div>
            </div>
            <div className="mt-4">
              <Link href="/admin/reports" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                View reports →
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Pending Messages</p>
                <p className="text-3xl font-bold text-gray-900">{stats.pendingMessages}</p>
              </div>
              <div className="text-4xl">💬</div>
            </div>
            <div className="mt-4">
              <Link href="/admin/messages" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Reply →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link href="/admin/clients/new" className="flex items-center p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group">
                <span className="text-2xl mr-3">➕</span>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600">Add New Client</p>
                  <p className="text-sm text-gray-600">Create a new client profile</p>
                </div>
              </Link>
              <Link href="/admin/projects/new" className="flex items-center p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group">
                <span className="text-2xl mr-3">📋</span>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600">Create Project</p>
                  <p className="text-sm text-gray-600">Start a new funding project</p>
                </div>
              </Link>
              <Link href="/admin/documents/upload" className="flex items-center p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group">
                <span className="text-2xl mr-3">📤</span>
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-primary-600">Upload Document</p>
                  <p className="text-sm text-gray-600">Add files to client folders</p>
                </div>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-lg shadow p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">Navigation</h3>
            <div className="grid grid-cols-2 gap-3">
              {menuItems.filter(item => !item.active).map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex flex-col items-center p-4 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors group"
                >
                  <span className="text-3xl mb-2">{item.icon}</span>
                  <span className="text-sm font-medium text-gray-900 group-hover:text-primary-600">{item.name}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
            <Link href="/admin/activity" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-3">
            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <span className="text-xl mr-3">🔔</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New client registered</p>
                <p className="text-xs text-gray-600">Demo Client joined - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <span className="text-xl mr-3">📊</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Project milestone completed</p>
                <p className="text-xs text-gray-600">Green Energy Initiative - Financial Model Approved</p>
              </div>
            </div>
            <div className="flex items-start p-3 bg-gray-50 rounded-lg">
              <span className="text-xl mr-3">💬</span>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">New message received</p>
                <p className="text-xs text-gray-600">From Demo Client - 1 day ago</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
