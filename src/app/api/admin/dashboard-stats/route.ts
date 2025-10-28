import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total clients
    const totalClients = await prisma.client.count()

    // Get active projects
    const activeProjects = await prisma.project.count({
      where: {
        status: {
          not: 'COMPLETED'
        }
      }
    })

    // Get total funding facilitated
    const projects = await prisma.project.findMany({
      select: {
        fundingSecured: true
      }
    })
    const totalFundingFacilitated = projects.reduce((sum, project) => sum + project.fundingSecured, 0)

    // Get pending messages (unread messages from clients)
    const pendingMessages = await prisma.message.count({
      where: {
        sender: 'CLIENT',
        isRead: false
      }
    })

    return NextResponse.json({
      totalClients,
      activeProjects,
      totalFundingFacilitated,
      pendingMessages,
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
