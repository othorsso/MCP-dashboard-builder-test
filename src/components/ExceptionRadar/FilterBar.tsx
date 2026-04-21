// ============================================================
// Filter Bar — warehouse, severity, process area, data source
// ============================================================

import { useExceptionStore } from '../../store/exceptionStore';
import type { Severity, ProcessArea, DataSource, WarehouseId } from '../../types/exceptions';
import { X } from 'lucide-react';

const SEVERITIES: Severity[] = ['critical', 'high', 'medium', 'low'];
const AREAS: ProcessArea[] = ['outbound', 'inbound', 'production', 'quality', 'inventory', 'replenishment'];
const SOURCES: Array<{ value: DataSource | 'all'; label: string }> = [
  { value: 'all', label: 'All Sources' },
  { value: 'real', label: '● D365 Live' },
  { value: 'derived', label: '◆ Derived' },
  { value: 'simulated', label: '◈ Simulated' },
];

function ToggleChip({
  active,
  onClick,
  children,
  accent,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  accent?: string;
}) {
  const base = `cursor-pointer select-none rounded-full px-3 py-1 text-xs font-medium border transition-all`;
  const on = accent ?? 'bg-slate-600 text-slate-100 border-slate-500';
  const off = 'bg-slate-800/60 text-slate-500 border-slate-700 hover:border-slate-500 hover:text-slate-400';
  return (
    <button type="button" className={`${base} ${active ? on : off}`} onClick={onClick}>
      {children}
    </button>
  );
}

const SEVERITY_CHIP: Record<Severity, string> = {
  critical: 'bg-red-500/25 text-red-300 border-red-500/50',
  high:     'bg-orange-500/25 text-orange-300 border-orange-500/50',
  medium:   'bg-yellow-500/25 text-yellow-300 border-yellow-500/50',
  low:      'bg-sky-500/25 text-sky-300 border-sky-500/50',
};

export function FilterBar() {
  const { filters, setFilters, resetFilters, filteredExceptions } = useExceptionStore();
  const visibleCount = filteredExceptions().length;

  function toggleWarehouse(id: WarehouseId) {
    const current = filters.warehouseIds;
    setFilters({
      warehouseIds: current.includes(id)
        ? current.filter((w) => w !== id)
        : [...current, id],
    });
  }

  function toggleSeverity(s: Severity) {
    const current = filters.severities;
    setFilters({
      severities: current.includes(s)
        ? current.filter((x) => x !== s)
        : [...current, s],
    });
  }

  function toggleArea(a: ProcessArea) {
    const current = filters.processAreas;
    setFilters({
      processAreas: current.includes(a)
        ? current.filter((x) => x !== a)
        : [...current, a],
    });
  }

  const isFiltered =
    filters.warehouseIds.length < 2 ||
    filters.severities.length < 4 ||
    filters.processAreas.length < 6 ||
    filters.dataSource !== 'all';

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Filters
        </span>
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            Showing <span className="text-slate-300 font-semibold">{visibleCount}</span> exceptions
          </span>
          {isFiltered && (
            <button
              type="button"
              onClick={resetFilters}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-red-400 transition-colors"
            >
              <X size={12} /> Reset
            </button>
          )}
        </div>
      </div>

      {/* Warehouse */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 w-20 shrink-0">Warehouse</span>
        {(['24', '51'] as WarehouseId[]).map((id) => (
          <ToggleChip
            key={id}
            active={filters.warehouseIds.includes(id)}
            onClick={() => toggleWarehouse(id)}
            accent={id === '24'
              ? 'bg-indigo-500/25 text-indigo-200 border-indigo-500/50'
              : 'bg-fuchsia-500/25 text-fuchsia-200 border-fuchsia-500/50'}
          >
            WH{id}
          </ToggleChip>
        ))}
      </div>

      {/* Severity */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 w-20 shrink-0">Severity</span>
        {SEVERITIES.map((s) => (
          <ToggleChip
            key={s}
            active={filters.severities.includes(s)}
            onClick={() => toggleSeverity(s)}
            accent={SEVERITY_CHIP[s]}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </ToggleChip>
        ))}
      </div>

      {/* Process area */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 w-20 shrink-0">Area</span>
        {AREAS.map((a) => (
          <ToggleChip
            key={a}
            active={filters.processAreas.includes(a)}
            onClick={() => toggleArea(a)}
          >
            {a.charAt(0).toUpperCase() + a.slice(1)}
          </ToggleChip>
        ))}
      </div>

      {/* Data source */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 w-20 shrink-0">Data</span>
        {SOURCES.map(({ value, label }) => (
          <ToggleChip
            key={value}
            active={filters.dataSource === value}
            onClick={() => setFilters({ dataSource: value })}
            accent={
              value === 'real'      ? 'bg-green-500/25 text-green-200 border-green-500/50' :
              value === 'derived'   ? 'bg-blue-500/25 text-blue-200 border-blue-500/50' :
              value === 'simulated' ? 'bg-violet-500/25 text-violet-200 border-violet-500/50' :
              undefined
            }
          >
            {label}
          </ToggleChip>
        ))}
      </div>
    </div>
  );
}
