import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params
    const body = await request.json()
    const {
      projectName,
      description,
      sector,
      fundingRequired,
      fundingSecured,
      status,
    } = body

    // Verify project exists
    const existingProject = await prisma.project.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update project
    const updatedProject = await prisma.$transaction(async (tx) => {
      const project = await tx.project.update({
        where: { id: resolvedParams.id },
        data: {
          ...(projectName && { projectName }),
          ...(description !== undefined && { description }),
          ...(sector && { sector }),
          ...(fundingRequired && { fundingRequired: parseFloat(fundingRequired) }),
          ...(fundingSecured !== undefined && { fundingSecured: parseFloat(fundingSecured) }),
          ...(status && { status }),
        }
      })

      // Log activity
      await tx.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'UPDATE',
          entity: 'Project',
          entityId: project.id,
          description: `Updated project: ${project.projectName}`,
        }
      })

      return project
    })

    return NextResponse.json({
      success: true,
      project: updatedProject,
    })

  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
