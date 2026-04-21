// ============================================================
// KPI Cards — starter template (clickable filter tiles)
// ============================================================

import { useAppStore, type KpiFilterId, KPI_FILTER_LABELS } from '../store/appStore';

interface CardProps {
  filterId: KpiFilterId;
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ReactNode;
  accent: 'red' | 'orange' | 'amber' | 'sky' | 'violet' | 'slate' | 'green' | 'teal';
  glow?: boolean;
  active: boolean;
  onToggle: (id: KpiFilterId) => void;
}

// Full class strings (not interpolated) so Tailwind JIT picks them up
const BORDER    = { red: 'border-red-500/40',    orange: 'border-orange-500/40', amber: 'border-amber-500/40',  sky: 'border-sky-500/40',    violet: 'border-violet-500/40', slate: 'border-slate-600/60',  green: 'border-green-500/40',  teal: 'border-teal-500/40'  };
const BORDER_ON = { red: 'border-red-400',        orange: 'border-orange-400',    amber: 'border-amber-400',     sky: 'border-sky-400',        violet: 'border-violet-400',    slate: 'border-slate-300',     green: 'border-green-400',     teal: 'border-teal-400'     };
const RING      = { red: 'ring-red-500/30',        orange: 'ring-orange-500/30',   amber: 'ring-amber-500/30',    sky: 'ring-sky-500/30',        violet: 'ring-violet-500/30',   slate: 'ring-slate-500/30',    green: 'ring-green-500/30',    teal: 'ring-teal-500/30'    };
const ICON_COL  = { red: 'text-red-400',           orange: 'text-orange-400',      amber: 'text-amber-400',       sky: 'text-sky-400',           violet: 'text-violet-400',      slate: 'text-slate-400',       green: 'text-green-400',       teal: 'text-teal-400'       };
const VAL_COL   = { red: 'text-red-300',           orange: 'text-orange-300',      amber: 'text-amber-300',       sky: 'text-sky-300',           violet: 'text-violet-300',      slate: 'text-slate-200',       green: 'text-green-300',       teal: 'text-teal-300'       };
const DOT_COL   = { red: 'bg-red-400',             orange: 'bg-orange-400',        amber: 'bg-amber-400',         sky: 'bg-sky-400',             violet: 'bg-violet-400',        slate: 'bg-slate-400',         green: 'bg-green-400',         teal: 'bg-teal-400'         };

function Card({ filterId, label, value, sub, icon, accent, glow, active, onToggle }: CardProps) {
  return (
    <button
      type="button"
      onClick={() => onToggle(filterId)}
      title={active ? `Clear filter: ${KPI_FILTER_LABELS[filterId]}` : `Filter by: ${KPI_FILTER_LABELS[filterId]}`}
      className={`
        relative flex flex-col gap-2 rounded-xl border p-4 text-left w-full
        transition-all duration-150 cursor-pointer select-none
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950
        ${active
          ? `${BORDER_ON[accent]} bg-slate-700/70 ring-2 ${RING[accent]} shadow-lg`
          : `${BORDER[accent]} bg-slate-800/60 backdrop-blur-sm hover:bg-slate-700/40 hover:${BORDER_ON[accent]}`
        }
        ${glow && !active ? 'shadow-lg shadow-red-500/10' : ''}
      `}
    >
      {active && (
        <span className={`absolute top-2 right-2 h-2 w-2 rounded-full ${DOT_COL[accent]} animate-pulse`} />
      )}
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium tracking-wider uppercase text-slate-400">{label}</span>
        <span className={ICON_COL[accent]}>{icon}</span>
      </div>
      <div className={`text-3xl font-bold tabular-nums ${VAL_COL[accent]}`}>{value}</div>
      {sub && <p className="text-xs text-slate-500 leading-tight">{sub}</p>}
    </button>
  );
}

export function KpiCards() {
  const { kpiFilter, setKpiFilter } = useAppStore();
  // Replace this with your actual metrics
  const totalCount = 0;
  const criticalCount = 0;

  function toggle(id: KpiFilterId) {
    if (id === 'total') { setKpiFilter(null); return; }
    setKpiFilter(kpiFilter === id ? null : id);
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      <Card filterId="total"    label="Total"    value={totalCount}    accent="slate"  active={kpiFilter === null}        onToggle={toggle} />
      <Card filterId="critical" label="Critical" value={criticalCount} accent="red"    active={kpiFilter === 'critical'}  onToggle={toggle} glow={criticalCount > 0} />
      {/* Add more cards here */}
    </div>
  );
}
