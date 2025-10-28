import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE /api/admin/projects/[id]/milestones/[milestoneId] - Delete a milestone
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; milestoneId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params

    // Check if milestone exists
    const milestone = await prisma.milestone.findUnique({
      where: { id: resolvedParams.milestoneId },
      include: {
        project: {
          select: {
            projectName: true
          }
        }
      }
    })

    if (!milestone) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 })
    }

    // Verify milestone belongs to the specified project
    if (milestone.projectId !== resolvedParams.id) {
      return NextResponse.json({ error: 'Milestone does not belong to this project' }, { status: 400 })
    }

    // Delete milestone
    await prisma.milestone.delete({
      where: { id: resolvedParams.milestoneId }
    })

    // Log the deletion
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'DELETE_MILESTONE',
        entity: 'MILESTONE',
        entityId: resolvedParams.milestoneId,
        description: `Deleted milestone: ${milestone.title} from project ${milestone.project.projectName}`
      }
    })

    return NextResponse.json({ 
      success: true,
      message: 'Milestone deleted successfully' 
    })

  } catch (error) {
    console.error('Delete milestone error:', error)
    return NextResponse.json(
      { error: 'Failed to delete milestone' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/projects/[id]/milestones/[milestoneId] - Update a milestone
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; milestoneId: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params
    const body = await request.json()
    const { title, description, dueDate, isCompleted, order } = body

    // Check if milestone exists
    const existingMilestone = await prisma.milestone.findUnique({
      where: { id: resolvedParams.milestoneId }
    })

    if (!existingMilestone) {
      return NextResponse.json({ error: 'Milestone not found' }, { status: 404 })
    }

    // Verify milestone belongs to the specified project
    if (existingMilestone.projectId !== resolvedParams.id) {
      return NextResponse.json({ error: 'Milestone does not belong to this project' }, { status: 400 })
    }

    // Update milestone
    const updatedMilestone = await prisma.milestone.update({
      where: { id: resolvedParams.milestoneId },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
        ...(isCompleted !== undefined && { isCompleted }),
        ...(order !== undefined && { order }),
      }
    })

    return NextResponse.json(updatedMilestone)

  } catch (error) {
    console.error('Update milestone error:', error)
    return NextResponse.json(
      { error: 'Failed to update milestone' },
      { status: 500 }
    )
  }
}
