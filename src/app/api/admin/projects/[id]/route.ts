import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

type MilestoneType = Prisma.MilestoneGetPayload<{}>
type ProjectUpdateType = Prisma.ProjectUpdateGetPayload<{}>

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        client: {
          include: {
            user: {
              select: {
                email: true
              }
            }
          }
        },
        milestones: {
          orderBy: {
            order: 'asc'
          }
        },
        updates: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    return NextResponse.json({
      id: project.id,
      projectName: project.projectName,
      description: project.description,
      clientName: project.client.companyName,
      clientEmail: project.client.user.email,
      sector: project.sector,
      status: project.status,
      fundingRequired: project.fundingRequired,
      fundingSecured: project.fundingSecured,
      progressPercentage: project.progressPercentage,
      currentStage: project.currentStage,
      startDate: project.startDate.toISOString(),
      targetCloseDate: project.targetCloseDate?.toISOString() || null,
      milestones: project.milestones.map((m: MilestoneType) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        dueDate: m.dueDate?.toISOString() || null,
        completedDate: m.completedDate?.toISOString() || null,
        isCompleted: m.isCompleted,
      })),
      updates: project.updates.map((u: ProjectUpdateType) => ({
        id: u.id,
        title: u.title,
        description: u.description,
        stage: u.stage,
        createdBy: u.createdBy,
        createdAt: u.createdAt.toISOString(),
      })),
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
