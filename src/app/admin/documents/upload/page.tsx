'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface Project {
  id: string
  projectName: string
  client: {
    companyName: string
  }
}

export default function UploadDocumentPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    projectId: '',
    documentType: 'BUSINESS_PLAN',
    file: null as File | null,
  })

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/admin/projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data)
      }
    } catch (err) {
      console.error('Failed to fetch projects:', err)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, file: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!formData.file || !formData.projectId) {
      setError('Please select a project and file')
      setLoading(false)
      return
    }

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('file', formData.file)
      formDataToSend.append('projectId', formData.projectId)
      formDataToSend.append('documentType', formData.documentType)

      const response = await fetch('/api/admin/documents/upload', {
        method: 'POST',
        body: formDataToSend,
      })

      const data = await response.json()

      if (response.ok) {
        router.push('/admin/documents')
      } else {
        setError(data.error || 'Failed to upload document')
      }
    } catch (err) {
      setError('An error occurred while uploading')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Upload Document
          </h1>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project *
              </label>
              <select
                required
                value={formData.projectId}
                onChange={(e) =>
                  setFormData({ ...formData, projectId: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.projectName} ({project.client.companyName})
                  </option>
                ))}
              </select>
            </div>

            {/* Document Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Category *
              </label>
              <select
                required
                value={formData.documentType}
                onChange={(e) =>
                  setFormData({ ...formData, documentType: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="BUSINESS_PLAN">Business Plan</option>
                <option value="FINANCIAL_STATEMENTS">Financial Statements</option>
                <option value="PITCH_DECK">Pitch Deck</option>
                <option value="DUE_DILIGENCE">Due Diligence</option>
                <option value="LEGAL">Legal Document</option>
                <option value="CONTRACTS">Contract</option>
                <option value="REPORTS">Report</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                File *
              </label>
              <input
                type="file"
                required
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {formData.file.name} (
                  {(formData.file.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {loading ? 'Uploading...' : 'Upload Document'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
