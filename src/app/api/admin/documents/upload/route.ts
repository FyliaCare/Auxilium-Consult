import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { uploadToCloudinary } from '@/lib/cloudinary'
import formidable from 'formidable'
import { promises as fs } from 'fs'

export const config = {
  api: {
    bodyParser: false, // Disable default body parser for file uploads
  },
}

// Helper to parse form data
async function parseForm(req: NextRequest): Promise<{
  fields: formidable.Fields
  files: formidable.Files
}> {
  const form = formidable({ multiples: false })
  
  // Convert NextRequest to Node.js IncomingMessage-like object
  const headers: Record<string, string> = {}
  req.headers.forEach((value, key) => {
    headers[key] = value
  })

  return new Promise((resolve, reject) => {
    form.parse(req as any, (err, fields, files) => {
      if (err) reject(err)
      resolve({ fields, files })
    })
  })
}

// POST /api/admin/documents/upload - Upload a document
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse multipart form data
    const { fields, files } = await parseForm(request)

    const projectId = Array.isArray(fields.projectId) 
      ? fields.projectId[0] 
      : fields.projectId

    const documentType = Array.isArray(fields.documentType)
      ? fields.documentType[0]
      : fields.documentType

    const file = Array.isArray(files.file) ? files.file[0] : files.file

    if (!file || !projectId || !documentType) {
      return NextResponse.json(
        { error: 'File, projectId, and documentType are required' },
        { status: 400 }
      )
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Upload to Cloudinary
    const { url, publicId } = await uploadToCloudinary(
      file.filepath,
      `auxilium-documents/${projectId}`
    )

    // Get file size
    const stats = await fs.stat(file.filepath)

    // Create document record
    const document = await prisma.document.create({
      data: {
        projectId,
        fileName: file.originalFilename || 'unknown',
        filePath: url, // Cloudinary URL
        fileType: file.mimetype || 'application/octet-stream',
        fileSize: stats.size,
        category: documentType as any, // Map to DocumentCategory enum
        uploadedBy: session.user.id,
      },
    })

    // Clean up temp file
    await fs.unlink(file.filepath).catch(() => {})

    // Log the upload
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'UPLOAD_DOCUMENT',
        entity: 'DOCUMENT',
        entityId: document.id,
        description: `Uploaded document: ${document.fileName} to project ${project.projectName}`
      }
    })

    return NextResponse.json(document)

  } catch (error) {
    console.error('Document upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload document' },
      { status: 500 }
    )
  }
}
