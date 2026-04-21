# Skill: React Dashboard Builder

## Purpose
This skill guides you through building a complete, production-ready React dashboard web app from scratch — including requirement gathering, code generation, local preview, and Vercel deployment.

**BLOCKING REQUIREMENT**: Read this entire file before generating any code or asking any questions.

---

## Phase 1 — Requirement Gathering (ALWAYS DO THIS FIRST)

Before writing a single line of code, collect requirements from the user using the `vscode_askQuestions` tool.

**CRITICAL RULES for requirement gathering:**
- Use `vscode_askQuestions` — this shows a structured question box in the UI, NOT a chat message
- Ask **one question at a time** — a single `vscode_askQuestions` call with one question
- Wait for the answer before asking the next question
- Do NOT dump all questions into a single message or a single `vscode_askQuestions` call
- Do NOT proceed to Phase 2 until all 10 questions are answered

### Question sequence (ask one by one):

**Q1 — Purpose**
> "What should this dashboard show? (e.g. sales data, project status, HR metrics, exceptions)"
> Include options: Sales/revenue, Operations/logistics, HR/people, Project status, Other (freeform)

**Q2 — Audience**
> "Who is the audience?"
> Options: Internal team, Demo / prototype, Customer-facing

**Q3 — Views / pages**
> "How many views or pages are needed, and what should each show?"
> Freeform. Example: "Main dashboard + detail side panel"

**Q4 — Charts**
> "What charts or graphs do you need?"
> Multi-select options: Bar chart, Horizontal bar, Line/area chart, Donut/pie, None

**Q5 — KPI tiles**
> "What top-level numbers should appear as summary cards at the top? Should they be clickable to filter the data below?"
> Freeform. Example: "Total, Critical count, Avg value — yes clickable"

**Q6 — Table / list**
> "Do you need a data table or sortable list? If yes, what columns?"
> Freeform. Example: "Yes — ID, Status, Priority, Date, Owner"

**Q7 — Filters**
> "What filter controls are needed?"
> Multi-select options: Dropdown, Toggle/switch, Search box, Chip/tag filter, None

**Q8 — Data source**
> "Where does the data come from?"
> Options: Fully hardcoded demo data, Realistic mock data generated in code, Local JSON file, External API (provide URL), User uploads at runtime

**Q9 — Styling**
> "Dark or light theme? Any brand colours?"
> Options: Dark (slate/navy — default), Light, Custom (freeform for colours)

**Q10 — MCP / external data connection**
> "Do you want to connect this dashboard to a live data source via an MCP server?"
> Options: Yes — I have an MCP server running (ask for URL), No — use realistic mock/demo data

If yes: follow up with a single `vscode_askQuestions` call asking for the MCP server base URL.

**Q11 — App name & deployment**
> "What should the app be called, and should it be deployed to Vercel?"
> Freeform. Example: "Sales Ops Dashboard — yes deploy to Vercel"

---

## Phase 2 — Tech Stack Decision

Based on the answers, decide on the stack. Default (proven) stack for a dashboard:

| Concern | Choice | Notes |
|---|---|---|
| Framework | React 19 + TypeScript | Vite scaffold |
| Styling | Tailwind CSS 3.x | Dark theme |
| State | Zustand 4.x | Lightweight, no boilerplate |
| Charts | recharts 3.x | Install with `--legacy-peer-deps` |
| Icons | lucide-react | Tree-shakeable |
| Build/Dev | Vite 8.x | Fast HMR |
| Deploy | Vercel | Via CLI |

Only deviate from this stack if the user specifically requested something different.

---

## Phase 3 — Project Setup

### 3a. Check if a project already exists
```
# Check for existing package.json
Test-Path package.json
```

If no project exists, scaffold one:
```
npm create vite@latest . -- --template react-ts
npm install
npm install tailwindcss@3 postcss autoprefixer
npx tailwindcss init -p
npm install zustand recharts lucide-react react-is --legacy-peer-deps
```

### 3b. Configure Tailwind
In `tailwind.config.js`:
```js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: { extend: {} },
  plugins: [],
}
```

In `src/index.css` (replace everything):
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html, body, #root {
  margin: 0;
  padding: 0;
  /* Do NOT use overflow: hidden — it blocks page scrolling */
  background: #020617;
}
```

### 3c. index.html title
Set `<title>` to the app name.

---

## Phase 4 — Project Structure

Always use this folder structure:

```
src/
  App.tsx                  ← Root, handles view routing
  main.tsx                 ← Vite entry point
  index.css                ← Tailwind directives

  components/
    <FeatureName>/
      Dashboard.tsx        ← Main layout component
      KpiCards.tsx         ← Top summary tiles
      FilterBar.tsx        ← Filter chips/dropdowns
      DataTable.tsx        ← Sortable clickable list
      DetailPanel.tsx      ← Side panel opened on row click
      Charts.tsx           ← All recharts visualisations
      Badges.tsx           ← Small reusable badge/label components

  data/
    staticData.ts          ← All hardcoded/mocked data
    dataEngine.ts          ← Logic that derives metrics from raw data

  store/
    appStore.ts            ← Zustand store (filters, selection, derived state)

  types/
    appTypes.ts            ← All TypeScript interfaces and union types
```

**Rules:**
- Never import Three.js or any WebGL library at the top level of App.tsx — it will crash the module system before React mounts
- Keep all data logic in `data/`, keep all UI in `components/`
- One Zustand store is enough for most dashboards

---

## Phase 5 — Component Patterns

### KPI Cards (clickable filters)
```tsx
// Each card is a <button> with accent colour, hover state, active/selected state
// Store: kpiFilter: KpiFilterId | null
// Toggle: setKpiFilter(kpiFilter === id ? null : id)
// Show active-filter banner below cards when a filter is active
```

Key visual states:
- **Default**: `bg-slate-800/60 border-{accent}-500/40 hover:bg-slate-700/40`
- **Active**: `bg-slate-700/70 border-{accent}-400 ring-2 ring-{accent}-500/30`
- **Active dot**: `absolute top-2 right-2 h-2 w-2 rounded-full bg-{accent}-400 animate-pulse`

### Charts (recharts)
```tsx
// Always use ResponsiveContainer width="100%"
// Fix tooltip cursor: cursor: { fill: 'rgba(148, 163, 184, 0.06)' }
// Shared tooltip style:
const TOOLTIP_STYLE = {
  contentStyle: { background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 },
  labelStyle: { color: '#94a3b8' },
  itemStyle: { color: '#e2e8f0' },
  cursor: { fill: 'rgba(148, 163, 184, 0.06)' },
};

// For bar charts with many X-axis labels — angle them:
<XAxis angle={-35} tick={{ textAnchor: 'end', fontSize: 10 }} interval={0} />
// Add margin={{ bottom: 20 }} to BarChart when labels are angled

// For horizontal bar charts (category names fit better on Y axis):
<BarChart layout="vertical">
  <XAxis type="number" />
  <YAxis type="category" dataKey="name" width={110} />
</BarChart>

// For even bar spacing in grouped bar charts:
<BarChart barCategoryGap="35%" barGap={3}>
  <Bar maxBarSize={28} ... />
</BarChart>

// For donut chart:
<Pie innerRadius={42} outerRadius={62} paddingAngle={3} />
```

### Data table with fixed column alignment
```tsx
// Use identical gridTemplateColumns string on BOTH header and rows
// Add whitespace-nowrap to badge components to prevent wrapping
const COLS = '1fr 56px 96px 108px 72px 88px 16px';

// Header
<div style={{ gridTemplateColumns: COLS }} className="grid gap-x-3 ...">

// Rows
<button style={{ gridTemplateColumns: COLS }} className="grid gap-x-3 ...">
```

### Layout split (table + side panel)
```tsx
// 60/40 split — table is wider, side panel has room
<div className="grid gap-4 grid-cols-1 lg:grid-cols-[3fr_2fr]">
  <div>{/* table */}</div>
  <div>{/* detail panel or AI/summary panel */}</div>
</div>
```

### Badge components
Always add `whitespace-nowrap` to prevent multi-line badges:
```tsx
<span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap ...">
```

### Snapshot timestamp (fake "live" data)
```tsx
// Show 2 hours behind current time, rounded to the nearest full hour
const _snap = new Date();
_snap.setHours(_snap.getHours() - 2, 0, 0, 0);
const label = _snap.toLocaleString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
```

---

## Phase 6 — Zustand Store Pattern

```typescript
import { create } from 'zustand';

// 1. Define filter type
interface Filters {
  category: string[];
  severity: string[];
  // ... etc
}

// 2. Define KPI filter IDs
export type KpiFilterId = 'total' | 'critical' | 'high' | /* ... */;

// 3. Define predicates (single source of truth)
export const KPI_PREDICATES: Record<KpiFilterId, (item: Item) => boolean> = {
  total:    () => true,
  critical: (i) => i.severity === 'critical',
  // ...
};

// 4. Store
interface AppStore {
  items: Item[];
  filters: Filters;
  kpiFilter: KpiFilterId | null;
  selectedId: string | null;
  setFilters: (f: Partial<Filters>) => void;
  setKpiFilter: (id: KpiFilterId | null) => void;
  selectItem: (id: string | null) => void;
  filteredItems: () => Item[];
}

export const useAppStore = create<AppStore>((set, get) => ({
  // filteredItems applies standard filters THEN kpiFilter on top
  filteredItems: () => {
    const { items, filters, kpiFilter } = get();
    const base = items.filter(/* standard filter logic */);
    if (!kpiFilter || kpiFilter === 'total') return base;
    return base.filter((i) => KPI_PREDICATES[kpiFilter](i));
  },
}));
```

---

## Phase 7 — Local Development

```powershell
# Start dev server
npx vite

# Or specify port if 5173 is in use
npx vite --port 5174

# App will be at http://localhost:5173 (or chosen port)
# HMR (hot reload) works automatically on file save
```

**Common issues and fixes:**
- **Blank page**: Check browser console. Most likely a top-level import that crashes the module system. Comment out imports one by one to isolate.
- **Overflow hidden blocking scroll**: Remove `overflow: hidden` from `html, body, #root` in `index.css`
- **Port already in use**: Kill the old process or use `--port 5175`

---

## Phase 8 — Vercel Deployment

### 8a. vercel.json (put in project root)
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install --legacy-peer-deps",
  "framework": "vite"
}
```
**Critical**: Use `npm install --legacy-peer-deps` as the install command — recharts has React 19 peer dependency conflicts that fail without this flag.

### 8b. First-time deploy
```powershell
# Login (interactive — do once)
npx vercel login

# Link to an existing project by name (avoids interactive prompts)
npx vercel link --yes --project <your-project-name>

# Deploy to production
npx vercel --prod --yes
```

### 8c. Re-aliasing after each deploy
Vercel generates a unique URL for each deployment. You must alias it to your custom domain after each deploy:
```powershell
npx vercel alias <deployment-url> <your-domain>.vercel.app
```
Example (replace with your own values from the deploy output):
```powershell
npx vercel alias my-app-abc123xyz-myusername.vercel.app my-app.vercel.app
```

### 8d. If the wrong project is linked
```powershell
# Remove the link
Remove-Item -Recurse -Force .vercel

# Re-link to the correct project
npx vercel link --yes --project <correct-project-name>

# Deploy again
npx vercel --prod --yes
npx vercel alias <url> <domain>.vercel.app
```

### 8e. Verify deployed version
After deploying, do a **hard refresh** in the browser (`Ctrl+Shift+R`) to bypass the CDN cache.

---

## Phase 9 — Checklist Before Publishing

- [ ] `npm run build` succeeds with no TypeScript errors
- [ ] App renders correctly at `localhost:5173`
- [ ] No `overflow: hidden` blocking scroll
- [ ] No top-level heavy imports (Three.js etc.) in App.tsx
- [ ] `vercel.json` has `--legacy-peer-deps` in installCommand
- [ ] `.vercel/` folder is linked to the correct project
- [ ] After `vercel --prod --yes`, run the alias command
- [ ] Hard refresh the production URL to verify

---

## Lessons Learned (from real project)

1. **Three.js + React.lazy**: Even lazy-loading Three.js can crash the module system. If 3D is not essential, remove it entirely.
2. **recharts Cell component**: In recharts 3.x, `<Cell>` as a functional component returns null but still works as a child of `<Pie>` or `<Bar>` via `findAllByType`. This is expected behaviour.
3. **External system deep links**: When linking out to another app (e.g. an ERP or CRM), verify the exact URL format including query params. Use a config constant for the base URL so it's easy to change.
4. **Tailwind JIT**: Dynamically constructed class names (string interpolation) are not picked up by JIT. Define full class strings in lookup objects.
5. **Vercel multiple aliases**: A project can have many aliases. Only the one you explicitly alias after deployment will reflect the new build.
6. **Chart title spacing**: Use `mb-1` (not `mb-4`) between chart title and `<ResponsiveContainer>` to give charts more vertical space.
7. **DataSourceBadge wrapping**: Always add `whitespace-nowrap` to inline badges in table cells to prevent two-line rendering.
8. **`react-is` missing**: recharts requires `react-is` as a peer dependency. When using `--legacy-peer-deps`, it won't be auto-installed. Always install it explicitly: `npm install react-is --legacy-peer-deps`. Symptom: `Failed to resolve import "react-is" from recharts` error in Vite dev server.
