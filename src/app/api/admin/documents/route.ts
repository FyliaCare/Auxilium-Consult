import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Document, Project, Client } from '@prisma/client'

type DocumentWithRelations = Document & {
  project: (Project & {
    client: Pick<Client, 'companyName'> | null
  }) | null
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const documents = await prisma.document.findMany({
      include: {
        project: {
          include: {
            client: {
              select: {
                companyName: true
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(
      documents.map((doc: DocumentWithRelations) => ({
        id: doc.id,
        title: doc.description || doc.fileName,
        fileName: doc.fileName,
        fileSize: doc.fileSize,
        fileType: doc.fileType,
        uploadedBy: doc.uploadedBy,
        uploadedAt: doc.createdAt.toISOString(),
        projectName: doc.project?.projectName || 'N/A',
        projectId: doc.projectId || '',
        clientName: doc.project?.client?.companyName || 'N/A',
      }))
    )
  } catch (error) {
    console.error('Error fetching documents:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
