# Requirements Gathering Template

Use this as a checklist when collecting requirements from the user before building.
Copy it into session memory and fill in answers as the user responds.

---

## App Identity
- **App name**: ___
- **Audience**: internal team / demo / customer-facing
- **Purpose**: ___

---

## Views / Pages
| # | View name | Description |
|---|---|---|
| 1 | | |
| 2 | | |

- Navigation style: top nav tabs / sidebar / buttons
- Default view: ___

---

## KPI Cards (top summary tiles)
| Label | What it counts/shows | Accent colour |
|---|---|---|
| | | |

- Clickable to filter? Yes / No

---

## Charts
| Chart title | Type | X axis | Y axis / metric | Split by |
|---|---|---|---|---|
| | Bar | | | |
| | Donut/Pie | | | |
| | Horizontal bar | | | |
| | Line | | | |

---

## Data Table
- Columns: ___
- Sortable? Yes / No
- Clickable rows? Yes / No → opens: ___
- Row count: ~___

---

## Filters
- [ ] Severity / status toggle chips
- [ ] Category dropdown
- [ ] Date range
- [ ] Search / text filter
- [ ] Warehouse / location filter
- [ ] Custom: ___

---

## Data Source
- [ ] Hardcoded static arrays in `src/data/staticData.ts`
- [ ] Mocked realistic data generated in code
- [ ] JSON file loaded at runtime
- [ ] External REST API — URL: ___ / Auth: ___
- [ ] User uploads file

---

## Styling
- Theme: dark / light
- Primary accent colour: ___
- Layout: compact / spacious
- Font: default (system) / custom

---

## Deployment
- Local only? Yes / No
- Deploy to Vercel? Yes / No
  - Existing project name: ___
  - Desired domain: ___.vercel.app

---

## Extra Notes
___
