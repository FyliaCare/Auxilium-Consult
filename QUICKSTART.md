# Quick Start Guide - Auxilium Consult Portal

## First Time Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="file:./dev.db"

# NextAuth Configuration
NEXTAUTH_SECRET="your-super-secret-key-change-this-in-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Initialize Database
```bash
# Generate Prisma Client
npx prisma generate

# Create database and run migrations
npx prisma migrate dev --name init

# Seed with demo data
npx prisma db seed
```

### 4. Start Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Demo Accounts

### Admin Access
- **URL**: http://localhost:3000/auth/admin-signin
- **Email**: admin@auxiliumconsult.com
- **Password**: Admin@2025

### Client Access
- **URL**: http://localhost:3000/auth/signin
- **Email**: demo@example.com
- **Password**: Demo@2025

## Testing the System

### As Admin:
1. **Login** at `/auth/admin-signin`
2. **View Dashboard** - See live statistics
3. **Manage Clients** at `/admin/clients`
4. **View Projects** at `/admin/projects`
5. **Check Documents** at `/admin/documents`
6. **Read Messages** at `/admin/messages`

### As Client:
1. **Login** at `/auth/signin`
2. **View Dashboard** - See your projects
3. **Access Documents** at `/client/documents`
4. **Send Message** at `/client/messages`

## Common Commands

### Database Management
```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Create new migration
npx prisma migrate dev --name your_migration_name
```

### Development
```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npx tsc --noEmit
```

## Quick Navigation

### Public Website
- Home: `/`
- About: `/about`
- Services: `/services`
- Insights: `/insights`
- Contact: `/contact`

### Admin Portal
- Dashboard: `/admin/dashboard`
- Clients: `/admin/clients`
- Projects: `/admin/projects`
- Documents: `/admin/documents`
- Messages: `/admin/messages`

### Client Portal
- Dashboard: `/client/dashboard`
- Documents: `/client/documents`
- Messages: `/client/messages`

## Troubleshooting

### Database Issues
If you see Prisma errors:
```bash
npx prisma generate
npx prisma migrate reset
```

### Authentication Issues
Clear browser cookies and try logging in again.

### Port Already in Use
Change the port in package.json or kill the process:
```bash
# Windows PowerShell
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process
```

## Demo Data Overview

### Seeded Client
- **Company**: Demo Client Ltd.
- **Contact**: John Demo
- **Sector**: Energy
- **Email**: demo@example.com

### Seeded Project
- **Name**: Green Energy Initiative
- **Sector**: Energy
- **Funding Required**: $2,000,000
- **Funding Secured**: $750,000
- **Stage**: Investor Engagement
- **Status**: Active
- **Milestones**: 4 milestones (2 completed)

## Next Steps

1. **Customize Branding**: Update colors in `tailwind.config.ts`
2. **Add Real Data**: Create actual clients and projects through the admin panel
3. **Configure Email**: Set up email service for notifications
4. **File Upload**: Implement document upload functionality
5. **Deploy**: Follow deployment instructions in `DEPLOYMENT.md`

## Support

For detailed feature documentation, see `FEATURES.md`

For deployment instructions, see `DEPLOYMENT.md`
