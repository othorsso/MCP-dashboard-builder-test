// ============================================================
// Warehouse Exception Radar — Main Dashboard
// ============================================================

import { useState, useEffect } from 'react';
import { useExceptionStore, KPI_FILTER_LABELS } from '../../store/exceptionStore';
import { KpiCards } from './KpiCards';
import { FilterBar } from './FilterBar';
import { ExceptionTable } from './ExceptionTable';
import { ExceptionDetailPanel } from './ExceptionDetailPanel';
import { ExceptionCharts } from './ExceptionCharts';
import { AiBriefing } from './AiBriefing';
import { Radar, RefreshCw, X } from 'lucide-react';
import { MCP_COMPANY, MCP_ENVIRONMENT } from '../../data/d365LiveData';

interface Props {
  onSwitchToLocationLoad?: () => void;
}

export function ExceptionRadarDashboard({ onSwitchToLocationLoad }: Props) {
  const {
    metrics, exceptions, selectedExceptionId, kpiFilter, setKpiFilter, filteredExceptions,
    isRefreshing, refreshStep, lastRefreshed, refreshSnapshot,
  } = useExceptionStore();
  const m = metrics();
  const allExceptions = exceptions;
  const visibleCount = filteredExceptions().length;

  const [showUpdated, setShowUpdated] = useState(false);
  useEffect(() => {
    if (lastRefreshed) {
      setShowUpdated(true);
      const t = setTimeout(() => setShowUpdated(false), 2000);
      return () => clearTimeout(t);
    }
  }, [lastRefreshed]);

  const _now = new Date();
  const _snap = lastRefreshed ?? (() => {
    const d = new Date(_now);
    d.setHours(d.getHours() - 2, 0, 0, 0);
    return d;
  })();
  const snapshotLabel = _snap.toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* ── Top Nav ── */}
      <header className="sticky top-0 z-30 flex items-center gap-4 px-5 py-3 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 via-violet-500 to-fuchsia-500 text-white shadow-lg shadow-indigo-500/20">
            <Radar size={16} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-white tracking-tight leading-none">
              Oscar's WMS Exceptions Dashboard
            </h1>
            <p className="text-[10px] text-slate-500 leading-none mt-0.5">
              {MCP_COMPANY} · WH24 &amp; WH51 · {lastRefreshed ? 'Live' : 'Snapshot'} {snapshotLabel}
            </p>
          </div>
        </div>

        {/* Critical now pill */}
        {m.criticalCount > 0 && (
          <div className="flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/30 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" />
            <span className="text-xs font-semibold text-red-300">
              {m.criticalCount} CRITICAL NOW
            </span>
          </div>
        )}

        <div className="ml-auto flex items-center gap-3">
          {/* D365 connection indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-green-400">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400" />
            <span className="text-slate-500">
              {MCP_ENVIRONMENT.replace('https://', '').split('.')[0]} (USMF)
            </span>
          </div>

          <button
            type="button"
            disabled={isRefreshing}
            onClick={() => refreshSnapshot()}
            className={`flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-all ${
              showUpdated
                ? 'border-green-600/60 bg-green-900/30 text-green-300'
                : isRefreshing
                ? 'border-slate-700 bg-slate-800/60 text-slate-500 cursor-wait'
                : 'border-slate-700 bg-slate-800/60 text-slate-400 hover:text-white hover:border-slate-500'
            }`}
          >
            <RefreshCw size={12} className={isRefreshing ? 'animate-spin' : ''} />
            {showUpdated ? 'Updated ✓' : isRefreshing ? 'Refreshing…' : 'Refresh'}
          </button>

          {onSwitchToLocationLoad && (
            <button
              type="button"
              onClick={onSwitchToLocationLoad}
              className="flex items-center gap-1.5 rounded-md border border-teal-700/60 bg-teal-900/30 px-3 py-1.5 text-xs text-teal-300 hover:bg-teal-800/40 transition-all"
            >
              Location Load →
            </button>
          )}
        </div>
      </header>

      {/* ── Refresh Progress Banner ── */}
      {isRefreshing && (
        <div className="flex items-center gap-3 px-5 py-2.5 text-xs border-b bg-indigo-950/30 border-indigo-800/20 text-indigo-300">
          <RefreshCw size={11} className="animate-spin shrink-0 text-indigo-400" />
          <span>{refreshStep}</span>
          <span className="ml-auto flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:0ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:150ms]" />
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-bounce [animation-delay:300ms]" />
          </span>
        </div>
      )}

      {/* ── Scrollable Content ── */}
      <main className="flex-1 overflow-y-auto px-4 py-5 space-y-4 lg:px-6">

        {/* KPI Row */}
        <KpiCards metrics={m} />

        {/* KPI active-filter banner */}
        {kpiFilter && kpiFilter !== 'total' && (
          <div className="flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-sm text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span>Filtered by KPI: <strong>{KPI_FILTER_LABELS[kpiFilter]}</strong> — showing {visibleCount} exception{visibleCount !== 1 ? 's' : ''}</span>
            <button
              type="button"
              onClick={() => setKpiFilter(null)}
              className="ml-auto flex items-center gap-1 text-xs text-indigo-400 hover:text-white transition-colors"
            >
              <X size={12} /> Clear
            </button>
          </div>
        )}

        {/* Charts Row */}
        <ExceptionCharts exceptions={allExceptions} />

        {/* Filter Bar */}
        <FilterBar />

        {/* Main 2-column: table + side panel / briefing */}
        <div className={`grid gap-4 ${selectedExceptionId ? 'grid-cols-1 lg:grid-cols-[3fr_2fr]' : 'grid-cols-1 lg:grid-cols-[3fr_2fr]'}`}>
          {/* Exception Table */}
          <div className="min-w-0">
            <div className="flex items-center justify-between mb-2 px-1">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                Prioritized Exceptions
                {kpiFilter && kpiFilter !== 'total' && (
                  <span className="ml-2 normal-case text-indigo-400">· {KPI_FILTER_LABELS[kpiFilter]}</span>
                )}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> D365 Live
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-blue-400" /> Derived
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-violet-400" /> Simulated
              </div>
            </div>
            <ExceptionTable />
          </div>

          {/* Right panel: detail when selected, AI briefing otherwise */}
          <div className="min-w-0">
            {selectedExceptionId ? (
              <ExceptionDetailPanel />
            ) : (
              <AiBriefing />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-slate-800 pt-4 pb-2 flex flex-wrap gap-x-6 gap-y-1 text-[10px] text-slate-600">
          <span>Oscar's WMS Insights — Prototype v1.0</span>
          <span>Stack: React · TypeScript · Vite · Tailwind · Recharts</span>
          <span>Data: D365FO USMF via MCP OData</span>
          <span className="ml-auto">
            {allExceptions.filter((e) => e.dataSource === 'real').length} real ·{' '}
            {allExceptions.filter((e) => e.dataSource === 'derived').length} derived ·{' '}
            {allExceptions.filter((e) => e.dataSource === 'simulated').length} simulated
          </span>
        </footer>
      </main>
    </div>
  );
}
