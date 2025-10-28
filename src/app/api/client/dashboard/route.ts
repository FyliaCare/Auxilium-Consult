import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'CLIENT' || !session.user.clientId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await prisma.client.findUnique({
      where: { id: session.user.clientId },
      include: {
        projects: {
          select: {
            id: true,
            projectName: true,
            sector: true,
            status: true,
            fundingRequired: true,
            fundingSecured: true,
            progressPercentage: true,
            currentStage: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            documents: true,
            messages: {
              where: {
                sender: 'ADMIN',
                isRead: false
              }
            }
          }
        }
      }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    return NextResponse.json({
      companyName: client.companyName,
      contactPerson: client.contactPerson,
      engagementStatus: client.engagementStatus,
      projects: client.projects,
      unreadMessages: client._count.messages,
      documentsCount: client._count.documents,
    })
  } catch (error) {
    console.error('Error fetching client data:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
