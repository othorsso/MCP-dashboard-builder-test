// KPI summary cards at the top of the dashboard.
// Clicking a card filters the idea grid to that category.
// Clicking the active card again resets to show all ideas.
import { AGENT_IDEAS } from '../../data/agentIdeasData';
import { CATEGORY_STYLES } from '../../types/agentIdeas';
import type { Category } from '../../types/agentIdeas';
import { useAgentIdeasStore } from '../../store/agentIdeasStore';
import { Layers } from 'lucide-react';

// Top 5 categories by idea count, shown as individual KPI cards
const TOP_CATEGORIES: Category[] = [
  'Finance',
  'Development & Tech',
  'SCM & Planning',
  'System Administration',
  'Warehouse & Logistics',
];

const categoryCounts = TOP_CATEGORIES.reduce<Record<string, number>>((acc, cat) => {
  acc[cat] = AGENT_IDEAS.filter((i) => i.category === cat).length;
  return acc;
}, {});

const totalCount = AGENT_IDEAS.length;

export default function KpiCards() {
  const selectedCategories = useAgentIdeasStore((s) => s.selectedCategories);
  const setCategories = useAgentIdeasStore((s) => s.setCategories);
  const selectIdea = useAgentIdeasStore((s) => s.selectIdea);

  // "All" card is active when no category filter is set
  const isAllActive = selectedCategories.length === 0;

  function handleAllClick() {
    setCategories([]);
    selectIdea(null);
  }

  function handleCategoryClick(cat: Category) {
    // If this is the only selected category, toggle it off (show all)
    const isActive = selectedCategories.length === 1 && selectedCategories[0] === cat;
    setCategories(isActive ? [] : [cat]);
    selectIdea(null);
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {/* All Ideas card */}
      <button
        onClick={handleAllClick}
        className={`relative text-left rounded-xl p-4 border transition-all duration-150 focus:outline-none ${
          isAllActive
            ? 'bg-slate-700/70 border-slate-400 ring-2 ring-slate-500/30'
            : 'bg-slate-800/60 border-slate-600/40 hover:bg-slate-700/40'
        }`}
      >
        {isAllActive && (
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-slate-400 animate-pulse" />
        )}
        <div className="flex items-center gap-2 mb-1">
          <Layers size={14} className="text-slate-400 flex-shrink-0" />
          <span className="text-xs text-slate-400 font-medium truncate">Alla idéer</span>
        </div>
        <p className="text-2xl font-bold text-white">{totalCount}</p>
      </button>

      {/* Per-category KPI cards */}
      {TOP_CATEGORIES.map((cat) => {
        const s = CATEGORY_STYLES[cat];
        const count = categoryCounts[cat] ?? 0;
        const isActive = selectedCategories.length === 1 && selectedCategories[0] === cat;

        return (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`relative text-left rounded-xl p-4 border transition-all duration-150 focus:outline-none ${
              isActive
                ? `bg-slate-700/70 ${s.kpiActiveBorder} ring-2 ${s.kpiActiveRing}`
                : `bg-slate-800/60 ${s.kpiDefaultBorder} hover:bg-slate-700/40`
            }`}
          >
            {isActive && (
              <span className={`absolute top-2 right-2 h-2 w-2 rounded-full animate-pulse ${s.kpiActiveDot}`} />
            )}
            <p className={`text-xs font-medium mb-1 truncate ${s.kpiText}`}>{cat}</p>
            <p className="text-2xl font-bold text-white">{count}</p>
          </button>
        );
      })}
    </div>
  );
}
