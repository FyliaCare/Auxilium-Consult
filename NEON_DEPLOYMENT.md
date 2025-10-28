# Neon PostgreSQL Deployment Guide

This guide walks you through deploying the Auxilium Consult backend to Neon PostgreSQL.

## Prerequisites

- [Neon Account](https://neon.tech) (Free tier available)
- [Render Account](https://render.com) for hosting
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

## Step 4: Deploy to Render

### 4.1 Create Web Service
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository (FyliaCare/Auxilium-Consult)
4. Configure the service:
   - **Name**: `auxilium-consult`
   - **Region**: Choose closest to your users (e.g., Frankfurt for Europe)
   - **Branch**: `main`
   - **Root Directory**: (leave empty)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npx prisma generate && npx prisma migrate deploy && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or upgrade as needed)

### 4.2 Configure Environment Variables
In Render Dashboard → Environment, add these variables:

```
DATABASE_URL=postgresql://neondb_owner:npg_EgzP5eTrd3AN@ep-bitter-bonus-agz28n2t-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
DIRECT_URL=postgresql://neondb_owner:npg_EgzP5eTrd3AN@ep-bitter-bonus-agz28n2t-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require
NEXTAUTH_SECRET=your-production-secret-key-here
NEXTAUTH_URL=https://auxilium-consult.onrender.com
NEXT_PUBLIC_SITE_URL=https://auxilium-consult.onrender.com
```

**Generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4.3 Deploy
1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies
   - Generate Prisma Client
   - Run database migrations
   - Build Next.js application
   - Start the server
3. Your site will be live at `https://auxilium-consult.onrender.com`

### 4.4 Enable Auto-Deploy
- Auto-deploy is enabled by default
- Every push to `main` branch will trigger a new deployment
- Migrations run automatically during build

## Step 5: Post-Deployment Setup

### 5.1 Verify Deployment
1. Visit: `https://auxilium-consult.onrender.com`
2. Check that the homepage loads correctly

### 5.2 Test Admin Authentication
1. Go to `https://auxilium-consult.onrender.com/auth/admin-signin`
2. Login with: `admin@auxiliumconsult.com` / `Admin@2025`
3. Verify dashboard loads with live data

### 5.3 Test Client Portal
1. Go to `https://auxilium-consult.onrender.com/auth/signin`
2. Login with: `demo@example.com` / `Demo@2025`
3. Verify client dashboard and projects load

### 5.4 Custom Domain (Optional)
1. In Render Dashboard → Settings → Custom Domains
2. Add your domain (e.g., `auxiliumconsult.com`)
3. Update DNS records as shown by Render
4. Update environment variables:
   ```
   NEXTAUTH_URL=https://auxiliumconsult.com
   NEXT_PUBLIC_SITE_URL=https://auxiliumconsult.com
   ```
5. SSL certificate is automatically provisioned

## Step 6: Database Management

### 6.1 Manual Migrations
If you need to run migrations manually:
```bash
# In Render Shell (Dashboard → Shell tab)
npx prisma migrate deploy
```

### 6.2 Seed Production Database
```bash
# In Render Shell
npx prisma db seed
```

### 6.3 View Database
```bash
# Use Prisma Studio locally with production database
DATABASE_URL="your-neon-url" npx prisma studio
```

## Step 7: Monitoring and Logs

### 7.1 View Logs
- Render Dashboard → Logs tab
- View real-time application logs
- Filter by deploy, build, or runtime logs

### 7.2 Performance Monitoring
- Render Dashboard → Metrics tab
- Monitor CPU, memory, and bandwidth usage
- Track response times

### 7.3 Health Checks
Render automatically pings your app to ensure it's running. Configure in:
- Dashboard → Settings → Health Check Path
- Suggested path: `/api/health`

## Alternative: GitHub Actions for Migrations

If you prefer to run migrations separately from deployments:

### Update `.github/workflows/migrate.yml`:

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

## Render-Specific Features

### 1. Background Workers
For long-running tasks, create a Background Worker:
- Dashboard → New → Background Worker
- Use same repository
- Set command: `npm run worker` (if you create worker scripts)

### 2. Cron Jobs
Schedule tasks in Render:
- Dashboard → New → Cron Job
- Example: Daily database cleanup
- Command: `npx tsx scripts/cleanup.ts`

### 3. Private Services
For internal APIs:
- Create as Private Service
- Only accessible within Render network
- No public URL

### 4. Persistent Disks
For file uploads (if needed):
- Add disk in Dashboard → Settings
- Mount at `/data` or custom path
- Data persists across deploys

## Troubleshooting

### Migration Errors
If migrations fail during Render build:
```bash
# Option 1: Run manually in Render Shell
npx prisma migrate deploy

# Option 2: Reset migrations (WARNING: deletes data)
npx prisma migrate reset
```

### Build Failures
Check Render logs for specific errors:
- Missing environment variables
- Prisma generation failures
- TypeScript compilation errors

### Connection Pool Exhausted
- Neon's pooled connection is already optimized
- If issues persist, upgrade Neon plan
- Or use connection pooling middleware

### App Not Starting
- Check Start Command: should be `npm start`
- Verify PORT is not hardcoded (Render assigns dynamically)
- Check logs for Node.js errors

### Slow Cold Starts (Free Tier)
- Free tier spins down after inactivity
- Upgrade to paid plan for 24/7 availability
- Or use external uptime monitor to ping every 14 minutes

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

### Render Support
- Docs: https://render.com/docs
- Community: https://community.render.com
- Support: https://render.com/support

## Render Free Tier Limitations

### Understand the Free Tier
- **Spin down after 15 minutes** of inactivity
- **Spin up time**: 30-60 seconds on first request
- **750 hours/month** free (enough for 1 service 24/7)
- **100 GB bandwidth/month**
- **512 MB RAM**

### Workarounds
1. **Keep-Alive Service** (optional):
   - Use service like UptimeRobot or Cron-Job.org
   - Ping your app every 14 minutes
   - Prevents spin-down

2. **Upgrade to Paid** ($7/month):
   - No spin-down
   - Better performance
   - Priority support

## Cost Breakdown

### Current Setup (Free)
- ✅ Neon PostgreSQL: Free (0.5 GB storage)
- ✅ Render Web Service: Free (with limitations)
- ✅ GitHub: Free
- **Total: $0/month**

### Recommended Production (Paid)
- Neon Launch: $19/month (better performance)
- Render Starter: $7/month (no spin-down)
- **Total: $26/month**

## Next Steps

After successful deployment:
1. ✅ Set up custom domain
2. ✅ Configure SSL (automatic with Vercel/Render)
3. ✅ Set up monitoring (Vercel Analytics / Sentry)
4. ✅ Configure email notifications
5. ✅ Add file upload (AWS S3 / Cloudinary)
6. ✅ Set up automated backups
7. ✅ Add CI/CD pipeline
