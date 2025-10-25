# Deploying to Render

This Next.js application is configured for deployment on Render.

## Quick Deploy

1. **Connect Repository to Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `FyliaCare/Auxilium-Consult`

2. **Configure Service (Auto-detected from render.yaml)**
   - Name: `auxilium-consult`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: Free (or your preferred tier)

3. **Environment Variables**
   - The following are automatically set:
     - `NODE_ENV=production`
     - `NEXT_TELEMETRY_DISABLED=1`
   - Add custom variables in Render dashboard if needed

4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically deploy on every push to `main` branch

## Custom Domain

To use a custom domain (e.g., auxiliumconsult.com):

1. Go to your service settings in Render
2. Navigate to "Custom Domains"
3. Add your domain
4. Update your DNS records with the provided values

## Environment Variables (Optional)

If you need to add environment variables:

1. Go to your service in Render Dashboard
2. Navigate to "Environment" tab
3. Add variables based on `.env.example`

## Build Information

- **Node Version**: >=18.17.0
- **Build Time**: ~50 seconds
- **Bundle Size**: 154 KB First Load JS
- **Framework**: Next.js 15.5.6

## Health Check

The application includes a health check endpoint at `/api/health` that Render can use to monitor service status.

## Automatic Deployments

Configured for automatic deployment on push to `main` branch via `render.yaml`.

## Support

For deployment issues, check:
- [Render Docs](https://render.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
