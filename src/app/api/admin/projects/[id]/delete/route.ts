import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE /api/admin/projects/[id]/delete - Delete a project
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const resolvedParams = await params

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { id: resolvedParams.id },
      include: {
        client: {
          select: {
            companyName: true
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Delete project (cascade will delete milestones, updates, documents, etc.)
    await prisma.$transaction(async (tx) => {
      await tx.project.delete({
        where: { id: resolvedParams.id }
      })

      // Log the deletion
      await tx.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'DELETE_PROJECT',
          entity: 'PROJECT',
          entityId: resolvedParams.id,
          description: `Deleted project: ${project.projectName} (${project.client.companyName})`
        }
      })
    })

    return NextResponse.json({ 
      success: true,
      message: 'Project deleted successfully' 
    })

  } catch (error) {
    console.error('Delete project error:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}
