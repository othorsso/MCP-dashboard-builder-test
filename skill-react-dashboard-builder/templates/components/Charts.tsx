// ============================================================
// Charts — starter template
// Replace data derivation with your own logic.
// ============================================================

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

// ── Shared tooltip style (apply to ALL charts) ────────────────────────────────
// cursor: subtle dark tint instead of the default white rectangle
const TOOLTIP_STYLE = {
  contentStyle: {
    background: '#1e293b',
    border: '1px solid #334155',
    borderRadius: 8,
    fontSize: 12,
  },
  labelStyle: { color: '#94a3b8' },
  itemStyle: { color: '#e2e8f0' },
  cursor: { fill: 'rgba(148, 163, 184, 0.06)' }, // ← fixes white hover box
};

// ── Colour palettes ───────────────────────────────────────────────────────────
const SEVERITY_COLORS = {
  critical: '#f87171',
  high:     '#fb923c',
  medium:   '#fbbf24',
  low:      '#38bdf8',
};

// ── Vertical grouped bar chart ────────────────────────────────────────────────
// Good for: comparing counts across 3–5 categories, split by 1–2 groups
export function GroupedBarChart({ data }: { data: Array<{ name: string; A: number; B: number }> }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Chart Title
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="35%" barGap={3}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={20}
            allowDecimals={false}
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="A" fill="#6366f1" radius={[4, 4, 0, 0]} name="Group A" maxBarSize={28} />
          <Bar dataKey="B" fill="#a855f7" radius={[4, 4, 0, 0]} name="Group B" maxBarSize={28} />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            iconSize={8}
            formatter={(v) => <span style={{ color: '#94a3b8' }}>{v}</span>}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Horizontal bar chart ──────────────────────────────────────────────────────
// Good for: many categories with long names — names go on Y axis
export function HorizontalBarChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Chart Title
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical" barSize={12} barCategoryGap="30%">
          <XAxis
            type="number"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={110}   // ← increase if labels are long
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="value" fill="#6366f1" radius={[0, 4, 4, 0]} name="Count" maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Angled X-axis bar chart ───────────────────────────────────────────────────
// Good for: 5–7 categories with medium-length names
export function AngledBarChart({ data }: { data: Array<{ name: string; A: number; B: number }> }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Chart Title
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="35%" barGap={3} margin={{ bottom: 20 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 10, textAnchor: 'end' }}
            angle={-35}
            axisLine={false}
            tickLine={false}
            interval={0}   // ← show every label even when cramped
          />
          <YAxis
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={20}
            allowDecimals={false}
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="A" fill="#6366f1" radius={[4, 4, 0, 0]} name="A" maxBarSize={20} />
          <Bar dataKey="B" fill="#a855f7" radius={[4, 4, 0, 0]} name="B" maxBarSize={20} />
          <Legend
            wrapperStyle={{ fontSize: 11, paddingTop: 8 }}
            iconSize={8}
            formatter={(v) => <span style={{ color: '#94a3b8' }}>{v}</span>}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Donut / Pie chart ─────────────────────────────────────────────────────────
export function DonutChart({ data }: { data: Array<{ name: string; value: number; color: string }> }) {
  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Chart Title
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={42}
            outerRadius={62}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} fillOpacity={0.9} />
            ))}
          </Pie>
          <Tooltip {...TOOLTIP_STYLE} />
          <Legend
            wrapperStyle={{ fontSize: 11 }}
            iconSize={8}
            formatter={(v) => <span style={{ color: '#94a3b8' }}>{v}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
