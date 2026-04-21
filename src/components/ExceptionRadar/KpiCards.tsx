// ============================================================
// KPI Summary Cards â€” clickable filter tiles
// ============================================================

import type { KpiMetrics } from '../../types/exceptions';
import { useExceptionStore, type KpiFilterId, KPI_FILTER_LABELS } from '../../store/exceptionStore';
import {
  AlertTriangle,
  AlertCircle,
  Ship,
  Clock,
  Database,
  TrendingDown,
  Lock,
} from 'lucide-react';

interface KpiCardsProps {
  metrics: KpiMetrics;
}

interface CardProps {
  filterId: KpiFilterId;
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent: string;
  glow?: boolean;
  active: boolean;
  onToggle: (id: KpiFilterId) => void;
}

// Accent colour maps
const BORDER: Record<string, string> = {
  red:    'border-red-500/40',
  orange: 'border-orange-500/40',
  amber:  'border-amber-500/40',
  sky:    'border-sky-500/40',
  violet: 'border-violet-500/40',
  slate:  'border-slate-600/60',
  green:  'border-green-500/40',
};
const BORDER_ACTIVE: Record<string, string> = {
  red:    'border-red-400',
  orange: 'border-orange-400',
  amber:  'border-amber-400',
  sky:    'border-sky-400',
  violet: 'border-violet-400',
  slate:  'border-slate-300',
  green:  'border-green-400',
};
const RING: Record<string, string> = {
  red:    'ring-red-500/30',
  orange: 'ring-orange-500/30',
  amber:  'ring-amber-500/30',
  sky:    'ring-sky-500/30',
  violet: 'ring-violet-500/30',
  slate:  'ring-slate-500/30',
  green:  'ring-green-500/30',
};
const ICON_COLOR: Record<string, string> = {
  red:    'text-red-400',
  orange: 'text-orange-400',
  amber:  'text-amber-400',
  sky:    'text-sky-400',
  violet: 'text-violet-400',
  slate:  'text-slate-400',
  green:  'text-green-400',
};
const VALUE_COLOR: Record<string, string> = {
  red:    'text-red-300',
  orange: 'text-orange-300',
  amber:  'text-amber-300',
  sky:    'text-sky-300',
  violet: 'text-violet-300',
  slate:  'text-slate-200',
  green:  'text-green-300',
};

function Card({ filterId, label, value, sub, icon, accent, glow, active, onToggle }: CardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(filterId)}
      title={active ? `Clear filter: ${KPI_FILTER_LABELS[filterId]}` : `Filter by: ${KPI_FILTER_LABELS[filterId]}`}
      className={`
        relative flex flex-col gap-2 rounded-xl border p-4 text-left w-full
        transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
        cursor-pointer select-none
        ${active
          ? `${BORDER_ACTIVE[accent]} bg-slate-700/70 ring-2 ${RING[accent]} shadow-lg`
          : `${BORDER[accent]} bg-slate-800/60 backdrop-blur-sm hover:bg-slate-700/40 hover:${BORDER_ACTIVE[accent]}`
        }
        ${glow && !active ? 'shadow-lg shadow-red-500/10' : ''}
      `}
    >
      {/* Active indicator dot */}
      {active && (
        <span className={`absolute top-2 right-2 h-2 w-2 rounded-full ${ICON_COLOR[accent].replace('text-', 'bg-')} animate-pulse`} />
      )}

      <div className="flex items-start justify-between">
        <span className="text-xs font-medium tracking-wider uppercase text-slate-400">{label}</span>
        <span className={ICON_COLOR[accent]}>{icon}</span>
      </div>

      <div className={`text-3xl font-bold tabular-nums ${VALUE_COLOR[accent]}`}>
        {value}
      </div>

      {sub && <p className="text-xs text-slate-500 leading-tight">{sub}</p>}
    </button>
  );
}

export function KpiCards({ metrics }: KpiCardsProps) {
  const { kpiFilter, setKpiFilter } = useExceptionStore();

  const wh24Pct = metrics.totalExceptions > 0
    ? Math.round((metrics.wh24Count / metrics.totalExceptions) * 100)
    : 0;

  function toggle(id: KpiFilterId) {
    // "Total" tile always resets to show everything
    if (id === 'total') { setKpiFilter(null); return; }
    setKpiFilter(kpiFilter === id ? null : id);
  }

  const cp = { onToggle: toggle } as const;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
      <Card {...cp} filterId="total"
        label="Total Exceptions"
        value={metrics.totalExceptions}
        sub={`${metrics.realDataCount} from live D365`}
        icon={<AlertCircle size={18} />}
        accent="slate"
        active={kpiFilter === null}
      />
      <Card {...cp} filterId="critical"
        label="Critical"
        value={metrics.criticalCount}
        sub="Immediate action needed"
        icon={<AlertTriangle size={18} />}
        accent="red"
        glow={metrics.criticalCount > 0}
        active={kpiFilter === 'critical'}
      />
      <Card {...cp} filterId="high"
        label="High Severity"
        value={metrics.highCount}
        sub="Action needed today"
        icon={<TrendingDown size={18} />}
        accent="orange"
        active={kpiFilter === 'high'}
      />
      <Card {...cp} filterId="shipments_at_risk"
        label="Shipments at Risk"
        value={metrics.shipmentsAtRisk}
        sub="Open loads / shipments"
        icon={<Ship size={18} />}
        accent="amber"
        active={kpiFilter === 'shipments_at_risk'}
      />
      <Card {...cp} filterId="avg_aging"
        label="Avg Aging"
        value={`${metrics.avgAgingHours}h`}
        sub="Click to show above-avg"
        icon={<Clock size={18} />}
        accent="sky"
        active={kpiFilter === 'avg_aging'}
      />
      <Card {...cp} filterId="blocked_work"
        label="Blocked Work"
        value={metrics.blockedWorkCount}
        sub="Work orders currently blocked"
        icon={<Lock size={18} />}
        accent="red"
        glow={metrics.blockedWorkCount > 0}
        active={kpiFilter === 'blocked_work'}
      />
      <Card {...cp} filterId="wh24"
        label="WH24 / WH51"
        value={`${metrics.wh24Count} / ${metrics.wh51Count}`}
        sub={`WH24 is ${wh24Pct}% of total`}
        icon={<Database size={18} />}
        accent="violet"
        active={kpiFilter === 'wh24' || kpiFilter === 'wh51'}
      />
    </div>
  );
}
