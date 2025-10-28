import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const {
      companyName,
      contactPerson,
      email,
      password,
      phoneNumber,
      industry,
      engagementStatus,
      engagementFeePaid,
    } = body

    // Validate required fields
    if (!companyName || !contactPerson || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user and client in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create user
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name: contactPerson,
          role: 'CLIENT',
          isActive: true,
        }
      })

      // Create client
      const client = await tx.client.create({
        data: {
          userId: user.id,
          companyName,
          contactPerson,
          phoneNumber: phoneNumber || '',
          industry: industry || null,
          engagementStatus: engagementStatus || 'INQUIRY',
          engagementFeePaid: engagementFeePaid || false,
        }
      })

      // Log activity
      await tx.activityLog.create({
        data: {
          userId: session.user.id,
          action: 'CREATE',
          entity: 'Client',
          entityId: client.id,
          description: `Created new client: ${companyName}`,
        }
      })

      return { user, client }
    })

    return NextResponse.json({
      success: true,
      client: {
        id: result.client.id,
        companyName: result.client.companyName,
        email: result.user.email,
      }
    }, { status: 201 })

  } catch (error) {
    console.error('Error creating client:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
