'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Client {
  id: string
  companyName: string
  contactPerson: string
  email: string
  phoneNumber: string
  industry: string
  engagementStatus: string
  engagementFeePaid: boolean
  projectsCount: number
  createdAt: string
}

export default function AdminClientsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [clients, setClients] = useState<Client[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/admin-signin')
    } else if (status === 'authenticated' && session?.user?.role !== 'ADMIN') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'ADMIN') {
      fetchClients()
    }
  }, [status, session])

  const fetchClients = async () => {
    try {
      const response = await fetch('/api/admin/clients')
      if (response.ok) {
        const data = await response.json()
        setClients(data)
      }
    } catch (error) {
      console.error('Error fetching clients:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredClients = clients.filter(client =>
    client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      INQUIRY: 'bg-gray-100 text-gray-700',
      QUALIFIED: 'bg-blue-100 text-blue-700',
      ENGAGED: 'bg-yellow-100 text-yellow-700',
      ACTIVE: 'bg-green-100 text-green-700',
      COMPLETED: 'bg-purple-100 text-purple-700',
      INACTIVE: 'bg-red-100 text-red-700',
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

  if (!session || session.user.role !== 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <Link href="/admin/dashboard" className="text-sm text-gray-600 hover:text-primary-600 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Client Management</h1>
            </div>
            <Link
              href="/admin/clients/new"
              className="bg-primary-600 text-white hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              + Add New Client
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search clients by name, company, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="ENGAGED">Engaged</option>
              <option value="INQUIRY">Inquiry</option>
            </select>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company / Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email / Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Projects
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee Paid
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{client.companyName}</div>
                      <div className="text-sm text-gray-500">{client.contactPerson}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{client.email}</div>
                      <div className="text-sm text-gray-500">{client.phoneNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{client.industry || 'N/A'}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(client.engagementStatus)}`}>
                      {client.engagementStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {client.projectsCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.engagementFeePaid ? (
                      <span className="text-green-600">✓ Paid</span>
                    ) : (
                      <span className="text-red-600">✗ Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Link
                      href={`/admin/clients/${client.id}`}
                      className="text-primary-600 hover:text-primary-900 mr-3"
                    >
                      View
                    </Link>
                    <Link
                      href={`/admin/clients/${client.id}/edit`}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredClients.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No clients found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
