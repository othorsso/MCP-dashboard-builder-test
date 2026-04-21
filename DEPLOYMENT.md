# Deployment Guide

See [skill-react-dashboard-builder/DEPLOYMENT_QUICKREF.md](./skill-react-dashboard-builder/DEPLOYMENT_QUICKREF.md) for the full Vercel deployment flow.

## Quick deploy

```powershell
# Build and verify locally
npm run build

# Deploy to production
npx vercel --prod --yes

# Alias to your domain (copy URL from deploy output)
npx vercel alias <deployment-url>.vercel.app <your-domain>.vercel.app
```

## Important: peer dependency install

This project requires `--legacy-peer-deps` due to React 19 + recharts peer conflicts.
The `vercel.json` already sets this as the install command.

For local installs:
```bash
npm install --legacy-peer-deps
```
