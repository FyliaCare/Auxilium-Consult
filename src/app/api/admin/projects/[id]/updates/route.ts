import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { sendEmail, emailTemplates } from '@/lib/email'

export async function POST(
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
    const { title, description, stage } = body

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      )
    }

    const update = await prisma.projectUpdate.create({
      data: {
        projectId: resolvedParams.id,
        title,
        description,
        stage: stage || 1,
        createdBy: session.user.id,
      }
    })

    // Get project with client info for email notification
    const project = await prisma.project.findUnique({
      where: { id: resolvedParams.id },
      include: {
        client: {
          include: {
            user: true
          }
        }
      }
    })

    // Send email notification to client if email is configured
    if (project?.client?.user?.email && process.env.RESEND_API_KEY) {
      await sendEmail({
        to: project.client.user.email,
        subject: `Project Update: ${project.projectName}`,
        html: emailTemplates.projectUpdate(
          project.client.contactPerson,
          project.projectName,
          title,
          description
        )
      }).catch(console.error) // Don't fail if email fails
    }

    return NextResponse.json({
      success: true,
      update,
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating project update:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
