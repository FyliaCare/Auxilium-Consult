'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface Document {
  id: string
  title: string
  fileName: string
  fileSize: number
  fileType: string
  uploadedBy: string
  uploadedAt: string
  projectName: string
}

export default function ClientDocumentsPage() {
  const { data: session, status } = useSession()
  const [documents, setDocuments] = useState<Document[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin')
    }
    if (session?.user?.role !== 'CLIENT') {
      redirect('/')
    }
  }, [status, session])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchDocuments()
    }
  }, [status])

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/client/documents')
      if (response.ok) {
        const data = await response.json()
        setDocuments(data)
      }
    } catch (error) {
      console.error('Error fetching documents:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return '📄'
    if (fileType.includes('word') || fileType.includes('document')) return '📝'
    if (fileType.includes('excel') || fileType.includes('spreadsheet')) return '📊'
    if (fileType.includes('image')) return '🖼️'
    return '📎'
  }

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Documents</h1>
              <p className="mt-1 text-sm text-gray-500">
                Access your project documents and files
              </p>
            </div>
            <Link
              href="/client/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">
              No documents available
            </div>
          ) : (
            filteredDocuments.map((doc) => (
              <div key={doc.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{getFileIcon(doc.fileType)}</span>
                    <button className="text-blue-600 hover:text-blue-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{doc.fileName}</p>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Project:</span>
                      <span className="font-medium text-gray-900">{doc.projectName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Size:</span>
                      <span className="text-gray-900">{formatFileSize(doc.fileSize)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Uploaded:</span>
                      <span className="text-gray-900">{formatDate(doc.uploadedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
