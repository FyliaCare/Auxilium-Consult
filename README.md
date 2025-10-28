# Auxilium Consult Website

A modern, professional website for Auxilium Consult - a Ghana-based business advisory and investment facilitation firm focused on helping businesses access funding across energy, agribusiness, mining, and industry sectors.

## About Auxilium Consult

Auxilium Consult is dedicated to bridging the gap between promising African enterprises and global capital through trust, structure, and innovation. We provide structured, transparent, and impactful investment facilitation and advisory services across Africa and beyond.

### Our Mission
To help businesses access the funding they need to grow and achieve their purpose by providing structured, transparent, and impactful investment facilitation and advisory services across Africa and beyond.

### Our Vision
To become Africa's leading investment facilitation and growth partner — bridging the gap between credible businesses and global capital through trust, structure, and innovation.

## Tech Stack

- **Framework**: Next.js 15.5.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL (Neon) with Prisma ORM
- **Authentication**: NextAuth.js v4.24.12
- **Password Hashing**: bcryptjs
- **Deployment**: Vercel (recommended) or Render
- **Build Tool**: Next.js built-in compiler
- **Linting**: ESLint with Next.js configuration

## Features

### Public Website
- 🚀 **Modern, responsive design** with Tailwind CSS
- 📱 **Mobile-first approach** for optimal viewing on all devices
- ⚡ **Server-side rendering** with Next.js for fast page loads
- 🔍 **SEO optimized** with proper meta tags and descriptions
- 🎨 **Professional color scheme** and branding
- 📝 **Interactive contact forms** with API integration
- 🌟 **Clean component architecture** for maintainability
-  **Case studies** and success stories
- ⭐ **Client testimonials** showcase
- ❓ **FAQ section** with collapsible answers
- 📰 **Insights/Blog** section for thought leadership

### Admin Portal
- � **Secure authentication** with role-based access
- 📊 **Dashboard** with live statistics and metrics
- 👥 **Client management** with search and filtering
- 💼 **Project tracking** with 5-stage workflow
- 📁 **Document management** system
- 💬 **Messaging center** for client communication
- 📈 **Funding progress** visualization
- 🔔 **Activity logging** for audit trails

### Client Portal
- 🔒 **Secure client login** with JWT sessions
- 📋 **Project dashboard** with real-time updates
- 💰 **Funding status** tracking and visualization
- 📄 **Document library** access
- 📧 **Direct messaging** with advisory team
- 📊 **5-stage progress** indicators
- 🎯 **Milestone tracking** for projects

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9.0 or later
- PostgreSQL database (Neon recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/FyliaCare/Auxilium-Consult.git
   cd Auxilium-Consult
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your configuration:
   ```bash
   # Database - Get from https://neon.tech
   DATABASE_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"
   DIRECT_URL="postgresql://user:pass@host.neon.tech/db?sslmode=require"
   
   # NextAuth
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   NEXTAUTH_URL="http://localhost:3000"
   
   # Site URL
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   ```

4. Set up the database:
   ```bash
   # Generate Prisma Client
   npx prisma generate
   
   # Run migrations
   npx prisma migrate dev --name init
   
   # Seed demo data
   npx prisma db seed
   ```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Demo Credentials:**
- **Admin**: `admin@auxiliumconsult.com` / `Admin@2025`
- **Client**: `demo@example.com` / `Demo@2025`

### Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Deployment

### Deploy to Vercel (Recommended)

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your repository

2. **Configure Environment Variables**
   Add these in Vercel Dashboard:
   ```
   DATABASE_URL=your-neon-connection-string
   DIRECT_URL=your-neon-direct-connection-string
   NEXTAUTH_SECRET=your-production-secret
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
   ```

3. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

For detailed deployment instructions, see [NEON_DEPLOYMENT.md](./NEON_DEPLOYMENT.md)

### Database Setup (Neon PostgreSQL)

1. Create account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy connection strings
4. Add to environment variables
5. Run migrations: `npx prisma migrate deploy`

See [NEON_DEPLOYMENT.md](./NEON_DEPLOYMENT.md) for complete guide.

## Documentation

- [Features Documentation](./FEATURES.md) - Complete feature overview
- [Quick Start Guide](./QUICKSTART.md) - Setup and testing
- [Neon Deployment](./NEON_DEPLOYMENT.md) - Production deployment guide

## Project Structure

```
src/
├── app/
│   ├── about/               # About Us page
│   ├── admin/               # Admin portal
│   │   ├── dashboard/       # Admin dashboard
│   │   ├── clients/         # Client management
│   │   ├── projects/        # Project management
│   │   ├── documents/       # Document management
│   │   └── messages/        # Message center
│   ├── api/
│   │   ├── auth/            # NextAuth endpoints
│   │   ├── admin/           # Admin API routes
│   │   └── client/          # Client API routes
│   ├── auth/                # Authentication pages
│   ├── client/              # Client portal
│   │   ├── dashboard/       # Client dashboard
│   │   ├── documents/       # Document library
│   │   └── messages/        # Client messaging
│   ├── contact/             # Contact page
│   ├── insights/            # Blog/Insights
│   └── services/            # Services page
├── components/              # Reusable React components
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   └── prisma.ts           # Prisma client
├── types/                   # TypeScript type definitions
└── middleware.ts            # Route protection

prisma/
├── schema.prisma            # Database schema
├── migrations/              # Database migrations
└── seed.ts                  # Demo data seeder
```

## Services Offered

- **Startup Advisory** - Guiding early-stage ventures through investor readiness
- **SME Growth Consulting** - Helping small and medium enterprises scale
- **Project Investment Structuring** - Developing bankable financial frameworks
- **Capital Partnerships** - Connecting clients to finance houses and investors
- **Strategic Advisory** - Providing sustainability and governance support
- **End-to-End Execution** - Complete fundraising and investment management

## Core Principles

- **Integrity** - Transparency and honesty in every engagement
- **Excellence** - Professional, results-driven advisory services
- **Access** - Connecting businesses to global funding sources
- **Impact** - Creating long-term value for all stakeholders

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build with Prisma generation
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run migrate:deploy` - Run database migrations in production
- `npm run db:seed` - Seed database with demo data
- `npm run db:studio` - Open Prisma Studio for database management

## Contact Information

- **Location**: Accra, Ghana
- **Email**: info@auxiliumconsult.com
- **Phone**: +233 XX XXX XXXX

## Contributing

This is a corporate website project. For internal development and maintenance only.

## License

© 2024 Auxilium Consult. All rights reserved.