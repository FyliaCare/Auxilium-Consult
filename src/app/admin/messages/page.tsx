'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

interface Message {
  id: string
  subject: string
  content: string
  sentAt: string
  isRead: boolean
  clientName: string
  clientId: string
  senderName: string
}

export default function AdminMessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread'>('all')
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/admin-signin')
    }
    if (session?.user?.role !== 'ADMIN') {
      router.push('/')
    }
  }, [status, session, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchMessages()
    }
  }, [status])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/admin/messages')
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = async (messageId: string) => {
    try {
      await fetch(`/api/admin/messages/${messageId}/read`, {
        method: 'POST'
      })
      fetchMessages()
    } catch (error) {
      console.error('Error marking message as read:', error)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays === 0) {
      return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    } else if (diffDays === 1) {
      return 'Yesterday'
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
    }
  }

  const filteredMessages = messages.filter(msg =>
    filter === 'all' || (filter === 'unread' && !msg.isRead)
  )

  const unreadCount = messages.filter(m => !m.isRead).length

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
              <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
              <p className="mt-1 text-sm text-gray-500">
                {unreadCount > 0 && `${unreadCount} unread message${unreadCount !== 1 ? 's' : ''}`}
              </p>
            </div>
            <Link
              href="/admin/dashboard"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              ← Back to Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              {/* Filter Tabs */}
              <div className="border-b">
                <div className="flex">
                  <button
                    onClick={() => setFilter('all')}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      filter === 'all'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    All Messages
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    className={`flex-1 px-4 py-3 text-sm font-medium ${
                      filter === 'unread'
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Unread ({unreadCount})
                  </button>
                </div>
              </div>

              {/* Message Items */}
              <div className="divide-y max-h-[600px] overflow-y-auto">
                {filteredMessages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    No messages
                  </div>
                ) : (
                  filteredMessages.map((message) => (
                    <div
                      key={message.id}
                      onClick={() => {
                        setSelectedMessage(message)
                        if (!message.isRead) {
                          markAsRead(message.id)
                        }
                      }}
                      className={`p-4 cursor-pointer hover:bg-gray-50 ${
                        selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h3 className={`text-sm ${!message.isRead ? 'font-bold' : 'font-medium'}`}>
                          {message.clientName}
                        </h3>
                        <span className="text-xs text-gray-500">{formatDate(message.sentAt)}</span>
                      </div>
                      <p className={`text-sm ${!message.isRead ? 'font-semibold' : 'text-gray-600'}`}>
                        {message.subject}
                      </p>
                      <p className="text-xs text-gray-500 mt-1 truncate">{message.content}</p>
                      {!message.isRead && (
                        <span className="inline-block mt-2 w-2 h-2 bg-blue-600 rounded-full"></span>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <div className="bg-white rounded-lg shadow p-6">
                <div className="border-b pb-4 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedMessage.subject}
                  </h2>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div>
                      <span className="font-medium">From:</span> {selectedMessage.clientName}
                    </div>
                    <div>{new Date(selectedMessage.sentAt).toLocaleString('en-GB')}</div>
                  </div>
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
                </div>

                <div className="border-t pt-4">
                  <Link
                    href={`/admin/clients`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mr-3"
                  >
                    View Client
                  </Link>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    Reply
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
                Select a message to view
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
