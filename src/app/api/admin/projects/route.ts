import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Project, Client } from '@prisma/client'

type ProjectWithClient = Project & {
  client: Pick<Client, 'companyName'>
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      include: {
        client: {
          select: {
            companyName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    const formattedProjects = projects.map((project: ProjectWithClient) => ({
      id: project.id,
      projectName: project.projectName,
      clientName: project.client.companyName,
      sector: project.sector,
      status: project.status,
      fundingRequired: project.fundingRequired,
      fundingSecured: project.fundingSecured,
      progressPercentage: project.progressPercentage,
      currentStage: project.currentStage,
      startDate: project.startDate.toISOString(),
    }))

    return NextResponse.json(formattedProjects)
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
