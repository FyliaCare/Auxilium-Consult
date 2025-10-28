# Render Deployment - Quick Start

Step-by-step guide to deploy Auxilium Consult to Render with Neon PostgreSQL.

## Prerequisites

✅ Neon PostgreSQL database already set up  
✅ Code pushed to GitHub: `FyliaCare/Auxilium-Consult`  
✅ Render account (free): [render.com](https://render.com)

## Step 1: Create Render Web Service (5 minutes)

1. **Sign in to Render**
   - Go to [dashboard.render.com](https://dashboard.render.com)
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Click "Connect a repository"
   - Authorize Render to access GitHub
   - Select `FyliaCare/Auxilium-Consult`

3. **Configure Service**
   Fill in these settings:
   
   | Setting | Value |
   |---------|-------|
   | **Name** | `auxilium-consult` |
   | **Region** | Frankfurt (or closest to you) |
   | **Branch** | `main` |
   | **Root Directory** | (leave empty) |
   | **Environment** | Node |
   | **Build Command** | `npm install && npx prisma generate && npx prisma migrate deploy && npm run build` |
   | **Start Command** | `npm start` |
   | **Instance Type** | Free |

## Step 2: Add Environment Variables (3 minutes)

In the "Environment Variables" section, add:

### Required Variables

```bash
# Database (already configured in Neon)
DATABASE_URL
postgresql://neondb_owner:npg_EgzP5eTrd3AN@ep-bitter-bonus-agz28n2t-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require

DIRECT_URL
postgresql://neondb_owner:npg_EgzP5eTrd3AN@ep-bitter-bonus-agz28n2t-pooler.c-2.eu-central-1.aws.neon.tech/neondb?sslmode=require

# NextAuth Secret (generate new one)
NEXTAUTH_SECRET
[Click "Generate" button or use: openssl rand -base64 32]

# App URLs (update after deployment)
NEXTAUTH_URL
https://auxilium-consult.onrender.com

NEXT_PUBLIC_SITE_URL
https://auxilium-consult.onrender.com
```

### How to Add Each Variable
1. Click "Add Environment Variable"
2. Enter **Key** (e.g., `DATABASE_URL`)
3. Enter **Value** (paste connection string)
4. Repeat for all 5 variables

## Step 3: Deploy! (10-15 minutes)

1. **Start Deployment**
   - Scroll down and click "Create Web Service"
   - Render will start building your app

2. **Monitor Build Progress**
   - Watch the logs in real-time
   - Build takes 10-15 minutes on free tier
   - You'll see:
     - Installing dependencies
     - Generating Prisma Client
     - Running database migrations
     - Building Next.js app
     - Starting server

3. **Deployment Complete**
   - You'll see "Your service is live 🎉"
   - URL: `https://auxilium-consult.onrender.com`

## Step 4: Verify Deployment (2 minutes)

### Test Public Website
1. Visit: `https://auxilium-consult.onrender.com`
2. Confirm homepage loads correctly
3. Check navigation works

### Test Admin Portal
1. Go to: `https://auxilium-consult.onrender.com/auth/admin-signin`
2. Login with:
   - Email: `admin@auxiliumconsult.com`
   - Password: `Admin@2025`
3. Verify dashboard displays live data

### Test Client Portal
1. Go to: `https://auxilium-consult.onrender.com/auth/signin`
2. Login with:
   - Email: `demo@example.com`
   - Password: `Demo@2025`
3. Verify project dashboard works

### Test API Health
1. Visit: `https://auxilium-consult.onrender.com/api/health`
2. Should return: `{"status":"ok"}`

## Step 5: Configure Custom Domain (Optional)

### Add Your Domain
1. **In Render Dashboard**
   - Go to Settings → Custom Domains
   - Click "Add Custom Domain"
   - Enter: `www.auxiliumconsult.com`

2. **Update DNS Records**
   Render will show you DNS records to add. Example:
   ```
   Type: CNAME
   Name: www
   Value: auxilium-consult.onrender.com
   ```

3. **Update Environment Variables**
   After domain is verified:
   - Change `NEXTAUTH_URL` to `https://www.auxiliumconsult.com`
   - Change `NEXT_PUBLIC_SITE_URL` to `https://www.auxiliumconsult.com`
   - Render will auto-redeploy

4. **SSL Certificate**
   - Automatically provisioned by Render
   - No configuration needed

## Troubleshooting

### Build Failed
**Error**: Prisma migration failed
- **Solution**: Check DATABASE_URL is correct
- **Fix**: Go to Environment → DATABASE_URL → Update value

**Error**: Out of memory
- **Solution**: Free tier has 512MB RAM limit
- **Fix**: Upgrade to Starter plan ($7/month) for 2GB RAM

### App Not Loading
**Issue**: Site shows "Service Unavailable"
- **Cause**: App is spinning up (free tier spins down after 15 min)
- **Wait**: 30-60 seconds for first load
- **Fix**: Upgrade to paid plan for 24/7 availability

### Login Not Working
**Issue**: "Configuration error" when logging in
- **Cause**: NEXTAUTH_URL mismatch
- **Fix**: Ensure NEXTAUTH_URL matches your actual domain

## Free Tier Limitations

⚠️ **Important to Know**:
- **Spins down after 15 minutes** of inactivity
- **30-60 second startup** on first request after spin-down
- **512 MB RAM** (sufficient for this app)
- **100 GB bandwidth/month**

### Keep Site Active (Optional)
Use a free uptime monitor:
- [UptimeRobot](https://uptimerobot.com) - Ping every 14 minutes
- [Cron-Job.org](https://cron-job.org) - Schedule health checks
- Configure to ping: `https://auxilium-consult.onrender.com/api/health`

## Upgrade to Production

For serious production use:

### Render Starter ($7/month)
- ✅ No spin-down (24/7 availability)
- ✅ 2GB RAM
- ✅ Faster builds
- ✅ Priority support

### Neon Launch ($19/month)
- ✅ Better database performance
- ✅ 10GB storage
- ✅ Autoscaling compute
- ✅ 30-day point-in-time recovery

**Total Production Cost**: $26/month

## Auto-Deploy on Push

Already configured! ✅

- Every push to `main` branch triggers deployment
- Migrations run automatically during build
- No manual intervention needed

## Monitoring

### View Logs
- Dashboard → Logs tab
- Filter by: Build, Deploy, Runtime
- Search for errors

### Check Performance
- Dashboard → Metrics tab
- Monitor: CPU, Memory, Requests
- Track response times

## Support

### Render Support
- Docs: https://render.com/docs
- Community: https://community.render.com
- Email: support@render.com

### Need Help?
Check detailed guide: [NEON_DEPLOYMENT.md](./NEON_DEPLOYMENT.md)

## Next Steps After Deployment

1. ✅ Share URL with team
2. ✅ Set up custom domain
3. ✅ Configure uptime monitoring
4. ✅ Create real client accounts (remove demo data)
5. ✅ Set up email notifications (future enhancement)
6. ✅ Add file upload for documents (future enhancement)

---

**Your app is live!** 🚀  
Visit: `https://auxilium-consult.onrender.com`
