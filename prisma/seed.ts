import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'Admin@2025', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@auxiliumconsult.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@auxiliumconsult.com',
      password: hashedPassword,
      name: 'System Administrator',
      role: 'ADMIN',
      isActive: true,
    },
  })

  console.log('✅ Admin user created:', admin.email)

  // Create a demo client user
  const demoPassword = await bcrypt.hash('Demo@2025', 12)
  
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      password: demoPassword,
      name: 'Demo Client',
      role: 'CLIENT',
      isActive: true,
      client: {
        create: {
          companyName: 'Demo Company Ltd',
          contactPerson: 'Demo Client',
          phoneNumber: '+233 24 123 4567',
          address: '123 Demo Street',
          city: 'Accra',
          country: 'Ghana',
          industry: 'Technology',
          engagementStatus: 'ACTIVE',
          engagementDate: new Date(),
          engagementFee: 30000,
          engagementFeePaid: true,
        },
      },
    },
    include: {
      client: true,
    },
  })

  console.log('✅ Demo client created:', demoUser.email)

  // Create a demo project for the demo client
  if (demoUser.client) {
    const demoProject = await prisma.project.create({
      data: {
        clientId: demoUser.client.id,
        projectName: 'Green Energy Initiative',
        description: 'Solar power installation project for rural communities',
        sector: 'ENERGY',
        fundingRequired: 500000,
        fundingSecured: 150000,
        status: 'INVESTOR_ENGAGEMENT',
        currentStage: 3,
        progressPercentage: 45,
        intakeComplete: true,
        dueDiligenceComplete: true,
        investorEngaged: false,
        targetCloseDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      },
    })

    console.log('✅ Demo project created:', demoProject.projectName)

    // Create milestones for the demo project
    await prisma.milestone.createMany({
      data: [
        {
          projectId: demoProject.id,
          title: 'Complete Business Plan',
          description: 'Finalize comprehensive business plan documentation',
          isCompleted: true,
          completedDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          order: 1,
        },
        {
          projectId: demoProject.id,
          title: 'Financial Model Approval',
          description: 'Get financial projections reviewed and approved',
          isCompleted: true,
          completedDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
          order: 2,
        },
        {
          projectId: demoProject.id,
          title: 'Investor Pitch Deck',
          description: 'Create compelling investor presentation',
          isCompleted: false,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          order: 3,
        },
        {
          projectId: demoProject.id,
          title: 'First Investor Meeting',
          description: 'Schedule and conduct meeting with potential investors',
          isCompleted: false,
          dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
          order: 4,
        },
      ],
    })

    console.log('✅ Demo milestones created')

    // Create demo project updates
    await prisma.projectUpdate.createMany({
      data: [
        {
          projectId: demoProject.id,
          title: 'Project Initiated',
          description: 'Initial consultation completed and project scope defined',
          stage: 1,
          createdBy: 'System Administrator',
        },
        {
          projectId: demoProject.id,
          title: 'Due Diligence Completed',
          description: 'All necessary documentation reviewed and verified',
          stage: 2,
          createdBy: 'System Administrator',
        },
        {
          projectId: demoProject.id,
          title: 'Investor List Prepared',
          description: 'Identified 5 potential investors for project',
          stage: 3,
          createdBy: 'System Administrator',
        },
      ],
    })

    console.log('✅ Demo project updates created')
  }

  console.log('\n🎉 Database seeded successfully!')
  console.log('\nLogin Credentials:')
  console.log('==================')
  console.log(`Admin Email: ${admin.email}`)
  console.log(`Admin Password: ${process.env.ADMIN_PASSWORD || 'Admin@2025'}`)
  console.log(`\nDemo Client Email: ${demoUser.email}`)
  console.log(`Demo Client Password: Demo@2025`)
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
