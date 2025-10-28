# Neon PostgreSQL Deployment Guide

This guide walks you through deploying the Auxilium Consult backend to Neon PostgreSQL.

## Prerequisites

- [Neon Account](https://neon.tech) (Free tier available)
- [Vercel Account](https://vercel.com) or [Render Account](https://render.com) for hosting
- Git repository pushed to GitHub

## Step 1: Create Neon PostgreSQL Database

### 1.1 Sign Up for Neon
1. Go to [neon.tech](https://neon.tech)
2. Click "Sign Up" and create an account
3. Verify your email

### 1.2 Create a New Project
1. Click "Create a project"
2. Choose a project name (e.g., "auxilium-consult")
3. Select a region (choose closest to your users)
4. Click "Create project"

### 1.3 Get Your Connection String
After project creation, you'll see:
- **Connection string** (for pooled connections - recommended for serverless)
- **Direct connection string** (for migrations)

Example:
```
# Pooled connection (use for DATABASE_URL in production)
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require

# Direct connection (use for DIRECT_URL for migrations)
postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require&options=endpoint%3Dxxx
```

## Step 2: Update Local Environment

### 2.1 Update .env File
Replace your SQLite DATABASE_URL with Neon PostgreSQL:

```bash
# Neon PostgreSQL Database
DATABASE_URL="postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require"
DIRECT_URL="postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require&options=endpoint%3Dxxx"

# NextAuth
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Site URL
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### 2.2 Install PostgreSQL Dependencies
```bash
npm install @prisma/client@latest prisma@latest
```

## Step 3: Migrate Database Schema

### 3.1 Reset Prisma Client
```bash
npx prisma generate
```

### 3.2 Create Initial Migration
```bash
npx prisma migrate dev --name init
```

This will:
- Create migration files
- Apply schema to Neon database
- Regenerate Prisma Client

### 3.3 Seed the Database
```bash
npx prisma db seed
```

This creates:
- Admin user: `admin@auxiliumconsult.com` / `Admin@2025`
- Demo client: `demo@example.com` / `Demo@2025`
- Sample project with milestones

## Step 4: Deploy to Vercel (Recommended)

### 4.1 Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js

### 4.2 Configure Environment Variables
In Vercel Dashboard → Settings → Environment Variables, add:

```
DATABASE_URL=postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://username:password@your-neon-host.neon.tech/neondb?sslmode=require&options=endpoint%3Dxxx
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 4.3 Deploy
1. Click "Deploy"
2. Wait for build to complete
3. Your site will be live at `https://your-project.vercel.app`

## Step 5: Run Database Migrations in Production

### Option A: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Run migration
vercel env pull .env.production
npx prisma migrate deploy
```

### Option B: Using GitHub Actions (Recommended)

Create `.github/workflows/migrate.yml`:

```yaml
name: Database Migration

on:
  push:
    branches:
      - main
    paths:
      - 'prisma/schema.prisma'
      - 'prisma/migrations/**'

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          
      - run: npm ci
      
      - name: Run Prisma Migrations
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
        run: npx prisma migrate deploy
```

Add `DATABASE_URL` to GitHub Secrets (Settings → Secrets and variables → Actions)

## Alternative: Deploy to Render

### 1. Create Web Service
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository

### 2. Configure Service
- **Name**: auxilium-consult
- **Environment**: Node
- **Build Command**: `npm install && npx prisma generate && npm run build`
- **Start Command**: `npm start`

### 3. Add Environment Variables
```
DATABASE_URL=your-neon-connection-string
DIRECT_URL=your-neon-direct-connection-string
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-app.onrender.com
NEXT_PUBLIC_SITE_URL=https://your-app.onrender.com
```

### 4. Add Build Hook for Migrations
In Render Dashboard:
1. Go to "Settings" → "Build & Deploy"
2. Add a deploy hook
3. Trigger it after migrations

## Step 6: Verify Deployment

### 6.1 Check Database Connection
Visit: `https://your-domain.com/api/health`

You should see: `{"status":"ok"}`

### 6.2 Test Authentication
1. Go to `https://your-domain.com/auth/admin-signin`
2. Login with admin credentials
3. Verify dashboard loads

### 6.3 Test Client Portal
1. Go to `https://your-domain.com/auth/signin`
2. Login with demo client credentials
3. Verify client dashboard loads

## Troubleshooting

### Migration Errors
If migrations fail:
```bash
# Force reset (WARNING: deletes all data)
npx prisma migrate reset

# Or create new migration
npx prisma migrate dev --name fix_migration
npx prisma migrate deploy
```

### Connection Pool Exhausted
Use Neon's pooled connection string (default) which handles serverless connections better.

### SSL Certificate Issues
Ensure your connection string includes `?sslmode=require`

### Prisma Client Not Generated
```bash
npx prisma generate
```

## Neon Features to Leverage

### 1. Branching
Create database branches for development:
```bash
# In Neon Dashboard
Create Branch → Name: "development"
```

Use different connection strings for dev/prod:
- Production: main branch
- Development: dev branch

### 2. Autoscaling
Neon automatically scales compute based on usage. Configure in:
- Neon Dashboard → Settings → Compute

### 3. Point-in-Time Recovery
Neon keeps 7 days of history (paid plans). Restore from:
- Neon Dashboard → Restore

### 4. Monitoring
View metrics in Neon Dashboard:
- Connection count
- Query performance
- Storage usage

## Cost Optimization

### Free Tier Limits (Neon)
- 0.5 GB storage
- 10 GB data transfer/month
- 1 project
- 10 branches

### Scaling Recommendations
- **Small**: Free tier (up to 100 users)
- **Medium**: Launch plan $19/month (up to 1000 users)
- **Large**: Scale plan $69/month (unlimited)

## Security Best Practices

1. **Never commit .env files**
   - Already in `.gitignore`

2. **Use strong NEXTAUTH_SECRET**
   ```bash
   # Generate secure secret
   openssl rand -base64 32
   ```

3. **Enable Neon IP Allowlist** (paid plans)
   - Restrict database access by IP

4. **Rotate credentials periodically**
   - Update in Neon Dashboard → Settings

5. **Use environment variables**
   - Never hardcode credentials

## Backup Strategy

### Automated Backups (Neon)
- Free tier: 7-day history
- Paid plans: 30-day history + manual backups

### Manual Backup
```bash
# Export database
pg_dump $DATABASE_URL > backup.sql

# Restore database
psql $DATABASE_URL < backup.sql
```

## Support

### Neon Support
- Docs: https://neon.tech/docs
- Discord: https://discord.gg/neon
- Support: support@neon.tech

### Vercel Support
- Docs: https://vercel.com/docs
- Support: https://vercel.com/support

### Render Support
- Docs: https://render.com/docs
- Support: https://render.com/support

## Next Steps

After successful deployment:
1. ✅ Set up custom domain
2. ✅ Configure SSL (automatic with Vercel/Render)
3. ✅ Set up monitoring (Vercel Analytics / Sentry)
4. ✅ Configure email notifications
5. ✅ Add file upload (AWS S3 / Cloudinary)
6. ✅ Set up automated backups
7. ✅ Add CI/CD pipeline
