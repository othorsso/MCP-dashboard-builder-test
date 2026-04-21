# React Dashboard Builder — Skill & Template

A reusable skill and starter template for building production-ready React dashboards with TypeScript, Tailwind CSS, Zustand, and recharts. Deployable to Vercel in minutes.

## What's in this repo

| Path | Description |
|---|---|
| `skill-react-dashboard-builder/SKILL.md` | Step-by-step skill guide for building a dashboard from scratch |
| `skill-react-dashboard-builder/REQUIREMENTS_TEMPLATE.md` | Blank requirements checklist to fill in before building |
| `skill-react-dashboard-builder/DEPLOYMENT_QUICKREF.md` | Vercel deployment quick reference |
| `skill-react-dashboard-builder/templates/` | Ready-to-use starter files (store, charts, KPI cards, vercel.json) |
| `src/` | Example dashboard implementation |

## Quick start (example app)

```bash
npm install --legacy-peer-deps
npm run dev
```

Open **http://localhost:5173**

## Tech stack

| Concern | Choice |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS 3.x |
| State | Zustand 4.x |
| Charts | recharts 3.x |
| Icons | lucide-react |
| Deploy | Vercel |

## Deploy to Vercel

See [skill-react-dashboard-builder/DEPLOYMENT_QUICKREF.md](./skill-react-dashboard-builder/DEPLOYMENT_QUICKREF.md) for the full deploy flow.

```bash
npx vercel --prod --yes
```

## Building your own dashboard

Start with the skill guide:
👉 [skill-react-dashboard-builder/SKILL.md](./skill-react-dashboard-builder/SKILL.md)

It walks through requirement gathering, project setup, component patterns, state management, and Vercel deployment.
