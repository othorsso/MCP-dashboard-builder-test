// ============================================================
// Exception Charts — severity distribution, category breakdown,
//                   WH24 vs WH51 comparison
// ============================================================

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import type { WarehouseException, Severity, ProcessArea } from '../../types/exceptions';

// ── Colour tokens ─────────────────────────────────────────────────────────────
const SEV_COLORS: Record<Severity, string> = {
  critical: '#f87171',
  high:     '#fb923c',
  medium:   '#fbbf24',
  low:      '#38bdf8',
};

const AREA_COLORS: Record<ProcessArea, string> = {
  outbound:      '#60a5fa',
  inbound:       '#34d399',
  production:    '#a78bfa',
  quality:       '#f472b6',
  inventory:     '#fbbf24',
  replenishment: '#22d3ee',
};

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 },
  labelStyle: { color: '#94a3b8' },
  itemStyle: { color: '#e2e8f0' },
  cursor: { fill: 'rgba(148, 163, 184, 0.06)' },
};

// ── Severity distribution ─────────────────────────────────────────────────────
function SeverityChart({ exceptions }: { exceptions: WarehouseException[] }) {
  const data = (['critical', 'high', 'medium', 'low'] as Severity[]).map((s) => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    WH24: exceptions.filter((e) => e.warehouseId === '24' && e.severity === s).length,
    WH51: exceptions.filter((e) => e.warehouseId === '51' && e.severity === s).length,
  }));

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Exceptions by Severity
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} barCategoryGap="35%" barGap={3}>
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={20} allowDecimals={false} />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="WH24" fill="#6366f1" radius={[4, 4, 0, 0]} name="WH24" maxBarSize={28} />
          <Bar dataKey="WH51" fill="#a855f7" radius={[4, 4, 0, 0]} name="WH51" maxBarSize={28} />
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

// ── Process area breakdown ─────────────────────────────────────────────────────
function AreaChart({ exceptions }: { exceptions: WarehouseException[] }) {
  const areas: ProcessArea[] = ['outbound', 'inbound', 'production', 'quality', 'inventory', 'replenishment'];
  const data = areas
    .map((a) => ({
      name: a.charAt(0).toUpperCase() + a.slice(1),
      count: exceptions.filter((e) => e.processArea === a).length,
      fill: AREA_COLORS[a],
    }))
    .filter((d) => d.count > 0)
    .sort((a, b) => b.count - a.count);

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Exceptions by Process Area
      </h3>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} layout="vertical" barSize={14}>
          <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fill: '#94a3b8', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={92}
          />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Count">
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} fillOpacity={0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── Severity donut ──────────────────────────────────────────────────────────────
function SeverityDonut({ exceptions }: { exceptions: WarehouseException[] }) {
  const data = (['critical', 'high', 'medium', 'low'] as Severity[])
    .map((s) => ({ name: s, value: exceptions.filter((e) => e.severity === s).length }))
    .filter((d) => d.value > 0);

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        Severity Mix
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
              <Cell
                key={entry.name}
                fill={SEV_COLORS[entry.name as Severity]}
                fillOpacity={0.9}
              />
            ))}
          </Pie>
          <Tooltip {...TOOLTIP_STYLE} formatter={(v, n) => [`${v}`, n]} />
          <Legend
            wrapperStyle={{ fontSize: 11 }}
            iconSize={8}
            formatter={(v) => <span style={{ color: '#94a3b8', textTransform: 'capitalize' }}>{v}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

// ── WH24 vs WH51 Category Comparison ──────────────────────────────────────────
function WarehouseComparisonChart({ exceptions }: { exceptions: WarehouseException[] }) {
  const categories = [
    { key: 'blocked_work',        label: 'Blocked' },
    { key: 'stockout',            label: 'Stockout' },
    { key: 'stale_work',          label: 'Stale Work' },
    { key: 'quality_hold',        label: 'Quality Hold' },
    { key: 'delayed_shipment',    label: 'Shipment' },
    { key: 'replenishment_delay', label: 'Replen.' },
  ];

  const data = categories
    .map(({ key, label }) => ({
      name: label,
      WH24: exceptions.filter((e) => e.category === key && e.warehouseId === '24').length,
      WH51: exceptions.filter((e) => e.category === key && e.warehouseId === '51').length,
    }))
    .filter((d) => d.WH24 > 0 || d.WH51 > 0);

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
        WH24 vs WH51 by Category
      </h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="35%" barGap={3} margin={{ bottom: 20 }}>
          <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10, textAnchor: 'end' }} angle={-35} axisLine={false} tickLine={false} interval={0} />
          <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} axisLine={false} tickLine={false} width={20} allowDecimals={false} />
          <Tooltip {...TOOLTIP_STYLE} />
          <Bar dataKey="WH24" fill="#6366f1" radius={[4, 4, 0, 0]} name="WH24" maxBarSize={20} />
          <Bar dataKey="WH51" fill="#a855f7" radius={[4, 4, 0, 0]} name="WH51" maxBarSize={20} />
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

// ── Exported composite ────────────────────────────────────────────────────────
export function ExceptionCharts({ exceptions }: { exceptions: WarehouseException[] }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <SeverityDonut exceptions={exceptions} />
      <SeverityChart exceptions={exceptions} />
      <AreaChart exceptions={exceptions} />
      <WarehouseComparisonChart exceptions={exceptions} />
    </div>
  );
}
