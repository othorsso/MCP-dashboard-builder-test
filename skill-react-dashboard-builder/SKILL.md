# Skill: React Dashboard Builder

## Purpose
This skill guides you through building a complete, production-ready React dashboard web app from scratch — including requirement gathering, code generation, local preview, and Vercel deployment.

**BLOCKING REQUIREMENT**: Read this entire file before generating any code or asking any questions.

---

## Phase 1 — Requirement Gathering (ALWAYS DO THIS FIRST)

Before writing a single line of code, ask the user the following questions. Group them into one message. Do not proceed to Phase 2 until you have answers.

### Questions to ask:

**1. Purpose & content**
- What should this dashboard/app show? (e.g. sales data, warehouse exceptions, project status, HR metrics)
- Who is the audience? (internal team, demo, customer-facing)

**2. Pages / views**
- How many pages or views are needed?
- List the views (e.g. "main dashboard", "detail view", "map view", "settings")
- Should there be navigation between them?

**3. Charts and visualisations**
- What charts or graphs are needed? (bar, pie/donut, line, area, horizontal bar)
- What metric does each chart show?

**4. KPI tiles / summary cards**
- What top-level numbers should be shown as cards? (e.g. Total, Critical count, Avg value)
- Should KPI cards be clickable to filter the list below?

**5. Tables / lists**
- Is there a data table or sortable list?
- What columns should it show?
- Should rows be clickable to open a detail panel?

**6. Filters**
- What filter controls are needed? (dropdowns, toggles, chips, search)
- Should filters affect charts too, or just the table?

**7. Data source**
Choose one:
- [ ] Fully static / hardcoded demo data
- [ ] Mocked data that looks realistic but is generated in code
- [ ] Data loaded from a local JSON file
- [ ] Data fetched from an external API (provide URL + shape)
- [ ] Data uploaded by the user at runtime

**8. Styling**
- Dark theme or light theme? (default: dark slate/navy)
- Any brand colours to use?
- Compact or spacious layout?

**9. Deployment**
- Local only, or deploy to Vercel?
- If Vercel: do you already have a project/domain? If yes, what is the URL?

**10. App name**
- What should the app be called in the header?

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
npm install zustand recharts lucide-react --legacy-peer-deps
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
Example:
```powershell
npx vercel alias oscartestingwhsdata-ja6j57awn-othorssos-projects.vercel.app oscartestingwhsdata.vercel.app
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
3. **D365 deep links**: URL format is `https://{host}?cmp={company}&mi={FormMenuItemName}`. The `mi=` value is the AOT menu item name (not the form label).
4. **Tailwind JIT**: Dynamically constructed class names (string interpolation) are not picked up by JIT. Define full class strings in lookup objects.
5. **Vercel multiple aliases**: A project can have many aliases. Only the one you explicitly alias after deployment will reflect the new build.
6. **Chart title spacing**: Use `mb-1` (not `mb-4`) between chart title and `<ResponsiveContainer>` to give charts more vertical space.
7. **DataSourceBadge wrapping**: Always add `whitespace-nowrap` to inline badges in table cells to prevent two-line rendering.
