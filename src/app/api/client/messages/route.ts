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

    const messages = await prisma.message.findMany({
      where: {
        clientId: session.user.clientId
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(
      messages.map(msg => ({
        id: msg.id,
        subject: msg.subject,
        content: msg.content,
        sentAt: msg.createdAt.toISOString(),
        isRead: msg.isRead,
        senderName: msg.senderName,
      }))
    )
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'CLIENT' || !session.user.clientId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { subject, content } = await request.json()

    if (!subject || !content) {
      return NextResponse.json({ error: 'Subject and content required' }, { status: 400 })
    }

    // Get client name
    const client = await prisma.client.findUnique({
      where: { id: session.user.clientId },
      select: { companyName: true }
    })

    const message = await prisma.message.create({
      data: {
        clientId: session.user.clientId,
        subject,
        content,
        sender: 'CLIENT',
        senderName: client?.companyName || 'Client',
        isRead: false
      }
    })

    return NextResponse.json({ success: true, messageId: message.id })
  } catch (error) {
    console.error('Error creating message:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
