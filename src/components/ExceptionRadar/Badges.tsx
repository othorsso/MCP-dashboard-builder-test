// ============================================================
// Severity / Category / Data-source badge helpers
// ============================================================

import type { Severity, ProcessArea, ExceptionCategory, DataSource } from '../../types/exceptions';

// ── Severity ─────────────────────────────────────────────────────────────────
const SEVERITY_STYLES: Record<Severity, string> = {
  critical: 'bg-red-500/20 text-red-300 border border-red-500/50 ring-1 ring-red-500/30',
  high:     'bg-orange-500/20 text-orange-300 border border-orange-500/40',
  medium:   'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40',
  low:      'bg-sky-500/20 text-sky-300 border border-sky-500/40',
};

const SEVERITY_DOT: Record<Severity, string> = {
  critical: 'bg-red-400 animate-pulse',
  high:     'bg-orange-400',
  medium:   'bg-yellow-400',
  low:      'bg-sky-400',
};

export function SeverityBadge({ severity }: { severity: Severity }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide ${SEVERITY_STYLES[severity]}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${SEVERITY_DOT[severity]}`} />
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  );
}

// ── Process area ──────────────────────────────────────────────────────────────
const AREA_STYLES: Record<ProcessArea, string> = {
  outbound:      'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  inbound:       'bg-teal-500/15 text-teal-300 border border-teal-500/30',
  production:    'bg-purple-500/15 text-purple-300 border border-purple-500/30',
  quality:       'bg-pink-500/15 text-pink-300 border border-pink-500/30',
  inventory:     'bg-amber-500/15 text-amber-300 border border-amber-500/30',
  replenishment: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30',
};

const AREA_ICONS: Record<ProcessArea, string> = {
  outbound: '→',
  inbound: '←',
  production: '⚙',
  quality: '✓',
  inventory: '▣',
  replenishment: '↺',
};

export function AreaBadge({ area }: { area: ProcessArea }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${AREA_STYLES[area]}`}>
      <span>{AREA_ICONS[area]}</span>
      {area.charAt(0).toUpperCase() + area.slice(1)}
    </span>
  );
}

// ── Warehouse ─────────────────────────────────────────────────────────────────
export function WarehouseBadge({ id }: { id: '24' | '51' }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-bold tabular-nums
      ${id === '24'
        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
        : 'bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40'
      }`}
    >
      WH{id}
    </span>
  );
}

// ── Category ──────────────────────────────────────────────────────────────────
const CATEGORY_LABELS: Record<ExceptionCategory, string> = {
  blocked_work:      'Blocked Work',
  stockout:          'Stockout',
  low_stock:         'Low Stock',
  stale_work:        'Stale Work',
  quality_hold:      'Quality Hold',
  delayed_shipment:  'Delayed Shipment',
  replenishment_delay: 'Replenishment Delay',
  device_error:      'Device Error',
};

export function CategoryLabel({ category }: { category: ExceptionCategory }) {
  return <span className="text-xs text-slate-400">{CATEGORY_LABELS[category]}</span>;
}

// ── Data source ───────────────────────────────────────────────────────────────
const DATA_SOURCE_STYLES: Record<DataSource, string> = {
  real:      'bg-green-500/15 text-green-300 border border-green-500/30',
  derived:   'bg-blue-500/15 text-blue-300 border border-blue-500/30',
  simulated: 'bg-violet-500/15 text-violet-300 border border-violet-500/30',
};

const DATA_SOURCE_ICONS: Record<DataSource, string> = {
  real:      '●',
  derived:   '◆',
  simulated: '◈',
};

const DATA_SOURCE_LABELS: Record<DataSource, string> = {
  real:      'D365 Live',
  derived:   'Derived',
  simulated: 'Simulated',
};

export function DataSourceBadge({ source }: { source: DataSource }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium whitespace-nowrap ${DATA_SOURCE_STYLES[source]}`}>
      <span>{DATA_SOURCE_ICONS[source]}</span>
      {DATA_SOURCE_LABELS[source]}
    </span>
  );
}

// ── Aging ──────────────────────────────────────────────────────────────────────
export function AgingLabel({ hours }: { hours: number }) {
  const days = Math.floor(hours / 24);
  const remainHours = hours % 24;
  const text = days > 0 ? `${days}d ${remainHours}h` : `${hours}h`;
  const style =
    hours > 168 ? 'text-red-400 font-semibold' :
    hours > 72  ? 'text-orange-400' :
    hours > 24  ? 'text-yellow-400' :
    'text-slate-400';
  return <span className={`text-xs tabular-nums ${style}`}>{text}</span>;
}
