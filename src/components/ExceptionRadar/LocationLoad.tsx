// ============================================================
// Location Load View
// ============================================================
// Shows WH24 location capacity utilisation as a colour-coded
// bar/column chart with a detail table.
//
// DATA NOTE:
//   Location IDs and capacity values → real D365FO data, USMF WH24,
//   fetched 2026-04-16 via WarehouseLocations OData entity
//   (see src/data/warehouseData.ts).
//
//   On-hand quantities per location → derived from total item
//   on-hand (WarehousesOnHandV2) distributed across locations.
//   The InventLocationCapacitySetup entity was NOT queried;
//   treat per-location qty as indicative only.
// ============================================================

import { useMemo, useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, Cell, ReferenceLine,
} from 'recharts';
import { MapPin, ArrowLeft, AlertTriangle } from 'lucide-react';
import { WAREHOUSE_24_LOCATIONS } from '../../data/warehouseData';
import type { WarehouseLocation } from '../../types/warehouse';

// ── Load thresholds & colours ─────────────────────────────────────────────────

function loadPct(loc: WarehouseLocation): number {
  return loc.capacity > 0
    ? Math.min(Math.round((loc.currentQuantity / loc.capacity) * 100), 110)
    : 0;
}

function barColor(pct: number): string {
  if (pct >= 100) return '#dc2626'; // Overloaded   — red-600
  if (pct >= 90)  return '#ef4444'; // Critical     — red-500
  if (pct >= 75)  return '#f97316'; // High         — orange-500
  if (pct >= 50)  return '#eab308'; // Medium       — yellow-500
  if (pct >  0)   return '#22c55e'; // Low / Normal — green-500
  return '#475569';                  // Empty        — slate-600
}

function loadStatus(pct: number): string {
  if (pct >= 100) return 'Overloaded';
  if (pct >= 90)  return 'Critical';
  if (pct >= 75)  return 'High';
  if (pct >= 50)  return 'Medium';
  if (pct > 0)    return 'Low';
  return 'Empty';
}

function statusBadgeClass(pct: number): string {
  if (pct >= 100) return 'text-red-400 bg-red-500/15 border-red-500/40';
  if (pct >= 90)  return 'text-red-300 bg-red-500/10 border-red-500/30';
  if (pct >= 75)  return 'text-orange-300 bg-orange-500/10 border-orange-500/30';
  if (pct >= 50)  return 'text-yellow-300 bg-yellow-500/10 border-yellow-500/30';
  if (pct > 0)    return 'text-green-300 bg-green-500/10 border-green-500/30';
  return 'text-slate-500 bg-slate-700/30 border-slate-600/40';
}

// ── Zone classification ───────────────────────────────────────────────────────

const SYSTEM_IDS = new Set([
  'USER', 'RF Gen', 'AtLineQMS', 'Return', 'Dummy',
  '24ND', 'ND', 'OTH', 'LPW', 'RW', 'JL',
]);

function getZone(loc: WarehouseLocation): string {
  const id = loc.locationId;
  if (id.startsWith('BULK'))                            return 'Bulk Storage';
  if (id.startsWith('FL'))                              return 'Floor Picking';
  if (id.startsWith('CP'))                              return 'Container / Pallet';
  if (id === 'BAYDOOR' || id === 'RECV')                return 'Receiving';
  if (id === 'STAGE'   || id === 'PACK')                return 'Staging / Packing';
  if (id.startsWith('Prod'))                            return 'Production';
  return 'Other';
}

// ── Types ─────────────────────────────────────────────────────────────────────

interface LocationRow {
  locationId: string;
  zone: string;
  capacity: number;
  qty: number;
  pct: number;
  itemNumber?: string;
  color: string;
  status: string;
}

// ── Custom tooltip ─────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: LocationRow }> }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div style={{
      background: '#1e293b', border: '1px solid #334155',
      borderRadius: 8, padding: '10px 14px', fontSize: 12,
    }}>
      <p style={{ color: '#f1f5f9', fontWeight: 600, marginBottom: 4 }}>{d.locationId}</p>
      <p style={{ color: '#94a3b8' }}>{d.zone}</p>
      {d.itemNumber && <p style={{ color: '#94a3b8' }}>Item: {d.itemNumber}</p>}
      <p style={{ color: d.color, fontWeight: 600 }}>
        {d.pct}% — {d.status}
      </p>
      <p style={{ color: '#64748b' }}>
        {d.qty.toLocaleString()} / {d.capacity.toLocaleString()} units
      </p>
    </div>
  );
}

// ── Legend ────────────────────────────────────────────────────────────────────

const LEGEND = [
  { label: 'Empty',                color: '#475569' },
  { label: 'Low  (< 50%)',         color: '#22c55e' },
  { label: 'Medium (50–74%)',       color: '#eab308' },
  { label: 'High (75–89%)',         color: '#f97316' },
  { label: 'Critical / Overloaded', color: '#ef4444' },
];

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  onBack: () => void;
}

export function LocationLoad({ onBack }: Props) {
  const [sortBy, setSortBy] = useState<'load' | 'name' | 'zone'>('load');

  // Build enriched rows from real D365 location data
  const allRows = useMemo<LocationRow[]>(() => {
    return WAREHOUSE_24_LOCATIONS
      .filter((loc) => !SYSTEM_IDS.has(loc.locationId))
      .map((loc): LocationRow => {
        const pct = loadPct(loc);
        return {
          locationId: loc.locationId,
          zone:       getZone(loc),
          capacity:   loc.capacity,
          qty:        loc.currentQuantity,
          pct,
          itemNumber: loc.itemNumber,
          color:      barColor(pct),
          status:     loadStatus(pct),
        };
      });
  }, []);

  // Chart: sorted by zone then name for a clean visual grouping
  const chartData = useMemo(() =>
    [...allRows].sort((a, b) =>
      a.zone.localeCompare(b.zone) || a.locationId.localeCompare(b.locationId)
    ), [allRows]);

  // Table: user-controlled sort
  const tableRows = useMemo(() => {
    const clone = [...allRows];
    if (sortBy === 'load')  clone.sort((a, b) => b.pct - a.pct);
    if (sortBy === 'name')  clone.sort((a, b) => a.locationId.localeCompare(b.locationId));
    if (sortBy === 'zone')  clone.sort((a, b) => a.zone.localeCompare(b.zone) || b.pct - a.pct);
    return clone;
  }, [allRows, sortBy]);

  // Summary metrics
  const avgLoad    = Math.round(allRows.reduce((s, e) => s + e.pct, 0) / allRows.length);
  const overloaded = allRows.filter((e) => e.pct >= 100).length;
  const highLoad   = allRows.filter((e) => e.pct >= 75 && e.pct < 100).length;
  const empty      = allRows.filter((e) => e.pct === 0).length;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-30 flex items-center gap-4 px-5 py-3 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm font-medium"
        >
          <ArrowLeft size={15} />
          Back
        </button>

        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-lg shadow-teal-500/20">
            <MapPin size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-none">
              Location Load
            </h1>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5">
              WH24 · {allRows.length} locations · Snapshot 2026-04-16
            </p>
          </div>
        </div>

        {overloaded > 0 && (
          <div className="flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/30 px-3 py-1">
            <AlertTriangle size={12} className="text-red-400" />
            <span className="text-xs font-semibold text-red-300">
              {overloaded} Overloaded
            </span>
          </div>
        )}
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4 lg:px-6">

        {/* ── KPI Row ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {([
            { label: 'Avg. Load',      value: `${avgLoad}%`,     color: avgLoad >= 75 ? 'text-orange-300' : avgLoad >= 50 ? 'text-yellow-300' : 'text-green-300', border: 'border-slate-600/60' },
            { label: 'Overloaded',     value: overloaded,         color: 'text-red-300',    border: 'border-red-500/40' },
            { label: 'High Load',      value: highLoad,           color: 'text-orange-300', border: 'border-orange-500/40' },
            { label: 'Empty',          value: empty,              color: 'text-slate-400',  border: 'border-slate-600/60' },
          ] as const).map((card) => (
            <div key={card.label} className={`rounded-xl border ${card.border} bg-slate-800/60 backdrop-blur-sm p-4`}>
              <p className="text-xs uppercase tracking-wider font-medium text-slate-500 mb-2">{card.label}</p>
              <p className={`text-3xl font-bold tabular-nums ${card.color}`}>{card.value}</p>
            </div>
          ))}
        </div>

        {/* ── Bar Chart ── */}
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Location Load — WH24</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Load % = on-hand qty ÷ location capacity.
                Dashed lines mark 75% and 100% thresholds.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[10px] text-slate-500">
              {LEGEND.map((l) => (
                <span key={l.label} className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-sm flex-shrink-0" style={{ background: l.color }} />
                  {l.label}
                </span>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={270}>
            <BarChart
              data={chartData}
              barSize={18}
              margin={{ top: 4, right: 8, bottom: 38, left: 0 }}
            >
              <XAxis
                dataKey="locationId"
                tick={{ fill: '#64748b', fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                angle={-45}
                textAnchor="end"
                interval={0}
              />
              <YAxis
                tick={{ fill: '#64748b', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                width={38}
                tickFormatter={(v) => `${v}%`}
                domain={[0, 112]}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
              <ReferenceLine y={100} stroke="#dc2626" strokeDasharray="4 3" strokeWidth={1.5} />
              <ReferenceLine y={75}  stroke="#f97316" strokeDasharray="4 3" strokeWidth={1} />
              <Bar dataKey="pct" radius={[3, 3, 0, 0]} name="Load %">
                {chartData.map((entry) => (
                  <Cell key={entry.locationId} fill={entry.color} fillOpacity={0.9} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* ── Detail Table ── */}
        <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-700/60">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Location Detail
            </h2>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <span>Sort:</span>
              {(['load', 'name', 'zone'] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSortBy(s)}
                  className={`px-2 py-0.5 rounded transition-colors capitalize ${
                    sortBy === s
                      ? 'bg-slate-600 text-slate-100'
                      : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {s === 'load' ? 'Load %' : s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Header */}
          <div className="grid gap-x-4 items-center px-5 py-2 border-b border-slate-700/40 bg-slate-800/60"
            style={{ gridTemplateColumns: '110px 1fr 80px 110px 110px 1fr' }}>
            {['Location', 'Zone', 'Item', 'Capacity', 'On Hand', 'Load'].map((h) => (
              <span key={h} className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-slate-700/30">
            {tableRows.map((row) => (
              <div
                key={row.locationId}
                className={`grid gap-x-4 items-center px-5 py-2.5
                  ${row.pct >= 100 ? 'bg-red-950/20' : ''}
                  ${row.pct >= 90 && row.pct < 100 ? 'bg-red-950/10' : ''}
                `}
                style={{ gridTemplateColumns: '110px 1fr 80px 110px 110px 1fr' }}
              >
                <span className="text-sm font-mono font-medium text-slate-200">{row.locationId}</span>
                <span className="text-xs text-slate-400 truncate">{row.zone}</span>
                <span className="text-xs font-mono text-slate-500">{row.itemNumber ?? '—'}</span>
                <span className="text-xs tabular-nums text-slate-400">{row.capacity.toLocaleString()}</span>
                <span className="text-xs tabular-nums text-slate-300 font-medium">{row.qty.toLocaleString()}</span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border w-fit ${statusBadgeClass(row.pct)}`}
                >
                  {row.pct}% · {row.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Data Note ── */}
        <div className="rounded-lg border border-slate-700/50 bg-slate-900/40 p-4 text-xs text-slate-500 leading-relaxed">
          <span className="text-slate-400 font-semibold">Data note — </span>
          Location IDs and capacity values are <span className="text-green-400">real D365FO data</span> for
          USMF WH24 (fetched 2026-04-16 via WarehouseLocations OData). On-hand quantities per location
          are <span className="text-amber-400">derived</span> from total item on-hand figures
          (WarehousesOnHandV2) distributed proportionally across assigned locations.
          The <code className="text-slate-400">InventLocationCapacitySetup</code> entity was not queried —
          treat load percentages as indicative for demo purposes.
        </div>

      </main>
    </div>
  );
}
