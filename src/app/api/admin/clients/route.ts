import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

type ClientWithRelations = Prisma.ClientGetPayload<{
  include: {
    user: {
      select: {
        email: true
      }
    }
    _count: {
      select: {
        projects: true
      }
    }
  }
}>

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const clients = await prisma.client.findMany({
      include: {
        user: {
          select: {
            email: true
          }
        },
        _count: {
          select: {
            projects: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedClients = clients.map((client: ClientWithRelations) => ({
      id: client.id,
      companyName: client.companyName,
      contactPerson: client.contactPerson,
      email: client.user.email,
      phoneNumber: client.phoneNumber,
      industry: client.industry,
      engagementStatus: client.engagementStatus,
      engagementFeePaid: client.engagementFeePaid,
      projectsCount: client._count.projects,
      createdAt: client.createdAt.toISOString(),
    }))

    return NextResponse.json(formattedClients)
  } catch (error) {
    console.error('Error fetching clients:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
