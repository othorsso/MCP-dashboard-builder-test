// ============================================================
// Exception Table — sortable, clickable prioritized list
// ============================================================

import { useExceptionStore } from '../../store/exceptionStore';
import { SeverityBadge, AreaBadge, WarehouseBadge, AgingLabel, DataSourceBadge } from './Badges';
import { ChevronRight } from 'lucide-react';

const SEVERITY_ORDER: Record<string, number> = {
  critical: 0, high: 1, medium: 2, low: 3,
};

export function ExceptionTable() {
  const { filteredExceptions, selectException, selectedExceptionId } = useExceptionStore();
  const exceptions = [...filteredExceptions()].sort(
    (a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity] || b.agingHours - a.agingHours
  );

  if (exceptions.length === 0) {
    return (
      <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 p-8 text-center">
        <p className="text-slate-500 text-sm">No exceptions match the current filters.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-700/60 bg-slate-800/40 backdrop-blur-sm overflow-hidden">
      {/* Header */}
      <div className="grid gap-x-3 items-center px-4 py-2.5 border-b border-slate-700/60 bg-slate-800/60"
        style={{ gridTemplateColumns: '1fr 56px 96px 108px 72px 88px 16px' }}>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Exception</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">WH</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Severity</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Area</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Aging</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Source</span>
        <span />
      </div>

      {/* Rows */}
      <div className="divide-y divide-slate-700/30">
        {exceptions.map((ex, idx) => {
          const isSelected = ex.id === selectedExceptionId;
          const isTop = idx === 0 && ex.severity === 'critical';
          return (
            <button
              key={ex.id}
              type="button"
              onClick={() => selectException(isSelected ? null : ex.id)}
              className={`w-full grid gap-x-3 items-center px-4 py-3 text-left transition-all
                ${isSelected
                  ? 'bg-slate-700/70 ring-1 ring-inset ring-slate-500/50'
                  : 'hover:bg-slate-700/30'}
                ${isTop ? 'bg-red-950/20' : ''}
              `}
              style={{ gridTemplateColumns: '1fr 56px 96px 108px 72px 88px 16px' }}
            >
              <div className="min-w-0">
                <p className={`text-sm font-medium leading-snug truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {ex.title}
                </p>
                {ex.sourceWorkId && (
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {ex.sourceWorkId.includes(',') ? ex.sourceWorkId.split(',')[0] + ' + more' : ex.sourceWorkId}
                  </p>
                )}
              </div>
              <WarehouseBadge id={ex.warehouseId} />
              <SeverityBadge severity={ex.severity} />
              <AreaBadge area={ex.processArea} />
              <AgingLabel hours={ex.agingHours} />
              <DataSourceBadge source={ex.dataSource} />
              <ChevronRight
                size={14}
                className={`shrink-0 transition-transform ${isSelected ? 'text-white rotate-90' : 'text-slate-600'}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
