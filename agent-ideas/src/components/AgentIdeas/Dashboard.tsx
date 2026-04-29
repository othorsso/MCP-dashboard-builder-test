// Main dashboard layout — header, KPI cards, charts, filters, and the idea explorer.
import KpiCards from './KpiCards';
import FilterBar from './FilterBar';
import Charts from './Charts';
import IdeaGrid from './IdeaGrid';
import DetailPanel from './DetailPanel';
import { useAgentIdeasStore } from '../../store/agentIdeasStore';
import { Bot } from 'lucide-react';

export default function Dashboard() {
  const selectedId = useAgentIdeasStore((s) => s.selectedId);
  const panelOpen = selectedId !== null;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Sticky header */}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/90 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center gap-4">
          {/* Brand mark */}
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-700 flex-shrink-0 shadow-lg shadow-indigo-900/40">
            <Bot size={20} className="text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="text-xl font-bold text-white tracking-tight leading-none">
              Engage AI Agent Hub
            </h1>
            <p className="text-sm text-slate-400 mt-0.5">
              53 agentidéer inlämnade av Engage-teamet — bläddra, filtrera och hitta nästa bygge
            </p>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-screen-xl mx-auto px-6 py-8 space-y-8">
        {/* KPI cards */}
        <KpiCards />

        {/* Charts */}
        <Charts />

        {/* Filters */}
        <div>
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Filtrera idéer
          </h2>
          <FilterBar />
        </div>

        {/* Explorer: grid + optional detail panel */}
        <div
          className={`grid gap-6 ${
            panelOpen ? 'grid-cols-1 lg:grid-cols-[1fr_420px]' : 'grid-cols-1'
          }`}
        >
          <IdeaGrid panelOpen={panelOpen} />
          {panelOpen && <DetailPanel />}
        </div>
      </main>
    </div>
  );
}
