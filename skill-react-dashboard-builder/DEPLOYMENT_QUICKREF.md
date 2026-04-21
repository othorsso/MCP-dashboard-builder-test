# Vercel Deployment — Quick Reference

## One-time setup

```powershell
# Login to Vercel
npx vercel login

# Link this folder to a Vercel project
npx vercel link --yes --project <your-project-name>
```

## Every deploy

```powershell
# Build and verify locally first
npm run build

# Deploy to production
npx vercel --prod --yes

# Alias to your domain (copy URL from the deploy output above)
npx vercel alias <deployment-url>.vercel.app <your-domain>.vercel.app
```

## Wrong project linked?

```powershell
Remove-Item -Recurse -Force .vercel
npx vercel link --yes --project <correct-project-name>
npx vercel --prod --yes
npx vercel alias <url> <domain>.vercel.app
```

## Verify

After deploying, always hard-refresh the browser: `Ctrl+Shift+R`

## Common errors

| Error | Fix |
|---|---|
| `ERESOLVE` during install | Add `--legacy-peer-deps` to installCommand in vercel.json |
| Deploy goes to wrong domain | Re-run the `vercel alias` command with the correct domain |
| Old version showing after deploy | Hard refresh (`Ctrl+Shift+R`) or check alias list with `vercel alias ls` |
| Build fails on Vercel but not locally | Check that vercel.json installCommand matches what you run locally |
