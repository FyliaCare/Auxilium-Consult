import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// DELETE /api/admin/clients/[id] - Delete a client
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

    // Check if client exists
    const client = await prisma.client.findUnique({
      where: { id: resolvedParams.id },
      include: {
        projects: true,
        user: true
      }
    })

    if (!client) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Delete in transaction (cascading deletes will handle related records)
    await prisma.$transaction(async (tx) => {
      // Delete associated user if exists
      if (client.userId) {
        await tx.user.delete({
          where: { id: client.userId }
        })
      }

      // Delete client (cascade will delete projects, documents, etc.)
      await tx.client.delete({
        where: { id: resolvedParams.id }
      })

      // Log the deletion
      await tx.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'DELETE_CLIENT',
          entity: 'CLIENT',
          entityId: resolvedParams.id,
          description: `Deleted client: ${client.companyName}`
        }
      })
    })

    return NextResponse.json({ 
      success: true,
      message: 'Client deleted successfully' 
    })

  } catch (error) {
    console.error('Delete client error:', error)
    return NextResponse.json(
      { error: 'Failed to delete client' },
      { status: 500 }
    )
  }
}

// PUT /api/admin/clients/[id] - Update a client
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
    const { companyName, contactPerson, industry, status } = body

    // Check if client exists
    const existingClient = await prisma.client.findUnique({
      where: { id: resolvedParams.id }
    })

    if (!existingClient) {
      return NextResponse.json({ error: 'Client not found' }, { status: 404 })
    }

    // Update client
    const updatedClient = await prisma.client.update({
      where: { id: resolvedParams.id },
      data: {
        ...(companyName && { companyName }),
        ...(contactPerson && { contactPerson }),
        ...(industry && { industry }),
        ...(status && { status }),
      },
      include: {
        user: {
          select: {
            email: true,
            name: true
          }
        },
        projects: {
          select: {
            id: true,
            projectName: true,
            status: true
          }
        }
      }
    })

    // Log the update
    await prisma.activityLog.create({
      data: {
        userId: session.user.id,
        action: 'UPDATE_CLIENT',
        entity: 'CLIENT',
        entityId: resolvedParams.id,
        description: `Updated client: ${updatedClient.companyName}`
      }
    })

    return NextResponse.json(updatedClient)

  } catch (error) {
    console.error('Update client error:', error)
    return NextResponse.json(
      { error: 'Failed to update client' },
      { status: 500 }
    )
  }
}
