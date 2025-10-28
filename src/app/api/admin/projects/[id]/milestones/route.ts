import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

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
    const { title, description, dueDate } = body

    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Get the current max order for this project
    const maxOrder = await prisma.milestone.aggregate({
      where: { projectId: resolvedParams.id },
      _max: { order: true }
    })

    const milestone = await prisma.milestone.create({
      data: {
        projectId: resolvedParams.id,
        title,
        description: description || null,
        dueDate: dueDate ? new Date(dueDate) : null,
        order: (maxOrder._max.order || 0) + 1,
        isCompleted: false,
      }
    })

    return NextResponse.json({
      success: true,
      milestone,
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating milestone:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { milestoneId, isCompleted } = body

    if (!milestoneId) {
      return NextResponse.json(
        { error: 'Milestone ID is required' },
        { status: 400 }
      )
    }

    const milestone = await prisma.milestone.update({
      where: { id: milestoneId },
      data: {
        isCompleted,
        completedDate: isCompleted ? new Date() : null,
      }
    })

    return NextResponse.json({
      success: true,
      milestone,
    })

  } catch (error) {
    console.error('Error updating milestone:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
