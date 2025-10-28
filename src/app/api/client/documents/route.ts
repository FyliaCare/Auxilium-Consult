import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'CLIENT' || !session.user.clientId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const documents = await prisma.document.findMany({
      where: {
        project: {
          clientId: session.user.clientId
        }
      },
      include: {
        project: {
          select: {
            projectName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(
      documents.map(doc => ({
        id: doc.id,
        title: doc.description || doc.fileName,
        fileName: doc.fileName,
        fileSize: doc.fileSize,
        fileType: doc.fileType,
        uploadedBy: doc.uploadedBy,
        uploadedAt: doc.createdAt.toISOString(),
        projectName: doc.project?.projectName || 'N/A',
      }))
    )
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
