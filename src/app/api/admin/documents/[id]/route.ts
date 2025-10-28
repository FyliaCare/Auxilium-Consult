import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE /api/admin/documents/[id] - Delete a document
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

    // Check if document exists
    const document = await prisma.document.findUnique({
      where: { id: resolvedParams.id },
      include: {
        project: {
          select: {
            projectName: true
          }
        }
      }
    })

    if (!document) {
      return NextResponse.json({ error: 'Document not found' }, { status: 404 })
    }

    // TODO: Delete file from cloud storage (Cloudinary/S3) using document.fileUrl

    // Delete document record
    await prisma.$transaction(async (tx) => {
      await tx.document.delete({
        where: { id: resolvedParams.id }
      })

      // Log the deletion
      await tx.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'DELETE_DOCUMENT',
          entity: 'DOCUMENT',
          entityId: resolvedParams.id,
          description: `Deleted document: ${document.fileName}${document.project ? ` from project ${document.project.projectName}` : ''}`
        }
      })
    })

    return NextResponse.json({ 
      success: true,
      message: 'Document deleted successfully' 
    })

  } catch (error) {
    console.error('Delete document error:', error)
    return NextResponse.json(
      { error: 'Failed to delete document' },
      { status: 500 }
    )
  }
}
