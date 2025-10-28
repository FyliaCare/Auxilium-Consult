import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

type MessageWithClient = Prisma.MessageGetPayload<{
  include: {
    client: {
      select: {
        companyName: true
      }
    }
  }
}>

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const messages = await prisma.message.findMany({
      include: {
        client: {
          select: {
            companyName: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(
      messages.map((msg: MessageWithClient) => ({
        id: msg.id,
        subject: msg.subject,
        content: msg.content,
        sentAt: msg.createdAt.toISOString(),
        isRead: msg.isRead,
        clientName: msg.client.companyName,
        clientId: msg.clientId,
        senderName: msg.senderName,
      }))
    )
  } catch (error) {
    console.error('Error fetching messages:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
