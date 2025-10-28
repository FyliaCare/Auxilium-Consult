import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      clientId,
      projectName,
      description,
      sector,
      fundingRequired,
      status,
      milestones,
    } = body

    // Validate required fields
    if (!clientId || !projectName || !fundingRequired) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    })

    if (!client) {
      return NextResponse.json(
        { error: 'Client not found' },
        { status: 404 }
      )
    }

    // Create project and milestones in a transaction
    const project = await prisma.$transaction(async (tx) => {
      const newProject = await tx.project.create({
        data: {
          clientId,
          projectName,
          description: description || null,
          sector: sector || null,
          fundingRequired: parseFloat(fundingRequired),
          fundingSecured: 0,
          status: status || 'INTAKE',
        }
      })

      // Create default milestones if provided
      if (milestones && Array.isArray(milestones)) {
        await tx.milestone.createMany({
          data: milestones.map((milestone: any, index: number) => ({
            projectId: newProject.id,
            title: milestone.title,
            description: milestone.description || null,
            dueDate: milestone.dueDate ? new Date(milestone.dueDate) : null,
            order: index + 1,
            isCompleted: false,
          }))
        })
      }

      // Log activity
      await tx.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'CREATE',
          entity: 'Project',
          entityId: newProject.id,
          description: `Created new project: ${projectName}`,
        }
      })

      return newProject
    })

    return NextResponse.json({
      success: true,
      project: {
        id: project.id,
        projectName: project.projectName,
        status: project.status,
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
